export type NodeType =
  | "hero"
  | "about"
  | "experience"
  | "skills"
  | "projects"
  | "education"
  | "contact"
  | "playground";

export interface CanvasNodeData {
  id: string;
  type: NodeType;
  worldX: number; // Position in canvas world space (px)
  worldY: number;
  width: number; // Width in world units
  height: number; // Height in world units
  title: string; // Section label shown above/header
  zIndex?: number;
  connectedTo?: string[]; // Node IDs connected visually via lines
  color?: string; // Accent indicator color
}

export interface ViewportState {
  offsetX: number;
  offsetY: number;
  scale: number;
}

export interface UseCanvasViewportOptions {
  nodes: CanvasNodeData[];
  minScale?: number;
  maxScale?: number;
}

export interface ConnectorLayerProps {
  nodes: CanvasNodeData[];
  scale: number;
}

export interface CanvasNodeProps {
  node: CanvasNodeData;
  isFocused: boolean;
  onFocus: (id: string) => void;
  children: React.ReactNode;
}

export interface MinimapProps {
  nodes: CanvasNodeData[];
  viewport: ViewportState;
  onSnapToNode: (id: string) => void;
  onPanToWorld: (worldX: number, worldY: number) => void;
}

export interface ToolbarProps {
  nodes: CanvasNodeData[];
  scale: number;
  focusedNodeId: string | null;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFitAll: () => void;
  onSnapToNode: (id: string) => void;
}

export interface FocusOverlayProps {
  nodes: CanvasNodeData[];
  focusedNodeId: string | null;
  onExitFocus: () => void;
  onSnapToNode: (id: string) => void;
}

export interface CanvasRootProps {
  children: React.ReactNode;
}

// ─── Interactive Playground Types ───────────────────────────────

export type PlaygroundTool =
  | "pen"
  | "eraser"
  | "magic"
  | "glow"
  | "stamp"
  | "shape";
export type ShapeType = "circle" | "square" | "star" | "triangle";
export type StampEmoji = "✨" | "🚀" | "🎨" | "💖" | "⚡" | "🌟";

export interface PlaygroundPoint {
  x: number;
  y: number;
  pressure?: number;
  velocity?: number;
}

export interface PlaygroundParticle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  shape?: string;
}

export interface PlaygroundStroke {
  id: string;
  points: PlaygroundPoint[];
  color: string;
  size: number;
  opacity: number;
  tool: PlaygroundTool;
  isGlow?: boolean;
  stampEmoji?: StampEmoji;
  shapeType?: ShapeType;
  createdAt: number;
}

export interface PlaygroundState {
  tool: PlaygroundTool;
  color: string;
  brushSize: number;
  fadeStrokes: boolean;
  enableSound: boolean;
  selectedStamp: StampEmoji;
  selectedShape: ShapeType;
}
