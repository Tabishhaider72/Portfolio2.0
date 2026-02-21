/**
 * MessageBubble.tsx
 * Individual message component for chat display
 * Supports user and assistant messages with proper styling
 */

'use client';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export default function MessageBubble({ role, content, timestamp }: MessageBubbleProps) {
  const isUser = role === 'user';

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
        {timestamp && (
          <p
            className={`text-xs mt-1.5 ${
              isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
}
