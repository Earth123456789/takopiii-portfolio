"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { Language } from "@/types/context";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const changeLanguage = (locale: Language) => {
    setLanguage(locale);
  };

  return (
    <div className="flex items-center gap-2">
      {(["th", "en"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={cn(
            "px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200",
            language === lang
              ? "bg-primary dark:bg-[#A91D3A] text-white"
              : "bg-black/5 dark:bg-white/10 text-foreground/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/20 hover:text-foreground dark:hover:text-white",
          )}
        >
          {lang === "th" ? "ไทย" : "EN"}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
