"use client";

import { useActionState, useState, useEffect, useRef } from "react";
import { sendContactEmail } from "@/app/actions";
import { useTranslation } from "@/i18n/useTranslation";
import { useInView } from "@/hooks/useInView";

type State = { success?: boolean; error?: string } | null;

function formAction(_prev: State, formData: FormData) {
  return sendContactEmail(formData);
}

/* ---------- Rocket / envelope sending animation ---------- */
function SendingAnimation() {
  const { t } = useTranslation();
  const stars = useRef(
    Array.from({ length: 20 }, () => ({
      top: `${Math.floor(Math.random() * 100)}%`,
      left: `${Math.floor(Math.random() * 100)}%`,
      delay: `${(Math.random() * 2).toFixed(1)}s`,
    }))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm animate-hire-fade-in">
      <div className="flex flex-col items-center gap-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {stars.current.map((s, i) => (
            <div
              key={i}
              className="absolute h-0.5 w-0.5 rounded-full bg-white animate-hire-twinkle"
              style={{ top: s.top, left: s.left, animationDelay: s.delay }}
            />
          ))}
        </div>

        <div className="relative animate-hire-rocket-launch">
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 animate-hire-flame">
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
              <ellipse cx="12" cy="10" rx="8" ry="18" fill="url(#flame-c)" opacity="0.9" />
              <ellipse cx="12" cy="14" rx="4" ry="12" fill="url(#flameInner-c)" />
              <defs>
                <linearGradient id="flame-c" x1="12" y1="0" x2="12" y2="40">
                  <stop stopColor="#fbbf24" />
                  <stop offset="0.5" stopColor="#f97316" />
                  <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="flameInner-c" x1="12" y1="0" x2="12" y2="30">
                  <stop stopColor="#fff" />
                  <stop offset="0.3" stopColor="#fde68a" />
                  <stop offset="1" stopColor="#f97316" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">
            <path d="M8 28 L2 20 L18 26Z" fill="#818cf8" opacity="0.8" />
            <path d="M56 28 L62 20 L46 26Z" fill="#818cf8" opacity="0.8" />
            <rect x="12" y="20" width="40" height="28" rx="4" fill="#6366f1" />
            <path d="M12 20 L32 36 L52 20" stroke="#818cf8" strokeWidth="2" fill="#4f46e5" />
            <line x1="20" y1="32" x2="44" y2="32" stroke="#818cf8" strokeWidth="1.5" opacity="0.5" />
            <line x1="20" y1="37" x2="36" y2="37" stroke="#818cf8" strokeWidth="1.5" opacity="0.3" />
            <path d="M26 20 L32 8 L38 20" fill="#4f46e5" />
          </svg>
        </div>

        <div className="flex gap-1.5 animate-hire-particles">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-accent/60"
              style={{ animationDelay: `${i * 0.1}s`, opacity: 1 - i * 0.2 }}
            />
          ))}
        </div>

        <p className="text-sm font-medium text-fg-muted animate-pulse">
          {t("hire.launchingMessage")}
        </p>
      </div>
    </div>
  );
}

