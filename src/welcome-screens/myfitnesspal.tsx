import { Image } from 'expo-image';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import type { WelcomeScreenProps } from './types';
import { resolveActionPress } from './shared/actions';
import { box } from './shared/geometry';
import { useInteractionGate } from './shared/interaction-gate';
import { ReplicaPressable } from './shared/pressable';
import { ReferenceCanvas } from './shared/reference-canvas';
import { TimedStatusBar } from './shared/timed-status-bar';
import { useWelcomeTimeline } from './shared/timeline';

const cardSource = require('../../assets/welcome/myfitnesspal/card.png');
const nextCardSource = require('../../assets/welcome/myfitnesspal/next-card.png');
const wordmarkSource = require('../../assets/welcome/myfitnesspal/wordmark.png');

export function MyFitnessPalWelcome({
  autoplay = true,
  onActionPress,
  onPrimaryPress,
  onSecondaryPress,
  replayKey = 0,
}: WelcomeScreenProps) {
  const time = useWelcomeTimeline(8867, autoplay, replayKey);
  const interactionsReady = useInteractionGate({
    autoplay,
    delayMs: 7333,
    replayKey,
  });
  const splashStyle = useAnimatedStyle(() => ({
    opacity: time.value < 7333 ? 1 : 0,
  }));
  const updatingStyle = useAnimatedStyle(() => ({
    opacity: time.value < 2900 ? 1 : 0,
  }));
  const loadingStyle = useAnimatedStyle(() => ({
    opacity: time.value >= 2900 && time.value < 7333 ? 1 : 0,
  }));

  return (
    <ReferenceCanvas backgroundColor="#FDFDFD" testID="welcome-myfitnesspal">
      <TimedStatusBar
        key={`${replayKey}-${autoplay}`}
        autoplay={autoplay}
        final="dark"
        initial="light"
        switchAtMs={7333}
      />
      <Text style={styles.welcome}>Welcome to</Text>
      <Image contentFit="contain" source={wordmarkSource} style={styles.wordmark} />

      <View style={styles.carousel}>
        <Image
          contentFit="cover"
          contentPosition={{ left: '50%', top: '72%' }}
          source={cardSource}
          style={styles.card}
        />
        <Image contentFit="cover" source={nextCardSource} style={styles.nextCard} />
      </View>

      <Text style={styles.headline}>Ready for some wins? Start{`\n`}tracking, it&apos;s easy!</Text>
      <View style={styles.dots}>
        {[true, false, false].map((active, index) => (
          <View key={index} style={[styles.dot, active && styles.dotActive]} />
        ))}
      </View>
      <ReplicaPressable
        accessibilityLabel="Sign up for free"
        disabled={!interactionsReady}
        onPress={resolveActionPress(
          'myfitnesspal.sign-up-for-free',
          onActionPress,
          onPrimaryPress,
        )}
        style={styles.cta}
      >
        <Text style={styles.ctaText}>Sign Up For Free</Text>
      </ReplicaPressable>
      <ReplicaPressable
        accessibilityLabel="Log in"
        disabled={!interactionsReady}
        onPress={resolveActionPress(
          'myfitnesspal.log-in',
          onActionPress,
          onSecondaryPress,
        )}
        style={styles.logIn}
      >
        <Text style={styles.logInText}>Log In</Text>
      </ReplicaPressable>
      <Text style={styles.version}>Version 26.22.0.74659</Text>

      <Animated.View pointerEvents="none" style={[styles.splash, splashStyle]}>
        <Image contentFit="contain" source={wordmarkSource} style={styles.splashWordmark} tintColor="#FFFFFF" />
        <View style={styles.spinner}>
          <ActivityIndicator color="#FFFFFF" size="large" />
        </View>
        <Animated.Text style={[styles.loaderText, updatingStyle]}>Updating...</Animated.Text>
        <Animated.Text style={[styles.loaderText, loadingStyle]}>Loading...</Animated.Text>
      </Animated.View>
    </ReferenceCanvas>
  );
}

const styles = StyleSheet.create({
  welcome: {
    ...box([200, 136, 240, 31]),
    color: '#6C6C6C',
    fontFamily: 'Inter_400Regular',
    fontSize: 19,
    lineHeight: 27,
    textAlign: 'center',
  },
  wordmark: {
    ...box([174, 176, 293, 44]),
  },
  carousel: {
    ...box([0, 280, 640, 636]),
    overflow: 'hidden',
  },
  card: {
    ...box([70, 13, 500, 610]),
    borderRadius: 28,
  },
  nextCard: {
    ...box([608, 13, 500, 610]),
    borderRadius: 28,
    opacity: 0.82,
  },
  headline: {
    ...box([111, 928, 419, 84]),
    color: '#111111',
    fontFamily: 'Inter_700Bold',
    fontSize: 30,
    letterSpacing: -1.1,
    lineHeight: 38,
    textAlign: 'center',
  },
  dots: {
    ...box([278, 1047, 82, 16]),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    backgroundColor: '#B3B3B5',
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  dotActive: {
    backgroundColor: '#005AEB',
  },
  cta: {
    ...box([56, 1121, 527, 81]),
    alignItems: 'center',
    backgroundColor: '#005AEB',
    borderRadius: 41,
    justifyContent: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 23,
  },
  logIn: {
    ...box([250, 1228, 140, 64]),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInText: {
    color: '#005AEB',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 22,
  },
  version: {
    ...box([160, 1301, 320, 32]),
    color: '#696969',
    fontFamily: 'Inter_400Regular',
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  splash: {
    ...box([0, 0, 640, 1385]),
    alignItems: 'center',
    backgroundColor: '#005AEE',
  },
  splashWordmark: {
    ...box([129, 582, 382, 58]),
  },
  spinner: {
    ...box([291, 1180, 58, 58]),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    ...box([200, 1245, 240, 40]),
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
    fontSize: 21,
    lineHeight: 30,
    textAlign: 'center',
  },
});
