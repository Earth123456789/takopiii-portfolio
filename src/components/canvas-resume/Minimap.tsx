import React, { useState } from "react";
import { CanvasNodeData, ViewportState, MinimapProps } from "@/types/canvas";
import { Map, ChevronDown, ChevronUp } from "lucide-react";

export const Minimap: React.FC<MinimapProps> = ({
  nodes,
  viewport,
  onSnapToNode,
  onPanToWorld,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  // Compute bounding box for minimap scaling
  let minX = -3000;
  let maxX = 3000;
  let minY = -2000;
  let maxY = 3500;

  nodes.forEach((n) => {
    minX = Math.min(minX, n.worldX);
    minY = Math.min(minY, n.worldY);
    maxX = Math.max(maxX, n.worldX + n.width);
    maxY = Math.max(maxY, n.worldY + n.height);
  });

  const worldWidth = maxX - minX;
  const worldHeight = maxY - minY;

  const mapWidth = 160;
  const mapHeight = 110;

  // Scale factor: world unit to minimap pixel
  const scaleX = mapWidth / worldWidth;
  const scaleY = mapHeight / worldHeight;

  // Viewport rectangle calculation
  const vpWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vpHeight = typeof window !== "undefined" ? window.innerHeight : 800;

  const vpWorldX = (0 - viewport.offsetX) / viewport.scale;
  const vpWorldY = (0 - viewport.offsetY) / viewport.scale;
  const vpWorldWidth = vpWidth / viewport.scale;
  const vpWorldHeight = vpHeight / viewport.scale;

  const vpRectX = (vpWorldX - minX) * scaleX;
  const vpRectY = (vpWorldY - minY) * scaleY;
  const vpRectW = Math.max(12, vpWorldWidth * scaleX);
  const vpRectH = Math.max(10, vpWorldHeight * scaleY);

  const handleMinimapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const targetWorldX = minX + clickX / scaleX;
    const targetWorldY = minY + clickY / scaleY;

    onPanToWorld(targetWorldX, targetWorldY);
  };

  return (
    <aside
      aria-label="Canvas Minimap"
      className="fixed bottom-6 left-6 z-40 flex flex-col items-start select-none"
    >
      <div className="flex items-center gap-1.5 mb-1 px-2.5 py-1 rounded-t-lg bg-white/90 dark:bg-zinc-900/90 border border-slate-200 dark:border-white/10 text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-zinc-400 backdrop-blur-md">
        <Map className="w-3 h-3 text-blue-600 dark:text-blue-400" />
        <span>Minimap</span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-1 hover:text-slate-900 dark:hover:text-white"
        >
          {collapsed ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </button>
      </div>

      {!collapsed && (
        <div
          onClick={handleMinimapClick}
          style={{ width: `${mapWidth}px`, height: `${mapHeight}px` }}
          className="relative bg-white/90 dark:bg-zinc-950/90 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl cursor-crosshair group"
        >
          {/* Node Rectangles */}
          {nodes.map((node) => {
            const rx = (node.worldX - minX) * scaleX;
            const ry = (node.worldY - minY) * scaleY;
            const rw = Math.max(4, node.width * scaleX);
            const rh = Math.max(4, node.height * scaleY);

            return (
              <div
                key={node.id}
                style={{
                  left: `${rx}px`,
                  top: `${ry}px`,
                  width: `${rw}px`,
                  height: `${rh}px`,
                  backgroundColor: node.color || "#3B82F6",
                }}
                title={node.title}
                onClick={(e) => {
                  e.stopPropagation();
                  onSnapToNode(node.id);
                }}
                className="absolute rounded-[2px] opacity-70 hover:opacity-100 hover:scale-110 transition-all border border-black/50"
              />
            );
          })}

          {/* Current Viewport Indicator Box */}
          <div
            style={{
              left: `${vpRectX}px`,
              top: `${vpRectY}px`,
              width: `${vpRectW}px`,
              height: `${vpRectH}px`,
            }}
            className="absolute border-2 border-blue-400 bg-blue-500/10 pointer-events-none rounded-[3px] transition-all duration-75 shadow-sm"
          />
        </div>
      )}
    </aside>
  );
};
