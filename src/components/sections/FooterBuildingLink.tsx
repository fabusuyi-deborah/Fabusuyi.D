"use client";

import { OPEN_MENU, TOGGLE_BUILDING, emit, isCompactNav } from "@/lib/events";

/** Toggles the header "Building" dropdown (or opens the mobile menu on small screens). */
export function FooterBuildingLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      data-building-trigger
      className={`cursor-pointer ${className ?? ""}`}
      onClick={() => {
        emit(isCompactNav() ? OPEN_MENU : TOGGLE_BUILDING);
      }}
    >
      Building <span className="font-mono text-[11px] text-muted">▴</span>
    </button>
  );
}
