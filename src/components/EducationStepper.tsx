'use client'

import React from 'react';
import Image from 'next/image';
import { useFontSize } from '@/contexts/FontSizeContext';

interface EducationItem {
  title: string;
  period: string;
  detail: string;
  image: string;
  status?: string;
}

interface EducationStepperProps {
  items: EducationItem[];
}

const EducationStepper: React.FC<EducationStepperProps> = ({ items }) => {
  const { getFontSizeClass } = useFontSize();

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-1.5 bg-white"></div>
      
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative flex items-start gap-6 group">
            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-[#0f172a] to-[#334155] border-2 flex items-center justify-center shadow-lg transition-all duration-300 ${
                item.status === 'Success' 
                  ? 'border-green-500 group-hover:shadow-green-500/50' 
                  : item.status === 'In Progress'
                  ? 'border-yellow-500 group-hover:shadow-yellow-500/50'
                  : 'border-[#A91D3A] group-hover:shadow-[#A91D3A]/50'
              }`}>
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Pulse effect */}
              <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
                item.status === 'Success' 
                  ? 'bg-green-500' 
                  : item.status === 'In Progress'
                  ? 'bg-yellow-500'
                  : 'bg-[#A91D3A]'
              }`}></div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#A91D3A]/20">
              <div className="flex flex-col gap-2 mb-3">
                <h3 className={getFontSizeClass("text-white text-lg sm:text-xl lg:text-2xl font-semibold group-hover:text-[#ff9cb0] transition-colors duration-300 leading-tight")}>
                  {item.title}
                </h3>
                <span className={getFontSizeClass("text-white/80 font-medium text-sm sm:text-base lg:text-lg")}>
                  {item.period}
                </span>
              </div>
              <p className={getFontSizeClass("text-white/70 text-sm sm:text-base leading-relaxed")}>
                {item.detail}
              </p>
              
              {/* Status indicator */}
              {item.status && (
                <div className="flex items-center gap-2 mt-3">
                  <div className={`w-3 h-3 rounded-full shadow-lg ${
                    item.status === 'Success' 
                      ? 'bg-green-500 shadow-green-500/50' 
                      : item.status === 'In Progress'
                      ? 'bg-yellow-500 shadow-yellow-500/50'
                      : 'bg-green-500 shadow-green-500/50'
                  }`}></div>
                  <span className={getFontSizeClass(`text-sm font-medium ${
                    item.status === 'Success' || item.status === 'สำเร็จ'
                      ? 'text-green-400' 
                      : item.status === 'In Progress' || item.status === 'กำลังศึกษา'
                      ? 'text-yellow-400'
                      : 'text-green-400'
                  }`)}>
                    {item.status}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationStepper;
