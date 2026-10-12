import { useId, useState } from 'react';
import type { Feature } from '../content/portfolio';
import { FlowDiagram } from './FlowDiagram';

/**
 * Work card: ruled stage header, story, optional diagram and details, metric pinned to the bottom.
 * On phones the story collapses behind a toggle so a stack of cards scans as titles and metrics.
 */
export function FeatureTab({ feature }: { feature: Feature }) {
  const [open, setOpen] = useState(false);
  const moreId = useId();
  return (
    <article id={feature.id} aria-labelledby={`${feature.id}-title`} className="edge-wrap h-full">
      <div className="edge-back" aria-hidden="true" />
      <div className="edge-face flex flex-col" style={{ boxShadow: 'var(--tab-shadow)' }}>
        <p className="tab-header t-eyebrow m-0">{feature.header}</p>
        <div className="flex flex-1 flex-col p-6">
          <h3 id={`${feature.id}-title`} className="t-feature m-0">
            {feature.title}
          </h3>
          <div id={moreId} className="card-more" data-open={open}>
            <p className="t-body mt-2 mb-0 max-w-[65ch] text-ink">{feature.body}</p>
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
              <a href={`#${feature.caseStudy}`} className="text-link mt-4 inline-flex min-h-11 items-center gap-2">
                Read the case study <span aria-hidden="true">↓</span>
              </a>
            )}
          </div>
          {feature.metric && (
            <>
              {/* Keeps at least 20px above the metric and pins it to the bottom when cards share a height. */}
              <div className="min-h-5 flex-1" aria-hidden="true" />
              <p className="m-0 border-t border-rule pt-4">
                <span className="t-metric mr-3 inline-block whitespace-nowrap text-accent">{feature.metric.value}</span>
                <span className="t-meta inline-block text-muted">
                  {feature.metric.label}
                  {feature.metric.note && <span className="italic"> · {feature.metric.note}</span>}
                </span>
              </p>
            </>
          )}
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
      </div>
    </article>
  );
}
