import { useLayoutEffect, useRef } from 'react';
import { flowIndex, indexItems, type StageId } from '../content/portfolio';

export function FlowIndex({ active }: { active: StageId | null }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Park the marker under the active entry; on phones also keep that entry in view in the row.
  useLayoutEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    /** Left edge of the active entry inside the scrolling row, or null when nothing is active. */
    const place = () => {
      const link = scroller.querySelector<HTMLElement>('[aria-current]');
      scroller.dataset.marker = link ? 'on' : 'off';
      if (!link) return null;
      const left = link.getBoundingClientRect().left - scroller.getBoundingClientRect().left + scroller.scrollLeft;
      scroller.style.setProperty('--mx', `${left}px`);
      scroller.style.setProperty('--mw', `${link.offsetWidth}px`);
      return { left, width: link.offsetWidth };
    };

    const entry = place();
    if (entry && scroller.scrollWidth > scroller.clientWidth) {
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      scroller.scrollTo({
        left: entry.left - (scroller.clientWidth - entry.width) / 2,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }

    // Entry widths change on resize and when the web font swaps in.
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(place);
    observer.observe(scroller);
    return () => observer.disconnect();
  }, [active]);

  return (
    <nav className="flow-index" aria-label="Flow index" aria-describedby="flow-index-desc" data-flow-index>
      <p id="flow-index-desc" className="sr-only">
        {flowIndex.description}
      </p>
      <div className="container-page">
        <div ref={scrollRef} className="flow-index-scroll">
          <ol className="flow-index-list">
            {indexItems.map((item) => (
              <li key={item.number}>
                <a
                  href={`#${item.target}`}
                  className="flow-index-link"
                  aria-current={active === item.target ? 'location' : undefined}
                >
                  <span className="flow-index-num">{item.number}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <span className="flow-index-marker" aria-hidden="true" />
        </div>
      </div>
    </nav>
  );
}
