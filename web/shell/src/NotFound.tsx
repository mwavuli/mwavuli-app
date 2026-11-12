import { Link } from 'react-router';

export function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="mx-auto max-w-page px-6 py-16">
      <h1 id="not-found-title" className="text-h1">
        Page not found
      </h1>
      <p className="mt-4 text-body-lg">
        <Link to="/" className="text-brand underline">
          Back to the portals
        </Link>
      </p>
    </section>
  );
}
