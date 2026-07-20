import { NextResponse } from 'next/server';
import { sarvamService, SarvamServiceError } from '@/lib/services/sarvam.service';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Ensure we have a file
    const file = formData.get('file');
    if (!file) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    const transcript = await sarvamService.transcribeAudio(formData);
    
    return NextResponse.json({ transcript });
  } catch (error) {
    console.error('STT API Error:', error);
    
    if (error instanceof SarvamServiceError) {
      console.error('Sarvam STT details:', error.responseBody);
      return NextResponse.json(
        { error: error.message, details: error.responseBody },
        { status: error.statusCode || 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred during transcription' },
      { status: 500 }
    );
  }
}
