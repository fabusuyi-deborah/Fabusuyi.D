import type { ReactNode } from "react";
import { building } from "@/content/building";
import { photos, talks, timeline } from "@/content/about";
import { projects } from "@/content/projects";
import { about, now, site, socials, stackDetail } from "@/content/site";
import { articles } from "@/content/writing";

/** Things a command can ask the console to do besides printing. */
export interface ConsoleActions {
  clear: () => void;
  exit: () => void;
  toggleTheme: () => string;
}

export type CommandResult = ReactNode | void;
type Command = { help?: string; run: (args: string, actions: ConsoleActions) => CommandResult };

/* small styled helpers */
export const P = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>;
export const M = ({ children }: { children: ReactNode }) => <span className="text-muted">{children}</span>;
export const K = ({ children }: { children: ReactNode }) => <span className="text-warn">{children}</span>;
const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline">
    {children}
  </a>
);

const allProjects = [...projects, ...building.filter((b) => !projects.some((p) => p.id === b.id))];

export const commands: Record<string, Command> = {
  help: {
    run: () => (
      <>
        <M>available commands</M>
        {"\n"}
        {Object.entries(commands)
          .filter(([, c]) => c.help)
          .map(([name, c]) => (
            <span key={name}>
              {"  "}
              <K>{name.padEnd(14)}</K>
              {c.help}
              {"\n"}
            </span>
          ))}
      </>
    ),
  },
  whoami: {
    help: "who I am",
    run: () => (
      <>
        {site.name} <M>({site.handle})</M>
        {"\n"}role      {site.roleLong.toLowerCase()}
        {"\n"}at        {site.company} <M>({site.companyNote})</M>
        {"\n"}  Lagos, NG <M>· UTC+{site.utcOffset}</M>
        {site.openToWork && (
          <>
            {"\n"}status    <P>● open to work</P>
          </>
        )}
      </>
    ),
  },
  about: {
    help: "the longer story",
    run: () => [about.lead, ...about.paragraphs].join("\n\n"),
  },
  stack: {
    help: "tools I use daily",
    run: () => (
      <>
        {"{\n"}
        {Object.entries(stackDetail).map(([k, v], i, arr) => (
          <span key={k}>
            {"  "}
            <K>&quot;{k}&quot;</K>: {JSON.stringify(v).replace(/,/g, ", ")}
            {i < arr.length - 1 ? ",\n" : "\n"}
          </span>
        ))}
        {"}"}
      </>
    ),
  },
  "ls projects": {
    help: "list selected works",
    run: () => (
      <>
        {projects.map((p) => (
          <span key={p.id}>
            {p.status === "wip" ? <K>◌</K> : <P>●</P>} {p.id.padEnd(11)} {p.title.padEnd(16)}{" "}
            <M>{p.tags.slice(0, 3).join(" · ")}</M>
            {"\n"}
          </span>
        ))}
        {"\n"}
        <M>try</M> <K>open {projects[0]?.id}</K>
      </>
    ),
  },
  open: {
    help: "open a project, e.g. open plantlens",
    run: (id) => {
      if (!id) return <M>usage: open &lt;id&gt; · see ls projects</M>;
      const p = allProjects.find((x) => x.id === id);
      if (!p) return <><K>no project &quot;{id}&quot;</K>. try <K>ls projects</K></>;
      const note = "note" in p ? p.note : undefined;
      return (
        <>
          <P>{p.title}</P> — {p.description}
          {p.liveUrl && <>{"\n"}live  <A href={p.liveUrl}>{p.liveUrl}</A></>}
          {p.codeUrl && <>{"\n"}code  <A href={p.codeUrl}>{p.codeUrl.replace("https://", "")}</A></>}
          {!p.liveUrl && !p.codeUrl && <>{"\n"}<M>{note ?? "details soon"}</M></>}
        </>
      );
    },
  },
  building: {
    help: "what's in incubation",
    run: () => (
      <>
        <M># in incubation</M>
        {building.map((b) => (
          <span key={b.id}>
            {"\n"}
            {b.liveUrl ? <P>●</P> : <M>○</M>} {b.id.padEnd(11)} {b.title} <M>· {b.stage}</M>
            {b.liveUrl && <>{"\n"}{"              "}<A href={b.liveUrl}>{b.liveUrl}</A></>}
          </span>
        ))}
      </>
    ),
  },
  writing: {
    help: "selected articles",
    run: () =>
      articles.map((a, i) => (
        <span key={a.url}>
          → <A href={a.url}>{a.title}</A> <M>· {a.platform}</M>
          {"\n  "}
          <M>{a.summary}</M>
          {i < articles.length - 1 ? "\n" : ""}
        </span>
      )),
  },
  talks: {
    help: "speaking",
    run: () => (
      <>
        {talks.map((t) => (
          <span key={t.title}>
            {t.status === "upcoming" ? <K>◉ {t.badge.toLowerCase()}</K> : <M>○ {t.badge.toLowerCase()}</M>}  {t.when}
            {"\n            "}
            {t.title}
            {"\n"}
          </span>
        ))}
        {"\n"}
        <M>want me at your event?</M> <K>contact</K>
      </>
    ),
  },
  "ls photos": {
    help: "events & speaking photos",
    run: () => (
      <>
        {photos.map((p) => (
          <span key={p.title}>
            <M>{p.category.padEnd(9)}</M> {p.title} <M>· {p.caption}</M>
            {"\n"}
          </span>
        ))}
        {"\n"}
        <M>photos render in the normal view →</M> <K>exit</K>
      </>
    ),
  },
  "cat now.md": {
    help: "what I'm working on",
    run: () => (
      <>
        <M># now</M>
        {now.map((n) => `\n- ${n.charAt(0).toLowerCase()}${n.slice(1)}`)}
      </>
    ),
  },
  history: {
    help: "timeline",
    run: () =>
      timeline.map((t, i) => (
        <span key={t.title}>
          {t.current ? <P>{t.when.toLowerCase().padEnd(13)}</P> : t.when.replace(" — ", "–").padEnd(13)}
          {t.title} <M>· {t.detail}</M>
          {i < timeline.length - 1 ? "\n" : ""}
        </span>
      )),
  },
  contact: {
    help: "how to reach me",
    run: () => (
      <>
        email     {site.email}
        {socials.map((s) => (
          <span key={s.label}>
            {"\n"}
            {s.label.toLowerCase().padEnd(10)}
            <A href={s.url}>{s.handle}</A>
          </span>
        ))}
      </>
    ),
  },
  resume: {
    help: "download my CV",
    run: () => <>→ <A href={site.resume}>{site.resume.replace("/", "")}</A></>,
  },
  ls: {
    run: () => (
      <>
        projects/  photos/  now.md  resume.pdf{"\n"}
        <M>try</M> <K>ls projects</K>
      </>
    ),
  },
  theme: {
    help: "toggle light / dark",
    run: (_, a) => <><M>theme →</M> {a.toggleTheme()}</>,
  },
  clear: { help: "clear the screen", run: (_, a) => a.clear() },
  exit: {
    help: "back to the normal site",
    run: (_, a) => {
      a.exit();
      return <M>logout</M>;
    },
  },
};

const aliases: Record<string, string> = { quit: "exit", normal: "exit", projects: "ls projects", now: "cat now.md", cv: "resume" };

/** Resolve raw input to a command and its argument. */
export function resolve(raw: string): { cmd?: Command; args: string; name: string } {
  const input = raw.trim().toLowerCase().replace(/\s+/g, " ");
  const name = aliases[input] ?? input;
  if (commands[name]) return { cmd: commands[name], args: "", name };
  const [head, ...rest] = name.split(" ");
  if (commands[head]) return { cmd: commands[head], args: rest.join(" "), name: head };
  return { args: "", name };
}

/** Candidates for Tab completion. */
export const completions = Array.from(
  new Set([...Object.keys(commands), ...allProjects.map((p) => `open ${p.id}`)]),
);

export const quickCommands = ["whoami", "ls projects", "building", "talks", "writing", "contact", "help", "exit"];
