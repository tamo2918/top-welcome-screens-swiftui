# Native SwiftUI implementation contract

This repository is a native SwiftUI project. Do not add Expo, React Native, JavaScript, TypeScript, a web runtime, or a JavaScript animation bridge.

Before editing a welcome screen:

1. Read `docs/SWIFTUI_IMPLEMENTATION_GUIDE.md` and the matching section of `docs/MOTION_SPEC.md`.
2. Preserve the iOS 16.4 deployment target unless the user explicitly changes product requirements.
3. Keep layout values in the 640×1385 reference coordinate space and render them through `ReferenceCanvas`.
4. Drive authored motion through `MotionTimeline` using measured milliseconds. `autoplay == false` and Reduce Motion must render the complete final state.
5. Route taps through `WelcomeAction`; do not put product navigation inside replica views.
6. Add resources under `assets/welcome/<screen-id>/` and load them with `ReplicaImage`.
7. Keep each study isolated in `WelcomeScreenGallery/Features/Screens/` and register new screens in `WelcomeScreenID` and `WelcomeScreen`.
8. Do not replace calibrated sequences with a generic fade, spring, or transition.
9. Build, run Swift Testing, and visually verify both the animated and deterministic final states on an iPhone simulator.
10. Preserve the educational-use notice and generated-asset provenance.

The shared Xcode scheme is `WelcomeScreenGallery`. Deterministic QA uses `-welcome-screen <id> -welcome-motion 0`; animation replay uses `-welcome-motion 1 -welcome-replay <changed integer>`.
