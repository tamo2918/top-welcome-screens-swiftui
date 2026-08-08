import type { PropsWithChildren } from 'react';
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from 'react-native';

type ReplicaPressableProps = PropsWithChildren<
  Omit<PressableProps, 'style'> & {
    style?: StyleProp<ViewStyle>;
  }
>;

export function ReplicaPressable({
  accessibilityElementsHidden,
  accessibilityState,
  accessible,
  children,
  disabled,
  focusable,
  importantForAccessibility,
  onPress,
  style,
  ...props
}: ReplicaPressableProps) {
  const interactionDisabled = disabled || !onPress;

  return (
    <Pressable
      accessibilityElementsHidden={interactionDisabled || accessibilityElementsHidden}
      accessibilityRole="button"
      accessibilityState={
        interactionDisabled
          ? { ...accessibilityState, disabled: true }
          : accessibilityState
      }
      accessible={interactionDisabled ? false : accessible}
      disabled={interactionDisabled}
      focusable={interactionDisabled ? false : focusable}
      hitSlop={4}
      importantForAccessibility={
        interactionDisabled ? 'no-hide-descendants' : importantForAccessibility
      }
      onPress={interactionDisabled ? undefined : onPress}
      style={({ pressed }) => [style, pressed && styles.pressed]}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.78,
  },
});
