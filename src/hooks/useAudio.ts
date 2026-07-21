import { useState, useEffect, useCallback } from "react";
import { soundEngine } from "@/lib/audio/SoundEngine";

export function useAudio() {
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("playground_muted");
      if (saved !== null) {
        const muted = JSON.parse(saved);
        setIsMuted(muted);
        soundEngine.setMuted(muted);
      }
    } catch {}
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      soundEngine.setMuted(next);
      try {
        localStorage.setItem("playground_muted", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  return {
    isMuted,
    toggleMute,
    startBrushSound: (speed?: number) => soundEngine.startBrushSound(speed),
    stopBrushSound: () => soundEngine.stopBrushSound(),
    playTapSound: () => soundEngine.playTapSound(),
    playHoverSound: () => soundEngine.playHoverSound(),
    playBurstSound: () => soundEngine.playBurstSound(),
  };
}
