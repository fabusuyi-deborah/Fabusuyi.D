import { articles, writingProfiles } from "@/content/writing";
import { Section, SectionHead } from "./SectionHead";

export function Writing() {
  return (
    <Section id="writing" labelledBy="writing-h">
      <SectionHead
        id="writing-h"
        title="Writing"
        aside={
          <span className="flex flex-wrap gap-4">
            {writingProfiles.map((p) => (
              <a key={p.label} className="label no-underline hover:text-accent" href={p.url} target="_blank" rel="noopener noreferrer">
                 {p.label} ↗
              </a>
            ))}
          </span>
        }
      />
      <ul className="border-t border-line">
        {articles.map((a) => (
          <li key={a.url} className="border-b border-line">
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 py-5.5 no-underline nav:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto_auto]"
            >
              <h3 className="m-0 text-[clamp(18px,1.8vw,24px)] leading-tight font-medium group-hover:text-accent">{a.title}</h3>
              <p className="col-start-1 m-0 text-sm text-muted nav:col-start-auto">{a.summary}</p>
              <span className="label hidden nav:inline">{a.platform}</span>
              <span className="col-start-2 row-start-1 font-mono text-muted transition-transform group-hover:translate-x-0.75 group-hover:-translate-y-0.75 group-hover:text-accent nav:col-start-auto nav:row-start-auto">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
