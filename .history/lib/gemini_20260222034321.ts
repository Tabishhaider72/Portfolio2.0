/**
 * Gemini API Utilities
 * Note: Direct API calls are now made in app/api/chat/route.ts
 * This file is kept for reference and can be used for client-side utilities
 */

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
    /new chat/i,
    /reset/i,
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(input)) {
      console.warn('Potential prompt injection detected');
      return false;
    }
  }

  return true;
}

/**
 * Format error message for display
 * @param error - Error to format
 * @returns Safe error message
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Don't expose sensitive details
    if (error.message.includes('API key')) {
      return 'Configuration error. Please check server setup.';
    }
    if (error.message.includes('429')) {
      return 'Rate limited. Please wait a moment and try again.';
    }
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
}
