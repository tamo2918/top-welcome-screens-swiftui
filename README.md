<p align="center">
  <a href="https://appllama.io">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./docs/images/appllama-logo-dark.png">
      <source media="(prefers-color-scheme: light)" srcset="./docs/images/appllama-logo-light.png">
      <img src="./docs/images/appllama-logo-light.png" width="270" alt="Appllama">
    </picture>
  </a>
</p>

<h1 align="center">React Native Expo Splash Screens — 10 Welcome Animations</h1>

<p align="center">
  An open-source collection of animated splash screens, loading screens, welcome screens, and onboarding UI studies inspired by leading iOS apps.
</p>

<p align="center">
  <a href="https://github.com/Appllama/top-welcome-screens/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/Appllama/top-welcome-screens/actions/workflows/ci.yml/badge.svg"></a>
  <img alt="Expo SDK 57" src="https://img.shields.io/badge/Expo_SDK-57-000020?logo=expo&logoColor=white">
  <img alt="React Native 0.86" src="https://img.shields.io/badge/React_Native-0.86-61DAFB?logo=react&logoColor=111827">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white">
  <a href="./LICENSE"><img alt="GPL-3.0 License" src="https://img.shields.io/badge/Code-GPL--3.0-F2C94C"></a>
</p>

<p align="center">
  <a href="#the-10-welcome-screens">Explore screens</a>
  ·
  <a href="#copy-paste-prompts">Copy a prompt</a>
  ·
  <a href="#run-the-expo-gallery">Run locally</a>
  ·
  <a href="#react-native-welcome-screen-api">Use the API</a>
  ·
  <a href="#educational-use-and-intellectual-property">Legal notice</a>
</p>

![Duolingo, Strava, MyFitnessPal, Perplexity, and Yazio inspired React Native Expo splash and welcome screens](./docs/images/welcome-screens-showcase-01.png)

![onX Hunt, Speak and Learn, Hallow, SCRL, and Speak Language inspired React Native Expo onboarding screens](./docs/images/welcome-screens-showcase-02.png)

<p align="center"><sub>Showcase artwork uses simulator captures of this implementation. Original reference clips and stills are not redistributed.</sub></p>

