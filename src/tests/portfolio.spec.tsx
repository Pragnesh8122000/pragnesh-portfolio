import { render, screen, within } from '@testing-library/react';
import { App } from '../App';
import { ThemeProvider } from '../components/ThemeProvider';
import * as content from '../content/portfolio';

function renderSite() {
  return render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

describe('portfolio page', () => {
  it('has exactly one h1 with the hero headline', () => {
    renderSite();
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Behind the API.Through thewhole flow.');
  });

  it('renders every section in the specified order', () => {
    const { container } = renderSite();
    const ids = ['top', 'work', 'gateway', 'events', 'data', 'observe', 'webrtc', 'delivery', 'migration', 'dispatch', 'projects', 'about', 'experience', 'stack', 'contact'];
    const positions = ids.map((id) => {
      const el = container.querySelector(`#${id}`);
      expect(el, `#${id}`).not.toBeNull();
      return Array.from(container.querySelectorAll('[id]')).indexOf(el!);
    });
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it('renders all final copy blocks from the content file', () => {
    const { container } = renderSite();
    const text = container.textContent ?? '';
    const { delivery: d } = content;
    const required = [
      content.hero.eyebrow,
      content.hero.paragraph,
      content.hero.identityRole,
      content.hero.caption,
      ...content.hero.proof.flatMap((m) => [m.value, m.label]),
      content.hero.openTo.label,
      content.justdial.subtitle,
      ...content.justdial.features.flatMap((f) => [f.header, f.title, f.body, f.metric?.label ?? '']),
      ...content.justdial.features.flatMap((f) => f.diagram?.targets ?? []),
      ...[d.migration, d.dispatch].flatMap((f) => [f.title, f.body, ...f.diagram.targets]),
      ...d.alsoShipped.flatMap((item) => [item.value, item.heading, item.text]),
      ...content.projects.items.flatMap((p) => [p.label, p.heading, p.what, p.how, p.why, ...p.chips]),
      ...content.about.paragraphs,
      ...content.about.recognition,
      content.about.education.degree,
      ...content.experience.rows.flatMap((r) => [r.employer, r.role, r.dates, ...r.highlights]),
      ...content.stack.rows.map((r) => r.tools.join(' · ')),
      content.contact.lookingFor
    ];
    for (const copy of required) expect(text).toContain(copy);
    expect(text).not.toMatch(/in plain terms/i);
  });

  it('links each hero stage and index entry to an existing target', () => {
    const { container } = renderSite();
    const pile = screen.getByRole('navigation', { name: 'Flow stages' });
    const index = screen.getByRole('navigation', { name: 'Flow index' });
    for (const nav of [pile, index]) {
      const anchors = within(nav).getAllByRole('link');
      expect(anchors).toHaveLength(6);
      for (const a of anchors) {
        const target = a.getAttribute('href')!.slice(1);
        expect(container.querySelector(`#${target}`), target).not.toBeNull();
      }
    }
  });

  it('shows Justdial, Mypcot and also-shipped work as horizontal rows', () => {
    renderSite();
    const rows = [
      ['Justdial work', content.justdial.features.length],
      ['Mypcot work', 2],
      ['Also shipped at Mypcot', content.delivery.alsoShipped.length]
    ] as const;
    for (const [label, count] of rows) {
      const row = screen.getByRole('list', { name: label });
      expect(within(row).getAllByRole('listitem').filter((li) => li.parentElement === row)).toHaveLength(count);
      expect(screen.getByRole('button', { name: `Next in ${label}` })).toBeInTheDocument();
    }
  });

  it('never renders a placeholder or bare hash as a link', () => {
    const { container } = renderSite();
    for (const a of Array.from(container.querySelectorAll('a'))) {
      const href = a.getAttribute('href') ?? '';
      expect(href).not.toBe('#');
      expect(href).not.toMatch(/\[|\]/);
    }
  });

  it('keeps facts attributed to the right employer', () => {
    expect(content.delivery.alsoShipped.some((item) => item.value === '10K RPS')).toBe(true);
    expect(content.justdial.features.some((f) => f.id === 'observe')).toBe(true);
    expect(JSON.stringify(content.delivery)).not.toMatch(/Lambda/);
    // Owner chose to show years and current company, but not a home city, in the hero.
    expect(JSON.stringify(content.hero)).not.toMatch(/Bengaluru/);
    expect(content.justdial.features.find((f) => f.id === 'webrtc')?.body).toMatch(/designed/i);
    // Owner asked not to claim sub-second alert delivery.
    expect(JSON.stringify(content)).not.toMatch(/sub-second|under a second|<1s/i);
  });
});
