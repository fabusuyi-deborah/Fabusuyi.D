import { cacheLife } from "next/cache";
import Link from "next/link";
import { navSections, now, site, socials } from "@/content/site";
import { CONSOLE_PATH } from "@/lib/theme";
import { Clock, TimeDifference } from "../Clock";
import { FooterBuildingLink } from "./FooterBuildingLink";
import { FittedWordmark } from "./FittedWordmark";

const linkClass = "inline-flex items-baseline gap-1.5 no-underline hover:text-accent";
const arrow = "font-mono text-[11px] text-muted";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-line pt-[clamp(48px,6vw,80px)]">
      <div className="grid grid-cols-2 gap-x-6 gap-y-9 nav:grid-cols-4">
        <div className="min-w-0">
          <span className="label">Navigate</span>
          <ul className="mt-3.5 flex flex-col gap-2 text-[15px]">
            <li><a href="#works" className={linkClass}>Works</a></li>
            <li><FooterBuildingLink className={linkClass} /></li>
            {navSections.slice(1).map((s) => (
              <li key={s.id}><a href={`#${s.id}`} className={linkClass}>{s.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <span className="label">Elsewhere</span>
          <ul className="mt-3.5 flex flex-col gap-2 text-[15px]">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {s.label} <span className={arrow}>↗</span>
                </a>
              </li>
            ))}
            <li>
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Resume <span className={arrow}>↗</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="min-w-0">
          <span className="label">Now</span>
          <ul className="mt-3.5 flex flex-col gap-2 text-[15px] text-muted">
            {now.map((n) => (
              <li key={n} className="flex items-baseline gap-2">
                <span className="font-mono text-accent" aria-hidden>›</span>
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <span className="label">Local time · Lagos</span>
          <Clock className="display mt-3 mb-1.5 block text-[clamp(44px,5vw,72px)] leading-none font-extrabold tracking-[0.01em] tabular-nums" />
          <TimeDifference className="m-0 font-mono text-xs text-muted" />
        </div>
      </div>

      <FittedWordmark text={site.wordmark} />

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-4 pb-6 font-mono text-xs tracking-[0.04em] text-muted">
        <span>© <CurrentYear /> {site.name}</span>
        <span className="inline-flex items-center gap-1.5">
          <i className="size-1.5 rounded-full bg-ok" aria-hidden />
          {site.version} · Next.js · TypeScript · Tailwind
        </span>
        <span className="flex flex-wrap gap-5">
          <Link href={CONSOLE_PATH} className="no-underline hover:text-accent">&gt;_ Open console</Link>
          <a href="#top" className="no-underline hover:text-accent">Back to top ↑</a>
        </span>
      </div>
    </footer>
  );
}
