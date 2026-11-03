import { talks } from "@/content/about";
import { Section, SectionHead } from "./SectionHead";

export function Speaking() {
  return (
    <Section id="speaking" labelledBy="speaking-h">
      <SectionHead
        id="speaking-h"
        title={
          <>
            Speak<em className="text-accent not-italic">ing</em>
          </>
        }
        aside={<span className="label">Talks, panels, community</span>}
      />
      <ul className="border-t border-line">
        {talks.map((t) => (
          <li
            key={t.title}
            className="grid grid-cols-1 items-baseline gap-x-6 gap-y-2 border-b border-line py-6 nav:grid-cols-[140px_minmax(0,1fr)_auto]"
          >
            <span className="col-span-full row-start-1 font-mono text-xs text-muted nav:col-span-1">{t.when}</span>
            <div className="contents">
              <h3 className="row-start-3 m-0 mb-1 text-[clamp(19px,2vw,26px)] leading-tight font-medium nav:col-start-2 nav:row-start-1">
                {t.url ? (
                  <a href={t.url} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-accent">
                    {t.title}
                  </a>
                ) : (
                  t.title
                )}
              </h3>
              <span className={`pill row-start-2 justify-self-start nav:col-start-3 nav:row-start-1 ${t.status === "upcoming" ? "pill-upcoming" : ""}`}>
                {t.status === "upcoming" && <i className="size-1.5 rounded-full bg-warn animate-pulse-ring" aria-hidden />}
                {t.badge}
              </span>
              <p className="row-start-4 m-0 text-sm text-muted nav:col-start-2 nav:row-start-2">{t.description}</p>
            </div>
          </li>
        ))}
        <li className="grid grid-cols-1 items-baseline gap-x-6 gap-y-2 border-b border-line py-6 nav:grid-cols-[140px_minmax(0,1fr)_auto]">
          <span className="col-span-full row-start-1 font-mono text-xs text-muted nav:col-span-1">Your next event</span>
          <div className="contents">
            <h3 className="row-start-2 m-0 mb-1 text-[clamp(19px,2vw,26px)] leading-tight font-medium nav:col-start-2 nav:row-start-1">
              Have a stage, panel or podcast in mind?
            </h3>
            <a href="#contact" className="pill pill-live row-start-3 justify-self-start no-underline nav:col-start-3 nav:row-start-1">
              Invite me
            </a>
            <p className="row-start-4 m-0 text-sm text-muted nav:col-start-2 nav:row-start-2">
              I speak on frontend craft, technical writing and moving into tech from a non-CS degree.
            </p>
          </div>
        </li>
      </ul>
    </Section>
  );
}
