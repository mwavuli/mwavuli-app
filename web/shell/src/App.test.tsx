import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// A module factory runs the first time its module is imported, so this records which portals the
// shell actually fetched.
const fetched = vi.hoisted(() => [] as string[]);

vi.mock('@mwavuli/web-tenant', () => {
  fetched.push('tenant');
  return { default: () => <p>Tenant portal</p> };
});
vi.mock('@mwavuli/web-landlord', () => {
  fetched.push('landlord');
  return { default: () => <p>Landlord portal</p> };
});
vi.mock('@mwavuli/web-ops', () => {
  fetched.push('ops');
  return { default: () => <p>Operations portal</p> };
});

async function renderAt(path: string) {
  const { App } = await import('./App');
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  fetched.length = 0;
  vi.resetModules();
});
afterEach(cleanup);

describe('the shell', () => {
  it('offers every portal and loads none of them', async () => {
    await renderAt('/');
    expect(screen.getByRole('heading', { name: 'Choose your portal' })).toBeTruthy();
    const nav = within(screen.getByRole('navigation', { name: 'Portals' }));
    expect(nav.getAllByRole('link').map((link) => link.textContent)).toEqual(['Tenant', 'Landlord', 'Operations']);
    expect(fetched).toEqual([]);
  });

  it('loads only the portal of the persona in the address', async () => {
    await renderAt('/landlord');
    expect(await screen.findByText('Landlord portal')).toBeTruthy();
    expect(fetched).toEqual(['landlord']);
  });

  it('swaps one portal for another and never shows two', async () => {
    const user = userEvent.setup();
    await renderAt('/tenant');
    await screen.findByText('Tenant portal');

    const nav = within(screen.getByRole('navigation', { name: 'Portals' }));
    await user.click(nav.getByRole('link', { name: 'Operations' }));

    expect(await screen.findByText('Operations portal')).toBeTruthy();
    expect(screen.queryByText('Tenant portal')).toBeNull();
    expect(fetched).toEqual(['tenant', 'ops']);
  });

  it('knows no persona beyond the three', async () => {
    await renderAt('/admin');
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeTruthy();
    expect(fetched).toEqual([]);
  });
});
