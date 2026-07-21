import { Variants, Transition } from "motion/react";

/**
 * Slide transition variants for vertical Framer Motion transitions.
 */
export const slideVariants: Variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100vh" : "-100vh",
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-100vh" : "100vh",
    opacity: 0,
  }),
};

/**
 * Default spring transition settings for slide switches.
 */
export const slideTransition: Transition = {
  y: { type: "spring", stiffness: 220, damping: 28 },
  opacity: { duration: 0.35 },
};
