import type { Project } from '../content/portfolio';
import { ConfiguredLink } from './ConfiguredLink';
import { FlowDiagram } from './FlowDiagram';
import { OwnerFactRow } from './OwnerFactRow';

export function ProjectTab({ project, index }: { project: Project; index: number }) {
  const titleId = `project-${index}-title`;
  const story = [
    { label: 'What', text: project.what },
    { label: 'How', text: project.how },
    { label: 'Why', text: project.why }
  ];
  return (
    <article aria-labelledby={titleId} className="edge-wrap h-full">
      <div className="edge-back" aria-hidden="true" />
      <div className="edge-face edge-face--top flex flex-col">
        <p className="tab-header t-eyebrow m-0">
          <span className="flex-1">{project.label}</span>
          {project.status && <span className="status-chip">{project.status}</span>}
        </p>
        <div className="flex flex-1 flex-col p-6">
          <h3 id={titleId} className="t-feature m-0">
            {project.heading}
          </h3>
          <ul className="mt-4 mb-0 flex list-none flex-wrap items-center gap-2 p-0" aria-label="Highlights">
            {project.chips.map((chip) => (
              <li key={chip}>
                <span className="chip">{chip}</span>
              </li>
            ))}
          </ul>
          <dl className="case-details">
            {story.map((item) => (
              <div key={item.label} className="contents">
                <dt>{item.label}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
            {project.limits && <OwnerFactRow fact={project.limits} />}
          </dl>
          {project.diagram && (
            <div className="mt-5">
              <FlowDiagram diagram={project.diagram} />
            </div>
          )}
          <p className="t-meta mt-4 mb-0 text-muted">{project.stack}</p>
          {project.video !== undefined &&
            (project.video ? (
              <a href={project.video} target="_blank" rel="noopener noreferrer" className="text-link mt-3 inline-flex min-h-11 items-center gap-2">
                Watch the 60-second walkthrough <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <p className="t-meta mt-3 mb-0 text-muted">Walkthrough video coming soon.</p>
            ))}
          <div className="mt-auto flex flex-wrap gap-x-6 pt-5">
            {project.links.map((link) => (
              <ConfiguredLink
                key={link.key}
                linkKey={link.key}
                label={link.label}
                icon="↗"
                optional
                className="text-link inline-flex min-h-11 items-center gap-2"
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
