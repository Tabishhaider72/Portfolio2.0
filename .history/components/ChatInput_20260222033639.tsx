/**
 * ChatInput.tsx
 * Input component for chat messages
 * Handles user input validation and submission
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (message: string) => Promise<void>;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSubmit,
  disabled = false,
  placeholder = "Ask me about Sayed's experience, skills, or projects...",
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    // Validation
    if (!trimmedMessage) {
      return;
    }

    if (trimmedMessage.length > 5000) {
      alert('Message is too long (max 5000 characters)');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(trimmedMessage);
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Cmd/Ctrl + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e as any);
      return;
    }

    // Allow normal Enter for multiline (will be caught by Cmd/Ctrl + Enter)
    if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
      role="search"
      aria-label="Chat input form"
    >
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || isSubmitting}
        rows={1}
        className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg font-roboto-flex text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Message input"
      />

      <button
        type="submit"
        disabled={disabled || isSubmitting || !message.trim()}
        className="flex-shrink-0 px-3 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
        aria-label={isSubmitting ? 'Sending...' : 'Send message'}
        title="Send (Ctrl+Enter)"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </>
        ) : (
          <Send size={18} />
        )}
      </button>
    </form>
  );
}
