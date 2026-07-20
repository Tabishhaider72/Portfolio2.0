import { useState, useCallback, useEffect } from 'react';
import { recorderService } from '../services/recorder.service';

export function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Initialize and request permission
  const initRecorder = useCallback(async () => {
    try {
      setError(null);
      await recorderService.requestPermission();
      setIsReady(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Microphone access denied');
      setIsReady(false);
      throw err; // Allow caller to handle
    }
  }, []);

  const startRecording = useCallback((onStop: (audioBlob: Blob) => void) => {
    try {
      setError(null);
      recorderService.start((blob) => {
        setIsRecording(false);
        onStop(blob);
      });
      setIsRecording(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording');
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    recorderService.stop();
    // state will update in the onStop callback passed to startRecording
  }, []);

  const abortRecording = useCallback(() => {
    recorderService.abort();
    setIsRecording(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recorderService.cleanup();
      setIsRecording(false);
      setIsReady(false);
    };
  }, []);

  return {
    isReady,
    isRecording,
    error,
    initRecorder,
    startRecording,
    stopRecording,
    abortRecording
  };
}
