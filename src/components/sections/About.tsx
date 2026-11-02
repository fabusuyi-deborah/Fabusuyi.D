import { about } from "@/content/site";
import { timeline } from "@/content/about";
import { Gallery } from "./Gallery";
import { Section, SectionHead } from "./SectionHead";

export function About() {
  return (
    <Section id="about" labelledBy="about-h">
      <SectionHead id="about-h" title="About" aside={<span className="label">Plant biology → frontend</span>} />

      <div className="grid grid-cols-1 gap-[clamp(24px,5vw,80px)] nav:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-4 max-w-[60ch] text-[clamp(20px,2vw,26px)] leading-[1.35]">{about.lead}</p>
          {about.paragraphs.map((p) => (
            <p key={p} className="mb-4 max-w-[60ch] text-base">
              {p}
            </p>
          ))}
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {about.stack.map((s) => (
              <li key={s} className="rounded-[3px] border border-line px-2.5 py-1 font-mono text-xs">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <ol className="min-w-0 text-sm" aria-label="Timeline">
          {timeline.map((t, i) => (
            <li
              key={t.title}
              className={`grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-4 ${
                i === 0 ? "border-t" : ""
              }`}
            >
              <span className={`font-mono text-xs tabular-nums ${t.current ? "text-accent" : "text-muted"}`}>{t.when}</span>
              <div>
                <b className="block font-semibold">{t.title}</b>
                <span className="text-muted">{t.detail}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <Gallery />
    </Section>
  );
}
