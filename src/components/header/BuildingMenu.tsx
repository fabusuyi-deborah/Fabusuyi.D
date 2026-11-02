"use client";

import { useEffect, useId, useRef, useState } from "react";
import { building } from "@/content/building";
import { TOGGLE_BUILDING } from "@/lib/events";
import { BuildingIcon } from "../BuildingIcon";

/** Desktop "Building" dropdown in the header nav. */
export function BuildingMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    const onToggle = () => setOpen((o) => !o);
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("[data-building-trigger]")) return;
      if (rootRef.current && !rootRef.current.contains(target)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen((o) => {
          if (o) buttonRef.current?.focus({ preventScroll: true });
          return false;
        });
      }
    };
    window.addEventListener(TOGGLE_BUILDING, onToggle);
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(TOGGLE_BUILDING, onToggle);
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <li ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex cursor-pointer items-center gap-1.5 hover:text-accent"
      >
        <kbd className="mr-1.5 font-mono text-[10px] text-muted">B</kbd>
        Building
        <i className="size-1.5 rounded-full bg-warn animate-pulse-ring" aria-hidden />
        <span aria-hidden className={`text-[10px] transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute top-[calc(100%+12px)] left-0 z-30 w-[min(440px,calc(100vw-32px))] rounded-md border border-line bg-bg p-2 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]"
      >
        <div className="mb-1 flex justify-between gap-3 border-b border-line px-2.5 pt-2 pb-2.5">
          <span className="label">In incubation</span>
          <span className="label">{building.length} projects</span>
        </div>
        {building.map((b, i) => (
          <div
            key={b.id}
            className={`grid grid-cols-[44px_minmax(0,1fr)] gap-3.5 rounded px-2.5 py-3.5 hover:bg-bg-2 ${
              i > 0 ? "border-t border-dashed border-line" : ""
            }`}
          >
            <BuildingIcon project={b} />
            <div className="min-w-0">
              <h4 className={`display flex flex-wrap items-center gap-2.5 text-[22px] leading-none font-extrabold ${b.liveUrl ? "" : "text-muted"}`}>
                {b.title}
                <span className={`pill ${b.liveUrl ? "pill-live" : ""}`}>{b.stage}</span>
              </h4>
              <p className="mt-1.5 mb-2.5 text-[13px] leading-[1.45] text-muted">{b.description}</p>
              <div className="flex gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.08em]">
                {b.liveUrl && (
                  <a className="text-link" href={b.liveUrl} target="_blank" rel="noopener noreferrer">
                    See it live ↗
                  </a>
                )}
                {b.codeUrl && (
                  <a className="text-link" href={b.codeUrl} target="_blank" rel="noopener noreferrer">
                    Code ↗
                  </a>
                )}
                {!b.liveUrl && !b.codeUrl && <span className="text-muted">Details soon</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </li>
  );
}
