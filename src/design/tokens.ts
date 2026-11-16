/**
 * One rule runs through both themes: yellow is signal, never text. It marks where the
 * request is (rail, packet, active index marker, status lights) and the primary action.
 */
export const palettes = {
  dark: {
    background: '#11131A',
    surface: '#1A1D27',
    surfaceRaised: '#232735',
    text: '#ECEEF3',
    muted: '#A0A8B8',
    accent: '#FFD02B',
    accentHover: '#FFE066',
    // Lines and edges: the same yellow in dark, a deeper one in light so thin strokes stay visible.
    accentLine: '#FFD02B',
    accentSoft: '#38310F',
    accentOnSoft: '#FFE38A',
    border: '#363B4B',
    rule: '#272B39',
    buttonText: '#14161C',
    focus: '#FFD02B',
    shadow: 'rgba(0, 0, 0, 0.4)',
    railGlow: 'rgba(255, 208, 43, 0.28)'
  },
  light: {
    background: '#F1F2F4',
    surface: '#FFFFFF',
    surfaceRaised: '#F6F7F9',
    text: '#14161C',
    muted: '#555C6B',
    accent: '#FFC61A',
    accentHover: '#FFB700',
    accentLine: '#DFA400',
    accentSoft: '#FFEFB3',
    accentOnSoft: '#4A3900',
    border: '#D5D8DF',
    rule: '#E1E3E8',
    buttonText: '#14161C',
    // Yellow on a light page is under 3:1, so focus rings use the ink colour instead.
    focus: '#14161C',
    shadow: 'rgba(20, 22, 28, 0.10)',
    railGlow: 'rgba(223, 164, 0, 0.18)'
  }
} as const;

export const tabShadows = {
  dark: '0 16px 24px rgba(0, 0, 0, 0.4)',
  light: '0 12px 24px rgba(20, 22, 28, 0.10)'
} as const;

export const geometry = {
  spacing: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
  radius: { chip: 4, button: 8, tab: 10, card: 12 },
  pageMax: 1304,
  desktopGutter: 68,
  mobileGutter: 24,
  headerHeight: 80,
  indexHeight: 56,
  mobileHeaderHeight: 64,
  mobileIndexHeight: 52,
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
