'use client'

import React from 'react';
import { useFontSize } from '@/contexts/FontSizeContext';

const FontSizeSwitcher: React.FC = () => {
  const { fontSize, setFontSize } = useFontSize();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setFontSize('small')}
        className={`px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
          fontSize === 'small'
            ? 'bg-[#A91D3A] text-white'
            : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
        }`}
        title="Small Font"
      >
        <span className="text-xs font-bold">A⁻</span>
      </button>
      <button
        onClick={() => setFontSize('medium')}
        className={`px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
          fontSize === 'medium'
            ? 'bg-[#A91D3A] text-white'
            : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
        }`}
        title="Medium Font"
      >
        <span className="text-base font-bold">A</span>
      </button>
      <button
        onClick={() => setFontSize('large')}
        className={`px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
          fontSize === 'large'
            ? 'bg-[#A91D3A] text-white'
            : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
        }`}
        title="Large Font"
      >
        <span className="text-lg font-bold">A⁺</span>
      </button>
    </div>
  );
};

export default FontSizeSwitcher;
