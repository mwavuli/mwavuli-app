import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Portal from './Portal';

it('renders the landlord portal', () => {
  render(<Portal />);
  expect(screen.getByRole('heading', { name: 'Landlord portal' })).toBeTruthy();
});
