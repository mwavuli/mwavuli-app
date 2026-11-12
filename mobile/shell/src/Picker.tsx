import { PERSONA_LABELS, PERSONAS, type Persona } from '@mwavuli/personas';
import { Pressable, Text, View } from 'react-native';

/** The front door: one button per persona. Nothing of a portal is evaluated until one is chosen. */
export function Picker({ onPick }: { onPick: (persona: Persona) => void }) {
  return (
    <View className="px-6 py-12">
      <Text accessibilityRole="header" className="font-display text-h2 text-heading">
        Choose your portal
      </Text>
      <View className="mt-8 gap-4">
        {PERSONAS.map((persona) => (
          <Pressable
            key={persona}
            accessibilityRole="button"
            onPress={() => onPick(persona)}
            className="rounded-lg border border-line bg-surface p-6 shadow-sm active:border-line-strong"
          >
            <Text className="font-sans-semibold text-h4 text-ink">{PERSONA_LABELS[persona]}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
