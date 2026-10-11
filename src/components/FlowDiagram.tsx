import type { Diagram } from '../content/portfolio';

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <span className={`fd-arrow${down ? ' fd-arrow--down' : ''}`} aria-hidden="true">
      <svg width="28" height="12" viewBox="0 0 28 12" focusable="false">
        <line x1="0" y1="6" x2="22" y2="6" stroke="currentColor" strokeWidth="2" />
        <path d="M20 1 L27 6 L20 11" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </span>
  );
}

/** Simplified real data flow: a chain of steps, then the systems it fans out to. */
export function FlowDiagram({ diagram }: { diagram: Diagram }) {
  return (
    <figure className="fd m-0" aria-label={diagram.label}>
      <ol className="fd-chain">
        {diagram.steps.map((step, i) => (
          <li key={step} className="contents">
            {i > 0 && <Arrow />}
            <span className="fd-step">{step}</span>
          </li>
        ))}
      </ol>
      <Arrow down />
      <ul className="fd-targets" aria-label="Sends to">
        {diagram.targets.map((target) => (
          <li key={target} className="fd-target">
            {target}
          </li>
        ))}
      </ul>
      {diagram.via && <figcaption className="fd-via">{diagram.via}</figcaption>}
    </figure>
  );
}
