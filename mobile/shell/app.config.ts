import type { ExpoConfig } from 'expo/config';

// The bundle id (iOS) and package name (Android) are permanent once an app is in a store, and the
// production domain they would be derived from is still open (brand D4). So this is a reserved
// placeholder, and the release lanes refuse to run until MWAVULI_APP_ID names the real one.
const APP_ID = process.env.MWAVULI_APP_ID ?? 'example.mwavuli.app';

// Each upload to a store needs a higher number than the last. The release lanes ask the store for the
// next one and pass it here; a development build is 1.
const BUILD_NUMBER = Number(process.env.MWAVULI_BUILD_NUMBER ?? 1);
if (!Number.isInteger(BUILD_NUMBER) || BUILD_NUMBER < 1) {
  throw new Error(`MWAVULI_BUILD_NUMBER must be a whole number from 1, got "${process.env.MWAVULI_BUILD_NUMBER}"`);
}

const config: ExpoConfig = {
  name: 'Mwavuli',
  slug: 'mwavuli',
  scheme: 'mwavuli',
  version: '0.1.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  platforms: ['ios', 'android'],
  ios: { bundleIdentifier: APP_ID, buildNumber: String(BUILD_NUMBER), supportsTablet: false },
  android: { package: APP_ID, versionCode: BUILD_NUMBER },
  plugins: ['./plugins/android-release-signing'],
};

export default config;
