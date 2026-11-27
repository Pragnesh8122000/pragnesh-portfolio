// Welcome intro: a waveform grows with a 0→100 count while the welcome streams in word by word. Then
// every word but the name fades out, the name glides to the centre, and the view zooms into the letter
// stroke nearest the middle of the name until it fills the screen in the page colour. The hero rises from there.
// The head gate in index.html decides whether this runs (html.welcome-on). Any click, key or wheel skips it.
const root = document.documentElement;
const welcome = document.getElementById('welcome');

const COUNT_MS = 2200;
const EASE = 'cubic-bezier(.22, 1, .36, 1)';
const EASE_IO = 'cubic-bezier(.65, 0, .35, 1)';
const SKIP_EVENTS = ['pointerdown', 'wheel', 'keydown', 'touchstart'];

let finished = false;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Runs step(t) every frame for ms, t going 0→1; stops early once the intro has finished.
function frames(ms, step) {
  return new Promise((resolve) => {
    const start = performance.now();
    const tick = (now) => {
      if (finished) return resolve();
      const t = Math.min(1, (now - start) / ms);
      step(t);
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });
}

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

function toRgb(color) {
  const nums = (color.match(/[\d.]+/g) || ['0', '0', '0']).slice(0, 3).map(Number);
  return color.startsWith('color(') ? nums.map((n) => n * 255) : nums;
}

// The stroke of the name nearest its middle, at mid x-height, in the element's own coordinates.
function zoomPoint(el) {
  const style = getComputedStyle(el);
  const size = parseFloat(style.fontSize);
  const width = Math.ceil(el.offsetWidth) + 4;
  const height = Math.ceil(el.offsetHeight);
  const canvas = Object.assign(document.createElement('canvas'), { width, height });
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  if ('letterSpacing' in ctx) ctx.letterSpacing = style.letterSpacing;
  const metrics = ctx.measureText(el.textContent);
  const ascent = metrics.fontBoundingBoxAscent;
  const baseline = (height - (ascent + metrics.fontBoundingBoxDescent)) / 2 + ascent;
  ctx.fillText(el.textContent, 0, baseline);

  const y = Math.round(baseline - size * 0.3);
  const row = ctx.getImageData(0, y, width, 1).data;
  const runs = [];
  let from = -1;
  for (let x = 0; x <= width; x++) {
    const ink = x < width && row[x * 4 + 3] > 127;
    if (ink && from < 0) from = x;
    else if (!ink && from >= 0) { runs.push([from, x]); from = -1; }
  }
  const middle = Math.min(width, metrics.width) / 2;
  if (!runs.length) return { x: middle, y: height / 2, stroke: size * 0.12 };
  const distance = ([a, b]) => Math.abs((a + b) / 2 - middle);
  const [a, b] = runs.reduce((best, run) => (distance(run) < distance(best) ? run : best));
  return { x: (a + b) / 2, y, stroke: Math.max(1, b - a) };
}

function revealHero() {
  const parts = document.querySelectorAll('.hero .eyebrow, .hero h1, .hero .hero__lead, .hero .hero-action, .hero .console');
  parts.forEach((el, i) => el.animate(
    [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }],
    { duration: 800, delay: i * 90, easing: EASE, fill: 'backwards' }
  ));
}

function finish({ fade = false } = {}) {
  if (finished) return;
  finished = true;
  SKIP_EVENTS.forEach((type) => window.removeEventListener(type, skip));
  const end = () => {
    root.classList.remove('welcome-on');
    welcome.remove();
  };
  if (!root.classList.contains('welcome-on')) return end();
  // The hero's start state is applied in this frame, so it never shows before it rises.
  revealHero();
  if (fade) welcome.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, easing: EASE_IO }).finished.then(end, end);
  else end();
}

function skip() {
  finish({ fade: true });
}

async function play() {
  const wave = welcome.querySelector('.welcome-wave');
  const words = [...welcome.querySelectorAll('.welcome-w')];
  const meta = welcome.querySelector('.welcome-meta');
  const percent = welcome.querySelector('.welcome-num');
  const name = welcome.querySelector('[data-zoom]') ?? words[0];
  const bars = Array.from({ length: 28 }, () => wave.appendChild(document.createElement('i')));

  await wait(250);
  if (finished) return;
  bars.forEach((bar, i) => bar.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: i * 14, fill: 'forwards' }));
  meta.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 700, easing: EASE, fill: 'forwards' });
  await wait(450);

  // Count, waveform and streamed words all follow one eased progress value.
  await frames(COUNT_MS, (t) => {
    const p = easeInOut(t);
    percent.textContent = `${Math.round(p * 100)}%`;
    const lit = Math.ceil(Math.min(1, t * 1.12) * words.length);
    words.forEach((word, i) => word.classList.toggle('is-on', i < lit));
    const now = performance.now();
    bars.forEach((bar, i) => {
      const centre = 1 - Math.abs(i - (bars.length - 1) / 2) / (bars.length / 2);
      const swing = 0.55 + 0.45 * Math.sin(now / 150 + i * 0.8) * Math.sin(now / 410 + i * 0.3);
      bar.style.transform = `scaleY(${Math.max(0.06, (0.15 + 0.85 * p) * swing * (0.35 + 0.65 * centre))})`;
    });
  });
  if (finished) return;
  bars.forEach((bar) => bar.animate([{ transform: bar.style.transform }, { transform: 'scaleY(.06)' }], { duration: 260, easing: EASE_IO, fill: 'forwards' }));
  await wait(240);
  if (finished) return;

  // Everything but the name fades; the name glides so its zoom point sits on the screen centre.
  [...words.filter((word) => word !== name), meta, wave, welcome.querySelector('.welcome-skip')].forEach((el) =>
    el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 380, easing: EASE_IO, fill: 'forwards' }));
  const point = zoomPoint(name);
  const box = name.getBoundingClientRect();
  const dx = innerWidth / 2 - (box.left + point.x);
  const dy = innerHeight / 2 - (box.top + point.y);
  name.style.transition = 'none';
  name.style.transformOrigin = `${point.x}px ${point.y}px`;
  await frames(620, (t) => {
    const e = 1 - (1 - t) ** 3;
    name.style.transform = `translate(${dx * e}px, ${dy * e}px) scale(${1 + 0.18 * e})`;
  });
  await wait(120);
  if (finished) return;

  // Accelerating push into the stroke; the letter turns the page colour as it fills the screen.
  const scale = Math.min(900, Math.max(40, (2.4 * Math.max(innerWidth, innerHeight)) / point.stroke));
  const from = toRgb(getComputedStyle(name).color);
  const to = toRgb(getComputedStyle(document.body).backgroundColor);
  await frames(1400, (t) => {
    const k = t ** 2.1;
    name.style.transform = `translate(${dx}px, ${dy}px) scale(${1.18 * Math.exp(Math.log(scale) * k)})`;
    const c = Math.min(1, Math.max(0, (t - 0.45) / 0.45));
    name.style.color = `rgb(${from.map((v, i) => Math.round(v + (to[i] - v) * c)).join(',')})`;
  });
  finish();
}

function startWhenVisible() {
  if (document.hidden) return;
  document.removeEventListener('visibilitychange', startWhenVisible);
  SKIP_EVENTS.forEach((type) => window.addEventListener(type, skip, { passive: true }));
  play().catch(() => finish({ fade: true }));
}

if (welcome && root.classList.contains('welcome-on')) {
  clearTimeout(window.__welcomeSafety);
  document.addEventListener('visibilitychange', startWhenVisible);
  startWhenVisible();
} else {
  welcome?.remove();
}
