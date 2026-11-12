import type { Persona } from '@mwavuli/personas';
import { Component, type ReactNode, Suspense } from 'react';
import { portals } from './registry';

/** Mounts the one portal for `persona`. Choosing another persona unmounts this one and loads the next. */
export function PersonaHost({ persona }: { persona: Persona }) {
  const Portal = portals[persona];
  return (
    <LoadFailure key={persona}>
      <Suspense fallback={<Message role="status">Loading…</Message>}>
        <Portal />
      </Suspense>
    </LoadFailure>
  );
}

function Message({ role, children }: { role: 'status' | 'alert'; children: ReactNode }) {
  return (
    <p role={role} className="mx-auto max-w-page px-6 py-16 text-body text-muted">
      {children}
    </p>
  );
}

/** A portal's chunk can fail to load (offline, or a deploy replaced it). Say so instead of a blank page. */
class LoadFailure extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override render() {
    return this.state.failed ? (
      <Message role="alert">This portal could not be loaded. Check your connection and reload the page.</Message>
    ) : (
      this.props.children
    );
  }
}
