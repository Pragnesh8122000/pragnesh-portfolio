import type { Feature } from '../content/portfolio';
import { FlowDiagram } from './FlowDiagram';

/** Work card: ruled stage header, story, optional diagram and details, metric pinned to the bottom. */
export function FeatureTab({ feature }: { feature: Feature }) {
  return (
    <article id={feature.id} aria-labelledby={`${feature.id}-title`} className="edge-wrap h-full">
      <div className="edge-back" aria-hidden="true" />
      <div className="edge-face flex flex-col" style={{ boxShadow: 'var(--tab-shadow)' }}>
        <p className="tab-header t-eyebrow m-0">{feature.header}</p>
        <div className="flex flex-1 flex-col p-6">
          <h3 id={`${feature.id}-title`} className="t-feature m-0">
            {feature.title}
          </h3>
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
        </div>
      </div>
    </article>
  );
}
