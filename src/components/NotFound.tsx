"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import Footer from "./Footer";
import { ArrowLeft, ArrowRight } from "./icons";
import { LanguageMenu } from "./LanguageSwitcher";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { container } from "./ui";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-svh flex-col">
      <header className={`${container} mt-3`}>
        <div className="flex items-center justify-between gap-2 rounded-[28px] border border-line bg-tile py-1.5 pr-1.5 pl-3 sm:pl-4">
          <Logo href="/" label={t("nav.home")} />
          <div className="flex items-center gap-0.5">
            <ThemeToggle />
            <LanguageMenu />
          </div>
        </div>
      </header>

      <main id="main" className={`${container} flex flex-1 flex-col justify-center pt-4`}>
        <div className="grid gap-4 lg:grid-cols-12">
          <div
            className="rise flex items-end rounded-[28px] bg-brand p-6 text-white sm:p-10 lg:col-span-5 lg:p-12"
            style={{ "--i": 0 } as CSSProperties}
          >
            <p className="font-display text-[clamp(6rem,3.5rem+11vw,11rem)] leading-[0.8] font-extrabold tracking-[-0.05em]">
              404
            </p>
          </div>

          <div
            className="tile rise flex flex-col justify-between gap-10 p-6 sm:p-10 lg:col-span-7 lg:p-12"
            style={{ "--i": 1 } as CSSProperties}
          >
            <div>
              <h1 className="font-display text-[clamp(2.125rem,1.5rem+2.4vw,3.5rem)] leading-[1.02] font-bold tracking-[-0.03em] text-balance">
                {t("notFound.title")}
              </h1>
              <p className="mt-4 max-w-[42ch] text-lg text-muted">{t("notFound.text")}</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-ink transition hover:brightness-110 active:scale-[0.98]"
              >
                <ArrowLeft className="size-4" />
                {t("notFound.home")}
              </Link>
              <Link
                href="/#projects"
                className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-chip px-6 font-medium transition-colors hover:bg-line"
              >
                {t("hero.viewProjects")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
