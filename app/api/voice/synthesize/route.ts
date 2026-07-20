import { NextResponse } from 'next/server';
import { sarvamService, SarvamServiceError } from '@/lib/services/sarvam.service';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.text || typeof body.text !== 'string') {
      return NextResponse.json({ error: 'Valid text is required' }, { status: 400 });
    }

    const audioBuffer = await sarvamService.synthesizeSpeech(body.text);
    
    // Return the audio as a binary stream
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error('TTS API Error:', error);
    
    if (error instanceof SarvamServiceError) {
      console.error('Sarvam TTS details:', error.responseBody);
      return NextResponse.json(
        { error: error.message, details: error.responseBody },
        { status: error.statusCode || 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred during synthesis' },
      { status: 500 }
    );
  }
}
