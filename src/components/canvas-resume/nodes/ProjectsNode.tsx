import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useFontSize } from "@/hooks/useFontSize";
import { getProjectsData } from "@/data/projects";
import { FolderGit2, ExternalLink } from "lucide-react";
import Image from "next/image";

export const ProjectsNode: React.FC = () => {
  const { t } = useLanguage();
  const { getFontSizeClass } = useFontSize();
  const projects = getProjectsData(t);

  return (
    <section className="flex flex-col h-full gap-4 p-1">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
          <FolderGit2 className="w-4 h-4" />
          <h2>Featured Projects Gallery</h2>
        </div>
        <span className="text-xs text-slate-500 dark:text-zinc-500 font-mono">
          {projects.length} Showcases
        </span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-1 custom-scrollbar">
        {projects.map((proj) => (
          <article
            key={proj.id}
            className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-blue-500/50 hover:bg-blue-500/[0.03] transition-all flex flex-col justify-between gap-3 group"
          >
            <div className="space-y-2">
              {proj.image && (
                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-zinc-900">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-zinc-950/80 via-transparent to-transparent opacity-60" />
                </div>
              )}

              <div className="flex items-start justify-between gap-2">
                <h3
                  className={getFontSizeClass(
                    "text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors",
                  )}
                >
                  {proj.title}
                </h3>
                {proj.liveDemo && (
                  <a
                    href={proj.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded bg-slate-200 dark:bg-white/5 hover:bg-blue-600 text-slate-700 dark:text-zinc-300 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <p
                className={getFontSizeClass(
                  "text-xs text-slate-700 dark:text-zinc-300 line-clamp-2 font-light",
                )}
              >
                {proj.description}
              </p>
            </div>

            {proj.technologies && (
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200 dark:border-white/5">
                {proj.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-zinc-400 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
