// The voice cursor (mouse and trackpad only). At rest it is a small dot. Over anything clickable it opens into a
// tiny live waveform (the three bars of the logo) with a chip that says what the click will do: Email, Play, Open,
// Code. Over text it shrinks to a quiet, faded dot (nothing to click there), and over the demo console it turns
// into a listening ring.
// Phones, pens and keyboards keep the system cursor; text fields keep their own; an open sheet brings the system
// cursor back (a modal dialog sits above everything the page can draw). Under reduced motion it follows the
// pointer exactly and the waveform stays still.
const fine = matchMedia('(hover: hover) and (pointer: fine)');
const still = matchMedia('(prefers-reduced-motion: reduce)');
const root = document.documentElement;

const CLICKABLE = 'a[href], button, summary, [role="button"], label[for], input[type="checkbox"], input[type="radio"]';
const TEXT = 'p, h1, h2, h3, h4, li, dd, dt, q, blockquote, figcaption, time';

function verb(el) {
  if (el.dataset.cursor) return el.dataset.cursor;
  if (el.disabled || el.closest('.journey-rail')) return '';
  if (el.id === 'play') return /stop/i.test(el.textContent) ? 'Stop' : 'Play';
  if (el.id === 'interrupt') return 'Interrupt';
  if (el.matches('[data-sheet-open]')) return 'Open';
  if (el.matches('[data-sheet-close]')) return 'Close';
  if (el.closest('.screens-switch')) return el.getAttribute('aria-pressed') === 'true' ? '' : 'Show';
  if (el.matches('.case-toggle')) return el.getAttribute('aria-expanded') === 'true' ? 'Less' : 'More';
  if (el.matches('.theme-toggle, .menu-theme')) return 'Theme';
  const href = el.getAttribute('href') || '';
  if (href.startsWith('mailto:')) return 'Email';
  if (/github\.com/.test(href)) return 'Code';
  if (/linkedin\.com/.test(href)) return 'LinkedIn';
  if (/\.pdf$/.test(href)) return 'Résumé';
  if (href === '#top') return 'Top';
  if (href.startsWith('#')) return 'Go';
  return el.tagName === 'A' ? 'Open' : '';
}

if (fine.matches) {
  const cursor = document.createElement('div');
  cursor.className = 'vc';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span class="vc-shape"><i></i><i></i><i></i><i></i></span><span class="vc-label"></span>';
  const label = cursor.querySelector('.vc-label');
  document.body.append(cursor);
  root.classList.add('vc-on');

  let x = -100, y = -100, cx = -100, cy = -100, frame = 0, shown = false;

  const step = () => {
    frame = 0;
    const k = still.matches ? 1 : 0.32;
    cx += (x - cx) * k;
    cy += (y - cy) * k;
    cursor.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
    if (Math.abs(x - cx) + Math.abs(y - cy) > 0.3) frame = requestAnimationFrame(step);
  };

  const setMode = (target) => {
    const hit = target.closest?.(CLICKABLE);
    let mode = '';
    let text = '';
    if (hit) {
      mode = 'act';
      text = verb(hit);
    } else if (target.closest?.('#voice-demo')) {
      mode = 'listen';
    } else {
      if (target.closest?.(TEXT)) mode = 'text';
    }
    cursor.dataset.mode = mode;
    cursor.toggleAttribute('data-label', Boolean(text));
    if (text && label.textContent !== text) label.textContent = text;
    cursor.dataset.ground = target.closest?.('.closing') ? 'blue' : target.closest?.('.project-section') ? 'dark' : '';
    // keep the chip on screen near the right edge
    cursor.toggleAttribute('data-flip', x > innerWidth - 150);
  };

  addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') {
      cursor.hidden = true;
      return;
    }
    x = event.clientX;
    y = event.clientY;
    if (!shown) {
      cx = x;
      cy = y;
      shown = true;
    }
    cursor.hidden = false;
    setMode(event.target);
    if (!frame) frame = requestAnimationFrame(step);
  }, { passive: true });

  // labels such as Play and Stop change under a still pointer
  addEventListener('click', (event) => setTimeout(() => setMode(event.target), 0), true);
  addEventListener('pointerdown', () => cursor.setAttribute('data-press', ''), { passive: true });
  addEventListener('pointerup', () => cursor.removeAttribute('data-press'), { passive: true });
  root.addEventListener('mouseleave', () => { cursor.hidden = true; shown = false; });
  addEventListener('blur', () => { cursor.hidden = true; shown = false; });
}
