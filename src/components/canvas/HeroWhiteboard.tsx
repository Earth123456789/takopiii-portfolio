"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Pencil, Eraser, Trash2, Sparkles, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

const MARKER_COLORS = [
  { name: "Takopi Pink", value: "#FF9DB0" },
  { name: "Deep Crimson", value: "#E94560" },
  { name: "Royal Blue", value: "#2563EB" },
  { name: "Purple Neon", value: "#7C3AED" },
  { name: "Emerald", value: "#059669" },
  { name: "Charcoal Black", value: "#1E293B" },
];

export const HeroWhiteboard: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#FF9DB0");
  const [brushSize] = useState(4);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Draw light subtle grid on white canvas
  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.save();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
      ctx.lineWidth = 1;
      const gridSpacing = 24;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();
    },
    [],
  );

  // Takopi (タコピー) character drawing matching reference image exactly
  const animateTakopi = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = contextRef.current;
    if (!canvas || !container || !ctx) return;

    setIsAnimating(true);
    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const centerX = w / 2;
    const centerY = h / 2 - 15;
    const r = Math.min(w, h) * 0.31;

    let frame = 0;
    const totalFrames = 50;

    const renderTakopiFrame = () => {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, w, h);
      drawGrid(ctx, w, h);

      const progress = Math.min(frame / totalFrames, 1);

      ctx.save();

      // 1. Draw Takopi Body (Big Round Head + 4 Feet at Bottom)
      ctx.beginPath();
      // Round top dome from right side around to left side
      ctx.arc(
        centerX,
        centerY,
        r * Math.min(progress * 1.4, 1),
        Math.PI * 0.82,
        Math.PI * 2.18,
        false,
      );

      // 4 Cute Tentacle Feet at base
      if (progress > 0.35) {
        const footY = centerY + r * 0.75;
        // Right outer foot
        ctx.bezierCurveTo(
          centerX + r * 1.05,
          footY + 5,
          centerX + r * 1.22,
          footY + 28,
          centerX + r * 0.85,
          footY + 28,
        );
        // Right-center foot
        ctx.bezierCurveTo(
          centerX + r * 0.65,
          footY + 28,
          centerX + r * 0.45,
          footY + 32,
          centerX + r * 0.25,
          footY + 24,
        );
        // Left-center foot
        ctx.bezierCurveTo(
          centerX - r * 0.05,
          footY + 30,
          centerX - r * 0.35,
          footY + 32,
          centerX - r * 0.6,
          footY + 28,
        );
        // Left outer foot
        ctx.bezierCurveTo(
          centerX - r * 0.9,
          footY + 28,
          centerX - r * 1.22,
          footY + 28,
          centerX - r * 1.05,
          footY + 5,
        );
      }

      ctx.closePath();

      // Takopi Pink Fill (Matching Reference Image 1)
      ctx.fillStyle = "#FF92AA";
      ctx.fill();

      // Crisp Dark Outline
      ctx.strokeStyle = "#1B202E";
      ctx.lineWidth = 4.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // 2. Takopi Shadow (Right side & bottom matching Ref Image 1)
      if (progress >= 0.75) {
        ctx.save();
        ctx.beginPath();
        // Inner shadow on right curve
        ctx.arc(
          centerX,
          centerY,
          r * 0.96,
          Math.PI * 0.05,
          Math.PI * 0.62,
          false,
        );
        ctx.bezierCurveTo(
          centerX + r * 0.95,
          centerY + r * 0.9,
          centerX + r * 0.7,
          centerY + r * 0.95,
          centerX + r * 0.5,
          centerY + r * 0.75,
        );
        ctx.fillStyle = "rgba(185, 55, 95, 0.32)";
        ctx.fill();
        ctx.restore();
      }

      // 3. Takopi Face (Dot eyes + 'ε' mouth)
      if (progress > 0.5) {
        const faceRatio = Math.min((progress - 0.5) * 2, 1);
        ctx.fillStyle = "#1B202E";
        const eyeXOffset = r * 0.28;
        const eyeY = centerY + r * 0.08; // Eyes are positioned slightly lower on Takopi's head

        // Left Dot Eye
        ctx.beginPath();
        ctx.arc(centerX - eyeXOffset, eyeY, 4 * faceRatio, 0, Math.PI * 2);
        ctx.fill();

        // Right Dot Eye
        ctx.beginPath();
        ctx.arc(centerX + eyeXOffset, eyeY, 4 * faceRatio, 0, Math.PI * 2);
        ctx.fill();

        // 'ε' Mouth (centered right between & slightly below eyes)
        if (progress > 0.7) {
          ctx.font = "bold 22px system-ui, -apple-system, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("ε", centerX, eyeY + 18);
        }
      }

      ctx.restore();

      if (frame < totalFrames) {
        frame++;
        setTimeout(renderTakopiFrame, 16);
      } else {
        setIsAnimating(false);
      }
    };

    renderTakopiFrame();
  }, [drawGrid]);

  // Initialize white canvas with HiDPI scaling
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    contextRef.current = ctx;

    // Fill white board
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, rect.width, rect.height);
    drawGrid(ctx, rect.width, rect.height);
  }, [drawGrid]);

  useEffect(() => {
    initCanvas();
    // Auto-run Takopi drawing animation on mount
    const timer = setTimeout(() => {
      animateTakopi();
    }, 400);

    const handleResize = () => {
      initCanvas();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [initCanvas, animateTakopi]);

  // Pointer drawing handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isAnimating) return;
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    canvas.setPointerCapture(e.pointerId);
    setIsDrawing(true);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (tool === "eraser") {
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = brushSize * 5;
      ctx.shadowBlur = 0;
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.shadowBlur = 3;
      ctx.shadowColor = "rgba(0,0,0,0.15)";
      ctx.shadowOffsetY = 1;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isAnimating) return;
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (canvas && e.pointerId) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
    }
    if (ctx) ctx.restore();
    setIsDrawing(false);
  };

  const clearBoard = () => {
    const container = containerRef.current;
    const ctx = contextRef.current;
    if (!container || !ctx) return;

    const rect = container.getBoundingClientRect();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, rect.width, rect.height);
    drawGrid(ctx, rect.width, rect.height);
  };

  const exportPNG = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create offscreen canvas for rendering the full Polaroid photo card artwork
    const exportCanvas = document.createElement("canvas");
    const borderX = 36;
    const borderTop = 36;
    const borderBottom = 90; // Classic Polaroid bottom chin

    exportCanvas.width = canvas.width + borderX * 2;
    exportCanvas.height = canvas.height + borderTop + borderBottom;

    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    // 1. Draw smooth off-white Polaroid paper card background
    ctx.fillStyle = "#FAFAFA";
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // 2. Draw outer subtle paper border
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, exportCanvas.width - 4, exportCanvas.height - 4);

    // 3. Draw inner photo viewport border
    ctx.strokeStyle = "#CBD5E1";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      borderX - 1,
      borderTop - 1,
      canvas.width + 2,
      canvas.height + 2,
    );

    // 4. Draw user's canvas drawing inside Polaroid viewport
    ctx.drawImage(canvas, borderX, borderTop);

    // 5. Draw Polaroid handwritten bottom caption
    ctx.font = "bold 22px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#64748B";
    ctx.textAlign = "center";
    ctx.fillText(
      "✨ takopiii whiteboard snapshot",
      exportCanvas.width / 2,
      exportCanvas.height - 32,
    );

    // 6. Trigger PNG download
    const link = document.createElement("a");
    link.download = `polaroid-takopi-whiteboard-${Date.now()}.png`;
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
  }, []);

  const triggerCountdownSnapshot = useCallback(() => {
    if (countdown !== null) return;
    setCountdown(3);

    setTimeout(() => setCountdown(2), 800);
    setTimeout(() => setCountdown(1), 1600);
    setTimeout(() => {
      setCountdown(0); // CHEESE! 📸
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 400);
      exportPNG();
    }, 2400);

    setTimeout(() => setCountdown(null), 3200);
  }, [countdown, exportPNG]);

  return (
    <>
      {/* SVG Squiggly Torn Edge Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter
            id="takopi-torn-edge"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={cn(
          "w-full h-full flex flex-col relative group transition-all duration-500 -rotate-2 hover:rotate-0 hover:scale-[1.02] ease-out p-3 pb-5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.35)]",
          theme === "light"
            ? "bg-white border-2 border-slate-200 shadow-slate-300/40"
            : "bg-slate-900 border-2 border-slate-700/80 shadow-black/70",
        )}
      >
        {/* Camera Shutter Flash Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-white z-50 pointer-events-none rounded-2xl transition-opacity duration-300",
            isFlashing ? "opacity-95" : "opacity-0",
          )}
        />

        {/* Red Ribbon Overlays (Takopi Poster Style with Squiggly Edge) */}
        <div
          className="absolute -top-3.5 -left-3.5 w-16 h-16 pointer-events-none z-30 overflow-hidden"
          style={{ filter: "url(#takopi-torn-edge)" }}
        >
          <div className="w-24 h-4.5 bg-gradient-to-r from-rose-600 via-red-500 to-rose-600 shadow-md transform -rotate-45 -translate-x-6 translate-y-3.5 border-y border-rose-300/70" />
        </div>
        <div
          className="absolute -bottom-3.5 -right-3.5 w-16 h-16 pointer-events-none z-30 overflow-hidden"
          style={{ filter: "url(#takopi-torn-edge)" }}
        >
          <div className="w-24 h-4.5 bg-gradient-to-r from-rose-600 via-red-500 to-rose-600 shadow-md transform -rotate-45 translate-x-4 translate-y-4 border-y border-rose-300/70" />
        </div>

        {/* Decorative Washi Tape Accent */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-6 bg-amber-200/70 dark:bg-amber-300/50 backdrop-blur-sm border border-amber-300/80 rotate-[1.5deg] shadow-sm z-30 pointer-events-none rounded-sm flex items-center justify-center">
          <span className="text-[9px] font-black tracking-widest text-amber-900/60 uppercase">
            POLAROID
          </span>
        </div>

        {/* Main White Canvas Viewport Box (Clean & Smooth) */}
        <div
          ref={containerRef}
          className="relative w-full flex-1 min-h-[220px] sm:min-h-[280px] bg-white cursor-crosshair overflow-hidden touch-none rounded-xl border border-slate-200/90 shadow-inner"
        >
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="absolute inset-0 w-full h-full"
          />

          {/* Big Center Countdown Overlay */}
          {countdown !== null && (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[2px] pointer-events-none transition-all duration-300">
              {countdown > 0 ? (
                <div
                  key={countdown}
                  className="text-7xl sm:text-8xl font-black text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] animate-in zoom-in-50 duration-300"
                >
                  {countdown}
                </div>
              ) : (
                <div className="text-4xl sm:text-5xl font-black text-amber-300 tracking-wider drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] animate-bounce flex items-center gap-2">
                  <span>CHEESE!</span>
                  <span>📸</span>
                </div>
              )}
            </div>
          )}

          {/* 🎨 Bottom-Left Corner Dynamic Icon Dock */}
          <div className="absolute bottom-3 left-3 z-30 pointer-events-auto flex flex-col items-start">
            {/* Pop-up Pure Icon Palette Menu */}
            {isToolsOpen && (
              <div
                className={cn(
                  "mb-2 p-2 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-200 backdrop-blur-md border",
                  theme === "light"
                    ? "bg-white/95 text-slate-800 border-slate-200 shadow-slate-400/20"
                    : "bg-slate-900/95 text-white border-slate-800 shadow-black/50",
                )}
              >
                {/* Marker Ink Colors */}
                <div className="flex items-center gap-1.5 px-0.5">
                  {MARKER_COLORS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => {
                        setTool("pen");
                        setColor(c.value);
                      }}
                      className={cn(
                        "w-5 h-5 rounded-full border transition-all duration-200 hover:scale-125 active:scale-95",
                        color === c.value && tool === "pen"
                          ? "border-slate-900 dark:border-white scale-110 ring-2 ring-rose-500/40"
                          : "border-transparent opacity-85",
                      )}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    />
                  ))}
                </div>

                <div
                  className={cn(
                    "h-4 w-[1px] mx-0.5",
                    theme === "light" ? "bg-slate-200" : "bg-white/10",
                  )}
                />

                {/* Tools: Pen / Eraser */}
                <div
                  className={cn(
                    "flex items-center rounded-lg p-0.5 border",
                    theme === "light"
                      ? "bg-slate-100 border-slate-200"
                      : "bg-white/5 border-white/5",
                  )}
                >
                  <button
                    onClick={() => setTool("pen")}
                    className={cn(
                      "p-1.5 rounded-md transition-colors",
                      tool === "pen"
                        ? "bg-rose-500 text-white shadow"
                        : theme === "light"
                          ? "text-slate-500 hover:text-slate-900"
                          : "text-slate-400 hover:text-white",
                    )}
                    title="Pen Tool"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => setTool("eraser")}
                    className={cn(
                      "p-1.5 rounded-md transition-colors",
                      tool === "eraser"
                        ? "bg-rose-500 text-white shadow"
                        : theme === "light"
                          ? "text-slate-500 hover:text-slate-900"
                          : "text-slate-400 hover:text-white",
                    )}
                    title="Eraser Tool"
                  >
                    <Eraser size={13} />
                  </button>
                </div>

                <div
                  className={cn(
                    "h-4 w-[1px] mx-0.5",
                    theme === "light" ? "bg-slate-200" : "bg-white/10",
                  )}
                />

                {/* Action Buttons: Replay, Clear */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={animateTakopi}
                    className={cn(
                      "p-1.5 rounded-lg border transition-colors",
                      theme === "light"
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                        : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-300 border-white/5",
                    )}
                    title="Replay Takopi Character Animation"
                  >
                    <Sparkles size={13} />
                  </button>
                  <button
                    onClick={clearBoard}
                    className={cn(
                      "p-1.5 rounded-lg border transition-colors",
                      theme === "light"
                        ? "bg-slate-100 hover:bg-rose-100 text-rose-600 border-slate-200"
                        : "bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border-white/5",
                    )}
                    title="Clear Whiteboard"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            )}

            {/* Dynamic Interactive Trigger Icon Button */}
            <button
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 relative",
                theme === "light"
                  ? "bg-white text-slate-800 border-slate-300 hover:bg-slate-50 shadow-slate-300/50"
                  : "bg-slate-900 text-white border-slate-700 hover:bg-slate-800 shadow-black/60",
                isToolsOpen && "ring-2 ring-rose-500 border-rose-500",
              )}
              style={{
                borderColor: tool === "pen" ? color : undefined,
                boxShadow: tool === "pen" ? `0 0 12px ${color}40` : undefined,
              }}
              title={
                tool === "pen"
                  ? `Active Tool: Pen (${color})`
                  : "Active Tool: Eraser"
              }
            >
              {tool === "pen" ? (
                <Pencil size={17} style={{ color: color }} />
              ) : (
                <Eraser
                  size={17}
                  className={
                    theme === "light" ? "text-slate-700" : "text-slate-300"
                  }
                />
              )}

              {/* Color Indicator Badge */}
              <span
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 shadow-md transition-all duration-300"
                style={{
                  backgroundColor: tool === "eraser" ? "#94A3B8" : color,
                }}
              />
            </button>
          </div>
        </div>

        {/* Classic Polaroid Bottom Chin with Interactive Snapshot Button */}
        <div className="pt-2 px-1 pointer-events-auto select-none">
          <button
            onClick={triggerCountdownSnapshot}
            disabled={countdown !== null}
            className={cn(
              "w-full py-2 px-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all duration-300 active:scale-95",
              theme === "light"
                ? "bg-slate-900 text-white hover:bg-rose-500 hover:shadow-rose-500/30"
                : "bg-white text-slate-900 hover:bg-rose-500 hover:text-white hover:shadow-rose-500/40",
              countdown !== null && "opacity-80 scale-95",
            )}
            title="Take Polaroid Photo Snapshot"
          >
            <Camera
              size={15}
              className="text-amber-400 group-hover:text-white"
            />
            <span>
              {countdown !== null
                ? countdown === 0
                  ? "CHEESE!"
                  : `Taking Photo in ${countdown}...`
                : "Take Snapshot"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
