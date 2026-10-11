import { useEffect } from 'react';

/** Scrolls a horizontal card row so the given card sits at the start of the row. */
function alignInRow(target: HTMLElement, smooth: boolean) {
  const track = target.closest<HTMLElement>('.carousel-track');
  const item = target.closest<HTMLElement>('.carousel-item');
  if (!track || !item) return;
  const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0;
  track.scrollTo({ left: item.offsetLeft - padding, behavior: smooth ? 'smooth' : 'auto' });
}

function targetFor(hash: string): HTMLElement | null {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  return id ? document.getElementById(id) : null;
}

/**
 * Keeps in-page anchors working with horizontal card rows: a jump to a card also brings that
 * card to the start of its row, and a hash present on first load is honoured once the page has rendered.
 */
export function useAnchorRows() {
  useEffect(() => {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const initial = targetFor(window.location.hash);
    if (initial) {
      alignInRow(initial, false);
      initial.scrollIntoView({ block: 'start' });
    }

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const target = targetFor(link.getAttribute('href') ?? '');
      if (target) alignInRow(target, smooth);
    };
    const onHashChange = () => {
      const target = targetFor(window.location.hash);
      if (target) alignInRow(target, smooth);
    };

    document.addEventListener('click', onClick);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);
}
