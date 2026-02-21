/**
 * API Route: POST /api/chat
 * Handles chat messages and communicates with Gemini API
 * 
 * Security:
 * - API key never exposed to client
 * - Input validation on server
 * - Rate limiting protection
 * - Error handling for safe responses
 */

import { GoogleGenAI } from '@google/genai';
import { RESUME_CONTEXT } from '@/lib/resumeContext';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// Rate limiting: simple in-memory store (in production, use Redis)
const messageTimestamps = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_MESSAGES = 10; // 10 messages per minute

/**
 * Check rate limiting for IP address
 * @param ip - Client IP address
 * @returns true if request is allowed
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = messageTimestamps.get(ip) || [];

  // Remove timestamps outside the window
  const recentTimestamps = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW);

  if (recentTimestamps.length >= RATE_LIMIT_MAX_MESSAGES) {
    return false;
  }

  // Add current timestamp
  recentTimestamps.push(now);
  messageTimestamps.set(ip, recentTimestamps);

  return true;
}

/**
 * Get client IP address
 * @param request - Request object
 * @returns Client IP address
 */
function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return ip;
}

/**
 * POST handler for chat messages
 */
export async function POST(request: Request) {
  try {
    // Check rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return Response.json(
        {
          error: 'Too many requests. Please wait a moment before sending another message.',
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { message } = body;

    // Validate input
    if (!message) {
      return Response.json(
        {
          error: 'Message is required',
        },
        { status: 400 }
      );
    }

    if (typeof message !== 'string') {
      return Response.json(
        {
          error: 'Message must be a string',
        },
        { status: 400 }
      );
    }

    if (message.trim().length === 0) {
      return Response.json(
        {
          error: 'Message cannot be empty',
        },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return Response.json(
        {
          error: 'Message is too long (max 5000 characters)',
        },
        { status: 400 }
      );
    }

    // Call Gemini API with resume context
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents: `You are a portfolio assistant for Sayed Tabish Haider.

CRITICAL RULES:
- Only answer questions about Sayed using the resume data below
- If the question is unrelated to Sayed, politely decline and redirect
- Never invent or hallucinate information not in the resume
- Keep responses concise (2-3 sentences max, except for detailed project questions)
- Be professional but friendly

RESUME DATA:
${RESUME_CONTEXT}

User Question:
${message}`,
    });

    const reply = response.text();

    if (!reply) {
      return Response.json(
        {
          error: 'No response from AI',
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: reply,
    });
  } catch (error) {
    console.error('Chat API Error:', error);

    // Return safe error message
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';

    return Response.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return Response.json(
    {
      success: false,
      error: 'Method not allowed. Use POST to send messages.',
    },
    { status: 405 }
  );
}
