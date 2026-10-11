import { justdial } from '../content/portfolio';
import { Carousel } from './Carousel';
import { FeatureTab } from './FeatureTab';
import { SectionHeading } from './SectionHeading';

export function JustdialWork() {
  return (
    <section aria-labelledby="work-title" className="section">
      <div className="container-page">
        <div id={justdial.id}>
          <SectionHeading
            id="work-title"
            badge={justdial.badge}
            title={justdial.title}
            subtitle={justdial.subtitle}
            meta={justdial.meta}
          />
        </div>
        <Carousel label="Justdial work">
          {justdial.features.map((feature) => (
            <FeatureTab key={feature.id} feature={feature} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
