"use client";

import React, {
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";
import { CardNavProps } from "@/types/navigation";
import { HamburgerButton } from "./HamburgerButton";
import { NavCard } from "./NavCard";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

import { getNavigationData } from "@/data/navigation";

gsap.registerPlugin(ScrollTrigger);

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = "Logo",
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
  buttonBgColor,
  buttonTextColor,
  items,
}) => {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: 0,
    isMobile: false,
    isTablet: false,
  });

  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Memoized navigation data (supports custom items prop or translated defaults)
  const navItems = useMemo(() => items || getNavigationData(t), [items, t]);

  // Screen size handling
  useLayoutEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 440;

    const { isMobile, isTablet } = screenSize;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const isHidden = contentEl.classList.contains("hidden");
        if (isHidden) {
          contentEl.style.visibility = "hidden";
          contentEl.style.display = "flex";
          contentEl.style.position = "absolute";
        }
        const contentHeight = contentEl.scrollHeight;
        if (isHidden) {
          contentEl.style.display = "";
          contentEl.style.visibility = "";
          contentEl.style.position = "";
        }
        return Math.min(
          52 + contentHeight + 24,
          Math.max(window.innerHeight * 0.82, 400),
        );
      }
      return 440;
    }
    return isTablet ? 300 : 340;
  }, [screenSize]);

  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const { isMobile } = screenSize;
    const initialHeight = isMobile ? 52 : 60;

    gsap.set(navEl, { height: initialHeight, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 30, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, {
      height: calculateHeight,
      duration: isMobile ? 0.3 : 0.4,
      ease,
    });
    tl.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: isMobile ? 0.3 : 0.4,
        ease,
        stagger: isMobile ? 0.05 : 0.08,
      },
      "-=0.1",
    );

    return tl;
  }, [screenSize, calculateHeight, ease]);

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    if (isExpanded) {
      tl?.progress(1);
    }
    return () => {
      tl?.kill();
    };
  }, [createTimeline, isExpanded]);

  const toggleMenu = useCallback(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  }, [isExpanded]);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/files/Resume.pdf";
    link.download = "Resume.pdf";
    link.click();
  };

  const { isMobile, isTablet } = screenSize;

  if (pathname !== "/") {
    return null;
  }

  return (
    <div
      className={cn(
        "card-nav-container fixed left-1/2 -translate-x-1/2 z-[99] transition-all duration-300",
        isMobile
          ? "w-[94%] max-w-[500px] top-3"
          : isTablet
            ? "w-[92%] max-w-[640px] top-[1em]"
            : "w-[90%] max-w-[800px] top-[1.5em]",
        className,
      )}
    >
      <nav
        ref={navRef}
        className={cn(
          "card-nav block shadow-2xl backdrop-blur-md relative overflow-hidden will-change-[height] border border-white/15 dark:border-white/10 transition-colors rounded-2xl",
          isExpanded
            ? "open"
            : isMobile
              ? "max-h-[52px] h-[52px]"
              : "max-h-[60px] h-[60px]",
        )}
        style={{ backgroundColor: baseColor }}
      >
        <div
          className={cn(
            "card-nav-top absolute inset-x-0 top-0 flex items-center justify-between gap-2 z-[2]",
            isMobile ? "h-[52px] px-3 py-1.5" : "h-[60px] px-4 py-2",
          )}
        >
          <HamburgerButton
            isOpen={isHamburgerOpen}
            onClick={toggleMenu}
            color={menuColor}
            isMobile={isMobile}
          />

          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none shrink-0">
            <Image
              src={logo}
              alt={logoAlt}
              width={28}
              height={28}
              className={cn(
                "logo object-contain w-auto",
                isMobile ? "h-[22px]" : "h-[28px]",
              )}
              priority
            />
          </div>

          <CTAButton
            isTablet={isTablet}
            isMobile={isMobile}
            bgColor={buttonBgColor}
            textColor={buttonTextColor}
          />
        </div>

        <div
          className={cn(
            "card-nav-content absolute left-0 right-0 top-[52px] sm:top-[60px] bottom-0 p-3 flex flex-col md:flex-row items-stretch gap-3 justify-start z-[1] transition-all duration-300 overflow-y-auto max-h-[calc(85vh-60px)]",
            isExpanded
              ? "flex visible pointer-events-auto opacity-100"
              : "hidden invisible pointer-events-none opacity-0",
          )}
          aria-hidden={!isExpanded}
        >
          {navItems.map((item, idx) => (
            <NavCard
              key={idx}
              item={item}
              isMobile={isMobile}
              isTablet={isTablet}
              setRef={setCardRef(idx)}
            />
          ))}
        </div>
      </nav>

      {/* Mobile backdrop */}
      {isMobile && isExpanded && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm -z-10 animate-in fade-in duration-300"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default CardNav;
