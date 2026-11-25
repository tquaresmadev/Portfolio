"use client";

import { createContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { LOCALES, type Locale } from "./types";
import en from "./locales/en.json";
import pt from "./locales/pt.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";

const dictionaries: Record<Locale, Record<string, string>> = { en, pt, fr, es };

const STORAGE_KEY = "locale";
const listeners = new Set<() => void>();
let chosen: Locale | null = null;

function isLocale(value: string | null): value is Locale {
  return LOCALES.some((l) => l.code === value);
}

function readLocale(): Locale {
  if (chosen) return chosen;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {}
  return "en";
}

function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    chosen = null;
    listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function setLocale(locale: Locale) {
  chosen = locale;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {}
  listeners.forEach((listener) => listener());
}

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
  const locale = useSyncExternalStore(subscribe, readLocale, () => "en" as Locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, translations: dictionaries[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}
