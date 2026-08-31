"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Aurora from "@/components/Aurora";
import ImageModal from "@/components/ImageModal";
import { HeroWhiteboard } from "@/components/canvas";
import { SpotifyWidgetCard } from "@/components/SpotifyWidgetCard";
import { useTheme } from "@/hooks/useTheme";
import { useSlide } from "@/contexts/SlideContext";
import { useSlideNavigation } from "@/hooks/useSlideNavigation";
import { slideVariants, slideTransition } from "@/lib/animations";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChevronDown } from "lucide-react";
import { THEME_COLORS } from "@/data/theme";
import { Certificate } from "@/types/ui";
import {
  HeroSlide,
  BackgroundSlide,
  TechStackSlide,
  ProjectsSlide,
  CertificatesSlide,
  ActivitySlide,
  FooterSlide,
} from "@/components/sections";

export default function Home() {
  const { theme } = useTheme();
  const { activeSlide, nextSlide, prevSlide } = useSlide();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  // Modal State for Certificates
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  // Direction tracking for vertical slide transitions
  const [direction, setDirection] = useState(1);
  const prevSlideVal = useRef(0);

  useEffect(() => {
    setDirection(activeSlide > prevSlideVal.current ? 1 : -1);
    prevSlideVal.current = activeSlide;
  }, [activeSlide]);

  // Hook for Wheel, Touch Swipe & Keyboard Navigation
  useSlideNavigation({ activeSlide, nextSlide, prevSlide });

  const openModal = (cert: Certificate) => {
    setSelectedCertificate(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  const renderSlide = (index: number) => {
    switch (index) {
      case 0:
        return <HeroSlide />;
      case 1:
        return <BackgroundSlide />;
      case 2:
        return <TechStackSlide />;
      case 3:
        return <ProjectsSlide />;
      case 4:
        return <CertificatesSlide onOpenModal={openModal} />;
      case 5:
        return <ActivitySlide />;
      case 6:
        return <FooterSlide />;
      default:
        return null;
    }
  };

  return (
    <main className="w-full h-screen overflow-hidden relative select-none">
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

      {/* Main Slide Presentation Layer */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className="absolute inset-0 w-full h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 sm:pb-16"
          >
            {renderSlide(activeSlide)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pinned Side Boards: Whiteboard (Left) & Spotify (Right) - Desktop Only */}
      <AnimatePresence>
        {activeSlide === 0 && isDesktop && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed left-4 top-1/2 -translate-y-1/2 z-[40] w-[320px] xl:w-[370px] max-h-[82vh] hidden xl:flex flex-col pointer-events-auto shadow-2xl"
            >
              <HeroWhiteboard />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed right-4 top-1/2 -translate-y-1/2 z-[40] w-[320px] xl:w-[370px] max-h-[82vh] hidden xl:flex flex-col pointer-events-auto shadow-2xl"
            >
              <SpotifyWidgetCard />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Bottom Scroll Down Arrow Icon (Visible until reaching the last slide) */}
      <AnimatePresence>
        {activeSlide < 6 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.3 }}
            onClick={nextSlide}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[40] p-2 bg-transparent text-primary dark:text-[#ff9cb0] hover:scale-125 active:scale-95 transition-all duration-300 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary select-none"
            aria-label="Scroll Down"
          >
            <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)] group-hover:text-primary dark:group-hover:text-white transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Certificate Image Preview Modal */}
      {selectedCertificate && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={selectedCertificate.image}
          imageAlt={selectedCertificate.title}
          title={selectedCertificate.title}
          issuer={selectedCertificate.issuer}
        />
      )}
    </main>
  );
}
