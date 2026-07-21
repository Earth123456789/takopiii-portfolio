"use client";

import React from "react";
import {
  Pencil,
  Sparkles,
  Eraser,
  Trash2,
  Volume2,
  VolumeX,
  Flame,
  Sticker,
  Shapes,
  SunMoon,
} from "lucide-react";
import { PlaygroundTool, StampEmoji, ShapeType } from "@/types/canvas";
import { cn } from "@/lib/utils";
import { useAudio } from "@/hooks/useAudio";

interface PlaygroundToolbarProps {
  tool: PlaygroundTool;
  color: string;
  brushSize: number;
  fadeStrokes: boolean;
  selectedStamp: StampEmoji;
  selectedShape: ShapeType;
  onToolChange: (tool: PlaygroundTool) => void;
  onColorChange: (color: string) => void;
  onBrushSizeChange: (size: number) => void;
  onFadeToggle: () => void;
  onStampChange: (stamp: StampEmoji) => void;
  onShapeChange: (shape: ShapeType) => void;
  onClear: () => void;
  onBurst: () => void;
}

const PRESET_COLORS = [
  "#FF2A85", // Neon Pink
  "#00F0FF", // Neon Cyan
  "#FFE600", // Neon Yellow
  "#7000FF", // Deep Purple
  "#00FF66", // Spring Green
  "#FF5500", // Bright Orange
  "#FFFFFF", // White
];

const STAMPS: StampEmoji[] = ["✨", "🚀", "🎨", "💖", "⚡", "🌟"];
const SHAPES: ShapeType[] = ["circle", "square", "star", "triangle"];

export const PlaygroundToolbar: React.FC<PlaygroundToolbarProps> = ({
  tool,
  color,
  brushSize,
  fadeStrokes,
  selectedStamp,
  selectedShape,
  onToolChange,
  onColorChange,
  onBrushSizeChange,
  onFadeToggle,
  onStampChange,
  onShapeChange,
  onClear,
  onBurst,
}) => {
  const { isMuted, toggleMute, playTapSound, playHoverSound } = useAudio();

  const handleToolClick = (newTool: PlaygroundTool) => {
    playTapSound();
    onToolChange(newTool);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl transition-all select-none">
      {/* Primary Tool Selector */}
      <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-xl">
        <button
          onClick={() => handleToolClick("pen")}
          onMouseEnter={playHoverSound}
          className={cn(
            "p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
            tool === "pen"
              ? "bg-primary text-white shadow-md"
              : "text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10",
          )}
          title="Classic Pen"
        >
          <Pencil size={15} />
          <span className="hidden sm:inline">Pen</span>
        </button>

        <button
          onClick={() => handleToolClick("glow")}
          onMouseEnter={playHoverSound}
          className={cn(
            "p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
            tool === "glow"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30"
              : "text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10",
          )}
          title="Neon Glow Brush"
        >
          <Flame size={15} />
          <span className="hidden sm:inline">Glow</span>
        </button>

        <button
          onClick={() => handleToolClick("magic")}
          onMouseEnter={playHoverSound}
          className={cn(
            "p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
            tool === "magic"
              ? "bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-md animate-pulse"
              : "text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10",
          )}
          title="Rainbow Magic Brush"
        >
          <Sparkles size={15} />
          <span className="hidden sm:inline">Magic</span>
        </button>

        <button
          onClick={() => handleToolClick("stamp")}
          onMouseEnter={playHoverSound}
          className={cn(
            "p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
            tool === "stamp"
              ? "bg-purple-600 text-white shadow-md"
              : "text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10",
          )}
          title="Sticker Emoji Stamps"
        >
          <Sticker size={15} />
          <span className="hidden sm:inline">Sticker</span>
        </button>

        <button
          onClick={() => handleToolClick("shape")}
          onMouseEnter={playHoverSound}
          className={cn(
            "p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
            tool === "shape"
              ? "bg-blue-600 text-white shadow-md"
              : "text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10",
          )}
          title="Shape Generator"
        >
          <Shapes size={15} />
          <span className="hidden sm:inline">Shapes</span>
        </button>

        <button
          onClick={() => handleToolClick("eraser")}
          onMouseEnter={playHoverSound}
          className={cn(
            "p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
            tool === "eraser"
              ? "bg-rose-600 text-white shadow-md"
              : "text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10",
          )}
          title="Eraser"
        >
          <Eraser size={15} />
          <span className="hidden sm:inline">Eraser</span>
        </button>
      </div>

      {/* Dynamic Secondary Options (Color / Stamp / Shape) */}
      <div className="flex items-center gap-2">
        {tool === "stamp" ? (
          <div className="flex items-center gap-1">
            {STAMPS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  playTapSound();
                  onStampChange(s);
                }}
                className={cn(
                  "p-1.5 text-base rounded-lg transition-transform",
                  selectedStamp === s
                    ? "scale-125 bg-white/20"
                    : "hover:scale-110 opacity-70",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        ) : tool === "shape" ? (
          <div className="flex items-center gap-1">
            {SHAPES.map((sh) => (
              <button
                key={sh}
                onClick={() => {
                  playTapSound();
                  onShapeChange(sh);
                }}
                className={cn(
                  "px-2 py-1 text-xs uppercase font-bold rounded-lg transition-colors",
                  selectedShape === sh
                    ? "bg-blue-500 text-white"
                    : "bg-black/5 dark:bg-white/5 text-foreground/70 hover:text-foreground",
                )}
              >
                {sh}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  playTapSound();
                  onColorChange(c);
                }}
                className={cn(
                  "w-5 h-5 rounded-full border border-black/20 dark:border-white/20 transition-transform",
                  color === c
                    ? "scale-125 ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "hover:scale-110",
                )}
                style={{ backgroundColor: c }}
              />
            ))}
            <input
              type="color"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-6 h-6 rounded-full cursor-pointer bg-transparent border-0"
              title="Custom Color"
            />
          </div>
        )}
      </div>

      {/* Brush Size Slider & Actions */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-foreground/60 uppercase">
            Size
          </span>
          <input
            type="range"
            min={2}
            max={40}
            value={brushSize}
            onChange={(e) => onBrushSizeChange(Number(e.target.value))}
            className="w-16 sm:w-24 accent-primary cursor-pointer h-1.5 bg-black/10 dark:bg-white/10 rounded-lg"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={onBurst}
            onMouseEnter={playHoverSound}
            className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 hover:scale-105 transition-transform"
            title="Trigger Color Burst Confetti"
          >
            <Sparkles size={15} />
          </button>

          <button
            onClick={onFadeToggle}
            onMouseEnter={playHoverSound}
            className={cn(
              "p-2 rounded-xl text-xs font-bold transition-colors",
              fadeStrokes
                ? "bg-indigo-600 text-white"
                : "bg-black/5 dark:bg-white/5 text-foreground/60 hover:text-foreground",
            )}
            title="Toggle Auto-Fade Strokes"
          >
            <SunMoon size={15} />
          </button>

          <button
            onClick={toggleMute}
            onMouseEnter={playHoverSound}
            className={cn(
              "p-2 rounded-xl transition-colors",
              isMuted
                ? "bg-rose-500/20 text-rose-500"
                : "bg-black/5 dark:bg-white/5 text-foreground/70 hover:text-foreground",
            )}
            title={isMuted ? "Unmute Sound Engine" : "Mute Sound Engine"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <button
            onClick={onClear}
            onMouseEnter={playHoverSound}
            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors"
            title="Clear Canvas"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
