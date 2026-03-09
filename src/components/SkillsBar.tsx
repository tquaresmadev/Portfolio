"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { skillCategories } from "@/data/skills";
import { useTranslation } from "@/i18n/useTranslation";
import CodeBackground from "./CodeBackground";

export default function SkillsBar() {
  const { t } = useTranslation();
  const [openCat, setOpenCat] = useState<string | null>(null);

  return (
    <section className="relative z-20 overflow-visible">
      <CodeBackground />

      <div className="relative mx-auto flex max-w-5xl items-center gap-8 px-8 py-8">
        {/* Profile image */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/20 ring-offset-4 ring-offset-bg">
          <Image
            src="/profile.jpg"
            alt="Tiago Quaresma"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Name + skills */}
        <div className="flex flex-1 flex-col gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-fg">
              Tiago Quaresma
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-sm text-fg-muted">
                {t("skills.subtitle")}
              </p>
              <a
                href="https://github.com/j1mp-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted transition-colors hover:text-fg"
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/tiago-quaresma-0ab4ba168/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted transition-colors hover:text-[#0A66C2]"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <Link
                href="/hire"
                className="group relative ml-2 inline-flex items-center gap-1.5 overflow-hidden rounded-full px-4 py-1 text-xs font-semibold tracking-wide text-[#1a1000] shadow-[0_0_16px_rgba(251,191,36,0.3)] transition-all duration-300 hover:shadow-[0_0_24px_rgba(251,191,36,0.5)] hover:scale-105"
                style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24, #f59e0b)" }}
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">{t("skills.hireMe")}</span>
              </Link>
            </div>
          </div>

          <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2">
            {skillCategories.map((cat) => {
              const isOpen = openCat === cat.translationKey;
              return (
                <button
                  key={cat.translationKey}
                  onClick={() => setOpenCat(isOpen ? null : cat.translationKey)}
                  className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur-sm transition-all cursor-pointer ${isOpen ? "border-accent/40 text-fg bg-accent-soft" : "border-border/60 text-fg-muted/60 bg-bg/80 hover:border-accent/40 hover:text-fg"}`}
                >
                  {t(cat.translationKey)}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                  </svg>
                </button>
              );
            })}

            {openCat && (
              <div className="absolute left-0 top-full z-20 mt-2 animate-fade-in rounded-lg border border-border/60 bg-bg-card/90 px-4 py-3 shadow-lg backdrop-blur-sm">
                <div className="flex flex-wrap gap-2">
                  {skillCategories
                    .find((c) => c.translationKey === openCat)
                    ?.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-bg/80 px-2.5 py-1 text-xs text-fg-muted backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-fg"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: skill.color }}
                        />
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
