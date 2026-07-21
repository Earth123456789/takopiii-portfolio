import { useEffect, useRef } from "react";
import { canContainerScrollInDirection } from "@/lib/scroll";
import { UseSlideNavigationOptions } from "@/types/navigation";

/**
 * Custom hook encapsulating wheel scroll, touch swipe, and keyboard navigation for slide views.
 */
export function useSlideNavigation({
  nextSlide,
  prevSlide,
  throttleMs = 800,
}: UseSlideNavigationOptions) {
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  const nextSlideRef = useRef(nextSlide);
  const prevSlideRef = useRef(prevSlide);
  const throttleMsRef = useRef(throttleMs);

  useEffect(() => {
    nextSlideRef.current = nextSlide;
    prevSlideRef.current = prevSlide;
    throttleMsRef.current = throttleMs;
  }, [nextSlide, prevSlide, throttleMs]);

  // Wheel Scroll Handling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (Math.abs(e.deltaY) < 10) return;

      const direction = e.deltaY > 0 ? "up" : "down";
      if (canContainerScrollInDirection(target, direction)) return;

      e.preventDefault();
      if (isScrolling.current) return;
      isScrolling.current = true;

      if (e.deltaY > 0) {
        nextSlideRef.current();
      } else {
        prevSlideRef.current();
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, throttleMsRef.current);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // Touch Swipe Handling for iOS (iPhone/iPad) & Mobile Touch Devices
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!e.changedTouches.length) return;
      const target = e.target as HTMLElement | null;

      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      // Threshold: 35px swipe distance
      if (Math.abs(diffY) > 35) {
        const direction = diffY > 0 ? "up" : "down";

        // Check if internal scroll is still possible in this direction
        if (canContainerScrollInDirection(target, direction)) return;

        if (isScrolling.current) return;
        isScrolling.current = true;

        if (diffY > 0) {
          nextSlideRef.current();
        } else {
          prevSlideRef.current();
        }

        setTimeout(() => {
          isScrolling.current = false;
        }, throttleMsRef.current);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Keyboard navigation (Arrow keys & Page up/down)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        nextSlideRef.current();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        prevSlideRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
