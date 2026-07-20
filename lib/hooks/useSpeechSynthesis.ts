'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useSpeechSynthesis() {
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!window.speechSynthesis) {
      setIsSupported(false);
      return;
    }

    synthRef.current = window.speechSynthesis;

    const updateVoices = () => {
      if (synthRef.current) {
        setVoices(synthRef.current.getVoices());
      }
    };

    updateVoices();
    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = updateVoices;
    }

    // Cleanup: cancel speech on unmount
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!synthRef.current || !isSupported) return;

    // Clean up markdown syntax for better speech
    // Remove code blocks, bold markers, etc., so it sounds natural
    const cleanText = text
      .replace(/```[\s\S]*?```/g, 'code block')
      .replace(/`/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // link text only
      .replace(/<[^>]*>?/gm, ''); // strip HTML

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Configurable options can be extended here
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Try to find a good English voice
    if (voices.length > 0) {
      const preferredVoice = voices.find(
        (v) => v.lang.startsWith('en-') && (v.name.includes('Daniel') || v.name.includes('Alex') || v.name.includes('David') || v.name.includes('Brian') || v.name.includes('Male'))
      ) || voices.find((v) => v.lang.startsWith('en-') && v.name.includes('Google UK English Male'));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }

    utterance.onstart = () => setIsSpeaking(true);
    
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error', e);
      setIsSpeaking(false);
      if (onEnd) onEnd(); // gracefully recover
    };

    // Cancel any ongoing speech before starting new one
    synthRef.current.cancel();
    synthRef.current.speak(utterance);
  }, [isSupported, voices]);

  const cancel = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isSupported,
    isSpeaking,
    speak,
    cancel,
    voices
  };
}
