/**
 * The worked example from the landlord pitch (business/model.md, BM18): 10 rooms at
 * UGX 400,000, 9 with tenants, a plumber's repair, and the statement for 1st April.
 * The figures are derived from the stated rules (15% of rent, 10% coordination fee on a
 * repair quote) in whole shillings, so the page can only quote what the rules give.
 */

const ROOMS = 10;
const RENT_PER_ROOM = 400_000;
const ROOMS_WITH_TENANTS = 9;
const FEE_PERCENT = 15;
const REPAIR_QUOTE = 100_000;
const COORDINATION_PERCENT = 10;

const rent = ROOMS_WITH_TENANTS * RENT_PER_ROOM;
const fee = (rent * FEE_PERCENT) / 100;
const repair = (REPAIR_QUOTE * (100 + COORDINATION_PERCENT)) / 100;
const paid = rent - fee - repair;

const grouped = new Intl.NumberFormat('en-US');

/** An amount with comma thousands separators and no currency code, for a UGX column (brand T9). */
export const amount = (n: number): string => grouped.format(n);

/** A deduction, with a true minus sign. */
export const deduction = (n: number): string => `−${grouped.format(n)}`;

/** The currency code, a space and the amount (brand F8). The space does not break. */
export const ugx = (n: number): string => `UGX ${grouped.format(n)}`;

export const example = {
  rooms: ROOMS,
  rentPerRoom: RENT_PER_ROOM,
  roomsWithTenants: ROOMS_WITH_TENANTS,
  feePercent: FEE_PERCENT,
  repairQuote: REPAIR_QUOTE,
  coordinationPercent: COORDINATION_PERCENT,
  rent,
  fee,
  repair,
  paid,
};

/** The one-line setup that labels every use of the example. */
export const exampleSetup = `${ROOMS} rooms at ${ugx(RENT_PER_ROOM)}, ${ROOMS_WITH_TENANTS} with tenants`;
