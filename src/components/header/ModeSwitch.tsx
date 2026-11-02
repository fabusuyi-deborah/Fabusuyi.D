"use client";

import Link from "next/link";
import { CONSOLE_PATH } from "@/lib/theme";

const base =
  "rounded-full px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] no-underline";

export function ModeSwitch({ isConsole }: { isConsole: boolean }) {
  return (
    <div role="group" aria-label="View mode" className="inline-flex gap-0.5 rounded-full border border-line p-0.5">
      <Link
        href="/"
        aria-current={!isConsole ? "page" : undefined}
        className={`${base} ${!isConsole ? "bg-fg text-bg" : "text-muted hover:text-accent"}`}
      >
        Normal
      </Link>
      <Link
        href={CONSOLE_PATH}
        aria-current={isConsole ? "page" : undefined}
        className={`${base} ${isConsole ? "bg-fg text-bg" : "text-muted hover:text-accent"}`}
      >
        &gt;_ Console
      </Link>
    </div>
  );
}
