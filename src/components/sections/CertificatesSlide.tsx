"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { useFontSize } from "@/hooks/useFontSize";
import { certificateData } from "@/data/certificates";
import { Certificate } from "@/types/ui";
import { Award, ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CertificatesSlideProps {
  onOpenModal: (cert: Certificate) => void;
  showAll?: boolean;
}

export const CertificatesSlide: React.FC<CertificatesSlideProps> = ({
  onOpenModal,
  showAll = false,
}) => {
  const { t } = useLanguage();
  const { getFontSizeClass } = useFontSize();
  const [isExpanded] = useState<boolean>(showAll);

  const displayedCertificates = isExpanded
    ? certificateData
    : certificateData.filter((c) => c.featured !== false);

  return (
    <section
      className="certificates-slide relative flex flex-col items-center justify-start w-full min-h-screen pt-20 sm:pt-24 lg:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-y-auto"
      id="certificates"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="pointer-events-none absolute top-12 left-1/3 -translate-x-1/2 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl opacity-40" />

      <div className="relative z-10 w-full max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 space-y-3">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-md">
            <Award className="w-4 h-4 animate-pulse" />
            <span>CERTIFICATIONS &amp; ACHIEVEMENTS</span>
          </div>

          <h2
            className={cn(
              getFontSizeClass(
                "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight",
              ),
              "bg-gradient-to-r from-foreground via-foreground to-foreground/70 dark:from-white dark:via-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent drop-shadow-sm",
            )}
          >
            {t("certificates.title") as string}
          </h2>

          <p
            className={getFontSizeClass(
              "text-base sm:text-lg text-foreground/70 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed",
            )}
          >
            {t("certificates.description") as string}
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCertificates.map((cert, index) => (
            <article
              key={index}
              className="group relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-white/10 p-5 sm:p-6 hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden flex flex-col justify-between"
            >
              {/* Top Sheen Line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 dark:via-white/20 to-transparent" />

              <div>
                {/* Certificate Image Frame */}
                <div
                  className="relative mb-4 overflow-hidden rounded-xl cursor-pointer border border-slate-200/80 dark:border-white/10 shadow-inner group-hover:scale-[1.02] transition-transform duration-300 bg-black/5 dark:bg-white/5"
                  onClick={() => onOpenModal(cert)}
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/30">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Click to view full size
                    </div>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="space-y-1.5">
                  <h3
                    className={getFontSizeClass(
                      "text-slate-900 dark:text-white text-base sm:text-lg font-bold leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300",
                    )}
                  >
                    {cert.title}
                  </h3>
                  <p className="text-amber-600 dark:text-amber-400 font-semibold text-xs sm:text-sm">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              {/* Inset Border Highlight */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-500/20 transition-colors duration-300 pointer-events-none" />
            </article>
          ))}
        </div>

        {/* See All Route Link */}
        {!showAll && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/certificates"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-semibold text-foreground hover:bg-black/10 dark:hover:bg-white/15 transition-all shadow-md cursor-pointer"
            >
              <span>
                {t("common.seeAll") as string} ({certificateData.length})
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
