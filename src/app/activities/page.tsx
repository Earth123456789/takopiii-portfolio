"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Activity from "@/components/Activity";
import Aurora from "@/components/Aurora";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { getActivityData } from "@/data/activities";
import { THEME_COLORS } from "@/data/theme";

export default function ActivitiesPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const activityData = getActivityData(t);

  return (
    <main className="min-h-screen w-full relative select-none pb-20">
      {/* Dynamic Aurora Backdrop Layer */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={
            theme === "dark"
              ? THEME_COLORS.dark.aurora
              : THEME_COLORS.light.aurora
          }
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-4 backdrop-blur-md bg-background/60 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm font-medium text-foreground hover:bg-black/10 dark:hover:bg-white/15 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Activities Content */}
      <div className="pt-6">
        <Activity activityData={activityData} showAll={true} />
      </div>
    </main>
  );
}
