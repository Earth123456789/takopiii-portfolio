"use client";

import React from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white/5 backdrop-blur-sm border-t border-foreground/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-foreground text-xl font-bold">
              {t("footer.name") as string}
            </h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              {t("footer.role") as string}
            </p>
            <p className="text-foreground/70 text-sm leading-relaxed">
              {t("footer.description") as string}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-foreground text-lg font-semibold">
              {t("footer.quickLinks") as string}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-foreground/70 hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {t("navigation.about") as string}
                </a>
              </li>
              <li>
                <a
                  href="#educate"
                  className="text-foreground/70 hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {t("navigation.education") as string}
                </a>
              </li>
              <li>
                <a
                  href="#stack"
                  className="text-foreground/70 hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {t("navigation.techStack") as string}
                </a>
              </li>
              <li>
                <a
                  href="#project"
                  className="text-foreground/70 hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {t("navigation.projects") as string}
                </a>
              </li>
              <li>
                <a
                  href="#certificates"
                  className="text-foreground/70 hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {t("navigation.certificates") as string}
                </a>
              </li>
              <li>
                <a
                  href="#activity"
                  className="text-foreground/70 hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {t("navigation.activity") as string}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-foreground text-lg font-semibold">
              {t("footer.contact") as string}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-foreground/70" />
                <a
                  href="mailto:vipat.choknantawong@gmail.com"
                  className="text-foreground/70 hover:text-foreground transition-colors duration-200 text-sm"
                >
                  vipat.choknantawong@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-foreground/70" />
                <span className="text-foreground/70 text-sm">
                  +66 064 930 4461
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-foreground text-lg font-semibold">
              {t("footer.followMe") as string}
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/MyNameTakopiii"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-foreground/10 hover:bg-foreground/20 rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={20} className="text-foreground" />
              </a>
              <a
                href="https://linkedin.com/in/vipat-choknantawong"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-foreground/10 hover:bg-foreground/20 rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="text-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-foreground/10 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-foreground/60 text-sm">
              {t("footer.copyright") as string}
            </p>
            <p className="text-foreground/60 text-sm">
              {t("footer.madeWith") as string}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
