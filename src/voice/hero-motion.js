// Hero motion. The console acts out what the hero claims:
// - the reply streams word by word (M1)
// - mid-stream the primary model times out and a fallback takes over (M2)
// - sound ripples spread from behind the console (M5)
// The headline cycles through roles (M3). On mouse or trackpad devices a soft light follows the pointer
// over the console (M6; the console itself never tilts) and the main button leans toward it (M7).
// Nothing runs under prefers-reduced-motion. Loops wait while their part of the hero is off screen or the
// tab is hidden, and the streaming loop steps aside while walkthrough.js plays the sample conversation.
const root = document.documentElement;
const hero = document.querySelector('.hero');
const demo = document.querySelector('#voice-demo');

const EASE = 'cubic-bezier(.22, 1, .36, 1)';
const EASE_IO = 'cubic-bezier(.65, 0, .35, 1)';
const ROLES = ['voice agents.', 'chat agents.', 'AI backends.'];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const visibility = new Map();
const onScreen = (el) => visibility.get(el) !== false && !document.hidden;
const observer = new IntersectionObserver((entries) => entries.forEach((e) => visibility.set(e.target, e.isIntersecting)));

async function until(test) {
  while (!test()) await wait(300);
}

function classChange(el, test) {
  return new Promise((resolve) => {
    if (test()) return resolve();
    const watch = new MutationObserver(() => {
      if (!test()) return;
      watch.disconnect();
      resolve();
    });
    watch.observe(el, { attributes: true, attributeFilter: ['class'] });
  });
}

// Waits for the welcome intro (intro.js) or the usual hero entrance (motion.js) to finish.
async function heroSettled() {
  if (root.classList.contains('welcome-on')) {
    await classChange(root, () => !root.classList.contains('welcome-on'));
    await wait(1200);
    return;
  }
  await Promise.race([classChange(hero, () => hero.classList.contains('is-entered')), wait(2600)]);
  await wait(200);
}

// ---------------------------------------------------------------- M5 sound ripples
// One SVG behind the console: a soft glow and three rings drawn as circles, so they read as decoration and
// never as boxes. The SVG is 1.5 x --r across (the glow's edge); a ring grows to 0.66 of --r at most.
const SVG = 'http://www.w3.org/2000/svg';
function addRipples() {
  const ripples = document.createElementNS(SVG, 'svg');
  ripples.setAttribute('class', 'hero-ripples');
  ripples.setAttribute('viewBox', '-100 -100 200 200');
  ripples.setAttribute('aria-hidden', 'true');
  ripples.setAttribute('focusable', 'false');
  ripples.innerHTML = '<defs><radialGradient id="hero-glow"><stop offset="0" stop-color="currentColor" stop-opacity=".16"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs>'
    + '<circle r="100" fill="url(#hero-glow)"/>'
    + '<circle class="ring" r="66.6"/><circle class="ring" r="66.6"/><circle class="ring" r="66.6"/>';
  hero.prepend(ripples);
  // Offsets ignore transforms, so motion never moves the centre; --r is capped so the whole SVG stays
  // inside the hero (house rule: nothing spills past the panel it sits on).
  const place = () => {
    const x = demo.offsetLeft + demo.offsetWidth / 2;
    const y = demo.offsetTop + demo.offsetHeight / 2;
    const room = Math.min(x, y, hero.offsetWidth - x, hero.offsetHeight - y);
    ripples.style.left = `${x}px`;
    ripples.style.top = `${y}px`;
    ripples.style.setProperty('--r', `${Math.min(Math.max(demo.offsetWidth, demo.offsetHeight) * 1.15, room / 0.76)}px`);
  };
  place();
  new ResizeObserver(place).observe(hero);
  return ripples;
}

