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
            className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-2 border-b border-line py-6 nav:grid-cols-[140px_minmax(0,1fr)_auto]"
          >
            <span className="col-span-full font-mono text-xs text-muted nav:col-span-1">{t.when}</span>
            <div className="min-w-0">
              <h3 className="m-0 mb-1 text-[clamp(19px,2vw,26px)] leading-tight font-medium">
                {t.url ? (
                  <a href={t.url} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-accent">
                    {t.title}
                  </a>
                ) : (
                  t.title
                )}
              </h3>
              <p className="m-0 text-sm text-muted">{t.description}</p>
            </div>
            <span className={`pill ${t.status === "upcoming" ? "pill-upcoming" : ""}`}>
              {t.status === "upcoming" && <i className="size-1.5 rounded-full bg-warn animate-pulse-ring" aria-hidden />}
              {t.badge}
            </span>
          </li>
        ))}
        <li className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-2 border-b border-line py-6 nav:grid-cols-[140px_minmax(0,1fr)_auto]">
          <span className="col-span-full font-mono text-xs text-muted nav:col-span-1">Your next event</span>
          <div className="min-w-0">
            <h3 className="m-0 mb-1 text-[clamp(19px,2vw,26px)] leading-tight font-medium">
              Have a stage, panel or podcast in mind?
            </h3>
            <p className="m-0 text-sm text-muted">
              I speak on frontend craft, technical writing and moving into tech from a non-CS degree.
            </p>
          </div>
          <a href="#contact" className="pill pill-live no-underline">
            Invite me
          </a>
        </li>
      </ul>
    </Section>
  );
}
