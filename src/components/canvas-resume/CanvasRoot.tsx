import React, { forwardRef } from "react";
import { CanvasRootProps } from "@/types/canvas";

export const CanvasRoot = forwardRef<HTMLDivElement, CanvasRootProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        id="canvas-world-root"
        className="absolute top-0 left-0 w-0 h-0 transform-gpu select-none"
        style={{
          transformOrigin: "0 0",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    );
  },
);

CanvasRoot.displayName = "CanvasRoot";
