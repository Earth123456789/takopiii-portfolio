import React from "react";
import { useFontSize } from "@/hooks/useFontSize";
import { Cpu, Layers, Database, Wrench } from "lucide-react";
import { skillCategories, SkillCategory } from "@/data/skills";

const getCategoryIcon = (categoryKey: SkillCategory["categoryKey"]) => {
  switch (categoryKey) {
    case "frontend":
      return <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    case "backend":
      return (
        <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      );
    case "tools":
      return <Wrench className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    default:
      return null;
  }
};

export const SkillsNode: React.FC = () => {
  const { getFontSizeClass } = useFontSize();

  return (
    <section className="flex flex-col h-full justify-between gap-4 p-1">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
          <Cpu className="w-4 h-4" />
          <h2>Core Technologies</h2>
        </div>
        <span className="text-xs text-slate-500 dark:text-zinc-500 font-mono">
          Modern Stack
        </span>
      </header>

      <div className="space-y-4">
        {skillCategories.map((cat, idx) => (
          <article key={idx} className="space-y-2">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-300">
              {getCategoryIcon(cat.categoryKey)}
              <span>{cat.title}</span>
            </h3>
            <ul className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <li
                  key={skill}
                  className={getFontSizeClass(
                    "px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-zinc-200 hover:border-blue-500 hover:bg-blue-500/10 transition-all cursor-default list-none",
                  )}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <footer className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-700 dark:text-blue-300 flex items-center justify-between">
        <span>Continuous learner & explorer of new design systems</span>
        <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
      </footer>
    </section>
  );
};
