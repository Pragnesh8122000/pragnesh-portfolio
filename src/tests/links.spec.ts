import { links } from '../content/portfolio';
import { resolveLink } from '../components/ConfiguredLink';

describe('resolveLink', () => {
  const original = { ...links };
  afterEach(() => Object.assign(links, original));

  it('rejects placeholders, empty values and bare hashes', () => {
    for (const value of ['[YOUR_GITHUB_URL]', '', '   ', '#']) {
      links.github = value;
      expect(resolveLink('github')).toBeNull();
    }
  });

  it('builds a mailto link only for valid emails', () => {
    links.email = 'someone@example.com';
    expect(resolveLink('email')).toBe('mailto:someone@example.com');
    links.email = 'not-an-email';
    expect(resolveLink('email')).toBeNull();
  });

  it('accepts http(s) and site-relative paths, rejects other schemes', () => {
    links.github = 'https://github.com/example';
    expect(resolveLink('github')).toBe('https://github.com/example');
    links.resume = '/resume.pdf';
    expect(resolveLink('resume')).toBe('/resume.pdf');
    links.linkedin = 'javascript:alert(1)';
    expect(resolveLink('linkedin')).toBeNull();
  });

  it('points project code links at GitHub', () => {
    for (const key of ['aiBestieCode', 'vaidyaAssistFrontend', 'vaidyaAssistBackend'] as const) {
      expect(resolveLink(key)).toMatch(/^https:\/\/github\.com\/Pragnesh8122000\//);
    }
  });
});
