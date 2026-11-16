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
            title={caseStudies.title}
            subtitle={caseStudies.subtitle}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.items.map((study) => {
            const [before, after] = [study.parts.slice(0, 2), study.parts.slice(2)];
            return (
              <article key={study.id} id={study.id} aria-labelledby={`${study.id}-title`} className="panel">
                <p className="panel-key t-label">{study.header}</p>
                <div className="panel-body">
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
