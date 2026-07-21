---
name: responsive-scroll-portfolio
description: How to make a scroll-driven, canvas/game-style interactive portfolio site (Next.js, character-driven animation tied to scroll position, e.g. a Robby-Leonardi-style interactive resume) responsive across mobile, tablet, and desktop. Use this whenever building or adjusting layout, breakpoints, canvas sizing, scroll mechanics, motion, or mobile fallbacks for this kind of site — including when the user mentions "responsive", "mobile version", "breakpoints", "canvas resize", "touch scroll", or the interactive/scroll-driven portfolio project specifically.
---

# Responsive Scroll-Driven Portfolio

Guidance for making a scroll-driven, canvas-animated, game-style portfolio/resume site work well from mobile up to desktop, without breaking the core scroll-linked animation concept.

## Core problem

Scroll-driven canvas animation (a mascot/character that moves along a path as the user scrolls, tied to scroll position) is built for desktop mouse-wheel scrolling. Ported directly to mobile it tends to: feel heavy (canvas redraw every scroll frame drains battery), fight with touch-scroll physics (momentum scrolling doesn't map cleanly to animation progress), and make text/content hard to read because the layout was designed around the canvas, not the copy.

Treat mobile as a **second experience tier**, not a squeezed-down desktop layout.

## 1. Breakpoint strategy

Mobile-first. Design the small screen first, then enhance upward.

- `mobile`: < 640px
- `tablet`: 640–1024px
- `desktop`: > 1024px

If using Tailwind, just use the default `sm/md/lg/xl` scale — no need for custom breakpoints unless a specific layout genuinely requires one.

## 2. Two-tier experience

- **Desktop / large tablet (≥ ~1024px)**: full scroll-driven canvas experience — character animates along the path as the user scrolls.
- **Mobile / small tablet**: drop the animated canvas character. Replace with either:
  - a static illustration per section, or
  - CSS scroll-snap between sections with a simple fade/slide transition.

  Content (experience, projects, skills) must stay fully readable and navigable without the canvas.

Implementation: detect viewport at mount (e.g. `useMediaQuery` hook, or `window.matchMedia('(min-width: 1024px)')`) and conditionally render the canvas component only above the threshold. Don't just hide it with CSS (`display: none`) — avoid mounting/running the animation loop at all on mobile, since a hidden canvas still burns CPU/battery if its RAF loop keeps running.

```tsx
const isDesktop = useMediaQuery('(min-width: 1024px)');
return isDesktop ? <ScrollCanvasHero /> : <MobileHeroFallback />;
```

## 3. Canvas/SVG must resize itself

Never hardcode canvas width/height in px. Options:
- SVG: use `viewBox` and let CSS control display size.
- `<canvas>`: use `ResizeObserver` on the container, update `canvas.width`/`canvas.height` (and redraw) on resize — don't just CSS-scale the canvas or it'll blur.
- Position objects on the canvas as a proportion (0–1) of container width/height, not fixed pixel coordinates, so layout holds at any size.

## 4. Motion and accessibility

- Respect `prefers-reduced-motion`: fall back to static or simple fade transitions when set, regardless of device.
- Every interactive element (nav, "See all" buttons, section links) must be reachable and operable via keyboard, with a visible focus ring — don't strip `outline` without providing a replacement.
- This is a quality floor, not optional polish — verify it before considering a section "done".

## 5. Scroll mechanics

- Desktop: scroll-linked animation can use `IntersectionObserver` for section-level transitions plus a scroll-progress calculation (e.g. `scrollY / (docHeight - viewportHeight)`) for the continuous character movement.
- Mobile: prefer discrete, section-based transitions (scroll-snap or IntersectionObserver-triggered reveals) over continuous scroll-linked math — touch/momentum scroll makes continuous linkage feel janky.
- Throttle scroll listeners (`requestAnimationFrame`, not raw scroll events) on both tiers.

## 6. Testing

- Don't rely on browser-resize alone — test on real devices or DevTools device emulation with touch simulation, since touch scroll behavior differs meaningfully from mouse/trackpad.
- Check at minimum: smallest common mobile width (~375px), a mid tablet width (~768px), and a standard desktop width (~1440px).

## Project context

This applies to a Next.js interactive/game-style portfolio site (mascot: a minimalist original octopus character, not a human figure), with Experience / Projects / Skills sections that each have a "See all" expansion. Keep the mobile fallback consistent with that mascot/brand identity — e.g. reuse the octopus as a static illustration per section rather than dropping the character concept entirely on mobile.
