'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FontSize = 'small' | 'medium' | 'large';

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  getFontSizeClass: (baseClass: string) => string;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

interface FontSizeProviderProps {
  children: ReactNode;
}

export const FontSizeProvider: React.FC<FontSizeProviderProps> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<FontSize>('medium');

  useEffect(() => {
    // Load font size from localStorage on mount
    const savedFontSize = localStorage.getItem('fontSize') as FontSize;
    if (savedFontSize && ['small', 'medium', 'large'].includes(savedFontSize)) {
      setFontSizeState(savedFontSize);
    }
  }, []);

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem('fontSize', size);
  };

  const getFontSizeClass = (baseClass: string) => {
    // Add font size modifier class
    const fontSizeModifier = `font-size-${fontSize}`;
    
    // If the class already has a text size, add the modifier
    if (baseClass.includes('text-')) {
      return `${baseClass} ${fontSizeModifier}`;
    }

    // If no text size specified, apply default with modifier
    const defaultSize = fontSize === 'small' ? 'text-sm' : fontSize === 'large' ? 'text-lg' : 'text-base';
    return `${defaultSize} ${fontSizeModifier}`;
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize, getFontSizeClass }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = (): FontSizeContextType => {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};