import { contact } from '../content/portfolio';
import { ConfiguredLink } from './ConfiguredLink';

export function Contact() {
  return (
    <section id={contact.id} aria-labelledby="contact-title" className="section">
      <div className="container-page">
        <p className="t-eyebrow m-0 text-accent">{contact.eyebrow}</p>
        <h2 id="contact-title" className="t-contact mt-5 mb-0">
          <span className="block">{contact.headline.primary}</span>
          <span className="block text-accent">{contact.headline.accent}</span>
        </h2>
        <p className="t-body mt-6 mb-0 max-w-[65ch] text-ink">{contact.lookingFor}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {contact.actions.map((action, i) => (
            <ConfiguredLink
              key={action.key}
              linkKey={action.key}
              label={action.label}
              className={`btn ${i === 0 ? 'btn-primary' : 'btn-secondary'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
