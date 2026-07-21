"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { CTAButtonProps } from "@/types/navigation";
import { Download, ChevronDown, FileText, FileSpreadsheet } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const CTAButton: React.FC<CTAButtonProps> = ({
  isTablet,
  isMobile,
  bgColor,
  textColor,
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dropdownCoords, setDropdownCoords] = useState<{
    top: number;
    left?: number;
    right?: number;
  } | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const isLeftSide = rect.left < window.innerWidth / 2;

      setDropdownCoords({
        top: rect.bottom + 8,
        left: isLeftSide ? Math.max(10, rect.left) : undefined,
        right: !isLeftSide
          ? Math.max(10, window.innerWidth - rect.right)
          : undefined,
      });
    }
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      updatePosition();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // Close dropdown on outside click or window resize/scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScrollOrResize = () => {
      if (isOpen) {
        updatePosition();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScrollOrResize, true);
      window.addEventListener("resize", handleScrollOrResize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen]);

  const handleDownload = (type: "resume" | "cv") => {
    const link = document.createElement("a");
    if (type === "resume") {
      link.href = "/files/Resume.pdf";
      link.download = "Vipat_Choknantawong_Resume.pdf";
    } else {
      link.href = "/files/Vipat_Choknantawong_CV.pdf";
      link.download = "Vipat_Choknantawong_CV.pdf";
    }
    link.click();
    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleDropdown}
        className={cn(
          "card-nav-cta-button inline-flex items-center justify-center gap-1.5 border-0 rounded-xl font-semibold cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 whitespace-nowrap shadow-sm shrink-0 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          isMobile
            ? "px-2.5 py-1.5 text-xs"
            : isTablet
              ? "px-3 py-2 text-sm"
              : "px-4 py-2 text-base",
        )}
        style={{ backgroundColor: bgColor, color: textColor }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Download className={cn(isMobile ? "w-3.5 h-3.5" : "w-4 h-4")} />
        <span>
          {isMobile
            ? "Resume / CV"
            : (t("common.myResume") as string) || "My Resume"}
        </span>
        <ChevronDown
          className={cn(
            "transition-transform duration-200",
            isMobile ? "w-3 h-3" : "w-4 h-4",
            isOpen ? "rotate-180" : "rotate-0",
          )}
        />
      </button>

      {/* Portaled Dropdown Menu (Escapes parent overflow-hidden) */}
      {mounted &&
        isOpen &&
        dropdownCoords &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed w-48 sm:w-56 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-2xl p-1.5 z-[9999] animate-in fade-in-0 zoom-in-95 duration-200 flex flex-col gap-1 select-none"
            style={{
              top: `${dropdownCoords.top}px`,
              left:
                dropdownCoords.left !== undefined
                  ? `${dropdownCoords.left}px`
                  : "auto",
              right:
                dropdownCoords.right !== undefined
                  ? `${dropdownCoords.right}px`
                  : "auto",
            }}
          >
            <button
              type="button"
              onClick={() => handleDownload("resume")}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors duration-150 text-left group cursor-pointer"
            >
              <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold leading-tight">Download Resume</span>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400">PDF Format</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDownload("cv")}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors duration-150 text-left group cursor-pointer"
            >
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold leading-tight">Download CV</span>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400">Full Curriculum Vitae</span>
              </div>
            </button>
          </div>,
          document.body,
        )}
    </>
  );
};
