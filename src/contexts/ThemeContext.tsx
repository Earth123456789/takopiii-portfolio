"use client";

import React, { createContext, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Theme, ThemeContextType, ThemeProviderProps } from "@/types/context";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme, isMounted] = useLocalStorage<Theme>("theme", "dark");

  useEffect(() => {
    if (isMounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, isMounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {/* Always render the provider to avoid context errors during hydration.
          Optionally hide children to prevent theme flicker. */}
      {isMounted ? (
        children
      ) : (
        <div style={{ visibility: "hidden" }}>{children}</div>
      )}
    </ThemeContext.Provider>
  );
};
