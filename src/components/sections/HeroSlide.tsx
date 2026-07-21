"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import RotatingText from "@/components/RotatingText";
import { HeroWhiteboard } from "@/components/canvas";
import { SpotifyWidgetCard } from "@/components/SpotifyWidgetCard";
import { useLanguage } from "@/hooks/useLanguage";
import { useFontSize } from "@/hooks/useFontSize";
import { useSlide } from "@/contexts/SlideContext";

export const HeroSlide: React.FC = () => {
  const { t } = useLanguage();
  const { getFontSizeClass } = useFontSize();
  const { activeSlide } = useSlide();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Ensure hero slide always resets scroll position to top when active
  useEffect(() => {
    if (activeSlide === 0 && sectionRef.current) {
      sectionRef.current.scrollTop = 0;
    }
  }, [activeSlide]);

  return (
    <section
      ref={sectionRef}
      className="hero-slide flex flex-col items-center text-center w-full max-w-4xl mx-auto py-4 sm:py-6 gap-4 sm:gap-6 max-h-full overflow-y-auto"
    >
      {/* Main Hero Header */}
      <header className="flex flex-col justify-center items-center z-10 space-y-3 sm:space-y-4 pt-2">
        {/* Profile Avatar with Ambient Glowing Ring */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative group cursor-pointer"
        >
          {/* Outer Glowing Aura Ring */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-primary via-indigo-500 to-emerald-400 opacity-75 blur-lg group-hover:opacity-100 group-hover:blur-xl transition duration-500 animate-pulse" />

          {/* Image Container */}
          <div className="relative w-32 h-32 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 border-white/30 bg-black/20 backdrop-blur-md shadow-2xl">
            <Image
              src="/images/profile.png"
              alt="Vipat Choknantawong"
              fill
              className="object-cover object-[center_35%] scale-125 hover:scale-135 transition-transform duration-500"
              priority
            />
          </div>
        </motion.div>

        <article className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 mb-1 sm:mb-4">
          <p
            className={getFontSizeClass(
              "text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground",
            )}
          >
            {t("hero.im")}
          </p>
          <RotatingText
            texts={[
              t("hero.frontendDeveloper") as string,
              t("hero.backendDeveloper") as string,
              t("hero.fullStackDeveloper") as string,
              t("hero.freelancer") as string,
            ]}
            mainClassName={getFontSizeClass(
              "px-2 sm:px-3 bg-primary/50 text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold rounded-lg select-none overflow-hidden py-1 sm:py-2 justify-center",
            )}
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </article>

        <article className="w-full max-w-2xl px-2">
          <p
            className={getFontSizeClass(
              "text-sm sm:text-xl lg:text-2xl text-foreground opacity-80 leading-relaxed",
            )}
          >
            {t("hero.greeting")}
          </p>
        </article>
      </header>

      {/* Inline Whiteboard & Spotify for Mobile / Tablet screens */}
      <div className="grid grid-cols-1 gap-6 w-full z-10 xl:hidden mt-4 text-left pb-10">
        <HeroWhiteboard />
        <SpotifyWidgetCard />
      </div>
    </section>
  );
};
