// Hero motion. The console acts out what the hero claims:
// - each turn runs through the trace: speech to text, end of turn, first token, first audio, speaking (M1)
// - every other turn the primary model sends no token in time and a hedged fallback answers (M2)
// On mouse or trackpad devices a soft light follows the pointer over the console (M6; the console itself never
// tilts) and the main button leans toward it (M7). Nothing runs under prefers-reduced-motion. Loops wait while
// their part of the hero is off screen or the tab is hidden, and step aside while walkthrough.js plays the demo
// or holds its result on screen.
import { stage, resetTrace, markHedged, speakProgress, replyTokens } from './turn-trace.js';

const root = document.documentElement;
const hero = document.querySelector('.hero');
const demo = document.querySelector('#voice-demo');

const EASE = 'cubic-bezier(.22, 1, .36, 1)';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const visibility = new Map();
// a section covered by the next chapter (journey.js) counts as off screen
const onScreen = (el) => visibility.get(el) !== false && !document.hidden && !el.closest('[data-covered]');
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

// ---------------------------------------------------------------- M1 traced turn + M2 hedged failover
function streamReply() {
  const [prompt, reply] = demo.querySelectorAll('.turn');
  const chip = demo.querySelector('.route-chip');
  const chipName = chip?.querySelector('.route-chip-name');
  const tokens = replyTokens();
  if (chip) chip.hidden = false;

  let run = 0;
  const playing = () => demo.hasAttribute('data-playing');
  const held = () => demo.hasAttribute('data-held');
  const alive = (id) => id === run && !playing();

  async function setRoute(state, text) {
    if (!chip || chip.dataset.state === state) return;
    chip.dataset.state = state;
    await chipName.animate([{ transform: 'none', opacity: 1 }, { transform: 'translateY(-70%)', opacity: 0 }], { duration: 160, easing: 'ease-in' }).finished;
    chipName.textContent = text;
    await chipName.animate([{ transform: 'translateY(70%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 220, easing: EASE }).finished;
  }

  function resetRoute() {
    if (!chip) return;
    chip.dataset.state = 'primary';
    chipName.getAnimations().forEach((animation) => animation.cancel());
    chipName.textContent = 'Primary model';
  }

  // The demo takes over mid-turn: drop only this loop's own states. walkthrough.js owns the turns, the words and
  // the trace from here on.
  function yieldToDemo() {
    demo.removeAttribute('data-thinking');
    demo.removeAttribute('data-streaming');
    resetRoute();
  }

  function settle() {
    demo.removeAttribute('data-revealing');
    demo.removeAttribute('data-thinking');
    demo.removeAttribute('data-streaming');
    tokens.forEach((token) => token.classList.remove('is-last'));
    [prompt, reply].forEach((turn) => turn.removeAttribute('data-current'));
  }

  async function streamOnce(id, hedged) {
    await setRoute('primary', 'Primary model');
    resetTrace();
    tokens.forEach((token) => token.classList.remove('is-on', 'is-last', 'is-cut'));
    demo.setAttribute('data-revealing', '');
    prompt.setAttribute('data-current', '');
    stage('stt', 'active');
    await wait(900);
    if (!alive(id)) return;
    stage('stt', 'done');
    stage('end', 'active');
    await wait(560);
    if (!alive(id)) return;
    stage('end', 'done');
    prompt.removeAttribute('data-current');
    reply.setAttribute('data-current', '');
    demo.setAttribute('data-thinking', '');
    stage('llm', 'active');
    if (hedged) {
      await wait(900);
      if (!alive(id)) return;
      stage('llm', 'failed', 'No token in 2 s');
      await setRoute('failing', 'Primary model');
      await wait(850);
      if (!alive(id)) return;
      markHedged(true);
      stage('llm', 'active', 'Fallback model');
      await setRoute('fallback', 'Fallback model');
      await wait(420);
    } else {
      await wait(620);
    }
    if (!alive(id)) return;
    stage('llm', 'done', hedged ? 'Fallback model' : undefined);
    demo.removeAttribute('data-thinking');
    stage('tts', 'active');
    await wait(380);
    if (!alive(id)) return;
    stage('tts', 'done');
    speakProgress(0);
    stage('speak', 'active');
    demo.setAttribute('data-streaming', '');
    for (let i = 0; i < tokens.length; i++) {
      tokens[i - 1]?.classList.remove('is-last');
      tokens[i].classList.add('is-on', 'is-last');
      speakProgress((i + 1) / tokens.length);
      await wait(55 + Math.random() * 85);
      if (!alive(id)) return;
    }
    stage('speak', 'done');
    demo.removeAttribute('data-revealing');
    await wait(700);
  }

  new MutationObserver(() => {
    if (!playing()) return;
    run++;
    yieldToDemo();
  }).observe(demo, { attributes: true, attributeFilter: ['data-playing'] });

  (async () => {
    for (let turn = 0; ; turn++) {
      await until(() => onScreen(demo) && !playing() && !held());
      const id = ++run;
      await streamOnce(id, turn % 2 === 1);
      if (id === run) settle();
      await wait(5200);
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
  heroSettled().then(() => {
    streamReply();
    followPointer();
  });
}
