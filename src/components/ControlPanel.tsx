"use client";

import React, { useState } from "react";
import { Settings, Layout, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import FontSizeSwitcher from "./FontSizeSwitcher";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

const ControlPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-4 lg:top-4 lg:right-4 lg:bottom-auto lg:left-auto z-50">
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-3 bg-gradient-to-r from-primary dark:from-[#A91D3A] to-primary/80 dark:to-[#C72C41] text-white rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95",
          isOpen ? "rotate-90" : "rotate-0",
        )}
        aria-label="Settings"
      >
        <Settings size={20} />
      </button>

      {/* Control Panel */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 lg:top-16 lg:right-0 lg:bottom-auto lg:left-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-xl p-5 border border-gray-200 dark:border-white/10 shadow-2xl min-w-[240px] animate-in fade-in-0 slide-in-from-bottom-4 lg:slide-in-from-top-4 duration-300">
          <div className="space-y-6">
            {/* View Mode Switcher */}
            <div>
              <h3 className="text-foreground text-sm font-bold mb-3 tracking-wide uppercase opacity-70">
                View Mode
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/"
                  className={cn(
                    "flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all",
                    pathname === "/"
                      ? "bg-primary text-white border-primary shadow-md"
                      : "bg-white/10 text-foreground border-gray-200 dark:border-white/10 hover:bg-white/20",
                  )}
                >
                  <Layout size={14} />
                  <span>Slides</span>
                </Link>
                <Link
                  href="/canvas"
                  className={cn(
                    "flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all",
                    pathname === "/canvas"
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white/10 text-foreground border-gray-200 dark:border-white/10 hover:bg-white/20",
                  )}
                >
                  <LayoutGrid size={14} />
                  <span>Canvas</span>
                </Link>
              </div>
            </div>

            {/* Language Switcher */}
            <div>
              <h3 className="text-foreground text-sm font-bold mb-3 tracking-wide uppercase opacity-70">
                Language
              </h3>
              <LanguageSwitcher />
            </div>

            {/* Font Size Switcher */}
            <div>
              <h3 className="text-foreground text-sm font-bold mb-3 tracking-wide uppercase opacity-70">
                Font Size
              </h3>
              <FontSizeSwitcher />
            </div>

            {/* Theme Switcher */}
            <div>
              <h3 className="text-foreground text-sm font-bold mb-3 tracking-wide uppercase opacity-70">
                Theme
              </h3>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10 bg-black/5"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ControlPanel;
