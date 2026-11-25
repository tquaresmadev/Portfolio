"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/data/site";

const format = new Intl.DateTimeFormat("pt-PT", {
  timeZone: site.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

let snapshot: string | null = null;

function subscribe(onChange: () => void) {
  const id = window.setInterval(() => {
    const next = format.format(new Date());
    if (next !== snapshot) {
      snapshot = next;
      onChange();
    }
  }, 10_000);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  snapshot ??= format.format(new Date());
  return snapshot;
}

export default function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, () => null);
  return <span className={className}>{time ?? "--:--"}</span>;
}
