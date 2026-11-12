/**
 * The three audiences (brand F3). The home page's chips, the header and footer links, and the three
 * audience pages all read this list. `proof` is the line the home page's first screen shows when
 * the audience's chip is chosen.
 */
export const OWNERS = {
  id: 'owners',
  label: 'Owners',
  href: '/owners/',
  proof: 'Rent paid to you on the 1st, every month.',
} as const;

export const TENANTS = {
  id: 'tenants',
  label: 'Tenants',
  href: '/tenants/',
  proof: 'Tell us what is broken. We arrange a trusted contractor.',
} as const;

export const BUSINESSES = {
  id: 'businesses',
  label: 'Businesses',
  href: '/businesses/',
  proof: 'We manage shops and offices as well as homes.',
} as const;

export const AUDIENCES = [OWNERS, TENANTS, BUSINESSES] as const;

export type Audience = (typeof AUDIENCES)[number];
