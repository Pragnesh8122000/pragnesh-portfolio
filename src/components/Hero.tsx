import { hero } from '../content/portfolio';
import { ConfiguredLink } from './ConfiguredLink';
import { FlowPile } from './FlowPile';

export function Hero() {
  return (
    <section id="top" data-hero aria-labelledby="hero-title" className="relative z-0">
      <div className="container-page grid items-center gap-10 pt-12 pb-10 wide:min-h-[730px] wide:grid-cols-[minmax(0,520px)_minmax(0,1fr)] wide:gap-12 wide:py-16 min-[1300px]:grid-cols-[560px_minmax(0,1fr)] min-[1300px]:gap-16">
        <div className="max-w-[560px]">
          <p className="t-eyebrow m-0 text-accent">{hero.eyebrow}</p>
          <h1 id="hero-title" className="t-hero mt-7 mb-0">
            <span className="block">{hero.headline.primary}</span>
            {hero.headline.accent.map((line) => (
              <span key={line} className="block text-accent">
                {line}
              </span>
            ))}
          </h1>
          <p className="t-body mt-8 mb-0 max-w-[490px] text-muted">{hero.paragraph}</p>
          <dl className="hero-proof" aria-label="Highlights">
            {hero.proof.map((item) => (
              <div key={item.label}>
                <dt className="t-meta text-muted">{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={hero.primaryAction.href} className="btn btn-primary">
              {hero.primaryAction.label} <span aria-hidden="true">↓</span>
            </a>
            <ConfiguredLink
              linkKey={hero.secondaryAction.link}
              label={hero.secondaryAction.label}
              icon="↗"
              className="text-link inline-flex min-h-11 items-center gap-2"
            />
          </div>
          <p className="t-body mt-5 mb-0 flex flex-wrap items-center gap-x-2 text-ink">
            <span>
              {hero.identity} <span className="text-muted">· {hero.identityRole}</span>
            </span>
            <a href={hero.openTo.href} className="open-to">
              <span>{hero.openTo.label}</span>
            </a>
          </p>
        </div>
        <FlowPile caption={hero.caption} />
      </div>
    </section>
  );
}
