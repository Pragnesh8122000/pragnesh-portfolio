const root = document.documentElement;
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
// The header's icon button and the phone menu's row are the same switch.
const toggles = [...document.querySelectorAll('.theme-toggle, .menu-theme')];
const [lightChrome, darkChrome] = document.querySelectorAll('meta[name="theme-color"]');

function syncThemeControl() {
  const preference = root.dataset.theme;
  const dark = preference ? preference === 'dark' : systemTheme.matches;
  toggles.forEach((toggle) => {
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  });
  lightChrome.media = preference ? (dark ? 'not all' : 'all') : '(prefers-color-scheme: light)';
  darkChrome.media = preference ? (dark ? 'all' : 'not all') : '(prefers-color-scheme: dark)';
}

toggles.forEach((toggle) => toggle.addEventListener('click', () => {
  const theme = toggle.getAttribute('aria-pressed') === 'true' ? 'light' : 'dark';
  root.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // The selected theme still applies to this page if storage is unavailable.
  }
  syncThemeControl();
}));

systemTheme.addEventListener('change', syncThemeControl);
window.addEventListener('storage', (event) => {
  if (event.key !== 'theme' && event.key !== null) return;
  if (event.newValue === 'light' || event.newValue === 'dark') {
    root.dataset.theme = event.newValue;
  } else {
    delete root.dataset.theme;
  }
  syncThemeControl();
});

syncThemeControl();
toggles.forEach((toggle) => { toggle.hidden = false; });
