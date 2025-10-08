'use client'

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFontSize } from '@/contexts/FontSizeContext';
import { Calendar, User, Briefcase, GraduationCap, Users, Code } from 'lucide-react';

interface ActivityItem {
  title: string;
  period: string;
  role: string;
  description: string;
  type: 'academic' | 'event' | 'work';
}

interface ActivityProps {
  activityData: ActivityItem[];
}

const Activity: React.FC<ActivityProps> = ({ activityData }) => {
  const { t } = useLanguage();
  const { getFontSizeClass } = useFontSize();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic':
        return <GraduationCap size={20} className="text-blue-400" />;
      case 'event':
        return <Users size={20} className="text-green-400" />;
      case 'work':
        return <Briefcase size={20} className="text-purple-400" />;
      default:
        return <Code size={20} className="text-gray-400" />;
    }
  };


  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'academic':
        return t('activity.types.academic');
      case 'event':
        return t('activity.types.event');
      case 'work':
        return t('activity.types.work');
      default:
        return type;
    }
  };

  return (
    <section className="flex flex-col py-12 sm:py-16 lg:py-20 w-full px-4 sm:px-6 lg:px-8" id="activity">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center lg:text-left mb-12 sm:mb-16">
          <h2 className={getFontSizeClass("text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mb-4 sm:mb-6")}>
            {t('activity.title')}
          </h2>
          <p className={getFontSizeClass("text-lg sm:text-xl text-white/80 leading-relaxed")}>
            {t('activity.description')}
          </p>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {activityData.map((activity, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#A91D3A]/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Type Badge */}
              <div className="flex items-center gap-2 mb-4">
                {getTypeIcon(activity.type)}
                <span className={getFontSizeClass("text-sm font-medium text-white/70")}>
                  {getTypeLabel(activity.type)}
                </span>
              </div>

              {/* Title */}
              <h3 className={getFontSizeClass("text-white text-lg sm:text-xl font-bold mb-3 group-hover:text-[#ff9cb0] transition-colors duration-300 leading-tight")}>
                {activity.title}
              </h3>

              {/* Role */}
              <div className="flex items-center gap-2 mb-3">
                <User size={16} className="text-white/60" />
                <span className={getFontSizeClass("text-white/80 font-medium text-sm sm:text-base")}>
                  {activity.role}
                </span>
              </div>

              {/* Period */}
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-white/60" />
                <span className={getFontSizeClass("text-white/70 text-sm sm:text-base")}>
                  {activity.period}
                </span>
              </div>

              {/* Description */}
              <p className={getFontSizeClass("text-white/70 text-sm sm:text-base leading-relaxed")}>
                {activity.description}
              </p>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#A91D3A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activity;
