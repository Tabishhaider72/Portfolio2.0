'use client';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
  isError?: boolean;
}

function parseMarkdown(text: string): string {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^---$/gm, '<hr>')
    .replace(/^[\*\-] (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br />')
    .replace(/^(?!<[hup<]|<li|<hr)(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '');
}

export default function MessageBubble({ role, content, timestamp, isLoading, isError }: MessageBubbleProps) {
  const isUser = role === 'user';
  const timeStr = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex gap-2 items-end ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-medium mb-4 ${
          isUser
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700'
            : 'bg-black dark:bg-white text-white dark:text-black'
        }`}
      >
        {isUser ? 'You' : 'AI'}
      </div>

      <div className={`flex flex-col gap-1 max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Bubble */}
        <div
          className={`px-3 py-2 rounded-xl text-sm leading-relaxed ${
            isUser
              ? 'bg-black dark:bg-white text-white dark:text-black rounded-br-sm'
              : isError
              ? 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900 rounded-bl-sm'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm'
          }`}
        >
          {isLoading ? (
            <div className="flex gap-1 items-center py-0.5">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          ) : isUser ? (
            <p>{content}</p>
          ) : (
            <div
              className="prose-sm prose-headings:font-medium prose-headings:text-sm prose-code:text-xs prose-code:bg-gray-200 dark:prose-code:bg-gray-700 prose-code:px-1 prose-code:rounded prose-ul:pl-4 prose-li:my-0.5"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
            />
          )}
        </div>

        {/* Timestamp */}
        {!isLoading && (
          <span className="text-[10px] text-gray-400 px-1">{timeStr}</span>
        )}
      </div>
    </div>
  );
}