'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRecorder } from './useRecorder';
import { audioPlayer } from '../services/audioPlayer.service';

export type VoiceState =
  | 'idle'
  | 'requestingPermission'
  | 'listening'
  | 'recording'
  | 'transcribing'
  | 'thinking'
  | 'generatingVoice'
  | 'speaking'
  | 'error';

interface UseVoiceConversationProps {
  onSendMessage: (message: string) => Promise<string | null>;
  onSpeechInterrupted?: () => void;
}

// ─── Lightweight inline SpeechRecognition for live captions ─────────────────
interface SpeechRecognitionLike extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
}

function createBrowserRecognition(): SpeechRecognitionLike | null {
  if (typeof window === 'undefined') return null;
  const API = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!API) return null;
  const r: SpeechRecognitionLike = new API();
  r.continuous = true;
  r.interimResults = true;
  r.lang = 'en-US';
  return r;
}

export function useVoiceConversation({ onSendMessage, onSpeechInterrupted }: UseVoiceConversationProps) {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [liveTranscript, setLiveTranscript] = useState('');       // interim captions
  const [finalTranscript, setFinalTranscript] = useState('');     // finalized words

  const { isReady, isRecording, error: recError, initRecorder, startRecording, stopRecording, abortRecording } = useRecorder();

  const isActiveConversation = useRef(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  // ── Sync recorder errors ──────────────────────────────────────────────────
  useEffect(() => {
    if (recError) {
      setErrorMessage(recError);
      setVoiceState('error');
      isActiveConversation.current = false;
    }
  }, [recError]);

  // ── Helper: start browser live captions ──────────────────────────────────
  const startLiveCaptions = useCallback(() => {
    const rec = createBrowserRecognition();
    if (!rec) return;

    setLiveTranscript('');
    setFinalTranscript('');

    rec.onresult = (e: any) => {
      let interim = '';
      let final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else interim += t;
      }
      if (final) setFinalTranscript(prev => (prev ? prev + ' ' : '') + final);
      setLiveTranscript(interim);
    };
    rec.onerror = () => {}; // silently ignore — captions are best-effort
    rec.onend = () => {};

    try { rec.start(); } catch { /* already running or not supported */ }
    recognitionRef.current = rec;
  }, []);

  const stopLiveCaptions = useCallback(() => {
    try { recognitionRef.current?.stop(); } catch { }
    recognitionRef.current = null;
    setLiveTranscript('');
  }, []);

  const abortLiveCaptions = useCallback(() => {
    try { recognitionRef.current?.abort(); } catch { }
    recognitionRef.current = null;
    setLiveTranscript('');
    setFinalTranscript('');
  }, []);

  // ── Core turn processor ───────────────────────────────────────────────────
  const processTurn = useCallback(async (audioBlob: Blob) => {
    stopLiveCaptions();

    try {
      // 1. Transcribe via Sarvam
      setVoiceState('transcribing');
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');

      const sttRes = await fetch('/api/voice/transcribe', { method: 'POST', body: formData });
      const sttData = await sttRes.json();

      if (!sttRes.ok) {
        throw new Error(sttData.error || 'Failed to transcribe audio');
      }

      const transcript = sttData.transcript?.trim();
      if (!transcript) {
        // Nothing heard — silently start listening again
        if (isActiveConversation.current) startListen();
        return;
      }

      setFinalTranscript(transcript); // show what was understood

      // 2. Gemini Chat
      setVoiceState('thinking');
      const reply = await onSendMessage(transcript);
      if (!reply) {
        if (isActiveConversation.current) startListen();
        return;
      }

      // 3. Sarvam TTS
      setVoiceState('generatingVoice');
      const ttsRes = await fetch('/api/voice/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: reply }),
      });

      if (!ttsRes.ok) {
        const ttsData = await ttsRes.json().catch(() => ({}));
        throw new Error(ttsData.error || 'Failed to generate voice response');
      }

      const audioBuffer = await ttsRes.arrayBuffer();

      // 4. Playback
      setVoiceState('speaking');
      setFinalTranscript(''); // clear user transcript while AI speaks
      await audioPlayer.play(audioBuffer, () => {
        if (isActiveConversation.current) startListen();
      });

    } catch (err) {
      console.error('Voice turn error:', err);
      setErrorMessage('Voice conversation encountered an issue. Please try again or switch to text chat.');
      setVoiceState('error');
      isActiveConversation.current = false;
    }
  }, [onSendMessage, stopLiveCaptions]);

  // ── Start a listening turn ────────────────────────────────────────────────
  // Defined after processTurn to reference it
  const startListen = useCallback(() => {
    if (!isActiveConversation.current) return;

    setVoiceState('listening');
    setFinalTranscript('');

    startLiveCaptions(); // show live captions while recording

    startRecording(async (audioBlob) => {
      if (!isActiveConversation.current) return;
      setVoiceState('recording'); // briefly show "recording" state while blob is built
      await processTurn(audioBlob);
    });
  }, [startLiveCaptions, startRecording, processTurn]);

  // ── Public API ────────────────────────────────────────────────────────────
  const startConversation = useCallback(async () => {
    setErrorMessage(null);
    setVoiceState('requestingPermission');
    isActiveConversation.current = true;

    try {
      await initRecorder();
      startListen();
    } catch (err) {
      console.error('Voice start error:', err);
      setErrorMessage('Microphone access denied. Please allow microphone access and try again.');
      setVoiceState('error');
      isActiveConversation.current = false;
    }
  }, [initRecorder, startListen]);

  const stopConversation = useCallback(() => {
    isActiveConversation.current = false;
    abortRecording();
    abortLiveCaptions();
    audioPlayer.stop();
    setVoiceState('idle');
    setFinalTranscript('');
    setLiveTranscript('');
  }, [abortRecording, abortLiveCaptions]);

  // If AI is speaking, user can interrupt and start speaking immediately
  const interrupt = useCallback(() => {
    if (voiceState === 'speaking') {
      audioPlayer.stop();
      if (onSpeechInterrupted) onSpeechInterrupted();
      startListen();
    }
  }, [voiceState, onSpeechInterrupted, startListen]);

  // Let the user manually stop recording (finish speaking early)
  const handleProcessSpeech = useCallback(() => {
    if (isRecording) stopRecording();
  }, [isRecording, stopRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { stopConversation(); };
  }, [stopConversation]);

  return {
    isSupported: true,
    voiceState,
    liveTranscript,
    finalTranscript,
    errorMessage,
    startConversation,
    stopConversation,
    interrupt,
    handleProcessSpeech,
  };
}
