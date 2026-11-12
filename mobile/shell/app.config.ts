import type { ExpoConfig } from 'expo/config';

// The bundle id (iOS) and package name (Android) are permanent once an app is in a store, and the
// production domain they would be derived from is still open (brand D4). So this is a reserved
// placeholder, and the release lanes refuse to run until MWAVULI_APP_ID names the real one.
const APP_ID = process.env.MWAVULI_APP_ID ?? 'example.mwavuli.app';

const config: ExpoConfig = {
  name: 'Mwavuli',
  slug: 'mwavuli',
  scheme: 'mwavuli',
  version: '0.1.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  platforms: ['ios', 'android'],
  ios: { bundleIdentifier: APP_ID, supportsTablet: false },
  android: { package: APP_ID },
};

export default config;
