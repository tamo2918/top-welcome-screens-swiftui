import MaskedView from '@react-native-masked-view/masked-view';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import type { WelcomeScreenProps } from './types';
import { resolveActionPress } from './shared/actions';
import { box, segment } from './shared/geometry';
import { useInteractionGate } from './shared/interaction-gate';
import { ReplicaPressable } from './shared/pressable';
import { ReferenceCanvas } from './shared/reference-canvas';
import { useWelcomeTimeline } from './shared/timeline';

const mascotSource = require('../../assets/welcome/duolingo/mascot.png');
const mascotClosedSource = require('../../assets/welcome/duolingo/mascot-closed.png');
const splashFaceSource = require('../../assets/welcome/duolingo/splash-face.png');
const splashFaceClosedSource = require('../../assets/welcome/duolingo/splash-face-closed.png');
const wordmarkSource = require('../../assets/welcome/duolingo/wordmark.png');

type FinalScreenProps = Pick<
  WelcomeScreenProps,
  'onActionPress' | 'onPrimaryPress' | 'onSecondaryPress'
> & {
  blinkStyle: object;
  interactionsReady: boolean;
};

function FinalScreen({
  blinkStyle,
  interactionsReady,
  onActionPress,
  onPrimaryPress,
  onSecondaryPress,
}: FinalScreenProps) {
  return (
    <View style={styles.finalScreen}>
      <View style={styles.mascot}>
        <Image contentFit="contain" source={mascotSource} style={StyleSheet.absoluteFill} />
        <Animated.View pointerEvents="none" style={[styles.finalLids, blinkStyle]}>
          <Image
            contentFit="contain"
            source={mascotClosedSource}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>
      <Image contentFit="contain" source={wordmarkSource} style={styles.wordmark} />
      <Text style={styles.tagline}>Learn for free. Forever.</Text>

      <View style={styles.primaryShadow} />
      <ReplicaPressable
        accessibilityLabel="Get started"
        disabled={!interactionsReady}
        onPress={resolveActionPress(
          'duolingo.get-started',
          onActionPress,
          onPrimaryPress,
        )}
        style={styles.primary}
      >
        <Text style={styles.primaryText}>GET STARTED</Text>
      </ReplicaPressable>
      <View style={styles.secondaryShadow} />
      <ReplicaPressable
        accessibilityLabel="I already have an account"
        disabled={!interactionsReady}
        onPress={resolveActionPress(
          'duolingo.log-in',
          onActionPress,
          onSecondaryPress,
        )}
        style={styles.secondary}
      >
        <Text style={styles.secondaryText}>I ALREADY HAVE AN ACCOUNT</Text>
      </ReplicaPressable>
    </View>
  );
}

export function DuolingoWelcome({
  autoplay = true,
  onActionPress,
  onPrimaryPress,
  onSecondaryPress,
  replayKey = 0,
}: WelcomeScreenProps) {
  const time = useWelcomeTimeline(2667, autoplay, replayKey);
  const interactionsReady = useInteractionGate({
    autoplay,
    delayMs: 1233,
    replayKey,
  });
  const splashFaceStyle = useAnimatedStyle(() => {
    const shrink = Easing.in(Easing.cubic)(segment(time.value, 900, 1033));
    return {
      opacity: 1 - segment(time.value, 1133, 1233),
      transform: [{ scale: interpolate(shrink, [0, 1], [1, 0.36]) }],
    };
  });
  const splashBlinkStyle = useAnimatedStyle(() => {
    const close = segment(time.value, 400, 417);
    const open = 1 - segment(time.value, 500, 567);
    const shrinkClose = segment(time.value, 900, 1000);
    return { opacity: Math.max(Math.min(close, open), shrinkClose) };
  });
  const revealStyle = useAnimatedStyle(() => {
    const reveal = segment(time.value, 1133, 1233);
    return {
      transform: [
        {
          scale: interpolate(reveal, [0, 0.34, 0.67, 1], [0, 2.6, 7.5, 10]),
        },
      ],
    };
  });
  const finalBlinkStyle = useAnimatedStyle(() => {
    const close = segment(time.value, 2467, 2500);
    const open = 1 - segment(time.value, 2533, 2600);
    return { opacity: Math.min(close, open) };
  });

  return (
    <ReferenceCanvas backgroundColor="#6DC000" testID="welcome-duolingo">
      <StatusBar style="dark" />
      <View style={styles.splash}>
        <Animated.View style={[styles.splashFace, splashFaceStyle]}>
          <Image contentFit="contain" source={splashFaceSource} style={StyleSheet.absoluteFill} />
          <Animated.View pointerEvents="none" style={[styles.splashLids, splashBlinkStyle]}>
            <Image
              contentFit="contain"
              source={splashFaceClosedSource}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </Animated.View>
        <Image contentFit="contain" source={wordmarkSource} style={styles.splashWordmark} tintColor="#FFFFFF" />
      </View>

      <MaskedView
        maskElement={
          <View style={StyleSheet.absoluteFill}>
            <Animated.View style={[styles.revealCircle, revealStyle]} />
          </View>
        }
        style={StyleSheet.absoluteFill}
      >
        <FinalScreen
          blinkStyle={finalBlinkStyle}
          interactionsReady={interactionsReady}
          onActionPress={onActionPress}
          onPrimaryPress={onPrimaryPress}
          onSecondaryPress={onSecondaryPress}
        />
      </MaskedView>
    </ReferenceCanvas>
  );
}

const styles = StyleSheet.create({
  finalScreen: {
    ...box([0, 0, 640, 1385]),
    backgroundColor: '#FDFDFD',
  },
  splash: {
    ...box([0, 0, 640, 1385]),
    backgroundColor: '#6DC000',
  },
  splashFace: {
    ...box([157, 561, 326, 218]),
    transformOrigin: 'center center',
  },
  splashWordmark: {
    ...box([178, 1161, 284, 67]),
  },
  revealCircle: {
    ...box([240, 614, 160, 160]),
    backgroundColor: '#FFFFFF',
    borderRadius: 80,
  },
  mascot: {
    ...box([208, 365, 216, 209]),
    transformOrigin: 'center center',
  },
  wordmark: {
    ...box([171, 615, 298, 76]),
  },
  tagline: {
    ...box([150, 714, 340, 46]),
    color: '#707070',
    fontFamily: 'Nunito_400Regular',
    fontSize: 23,
    letterSpacing: -0.5,
    lineHeight: 34,
    textAlign: 'center',
  },
  primaryShadow: {
    ...box([24, 1122, 591, 82]),
    backgroundColor: '#538F23',
    borderRadius: 19,
  },
  primary: {
    ...box([24, 1116, 591, 79]),
    alignItems: 'center',
    backgroundColor: '#4BC401',
    borderRadius: 19,
    justifyContent: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
    fontFamily: 'Nunito_900Black',
    fontSize: 21,
    letterSpacing: 0.5,
  },
  secondaryShadow: {
    ...box([24, 1229, 591, 78]),
    backgroundColor: '#D8D8D8',
    borderRadius: 19,
  },
  secondary: {
    ...box([24, 1223, 591, 79]),
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E3E3E3',
    borderRadius: 19,
    borderWidth: 2,
    justifyContent: 'center',
  },
  secondaryText: {
    color: '#4BC401',
    fontFamily: 'Nunito_900Black',
    fontSize: 20,
    letterSpacing: 0.2,
  },
  splashLids: {
    ...box([0, 0, 326, 218]),
  },
  finalLids: {
    ...box([0, 0, 216, 209]),
  },
});
