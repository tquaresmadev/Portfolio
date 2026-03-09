"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import { LOCALES, type Locale } from "@/i18n/types";

function Flag({ code, size = 20 }: { code: Locale; size?: number }) {
  const flags: Record<Locale, React.ReactNode> = {
    en: (
      <svg width={size} height={size} viewBox="0 0 36 36">
        <rect width="36" height="36" rx="4" fill="#00247D" />
        <path d="M0 0L36 36M36 0L0 36" stroke="#fff" strokeWidth="6" />
        <path d="M0 0L36 36M36 0L0 36" stroke="#CF142B" strokeWidth="2" />
        <path d="M18 0v36M0 18h36" stroke="#fff" strokeWidth="10" />
        <path d="M18 0v36M0 18h36" stroke="#CF142B" strokeWidth="6" />
      </svg>
    ),
    pt: (
      <svg width={size} height={size} viewBox="0 0 36 36">
        <rect width="36" height="36" rx="4" fill="#FF0000" />
        <rect width="14" height="36" rx="4" fill="#006600" />
        <circle cx="14" cy="18" r="5" fill="#FFCC00" />
        <circle cx="14" cy="18" r="3.5" fill="#FF0000" />
        <circle cx="14" cy="18" r="2.5" fill="#fff" />
      </svg>
    ),
    fr: (
      <svg width={size} height={size} viewBox="0 0 36 36">
        <rect width="36" height="36" rx="4" fill="#EF4135" />
        <rect width="12" height="36" rx="4" fill="#002395" />
        <rect x="12" width="12" height="36" fill="#fff" />
      </svg>
    ),
    es: (
      <svg width={size} height={size} viewBox="0 0 36 36">
        <rect width="36" height="36" rx="4" fill="#AA151B" />
        <rect y="9" width="36" height="18" fill="#F1BF00" />
      </svg>
    ),
  };
  return <span className="inline-flex shrink-0">{flags[code]}</span>;
}

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-bg-card/90 px-2.5 py-1.5 text-xs font-medium text-fg backdrop-blur-sm transition-colors hover:border-accent/40"
      >
        <Flag code={current.code} />
        <span>{current.label}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-fg-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-32 overflow-hidden rounded-lg border border-border bg-bg-card shadow-lg shadow-black/30 animate-hire-page-in">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLocale(l.code); setOpen(false); }}
              className={`flex w-full items-center gap-2.5 px-3 py-2 text-xs transition-colors hover:bg-bg-subtle ${
                l.code === locale ? "bg-bg-subtle text-accent" : "text-fg"
              }`}
            >
              <Flag code={l.code} />
              <span className="font-medium">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
