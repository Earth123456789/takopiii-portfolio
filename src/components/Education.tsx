"use client";

import React, { useState } from "react";
import EducationStepper from "./EducationStepper";
import { useLanguage } from "@/hooks/useLanguage";
import { useFontSize } from "@/hooks/useFontSize";
import { BackgroundProps, TabType } from "@/types/education";
import Link from "next/link";
import { GraduationCap, Briefcase, Sparkles, Layers, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const Background: React.FC<BackgroundProps> = ({
  educationData,
  experienceData,
  showAll = false,
}) => {
  const { t } = useLanguage();
  const { getFontSizeClass } = useFontSize();
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [isExpanded] = useState<boolean>(showAll);

  const hasEducation = educationData && educationData.length > 0;
  const hasExperience = experienceData && experienceData.length > 0;

  if (!hasEducation && !hasExperience) {
    return null;
  }

  const showEducation = (activeTab === "all" || activeTab === "education") && hasEducation;
  const showExperience = (activeTab === "all" || activeTab === "experience") && hasExperience;

  return (
    <section
      className="relative flex flex-col items-center justify-center py-10 sm:py-14 lg:py-16 w-full px-4 sm:px-6 lg:px-8 overflow-hidden"
      id="educate"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="pointer-events-none absolute top-10 left-1/4 -translate-x-1/2 w-96 h-96 bg-primary/10 dark:bg-primary/15 rounded-full blur-3xl opacity-50 dark:opacity-40" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 translate-x-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl opacity-50 dark:opacity-40" />

      <div className="relative z-10 w-full max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 space-y-4">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 text-primary dark:text-[#ff9cb0] text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>CAREER & ACADEMIC JOURNEY</span>
          </motion.div>

          {/* Section Title */}
          <h2
            className={cn(
              getFontSizeClass(
                "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight",
              ),
              "bg-gradient-to-r from-foreground via-foreground to-foreground/70 dark:from-white dark:via-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent drop-shadow-sm",
            )}
          >
            {t("education.title") as string} &amp;{" "}
            {t("experience.title") as string}
          </h2>

          <p
            className={getFontSizeClass(
              "text-base sm:text-lg text-foreground/70 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal",
            )}
          >
            Where I learned, grew, and developed my professional abilities.
          </p>

          {/* Filter Tabs */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl gap-1 sm:gap-2 shadow-inner">
              <button
                onClick={() => setActiveTab("all")}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200",
                  activeTab === "all"
                    ? "text-primary-foreground dark:text-white"
                    : "text-foreground/70 dark:text-zinc-400 hover:text-foreground dark:hover:text-white",
                )}
              >
                {activeTab === "all" && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-xl bg-primary dark:bg-[#A91D3A] shadow-md shadow-primary/20 dark:shadow-[#A91D3A]/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  All ({educationData.length + experienceData.length})
                </span>
              </button>

              <button
                onClick={() => setActiveTab("education")}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200",
                  activeTab === "education"
                    ? "text-primary-foreground dark:text-white"
                    : "text-foreground/70 dark:text-zinc-400 hover:text-foreground dark:hover:text-white",
                )}
              >
                {activeTab === "education" && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-xl bg-primary dark:bg-[#A91D3A] shadow-md shadow-primary/20 dark:shadow-[#A91D3A]/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  {t("education.title") as string} ({educationData.length})
                </span>
              </button>

              <button
                onClick={() => setActiveTab("experience")}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200",
                  activeTab === "experience"
                    ? "text-primary-foreground dark:text-white"
                    : "text-foreground/70 dark:text-zinc-400 hover:text-foreground dark:hover:text-white",
                )}
              >
                {activeTab === "experience" && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-xl bg-primary dark:bg-[#A91D3A] shadow-md shadow-primary/20 dark:shadow-[#A91D3A]/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  {t("experience.title") as string} ({experienceData.length})
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "grid gap-10 lg:gap-14 items-start",
              activeTab === "all"
                ? "grid-cols-1 lg:grid-cols-2"
                : "grid-cols-1 max-w-3xl mx-auto",
            )}
          >
            {/* Education Column */}
            {showEducation && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-gradient-to-br from-primary/20 to-indigo-500/10 dark:from-[#A91D3A]/30 dark:to-purple-500/20 text-primary dark:text-[#ff9cb0] border border-primary/20 dark:border-[#A91D3A]/30 shadow-sm">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3
                        className={getFontSizeClass(
                          "text-xl sm:text-2xl text-foreground dark:text-white font-bold tracking-tight",
                        )}
                      >
                        {t("education.title") as string}
                      </h3>
                      <p className="text-xs text-foreground/60 dark:text-zinc-400">
                        Academic degrees &amp; qualifications
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-black/5 dark:bg-white/10 text-foreground/70 dark:text-zinc-300 border border-black/5 dark:border-white/10">
                    {educationData.length} Items
                  </span>
                </div>
                <EducationStepper items={educationData} type="education" />
              </div>
            )}

            {/* Experience Column */}
            {showExperience && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/10 dark:from-indigo-500/30 dark:to-emerald-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 dark:border-indigo-500/30 shadow-sm">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3
                        className={getFontSizeClass(
                          "text-xl sm:text-2xl text-foreground dark:text-white font-bold tracking-tight",
                        )}
                      >
                        {t("experience.title") as string}
                      </h3>
                      <p className="text-xs text-foreground/60 dark:text-zinc-400">
                        Roles, internships &amp; teaching assistantships
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-black/5 dark:bg-white/10 text-foreground/70 dark:text-zinc-300 border border-black/5 dark:border-white/10">
                    {experienceData.length} Items
                  </span>
                </div>
                <EducationStepper
                  items={experienceData}
                  type="experience"
                  limitFeatured={!isExpanded}
                />
                {!showAll && (
                  <div className="pt-2 flex justify-center">
                    <Link
                      href="/experience"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm font-medium text-foreground hover:bg-black/10 dark:hover:bg-white/15 transition-all shadow-sm cursor-pointer"
                    >
                      <span>
                        {t("common.seeAll") as string} ({experienceData.length})
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Background;
