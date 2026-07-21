"use client";

import React, { createContext, useContext, useState } from "react";
import { SlideContextType, SlideProviderProps } from "@/types/context";

const SlideContext = createContext<SlideContextType | undefined>(undefined);

export const SlideProvider: React.FC<SlideProviderProps> = ({ children }) => {
  const [activeSlide, setActiveSlideState] = useState<number>(0);
  const totalSlides = 6; // 0: About, 1: Education/Experience, 2: Tech Stack, 3: Projects, 4: Certificates, 5: Activities

  const setActiveSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setActiveSlideState(index);
    }
  };

  const nextSlide = () => {
    setActiveSlideState((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setActiveSlideState((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <SlideContext.Provider
      value={{ activeSlide, setActiveSlide, nextSlide, prevSlide, totalSlides }}
    >
      {children}
    </SlideContext.Provider>
  );
};

export const useSlide = () => {
  const context = useContext(SlideContext);
  if (context === undefined) {
    throw new Error("useSlide must be used within a SlideProvider");
  }
  return context;
};
