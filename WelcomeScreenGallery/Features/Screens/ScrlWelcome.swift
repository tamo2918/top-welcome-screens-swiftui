import SwiftUI

struct ScrlWelcome: View {
    var autoplay = true
    var replayKey: AnyHashable = 0
    var onActionPress: WelcomeActionPressHandler?
    var onPrimaryPress: (@MainActor () -> Void)?
    var onSecondaryPress: (@MainActor () -> Void)?

    var body: some View {
        MotionTimeline(
            durationMilliseconds: 1_999,
            autoplay: autoplay,
            replayKey: replayKey
        ) { frame in
            ReferenceCanvas(backgroundColor: Color(hex: 0x0F0F0F)) {
                content(frame)
            }
        }
        .preferredColorScheme(.dark)
    }

    private func content(_ frame: MotionFrame) -> some View {
        let finalOpacity = ReplicaEasing.cubicOut(frame.segment(from: 1_300, to: 1_800))
        let skeletonOpacity = frame.milliseconds < 1_200
            ? 0
            : 1 - frame.segment(from: 1_300, to: 1_780)
        let splashVisible = frame.milliseconds < 1_200
        let interactionsReady = frame.milliseconds >= 1_800

        return ZStack(alignment: .topLeading) {
            Color(hex: 0x0F0F0F)

            finalPage(interactionsReady: interactionsReady)
                .opacity(finalOpacity)

            skeleton
                .opacity(skeletonOpacity)
                .allowsHitTesting(false)

            if splashVisible {
                ZStack {
                    Color(hex: 0x0F0F0F)
                    ScrlLogo()
                        .scaleEffect(0.86)
                }
                .allowsHitTesting(false)
            }
        }
    }

    private func finalPage(interactionsReady: Bool) -> some View {
        ZStack(alignment: .topLeading) {
            ReplicaImage(screen: "scrl", name: "mosaic", sizing: .fill)

            HStack {
                HStack(spacing: 7) {
                    AppleIcon(color: .white, size: 44)
                    Text("APP\nOF THE\nDAY")
                        .font(ReplicaFont.fixed(ReplicaFont.interBold, size: 19))
                        .tracking(-0.25)
                        .lineSpacing(1)
                        .foregroundStyle(.white)
                        .fixedSize(horizontal: true, vertical: true)
                }
                .frame(width: 164, height: 70)

                Spacer()

                HStack(spacing: 0) {
                    ScrlLaurel().fill(.white).frame(width: 36, height: 70)
                    Text("The Best Apps\nfor Creators")
                        .font(ReplicaFont.fixed(ReplicaFont.interSemiBold, size: 18))
                        .tracking(-0.55)
                        .lineSpacing(3)
                        .foregroundStyle(.white)
                        .multilineTextAlignment(.center)
                        .frame(width: 181)
                    ScrlLaurel().fill(.white).frame(width: 36, height: 70)
                        .scaleEffect(x: -1, y: 1)
                }
                .frame(width: 258, height: 70)
            }
            .replicaFrame(.replica(108, 765, 426, 80))

            Text("Welcome to SCRL")
                .font(ReplicaFont.fixed(ReplicaFont.interMedium, size: 21))
                .foregroundStyle(.white)
                .replicaFrame(.replica(28, 887, 300, 34), alignment: .leading)

            Text("Create social media posts\nthat stand out")
                .font(ReplicaFont.fixed(ReplicaFont.interBold, size: 43))
                .tracking(-1.7)
                .lineSpacing(7)
                .foregroundStyle(.white)
                .fixedSize(horizontal: true, vertical: true)
                .scaleEffect(x: 1.1, y: 1, anchor: .leading)
                .replicaFrame(.replica(27, 933, 590, 105), alignment: .leading)

            Text("SCRL is a purpose-built social media design\nplatform, used and loved by millions of creators.")
                .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 22))
                .tracking(-0.45)
                .lineSpacing(7)
                .foregroundStyle(.white)
                .scaleEffect(x: 1.14, y: 1, anchor: .leading)
                .replicaFrame(.replica(28, 1_055, 590, 78), alignment: .leading)

            ReplicaButton(
                "Get Started",
                isReady: interactionsReady,
                action: resolveAction(
                    .scrlGetStarted,
                    onActionPress: onActionPress,
                    fallback: onPrimaryPress
                )
            ) {
                ZStack {
                    Capsule().fill(Color(hex: 0xFCFCFC))
                    Text("Get Started")
                        .font(ReplicaFont.fixed(ReplicaFont.interSemiBold, size: 22))
                        .foregroundStyle(Color(hex: 0x111111))
                }
            }
            .replicaFrame(.replica(27, 1_174, 586, 77))

