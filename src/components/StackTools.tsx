import { stack } from '../content/portfolio';
import { SectionHeading } from './SectionHeading';

export function StackTools() {
  return (
    <section id={stack.id} aria-labelledby="stack-title" className="section">
      <div className="container-page">
        <SectionHeading id="stack-title" badge={stack.badge} title={stack.title} subtitle={stack.subtitle} />
        <dl className="m-0 border-t border-rule">
          {stack.rows.map((row) => (
            <div key={row.label} className="grid gap-2 border-b border-rule py-5 md:grid-cols-[230px_minmax(0,1fr)] md:gap-6">
              <dt className="t-eyebrow text-accent md:pt-[5px]">{row.label}</dt>
              <dd className="t-body m-0 text-ink">{row.tools.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
