export class SarvamServiceError extends Error {
  constructor(message: string, public statusCode?: number, public responseBody?: any) {
    super(message);
    this.name = 'SarvamServiceError';
  }
}

export const sarvamService = {
  /**
   * Transcribes audio using Sarvam STT.
   * @param formData Form data containing the audio file.
   * @returns Transcribed text string.
   */
  async transcribeAudio(formData: FormData): Promise<string> {
    const apiKey = process.env.SARVAM_API_KEY;
    if (!apiKey) {
      throw new SarvamServiceError('SARVAM_API_KEY is not configured', 500);
    }

    try {
      // Reconstruct FormData with clean MIME type (Sarvam rejects 'audio/webm;codecs=opus')
      const outgoingData = new FormData();
      const file = formData.get('file') as Blob | File;
      if (file) {
        // Strip the codec parameter — Sarvam only accepts the base MIME type like 'audio/webm'
        const rawType = file.type.split(';')[0].trim() || 'audio/webm';
        const cleanBlob = new Blob([await file.arrayBuffer()], { type: rawType });
        outgoingData.append('file', cleanBlob, 'audio.webm');
      }
      outgoingData.append('model', (formData.get('model') as string) || 'saaras:v3');

      const response = await fetch('https://api.sarvam.ai/speech-to-text', {
        method: 'POST',
        headers: {
          'api-subscription-key': apiKey,
        },
        body: outgoingData,
      });

      if (!response.ok) {
        let errorBody;
        try {
          errorBody = await response.json();
        } catch {
          errorBody = await response.text();
        }
        throw new SarvamServiceError(`Sarvam STT failed: ${response.statusText}`, response.status, errorBody);
      }

      const data = await response.json();
      
      // Expected response structure: { transcript: "...", ... }
      if (data && data.transcript) {
        return data.transcript;
      }
      
      throw new SarvamServiceError('Invalid response format from Sarvam STT', 500, data);
    } catch (error) {
      if (error instanceof SarvamServiceError) throw error;
      throw new SarvamServiceError(error instanceof Error ? error.message : 'Unknown STT error', 500);
    }
  },

  /**
   * Synthesizes text to speech using Sarvam TTS.
   * @param text Text to convert to speech.
   * @returns Audio buffer as ArrayBuffer.
   */
  async synthesizeSpeech(text: string): Promise<ArrayBuffer> {
    const apiKey = process.env.SARVAM_API_KEY;
    if (!apiKey) {
      throw new SarvamServiceError('SARVAM_API_KEY is not configured', 500);
    }

    try {
      const response = await fetch('https://api.sarvam.ai/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-subscription-key': apiKey,
        },
        body: JSON.stringify({
          text,                              // Required: single string (not array)
          target_language_code: 'en-IN',
          speaker: 'aditya',                // male voice (valid bulbul:v3 speaker)
          model: 'bulbul:v3',
          enable_preprocessing: true,
        }),
      });

      if (!response.ok) {
        let errorBody;
        try {
          errorBody = await response.json();
        } catch {
          errorBody = await response.text();
        }
        throw new SarvamServiceError(`Sarvam TTS failed: ${response.statusText}`, response.status, errorBody);
      }

      const data = await response.json();
      
      // The Bulbul TTS API returns a base64-encoded WAV in data.audios[0]
      if (data && data.audios && data.audios.length > 0) {
        const base64Audio = data.audios[0];
        // Use Buffer.from (Node.js) — atob is browser-only and unavailable server-side
        const buffer = Buffer.from(base64Audio, 'base64');
        return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      }

      throw new SarvamServiceError('Invalid response format from Sarvam TTS', 500, data);
    } catch (error) {
      if (error instanceof SarvamServiceError) throw error;
      throw new SarvamServiceError(error instanceof Error ? error.message : 'Unknown TTS error', 500);
    }
  }
};
