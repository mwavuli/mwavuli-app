import { EXAMPLE, TERMS } from '../config';

/** An amount with comma thousands separators and no currency code (brand F8, T9). */
export const amount = (n: number): string => n.toLocaleString('en-US');

/** Money as the currency code, a space and the amount: "UGX 1,200,000" (brand F8). */
export const ugx = (n: number): string => `UGX ${amount(n)}`;

/**
 * The BM18 worked example: the statement for 1st April for 10 rooms at UGX 400,000, 9 with
 * tenants, with one repair. Computed from the terms so the figures cannot drift from them.
 */
export function exampleStatement() {
  const rent = EXAMPLE.withTenants * EXAMPLE.rentPerRoom;
  const fee = Math.round((rent * TERMS.feePercent) / 100);
  const coordination = Math.round((EXAMPLE.repairPrice * TERMS.coordinationPercent) / 100);
  const repair = EXAMPLE.repairPrice + coordination;
  const paid = rent - fee - repair;
  return { rent, fee, coordination, repair, paid };
}
