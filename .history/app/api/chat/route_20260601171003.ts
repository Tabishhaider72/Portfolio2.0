/**
 * API Route: POST /api/chat
 * Handles chat messages and communicates with Google Gemini API
 */

import { GoogleGenAI } from '@google/genai';
import { RESUME_CONTEXT, SYSTEM_PROMPT } from '@/lib/resumeContext';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// Rate limiting: simple in-memory store
const messageTimestamps = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000;
const RATE_LIMIT_MAX_MESSAGES = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = messageTimestamps.get(ip) || [];
  const recentTimestamps = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW);

  if (recentTimestamps.length >= RATE_LIMIT_MAX_MESSAGES) {
    return false;
  }

  recentTimestamps.push(now);
  messageTimestamps.set(ip, recentTimestamps);
  return true;
}

function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded
    ? forwarded.split(',')[0]
    : request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request: Request) {
  try {
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return Response.json(
        { error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return Response.json({ error: 'Valid message is required' }, { status: 400 });
    }

    if (message.length > 5000) {
      return Response.json(
        { error: 'Message is too long (max 5000 characters)' },
        { status: 400 }
      );
    }

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: `${SYSTEM_PROMPT}\n\nRESUME DATA:\n${RESUME_CONTEXT}`,
      },
    });

    const reply = response.text;

    if (!reply) {
      return Response.json({ error: 'No response from AI' }, { status: 500 });
    }

    return Response.json({ success: true, message: reply });

  } catch (error) {
    console.error('Chat API Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred.';
    return Response.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  return Response.json(
    { success: false, error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}