> [!IMPORTANT]
> **Educational reference only.** This is an independent, unofficial Appllama project and is not affiliated with or endorsed by any referenced company. Do not ship these screens unchanged. Before any public or commercial use, replace every third-party name, logo, mascot, image, phrase, color system, and other brand element, then make the final layout and motion meaningfully unique. [Read the full intellectual-property notice](#educational-use-and-intellectual-property).

## 10 screens. One Expo project. Copy any one.

Top Welcome Screens is a React Native Expo UI kit built for developers studying how polished mobile onboarding works. Every example is a full-height TypeScript component powered by React Native Reanimated, with an authored timeline, responsive scaling, reduced-motion handling, accessible actions, and a deterministic final-state mode.

You can:

- run all ten examples from one Expo Router app;
- copy one named component into an existing app;
- paste a screen-specific prompt into Codex, Claude Code, Cursor, or another coding agent;
- trigger every visible action through typed semantic IDs; and
- inspect the recovered motion timings and generated-asset provenance.

The project comes from the product-flow research behind [Appllama](https://appllama.io), a library of onboarding, paywall, and product UI from leading iOS apps.

## The 10 welcome screens

| UI study | Screen ID | Component | Entrance | Source | Agent prompt |
| --- | --- | --- | ---: | --- | --- |
| Duolingo-inspired | <code>duolingo</code> | <code>DuolingoWelcome</code> | 2.667 s | [View source](./src/welcome-screens/duolingo.tsx) | [Copy prompt](#prompt-duolingo) |
| Strava-inspired | <code>strava</code> | <code>StravaWelcome</code> | 6.600 s | [View source](./src/welcome-screens/strava.tsx) | [Copy prompt](#prompt-strava) |
| MyFitnessPal-inspired | <code>myfitnesspal</code> | <code>MyFitnessPalWelcome</code> | 8.867 s | [View source](./src/welcome-screens/myfitnesspal.tsx) | [Copy prompt](#prompt-myfitnesspal) |
| Perplexity-inspired | <code>perplexity</code> | <code>PerplexityWelcome</code> | Final state | [View source](./src/welcome-screens/perplexity.tsx) | [Copy prompt](#prompt-perplexity) |
| Yazio-inspired | <code>yazio</code> | <code>YazioWelcome</code> | 1.733 s | [View source](./src/welcome-screens/yazio.tsx) | [Copy prompt](#prompt-yazio) |
| onX Hunt-inspired | <code>onx-hunt</code> | <code>OnxHuntWelcome</code> | 1.467 s | [View source](./src/welcome-screens/onx-hunt.tsx) | [Copy prompt](#prompt-onx-hunt) |
| Speak & Learn-inspired | <code>speak-learn</code> | <code>SpeakLearnWelcome</code> | 4.940 s | [View source](./src/welcome-screens/speak-learn.tsx) | [Copy prompt](#prompt-speak-learn) |
| Hallow-inspired | <code>hallow</code> | <code>HallowWelcome</code> | 4.500 s | [View source](./src/welcome-screens/hallow.tsx) | [Copy prompt](#prompt-hallow) |
| SCRL-inspired | <code>scrl</code> | <code>ScrlWelcome</code> | 1.999 s | [View source](./src/welcome-screens/scrl.tsx) | [Copy prompt](#prompt-scrl) |
| Speak: Language Learning-inspired | <code>speak-language</code> | <code>SpeakLanguageWelcome</code> | 5.070 s | [View source](./src/welcome-screens/speak-language.tsx) | [Copy prompt](#prompt-speak-language) |

Perplexity has no entrance animation because the research set contained only a final-state reference. The implementation deliberately avoids inventing unsupported motion.

## Copy-paste prompts

Open the matching section, use GitHub’s copy button, and paste the complete prompt into a coding agent while it is working inside your existing Expo app. Each prompt tells the agent exactly which repository files, assets, fonts, motion spec, and semantic actions to inspect.

The prompts are intentionally strict about preserving your current app architecture and intentionally strict about replacing third-party commercial identity before release.

<a id="prompt-duolingo"></a>
<details>
<summary><strong>Duolingo-inspired splash and welcome screen — copy prompt</strong></summary>

~~~text
You are working inside my existing Expo React Native repository.

Use https://github.com/Appllama/top-welcome-screens as a read-only technical reference. Integrate only the Duolingo-inspired splash and welcome implementation into my app. Do not turn my app into the gallery and do not modify unrelated features.

Reference files:
- src/welcome-screens/duolingo.tsx
- assets/welcome/duolingo/
- the Duolingo section of docs/MOTION_SPEC.md
- src/welcome-screens/shared/ and src/welcome-screens/types.ts, following only transitive imports used by the component
- src/app/_layout.tsx only as a font and asset preloading reference
- NOTICE.md and docs/ASSET_PROVENANCE.md

Public API:
- Component: DuolingoWelcome
- Screen ID: duolingo
- Fonts: Nunito_400Regular and Nunito_900Black
- Semantic actions: duolingo.get-started and duolingo.log-in
- Relevant packages: expo-asset, expo-font, expo-image, expo-status-bar, @expo-google-fonts/nunito, @react-native-masked-view/masked-view, react-native-reanimated, and react-native-worklets

Requirements:
1. Before editing, inspect my Expo SDK, React Native version, router, package manager, font loading, native splash configuration, authentication routes, and existing dependencies.
2. Copy only this component, its selected assets, and the transitive shared helpers it actually imports. Do not copy the demo router, Zustand gallery, or unrelated screens.
3. Preserve my package versions, navigation, state architecture, app configuration, and native projects. Install only missing compatible packages with npx expo install.
4. Load the exact font aliases and selected image assets before revealing the React tree. Adapt the loading pattern to my app instead of replacing my root layout.
5. Mount the component inside a full-height flex: 1 surface with no visible navigation header and no surrounding safe-area padding; the component owns its calibrated canvas and status bar.
6. Reproduce the reference behavior accurately: keep the 640×1385 ReferenceCanvas, authored Reanimated timing, easing, blink phases, reveal mask, autoplay and replayKey API, reduced-motion behavior, accessibility labels, and interaction gates. Do not replace the motion with a generic fade.
7. Wire every semantic action through onActionPress to my existing onboarding or authentication routes.
8. Treat this as an educational prototype. Before any public or commercial release, replace every third-party name, logo, mascot, phrase, image, and brand color with authorized original branding, then make the final composition and motion meaningfully unique.
9. Validate autoplay, autoplay={false}, replay, reduced motion, every action, TypeScript, lint, an iPhone simulator, and one Android viewport.
10. Finish by summarizing every file and dependency changed.
~~~

</details>

<a id="prompt-strava"></a>
<details>
<summary><strong>Strava-inspired animated splash and welcome screen — copy prompt</strong></summary>

~~~text
You are working inside my existing Expo React Native repository.

Use https://github.com/Appllama/top-welcome-screens as a read-only technical reference. Integrate only the Strava-inspired animated splash and welcome implementation into my app. Do not turn my app into the gallery and do not modify unrelated features.

Reference files:
- src/welcome-screens/strava.tsx
- assets/welcome/strava/
- the Strava section of docs/MOTION_SPEC.md
- src/welcome-screens/shared/ and src/welcome-screens/types.ts, following only transitive imports used by the component
- src/app/_layout.tsx only as a font and asset preloading reference
- NOTICE.md and docs/ASSET_PROVENANCE.md

Public API:
- Component: StravaWelcome
- Screen ID: strava
- Fonts: Inter_400Regular and Inter_600SemiBold
- Semantic actions: strava.join-for-free and strava.log-in
- Relevant packages: expo-asset, expo-font, expo-image, expo-status-bar, @expo-google-fonts/inter, react-native-reanimated, and react-native-worklets

Requirements:
1. Before editing, inspect my Expo SDK, React Native version, router, package manager, font loading, native splash configuration, authentication routes, and existing dependencies.
2. Copy only this component, its selected assets, and the transitive shared helpers it actually imports. Do not copy the demo router, Zustand gallery, or unrelated screens.
3. Preserve my package versions, navigation, state architecture, app configuration, and native projects. Install only missing compatible packages with npx expo install.
4. Load the exact font aliases and selected image assets before revealing the React tree. Adapt the loading pattern to my app instead of replacing my root layout.
5. Mount the component inside a full-height flex: 1 surface with no visible navigation header and no surrounding safe-area padding; the component owns its calibrated canvas and status bar.
6. Reproduce the reference behavior accurately: keep the 640×1385 ReferenceCanvas, authored Reanimated timing, spinner interval, hard cut, autoplay and replayKey API, reduced-motion behavior, accessibility labels, and interaction gates. Do not replace the motion with a generic fade.
7. Wire every semantic action through onActionPress to my existing onboarding or authentication routes.
8. Treat this as an educational prototype. Before any public or commercial release, replace every third-party name, logo, phrase, image, and brand color with authorized original branding, then make the final composition and motion meaningfully unique.
9. Validate autoplay, autoplay={false}, replay, reduced motion, every action, TypeScript, lint, an iPhone simulator, and one Android viewport.
10. Finish by summarizing every file and dependency changed.
~~~

</details>

<a id="prompt-myfitnesspal"></a>
<details>
<summary><strong>MyFitnessPal-inspired loading and welcome screen — copy prompt</strong></summary>

~~~text
You are working inside my existing Expo React Native repository.

Use https://github.com/Appllama/top-welcome-screens as a read-only technical reference. Integrate only the MyFitnessPal-inspired loading and welcome implementation into my app. Do not turn my app into the gallery and do not modify unrelated features.

Reference files:
- src/welcome-screens/myfitnesspal.tsx
- assets/welcome/myfitnesspal/
- the MyFitnessPal section of docs/MOTION_SPEC.md
- src/welcome-screens/shared/ and src/welcome-screens/types.ts, following only transitive imports used by the component
- src/app/_layout.tsx only as a font and asset preloading reference
- NOTICE.md and docs/ASSET_PROVENANCE.md

Public API:
- Component: MyFitnessPalWelcome
- Screen ID: myfitnesspal
- Fonts: Inter_400Regular, Inter_600SemiBold, and Inter_700Bold
- Semantic actions: myfitnesspal.sign-up-for-free and myfitnesspal.log-in
- Relevant packages: expo-asset, expo-font, expo-image, expo-status-bar, @expo-google-fonts/inter, react-native-reanimated, and react-native-worklets

Requirements:
1. Before editing, inspect my Expo SDK, React Native version, router, package manager, font loading, native splash configuration, authentication routes, and existing dependencies.
2. Copy only this component, its selected assets, and the transitive shared helpers it actually imports. Do not copy the demo router, Zustand gallery, or unrelated screens.
3. Preserve my package versions, navigation, state architecture, app configuration, and native projects. Install only missing compatible packages with npx expo install.
4. Load the exact font aliases and selected image assets before revealing the React tree. Adapt the loading pattern to my app instead of replacing my root layout.
5. Mount the component inside a full-height flex: 1 surface with no visible navigation header and no surrounding safe-area padding; the component owns its calibrated canvas and status bar.
6. Reproduce the reference behavior accurately: keep the 640×1385 ReferenceCanvas, the Updating-to-Loading text switch, hard cut, authored Reanimated timing, autoplay and replayKey API, reduced-motion behavior, accessibility labels, and interaction gates. Do not replace the motion with a generic fade.
7. Wire every semantic action through onActionPress to my existing onboarding or authentication routes.
8. Treat this as an educational prototype. Before any public or commercial release, replace every third-party name, logo, phrase, image, and brand color with authorized original branding, then make the final composition and motion meaningfully unique.
9. Validate autoplay, autoplay={false}, replay, reduced motion, every action, TypeScript, lint, an iPhone simulator, and one Android viewport.
10. Finish by summarizing every file and dependency changed.
~~~

</details>

<a id="prompt-perplexity"></a>
<details>
<summary><strong>Perplexity-inspired account welcome screen — copy prompt</strong></summary>

~~~text
You are working inside my existing Expo React Native repository.

Use https://github.com/Appllama/top-welcome-screens as a read-only technical reference. Integrate only the Perplexity-inspired account welcome implementation into my app. Do not turn my app into the gallery and do not modify unrelated features.

Reference files:
- src/welcome-screens/perplexity.tsx
- assets/welcome/perplexity/
- the Perplexity section of docs/MOTION_SPEC.md
- src/welcome-screens/shared/ and src/welcome-screens/types.ts, following only transitive imports used by the component
- src/app/_layout.tsx only as a font and asset preloading reference
- NOTICE.md and docs/ASSET_PROVENANCE.md

Public API:
- Component: PerplexityWelcome
- Screen ID: perplexity
- Fonts: Inter_400Regular and Inter_500Medium
- Semantic actions: perplexity.close, perplexity.continue-with-apple, perplexity.continue-with-google, perplexity.sign-in-with-email, perplexity.single-sign-on, perplexity.privacy-policy, and perplexity.terms-of-service
- Relevant packages: expo-asset, expo-font, expo-image, expo-status-bar, @expo-google-fonts/inter, and react-native-svg

Requirements:
1. Before editing, inspect my Expo SDK, React Native version, router, package manager, font loading, native splash configuration, authentication routes, legal routes, and existing dependencies.
2. Copy only this component, its selected assets, and the transitive shared helpers it actually imports. Do not copy the demo router, Zustand gallery, or unrelated screens.
3. Preserve my package versions, navigation, state architecture, app configuration, and native projects. Install only missing compatible packages with npx expo install.
4. Load the exact font aliases and selected image assets before revealing the React tree. Adapt the loading pattern to my app instead of replacing my root layout.
5. Mount the component inside a full-height flex: 1 surface with no visible navigation header and no surrounding safe-area padding; the component owns its calibrated canvas and status bar.
6. Render the final state immediately. The research set contains no Perplexity motion clip, so do not invent an entrance animation. Preserve the 640×1385 ReferenceCanvas, accessibility labels, and interaction behavior.
7. Wire every semantic action through onActionPress to my existing authentication, SSO, close, privacy, and terms routes.
8. Treat this as an educational prototype. Before any public or commercial release, replace every third-party name, logo, phrase, icon treatment, and brand color with authorized original branding, then make the final composition meaningfully unique.
9. Validate every action, TypeScript, lint, an iPhone simulator, and one Android viewport.
10. Finish by summarizing every file and dependency changed.
~~~

</details>

<a id="prompt-yazio"></a>
<details>
<summary><strong>Yazio-inspired animated splash and onboarding screen — copy prompt</strong></summary>

~~~text
You are working inside my existing Expo React Native repository.

Use https://github.com/Appllama/top-welcome-screens as a read-only technical reference. Integrate only the Yazio-inspired animated splash and onboarding implementation into my app. Do not turn my app into the gallery and do not modify unrelated features.

Reference files:
- src/welcome-screens/yazio.tsx
- assets/welcome/yazio/
- the Yazio section of docs/MOTION_SPEC.md
- src/welcome-screens/shared/ and src/welcome-screens/types.ts, following only transitive imports used by the component
- src/app/_layout.tsx only as a font and asset preloading reference
- NOTICE.md and docs/ASSET_PROVENANCE.md

Public API:
- Component: YazioWelcome
- Screen ID: yazio
- Fonts: Nunito_800ExtraBold and Nunito_900Black
- Semantic actions: yazio.get-started and yazio.log-in
- Relevant packages: expo-asset, expo-font, expo-image, expo-status-bar, @expo-google-fonts/nunito, react-native-reanimated, and react-native-worklets

Requirements:
1. Before editing, inspect my Expo SDK, React Native version, router, package manager, font loading, native splash configuration, authentication routes, and existing dependencies.
2. Copy only this component, its selected assets, and the transitive shared helpers it actually imports. Do not copy the demo router, Zustand gallery, or unrelated screens.
3. Preserve my package versions, navigation, state architecture, app configuration, and native projects. Install only missing compatible packages with npx expo install.
4. Load the exact font aliases and all selected image assets before revealing the React tree. Adapt the loading pattern to my app instead of replacing my root layout.
5. Mount the component inside a full-height flex: 1 surface with no visible navigation header and no surrounding safe-area padding; the component owns its calibrated canvas and status bar.
6. Reproduce the reference behavior accurately: keep the 640×1385 ReferenceCanvas, authored crossfade, separately staggered spring assets, hard final-state swap, autoplay and replayKey API, reduced-motion behavior, accessibility labels, and interaction gates. Do not replace the motion with a generic fade.
7. Wire every semantic action through onActionPress to my existing onboarding or authentication routes.
8. Treat this as an educational prototype. Before any public or commercial release, replace every third-party name, logo, illustration, phrase, and brand color with authorized original branding, then make the final composition and motion meaningfully unique.
9. Validate autoplay, autoplay={false}, replay, reduced motion, every action, TypeScript, lint, an iPhone simulator, and one Android viewport.
10. Finish by summarizing every file and dependency changed.
~~~

</details>

<a id="prompt-onx-hunt"></a>
<details>
<summary><strong>onX Hunt-inspired splash and sign-in screen — copy prompt</strong></summary>

~~~text
You are working inside my existing Expo React Native repository.

Use https://github.com/Appllama/top-welcome-screens as a read-only technical reference. Integrate only the onX Hunt-inspired splash and sign-in implementation into my app. Do not turn my app into the gallery and do not modify unrelated features.

Reference files:
- src/welcome-screens/onx-hunt.tsx
- assets/welcome/onx-hunt/
- the onX Hunt section of docs/MOTION_SPEC.md
- src/welcome-screens/shared/ and src/welcome-screens/types.ts, following only transitive imports used by the component
- src/app/_layout.tsx only as a font and asset preloading reference
- NOTICE.md and docs/ASSET_PROVENANCE.md

Public API:
- Component: OnxHuntWelcome
- Screen ID: onx-hunt
- Fonts: Inter_400Regular, Inter_600SemiBold, and Nunito_900Black
- Semantic actions: onx-hunt.continue-with-apple, onx-hunt.continue-with-google, onx-hunt.sign-up-with-email, and onx-hunt.log-in
- Relevant packages: expo-asset, expo-font, expo-image, expo-linear-gradient, expo-status-bar, @expo-google-fonts/inter, @expo-google-fonts/nunito, react-native-reanimated, react-native-svg, and react-native-worklets

Requirements:
1. Before editing, inspect my Expo SDK, React Native version, router, package manager, font loading, native splash configuration, authentication routes, and existing dependencies.
2. Copy only this component, its selected assets, and the transitive shared helpers it actually imports. Do not copy the demo router, Zustand gallery, or unrelated screens.
3. Preserve my package versions, navigation, state architecture, app configuration, and native projects. Install only missing compatible packages with npx expo install.
4. Load the exact font aliases and selected image assets before revealing the React tree. Adapt the loading pattern to my app instead of replacing my root layout.
5. Mount the component inside a full-height flex: 1 surface with no visible navigation header and no surrounding safe-area padding; the component owns its calibrated canvas and status bar.
6. Reproduce the reference behavior accurately: keep the 640×1385 ReferenceCanvas, authored splash hold and hard cut, terrain treatment, autoplay and replayKey API, reduced-motion behavior, accessibility labels, and interaction gates. Do not replace the motion with a generic fade.
7. Wire every semantic action through onActionPress to my existing Apple, Google, email-signup, and login routes.
8. Treat this as an educational prototype. Before any public or commercial release, replace every third-party name, logo, map treatment, phrase, image, and brand color with authorized original branding, then make the final composition and motion meaningfully unique.
9. Validate autoplay, autoplay={false}, replay, reduced motion, every action, TypeScript, lint, an iPhone simulator, and one Android viewport.
10. Finish by summarizing every file and dependency changed.
~~~

</details>

<a id="prompt-speak-learn"></a>
<details>
<summary><strong>Speak & Learn-inspired animated welcome screen — copy prompt</strong></summary>

~~~text
You are working inside my existing Expo React Native repository.

Use https://github.com/Appllama/top-welcome-screens as a read-only technical reference. Integrate only the Speak & Learn-inspired animated splash and welcome implementation into my app. Do not turn my app into the gallery and do not modify unrelated features.

Reference files:
- src/welcome-screens/speak-learn.tsx
- assets/welcome/speak-learn/
- the Speak & Learn section of docs/MOTION_SPEC.md
- src/welcome-screens/shared/ and src/welcome-screens/types.ts, following only transitive imports used by the component
- src/app/_layout.tsx only as a font and asset preloading reference
- NOTICE.md and docs/ASSET_PROVENANCE.md

Public API:
- Component: SpeakLearnWelcome
- Screen ID: speak-learn
- Fonts: Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, and Nunito_900Black
- Semantic actions: speak-learn.log-in, speak-learn.lets-go, speak-learn.privacy-policy, and speak-learn.terms-of-service
- Relevant packages: expo-asset, expo-font, expo-image, expo-linear-gradient, expo-status-bar, @expo-google-fonts/nunito, react-native-reanimated, react-native-svg, and react-native-worklets

Requirements:
1. Before editing, inspect my Expo SDK, React Native version, router, package manager, font loading, native splash configuration, authentication routes, legal routes, and existing dependencies.
2. Copy only this component, its selected assets, and the transitive shared helpers it actually imports. Do not copy the demo router, Zustand gallery, or unrelated screens.
3. Preserve my package versions, navigation, state architecture, app configuration, and native projects. Install only missing compatible packages with npx expo install.
4. Load the exact font aliases and selected image assets before revealing the React tree. Adapt the loading pattern to my app instead of replacing my root layout.
5. Mount the component inside a full-height flex: 1 surface with no visible navigation header and no surrounding safe-area padding; the component owns its calibrated canvas and status bar.
6. Reproduce the reference behavior accurately: keep the 640×1385 ReferenceCanvas, layered logo motion, speech-bubble timing, authored slide-in, autoplay and replayKey API, reduced-motion behavior, accessibility labels, and interaction gates. Do not replace the motion with a generic fade.
7. Wire every semantic action through onActionPress to my existing login, start, privacy, and terms routes.
8. Treat this as an educational prototype. Before any public or commercial release, replace every third-party name, logo, testimonial, statistic, portrait, phrase, image, and brand color with authorized original material, then make the final composition and motion meaningfully unique.
9. Validate autoplay, autoplay={false}, replay, reduced motion, every action, TypeScript, lint, an iPhone simulator, and one Android viewport.
10. Finish by summarizing every file and dependency changed.
~~~

</details>

<a id="prompt-hallow"></a>
<details>
<summary><strong>Hallow-inspired loading and prayer welcome screen — copy prompt</strong></summary>

~~~text
You are working inside my existing Expo React Native repository.

Use https://github.com/Appllama/top-welcome-screens as a read-only technical reference. Integrate only the Hallow-inspired loading and prayer welcome implementation into my app. Do not turn my app into the gallery and do not modify unrelated features.

Reference files:
- src/welcome-screens/hallow.tsx
- assets/welcome/hallow/
- the Hallow section of docs/MOTION_SPEC.md
- src/welcome-screens/shared/ and src/welcome-screens/types.ts, following only transitive imports used by the component
- src/app/_layout.tsx only as a font and asset preloading reference
- NOTICE.md and docs/ASSET_PROVENANCE.md

Public API:
- Component: HallowWelcome
- Screen ID: hallow
- Fonts: Inter_400Regular, Inter_600SemiBold, Inter_700Bold, and Nunito_900Black
- Semantic actions: hallow.close, hallow.continue-with-email, hallow.continue-with-apple, hallow.continue-with-google, and hallow.terms
- Relevant packages: expo-asset, expo-font, expo-image, expo-linear-gradient, expo-status-bar, @expo-google-fonts/inter, @expo-google-fonts/nunito, react-native-reanimated, react-native-svg, and react-native-worklets

Requirements:
1. Before editing, inspect my Expo SDK, React Native version, router, package manager, font loading, native splash configuration, authentication routes, legal routes, and existing dependencies.
2. Copy only this component, its selected assets, and the transitive shared helpers it actually imports. Do not copy the demo router, Zustand gallery, or unrelated screens.
3. Preserve my package versions, navigation, state architecture, app configuration, and native projects. Install only missing compatible packages with npx expo install.
4. Load the exact font aliases and selected image assets before revealing the React tree. Adapt the loading pattern to my app instead of replacing my root layout.
5. Mount the component inside a full-height flex: 1 surface with no visible navigation header and no surrounding safe-area padding; the component owns its calibrated canvas and status bar.
6. Reproduce the reference behavior accurately: keep the 640×1385 ReferenceCanvas, splash color interpolation, loader-dot pulse, version timing, final dissolve, autoplay and replayKey API, reduced-motion behavior, accessibility labels, and interaction gates. Do not replace the motion with a generic fade.
7. Wire every semantic action through onActionPress to my existing close, email, Apple, Google, and terms routes.
8. Treat this as an educational prototype. Before any public or commercial release, replace every third-party name, logo, illustration, phrase, image, and brand color with authorized original material, then make the final composition and motion meaningfully unique.
9. Validate autoplay, autoplay={false}, replay, reduced motion, every action, TypeScript, lint, an iPhone simulator, and one Android viewport.
10. Finish by summarizing every file and dependency changed.
~~~

</details>

<a id="prompt-scrl"></a>
<details>
<summary><strong>SCRL-inspired photo collage splash and welcome screen — copy prompt</strong></summary>

~~~text
You are working inside my existing Expo React Native repository.

Use https://github.com/Appllama/top-welcome-screens as a read-only technical reference. Integrate only the SCRL-inspired photo collage splash and welcome implementation into my app. Do not turn my app into the gallery and do not modify unrelated features.

Reference files:
- src/welcome-screens/scrl.tsx
- assets/welcome/scrl/
- the SCRL section of docs/MOTION_SPEC.md
- src/welcome-screens/shared/ and src/welcome-screens/types.ts, following only transitive imports used by the component
- src/app/_layout.tsx only as a font and asset preloading reference
- NOTICE.md and docs/ASSET_PROVENANCE.md

Public API:
- Component: ScrlWelcome
- Screen ID: scrl
- Fonts: Inter_400Regular, Inter_500Medium, Inter_600SemiBold, and Inter_700Bold
- Semantic actions: scrl.get-started and scrl.sign-in
- Relevant packages: expo-asset, expo-font, expo-image, expo-status-bar, @expo-google-fonts/inter, react-native-reanimated, react-native-svg, and react-native-worklets

Requirements:
1. Before editing, inspect my Expo SDK, React Native version, router, package manager, font loading, native splash configuration, authentication routes, and existing dependencies.
2. Copy only this component, its selected assets, and the transitive shared helpers it actually imports. Do not copy the demo router, Zustand gallery, or unrelated screens.
3. Preserve my package versions, navigation, state architecture, app configuration, and native projects. Install only missing compatible packages with npx expo install.
4. Load the exact font aliases and selected image assets before revealing the React tree. Adapt the loading pattern to my app instead of replacing my root layout.
5. Mount the component inside a full-height flex: 1 surface with no visible navigation header and no surrounding safe-area padding; the component owns its calibrated canvas and status bar.
6. Reproduce the reference behavior accurately: keep the 640×1385 ReferenceCanvas, splash hold, skeleton cut, layered reveal timing, autoplay and replayKey API, reduced-motion behavior, accessibility labels, and interaction gates. Do not replace the motion with a generic fade.
7. Wire every semantic action through onActionPress to my existing onboarding and sign-in routes.
8. Treat this as an educational prototype. Before any public or commercial release, replace every third-party name, logo, award, photograph, phrase, image, and brand treatment with authorized original material, then make the final composition and motion meaningfully unique.
9. Validate autoplay, autoplay={false}, replay, reduced motion, every action, TypeScript, lint, an iPhone simulator, and one Android viewport.
10. Finish by summarizing every file and dependency changed.
~~~

</details>

<a id="prompt-speak-language"></a>
<details>
<summary><strong>Speak: Language Learning-inspired onboarding animation — copy prompt</strong></summary>

~~~text
You are working inside my existing Expo React Native repository.

Use https://github.com/Appllama/top-welcome-screens as a read-only technical reference. Integrate only the Speak: Language Learning-inspired splash and onboarding implementation into my app. Do not turn my app into the gallery and do not modify unrelated features.

Reference files:
- src/welcome-screens/speak-language.tsx
- assets/welcome/speak-language/
- the Speak: Language Learning section of docs/MOTION_SPEC.md
- src/welcome-screens/shared/ and src/welcome-screens/types.ts, following only transitive imports used by the component
- src/app/_layout.tsx only as a font and asset preloading reference
- NOTICE.md and docs/ASSET_PROVENANCE.md

Public API:
- Component: SpeakLanguageWelcome
- Screen ID: speak-language
- Fonts: Inter_400Regular, Inter_600SemiBold, Inter_700Bold, and Inter_800ExtraBold
- Semantic actions: speak-language.sign-in, speak-language.tap-to-continue, and speak-language.start-speaking-today
- Relevant packages: expo-asset, expo-font, expo-image, expo-status-bar, @expo-google-fonts/inter, react-native-reanimated, and react-native-worklets

Requirements:
1. Before editing, inspect my Expo SDK, React Native version, router, package manager, font loading, native splash configuration, authentication routes, and existing dependencies.
2. Copy only this component, its selected assets, and the transitive shared helpers it actually imports. Do not copy the demo router, Zustand gallery, or unrelated screens.
3. Preserve my package versions, navigation, state architecture, app configuration, and native projects. Install only missing compatible packages with npx expo install.
4. Load the exact font aliases and selected image assets before revealing the React tree. Adapt the loading pattern to my app instead of replacing my root layout.
5. Mount the component inside a full-height flex: 1 surface with no visible navigation header and no surrounding safe-area padding; the component owns its calibrated canvas and status bar.
6. Reproduce the reference behavior accurately: keep the 640×1385 ReferenceCanvas, launch dissolve, page-to-page slide timings, tap interval, final CTA fade, autoplay and replayKey API, reduced-motion behavior, accessibility labels, and interaction gates. Do not replace the motion with a generic fade.
7. Wire every semantic action through onActionPress to my existing sign-in, onboarding-advance, and start routes.
8. Treat this as an educational prototype. Before any public or commercial release, replace every third-party name, logo, phrase, image, and brand color with authorized original material, then make the final composition and motion meaningfully unique.
9. Validate autoplay, autoplay={false}, replay, reduced motion, every action, TypeScript, lint, an iPhone simulator, and one Android viewport.
10. Finish by summarizing every file and dependency changed.
~~~

</details>

## Run the Expo gallery

Requirements: Node.js 22.13 or newer, Xcode for iOS, or Android Studio for Android.

~~~bash
git clone https://github.com/Appllama/top-welcome-screens.git
cd top-welcome-screens
npm ci
npm run ios
~~~

The default route opens Duolingo. Every implementation also has a direct route:

~~~text
/duolingo
/strava
/myfitnesspal
/perplexity
/yazio
/onx-hunt
/speak-learn
/hallow
/scrl
/speak-language
~~~

Switch screens without adding a visible gallery control:

~~~bash
npx uri-scheme open "welcome-showcase://strava" --ios
npx uri-scheme open "welcome-showcase://speak-language?motion=0" --ios
~~~

<code>motion=0</code> jumps to the deterministic final state. Change the <code>replay</code> query value to restart a mounted route, for example <code>/yazio?replay=2</code>.

## Expo splash screen vs. animated welcome screen

These solve two different startup moments:

| Layer | When it appears | What owns it |
| --- | --- | --- |
| Native Expo splash screen | Before JavaScript and React Native are ready | The native configuration generated from the <code>expo-splash-screen</code> plugin |
| Animated welcome or loading screen | After the React tree can render | A React Native component such as the ten examples in this repository |

For a seamless handoff, keep the native splash visible while the selected fonts and images preload, hide it only when those assets are ready, then mount the animated screen. The demo implements that handoff in [<code>src/app/_layout.tsx</code>](./src/app/_layout.tsx).

Expo notes that splash-screen behavior should be validated in a release or internal build because Expo Go and development builds do not perfectly reproduce the standalone result. See the official [Expo splash screen and app icon guide](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/) and [SplashScreen API](https://docs.expo.dev/versions/latest/sdk/splash-screen/).

Use only your own authorized branding in the native splash. It is part of the shipped product, not an educational preview layer.

## React Native welcome screen API

### Import one component

~~~tsx
import {
  DuolingoWelcome,
  type WelcomeActionId,
} from './src/welcome-screens';

function handleWelcomeAction(actionId: WelcomeActionId) {
  if (actionId === 'duolingo.get-started') {
    // Navigate to your original onboarding flow.
  }

  if (actionId === 'duolingo.log-in') {
    // Navigate to your existing sign-in flow.
  }
}

export function Onboarding() {
  return <DuolingoWelcome onActionPress={handleWelcomeAction} />;
}
~~~

### Select from the typed registry

~~~tsx
import {
  WelcomeScreen,
  type WelcomeScreenId,
} from './src/welcome-screens';

export function Preview({ name }: { name: WelcomeScreenId }) {
  return (
    <WelcomeScreen
      autoplay={false}
      name={name}
      onActionPress={(actionId) => console.log(actionId)}
    />
  );
}
~~~

### Switch privately with Zustand

<code>WelcomeGallery</code> renders no picker or debug chrome. Drive it from your own debug menu, deep-link handler, or test harness:

~~~tsx
import { useWelcomeStore, WelcomeGallery } from './src';

export function RootWelcome() {
  return <WelcomeGallery />;
}

useWelcomeStore.getState().setActiveScreen('strava');
useWelcomeStore.getState().replay();
~~~

### Source-distributed Git dependency

The package exports <code>src/index.ts</code>, so SDK-matched workspaces can consume it directly:

~~~bash
npm install github:Appllama/top-welcome-screens
~~~

~~~tsx
import { StravaWelcome } from 'welcome-screen-gallery';
~~~

The demo currently targets Expo SDK 57 and React Native 0.86. Existing apps on another Expo SDK should prefer the copy-paste prompt workflow so <code>npx expo install</code> can resolve compatible native dependency versions.

### Shared props

| Prop | Purpose |
| --- | --- |
| <code>autoplay</code> | Plays the authored entrance. <code>false</code> renders the deterministic final state. |
| <code>replayKey</code> | Restart a mounted animation by changing this value. |
| <code>onActionPress</code> | Receives a typed semantic ID for every supported provider, link, sign-in, continue, and close action. |
| <code>onPrimaryPress</code> | Backward-compatible handler for the primary or first-provider action. |
| <code>onSecondaryPress</code> | Backward-compatible handler for the secondary or second-provider action. |
| <code>onClosePress</code> | Backward-compatible handler for screens with a close control. |

<code>onActionPress</code> takes precedence when provided. <code>WelcomeActionId</code>, <code>WelcomeActionPressHandler</code>, <code>WELCOME_SCREEN_IDS</code>, and <code>WELCOME_SCREEN_METADATA</code> are exported for autocomplete and typed tooling.

## Motion, responsiveness, and accessibility

- **Reference canvas:** each layout is authored at 640×1385 and transformed through a shared responsive canvas.
- **Motion timelines:** Reanimated values use measured intervals documented in [<code>MOTION_SPEC.md</code>](./docs/MOTION_SPEC.md), including hard cuts where a dissolve would be inaccurate.
- **Responsive behavior:** reference-like iPhone ratios use a full-bleed cover transform; materially different portrait ratios use a uniform contain transform.
- **Reduced motion:** the shared timeline listens to the device preference and renders the final state immediately.
- **Interaction safety:** buttons remain inert and absent from the accessibility tree until their visible surface has appeared.
- **Asset loading:** the demo preloads all fonts and image modules before the animated React layer is shown.
- **Status bar:** the simulator or device owns the real status bar. Recorder chrome from the research captures is intentionally omitted.

## Project structure

~~~text
assets/welcome/                 Generated reference artwork by screen
docs/MOTION_SPEC.md             Recovered animation segments
docs/ASSET_PROVENANCE.md        Auditable generated-asset inventory
src/app/                        Expo Router demo
src/store/                      Hidden Zustand gallery state
src/welcome-screens/            Ten components, registry, types, and shared helpers
src/index.ts                    Source-distributed package entry
~~~

The third-party motion clips and final-state stills used during research are intentionally outside the repository. Only measured timing notes and newly generated reference artwork are distributed. See [<code>ASSET_PROVENANCE.md</code>](./docs/ASSET_PROVENANCE.md).

## Verification

~~~bash
npm run verify
~~~

The verification command runs:

1. TypeScript with <code>tsc --noEmit</code>;
2. Expo ESLint; and
3. a production static web export.

The same gates run in [GitHub Actions](./.github/workflows/ci.yml). The motion implementations were also calibrated in the iPhone simulator against 30 fps research captures.

## Frequently asked questions

### How do I add an animated splash screen in a React Native Expo app?

Keep the native Expo splash visible until JavaScript, fonts, and required images are ready. Then hide the native splash and mount one animated React component. The fastest safe path is to copy the matching prompt above into a coding agent working inside your app so it can adapt dependencies and routing to your Expo SDK.

### Can I use only one welcome screen without the gallery?

Yes. Import a named component such as <code>StravaWelcome</code>, or copy that component and only its transitive helpers and assets. The Expo Router demo and Zustand gallery are optional.

### Is this an Expo template or a React Native component library?

It is both a runnable Expo Router reference app and a source-distributed set of React Native UI components. The repository is optimized for learning, adapting, and integrating one screen at a time.

### Does it support iOS, Android, reduced motion, and responsive screens?

The components use Expo-compatible React Native APIs, shared responsive scaling, and the device reduced-motion preference. The original motion calibration was performed on iPhone; validate your branded adaptation on both an iPhone simulator and at least one Android viewport before release.

### Can I use these exact designs commercially?

No commercial-use permission for third-party intellectual property is granted. The original project code is GPL-3.0-licensed, but you must replace referenced brands and content, create a meaningfully unique production design, and obtain any clearance required for your use.

## Contributing

Issues and focused pull requests are welcome.

- Keep each screen independently importable.
- Preserve reduced-motion and accessibility behavior.
- Document any timing change in <code>docs/MOTION_SPEC.md</code>.
- Do not submit extracted production artwork, source screenshots, or source video from third-party apps.
- Record provenance for every new distributable bitmap.
- Run <code>npm run verify</code> before opening a pull request.

[Open an issue](https://github.com/Appllama/top-welcome-screens/issues) or [start a pull request](https://github.com/Appllama/top-welcome-screens/pulls).

## Educational use and intellectual property

This is an independent, unofficial project created by Appllama for education, UI research, and technical demonstration. It is not affiliated with, sponsored by, endorsed by, or authorized by Duolingo, Strava, MyFitnessPal, Perplexity, Yazio, onX, Speak & Learn, Hallow, SCRL, Speak, Apple, Google, or any other referenced company.

Third-party product names, trademarks, service marks, logos, icons, mascots, screen text, artwork, and other brand elements belong to their respective owners. They are referenced only to identify and study publicly visible onboarding, loading, welcome, and splash-screen patterns. Appllama claims no ownership of, and grants no license to, any third-party intellectual property.

The GNU General Public License v3.0 applies only to original project code and original material that Appllama is legally able to license. It does **not** grant permission to use third-party trademarks, copyrighted material, protected trade dress, or other proprietary material.

**Do not ship these reference implementations unchanged.** Before using an implementation in a public or commercial product, you must:

- replace every third-party name, logo, icon, mascot, illustration, image, statistic, and piece of copy;
- create your own independently designed colors, typography, spacing, composition, and motion language;
- remove anything that could imply affiliation, sponsorship, endorsement, or approval by a referenced company; and
- obtain any permissions or legal clearance required for your use and jurisdiction.

Changing only a logo, app name, or accent color may not be sufficient. Calling a use “educational” or “noncommercial,” adding attribution, or including this notice does not automatically make the use lawful or qualify it as fair use. Fair use is evaluated case by case.

This notice is informational, is not legal advice, and does not guarantee that any particular use is permitted. If you are uncertain, consult a qualified intellectual-property attorney before publishing or distributing your work. See the [full repository notice](./NOTICE.md), the [U.S. Copyright Office fair-use guidance](https://www.copyright.gov/fair-use/more-info.html), and the [USPTO trademark-infringement overview](https://www.uspto.gov/page/about-trademark-infringement).

Rights holders can request a correction or removal by [opening an issue](https://github.com/Appllama/top-welcome-screens/issues).

## License

Original source code is available under the [GNU General Public License v3.0](./LICENSE), subject to the third-party rights and exclusions explained above and in [<code>NOTICE.md</code>](./NOTICE.md).

## An open-source creation by Appllama

<p align="center">
  <a href="https://appllama.io">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./docs/images/appllama-logo-dark.png">
      <source media="(prefers-color-scheme: light)" srcset="./docs/images/appllama-logo-light.png">
      <img src="./docs/images/appllama-logo-light.png" width="230" alt="Appllama">
    </picture>
  </a>
</p>

<p align="center">
  Study the onboarding, paywall, and product flows behind leading iOS apps at
  <a href="https://appllama.io"><strong>appllama.io</strong></a>.
</p>

<p align="center">
  <a href="https://x.com/appllamaio">Follow @appllamaio on X</a>
  ·
  <a href="https://x.com/jaimintf">Created by @jaimintf</a>
  ·
  <a href="https://github.com/Appllama/top-welcome-screens">Star the repository</a>
</p>
