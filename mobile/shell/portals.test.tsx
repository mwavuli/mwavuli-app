import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

// The real portals, not the stand-ins App.test.tsx uses. Each is imported on demand here too, as in the app.
describe('the portals', () => {
  it.each([
    ['tenant', 'Tenant portal'],
    ['landlord', 'Landlord portal'],
    ['ops', 'Operations portal'],
  ])('%s renders its heading', async (persona, heading) => {
    const { default: Portal } = await import(`@mwavuli/mobile-${persona}`);
    await render(<Portal />);
    expect(screen.getByRole('header', { name: heading })).toBeTruthy();
    expect(screen.getByText('Not built yet.')).toBeTruthy();
  });
});
