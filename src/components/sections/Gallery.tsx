"use client";

import Image from "next/image";
import { useState } from "react";
import { photos } from "@/content/about";
import type { PhotoCategory } from "@/content/types";

const filters: { id: "all" | PhotoCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "speaking", label: "Speaking" },
  { id: "events", label: "Events" },
  { id: "life", label: "Life" },
];

const sizeClass = {
  big: "col-span-2 sm:row-span-3",
  wide: "col-span-2",
  normal: "",
} as const;

export function Gallery() {
  const [filter, setFilter] = useState<"all" | PhotoCategory>("all");
  // Life photos live under Events: they keep their "life" tag but show with the events.
  const shown = photos.filter(
    (p) => filter === "all" || p.category === filter || (filter === "events" && p.category === "life"),
  );

  return (
    <div>
      <div className="mt-[clamp(48px,6vw,80px)] mb-4 flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="display m-0 text-[clamp(28px,3vw,44px)] leading-none font-extrabold">Off the screen</h3>
        <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button key={f.id} type="button" className="chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid auto-rows-37.5 grid-cols-2 gap-3 sm:auto-rows-[clamp(150px,16vw,230px)] nav:grid-cols-4">
        {shown.map((p) => {
          const hasImage = Boolean(p.src);
          return (
            <figure
              key={p.title}
              className={`relative m-0 min-w-0 overflow-hidden rounded border border-line bg-bg-2 ${sizeClass[p.size ?? "normal"]}`}
            >
              {hasImage ? (
                <Image src={p.src!} alt={p.alt ?? p.title} fill sizes="(min-width: 900px) 50vw, 100vw" className="object-cover" />
              ) : (
                <div className="stripes absolute inset-0" aria-hidden />
              )}
              <span className="absolute top-2.5 left-2.5 rounded-full border border-line bg-bg px-2 py-0.75 font-mono text-[10px] font-medium uppercase tracking-widest">
                {p.category}
              </span>
              <figcaption
                className={`absolute inset-x-0 bottom-0 p-3 ${
                  hasImage ? "bg-linear-to-b from-transparent to-black/55 text-white" : "text-fg"
                }`}
              >
                <b className="block text-sm leading-tight font-semibold">{p.title}</b>
                <span className="font-mono text-[11px] opacity-80">{p.caption}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
