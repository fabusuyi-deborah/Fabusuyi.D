import Image from "next/image";
import type { ReactNode } from "react";
import { projects, statusLabel } from "@/content/projects";
import type { Project } from "@/content/types";
import { Section, SectionHead } from "./SectionHead";

export function Works() {
  return (
    <Section id="works" labelledBy="works-h">
      <SectionHead
        id="works-h"
        title={
          <>
            Selected
            <br />
            works <em className="text-accent not-italic">24—26</em>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-x-[clamp(16px,2vw,24px)] gap-y-[clamp(20px,3vw,40px)] md:grid-cols-2">
        {projects.slice(0, 4).map((p) => (
          <WorkCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  );
}

function WorkCard({ project: p }: { project: Project }) {
  return (
    <article className="group flex min-w-0 flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs tracking-[0.04em] text-muted">
          {p.codeUrl ? (
            <a href={p.codeUrl} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-accent">
              ~/{p.repo}
            </a>
          ) : (
            `~/${p.repo}`
          )}
        </span>
        <span className={`pill pill-${p.status}`}>{statusLabel[p.status]}</span>
      </div>

      <Preview
        href={p.liveUrl}
        label={`Open ${p.title} live site`}
        className="relative block aspect-16/10 max-w-full overflow-hidden rounded bg-[#111] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[.985]"
      >
        {p.image ? (
          <Image
            src={p.image}
            alt={`${p.title} screenshot`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className={`ph ph-${p.placeholder}`} role="img" aria-label={`${p.title} preview placeholder`} />
        )}
        <div className="absolute inset-x-0 top-0 z-10 flex h-5.5 items-center gap-1.25 bg-white/10 px-2.5">
          <i className="size-1.5 rounded-full bg-white/35" />
          <i className="size-1.5 rounded-full bg-white/35" />
          <i className="size-1.5 rounded-full bg-white/35" />
          <span className="ml-2.5 font-mono text-[10px] text-white/60">{p.displayUrl}</span>
        </div>
      </Preview>

      <h3 className="display m-0 text-[clamp(28px,2.6vw,40px)] leading-none font-extrabold">{p.title}</h3>
      <p className="m-0 max-w-[60ch] text-muted">{p.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <span key={t} className="rounded-[3px] bg-accent-soft px-2 py-0.75 font-mono text-[11px]">
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-4 font-mono text-xs font-medium uppercase tracking-[0.08em]">
        {p.liveUrl && (
          <a className="text-link" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
            Live ↗
          </a>
        )}
        {p.codeUrl ? (
          <a className="text-link" href={p.codeUrl} target="_blank" rel="noopener noreferrer">
            Code ↗
          </a>
        ) : (
          <span className="text-muted">{p.note ?? "Repo soon"}</span>
        )}
      </div>
    </article>
  );
}

function Preview({ href, label, className, children }: { href?: string; label: string; className: string; children: ReactNode }) {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={className}>
      {children}
    </a>
  );
}
