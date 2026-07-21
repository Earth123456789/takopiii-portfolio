import React from "react";
import { useFontSize } from "@/hooks/useFontSize";
import { Mail, Github, Linkedin, Send, MessageSquare } from "lucide-react";

export const ContactNode: React.FC = () => {
  const { getFontSizeClass } = useFontSize();

  return (
    <section className="flex flex-col h-full justify-between gap-4 p-1">
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
          <MessageSquare className="w-4 h-4" />
          <span>Get In Touch</span>
        </div>

        <h2
          className={getFontSizeClass(
            "text-2xl font-bold text-slate-900 dark:text-white tracking-tight",
          )}
        >
          {"Let's Build Something Great Together"}
        </h2>

        <p
          className={getFontSizeClass(
            "text-xs text-slate-700 dark:text-zinc-300 leading-relaxed font-light",
          )}
        >
          Whether you have a question, project proposal, or just want to connect
          — feel free to reach out anytime!
        </p>
      </header>

      {/* Primary Call to Action Button */}
      <div className="p-4 rounded-xl bg-blue-500/10 dark:bg-gradient-to-r dark:from-blue-600/20 dark:via-indigo-600/20 dark:to-sky-600/20 border border-blue-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-mono text-slate-800 dark:text-zinc-200">
              Direct Email
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
            Response &lt; 24h
          </span>
        </div>

        <a
          href="mailto:contact@vipat.dev"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/30 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send Message</span>
        </a>
      </div>

      {/* Social Links */}
      <address className="grid grid-cols-2 gap-2 not-italic">
        <a
          href="https://github.com/MyNameTakopiii"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-lg bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:border-slate-400 dark:hover:border-white/20 transition-all flex items-center gap-2 text-xs text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white"
        >
          <Github className="w-4 h-4 text-slate-600 dark:text-zinc-400" />
          <span>GitHub Profile</span>
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-lg bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:border-slate-400 dark:hover:border-white/20 transition-all flex items-center gap-2 text-xs text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white"
        >
          <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>LinkedIn</span>
        </a>
      </address>
    </section>
  );
};
