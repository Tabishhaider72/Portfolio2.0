/**
 * ChatWidget.tsx
 * Main floating chat widget component
 * Production-quality SaaS UI with all required features
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Minimize2, Maximize2, AlertCircle, Loader } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE_CONTENT =
  "Hi! 👋 I'm here to answer questions about Sayed's experience, skills, and projects. Feel free to ask me anything!";

function createInitialMessage(): Message {
  return {
    id: '0',
    role: 'assistant',
    content: INITIAL_MESSAGE_CONTENT,
    timestamp: new Date(),
  };
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Initialize messages on client only to prevent hydration mismatch
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([createInitialMessage()]);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // Optional: Add responsive behavior
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSendMessage = async (userMessage: string) => {
    // Clear previous error
    setError(null);
    setHasInteracted(true);

    // Add user message
    const userMessageObj: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessageObj]);
    setIsLoading(true);

    try {
      // Send to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      if (!data.message && !data.reply) {
        throw new Error('Invalid response format');
      }

      // Handle both "message" and "reply" response formats
      const responseText = data.message || data.reply;

      // Add assistant message
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to send message. Please try again.';

      setError(errorMessage);

      // Add error message to chat
      const errorMessageObj: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setError(null);
    setHasInteracted(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Open chat with Cmd/Ctrl + /
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      setIsOpen(true);
    }

    // Close with Escape
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Chat Widget */}
      <div
        className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
          isOpen ? 'w-96 h-[600px] md:w-[420px] md:h-[600px]' : 'w-auto'
        }`}
      >
        {/* Main Chat Window */}
        <div
          className={`absolute bottom-0 right-0 bg-white dark:bg-gray-950 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 flex flex-col border border-gray-200 dark:border-gray-800 ${
            isOpen && !isMinimized
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          } ${isOpen ? 'w-full h-full' : 'w-96 h-[600px]'}`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">Sayed's Assistant</h3>
                <p className="text-blue-100 text-xs">Ask about my work</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
                title={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? (
                  <Maximize2 size={18} className="text-white" />
                ) : (
                  <Minimize2 size={18} className="text-white" />
                )}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close chat"
                title="Close (Esc)"
              >
                <X size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* Minimized State */}
          {isMinimized ? (
            <div className="flex-1 flex items-center justify-center p-4 text-gray-500 dark:text-gray-400 text-sm">
              Chat minimized
            </div>
          ) : (
            <>
              {/* Messages Container */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/20"
                role="log"
                aria-label="Chat messages"
                aria-live="polite"
              >
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    role={msg.role}
                    content={msg.content}
                    timestamp={msg.timestamp}
                  />
                ))}

                {/* Loading State */}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                      <Loader size={16} className="text-white animate-spin" />
                    </div>
                    <div className="max-w-xs px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="flex gap-2 items-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="flex gap-3 items-start mb-4">
                    <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-red-600 dark:text-red-400 font-medium">Error</p>
                      <p className="text-xs text-red-500 dark:text-red-300 mt-1">{error}</p>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <ChatInput
                onSubmit={handleSendMessage}
                disabled={isLoading}
                placeholder="Ask me about Sayed's experience, skills, or projects..."
              />

              {/* Footer with Clear Button */}
              {hasInteracted && (
                <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
                  <p>💡 Tip: Press Ctrl+Enter to send</p>
                  <button
                    onClick={handleClearChat}
                    className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                  >
                    Clear
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Toggle Button (Floating) */}
        <button
          onClick={() => {
            if (isMinimized) {
              setIsMinimized(false);
            } else {
              setIsOpen(!isOpen);
            }
          }}
          className={`absolute bottom-0 right-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer group ${
            isOpen && !isMinimized ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          title="Chat with Sayed's AI Assistant (Ctrl+/)"
          aria-label="Open chat widget"
          aria-pressed={isOpen}
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />

          {/* Badge */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          )}
        </button>
      </div>

      {/* Keyboard Shortcut Hint (Optional) */}
      {!isOpen && (
        <div className="fixed bottom-20 right-4 z-40 opacity-0 hover:opacity-100 transition-opacity">
          <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
            Press <kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-xs font-mono">Ctrl+/</kbd> to chat
          </div>
        </div>
      )}
    </>
  );
}
