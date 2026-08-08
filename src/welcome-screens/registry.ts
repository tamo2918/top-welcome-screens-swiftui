import type { WelcomeScreenMetadata } from './types';

export const WELCOME_SCREEN_METADATA: readonly WelcomeScreenMetadata[] = [
  {
    id: 'duolingo',
    displayName: 'Duolingo',
    motionDurationMs: 2667,
    referenceMotion: 'duolingo-motion.mp4',
    referenceStill: 'duolingo-ws.webp',
  },
  {
    id: 'strava',
    displayName: 'Strava',
    motionDurationMs: 6600,
    referenceMotion: 'strava-motion.mp4',
    referenceStill: 'strava-ws.webp',
  },
  {
    id: 'myfitnesspal',
    displayName: 'MyFitnessPal',
    motionDurationMs: 8867,
    referenceMotion: 'myfitnesspal-motion.mp4',
    referenceStill: 'myfitnesspal-ws.webp',
  },
  {
    id: 'perplexity',
    displayName: 'Perplexity',
    motionDurationMs: null,
    referenceMotion: null,
    referenceStill: 'perplexity-ws.webp',
  },
  {
    id: 'yazio',
    displayName: 'Yazio',
    motionDurationMs: 1733,
    referenceMotion: 'yazio-motion.mp4',
    referenceStill: 'yazio-ws.webp',
  },
  {
    id: 'onx-hunt',
    displayName: 'onX Hunt',
    motionDurationMs: 1467,
    referenceMotion: 'onx-motion.mp4',
    referenceStill: 'onx-ws.webp',
  },
  {
    id: 'speak-learn',
    displayName: 'Speak & Learn',
    motionDurationMs: 4940,
    referenceMotion: 'speak-motion.mp4',
    referenceStill: 'speak-ws.webp',
  },
  {
    id: 'hallow',
    displayName: 'Hallow',
    motionDurationMs: 4500,
    referenceMotion: 'hallow-motion.mp4',
    referenceStill: 'hallow-ws.webp',
  },
  {
    id: 'scrl',
    displayName: 'SCRL',
    motionDurationMs: 1999,
    referenceMotion: 'scrl-motion.mp4',
    referenceStill: 'scrl-ws.webp',
  },
  {
    id: 'speak-language',
    displayName: 'Speak: Language Learning',
    motionDurationMs: 5070,
    referenceMotion: 'speak-language-motion.mp4',
    referenceStill: 'speak-language-ws.webp',
  },
] as const;
