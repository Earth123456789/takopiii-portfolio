"use client";

import React from "react";
import Activity from "@/components/Activity";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { getActivityData } from "@/data/activities";

export const ActivitySlide: React.FC = () => {
  const { t } = useLanguage();
  const activityData = getActivityData(t);

  return (
    <section className="activity-slide w-full h-full flex flex-col justify-between max-h-full overflow-y-auto py-8">
      <div className="flex-1 flex flex-col justify-center">
        <Activity activityData={activityData} />
      </div>
      <div className="w-full mt-10">
        <Footer />
      </div>
    </section>
  );
};
