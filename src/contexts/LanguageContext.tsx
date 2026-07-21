"use client";

import React, { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  Language,
  LanguageContextType,
  LanguageProviderProps,
} from "@/types/context";

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useLocalStorage<Language>("language", "en");
  const [translations, setTranslations] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/locales/${language}/common.json`);
        if (!response.ok) throw new Error("Failed to load translations");
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error("Error loading translations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  const t = React.useCallback(
    (key: string): string | string[] => {
      if (loading || !translations) return key;

      const keys = key.split(".");
      let value: unknown = translations;

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }

      return (value as string | string[]) || key;
    },
    [loading, translations],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {/* 
         We show a loading screen during translation fetch, 
         but we ensure it is WRAPPED in the provider so that children (if any were rendered) 
         or just the app state remains consistent.
      */}
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </LanguageContext.Provider>
  );
};
