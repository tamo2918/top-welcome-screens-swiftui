import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import type { WelcomeScreenProps } from './types';
import { resolveActionPress } from './shared/actions';
import { box } from './shared/geometry';
import { useInteractionGate } from './shared/interaction-gate';
import { ReplicaPressable } from './shared/pressable';
import { ReferenceCanvas } from './shared/reference-canvas';
import { AppleIcon, GoogleIcon } from './shared/social-icons';
import { useWelcomeTimeline } from './shared/timeline';

const terrainSource = require('../../assets/welcome/onx-hunt/terrain.png');
const logoSource = require('../../assets/welcome/onx-hunt/brand-lockup.png');

type OnxButtonProps = {
  backgroundColor: string;
  color?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  label: string;
  onPress?: () => void;
  top: number;
};

function OnxButton({
  backgroundColor,
  color = '#171717',
  disabled,
  icon,
  label,
  onPress,
  top,
}: OnxButtonProps) {
  return (
    <ReplicaPressable
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, { backgroundColor, top }]}
    >
      {icon ? <View style={styles.buttonIcon}>{icon}</View> : null}
      <Text style={[styles.buttonText, { color }]}>{label}</Text>
    </ReplicaPressable>
  );
}

export function OnxHuntWelcome({
  autoplay = true,
  onActionPress,
  onPrimaryPress,
  onSecondaryPress,
  replayKey = 0,
}: WelcomeScreenProps) {
  const time = useWelcomeTimeline(1467, autoplay, replayKey);
  const interactionsReady = useInteractionGate({
    autoplay,
    delayMs: 1067,
    replayKey,
  });
  const splashStyle = useAnimatedStyle(() => ({
    opacity: time.value < 1067 ? 1 : 0,
  }));

  return (
    <ReferenceCanvas backgroundColor="#1E1B1C" testID="welcome-onx-hunt">
      <StatusBar style="light" />
      <Image contentFit="cover" source={terrainSource} style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={['rgba(255,255,255,0.1)', 'rgba(76,68,66,0.08)', 'rgba(49,43,44,0.48)']}
        locations={[0, 0.48, 1]}
        style={StyleSheet.absoluteFill}
      />

      <Image contentFit="contain" source={logoSource} style={styles.logo} />
      <Text style={styles.tagline}>Know where you stand.</Text>

      <View style={styles.actions}>
        <OnxButton
          backgroundColor="#FDFDFD"
          disabled={!interactionsReady}
          icon={<AppleIcon color="#000000" size={29} />}
          label="Continue with Apple"
          onPress={resolveActionPress(
            'onx-hunt.continue-with-apple',
            onActionPress,
            onPrimaryPress,
          )}
          top={0}
        />
        <OnxButton
          backgroundColor="#FDFDFD"
          disabled={!interactionsReady}
          icon={<GoogleIcon size={28} />}
          label="Continue with Google"
          onPress={resolveActionPress(
            'onx-hunt.continue-with-google',
            onActionPress,
            onSecondaryPress,
          )}
          top={105}
        />
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.divider} />
        </View>
        <OnxButton
          backgroundColor="#FC2C01"
          color="#FFFFFF"
          disabled={!interactionsReady}
          label="Sign Up with Email"
          onPress={resolveActionPress(
            'onx-hunt.sign-up-with-email',
            onActionPress,
            onPrimaryPress,
          )}
          top={307}
        />
        <OnxButton
          backgroundColor="#49413F"
          color="#FFFFFF"
          disabled={!interactionsReady}
          label="Log In"
          onPress={resolveActionPress(
            'onx-hunt.log-in',
            onActionPress,
            onSecondaryPress,
          )}
          top={412}
        />
      </View>

      <Animated.View pointerEvents="none" style={[styles.splash, splashStyle]}>
        <Image contentFit="contain" source={logoSource} style={styles.splashLogo} />
      </Animated.View>
    </ReferenceCanvas>
  );
}

const styles = StyleSheet.create({
  logo: {
    ...box([206, 385, 228, 59]),
  },
  tagline: {
    ...box([150, 453, 340, 38]),
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
    fontSize: 23,
    letterSpacing: -0.4,
    lineHeight: 32,
    textAlign: 'center',
  },
  actions: {
    ...box([33, 812, 574, 520]),
  },
  button: {
    alignItems: 'center',
    borderRadius: 13,
    height: 79,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    width: 574,
  },
  buttonIcon: {
    alignItems: 'center',
    height: 38,
    justifyContent: 'center',
    left: 25,
    position: 'absolute',
    width: 38,
  },
  buttonText: {
    fontFamily: 'Nunito_900Black',
    fontSize: 26,
    letterSpacing: -0.7,
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 28,
    justifyContent: 'space-between',
    left: 0,
    position: 'absolute',
    top: 235,
    width: 574,
  },
  divider: {
    backgroundColor: 'rgba(255,255,255,0.32)',
    height: 1,
    width: 255,
  },
  or: {
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 17,
  },
  splash: {
    ...box([0, 0, 640, 1385]),
    alignItems: 'center',
    backgroundColor: '#FC2C01',
    justifyContent: 'center',
  },
  splashLogo: {
    height: 69,
    width: 263,
  },
});
