import { describe, expect, it } from 'vitest';
import { isPersona, PERSONA_LABELS, PERSONAS } from './index';

describe('personas', () => {
  it('accepts exactly the three personas', () => {
    for (const persona of PERSONAS) expect(isPersona(persona)).toBe(true);
    for (const other of ['', 'admin', 'Tenant', undefined, null, 3]) expect(isPersona(other)).toBe(false);
  });

  it('labels every persona', () => {
    expect(Object.keys(PERSONA_LABELS).sort()).toEqual([...PERSONAS].sort());
  });
});
