import type { OwnerFact } from '../content/portfolio';

/**
 * One label/text row inside a `.case-details` list. A missing fact shows a [TODO] prompt in
 * development and is left out of public builds, so nothing unfinished reaches recruiters.
 */
export function OwnerFactRow({ fact }: { fact: OwnerFact }) {
  const todo = import.meta.env.DEV && fact.todo;
  if (!fact.text && !todo) return null;
  return (
    <div className="contents">
      <dt>{fact.label}</dt>
      <dd>
        {fact.text}
        {todo && (
          <span className="todo" data-todo>
            {fact.text ? ' ' : ''}[TODO] {fact.todo}
          </span>
        )}
      </dd>
    </div>
  );
}
