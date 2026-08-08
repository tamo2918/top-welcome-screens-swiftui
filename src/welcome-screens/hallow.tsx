import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

import type { WelcomeScreenProps } from './types';
import { resolveActionPress } from './shared/actions';
import { box, segment } from './shared/geometry';
import { useInteractionGate } from './shared/interaction-gate';
import { ReplicaPressable } from './shared/pressable';
import { ReferenceCanvas } from './shared/reference-canvas';
import { AppleIcon, CloseIcon } from './shared/social-icons';
import { useWelcomeTimeline } from './shared/timeline';

const sceneSource = require('../../assets/welcome/hallow/scene.png');

function HallowGlyph() {
  return (
    <View style={styles.glyph}>
      <View style={styles.glyphShadow} />
      <View style={styles.glyphEgg} />
      <View style={styles.glyphHalo} />
    </View>
  );
}

export function HallowWelcome({
  autoplay = true,
  onActionPress,
  onClosePress,
  onPrimaryPress,
  onSecondaryPress,
  replayKey = 0,
}: WelcomeScreenProps) {
  const time = useWelcomeTimeline(4500, autoplay, replayKey);
  const interactionsReady = useInteractionGate({
    autoplay,
    delayMs: 3033,
    replayKey,
  });
  const loaderStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(time.value, [233, 467], ['#9F3BE9', '#9240E0']),
    opacity: 1 - Easing.inOut(Easing.cubic)(segment(time.value, 2767, 3033)),
  }));
  const dotsStyle = useAnimatedStyle(() => ({
    opacity: time.value >= 1233 ? 1 : 0,
  }));
  const versionStyle = useAnimatedStyle(() => ({
    opacity: segment(time.value, 1400, 1467),
  }));
  const leftDotStyle = useAnimatedStyle(() => {
    const pulse = Math.sin(segment(time.value, 1633, 2100) * Math.PI);
    return { transform: [{ scale: 1 + pulse * 0.5 }] };
  });
  const middleDotStyle = useAnimatedStyle(() => {
    const pulse = Math.sin(segment(time.value, 1800, 2267) * Math.PI);
    return { transform: [{ scale: 1 + pulse * 0.5 }] };
  });
  const rightDotStyle = useAnimatedStyle(() => {
    const pulse = Math.sin(segment(time.value, 1933, 2400) * Math.PI);
    return { transform: [{ scale: 1 + pulse * 0.5 }] };
  });

  return (
    <ReferenceCanvas backgroundColor="#31015B" testID="welcome-hallow">
      <StatusBar style="light" />
      <Image contentFit="fill" source={sceneSource} style={styles.scene} />
      <LinearGradient
        colors={['rgba(49,1,91,0)', 'rgba(54,43,67,0.76)', '#160F1D']}
        locations={[0, 0.5, 1]}
        style={styles.floor}
      />

      <ReplicaPressable
        accessibilityLabel="Close"
        disabled={!interactionsReady}
        onPress={resolveActionPress('hallow.close', onActionPress, onClosePress)}
        style={styles.close}
      >
        <CloseIcon color="#FFFFFF" size={25} />
      </ReplicaPressable>
      <Text style={styles.wordmark}>Hallow</Text>
      <View pointerEvents="none" style={styles.wordmarkHalo} />
      <Text style={styles.praylist}>Hope Praylist</Text>

      <ReplicaPressable
        accessibilityLabel="Continue with email"
        disabled={!interactionsReady}
        onPress={resolveActionPress(
          'hallow.continue-with-email',
          onActionPress,
          onPrimaryPress,
        )}
        style={styles.email}
      >
        <Text style={styles.emailText}>Continue with Email</Text>
      </ReplicaPressable>
      <ReplicaPressable
        accessibilityLabel="Continue with Apple"
        disabled={!interactionsReady}
        onPress={resolveActionPress(
          'hallow.continue-with-apple',
          onActionPress,
          onPrimaryPress,
        )}
        style={styles.apple}
      >
        <View style={styles.appleIcon}>
          <AppleIcon color="#000000" size={29} />
        </View>
        <Text style={styles.appleText}>Continue with Apple</Text>
      </ReplicaPressable>
      <ReplicaPressable
        accessibilityLabel="Continue with Google"
        disabled={!interactionsReady}
        onPress={resolveActionPress(
          'hallow.continue-with-google',
          onActionPress,
          onSecondaryPress,
        )}
        style={styles.google}
      >
        <Text style={styles.googleText}>Continue with Google</Text>
      </ReplicaPressable>
      <Text style={styles.legal}>
        By using Hallow you agree to our{' '}
        <Text
          accessibilityRole={interactionsReady && onActionPress ? 'link' : undefined}
          onPress={
            interactionsReady
              ? resolveActionPress('hallow.terms', onActionPress)
              : undefined
          }
          style={styles.legalLink}
        >
          Terms.
        </Text>
      </Text>

      <Animated.View pointerEvents="none" style={[styles.loader, loaderStyle]}>
        <HallowGlyph />
        <Animated.View style={[styles.dots, dotsStyle]}>
          <Animated.View style={[styles.dot, leftDotStyle]} />
          <Animated.View style={[styles.dot, middleDotStyle]} />
          <Animated.View style={[styles.dot, rightDotStyle]} />
        </Animated.View>
        <Animated.Text style={[styles.version, versionStyle]}>v13.3.0 (10009)</Animated.Text>
      </Animated.View>
    </ReferenceCanvas>
  );
}

