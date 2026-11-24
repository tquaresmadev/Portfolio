"use client";

import { site } from "@/data/site";
import { useTranslation } from "@/i18n/useTranslation";
import { LanguagePills } from "./LanguageSwitcher";
import { container } from "./ui";

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={`${container} pt-12 pb-10`}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-1 pt-5 text-sm text-muted sm:px-2">
        <p>
          © {YEAR} {site.name} · {t("footer.madeIn")}
        </p>
        <LanguagePills />
      </div>
    </footer>
  );
}
