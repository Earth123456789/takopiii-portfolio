"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Layout, LayoutGrid, Touchpad } from "lucide-react";

export const ModeSwitchHint: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isCanvas = pathname === "/canvas";
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-capable devices (mobile phones & tablets)
    if (typeof window !== "undefined") {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches,
      );
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (e.key === "q" || e.key === "Q") {
        e.preventDefault();
        if (isCanvas) {
          router.push("/");
        } else {
          router.push("/canvas");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCanvas, router]);

  return (
    <div className="fixed top-4 left-4 z-50 select-none animate-in fade-in-0 slide-in-from-top-2 duration-300 hidden lg:flex">
      <button
        onClick={() => router.push(isCanvas ? "/" : "/canvas")}
        className={`group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-2 rounded-full border shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
          isCanvas
            ? "bg-zinc-900/95 text-zinc-100 border-blue-500/40 shadow-blue-500/20 hover:border-blue-400"
            : "bg-white/95 dark:bg-zinc-900/95 text-foreground border-primary/40 dark:border-white/20 hover:border-primary shadow-primary/10"
        }`}
        title={
          isTouchDevice
            ? `Tap to switch to ${isCanvas ? "Slides Mode" : "Canvas Mode"}`
            : `Press Q to switch to ${isCanvas ? "Slides Mode" : "Canvas Mode"}`
        }
      >
        <div className="flex items-center justify-center w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-blue-600 text-white font-mono text-xs font-extrabold shadow-md group-hover:scale-110 transition-transform">
          {isTouchDevice ? <Touchpad className="w-3.5 h-3.5" /> : "Q"}
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold tracking-wide">
          {isCanvas ? (
            <>
              <Layout className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-blue-400" />
              <span>Slides View</span>
            </>
          ) : (
            <>
              <LayoutGrid className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-primary" />
              <span>Canvas View</span>
            </>
          )}
        </div>

        <span className="text-[10px] font-mono opacity-80 bg-blue-500/10 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full font-semibold">
          {isTouchDevice ? "Tap" : "Press Q"}
        </span>
      </button>
    </div>
  );
};

export default ModeSwitchHint;
