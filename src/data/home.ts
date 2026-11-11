/**
 * Content for the home page. Every sentence traces to business/model.md (BM-numbers in the
 * comments) or to brand/01-foundation.md; nothing here is a statistic the documents do not state.
 */

export interface Service {
  /** The pictogram file name in brand/icons/pictogram/ (PG1 to PG6). */
  id: string;
  /** The service name on the business card (brand I7). */
  name: string;
  /** One plain line, for the services panel. */
  line: string;
  href: string;
}

/** The six services from the card, in the card's order (brand D15). */
export const SERVICES: readonly Service[] = [
  {
    id: 'rental-income',
    name: 'Guaranteed rental income',
    line: "Rent on the 1st. We cover a tenant's first missed month.", // BM1, BM10
    href: '/#rent',
  },
  {
    id: 'tenant-management',
    name: 'Tenant management and sourcing',
    line: 'We find tenants for your empty rooms and collect the rent.', // BM18
    href: '/#rent',
  },
  {
    id: 'construction-repairs',
    name: 'Construction and repairs',
    line: 'A trusted contractor, and the price on the quote.', // BM2
    href: '/#repairs',
  },
  {
    id: 'electrical-plumbing',
    name: 'Electrical and plumbing',
    line: 'Trusted electricians and plumbers, arranged by us.', // BM18
    href: '/#repairs',
  },
  {
    id: 'utilities',
    name: 'Utilities',
    line: 'Electricity and water bills, paid at cost.', // BM2
    href: '/#repairs',
  },
  {
    id: 'garbage-management',
    name: 'Garbage disposal',
    line: 'Garbage looked after, paid at cost.', // BM2, BM18
    href: '/#repairs',
  },
];

export const NAV = [
  { label: 'The figures', href: '/#figures' },
  { label: 'Leaving', href: '/#leaving' },
  { label: 'Who we manage', href: '/#manage' },
] as const;

export interface Figure {
  /** A small prefix, such as the currency code (brand F8). */
  prefix?: string;
  value: string;
  /** A small suffix, such as "days". */
  suffix?: string;
  caption: string;
}

export interface FigureGroup {
  id: string;
  label: string;
  link: { text: string; href: string };
  figures: readonly Figure[];
}

/** The five figures, grouped as the agreement groups them (landlord agreement, "The figures"). */
export const FIGURE_GROUPS: readonly FigureGroup[] = [
  {
    id: 'fee',
    label: 'Our fee',
    link: { text: 'How we pay you', href: '/#rent' },
    figures: [
      { value: '15%', caption: 'Our fee, taken from the rent. No rent, no fee.' }, // BM4
    ],
  },
  {
    id: 'repairs',
    label: 'Repairs',
    link: { text: 'How repairs work', href: '/#repairs' },
    figures: [
      { value: '10%', caption: 'Our coordination fee on a repair, shown on the quote.' }, // BM2
      {
        prefix: 'UGX',
        value: '200,000',
        caption: 'Above this on the quote, we wait for your YES before work starts.', // BM2
      },
    ],
  },
  {
    id: 'leaving',
    label: 'Leaving',
    link: { text: 'How leaving works', href: '/#leaving' },
    figures: [
      { value: '30', suffix: 'days', caption: 'Written notice. You can leave any time.' }, // BM8, BM18
      {
        value: '14',
        suffix: 'days',
        caption: 'Within 14 days of the end date, we send you a final statement and pay you.', // P8, agreement 16
      },
    ],
  },
];

/** BM9: who we manage. */
export const PROPERTY_TYPES = [
  { id: 'rooms', label: 'Rooms and flats' },
  { id: 'blocks', label: 'Small blocks' },
  { id: 'shops', label: 'Shops' },
  { id: 'offices', label: 'Offices' },
] as const;
