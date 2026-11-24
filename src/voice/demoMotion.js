import { gsap } from 'gsap';

/*
  Motion for the hero demo card, on top of walkthrough.js (which owns playback).
  walkthrough.js fires `demo:turn` on the card with detail.turn = 'input' | 'output' | null.

  - Streamed reply: the reply appears word by word behind a caret, the way a model streams tokens.
  - Voice waveform: the bars in the card header move while a turn is playing and rest when idle.

  The card is complete without this file: the reply is always written in full in the HTML,
  and this module is loaded after first paint, only without a reduced-motion preference.
*/

const demo = document.querySelector('#voice-demo');
const reply = demo?.querySelector('[data-turn="output"] q');
const bars = demo ? [...demo.querySelectorAll('.voice-wave i')] : [];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

/** Seconds between two words of the streamed reply. */
const WORD_GAP = 0.075;

/** Wraps each word of the reply in a span; the spaces stay plain text so wrapping is unchanged. */
function splitWords(el) {
  const text = el.textContent;
  el.textContent = '';
  const words = [];
  for (const part of text.split(/(\s+)/)) {
    if (!part) continue;
    if (/^\s+$/.test(part)) {
      el.append(part);
    } else {
      const word = document.createElement('span');
      word.className = 'stream-word';
      word.textContent = part;
      el.append(word);
      words.push(word);
    }
  }
  return words;
}

const words = reply ? splitWords(reply) : [];
const caret = document.createElement('span');
caret.className = 'stream-caret';
caret.setAttribute('aria-hidden', 'true');

let stream;
let waves = [];

function showReply() {
  stream?.kill();
  stream = undefined;
  caret.remove();
  gsap.set(words, { clearProps: 'opacity' });
  delete demo.dataset.streaming;
}

/** The prompt is playing: the reply is not written yet, a caret waits where it will start. */
function awaitReply() {
  stream?.kill();
  gsap.set(words, { opacity: 0 });
  reply.prepend(caret);
  demo.dataset.streaming = '';
}

function streamReply() {
  awaitReply();
  stream = gsap.timeline({ onComplete: showReply });
  words.forEach((word, i) => {
    stream.to(word, { opacity: 1, duration: 0.14, ease: 'power1.out', onStart: () => word.after(caret) }, i * WORD_GAP);
  });
  // Let the caret blink once at the end before it goes.
  stream.to({}, { duration: 0.6 });
}

function idleScale(bar) {
  return parseFloat(getComputedStyle(bar).getPropertyValue('--idle')) || 0.25;
}

function speak() {
  waves.forEach((tween) => tween.kill());
  waves = bars.map((bar, i) =>
    gsap.to(bar, {
      scaleY: 'random(0.3, 1)',
      duration: gsap.utils.random(0.14, 0.22),
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      repeatRefresh: true,
      delay: i * 0.03
    })
  );
}

function rest() {
  waves.forEach((tween) => tween.kill());
  waves = [];
  gsap.to(bars, {
    scaleY: (i, bar) => idleScale(bar),
    duration: 0.35,
    ease: 'power2.out',
    onComplete: () => gsap.set(bars, { clearProps: 'transform' })
  });
}

function onTurn(event) {
  const { turn } = event.detail;
  if (reducedMotion.matches) {
    showReply();
    return;
  }
  if (turn === 'input') {
    awaitReply();
    speak();
  } else if (turn === 'output') {
    streamReply();
    speak();
  } else {
    showReply();
    rest();
  }
}

if (demo && reply) {
  demo.addEventListener('demo:turn', onTurn);
  demo.dataset.demoMotion = 'ready';
}
