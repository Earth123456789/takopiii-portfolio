'use client'

import React from 'react';
import EducationStepper from './EducationStepper';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFontSize } from '@/contexts/FontSizeContext';

interface EducationItem {
  title: string;
  period: string;
  detail: string;
  image: string;
  status?: string;
}

interface EducationProps {
  educationData: EducationItem[];
}

const Education: React.FC<EducationProps> = ({ educationData }) => {
  const { t } = useLanguage();
  const { getFontSizeClass } = useFontSize();

  return (
    <section className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 w-full px-4 sm:px-6 lg:px-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000" id="educate">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text content */}
          <div className="text-center lg:text-left lg:flex-shrink-0 lg:max-w-md xl:max-w-lg animate-in fade-in-0 slide-in-from-left-4 duration-700 delay-200">
            <h2 className={getFontSizeClass("text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mb-4 sm:mb-6")}>
              {t('education.title')}
            </h2>
            <p className={getFontSizeClass("text-lg sm:text-xl text-white/80 leading-relaxed")}>
              {t('education.description')}
            </p>
          </div>

          {/* Education Timeline */}
          <div className="relative w-full lg:flex-1 min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
            <div className="w-full max-w-2xl">
              <EducationStepper items={educationData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
