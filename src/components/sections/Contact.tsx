import { site, socials } from "@/content/site";
import { CopyButton } from "../CopyButton";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h" className="border-t border-line py-[clamp(56px,8vw,112px)]">
      <h2 id="contact-h" className="display m-0 text-[clamp(64px,15vw,240px)] leading-[0.82]">
        Let&apos;s work
        <br />
        <em className="text-accent not-italic">together</em>
      </h2>
      <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <a
            id="contact-email"
            href={`mailto:${site.email}`}
            className="font-mono text-[clamp(16px,2vw,24px)] font-medium break-all no-underline select-all hover:text-accent"
          >
            {site.email}
          </a>
          <CopyButton text={site.email} targetId="contact-email" />
        </div>
        <div className="flex flex-wrap gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-medium uppercase tracking-widest no-underline hover:text-accent"
            >
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
