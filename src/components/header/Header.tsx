"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { navSections, site } from "@/content/site";
import { CONSOLE_PATH, defaultThemeFor, setTheme } from "@/lib/theme";
import { Clock } from "../Clock";
import { BuildingMenu } from "./BuildingMenu";
import { MobileMenu } from "./MobileMenu";
import { ModeSwitch } from "./ModeSwitch";
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  const pathname = usePathname();
  const isConsole = pathname.startsWith(CONSOLE_PATH);

  // Each mode opens in its own default theme; the toggle can override it.
  useEffect(() => {
    setTheme(defaultThemeFor(pathname));
  }, [pathname]);

  return (
    <header
      className="sticky top-[env(safe-area-inset-top,0px)] z-20 grid grid-cols-[1fr_auto] items-center gap-4 bg-bg py-4.5 text-sm leading-[1.35] nav:grid-cols-[1fr_1fr_1fr_auto] nav:items-start"
    >
      <Link href="/" aria-label={`${site.name}, home`} className="display text-[26px] leading-none tracking-[0.02em] no-underline">
        {site.wordmark.split(".")[0]}
        <span className="text-accent">.</span>
        {site.wordmark.split(".")[1]}
      </Link>

      <div className="hidden nav:block">
         {site.location}
        <br />
        <Clock className="font-mono text-xs tracking-[0.04em]" />{" "}
        <span className="font-mono text-xs text-muted">{site.timeZoneLabel}</span>
      </div>

      <nav aria-label="Primary" className={`hidden nav:block ${isConsole ? "invisible h-0 overflow-hidden" : ""}`}>
        <ul>
          <li>
            <Link href="/#works" className="no-underline hover:text-accent">
              <kbd className="mr-1.5 font-mono text-[10px] text-muted">1</kbd>Works
            </Link>
          </li>
          <BuildingMenu />
          {navSections.slice(1).map((s) => (
            <li key={s.id}>
              <Link href={`/#${s.id}`} className="no-underline hover:text-accent">
                <kbd className="mr-1.5 font-mono text-[10px] text-muted">{s.key}</kbd>
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {!isConsole ? <MobileMenu /> : <span className="nav:hidden" />}

      <div className="col-span-full flex items-center justify-between gap-2 nav:col-span-1 nav:flex-col nav:items-end">
        <div className="flex items-center gap-2">
          <ModeSwitch isConsole={isConsole} />
          <ThemeToggle />
        </div>
        {site.openToWork && (
          <span className="hidden items-center gap-1.5 font-mono text-xs tracking-[0.04em] min-[480px]:inline-flex">
            <i className="pulse-dot" aria-hidden />
            Open to work
          </span>
        )}
      </div>
    </header>
  );
}
