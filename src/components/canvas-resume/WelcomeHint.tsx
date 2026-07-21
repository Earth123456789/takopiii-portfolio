import React, { useState, useEffect } from "react";
import { MousePointer2, ZoomIn, Target, X } from "lucide-react";

export const WelcomeHint: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label="Canvas Onboarding Hint"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-5 py-3 rounded-2xl bg-white/95 dark:bg-zinc-900/95 border border-blue-500/30 text-slate-900 dark:text-zinc-100 shadow-2xl backdrop-blur-xl animate-bounce-short select-none"
    >
      <div className="flex items-center gap-5 text-xs">
        <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-zinc-300">
          <MousePointer2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Drag to Pan</span>
        </div>
        <div className="w-[1px] h-4 bg-slate-200 dark:bg-white/10" />
        <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-zinc-300">
          <ZoomIn className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Scroll to Zoom</span>
        </div>
        <div className="w-[1px] h-4 bg-slate-200 dark:bg-white/10" />
        <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-zinc-300">
          <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Double-Click Node to Focus</span>
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="p-1 rounded-full text-slate-400 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </aside>
  );
};
