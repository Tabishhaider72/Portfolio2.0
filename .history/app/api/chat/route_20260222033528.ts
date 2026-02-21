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

import { NextRequest, NextResponse } from 'next/server';
import { sendMessageToGemini, validateUserInput } from '@/lib/gemini';
import { RESUME_DATA, SYSTEM_PROMPT } from '@/lib/resumeContext';

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
 * @param request - NextRequest object
 * @returns Client IP address
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return ip;
}

/**
 * Format resume data for Gemini context
 * This creates a comprehensive context string
 */
function formatResumeContext(): string {
  return `
RESUME DATA FOR ${RESUME_DATA.personalInfo.name}:

ABOUT:
${RESUME_DATA.about}

TECH STACK:
- Frontend: ${RESUME_DATA.techStack.frontend.join(', ')}
- Backend: ${RESUME_DATA.techStack.backend.join(', ')}
- Database: ${RESUME_DATA.techStack.database.join(', ')}
- Tools: ${RESUME_DATA.techStack.tools.join(', ')}
- AI Tools: ${RESUME_DATA.techStack.aiTools.join(', ')}

EXPERIENCE:
${RESUME_DATA.experience
  .map(
    (exp) => `
${exp.role} at ${exp.company}
Duration: ${exp.duration}
Highlights: ${exp.highlights.join(' | ')}
`
  )
  .join('\n')}

PROJECTS:
${RESUME_DATA.projects
  .map(
    (proj) => `
${proj.title} (${proj.year})
Description: ${proj.description}
Technologies: ${proj.technologies.join(', ')}
Role: ${proj.role}
`
  )
  .join('\n')}

SKILLS:
- Languages: ${RESUME_DATA.skills.languages.join(', ')}
- Frameworks: ${RESUME_DATA.skills.frameworks.join(', ')}
- Databases: ${RESUME_DATA.skills.databases.join(', ')}
- Methodologies: ${RESUME_DATA.skills.methodologies.join(', ')}

EDUCATION:
${RESUME_DATA.education.degree} in ${RESUME_DATA.education.field} (${RESUME_DATA.education.status})

CONTACT:
Email: ${RESUME_DATA.personalInfo.email}
LinkedIn: ${RESUME_DATA.personalInfo.linkedIn}
GitHub: ${RESUME_DATA.personalInfo.github}
Portfolio: ${RESUME_DATA.personalInfo.portfolio}
`;
}

/**
 * POST handler for chat messages
 */
export async function POST(request: NextRequest) {
  try {
    // Check rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        {
          success: false,
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
      return NextResponse.json(
        {
          success: false,
          error: 'Message is required',
        },
        { status: 400 }
      );
    }

    // Validate user input for security
    if (!validateUserInput(message)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid message format',
        },
        { status: 400 }
      );
    }

    // Combine system prompt with resume context
    const fullSystemPrompt = `${SYSTEM_PROMPT}\n\n${formatResumeContext()}`;

    // Send to Gemini
    const response = await sendMessageToGemini(message, fullSystemPrompt);

    return NextResponse.json({
      success: true,
      message: response,
    });
  } catch (error) {
    console.error('Chat API Error:', error);

    // Return safe error message
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';

    return NextResponse.json(
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
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Use POST to send messages.',
    },
    { status: 405 }
  );
}
