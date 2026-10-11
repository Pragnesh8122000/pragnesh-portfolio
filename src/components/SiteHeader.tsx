import { site } from '../content/portfolio';
import { ConfiguredLink } from './ConfiguredLink';
import { ThemeToggle } from './ThemeToggle';

function NavLinks({ className }: { className: string }) {
  return (
    <ul className={className}>
      {site.nav.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className="inline-flex min-h-11 items-center px-2 text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="container-page grid h-16 grid-cols-[1fr_auto] items-center md:h-20 md:grid-cols-[1fr_auto_1fr]">
        <a href="#top" className="t-wordmark justify-self-start text-ink no-underline" aria-label="pragnesh, back to top">
          pragnesh<span className="text-accent">.</span>
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <NavLinks className="flex items-center gap-1" />
        </nav>
        <div className="flex items-center gap-1 justify-self-end">
          <ConfiguredLink
            linkKey="resume"
            label={site.resumeLabel}
            className="btn btn-secondary min-h-11 px-3 text-sm md:px-4"
          />
          <ThemeToggle />
        </div>
      </div>
      <nav aria-label="Primary mobile" className="border-t border-rule md:hidden">
        <NavLinks className="container-page flex h-11 items-center gap-2" />
      </nav>
    </header>
  );
}
