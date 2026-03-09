"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";

function getIndex(i: number) {
  return ((i % projects.length) + projects.length) % projects.length;
}

export default function ProjectCarousel() {
  const [current, setCurrent] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [closing, setClosing] = useState(false);
  const touchX = useRef(0);

  const closeLightbox = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setZoomed(false);
      setClosing(false);
    }, 350);
  }, []);

  const prev = useCallback(() => { setCurrent((i) => getIndex(i - 1)); setSlideKey((k) => k + 1); }, []);
  const next = useCallback(() => { setCurrent((i) => getIndex(i + 1)); setSlideKey((k) => k + 1); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape" && zoomed) closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, zoomed, closeLightbox]);

  const prevProject = projects[getIndex(current - 1)];
  const project = projects[current];
  const nextProject = projects[getIndex(current + 1)];

  return (
    <section
      className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-4"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const diff = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
      }}
    >
      <div className="flex w-full max-w-6xl items-center gap-3">
        {/* Left peek card */}
        <button
          onClick={prev}
          className="group hidden w-48 shrink-0 cursor-pointer flex-col items-center gap-3 rounded-xl border border-transparent p-4 text-center opacity-40 transition-all hover:border-border hover:opacity-60 lg:flex"
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: prevProject.accentColor + "20" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={prevProject.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={prevProject.icon} />
            </svg>
          </div>
          <span className="text-sm font-medium text-fg-muted">{prevProject.title}</span>
        </button>

        {/* Arrow left (mobile + tablet) */}
        <button
          onClick={prev}
          className="shrink-0 p-2 text-fg-muted transition hover:text-accent lg:hidden"
          aria-label="Previous project"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Main card — fixed height */}
        <div className="flex h-64 min-w-0 flex-1 overflow-hidden rounded-2xl border border-border">
          {/* Thumbnail / icon area */}
          <div
            className="relative hidden w-72 shrink-0 sm:block"
            style={{ backgroundColor: project.accentColor + "08" }}
          >
            {project.thumbnail ? (
              <button
                key={slideKey}
                onClick={() => setZoomed(true)}
                className="relative h-full w-full cursor-zoom-in animate-fade-in"
                aria-label="Zoom image"
              >
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </button>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: project.accentColor + "18" }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={project.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={project.icon} />
                  </svg>
                </div>
                <span
                  className="text-xs font-medium tracking-wide"
                  style={{ color: project.accentColor + "80" }}
                >
                  No preview yet
                </span>
              </div>
            )}
            {/* Accent border on the right edge */}
            <div
              className="absolute right-0 top-0 h-full w-px"
              style={{ backgroundColor: project.accentColor + "25" }}
            />
          </div>

          {/* Content */}
          <div key={slideKey} className="flex min-w-0 flex-1 flex-col justify-between p-5">
            <div className="space-y-3">
              <div className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: "50ms" }}>
                {/* Mobile icon */}
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:hidden"
                  style={{ backgroundColor: project.accentColor + "15" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={project.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={project.icon} />
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-fg">{project.title}</h3>
                  {project.category && (
                    <span
                      className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                      style={{
                        backgroundColor: project.accentColor + "18",
                        color: project.accentColor,
                      }}
                    >
                      {project.category}
                    </span>
                  )}
                </div>
              </div>

              <p className="line-clamp-2 text-sm leading-relaxed text-fg-muted animate-slide-up" style={{ animationDelay: "120ms" }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 animate-slide-up" style={{ animationDelay: "190ms" }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border px-2 py-0.5 text-xs text-fg-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center justify-between animate-slide-up" style={{ animationDelay: "260ms" }}>
              <div className="flex gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg px-4 py-1.5 text-sm font-medium text-white transition hover:opacity-90"
                    style={{ backgroundColor: project.accentColor }}
                  >
                    Live Demo
                  </a>
                )}
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-border px-4 py-1.5 text-sm font-medium text-fg transition hover:text-accent"
                  >
                    Source Code
                  </a>
                )}
              </div>
              <span className="font-mono text-xs text-fg-muted">
                {String(current + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Arrow right (mobile + tablet) */}
        <button
          onClick={next}
          className="shrink-0 p-2 text-fg-muted transition hover:text-accent lg:hidden"
          aria-label="Next project"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>

        {/* Right peek card */}
        <button
          onClick={next}
          className="group hidden w-48 shrink-0 cursor-pointer flex-col items-center gap-3 rounded-xl border border-transparent p-4 text-center opacity-40 transition-all hover:border-border hover:opacity-60 lg:flex"
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: nextProject.accentColor + "20" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={nextProject.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={nextProject.icon} />
            </svg>
          </div>
          <span className="text-sm font-medium text-fg-muted">{nextProject.title}</span>
        </button>
      </div>

      {/* Mobile dots */}
      <div className="mt-3 flex gap-2 sm:hidden">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === current ? "bg-accent" : "bg-border"
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      {/* Lightbox */}
      {zoomed && project.thumbnail && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm ${
            closing ? "animate-backdrop-out" : "animate-backdrop-in"
          }`}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close zoom"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Project title */}
          <div key={slideKey} className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-medium text-white/70 animate-slide-up">
            {project.title}
            <span className="ml-2 text-white/40">
              {String(current + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
            </span>
          </div>

          {/* Left arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Previous project"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Image */}
          <div
            className={`relative h-[80vh] w-[70vw] max-w-5xl ${
              closing ? "animate-lightbox-out" : "animate-lightbox-in"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div key={slideKey} className="relative h-full w-full animate-slide-in">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Next project"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
