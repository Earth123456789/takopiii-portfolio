"use client";

import React from "react";
import { Project } from "@/components/Project";

export const ProjectsSlide: React.FC = () => {
  return (
    <section className="projects-slide w-full max-h-full overflow-y-auto py-8">
      <Project />
    </section>
  );
};
