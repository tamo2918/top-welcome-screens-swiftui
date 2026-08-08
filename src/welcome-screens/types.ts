export const WELCOME_SCREEN_IDS = [
  'duolingo',
  'strava',
  'myfitnesspal',
  'perplexity',
  'yazio',
  'onx-hunt',
  'speak-learn',
  'hallow',
  'scrl',
  'speak-language',
] as const;

export type WelcomeScreenId = (typeof WELCOME_SCREEN_IDS)[number];

export type WelcomeActionId =
  | 'duolingo.get-started'
  | 'duolingo.log-in'
  | 'strava.join-for-free'
  | 'strava.log-in'
  | 'myfitnesspal.sign-up-for-free'
  | 'myfitnesspal.log-in'
  | 'perplexity.close'
  | 'perplexity.continue-with-apple'
  | 'perplexity.continue-with-google'
  | 'perplexity.sign-in-with-email'
  | 'perplexity.single-sign-on'
  | 'perplexity.privacy-policy'
  | 'perplexity.terms-of-service'
  | 'yazio.get-started'
  | 'yazio.log-in'
  | 'onx-hunt.continue-with-apple'
  | 'onx-hunt.continue-with-google'
  | 'onx-hunt.sign-up-with-email'
  | 'onx-hunt.log-in'
  | 'speak-learn.log-in'
  | 'speak-learn.lets-go'
  | 'speak-learn.privacy-policy'
  | 'speak-learn.terms-of-service'
  | 'hallow.close'
  | 'hallow.continue-with-email'
  | 'hallow.continue-with-apple'
  | 'hallow.continue-with-google'
  | 'hallow.terms'
  | 'scrl.get-started'
  | 'scrl.sign-in'
  | 'speak-language.sign-in'
  | 'speak-language.tap-to-continue'
  | 'speak-language.start-speaking-today';

export type WelcomeActionPressHandler = (actionId: WelcomeActionId) => void;

export type WelcomeScreenProps = {
  autoplay?: boolean;
  onActionPress?: WelcomeActionPressHandler;
  onClosePress?: () => void;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  replayKey?: number | string;
};

export type WelcomeScreenMetadata = {
  id: WelcomeScreenId;
  displayName: string;
  motionDurationMs: number | null;
  referenceMotion: string | null;
  referenceStill: string;
};
