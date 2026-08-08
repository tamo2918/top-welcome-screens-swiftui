import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import type { WelcomeScreenProps } from './types';
import { resolveActionPress } from './shared/actions';
import { box } from './shared/geometry';
import { useInteractionGate } from './shared/interaction-gate';
import { ReplicaPressable } from './shared/pressable';
import { ReferenceCanvas } from './shared/reference-canvas';
import { Spinner } from './shared/spinner';
import { useWelcomeTimeline } from './shared/timeline';

const heroSource = require('../../assets/welcome/strava/hero.png');
const wordmarkSource = require('../../assets/welcome/strava/wordmark.png');

export function StravaWelcome({
  autoplay = true,
  onActionPress,
  onPrimaryPress,
  onSecondaryPress,
  replayKey = 0,
}: WelcomeScreenProps) {
  const time = useWelcomeTimeline(6600, autoplay, replayKey);
  const interactionsReady = useInteractionGate({
    autoplay,
    delayMs: 5133,
    replayKey,
  });
  const splashStyle = useAnimatedStyle(() => ({
    opacity: time.value < 5133 ? 1 : 0,
  }));
  const spinnerStyle = useAnimatedStyle(() => ({
    opacity: time.value >= 867 && time.value < 5133 ? 1 : 0,
  }));

  return (
    <ReferenceCanvas backgroundColor="#FDFDFD" testID="welcome-strava">
      <StatusBar style="light" />
      <Image contentFit="fill" source={heroSource} style={styles.hero} />

      <View style={styles.lower}>
        <Text style={styles.headline}>Track your active life in one place.</Text>
        <View style={styles.dots}>
          {[true, false, false, false].map((active, index) => (
            <View key={index} style={[styles.dot, active && styles.dotActive]} />
          ))}
        </View>
        <ReplicaPressable
          accessibilityLabel="Join for free"
          disabled={!interactionsReady}
          onPress={resolveActionPress(
            'strava.join-for-free',
            onActionPress,
            onPrimaryPress,
          )}
          style={styles.cta}
        >
          <Text style={styles.ctaText}>Join for free</Text>
        </ReplicaPressable>
        <ReplicaPressable
          accessibilityLabel="Log in"
          disabled={!interactionsReady}
          onPress={resolveActionPress(
            'strava.log-in',
            onActionPress,
            onSecondaryPress,
          )}
          style={styles.logIn}
        >
          <Text style={styles.logInText}>Log in</Text>
        </ReplicaPressable>
      </View>

      <Animated.View pointerEvents="none" style={[styles.splash, splashStyle]}>
        <Image contentFit="contain" source={wordmarkSource} style={styles.splashLogo} tintColor="#FFFFFF" />
        <Animated.View style={[styles.splashSpinner, spinnerStyle]}>
          <Spinner color="#FFFFFF" diameter={26} strokeWidth={3} />
        </Animated.View>
      </Animated.View>
    </ReferenceCanvas>
  );
}

const styles = StyleSheet.create({
  hero: {
    ...box([0, 0, 640, 943]),
    zIndex: 1,
  },
  lower: {
    ...box([0, 866, 640, 519]),
    backgroundColor: '#FDFDFD',
    zIndex: 0,
  },
  headline: {
    ...box([45, 132, 550, 48]),
    color: '#171717',
    fontFamily: 'Inter_400Regular',
    fontSize: 29,
    letterSpacing: -1.05,
    lineHeight: 40,
    textAlign: 'center',
  },
  dots: {
    ...box([282, 218, 76, 12]),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    backgroundColor: '#424242',
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  dotActive: {
    backgroundColor: '#ED4400',
  },
  cta: {
    ...box([38, 264, 567, 81]),
    alignItems: 'center',
    backgroundColor: '#FB4600',
    borderRadius: 41,
    justifyContent: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 23,
    letterSpacing: -0.35,
  },
  logIn: {
    ...box([245, 367, 150, 60]),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInText: {
    color: '#FB4600',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 22,
  },
  splash: {
    ...box([0, 0, 640, 1385]),
    alignItems: 'center',
    backgroundColor: '#FC4700',
    zIndex: 2,
  },
  splashLogo: {
    ...box([173, 516, 294, 54]),
  },
  splashSpinner: {
    ...box([307, 1102, 26, 26]),
  },
});
