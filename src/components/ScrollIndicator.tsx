"use client";

import { useState, useEffect } from "react";

export default function ScrollIndicator({ targetId }: { targetId: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden text-fg-muted/60 transition-opacity duration-500 hover:text-accent cursor-pointer animate-[scroll-dot_1.8s_ease-in-out_infinite] sm:block"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
      aria-label={`Scroll to ${targetId}`}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}
