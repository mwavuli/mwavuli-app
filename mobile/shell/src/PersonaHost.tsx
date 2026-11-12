import type { Persona } from '@mwavuli/personas';
import { Component, type ReactNode, Suspense } from 'react';
import { Text, View } from 'react-native';
import { portals } from './registry';

/** Mounts the one portal for `persona`. Choosing another persona unmounts this one first. */
export function PersonaHost({ persona }: { persona: Persona }) {
  const Portal = portals[persona];
  return (
    <LoadFailure key={persona}>
      <Suspense fallback={<Message role="progressbar">Loading…</Message>}>
        <Portal />
      </Suspense>
    </LoadFailure>
  );
}

function Message({ role, children }: { role: 'progressbar' | 'alert'; children: ReactNode }) {
  return (
    <View className="px-6 py-12">
      <Text accessibilityRole={role} className="font-sans text-body text-muted">
        {children}
      </Text>
    </View>
  );
}

/** A portal can fail to load. Say so instead of leaving a blank screen. */
class LoadFailure extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override render() {
    return this.state.failed ? <Message role="alert">This portal could not be loaded. Restart the app.</Message> : this.props.children;
  }
}
