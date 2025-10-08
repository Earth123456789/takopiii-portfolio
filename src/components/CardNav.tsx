"use client";

import React, { useLayoutEffect, useRef, useState, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { GoArrowUpRight } from "react-icons/go";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

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
}) => {
  const { t } = useLanguage();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, isMobile: false, isTablet: false });
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Create translated navigation items
  const translatedItems = useMemo(() => [
    {
      label: t('navigation.about'),
      bgColor: "linear-gradient(135deg, #A91D3A, #C72C41, #E94560)",
      textColor: "#fff",
      links: [
        { label: t('navigation.about'), href: "#about", ariaLabel: "About Me" },
        { label: t('navigation.education'), href: "#educate", ariaLabel: "About Education" },
        { label: t('navigation.techStack'), href: "#stack", ariaLabel: "About Tech Stack" },
        { label: t('navigation.projects'), href: "#project", ariaLabel: "About Projects" },
        { label: t('navigation.certificates'), href: "#certificates", ariaLabel: "About Certificates" },
        { label: t('navigation.activity'), href: "#activity", ariaLabel: "About Activities" },
      ],
    },
    {
      label: t('navigation.contact'),
      bgColor: "linear-gradient(135deg, #6E1423, #A91D3A, #E94560)",
      textColor: "#fff",
      links: [
        {
          label: "Email",
          href: "mailto:vipat.choknantawong@gmail.com",
          ariaLabel: "Send email to Vipat",
        },
        {
          label: "Facebook",
          href: "https://www.facebook.com/vipat.choknantawong",
          ariaLabel: "Visit Facebook profile",
        },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/earth-vipat-a87b092a5/",
          ariaLabel: "Visit LinkedIn profile",
        },
      ],
    },
  ], [t]);

  // Screen size detection
  useLayoutEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
      });
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 280;

    const { isMobile, isTablet } = screenSize;
    
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        void contentEl.offsetHeight;

        const topBar = 52;
        const padding = 12;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
      return 240;
    } else if (isTablet) {
      return 270;
    }
    return 300;
  }, [screenSize]);

  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const { isMobile } = screenSize;
    const initialHeight = isMobile ? 52 : 60;

    gsap.set(navEl, { height: initialHeight, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

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
        stagger: isMobile ? 0.05 : 0.08 
      },
      "-=0.1",
    );

    return tl;
  }, [screenSize, calculateHeight, ease, translatedItems]);

  useLayoutEffect(() => {
    if (!navRef.current) return;

    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: navRef.current,
        start: "top top+=100",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, translatedItems, screenSize, createTimeline]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded, screenSize, calculateHeight, createTimeline]);

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

  // Close menu when clicking outside on mobile
  useLayoutEffect(() => {
    if (!screenSize.isMobile || !isExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        toggleMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [screenSize.isMobile, isExpanded, toggleMenu]);

  const responsiveConfig = {
    container: {
      width: screenSize.isMobile 
        ? "w-[96%]" 
        : screenSize.isTablet 
        ? "w-[92%] max-w-[600px]" 
        : "w-[90%] max-w-[800px]",
      top: screenSize.isMobile 
        ? "top-[0.5em]" 
        : screenSize.isTablet 
        ? "top-[1em]" 
        : "top-[2em]"
    },
    nav: {
      height: screenSize.isMobile ? "h-[52px]" : "h-[60px]",
      padding: screenSize.isMobile ? "p-2" : "p-2 pl-[1.1rem]",
      radius: screenSize.isMobile ? "rounded-lg" : "rounded-xl"
    },
    hamburger: {
      size: screenSize.isMobile ? "w-[22px]" : "w-[28px]",
      gap: screenSize.isMobile ? "gap-[4px]" : "gap-[6px]"
    },
    logo: {
      size: screenSize.isMobile ? "h-[22px]" : "h-[28px]"
    },
    button: {
      display: screenSize.isMobile 
        ? "hidden" 
        : screenSize.isTablet 
        ? "hidden md:inline-flex" 
        : "hidden md:inline-flex",
      padding: screenSize.isTablet ? "px-3" : "px-4",
      text: screenSize.isTablet ? "text-sm" : "text-base"
    }
  };

  return (
    <div
      className={`card-nav-container fixed left-1/2 -translate-x-1/2 ${responsiveConfig.container.width} z-[99] ${responsiveConfig.container.top} ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""} block ${responsiveConfig.nav.height} p-0 ${responsiveConfig.nav.radius} shadow-lg backdrop-blur-sm relative overflow-hidden will-change-[height] border border-white/10`}
        style={{ backgroundColor: baseColor }}
      >
        <div className={`card-nav-top absolute inset-x-0 top-0 ${responsiveConfig.nav.height} flex items-center justify-between ${responsiveConfig.nav.padding} z-[2]`}>
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""} group h-full flex flex-col items-center justify-center cursor-pointer ${responsiveConfig.hamburger.gap} order-2 md:order-none min-w-[40px] min-h-[40px] hover:bg-black/5 rounded-md transition-colors duration-200`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            tabIndex={0}
            style={{ color: menuColor || "#000" }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
              }
            }}
          >
            <div
              className={`hamburger-line ${responsiveConfig.hamburger.size} h-[2px] bg-current transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-origin:center] ${
                isHamburgerOpen ? 
                  screenSize.isMobile ? "translate-y-[3px] rotate-45" : "translate-y-[4px] rotate-45" 
                  : ""
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line ${responsiveConfig.hamburger.size} h-[2px] bg-current transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-origin:center] ${
                isHamburgerOpen ? 
                  screenSize.isMobile ? "-translate-y-[3px] -rotate-45" : "-translate-y-[4px] -rotate-45" 
                  : ""
              } group-hover:opacity-75`}
            />
          </div>

          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
            <Image 
              src={logo} 
              alt={logoAlt} 
              width={28}
              height={28}
              className={`logo ${responsiveConfig.logo.size} object-contain`}
              priority
            />
          </div>

          <button
            type="button"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/files/Resume.pdf";
              link.download = "Resume.pdf";
              link.click();
            }}
            className={`card-nav-cta-button ${responsiveConfig.button.display} border-0 rounded-[calc(0.75rem-0.2rem)] ${responsiveConfig.button.padding} h-full font-medium cursor-pointer transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95 py-2 ${responsiveConfig.button.text} whitespace-nowrap`}
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            {screenSize.isTablet ? t('common.resume') : t('common.myResume')}
          </button>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[52px] sm:top-[60px] bottom-0 p-2 sm:p-3 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none"
          } md:flex-row md:items-end md:gap-[10px] lg:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {(translatedItems || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className={`nav-card select-none relative flex flex-col gap-2 p-[12px_14px] sm:p-[14px_16px] rounded-[calc(0.6rem-0.1rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[50px] sm:min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%] backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
              ref={setCardRef(idx)}
              style={{ background: item.bgColor, color: item.textColor }}
            >
              <div className={`nav-card-label font-medium tracking-[-0.3px] sm:tracking-[-0.4px] ${
                screenSize.isMobile 
                  ? "text-[15px]" 
                  : screenSize.isTablet 
                  ? "text-[17px]" 
                  : "text-[18px] lg:text-[20px]"
              } leading-tight`}>
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className={`nav-card-link inline-flex items-center gap-[5px] sm:gap-[6px] no-underline cursor-pointer transition-all duration-300 hover:opacity-75 hover:translate-x-1 active:opacity-60 ${
                      screenSize.isMobile 
                        ? "text-[13px] min-h-[28px]" 
                        : "text-[14px] sm:text-[15px] min-h-[24px]"
                    } leading-tight`}
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    target={lnk.href.startsWith('http') ? '_blank' : '_self'}
                    rel={lnk.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <GoArrowUpRight
                      className={`nav-card-link-icon shrink-0 ${
                        screenSize.isMobile ? "w-[13px] h-[13px]" : "w-[15px] h-[15px]"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="break-words">{lnk.label}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile backdrop overlay */}
      {screenSize.isMobile && isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default CardNav;