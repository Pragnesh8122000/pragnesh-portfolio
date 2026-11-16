interface SectionHeadingProps {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
}

/** h2, optional subtitle and metadata line shared by every section. */
export function SectionHeading({ id, title, subtitle, meta }: SectionHeadingProps) {
  return (
    <div className="mb-8 md:mb-10">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-6">
        <h2 id={id} className="t-section m-0">
          {title}
        </h2>
        {meta && <p className="t-label m-0 md:pb-1">{meta}</p>}
      </div>
      {subtitle && <p className="t-body mt-3 mb-0 max-w-[680px] text-muted">{subtitle}</p>}
    </div>
  );
}
