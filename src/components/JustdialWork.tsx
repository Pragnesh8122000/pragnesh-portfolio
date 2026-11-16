import { justdial } from '../content/portfolio';
import { SectionHeading } from './SectionHeading';
import { WorkRow } from './WorkRow';

export function JustdialWork() {
  return (
    <section aria-labelledby="work-title" className="section">
      <div className="container-page">
        <div id={justdial.id}>
          <SectionHeading id="work-title" title={justdial.title} subtitle={justdial.subtitle} meta={justdial.meta} />
        </div>
        <ul className="work-list" aria-label="Justdial work">
          {justdial.features.map((feature) => (
            <li key={feature.id}>
              <WorkRow feature={feature} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
