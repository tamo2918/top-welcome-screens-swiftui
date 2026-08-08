import { useEffect } from 'react';
import {
  cancelAnimation,
  Easing,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export function useWelcomeTimeline(
  durationMs: number,
  autoplay: boolean,
  replayKey: number | string,
) {
  const time = useSharedValue(autoplay ? 0 : durationMs);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    cancelAnimation(time);
    if (!autoplay || reducedMotion) {
      time.value = durationMs;
      return;
    }
    time.value = 0;
    time.value = withTiming(durationMs, {
      duration: durationMs,
      easing: Easing.linear,
    });
  }, [autoplay, durationMs, reducedMotion, replayKey, time]);

  return time;
}
