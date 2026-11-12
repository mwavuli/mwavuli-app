import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** The screen frame around whichever portal is mounted: the brand name and a way back to the picker. */
export function Frame({ onSwitch, children }: { onSwitch?: () => void; children: ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-page" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View className="flex-row items-center justify-between border-b border-line bg-surface px-6 py-4">
        <Text accessibilityRole="header" className="font-display text-h4 text-brand">
          Mwavuli
        </Text>
        {onSwitch ? (
          <Pressable accessibilityRole="button" onPress={onSwitch} className="rounded-md px-3 py-2 active:bg-subtle">
            <Text className="font-sans-medium text-label text-ink">Switch portal</Text>
          </Pressable>
        ) : null}
      </View>
      <View className="flex-1">{children}</View>
    </View>
  );
}
