import { delivery } from '../content/portfolio';
import { SectionHeading } from './SectionHeading';
import { WorkRow } from './WorkRow';

export function DeliveryWork() {
  return (
    <section aria-labelledby="delivery-title" className="section">
      <div className="container-page">
        <div id={delivery.id}>
          <SectionHeading id="delivery-title" title={delivery.title} subtitle={delivery.subtitle} meta={delivery.meta} />
        </div>

        <ul className="work-list" aria-label="Mypcot work">
          <li>
            <WorkRow feature={delivery.migration} />
          </li>
          <li>
            <WorkRow feature={delivery.dispatch} />
          </li>
        </ul>

        <h3 className="t-label mt-14 mb-0">Also shipped at Mypcot</h3>
        <ul className="shipped-grid" aria-label="Also shipped at Mypcot">
          {delivery.alsoShipped.map((item) => (
            <li key={item.heading}>
              <p className="t-metric m-0 whitespace-nowrap">{item.value}</p>
              <h4 className="t-feature mt-3 mb-0">{item.heading}</h4>
              <p className="t-body mt-2 mb-0 max-w-[46ch] text-ink">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
