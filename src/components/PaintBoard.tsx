"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Palette, Trash2, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaintBoardProps {
  isOpen: boolean;
  onClose: () => void;
}

// Points representing the cursive signature "takopiii"
const signaturePaths = [
  // Cursive main body of "takopiii"
  [
    { x: 30, y: 90 },
    { x: 32, y: 70 },
    { x: 35, y: 45 }, // t stroke up
    { x: 35, y: 90 },
    { x: 42, y: 95 },
    { x: 50, y: 75 }, // t down and curve to a
    { x: 45, y: 70 },
    { x: 40, y: 75 },
    { x: 40, y: 85 },
    { x: 45, y: 92 },
    { x: 52, y: 92 },
    { x: 52, y: 75 }, // a loop
    { x: 52, y: 90 },
    { x: 58, y: 95 },
    { x: 68, y: 45 }, // a tail and lead to k
    { x: 68, y: 95 },
    { x: 73, y: 90 },
    { x: 78, y: 80 },
    { x: 75, y: 75 },
    { x: 70, y: 78 },
    { x: 73, y: 85 }, // k loop and body
    { x: 80, y: 95 },
    { x: 88, y: 90 },
    { x: 92, y: 75 }, // k exit to o
    { x: 88, y: 72 },
    { x: 83, y: 78 },
    { x: 83, y: 87 },
    { x: 88, y: 93 },
    { x: 95, y: 90 },
    { x: 95, y: 75 }, // o loop
    { x: 100, y: 73 },
    { x: 105, y: 75 },
    { x: 110, y: 85 }, // o top loop connection to p
    { x: 110, y: 120 },
    { x: 112, y: 85 },
    { x: 118, y: 75 },
    { x: 124, y: 80 },
    { x: 122, y: 90 },
    { x: 115, y: 93 }, // p long stem and loop
    { x: 125, y: 95 },
    { x: 132, y: 80 },
    { x: 132, y: 95 }, // exit to i (1)
    { x: 138, y: 95 },
    { x: 142, y: 80 },
    { x: 142, y: 95 }, // exit to i (2)
    { x: 148, y: 95 },
    { x: 152, y: 80 },
    { x: 152, y: 95 },
    { x: 160, y: 90 }, // exit to i (3) and finish
  ],
  // Crossbar of 't'
  [
    { x: 23, y: 65 },
    { x: 45, y: 65 },
  ],
  // Dot of first 'i'
  [
    { x: 132, y: 68 },
    { x: 133, y: 68 },
  ],
  // Dot of second 'i'
  [
    { x: 142, y: 68 },
    { x: 143, y: 68 },
  ],
  // Dot of third 'i'
  [
    { x: 152, y: 68 },
    { x: 153, y: 68 },
  ],
];

