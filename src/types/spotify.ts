export interface SpotifyEmbedProps {
  spotifyId?: string;
  type?: "track" | "playlist" | "album";
  height?: number | string;
  compact?: boolean;
  className?: string;
}
