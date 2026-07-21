"use client";

import React from "react";
import Background from "@/components/Education";
import { useLanguage } from "@/hooks/useLanguage";
import { getEducationData } from "@/data/education";
import { getExperienceData } from "@/data/experience";

export const BackgroundSlide: React.FC = () => {
  const { t } = useLanguage();
  const educationData = getEducationData(t);
  const experienceData = getExperienceData(t);

  return (
    <section className="background-slide w-full max-h-full overflow-y-auto px-4 py-8">
      <Background
        educationData={educationData}
        experienceData={experienceData}
      />
    </section>
  );
};
