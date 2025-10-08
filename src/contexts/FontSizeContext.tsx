'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'small' | 'medium' | 'large';

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  getFontSizeClass: (baseClass: string) => string;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};

interface FontSizeProviderProps {
  children: React.ReactNode;
}

export const FontSizeProvider: React.FC<FontSizeProviderProps> = ({ children }) => {
  const [fontSize, setFontSize] = useState<FontSize>('medium');

  useEffect(() => {
    // Load font size from localStorage on mount
    const savedFontSize = localStorage.getItem('fontSize') as FontSize;
    if (savedFontSize && ['small', 'medium', 'large'].includes(savedFontSize)) {
      setFontSize(savedFontSize);
    }
  }, []);

  const handleSetFontSize = (size: FontSize) => {
    setFontSize(size);
    localStorage.setItem('fontSize', size);
  };

  const getFontSizeClass = (baseClass: string) => {
    const sizeMap = {
      small: baseClass.replace(/text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)/g, (match) => {
        const sizeMap: { [key: string]: string } = {
          'text-xs': 'text-xs',
          'text-sm': 'text-xs',
          'text-base': 'text-sm',
          'text-lg': 'text-base',
          'text-xl': 'text-lg',
          'text-2xl': 'text-xl',
          'text-3xl': 'text-2xl',
          'text-4xl': 'text-3xl',
          'text-5xl': 'text-4xl',
          'text-6xl': 'text-5xl',
        };
        return sizeMap[match] || match;
      }),
      medium: baseClass,
      large: baseClass.replace(/text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)/g, (match) => {
        const sizeMap: { [key: string]: string } = {
          'text-xs': 'text-sm',
          'text-sm': 'text-base',
          'text-base': 'text-lg',
          'text-lg': 'text-xl',
          'text-xl': 'text-2xl',
          'text-2xl': 'text-3xl',
          'text-3xl': 'text-4xl',
          'text-4xl': 'text-5xl',
          'text-5xl': 'text-6xl',
          'text-6xl': 'text-7xl',
        };
        return sizeMap[match] || match;
      }),
    };
    return sizeMap[fontSize];
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize: handleSetFontSize, getFontSizeClass }}>
      {children}
    </FontSizeContext.Provider>
  );
};
