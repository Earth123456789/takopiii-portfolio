"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  PlaygroundTool,
  PlaygroundStroke,
  StampEmoji,
  ShapeType,
} from "@/types/canvas";
import { PlaygroundToolbar } from "./PlaygroundToolbar";
import { ParticleEngine } from "@/lib/canvas/ParticleEngine";
import { StrokeRenderer } from "@/lib/canvas/StrokeRenderer";
import { useAudio } from "@/hooks/useAudio";
import { useTheme } from "@/hooks/useTheme";

export const CanvasPlayground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [tool, setTool] = useState<PlaygroundTool>("pen");
  const [color, setColor] = useState<string>("#FF2A85");
  const [brushSize, setBrushSize] = useState<number>(8);
  const [fadeStrokes, setFadeStrokes] = useState<boolean>(false);
  const [selectedStamp, setSelectedStamp] = useState<StampEmoji>("✨");
  const [selectedShape, setSelectedShape] = useState<ShapeType>("circle");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<PlaygroundStroke[]>([]);
  const currentStrokeRef = useRef<PlaygroundStroke | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number; time: number } | null>(
    null,
  );

  const particleEngineRef = useRef(new ParticleEngine());
  const { startBrushSound, stopBrushSound, playBurstSound, playTapSound } =
    useAudio();

  // Resize canvas to container dimensions
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Main 60fps rAF Animation Loop
  useEffect(() => {
    let animId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.restore();

          const now = Date.now();

          // Render finished strokes
          strokesRef.current.forEach((stroke) => {
            if (fadeStrokes) {
              const age = now - stroke.createdAt;
              stroke.opacity = Math.max(0, 1 - age / 6000);
            }
            if (stroke.opacity > 0) {
              StrokeRenderer.drawStroke(ctx, stroke);
            }
          });

          // Render active stroke
          if (currentStrokeRef.current) {
            StrokeRenderer.drawStroke(ctx, currentStrokeRef.current);
          }

          // Render particles overlay
          particleEngineRef.current.updateAndDraw(ctx);

          // Clean up completely faded strokes
          if (fadeStrokes) {
            strokesRef.current = strokesRef.current.filter(
              (s) => s.opacity > 0,
            );
          }
        }
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [fadeStrokes]);

  // Event handlers for instant drawing
  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getCanvasCoords(e);
    isDrawingRef.current = true;
    lastPointRef.current = { x, y, time: Date.now() };

    const newStroke: PlaygroundStroke = {
      id: Math.random().toString(36).substring(2, 9),
      points: [{ x, y }],
      color,
      size: brushSize,
      opacity: 1,
      tool,
      isGlow: tool === "glow",
      stampEmoji: tool === "stamp" ? selectedStamp : undefined,
      shapeType: tool === "shape" ? selectedShape : undefined,
      createdAt: Date.now(),
    };

    currentStrokeRef.current = newStroke;

    if (tool === "magic" || tool === "glow" || tool === "pen") {
      particleEngineRef.current.emit(x, y, color, 4, 1, tool === "magic");
    }

    startBrushSound(1);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || !currentStrokeRef.current) return;
    const { x, y } = getCanvasCoords(e);

    let velocity = 1;
    if (lastPointRef.current) {
      const dx = x - lastPointRef.current.x;
      const dy = y - lastPointRef.current.y;
      const dt = Date.now() - lastPointRef.current.time || 1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      velocity = Math.min(5, Math.max(0.5, dist / dt));
    }
    lastPointRef.current = { x, y, time: Date.now() };

    // Dynamic Speed-based sizing for pen/glow/magic
    const dynamicSize =
      tool === "pen" || tool === "glow"
        ? Math.max(3, brushSize * (1.2 - velocity * 0.15))
        : brushSize;

    currentStrokeRef.current.points.push({ x, y, velocity });
    currentStrokeRef.current.size = dynamicSize;

    // Emit Particles during stroke
    if (tool === "magic" || tool === "glow") {
      particleEngineRef.current.emit(
        x,
        y,
        color,
        3,
        velocity,
        tool === "magic",
      );
    }

    startBrushSound(velocity * 2);
  };

  const stopDrawing = () => {
    if (isDrawingRef.current && currentStrokeRef.current) {
      strokesRef.current.push(currentStrokeRef.current);
      currentStrokeRef.current = null;
    }
    isDrawingRef.current = false;
    lastPointRef.current = null;
    stopBrushSound();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    const { x, y } = getCanvasCoords(e);
    particleEngineRef.current.emitBurst(x, y, 50);
    playBurstSound();
  };

  const handleClear = () => {
    strokesRef.current = [];
    particleEngineRef.current.clear();
    playTapSound();
  };

  const handleBurst = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    particleEngineRef.current.emitBurst(rect.width / 2, rect.height / 2, 60);
    playBurstSound();
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-slate-900/50 dark:bg-black/50 backdrop-blur-sm rounded-2xl border border-slate-200/20 dark:border-white/10 select-none">
      {/* Interactive Canvas Surface */}
      <div className="relative flex-1 w-full h-full cursor-crosshair overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          onDoubleClick={handleDoubleClick}
          className="absolute inset-0 w-full h-full"
        />

        {/* Ambient Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: isDark
              ? "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)"
              : "radial-gradient(rgba(0, 0, 0, 0.3) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Embedded Floating Controls Bar */}
      <div className="p-3 z-20">
        <PlaygroundToolbar
          tool={tool}
          color={color}
          brushSize={brushSize}
          fadeStrokes={fadeStrokes}
          selectedStamp={selectedStamp}
          selectedShape={selectedShape}
          onToolChange={setTool}
          onColorChange={setColor}
          onBrushSizeChange={setBrushSize}
          onFadeToggle={() => setFadeStrokes((prev) => !prev)}
          onStampChange={setSelectedStamp}
          onShapeChange={setSelectedShape}
          onClear={handleClear}
          onBurst={handleBurst}
        />
      </div>
    </div>
  );
};
