// The page as one conversation.
// J3 chapters (desktop, motion allowed): each section is sticky, so the next one slides up over it like a drawer
//   (S1: rounded top corners and a grab handle that flatten and fade as it docks), and the one underneath dims and
//   sinks back a little. A tall section sticks by its bottom edge, so all of it is
//   read before it is covered.
// J1 rail (desktop): Hello, What I built, In production, Who's talking, Your turn, on the right edge; the line fills
//   with the scroll and the current chapter is named.
// Moments, each once, when first reached: the project screens boot (M1), the work figures count up (M2), a pulse
//   runs along each work flow (M3), the career line draws with the scroll (M4), the contact mic listens (M5).
// Without JavaScript, or under reduced motion, every section simply stands in its finished state.
const root = document.documentElement;
const still = matchMedia('(prefers-reduced-motion: reduce)');
const desk = matchMedia('(min-width: 1024px) and (min-height: 700px)');
const chapters = ['.hero', '#projects', '#systems', '#about', '#contact'].map((s) => document.querySelector(s)).filter(Boolean);
const rail = document.querySelector('.journey-rail');
const railLinks = rail ? [...rail.querySelectorAll('a')] : [];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// ------------------------------------------------------------------ J3 chapters + J1 rail
let stacking = false;
function measure() {
  stacking = desk.matches && !still.matches;
  root.classList.toggle('chapters', stacking);
  chapters.forEach((section) => {
    section.style.setProperty('--stick', stacking ? `${Math.min(0, innerHeight - section.offsetHeight)}px` : '0px');
  });
  schedule();
}

let frame = 0;
function schedule() {
  if (!frame) frame = requestAnimationFrame(update);
}

function update() {
  frame = 0;
  const vh = innerHeight;
  let current = 0;
  chapters.forEach((section, i) => {
    const next = chapters[i + 1];
    const top = section.getBoundingClientRect().top;
    if (top <= vh * 0.5) current = i;
    // S1 drawer: 0 while the section waits below the screen, 1 once it has docked at the top
    if (i > 0) section.style.setProperty('--enter', stacking ? clamp(1 - top / vh).toFixed(3) : '1');
    if (!next) return;
    const cover = stacking ? clamp((vh - next.getBoundingClientRect().top) / vh) : 0;
    section.style.setProperty('--cover', cover.toFixed(3));
    section.toggleAttribute('data-covered', cover > 0.995);
  });
  if (rail) {
    const end = document.documentElement.scrollHeight - vh;
    rail.style.setProperty('--fill', clamp(end > 0 ? scrollY / end : 0).toFixed(3));
    railLinks.forEach((link, i) => {
      link.toggleAttribute('data-passed', i <= current);
      if (i === current) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    const section = chapters[current];
    rail.dataset.ground = section?.matches('.closing') ? 'blue' : section?.matches('.project-section') ? 'dark' : '';
  }
  drawTimeline();
}

addEventListener('scroll', schedule, { passive: true });
addEventListener('resize', measure);
desk.addEventListener('change', measure);
still.addEventListener('change', measure);
new ResizeObserver(measure).observe(document.body);
measure();

// ------------------------------------------------------------------ M4 career line draws with the scroll
const roles = document.querySelector('.roles');
const roleItems = roles ? [...roles.children] : [];
function drawTimeline() {
  if (!roles || still.matches) return;
  const box = roles.getBoundingClientRect();
  const draw = clamp((innerHeight * 0.85 - box.top) / (box.height * 0.9));
  roles.style.setProperty('--draw', draw.toFixed(3));
  const reach = box.top + box.height * draw;
  roleItems.forEach((item) => item.toggleAttribute('data-reached', item.getBoundingClientRect().top + 28 <= reach + 1));
}
if (roles && !still.matches) roles.classList.add('will-draw');

// ------------------------------------------------------------------ one-time moments
function once(elements, run, threshold = 0.45) {
  if (still.matches || !elements.length) return;
  const seen = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    seen.unobserve(entry.target);
    run(entry.target);
  }), { threshold });
  elements.forEach((el) => seen.observe(el));
}

// M1 the project screens boot: the window bar draws, then the app screen opens inside it
const frames = [...document.querySelectorAll('.screens-frame')];
if (!still.matches) frames.forEach((el) => el.classList.add('will-boot'));
once(frames, (el) => el.classList.add('is-booted'), 0.3);

// M2 the work figures count up once, ending exactly on the real figure
const EASE_OUT = (t) => 1 - Math.pow(1 - t, 3);
once([...document.querySelectorAll('.case-deck .metric')], (el) => {
  const final = el.textContent.trim();
  const match = final.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return;
  const target = Number(match[1]);
  const suffix = match[2];
  el.style.minWidth = `${el.getBoundingClientRect().width}px`;
  el.setAttribute('aria-label', final);
  const start = performance.now();
  const tick = (now) => {
    const t = clamp((now - start) / 1100);
    el.textContent = `${Math.round(target * EASE_OUT(t))}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
    else { el.textContent = final; el.removeAttribute('aria-label'); }
  };
  requestAnimationFrame(tick);
}, 0.6);

// M3 a pulse runs once along each work flow
const flows = [...document.querySelectorAll('.case-deck .flow-mini')];
flows.forEach((flow) => [...flow.querySelectorAll(':scope > span:not(.step), :scope > b, .step > span, .step > b, .step > i')]
  .forEach((node, k) => node.style.setProperty('--k', k)));
once(flows, (el) => el.classList.add('is-run'), 0.9);

// M5 the contact mic listens for a few beats each time Contact arrives
const mic = document.querySelector('.your-turn');
if (mic && !still.matches) {
  new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    mic.classList.remove('is-listening');
    void mic.offsetWidth;
    mic.classList.add('is-listening');
  }, { threshold: 0.6 }).observe(mic);
}
