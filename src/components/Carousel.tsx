import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CarouselProps {
  /** Accessible name for the scrolling row, e.g. "Justdial work". */
  label: string;
  /** Narrow rows suit short items such as the "Also shipped" list. */
  size?: 'wide' | 'narrow';
  /** Phones show the cards as a vertical stack instead of a swipeable row. */
  stackOnMobile?: boolean;
  children: ReactNode;
}

/**
 * Horizontal, swipeable row of cards. Native scroll with snap points, so touch, trackpad,
 * keyboard (focus the row, then arrow keys) and anchor links all work; buttons help mouse users.
 */
export function Carousel({ label, size = 'wide', stackOnMobile = false, children }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });
  const items = Children.toArray(children);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({ atStart: el.scrollLeft <= 2, atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    update();
    el?.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const step = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const item = el.querySelector('li');
    const distance = item ? item.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * distance, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <div className={`carousel${stackOnMobile ? ' carousel--stack' : ''}`}>
      <div className="carousel-bar">
        <p className="t-meta m-0 text-muted">
          {items.length} items · swipe or use the arrows
        </p>
        <div className="flex gap-2">
          <button type="button" className="carousel-btn" onClick={() => step(-1)} disabled={edges.atStart} aria-label={`Previous in ${label}`}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="carousel-btn" onClick={() => step(1)} disabled={edges.atEnd} aria-label={`Next in ${label}`}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <ul ref={trackRef} className={`carousel-track carousel-track--${size}`} aria-label={label} tabIndex={0}>
        {items.map((child, i) => (
          <li key={i} className="carousel-item">
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
}
