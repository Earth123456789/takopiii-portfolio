import { useContext } from "react";
import { FontSizeContext } from "@/contexts/FontSizeContext";
import { FontSizeContextType } from "@/types/context";

export const useFontSize = (): FontSizeContextType => {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error("useFontSize must be used within a FontSizeProvider");
  }
  return context;
};