            ReplicaButton(
                "Sign in",
                isReady: interactionsReady,
                action: resolveAction(
                    .scrlSignIn,
                    onActionPress: onActionPress,
                    fallback: onSecondaryPress
                )
            ) {
                (Text("Already have an account? ") + Text("Sign In").underline())
                    .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 20))
                    .foregroundStyle(.white)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
            .replicaFrame(.replica(110, 1_255, 420, 70))
        }
    }

    private var skeleton: some View {
        ZStack(alignment: .topLeading) {
            Color(hex: 0x0E0E0E)

            ScrlLogo()
                .scaleEffect(0.72)
                .replicaFrame(.replica(235, 92, 170, 60))

            skeletonCard(.replica(27, 176, 586, 322))
            RoundedRectangle(cornerRadius: 18)
                .fill(Color(hex: 0x1A1A1B))
                .replicaFrame(.replica(27, 530, 421, 43))
            skeletonCard(.replica(27, 589, 282, 343))
            skeletonCard(.replica(333, 589, 280, 489))
            skeletonCard(.replica(27, 956, 282, 371))
            skeletonCard(.replica(333, 1_103, 280, 224))

            HStack(spacing: 0) {
                skeletonNavItem(icon: "⌂", label: "Home", active: true)
                skeletonNavItem(icon: "▦", label: "Templates", active: false)
                skeletonNavItem(icon: "▰", label: "Projects", active: false)
                skeletonNavItem(icon: "⚙", label: "More", active: false)
            }
            .padding(.horizontal, 8)
            .background {
                Capsule()
                    .fill(Color(hex: 0x171719))
                    .overlay { Capsule().stroke(Color(hex: 0x303034), lineWidth: 2) }
            }
            .replicaFrame(.replica(34, 1_244, 466, 108))

            ZStack {
                Capsule()
                    .fill(Color(hex: 0x171719))
                    .overlay { Capsule().stroke(Color(hex: 0x303034), lineWidth: 2) }
                Text("＋")
                    .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 55))
                    .foregroundStyle(Color(hex: 0xF2F2F2))
            }
            .replicaFrame(.replica(516, 1_244, 90, 108))
        }
    }

    private func skeletonCard(_ rect: CGRect) -> some View {
        RoundedRectangle(cornerRadius: 28)
            .fill(Color(hex: 0x1A1A1B))
            .replicaFrame(rect)
    }

    private func skeletonNavItem(icon: String, label: String, active: Bool) -> some View {
        VStack(spacing: 0) {
            Text(icon)
                .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 32))
            Text(label)
                .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 12))
        }
        .foregroundStyle(Color(hex: 0xF2F2F2))
        .frame(width: 101, height: 91)
        .background(active ? Color(hex: 0x303033) : .clear, in: Capsule())
    }
}

private struct ScrlLogo: View {
    var body: some View {
        HStack(spacing: 10) {
            ZStack(alignment: .topLeading) {
                Rectangle()
                    .stroke(.white, lineWidth: 3)
                    .frame(width: 38, height: 38)
                Rectangle()
                    .stroke(.white, lineWidth: 3)
                    .frame(width: 38, height: 38)
                    .offset(x: 8, y: 8)
            }
            .frame(width: 47, height: 47)

            Text("SCRL")
                .font(ReplicaFont.fixed(ReplicaFont.interMedium, size: 36))
                .foregroundStyle(.white)
        }
        .frame(height: 54)
    }
}

private struct ScrlLaurel: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: point(29.5, 66, in: rect))
        path.addCurve(
            to: point(13.4, 17.2, in: rect),
            control1: point(15.7, 54.4, in: rect),
            control2: point(10.7, 39.7, in: rect)
        )

        let leaves: [(Double, Double, Double, Double)] = [
            (7, 51, 12, 7), (3, 38, 11, 7), (7, 25, 10, 7), (12, 12, 9, 7),
            (20, 49, 12, 7), (18, 36, 11, 7), (17, 23, 10, 7), (18, 10, 9, 7)
        ]
        for leaf in leaves {
            path.addEllipse(in: CGRect(
                x: rect.minX + CGFloat(leaf.0 / 36) * rect.width,
                y: rect.minY + CGFloat(leaf.1 / 70) * rect.height,
                width: CGFloat(leaf.2 / 36) * rect.width,
                height: CGFloat(leaf.3 / 70) * rect.height
            ))
        }
        return path
    }

    private func point(_ x: Double, _ y: Double, in rect: CGRect) -> CGPoint {
        CGPoint(
            x: rect.minX + CGFloat(x / 36) * rect.width,
            y: rect.minY + CGFloat(y / 70) * rect.height
        )
    }
}

#Preview("SCRL · Final") {
    ScrlWelcome(autoplay: false)
}
