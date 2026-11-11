/**
 * Site-wide constants. Copy that varies with a knob is derived here, never
 * re-typed in a template.
 */

/** The brand name on the card and the site (brand F7). */
export const SITE_NAME = 'Mwavuli Property Management';

/** The purpose, in the board's words (brand F1). */
export const SITE_DESCRIPTION = 'Professional property management for people and businesses in Uganda.';

/** The company's postal address (business/model.md, "The company"). */
export const POSTAL_ADDRESS = 'P.O. Box 170886, Kampala, Uganda';

/** Main navigation: anchors on the home page, written absolute so they also work from other pages. */
export const NAV_LINKS = [
  { href: '/#how', label: 'How it works' },
  { href: '/#services', label: 'Services' },
  { href: '/#audiences', label: 'Who we serve' },
  { href: '/#contact', label: 'Contact' },
] as const;
