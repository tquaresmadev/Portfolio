"use client";

import { certification, skillGroups } from "@/data/skills";
import { useTranslation } from "@/i18n/useTranslation";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight, Award } from "./icons";
import { container, section } from "./ui";

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" aria-labelledby="about-title" className={`${container} ${section}`}>
      <SectionHeading id="about-title" title={t("about.title")} description={t("about.description")} />

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="tile reveal p-6 sm:p-9 lg:col-span-7 lg:p-11">
          <p className="max-w-[28ch] font-display text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-balance">
            {t("about.lead")}
          </p>
          <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-muted">{t("about.body")}</p>
        </div>

        <a
          href={certification.url}
          target="_blank"
          rel="noopener noreferrer"
          className="tile reveal group flex flex-col justify-between gap-7 p-7 transition-colors hover:border-faint/50 lg:col-span-5"
        >
          <div className="flex items-start justify-between gap-4">
            <span aria-hidden="true" className="inline-flex size-[52px] items-center justify-center rounded-2xl bg-chip text-accent">
              <Award className="size-6" strokeWidth={1.75} />
            </span>
            <span
              aria-hidden="true"
              className="inline-flex size-11 items-center justify-center rounded-full bg-chip transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <ArrowUpRight className="size-4" />
            </span>
          </div>
          <div>
            <p className="eyebrow text-faint">{t("about.certification")}</p>
            <p className="mt-1.5 font-display text-2xl leading-tight font-bold tracking-[-0.02em]">{certification.name}</p>
            <p className="mt-1.5 text-[15px] text-muted">{certification.issuer}</p>
          </div>
        </a>

        <div className="tile reveal grid gap-x-8 gap-y-7 p-6 sm:grid-cols-2 sm:p-9 lg:col-span-12 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.key}>
              <h3 className="eyebrow mb-3 text-faint">{t(`about.group.${group.key}`)}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full bg-chip px-3.5 py-[7px] text-[15px] font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
