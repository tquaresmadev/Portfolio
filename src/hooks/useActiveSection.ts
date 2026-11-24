"use client";

import { useEffect, useState } from "react";

/**
 * The id of the section crossing a thin band just above the middle of the viewport,
 * or null when none does (for example, while the hero is in view).
 * Pass a stable array (a module-level constant), or the observer restarts every render.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const inBand = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) inBand.set(entry.target.id, entry.isIntersecting);
        setActive(ids.find((id) => inBand.get(id)) ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
