import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, { Ellipse, Path } from 'react-native-svg';

import type { WelcomeScreenProps } from './types';
import { resolveActionPress } from './shared/actions';
import { box, segment } from './shared/geometry';
import { useInteractionGate } from './shared/interaction-gate';
import { ReplicaPressable } from './shared/pressable';
import { ReferenceCanvas } from './shared/reference-canvas';
import { TimedStatusBar } from './shared/timed-status-bar';
import { useWelcomeTimeline } from './shared/timeline';

const heroSource = require('../../assets/welcome/speak-learn/hero.png');
const avatarSource = require('../../assets/welcome/speak-learn/avatar.png');
const logoMarkSource = require('../../assets/welcome/speak-learn/logo-mark.png');

function StarRow() {
  return (
    <View style={styles.stars}>
      {Array.from({ length: 5 }, (_, index) => (
        <Text key={index} style={styles.star}>★</Text>
      ))}
    </View>
  );
}

function Laurel({ right = false }: { right?: boolean }) {
  return (
    <Svg
      style={[styles.laurel, right && styles.laurelRight]}
      viewBox="0 0 60 110"
    >
      <Path d="M50 105 C37 83 24 55 14 7" fill="none" stroke="#188DE6" strokeWidth="3" />
      <Ellipse cx="43" cy="90" fill="#188DE6" rx="4" ry="10" transform="rotate(-42 43 90)" />
      <Ellipse cx="50" cy="82" fill="#188DE6" rx="4" ry="10" transform="rotate(33 50 82)" />
      <Ellipse cx="34" cy="71" fill="#188DE6" rx="4" ry="10" transform="rotate(-38 34 71)" />
      <Ellipse cx="42" cy="64" fill="#188DE6" rx="4" ry="10" transform="rotate(38 42 64)" />
      <Ellipse cx="26" cy="51" fill="#188DE6" rx="4" ry="10" transform="rotate(-32 26 51)" />
      <Ellipse cx="34" cy="45" fill="#188DE6" rx="4" ry="10" transform="rotate(43 34 45)" />
      <Ellipse cx="19" cy="31" fill="#188DE6" rx="4" ry="9" transform="rotate(-26 19 31)" />
      <Ellipse cx="26" cy="26" fill="#188DE6" rx="4" ry="9" transform="rotate(48 26 26)" />
      <Ellipse cx="14" cy="13" fill="#188DE6" rx="4" ry="8" transform="rotate(-18 14 13)" />
    </Svg>
  );
}

