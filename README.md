# Fitness Hub

A free, seven-language fitness app built with Expo and React Native for Android, iOS and the web. Original dark green design, home and gym routines, guided sets, rest timers, local profiles, weight tracking, activity history and portable JSON backups.

## Browser preview

Open [Fitness Hub](https://ijalali347-crypto.github.io/fitness-hub/) to use the browser version. The repository root includes the generated web entry point and bundle for existing GitHub Pages hosting. Run `npm run build:pages` after source changes, then commit the updated `index.html`, `_expo/` and `.nojekyll` along with source. The native Android/iOS source remains in this repository.

## Run locally

Requires Node.js 20.19+ and npm.

```bash
npm ci
npm start
```

Use a compatible Expo Go version, an Android emulator or an iOS simulator. SDK 55 is deliberately pinned; check Expo's version compatibility before choosing Expo Go. Run `npm run web` for a browser preview. This repository is application source, not a downloadable APK or App Store release.

```bash
npm test
npm run build:web
npx expo export --platform android --platform ios
```

`app.json` sets `/fitness-hub` as the web base path. Serve the web export under that path, or remove `experiments.baseUrl` before deploying at a domain root. CI also produces a downloadable web-preview artifact. GitHub Pages should serve the `main` branch at `/ (root)`; the `.nojekyll` file ensures `_expo` assets are served.

## Included

- English, Arabic, Urdu, Hindi, Spanish, Russian and French across interface, routines and exercise instructions. Arabic and Urdu use explicit RTL layout without restarting the app.
- Six adult general-fitness routines with eight exercise guides. Filter by location, category or experience and search titles.
- Local profile with goal and experience used for the daily recommendation. No password or fake sign-in.
- Guided workout runner: complete each set, take a timed rest, pause/resume, and record only fully completed sessions. Timed movements must reach their countdown before completion. Sessions pause when the app goes into the background; they do not count hidden time.
- Weight input supports decimal commas and Arabic/Urdu numerals. Recent weight trend, weight history and workout history use real records, not sample data. Monday-based weekly totals.
- AsyncStorage persistence with validation, visible save failures, JSON export/restore and local deletion. Backup restore replaces current data after confirmation. Backup import accepts only the app schema.
- Original animated male and female vector mannequins for every exercise, inside routine details and the active workout. Movement-specific wall, bench, dumbbells and mat; pause/play, slow motion, reduced-motion support and background suspension. Animations are illustrated guides, not motion capture or clinical form analysis.
- No subscriptions, ads, analytics or tracking SDKs. All included features are free.

## Important current limits

**This is an initial implementation, not a production store release.** There are no online accounts, server, cloud sync, social features, push notifications, subscriptions or embedded instructional videos. The clearly labelled demonstration button opens an external YouTube search; video rights and instructor-reviewed, localized media remain to be supplied. Routines and translations need qualified fitness and native-language review before broad release. Profile recommendations are simple filters, not personal medical prescriptions.

Local data is not encrypted and may be lost if the app is removed or device data is cleared. Users should protect the device and keep private backups. A storage read/validation failure blocks overwriting the original data until a restore or explicit reset. Backups contain personal records: do not add them to this public repository.

## Android and iOS builds

`eas.json` includes preview APK and production build profiles. The app identifiers are placeholders to verify with the owner before first publication.

```bash
npx eas-cli@latest login
npx eas-cli@latest build:configure
npx eas-cli@latest build --platform android --profile preview
npx eas-cli@latest build --platform all --profile production
```

EAS configuration requires the owner's Expo project, signing credentials and developer accounts. Before submission: test on real Android/iOS devices (including RTL, accessibility and backup recovery), add final app icons/splash art/screenshots, finish content and translation reviews, host a public privacy policy, complete store privacy/data-safety declarations, confirm the app name and bundle IDs, and generate signed builds. Do not claim HealthKit/Health Connect integration; none exists.

See [Expo documentation](https://docs.expo.dev/versions/v55.0.0/) for this SDK and [EAS build](https://docs.expo.dev/build/introduction/) for signing and distribution.

## Source layout

- `App.js`: screens, local persistence, confirmation dialogs and workout runner.
- `src/i18n.js`: complete seven-language UI strings.
- `src/data.js`: original exercise instructions and starter routines.
- `src/model.js`: weight parsing, backup validation, set sequencing, progress calculations.
- `src/movement.js`: original pose interpolation and male/female SVG mannequins.
- `src/ExerciseDemo.js`: accessible motion controls and lifecycle management.
- `tests/model.test.js`: language coverage, backup validation, input and workout/progress logic.
- `.github/workflows/check.yml`: tests and native/web JavaScript bundle validation.

## Validation

See `VALIDATION.md` for the checks actually run in the development environment and outstanding device checks. Bundling alone does not establish real-device readiness.
