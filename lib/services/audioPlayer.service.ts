export class AudioPlayerService {
  private audioContext: AudioContext | null = null;
  private currentSource: AudioBufferSourceNode | null = null;
  private _isPlaying = false;

  get isPlaying() {
    return this._isPlaying;
  }

  /**
   * Initializes the AudioContext if it hasn't been initialized yet.
   * This should ideally be called in response to a user interaction.
   */
  private initContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  /**
   * Plays the given audio buffer.
   * @param arrayBuffer The audio data returned from the server (e.g., WAV).
   * @param onEnded Callback invoked when playback finishes naturally.
   */
  async play(arrayBuffer: ArrayBuffer, onEnded?: () => void): Promise<void> {
    this.stop(); // Stop any currently playing audio
    this.initContext();

    try {
      const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
      this.currentSource = this.audioContext!.createBufferSource();
      this.currentSource.buffer = audioBuffer;
      this.currentSource.connect(this.audioContext!.destination);

      this._isPlaying = true;

      this.currentSource.onended = () => {
        this._isPlaying = false;
        this.currentSource = null;
        if (onEnded) onEnded();
      };

      this.currentSource.start(0);
    } catch (error) {
      this._isPlaying = false;
      this.currentSource = null;
      console.error('Failed to play audio:', error);
      throw error;
    }
  }

  /**
   * Stops the currently playing audio.
   */
  stop(): void {
    if (this.currentSource && this._isPlaying) {
      try {
        this.currentSource.onended = null; // Prevent onEnded from firing manually
        this.currentSource.stop();
      } catch (e) {
        // Ignore if already stopped
      }
      this.currentSource = null;
      this._isPlaying = false;
    }
  }
}

export const audioPlayer = new AudioPlayerService();
