import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  const label = theme === 'dark' ? 'Dark' : 'Light';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-2 rounded-[5px] px-3 text-sm text-ink hover:text-accent"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
        <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d={theme === 'dark' ? 'M6 1a5 5 0 0 1 0 10z' : 'M6 1a5 5 0 0 0 0 10z'} fill="currentColor" />
      </svg>
      <span aria-hidden="true">{label}</span>
    </button>
  );
}
