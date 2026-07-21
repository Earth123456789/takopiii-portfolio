"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { HamburgerButtonProps } from "@/types/navigation";

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  onClick,
  color = "#000",
  isMobile,
}) => {
  const sizeClass = isMobile ? "w-[22px]" : "w-[28px]";
  const gapClass = isMobile ? "gap-[4px]" : "gap-[6px]";

  return (
    <div
      className={cn(
        "hamburger-menu group h-full flex flex-col items-center justify-center cursor-pointer order-2 md:order-none min-w-[40px] min-h-[40px] hover:bg-black/5 rounded-md transition-colors duration-200",
        isOpen && "open",
        gapClass,
      )}
      onClick={onClick}
      role="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      tabIndex={0}
      style={{ color }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div
        className={cn(
          "hamburger-line h-[2px] bg-current transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-origin:center] group-hover:opacity-75",
          sizeClass,
          isOpen &&
            (isMobile
              ? "translate-y-[3px] rotate-45"
              : "translate-y-[4px] rotate-45"),
        )}
      />
      <div
        className={cn(
          "hamburger-line h-[2px] bg-current transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-origin:center] group-hover:opacity-75",
          sizeClass,
          isOpen &&
            (isMobile
              ? "-translate-y-[3px] -rotate-45"
              : "-translate-y-[4px] -rotate-45"),
        )}
      />
    </div>
  );
};
