"use client";

import { createContext, useState, useEffect, type ReactNode } from "react";
import type { Locale } from "./types";
import en from "./locales/en.json";
import pt from "./locales/pt.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";

const dictionaries: Record<Locale, Record<string, string>> = { en, pt, fr, es };

export const LanguageContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  translations: Record<string, string>;
}>({
  locale: "en",
  setLocale: () => {},
  translations: en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && dictionaries[saved]) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
    document.documentElement.lang = l;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, translations: dictionaries[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}
