import { CanvasResume } from "@/components/canvas-resume/CanvasResume";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Canvas Resume | Vipat",
  description: "Spatial 2D navigable canvas resume inspired by Figma & Miro.",
};

export default function CanvasPage() {
  return <CanvasResume />;
}
