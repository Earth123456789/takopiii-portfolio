"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { useFontSize } from "@/hooks/useFontSize";
import {
  Calendar,
  User,
  Briefcase,
  GraduationCap,
  Users,
  Code,
  ArrowRight,
} from "lucide-react";
import { ActivityProps } from "@/types/activity";

const Activity: React.FC<ActivityProps> = ({
  activityData,
  showAll = false,
}) => {
  const { t } = useLanguage();
  const { getFontSizeClass } = useFontSize();
  const [isExpanded, setIsExpanded] = useState<boolean>(showAll);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "academic":
        return <GraduationCap size={20} className="text-blue-400" />;
      case "event":
        return <Users size={20} className="text-green-400" />;
      case "work":
        return <Briefcase size={20} className="text-purple-400" />;
      default:
        return <Code size={20} className="text-gray-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "academic":
        return t("activity.types.academic");
      case "event":
        return t("activity.types.event");
      case "work":
        return t("activity.types.work");
      default:
        return type;
    }
  };

  // Early Return for empty data
  if (!activityData || activityData.length === 0) {
    return null;
  }

  const displayedActivities = isExpanded
    ? activityData
    : activityData.filter((a) => a.featured !== false);

  return (
    <section
      className="flex flex-col py-12 sm:py-16 lg:py-20 w-full px-4 sm:px-6 lg:px-8"
      id="activity"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center lg:text-left mb-12 sm:mb-16">
          <h2
            className={getFontSizeClass(
              "text-3xl sm:text-4xl lg:text-5xl text-foreground font-extrabold mb-4 sm:mb-6",
            )}
          >
            {t("activity.title") as string}
          </h2>
          <p
            className={getFontSizeClass(
              "text-lg sm:text-xl text-foreground/80 leading-relaxed",
            )}
          >
            {t("activity.description") as string}
          </p>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedActivities.map((activity, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-[#A91D3A]/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-4">
                {getTypeIcon(activity.type)}
                <span
                  className={getFontSizeClass(
                    "text-sm font-medium text-foreground/70",
                  )}
                >
                  {getTypeLabel(activity.type) as string}
                </span>
              </div>

              <h3
                className={getFontSizeClass(
                  "text-foreground text-lg sm:text-xl font-bold mb-3 group-hover:text-primary dark:group-hover:text-[#ff9cb0] transition-colors duration-300 leading-tight",
                )}
              >
                {activity.title}
              </h3>

              <div className="flex items-center gap-2 mb-3">
                <User size={16} className="text-foreground/60" />
                <span
                  className={getFontSizeClass(
                    "text-foreground/80 font-medium text-sm sm:text-base",
                  )}
                >
                  {activity.role}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-foreground/60" />
                <span
                  className={getFontSizeClass(
                    "text-foreground/70 text-sm sm:text-base",
                  )}
                >
                  {activity.period}
                </span>
              </div>

              <p
                className={getFontSizeClass(
                  "text-foreground/70 text-sm sm:text-base leading-relaxed mb-4",
                )}
              >
                {activity.description}
              </p>

              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 dark:from-[#A91D3A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* See All Route Link */}
        {!showAll && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-semibold text-foreground hover:bg-black/10 dark:hover:bg-white/15 transition-all shadow-md cursor-pointer"
            >
              <span>
                {t("common.seeAll") as string} ({activityData.length})
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Activity;
