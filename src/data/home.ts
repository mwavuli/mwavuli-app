/**
 * Home page copy that comes from the documents. Plain statements are quoted as written in
 * business/model.md (BM18 the pitch, BM7, BM11, P4) and brand/01-foundation.md (F1, F6).
 */

/** BM18 "Say aloud": the three numbers a landlord needs to remember. */
export const OFFER = [
  { figure: '1', unit: 'st', line: 'We pay you on the 1st, for every room with a tenant.' },
  { figure: '15', unit: '%', line: 'We take 15% of the rent. No rent, no fee.' },
  { figure: '30', unit: 'days', line: "Leave any time with 30 days' notice." },
] as const;

/** The three steps before a building is taken on: P4, BM7, BM11. */
export const STEPS = [
  {
    icon: 'properties',
    title: 'We walk the building with you',
    text: 'This comes first. We take photos as we go.',
  },
  {
    icon: 'compliance',
    title: 'We check your papers',
    text: 'Show us your title, or the papers on our list. We check them before we start.',
  },
  {
    icon: 'leases',
    title: 'An officer explains the agreement',
    text: 'One of our officers sits down with you, explains the agreement in your language and answers your questions.',
  },
] as const;

/** The six services on the business card (brand I7, D15), with their pictograms. */
export const SERVICES = [
  {
    pictogram: 'rental-income',
    label: 'Guaranteed rental income',
    note: 'We cover the first month.',
  },
  { pictogram: 'tenant-management', label: 'Tenant management and sourcing' },
  { pictogram: 'construction-repairs', label: 'Construction and repairs' },
  { pictogram: 'electrical-plumbing', label: 'Electrical and plumbing' },
  { pictogram: 'utilities', label: 'Utilities' },
  { pictogram: 'garbage-management', label: 'Garbage disposal' },
] as const;

/** The pitch paragraph, BM18: what Mwavuli looks after. */
export const LOOKS_AFTER =
  'We find tenants for your empty rooms, collect the rent, arrange trusted contractors for repairs, and look after electricity, water and garbage.';

/** BM9: where and what. */
export const AREA = 'Homes and business premises in Kampala and its surroundings.';
export const AREA_LONG =
  'We manage homes and business premises in Kampala and its surroundings: rooms, flats, small blocks, shops and offices.';

/** F1: the purpose, in the board's words. */
export const PURPOSE = 'Professional property management for people and businesses in Uganda.';

/** BM18: the fee line. */
export const NO_FEES = 'There is no sign-up fee and no letting fee.';
