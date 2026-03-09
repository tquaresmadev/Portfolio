"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/i18n/context";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
