"use client";

import { useSyncExternalStore } from "react";
import { getTheme, toggleTheme, type Theme } from "@/lib/theme";

function subscribe(onChange: () => void) {
  window.addEventListener("themechange", onChange);
  return () => window.removeEventListener("themechange", onChange);
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, getTheme, () => "light");
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode (T)`}
      className="cursor-pointer rounded-full border border-line px-2.5 py-1.25 font-mono text-[11px] uppercase tracking-[0.08em] text-fg hover:border-accent hover:text-accent"
    >
      <span aria-hidden>◐</span>
    </button>
  );
}