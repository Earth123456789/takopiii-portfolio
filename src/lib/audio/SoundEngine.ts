/**
 * SoundEngine.ts
 * Synthesized Web Audio API sound generator.
 * Provides latency-free ambient audio feedback (brush strokes, clicks, hover ticks, bursts)
 * without needing external audio file downloads.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private brushNoiseNode: AudioBufferSourceNode | null = null;
  private brushGainNode: GainNode | null = null;
  private brushFilterNode: BiquadFilterNode | null = null;
  private isBrushPlaying: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user interaction to comply with browser autoplay policies.
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isBrushPlaying) {
      this.stopBrushSound();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Continuous brush sound modulated by drawing speed
   */
  public startBrushSound(speed: number = 1) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    if (!this.isBrushPlaying) {
      try {
        // Generate 1 sec white noise buffer
        const bufferSize = this.ctx.sampleRate;
        const buffer = this.ctx.createBuffer(
          1,
          bufferSize,
          this.ctx.sampleRate,
        );
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        this.brushNoiseNode = this.ctx.createBufferSource();
        this.brushNoiseNode.buffer = buffer;
        this.brushNoiseNode.loop = true;

        this.brushFilterNode = this.ctx.createBiquadFilter();
        this.brushFilterNode.type = "bandpass";
        this.brushFilterNode.frequency.setValueAtTime(
          600,
          this.ctx.currentTime,
        );
        this.brushFilterNode.Q.setValueAtTime(1.5, this.ctx.currentTime);

        this.brushGainNode = this.ctx.createGain();
        const initialGain = Math.min(0.08, Math.max(0.01, speed * 0.02));
        this.brushGainNode.gain.setValueAtTime(
          initialGain,
          this.ctx.currentTime,
        );

        this.brushNoiseNode.connect(this.brushFilterNode);
        this.brushFilterNode.connect(this.brushGainNode);
        this.brushGainNode.connect(this.ctx.destination);

        this.brushNoiseNode.start();
        this.isBrushPlaying = true;
      } catch (e) {
        console.warn("AudioContext error:", e);
      }
    } else if (this.brushGainNode && this.brushFilterNode) {
      // Modulate frequency & volume dynamically with velocity
      const targetGain = Math.min(0.12, Math.max(0.01, speed * 0.025));
      const targetFreq = Math.min(1800, Math.max(400, 500 + speed * 40));
      this.brushGainNode.gain.setTargetAtTime(
        targetGain,
        this.ctx.currentTime,
        0.05,
      );
      this.brushFilterNode.frequency.setTargetAtTime(
        targetFreq,
        this.ctx.currentTime,
        0.05,
      );
    }
  }

  public stopBrushSound() {
    if (this.isBrushPlaying && this.brushNoiseNode && this.ctx) {
      try {
        if (this.brushGainNode) {
          this.brushGainNode.gain.setTargetAtTime(
            0,
            this.ctx.currentTime,
            0.05,
          );
        }
        setTimeout(() => {
          if (this.brushNoiseNode) {
            this.brushNoiseNode.stop();
            this.brushNoiseNode.disconnect();
            this.brushNoiseNode = null;
          }
          this.isBrushPlaying = false;
        }, 60);
      } catch {
        this.isBrushPlaying = false;
      }
    }
  }

  /**
   * Resonant UI Tap sound
   */
  public playTapSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        220,
        this.ctx.currentTime + 0.08,
      );

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        this.ctx.currentTime + 0.08,
      );

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  /**
   * Soft subtle hover tick
   */
  public playHoverSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        this.ctx.currentTime + 0.03,
      );

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {}
  }

  /**
   * Explosive burst chime (for color burst / magic effects)
   */
  public playBurstSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, idx) => {
      try {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.04);

        gain.gain.setValueAtTime(0.06, this.ctx!.currentTime + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          this.ctx!.currentTime + idx * 0.04 + 0.2,
        );

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.04);
        osc.stop(this.ctx!.currentTime + idx * 0.04 + 0.2);
      } catch {}
    });
  }
}

export const soundEngine = new SoundEngine();
