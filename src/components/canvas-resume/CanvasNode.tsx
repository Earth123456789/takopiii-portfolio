import { CanvasNodeProps } from "@/types/canvas";
import { cn } from "@/lib/utils";

export const CanvasNode: React.FC<CanvasNodeProps> = ({
  node,
  isFocused,
  onFocus,
  children,
}) => {
  return (
    <article
      id={`canvas-node-${node.id}`}
      style={{
        position: "absolute",
        left: `${node.worldX}px`,
        top: `${node.worldY}px`,
        width: `${node.width}px`,
        height: `${node.height}px`,
        zIndex: isFocused ? 50 : node.zIndex || 5,
      }}
      className="group transition-shadow duration-300 pointer-events-auto cursor-pointer"
      onClick={(e) => {
        // Prevent click if tapping on child links or buttons
        const target = e.target as HTMLElement;
        if (
          target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("canvas") ||
          target.closest(".no-pan")
        ) {
          return;
        }
        e.stopPropagation();
        onFocus(node.id);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onFocus(node.id);
      }}
    >
      {/* Node Title Badge Header */}
      <header className="absolute -top-9 left-2 flex items-center gap-2 pointer-events-none z-10">
        <span
          className="w-2.5 h-2.5 rounded-full shadow-sm"
          style={{ backgroundColor: node.color || "#2563EB" }}
        />
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-300/80 bg-zinc-900/80 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10 shadow-lg">
          {node.title}
        </h3>
      </header>

      {/* Main Node Frame Container */}
      <div
        className={cn(
          "w-full h-full rounded-2xl overflow-hidden backdrop-blur-xl border transition-all duration-300 flex flex-col",
          "bg-white/90 dark:bg-zinc-950/85 border-slate-200 dark:border-white/10 text-slate-900 dark:text-zinc-100 shadow-xl dark:shadow-2xl",
          isFocused
            ? "ring-2 ring-blue-500 ring-offset-4 ring-offset-white dark:ring-offset-zinc-950 border-blue-500/50 shadow-blue-500/20"
            : "hover:border-blue-500/40 hover:shadow-blue-500/10",
        )}
      >
        {/* Decorative Figma Frame Topbar */}
        <div className="h-9 px-4 bg-slate-100/60 dark:bg-white/[0.03] border-b border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
            {node.id} · {node.width}x{node.height}
          </span>
        </div>

        {/* Node Content Body */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
          {children}
        </div>
      </div>
    </article>
  );
};
