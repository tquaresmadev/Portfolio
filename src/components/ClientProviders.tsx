"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/i18n/context";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <div className="fixed right-4 top-4 z-40 flex items-center gap-2">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
      {children}
    </LanguageProvider>
  );
}
