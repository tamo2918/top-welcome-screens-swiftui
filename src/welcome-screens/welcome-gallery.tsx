import { useWelcomeStore } from '../store/use-welcome-store';

import type { WelcomeScreenProps } from './types';
import { WelcomeScreen } from './welcome-screen';

/**
 * Store-backed host for switching replicas without rendering gallery controls.
 */
export function WelcomeGallery(props: WelcomeScreenProps) {
  const activeScreen = useWelcomeStore((state) => state.activeScreen);
  const replayNonce = useWelcomeStore((state) => state.replayNonce);

  return (
    <WelcomeScreen
      {...props}
      name={activeScreen}
      replayKey={`${String(props.replayKey ?? 0)}:${replayNonce}`}
    />
  );
}
