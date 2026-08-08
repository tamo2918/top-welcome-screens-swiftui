import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

import { useWelcomeStore } from '@/store/use-welcome-store';
import {
  isWelcomeScreenId,
  WelcomeScreen,
  WELCOME_SCREEN_IDS,
} from '@/welcome-screens';

export function generateStaticParams() {
  return WELCOME_SCREEN_IDS.map((screen) => ({ screen }));
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default function WelcomeRoute() {
  const params = useLocalSearchParams<{
    screen?: string | string[];
    motion?: string | string[];
    replay?: string | string[];
  }>();
  const candidate = first(params.screen);
  const motion = first(params.motion);
  const replay = first(params.replay) ?? '0';
  const setActiveScreen = useWelcomeStore((state) => state.setActiveScreen);
  const selectedScreen = candidate && isWelcomeScreenId(candidate)
    ? candidate
    : 'duolingo';

  useEffect(() => {
    setActiveScreen(selectedScreen);
  }, [selectedScreen, setActiveScreen]);

  return (
    <WelcomeScreen
      autoplay={motion !== '0'}
      name={selectedScreen}
      replayKey={replay}
    />
  );
}
