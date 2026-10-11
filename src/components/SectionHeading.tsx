interface SectionHeadingProps {
  id: string;
  badge: string;
  title: string;
  subtitle?: string;
  meta?: string;
}

/** Badge, h2, optional slogan subtitle and metadata line shared by every section. */
export function SectionHeading({ id, badge, title, subtitle, meta }: SectionHeadingProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="badge t-eyebrow">{badge}</span>
          <h2 id={id} className="t-section m-0">
            {title}
          </h2>
        </div>
        {meta && <p className="t-meta m-0 tracking-[0.06em] text-muted">{meta}</p>}
      </div>
      {subtitle && <p className="t-body mt-3 mb-0 max-w-[680px] text-muted">{subtitle}</p>}
    </div>
  );
}
