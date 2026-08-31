"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ArrowUpRight,
  ChevronUp,
  Check,
  Copy,
  Layers,
  FileText,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useFontSize } from "@/hooks/useFontSize";
import { useSlide } from "@/contexts/SlideContext";

const hashToSlideIndex: Record<string, number> = {
  "#about": 0,
  "#educate": 1,
  "#stack": 2,
  "#project": 3,
  "#certificates": 4,
  "#activity": 5,
  "#contact": 6,
};

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { getFontSizeClass } = useFontSize();
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Safe slide navigation if inside SlideProvider
  let slideNav: ReturnType<typeof useSlide> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    slideNav = useSlide();
  } catch {
    slideNav = null;
  }

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (slideNav && href in hashToSlideIndex) {
      e.preventDefault();
      slideNav.setActiveSlide(hashToSlideIndex[href]);
    }
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("choknantawongvipat@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="w-full h-full min-h-full flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Top Section / Header */}
      <header className="flex flex-col items-center text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 dark:bg-[#A91D3A]/20 border border-primary/20 text-primary dark:text-[#ff9cb0] text-xs font-semibold tracking-wider uppercase mb-3 sm:mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{t("footer.heading") as string}</span>
        </div>
        <h2
          className={getFontSizeClass(
            "text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight max-w-3xl leading-snug",
          )}
        >
          {t("footer.subheading") as string}
        </h2>
        <p
          className={getFontSizeClass(
            "text-foreground/70 text-sm sm:text-base max-w-xl mt-2 leading-relaxed",
          )}
        >
          {t("footer.intro") as string}
        </p>
      </header>

      {/* Main 4-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 sm:mb-10 items-stretch">
        {/* Card 1: Identity & Philosophy */}
        <div className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/5 dark:bg-white/[0.03] backdrop-blur-md border border-black/10 dark:border-white/10 shadow-sm hover:border-primary/40 transition-all duration-300">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary dark:from-[#A91D3A] to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                E
              </div>
              <div>
                <h3 className="text-foreground text-lg font-bold leading-tight">
                  {t("footer.name") as string}
                </h3>
                <p className="text-foreground/60 text-xs font-medium">
                  {t("footer.role") as string}
                </p>
              </div>
            </div>
            <p className="text-foreground/75 text-xs sm:text-sm leading-relaxed pt-2">
              {t("footer.description") as string}
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/5 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-medium text-foreground/70">
              {t("footer.available") as string}
            </span>
          </div>
        </div>

        {/* Card 2: Contact Information */}
        <div className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/5 dark:bg-white/[0.03] backdrop-blur-md border border-black/10 dark:border-white/10 shadow-sm hover:border-primary/40 transition-all duration-300">
          <div className="space-y-4">
            <h4 className="text-foreground text-sm font-bold uppercase tracking-wider text-primary dark:text-[#ff9cb0] flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{t("footer.contact") as string}</span>
            </h4>

            {/* Email with Click-to-copy */}
            <div className="group relative">
              <a
                href="mailto:choknantawongvipat@gmail.com"
                className="flex items-center justify-between p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 transition-all text-xs text-foreground font-mono"
              >
                <span className="truncate">choknantawongvipat@gmail.com</span>
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  title="Copy email"
                  className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/20 transition-colors ml-1 flex-shrink-0 text-foreground/70"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </a>
            </div>

            {/* Phone */}
            <a
              href="tel:+660649304461"
              className="flex items-center gap-2.5 text-xs text-foreground/80 hover:text-foreground transition-colors p-1"
            >
              <Phone className="w-3.5 h-3.5 text-foreground/60 flex-shrink-0" />
              <span>+66 064 930 4461</span>
            </a>

            {/* Location */}
            <div className="flex items-center gap-2.5 text-xs text-foreground/80 p-1">
              <MapPin className="w-3.5 h-3.5 text-foreground/60 flex-shrink-0" />
              <span>{t("footer.location") as string}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Quick Navigation */}
        <div className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/5 dark:bg-white/[0.03] backdrop-blur-md border border-black/10 dark:border-white/10 shadow-sm hover:border-primary/40 transition-all duration-300">
          <div className="space-y-3">
            <h4 className="text-foreground text-sm font-bold uppercase tracking-wider text-primary dark:text-[#ff9cb0] flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>{t("footer.quickLinks") as string}</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { label: t("navigation.about"), href: "#about" },
                { label: t("navigation.education"), href: "#educate" },
                { label: t("navigation.techStack"), href: "#stack" },
                { label: t("navigation.projects"), href: "#project" },
                { label: t("navigation.certificates"), href: "#certificates" },
                { label: t("navigation.activity"), href: "#activity" },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs text-foreground/75 hover:text-foreground hover:translate-x-0.5 transition-all p-1 rounded hover:bg-black/5 dark:hover:bg-white/5"
                >
                  {link.label as string}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Card 4: Social & Links */}
        <div className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/5 dark:bg-white/[0.03] backdrop-blur-md border border-black/10 dark:border-white/10 shadow-sm hover:border-primary/40 transition-all duration-300">
          <div className="space-y-3">
            <h4 className="text-foreground text-sm font-bold uppercase tracking-wider text-primary dark:text-[#ff9cb0] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{t("footer.followMe") as string}</span>
            </h4>
            <div className="space-y-2 pt-1">
              <a
                href="https://github.com/MyNameTakopiii"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 text-xs text-foreground transition-all duration-200 font-medium group"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-foreground/80 group-hover:text-primary transition-colors" />
                  <span>GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <a
                href="https://www.linkedin.com/in/vipat-choknantawong"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 text-xs text-foreground transition-all duration-200 font-medium group"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <Link
                href="/canvas"
                className="flex items-center justify-between p-2.5 rounded-xl bg-primary/10 dark:bg-[#A91D3A]/20 hover:bg-primary/20 dark:hover:bg-[#A91D3A]/30 border border-primary/20 text-xs text-primary dark:text-[#ff9cb0] transition-all duration-200 font-medium group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4" />
                  <span>Canvas Resume</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-primary/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Back to Top */}
      <div className="border-t border-black/10 dark:border-white/10 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-foreground/60 text-xs text-center sm:text-left">
          {t("footer.copyright") as string}
        </p>

        <p className="text-foreground/60 text-xs text-center">
          {t("footer.madeWith") as string}
        </p>

        {slideNav && (
          <button
            onClick={() => slideNav?.setActiveSlide(0)}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 border border-black/10 dark:border-white/10 text-xs text-foreground/80 hover:text-foreground transition-all cursor-pointer shadow-sm"
          >
            <span>{t("footer.backToTop") as string}</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
