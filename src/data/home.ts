/**
 * Copy for the home page. Lines come from brand/01-foundation.md (F1, F6) and
 * business/model.md (BM2, BM4, BM8, BM18); the README lists the short new labels.
 */
import type { SceneId } from './scenes';

/** A run of headline text; `accent` sets it in Gold, the loud word of the slide (brand F6, C4). */
export interface Part {
  text: string;
  accent?: boolean;
}

export interface Slide {
  scene: SceneId;
  /** Short label above the headline. */
  overline: string;
  /** Name of the slide for the picker and for screen readers. */
  label: string;
  /** Each line of the headline is revealed on its own. */
  lines: Part[][];
  lead: string;
}

/** The four slides of the film hero. The first is the site headline (F1, F6). */
export const SLIDES: Slide[] = [
  {
    scene: 'roofs',
    overline: 'Kampala, Uganda',
    label: 'Managed Properties. Better Living.',
    lines: [[{ text: 'Managed Properties.' }], [{ text: 'Better Living.', accent: true }]],
    lead: 'Professional property management for people and businesses in Uganda.',
  },
  {
    scene: 'rise',
    overline: 'Your rent',
    label: 'Rent paid to you on the 1st, every month',
    lines: [
      [{ text: 'Rent paid to you' }],
      [{ text: 'on the ' }, { text: '1st', accent: true }, { text: ',' }],
      [{ text: 'every month.' }],
    ],
    lead: "For every room with a tenant. If a tenant doesn't pay, we cover that first month.",
  },
  {
    scene: 'split',
    overline: 'Our fee',
    label: 'We take 15% of the rent. No rent, no fee',
    lines: [
      [{ text: 'We take ' }, { text: '15%', accent: true }, { text: ' of the rent.' }],
      [{ text: 'No rent, no fee.' }],
    ],
    lead: 'There is no sign-up fee and no letting fee.',
  },
  {
    scene: 'open',
    overline: 'Your choice',
    label: "Leave any time with 30 days' notice",
    lines: [
      [{ text: 'Leave any time' }],
      [{ text: 'with ' }, { text: "30 days'", accent: true }, { text: ' notice.' }],
    ],
    lead: "If it isn't working, leave.",
  },
];

/** The three numbers a landlord needs to remember, in the words of the pitch (BM18). */
export const NUMBERS = [
  { value: '1', unit: 'st', line: 'We pay you on the 1st, for every room with a tenant.' },
  { value: '15', unit: '%', line: 'We take 15% of the rent. No rent, no fee.' },
  { value: '30', unit: ' days', line: "Leave any time with 30 days' notice." },
];

export interface Service {
  title: string;
  text: string;
  /** Pictogram under brand/icons/pictogram/ (brand I7). */
  pictogram: string;
}

/** The six services from the card (brand F1, I7); each line follows BM2, BM4 and BM18. */
export const SERVICES: Service[] = [
  {
    title: 'Guaranteed rental income',
    text: "We pay you on the 1st, for every room with a tenant. If a tenant doesn't pay, we cover that first month.",
    pictogram: 'rental-income',
  },
  {
    title: 'Tenant management and sourcing',
    text: 'We find tenants for your empty rooms and collect the rent. If a tenant is late, we do the chasing.',
    pictogram: 'tenant-management',
  },
  {
    title: 'Construction and repairs',
    text: 'We find a trusted contractor and bring you the price. We ask you first for any repair above UGX 200,000.',
    pictogram: 'construction-repairs',
  },
  {
    title: 'Electrical and plumbing',
    text: 'Trusted contractors for wiring, pipes and taps. Every cost is listed on your monthly statement.',
    pictogram: 'electrical-plumbing',
  },
  {
    title: 'Utilities',
    text: 'We look after your electricity and water bills. They are paid at cost, with no markup.',
    pictogram: 'utilities',
  },
  {
    title: 'Garbage disposal and management',
    text: 'We arrange garbage collection. It is paid at cost, with no markup.',
    pictogram: 'garbage-management',
  },
];
