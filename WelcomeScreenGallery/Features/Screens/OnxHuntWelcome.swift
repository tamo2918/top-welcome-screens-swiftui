import SwiftUI

struct OnxHuntWelcome: View {
    var autoplay = true
    var replayKey: AnyHashable = 0
    var onActionPress: WelcomeActionPressHandler?
    var onPrimaryPress: (@MainActor () -> Void)?
    var onSecondaryPress: (@MainActor () -> Void)?

    var body: some View {
        MotionTimeline(
            durationMilliseconds: 1_467,
            autoplay: autoplay,
            replayKey: replayKey
        ) { frame in
            ReferenceCanvas(backgroundColor: Color(hex: 0x1E1B1C)) {
                content(frame)
            }
        }
        .preferredColorScheme(.dark)
    }

    private func content(_ frame: MotionFrame) -> some View {
        let splashVisible = frame.milliseconds < 1_067
        let interactionsReady = frame.milliseconds >= 1_067

        return ZStack(alignment: .topLeading) {
            Color(hex: 0x1E1B1C)
            ReplicaImage(screen: "onx-hunt", name: "terrain", sizing: .fill)
            LinearGradient(
                stops: [
                    .init(color: .white.opacity(0.1), location: 0),
                    .init(color: Color(red: 76 / 255, green: 68 / 255, blue: 66 / 255).opacity(0.08), location: 0.48),
                    .init(color: Color(red: 49 / 255, green: 43 / 255, blue: 44 / 255).opacity(0.48), location: 1)
                ],
                startPoint: .top,
                endPoint: .bottom
            )

            ReplicaImage(screen: "onx-hunt", name: "brand-lockup")
                .replicaFrame(.replica(206, 385, 228, 59))

            Text("Know where you stand.")
                .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 23))
                .tracking(-0.4)
                .foregroundStyle(.white)
                .multilineTextAlignment(.center)
                .replicaFrame(.replica(150, 453, 340, 38))

            ZStack(alignment: .topLeading) {
                onxButton(
                    label: "Continue with Apple",
                    background: Color(hex: 0xFDFDFD),
                    foreground: Color(hex: 0x171717),
                    icon: AnyView(AppleIcon(color: .black, size: 29)),
                    isReady: interactionsReady,
                    action: resolveAction(
                        .onxContinueWithApple,
                        onActionPress: onActionPress,
                        fallback: onPrimaryPress
                    )
                )
                .replicaFrame(.replica(0, 0, 574, 79))

                onxButton(
                    label: "Continue with Google",
                    background: Color(hex: 0xFDFDFD),
                    foreground: Color(hex: 0x171717),
                    icon: AnyView(GoogleIcon(size: 28)),
                    isReady: interactionsReady,
                    action: resolveAction(
                        .onxContinueWithGoogle,
                        onActionPress: onActionPress,
                        fallback: onSecondaryPress
                    )
                )
                .replicaFrame(.replica(0, 105, 574, 79))

                HStack(spacing: 13) {
                    Rectangle().fill(.white.opacity(0.32)).frame(width: 255, height: 1)
                    Text("OR")
                        .font(ReplicaFont.fixed(ReplicaFont.interSemiBold, size: 17))
                        .foregroundStyle(.white)
                    Rectangle().fill(.white.opacity(0.32)).frame(width: 255, height: 1)
                }
                .replicaFrame(.replica(0, 235, 574, 28))

                onxButton(
                    label: "Sign Up with Email",
                    background: Color(hex: 0xFC2C01),
                    foreground: .white,
                    icon: nil,
                    isReady: interactionsReady,
                    action: resolveAction(
                        .onxSignUpWithEmail,
                        onActionPress: onActionPress,
                        fallback: onPrimaryPress
                    )
                )
                .replicaFrame(.replica(0, 307, 574, 79))

                onxButton(
                    label: "Log In",
                    background: Color(hex: 0x49413F),
                    foreground: .white,
                    icon: nil,
                    isReady: interactionsReady,
                    action: resolveAction(
                        .onxLogIn,
                        onActionPress: onActionPress,
                        fallback: onSecondaryPress
                    )
                )
                .replicaFrame(.replica(0, 412, 574, 79))
            }
            .replicaFrame(.replica(33, 812, 574, 520))

            if splashVisible {
                ZStack {
                    Color(hex: 0xFC2C01)
                    ReplicaImage(screen: "onx-hunt", name: "brand-lockup")
                        .frame(width: 263, height: 69)
                }
            }
        }
    }

    private func onxButton(
        label: String,
        background: Color,
        foreground: Color,
        icon: AnyView?,
        isReady: Bool,
        action: (@MainActor () -> Void)?
    ) -> some View {
        ReplicaButton(label, isReady: isReady, action: action) {
            ZStack {
                RoundedRectangle(cornerRadius: 13).fill(background)
                Text(label)
                    .font(ReplicaFont.fixed(ReplicaFont.nunitoBlack, size: 26))
                    .tracking(-0.7)
                    .foregroundStyle(foreground)
                if let icon {
                    icon
                        .frame(width: 38, height: 38)
                        .position(x: 44, y: 39.5)
                }
            }
        }
    }
}

#Preview("onX Hunt · Final") {
    OnxHuntWelcome(autoplay: false)
}
