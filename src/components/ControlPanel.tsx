'use client'

import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import FontSizeSwitcher from './FontSizeSwitcher';

const ControlPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-gradient-to-r from-[#A91D3A] to-[#C72C41] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        aria-label="Settings"
      >
        <Settings size={20} />
      </button>

      {/* Control Panel */}
      {isOpen && (
        <div className="absolute top-16 right-0 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-2xl min-w-[200px] animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <div className="space-y-4">
            {/* Language Switcher */}
            <div>
              <h3 className="text-white text-sm font-semibold mb-2">Language</h3>
              <LanguageSwitcher />
            </div>

            {/* Font Size Switcher */}
            <div>
              <h3 className="text-white text-sm font-semibold mb-2">Font Size</h3>
              <FontSizeSwitcher />
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ControlPanel;