const styles = StyleSheet.create({
  floor: {
    ...box([0, 870, 640, 515]),
  },
  scene: {
    ...box([38, 130, 564, 1110]),
  },
  close: {
    ...box([558, 84, 60, 60]),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordmark: {
    ...box([195, 171, 250, 65]),
    color: '#FFFFFF',
    fontFamily: 'Nunito_900Black',
    fontSize: 50,
    letterSpacing: -2.1,
    lineHeight: 60,
    textAlign: 'center',
    transform: [{ scaleX: 1.14 }],
  },
  wordmarkHalo: {
    ...box([337, 184, 23, 7]),
    borderColor: '#C9A4EA',
    borderRadius: 12,
    borderWidth: 1.5,
    transform: [{ rotate: '-3deg' }],
  },
  praylist: {
    ...box([190, 254, 260, 40]),
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 23,
    lineHeight: 32,
    textAlign: 'center',
    textShadowColor: 'rgba(25,0,48,0.68)',
    textShadowOffset: { height: 1, width: 0 },
    textShadowRadius: 2,
  },
  email: {
    ...box([34, 980, 572, 98]),
    alignItems: 'center',
    backgroundColor: 'rgba(181,160,201,0.28)',
    borderRadius: 49,
    justifyContent: 'center',
  },
  emailText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
  },
  apple: {
    ...box([34, 1092, 572, 98]),
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
    borderRadius: 49,
    justifyContent: 'center',
  },
  appleIcon: {
    left: 108,
    position: 'absolute',
  },
  appleText: {
    color: '#000000',
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    letterSpacing: -0.4,
  },
  google: {
    ...box([140, 1209, 360, 65]),
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
  },
  legal: {
    ...box([80, 1296, 480, 45]),
    color: 'rgba(255,255,255,0.78)',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  legalLink: {
    textDecorationLine: 'underline',
  },
  loader: {
    ...box([0, 0, 640, 1385]),
    alignItems: 'center',
  },
  glyph: {
    height: 128,
    left: 271,
    position: 'absolute',
    top: 596,
    width: 98,
  },
  glyphShadow: {
    backgroundColor: 'rgba(67,13,91,0.36)',
    borderRadius: 40,
    height: 17,
    left: 11,
    position: 'absolute',
    top: 107,
    width: 76,
  },
  glyphEgg: {
    backgroundColor: '#FFFFFF',
    borderRadius: 49,
    height: 98,
    left: 0,
    position: 'absolute',
    top: 25,
    width: 98,
  },
  glyphHalo: {
    borderColor: '#D8B9F3',
    borderRadius: 50,
    borderWidth: 3,
    height: 14,
    left: 10,
    position: 'absolute',
    top: 0,
    transform: [{ rotate: '-7deg' }],
    width: 79,
  },
  dots: {
    ...box([289, 753, 62, 14]),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    height: 10,
    width: 10,
  },
  version: {
    ...box([190, 1293, 260, 32]),
    color: 'rgba(255,255,255,0.74)',
    fontFamily: 'Inter_400Regular',
    fontSize: 17,
    textAlign: 'center',
  },
});
