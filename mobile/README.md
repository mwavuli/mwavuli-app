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
cd mobile/shell && bundle install            # once, for the pinned Fastlane
pnpm nx run mobile-shell:release-ios         # TestFlight
pnpm nx run mobile-shell:release-android     # Google Play, internal track
bundle exec fastlane ios build               # a signed .ipa in build/, no upload
```

The lanes read their settings from the environment (put them in `shell/fastlane/.env.local`, which git ignores) and
refuse to run until they are set:

| Variable                                       | For                                                               |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| `MWAVULI_APP_ID`                               | The bundle id and package name. Permanent once published.         |
| `APPLE_TEAM_ID`                                | The Apple developer team (iOS).                                   |
| `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_PATH`  | An App Store Connect API key (TestFlight).                        |
| `PLAY_JSON_KEY_PATH`                           | A Google Play service account key (Android).                      |

Android signing is the usual Gradle properties in `~/.gradle/gradle.properties`.

`MWAVULI_APP_ID` has no default on purpose: the identifier outlives the app's first upload, and the domain it would be
derived from is still an open brand decision (D4). `app.config.ts` holds a reserved `example.mwavuli.app` for development.

Before the first store build the app also needs an icon and a splash screen (the brand's `app-icon.svg` is the source);
neither exists yet.

**Not yet verified:** the lanes load and their guards refuse correctly, and `expo prebuild` generates both projects, but
no signed build or upload has been run: that needs the owner's Apple and Google accounts.
