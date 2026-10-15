# Validation record

## Passed in the development environment

- `npm test`: eight tests passed. Covers seven-language completeness for UI/routines/instructions, localized weight parsing and ranges, set/exercise progression, backup schema rejection, Monday-based weekly counts, complete animation coverage, anchored support joints, finite pose coordinates and curl elbow stability.
- `EXPO_OFFLINE=1 npx expo install --check`: installed package compatibility matches Expo's bundled SDK 55 metadata. The online compatibility request timed out through the environment proxy; offline metadata was used.
- `npx expo export --platform all`: web production JavaScript and Android/iOS Hermes bundles generated successfully. This checks syntax and module resolution for all targets, not signed installable binaries.

## Browser verification

- Browser interaction: a local Chromium run passed checks for opening routine details, both mannequin figures rendering and moving, pause/play, slow motion, starting a workout, and workout pause freezing the movement. No browser runtime errors occurred. A 390 × 844 screenshot was visually inspected for the squat guide. Browser tooling stayed outside the application dependency tree.

## Not yet verified

- Real Android/iPhone installation, touch interactions, lifecycle behavior, local storage recovery and RTL rendering still require device testing.
- No signed APK/AAB/IPA was generated; no App Store / Play Store submission was made.
- No online account or embedded instructional media is implemented. External demonstration searches are labelled as such.
- Fitness content, translations, store artwork and privacy declarations require release review.
