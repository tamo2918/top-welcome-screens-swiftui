import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import type { WelcomeScreenProps } from './types';
import { resolveActionPress } from './shared/actions';
import { box, segment } from './shared/geometry';
import { useInteractionGate } from './shared/interaction-gate';
import { ReplicaPressable } from './shared/pressable';
import { ReferenceCanvas } from './shared/reference-canvas';
import { AppleIcon } from './shared/social-icons';
import { useWelcomeTimeline } from './shared/timeline';

const mosaicSource = require('../../assets/welcome/scrl/mosaic.png');

function ScrlLogo({ compact = false }: { compact?: boolean }) {
  return (
    <View style={[styles.logoLockup, compact && styles.logoCompact]}>
      <View style={styles.logoMark}>
        <View style={styles.logoSquareBack} />
        <View style={styles.logoSquareFront} />
      </View>
      <Text style={styles.logoText}>SCRL</Text>
    </View>
  );
}

function Laurel({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <Svg
      height={70}
      style={mirrored ? styles.laurelMirrored : undefined}
      viewBox="0 0 36 70"
      width={36}
    >
      <Path
        d="M29.5 66C15.7 54.4 10.7 39.7 13.4 17.2"
        fill="none"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeWidth={2.4}
      />
      <Path
        d="M14.2 56.6C6.8 55.6 2.3 51.4 2.2 45.1c7.1.5 11.1 4.2 12 11.5Zm-3.5-12.7c-6.3-2-9.7-6.5-8.8-12 6.2 1.5 9.6 5.2 8.8 12Zm.2-13.5c-5.1-3.1-7.3-7.5-5.7-12.2 5.5 2.5 7.7 6.3 5.7 12.2Zm3.3-12.1c-3.8-3.9-4.9-8.1-2.5-12 4.5 3.4 5.7 7.3 2.5 12Zm2.1 37.2c7.1-1.6 11.1-5.8 11-12-6.9 1-10.6 4.7-11 12Zm-3.7-12.8c6.3-2.6 9.2-7 7.8-12.4-6 2-9 5.8-7.8 12.4Zm.2-13.2c5.4-3.4 7.2-7.7 5.1-12.6-5 2.9-7 6.8-5.1 12.6Zm3.4-11.9c4.2-4.1 5-8.2 2.2-12.1-4 3.5-5.1 7.4-2.2 12.1Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

export function ScrlWelcome({
  autoplay = true,
  onActionPress,
  onPrimaryPress,
  onSecondaryPress,
  replayKey = 0,
}: WelcomeScreenProps) {
  const time = useWelcomeTimeline(1999, autoplay, replayKey);
  const interactionsReady = useInteractionGate({
    autoplay,
    delayMs: 1800,
    replayKey,
  });
  const finalStyle = useAnimatedStyle(() => {
    const progress = Easing.out(Easing.cubic)(segment(time.value, 1300, 1800));
    return { opacity: progress };
  });
  const skeletonStyle = useAnimatedStyle(() => ({
    opacity: time.value < 1200 ? 0 : 1 - segment(time.value, 1300, 1780),
  }));
  const splashStyle = useAnimatedStyle(() => ({
    opacity: time.value < 1200 ? 1 : 0,
  }));

  return (
    <ReferenceCanvas backgroundColor="#0F0F0F" testID="welcome-scrl">
      <StatusBar style="light" />

      <Animated.View style={[StyleSheet.absoluteFill, finalStyle]}>
        <Image contentFit="cover" source={mosaicSource} style={StyleSheet.absoluteFill} />

        <View style={styles.awards}>
          <View style={styles.appleAward}>
            <View style={styles.appleAwardIcon}>
              <AppleIcon color="#FFFFFF" size={44} />
            </View>
            <Text style={styles.appleAwardCopy}>APP{`\n`}OF THE{`\n`}DAY</Text>
          </View>
          <View style={styles.creatorAward}>
            <Laurel />
            <Text style={styles.creatorAwardText}>The Best Apps{`\n`}for Creators</Text>
            <Laurel mirrored />
          </View>
        </View>

        <Text style={styles.eyebrow}>Welcome to SCRL</Text>
        <Text style={styles.headline}>Create social media posts{`\n`}that stand out</Text>
        <Text style={styles.body}>
          SCRL is a purpose-built social media design{`\n`}platform, used and loved by millions of creators.
        </Text>
        <ReplicaPressable
          accessibilityLabel="Get Started"
          disabled={!interactionsReady}
          onPress={resolveActionPress(
            'scrl.get-started',
            onActionPress,
            onPrimaryPress,
          )}
          style={styles.cta}
        >
          <Text style={styles.ctaText}>Get Started</Text>
        </ReplicaPressable>
        <ReplicaPressable
          accessibilityLabel="Sign in"
          disabled={!interactionsReady}
          onPress={resolveActionPress(
            'scrl.sign-in',
            onActionPress,
            onSecondaryPress,
          )}
          style={styles.signIn}
        >
          <Text style={styles.signInText}>
            Already have an account? <Text style={styles.signInLink}>Sign In</Text>
          </Text>
        </ReplicaPressable>
      </Animated.View>

      <Animated.View pointerEvents="none" style={[styles.skeleton, skeletonStyle]}>
        <View style={styles.skeletonLogo}>
          <ScrlLogo compact />
        </View>
        <View style={[styles.skeletonCard, styles.skeletonHero]} />
        <View style={styles.skeletonLine} />
        <View style={[styles.skeletonCard, styles.skeletonLeftTop]} />
        <View style={[styles.skeletonCard, styles.skeletonRightTop]} />
        <View style={[styles.skeletonCard, styles.skeletonLeftBottom]} />
        <View style={[styles.skeletonCard, styles.skeletonRightBottom]} />
        <View style={styles.skeletonNav}>
          {[
            ['⌂', 'Home'],
            ['▦', 'Templates'],
            ['▰', 'Projects'],
            ['⚙', 'More'],
          ].map(([icon, label], index) => (
            <View key={label} style={[styles.skeletonNavItem, index === 0 && styles.skeletonNavActive]}>
              <Text style={styles.skeletonNavIcon}>{icon}</Text>
              <Text style={styles.skeletonNavLabel}>{label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.skeletonAdd}><Text style={styles.skeletonAddText}>＋</Text></View>
      </Animated.View>

      <Animated.View pointerEvents="none" style={[styles.splash, splashStyle]}>
        <View style={styles.splashLogo}><ScrlLogo /></View>
      </Animated.View>
    </ReferenceCanvas>
  );
}

const styles = StyleSheet.create({
  awards: {
    ...box([108, 765, 426, 80]),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appleAward: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    width: 164,
  },
  appleAwardIcon: {
    marginRight: 7,
  },
  appleAwardCopy: {
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 19,
    letterSpacing: -0.25,
    lineHeight: 20,
  },
  creatorAward: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'center',
    width: 258,
  },
  laurelMirrored: {
    transform: [{ scaleX: -1 }],
  },
  creatorAwardText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    letterSpacing: -0.55,
    lineHeight: 21,
    textAlign: 'center',
    width: 181,
  },
  eyebrow: {
    ...box([28, 887, 300, 34]),
    color: '#FFFFFF',
    fontFamily: 'Inter_500Medium',
    fontSize: 21,
    lineHeight: 28,
  },
  headline: {
    ...box([27, 933, 590, 105]),
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 43,
    letterSpacing: -1.7,
    lineHeight: 50,
    transform: [{ scaleX: 1.1 }],
    transformOrigin: 'left center',
  },
  body: {
    ...box([28, 1055, 590, 78]),
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
    fontSize: 22,
    letterSpacing: -0.45,
    lineHeight: 29,
    transform: [{ scaleX: 1.14 }],
    transformOrigin: 'left center',
  },
  cta: {
    ...box([27, 1174, 586, 77]),
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
    borderRadius: 39,
    justifyContent: 'center',
  },
  ctaText: {
    color: '#111111',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 22,
  },
  signIn: {
    ...box([110, 1255, 420, 70]),
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
    fontSize: 20,
  },
  signInLink: {
    fontFamily: 'Inter_400Regular',
    textDecorationLine: 'underline',
  },
  skeleton: {
    ...box([0, 0, 640, 1385]),
    backgroundColor: '#0E0E0E',
  },
  skeletonLogo: {
    ...box([235, 92, 170, 60]),
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeletonCard: {
    backgroundColor: '#1A1A1B',
    borderRadius: 28,
    position: 'absolute',
  },
  skeletonHero: {
    ...box([27, 176, 586, 322]),
  },
  skeletonLeftTop: {
    ...box([27, 589, 282, 343]),
  },
  skeletonRightTop: {
    ...box([333, 589, 280, 489]),
  },
  skeletonLeftBottom: {
    ...box([27, 956, 282, 371]),
  },
  skeletonRightBottom: {
    ...box([333, 1103, 280, 224]),
  },
  skeletonLine: {
    ...box([27, 530, 421, 43]),
    backgroundColor: '#1A1A1B',
    borderRadius: 18,
  },
  skeletonNav: {
    ...box([34, 1244, 466, 108]),
    alignItems: 'center',
    backgroundColor: '#171719',
    borderColor: '#303034',
    borderRadius: 54,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  skeletonNavItem: {
    alignItems: 'center',
    borderRadius: 42,
    height: 91,
    justifyContent: 'center',
    width: 101,
  },
  skeletonNavActive: {
    backgroundColor: '#303033',
  },
  skeletonNavIcon: {
    color: '#F2F2F2',
    fontFamily: 'Inter_400Regular',
    fontSize: 32,
    lineHeight: 38,
  },
  skeletonNavLabel: {
    color: '#F2F2F2',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  skeletonAdd: {
    ...box([516, 1244, 90, 108]),
    alignItems: 'center',
    backgroundColor: '#171719',
    borderColor: '#303034',
    borderRadius: 54,
    borderWidth: 2,
    justifyContent: 'center',
  },
  skeletonAddText: {
    color: '#F2F2F2',
    fontFamily: 'Inter_400Regular',
    fontSize: 55,
    lineHeight: 62,
  },
  splash: {
    ...box([0, 0, 640, 1385]),
    alignItems: 'center',
    backgroundColor: '#0F0F0F',
    justifyContent: 'center',
  },
  splashLogo: {
    transform: [{ scale: 0.86 }],
  },
  logoLockup: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 54,
  },
  logoCompact: {
    transform: [{ scale: 0.72 }],
  },
  logoMark: {
    height: 47,
    marginRight: 10,
    width: 47,
  },
  logoSquareBack: {
    borderColor: '#FFFFFF',
    borderRadius: 1,
    borderWidth: 3,
    height: 38,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 38,
  },
  logoSquareFront: {
    borderColor: '#FFFFFF',
    borderRadius: 1,
    borderWidth: 3,
    height: 38,
    left: 8,
    position: 'absolute',
    top: 8,
    width: 38,
  },
  logoText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_500Medium',
    fontSize: 36,
    letterSpacing: 0,
  },
});
