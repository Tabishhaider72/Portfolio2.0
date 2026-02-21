/**
 * MessageBubble.tsx
 * Individual message component for chat display
 * Supports user and assistant messages with proper styling
 */

'use client';

import { useMemo } from 'react';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export default function MessageBubble({ role, content, timestamp }: MessageBubbleProps) {
  const isUser = role === 'user';
  
  // Memoize formatted time to prevent hydration mismatch
  const formattedTime = useMemo(() => {
    return timestamp ? formatTime(timestamp) : null;
  }, [timestamp]);

  return (
    <div
      className={`flex w-full gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
      role="article"
      aria-label={`${isUser ? 'Your message' : 'Assistant message'}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
          isUser ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-purple-500 to-indigo-600'
        }`}
      >
        {isUser ? 'You' : 'AI'}
      </div>

      {/* Message Bubble */}
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg font-roboto-flex text-sm leading-relaxed ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{content}</p>

        {/* Timestamp */}
        {formattedTime && (
          <p
            className={`text-xs mt-1.5 ${
              isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {formattedTime}
          </p>
        )}
      </div>
    </div>
  );
}
