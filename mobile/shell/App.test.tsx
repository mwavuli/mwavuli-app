import { describe, expect, it, jest } from '@jest/globals';
import { render, screen, userEvent } from '@testing-library/react-native';
import App from './App';

// A module factory runs the first time its module is imported, so this records which portals the shell
// actually evaluated. (Jest only lets a factory use variables whose names start with "mock".)
const mockFetched: string[] = [];

jest.mock('expo-font', () => ({ useFonts: () => [true, null] }));
jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);

function mockPortal(persona: string, label: string) {
  mockFetched.push(persona);
  const { Text } = require('react-native');
  const { createElement } = require('react');
  return { __esModule: true, default: () => createElement(Text, null, label) };
}
jest.mock('@mwavuli/mobile-tenant', () => mockPortal('tenant', 'Tenant portal'));
jest.mock('@mwavuli/mobile-landlord', () => mockPortal('landlord', 'Landlord portal'));
jest.mock('@mwavuli/mobile-ops', () => mockPortal('ops', 'Operations portal'));

describe('the shell', () => {
  it('mounts one portal at a time and evaluates each only when it is chosen', async () => {
    const user = userEvent.setup();
    await render(<App />);

    // The picker offers every persona and has run none of them.
    expect(screen.getByRole('header', { name: 'Choose your portal' })).toBeTruthy();
    for (const name of ['Tenant', 'Landlord', 'Operations']) expect(screen.getByRole('button', { name })).toBeTruthy();
    expect(mockFetched).toEqual([]);

    await user.press(screen.getByRole('button', { name: 'Tenant' }));
    expect(await screen.findByText('Tenant portal')).toBeTruthy();
    expect(mockFetched).toEqual(['tenant']);

    // Back to the picker unmounts the portal; the next one replaces it, never joins it.
    await user.press(screen.getByRole('button', { name: 'Switch portal' }));
    expect(screen.queryByText('Tenant portal')).toBeNull();
    await user.press(screen.getByRole('button', { name: 'Operations' }));
    expect(await screen.findByText('Operations portal')).toBeTruthy();
    expect(screen.queryByText('Tenant portal')).toBeNull();
    expect(mockFetched).toEqual(['tenant', 'ops']);
  });
});
