import { stages } from '../content/portfolio';
import { FlowTab } from './FlowTab';

/**
 * Pile geometry. Offsets are multiples of the pile step in flow.css; rotations apply on
 * desktop only (phones show the stages as a flat grid).
 */
export const pileGeometry = {
  offsets: [0, 1, 2, 1, 0, 1],
  rotations: [-4, -2, -1, 0, 2, 3]
} as const;

/**
 * Hero stage pile. The rail and its packet are decorative; useFlowMotion sends the packet
 * down the rail once on load and again whenever the replay button is pressed.
 */
export function FlowPile({ caption, replayLabel }: { caption: string; replayLabel: string }) {
  return (
    <figure className="flow-scene m-0">
      <nav aria-label="Flow stages" className="flow-pile">
        <div className="flow-plane">
          <span className="flow-rail" aria-hidden="true" />
          <span className="flow-packet" aria-hidden="true" />
          <ol className="flow-list">
            {stages.map((stage, i) => (
              <FlowTab
                key={stage.number}
                stage={stage}
                index={i}
                offset={pileGeometry.offsets[i]}
                rotate={pileGeometry.rotations[i]}
              />
            ))}
          </ol>
        </div>
      </nav>
      <figcaption className="flow-caption">
        <span>{caption}</span>
        <button type="button" className="flow-replay" data-flow-replay>
          {replayLabel}
        </button>
      </figcaption>
    </figure>
  );
}
