import { flowIndex, indexItems, type StageId } from '../content/portfolio';

export function FlowIndex({ active }: { active: StageId | null }) {
  return (
    <nav className="flow-index" aria-label="Flow index" aria-describedby="flow-index-desc" data-flow-index>
      <p id="flow-index-desc" className="sr-only">
        {flowIndex.description}
      </p>
      <div className="container-page">
      <ol className="flow-index-list">
        {indexItems.map((item) => (
          <li key={item.number} className="min-w-0">
            <a
              href={`#${item.target}`}
              className="flow-index-link"
              aria-current={active === item.target ? 'location' : undefined}
            >
              <span className="flow-index-pip" aria-hidden="true" />
              <span className="flow-index-num">{item.number}</span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
      </div>
    </nav>
  );
}
