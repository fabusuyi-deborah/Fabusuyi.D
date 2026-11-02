"use client";

import { useEffect, useRef } from "react";

/** Giant footer wordmark scaled to exactly fill the container width, cropped at the baseline. */
export function FittedWordmark({ text }: { text: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const inner = innerRef.current;
    if (!box || !inner) return;
    const fit = () => {
      if (!box.clientWidth) return;
      box.style.fontSize = "100px";
      box.style.fontSize = `${(100 * box.clientWidth) / inner.offsetWidth * 0.995}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden
      className="display mt-[clamp(40px,6vw,88px)] h-[0.76em] overflow-hidden leading-[0.8] select-none"
      style={{ fontSize: "16vw" }}
    >
      <span ref={innerRef} className="inline-flex whitespace-nowrap">
        {text.split("").map((c, i) => (
          <span
            key={i}
            className={`inline-block transition-[transform,color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:translate-y-[-0.08em] hover:text-accent ${
              c === "." ? "text-accent" : ""
            }`}
          >
            {c}
          </span>
        ))}
      </span>
    </div>
  );
}
