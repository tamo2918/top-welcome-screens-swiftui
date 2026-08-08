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
| `docs/images/welcome-screens-showcase-01.png` | 1536×1024 GPT Image 2 composition generated through the Codex ImageGen workflow from simulator captures of this repository's Duolingo, Strava, MyFitnessPal, Perplexity, and Yazio implementations. |
| `docs/images/welcome-screens-showcase-02.png` | 1536×1024 GPT Image 2 composition generated through the Codex ImageGen workflow from simulator captures of this repository's onX Hunt, Speak & Learn, Hallow, SCRL, and Speak: Language Learning implementations. |

The two showcase prompts treated each simulator capture as a rigid screen layer and requested one matched 3:2 set: identical near-black studio backgrounds, realistic iPhone proportions, equal optical scale, aligned baselines, restrained shadows, and no added title, logo, label, watermark, or new interface content. The original third-party reference captures were not provided to the generation step and are not embedded in these README assets.

## Reference inputs

The third-party motion clips and final-state stills used during calibration live outside this repository and are not part of the distributable project. This avoids republishing source captures whose redistribution rights are unknown. `MOTION_SPEC.md` records the measured segments needed to audit the implementation, while every replacement bitmap that is actually shipped is listed above.
