"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "px-3 py-1 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-sm",
          theme === "light"
            ? "bg-primary text-white"
            : "bg-black/5 dark:bg-white/10 text-foreground/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/20 hover:text-foreground dark:hover:text-white",
        )}
      >
        <Sun size={16} /> Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "px-3 py-1 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-sm",
          theme === "dark"
            ? "bg-primary dark:bg-[#A91D3A] text-white"
            : "bg-black/5 dark:bg-white/10 text-foreground/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/20 hover:text-foreground dark:hover:text-white",
        )}
      >
        <Moon size={16} /> Dark
      </button>
    </div>
  );
};

export default ThemeToggle;
