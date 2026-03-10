"use client";

import Image from "next/image";
import { projects } from "@/data/projects";
import { useTranslation } from "@/i18n/useTranslation";
import { useInView } from "@/hooks/useInView";

export default function ProjectsGrid() {
  const { t } = useTranslation();
  const { ref, inView } = useInView(0.05);

  return (
    <section id="projects" className="relative px-6 py-24">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className={`mb-12 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("projects.title")}
          </h2>
          <p className="text-fg-muted">{t("projects.description")}</p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
            >
              {/* Thumbnail */}
              <div className="relative h-56 overflow-hidden" style={{ backgroundColor: project.accentColor + "10" }}>
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={t(`project.${project.slug}.title`)}
                    fill
                    unoptimized
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={project.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                      <path d={project.icon} />
                    </svg>
                  </div>
                )}

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-105"
                    >
                      {t("projects.liveDemo")}
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-105"
                    >
                      {t("projects.sourceCode")}
                    </a>
                  )}
                </div>

                {/* Category badge */}
                {project.category && (
                  <span
                    className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90"
                    style={{ backgroundColor: project.accentColor + "cc" }}
                  >
                    {t(`project.${project.slug}.category`)}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="mb-2 text-lg font-semibold text-fg">
                  {t(`project.${project.slug}.title`)}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-fg-muted">
                  {t(`project.${project.slug}.description`)}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border/60 bg-bg-subtle/50 px-2 py-0.5 text-xs text-fg-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
