'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// TypeScript declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  onstart: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition?: {
      new (): SpeechRecognition;
    };
  }
}

export function useSpeechRecognition() {
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isIntentionalStop = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true; // We manage restarts manually if needed, or rely on continuous
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalStr = '';
      let interimStr = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalStr += event.results[i][0].transcript;
        } else {
          interimStr += event.results[i][0].transcript;
        }
      }
      
      if (finalStr) {
        setTranscript((prev) => prev + (prev ? ' ' : '') + finalStr);
      }
      setInterimTranscript(interimStr);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      // 'no-speech' is common and not really a fatal error, just silence
      // 'aborted' happens intentionally when we call recognition.abort() or recognition.stop()
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        console.error('Speech recognition error', event.error, event.message);
        setError(event.error);
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      // If we didn't intentionally stop it and it ended (e.g. timeout), 
      // the orchestrator (useVoiceConversation) will decide whether to restart.
    };

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      isIntentionalStop.current = false;
      setTranscript('');
      setInterimTranscript('');
      setError(null);
      recognitionRef.current.start();
    } catch (err) {
      console.error('Failed to start recognition', err);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      isIntentionalStop.current = true;
      recognitionRef.current.stop();
    } catch (err) {
      console.error('Failed to stop recognition', err);
    }
  }, []);
  
  const abortListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      isIntentionalStop.current = true;
      recognitionRef.current.abort();
    } catch (err) {
      console.error('Failed to abort recognition', err);
    }
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    startListening,
    stopListening,
    abortListening,
    clearTranscript
  };
}
