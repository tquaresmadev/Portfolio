"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/useTranslation";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_LINKS = [
  {
    key: "nav.about",
    href: "#hero",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    key: "nav.projects",
    href: "#projects",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    key: "nav.skills",
    href: "#skills",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    key: "nav.contact",
    href: "#contact",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleRatios = new Map<string, number>();

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibleRatios.set(id, entry.intersectionRatio);
          });
          let best = "hero";
          let bestRatio = 0;
          visibleRatios.forEach((ratio, sectionId) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = sectionId;
            }
          });
          setActiveSection(best);
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1] }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ willChange: "backdrop-filter" }}
    >
      <div
        className="pointer-events-none absolute inset-0 border-b border-border/50 bg-bg/80 shadow-lg shadow-black/5 backdrop-blur-xl transition-opacity duration-300"
        style={{ opacity: scrolled ? 1 : 0 }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/80 to-transparent transition-opacity duration-300"
        style={{ opacity: scrolled ? 0 : 1 }}
      />

      <div
        className="relative mx-auto flex max-w-6xl items-center justify-between px-4 transition-[padding] duration-300 sm:px-6"
        style={{ paddingTop: scrolled ? "0.75rem" : "1rem", paddingBottom: scrolled ? "0.75rem" : "1rem" }}
      >
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-fg">
          TQ<span className="text-accent">.</span>
        </Link>

        {/* Mobile icon nav — fills the space between logo and controls */}
        <div className="flex flex-1 items-center justify-center gap-2 px-2 md:hidden">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <button
                key={link.key}
                onClick={() => handleNav(link.href)}
                className={`rounded-lg p-2.5 transition-all duration-200 ${
                  isActive
                    ? "bg-accent/15 text-accent"
                    : "text-fg-muted/40 active:text-fg-muted"
                }`}
                aria-label={t(link.key)}
              >
                {link.icon}
              </button>
            );
          })}
        </div>

        {/* Desktop text nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <button
                key={link.key}
                onClick={() => handleNav(link.href)}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-accent" : "text-fg-muted hover:text-fg"
                }`}
              >
                {t(link.key)}
                <span
                  className="absolute -bottom-1 left-0 h-0.5 rounded-full bg-accent transition-all duration-300"
                  style={{
                    width: isActive ? "100%" : "0%",
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
