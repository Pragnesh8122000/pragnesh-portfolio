export const palettes = {
  dark: {
    background: '#151519',
    surface: '#25242B',
    surfaceRaised: '#2C2B33',
    text: '#F1F5FA',
    muted: '#A5B3C2',
    accent: '#FF806D',
    accentHover: '#FF9888',
    accentSoft: '#4A2925',
    accentOnSoft: '#FF806D',
    border: '#44424B',
    rule: '#343238',
    buttonText: '#151519',
    depthEdge: '#85483F',
    shadow: 'rgba(0, 0, 0, 0.32)',
    railGlow: 'rgba(255, 128, 109, 0.20)'
  },
  light: {
    background: '#FAF5EE',
    surface: '#FFFFFF',
    surfaceRaised: '#FFFFFF',
    text: '#262329',
    muted: '#526A7B',
    accent: '#BD4935',
    accentHover: '#A83C2C',
    accentSoft: '#F6D8D0',
    // accent on accentSoft is 3.8:1 in light; this keeps badge and active-index text at 4.6:1.
    accentOnSoft: '#A83C2C',
    border: '#DDD3C9',
    rule: '#E7DED4',
    buttonText: '#FFFFFF',
    depthEdge: '#F5BEB2',
    shadow: 'rgba(38, 35, 41, 0.16)',
    railGlow: 'rgba(189, 73, 53, 0.12)'
  }
} as const;

export const tabShadows = {
  dark: '0 16px 24px rgba(0, 0, 0, 0.32)',
  light: '0 14px 22px rgba(38, 35, 41, 0.16)'
} as const;

export const geometry = {
  spacing: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
  radius: { chip: 3, button: 5, tab: 8, card: 6 },
  pageMax: 1304,
  desktopGutter: 68,
  mobileGutter: 24,
  headerHeight: 80,
  indexHeight: 56,
  mobileHeaderHeight: 64,
  mobileIndexHeight: 104,
  compactBreakpoint: 768,
  wideBreakpoint: 1100
} as const;

export type ThemeName = keyof typeof palettes;

const kebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

function declarations(theme: ThemeName): string {
  const colors = Object.entries(palettes[theme]).map(([k, v]) => `--${kebab(k)}:${v};`);
  return `${colors.join('')}--tab-shadow:${tabShadows[theme]};color-scheme:${theme};`;
}

/** CSS custom properties for both themes, injected into index.html before paint. */
export function themeCss(): string {
  return [
    `:root,:root[data-theme="light"]{${declarations('light')}}`,
    `:root[data-theme="dark"]{${declarations('dark')}}`,
    `@media (prefers-color-scheme: dark){:root:not([data-theme]){${declarations('dark')}}}`
  ].join('');
}
