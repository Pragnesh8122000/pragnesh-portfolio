const root = document.documentElement;
// The header's icon button and the phone menu's row are the same switch.
const toggles = [...document.querySelectorAll('.theme-toggle, .menu-theme')];
const themeColor = document.querySelector('meta[name="theme-color"]');

function syncThemeControl() {
  const dark = root.dataset.theme === 'dark';
  toggles.forEach((toggle) => {
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  });
  themeColor.content = dark ? '#101421' : '#eef0f3';
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
