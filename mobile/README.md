# mobile

The Mwavuli mobile app: an Expo shell and three portals, each its own package and Nx project, with the same shape as
[`web/`](../web/README.md).

| Package                               | Project           | Role                                                          |
| ------------------------------------- | ----------------- | ------------------------------------------------------------- |
| `shell/` (`@mwavuli/mobile-shell`)       | `mobile-shell`    | Expo SDK 58 and React Native 0.88: the frame, the picker, the loader, and the Fastlane lanes. |
| `tenant/` (`@mwavuli/mobile-tenant`)     | `mobile-tenant`   | The tenant portal.                                            |
| `landlord/` (`@mwavuli/mobile-landlord`) | `mobile-landlord` | The landlord portal.                                          |
| `ops/` (`@mwavuli/mobile-ops`)           | `mobile-ops`      | The operations portal.                                        |

## One portal at a time

The picker mounts one portal; "Switch portal" unmounts it. A portal is behind a dynamic `import()` in
[`shell/src/registry.ts`](shell/src/registry.ts), so its module is evaluated only when that persona is chosen. Portals
import the shared packages and nothing else, and the shell may not import one statically: the lint rules and the
shell's test (`shell/App.test.tsx`, which records which portal modules were evaluated) hold this. Portals have no test
runner of their own: `shell/portals.test.tsx` renders each real portal, and `App.test.tsx` checks the loading with
stand-ins.

## Styling

NativeWind 4 (Tailwind 3) with the brand as a preset: [`packages/theme/native.cjs`](../packages/theme/native.cjs) reads
the same tokens as the web theme, and `packages/theme/theme.test.mjs` keeps the two in agreement. Fonts are Montserrat
and Inter from `@expo-google-fonts`, one import per weight (the package root would bundle every weight). A custom face
carries its weight in its name on React Native, so the weight is chosen with `font-display`, `font-sans-medium` and the
like, not with `font-bold`.

NativeWind 5 would share the web's Tailwind 4 theme, but it is a release candidate its authors mark as not for
production, and it needs exact version pins and a workspace-wide `lightningcss` override. Move to it when it is stable.

## Commands

```bash
pnpm nx start mobile-shell                 # Expo dev server (press i or a)
pnpm nx run mobile-shell:ios               # a development build on the iOS simulator
pnpm nx run-many -t lint typecheck test build --projects=mobile-shell,mobile-tenant,mobile-landlord,mobile-ops
```

`build` is `expo export`: it bundles iOS and Android with Metro, which is what CI can check without signing keys.

## Native projects and releases

`ios/` and `android/` are not in git. `expo prebuild` generates them from [`shell/app.config.ts`](shell/app.config.ts)
(`pnpm nx run mobile-shell:generate-native`), and every Fastlane lane regenerates them first.

Releases run from a developer's Mac through [Fastlane](https://fastlane.tools), by hand. There is no CI job for them, and
the signing identities and store keys stay on that machine.

```bash
cd mobile/shell && bundle install            # once: the pinned Fastlane and CocoaPods
pnpm nx run mobile-shell:release-ios         # TestFlight
pnpm nx run mobile-shell:release-android     # Google Play, internal track
bundle exec fastlane ios build               # a signed .ipa in build/, no upload
bundle exec fastlane android build           # a signed .aab, no upload
```

The lanes read their settings from the environment and refuse to run until they are set. Put them in
`shell/fastlane/.env`, which git ignores ([`.env.example`](shell/fastlane/.env.example) lists the names), or export them.
Fastlane loads `.env`, not `.env.local`. Keys and certificates stay outside the repository: the variables hold paths.

| Variable                                       | For                                                                      |
| ---------------------------------------------- | ------------------------------------------------------------------------ |
| `MWAVULI_APP_ID`                               | The bundle id and package name. Permanent once published.                |
| `APPLE_TEAM_ID`                                | The Apple developer team (iOS).                                          |
| `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_PATH`  | An App Store Connect API key (TestFlight, and signing through Xcode).    |
| `PLAY_JSON_KEY_PATH`                           | A Google Play service account key (Android).                             |
| `MWAVULI_UPLOAD_STORE_FILE`, `_STORE_PASSWORD`, `_KEY_ALIAS`, `_KEY_PASSWORD` | The Android upload key. |

- **Build numbers.** Each `beta` lane asks the store for the next number (TestFlight, Google Play) and passes it as
  `MWAVULI_BUILD_NUMBER`, which `app.config.ts` turns into the iOS build number and the Android version code. A
  development build is 1.
- **iOS.** `expo prebuild --no-install` writes the Podfile and stops; the lane then installs the pods with the CocoaPods
  in the Gemfile, which is what creates the `.xcworkspace`. Signing is Xcode's automatic signing with the API key.
- **Android.** Expo's template signs a release build with the debug key. [`plugins/android-release-signing.js`](shell/plugins/android-release-signing.js)
  signs it with the upload key from the four `MWAVULI_UPLOAD_*` Gradle properties instead (the lane maps the
  environment to them), so a release build with no key fails rather than shipping debug-signed. The plugin stops with an
  error if a new Expo template no longer looks the way it expects.

`MWAVULI_APP_ID` has no default on purpose: the identifier outlives the app's first upload, and the domain it would be
derived from is still an open brand decision (D4). `app.config.ts` holds a reserved `example.mwavuli.app` for development.

Before the first store build the app also needs an icon and a splash screen (the brand's `app-icon.svg` is the source);
neither exists yet.

**Verified here:** `expo prebuild` generates both projects; the iOS lane runs through prebuild, `pod install` and a full
`xcodebuild` compile of the generated project, and stops at code signing (tried with a made-up bundle id and no Apple
account); the generated Android project carries the build number and the release signing block.

**Not verified:** signing and upload on either platform, the Gradle build (there is no Android SDK here), and the store
calls that find the next build number. They need the owner's Apple and Google accounts.
