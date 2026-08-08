import { StatusBar, type StatusBarStyle } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'react-native-reanimated';

type TimedStatusBarProps = {
  autoplay: boolean;
  final: StatusBarStyle;
  initial: StatusBarStyle;
  switchAtMs: number;
};

export function TimedStatusBar({
  autoplay,
  final,
  initial,
  switchAtMs,
}: TimedStatusBarProps) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = autoplay && !reducedMotion;
  const [style, setStyle] = useState<StatusBarStyle>(shouldAnimate ? initial : final);

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }
    const timeout = setTimeout(() => setStyle(final), switchAtMs);
    return () => clearTimeout(timeout);
  }, [final, shouldAnimate, switchAtMs]);

  return <StatusBar animated={false} style={style} />;
}
