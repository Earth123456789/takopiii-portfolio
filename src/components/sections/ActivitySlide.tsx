"use client";

import React from "react";
import Activity from "@/components/Activity";
import { useLanguage } from "@/hooks/useLanguage";
import { getActivityData } from "@/data/activities";

export const ActivitySlide: React.FC = () => {
  const { t } = useLanguage();
  const activityData = getActivityData(t);

  return (
    <section className="activity-slide w-full h-full flex flex-col justify-center max-h-full overflow-y-auto py-8">
      <Activity activityData={activityData} />
    </section>
  );
};

