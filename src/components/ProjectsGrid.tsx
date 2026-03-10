"use client";

import Image from "next/image";
import { projects } from "@/data/projects";
import { useTranslation } from "@/i18n/useTranslation";
import { useInView } from "@/hooks/useInView";

export default function ProjectsGrid() {
  const { t } = useTranslation();
  const { ref, inView } = useInView(0.05);

  return (
    <section id="projects" className="relative flex min-h-screen items-center px-6 py-24">

      <div ref={ref} className="relative mx-auto w-full max-w-6xl">
        <div className={`mb-14 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            {t("projects.subtitle")}
          </p>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("projects.title")}
          </h2>
          <p className="mx-auto max-w-md text-fg-muted">{t("projects.description")}</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
            >
              {/* Hover glow effect */}
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.accentColor}15, transparent 40%)`,
                }}
              />

              {/* Thumbnail */}
              <div className="relative h-52 overflow-hidden sm:h-60" style={{ backgroundColor: project.accentColor + "10" }}>
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={t(`project.${project.slug}.title`)}
                    fill
                    unoptimized
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={project.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                      <path d={project.icon} />
                    </svg>
                  </div>
                )}

                {/* Gradient overlay — always dark to blend with dark thumbnails */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Hover overlay with buttons — only if project has links */}
                {(project.liveUrl || project.sourceUrl) && (
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-accent/25 transition-transform duration-200 hover:scale-105"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                      {t("projects.liveDemo")}
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-white/20"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      {t("projects.sourceCode")}
                    </a>
                  )}
                </div>
                )}

                {/* Category badge */}
                {project.category && (
                  <span
                    className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 shadow-lg"
                    style={{ backgroundColor: project.accentColor + "cc" }}
                  >
                    {t(`project.${project.slug}.category`)}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="relative p-5 sm:p-6">
                <h3 className="mb-2 text-lg font-bold text-fg transition-colors duration-200 group-hover:text-accent">
                  {t(`project.${project.slug}.title`)}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-fg-muted">
                  {t(`project.${project.slug}.description`)}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/40 bg-bg-subtle/50 px-2.5 py-0.5 text-[11px] font-medium text-fg-muted transition-colors duration-200 group-hover:border-accent/20 group-hover:text-fg-muted"
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
