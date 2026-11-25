"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import { LOCALES } from "@/i18n/types";
import { Check, ChevronDown } from "./icons";

export function LanguageMenu() {
  const { t, locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 items-center gap-1 rounded-full px-2 text-sm font-semibold transition-colors hover:bg-chip sm:px-2.5"
      >
        <span className="sr-only">{t("lang.label")}: </span>
        {current.label}
        <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          id={menuId}
          className="absolute right-0 mt-2 w-48 rounded-2xl border border-line bg-tile p-1.5 shadow-[0_16px_40px_-16px_rgb(0_0_0/0.35)]"
        >
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                lang={l.code}
                aria-current={l.code === locale ? "true" : undefined}
                onClick={() => {
                  setLocale(l.code);
                  setOpen(false);
                }}
                className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3 text-left text-[15px] transition-colors hover:bg-chip ${
                  l.code === locale ? "font-semibold" : "text-muted"
                }`}
              >
                {l.name}
                {l.code === locale && <Check className="size-4 text-accent" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function LanguagePills() {
  const { t, locale, setLocale } = useTranslation();

  return (
    <div role="group" aria-label={t("lang.label")} className="flex gap-0.5 rounded-full border border-line bg-tile p-0.5">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          title={l.name}
          aria-pressed={l.code === locale}
          onClick={() => setLocale(l.code)}
          className={`min-h-11 min-w-11 rounded-full px-2 text-[13px] font-semibold transition-colors ${
            l.code === locale ? "bg-invert text-invert-ink" : "text-muted hover:text-fg"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
