// The homepage's two dealt moments, built on GSAP ScrollTrigger (taste-skill: one or two a page, each in
// its own section, nothing else moves with the scroll).
// - G1 pinned chapters: on wide screens the work section holds for a screen of scroll while its four
//   rows open one at a time and the frame beside them swaps to that row's flow diagram. Phones and reduced
//   motion keep the plain list with each diagram in its row.
// - G2 word highlight: the closing question rests at a readable tint and turns to full ink word by word as
//   it rises, "role" gets its underline, and once played it stays inked.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const WIDE = '(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)';
const MOTION = '(prefers-reduced-motion: no-preference)';
const media = gsap.matchMedia();

// ---------------------------------------------------------------- G1 pinned chapters
function workChapters() {
  const section = document.querySelector('#systems');
  const list = section?.querySelector('.work-list');
  const rows = list ? [...list.querySelectorAll('.work-row')] : [];
  if (!rows.length) return;

  media.add(WIDE, () => {
    // The frame shows a larger copy of each row's diagram; the rows keep the real text.
    const frame = document.createElement('div');
    frame.className = 'work-frame';
    frame.setAttribute('aria-hidden', 'true');
    const panes = rows.map((row) => {
      const pane = document.createElement('div');
      pane.className = 'work-pane';
      const title = Object.assign(document.createElement('p'), { className: 'work-pane-title', textContent: row.querySelector('h3').textContent });
      pane.append(title);
      const flow = row.querySelector('.flow-mini');
      if (flow) pane.append(flow.cloneNode(true));
      frame.append(pane);
      return pane;
    });
    list.append(frame);
    root.classList.add('work-chapters');

    let current = -1;
    const show = (k) => {
      if (k === current) return;
      current = k;
      rows.forEach((row, i) => row.toggleAttribute('data-active', i === k));
      panes.forEach((pane, i) => gsap.to(pane, {
        autoAlpha: i === k ? 1 : 0,
        y: i === k ? 0 : (i < k ? -16 : 16),
        duration: 0.4,
        ease: 'power2.out',
        overwrite: true,
      }));
    };
    show(0);

    // The section is two screens tall and its .wrap is sticky (portfolio.css), so the page scrolls natively
    // and nothing wraps the section; ScrollTrigger only reads how far through it the visitor is.
    const header = () => document.querySelector('.sitehead')?.offsetHeight ?? 0;
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: () => `top ${header()}px`,
      end: 'bottom bottom',
      onUpdate: (self) => show(Math.min(rows.length - 1, Math.floor(self.progress * rows.length))),
    });
    const stepY = (i) => trigger.start + ((i + 0.5) / rows.length) * (trigger.end - trigger.start);

    // A keyboard user tabbing into a row, or a click on a figure above, moves the scroll to that row's step.
    const onFocus = (event) => {
      const i = rows.findIndex((row) => row.contains(event.target));
      if (i < 0 || i === current) return;
      show(i);
      window.scrollTo({ top: stepY(i), behavior: 'instant' });
    };
    const metricLinks = [...section.querySelectorAll('.work-metrics a[href^="#"]')];
    const onMetric = (event) => {
      const i = rows.findIndex((row) => `#${row.id}` === event.currentTarget.getAttribute('href'));
      if (i < 0) return;
      event.preventDefault();
      window.scrollTo({ top: stepY(i), behavior: 'smooth' });
    };
    // Opening "How it worked" changes the section's height, so the pin is measured again.
    const onToggle = () => ScrollTrigger.refresh();

    list.addEventListener('focusin', onFocus);
    list.addEventListener('toggle', onToggle, true);
    metricLinks.forEach((link) => link.addEventListener('click', onMetric));

    return () => {
      list.removeEventListener('focusin', onFocus);
      list.removeEventListener('toggle', onToggle, true);
      metricLinks.forEach((link) => link.removeEventListener('click', onMetric));
      frame.remove();
      rows.forEach((row) => row.removeAttribute('data-active'));
      root.classList.remove('work-chapters');
    };
  });
}

// ---------------------------------------------------------------- G2 word highlight
function closingHighlight() {
  const heading = document.querySelector('#contact-title');
  if (!heading) return;
  const text = heading.textContent;

  media.add(MOTION, () => {
    // Each word stays real text, so the heading reads exactly the same to a screen reader.
    const words = text.split(' ').map((word) => {
      const span = Object.assign(document.createElement('span'), { className: 'hl-word', textContent: word });
      if (word === 'role') span.dataset.key = '';
      return span;
    });
    heading.replaceChildren(...words.flatMap((span, i) => (i ? [' ', span] : [span])));

    gsap.set(words, { opacity: 0.62 });
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        end: 'top 40%',
        scrub: 0.5,
        // Once read, it stays read: scrolling back up no longer dims it.
        onLeave: (self) => {
          self.kill(false, true);
          gsap.set(words, { opacity: 1 });
          gsap.set(heading.querySelector('[data-key]'), { '--key': 1 });
        },
      },
    });
    timeline
      .to(words, { opacity: 1, stagger: 0.4, duration: 1, ease: 'none' })
      .to(heading.querySelector('[data-key]'), { '--key': 1, duration: 0.8, ease: 'none' }, '>-0.6');

    return () => { heading.textContent = text; };
  });
}

workChapters();
closingHighlight();
