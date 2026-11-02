export function SectionHead({
  id,
  title,
  aside,
}: {
  id: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-[clamp(28px,4vw,48px)] flex flex-wrap items-end justify-between gap-4">
      <h2 id={id} className="section-title m-0">
        {title}
      </h2>
      {aside}
    </div>
  );
}

export function Section({
  id,
  labelledBy,
  children,
  className = "",
}: {
  id: string;
  labelledBy: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`border-t border-line py-[clamp(56px,8vw,112px)] ${className}`}>
      {children}
    </section>
  );
}
