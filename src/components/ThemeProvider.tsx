import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { palettes, type ThemeName } from '../design/tokens';

const STORAGE_KEY = 'theme';

interface ThemeContextValue {
  theme: ThemeName;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: ThemeName) {
  document.documentElement.dataset.theme = theme;
  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (themeColor) themeColor.content = palettes[theme].background;
}

/** Subscribe to the theme attribute used by the pre-paint script and theme toggle. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

function readTheme(): ThemeName {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/**
 * The page is prerendered without knowing the visitor's theme, so the server snapshot is
 * 'light' and React corrects it right after hydration. Colors never wait for this: they come
 * from the attribute the inline script sets before first paint.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'light' as ThemeName);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      applyTheme(event.newValue === 'dark' ? 'dark' : 'light');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = useCallback(() => {
    const next: ThemeName = readTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable: the choice lasts for this page view only.
    }
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used inside ThemeProvider');
  return value;
}
