import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Portal from './Portal';

it('renders the ops portal', () => {
  render(<Portal />);
  expect(screen.getByRole('heading', { name: 'Operations portal' })).toBeTruthy();
});
