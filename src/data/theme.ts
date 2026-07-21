/**
 * Central source of truth for UI colors and theme tokens.
 * This allows for "dynamic" updates and consistency across JS/TS and CSS.
 */

export const THEME_COLORS = {
  light: {
    background: "#F8FAFC", // Slate 50
    foreground: "#0F172A", // Slate 900
    primary: "#A91D3A", // Vibrant Rose/Red
    secondary: "#1E293B", // Slate 800
    accent: "#3A29FF", // Deep Indigo
    muted: "#64748B", // Slate 500
    aurora: [
      "#E0F2FE", // Blue 100
      "#FCE7F3", // Pink 100
      "#FEE2E2", // Red 100
    ],
    card: "rgba(255, 255, 255, 0.7)",
    border: "rgba(0, 0, 0, 0.1)",
  },
  dark: {
    background: "#0F172A", // Slate 900
    foreground: "#F8FAFC", // Slate 50
    primary: "#A91D3A", // Original Vibrant Red
    secondary: "#F1F5F9", // Slate 100
    accent: "#FF3232", // Bright Red
    muted: "#94A3B8", // Slate 400
    aurora: [
      "#3A29FF", // Deep Indigo
      "#FF94B4", // Soft Rose
      "#FF3232", // Bright Red
    ],
    card: "rgba(255, 255, 255, 0.05)",
    border: "rgba(255, 255, 255, 0.1)",
  },
};

export type ThemeMode = "light" | "dark";

export const getThemeColors = (mode: ThemeMode) => THEME_COLORS[mode];
