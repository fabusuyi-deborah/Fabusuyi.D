"use client";

import { useState } from "react";

export function CopyButton({ text, targetId }: { text: string; targetId?: string }) {
  const [label, setLabel] = useState("Copy");

  const selectTarget = () => {
    const el = targetId ? document.getElementById(targetId) : null;
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    setLabel("Selected");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setLabel("Copied");
      window.setTimeout(() => setLabel("Copy"), 1600);
    } catch {
      selectTarget();
    }
  };

  return (
    <button type="button" className="chip" onClick={copy}>
      {label}
    </button>
  );
}
