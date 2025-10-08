'use client'

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const changeLanguage = (locale: 'th' | 'en') => {
    setLanguage(locale);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('th')}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
          language === 'th'
            ? 'bg-[#A91D3A] text-white'
            : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
        }`}
      >
        ไทย
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
          language === 'en'
            ? 'bg-[#A91D3A] text-white'
            : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
