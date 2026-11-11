/**
 * What each audience sees. Every line comes from business/model.md (BM1 to BM18, P1 to P13) or from
 * the tenancy form's plain words; nothing is invented. Figures in the statements are the model's own
 * round, illustrative examples and are labelled as such on the page.
 */

export type AudienceId = 'owners' | 'tenants' | 'businesses';

export interface Fact {
  /** A big figure set in display type, with its unit smaller. `label` is how it is spoken. */
  figure?: { value: string; unit: string; label: string };
  /** A line icon (brand I6) for a fact that has no figure. */
  icon?: string;
  title?: string;
  text: string;
}

export interface StatementRow {
  label: string;
  amount: string;
}

export interface Statement {
  heading: string;
  note: string;
  rows: StatementRow[];
  totalLabel: string;
  total: string;
}

export interface PlainItem {
  icon: string;
  title: string;
  text: string;
}

export type Detail =
  | {
      kind: 'statement';
      overline: string;
      title: string;
      text: string;
      statement: Statement;
      /** Thin content, shown as a labelled placeholder. */
      placeholder?: string;
    }
  | { kind: 'plain'; overline: string; title: string; text: string; items: PlainItem[] };

export interface Audience {
  id: AudienceId;
  /** The navigation label. */
  label: string;
  /** The two beats of the headline, in Title Case (brand F5, F6). The second beat is gold. */
  headline: [string, string];
  lead: string;
  facts: Fact[];
  detail: Detail;
}

export const AUDIENCES: Audience[] = [
  {
    id: 'owners',
    label: 'Owners',
    headline: ['Rent Paid to You', 'on the 1st.'],
    // BM18: "If a tenant doesn't pay, we cover that first month and do the chasing".
    lead: "If a tenant doesn't pay, we cover the first month and do the chasing.",
    facts: [
      { figure: { value: '1', unit: 'st', label: '1st' }, text: 'We pay you on the 1st, for every room with a tenant.' },
      { figure: { value: '15%', unit: '', label: '15%' }, text: 'We take 15% of the rent. No rent, no fee.' },
      { figure: { value: '30', unit: 'days', label: '30 days' }, text: "Leave any time with 30 days' notice." },
    ],
    detail: {
      kind: 'statement',
      overline: 'Your statement',
      title: 'One payment. One statement.',
      text: 'On the 1st you get one payment and one statement, by SMS or WhatsApp.',
      statement: {
        heading: 'Statement for 1st April',
        note: '10 rooms at UGX 400,000, 9 with a tenant.',
        rows: [
          { label: 'Rent from 9 rooms with tenants', amount: '3,600,000' },
          { label: 'Our 15%', amount: '−540,000' },
          { label: 'Repair: tap, plumber UGX 100,000 plus our 10%', amount: '−110,000' },
        ],
        totalLabel: 'Paid to you on the 1st',
        total: '2,950,000',
      },
    },
  },
  {
    id: 'tenants',
    label: 'Tenants',
    headline: ['Pay Only', 'Mwavuli.'],
    lead: 'Pay your rent by mobile money or bank. Never cash to our staff.',
    facts: [
      {
        icon: 'compliance',
        title: 'Your deposit',
        text: "A new tenant's deposit is kept in a separate account. We use it only for what the tenancy allows, and the rest goes back to you.",
      },
      { icon: 'properties', title: 'No lock-outs', text: 'We never lock a tenant out.' },
      {
        icon: 'maintenance',
        title: 'Repairs',
        text: 'Tell us by phone or WhatsApp if something is broken or unsafe, and we arrange a trusted contractor.',
      },
    ],
    detail: {
      kind: 'plain',
      overline: 'In plain words',
      title: 'The tenancy in plain words',
      text: 'Written in your tenancy form, in the same plain words.',
      items: [
        {
          icon: 'utilities-power',
          title: 'Bills at cost',
          text: 'Your share of electricity, water and garbage is charged at cost, with no markup.',
        },
        {
          icon: 'alerts',
          title: 'If you do not pay',
          text: 'We remind you, call you and visit you, then send a written notice.',
        },
        {
          icon: 'trusted',
          title: 'Your details',
          text: 'They are used only to manage the building. They are not sold or shared otherwise.',
        },
        {
          icon: 'leases',
          title: 'If we disagree',
          text: 'We talk first, then a mediator we both accept, and only then the courts of Uganda.',
        },
      ],
    },
  },
  {
    id: 'businesses',
    label: 'Businesses',
    headline: ['Shops and Offices.', 'Same Terms.'],
    // BM10: every unit gets the same terms, shops and offices included.
    lead: 'Whatever its rent, a shop or an office gets the same terms as a room.',
    facts: [
      { figure: { value: '15%', unit: '', label: '15%' }, text: 'We take 15% of the rent. No rent, no fee.' },
      { figure: { value: '1', unit: 'month', label: '1 month' }, text: 'We cover the first month a tenant misses.' },
      { figure: { value: '1', unit: 'st', label: '1st' }, text: 'We pay you on the 1st.' },
    ],
    detail: {
      kind: 'statement',
      overline: 'A shop, for example',
      title: 'A shop gets what a room gets.',
      text: 'A shop rents for UGX 3,000,000 and the tenant does not pay in March. We collect March from the tenant.',
      statement: {
        heading: 'Statement for 1st March',
        note: 'One shop. The tenant has not paid March.',
        rows: [
          { label: 'Rent for the shop', amount: '3,000,000' },
          { label: 'Our 15%', amount: '−450,000' },
        ],
        totalLabel: 'Paid to you on 1st March',
        total: '2,550,000',
      },
      placeholder: 'For a business that rents a shop or an office: what you can expect is to be added.',
    },
  },
];

/** The six services on the business card (brand F1, D15), each with the file name of its pictogram. */
export const SERVICES = [
  {
    pictogram: 'rental-income',
    name: 'Guaranteed rental income',
    // BM18: "guaranteed" only next to "we cover the first month".
    text: 'Paid on the 1st. We cover the first month a tenant misses.',
  },
  {
    pictogram: 'tenant-management',
    name: 'Tenant management and sourcing',
    text: 'We find tenants for your empty rooms and collect the rent.',
  },
  {
    pictogram: 'construction-repairs',
    name: 'Construction and repairs',
    text: 'We find a trusted contractor and bring you the price.',
  },
  {
    pictogram: 'electrical-plumbing',
    name: 'Electrical and plumbing',
    text: 'Done by trusted contractors we arrange.',
  },
  {
    pictogram: 'utilities',
    name: 'Utilities',
    text: 'We look after electricity and water. Bills are paid at cost, with no markup.',
  },
  {
    pictogram: 'garbage-management',
    name: 'Garbage disposal',
    text: 'We look after the garbage for your building.',
  },
] as const;
