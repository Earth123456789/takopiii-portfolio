import React from "react";
import { CanvasPlayground } from "@/components/playground/CanvasPlayground";
import { Palette, Info } from "lucide-react";

export const PlaygroundNode: React.FC = () => {
  return (
    <section className="flex flex-col h-full gap-3 p-1">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2">
        <div className="flex items-center gap-2 text-indigo-500 dark:text-indigo-400 font-semibold text-sm">
          <Palette className="w-4 h-4" />
          <h2>Interactive Canvas Playground</h2>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-foreground/60 font-mono">
          <Info className="w-3 h-3" />
          <span>Draw freely &amp; interact</span>
        </div>
      </header>

      <div className="flex-1 w-full rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 no-pan relative">
        <CanvasPlayground />
      </div>
    </section>
  );
};
