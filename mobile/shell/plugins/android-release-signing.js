// Expo config plugin: signs the Android release build with an upload key, instead of the debug key
// Expo's template signs it with. The key is read from four Gradle properties (MWAVULI_UPLOAD_STORE_FILE,
// _STORE_PASSWORD, _KEY_ALIAS and _KEY_PASSWORD), which the Fastlane lanes set from the environment. A
// release build with no key fails at Gradle, rather than shipping a debug-signed bundle.
//
// It edits the generated android/app/build.gradle, so it stops with an error, rather than guessing, if
// a new Expo template no longer looks the way it expects.
const { withAppBuildGradle } = require('expo/config-plugins');

const RELEASE_SIGNING = `        release {
            if (findProperty('MWAVULI_UPLOAD_STORE_FILE')) {
                storeFile file(findProperty('MWAVULI_UPLOAD_STORE_FILE'))
                storePassword findProperty('MWAVULI_UPLOAD_STORE_PASSWORD')
                keyAlias findProperty('MWAVULI_UPLOAD_KEY_ALIAS')
                keyPassword findProperty('MWAVULI_UPLOAD_KEY_PASSWORD')
            }
        }
`;

// The debug signing config, and the release build type's use of it, as the template writes them.
const DEBUG_SIGNING_CONFIG = /(signingConfigs \{\n\s+debug \{[\s\S]*?\n\s+\}\n)/;
const RELEASE_BUILD_TYPE = /(buildTypes \{[\s\S]*?\n\s+release \{[\s\S]*?)signingConfig signingConfigs\.debug/;

function patch(gradle) {
  if (gradle.includes('MWAVULI_UPLOAD_STORE_FILE')) return gradle;
  if (!DEBUG_SIGNING_CONFIG.test(gradle) || !RELEASE_BUILD_TYPE.test(gradle)) {
    throw new Error(
      'android-release-signing: the generated android/app/build.gradle has changed shape. ' +
        'Update mobile/shell/plugins/android-release-signing.js to match the new Expo template.',
    );
  }
  return gradle
    .replace(DEBUG_SIGNING_CONFIG, `$1${RELEASE_SIGNING}`)
    .replace(RELEASE_BUILD_TYPE, '$1signingConfig signingConfigs.release');
}

module.exports = function withAndroidReleaseSigning(config) {
  return withAppBuildGradle(config, (mod) => {
    mod.modResults.contents = patch(mod.modResults.contents);
    return mod;
  });
};
