"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarqueeTech } from "@/components/MarqueeTech";
import { techItems } from "@/data/techStack";
import { useLanguage } from "@/hooks/useLanguage";
import { useFontSize } from "@/hooks/useFontSize";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface TechStackSlideProps {
  showAll?: boolean;
}

export const TechStackSlide: React.FC<TechStackSlideProps> = ({
  showAll = false,
}) => {
  const { t } = useLanguage();
  const { getFontSizeClass } = useFontSize();
  const [isExpanded] = useState<boolean>(showAll);

  return (
    <section
      className="tech-stack-slide flex flex-col w-full py-10 max-h-full overflow-y-auto px-4 sm:px-6 lg:px-8"
      id="stack"
    >
      <div className="max-w-7xl mx-auto w-full">
        <header className="text-center lg:text-left mb-8">
          <h2
            className={getFontSizeClass(
              "text-foreground text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4",
            )}
          >
            {t("techStack.title") as string}
          </h2>
          <p
            className={getFontSizeClass(
              "text-foreground/70 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0",
            )}
          >
            {t("techStack.description") as string}
          </p>
        </header>

        {/* Featured View (Marquee) vs Full Grid View */}
        {!isExpanded ? (
          <div className="w-full">
            <MarqueeTech />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 w-full"
          >
            {techItems.map((item) => (
              <figure
                key={item.name}
                className={cn(
                  "relative flex flex-col items-center justify-center p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/50 dark:hover:border-[#A91D3A]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm",
                )}
              >
                <div className="relative w-10 h-10 mb-2 flex items-center justify-center">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="object-contain max-h-full"
                  />
                </div>
                <figcaption className="text-xs sm:text-sm font-medium text-foreground text-center truncate w-full">
                  {item.name}
                </figcaption>
              </figure>
            ))}
          </motion.div>
        )}

        {/* See All Route Link */}
        {!showAll && (
          <div className="mt-8 flex justify-center">
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-semibold text-foreground hover:bg-black/10 dark:hover:bg-white/15 transition-all shadow-md cursor-pointer"
            >
              <span>
                {t("common.seeAll") as string} ({techItems.length})
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
