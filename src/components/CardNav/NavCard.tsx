"use client";

import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { NavCardProps } from "@/types/navigation";
import { cn } from "@/lib/utils";
import { useSlide } from "@/contexts/SlideContext";

const hashToSlideIndex: Record<string, number> = {
  "#about": 0,
  "#educate": 1,
  "#stack": 2,
  "#project": 3,
  "#certificates": 4,
  "#activity": 5,
};

export const NavCard: React.FC<NavCardProps> = ({
  item,
  isMobile,
  isTablet,
  setRef,
}) => {
  const { setActiveSlide } = useSlide();

  const labelSizeClass = isMobile
    ? "text-[15px]"
    : isTablet
      ? "text-[17px]"
      : "text-[18px] lg:text-[20px]";

  const linkSizeClass = isMobile
    ? "text-[13px] min-h-[28px]"
    : "text-[14px] sm:text-[15px] min-h-[24px]";

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href in hashToSlideIndex) {
      e.preventDefault();
      setActiveSlide(hashToSlideIndex[href]);
    }
  };

  const flexClass = isMobile
    ? "w-full shrink-0 h-auto min-h-[120px]"
    : "flex-1 min-w-0 md:h-full";

  return (
    <div
      className={cn(
        "nav-card select-none relative flex flex-col gap-2 p-[12px_14px] sm:p-[14px_16px] rounded-xl border border-white/10 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg",
        flexClass,
      )}
      ref={setRef}
      style={{ background: item.bgColor, color: item.textColor }}
    >
      <div
        className={cn(
          "nav-card-label font-medium tracking-tight leading-tight",
          labelSizeClass,
        )}
      >
        {item.label}
      </div>
      <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
        {item.links?.map((lnk, i) => (
          <a
            key={`${lnk.label}-${i}`}
            className={cn(
              "nav-card-link inline-flex items-center gap-[5px] sm:gap-[6px] no-underline cursor-pointer transition-all duration-300 hover:opacity-75 hover:translate-x-1 active:opacity-60 leading-tight",
              linkSizeClass,
            )}
            href={lnk.href}
            aria-label={lnk.ariaLabel}
            onClick={(e) => handleLinkClick(e, lnk.href)}
            target={lnk.href.startsWith("http") ? "_blank" : "_self"}
            rel={
              lnk.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
          >
            <GoArrowUpRight
              className={cn(
                "nav-card-link-icon shrink-0",
                isMobile ? "w-[13px] h-[13px]" : "w-[15px] h-[15px]",
              )}
              aria-hidden="true"
            />
            <span className="break-words">{lnk.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
