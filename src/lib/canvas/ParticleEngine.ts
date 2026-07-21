import { PlaygroundParticle } from "@/types/canvas";

export class ParticleEngine {
  private particles: PlaygroundParticle[] = [];

  public emit(
    x: number,
    y: number,
    color: string,
    count: number = 3,
    speedFactor: number = 1,
    isMagic: boolean = false,
  ) {
    const magicColors = ["#FF2A85", "#00F0FF", "#FFE600", "#7000FF", "#00FF66"];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 2 + 1) * speedFactor;
      const particleColor = isMagic
        ? magicColors[Math.floor(Math.random() * magicColors.length)]
        : color;

      this.particles.push({
        id: Math.random().toString(36).substring(2, 9),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        color: particleColor,
        alpha: 1,
        life: 0,
        maxLife: Math.floor(Math.random() * 30 + 20),
      });
    }
  }

  public emitBurst(x: number, y: number, count: number = 40) {
    const colors = [
      "#FF2A85",
      "#00F0FF",
      "#FFE600",
      "#7000FF",
      "#00FF66",
      "#FF5500",
    ];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.particles.push({
        id: Math.random().toString(36).substring(2, 9),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 0,
        maxLife: Math.floor(Math.random() * 45 + 30),
      });
    }
  }

  public updateAndDraw(ctx: CanvasRenderingContext2D) {
    if (this.particles.length === 0) return;

    ctx.save();
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05; // slight gravity force
      p.life++;
      p.alpha = Math.max(0, 1 - p.life / p.maxLife);
      p.size = Math.max(0.5, p.size * 0.96);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();

      if (p.life >= p.maxLife || p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }
    ctx.restore();
  }

  public clear() {
    this.particles = [];
  }
}
