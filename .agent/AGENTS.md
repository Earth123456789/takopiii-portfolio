# 🤖 Project Guidelines & Developer Handbook (`AGENTS.md`)

Welcome to the **Interactive Canvas Resume & Developer Portfolio** codebase! This document serves as the primary technical guide for AI agents and human developers continuing the development, maintenance, and enhancement of this project.

---

## 📌 Project Overview

This application is a dual-experience developer portfolio and interactive resume:

1. **Interactive Spatial Canvas Resume:** A 2D spatial navigation board (inspired by Figma, FigJam, and Excalidraw) where visitors pan, zoom, and explore resume components laid out in 2D space.
2. **Traditional Portfolio View:** A smooth slide-based interactive portfolio showcasing skills, experience, projects, certificates, activity logs, and real-time Spotify listening stats.

---

## 🛠️ Technology Stack & Dependencies

- **Framework:** [Next.js 15.5](https://nextjs.org/) (App Router, Turbopack enabled)
- **Library / Core:** React 19, TypeScript 5
- **Styling:** Tailwind CSS v4, `tw-animate-css`, `clsx`, `tailwind-merge`, Class Variance Authority (`cva`)
- **Animations & Graphics:**
  - Motion / Framer Motion (`motion` v12)
  - GSAP (`gsap` v3)
  - Smooth Scrolling (`lenis`)
  - 3D WebGL Graphics (`three`, `@react-three/fiber`, `@react-three/drei`, `ogl`)
- **Internationalization (i18n):** `i18next`, `react-i18next`, `next-i18next`, custom `LanguageContext` (English `en` & Thai `th`)
- **Icons:** `lucide-react`, `react-icons`
- **Package Manager:** `pnpm`

---

## 📁 Directory Structure & Architecture

```
portfolio/
├── .agent/                  # Custom AI Agent skills & settings
├── public/                  # Static assets
│   ├── 3D/                  # 3D models & WebGL assets
│   ├── files/               # Resume PDFs / downloadable assets
│   ├── images/              # Project & UI images
│   ├── locales/             # i18n translation strings
│   │   ├── en/common.json   # English translations
│   │   └── th/common.json   # Thai translations
│   └── logo.png
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API Endpoints (e.g. /api/spotify)
│   │   ├── canvas/          # Fullscreen Canvas Resume view
│   │   ├── experience/      # Dedicated Experience & Education subpage (/experience)
│   │   ├── projects/        # Dedicated Projects catalog subpage (/projects)
│   │   ├── skills/          # Dedicated Tech Stack & Skills subpage (/skills)
│   │   ├── certificates/    # Dedicated Certificates catalog subpage (/certificates)
│   │   ├── activities/      # Dedicated Activities & Experiences log subpage (/activities)
│   │   ├── globals.css      # Design tokens, Tailwind CSS v4 imports & custom styles
│   │   ├── layout.tsx       # Root layout wrapping global Context Providers
│   │   └── page.tsx         # Main portfolio landing page
│   ├── components/          # Reusable UI & Section components
│   │   ├── canvas-resume/   # Spatial Canvas Resume core components
│   │   ├── sections/        # Section components (Hero, TechStack, Projects, etc.)
│   │   ├── magicui/         # Special animated UI effects
│   │   ├── ui/              # Primitive & Radix UI-based components
│   │   └── ...              # Widget & Feature components (Spotify, Aurora, PaintBoard, etc.)
│   ├── contexts/            # Global React Contexts
│   │   ├── LanguageContext.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── SlideContext.tsx
│   │   └── FontSizeContext.tsx
│   ├── data/                # Static data & node definitions
│   │   ├── canvasNodes.ts   # Spatial coordinates & node data for Canvas Resume
│   │   ├── projects.ts      # Portfolio projects data
│   │   ├── experience.ts    # Work experience data
│   │   ├── techStack.ts     # Technologies list
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities, animation helpers, scroll controllers
│   └── types/               # TypeScript interfaces & types
├── .env.example             # Template for environment variables
├── CANVAS_RESUME_PRD.md     # Full Product Requirements Document for Canvas Resume
├── package.json
└── tsconfig.json
```

---

## ⚡ Development Workflow & Setup

### 1. Prerequisites & Installation

Ensure `pnpm` is installed globally. Install dependencies:

```bash
pnpm install
```

### 2. Environment Configuration

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Provide valid credentials for Spotify Integration (optional for offline testing):

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

### 3. Available Scripts

- **Development Server (with Turbopack):**
  ```bash
  pnpm dev
  ```
- **Production Build:**
  ```bash
  pnpm build
  ```
- **Start Production Server:**
  ```bash
  pnpm start
  ```
- **Code Quality & Linting:**
  ```bash
  pnpm lint
  pnpm format
  ```

---

## 🎨 Design System & Aesthetic Principles

1. **Spatial Experience:** The Canvas mode (`src/components/canvas-resume`) enables free 2D pan/zoom (`0.2x` to `2.5x`). Always preserve momentum scroll physics and anchor zoom to cursor coordinates.
2. **Visual Hierarchy & Glassmorphism:** Dark mode UI styled with high contrast, vibrant glowing gradients (cyan, purple, emerald), subtle backdrops (`backdrop-blur-md`), and polished micro-animations.
3. **i18n Compatibility:** Every text string rendered in components MUST support internationalization. Add new strings to `public/locales/en/common.json` AND `public/locales/th/common.json`.
4. **Responsive & Dynamic:** Support both desktop trackpad/mouse controls and mobile touch gestures (pinch-to-zoom, 1-finger pan).

---

## 📐 Coding Standards & Guidelines for AI Agents

- **Strict TypeScript:** Always type props, state, context values, and data structures (`src/types`). Avoid using `any`.
- **Component Architecture:**
  - Keep client components tagged with `"use client";` at the top.
  - Separate static content/data into `src/data/`.
  - Prefer functional components with clean custom hooks.
- **Canvas Nodes:**
  - When adding or modifying spatial nodes on the canvas, update `src/data/canvasNodes.ts`.
  - Maintain coordinate balances (e.g., center `[0,0]`, offsets in range `[-2000, 2000]`) to ensure intuitive panning.
- **Content Subpage Routes & Highlighted Items:**
  - Main landing page sections render highlighted items by default (`featured: true`).
  - "See all" actions navigate to dedicated App Router subpages (`/experience`, `/projects`, `/skills`, `/certificates`, `/activities`).
  - Subpages render full data sets with a "Back to Home" (`← Back`) navigation header.

---

## 💡 Quick Tips for New Contributors / Next Developers

- **Canvas PRD Reference:** Read [`CANVAS_RESUME_PRD.md`](file:///d:/code/portfolio/CANVAS_RESUME_PRD.md) for full product architecture details.
- **Environment Variables:** If Spotify widgets show disconnected state, check refresh token status in `.env.local`.
- **Adding Locales:** When creating UI components with text, use `useLanguage()` hook from `src/contexts/LanguageContext.tsx`.

---
