"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navSections } from "@/content/site";
import { CONSOLE_PATH, toggleTheme } from "@/lib/theme";
import { TOGGLE_BUILDING, emit } from "@/lib/events";

function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

/**
 * Global keyboard shortcuts.
 *  ~ or `   switch Normal / Console
 *  /        open the console
 *  T        toggle light / dark
 *  B        open the Building dropdown (normal view)
 *  1–5      jump to a section (normal view)
 */
export function Shortcuts() {
  const router = useRouter();
  const pathname = usePathname();
  const isConsole = pathname.startsWith(CONSOLE_PATH);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "~" || e.key === "`") {
        e.preventDefault();
        router.push(isConsole ? "/" : CONSOLE_PATH);
        return;
      }
      if (isTyping(e.target)) return;
      const key = e.key.toLowerCase();
      if (key === "t") toggleTheme();
      else if (key === "/" && !isConsole) {
        e.preventDefault();
        router.push(CONSOLE_PATH);
      } else if (key === "b" && !isConsole) emit(TOGGLE_BUILDING);
      else if (!isConsole) {
        const section = navSections.find((s) => s.key === e.key);
        if (section) document.getElementById(section.id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [router, isConsole]);

  return null;
}
