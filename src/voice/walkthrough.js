
const demo = document.querySelector('.console');
const scope = document.querySelector('#scope');
// Only the interactive walkthrough loads; hiring content is immediately readable.
demo.dataset.loading = 'true';
demo.setAttribute('aria-busy', 'true');
const stages = [...document.querySelectorAll('.stage')];
const play = document.querySelector('#play');
const audio = document.querySelector('#audio');
const audioStatus = document.querySelector('#audio-status');
const reply = 'Let’s make the next five minutes easy. Put your phone down, take a slow breath, and get a glass of water.';
const descriptions = [
  'Sample user: “Help me unwind after a long day.”',
  'Speech-to-text turns the spoken request into text.',
  'The model generates a reply with conversation context. The chat backend streams the text over SSE.',
  'Sample reply: “' + reply + '”'
];
for (let index = 0; index < 47; index++) {
  const bar = document.createElement('span');
  bar.className = 'bar';
  bar.style.setProperty('--h', (8 + 83 * Math.sin(Math.PI * (index + 1) / 48) * Math.abs(Math.sin(index * 1.37))) + 'px');
  bar.style.setProperty('--delay', -(index % 9) * 72 + 'ms');
  scope.append(bar);
}
requestAnimationFrame(() => requestAnimationFrame(() => {
  demo.dataset.loading = 'false';
  demo.setAttribute('aria-busy', 'false');
}));
let timer;
function selectStage(index) {
  stages.forEach((stage, position) => stage.setAttribute('aria-pressed', String(index === position)));
  document.querySelector('#stage-title').textContent = stages[index].textContent;
  document.querySelector('#stage-copy').textContent = descriptions[index];
}
function stopReplay() {
  clearTimeout(timer);
  demo.dataset.playing = 'false';
  play.textContent = '▶ Replay turn';
}
function runStage(index) {
  selectStage(index);
  timer = setTimeout(index === stages.length - 1 ? stopReplay : () => runStage(index + 1), 1450);
}
stages.forEach((stage, index) => stage.addEventListener('click', () => {
  stopReplay();
  selectStage(index);
}));
play.addEventListener('click', () => {
  if (demo.dataset.playing === 'true') {
    stopReplay();
    return;
  }
  demo.dataset.playing = 'true';
  play.textContent = '■ Stop replay';
  runStage(0);
});
let currentSpeech;
audio.addEventListener('click', () => {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    audioStatus.textContent = 'Audio is unavailable in this browser. The sample reply is shown above.';
    stopReplay();
    selectStage(3);
    return;
  }
  if (currentSpeech) {
    const engine = window.speechSynthesis;
    currentSpeech = undefined;
    engine.cancel();
    audio.textContent = 'Hear sample reply';
    return;
  }
  stopReplay();
  selectStage(3);
  audioStatus.textContent = '';
  const speech = new SpeechSynthesisUtterance(reply);
  speech.lang = 'en-IN';
  currentSpeech = speech;
  audio.textContent = 'Stop sample audio';
  function complete(message) {
    if (currentSpeech !== speech) return;
    currentSpeech = undefined;
    audio.textContent = 'Hear sample reply';
    audioStatus.textContent = message;
  }
  speech.onend = () => complete('');
  speech.onerror = () => complete('Audio is unavailable in this browser. The sample reply is shown above.');
  window.speechSynthesis.speak(speech);
});
const pointerMode = matchMedia('(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)');
const cursor = document.querySelector('.cursor');
let frame = 0;
let pointer;
document.addEventListener('pointermove', event => {
  if (!pointerMode.matches || event.pointerType !== 'mouse') return;
  pointer = event;
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    cursor.dataset.action = Boolean(pointer.target.closest('a, button, summary'));
    const offset = cursor.dataset.action === 'true' ? 19 : 12;
    cursor.style.transform = 'translate(' + (pointer.clientX - offset) + 'px,' + (pointer.clientY - offset) + 'px)';
    cursor.dataset.visible = 'true';
  });
});
document.documentElement.addEventListener('pointerleave', () => {
  cancelAnimationFrame(frame);
  frame = 0;
  cursor.dataset.visible = 'false';
});
scope.addEventListener('pointermove', event => {
  if (!pointerMode.matches || event.pointerType !== 'mouse') return;
  scope.style.setProperty('--x', event.offsetX + 'px');
  scope.style.setProperty('--y', event.offsetY + 'px');
});

const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = [...document.querySelectorAll('.section > .eyebrow, .section > h2, .card, .work-row, .bio > div, #contact > p, #contact > .actions')];
let revealObserver;
function configureReveals() {
  revealObserver?.disconnect();
  revealTargets.forEach(el => el.classList.remove('reveal-ready', 'is-visible'));
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, {threshold: 0, rootMargin: '0px 0px -24px 0px'});
  revealTargets.forEach(el => {
    // Content already on screen never waits for an entrance animation.
    if (el.getBoundingClientRect().top < innerHeight) return;
    el.classList.add('reveal-ready');
    revealObserver.observe(el);
  });
}
configureReveals();
motionPreference.addEventListener('change', configureReveals);
const progress = document.querySelector('.scroll-progress');
let scrollFrame;
function updateProgress() {
  const distance = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = 'scaleX(' + (distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0) + ')';
  scrollFrame = undefined;
}
addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
}, {passive:true});
addEventListener('resize', updateProgress);
addEventListener('pagehide', () => { stopReplay(); if (currentSpeech) window.speechSynthesis?.cancel(); });
updateProgress();
