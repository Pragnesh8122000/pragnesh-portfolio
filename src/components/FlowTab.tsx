import type { CSSProperties } from 'react';
import type { Stage } from '../content/portfolio';

interface FlowTabProps {
  stage: Stage;
  offset: number;
  rotate: number;
}

/** One hero stage. Wrappers separate position, entrance, scroll motion and hover transforms. */
export function FlowTab({ stage, offset, rotate }: FlowTabProps) {
  const style = { '--k': offset, '--rz': `${rotate}deg` } as CSSProperties;
  return (
    <li className="flow-pos" style={style}>
      <div className="flow-enter">
        <div className="flow-scroll">
          <div className="flow-hover">
            <a className="flow-tab" href={`#${stage.target}`}>
              <span className="flow-tab-title">
                <span className="flow-tab-num">{stage.number}</span>
                <span className="flow-tab-name">{stage.title}</span>
                <span className="flow-tab-dot" aria-hidden="true" />
              </span>
              <span className="flow-tab-chips">
                {stage.chips.map((chip, i) => (
                  <span key={chip} className="contents">
                    {i > 0 && (
                      <span className="flow-arrow" aria-hidden="true">
                        →
                      </span>
                    )}
                    <span className="chip">{chip}</span>
                  </span>
                ))}
              </span>
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}
