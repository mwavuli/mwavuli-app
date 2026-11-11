/**
 * The six services on the business card (brand I7, PG1 to PG6, D15), in the card's order.
 * Each line restates a plain statement from business/model.md (BM1, BM2, BM5, BM18); the
 * figures are quoted as written.
 */
export interface Service {
  /** File name in brand/icons/pictogram, without the extension. */
  pictogram: string;
  name: string;
  line: string;
}

export const SERVICES: readonly Service[] = [
  {
    pictogram: 'rental-income',
    name: 'Guaranteed rental income',
    line: 'Rent on the 1st for every room with a tenant. If a tenant misses a month, we cover that first month and do the chasing.',
  },
  {
    pictogram: 'tenant-management',
    name: 'Tenant management and sourcing',
    line: 'We find tenants for your empty rooms and collect the rent.',
  },
  {
    pictogram: 'construction-repairs',
    name: 'Construction and repairs',
    line: 'We find a trusted contractor and bring you the price. You pay it plus our 10% fee, shown on the quote. Above UGX 200,000, we wait for your YES before work starts.',
  },
  {
    pictogram: 'electrical-plumbing',
    name: 'Electrical and plumbing',
    line: 'Tell us what is broken or unsafe. We arrange a trusted electrician or plumber.',
  },
  {
    pictogram: 'utilities',
    name: 'Utilities',
    line: 'We look after electricity and water. Bills are paid at cost, with no markup.',
  },
  {
    pictogram: 'garbage-management',
    name: 'Garbage disposal',
    line: 'We look after garbage disposal for your building, at cost, with no markup.',
  },
];
