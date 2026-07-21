"use client";

import React, { createContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  FontSize,
  FontSizeContextType,
  FontSizeProviderProps,
} from "@/types/context";
import { cn } from "@/lib/utils";

export const FontSizeContext = createContext<FontSizeContextType | undefined>(
  undefined,
);

const FONT_SIZE_MAP: Record<FontSize, string> = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
};

export const FontSizeProvider: React.FC<FontSizeProviderProps> = ({
  children,
}) => {
  const [fontSize, setFontSize, isMounted] = useLocalStorage<FontSize>(
    "fontSize",
    "medium",
  );

  const getFontSizeClass = (baseClass: string) => {
    // If not mounted yet, we can't reliably know the font size from localStorage
    // but we can return the base class or a default.
    // Usually, we just return the calculated class and let the hydration handle the update.
    const currentSize = isMounted ? fontSize : "medium";
    const fontSizeModifier = `font-size-${currentSize}`;

    if (baseClass.includes("text-")) {
      return cn(baseClass, fontSizeModifier);
    }

    return cn(FONT_SIZE_MAP[currentSize], fontSizeModifier, baseClass);
  };

  return (
    <FontSizeContext.Provider
      value={{ fontSize, setFontSize, getFontSizeClass }}
    >
      {/* We conditionally hide children until mounted if we want to avoid flickering, 
          but the PROVIDER must always be rendered. */}
      {isMounted ? (
        children
      ) : (
        <div style={{ visibility: "hidden" }}>{children}</div>
      )}
    </FontSizeContext.Provider>
  );
};
