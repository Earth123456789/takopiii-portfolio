# 🎨 Interactive Canvas Resume — Product Requirements Document

> **Version:** 1.0 · **Status:** Pre-Development (Phase 1 — Planning)
> **Author:** Senior Frontend / UX / Creative Developer
> **Project Stack:** Next.js · TypeScript · DOM-based Canvas Engine

---

## Table of Contents

1. [Concept Overview](#1-concept-overview)
2. [UX & Interaction Model](#2-ux--interaction-model)
3. [Layout System (Canvas-Based)](#3-layout-system-canvas-based)
4. [Navigation Behavior](#4-navigation-behavior)
5. [Animation & Motion Principles](#5-animation--motion-principles)
6. [Skills Required](#6-skills-required)
7. [Feature Planning](#7-feature-planning)
8. [Constraints](#8-constraints)
9. [Development Phases](#9-development-phases)
10. [Existing Codebase Context](#10-existing-codebase-context)

---

## 1. Concept Overview

### What Is This?

The **Interactive Canvas Resume** is a **spatial, canvas-based web experience** that replaces the traditional scrolling portfolio website with a fully navigable 2D design board — inspired by tools like **Figma, FigJam, Miro, and Excalidraw**.

Instead of reading through sections top-to-bottom, the **visitor becomes an explorer** — panning around a large virtual canvas, zooming into areas of interest, and discovering resume content as **floating frames, nodes, and interactive blocks** scattered meaningfully in 2D space.

### How It Differs from a Normal Website

| Traditional Portfolio         | Canvas Resume                       |
| ----------------------------- | ----------------------------------- |
| Vertical scroll (Y-axis only) | Free 2D pan (X + Y)                 |
| Sections load linearly        | Nodes exist simultaneously in space |
| Fixed layout, static flow     | Infinite canvas, spatial layout     |
| User reads top-to-bottom      | User explores, discovers, zooms     |
| Animations on scroll          | Animations on focus / zoom-to       |
| Browser controls navigation   | Canvas viewport controls navigation |
| SEO-first, page-based         | Experience-first, immersive         |

### The Core Feeling

> _"It should feel like you opened someone's Figma board and their entire career is laid out in front of you — ready to be explored."_

The visitor should feel:

- **Empowered** — they control where they go
- **Delighted** — discovery is rewarding
- **Impressed** — the craft signals professional level

---

## 2. UX & Interaction Model

### 2.1 Primary Navigation Gestures

#### 🖱️ Pan (Drag to Move)

- **Mouse:** Click + drag on empty canvas background
- **Touch:** One-finger drag (touchmove)
- **Behavior:** Moves the entire canvas viewport smoothly; elements shift in screen space proportionally
- **Feel:** Inertia / momentum after release (like iOS scroll physics)

#### 🔍 Zoom (Scale the Viewport)

- **Mouse:** Scroll wheel (deltaY → scale factor)
- **Touch:** Pinch gesture (two-finger spread/pinch)
- **Trackpad:** Two-finger scroll
- **Behavior:** Zoom anchored to the cursor position (point-under-cursor stays fixed)
- **Range:** Min `0.2x` → Max `2.5x` (clamped)

#### 👆 Click / Select

- **Single click on a node** → highlights it, shows focus ring
- **Double click on a node** → triggers "zoom-to-focus" animation
- **Click on empty canvas** → deselects any active node

#### ⌨️ Keyboard Shortcuts

| Key                | Action                                |
| ------------------ | ------------------------------------- |
| `Space + Drag`     | Pan (alternative)                     |
| `Ctrl + 0`         | Reset zoom to 100%                    |
| `Ctrl + Shift + H` | Fit all nodes to viewport             |
| `+` / `-`          | Zoom in / out incrementally           |
| `Escape`           | Exit focused node, return to overview |
| Arrow keys         | Nudge viewport pan                    |

---

### 2.2 How Sections Are Positioned in Space

Resume sections are **not stacked vertically** — they are placed **deliberately in 2D canvas coordinates**, creating a sense of spatial narrative.

```
Canvas World Layout (Conceptual Map)
──────────────────────────────────────────────────────
     [-2000, -1200]          [0, -1200]         [2000, -1200]

           [INTRO / HERO]          [SKILLS CLOUD]
                │
                ▼
     [ABOUT ME]         [EXPERIENCE TIMELINE]
                                   │
                                   ▼
              [PROJECTS GALLERY]─────[EDUCATION]

                              [CONTACT / CTA]

     [PLAYGROUND / WHITEBOARD]   ← far bottom-left
──────────────────────────────────────────────────────
```

- Sections are connected visually (soft connector lines / dashes, like Figma arrows)
- Proximity suggests relationship — related content clusters together
- Distance suggests separation — fun / experimental sections are in distant corners

---

### 2.3 Focus / Zoom-to-Section

When a user double-clicks a node or uses the minimap:

1. Camera **smoothly animates** (eased translate + scale) to center that node
2. Node scales up to ~85% of viewport
3. Surrounding nodes **fade slightly** (soft blur or opacity reduction)
4. A **close / back button** appears (or press `Escape`) to return to overview
5. If the node has sub-content (e.g., a project gallery), it can expand further

---

## 3. Layout System (Canvas-Based)

### 3.1 Coordinate System

The canvas uses a **world-space coordinate system** separate from screen space:

```
World Space → Screen Space Transform:
  screenX = (worldX + offsetX) * scale
  screenY = (worldY + offsetY) * scale
```

- `offsetX`, `offsetY` = current pan position
- `scale` = current zoom level
- All nodes are stored in **world coordinates**
- The viewport (CSS `transform: translate + scale`) is applied to a **single root container** element

### 3.2 Node / Frame Architecture

Each resume section is a **Node** with the following properties:

```typescript
interface CanvasNode {
  id: string;
  type:
    | "hero"
    | "about"
    | "experience"
    | "skills"
    | "projects"
    | "education"
    | "contact"
    | "playground";
  worldX: number; // Position in canvas world space
  worldY: number;
  width: number; // Frame width in world units
  height: number; // Frame height in world units
  title: string; // Label shown above the frame
  zIndex: number; // Layering order
  connectedTo?: string[]; // IDs of nodes this connects to
}
```

### 3.3 Rendering Architecture

**Chosen approach: DOM-based canvas (NOT `<canvas>` element for layout)**

| Approach                  | Pros                                                      | Cons                                                                     | Decision         |
| ------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------- |
| HTML Canvas (`<canvas>`)  | High perf, pixel control                                  | No DOM events, no accessibility, hard to animate React components inside | ❌ Not for nodes |
| CSS Transform on DOM tree | React components work natively, accessibility, hot reload | Slight perf overhead at extreme zoom                                     | ✅ **Use this**  |
| WebGL / Three.js          | Extreme performance                                       | Massive complexity, overkill                                             | ❌ Overkill      |

**Implementation:**

- A single `<div id="canvas-root">` receives `transform: translate(Xpx, Ypx) scale(Z)`
- All nodes are positioned inside with `position: absolute; left: Xpx; top: Ypx`
- The transform changes on every pan/zoom event (RAF-batched)
- Nodes are standard React components — they can have animations, hover states, etc.

### 3.4 Canvas Size

- World size: `10000 x 8000` virtual units (feels "infinite" but is bounded)
- Initial viewport anchored to center (`[0, 0]`) showing the Hero node
- Soft boundaries: user can pan to edges but not beyond them (elastic bounce-back)

---

## 4. Navigation Behavior

### 4.1 Pan System

```
State:
  isPanning: boolean
  lastPointerX: number
  lastPointerY: number
  velocityX: number       ← for inertia
  velocityY: number       ← for inertia
  offsetX: number         ← current pan offset
  offsetY: number
```

**Inertia Algorithm:**

- On `pointerup`, store the last velocity (delta per frame)
- Apply `velocity *= dampingFactor (0.92)` per frame in a RAF loop
- Stop when velocity < threshold (0.5px/frame)
- This gives a natural "flick" feel

### 4.2 Zoom System

```
On wheel event:
  delta = e.deltaY * -0.001            // sensitivity factor
  newScale = clamp(scale + delta, 0.2, 2.5)

  // Zoom anchored to cursor position
  cursorWorldX = (e.clientX - offsetX) / scale
  cursorWorldY = (e.clientY - offsetY) / scale

  offsetX = e.clientX - cursorWorldX * newScale
  offsetY = e.clientY - cursorWorldY * newScale

  scale = newScale
```

### 4.3 Minimap

- A small `120×90px` floating panel (bottom-right corner)
- Shows a **scaled-down overview** of all nodes as colored rectangles
- A **viewport indicator** (white rectangle) shows the current view
- Clicking/dragging on minimap moves the main viewport
- Toggle-able (minimize icon)

### 4.4 Snap to Section

Triggered by:

- Double-clicking a node
- Clicking a node label on the minimap
- Using keyboard shortcut (e.g., pressing `1`–`7` for each section)

Animation: `spring`-based ease using `cubic-bezier(0.34, 1.56, 0.64, 1)` for a satisfying snap.

### 4.5 Focus Mode

When a node is focused:

- Overlay darkens surrounding canvas area
- Node frame gets a glowing selection ring (animated stroke)
- A floating toolbar appears below the node:
  - `← Back to Overview`
  - Navigation arrows `← →` to jump to adjacent nodes
- `Escape` or clicking the dark overlay exits focus mode

---

## 5. Animation & Motion Principles

### 5.1 Core Philosophy

> **Motion should feel physical, not mechanical.**

All animations follow these rules:

- **Easing:** Always use `spring`-based or `ease-out` curves — never `linear`
- **Duration:** Fast interactions `150–250ms`, transitions `300–500ms`, focus snaps `400–600ms`
- **Stagger:** When multiple elements appear, stagger them by `50–80ms`

### 5.2 Inertia Movement

- Pan release triggers momentum decay: `v *= 0.93` per 16ms frame
- Zoom pinch ends with a gentle deceleration
- Prevents the "stops dead" feeling of non-physical UIs

### 5.3 Zoom Transitions

- Zoom-to-node uses a **unified scale + translate** animation
- CSS `transition: transform 450ms cubic-bezier(0.34, 1.2, 0.64, 1)`
- During animation: pointer events disabled on nodes (prevents misclicks)

### 5.4 Node Enter Animations

When the user first encounters a node (enters its visible range for the first time):

- **Fade in + scale up:** `opacity: 0 → 1`, `scale: 0.95 → 1.0`
- Duration: `350ms ease-out`
- Triggered by Intersection Observer on the world container

### 5.5 Focus Ring Animation

Active / focused node has:

```css
@keyframes focus-ring-pulse {
  0% {
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.6);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(139, 92, 246, 0.2);
  }
  100% {
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.6);
  }
}
```

### 5.6 Connector Lines (Node Links)

SVG `<path>` elements drawn between connected nodes:

- Style: dashed, low-opacity, colored by relationship type
- Animate: `stroke-dashoffset` flowing to indicate direction / relationship
- Fade out at low zoom levels (de-clutter)

---

## 6. Skills Required

> This section defines what must be deeply understood BEFORE writing a single line of implementation code.

---

### 6.1 Core Skills

#### React Advanced Interaction Patterns

- `useRef` for mutable state that must not trigger re-renders (pointer tracking, velocity, offset)
- `useCallback` / `useMemo` for stable event handler identities
- Separating render state (React) from interaction state (refs)
- Avoiding re-render thrashing during high-frequency pointer events

#### Event Handling (Pointer, Drag, Wheel)

- `PointerEvent` API vs `MouseEvent` (unified touch + mouse + pen handling)
- `setPointerCapture` for locked drag tracking
- `wheel` event: `deltaMode` normalization (pixel vs line vs page)
- `TouchEvent` for pinch detection (`touches[0]`, `touches[1]` distance delta)
- Passive event listeners and `preventDefault` for scroll blocking

#### Coordinate System Mathematics

- World space vs screen space transformation
- **Affine transform matrix** representation of pan + zoom
- Inverse transform: converting screen coordinates back to world coordinates
- Cursor-anchored zoom math (deriving new offset from zoom origin)

---

### 6.2 Advanced Skills

#### CSS Transform (translate + scale)

- Applying a single `transform: translate(X, Y) scale(S)` to a root container
- Order of operations: `translate` must come BEFORE `scale` to achieve correct behavior
- `will-change: transform` and `transform-origin: 0 0` configuration
- Hardware GPU compositing (keeping transform-only updates off the main thread)

#### Zoom / Pan Mathematics

- Clamping zoom to a min/max range
- Point-under-cursor zoom derivation (the core formula every canvas app needs)
- Lerp (linear interpolation) for smooth animated transitions between positions
- Spring physics simulation for inertia: `v_new = v_old * damping`

#### Performance Optimization

- `requestAnimationFrame` batching: never mutate DOM in event handlers directly
- Dirty flag pattern: only call RAF when something changed
- `contain: strict` CSS property on canvas nodes to isolate paint
- `pointer-events: none` on non-interactive elements during animations
- Layer promotion with `will-change: transform` on heavily animated elements

#### Canvas vs DOM Rendering Tradeoffs

| Consideration                     | `<canvas>`                 | DOM + CSS Transform       |
| --------------------------------- | -------------------------- | ------------------------- |
| Node interactivity (hover, click) | Manual hit-testing         | Native browser events     |
| React component reuse             | Not possible               | Full support              |
| Rendering thousands of elements   | Fast (rasterized)          | Slow beyond ~500 nodes    |
| Text rendering quality            | Good but manual            | Perfect (browser handles) |
| Accessibility                     | Requires ARIA workarounds  | Native                    |
| **Decision for this project**     | Used for Playground widget | Used for resume nodes     |

---

### 6.3 UX Skills

#### Spatial UI Design

- Understanding how humans navigate space vs read documents
- Hierarchy through proximity (related nodes cluster)
- Using whitespace as breathing room, not emptiness
- Visual weight distribution across a large canvas

#### Interaction Design

- Affordance design: showing users the canvas is draggable without instructions
- Progressive disclosure: nodes reveal more content on zoom/focus
- Error prevention: soft clamping at canvas edges (no getting lost)
- Feedback loops: cursor changes (grab → grabbing), node highlights, minimap sync

#### Motion Design

- Understanding **12 Principles of Animation** as applied to UI
- Timing curves as communication (spring = physical, linear = robotic)
- When NOT to animate (performance-critical paths, reduced-motion preference)
- `prefers-reduced-motion` media query — all animations must be disableable

---

## 7. Feature Planning

### 7.1 Canvas Navigation System

- [x] Define world coordinate system
- [ ] Pan gesture handler (pointer down/move/up with inertia)
- [ ] Zoom gesture handler (wheel + pinch, cursor-anchored)
- [ ] Keyboard navigation (arrow keys, shortcuts)
- [ ] Minimap component with live viewport indicator
- [ ] Snap-to-node animation system
- [ ] Focus mode (overlay + toolbar)
- [ ] Soft boundary clamping with elastic bounce

### 7.2 Node-Based Resume Sections

Each node is a **React component** rendered as a styled frame:

| Node             | Content                        | Position (approx world coords) |
| ---------------- | ------------------------------ | ------------------------------ |
| `HeroNode`       | Name, title, tagline, avatar   | `[0, 0]` — center of canvas    |
| `AboutNode`      | Bio, personality, fun facts    | `[-1800, 200]`                 |
| `ExperienceNode` | Timeline of jobs               | `[1600, -400]`                 |
| `SkillsNode`     | Interactive skill cloud / tags | `[0, -1400]`                   |
| `ProjectsNode`   | Gallery of project cards       | `[-400, 1600]`                 |
| `EducationNode`  | Education stepper              | `[1800, 1200]`                 |
| `ContactNode`    | CTA, social links, email       | `[0, 2400]`                    |
| `PlaygroundNode` | Embedded whiteboard canvas     | `[-2400, 2000]`                |

### 7.3 Interactive Playground (Canvas Widget)

- Re-uses existing `HeroWhiteboard` / `PaintCanvas` component architecture
- Embedded as a node within the main canvas
- When zoomed in on PlaygroundNode, the drawing tools become active
- When zoomed out, it renders as a static preview thumbnail

### 7.4 Navigation UI Elements

- **Toolbar (top):** Zoom in/out buttons, Reset view, Fit all, Mode toggle
- **Minimap (bottom-right):** Scaled overview, click-to-navigate
- **Node Labels:** Section names shown above frames at all zoom levels
- **Welcome Overlay:** First-time hint ("Try dragging the canvas...")

### 7.5 Connector System

- SVG `<path>` drawn between related nodes
- Curved bezier connectors (like Figma arrow connectors)
- Animate stroke-dashoffset for a "flow" effect
- Opacity scales with zoom level (hidden when too zoomed out)

---

## 8. Constraints

### Hard Constraints (Never Violate)

- ❌ **No vertical scroll layout** — the outer page must not scroll
- ❌ **No section-by-section SPA routing** — everything exists on one canvas
- ❌ **No `position: fixed` navigation bars** — UI elements are part of the canvas world
- ✅ **Must feel like a design tool** — not a static page
- ✅ **Must be smooth at 60fps** on modern hardware
- ✅ **Must be accessible** — keyboard navigation required, `prefers-reduced-motion` respected
- ✅ **Must be responsive** — graceful degradation on mobile (simplified touch pan)

### Soft Constraints (Prefer, But Flexible)

- Prefer DOM-based rendering for nodes (not `<canvas>` element) for interactivity
- Prefer CSS transitions over JS animation libraries where possible
- Prefer a single root transform over per-node transforms for performance
- Prefer semantic HTML inside nodes for SEO (even if canvas-based overall)

---

## 9. Development Phases

### Phase 1 — System Definition (Current Phase) ✅

> Define the concept, architecture, and interaction model in writing.

- [x] Write PRD document (this file)
- [ ] Define TypeScript types for canvas nodes, viewport state, interaction state
- [ ] Sketch wireframe layout of node positions in world space
- [ ] Finalize design system: color tokens, frame styles, typography for nodes

---

### Phase 2 — Interaction Model

> Build the core navigation engine. No visual styling yet.

**Goal:** A blank canvas where you can pan, zoom, and see node placeholders in correct positions.

- [ ] `useCanvasViewport` hook: manages `offsetX`, `offsetY`, `scale`, pan/zoom handlers
- [ ] `CanvasRoot` component: the single CSS-transform root element
- [ ] `CanvasNode` wrapper: positions children at world coordinates
- [ ] Pan: pointer-based with inertia
- [ ] Zoom: wheel-based, cursor-anchored, clamped
- [ ] Pinch zoom: touch-based
- [ ] Keyboard shortcuts
- [ ] Snap-to-node animation utility

---

### Phase 3 — Visual Design & Animation

> Apply full visual design to nodes, add transitions and polish.

**Goal:** Canvas looks premium — each node is beautifully designed, matching the existing design system.

- [ ] Design each resume section as a styled `CanvasNode` component
- [ ] Focus mode: overlay, zoom animation, exit gesture
- [ ] Connector SVG paths between related nodes
- [ ] Minimap component
- [ ] Node entry animations (fade + scale on first appearance)
- [ ] Welcome overlay with interaction hints
- [ ] Toolbar UI (zoom controls, fit-to-all)
- [ ] Theme integration (light / dark mode per existing `useTheme` hook)

---

### Phase 4 — Advanced Features (Canvas Drawing)

> Integrate the existing whiteboard / drawing features as a node.

**Goal:** Playground node is a fully functional, embeddable drawing experience.

- [ ] Integrate `HeroWhiteboard` / `PaintCanvas` as a `PlaygroundNode`
- [ ] Resolve interaction conflict: canvas pan vs draw mode (toggle via toolbar)
- [ ] Drawing mode indicator (cursor changes, mode badge)
- [ ] Export / share a drawing from within the canvas
- [ ] (Optional) Spotlight mode: one node at a time, rest fade
- [ ] (Optional) Auto-tour: animated path visiting all nodes in sequence
- [ ] (Optional) URL hash per node (`#experience`, `#projects`) for shareability

---

## 10. Existing Codebase Context

> Understanding the current state of `d:\code\portfolio` to inform Phase 2 planning.

### Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript + TSX
- **Styling:** Tailwind CSS (utility classes, `cn()` helper)
- **Components:** Mix of custom components + shadcn/ui base components

### Relevant Existing Components

| File                                       | Relevance                                                       |
| ------------------------------------------ | --------------------------------------------------------------- |
| `src/components/canvas/HeroWhiteboard.tsx` | Drawing canvas with pointer events — reusable as PlaygroundNode |
| `src/components/canvas/PaintCanvas.tsx`    | Alternative paint canvas implementation                         |
| `src/components/PaintBoard.tsx`            | Full paint board with toolbar                                   |
| `src/components/EducationStepper.tsx`      | Education section — candidate for EducationNode                 |
| `src/hooks/useTheme.ts`                    | Theme hook — must be preserved in canvas nodes                  |
| `src/data/theme.ts`                        | Design tokens — informs canvas node styling                     |

### Key Integration Notes

1. **Pointer Event Conflict:** `HeroWhiteboard` uses `setPointerCapture` for drawing — this must not conflict with the canvas pan system. Solution: a **mode switch** (Pan mode vs Draw mode) toggled per node or globally.

2. **Existing HeroWhiteboard** already has solid canvas drawing infrastructure that should be leveraged, not re-written.

3. **Theme System:** The `useTheme` hook must propagate correctly into canvas nodes — since they live inside a single DOM tree, context should flow naturally.

4. **Performance Note:** The existing components use `useCallback` and `useRef` patterns correctly — the same discipline must be maintained in the canvas engine.

---

## Appendix A — Recommended Libraries (Research Only)

> Do NOT install anything yet. These are candidates for Phase 2 evaluation.

| Library                           | Purpose                                      | Alternative                      |
| --------------------------------- | -------------------------------------------- | -------------------------------- |
| `use-gesture` (react-use-gesture) | Unified gesture handler (drag, pinch, wheel) | Custom pointer handlers          |
| `framer-motion`                   | Spring-based animations for snap-to-node     | CSS transitions                  |
| `d3-zoom`                         | Battle-tested zoom/pan math                  | Custom implementation            |
| None (vanilla)                    | Custom canvas engine                         | Full control, no dependency risk |

**Recommendation:** Start with vanilla event handlers for maximum control, then evaluate `use-gesture` if multitouch pinch becomes a pain point.

---

## Appendix B — Glossary

| Term             | Definition                                                                 |
| ---------------- | -------------------------------------------------------------------------- |
| **World Space**  | The coordinate system of the infinite canvas (absolute positions of nodes) |
| **Screen Space** | Pixel coordinates on the user's screen                                     |
| **Viewport**     | The visible portion of the canvas in screen space                          |
| **Node**         | A resume section frame positioned in world space                           |
| **Pan**          | Translating the viewport (moving the camera)                               |
| **Zoom**         | Scaling the viewport (changing the camera's field of view)                 |
| **Inertia**      | Physics-based momentum after a gesture ends                                |
| **Focus Mode**   | Camera snaps to and highlights a single node                               |
| **Minimap**      | Scaled overview of all nodes with viewport indicator                       |
| **Connector**    | SVG line linking two related nodes                                         |

---

_End of Document — CANVAS_RESUME_PRD.md_  
_Next Step: Review this PRD, then proceed to Phase 2 implementation planning._
