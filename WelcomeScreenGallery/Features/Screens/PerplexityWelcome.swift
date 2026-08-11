import SwiftUI

struct PerplexityWelcome: View {
    var onActionPress: WelcomeActionPressHandler?
    var onClosePress: (@MainActor () -> Void)?
    var onPrimaryPress: (@MainActor () -> Void)?
    var onSecondaryPress: (@MainActor () -> Void)?

    private let ink = Color(hex: 0x223736)

    var body: some View {
        ReferenceCanvas(backgroundColor: Color(hex: 0xFBFAF9)) {
            ZStack(alignment: .topLeading) {
                Color(hex: 0xFBFAF9)

                ReplicaButton(
                    "Close",
                    action: resolveAction(
                        .perplexityClose,
                        onActionPress: onActionPress,
                        fallback: onClosePress
                    )
                ) {
                    Circle()
                        .fill(.white)
                        .shadow(color: .black.opacity(0.08), radius: 8, y: 2)
                        .overlay { CloseIcon(color: ink, size: 24) }
                }
                .replicaFrame(.replica(540, 79, 76, 76))

                VStack(spacing: 10) {
                    ReplicaImage(screen: "perplexity", name: "brand-lockup")
                        .frame(width: 340, height: 196)
                    Text("Create an account for free")
                        .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 16))
                        .tracking(-0.15)
                        .foregroundStyle(ink)
                }
                .replicaFrame(.replica(100, 184, 440, 241), alignment: .top)

                ZStack(alignment: .topLeading) {
                    loginButton(
                        label: "Continue with Apple",
                        background: .black,
                        foreground: .white,
                        icon: AnyView(AppleIcon(color: .white, size: 28)),
                        action: resolveAction(
                            .perplexityContinueWithApple,
                            onActionPress: onActionPress,
                            fallback: onPrimaryPress
                        )
                    )
                    .replicaFrame(.replica(0, 0, 562, 79))

                    loginButton(
                        label: "Continue with Google",
                        background: Color(hex: 0xE7E6E2),
                        foreground: ink,
                        icon: AnyView(GoogleIcon(size: 27)),
                        action: resolveAction(
                            .perplexityContinueWithGoogle,
                            onActionPress: onActionPress,
                            fallback: onSecondaryPress
                        )
                    )
                    .replicaFrame(.replica(0, 106, 562, 79))

                    loginButton(
                        label: "Sign in with email",
                        background: Color(hex: 0xE7E6E2),
                        foreground: ink,
                        icon: AnyView(EnvelopeIcon(color: ink, size: 27)),
                        action: resolveAction(
                            .perplexitySignInWithEmail,
                            onActionPress: onActionPress,
                            fallback: onSecondaryPress
                        )
                    )
                    .replicaFrame(.replica(0, 211, 562, 79))

                    ReplicaButton(
                        "Single sign-on",
                        action: resolveAction(
                            .perplexitySingleSignOn,
                            onActionPress: onActionPress
                        )
                    ) {
                        Text("Single sign-on (SSO)")
                            .font(ReplicaFont.fixed(ReplicaFont.interMedium, size: 18))
                            .tracking(-0.25)
                            .foregroundStyle(Color(hex: 0x5E6361))
                            .frame(maxWidth: .infinity, maxHeight: .infinity)
                    }
                    .replicaFrame(.replica(120, 349, 322, 58))
                }
                .replicaFrame(.replica(39, 760, 562, 406))

                HStack {
                    ReplicaButton(
                        "Privacy policy",
                        action: resolveAction(
                            .perplexityPrivacyPolicy,
                            onActionPress: onActionPress
                        )
                    ) {
                        Text("Privacy policy")
                            .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 16))
                            .foregroundStyle(Color(hex: 0x5E6361))
                    }
                    Spacer()
                    ReplicaButton(
                        "Terms of service",
                        action: resolveAction(
                            .perplexityTermsOfService,
                            onActionPress: onActionPress
                        )
                    ) {
                        Text("Terms of service")
                            .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 16))
                            .foregroundStyle(Color(hex: 0x5E6361))
                    }
                }
                .replicaFrame(.replica(40, 1_270, 560, 48))
            }
        }
        .preferredColorScheme(.light)
    }

    private func loginButton(
        label: String,
        background: Color,
        foreground: Color,
        icon: AnyView,
        action: (@MainActor () -> Void)?
    ) -> some View {
        ReplicaButton(label, action: action) {
            ZStack {
                Capsule().fill(background)
                HStack(spacing: 12) {
                    icon.frame(width: 32, height: 36)
                    Text(label)
                        .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 28))
                        .tracking(-0.55)
                        .foregroundStyle(foreground)
                }
            }
        }
    }
}

#Preview("Perplexity") {
    PerplexityWelcome()
}
