"use client";

import type { CSSProperties, ReactNode } from "react";
import { projects, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { useTranslation } from "@/i18n/useTranslation";
import ProjectMedia from "./ProjectMedia";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight, Check } from "./icons";
import { container, section } from "./ui";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" aria-labelledby="projects-title" className={`${container} ${section}`}>
      <SectionHeading id="projects-title" title={t("projects.title")} description={t("projects.description")} />

      <div className="flex flex-col gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} flip={i % 2 === 1} />
        ))}

        <div className="tile reveal flex flex-wrap items-center justify-between gap-4 py-[22px] pr-6 pl-7">
          <div>
            <h3 className="font-display text-[22px] font-bold tracking-[-0.02em]">{t("projects.thisSite")}</h3>
            <p className="mt-1 text-[15px] text-muted">{t("projects.thisSiteText")}</p>
          </div>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-chip px-[18px] text-[15px] font-medium transition-colors hover:bg-line"
          >
            GitHub
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, flip }: { project: Project; flip: boolean }) {
  const { t } = useTranslation();
  const key = `project.${project.slug}`;
  const highlights = Array.from({ length: project.highlights }, (_, i) => t(`${key}.h${i + 1}`));

  return (
    <article
      id={project.slug}
      aria-labelledby={`${project.slug}-title`}
      style={{ "--project": project.color } as CSSProperties}
      className={`project-surface reveal grid items-center gap-8 rounded-[32px] p-6 sm:p-9 lg:gap-10 lg:p-12 ${
        flip ? "lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]"
      }`}
    >
      <div className={`flex flex-col items-start gap-5 ${flip ? "lg:order-2" : ""}`}>
        <p className="project-text rounded-full bg-tile px-3 py-1.5 text-[13px] font-semibold">{t(`${key}.category`)}</p>
        <h3
          id={`${project.slug}-title`}
          className="font-display text-[clamp(2.25rem,1.8rem+1.6vw,3.25rem)] leading-none font-bold tracking-[-0.035em]"
        >
          {project.title}
        </h3>
        <p className="max-w-[34ch] text-[19px] leading-[1.45] text-pretty">{t(`${key}.tagline`)}</p>
        <ul className="grid gap-2.5">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2.5">
              <Check className="project-text mt-[3px] size-[18px] shrink-0" strokeWidth={2.25} />
              {highlight}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted">
          <span className="sr-only">{t("projects.stack")}: </span>
          {project.stack.join(" · ")}
        </p>
        {(project.liveUrl || project.sourceUrl) && (
          <div className="flex flex-wrap gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-invert px-5 text-[15px] font-semibold text-invert-ink transition active:scale-[0.98]"
              >
                {t("projects.visit", { host: project.host })}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-tile px-5 text-[15px] font-semibold transition active:scale-[0.98]"
              >
                {t("projects.source")}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        )}
      </div>

      <BrowserFrame host={project.host}>
        <ProjectMedia media={project.media} alt={t(`${key}.mediaAlt`)} />
      </BrowserFrame>
    </article>
  );
}

function BrowserFrame({ host, children }: { host: string; children: ReactNode }) {
  return (
    <div className="project-border project-glow overflow-hidden rounded-2xl border bg-tile">
      <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-line px-3.5">
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="ml-2.5 block h-[22px] min-w-0 flex-1 truncate rounded-md bg-chip px-2.5 text-xs leading-[22px] text-faint">
          {host}
        </span>
      </div>
      {children}
    </div>
  );
}
