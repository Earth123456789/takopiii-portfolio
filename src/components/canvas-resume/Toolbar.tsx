import React from "react";
import { CanvasNodeData, ToolbarProps } from "@/types/canvas";
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Sparkles } from "lucide-react";

export const Toolbar: React.FC<ToolbarProps> = ({
  nodes,
  scale,
  focusedNodeId,
  onZoomIn,
  onZoomOut,
  onReset,
  onFitAll,
  onSnapToNode,
}) => {
  return (
    <nav
      aria-label="Canvas Toolbar"
      className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-2xl bg-white/95 dark:bg-zinc-900/95 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-2xl select-none text-slate-900 dark:text-zinc-100 max-w-[95vw]"
    >
      {/* Brand Badge */}
      <div className="hidden sm:flex items-center gap-2 pr-3 border-r border-slate-200 dark:border-white/10">
        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200">
          Canvas
        </span>
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={onZoomOut}
          title="Zoom Out (-)"
          className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 active:bg-blue-500/20 transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs font-mono w-10 sm:w-12 text-center font-medium text-slate-700 dark:text-zinc-300">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={onZoomIn}
          title="Zoom In (+)"
          className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 active:bg-blue-500/20 transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>

      <div className="w-[1px] h-5 bg-slate-200 dark:bg-white/10 mx-0.5 sm:mx-1" />

      {/* Action Buttons */}
      <button
        onClick={onReset}
        title="Reset to Center"
        className="px-2 py-1.5 sm:p-2 rounded-lg text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center gap-1 text-xs"
      >
        <RotateCcw className="w-4 h-4" />
        <span className="text-xs font-medium">Center</span>
      </button>

      <button
        onClick={onFitAll}
        title="Fit All Nodes"
        className="px-2 py-1.5 sm:p-2 rounded-lg text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center gap-1 text-xs"
      >
        <Maximize2 className="w-4 h-4" />
        <span className="text-xs font-medium">Fit All</span>
      </button>

      <div className="w-[1px] h-5 bg-slate-200 dark:bg-white/10 mx-1 hidden md:block" />

      {/* Section Quick Jumps */}
      <div className="hidden md:flex items-center gap-1 pl-1">
        {nodes.map((node, idx) => {
          const isActive = focusedNodeId === node.id;
          return (
            <button
              key={node.id}
              onClick={() => onSnapToNode(node.id)}
              title={`Jump to ${node.title} (${idx + 1})`}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                isActive
                  ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
              }`}
            >
              {node.id.toUpperCase()}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
