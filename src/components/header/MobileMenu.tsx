"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { building } from "@/content/building";
import { navSections } from "@/content/site";
import { OPEN_MENU } from "@/lib/events";

/** Menu button + full-width sheet, shown below the nav breakpoint. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
    const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close the menu when the route changes
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener(OPEN_MENU, onOpen);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_MENU, onOpen);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex cursor-pointer items-center gap-2 justify-self-end rounded-full bg-fg px-3.5 py-1.75 font-mono text-[11px] font-medium uppercase tracking-widest text-bg nav:hidden"
      >
        <i className="size-1.5 rounded-full bg-warn" aria-hidden />
        {open ? "Close" : "Menu"}
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="order-last col-span-full max-h-[calc(100dvh-150px)] overflow-y-auto border-t border-line pt-2 nav:hidden"
      >
        <ul>
          {navSections.map((s) => (
            <li key={s.id}>
              <Link
                href={`/#${s.id}`}
                onClick={() => setOpen(false)}
                className="display flex items-center justify-between border-b border-line py-2.5 text-[clamp(40px,12vw,56px)] leading-none no-underline"
              >
                {s.label}
                <span className="font-mono text-[13px] font-normal text-muted">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-0.5 pt-4.5 pb-2">
          <span className="label">Building · in incubation</span>
          {building.map((b) => (
            <div key={b.id} className="flex items-center justify-between gap-3 border-b border-dashed border-line py-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <b className="display text-xl leading-none font-extrabold">{b.title}</b>
                <span className={`pill ${b.liveUrl ? "pill-live" : ""}`}>{b.stage}</span>
              </div>
              {b.liveUrl ? (
                <a
                  href={b.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-accent no-underline"
                >
                  Live ↗
                </a>
              ) : (
                <span className="label">Soon</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
