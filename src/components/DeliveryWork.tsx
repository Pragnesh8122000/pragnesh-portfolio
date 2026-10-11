import { delivery } from '../content/portfolio';
import { Carousel } from './Carousel';
import { FeatureTab } from './FeatureTab';
import { SectionHeading } from './SectionHeading';

export function DeliveryWork() {
  return (
    <section aria-labelledby="delivery-title" className="section">
      <div className="container-page">
        <div id={delivery.id}>
          <SectionHeading
            id="delivery-title"
            badge={delivery.badge}
            title={delivery.title}
            subtitle={delivery.subtitle}
            meta={delivery.meta}
          />
        </div>

        <Carousel label="Mypcot work">
          <FeatureTab feature={delivery.migration} />
          <FeatureTab feature={delivery.dispatch} />
        </Carousel>

        <h3 className="t-eyebrow mt-12 mb-0 text-accent">Also shipped at Mypcot</h3>
        <div className="mt-3">
          <Carousel label="Also shipped at Mypcot" size="narrow">
            {delivery.alsoShipped.map((item) => (
              <article key={item.heading} className="edge-wrap h-full">
                <div className="edge-back" aria-hidden="true" />
                <div className="edge-face edge-face--top p-6">
                  <p className="t-metric m-0 whitespace-nowrap text-accent">{item.value}</p>
                  <h4 className="t-feature mt-2 mb-0">{item.heading}</h4>
                  <p className="t-body mt-2 mb-0 text-ink">{item.text}</p>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
