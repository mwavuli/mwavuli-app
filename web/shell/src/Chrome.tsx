import lockup from '@mwavuli/brand/logo/logo-horizontal.svg?url';
import appIcon from '@mwavuli/brand/logo/app-icon.svg?url';
import { PERSONA_LABELS, PERSONAS } from '@mwavuli/personas';
import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router';

/** The page frame around whichever portal is loaded: the brand header and the persona switcher. */
export function Chrome({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-page font-sans text-body text-ink">
      <title>Mwavuli</title>
      <link rel="icon" type="image/svg+xml" href={appIcon} />
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link to="/" aria-label="Mwavuli home">
            {/* The lockup file declares width="52" against a 520-wide viewBox, which collapses `w-auto`
                (see site/src/components/Lockup.astro), so the ratio is given here. */}
            <img src={lockup} alt="Mwavuli Property Management" className="aspect-[520/128] h-9 w-auto" />
          </Link>
          <nav aria-label="Portals" className="flex gap-1">
            {PERSONAS.map((persona) => (
              <NavLink
                key={persona}
                to={`/${persona}`}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-label ${isActive ? 'bg-brand text-white' : 'text-ink hover:bg-subtle'}`
                }
              >
                {PERSONA_LABELS[persona]}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
