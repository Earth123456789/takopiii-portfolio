import { FocusOverlayProps } from "@/types/canvas";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

export const FocusOverlay: React.FC<FocusOverlayProps> = ({
  nodes,
  focusedNodeId,
  onExitFocus,
  onSnapToNode,
}) => {
  if (!focusedNodeId) return null;

  const currentIndex = nodes.findIndex((n) => n.id === focusedNodeId);
  const currentNode = nodes[currentIndex];

  const prevNode = nodes[(currentIndex - 1 + nodes.length) % nodes.length];
  const nextNode = nodes[(currentIndex + 1) % nodes.length];

  return (
    <>
      {/* Soft dark vignette background */}
      <div
        className="fixed inset-0 z-20 bg-black/40 backdrop-blur-[2px] pointer-events-auto cursor-pointer transition-opacity duration-300"
        onClick={onExitFocus}
      />

      {/* Floating Bottom Navigation Controls */}
      <nav
        aria-label="Focus Section Navigation"
        className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 border border-blue-500/40 text-slate-900 dark:text-zinc-100 backdrop-blur-xl shadow-2xl select-none max-w-[95vw]"
      >
        <button
          onClick={onExitFocus}
          className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Overview</span>
          <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded bg-black/20 dark:bg-black/40 text-[10px] text-white font-mono">
            ESC
          </kbd>
        </button>

        <div className="w-[1px] h-5 bg-slate-200 dark:bg-white/10" />

        <div className="flex items-center gap-1 text-xs font-medium text-slate-800 dark:text-zinc-300 overflow-hidden">
          <button
            onClick={() => onSnapToNode(prevNode.id)}
            className="p-2 sm:p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 active:bg-blue-500/20 transition-colors flex items-center gap-1 shrink-0"
            title={`Previous: ${prevNode.title}`}
          >
            <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4" />
            <span className="hidden md:inline text-slate-500 dark:text-zinc-400">
              {prevNode.id}
            </span>
          </button>

          <span className="px-1.5 sm:px-2 font-bold text-slate-900 dark:text-zinc-100 uppercase tracking-wider text-xs truncate max-w-[120px] sm:max-w-none">
            {currentNode.title}
          </span>

          <button
            onClick={() => onSnapToNode(nextNode.id)}
            className="p-2 sm:p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 active:bg-blue-500/20 transition-colors flex items-center gap-1 shrink-0"
            title={`Next: ${nextNode.title}`}
          >
            <span className="hidden md:inline text-slate-500 dark:text-zinc-400">
              {nextNode.id}
            </span>
            <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </nav>
    </>
  );
};
