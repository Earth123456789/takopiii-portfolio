'use client'

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

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
  issuer
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 max-w-4xl max-h-[90vh] w-full bg-gradient-to-br from-[#0f172a] to-[#334155] rounded-2xl border border-white/20 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
          <div className="flex-1 min-w-0">
            <h3 className="text-white text-lg sm:text-xl font-semibold truncate">
              {title}
            </h3>
            <p className="text-[#ff9cb0] text-sm sm:text-base truncate">
              {issuer}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 flex-shrink-0"
            aria-label="Close modal"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Image Container */}
        <div className="p-4 sm:p-6">
          <div className="relative w-full h-auto max-h-[60vh] overflow-hidden rounded-lg">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={800}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-white/10">
          <div className="flex items-center justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-[#A91D3A] to-[#C72C41] text-white rounded-lg hover:from-[#C72C41] hover:to-[#E94560] transition-all duration-200 font-medium"
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
