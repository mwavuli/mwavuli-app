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

/**
 * The social image (brand A6), 1200 × 630, rendered from scripts/social-image/card.html into public/.
 * The alt text says what the card shows: the name and the campaign headline.
 */
export const SOCIAL_IMAGE = {
  path: '/social.png',
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}: Managed Properties. Better Living.`,
} as const;
