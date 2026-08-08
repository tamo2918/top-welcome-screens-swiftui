import { WELCOME_SCREEN_IDS, type WelcomeScreenId } from './types';

export { WELCOME_SCREEN_METADATA } from './registry';
export { WelcomeGallery } from './welcome-gallery';
export { WelcomeScreen } from './welcome-screen';
export { DuolingoWelcome } from './duolingo';
export { HallowWelcome } from './hallow';
export { MyFitnessPalWelcome } from './myfitnesspal';
export { OnxHuntWelcome } from './onx-hunt';
export { PerplexityWelcome } from './perplexity';
export { ScrlWelcome } from './scrl';
export { SpeakLanguageWelcome } from './speak-language';
export { SpeakLearnWelcome } from './speak-learn';
export { StravaWelcome } from './strava';
export { YazioWelcome } from './yazio';
export { WELCOME_SCREEN_IDS } from './types';
export type {
  WelcomeActionId,
  WelcomeActionPressHandler,
  WelcomeScreenId,
  WelcomeScreenProps,
} from './types';

export function isWelcomeScreenId(value: string): value is WelcomeScreenId {
  return (WELCOME_SCREEN_IDS as readonly string[]).includes(value);
}
