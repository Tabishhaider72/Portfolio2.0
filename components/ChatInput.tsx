'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUp, Mic } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (message: string) => Promise<any>;
  disabled?: boolean;
  placeholder?: string;
  onVoiceClick?: () => void;
  isVoiceSupported?: boolean;
}

export default function ChatInput({ onSubmit, disabled = false, placeholder, onVoiceClick, isVoiceSupported }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 100) + 'px';
    }
  }, [message]);

  const handleSubmit = async () => {
    const trimmed = message.trim();
    if (!trimmed || trimmed.length > 5000) return;
    setIsSubmitting(true);
    try {
      await onSubmit(trimmed);
      setMessage('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2 items-end">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || isSubmitting}
        rows={1}
        className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm resize-none focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400 text-gray-900 dark:text-gray-100"
        aria-label="Message input"
      />
      
      {isVoiceSupported && onVoiceClick && !message.trim() && (
        <button
          onClick={onVoiceClick}
          disabled={disabled || isSubmitting}
          className="w-8 h-8 mb-0.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Start Voice Mode"
          title="Start Voice Mode"
        >
          <Mic size={14} />
        </button>
      )}

      <button
        onClick={handleSubmit}
        disabled={disabled || isSubmitting || !message.trim()}
        className="w-8 h-8 mb-0.5 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-75 transition-opacity"
        aria-label="Send"
      >
        {isSubmitting
          ? <span className="w-3 h-3 border border-white dark:border-black border-t-transparent rounded-full animate-spin" />
          : <ArrowUp size={14} />
        }
      </button>
    </div>
  );
}