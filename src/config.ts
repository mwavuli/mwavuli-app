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
 * The money terms (business/model.md: BM2, BM4, BM8, P6, P7, P8 and "Numbers"). Every figure on the
 * page is read from here, so a change to a term is one edit.
 */
export const TERMS = {
  /** Management fee, as a percentage of the rent (BM4). */
  feePercent: 15,
  /** Coordination fee on repair quotes, as a percentage of the contractor's price (BM2). */
  coordinationPercent: 10,
  /** UGX on the quote above which the landlord says YES before work starts (BM2). */
  approvalLimit: 200_000,
  /** UGX up to which an urgent safety repair goes ahead first (P6). */
  emergencyLimit: 500_000,
  /** Days of written notice to leave, either side (BM8). */
  noticeDays: 30,
  /** Day of the month by which a missed payout lets the landlord leave at once (BM8). */
  latestPayoutDay: '3rd',
  /** Days from the end date to the final statement and payment (P8). */
  finalPaymentDays: 14,
} as const;

/** The worked example in BM18: round, illustrative figures in UGX, not a quote. */
export const EXAMPLE = {
  rooms: 10,
  withTenants: 9,
  rentPerRoom: 400_000,
  repairPrice: 100_000,
} as const;
