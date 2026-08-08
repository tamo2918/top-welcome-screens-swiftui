import type {
  WelcomeActionId,
  WelcomeActionPressHandler,
} from '../types';

/**
 * Prefers the semantic action API while keeping the original callback contract
 * working for existing consumers.
 */
export function resolveActionPress(
  actionId: WelcomeActionId,
  onActionPress: WelcomeActionPressHandler | undefined,
  legacyFallback?: () => void,
) {
  if (!onActionPress) {
    return legacyFallback;
  }

  return () => onActionPress(actionId);
}
