"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { useTranslation } from "@/i18n/useTranslation";
import { Pause, Play } from "./icons";

const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src);

/**
 * A project's preview. Videos loop muted like a GIF, but start only when the visitor
 * hasn't asked for reduced motion, and always have a pause button.
 */
export default function ProjectMedia({ media, alt }: { media: Project["media"]; alt: string }) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Autoplay needs `muted`, which React doesn't reliably set before hydration.
    video.muted = true;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.play().catch(() => {});
    }
  }, []);

  if (!isVideo(media.src)) {
    return (
      <Image
        src={media.src}
        alt={alt}
        width={media.width}
        height={media.height}
        sizes="(min-width: 1024px) 720px, 100vw"
        className="block h-auto w-full"
      />
    );
  }

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={media.src}
        poster={media.poster}
        width={media.width}
        height={media.height}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block aspect-video h-auto w-full object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? t("projects.pause") : t("projects.play")}
        className="absolute right-3 bottom-3 inline-flex size-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75"
      >
        {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
      </button>
    </div>
  );
}
