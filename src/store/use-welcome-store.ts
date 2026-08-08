import { create } from 'zustand';

import type { WelcomeScreenId } from '../welcome-screens/types';

type WelcomeStore = {
  activeScreen: WelcomeScreenId;
  replayNonce: number;
  replay: () => void;
  setActiveScreen: (screen: WelcomeScreenId) => void;
};

export const useWelcomeStore = create<WelcomeStore>((set) => ({
  activeScreen: 'duolingo',
  replayNonce: 0,
  replay: () => set((state) => ({ replayNonce: state.replayNonce + 1 })),
  setActiveScreen: (activeScreen) => set({ activeScreen }),
}));
