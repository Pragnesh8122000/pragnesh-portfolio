import { experience } from '../content/portfolio';
import { SectionHeading } from './SectionHeading';

export function Experience() {
  return (
    <section id={experience.id} aria-labelledby="experience-title" className="section">
      <div className="container-page">
        <SectionHeading id="experience-title" badge={experience.badge} title={experience.title} subtitle={experience.subtitle} />
        <ol className="m-0 list-none border-t border-rule p-0">
          {experience.rows.map((row) => (
            <li
              key={row.employer}
              className="grid gap-1 border-b border-rule py-5 md:grid-cols-[26fr_52fr_22fr] md:gap-6"
            >
              <div>
                <h3 className="t-feature m-0">{row.employer}</h3>
                {row.badge && <p className="t-meta m-0 mt-1 text-accent">{row.badge}</p>}
              </div>
              <div>
                <p className="t-body m-0 text-muted">{row.role}</p>
                <ul className="mt-2 mb-0 max-w-[65ch] list-disc pl-5 text-ink marker:text-accent">
                  {row.highlights.map((item) => (
                    <li key={item} className="t-body">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="t-meta m-0 text-ink md:pt-1 md:text-right">{row.dates}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
