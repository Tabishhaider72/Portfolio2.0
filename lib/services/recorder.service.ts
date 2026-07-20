const SILENCE_THRESHOLD = 0.01;       // RMS volume below this = silence
const SILENCE_DURATION_MS = 1800;      // Stop after 1.8s of continuous silence
const MIN_RECORDING_MS = 500;          // Don't stop earlier than 0.5s (avoid cut-off)
const MAX_RECORDING_MS = 25000;        // Hard cap at 25s (Sarvam limit is 30s)

export class RecorderService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private silenceTimer: ReturnType<typeof setTimeout> | null = null;
  private maxTimer: ReturnType<typeof setTimeout> | null = null;
  private animationFrameId: number | null = null;
  private onStopCallback: ((blob: Blob) => void) | null = null;
  private recordingStartedAt = 0;
  private aborted = false;

  /**
   * Requests microphone permissions and initialises the media stream.
   */
  async requestPermission(): Promise<void> {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Microphone not supported in this browser.');
    }
    this.cleanup();
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 16000 },
      });
    } catch {
      throw new Error('Microphone access denied. Please grant permission.');
    }
  }

  /**
   * Starts recording and auto-stops after silence is detected.
   */
  start(onStop: (audioBlob: Blob) => void): void {
    if (!this.stream) throw new Error('Call requestPermission() first.');

    this.aborted = false;
    this.audioChunks = [];
    this.onStopCallback = onStop;
    this.recordingStartedAt = Date.now();

    const mimeType = this.getSupportedMimeType();
    this.mediaRecorder = new MediaRecorder(this.stream, mimeType ? { mimeType } : {});

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.audioChunks.push(e.data);
    };

    this.mediaRecorder.onstop = () => {
      this.teardownAnalyser();
      if (!this.aborted && this.onStopCallback) {
        const finalMime = this.mediaRecorder?.mimeType || 'audio/webm';
        const blob = new Blob(this.audioChunks, { type: finalMime });
        this.onStopCallback(blob);
      }
    };

    this.mediaRecorder.start(100); // collect chunks every 100ms
    this.setupSilenceDetection();

    // Hard cap
    this.maxTimer = setTimeout(() => this.stop(), MAX_RECORDING_MS);
  }

  /** Called by user clicking "I'm done" or automatically by silence detection. */
  stop(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    this.clearTimers();
  }

  /** Discard everything — user cancelled. */
  abort(): void {
    this.aborted = true;
    this.clearTimers();
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.onstop = null;
      this.mediaRecorder.stop();
    }
    this.audioChunks = [];
    this.teardownAnalyser();
  }

  /** Release microphone tracks entirely. */
  cleanup(): void {
    this.abort();
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
    if (this.audioContext) {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }
    this.mediaRecorder = null;
  }

  // ─── Silence Detection ────────────────────────────────────────────────────

  private setupSilenceDetection(): void {
    if (!this.stream) return;
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = this.audioContext.createMediaStreamSource(this.stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 512;
      source.connect(this.analyser);
      this.pollVolume();
    } catch {
      // If Web Audio API fails, fall back to no silence detection (manual stop only)
    }
  }

  private pollVolume(): void {
    if (!this.analyser) return;

    const dataArray = new Float32Array(this.analyser.fftSize);

    const check = () => {
      if (!this.analyser) return;
      this.analyser.getFloatTimeDomainData(dataArray);

      // Compute RMS
      const rms = Math.sqrt(dataArray.reduce((sum, v) => sum + v * v, 0) / dataArray.length);

      const elapsed = Date.now() - this.recordingStartedAt;

      if (rms < SILENCE_THRESHOLD && elapsed > MIN_RECORDING_MS) {
        // Start silence timer if not already running
        if (!this.silenceTimer) {
          this.silenceTimer = setTimeout(() => {
            this.stop(); // auto-stop after SILENCE_DURATION_MS
          }, SILENCE_DURATION_MS);
        }
      } else {
        // Voice activity detected — reset silence timer
        if (this.silenceTimer) {
          clearTimeout(this.silenceTimer);
          this.silenceTimer = null;
        }
      }

      this.animationFrameId = requestAnimationFrame(check);
    };

    this.animationFrameId = requestAnimationFrame(check);
  }

  private teardownAnalyser(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.analyser) {
      this.analyser.disconnect();
      this.analyser = null;
    }
  }

  private clearTimers(): void {
    if (this.silenceTimer) { clearTimeout(this.silenceTimer); this.silenceTimer = null; }
    if (this.maxTimer)    { clearTimeout(this.maxTimer);    this.maxTimer = null;    }
  }

  private getSupportedMimeType(): string {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/mp4',
    ];
    return types.find((t) => MediaRecorder.isTypeSupported(t)) ?? '';
  }
}

export const recorderService = new RecorderService();