export const PaintBoard: React.FC<PaintBoardProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#E94560"); // default glowing primary neon
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [isAnimating, setIsAnimating] = useState(false);

  const colors = [
    { name: "Neon Red", value: "#E94560" },
    { name: "Neon Blue", value: "#00F0FF" },
    { name: "Neon Purple", value: "#BD00FF" },
    { name: "Neon Green", value: "#39FF14" },
    { name: "Neon Yellow", value: "#FFEF00" },
    { name: "White", value: "#FFFFFF" },
  ];

  const drawBoardGrid = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    const w = canvas.width / 2;
    const h = canvas.height / 2;

    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;

    // Draw grid lines
    const gridSpacing = 20;
    for (let x = 0; x < w; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.restore();
  }, []);

  // Cursive writing animation
  const animateSignature = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    setIsAnimating(true);

    const w = canvas.width / 2;
    const h = canvas.height / 2;

    // Clear board and redraw grid
    ctx.clearRect(0, 0, w, h);
    drawBoardGrid();

    // Scale and center parameters
    const signatureWidth = 190;
    const signatureHeight = 120;
    const scaleFactor = Math.min(
      (w - 40) / signatureWidth,
      (h - 60) / signatureHeight,
      2.0,
    );
    const dx = (w - signatureWidth * scaleFactor) / 2;
    const dy = (h - signatureHeight * scaleFactor) / 2;

    ctx.save();
    ctx.strokeStyle = "#E94560"; // Animation color
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#E94560";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    let currentPathIdx = 0;
    let currentPointIdx = 0;

    const drawStep = () => {
      if (currentPathIdx >= signaturePaths.length) {
        ctx.restore();
        setIsAnimating(false);
        return;
      }

      const path = signaturePaths[currentPathIdx];

      if (currentPointIdx < path.length) {
        ctx.beginPath();
        const pt = path[currentPointIdx];
        const scaledX = pt.x * scaleFactor + dx;
        const scaledY = pt.y * scaleFactor + dy;

        if (currentPointIdx === 0) {
          ctx.moveTo(scaledX, scaledY);
        } else {
          const prevPt = path[currentPointIdx - 1];
          const prevScaledX = prevPt.x * scaleFactor + dx;
          const prevScaledY = prevPt.y * scaleFactor + dy;
          ctx.moveTo(prevScaledX, prevScaledY);
          ctx.lineTo(scaledX, scaledY);
          ctx.stroke();
        }

        currentPointIdx++;
        // Repeat drawing step
        setTimeout(drawStep, 15);
      } else {
        // Move to next path stroke
        currentPathIdx++;
        currentPointIdx = 0;
        setTimeout(drawStep, 80);
      }
    };

    drawStep();
  }, [drawBoardGrid]);

  // Initialize canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Support high DPI screens
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    contextRef.current = ctx;

    // Draw grid pattern (board style)
    drawBoardGrid();

    // Run writing animation by default
    animateSignature();
  }, [isOpen, drawBoardGrid, animateSignature]);

  // Drawing event handlers
  const startDrawing = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (isAnimating) return;
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);

    // Apply tools config
    ctx.save();
    if (tool === "eraser") {
      ctx.strokeStyle = "#020617"; // Dark background matches dark theme
      ctx.lineWidth = brushSize * 3;
      ctx.shadowBlur = 0;
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
    }

    setIsDrawing(true);
    // Draw initial dot
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const draw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawing || isAnimating) return;
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    // Prevent default scroll on touch devices
    if (e.cancelable) {
      e.preventDefault();
    }

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    const ctx = contextRef.current;
    if (ctx) {
      ctx.restore();
    }
    setIsDrawing(false);
  };

  const clearBoard = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    const w = canvas.width / 2;
    const h = canvas.height / 2;

    ctx.clearRect(0, 0, w, h);
    drawBoardGrid();
  };

  return (
    <div
      className={cn(
        "fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md border-r border-white/10 shadow-2xl transition-all duration-500 ease-out will-change-transform",
        isOpen
          ? "w-[100vw] sm:w-[480px] translate-x-0"
          : "w-[100vw] sm:w-[480px] -translate-x-full",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Palette className="text-primary dark:text-[#ff9cb0]" size={24} />
          <h2 className="text-xl font-bold text-foreground">
            Interactive Paint Board
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-foreground/75 hover:text-foreground hover:bg-white/10 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative overflow-hidden bg-[#020617] m-4 rounded-xl border border-white/5 shadow-inner">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
        />

        {isAnimating && (
          <div className="absolute top-4 left-4 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm text-xs font-semibold text-white/90 animate-pulse">
            {'Writing "takopiii"...'}
          </div>
        )}
      </div>

      {/* Toolbar Controls */}
      <div className="p-5 border-t border-white/10 space-y-5 bg-slate-900/40">
        {/* Colors selector */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground/80 flex items-center gap-1.5">
            Brush Color
          </label>
          <div className="flex flex-wrap gap-2.5">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => {
                  setTool("pen");
                  setColor(c.value);
                }}
                className={cn(
                  "w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110",
                  color === c.value && tool === "pen"
                    ? "border-white scale-110 shadow-lg"
                    : "border-transparent opacity-85",
                )}
                style={{
                  backgroundColor: c.value,
                  boxShadow:
                    color === c.value && tool === "pen"
                      ? `0 0 10px ${c.value}`
                      : "none",
                }}
                aria-label={c.name}
              />
            ))}
          </div>
        </div>

        {/* Brush Size / Tools */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">
              Brush Size
            </label>
            <input
              type="range"
              min="2"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary dark:accent-[#A91D3A]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">
              Tool Mode
            </label>
            <div className="flex bg-slate-950/60 p-1 rounded-lg border border-white/5">
              <button
                onClick={() => setTool("pen")}
                className={cn(
                  "flex-1 py-1 text-xs font-semibold rounded transition-all",
                  tool === "pen"
                    ? "bg-primary dark:bg-[#A91D3A] text-white"
                    : "text-foreground/70 hover:text-foreground",
                )}
              >
                Pen
              </button>
              <button
                onClick={() => setTool("eraser")}
                className={cn(
                  "flex-1 py-1 text-xs font-semibold rounded transition-all",
                  tool === "eraser"
                    ? "bg-primary dark:bg-[#A91D3A] text-white"
                    : "text-foreground/70 hover:text-foreground",
                )}
              >
                Eraser
              </button>
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex gap-3">
          <button
            onClick={clearBoard}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 text-foreground text-sm font-bold rounded-xl border border-white/5 hover:border-white/10 transition-colors"
          >
            <Trash2 size={16} />
            <span>Clear Board</span>
          </button>
          <button
            onClick={animateSignature}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary/20 hover:bg-primary/30 text-primary dark:text-[#ff9cb0] text-sm font-bold rounded-xl border border-primary/20 transition-colors"
          >
            <RotateCcw size={16} />
            <span>Replay Signature</span>
          </button>
        </div>
      </div>
    </div>
  );
};
