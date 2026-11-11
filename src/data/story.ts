/**
 * Copy for the home page's story. The lines come from business/model.md: the plain statements
 * BM1, BM4, BM7, BM8 and BM11, the inspection default P4 and the landlord pitch BM18. Nothing
 * here is a figure the model does not state.
 */

export interface Step {
  id: string;
  title: string;
  body: string;
  /** One promise the model makes for this step, kept short. */
  chip: string;
  /** Line icon (brand IC catalog) for the step's tile. */
  icon: string;
}

export const STEPS: Step[] = [
  {
    id: 'step-1',
    title: 'You give us your building.',
    body: 'Show us your title, or the papers on our list, and your national ID. We check them and walk the building with you, taking photos.',
    chip: 'No sign-up fee. No letting fee.',
    icon: 'properties',
  },
  {
    id: 'step-2',
    title: 'We explain, you sign.',
    body: 'One of our officers sits down with you and explains the agreement in English or Luganda, your choice. You sign, or give your thumbprint, in front of a witness you choose.',
    chip: 'You keep a copy.',
    icon: 'leases',
  },
  {
    id: 'step-3',
    title: 'Rent on the 1st.',
    body: "For every room with a tenant, we pay you the rent on the 1st, minus our 15%. If a tenant doesn't pay, we cover that first month and do the chasing.",
    chip: 'No rent, no fee.',
    icon: 'payments',
  },
  {
    id: 'step-4',
    title: 'Leave any time.',
    body: "You can leave any time with 30 days' written notice, and so can we.",
    chip: 'Not paid by the 3rd? Leave straight away, with no fee.',
    icon: 'bookings',
  },
];

export interface Figure {
  /** The big part of the key figure. */
  value: string;
  /** The small part that follows it. */
  unit: string;
  /** The landlord pitch's "say aloud" line, as written (BM18). */
  line: string;
}

export const FIGURES: Figure[] = [
  {
    value: '1',
    unit: 'st',
    line: 'We pay you on the 1st, for every room with a tenant.',
  },
  {
    value: '15',
    unit: '%',
    line: 'We take 15% of the rent. No rent, no fee.',
  },
  {
    value: '30',
    unit: ' days',
    line: "Leave any time with 30 days' notice.",
  },
];
