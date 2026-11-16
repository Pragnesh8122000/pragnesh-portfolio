import { useId, useState } from 'react';
import type { Feature } from '../content/portfolio';
import { FlowDiagram } from './FlowDiagram';

/**
 * One piece of work as a ruled row: stage label, story with optional diagram and details, metric
 * on the right, so a whole employer scans top to bottom without sideways scrolling.
 * On phones the story collapses behind a toggle so the list reads as titles and metrics.
 */
export function WorkRow({ feature }: { feature: Feature }) {
  const [open, setOpen] = useState(false);
  const moreId = useId();
  return (
    <article id={feature.id} aria-labelledby={`${feature.id}-title`} className="work-row">
      <p className="work-row-key t-label">{feature.header}</p>
      <div className="work-row-main">
        <h3 id={`${feature.id}-title`} className="t-feature m-0">
          {feature.title}
        </h3>
        <div id={moreId} className="card-more" data-open={open}>
          <p className="t-body mt-2 mb-0 max-w-[62ch] text-ink">{feature.body}</p>
          {feature.diagram && (
            <div className="mt-5">
              <FlowDiagram diagram={feature.diagram} />
            </div>
          )}
          {feature.details && (
            <dl className="case-details">
              {feature.details.map((detail) => (
                <div key={detail.label} className="contents">
                  <dt>{detail.label}</dt>
                  <dd>{detail.text}</dd>
                </div>
              ))}
            </dl>
          )}
          {feature.caseStudy && (
            <a href={`#${feature.caseStudy}`} className="text-link mt-3 inline-flex min-h-11 items-center gap-2">
              Read the case study{' '}
              <span className="nudge nudge--down" aria-hidden="true">
                ↓
              </span>
            </a>
          )}
        </div>
        <button
          type="button"
          className="card-toggle"
          aria-expanded={open}
          aria-controls={moreId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Hide details' : 'Show details'} <span aria-hidden="true">{open ? '▴' : '▾'}</span>
        </button>
      </div>
      {feature.metric && (
        <p className="work-row-metric">
          <span className="t-metric whitespace-nowrap">{feature.metric.value}</span>
          <span className="t-meta">
            {feature.metric.label}
            {feature.metric.note && <span className="italic"> · {feature.metric.note}</span>}
          </span>
        </p>
      )}
    </article>
  );
}
