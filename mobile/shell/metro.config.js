const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Expo's default config already watches the whole pnpm workspace, so the portals (separate packages
// next to this one) and the shared packages resolve without extra settings.
module.exports = withNativeWind(getDefaultConfig(__dirname), { input: './global.css' });
