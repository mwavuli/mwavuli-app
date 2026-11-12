import { PERSONA_LABELS, PERSONAS } from '@mwavuli/personas';
import { Link } from 'react-router';

/** The front door: one link per persona. Nothing of a portal loads until one is chosen. */
export function Picker() {
  return (
    <section aria-labelledby="picker-title" className="mx-auto max-w-page px-6 py-16">
      <h1 id="picker-title" className="text-h1">
        Choose your portal
      </h1>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {PERSONAS.map((persona) => (
          <li key={persona}>
            <Link
              to={`/${persona}`}
              className="block rounded-lg border border-line bg-surface p-6 text-h3 shadow-sm hover:border-line-strong hover:shadow-md"
            >
              {PERSONA_LABELS[persona]}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
