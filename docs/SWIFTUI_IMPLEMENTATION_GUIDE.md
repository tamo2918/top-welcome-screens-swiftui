# SwiftUI implementation guide

This document is the integration contract for developers and coding agents. It explains which files own layout, motion, resources, actions, and deterministic QA so a screen can be copied without importing the gallery shell.

## Non-negotiable behavior

- Native SwiftUI only; no Expo, React Native, JavaScript runtime, or animation bridge.
- Minimum deployment target is iOS 16.4.
- Layout is authored in a 640×1385 reference canvas.
- Timeline values use measured milliseconds from `MOTION_SPEC.md`.
- `autoplay: false` renders the exact completed state.
- Reduce Motion also renders the completed state immediately.
- Buttons are inaccessible and disabled until the matching reference interaction gate.
- Product navigation is injected; a replica view never owns the host app's router.
- Perplexity remains still-only because there is no source motion clip.

## Shared files

| File | Responsibility | Copy when integrating |
| --- | --- | --- |
| `Shared/ReferenceGeometry.swift` | Reference size, rectangles, absolute placement | Always |
| `Shared/ReferenceCanvas.swift` | Uniform display scaling, centering, clipping | Always |
| `Shared/MotionTimeline.swift` | 60 Hz elapsed time, easing, replay, Reduce Motion | Animated studies |
| `Shared/ReplicaAssets.swift` | Font aliases and bundle image loading | Always |
| `Shared/ReplicaControls.swift` | Buttons, symbols, custom shapes, colors | As imported |
| `Domain/WelcomeAction.swift` | Typed action IDs and fallback resolution | Recommended |
| `Domain/WelcomeScreenID.swift` | Gallery registry and durations | Gallery only |
| `Features/WelcomeScreen.swift` | Gallery's typed screen switch | Gallery only |

`ReferenceCanvas` must receive the full available display size. Its parent should normally use:

```swift
.frame(maxWidth: .infinity, maxHeight: .infinity)
```

Do not wrap a study in external safe-area padding. The 640×1385 layout already includes the original status-bar and bottom-control placement.

## Screen manifest

| ID | Source | Assets | Fonts | Semantic actions |
| --- | --- | --- | --- | --- |
| `duolingo` | `DuolingoWelcome.swift` | `welcome/duolingo` | Nunito Regular, Black | `duolingo.get-started`, `duolingo.log-in` |
| `strava` | `StravaWelcome.swift` | `welcome/strava` | Inter Regular, Semibold | `strava.join-for-free`, `strava.log-in` |
| `myfitnesspal` | `MyFitnessPalWelcome.swift` | `welcome/myfitnesspal` | Inter Regular, Semibold, Bold | `myfitnesspal.sign-up-for-free`, `myfitnesspal.log-in` |
| `perplexity` | `PerplexityWelcome.swift` | `welcome/perplexity` | Inter Regular, Medium | close, Apple, Google, email, SSO, privacy, terms |
| `yazio` | `YazioWelcome.swift` | `welcome/yazio` | Nunito ExtraBold, Black | `yazio.get-started`, `yazio.log-in` |
| `onx-hunt` | `OnxHuntWelcome.swift` | `welcome/onx-hunt` | Inter Regular, Semibold, Bold | Apple, Google, email, log in |
| `speak-learn` | `SpeakLearnWelcome.swift` | `welcome/speak-learn` | Nunito Regular, Semibold, Bold, Black | log in, let's go, privacy, terms |
| `hallow` | `HallowWelcome.swift` | `welcome/hallow` | Inter Regular, Medium, Semibold, Bold | close, email, Apple, Google, terms |
| `scrl` | `ScrlWelcome.swift` | `welcome/scrl` | Inter Regular, Medium, Semibold, Bold | `scrl.get-started`, `scrl.sign-in` |
| `speak-language` | `SpeakLanguageWelcome.swift` | `welcome/speak-language` | Inter Regular, Medium, Semibold, Bold | sign in, continue, start speaking |

The exhaustive raw action strings live in `WelcomeAction.swift`; treat that enum as the source of truth.

## Public view pattern

Animated studies use the same host-facing shape:

```swift
struct ExampleWelcome: View {
    var autoplay = true
    var replayKey: AnyHashable = 0
    var onActionPress: WelcomeActionPressHandler?
    var onPrimaryPress: (@MainActor () -> Void)?
    var onSecondaryPress: (@MainActor () -> Void)?

    var body: some View {
        MotionTimeline(
            durationMilliseconds: 2_000,
            autoplay: autoplay,
            replayKey: replayKey
        ) { frame in
            ReferenceCanvas(backgroundColor: .white) {
                content(frame)
            }
        }
    }
}
```

Use `frame.segment(from:to:)` for normalized 0...1 progress. Apply the documented easing function explicitly. Hard cuts remain Boolean time comparisons; they are not crossfades.

## Asset bundle contract

The Xcode target includes `assets/welcome` as a folder reference. At runtime its resources resolve as:

```text
welcome/<screen-id>/<asset-name>.png
```

