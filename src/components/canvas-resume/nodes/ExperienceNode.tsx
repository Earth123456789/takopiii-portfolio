import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useFontSize } from "@/hooks/useFontSize";
import { getExperienceData } from "@/data/experience";
import { Briefcase, Calendar } from "lucide-react";
import Image from "next/image";

export const ExperienceNode: React.FC = () => {
  const { t } = useLanguage();
  const { getFontSizeClass } = useFontSize();
  const experiences = getExperienceData(t);

  return (
    <section className="flex flex-col h-full gap-4 p-1">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
          <Briefcase className="w-4 h-4" />
          <h2>Work & Academic Experience</h2>
        </div>
        <span className="text-xs text-slate-500 dark:text-zinc-500 font-mono">
          {experiences.length} Positions
        </span>
      </header>

      <div className="space-y-4 overflow-y-auto pr-1 custom-scrollbar">
        {experiences.map((exp, idx) => (
          <article
            key={idx}
            className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:border-blue-500/50 transition-all flex flex-col gap-2 group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                {exp.image && (
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 shrink-0 bg-slate-200 dark:bg-white/5">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3
                    className={getFontSizeClass(
                      "text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors",
                    )}
                  >
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-zinc-400 font-mono mt-0.5">
                    <Calendar className="w-3 h-3 text-slate-400 dark:text-zinc-500" />
                    <time>{exp.period}</time>
                  </div>
                </div>
              </div>
              {exp.status && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                  {exp.status}
                </span>
              )}
            </div>

            <p
              className={getFontSizeClass(
                "text-xs text-slate-700 dark:text-zinc-300 leading-relaxed font-light pl-1 border-l-2 border-blue-500/30",
              )}
            >
              {exp.detail}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
