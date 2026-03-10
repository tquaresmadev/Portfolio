"use client";

import { useState } from "react";
import Image from "next/image";
import { skills, Skill } from "@/data/skills";
import { useTranslation } from "@/i18n/useTranslation";
import { useInView } from "@/hooks/useInView";

const tagColors: Record<string, string> = {
  Language: "#3b82f6",
  Framework: "#10b981",
  Database: "#f59e0b",
  AI: "#8b5cf6",
};

export default function SkillsSection() {
  const { t } = useTranslation();
  const { ref, inView } = useInView(0.1);
  const [lightbox, setLightbox] = useState<Skill["certification"] | null>(null);

  return (
    <section id="skills" className="relative px-6 py-24">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className={`mb-12 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("skills.title")}
          </h2>
          <p className="text-fg-muted">{t("skills.description")}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className={`group rounded-xl border border-border/60 bg-bg-card/50 p-4 backdrop-blur-sm transition-[border-color,background-color,box-shadow,transform] duration-300 hover:border-accent/40 hover:bg-bg-card/80 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 sm:p-5 ${
                inView ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{
                animationDelay: inView ? `${i * 80}ms` : undefined,
                animationFillMode: "both",
                borderLeftColor: (tagColors[skill.tag] || "#888") + "60",
                borderLeftWidth: "3px",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <h3 className="truncate text-sm font-semibold text-fg">{skill.name}</h3>
                  {skill.certification && (
                    <div className="relative">
                      <button
                        onClick={() => setLightbox(skill.certification)}
                        className="peer cursor-pointer text-sm transition-transform duration-200 hover:scale-125"
                      >
                        🏅
                      </button>
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 rounded-lg border border-border/60 bg-bg-card/95 p-2 opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 peer-hover:pointer-events-auto peer-hover:opacity-100 w-52">
                        {skill.certification.image && (
                          <div className="relative mb-2 h-28 w-full overflow-hidden rounded">
                            <Image
                              src={skill.certification.image}
                              alt={skill.certification.name}
                              fill
                              className="object-cover object-top"
                            />
                          </div>
                        )}
                        <p className="text-xs font-semibold text-fg">{skill.certification.name}</p>
                        <p className="text-[10px] text-fg-muted">{skill.certification.issuer}</p>
                        <p className="mt-1 text-[10px] text-fg-muted/60">Click to view full certificate</p>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border/60" />
                      </div>
                    </div>
                  )}
                </div>
                <span
                  className="shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    borderColor: (tagColors[skill.tag] || "#888") + "40",
                    color: tagColors[skill.tag] || "#888",
                    backgroundColor: (tagColors[skill.tag] || "#888") + "0a",
                  }}
                >
                  {skill.tag}
                </span>
              </div>

              <div className="mt-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div
                    key={j}
                    className="h-1.5 flex-1 rounded-full transition-all duration-700"
                    style={{
                      backgroundColor: j < skill.level ? (tagColors[skill.tag] || "#888") : "var(--border)",
                      opacity: j < skill.level ? 0.8 : 0.3,
                      transitionDelay: inView ? `${i * 80 + j * 60}ms` : "0ms",
                      transform: inView && j < skill.level ? "scaleX(1)" : j < skill.level ? "scaleX(0)" : "scaleX(1)",
                      transformOrigin: "left",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-2xl w-full overflow-hidden rounded-2xl border border-border/60 bg-bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/80 transition-colors hover:bg-black/60 cursor-pointer"
            >
              ✕
            </button>
            {lightbox.image && (
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={lightbox.image}
                  alt={lightbox.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-base font-semibold text-fg">{lightbox.name}</h3>
              <p className="text-sm text-fg-muted">{lightbox.issuer}</p>
              {lightbox.url && (
                <a
                  href={lightbox.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-accent hover:underline"
                >
                  View credential →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
