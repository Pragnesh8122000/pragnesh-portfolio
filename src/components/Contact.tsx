import { useState } from 'react';
import { contact, links } from '../content/portfolio';
import { ConfiguredLink } from './ConfiguredLink';

function joinList(items: string[]) {
  return items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/** Shows the address so it can be copied when no mail app is set up. */
function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the address stays visible and selectable.
    }
  };
  return (
    <button type="button" className="btn btn-secondary copy-email" onClick={copy} data-goatcounter-click="copy-email">
      <span>{links.email}</span>
      <span className="t-meta text-muted" aria-live="polite">
        {copied ? 'Copied' : 'Copy'}
      </span>
    </button>
  );
}

export function Contact() {
  return (
    <section id={contact.id} aria-labelledby="contact-title" className="section">
      <div className="container-page">
        <p className="t-eyebrow m-0 text-accent">{contact.eyebrow}</p>
        <h2 id="contact-title" className="t-contact mt-5 mb-0">
          <span className="block">{contact.headline.primary}</span>
          <span className="block text-accent">{contact.headline.accent}</span>
        </h2>
        <p className="t-body mt-6 mb-0 max-w-[65ch] text-ink">
          Open to <strong>{joinList(contact.roles)}</strong> roles, {contact.location}.
        </p>
        <p className="t-body mt-3 mb-0 max-w-[65ch] text-ink">{contact.lookingFor}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ConfiguredLink
            linkKey={contact.primaryAction.key}
            label={contact.primaryAction.label}
            className="btn btn-primary"
            track="email"
          />
          <CopyEmail />
        </div>
        <div className="mt-4 flex flex-wrap gap-x-6">
          {contact.actions.map((action) => (
            <ConfiguredLink
              key={action.key}
              linkKey={action.key}
              label={action.label}
              icon="↗"
              className="text-link inline-flex min-h-11 items-center gap-2"
              track={action.key}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
