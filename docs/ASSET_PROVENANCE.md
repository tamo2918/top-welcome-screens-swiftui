# Generated asset provenance

All raster artwork under `assets/welcome` was newly created for this project with GPT Image 2 through the Codex ImageGen workflow. Production app assets were not copied into the repository. Transparent outputs were validated over light and dark backgrounds; a few were losslessly cropped to remove unused transparent padding before layout calibration.

The original neutral project icon in `assets/images/welcome-gallery-icon.png` and its favicon derivative were also created with GPT Image 2. They contain no referenced product branding.

| Screen | Generated files |
| --- | --- |
| Duolingo | `mascot.png`, `mascot-closed.png`, `splash-face.png`, `splash-face-closed.png`, `wordmark.png` |
| Strava | `hero.png`, `wordmark.png` |
| MyFitnessPal | `card.png`, `next-card.png`, `wordmark.png` |
| Perplexity | `brand-lockup.png` |
| Yazio | `intro-mascot.png`, `wordmark.png`, `carrot.png`, `apples.png`, `clock.png`, `calendar.png`, `chef-hat.png` |
| onX Hunt | `terrain.png`, `brand-lockup.png` |
| Speak & Learn | `hero.png`, `avatar.png`, `logo-mark.png` |
| Hallow | `scene.png` |
| SCRL | `mosaic.png` |
| Speak: Language Learning | `lower-blur.png` |

The photography, people, maps, collages, food, and illustrations are synthetic recreations. Their composition and landmarks were calibrated against the supplied interface references, but they must not be represented as original material from the referenced products.

Brand-identifying names and artwork remain subject to the rights described in [`NOTICE.md`](../NOTICE.md). Replace them with your own identity and licensed imagery before commercial reuse.

## README and Appllama assets

| File | Provenance |
| --- | --- |
| `docs/images/appllama-logo-dark.png` | Official Appllama logo downloaded from `https://public.appllama.io/appllama-logo-dark.png` for dark GitHub surfaces. |
| `docs/images/appllama-logo-light.png` | Official Appllama light-surface logo variant downloaded from `https://public.appllama.io/appllama-logo-light.png`. |
| `docs/images/showcase-backdrop.png` | Shared 1536×1024 neutral studio backdrop created with GPT Image 2 through the Codex ImageGen workflow. It contains no phones, interfaces, logos, words, icons, or referenced product artwork. |
| `docs/images/welcome-screens-showcase-01.png` | Deterministic 1536×1024 AppKit composite of exact simulator captures from this repository's Duolingo, Strava, MyFitnessPal, Perplexity, and Yazio implementations. |
| `docs/images/welcome-screens-showcase-02.png` | Deterministic 1536×1024 AppKit composite of exact simulator captures from this repository's onX Hunt, Speak & Learn, Hallow, SCRL, and Speak: Language Learning implementations. |

The two panels are rendered by [`scripts/render-showcase.swift`](../scripts/render-showcase.swift). Every 1206×2622 simulator capture is uniformly scaled to 276×600.06 pixels, clipped only by the device corner mask, and composited over the same backdrop. The script does not use perspective deformation, independent horizontal or vertical scaling, or generative reconstruction of any interface pixels. This preserves Yazio's real wordmark geometry and the complete Speak & Learn testimonial, laurels, rating, download card, portrait, copy, and controls.

Only the shared empty backdrop was generated. The original third-party reference captures were not provided to that generation step and are not embedded in these README assets.

## Reference inputs

The third-party motion clips and final-state stills used during calibration live outside this repository and are not part of the distributable project. This avoids republishing source captures whose redistribution rights are unknown. `MOTION_SPEC.md` records the measured segments needed to audit the implementation, while every replacement bitmap that is actually shipped is listed above.
