import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
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

const BLUE = '#173FFE';
const lowerBlurSource = require('../../assets/welcome/speak-language/lower-blur.png');

function SpeakLockup() {
  return (
    <View style={styles.speakLockup}>
      <View style={styles.waveform}>
        {[20, 34, 44, 32, 20].map((height, index) => (
          <View
            key={index}
            style={[
              styles.waveBar,
              {
                backgroundColor: BLUE,
                height,
                marginTop: (44 - height) / 2,
              },
            ]}
          />
        ))}
      </View>
      <Text style={styles.speakWordmark}>Speak</Text>
    </View>
  );
}

function SplashWordmark() {
  return <Text style={styles.splashWordmark}>Speak</Text>;
}

type PageProps = {
  copy: string;
  index: 0 | 1 | 2;
  time: ReturnType<typeof useWelcomeTimeline>;
};

function OnboardingPage({ copy, index, time }: PageProps) {
  const animatedStyle = useAnimatedStyle(() => {
    let x = 0;
    let opacity = 1;
    if (index === 0) {
      const exit = Easing.inOut(Easing.cubic)(segment(time.value, 2833, 3100));
      x = interpolate(exit, [0, 1], [0, -640]);
      opacity = 1 - segment(time.value, 3030, 3100);
    } else if (index === 1) {
      const enter = Easing.inOut(Easing.cubic)(segment(time.value, 2833, 3100));
      const exit = Easing.inOut(Easing.cubic)(segment(time.value, 3267, 3533));
      x = interpolate(enter, [0, 1], [640, 0]) + interpolate(exit, [0, 1], [0, -640]);
      opacity = Math.min(enter, 1 - segment(time.value, 3460, 3533));
    } else {
      const enter = Easing.inOut(Easing.cubic)(segment(time.value, 3267, 3533));
      x = interpolate(enter, [0, 1], [640, 0]);
      opacity = enter;
    }
    return {
      opacity,
      transform: [{ translateX: x }],
    };
  });

  return (
    <Animated.View style={[styles.page, animatedStyle]}>
      <SpeakLockup />
      <View style={styles.progressRow}>
        {[0, 1, 2].map((barIndex) => (
          <View
            key={barIndex}
            style={[
              styles.progressBar,
              barIndex <= index ? styles.progressBarActive : styles.progressBarInactive,
            ]}
          />
        ))}
      </View>
      <Text style={styles.headline}>{copy}</Text>
    </Animated.View>
  );
}

export function SpeakLanguageWelcome({
  autoplay = true,
  onActionPress,
  onPrimaryPress,
  onSecondaryPress,
  replayKey = 0,
}: WelcomeScreenProps) {
  const time = useWelcomeTimeline(5070, autoplay, replayKey);
  const contentReady = useInteractionGate({
    autoplay,
    delayMs: 333,
    replayKey,
  });
  const ctaReady = useInteractionGate({
    autoplay,
    delayMs: 4400,
    replayKey,
  });
  const tapExpired = useInteractionGate({
    autoplay,
    delayMs: 3400,
    replayKey,
  });

  const contentStyle = useAnimatedStyle(() => ({
    opacity: segment(time.value, 300, 333),
  }));
  const splashStyle = useAnimatedStyle(() => ({
    opacity: 1 - Easing.out(Easing.cubic)(segment(time.value, 33, 200)),
  }));
  const loaderStyle = useAnimatedStyle(() => ({
    opacity: Math.min(segment(time.value, 80, 180), 1 - segment(time.value, 290, 333)),
  }));
  const tapStyle = useAnimatedStyle(() => ({
    opacity: 1 - segment(time.value, 3200, 3400),
  }));
  const buttonStyle = useAnimatedStyle(() => ({
    opacity: Easing.inOut(Easing.quad)(segment(time.value, 3800, 4400)),
  }));

  return (
    <ReferenceCanvas backgroundColor="#FDFDFD" testID="welcome-speak-language">
      <StatusBar animated={false} style="dark" />
      <Image contentFit="cover" source={lowerBlurSource} style={styles.lowerBlur} />

      <Animated.View style={[StyleSheet.absoluteFill, contentStyle]}>
        <ReplicaPressable
          accessibilityLabel="Sign in"
          disabled={!contentReady}
          onPress={resolveActionPress(
            'speak-language.sign-in',
            onActionPress,
            onSecondaryPress,
          )}
          style={styles.signIn}
        >
          <Text style={styles.signInText}>Sign in</Text>
        </ReplicaPressable>

        <OnboardingPage
          copy="Adults can become fluent — even faster than kids."
          index={0}
          time={time}
        />
        <OnboardingPage
          copy="The secret? Speaking early and often, not memorizing flashcards."
          index={1}
          time={time}
        />
        <OnboardingPage
          copy="Speak turns science into real speaking practice from Day 1."
          index={2}
          time={time}
        />

        <Animated.View style={[styles.tap, tapStyle]}>
          <ReplicaPressable
            accessibilityLabel="Tap to continue"
            disabled={!contentReady || tapExpired}
            onPress={resolveActionPress(
              'speak-language.tap-to-continue',
              onActionPress,
            )}
            style={styles.tapPressable}
          >
            <Text style={styles.tapText}>Tap to continue</Text>
          </ReplicaPressable>
        </Animated.View>

        <Animated.View style={[styles.ctaWrap, buttonStyle]}>
          <ReplicaPressable
            accessibilityLabel="Start speaking today"
            disabled={!ctaReady}
            onPress={resolveActionPress(
              'speak-language.start-speaking-today',
              onActionPress,
              onPrimaryPress,
            )}
            style={styles.cta}
          >
            <Text style={styles.ctaText}>Start speaking today</Text>
          </ReplicaPressable>
        </Animated.View>
      </Animated.View>

      <Animated.View pointerEvents="none" style={[styles.loader, loaderStyle]}>
        <ActivityIndicator color="#777777" size="small" style={styles.loaderIndicator} />
      </Animated.View>

      <Animated.View pointerEvents="none" style={[styles.splash, splashStyle]}>
        <SplashWordmark />
        <View style={styles.splashSpinner}>
          <ActivityIndicator color="#FFFFFF" size="small" />
        </View>
      </Animated.View>
    </ReferenceCanvas>
  );
}

