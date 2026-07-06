'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Minus, Maximize2, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
  isError?: boolean;
}

function createInitialMessage(): Message {
  return {
    id: '0',
    role: 'assistant',
    content: "Hi there! I'm here to answer questions about **Sayed's** experience, skills, and projects.\n\nFeel free to ask anything!",
    timestamp: new Date(),
  };
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([createInitialMessage()]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (userMessage: string) => {
    setHasInteracted(true);

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    const loadingMsg: Message = {
      id: `loading-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to get response');
      if (!data.message && !data.reply) throw new Error('Invalid response format');

      const replyText = data.message || data.reply;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading ? { ...msg, content: replyText, isLoading: false } : msg
        )
      );
    } catch (err) {
      const errorText = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading
            ? { ...msg, content: errorText, isLoading: false, isError: true }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([createInitialMessage()]);
    setHasInteracted(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-14 h-14 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center transition-all duration-300 hover:scale-105 ${
          isOpen ? 'opacity-0 pointer-events-none translate-y-10' : 'opacity-100 translate-y-0'
        }`}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
        <span className="absolute 1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-950" style={{ top: '2px', right: '2px' }} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] md:w-[750px] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
        } ${isMinimized ? 'h-auto' : 'h-[80vh] max-h-[700px]'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-black dark:bg-white flex items-center justify-center">
              <MessageCircle size={13} className="text-white dark:text-black" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Syed&apos;s Assistant</p>
              <p className="text-[10px] text-gray-400">Ask about my work</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Clear chat"
              aria-label="Clear chat"
            >
              <RefreshCw size={13} />
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 size={13} /> : <Minus size={13} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close"
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Messages */}
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" role="log" aria-live="polite">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.timestamp}
                  isLoading={msg.isLoading}
                  isError={msg.isError}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 dark:border-gray-800 px-3 py-3">
              <ChatInput
                onSubmit={handleSendMessage}
                disabled={isLoading}
                placeholder="Ask about experience, skills, projects…"
              />
              {hasInteracted && (
                <p className="text-[10px] text-gray-400 text-right mt-1.5 pr-1">
                  Enter to send · Shift+Enter for new line
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}