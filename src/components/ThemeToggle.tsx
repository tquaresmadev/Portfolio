"use client";

import { useSyncExternalStore } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import { getTheme, setTheme, subscribeTheme } from "@/lib/theme";
import { Moon, Sun } from "./icons";

export default function ThemeToggle() {
  const { t } = useTranslation();
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => null);

  return (
    <button
      type="button"
      aria-label={t("theme.toggle")}
      aria-pressed={theme === null ? undefined : theme === "dark"}
      onClick={() => setTheme(getTheme() === "dark" ? "light" : "dark")}
      className="inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-chip"
    >
      <Moon className="size-[18px] dark:hidden" strokeWidth={1.75} />
      <Sun className="hidden size-[18px] dark:block" strokeWidth={1.75} />
    </button>
  );
}
