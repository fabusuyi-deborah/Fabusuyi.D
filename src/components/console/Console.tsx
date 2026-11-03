"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/content/site";
import { getTheme, toggleTheme } from "@/lib/theme";
import { completions, quickCommands, resolve, K, M, P, type ConsoleActions } from "./commands";

type Line = { id: number; node: ReactNode; big?: boolean };

const legend: [string[], string][] = [
  [["help"], "List every command"],
  [["Tab"], "Autocomplete a command"],
  [["↑", "↓"], "Command history"],
  [["~"], "Switch Normal / Console"],
  [["T"], "Light / dark (outside input)"],
  [["exit"], "Back to the normal site"],
];

export function Console() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const historyIndex = useRef(0);
  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const booted = useRef(false);

  const print = (node: ReactNode, big = false) =>
    setLines((ls) => [...ls, { id: nextId.current++, node, big }]);

  const actions: ConsoleActions = {
    clear: () => setLines([]),
    exit: () => window.setTimeout(() => router.push("/"), 250),
    toggleTheme: () => {
      toggleTheme();
      return getTheme();
    },
  };

  const run = (raw: string) => {
    const text = raw.trim();
    print(<><P>➜</P> <M>~</M> {text}</>);
    if (!text) return;
    history.current.push(text);
    historyIndex.current = history.current.length;

    if (text.toLowerCase().startsWith("sudo")) {
      print(<><K>nice try.</K> <M>permission denied</M></>);
      return;
    }
    const { cmd } = resolve(text);
    if (!cmd) {
      print(<><K>command not found:</K> {text}. type <K>help</K></>);
      return;
    }
    const { args } = resolve(text);
    const out = cmd.run(args, actions);
    if (out !== undefined && out !== null) print(out);
  };

  // Boot sequence, once
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    print(<M>Last login: {new Date().toDateString()}</M>);
    print(<>{site.name.split(" ")[0]}<br />{site.name.split(" ").slice(1).join(" ")}</>, true);
    print(<M>{site.roleLong.toLowerCase()} · Lagos, NG</M>);
    print(<><M>type</M> <K>help</K> <M>for commands, or tap one below.</M>{"\n"}</>);
    run("whoami");
    inputRef.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp" && history.current.length) {
      e.preventDefault();
      historyIndex.current = Math.max(0, historyIndex.current - 1);
      setValue(history.current[historyIndex.current]);
    } else if (e.key === "ArrowDown" && history.current.length) {
      e.preventDefault();
      historyIndex.current = Math.min(history.current.length, historyIndex.current + 1);
      setValue(history.current[historyIndex.current] ?? "");
    } else if (e.key === "Tab" && value) {
      const matches = completions.filter((c) => c.startsWith(value.toLowerCase()));
      if (matches.length) e.preventDefault();
      if (matches.length === 1) setValue(matches[0]);
      else if (matches.length > 1) print(<M>{matches.join("   ")}</M>);
    }
  };

  return (
    <div className="grid min-h-130 grid-cols-1 gap-4 pt-2 pb-6 nav:h-[calc(100dvh-100px-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px))] nav:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex min-w-0 flex-col overflow-hidden rounded-md border border-line bg-bg-2">
        <div className="flex items-center justify-between gap-3 border-b border-line px-3.5 py-2.5 font-mono text-xs text-muted">
          <span className="flex gap-1.5" aria-hidden>
            <i className="size-2.25 rounded-full bg-line" />
            <i className="size-2.25 rounded-full bg-line" />
            <i className="size-2.25 rounded-full bg-line" />
          </span>
          <span className="truncate">deborah: ~/portfolio</span>
          <span>zsh</span>
        </div>

        <div
          ref={bodyRef}
          role="log"
          aria-live="polite"
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName !== "A" && !window.getSelection()?.toString())
              inputRef.current?.focus({ preventScroll: true });
          }}
          className="h-[60vh] cursor-text overflow-x-hidden overflow-y-auto p-4.5 font-mono text-[13.5px] leading-[1.7] nav:h-auto nav:flex-1"
        >
          {lines.map((l) => (
            <div
              key={l.id}
              className={
                l.big
                  ? "display my-1.5 mb-2.5 text-[clamp(40px,6vw,88px)] leading-[0.85] tracking-[0.01em]"
                  : "wrap-break-word whitespace-pre-wrap"
              }
            >
              {l.node}
            </div>
          ))}
          <label className="flex items-center gap-2">
            <P>➜</P>
            <M>~</M>
            <input
              ref={inputRef}
              id="console-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Console command"
              className="min-w-0 flex-1 border-0 bg-transparent text-fg caret-accent outline-none"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-line px-3.5 py-3" aria-label="Quick commands">
          {quickCommands.map((c) => (
            <button key={c} type="button" className="chip" onClick={() => run(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <aside aria-labelledby="legend-h" className="flex min-w-0 flex-col gap-3.5 overflow-auto rounded-md border border-line p-4.5">
        <h2 id="legend-h" className="m-0 font-mono text-xs font-semibold uppercase tracking-widest">
          Instructions
        </h2>
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-2.5 text-sm">
          {legend.map(([keys, desc]) => (
            <div key={desc} className="contents">
              <dt className="font-mono">
                {keys.map((k) => (
                  <kbd
                    key={k}
                    className="mr-1 inline-block min-w-6 rounded border border-b-2 border-line px-1.5 py-px text-center font-mono text-[11px]"
                  >
                    {k}
                  </kbd>
                ))}
              </dt>
              <dd className="m-0 text-muted">{desc}</dd>
            </div>
          ))}
        </dl>
        <p className="m-0 border-t border-dashed border-line pt-3 text-[13px] text-muted">
          Everything on the normal site lives here too. Start with <b className="text-fg">whoami</b>, then try{" "}
          <b className="text-fg">ls projects</b> and <b className="text-fg">building</b>.
        </p>
      </aside>
    </div>
  );
}
