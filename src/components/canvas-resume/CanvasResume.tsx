"use client";

import React from "react";
import { INITIAL_CANVAS_NODES } from "@/data/canvasNodes";
import { useCanvasViewport } from "@/hooks/useCanvasViewport";
import { CanvasRoot } from "./CanvasRoot";
import { CanvasNode } from "./CanvasNode";
import { ConnectorLayer } from "./ConnectorLayer";
import { Toolbar } from "./Toolbar";
import { Minimap } from "./Minimap";
import { WelcomeHint } from "./WelcomeHint";
import { FocusOverlay } from "./FocusOverlay";

// Node Components
import { HeroNode } from "./nodes/HeroNode";
import { AboutNode } from "./nodes/AboutNode";
import { SkillsNode } from "./nodes/SkillsNode";
import { ExperienceNode } from "./nodes/ExperienceNode";
import { ProjectsNode } from "./nodes/ProjectsNode";
import { EducationNode } from "./nodes/EducationNode";
import { ContactNode } from "./nodes/ContactNode";
import { PlaygroundNode } from "./nodes/PlaygroundNode";
import { NodeType } from "@/types/canvas";

import { useTheme } from "@/hooks/useTheme";

export const CanvasResume: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const {
    containerRef,
    worldRef,
    viewport,
    focusedNodeId,
    snapToNode,
    fitAll,
    resetView,
    zoomIncremental,
    setTransform,
  } = useCanvasViewport({
    nodes: INITIAL_CANVAS_NODES,
  });

  const renderNodeContent = (type: NodeType) => {
    switch (type) {
      case "hero":
        return <HeroNode />;
      case "about":
        return <AboutNode />;
      case "skills":
        return <SkillsNode />;
      case "experience":
        return <ExperienceNode />;
      case "projects":
        return <ProjectsNode />;
      case "education":
        return <EducationNode />;
      case "contact":
        return <ContactNode />;
      case "playground":
        return <PlaygroundNode />;
      default:
        return null;
    }
  };

  const handlePanToWorld = (worldX: number, worldY: number) => {
    if (!containerRef.current) return;
    const vpW = containerRef.current.clientWidth;
    const vpH = containerRef.current.clientHeight;

    const targetOffsetX = vpW / 2 - worldX * viewport.scale;
    const targetOffsetY = vpH / 2 - worldY * viewport.scale;

    setTransform(targetOffsetX, targetOffsetY, viewport.scale, true);
  };

  return (
    <main
      ref={containerRef}
      className={`relative w-screen h-screen overflow-hidden cursor-grab select-none font-sans transition-colors duration-300 ${
        isDark ? "bg-[#09090B] text-zinc-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* Background Dot Grid Pattern (Figma Canvas style) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)"
            : "radial-gradient(rgba(0, 0, 0, 0.3) 1px, transparent 1px)",
          backgroundSize: `${32 * viewport.scale}px ${32 * viewport.scale}px`,
          backgroundPosition: `${viewport.offsetX}px ${viewport.offsetY}px`,
        }}
      />

      {/* SVG Connector Lines Layer */}
      <ConnectorLayer nodes={INITIAL_CANVAS_NODES} scale={viewport.scale} />

      {/* Transformable Canvas World Root */}
      <CanvasRoot ref={worldRef}>
        {INITIAL_CANVAS_NODES.map((node) => (
          <CanvasNode
            key={node.id}
            node={node}
            isFocused={focusedNodeId === node.id}
            onFocus={(id) => snapToNode(id)}
          >
            {renderNodeContent(node.type)}
          </CanvasNode>
        ))}
      </CanvasRoot>

      {/* HUD Navigation Toolbar */}
      <Toolbar
        nodes={INITIAL_CANVAS_NODES}
        scale={viewport.scale}
        focusedNodeId={focusedNodeId}
        onZoomIn={() => zoomIncremental(1.25)}
        onZoomOut={() => zoomIncremental(0.8)}
        onReset={resetView}
        onFitAll={fitAll}
        onSnapToNode={snapToNode}
      />

      {/* Minimap Panel */}
      <Minimap
        nodes={INITIAL_CANVAS_NODES}
        viewport={viewport}
        onSnapToNode={snapToNode}
        onPanToWorld={handlePanToWorld}
      />

      {/* Onboarding Welcome Hint */}
      <WelcomeHint />

      {/* Focus Overlay & Section Nav */}
      <FocusOverlay
        nodes={INITIAL_CANVAS_NODES}
        focusedNodeId={focusedNodeId}
        onExitFocus={fitAll}
        onSnapToNode={snapToNode}
      />
    </main>
  );
};
