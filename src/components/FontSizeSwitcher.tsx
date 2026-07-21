"use client";

import React from "react";
import { useFontSize } from "@/hooks/useFontSize";
import { cn } from "@/lib/utils";
import { FontSize } from "@/types/context";

const FontSizeSwitcher: React.FC = () => {
  const { fontSize, setFontSize } = useFontSize();

  const SIZES: { id: FontSize; label: React.ReactNode; title: string }[] = [
    {
      id: "small",
      label: <span className="text-xs font-bold">A⁻</span>,
      title: "Small Font",
    },
    {
      id: "medium",
      label: <span className="text-base font-bold">A</span>,
      title: "Medium Font",
    },
    {
      id: "large",
      label: <span className="text-lg font-bold">A⁺</span>,
      title: "Large Font",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {SIZES.map((size) => (
        <button
          key={size.id}
          onClick={() => setFontSize(size.id)}
          className={cn(
            "px-3 py-1 rounded-lg font-medium transition-all duration-200",
            fontSize === size.id
              ? "bg-primary dark:bg-[#A91D3A] text-white"
              : "bg-black/5 dark:bg-white/10 text-foreground/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/20 hover:text-foreground dark:hover:text-white",
          )}
          title={size.title}
        >
          {size.label}
        </button>
      ))}
    </div>
  );
};

export default FontSizeSwitcher;
