"use client";

import React from "react";
import { Pencil, Eraser, Trash2, Download, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaintToolbarProps {
  isDrawingActive: boolean;
  onToggleDrawingActive: () => void;
  color: string;
  onChangeColor: (color: string) => void;
  brushSize: number;
  onChangeBrushSize: (size: number) => void;
  tool: "pen" | "eraser";
  onChangeTool: (tool: "pen" | "eraser") => void;
  fadeStrokes: boolean;
  onToggleFadeStrokes: () => void;
  onClear: () => void;
  onExport: () => void;
}

const PRESET_COLORS = [
  { name: "Neon Red", value: "#E94560" },
  { name: "Cyber Cyan", value: "#00F0FF" },
  { name: "Neon Purple", value: "#BD00FF" },
  { name: "Emerald", value: "#10B981" },
  { name: "Amber", value: "#F59E0B" },
  { name: "White", value: "#FFFFFF" },
];

const BRUSH_SIZES = [
  { label: "S", value: 3 },
  { label: "M", value: 6 },
  { label: "L", value: 12 },
  { label: "XL", value: 20 },
];

export const PaintToolbar: React.FC<PaintToolbarProps> = ({
  isDrawingActive,
  onToggleDrawingActive,
  color,
  onChangeColor,
  brushSize,
  onChangeTool,
  tool,
  onChangeBrushSize,
  fadeStrokes,
  onToggleFadeStrokes,
  onClear,
  onExport,
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] max-w-[95vw] sm:max-w-2xl w-auto pointer-events-auto select-none">
      <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 transition-all duration-300">
        {/* Draw Mode Toggle Pill */}
        <button
          onClick={onToggleDrawingActive}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-md",
            isDrawingActive
              ? "bg-gradient-to-r from-primary dark:from-[#A91D3A] to-rose-500 text-white shadow-primary/30 animate-pulse"
              : "bg-white/5 hover:bg-white/10 text-foreground/70",
          )}
          title={
            isDrawingActive
              ? "Drawing Active: Click & drag on slide to draw"
              : "Click to enable drawing mode"
          }
        >
          <Pencil
            size={14}
            className={isDrawingActive ? "animate-bounce" : ""}
          />
          <span>{isDrawingActive ? "Paint Mode ON" : "Paint Mode OFF"}</span>
        </button>

        <div className="h-4 w-[1px] bg-white/10 mx-0.5 hidden sm:block" />

        {/* Color Palette */}
        {isDrawingActive && (
          <div className="flex items-center gap-1.5 px-1">
            {PRESET_COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => {
                  onChangeTool("pen");
                  onChangeColor(c.value);
                }}
                className={cn(
                  "w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all duration-200 hover:scale-110",
                  color === c.value && tool === "pen"
                    ? "border-white scale-110 shadow-md"
                    : "border-transparent opacity-80 hover:opacity-100",
                )}
                style={{
                  backgroundColor: c.value,
                  boxShadow:
                    color === c.value && tool === "pen"
                      ? `0 0 8px ${c.value}`
                      : "none",
                }}
                aria-label={c.name}
              />
            ))}
          </div>
        )}

        {isDrawingActive && (
          <div className="h-4 w-[1px] bg-white/10 mx-0.5 hidden sm:block" />
        )}

        {/* Tool Mode (Pen / Eraser) */}
        {isDrawingActive && (
          <div className="flex items-center bg-white/5 rounded-xl p-0.5 border border-white/5">
            <button
              onClick={() => onChangeTool("pen")}
              className={cn(
                "p-1.5 rounded-lg text-xs font-semibold transition-all",
                tool === "pen"
                  ? "bg-primary dark:bg-[#A91D3A] text-white shadow"
                  : "text-foreground/60 hover:text-foreground",
              )}
              title="Pen Tool"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={() => onChangeTool("eraser")}
              className={cn(
                "p-1.5 rounded-lg text-xs font-semibold transition-all",
                tool === "eraser"
                  ? "bg-primary dark:bg-[#A91D3A] text-white shadow"
                  : "text-foreground/60 hover:text-foreground",
              )}
              title="Eraser Tool"
            >
              <Eraser size={13} />
            </button>
          </div>
        )}

        {/* Brush Sizes */}
        {isDrawingActive && (
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-0.5 border border-white/5">
            {BRUSH_SIZES.map((b) => (
              <button
                key={b.value}
                onClick={() => onChangeBrushSize(b.value)}
                className={cn(
                  "w-6 h-6 text-[10px] font-extrabold rounded-lg transition-all",
                  brushSize === b.value
                    ? "bg-white/20 text-white"
                    : "text-foreground/60 hover:text-foreground",
                )}
              >
                {b.label}
              </button>
            ))}
          </div>
        )}

        {isDrawingActive && (
          <div className="h-4 w-[1px] bg-white/10 mx-0.5 hidden sm:block" />
        )}

        {/* Fade Toggle */}
        {isDrawingActive && (
          <button
            onClick={onToggleFadeStrokes}
            className={cn(
              "flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-medium transition-colors",
              fadeStrokes
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                : "bg-white/5 text-foreground/60 hover:text-foreground",
            )}
            title="Auto-fade strokes after 4.5s"
          >
            <Sparkles size={13} />
            <span className="hidden sm:inline">Fade</span>
          </button>
        )}

        {/* Actions (Clear & Export) */}
        {isDrawingActive && (
          <div className="flex items-center gap-1">
            <button
              onClick={onClear}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-foreground/70 transition-colors border border-white/5"
              title="Clear Canvas"
            >
              <Trash2 size={14} />
            </button>
            <button
              onClick={onExport}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 text-foreground/70 transition-colors border border-white/5"
              title="Export Canvas to PNG"
            >
              <Download size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