export function SpeakLearnWelcome({
  autoplay = true,
  onActionPress,
  onPrimaryPress,
  onSecondaryPress,
  replayKey = 0,
}: WelcomeScreenProps) {
  const time = useWelcomeTimeline(4940, autoplay, replayKey);
  const interactionsReady = useInteractionGate({
    autoplay,
    delayMs: 3800,
    replayKey,
  });
  const stemStyle = useAnimatedStyle(() => {
    const progress = Easing.out(Easing.cubic)(segment(time.value, 100, 967));
    return {
      opacity: progress,
      transform: [
        { rotate: `${interpolate(progress, [0, 1], [-48, 0])}deg` },
        { scaleY: interpolate(progress, [0, 1], [0.15, 1]) },
      ],
    };
  });
  const echoOneStyle = useAnimatedStyle(() => {
    const progress = Easing.out(Easing.cubic)(segment(time.value, 180, 980));
    return {
      opacity: progress * 0.58,
      transform: [{ translateX: interpolate(progress, [0, 1], [42, 0]) }],
    };
  });
  const echoTwoStyle = useAnimatedStyle(() => {
    const progress = Easing.out(Easing.cubic)(segment(time.value, 260, 1030));
    return {
      opacity: progress * 0.32,
      transform: [{ translateX: interpolate(progress, [0, 1], [64, 0]) }],
    };
  });
  const bubbleStyle = useAnimatedStyle(() => {
    const enter = Easing.out(Easing.back(1.35))(segment(time.value, 1133, 1567));
    const exit = 1 - segment(time.value, 3267, 3533);
    return {
      opacity: Math.min(enter, exit),
      transform: [
        { translateX: interpolate(enter, [0, 1], [-38, 0]) },
        { scale: interpolate(enter, [0, 1], [0.1, 1]) },
      ],
    };
  });
  const generatedLogoProgress = useAnimatedStyle(() => ({
    opacity: segment(time.value, 1533, 1600),
  }));
  const proceduralLogoProgress = useAnimatedStyle(() => ({
    opacity: 1 - segment(time.value, 1533, 1600),
  }));
  const pageStyle = useAnimatedStyle(() => {
    const progress = Easing.out(Easing.exp)(segment(time.value, 3567, 3800));
    return {
      transform: [{ translateX: interpolate(progress, [0, 1], [640, 0]) }],
    };
  });

  return (
    <ReferenceCanvas backgroundColor="#3895FF" testID="welcome-speak-learn">
      <TimedStatusBar
        key={`${replayKey}-${autoplay}`}
        autoplay={autoplay}
        final="dark"
        initial="light"
        switchAtMs={3800}
      />

      <View style={styles.splash}>
        <View style={styles.logoBuild}>
          <Animated.View style={[styles.proceduralLogo, proceduralLogoProgress]}>
            <Animated.View style={[styles.logoEchoTwo, echoTwoStyle]} />
            <Animated.View style={[styles.logoEchoOne, echoOneStyle]} />
            <Animated.View style={[styles.logoStem, stemStyle]} />
          </Animated.View>
          <Animated.View style={[styles.generatedStemCrop, generatedLogoProgress]}>
            <Image contentFit="fill" source={logoMarkSource} style={styles.generatedLogo} />
          </Animated.View>
          <Animated.View style={[styles.logoBubble, bubbleStyle]}>
            <Svg height="100%" viewBox="0 0 59 51" width="100%">
              <Path
                d="M0 51V18C0 7 8 0 21 0H31C47 0 59 9 59 24C59 40 46 50 31 50C20 50 13 44 0 51Z"
                fill="#FFFFFF"
              />
            </Svg>
          </Animated.View>
        </View>
      </View>

      <Animated.View style={[styles.page, pageStyle]}>
        <LinearGradient
          colors={['#A5CFFE', '#8FC1F4', '#60A0E4']}
          locations={[0, 0.48, 1]}
          style={StyleSheet.absoluteFill}
        />
        <Image
          contentFit="cover"
          contentPosition="right center"
          source={heroSource}
          style={styles.hero}
        />
        <View style={styles.indicators}>
          <View style={styles.indicatorActive} />
          <View style={styles.indicator} />
        </View>

        <View style={styles.testimonial}>
          <Image contentFit="cover" source={avatarSource} style={styles.avatar} />
          <View style={styles.testimonialCopy}>
            <Text style={styles.testimonialName}>Jessie Malmon, 24 🇧🇬</Text>
            <Text style={styles.testimonialQuote}>
              I feel more confident speaking,{`\n`}thanks to Learna. Highly recommend!
            </Text>
          </View>
        </View>

        <View style={styles.ratingCard}>
          <Laurel />
          <Laurel right />
          <Text style={styles.rating}>4.6</Text>
          <StarRow />
          <Text style={styles.ratingCaption}>App Store Rating</Text>
        </View>
        <View style={styles.downloadCard}>
          <Text style={styles.downloadCount}>50M+</Text>
          <Text style={styles.downloadCaption}>Downloads on App Store</Text>
        </View>
        <Text style={styles.heading}>Welcome to Learna!</Text>
        <Text style={styles.description}>
          Boost your language skills with Learna{`\n`}effortlessly anytime, anywhere.
        </Text>

        <View style={styles.bottomSheet}>
          <ReplicaPressable
            accessibilityLabel="Log in"
            disabled={!interactionsReady}
            onPress={resolveActionPress(
              'speak-learn.log-in',
              onActionPress,
              onSecondaryPress,
            )}
            style={styles.accountPrompt}
          >
            <Text style={styles.accountText}>
              Already have an account? <Text style={styles.accountLink}>Log in</Text>
            </Text>
          </ReplicaPressable>
          <View style={styles.ctaShadow} />
          <ReplicaPressable
            accessibilityLabel="Let's Go"
            disabled={!interactionsReady}
            onPress={resolveActionPress(
              'speak-learn.lets-go',
              onActionPress,
              onPrimaryPress,
            )}
            style={styles.cta}
          >
            <Text style={styles.ctaText}>Let&apos;s Go</Text>
          </ReplicaPressable>
          <Text style={styles.legal}>
            By continuing, you agree to our{' '}
            <Text
              accessibilityRole={interactionsReady && onActionPress ? 'link' : undefined}
              onPress={
                interactionsReady
                  ? resolveActionPress('speak-learn.privacy-policy', onActionPress)
                  : undefined
              }
              style={styles.legalLink}
            >
              Privacy Policy
            </Text>{' '}
            and{' '}
            <Text
              accessibilityRole={interactionsReady && onActionPress ? 'link' : undefined}
              onPress={
                interactionsReady
                  ? resolveActionPress('speak-learn.terms-of-service', onActionPress)
                  : undefined
              }
              style={styles.legalLink}
            >
              Terms of Service
            </Text>
          </Text>
        </View>
      </Animated.View>
    </ReferenceCanvas>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...box([0, 0, 640, 1385]),
    alignItems: 'center',
    backgroundColor: '#3895FF',
    justifyContent: 'center',
  },
  logoBuild: {
    height: 294,
    transform: [{ translateX: -11 }],
    width: 294,
  },
  proceduralLogo: {
    ...StyleSheet.absoluteFill,
  },
  logoStem: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 26,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    height: 148,
    left: 109,
    position: 'absolute',
    top: 71,
    transformOrigin: 'center bottom',
    width: 52,
  },
  logoEchoOne: {
    backgroundColor: '#A7D2FE',
    borderBottomLeftRadius: 26,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    height: 148,
    left: 97,
    position: 'absolute',
    top: 71,
    width: 52,
  },
  logoEchoTwo: {
    backgroundColor: '#1375DC',
    borderBottomLeftRadius: 26,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    height: 148,
    left: 86,
    position: 'absolute',
    top: 71,
    width: 52,
  },
  logoBubble: {
    bottom: 72,
    height: 53,
    position: 'absolute',
    right: 67,
    width: 63,
  },
  generatedStemCrop: {
    height: 294,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    width: 170,
  },
  generatedLogo: {
    height: 289,
    left: 0,
    position: 'absolute',
    top: 6,
    width: 299,
  },
  page: {
    ...box([0, 0, 640, 1385]),
    backgroundColor: '#60A0E4',
  },
  indicators: {
    ...box([292, 98, 60, 11]),
    flexDirection: 'row',
    gap: 12,
  },
  indicatorActive: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    height: 11,
    width: 30,
  },
  indicator: {
    backgroundColor: 'rgba(255,255,255,0.45)',
    borderRadius: 6,
    height: 11,
    width: 18,
  },
  testimonial: {
    ...box([35, 208, 571, 127]),
    alignItems: 'center',
    backgroundColor: 'rgba(88,166,238,0.12)',
    borderColor: 'rgba(255,255,255,0.92)',
    borderRadius: 64,
    borderWidth: 2,
    flexDirection: 'row',
  },
  avatar: {
    borderRadius: 47,
    height: 94,
    marginLeft: 23,
    width: 94,
  },
  testimonialCopy: {
    marginLeft: 20,
  },
  testimonialName: {
    color: '#073F79',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 20,
    lineHeight: 27,
  },
  testimonialQuote: {
    color: '#FFFFFF',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 17,
    lineHeight: 23,
    marginTop: 4,
  },
  ratingCard: {
    ...box([35, 383, 310, 130]),
  },
  rating: {
    ...box([103, 0, 104, 55]),
    color: '#073F79',
    fontFamily: 'Nunito_900Black',
    fontSize: 42,
    lineHeight: 54,
    textAlign: 'center',
  },
  stars: {
    ...box([62, 79, 186, 33]),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    color: '#FF9B22',
    fontSize: 28,
    marginHorizontal: 2,
  },
  ratingCaption: {
    ...box([52, 48, 206, 31]),
    color: '#073F79',
    fontFamily: 'Nunito_700Bold',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
  },
  laurel: {
    ...box([0, 4, 60, 110]),
  },
  laurelRight: {
    left: 250,
    transform: [{ scaleX: -1 }],
  },
  downloadCard: {
    ...box([35, 557, 330, 115]),
    alignItems: 'center',
    backgroundColor: 'rgba(88,166,238,0.12)',
    borderColor: 'rgba(255,255,255,0.92)',
    borderRadius: 58,
    borderWidth: 2,
    paddingTop: 13,
  },
  downloadCount: {
    color: '#073F79',
    fontFamily: 'Nunito_900Black',
    fontSize: 40,
    lineHeight: 49,
  },
  downloadCaption: {
    color: '#073F79',
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
  },
  hero: {
    ...box([0, -13, 640, 1469]),
  },
  heading: {
    ...box([35, 891, 540, 62]),
    color: '#FFFFFF',
    fontFamily: 'Nunito_900Black',
    fontSize: 43,
    letterSpacing: -1.4,
    lineHeight: 55,
  },
  description: {
    ...box([35, 969, 570, 74]),
    color: '#FFFFFF',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 27,
    letterSpacing: -0.55,
    lineHeight: 33,
  },
  bottomSheet: {
    ...box([0, 1083, 640, 302]),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
  },
  accountPrompt: {
    ...box([90, 28, 460, 56]),
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountText: {
    color: '#888888',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 24,
  },
  accountLink: {
    color: '#3193FB',
    fontFamily: 'Nunito_800ExtraBold',
  },
  ctaShadow: {
    ...box([34, 109, 572, 99]),
    backgroundColor: '#1775C5',
    borderRadius: 18,
  },
  cta: {
    ...box([34, 101, 572, 94]),
    alignItems: 'center',
    backgroundColor: '#3193FB',
    borderRadius: 18,
    justifyContent: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontFamily: 'Nunito_700Bold',
    fontSize: 27,
  },
  legal: {
    ...box([60, 226, 520, 48]),
    color: '#8A8A8A',
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  legalLink: {
    textDecorationLine: 'underline',
  },
});
