/**
 * The answers behind the sentence hero: "I'm [who] and I want to know [what]."
 *
 * Every `lead` and `support` line is a plain statement from business/model.md (term IDs in
 * the comments) or, for tenants, from the tenancy form in business/agreements. Nothing here
 * is invented. `label` is the short new UI copy that completes the sentence.
 */

export interface Answer {
  id: string;
  /** Completes "I want to know …". */
  label: string;
  /** The plain statement, as written in the model. */
  lead: string;
  /** One supporting line: a second plain statement or the model's own example. */
  support: string;
}

export interface Audience {
  id: 'owner' | 'tenant' | 'business';
  /** Completes "I'm …". */
  label: string;
  /** Heading of the stacked list that shows when JavaScript is off. */
  heading: string;
  answers: Answer[];
}

export const audiences: Audience[] = [
  {
    id: 'owner',
    label: 'an owner',
    heading: 'For owners',
    answers: [
      {
        id: 'paid',
        label: 'when I’m paid',
        // BM1, BM18
        lead: 'For every unit with a tenant living in it, you get the rent on the 1st of the month.',
        support: 'You get one payment and one statement a month, by SMS or WhatsApp.',
      },
      {
        id: 'costs',
        label: 'what it costs',
        // BM4 (statement and example)
        lead: 'We take 15% of the rent. No rent, no fee.',
        support:
          'A room rents for UGX 400,000. Our 15% is UGX 60,000. You receive UGX 340,000 on the 1st.',
      },
      {
        id: 'unpaid',
        label: 'what happens if a tenant does not pay',
        // BM18, BM5
        lead: 'If a tenant doesn’t pay, we cover that first month and do the chasing, so you are not left waiting.',
        support: 'If it must go to court, we ask you first and you say YES. We never lock a tenant out.',
      },
      {
        id: 'leave',
        label: 'how to leave',
        // BM8
        lead: 'You can leave any time with 30 days’ written notice, and so can we.',
        support: 'If we have not paid you by the 3rd, you can leave straight away, with no fee.',
      },
      {
        id: 'repairs',
        label: 'who does repairs',
        // BM2
        lead: 'When something needs fixing or building, we find a trusted contractor and bring you the price.',
        support: 'Above UGX 200,000 on the quote we wait for your YES before work starts.',
      },
    ],
  },
  {
    id: 'tenant',
    label: 'a tenant',
    heading: 'For tenants',
    answers: [
      {
        id: 'pay',
        label: 'how I pay',
        // Tenancy form, clause 2
        lead: 'Pay your rent to us only, by mobile money or bank, never cash to our staff.',
        support: 'Your rent is due on the day written in your tenancy form, each month.',
      },
      {
        id: 'deposit',
        label: 'what happens to my deposit',
        // Tenancy form, clause 3
        lead: 'If you are a new tenant, your deposit is paid to us and kept in a separate account.',
        support:
          'We use it only for what this tenancy allows (unpaid rent, damage, legal costs), and the rest goes back to you.',
      },
      {
        id: 'fixes',
        label: 'who fixes things',
        // Tenancy form, clause 6
        lead: 'Tell us by phone or WhatsApp if something is broken or unsafe, and we arrange a trusted contractor.',
        support: 'You pay in full for damage you cause, as soon as the repairs are done.',
      },
    ],
  },
  {
    id: 'business',
    label: 'a business',
    heading: 'For businesses',
    answers: [
      {
        id: 'manage',
        label: 'what you manage',
        // BM9
        lead: 'We manage homes and business premises in Kampala and its surroundings: rooms, flats, small blocks, shops and offices.',
        support: 'There is no minimum number of units.',
      },
      {
        id: 'terms',
        label: 'the terms',
        // BM10, split at its colon
        lead: 'Every unit we take on gets the same terms, whatever its rent, shops and offices included.',
        support: 'We take 15% of its rent, we cover its first missed month, and we pay you on the 1st.',
      },
    ],
  },
];
