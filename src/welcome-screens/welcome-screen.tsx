import type { ComponentType } from 'react';

import { DuolingoWelcome } from './duolingo';
import { HallowWelcome } from './hallow';
import { MyFitnessPalWelcome } from './myfitnesspal';
import { OnxHuntWelcome } from './onx-hunt';
import { PerplexityWelcome } from './perplexity';
import { ScrlWelcome } from './scrl';
import { SpeakLanguageWelcome } from './speak-language';
import { SpeakLearnWelcome } from './speak-learn';
import { StravaWelcome } from './strava';
import type { WelcomeScreenId, WelcomeScreenProps } from './types';
import { YazioWelcome } from './yazio';

const SCREENS: Record<WelcomeScreenId, ComponentType<WelcomeScreenProps>> = {
  duolingo: DuolingoWelcome,
  hallow: HallowWelcome,
  myfitnesspal: MyFitnessPalWelcome,
  'onx-hunt': OnxHuntWelcome,
  perplexity: PerplexityWelcome,
  scrl: ScrlWelcome,
  'speak-language': SpeakLanguageWelcome,
  'speak-learn': SpeakLearnWelcome,
  strava: StravaWelcome,
  yazio: YazioWelcome,
};

type WelcomeScreenSelectorProps = WelcomeScreenProps & {
  name: WelcomeScreenId;
};

export function WelcomeScreen({ name, ...props }: WelcomeScreenSelectorProps) {
  const Screen = SCREENS[name];
  return <Screen {...props} />;
}
