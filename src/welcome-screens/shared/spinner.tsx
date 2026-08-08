import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

type SpinnerProps = {
  color?: string;
  diameter?: number;
  strokeWidth?: number;
};

export function Spinner({
  color = '#FFFFFF',
  diameter = 28,
  strokeWidth = 4,
}: SpinnerProps) {
  const turn = useSharedValue(0);

  useEffect(() => {
    turn.value = withRepeat(
      withTiming(360, { duration: 920, easing: Easing.linear }),
      -1,
      false,
    );
  }, [turn]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${turn.value}deg` }],
  }));

  return (
    <Animated.View style={[{ width: diameter, height: diameter }, animatedStyle]}>
      {Array.from({ length: 12 }, (_, index) => (
        <View
          key={index}
          style={[
            styles.spoke,
            {
              backgroundColor: color,
              height: diameter * 0.27,
              left: diameter / 2 - strokeWidth / 2,
              opacity: (index + 1) / 12,
              top: 0,
              transform: [
                { translateY: diameter * 0.05 },
                { rotate: `${index * 30}deg` },
                { translateY: diameter * 0.31 },
              ],
              width: strokeWidth,
            },
          ]}
        />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  spoke: {
    borderRadius: 999,
    position: 'absolute',
    transformOrigin: 'center bottom',
  },
});
