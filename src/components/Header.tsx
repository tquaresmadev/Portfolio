"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { useActiveSection } from "@/hooks/useActiveSection";
import ThemeToggle from "./ThemeToggle";
import { LanguageMenu } from "./LanguageSwitcher";
import Logo from "./Logo";
import { Folder, Mail, User } from "./icons";
import { container } from "./ui";

const NAV = [
  { id: "projects", key: "nav.projects", Icon: Folder },
  { id: "about", key: "nav.about", Icon: User },
  { id: "contact", key: "nav.contact", Icon: Mail },
] as const;

const SECTION_IDS = NAV.map((item) => item.id);

export default function Header() {
  const { t } = useTranslation();
  const active = useActiveSection(SECTION_IDS);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-full focus:bg-invert focus:px-4 focus:py-2.5 focus:text-invert-ink"
      >
        {t("nav.skip")}
      </a>

      <header className={`${container} sticky top-3 z-50 mt-3`}>
        <div className="flex items-center justify-between gap-1 rounded-[28px] border border-line bg-tile/80 py-1.5 pr-1.5 pl-3 shadow-[0_12px_32px_-20px_rgb(0_0_0/0.35)] backdrop-blur-md sm:gap-2 sm:pl-4">
          <Logo href="#top" label={t("nav.home")} />

          <nav aria-label={t("nav.main")}>
            <ul className="flex items-center gap-0.5">
              {NAV.map(({ id, key, Icon }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "location" : undefined}
                    className={`inline-flex min-h-11 min-w-10 items-center justify-center rounded-full px-2.5 text-[15px] font-medium transition-colors min-[360px]:min-w-11 min-[360px]:px-3 md:px-4 ${
                      active === id ? "bg-chip text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    <Icon className="size-[18px] md:hidden" strokeWidth={1.75} />
                    <span className="max-md:sr-only">{t(key)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-0.5">
            <ThemeToggle />
            <LanguageMenu />
            <a
              href="#contact"
              className="ml-1 hidden min-h-11 items-center rounded-full bg-accent px-[18px] text-[15px] font-semibold text-accent-ink transition hover:brightness-110 active:scale-[0.98] md:inline-flex"
            >
              {t("nav.cta")}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
