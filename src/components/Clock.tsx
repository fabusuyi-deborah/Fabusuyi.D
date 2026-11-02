"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export function Clock({ className }: { className?: string }) {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time className={className} suppressHydrationWarning>
      {time}
    </time>
  );
}

/** "2h ahead of you" relative to the visitor's own time zone. */
const baseLabel = `${site.timeZoneLabel} · UTC+${site.utcOffset}`;
const noSubscribe = () => () => {};

function timeDifferenceText() {
  const visitorOffset = -new Date().getTimezoneOffset() / 60;
  const diff = site.utcOffset - visitorOffset;
  const rel = diff === 0 ? "same time as you" : `${Math.abs(diff)}h ${diff > 0 ? "ahead of" : "behind"} you`;
  return `${baseLabel} · ${rel}`;
}

export function TimeDifference({ className }: { className?: string }) {
  const text = useSyncExternalStore(noSubscribe, timeDifferenceText, () => baseLabel);
  return <p className={className}>{text}</p>;
}