/* ---------- Inline success ---------- */
function InlineSuccess({ onReset }: { onReset: () => void }) {
  const { t } = useTranslation();
  const confetti = useRef(
    Array.from({ length: 30 }, (_, i) => ({
      left: `${Math.floor(Math.random() * 100)}%`,
      delay: `${(Math.random() * 2).toFixed(1)}s`,
      duration: `${(2 + Math.random() * 2).toFixed(1)}s`,
      color: ["#6366f1", "#fbbf24", "#34d399", "#f472b6", "#818cf8", "#fb923c"][i % 6],
      rotation: `${Math.floor(Math.random() * 360)}deg`,
    }))
  );
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative rounded-2xl border border-border/60 bg-bg-card/50 p-8 text-center backdrop-blur-sm">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10">
          {confetti.current.map((c, i) => (
            <div
              key={i}
              className="absolute animate-hire-confetti"
              style={{ left: c.left, top: "-5%", animationDelay: c.delay, animationDuration: c.duration }}
            >
              <div
                className="h-2 w-2 rounded-sm"
                style={{ backgroundColor: c.color, transform: `rotate(${c.rotation})` }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="relative z-20">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 ring-2 ring-emerald-500/30 animate-hire-check-pop">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-hire-check-draw">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="mb-2 text-2xl font-bold text-fg animate-hire-stagger-1">
          {t("hire.successTitle")}
        </h3>
        <p className="mb-1 text-fg-muted animate-hire-stagger-2">
          {t("hire.successMessage")}
        </p>
        <p className="mb-6 text-sm text-fg-muted/70 animate-hire-stagger-2">
          {t("hire.successFollowUp")}
        </p>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 animate-hire-stagger-3"
        >
          {t("hire.sendAnother")}
        </button>
      </div>
    </div>
  );
}

/* ---------- Contact section ---------- */
export default function ContactSection() {
  const { t } = useTranslation();
  const { ref, inView } = useInView(0.1);
  const [state, action, pending] = useActionState(formAction, null);
  const [showSending, setShowSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const prevPending = useRef(false);

  useEffect(() => {
    if (pending && !prevPending.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync sending overlay with pending state
      setShowSending(true);
    }
    if (!pending && prevPending.current) {
      const timer = setTimeout(() => {
        setShowSending(false);
        if (state?.success) setShowSuccess(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
    prevPending.current = pending;
  }, [pending, state]);

  const handleReset = () => {
    setShowSuccess(false);
  };

  const inputClass =
    "w-full rounded-lg border border-border/60 bg-bg/50 px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-muted/40 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent focus:shadow-[0_0_12px_rgba(99,102,241,0.15)]";

  return (
    <section id="contact" className="relative px-6 py-24">
      {showSending && <SendingAnimation />}

      {/* Ambient orb */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-full max-w-[600px] rounded-full bg-accent/10 blur-[120px]" />

      <div ref={ref} className="relative mx-auto max-w-6xl">
        <div className={`mb-12 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("contact.title")}
          </h2>
          <p className="text-fg-muted">{t("contact.description")}</p>
        </div>

        <div className={`grid gap-8 lg:grid-cols-5 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Info panel */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-2xl border border-border/60 bg-bg-card/50 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold text-fg">{t("contact.infoTitle")}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-fg-muted">{t("contact.emailLabel")}</p>
                    <p className="text-sm font-medium text-fg">tiagoquaresmadev@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-fg-muted">{t("contact.locationLabel")}</p>
                    <p className="text-sm font-medium text-fg">Portugal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="rounded-2xl border border-border/60 bg-bg-card/50 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-sm font-semibold text-fg">{t("contact.followMe")}</h3>
              <div className="flex gap-3">
                <a href="https://github.com/tquaresmadev" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 text-fg-muted transition-all hover:border-accent/40 hover:text-fg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/tiago-quaresma-0ab4ba168/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 text-fg-muted transition-all hover:border-accent/40 hover:text-[#0A66C2]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact form / Success */}
          <div className="lg:col-span-3">
            {showSuccess ? (
              <InlineSuccess onReset={handleReset} />
            ) : (
              <form action={action} className="rounded-2xl border border-border/60 bg-bg-card/50 p-6 backdrop-blur-sm">
                {state?.error && (
                  <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 animate-hire-shake">
                    {state.error}
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="animate-hire-stagger-1">
                    <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-fg">
                      {t("hire.nameLabel")}
                    </label>
                    <input id="contact-name" name="name" type="text" required className={inputClass} placeholder={t("hire.namePlaceholder")} />
                  </div>
                  <div className="animate-hire-stagger-2">
                    <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-fg">
                      {t("hire.emailLabel")}
                    </label>
                    <input id="contact-email" name="email" type="email" required className={inputClass} placeholder={t("hire.emailPlaceholder")} />
                  </div>
                </div>

                <div className="mt-4 animate-hire-stagger-3">
                  <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-fg">
                    {t("hire.subjectLabel")}
                  </label>
                  <input id="contact-subject" name="subject" type="text" required className={inputClass} placeholder={t("hire.subjectPlaceholder")} />
                </div>

                <div className="mt-4 animate-hire-stagger-4">
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-fg">
                    {t("hire.messageLabel")}
                  </label>
                  <textarea id="contact-message" name="message" required rows={5} className={`${inputClass} resize-none`} placeholder={t("hire.messagePlaceholder")} />
                </div>

                <div className="mt-4 animate-hire-stagger-4">
                  <button
                    type="submit"
                    disabled={pending}
                    className="group relative w-full overflow-hidden rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] disabled:opacity-50"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative inline-flex items-center gap-2">
                      {pending ? (
                        t("hire.sending")
                      ) : (
                        <>
                          {t("hire.sendButton")}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
