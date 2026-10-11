import { projects } from '../content/portfolio';
import { ProjectTab } from './ProjectTab';
import { SectionHeading } from './SectionHeading';

export function PersonalBuilds() {
  return (
    <section aria-labelledby="projects-title" className="section">
      <div className="container-page">
        <div id={projects.id}>
          <SectionHeading id="projects-title" badge={projects.badge} title={projects.title} subtitle={projects.subtitle} />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.items.map((project, i) => (
            <ProjectTab key={project.label} project={project} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
