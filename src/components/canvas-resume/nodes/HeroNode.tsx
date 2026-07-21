import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useFontSize } from "@/hooks/useFontSize";
import RotatingText from "@/components/RotatingText";
import { Sparkles, MapPin, Code2, Rocket } from "lucide-react";

export const HeroNode: React.FC = () => {
  const { t } = useLanguage();
  const { getFontSizeClass } = useFontSize();

  return (
    <section className="flex flex-col h-full justify-between gap-6 p-2">
      {/* Top Tag & Status */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span>Available for Freelance / Full-Time</span>
        </div>
        <address className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 font-mono not-italic">
          <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
          <span>Bangkok, Thailand</span>
        </address>
      </div>

      {/* Main Title Banner */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1
            className={getFontSizeClass(
              "text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight",
            )}
          >
            {t("hero.im") || "Hi, I'm"}
          </h1>
          <RotatingText
            texts={[
              (t("hero.frontendDeveloper") as string) || "Frontend Developer",
              (t("hero.backendDeveloper") as string) || "Backend Developer",
              (t("hero.fullStackDeveloper") as string) ||
                "Full Stack Developer",
              (t("hero.freelancer") as string) || "Freelancer",
            ]}
            mainClassName={getFontSizeClass(
              "px-3 py-1 bg-blue-600 dark:bg-blue-600 text-white text-3xl font-bold rounded-xl shadow-lg shadow-blue-500/20",
            )}
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />
        </div>

        <p
          className={getFontSizeClass(
            "text-slate-700 dark:text-zinc-300 text-base leading-relaxed font-light max-w-xl",
          )}
        >
          {t("hero.greeting") ||
            "Crafting high-performance digital experiences, scalable full-stack web applications, and interactive spatial visual interfaces with modern web engines."}
        </p>
      </header>

      {/* Highlights grid */}
      <footer className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
        <article className="p-3 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex flex-col gap-1">
          <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span
            className={getFontSizeClass(
              "text-lg font-bold text-slate-900 dark:text-white",
            )}
          >
            3+ Years
          </span>
          <span className="text-[11px] text-slate-500 dark:text-zinc-400">
            Development Exp.
          </span>
        </article>
        <article className="p-3 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex flex-col gap-1">
          <Rocket className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span
            className={getFontSizeClass(
              "text-lg font-bold text-slate-900 dark:text-white",
            )}
          >
            10+ Projects
          </span>
          <span className="text-[11px] text-slate-500 dark:text-zinc-400">
            Deployed & Live
          </span>
        </article>
        <article className="p-3 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex flex-col gap-1">
          <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span
            className={getFontSizeClass(
              "text-lg font-bold text-slate-900 dark:text-white",
            )}
          >
            Full Stack
          </span>
          <span className="text-[11px] text-slate-500 dark:text-zinc-400">
            Next.js & Node.js
          </span>
        </article>
      </footer>
    </section>
  );
};
