"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { SpotifyEmbed } from "./SpotifyEmbed";
import { useSlide } from "@/contexts/SlideContext";

interface SpotifyFloatingPlayerProps {
  spotifyId?: string;
  type?: "track" | "playlist" | "album";
}

export const SpotifyFloatingPlayer: React.FC<SpotifyFloatingPlayerProps> = ({
  spotifyId,
  type = "playlist",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { activeSlide } = useSlide();

  // Hide floating button on Hero slide (activeSlide === 0) on XL screens where side card is pinned
  const hideOnDesktop = activeSlide === 0;

  const handleToggle = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setIsPlaying(true);
    } else {
      setIsExpanded(false);
    }
  };

  const showNowPlaying = isPlaying || isExpanded;

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-[999] pointer-events-auto transition-all duration-300",
        hideOnDesktop && "xl:hidden",
      )}
    >
      {/* Persistent Spotify Iframe Container (Stays mounted in DOM so music keeps playing when minimized) */}
      <div
        className={cn(
          "absolute bottom-16 sm:bottom-20 right-0 w-[calc(100vw-2.5rem)] sm:w-[360px] max-w-[360px] rounded-2xl shadow-2xl transition-all duration-300 transform origin-bottom-right z-50 overflow-hidden",
          isExpanded
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "opacity-0 scale-95 pointer-events-none translate-y-4",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-xl border border-white/10 border-b-0 rounded-t-2xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <FaSpotify className="w-4 h-4 text-emerald-400" />
            <span>Spotify Player</span>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Minimize Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Embedded Iframe Player */}
        <SpotifyEmbed
          spotifyId={spotifyId}
          type={type}
          compact={false}
          className="rounded-t-none rounded-b-2xl border-t-0"
        />
      </div>

      {/* Spotify Button (Displays "Now Playing" badge with equalizer when music is playing) */}
      <button
        onClick={handleToggle}
        className={cn(
          "relative group flex items-center justify-center gap-2.5 rounded-full bg-emerald-500 text-slate-950 shadow-xl hover:shadow-[0_0_25px_rgba(16,185,129,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 border-none select-none cursor-pointer",
          showNowPlaying
            ? "px-4 py-2.5 sm:px-5 sm:py-3 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.6)]"
            : "w-12 h-12 sm:w-14 sm:h-14 rounded-full",
        )}
        title={
          showNowPlaying
            ? "Now Playing - Click to toggle player"
            : "Spotify Music - Click to listen"
        }
        aria-label="Toggle Spotify Music Player"
      >
        <FaSpotify
          className={cn(
            "text-slate-950 transition-transform duration-300",
            showNowPlaying
              ? "w-4 h-4 sm:w-5 sm:h-5 animate-pulse"
              : "w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110",
          )}
        />

        {showNowPlaying && (
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xs sm:text-sm tracking-wide uppercase">
              Now Playing
            </span>

            {/* Bouncing Soundwave Equalizer Bars */}
            <div className="flex items-end gap-[3px] h-3.5 sm:h-4">
              <span className="w-0.5 bg-slate-950 rounded-full animate-[bounce_0.8s_infinite_100ms] h-full" />
              <span className="w-0.5 bg-slate-950 rounded-full animate-[bounce_0.8s_infinite_300ms] h-[60%]" />
              <span className="w-0.5 bg-slate-950 rounded-full animate-[bounce_0.8s_infinite_200ms] h-[85%]" />
              <span className="w-0.5 bg-slate-950 rounded-full animate-[bounce_0.8s_infinite_400ms] h-[40%]" />
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default SpotifyFloatingPlayer;
