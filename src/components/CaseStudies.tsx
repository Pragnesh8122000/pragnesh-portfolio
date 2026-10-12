import { caseStudies } from '../content/portfolio';
import { FlowDiagram } from './FlowDiagram';
import { OwnerFactRow } from './OwnerFactRow';
import { SectionHeading } from './SectionHeading';

/** Long-form versions of the Kafka and migration cards: problem, ownership, design, tradeoff, result. */
export function CaseStudies() {
  return (
    <section aria-labelledby="case-studies-title" className="section">
      <div className="container-page">
        <div id={caseStudies.id}>
          <SectionHeading
            id="case-studies-title"
            badge={caseStudies.badge}
            title={caseStudies.title}
            subtitle={caseStudies.subtitle}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.items.map((study) => {
            const [before, after] = [study.parts.slice(0, 2), study.parts.slice(2)];
            return (
              <article key={study.id} id={study.id} aria-labelledby={`${study.id}-title`} className="edge-wrap h-full">
                <div className="edge-back" aria-hidden="true" />
                <div className="edge-face edge-face--top flex flex-col">
                  <p className="tab-header t-eyebrow m-0">{study.header}</p>
                  <div className="p-6">
                    <h3 id={`${study.id}-title`} className="t-feature m-0">
                      {study.title}
                    </h3>
                    <dl className="case-details">
                      {before.map((fact) => (
                        <OwnerFactRow key={fact.label} fact={fact} />
                      ))}
                      <div className="contents">
                        <dt>Design</dt>
                        <dd>
                          <FlowDiagram diagram={study.diagram} />
                        </dd>
                      </div>
                      {after.map((fact) => (
                        <OwnerFactRow key={fact.label} fact={fact} />
                      ))}
                    </dl>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
