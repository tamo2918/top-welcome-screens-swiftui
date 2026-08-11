import SwiftUI

struct HallowWelcome: View {
    var autoplay = true
    var replayKey: AnyHashable = 0
    var onActionPress: WelcomeActionPressHandler?
    var onClosePress: (@MainActor () -> Void)?
    var onPrimaryPress: (@MainActor () -> Void)?
    var onSecondaryPress: (@MainActor () -> Void)?

    var body: some View {
        MotionTimeline(
            durationMilliseconds: 4_500,
            autoplay: autoplay,
            replayKey: replayKey
        ) { frame in
            ReferenceCanvas(backgroundColor: Color(hex: 0x31015B)) {
                content(frame)
            }
        }
        .preferredColorScheme(.dark)
    }

    private func content(_ frame: MotionFrame) -> some View {
        let loaderColorProgress = frame.segment(from: 233, to: 467)
        let loaderOpacity = 1 - ReplicaEasing.cubicInOut(frame.segment(from: 2_767, to: 3_033))
        let dotsOpacity = frame.milliseconds >= 1_233 ? 1.0 : 0
        let versionOpacity = frame.segment(from: 1_400, to: 1_467)
        let leftPulse = sin(frame.segment(from: 1_633, to: 2_100) * .pi)
        let middlePulse = sin(frame.segment(from: 1_800, to: 2_267) * .pi)
        let rightPulse = sin(frame.segment(from: 1_933, to: 2_400) * .pi)
        let interactionsReady = frame.milliseconds >= 3_033

        return ZStack(alignment: .topLeading) {
            Color(hex: 0x31015B)

            ReplicaImage(screen: "hallow", name: "scene", sizing: .stretch)
                .replicaFrame(.replica(38, 130, 564, 1_110))

            LinearGradient(
                stops: [
                    .init(color: Color(hex: 0x31015B).opacity(0), location: 0),
                    .init(color: Color(hex: 0x362B43).opacity(0.76), location: 0.5),
                    .init(color: Color(hex: 0x160F1D), location: 1)
                ],
                startPoint: .top,
                endPoint: .bottom
            )
            .replicaFrame(.replica(0, 870, 640, 515))

            ReplicaButton(
                "Close",
                isReady: interactionsReady,
                action: resolveAction(
                    .hallowClose,
                    onActionPress: onActionPress,
                    fallback: onClosePress
                )
            ) {
                CloseIcon(color: .white, size: 25)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
            .replicaFrame(.replica(558, 84, 60, 60))

            Text("Hallow")
                .font(ReplicaFont.fixed(ReplicaFont.nunitoBlack, size: 50))
                .tracking(-2.1)
                .foregroundStyle(.white)
                .multilineTextAlignment(.center)
                .scaleEffect(x: 1.14, y: 1)
                .replicaFrame(.replica(195, 171, 250, 65))

            Capsule()
                .stroke(Color(hex: 0xC9A4EA), lineWidth: 1.5)
                .rotationEffect(.degrees(-3))
                .replicaFrame(.replica(337, 184, 23, 7))

            Text("Hope Praylist")
                .font(ReplicaFont.fixed(ReplicaFont.interSemiBold, size: 23))
                .foregroundStyle(.white)
                .shadow(color: Color(hex: 0x190030).opacity(0.68), radius: 2, y: 1)
                .multilineTextAlignment(.center)
                .replicaFrame(.replica(190, 254, 260, 40))

            actionButton(
                label: "Continue with Email",
                background: Color(red: 181 / 255, green: 160 / 255, blue: 201 / 255).opacity(0.28),
                foreground: .white,
                icon: nil,
                isReady: interactionsReady,
                action: resolveAction(
                    .hallowContinueWithEmail,
                    onActionPress: onActionPress,
                    fallback: onPrimaryPress
                )
            )
            .replicaFrame(.replica(34, 980, 572, 98))

            actionButton(
                label: "Continue with Apple",
                background: Color(hex: 0xFDFDFD),
                foreground: .black,
                icon: AnyView(AppleIcon(color: .black, size: 29)),
                isReady: interactionsReady,
                action: resolveAction(
                    .hallowContinueWithApple,
                    onActionPress: onActionPress,
                    fallback: onPrimaryPress
                )
            )
            .replicaFrame(.replica(34, 1_092, 572, 98))

            ReplicaButton(
                "Continue with Google",
                isReady: interactionsReady,
                action: resolveAction(
                    .hallowContinueWithGoogle,
                    onActionPress: onActionPress,
                    fallback: onSecondaryPress
                )
            ) {
                Text("Continue with Google")
                    .font(ReplicaFont.fixed(ReplicaFont.interBold, size: 24))
                    .foregroundStyle(.white)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
            .replicaFrame(.replica(140, 1_209, 360, 65))

            HStack(spacing: 4) {
                Text("By using Hallow you agree to our")
                ReplicaButton(
                    "Terms",
                    isReady: interactionsReady,
                    action: resolveAction(.hallowTerms, onActionPress: onActionPress)
                ) {
                    Text("Terms.").underline()
                }
            }
            .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 16))
            .foregroundStyle(.white.opacity(0.78))
            .replicaFrame(.replica(80, 1_296, 480, 45))

            ZStack(alignment: .topLeading) {
                Color.interpolated(
                    from: 0x9F3BE9,
                    to: 0x9240E0,
                    progress: loaderColorProgress
                )

                hallowGlyph
                    .replicaFrame(.replica(271, 596, 98, 128))

                HStack(spacing: 14) {
                    Circle().fill(.white).frame(width: 10, height: 10)
                        .scaleEffect(1 + leftPulse * 0.5)
                    Circle().fill(.white).frame(width: 10, height: 10)
                        .scaleEffect(1 + middlePulse * 0.5)
                    Circle().fill(.white).frame(width: 10, height: 10)
                        .scaleEffect(1 + rightPulse * 0.5)
                }
                .opacity(dotsOpacity)
                .replicaFrame(.replica(289, 753, 62, 14))

                Text("v13.3.0 (10009)")
                    .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 17))
                    .foregroundStyle(.white.opacity(0.74))
                    .multilineTextAlignment(.center)
                    .opacity(versionOpacity)
                    .replicaFrame(.replica(190, 1_293, 260, 32))
            }
            .opacity(loaderOpacity)
            .allowsHitTesting(false)
        }
    }

    private var hallowGlyph: some View {
        ZStack(alignment: .topLeading) {
            Capsule()
                .fill(Color(hex: 0x430D5B).opacity(0.36))
                .frame(width: 76, height: 17)
                .offset(x: 11, y: 107)
            Ellipse()
                .fill(.white)
                .frame(width: 98, height: 98)
                .offset(y: 25)
            Ellipse()
                .stroke(Color(hex: 0xD8B9F3), lineWidth: 3)
                .frame(width: 79, height: 14)
                .rotationEffect(.degrees(-7))
                .offset(x: 10)
        }
    }

    private func actionButton(
        label: String,
        background: Color,
        foreground: Color,
        icon: AnyView?,
        isReady: Bool,
        action: (@MainActor () -> Void)?
    ) -> some View {
        ReplicaButton(label, isReady: isReady, action: action) {
            ZStack {
                Capsule().fill(background)
                Text(label)
                    .font(ReplicaFont.fixed(ReplicaFont.interBold, size: 24))
                    .tracking(-0.4)
                    .foregroundStyle(foreground)
                if let icon {
                    icon
                        .frame(width: 38, height: 38)
                        .position(x: 127, y: 49)
                }
            }
        }
    }
}

#Preview("Hallow · Final") {
    HallowWelcome(autoplay: false)
}
