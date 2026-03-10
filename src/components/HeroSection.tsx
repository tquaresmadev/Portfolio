"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "@/i18n/useTranslation";

export default function HeroSection() {
  const { t } = useTranslation();
  const fullName = "Tiago Quaresma";
  const [displayedName, setDisplayedName] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullName.length) {
        setDisplayedName(fullName.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center px-6 pt-20">
      {/* Ambient gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[120px] animate-float" />
        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-indigo-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Text content */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent animate-fade-in-up">
            {t("hero.greeting")}
          </p>

          <h1 className="mb-2 text-4xl font-bold tracking-tight text-fg sm:text-5xl lg:text-6xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            {displayedName}
            <span className={`ml-0.5 inline-block w-[3px] bg-accent ${showCursor ? "opacity-100" : "opacity-0"}`} style={{ height: "0.8em" }} />
          </h1>

          <h2 className="mb-6 text-xl font-semibold sm:text-2xl lg:text-3xl animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <span className="bg-gradient-to-r from-accent via-violet-400 to-accent bg-clip-text text-transparent">
              {t("hero.role")}
            </span>
          </h2>

          <p className="mb-8 max-w-lg text-base leading-relaxed text-fg-muted animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            {t("hero.bio")}
          </p>

          <div className="flex flex-wrap items-center gap-4 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <button
              onClick={scrollToContact}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">{t("hero.hireCta")}</span>
            </button>
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-fg transition-all hover:border-accent/40 hover:text-accent"
            >
              {t("hero.viewProjects")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Social icons */}
          <div className="mt-8 flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            <a href="https://github.com/tquaresmadev" target="_blank" rel="noopener noreferrer" className="text-fg-muted transition-colors hover:text-fg" aria-label="GitHub">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/tiago-quaresma-0ab4ba168/" target="_blank" rel="noopener noreferrer" className="text-fg-muted transition-colors hover:text-[#0A66C2]" aria-label="LinkedIn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Profile graphic with floating badges */}
        <div className="relative animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <div className="relative h-64 w-64 sm:h-80 sm:w-80">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 via-violet-500/10 to-transparent blur-2xl animate-pulse-glow" />
            {/* Profile image */}
            <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-accent/20 ring-offset-4 ring-offset-bg">
              <Image src="/profile.jpg" alt="Tiago Quaresma" fill className="object-cover" priority />
            </div>
            {/* Floating skill badges */}
            <div className="absolute -top-2 -right-4 rounded-lg border border-border/60 bg-bg-card/90 px-3 py-1.5 text-xs font-medium text-fg shadow-lg backdrop-blur-sm animate-float">
              React
            </div>
            <div className="absolute -bottom-2 -left-4 rounded-lg border border-border/60 bg-bg-card/90 px-3 py-1.5 text-xs font-medium text-fg shadow-lg backdrop-blur-sm animate-float-delayed">
              Java
            </div>
            <div className="absolute top-1/2 -right-4 sm:-right-8 rounded-lg border border-border/60 bg-bg-card/90 px-3 py-1.5 text-xs font-medium text-fg shadow-lg backdrop-blur-sm animate-float" style={{ animationDelay: "1s" }}>
              Next.js
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
