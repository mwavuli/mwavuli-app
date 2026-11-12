import { Text, View } from 'react-native';

export default function Portal() {
  return (
    <View testID="portal-landlord" className="flex-1 bg-page px-6 py-12">
      <Text className="font-sans-semibold text-overline uppercase text-muted">Landlord</Text>
      <Text accessibilityRole="header" className="mt-2 font-display text-h1 text-heading">
        Landlord portal
      </Text>
      <Text className="mt-4 font-sans text-body-lg text-ink">Not built yet.</Text>
    </View>
  );
}
