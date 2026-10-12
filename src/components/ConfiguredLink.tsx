import type { ReactNode } from 'react';
import { links, type LinkKey } from '../content/portfolio';

/** Resolves an owner-filled destination, or null when it is missing or still a placeholder. */
export function resolveLink(key: LinkKey): string | null {
  const raw = links[key]?.trim() ?? '';
  if (!raw || raw === '#' || /^\[.*\]$/.test(raw)) return null;
  if (key === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw) ? `mailto:${raw}` : null;
  }
  if (raw.startsWith('/')) return raw;
  try {
    const url = new URL(raw);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
  } catch {
    return null;
  }
}

interface ConfiguredLinkProps {
  linkKey: LinkKey;
  label: string;
  /** Decorative trailing mark, e.g. an arrow. */
  icon?: ReactNode;
  className?: string;
  /** Optional links disappear from public builds when unset. */
  optional?: boolean;
  /** Analytics event name; GoatCounter counts clicks on elements with data-goatcounter-click. */
  track?: string;
}

export function ConfiguredLink({ linkKey, label, icon, className, optional = false, track }: ConfiguredLinkProps) {
  const href = resolveLink(linkKey);

  if (!href) {
    if (optional && !import.meta.env.DEV) return null;
    return (
      <span className="t-meta inline-flex min-h-11 items-center text-muted" data-unavailable={linkKey}>
        {import.meta.env.DEV ? `${label} · Add link before publishing` : `${label} unavailable`}
      </span>
    );
  }

  const external = !href.startsWith('mailto:');
  return (
    <a
      href={href}
      className={className}
      data-goatcounter-click={track}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
      {icon && <span aria-hidden="true">{icon}</span>}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
