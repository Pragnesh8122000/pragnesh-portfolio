import { about } from '../content/portfolio';
import { SectionHeading } from './SectionHeading';

export function About() {
  return (
    <section id={about.id} aria-labelledby="about-title" className="section">
      <div className="container-page">
        <SectionHeading id="about-title" badge={about.badge} title={about.title} subtitle={about.subtitle} />
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-12">
          <div>
            {about.paragraphs.map((text) => (
              <p key={text} className="t-body mt-0 mb-4 max-w-[65ch] text-ink">
                {text}
              </p>
            ))}
          </div>
          <div className="grid gap-6">
            <div>
              <h3 className="t-eyebrow m-0 text-accent">Recognition</h3>
              <ul className="m-0 mt-2 list-none border-t border-rule p-0">
                {about.recognition.map((item) => (
                  <li key={item} className="t-body border-b border-rule py-3 text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="t-eyebrow m-0 text-accent">Education</h3>
              <p className="t-body mt-2 mb-0 text-ink">{about.education.degree}</p>
              <p className="t-meta m-0 text-muted">
                {about.education.school} · {about.education.years}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
