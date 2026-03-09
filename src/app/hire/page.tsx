"use client";

import { useActionState, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { sendContactEmail } from "./actions";

type State = { success?: boolean; error?: string } | null;

function formAction(_prev: State, formData: FormData) {
  return sendContactEmail(formData);
}

/* ---------- Rocket / envelope sending animation ---------- */
function SendingAnimation() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm animate-hire-fade-in">
      <div className="flex flex-col items-center gap-6">
        {/* Stars background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 w-0.5 rounded-full bg-white animate-hire-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Rocket envelope */}
        <div className="relative animate-hire-rocket-launch">
          {/* Flame trail */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 animate-hire-flame">
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
              <ellipse cx="12" cy="10" rx="8" ry="18" fill="url(#flame)" opacity="0.9" />
              <ellipse cx="12" cy="14" rx="4" ry="12" fill="url(#flameInner)" />
              <defs>
                <linearGradient id="flame" x1="12" y1="0" x2="12" y2="40">
                  <stop stopColor="#fbbf24" />
                  <stop offset="0.5" stopColor="#f97316" />
                  <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="flameInner" x1="12" y1="0" x2="12" y2="30">
                  <stop stopColor="#fff" />
                  <stop offset="0.3" stopColor="#fde68a" />
                  <stop offset="1" stopColor="#f97316" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Envelope with wings */}
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">
            {/* Wing left */}
            <path d="M8 28 L2 20 L18 26Z" fill="#818cf8" opacity="0.8" />
            {/* Wing right */}
            <path d="M56 28 L62 20 L46 26Z" fill="#818cf8" opacity="0.8" />
            {/* Envelope body */}
            <rect x="12" y="20" width="40" height="28" rx="4" fill="#6366f1" />
            {/* Envelope flap */}
            <path d="M12 20 L32 36 L52 20" stroke="#818cf8" strokeWidth="2" fill="#4f46e5" />
            {/* Envelope lines */}
            <line x1="20" y1="32" x2="44" y2="32" stroke="#818cf8" strokeWidth="1.5" opacity="0.5" />
            <line x1="20" y1="37" x2="36" y2="37" stroke="#818cf8" strokeWidth="1.5" opacity="0.3" />
            {/* Nose cone */}
            <path d="M26 20 L32 8 L38 20" fill="#4f46e5" />
          </svg>
        </div>

        {/* Particle trail */}
        <div className="flex gap-1.5 animate-hire-particles">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-accent/60"
              style={{
                animationDelay: `${i * 0.1}s`,
                opacity: 1 - i * 0.2,
              }}
            />
          ))}
        </div>

        <p className="text-sm font-medium text-fg-muted animate-pulse">
          Launching your message...
        </p>
      </div>
    </div>
  );
}

/* ---------- Success screen ---------- */
function SuccessScreen() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 py-12">
      {/* Confetti particles */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-hire-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-5%",
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="h-2.5 w-2.5 rounded-sm"
                style={{
                  backgroundColor: ["#6366f1", "#fbbf24", "#34d399", "#f472b6", "#818cf8", "#fb923c"][i % 6],
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="w-full max-w-lg text-center animate-hire-success-in">
        {/* Animated checkmark circle */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 ring-2 ring-emerald-500/30 animate-hire-check-pop">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#34d399"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-hire-check-draw"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="mb-2 text-3xl font-bold text-fg animate-hire-stagger-1">
          Message delivered!
        </h2>
        <p className="mb-2 text-fg-muted animate-hire-stagger-2">
          Your message has landed safely in my inbox.
        </p>
        <p className="mb-8 text-sm text-fg-muted/70 animate-hire-stagger-2">
          I typically respond within 24 hours. Looking forward to connecting!
        </p>

        {/* Decorative divider */}
        <div className="mx-auto mb-8 flex items-center gap-3 animate-hire-stagger-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
            <path d="M21 8V21H3V8" />
            <path d="M1 3h22v5H1z" />
            <path d="M10 12h4" />
          </svg>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center animate-hire-stagger-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-bg-card px-5 py-2.5 text-sm font-medium text-fg transition-all hover:border-accent/40 hover:bg-bg-subtle"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to portfolio
          </Link>
          <Link
            href="/hire"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Send another message
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main page ---------- */
export default function HirePage() {
  const [state, action, pending] = useActionState(formAction, null);
  const [showSending, setShowSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const prevPending = useRef(false);

  // Track pending transitions to show rocket animation
  useEffect(() => {
    if (pending && !prevPending.current) {
      setShowSending(true);
    }
    if (!pending && prevPending.current) {
      // Keep rocket for a beat, then transition
      const t = setTimeout(() => {
        setShowSending(false);
        if (state?.success) setShowSuccess(true);
      }, 1500);
      return () => clearTimeout(t);
    }
    prevPending.current = pending;
  }, [pending, state]);

  if (showSuccess) return <SuccessScreen />;

  const inputClass =
    "w-full rounded-lg border border-border bg-bg-card px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-muted/50 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent focus:shadow-[0_0_12px_rgba(99,102,241,0.15)]";

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 py-12 overflow-y-auto">
      {showSending && <SendingAnimation />}

      <div className="w-full max-w-lg animate-hire-page-in">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to portfolio
        </Link>

        <h1 className="mb-1 text-2xl font-bold text-fg animate-hire-stagger-1">
          Get in touch
        </h1>
        <p className="mb-8 text-sm text-fg-muted animate-hire-stagger-2">
          Have a project in mind? Fill out the form below and I&apos;ll get back to you.
        </p>

        <form action={action} className="space-y-4">
          {state?.error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 animate-hire-shake">
              {state.error}
            </div>
          )}

          <div className="animate-hire-stagger-1">
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-fg">
              Name
            </label>
            <input id="name" name="name" type="text" required className={inputClass} placeholder="Your name" />
          </div>

          <div className="animate-hire-stagger-2">
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-fg">
              Email
            </label>
            <input id="email" name="email" type="email" required className={inputClass} placeholder="you@example.com" />
          </div>

          <div className="animate-hire-stagger-3">
            <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-fg">
              Subject
            </label>
            <input id="subject" name="subject" type="text" required className={inputClass} placeholder="Project inquiry" />
          </div>

          <div className="animate-hire-stagger-4">
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-fg">
              Message
            </label>
            <textarea id="message" name="message" required rows={5} className={`${inputClass} resize-none`} placeholder="Tell me about your project..." />
          </div>

          <div className="animate-hire-stagger-4">
            <button
              type="submit"
              disabled={pending}
              className="group relative w-full overflow-hidden rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] disabled:opacity-50"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative inline-flex items-center gap-2">
                {pending ? (
                  "Sending..."
                ) : (
                  <>
                    Send message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
