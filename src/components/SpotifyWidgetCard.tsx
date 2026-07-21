"use client";

import React from "react";
import { SpotifyEmbed } from "./spotify/SpotifyEmbed";
import { cn } from "@/lib/utils";

interface SpotifyWidgetCardProps {
  spotifyId?: string;
  type?: "track" | "playlist" | "album";
  className?: string;
}

export const SpotifyWidgetCard: React.FC<SpotifyWidgetCardProps> = ({
  spotifyId,
  type = "playlist",
  className,
}) => {
  return (
    <div className={cn("w-full rounded-2xl shadow-2xl overflow-hidden", className)}>
      <SpotifyEmbed spotifyId={spotifyId} type={type} compact={false} />
    </div>
  );
};

export default SpotifyWidgetCard;