// ---------------------------------------------------------------- M1 streaming reply + M2 failover chip
function streamReply(ripples) {
  const [prompt, reply] = demo.querySelectorAll('.turn');
  const quote = reply.querySelector('q');
  const chip = demo.querySelector('.route-chip');
  const chipName = chip?.querySelector('.route-chip-name');
  // Each word becomes a span, so the text (and walkthrough.js's speech) reads exactly as before.
  const tokens = quote.textContent.trim().split(/\s+/).map((word) => Object.assign(document.createElement('span'), { className: 'stream-tok', textContent: word }));
  quote.replaceChildren(...tokens.flatMap((token, i) => (i ? [' ', token] : [token])));
  if (chip) chip.hidden = false;

  let run = 0;
  const playing = () => demo.hasAttribute('data-playing');
  const alive = (id) => id === run && !playing();

  async function setRoute(state, text) {
    if (!chip || chip.dataset.state === state) return;
    chip.dataset.state = state;
    await chipName.animate([{ transform: 'none', opacity: 1 }, { transform: 'translateY(-70%)', opacity: 0 }], { duration: 160, easing: 'ease-in' }).finished;
    chipName.textContent = text;
    await chipName.animate([{ transform: 'translateY(70%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 220, easing: EASE }).finished;
  }

  function settle() {
    demo.removeAttribute('data-revealing');
    demo.removeAttribute('data-thinking');
    demo.removeAttribute('data-streaming');
    tokens.forEach((token) => token.classList.remove('is-last'));
    ripples?.removeAttribute('data-fast');
    // While the sample conversation plays, walkthrough.js owns the highlighted turn.
    if (!playing()) [prompt, reply].forEach((turn) => turn.removeAttribute('data-current'));
  }

  async function streamOnce(id) {
    await setRoute('primary', 'Primary model');
    tokens.forEach((token) => token.classList.remove('is-on', 'is-last'));
    demo.setAttribute('data-revealing', '');
    prompt.setAttribute('data-current', '');
    await wait(900);
    if (!alive(id)) return;
    prompt.removeAttribute('data-current');
    reply.setAttribute('data-current', '');
    demo.setAttribute('data-thinking', '');
    ripples?.setAttribute('data-fast', '');
    await wait(520);
    if (!alive(id)) return;
    demo.removeAttribute('data-thinking');
    demo.setAttribute('data-streaming', '');
    const failAt = chip ? Math.floor(tokens.length * 0.4) : -1;
    for (let i = 0; i < tokens.length; i++) {
      if (i === failAt) {
        demo.removeAttribute('data-streaming');
        await setRoute('failing', 'Primary model');
        await wait(850);
        await setRoute('fallback', 'Fallback model');
        if (!alive(id)) return;
        demo.setAttribute('data-streaming', '');
      }
      tokens[i - 1]?.classList.remove('is-last');
      tokens[i].classList.add('is-on', 'is-last');
      await wait(55 + Math.random() * 85);
      if (!alive(id)) return;
    }
    demo.removeAttribute('data-revealing');
    await wait(700);
  }

  // Pressing "Click For Demo" stops the loop at once and shows the whole reply.
  const stop = () => {
    run++;
    settle();
  };
  new MutationObserver(() => {
    if (playing()) stop();
  }).observe(demo, { attributes: true, attributeFilter: ['data-playing'] });

  (async () => {
    for (;;) {
      await until(() => onScreen(demo) && !playing());
      const id = ++run;
      await streamOnce(id);
      settle();
      await wait(5200);
    }
  })();
}

// ---------------------------------------------------------------- M3 rotating role
function rotateRoles() {
  const em = hero.querySelector('h1 em');
  if (!em) return;
  // Screen readers keep reading the original words; the moving copy is hidden from them.
  const spoken = Object.assign(document.createElement('span'), { className: 'visually-hidden', textContent: em.textContent });
  const box = Object.assign(document.createElement('span'), { className: 'role-rot' });
  const word = Object.assign(document.createElement('span'), { textContent: em.textContent });
  box.setAttribute('aria-hidden', 'true');
  box.append(word);
  em.replaceChildren(spoken, box);

  (async () => {
    for (let k = 0; ;) {
      await wait(k === 0 ? 3400 : 2200);
      if (!onScreen(hero)) continue;
      await word.animate([{ transform: 'none' }, { transform: 'translateY(-105%)' }], { duration: 380, easing: EASE_IO, fill: 'forwards' }).finished;
      k = (k + 1) % ROLES.length;
      word.textContent = ROLES[k];
      await word.animate([{ transform: 'translateY(105%)' }, { transform: 'none' }], { duration: 520, easing: EASE, fill: 'forwards' }).finished;
    }
  })();
}

// ---------------------------------------------------------------- M6 console sheen + M7 magnetic button
function followPointer() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const cta = hero.querySelector('.hero-action');
  const now = { mx: 0, my: 0 };
  let px = null;
  let py = null;
  let frame = 0;

  const step = () => {
    frame = 0;
    const box = demo.getBoundingClientRect();
    if (px !== null) {
      demo.style.setProperty('--mx', `${px - box.left}px`);
      demo.style.setProperty('--my', `${py - box.top}px`);
    }
    demo.style.setProperty('--sheen', px === null ? '0' : '1');

    const button = cta.getBoundingClientRect();
    const dx = px === null ? 0 : px - (button.left + button.width / 2);
    const dy = py === null ? 0 : py - (button.top + button.height / 2);
    const near = px !== null && Math.hypot(dx, dy) < Math.max(button.width, button.height) / 2 + 70;
    now.mx += ((near ? Math.max(-10, Math.min(10, dx * 0.22)) : 0) - now.mx) * 0.16;
    now.my += ((near ? Math.max(-8, Math.min(8, dy * 0.3)) : 0) - now.my) * 0.16;

    const resting = px === null && Math.max(Math.abs(now.mx), Math.abs(now.my)) < 0.02;
    cta.style.translate = resting ? '' : `${now.mx.toFixed(2)}px ${now.my.toFixed(2)}px`;
    if (!resting) frame = requestAnimationFrame(step);
  };
  const wake = () => { if (!frame) frame = requestAnimationFrame(step); };

  hero.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    px = event.clientX;
    py = event.clientY;
    wake();
  });
  hero.addEventListener('pointerleave', () => {
    px = py = null;
    wake();
  });
}

if (hero && demo && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  root.classList.add('hero-fx');
  demo.querySelector('.route-chip')?.removeAttribute('hidden');
  observer.observe(hero);
  observer.observe(demo);
  const ripples = addRipples();
  heroSettled().then(() => {
    streamReply(ripples);
    rotateRoles();
    followPointer();
  });
}
