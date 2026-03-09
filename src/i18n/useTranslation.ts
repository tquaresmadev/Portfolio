"use client";

import { useContext } from "react";
import { LanguageContext } from "./context";

export function useTranslation() {
  const { locale, setLocale, translations } = useContext(LanguageContext);

  const t = (key: string, vars?: Record<string, string | number>) => {
    let str = translations[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replace(`{${k}}`, String(v));
      }
    }
    return str;
  };

  return { t, locale, setLocale };
}
