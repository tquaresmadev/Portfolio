"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { useTranslation } from "@/i18n/useTranslation";
import CopyEmailButton from "./CopyEmailButton";
import { keepHyphenatedWords } from "./text";
import { ArrowUpRight, Check, Loader, Send } from "./icons";
import { container, section } from "./ui";

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "block w-full rounded-[14px] border border-white/30 bg-white/10 px-4 text-base text-white transition-colors hover:border-white/50 focus:border-white focus:bg-white/15";
const labelClass = "mb-1.5 block text-sm font-medium text-white/90";

const SOCIAL = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
];

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className={`${container} ${section}`}>
      <div className="on-brand reveal grid gap-10 rounded-[32px] bg-brand p-6 text-white sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12 lg:p-16">
        <div className="flex flex-col justify-between gap-8">
          <div>
            <h2
              id="contact-title"
              className="font-display text-[clamp(2.5rem,1.9rem+2.4vw,4rem)] leading-none font-bold tracking-[-0.035em] text-balance"
            >
              {keepHyphenatedWords(t("contact.title"))}
            </h2>
            <p className="mt-4 max-w-[36ch] text-lg text-white/90">{t("contact.description")}</p>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center text-[clamp(1.0625rem,1rem+0.4vw,1.3125rem)] font-semibold underline decoration-2 underline-offset-[5px] [overflow-wrap:anywhere]"
              >
                {site.email}
              </a>
              <CopyEmailButton email={site.email} />
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SOCIAL.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-white/15 px-4 text-[15px] font-medium transition-colors hover:bg-white/25"
                  >
                    {link.label}
                    <ArrowUpRight className="size-[15px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {status === "success" ? (
          <div role="status" className="flex flex-col items-start justify-center gap-4 rounded-[20px] bg-white/10 p-6 sm:p-8">
            <span aria-hidden="true" className="inline-flex size-12 items-center justify-center rounded-full bg-white text-brand">
              <Check className="size-6" strokeWidth={2.5} />
            </span>
            <p className="font-display text-3xl font-bold tracking-[-0.02em]">{t("contact.successTitle")}</p>
            <p className="text-white/90">{t("contact.successText")}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 inline-flex min-h-12 items-center rounded-full bg-white px-6 font-semibold text-brand transition active:scale-[0.98]"
            >
              {t("contact.sendAnother")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} aria-label={t("contact.formLabel")} className="relative grid content-start gap-3.5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                {t("contact.name")}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={100}
                className={`${fieldClass} min-h-[52px]`}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className={labelClass}>
                {t("contact.email")}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={200}
                className={`${fieldClass} min-h-[52px]`}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className={labelClass}>
                {t("contact.message")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                maxLength={5000}
                className={`${fieldClass} resize-y py-3.5 leading-relaxed`}
              />
            </div>

            <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
              <label htmlFor="contact-company">Company</label>
              <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-4 sm:col-span-2">
              {status === "error" && (
                <p role="alert" className="mr-auto max-w-[44ch] text-sm">
                  {t("contact.error")}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-white px-[26px] font-semibold text-brand transition active:scale-[0.98] disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    {t("contact.sending")}
                  </>
                ) : (
                  <>
                    {t("contact.send")}
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
