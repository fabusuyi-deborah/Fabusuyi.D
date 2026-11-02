"use client";

import Link from "next/link";
import { useState } from "react";
import { site, socials } from "@/content/site";
import { CONSOLE_PATH } from "@/lib/theme";
import { DroneField } from "./DroneField";

export function Hero() {
  const [hud, setHud] = useState("FIELD · 8 UAV · TRACKING");
  const [before, highlight, after] = splitTagline(site.tagline);

  return (
    <div className="relative overflow-hidden pt-[clamp(40px,8vw,96px)] pb-7" aria-labelledby="hero-title">
      <DroneField onStatus={setHud} />

      <div className="pointer-events-none relative z-10">
        <h1
          id="hero-title"
          className="display m-0 text-[clamp(76px,18.5vw,300px)] leading-[0.82] tracking-[-0.005em]"
        >
          <span className="block">{site.role.split(" ")[0]}</span>
          <span className="flex flex-wrap-reverse items-end justify-end gap-[clamp(12px,2vw,28px)]">
            <span className="max-w-[28ch] pb-[1.2em] text-right font-mono text-[clamp(12px,1.1vw,15px)] leading-[1.4] font-normal tracking-normal text-muted normal-case">
              {"// "}
              {before}
              <b className="font-medium text-accent">{highlight}</b>
              {after}
            </span>
            <span>{site.role.split(" ").slice(1).join(" ")}</span>
          </span>
        </h1>
      </div>

      <p className="relative z-10 mt-6 max-w-[46ch] text-[clamp(16px,1.4vw,19px)] leading-normal">{site.intro}</p>

      <div className="relative z-10 mt-5 flex flex-wrap gap-2.5">
        <a className="btn btn-solid no-underline" href={site.resume} target="_blank" rel="noopener noreferrer">
          Resume ↗
        </a>
        <Link className="btn no-underline" href={CONSOLE_PATH}>
          Explore in console <kbd className="opacity-60">~</kbd>
        </Link>
      </div>

      <div className="relative z-10 mt-[clamp(32px,5vw,64px)] grid grid-cols-2 gap-4 font-mono text-xs tracking-[0.04em] sm:grid-cols-3">
        <span>{site.activeYears}</span>
        <span className="hidden text-center sm:block">
          {socials.map((s, i) => (
            <span key={s.label}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-accent">
                {s.short}
              </a>
              {i < socials.length - 1 ? ", " : ""}
            </span>
          ))}
        </span>
        <span className="text-right" aria-live="off">{hud}</span>
      </div>
    </div>
  );
}

/** Highlights the phrase between "building " and ", and" in the tagline. */
function splitTagline(t: string): [string, string, string] {
  const m = t.match(/^(building )(.+?)(, and .*)$/);
  return m ? [m[1], m[2], m[3]] : [t, "", ""];
}
