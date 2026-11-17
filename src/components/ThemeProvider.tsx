import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, type ReactNode } from 'react';
import type { ThemeName } from '../design/tokens';

const STORAGE_KEY = 'theme';

interface ThemeContextValue {
  theme: ThemeName;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStored(): ThemeName | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
}

function systemTheme(): ThemeName {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: ThemeName) {
  document.documentElement.setAttribute('data-theme', theme);
}

/** The pre-paint script in index.html sets data-theme; the attribute is the single source of truth. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

function readTheme(): ThemeName {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark' || attr === 'light') return attr;
  return readStored() ?? systemTheme();
}

/**
 * The page is prerendered without knowing the visitor's theme, so the server snapshot is
 * 'light' and React corrects it right after hydration. Colors never wait for this: they come
 * from the attribute the inline script sets before first paint.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'light' as ThemeName);

  // Follow the system preference until the visitor makes an explicit choice.
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (!readStored()) applyTheme(mql.matches ? 'dark' : 'light');
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
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
