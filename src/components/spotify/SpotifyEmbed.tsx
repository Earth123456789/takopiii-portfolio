"use client";

import React from "react";
import { SpotifyEmbedProps } from "@/types/spotify";
import { cn } from "@/lib/utils";

/**
 * Extracts Spotify type and ID from a string which can be an ID, a full URL, or a URI.
 */
function parseSpotifyTarget(input?: string, defaultType: "track" | "playlist" | "album" = "track") {
  const targetStr =
    input ||
    process.env.NEXT_PUBLIC_SPOTIFY_ID ||
    process.env.NEXT_PUBLIC_SPOTIFY_TRACK_ID;

  const envType = (process.env.NEXT_PUBLIC_SPOTIFY_TYPE as "track" | "playlist" | "album") || defaultType;

  if (!targetStr) {
    return { type: envType, id: "4cOdK2wGLETKBW3PvgPWqT" }; // Default fallback track (Sparks - Coldplay)
  }

  // Check for full URL: https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT
  const urlMatch = targetStr.match(/open\.spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/);
  if (urlMatch) {
    return { type: urlMatch[1] as "track" | "playlist" | "album", id: urlMatch[2] };
  }

  // Check for URI: spotify:track:4cOdK2wGLETKBW3PvgPWqT
  const uriMatch = targetStr.match(/spotify:(track|playlist|album):([a-zA-Z0-9]+)/);
  if (uriMatch) {
    return { type: uriMatch[1] as "track" | "playlist" | "album", id: uriMatch[2] };
  }

  // Pure ID
  return { type: envType, id: targetStr.trim() };
}

export const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({
  spotifyId,
  type = "track",
  height,
  compact = false,
  className,
}) => {
  const target = parseSpotifyTarget(spotifyId, type);
  const embedUrl = `https://open.spotify.com/embed/${target.type}/${target.id}?utm_source=generator&theme=0`;
  
  const iframeHeight = height ?? (compact ? (target.type === "playlist" ? 152 : 80) : (target.type === "playlist" ? 352 : 152));

  return (
    <div className={cn("w-full overflow-hidden rounded-2xl shadow-md border border-white/10 bg-black/30 backdrop-blur-md", className)}>
      <iframe
        src={embedUrl}
        width="100%"
        height={iframeHeight}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="w-full rounded-2xl border-none"
        title="Spotify Music Embed"
      />
    </div>
  );
};

export default SpotifyEmbed;
