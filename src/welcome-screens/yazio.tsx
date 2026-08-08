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

const introMascotSource = require('../../assets/welcome/yazio/intro-mascot.png');
const wordmarkSource = require('../../assets/welcome/yazio/wordmark.png');
const carrotSource = require('../../assets/welcome/yazio/carrot.png');
const applesSource = require('../../assets/welcome/yazio/apples.png');
const clockSource = require('../../assets/welcome/yazio/clock.png');
const calendarSource = require('../../assets/welcome/yazio/calendar.png');
const chefHatSource = require('../../assets/welcome/yazio/chef-hat.png');

type SpringAssetProps = {
  boxStyle: object;
  enter: readonly [number, number];
  fromRotation: number;
  fromX: number;
  fromY: number;
  source: number;
  time: ReturnType<typeof useWelcomeTimeline>;
  toX?: number;
  toY?: number;
};

function SpringAsset({
  boxStyle,
  enter,
  fromRotation,
  fromX,
  fromY,
  source,
  time,
  toX = 0,
  toY = 0,
}: SpringAssetProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const progress = Easing.out(Easing.back(1.5))(segment(time.value, enter[0], enter[1]));
    return {
      opacity: time.value >= enter[0] ? 1 : 0,
      transform: [
        { translateX: interpolate(progress, [0, 1], [fromX, toX]) },
        { translateY: interpolate(progress, [0, 1], [fromY, toY]) },
        { rotate: `${interpolate(progress, [0, 1], [fromRotation, 0])}deg` },
        { scale: interpolate(progress, [0, 1], [0.94, 1]) },
      ],
    };
  });

  return (
    <Animated.View style={[boxStyle, animatedStyle]}>
      <Image contentFit="contain" source={source} style={StyleSheet.absoluteFill} />
    </Animated.View>
  );
}

export function YazioWelcome({
  autoplay = true,
  onActionPress,
  onPrimaryPress,
  onSecondaryPress,
  replayKey = 0,
}: WelcomeScreenProps) {
  const time = useWelcomeTimeline(1733, autoplay, replayKey);
  const interactionsReady = useInteractionGate({
    autoplay,
    delayMs: 1733,
    replayKey,
  });
  const shellStyle = useAnimatedStyle(() => ({
    opacity: time.value >= 700 ? 1 : 0,
  }));
  const splashStyle = useAnimatedStyle(() => ({
    opacity: 1 - Easing.out(Easing.quad)(segment(time.value, 567, 800)),
  }));
  const motionGroupStyle = useAnimatedStyle(() => ({
    opacity: time.value < 1733 ? 1 : 0,
  }));
  const staticGroupStyle = useAnimatedStyle(() => ({
    opacity: time.value >= 1733 ? 1 : 0,
  }));

  return (
    <ReferenceCanvas backgroundColor="#FDFDFD" testID="welcome-yazio">
      <StatusBar style="dark" />

      <Animated.View style={[StyleSheet.absoluteFill, shellStyle]}>
        <Image contentFit="contain" source={wordmarkSource} style={styles.wordmark} />
        <Text style={styles.headline}>Hit your goal weight{`\n`}in a few taps a day</Text>

        <Animated.View pointerEvents="none" style={[styles.illustration, motionGroupStyle]}>
          <SpringAsset
            boxStyle={styles.carrot}
            enter={[1167, 1410]}
            fromRotation={20}
            fromX={40}
            fromY={-29}
            source={carrotSource}
            time={time}
            toY={50}
          />
          <SpringAsset
            boxStyle={styles.apples}
            enter={[1233, 1490]}
            fromRotation={-13}
            fromX={-25}
            fromY={-30}
            source={applesSource}
            time={time}
            toX={12}
            toY={20}
          />
          <SpringAsset
            boxStyle={styles.clock}
            enter={[1300, 1540]}
            fromRotation={18}
            fromX={35}
            fromY={-25}
            source={clockSource}
            time={time}
            toY={15}
          />
          <SpringAsset
            boxStyle={styles.calendar}
            enter={[1367, 1620]}
            fromRotation={24}
            fromX={25}
            fromY={-40}
            source={calendarSource}
            time={time}
            toY={10}
          />
          <SpringAsset
            boxStyle={styles.chefHat}
            enter={[1467, 1733]}
            fromRotation={-18}
            fromX={-25}
            fromY={-45}
            source={chefHatSource}
            time={time}
            toY={10}
          />
        </Animated.View>

        <Animated.View pointerEvents="none" style={[styles.illustration, staticGroupStyle]}>
          <Image contentFit="contain" source={applesSource} style={styles.apples} />
          <Image contentFit="contain" source={carrotSource} style={styles.carrot} />
          <Image contentFit="contain" source={clockSource} style={styles.clock} />
        </Animated.View>

        <View style={styles.dots}>
          {[true, false, false, false].map((active, index) => (
            <View key={index} style={[styles.dot, active && styles.dotActive]} />
          ))}
        </View>
        <ReplicaPressable
          accessibilityLabel="Get started"
          disabled={!interactionsReady}
          onPress={resolveActionPress(
            'yazio.get-started',
            onActionPress,
            onPrimaryPress,
          )}
          style={styles.primary}
        >
          <Text style={styles.primaryText}>Get Started</Text>
        </ReplicaPressable>
        <ReplicaPressable
          accessibilityLabel="I already have an account"
          disabled={!interactionsReady}
          onPress={resolveActionPress(
            'yazio.log-in',
            onActionPress,
            onSecondaryPress,
          )}
          style={styles.secondary}
        >
          <Text style={styles.secondaryText}>I already have an account</Text>
        </ReplicaPressable>
      </Animated.View>

      <Animated.View pointerEvents="none" style={[styles.splash, splashStyle]}>
        <Image contentFit="contain" source={introMascotSource} style={styles.introMascot} />
        <Image contentFit="contain" source={wordmarkSource} style={styles.splashWordmark} />
      </Animated.View>
    </ReferenceCanvas>
  );
}

const styles = StyleSheet.create({
  wordmark: {
    ...box([230, 102, 180, 50]),
  },
  headline: {
    ...box([55, 212, 530, 120]),
    color: '#0C0F0D',
    fontFamily: 'Nunito_900Black',
    fontSize: 44,
    letterSpacing: -1.9,
    lineHeight: 56,
    textAlign: 'center',
    transform: [{ scaleX: 1.26 }],
  },
  illustration: {
    ...box([69, 600, 463, 320]),
  },
  carrot: {
    ...box([240, 178, 225, 116]),
  },
  apples: {
    ...box([0, 10, 270, 270]),
  },
  clock: {
    ...box([375, 105, 90, 90]),
  },
  calendar: {
    ...box([360, -15, 100, 100]),
  },
  chefHat: {
    ...box([190, -25, 150, 130]),
  },
  dots: {
    ...box([284, 1034, 72, 15]),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    backgroundColor: '#D3D3D3',
    borderRadius: 8,
    height: 14,
    width: 14,
  },
  dotActive: {
    backgroundColor: '#00AD91',
  },
  primary: {
    ...box([27, 1090, 587, 90]),
    alignItems: 'center',
    backgroundColor: '#212322',
    borderRadius: 24,
    justifyContent: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 27,
  },
  secondary: {
    ...box([27, 1209, 587, 95]),
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E7E7E7',
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: 'center',
  },
  secondaryText: {
    color: '#111111',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 26,
  },
  splash: {
    ...box([0, 0, 640, 1385]),
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  introMascot: {
    ...box([194, 519, 252, 252]),
  },
  splashWordmark: {
    ...box([131, 721, 378, 101]),
  },
});
