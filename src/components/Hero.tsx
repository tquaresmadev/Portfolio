"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/data/site";
import { coreStack } from "@/data/skills";
import { featuredProject } from "@/data/projects";
import { useTranslation } from "@/i18n/useTranslation";
import LocalTime from "./LocalTime";
import { ArrowDown, ArrowDownRight, ArrowRight, Mail } from "./icons";
import { container } from "./ui";

/** Position in the hero's load-in stagger (see `.rise` in globals.css). */
const order = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Hero() {
  const { t } = useTranslation();
  const featured = featuredProject;

  return (
    <section aria-labelledby="hero-title" className={`${container} pt-4`}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {/* Intro */}
        <div
          className="tile rise flex flex-col justify-between gap-10 p-6 sm:col-span-2 sm:p-10 lg:col-span-8 lg:p-12"
          style={order(0)}
        >
          <div>
            {site.available && (
              <p className="inline-flex items-center gap-2 rounded-full bg-chip py-1.5 pr-3 pl-2.5 text-sm font-medium">
                <span aria-hidden="true" className="size-2 rounded-full bg-success ring-[3px] ring-success/20" />
                {t("hero.available")}
              </p>
            )}
            <h1
              id="hero-title"
              className="mt-7 font-display text-[clamp(2.375rem,1.4rem+3vw,3.875rem)] leading-[1.02] font-bold tracking-[-0.03em] text-balance"
            >
              {t("hero.title")} <span className="text-muted">{t("hero.subtitle")}</span>
            </h1>
          </div>
          <div>
            <p className="max-w-[46ch] text-lg text-muted">{t("hero.bio")}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href="#projects"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-ink transition hover:brightness-110 active:scale-[0.98]"
              >
                {t("hero.viewProjects")}
                <ArrowDown className="size-4" />
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-[52px] min-w-0 items-center gap-2.5 rounded-full bg-chip px-5 font-medium transition-colors [overflow-wrap:anywhere] hover:bg-line"
              >
                <Mail className="size-[18px] shrink-0" strokeWidth={1.75} />
                {site.email}
              </a>
            </div>
          </div>
        </div>

        {/* Photo and location */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          <figure className="rise relative aspect-square overflow-hidden rounded-[28px] bg-photo" style={order(1)}>
            <Image
              src="/profile.jpg"
              alt={t("hero.photoAlt")}
              fill
              preload
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-[50%_30%]"
            />
            <figcaption className="absolute bottom-3.5 left-3.5 rounded-full bg-caption px-3.5 py-2 text-sm font-medium text-caption-ink backdrop-blur-md">
              {site.name}
            </figcaption>
          </figure>
          <div className="tile rise flex flex-1 items-end justify-between gap-4 px-6 py-5" style={order(2)}>
            <div>
              <p className="eyebrow text-faint">{t("hero.base")}</p>
              <p className="mt-1.5 font-display text-[30px] leading-none font-bold tracking-[-0.03em]">
                {t("hero.country")}
              </p>
            </div>
            <p className="text-right text-[15px] leading-snug text-muted">
              <LocalTime className="font-medium text-fg tabular-nums" />
              <br />
              {t("hero.localTime")}
            </p>
          </div>
        </div>

        {/* Now building */}
        <a
          href={`#${featured.slug}`}
          className="group project-surface rise flex flex-col gap-5 overflow-hidden rounded-[28px] px-6 pt-6 lg:col-span-6"
          style={{ "--project": featured.color, ...order(3) } as CSSProperties}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow project-text">{t("hero.nowBuilding")}</p>
              <p className="mt-1.5 font-display text-[28px] leading-tight font-bold tracking-[-0.03em]">
                {featured.title}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-tile transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            >
              <ArrowDownRight className="size-[18px]" />
            </span>
          </div>
          <Image
            src={featured.media.poster ?? featured.media.src}
            alt={t("hero.nowBuildingAlt")}
            width={featured.media.width}
            height={featured.media.height}
            sizes="(min-width: 1024px) 620px, (min-width: 640px) 50vw, 100vw"
            className="project-border mt-auto block aspect-[2/1] w-full rounded-t-[14px] border border-b-0 object-cover object-left-top transition-transform duration-500 group-hover:-translate-y-1 sm:aspect-auto sm:min-h-[180px] sm:flex-1"
          />
        </a>

        {/* Core stack */}
        <div className="tile rise flex flex-col justify-between gap-6 p-6 lg:col-span-3" style={order(4)}>
          <div>
            <p className="eyebrow text-faint">{t("hero.stack")}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {coreStack.map((skill) => (
                <li key={skill} className="rounded-full bg-chip px-3.5 py-[7px] text-[15px] font-medium">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <a href="#about" className="group inline-flex min-h-11 items-center gap-1.5 self-start font-medium">
            {t("hero.seeAll")}
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>

        {/* Response time */}
        <div className="tile rise flex flex-col justify-between gap-6 p-6 lg:col-span-3" style={order(5)}>
          <div>
            <p className="eyebrow text-faint">{t("hero.response")}</p>
            <p className="mt-2.5 font-display text-[40px] leading-none font-bold tracking-[-0.03em]">
              {t("hero.responseValue")}
            </p>
            <p className="mt-2.5 text-[15px] text-muted">{t("hero.responseText")}</p>
          </div>
          <a href="#contact" className="group inline-flex min-h-11 items-center gap-1.5 self-start font-medium">
            {t("nav.cta")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
