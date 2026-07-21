import { PlaygroundStroke, PlaygroundPoint } from "@/types/canvas";

export class StrokeRenderer {
  public static drawStroke(
    ctx: CanvasRenderingContext2D,
    stroke: PlaygroundStroke,
  ) {
    const {
      points,
      color,
      size,
      opacity,
      tool,
      isGlow,
      stampEmoji,
      shapeType,
    } = stroke;
    if (points.length === 0) return;

    ctx.save();
    ctx.globalAlpha = opacity;

    // Handle Stamp Emojis
    if (tool === "stamp" && stampEmoji) {
      ctx.font = `${size * 3}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const pt of points) {
        ctx.fillText(stampEmoji, pt.x, pt.y);
      }
      ctx.restore();
      return;
    }

    // Handle Shapes
    if (tool === "shape" && shapeType && points.length >= 2) {
      const start = points[0];
      const end = points[points.length - 1];
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const radius = Math.sqrt(dx * dx + dy * dy);

      ctx.strokeStyle = color;
      ctx.fillStyle = color + "33";
      ctx.lineWidth = size;
      ctx.shadowBlur = isGlow ? 15 : 0;
      ctx.shadowColor = color;

      ctx.beginPath();
      if (shapeType === "circle") {
        ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
      } else if (shapeType === "square") {
        ctx.rect(start.x - radius, start.y - radius, radius * 2, radius * 2);
      } else if (shapeType === "triangle") {
        ctx.moveTo(start.x, start.y - radius);
        ctx.lineTo(start.x + radius, start.y + radius);
        ctx.lineTo(start.x - radius, start.y + radius);
        ctx.closePath();
      } else if (shapeType === "star") {
        const spikes = 5;
        const outerRadius = radius;
        const innerRadius = radius / 2;
        let rot = (Math.PI / 2) * 3;
        const step = Math.PI / spikes;

        ctx.moveTo(start.x, start.y - outerRadius);
        for (let i = 0; i < spikes; i++) {
          let x = start.x + Math.cos(rot) * outerRadius;
          let y = start.y + Math.sin(rot) * outerRadius;
          ctx.lineTo(x, y);
          rot += step;

          x = start.x + Math.cos(rot) * innerRadius;
          y = start.y + Math.sin(rot) * innerRadius;
          ctx.lineTo(x, y);
          rot += step;
        }
        ctx.lineTo(start.x, start.y - outerRadius);
        ctx.closePath();
      }
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      return;
    }

    // Handle Pen, Eraser, Magic, Glow strokes
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = size * 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = color;
      ctx.lineWidth = size;

      if (tool === "glow" || isGlow) {
        ctx.shadowBlur = 18;
        ctx.shadowColor = color;
      }
    }

    if (points.length === 1) {
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = tool === "eraser" ? "#000" : color;
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.stroke();
    }

    ctx.restore();
  }
}
