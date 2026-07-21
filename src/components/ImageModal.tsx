"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  title: string;
  issuer: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
  issuer,
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 max-w-4xl max-h-[90vh] w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-slate-900 dark:text-white text-lg sm:text-xl font-bold truncate tracking-tight">
              {title}
            </h3>
            <p className="text-amber-600 dark:text-amber-400 font-semibold text-sm sm:text-base truncate">
              {issuer}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-200/60 hover:bg-slate-300/60 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white transition-all duration-200 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image Container */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto flex items-center justify-center bg-slate-100/50 dark:bg-black/30">
          <div className="relative w-full h-auto max-h-[62vh] rounded-xl overflow-hidden border border-slate-200/60 dark:border-white/10 shadow-inner bg-white dark:bg-black/20 flex items-center justify-center">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1000}
              height={750}
              className="w-full h-auto max-h-[60vh] object-contain"
              priority
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
          <div className="flex items-center justify-center">
            <button
              onClick={onClose}
              className="px-8 py-2.5 bg-gradient-to-r from-rose-500 to-red-600 dark:from-[#A91D3A] dark:to-[#E94560] text-white rounded-xl hover:opacity-90 transition-all duration-200 font-semibold shadow-lg shadow-rose-500/25 dark:shadow-red-900/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
