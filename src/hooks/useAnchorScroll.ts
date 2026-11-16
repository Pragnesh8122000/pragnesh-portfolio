import { useEffect } from 'react';

function targetFor(hash: string): HTMLElement | null {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  return id ? document.getElementById(id) : null;
}

/**
 * In-page jumps: animated on click, instant under reduced motion, and a hash present on first
 * load is honoured once the page has rendered. Done here instead of CSS `scroll-behavior` so
 * only real navigation is animated; with the CSS property every scripted scroll was smoothed,
 * which Chrome counted as a scroll during load and stopped reporting LCP.
 */
export function useAnchorScroll() {
  useEffect(() => {
    targetFor(window.location.hash)?.scrollIntoView({ block: 'start' });

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute('href') ?? '';
      const target = targetFor(hash);
      if (!target) return;

      event.preventDefault();
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ block: 'start', behavior: smooth ? 'smooth' : 'auto' });
      if (window.location.hash !== hash) history.pushState(null, '', hash);

      // Keep keyboard and screen-reader position in step with the jump, as a native anchor would.
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