Load them with:

```swift
ReplicaImage(screen: "duolingo", name: "mascot")
```

Available sizing modes are `.fit`, `.fill`, and `.stretch`. Preserve the sizing mode from the study because changing it alters crop and geometry.

Fonts are copied to `WelcomeScreenGallery/Resources/Fonts/` and registered in `Info.plist` under `UIAppFonts`. Use `ReplicaFont.fixed` instead of Dynamic Type for pixel-faithful study text. Host-app navigation and surrounding production UI should still use semantic Dynamic Type styles.

## Actions and host navigation

Prefer the typed handler:

```swift
WelcomeScreen(
    name: .hallow,
    onActionPress: { action in
        switch action {
        case .hallowContinueWithApple:
            authentication.signInWithApple()
        case .hallowTerms:
            router.openTerms()
        default:
            break
        }
    }
)
```

`onPrimaryPress`, `onSecondaryPress`, and `onClosePress` exist as lightweight fallbacks for single-screen copying. `onActionPress` wins when both are supplied.

## Adding a new study

1. Record the layout and timeline in `docs/MOTION_SPEC.md`.
2. Add generated or licensed assets to `assets/welcome/<screen-id>/` and update `ASSET_PROVENANCE.md`.
3. Create one isolated `*Welcome.swift` file.
4. Use `ReferenceCanvas`; never duplicate responsive scaling inside the screen.
5. Add typed actions to `WelcomeAction`.
6. Add its ID and duration to `WelcomeScreenID`.
7. Add exactly one case to `WelcomeScreen`.
8. Extend registry tests for the new expected counts.
9. Build and run tests.
10. Verify animated start, intermediate states, final state, replay, Reduce Motion, and every action in Simulator.

## Deterministic QA

Final-state screenshot:

```bash
xcrun simctl launch booted dev.appllama.welcomescreens \
  -welcome-screen yazio \
  -welcome-motion 0

xcrun simctl io booted screenshot /tmp/yazio-final.png
```

Replay:

```bash
xcrun simctl openurl booted 'welcome-showcase://yazio?motion=1&replay=2'
```

Validate these invariants:

- content fills the iPhone display without letterboxing on the reference aspect ratio;
- no explicit multiline text is ellipsized;
- final controls match their reference coordinates;
- animated views reach the same final pixels as `autoplay: false`;
- the home indicator and status bar remain legible for the selected color scheme;
- Reduce Motion skips directly to the usable final state;
- no new crash report appears during a full ten-screen pass.

## Machine-readable AI context

`Catalog/welcome-screens.json` is the canonical machine-readable registry for MCP consumers. It records every screen ID, native view, duration, motion event, interaction gate, semantic action, source file, asset, and font. Its JSON Schema is `Catalog/welcome-screens.schema.json`.

The optional local server under `Tools/WelcomeScreensMCP` exposes that catalog through read-only MCP Resources, Tools, and Prompts. Prefer the following AI workflow:

1. Call `welcome_search_screens` to select one study.
2. Call `welcome_get_integration_plan` for the exact screen ID.
3. Read only the returned `welcome://screens/<id>/...` resources.
4. Inspect the target app independently, then pass a non-sensitive summary to `welcome_validate_integration`.
5. Implement, build, run Swift Testing, and perform deterministic and animated Simulator QA.

When a screen changes, update the catalog in the same change and run:

```bash
.venv/bin/python -m unittest discover \
  -s Tools/WelcomeScreensMCP/tests \
  -v
```

The consistency suite fails if the catalog drifts from Swift screen IDs, durations, actions, fonts, assets, or repository paths.

## Ready-to-copy AI agent prompt

```text
You are working in my existing native SwiftUI iOS app.

Use this repository as a read-only technical reference and integrate only the <SCREEN_ID> study. Inspect:
- WelcomeScreenGallery/Features/Screens/<SCREEN_FILE>.swift
- only the shared Swift files imported by that view
- assets/welcome/<SCREEN_ID>/
- the matching docs/MOTION_SPEC.md section
- WelcomeScreenGallery/Domain/WelcomeAction.swift
- docs/ASSET_PROVENANCE.md and NOTICE.md

Requirements:
1. Preserve my deployment target, navigation, app lifecycle, signing, and architecture.
2. Add no Expo, React Native, JavaScript, CocoaPods, or unnecessary Swift packages.
3. Copy only transitive files and selected assets.
4. Preserve the 640×1385 ReferenceCanvas geometry and exact measured millisecond timeline.
5. Preserve hard cuts, per-segment easing, masks, blinks, spinners, interaction gates, replay, autoplay=false, and Reduce Motion behavior.
6. Register only the required fonts and resources in my target.
7. Route every WelcomeAction into my existing onboarding, authentication, privacy, and terms destinations.
8. Do not put external safe-area padding or a navigation header around the replica.
9. Replace third-party brand identity before any public or commercial release.
10. Build, run tests, and visually verify animated and deterministic final states on an iPhone simulator. Summarize every changed file.
```
