import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useFontSize } from "@/hooks/useFontSize";
import { getEducationData } from "@/data/education";
import { certificateData } from "@/data/certificates";
import { GraduationCap, Award } from "lucide-react";
import Image from "next/image";

export const EducationNode: React.FC = () => {
  const { t } = useLanguage();
  const { getFontSizeClass } = useFontSize();
  const education = getEducationData(t);

  return (
    <section className="flex flex-col h-full gap-4 p-1">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
          <GraduationCap className="w-4 h-4" />
          <h2>Education & Professional Certifications</h2>
        </div>
      </header>

      {/* Education Stepper */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-400 flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          Academic Background
        </h3>
        <div className="space-y-2">
          {education.map((edu, idx) => (
            <article
              key={idx}
              className="p-3 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                {edu.image && (
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 shrink-0 bg-slate-200 dark:bg-white/5">
                    <Image
                      src={edu.image}
                      alt={edu.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4
                    className={getFontSizeClass(
                      "text-xs font-bold text-slate-900 dark:text-white",
                    )}
                  >
                    {edu.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-zinc-400">
                    {edu.detail}
                  </p>
                </div>
              </div>
              <time className="text-[11px] text-slate-500 dark:text-zinc-500 font-mono shrink-0">
                {edu.period}
              </time>
            </article>
          ))}
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-white/10">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-400 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          Certificates ({certificateData.length})
        </h3>
        <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-36 pr-1 custom-scrollbar">
          {certificateData.slice(0, 4).map((cert, idx) => (
            <article
              key={idx}
              className="p-2 rounded-lg bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-center gap-2"
            >
              {cert.image && (
                <div className="relative w-7 h-7 rounded overflow-hidden shrink-0 border border-slate-200 dark:border-white/10">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="overflow-hidden">
                <h4 className="text-[11px] font-semibold text-slate-800 dark:text-zinc-200 truncate">
                  {cert.title}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">
                  {cert.issuer}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
