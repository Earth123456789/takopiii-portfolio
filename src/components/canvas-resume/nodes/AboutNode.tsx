import React from "react";
import { useFontSize } from "@/hooks/useFontSize";
import { User, Target, Heart, Terminal } from "lucide-react";

export const AboutNode: React.FC = () => {
  const { getFontSizeClass } = useFontSize();

  return (
    <section className="flex flex-col h-full justify-between gap-4 p-1">
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
          <User className="w-4 h-4" />
          <span>Personal Philosophy</span>
        </div>

        <h2
          className={getFontSizeClass(
            "text-xl font-bold text-slate-900 dark:text-white leading-snug",
          )}
        >
          Building Software with Spatial Design & Technical Rigor
        </h2>

        <p
          className={getFontSizeClass(
            "text-sm text-slate-700 dark:text-zinc-300 leading-relaxed",
          )}
        >
          Passionate full-stack developer focusing on modern web engineering,
          clean architectural patterns, responsive UI systems, and interactive
          canvas tools.
        </p>
      </header>

      <div className="space-y-2">
        <article className="p-3 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-start gap-3">
          <Target className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Mission
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400">
              To bridge complex engineering logic with intuitive visual
              interfaces.
            </p>
          </div>
        </article>

        <article className="p-3 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-start gap-3">
          <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Passions
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400">
              Interactive Canvas UI, Next.js App Router, Tailwind CSS, Spatial
              Systems.
            </p>
          </div>
        </article>
      </div>

      <footer className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>status: active_learning</span>
        </div>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
          100%
        </span>
      </footer>
    </section>
  );
};
