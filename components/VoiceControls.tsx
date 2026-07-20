'use client';

import { Mic, Loader2, Volume2, AlertCircle, PhoneOff } from 'lucide-react';
import type { VoiceState } from '../lib/hooks/useVoiceConversation';

interface VoiceControlsProps {
  voiceState: VoiceState;
  liveTranscript: string;
  finalTranscript: string;
  errorMessage: string | null;
  onStop: () => void;
  onInterrupt: () => void;
  onManualSubmit: () => void;
}

const STATE_LABELS: Partial<Record<VoiceState, string>> = {
  requestingPermission: 'Requesting mic access…',
  listening:            'Listening…',
  recording:            'Listening…',
  transcribing:         'Understanding…',
  thinking:             'Thinking…',
  generatingVoice:      'Generating response…',
  speaking:             'Speaking…',
};

export default function VoiceControls({
  voiceState,
  liveTranscript,
  finalTranscript,
  errorMessage,
  onStop,
  onInterrupt,
  onManualSubmit,
}: VoiceControlsProps) {

  // ─── Error state ──────────────────────────────────────────────────────────
  if (voiceState === 'error') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 px-6">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-red-500" />
        </div>
        <p className="text-sm text-center text-red-600 dark:text-red-400 max-w-[220px] leading-snug">
          {errorMessage || 'Voice mode unavailable. Please try again.'}
        </p>
        <button
          onClick={onStop}
          className="text-xs font-medium px-4 py-2 rounded-full border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          Return to Chat
        </button>
      </div>
    );
  }

  const isListening = voiceState === 'listening' || voiceState === 'recording';
  const isSpeaking  = voiceState === 'speaking';
  const isLoading   = ['requestingPermission', 'transcribing', 'thinking', 'generatingVoice'].includes(voiceState);
  const label       = STATE_LABELS[voiceState] ?? '';

  // Displayed text: interim (live) while listening, final after that
  const displayText = isListening ? (liveTranscript || '') : (finalTranscript || '');

  return (
    <div className="flex flex-col items-center justify-between h-full px-4 py-6">

      {/* ── Top spacer ── */}
      <div className="flex-1" />

      {/* ── Central orb + status ── */}
      <div className="flex flex-col items-center gap-4">

        {/* Orb */}
        <div
          className={`relative flex items-center justify-center rounded-full transition-all duration-500 ${
            isListening
              ? 'w-20 h-20 bg-blue-500/10 dark:bg-blue-400/10 cursor-pointer'
              : isSpeaking
              ? 'w-20 h-20 bg-green-500/10 dark:bg-green-400/10 cursor-pointer'
              : 'w-16 h-16 bg-gray-100 dark:bg-gray-800'
          }`}
          onClick={isListening ? onManualSubmit : isSpeaking ? onInterrupt : undefined}
          role={isListening || isSpeaking ? 'button' : undefined}
          tabIndex={isListening || isSpeaking ? 0 : undefined}
          aria-label={isListening ? 'Finish speaking' : isSpeaking ? 'Interrupt' : undefined}
        >
          {/* Ripple ring — only while listening or speaking */}
          {(isListening || isSpeaking) && (
            <span className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
              isListening ? 'bg-blue-500' : 'bg-green-500'
            }`} />
          )}

          {/* Inner icon */}
          {isListening && (
            <Mic className="w-7 h-7 text-blue-500 dark:text-blue-400" />
          )}
          {isSpeaking && (
            <Volume2 className="w-7 h-7 text-green-500 dark:text-green-400" />
          )}
          {isLoading && (
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
          )}
        </div>

        {/* Status label */}
        {label && (
          <p className={`text-[11px] font-semibold uppercase tracking-widest ${
            isListening ? 'text-blue-500 dark:text-blue-400 animate-pulse' :
            isSpeaking  ? 'text-green-500 dark:text-green-400 animate-pulse' :
            'text-gray-400'
          }`}>
            {label}
          </p>
        )}

        {/* ── Live transcript ── */}
        {displayText ? (
          <div className="w-full max-w-[260px] text-center mt-1">
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 font-light">
              {displayText}
              {isListening && (
                <span className="opacity-40 animate-pulse ml-1">|</span>
              )}
            </p>
          </div>
        ) : isListening ? (
          <p className="text-xs text-gray-400 italic mt-1">Start speaking…</p>
        ) : null}
      </div>

      {/* ── Bottom spacer ── */}
      <div className="flex-1" />

      {/* ── End button ── */}
      <button
        onClick={onStop}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors shadow-sm"
        aria-label="End voice mode"
      >
        <PhoneOff className="w-3.5 h-3.5" />
        End Voice Mode
      </button>
    </div>
  );
}
