"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { useFontSize } from "@/hooks/useFontSize";
import { getProjectsData } from "@/data/projects";

interface ProjectProps {
  showAll?: boolean;
}

export const Project: React.FC<ProjectProps> = ({ showAll = false }) => {
  const { t } = useLanguage();
  const { getFontSizeClass } = useFontSize();
  const [isExpanded, setIsExpanded] = useState<boolean>(showAll);

  const projects = getProjectsData(t);

  if (!projects || projects.length === 0) return null;

  const displayedProjects = isExpanded
    ? projects
    : projects.filter((p) => p.featured !== false);

  return (
    <section className="flex flex-col py-12 sm:py-16 lg:py-20 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <header className="text-center lg:text-left mb-12 sm:mb-16">
          <h2
            className={getFontSizeClass(
              "text-foreground text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4",
            )}
          >
            {t("projects.title") as string}
          </h2>
          <p
            className={getFontSizeClass(
              "text-foreground/70 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0",
            )}
          >
            {t("projects.description") as string}
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-8 lg:gap-12">
          {displayedProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col xl:flex-row gap-6 lg:gap-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="xl:w-1/2 flex-shrink-0">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  />
                </div>
              </div>

              {/* Project Content */}
              <div className="xl:w-1/2 flex flex-col justify-between">
                {/* Project Info */}
                <div className="mb-6">
                  {/* Title with Accent */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-8 bg-gradient-to-b from-primary dark:from-[#A91D3A] to-foreground/20 rounded-full" />
                    <h3
                      className={getFontSizeClass(
                        "text-foreground text-2xl sm:text-3xl font-bold",
                      )}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className={getFontSizeClass(
                      "text-foreground/80 text-base sm:text-lg leading-relaxed mb-6",
                    )}
                  >
                    {project.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {project.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-emerald-400 text-sm mt-1 flex-shrink-0">
                          ✦
                        </span>
                        <span
                          className={getFontSizeClass(
                            "text-foreground/70 text-sm sm:text-base leading-relaxed",
                          )}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-primary/10 dark:from-[#A91D3A]/10 to-foreground/10 text-foreground text-sm rounded-full border border-foreground/10 hover:border-foreground/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary dark:from-[#A91D3A] to-background text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium shadow-lg"
                  >
                    <ExternalLink size={16} />
                    {t("common.demo") as string}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* See All Route Link */}
        {!showAll && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-semibold text-foreground hover:bg-black/10 dark:hover:bg-white/15 transition-all shadow-md cursor-pointer"
            >
              <span>
                {t("common.seeAll") as string} ({projects.length})
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Project;
