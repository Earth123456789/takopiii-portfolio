import React from "react";
import { CanvasNodeData, ConnectorLayerProps } from "@/types/canvas";

export const ConnectorLayer: React.FC<ConnectorLayerProps> = ({
  nodes,
  scale,
}) => {
  // Hide connectors when zoomed out too far for clarity
  if (scale < 0.25) return null;

  const nodeMap = new Map<string, CanvasNodeData>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  const connections: {
    from: CanvasNodeData;
    to: CanvasNodeData;
    key: string;
  }[] = [];

  nodes.forEach((source) => {
    if (source.connectedTo) {
      source.connectedTo.forEach((targetId) => {
        const target = nodeMap.get(targetId);
        if (target) {
          connections.push({
            from: source,
            to: target,
            key: `${source.id}-${target.id}`,
          });
        }
      });
    }
  });

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible"
      style={{ opacity: Math.min(1, scale * 1.2) }}
    >
      <defs>
        <linearGradient
          id="connector-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.3" />
        </linearGradient>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#3B82F6" fillOpacity="0.8" />
        </marker>
      </defs>

      {connections.map(({ from, to, key }) => {
        // Calculate center anchor points in world coordinates
        const x1 = from.worldX + from.width / 2;
        const y1 = from.worldY + from.height / 2;
        const x2 = to.worldX + to.width / 2;
        const y2 = to.worldY + to.height / 2;

        // Cubic bezier control points
        const dx = x2 - x1;
        const cx1 = x1 + dx * 0.5;
        const cy1 = y1;
        const cx2 = x1 + dx * 0.5;
        const cy2 = y2;

        const pathData = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

        return (
          <g key={key}>
            {/* Background glow path */}
            <path
              d={pathData}
              fill="none"
              stroke="#2563EB"
              strokeWidth="4"
              strokeOpacity="0.15"
            />
            {/* Animated dashed line */}
            <path
              d={pathData}
              fill="none"
              stroke="url(#connector-gradient)"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="animate-pulse"
              markerEnd="url(#arrowhead)"
            />
          </g>
        );
      })}
    </svg>
  );
};
