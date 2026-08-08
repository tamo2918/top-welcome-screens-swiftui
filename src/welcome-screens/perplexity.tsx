import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import type { WelcomeScreenProps } from './types';
import { resolveActionPress } from './shared/actions';
import { box } from './shared/geometry';
import { ReplicaPressable } from './shared/pressable';
import { ReferenceCanvas } from './shared/reference-canvas';
import {
  AppleIcon,
  CloseIcon,
  EnvelopeIcon,
  GoogleIcon,
} from './shared/social-icons';

const INK = '#223736';
const brandLockupSource = require('../../assets/welcome/perplexity/brand-lockup.png');

type LoginButtonProps = {
  backgroundColor: string;
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  top: number;
};

function LoginButton({ backgroundColor, icon, label, onPress, top }: LoginButtonProps) {
  return (
    <ReplicaPressable
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.loginButton, { backgroundColor, top }]}
    >
      <View style={styles.buttonContent}>
        <View style={styles.buttonIcon}>{icon}</View>
        <Text style={[styles.buttonLabel, backgroundColor === '#000000' && styles.buttonLabelLight]}>
          {label}
        </Text>
      </View>
    </ReplicaPressable>
  );
}

export function PerplexityWelcome({
  onActionPress,
  onClosePress,
  onPrimaryPress,
  onSecondaryPress,
}: WelcomeScreenProps) {
  return (
    <ReferenceCanvas backgroundColor="#FBFAF9" testID="welcome-perplexity">
      <StatusBar style="dark" />

      <ReplicaPressable
        accessibilityLabel="Close"
        onPress={resolveActionPress('perplexity.close', onActionPress, onClosePress)}
        style={styles.close}
      >
        <CloseIcon color={INK} size={24} />
      </ReplicaPressable>

      <View style={styles.identity}>
        <Image contentFit="contain" source={brandLockupSource} style={styles.brandLockup} />
        <Text style={styles.subtitle}>Create an account for free</Text>
      </View>

      <View style={styles.buttons}>
        <LoginButton
          backgroundColor="#000000"
          icon={<AppleIcon color="#FFFFFF" size={28} />}
          label="Continue with Apple"
          onPress={resolveActionPress(
            'perplexity.continue-with-apple',
            onActionPress,
            onPrimaryPress,
          )}
          top={0}
        />
        <LoginButton
          backgroundColor="#E7E6E2"
          icon={<GoogleIcon size={27} />}
          label="Continue with Google"
          onPress={resolveActionPress(
            'perplexity.continue-with-google',
            onActionPress,
            onSecondaryPress,
          )}
          top={106}
        />
        <LoginButton
          backgroundColor="#E7E6E2"
          icon={<EnvelopeIcon color={INK} size={27} />}
          label="Sign in with email"
          onPress={resolveActionPress(
            'perplexity.sign-in-with-email',
            onActionPress,
            onSecondaryPress,
          )}
          top={211}
        />
        <ReplicaPressable
          accessibilityLabel="Single sign-on"
          onPress={resolveActionPress('perplexity.single-sign-on', onActionPress)}
          style={styles.sso}
        >
          <Text style={styles.ssoLabel}>Single sign-on (SSO)</Text>
        </ReplicaPressable>
      </View>

      <View style={styles.footer}>
        <ReplicaPressable
          accessibilityLabel="Privacy policy"
          accessibilityRole="link"
          onPress={resolveActionPress('perplexity.privacy-policy', onActionPress)}
        >
          <Text style={styles.footerText}>Privacy policy</Text>
        </ReplicaPressable>
        <ReplicaPressable
          accessibilityLabel="Terms of service"
          accessibilityRole="link"
          onPress={resolveActionPress('perplexity.terms-of-service', onActionPress)}
        >
          <Text style={styles.footerText}>Terms of service</Text>
        </ReplicaPressable>
      </View>
    </ReferenceCanvas>
  );
}

const styles = StyleSheet.create({
  close: {
    ...box([540, 79, 76, 76]),
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 38,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  identity: {
    ...box([100, 184, 440, 241]),
    alignItems: 'center',
  },
  brandLockup: {
    height: 196,
    width: 340,
  },
  subtitle: {
    color: INK,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    letterSpacing: -0.15,
    lineHeight: 22,
    marginTop: 10,
  },
  buttons: {
    ...box([39, 760, 562, 406]),
  },
  loginButton: {
    alignItems: 'center',
    borderRadius: 40,
    height: 79,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    width: 562,
  },
  buttonIcon: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 32,
  },
  buttonContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  buttonLabel: {
    color: INK,
    fontFamily: 'Inter_400Regular',
    fontSize: 28,
    letterSpacing: -0.55,
    lineHeight: 34,
  },
  buttonLabelLight: {
    color: '#FFFFFF',
  },
  sso: {
    alignItems: 'center',
    height: 58,
    justifyContent: 'center',
    left: 120,
    position: 'absolute',
    top: 349,
    width: 322,
  },
  ssoLabel: {
    color: '#5E6361',
    fontFamily: 'Inter_500Medium',
    fontSize: 18,
    letterSpacing: -0.25,
  },
  footer: {
    ...box([40, 1270, 560, 48]),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    color: '#5E6361',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
});
