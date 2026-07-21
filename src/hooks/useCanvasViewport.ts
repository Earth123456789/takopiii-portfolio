import { useRef, useEffect, useState, useCallback } from "react";
import {
  ViewportState,
  UseCanvasViewportOptions,
} from "@/types/canvas";

export function useCanvasViewport({
  nodes,
  minScale = 0.2,
  maxScale = 2.5,
}: UseCanvasViewportOptions) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const worldRef = useRef<HTMLDivElement | null>(null);

  // Viewport reactive state for UI controls (Minimap, toolbar)
  const [viewport, setViewport] = useState<ViewportState>({
    offsetX: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    offsetY: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    scale: 1,
  });

  // Active focused node ID
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);

  // Interaction tracking (refs for high performance without re-render lag)
  const stateRef = useRef<{
    offsetX: number;
    offsetY: number;
    scale: number;
    isPanning: boolean;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    velocityX: number;
    velocityY: number;
    animFrameId: number | null;
    isAnimating: boolean;
  }>({
    offsetX: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    offsetY: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    scale: 1,
    isPanning: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    velocityX: 0,
    velocityY: 0,
    animFrameId: null,
    isAnimating: false,
  });

  // Apply CSS transform to world container element directly
  const applyTransform = useCallback((x: number, y: number, s: number) => {
    if (worldRef.current) {
      worldRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
    }
  }, []);

  // Update react state (throttled/batched for HUD sync)
  const syncState = useCallback(() => {
    setViewport({
      offsetX: stateRef.current.offsetX,
      offsetY: stateRef.current.offsetY,
      scale: stateRef.current.scale,
    });
  }, []);

  // Center & view update
  const setTransform = useCallback(
    (x: number, y: number, s: number, syncReact = true) => {
      stateRef.current.offsetX = x;
      stateRef.current.offsetY = y;
      stateRef.current.scale = s;
      applyTransform(x, y, s);
      if (syncReact) {
        syncState();
      }
    },
    [applyTransform, syncState],
  );

  // Smooth animation to target coordinates & scale
  const animateTo = useCallback(
    (targetX: number, targetY: number, targetScale: number, duration = 450) => {
      if (stateRef.current.animFrameId) {
        cancelAnimationFrame(stateRef.current.animFrameId);
      }

      const startX = stateRef.current.offsetX;
      const startY = stateRef.current.offsetY;
      const startScale = stateRef.current.scale;
      const startTime = performance.now();
      stateRef.current.isAnimating = true;

      const cubicBezierEaseOut = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = cubicBezierEaseOut(progress);

        const currentX = startX + (targetX - startX) * ease;
        const currentY = startY + (targetY - startY) * ease;
        const currentScale = startScale + (targetScale - startScale) * ease;

        setTransform(currentX, currentY, currentScale, false);

        if (progress < 1) {
          stateRef.current.animFrameId = requestAnimationFrame(step);
        } else {
          stateRef.current.isAnimating = false;
          syncState();
        }
      };

      stateRef.current.animFrameId = requestAnimationFrame(step);
    },
    [setTransform, syncState],
  );

  // Inertia momentum loop
  const stopInertia = useCallback(() => {
    if (stateRef.current.animFrameId && !stateRef.current.isAnimating) {
      cancelAnimationFrame(stateRef.current.animFrameId);
      stateRef.current.animFrameId = null;
    }
  }, []);

  const startInertia = useCallback(() => {
    stopInertia();
    const loop = () => {
      stateRef.current.velocityX *= 0.92;
      stateRef.current.velocityY *= 0.92;

      const nextX = stateRef.current.offsetX + stateRef.current.velocityX;
      const nextY = stateRef.current.offsetY + stateRef.current.velocityY;

      setTransform(nextX, nextY, stateRef.current.scale, false);

      if (
        Math.abs(stateRef.current.velocityX) > 0.3 ||
        Math.abs(stateRef.current.velocityY) > 0.3
      ) {
        stateRef.current.animFrameId = requestAnimationFrame(loop);
      } else {
        syncState();
      }
    };
    stateRef.current.animFrameId = requestAnimationFrame(loop);
  }, [setTransform, syncState, stopInertia]);

  // Snap to specific node
  const snapToNode = useCallback(
    (nodeId: string) => {
      const node = nodes.find((n) => n.id === nodeId);
      if (!node || !containerRef.current) return;

      const viewportWidth = containerRef.current.clientWidth;
      const viewportHeight = containerRef.current.clientHeight;

      // Desired zoom level to fit node nicely (~80% of screen height)
      const targetScale = Math.min(
        maxScale,
        Math.max(minScale, (viewportHeight * 0.75) / node.height),
      );

      // Node center in world coordinates
      const nodeCenterX = node.worldX + node.width / 2;
      const nodeCenterY = node.worldY + node.height / 2;

      // Transform equation: screenCenter = (worldCenter + offset) * scale
      // => offset = screenCenter / scale - worldCenter
      const targetOffsetX = viewportWidth / 2 - nodeCenterX * targetScale;
      const targetOffsetY = viewportHeight / 2 - nodeCenterY * targetScale;

      setFocusedNodeId(nodeId);
      animateTo(targetOffsetX, targetOffsetY, targetScale, 500);
    },
    [nodes, minScale, maxScale, animateTo],
  );

  // Fit all nodes into view
  const fitAll = useCallback(() => {
    if (!containerRef.current || nodes.length === 0) return;

    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    nodes.forEach((n) => {
      minX = Math.min(minX, n.worldX);
      minY = Math.min(minY, n.worldY);
      maxX = Math.max(maxX, n.worldX + n.width);
      maxY = Math.max(maxY, n.worldY + n.height);
    });

    const padding = 150;
    const worldW = maxX - minX + padding * 2;
    const worldH = maxY - minY + padding * 2;
    const vpW = containerRef.current.clientWidth;
    const vpH = containerRef.current.clientHeight;

    const scaleX = vpW / worldW;
    const scaleY = vpH / worldH;
    const targetScale = Math.max(
      minScale,
      Math.min(maxScale, Math.min(scaleX, scaleY)),
    );

    const worldCenterX = (minX + maxX) / 2;
    const worldCenterY = (minY + maxY) / 2;

    const targetOffsetX = vpW / 2 - worldCenterX * targetScale;
    const targetOffsetY = vpH / 2 - worldCenterY * targetScale;

    setFocusedNodeId(null);
    animateTo(targetOffsetX, targetOffsetY, targetScale, 600);
  }, [nodes, minScale, maxScale, animateTo]);

  // Reset to Hero node
  const resetView = useCallback(() => {
    snapToNode("hero");
  }, [snapToNode]);

  // Zoom in/out incrementally
  const zoomIncremental = useCallback(
    (factor: number) => {
      if (!containerRef.current) return;
      const vpW = containerRef.current.clientWidth;
      const vpH = containerRef.current.clientHeight;

      const currentScale = stateRef.current.scale;
      const newScale = Math.min(
        maxScale,
        Math.max(minScale, currentScale * factor),
      );

      const cursorWorldX = (vpW / 2 - stateRef.current.offsetX) / currentScale;
      const cursorWorldY = (vpH / 2 - stateRef.current.offsetY) / currentScale;

      const newOffsetX = vpW / 2 - cursorWorldX * newScale;
      const newOffsetY = vpH / 2 - cursorWorldY * newScale;

      animateTo(newOffsetX, newOffsetY, newScale, 300);
    },
    [minScale, maxScale, animateTo],
  );

  // Setup Event Listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initial positioning (adapted for mobile screen sizes)
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 640;
      const initialScale = isMobile ? 0.6 : 1;
      const initialX = window.innerWidth / 2;
      const initialY = window.innerHeight / 2;
      setTransform(initialX, initialY, initialScale, true);
    }

    // Touch pinch tracking
    let pinchStartDist = 0;
    let pinchStartScale = 1;

    const getTouchDistance = (touches: TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        stopInertia();
        pinchStartDist = getTouchDistance(e.touches);
        pinchStartScale = stateRef.current.scale;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchStartDist > 0) {
        e.preventDefault();
        const dist = getTouchDistance(e.touches);
        const scaleFactor = dist / pinchStartDist;
        const newScale = Math.min(
          maxScale,
          Math.max(minScale, pinchStartScale * scaleFactor),
        );

        const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

        const cursorWorldX =
          (centerX - stateRef.current.offsetX) / stateRef.current.scale;
        const cursorWorldY =
          (centerY - stateRef.current.offsetY) / stateRef.current.scale;

        const newOffsetX = centerX - cursorWorldX * newScale;
        const newOffsetY = centerY - cursorWorldY * newScale;

        setTransform(newOffsetX, newOffsetY, newScale, true);
      }
    };

    const handleTouchEnd = () => {
      pinchStartDist = 0;
    };

    // Pointer down (start pan)
    const handlePointerDown = (e: PointerEvent) => {
      // Don't pan if clicking on an interactive node input/button directly
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

      stopInertia();
      stateRef.current.isPanning = true;
      stateRef.current.startX = e.clientX;
      stateRef.current.startY = e.clientY;
      stateRef.current.lastX = e.clientX;
      stateRef.current.lastY = e.clientY;
      stateRef.current.velocityX = 0;
      stateRef.current.velocityY = 0;

      container.style.cursor = "grabbing";
      if (container.setPointerCapture && e.pointerId !== undefined) {
        try {
          container.setPointerCapture(e.pointerId);
        } catch {
          // ignore pointer capture errors on mobile touch devices
        }
      }
    };

    // Pointer move (dragging)
    const handlePointerMove = (e: PointerEvent) => {
      if (!stateRef.current.isPanning) return;

      const deltaX = e.clientX - stateRef.current.lastX;
      const deltaY = e.clientY - stateRef.current.lastY;

      stateRef.current.velocityX = deltaX;
      stateRef.current.velocityY = deltaY;

      stateRef.current.lastX = e.clientX;
      stateRef.current.lastY = e.clientY;

      const nextX = stateRef.current.offsetX + deltaX;
      const nextY = stateRef.current.offsetY + deltaY;

      setTransform(nextX, nextY, stateRef.current.scale, false);
    };

    // Pointer up (release + inertia)
    const handlePointerUp = (e: PointerEvent) => {
      if (!stateRef.current.isPanning) return;
      stateRef.current.isPanning = false;
      container.style.cursor = "grab";

      if (
        container.hasPointerCapture &&
        e.pointerId !== undefined &&
        container.hasPointerCapture(e.pointerId)
      ) {
        container.releasePointerCapture(e.pointerId);
      }

      startInertia();
    };

    // Wheel zoom (point-under-cursor)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      stopInertia();

      const zoomFactor = Math.exp(-e.deltaY * 0.0015);
      const currentScale = stateRef.current.scale;
      const newScale = Math.min(
        maxScale,
        Math.max(minScale, currentScale * zoomFactor),
      );

      const rect = container.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      const cursorWorldX = (cursorX - stateRef.current.offsetX) / currentScale;
      const cursorWorldY = (cursorY - stateRef.current.offsetY) / currentScale;

      const newOffsetX = cursorX - cursorWorldX * newScale;
      const newOffsetY = cursorY - cursorWorldY * newScale;

      setTransform(newOffsetX, newOffsetY, newScale, true);
    };

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointercancel", handlePointerUp);
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointercancel", handlePointerUp);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [setTransform, startInertia, stopInertia, minScale, maxScale]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "Escape") {
        setFocusedNodeId(null);
        fitAll();
      } else if (e.key === "0" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        resetView();
      } else if (e.key === "=" || e.key === "+") {
        zoomIncremental(1.2);
      } else if (e.key === "-") {
        zoomIncremental(0.8);
      } else if (["1", "2", "3", "4", "5", "6", "7", "8"].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (nodes[idx]) {
          snapToNode(nodes[idx].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fitAll, resetView, snapToNode, zoomIncremental, nodes]);

  return {
    containerRef,
    worldRef,
    viewport,
    focusedNodeId,
    setFocusedNodeId,
    snapToNode,
    fitAll,
    resetView,
    zoomIncremental,
    setTransform,
  };
}
