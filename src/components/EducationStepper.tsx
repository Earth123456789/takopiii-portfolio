"use client";

import React from "react";
import Image from "next/image";
import { useFontSize } from "@/hooks/useFontSize";
import { EducationStepperProps } from "@/types/education";
import { cn } from "@/lib/utils";
import { Calendar, CheckCircle2, Sparkles, Clock, GraduationCap, Briefcase } from "lucide-react";
import { motion } from "motion/react";

const EducationStepper: React.FC<EducationStepperProps> = ({
  items,
  type = "education",
  limitFeatured = false,
}) => {
  const { getFontSizeClass } = useFontSize();

  const displayedItems = limitFeatured
    ? items.filter((item) => item.featured !== false)
    : items;

  const getStatusConfig = (status?: string) => {
    const s = status?.toLowerCase() || "";
    if (
      s.includes("success") ||
      s.includes("สำเร็จ") ||
      s.includes("graduated") ||
      s.includes("completed")
    ) {
      return {
        dotBg: "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]",
        badgeStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />,
        label: status,
        isCurrent: false,
      };
    }
    if (
      s.includes("in progress") ||
      s.includes("กำลังศึกษา") ||
      s.includes("current")
    ) {
      return {
        dotBg: "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)]",
        badgeStyle: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
        icon: <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />,
        label: status,
        isCurrent: true,
      };
    }
    return {
      dotBg: "bg-primary dark:bg-[#A91D3A] shadow-[0_0_12px_rgba(169,29,58,0.5)]",
      badgeStyle:
        "bg-primary/10 dark:bg-[#A91D3A]/10 text-primary dark:text-[#ff9cb0] border-primary/30 dark:border-[#A91D3A]/30",
      icon: <Clock className="w-3.5 h-3.5" />,
      label: status,
      isCurrent: false,
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -16, y: 10 },
    show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative pl-8 sm:pl-10 space-y-6 sm:space-y-8 py-2"
    >
      {/* Glowing Vertical Timeline Track */}
      <div className="absolute left-3 sm:left-4 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-primary via-indigo-500/60 to-emerald-500/40 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.2)]" />

      {displayedItems.map((item, index) => {
        const statusConfig = getStatusConfig(item.status);
        // Check if detail has bullet points formatted with '|'
        const detailBullets = item.detail.includes("|")
          ? item.detail.split("|").map((b) => b.trim()).filter(Boolean)
          : null;

        return (
          <motion.div key={index} variants={itemVariants} className="relative group">
            {/* Timeline Dot (Node Bullet) */}
            <div
              className={cn(
                "absolute left-3 sm:left-4 top-6 -translate-x-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-background dark:border-slate-950 flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-125",
                statusConfig.dotBg,
              )}
            >
              {statusConfig.isCurrent && (
                <span className="absolute inset-0 rounded-full bg-amber-400 opacity-75 animate-ping" />
              )}
              <div className="w-2 h-2 rounded-full bg-white shadow-inner" />
            </div>

            {/* Resume Card Container */}
            <div className="relative rounded-2xl p-5 sm:p-6 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-sm hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-[#A91D3A]/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              {/* Card Top Edge Specular Sheen */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 dark:via-white/20 to-transparent" />

              {/* Hover Ambient Gradient Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                {/* Logo Badge Container */}
                <div className="relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white dark:bg-white/10 p-2 sm:p-2.5 border border-slate-200/80 dark:border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={52}
                      height={52}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  ) : type === "education" ? (
                    <GraduationCap className="w-7 h-7 text-primary dark:text-[#ff9cb0]" />
                  ) : (
                    <Briefcase className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0 space-y-2.5">
                  {/* Badges Panel */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Period Badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-zinc-300 border border-slate-200/80 dark:border-white/10 shadow-2xs">
                      <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                      {item.period}
                    </span>

                    {/* Status Badge */}
                    {item.status && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-2xs",
                          statusConfig.badgeStyle,
                        )}
                      >
                        {statusConfig.icon}
                        {statusConfig.label}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4
                    className={cn(
                      getFontSizeClass(
                        "text-base sm:text-lg lg:text-xl font-bold leading-snug text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-[#ff9cb0] transition-colors duration-300 break-words",
                      ),
                    )}
                  >
                    {item.title}
                  </h4>

                  {/* Details */}
                  {detailBullets ? (
                    <ul className="space-y-1.5 pt-1">
                      {detailBullets.map((bullet, idx) => (
                        <li
                          key={idx}
                          className={getFontSizeClass(
                            "flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed",
                          )}
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60 dark:bg-[#ff9cb0]/60 mt-2 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p
                      className={getFontSizeClass(
                        "text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed pt-0.5",
                      )}
                    >
                      {item.detail}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default EducationStepper;
