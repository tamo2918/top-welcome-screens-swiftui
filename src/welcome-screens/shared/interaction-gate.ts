import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'react-native-reanimated';

type InteractionGateOptions = {
  autoplay: boolean;
  delayMs: number;
  replayKey: number | string;
};

/**
 * Keeps controls inert while an authored entrance is still covering them.
 * Comparing the completed key during render also closes the one-frame gap
 * that a replay-key change would otherwise leave before an effect can reset.
 */
export function useInteractionGate({
  autoplay,
  delayMs,
  replayKey,
}: InteractionGateOptions) {
  const reducedMotion = useReducedMotion();
  const shouldWait = autoplay && !reducedMotion;
  const motionKey = `${typeof replayKey}:${String(replayKey)}`;
  const gate = useMemo(
    () => ({ delayMs, motionKey, shouldWait }),
    [delayMs, motionKey, shouldWait],
  );
  const [completedGate, setCompletedGate] = useState<typeof gate | null>(null);

  useEffect(() => {
    if (!shouldWait) {
      return;
    }

    const timeout = setTimeout(() => setCompletedGate(gate), delayMs);
    return () => clearTimeout(timeout);
  }, [delayMs, gate, shouldWait]);

  return !shouldWait || completedGate === gate;
}
