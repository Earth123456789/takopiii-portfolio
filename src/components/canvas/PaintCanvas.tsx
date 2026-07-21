"use client";

import React, {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Theme } from "@/types/context";

export interface PaintCanvasHandle {
  clearCanvas: () => void;
  exportPNG: () => void;
}

interface Point {
  x: number;
  y: number;
  pressure: number;
}

interface Stroke {
  points: Point[];
  color: string;
  size: number;
  opacity: number;
  createdAt: number;
}

interface PaintCanvasProps {
  isActive: boolean;
  color: string;
  brushSize: number;
  tool: "pen" | "eraser";
  fadeStrokes: boolean;
  theme: Theme;
  onStrokeEnd?: () => void;
}

const FADE_DURATION_MS = 4500;
const FADE_INTERVAL_MS = 40;

/**
 * Determines eraser background color based on theme.
 * The eraser uses compositing (destination-out) so the BG doesn't matter
 * for the stroke itself, but we use theme for cursor feedback.
 */
const getEraserColor = (themeMode?: Theme) => {
  return themeMode === "dark" ? "__eraser_dark__" : "__eraser__";
};

export const PaintCanvas = forwardRef<PaintCanvasHandle, PaintCanvasProps>(
  (
    { isActive, color, brushSize, tool, fadeStrokes, theme, onStrokeEnd },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const strokesRef = useRef<Stroke[]>([]);
    const currentStrokeRef = useRef<Stroke | null>(null);
    const isDrawingRef = useRef(false);
    const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Store latest props in refs for use inside event listeners
    const colorRef = useRef(color);
    const brushSizeRef = useRef(brushSize);
    const toolRef = useRef(tool);
    useEffect(() => {
      colorRef.current = color;
    }, [color]);
    useEffect(() => {
      brushSizeRef.current = brushSize;
    }, [brushSize]);
    useEffect(() => {
      toolRef.current = tool;
    }, [tool]);

    // ─── Canvas Setup ────────────────────────────────────────────
    const setupCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    }, []);

    useEffect(() => {
      setupCanvas();
      const onResize = () => {
        strokesRef.current = [];
        setupCanvas();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, [setupCanvas]);

    // ─── 3D Bezier Stroke Renderer ───────────────────────────────
    const drawBezierPath = (ctx: CanvasRenderingContext2D, points: Point[]) => {
      if (points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const mx = (points[i].x + points[i + 1].x) / 2;
        const my = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, mx, my);
      }
      const last = points[points.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
    };

    /**
     * Theme-aware 3D stroke rendering.
     *
     * Light mode: softer shadows, warm white highlight
     * Dark mode:  vivid neon glow + deeper drop shadow
     */
    const drawStroke = useCallback(
      (ctx: CanvasRenderingContext2D, stroke: Stroke, opacity: number) => {
        if (stroke.points.length < 2) return;
        const isDark = theme === "dark";
        const isEraser = stroke.color === "__eraser__";

        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = Math.max(0, Math.min(1, opacity));

        if (isEraser) {
          ctx.globalCompositeOperation = "destination-out";
          ctx.strokeStyle = "rgba(0,0,0,1)";
          ctx.lineWidth = stroke.size;
          drawBezierPath(ctx, stroke.points);
          ctx.restore();
          return;
        }

        // ── Layer 1: Deep drop shadow (3D depth illusion) ──
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = opacity * (isDark ? 0.3 : 0.18);
        ctx.strokeStyle = isDark ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.5)";
        ctx.lineWidth = stroke.size * 2.4;
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = isDark ? 3 : 2;
        ctx.shadowOffsetY = isDark ? 4 : 3;
        drawBezierPath(ctx, stroke.points);

        // ── Layer 2: Ambient glow halo (more intense in dark mode) ──
        ctx.globalAlpha = opacity * (isDark ? 0.4 : 0.2);
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size * 2.0;
        ctx.shadowBlur = isDark ? stroke.size * 5 : stroke.size * 2;
        ctx.shadowColor = stroke.color;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        drawBezierPath(ctx, stroke.points);

        // ── Layer 3: Core stroke ──
        ctx.globalAlpha = opacity * (isDark ? 0.95 : 0.88);
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size;
        ctx.shadowBlur = isDark ? stroke.size * 2.5 : stroke.size * 1.0;
        ctx.shadowColor = stroke.color;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        drawBezierPath(ctx, stroke.points);

        // ── Layer 4: Specular highlight (thin bright ridge on top edge) ──
        // In light mode: slightly darker tint instead of white
        const highlightColor = isDark
          ? "rgba(255,255,255,0.65)"
          : "rgba(255,255,255,0.50)";
        ctx.globalAlpha = opacity * (isDark ? 0.5 : 0.35);
        ctx.strokeStyle = highlightColor;
        ctx.lineWidth = Math.max(0.4, stroke.size * 0.16);
        ctx.shadowBlur = 3;
        ctx.shadowColor = "#fff";
        ctx.shadowOffsetX = -1;
        ctx.shadowOffsetY = -1;
        drawBezierPath(ctx, stroke.points);

        ctx.restore();
      },
      [theme],
    );

    // ─── Redraw All ───────────────────────────────────────────────
    const redrawAll = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const stroke of strokesRef.current) {
        drawStroke(ctx, stroke, stroke.opacity);
      }
    }, [drawStroke]);

    // Re-render whenever theme changes so colours look correct
    useEffect(() => {
      redrawAll();
    }, [theme, redrawAll]);

    // ─── Fade Loop ────────────────────────────────────────────────
    useEffect(() => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

      if (!fadeStrokes) {
        strokesRef.current.forEach((s) => (s.opacity = 1));
        redrawAll();
        return;
      }

      fadeIntervalRef.current = setInterval(() => {
        const now = Date.now();
        let changed = false;

        strokesRef.current = strokesRef.current.filter((stroke) => {
          const age = now - stroke.createdAt;
          if (age > FADE_DURATION_MS) {
            changed = true;
            return false;
          }
          const ratio = Math.max(0, 1 - age / FADE_DURATION_MS);
          if (stroke.opacity !== ratio) {
            stroke.opacity = ratio;
            changed = true;
          }
          return true;
        });

        if (changed) redrawAll();
      }, FADE_INTERVAL_MS);

      return () => {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      };
    }, [fadeStrokes, redrawAll]);

    // ─── Pointer Events ───────────────────────────────────────────
    const getPoint = (e: PointerEvent, canvas: HTMLCanvasElement): Point => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        pressure: e.pressure > 0 ? e.pressure : 0.5,
      };
    };

    const onPointerDown = useCallback(
      (e: PointerEvent) => {
        if (!isActive) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        e.preventDefault();
        canvas.setPointerCapture(e.pointerId);
        isDrawingRef.current = true;

        const pt = getPoint(e, canvas);
        const stroke: Stroke = {
          points: [pt],
          color:
            toolRef.current === "eraser"
              ? getEraserColor(theme)
              : colorRef.current,
          size: brushSizeRef.current * (toolRef.current === "eraser" ? 4 : 1),
          opacity: 1,
          createdAt: Date.now(),
        };
        currentStrokeRef.current = stroke;
        strokesRef.current.push(stroke);
      },
      [isActive, theme],
    );

    const onPointerMove = useCallback(
      (e: PointerEvent) => {
        if (!isActive || !isDrawingRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx || !currentStrokeRef.current) return;
        e.preventDefault();

        const pt = getPoint(e, canvas);
        currentStrokeRef.current.points.push(pt);

        // Incremental redraw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const s of strokesRef.current) {
          drawStroke(ctx, s, s.opacity);
        }
      },
      [isActive, drawStroke],
    );

    const onPointerUp = useCallback(
      (e: PointerEvent) => {
        if (!isDrawingRef.current) return;
        if (e.pointerId !== undefined) {
          // Pointer release completed
        }
        isDrawingRef.current = false;
        currentStrokeRef.current = null;
        onStrokeEnd?.();
      },
      [onStrokeEnd],
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.addEventListener("pointerdown", onPointerDown, { passive: false });
      canvas.addEventListener("pointermove", onPointerMove, { passive: false });
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerUp);
      return () => {
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointercancel", onPointerUp);
      };
    }, [onPointerDown, onPointerMove, onPointerUp]);

    // ─── Imperative API ───────────────────────────────────────────
    useImperativeHandle(ref, () => ({
      clearCanvas: () => {
        strokesRef.current = [];
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      },
      exportPNG: () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement("a");
        link.download = `canvas-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      },
    }));

    return (
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          touchAction: "none",
          pointerEvents: isActive ? "auto" : "none",
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.35s ease",
          cursor: isActive ? "crosshair" : "default",
        }}
      />
    );
  },
);

PaintCanvas.displayName = "PaintCanvas";
