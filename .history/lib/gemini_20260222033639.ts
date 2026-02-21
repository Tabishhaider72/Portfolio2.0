/**
 * Gemini API Client
 * Handles server-side Gemini API initialization and message sending
 * Never expose API key to client
 */

import { GoogleGenerativeAI } from '@google/genai';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is required');
}

const client = new GoogleGenerativeAI({ apiKey: API_KEY });

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Send a message to Gemini with resume context
 * @param userMessage - The user's question
 * @param systemContext - System prompt with resume data
 * @returns Promise with Gemini's response
 */
export async function sendMessageToGemini(
  userMessage: string,
  systemContext: string
): Promise<string> {
  try {
    // Validate input
    if (!userMessage || userMessage.trim().length === 0) {
      throw new Error('Message cannot be empty');
    }

    if (userMessage.length > 5000) {
      throw new Error('Message is too long (max 5000 characters)');
    }

    // Initialize the model
    const model = client.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemContext,
    });

    // Send message with configuration
    const response = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: userMessage }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_NONE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_NONE',
        },
        {
          category: 'HARM_CATEGORY_SEXUAL_CONTENT',
          threshold: 'BLOCK_NONE',
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_NONE',
        },
      ],
    });

    // Extract text from response
    const text = response.response.text();

    if (!text) {
      throw new Error('No response from Gemini');
    }

    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('API configuration error. Please check environment variables.');
      }
      if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(error.message);
    }

    throw new Error('Failed to get response from AI assistant');
  }
}

/**
 * Validate user input for security
 * @param input - User input to validate
 * @returns true if input is safe
 */
export function validateUserInput(input: string): boolean {
  if (!input || input.trim().length === 0) {
    return false;
  }

  if (input.length > 5000) {
    return false;
  }

  // Basic prompt injection prevention
  const injectionPatterns = [
    /ignore.*instructions/i,
    /system.*prompt/i,
    /disregard/i,
    /forget.*about/i,
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(input)) {
      console.warn('Potential prompt injection detected:', input);
      return false;
    }
  }

  return true;
}
