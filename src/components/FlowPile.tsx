import { stages } from '../content/portfolio';
import { FlowRail } from './FlowRail';
import { FlowTab } from './FlowTab';

/**
 * Pile geometry. Offsets are multiples of the responsive step in flow.css
 * (26px desktop, 12px compact, 8px at 320px); rotations apply on desktop only.
 */
export const pileGeometry = {
  offsets: [0, 1, 2, 1, 0, 1],
  rotations: [-4, -2, -1, 0, 2, 3]
} as const;

export function FlowPile({ caption }: { caption: string }) {
  return (
    <figure className="flow-scene m-0">
      <nav aria-label="Flow stages" className="flow-pile">
        <div className="flow-plane">
          <FlowRail />
          <ol className="flow-list">
            {stages.map((stage, i) => (
              <FlowTab
                key={stage.number}
                stage={stage}
                offset={pileGeometry.offsets[i]}
                rotate={pileGeometry.rotations[i]}
              />
            ))}
          </ol>
        </div>
      </nav>
      <figcaption className="flow-caption">{caption}</figcaption>
    </figure>
  );
}