const styles = StyleSheet.create({
  lowerBlur: {
    ...box([0, 120, 640, 1385]),
    opacity: 0.85,
  },
  signIn: {
    ...box([471, 88, 115, 68]),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  signInText: {
    color: BLUE,
    fontFamily: 'Inter_400Regular',
    fontSize: 27,
    letterSpacing: -0.5,
  },
  page: {
    ...box([0, 0, 640, 920]),
  },
  speakLockup: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    left: 53,
    position: 'absolute',
    top: 374,
  },
  waveform: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    height: 44,
    width: 65,
  },
  waveBar: {
    borderRadius: 9,
    marginRight: 4,
    width: 9,
  },
  speakWordmark: {
    color: '#171717',
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 40,
    letterSpacing: -2.7,
    lineHeight: 48,
    marginLeft: 5,
  },
  progressRow: {
    ...box([54, 504, 162, 8]),
    flexDirection: 'row',
    gap: 15,
  },
  progressBar: {
    borderRadius: 4,
    height: 6,
    width: 44,
  },
  progressBarActive: {
    backgroundColor: BLUE,
  },
  progressBarInactive: {
    backgroundColor: '#D8DCE6',
  },
  headline: {
    ...box([48, 590, 500, 210]),
    color: '#171717',
    fontFamily: 'Inter_700Bold',
    fontSize: 46,
    letterSpacing: -2.1,
    lineHeight: 56,
    transform: [{ scaleX: 1.1 }],
    transformOrigin: 'left center',
  },
  tap: {
    ...box([0, 1242, 640, 42]),
  },
  tapPressable: {
    height: 42,
    width: 640,
  },
  tapText: {
    color: '#777777',
    fontFamily: 'Inter_400Regular',
    fontSize: 20,
    textAlign: 'center',
  },
  ctaWrap: {
    ...box([27, 1136, 587, 88]),
  },
  cta: {
    alignItems: 'center',
    backgroundColor: BLUE,
    borderRadius: 27,
    height: 88,
    justifyContent: 'center',
    width: 587,
  },
  ctaText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 27,
    letterSpacing: -0.5,
  },
  loader: {
    ...box([299, 682, 42, 42]),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderIndicator: {
    transform: [{ scale: 1.3 }],
  },
  splash: {
    ...box([0, 0, 640, 1385]),
    backgroundColor: '#0745FE',
  },
  splashWordmark: {
    ...box([230, 663, 180, 58]),
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 42,
    letterSpacing: -2.1,
    lineHeight: 52,
    textAlign: 'center',
  },
  splashSpinner: {
    ...box([306, 740, 28, 28]),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
