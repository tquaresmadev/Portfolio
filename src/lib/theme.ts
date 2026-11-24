/**
 * Theme state lives on <html> as the `.dark` class. The inline script in layout.tsx sets it
 * before first paint; this module reads and changes it afterwards.
 */
export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const listeners = new Set<() => void>();

export function getTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function apply(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  listeners.forEach((listener) => listener());
}

/** Sets the theme and remembers it, so it wins over the system setting from now on. */
export function setTheme(theme: Theme) {
  apply(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage blocked: the choice still applies to this visit.
  }
}

/** For useSyncExternalStore. Also follows the system setting while the visitor hasn't picked a theme. */
export function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage blocked: treat as no saved choice.
    }
    if (!saved) apply(media.matches ? "dark" : "light");
  };
  media.addEventListener("change", onSystemChange);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onSystemChange);
  };
}
