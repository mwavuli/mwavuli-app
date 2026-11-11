/**
 * Home page copy and structure. Every line comes from brand/01-foundation.md,
 * business/model.md (BM2, BM9, BM18) or the tenancy form; labels and group titles
 * are short new UI copy listed in prototype/README.md.
 */
import { POSTAL_ADDRESS } from '../config';

export interface NavItem {
  label: string;
  href: string;
}

/** Quiet navigation. The audience pages do not exist yet, so each item is an anchor on the home page. */
export const NAV: readonly NavItem[] = [
  { label: 'Owners', href: '/#owners' },
  { label: 'Tenants', href: '/#tenants' },
  { label: 'Commercial', href: '/#commercial' },
  { label: 'Services', href: '/#services' },
];

export interface Audience {
  id: string;
  icon: string;
  title: string;
  line: string;
  cta: string;
  href: string;
}

/** The three audiences of brand F3, one line each. */
export const AUDIENCES: readonly Audience[] = [
  {
    id: 'owners',
    icon: 'properties',
    title: 'Property owners and investors',
    line: 'You get one payment and one statement a month, by SMS or WhatsApp.',
    cta: 'See how we pay you',
    href: '#terms',
  },
  {
    id: 'tenants',
    icon: 'tenants',
    title: 'Residential tenants',
    line: 'Tell us by phone or WhatsApp if something is broken or unsafe, and we arrange a trusted contractor.',
    cta: 'Tell us about a repair',
    href: '#contact',
  },
  {
    id: 'commercial',
    icon: 'commercial',
    title: 'Commercial occupiers',
    line: 'We manage shops and offices in Kampala and its surroundings.',
    cta: 'Talk to us',
    href: '#contact',
  },
];

export interface Term {
  /** The number, set oversize. */
  figure: string;
  /** Its unit, set small beside it. */
  unit: string;
  line: string;
}

/** The landlord pitch, "say aloud" (BM18): the only three numbers a landlord needs to remember. */
export const TERMS: readonly Term[] = [
  { figure: '1', unit: 'st', line: 'We pay you on the 1st, for every room with a tenant.' },
  { figure: '15', unit: '%', line: 'We take 15% of the rent. No rent, no fee.' },
  { figure: '30', unit: 'days', line: 'Leave any time with 30 days’ notice.' },
];

export interface Service {
  pictogram: string;
  label: string;
}

export interface ServiceGroup {
  title: string;
  line: string;
  services: readonly [Service, Service];
}

/** The six services of the business card (brand D15), grouped in pairs. */
export const SERVICE_GROUPS: readonly ServiceGroup[] = [
  {
    title: 'Rent and tenants',
    line: 'If a tenant doesn’t pay, we cover that first month and do the chasing.',
    services: [
      { pictogram: 'rental-income', label: 'Guaranteed rental income on the 1st' },
      { pictogram: 'tenant-management', label: 'Tenant management and sourcing' },
    ],
  },
  {
    title: 'Repairs and building',
    line: 'We find a trusted contractor and bring you the price.',
    services: [
      { pictogram: 'construction-repairs', label: 'Construction and repairs' },
      { pictogram: 'electrical-plumbing', label: 'Electrical and plumbing services' },
    ],
  },
  {
    title: 'Utilities and garbage',
    line: 'We look after electricity, water and garbage.',
    services: [
      { pictogram: 'utilities', label: 'Utilities (electricity and water bills)' },
      { pictogram: 'garbage-management', label: 'Garbage disposal and management' },
    ],
  },
];

export interface ContactRow {
  icon: string;
  label: string;
  value: string;
  /** True where the value is a plainly labelled placeholder, not a real detail. */
  placeholder: boolean;
}

/** The postal address is the only contact fact. The rest are placeholders. */
export const CONTACT_ROWS: readonly ContactRow[] = [
  { icon: 'location', label: 'Postal address', value: POSTAL_ADDRESS, placeholder: false },
  { icon: 'phone', label: 'Phone or WhatsApp', value: 'Phone number to be added', placeholder: true },
  { icon: 'mail', label: 'Email', value: 'Email address to be added', placeholder: true },
];

/** The primary tagline of brand F6, two beats. */
export const TAGLINE = ['Your Property.', 'Our Responsibility.'] as const;
