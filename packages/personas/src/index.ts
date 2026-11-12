/** The people who use Mwavuli. Every client names them the same way. */
export const PERSONAS = ['tenant', 'landlord', 'ops'] as const;

export type Persona = (typeof PERSONAS)[number];

/** What a persona is called on screen. */
export const PERSONA_LABELS = {
  tenant: 'Tenant',
  landlord: 'Landlord',
  ops: 'Operations',
} as const satisfies Record<Persona, string>;

export function isPersona(value: unknown): value is Persona {
  return typeof value === 'string' && (PERSONAS as readonly string[]).includes(value);
}
