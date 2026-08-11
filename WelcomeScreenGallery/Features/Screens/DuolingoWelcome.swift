import SwiftUI

struct DuolingoWelcome: View {
    var autoplay = true
    var replayKey: AnyHashable = 0
    var onActionPress: WelcomeActionPressHandler?
    var onPrimaryPress: (@MainActor () -> Void)?
    var onSecondaryPress: (@MainActor () -> Void)?

    var body: some View {
        MotionTimeline(
            durationMilliseconds: 2_667,
            autoplay: autoplay,
            replayKey: replayKey
        ) { frame in
            ReferenceCanvas(backgroundColor: Color(hex: 0x6DC000)) {
                content(frame)
            }
        }
        .preferredColorScheme(.light)
    }

    private func content(_ frame: MotionFrame) -> some View {
        let shrink = ReplicaEasing.cubicIn(frame.segment(from: 900, to: 1_033))
        let splashScale = 1 + (0.36 - 1) * shrink
        let splashOpacity = 1 - frame.segment(from: 1_133, to: 1_233)
        let splashClose = frame.segment(from: 400, to: 417)
        let splashOpen = 1 - frame.segment(from: 500, to: 567)
        let splashShrinkClose = frame.segment(from: 900, to: 1_000)
        let splashLidOpacity = max(min(splashClose, splashOpen), splashShrinkClose)
        let reveal = frame.segment(from: 1_133, to: 1_233)
        let revealScale = ReplicaEasing.interpolate(
            reveal,
            input: [0, 0.34, 0.67, 1],
            output: [0, 2.6, 7.5, 10]
        )
        let finalClose = frame.segment(from: 2_467, to: 2_500)
        let finalOpen = 1 - frame.segment(from: 2_533, to: 2_600)
        let finalLidOpacity = min(finalClose, finalOpen)
        let interactionsReady = frame.milliseconds >= 1_233

        return ZStack(alignment: .topLeading) {
            Color(hex: 0x6DC000)

            ZStack(alignment: .topLeading) {
                ZStack {
                    ReplicaImage(screen: "duolingo", name: "splash-face")
                    ReplicaImage(screen: "duolingo", name: "splash-face-closed")
                        .opacity(splashLidOpacity)
                }
                .scaleEffect(splashScale)
                .opacity(splashOpacity)
                .replicaFrame(.replica(157, 561, 326, 218))

                ReplicaImage(
                    screen: "duolingo",
                    name: "wordmark",
                    tint: .white
                )
                .replicaFrame(.replica(178, 1_161, 284, 67))
            }

            finalScreen(
                lidOpacity: finalLidOpacity,
                interactionsReady: interactionsReady
            )
            .mask {
                Circle()
                    .frame(
                        width: 160 * revealScale,
                        height: 160 * revealScale
                    )
                    .position(x: 320, y: 694)
            }
        }
    }

    private func finalScreen(
        lidOpacity: Double,
        interactionsReady: Bool
    ) -> some View {
        ZStack(alignment: .topLeading) {
            Color(hex: 0xFDFDFD)

            ZStack {
                ReplicaImage(screen: "duolingo", name: "mascot")
                ReplicaImage(screen: "duolingo", name: "mascot-closed")
                    .opacity(lidOpacity)
            }
            .replicaFrame(.replica(208, 365, 216, 209))

            ReplicaImage(screen: "duolingo", name: "wordmark")
                .replicaFrame(.replica(171, 615, 298, 76))

            Text("Learn for free. Forever.")
                .font(ReplicaFont.fixed(ReplicaFont.nunitoRegular, size: 23))
                .tracking(-0.5)
                .foregroundStyle(Color(hex: 0x707070))
                .multilineTextAlignment(.center)
                .replicaFrame(.replica(150, 714, 340, 46))

            RoundedRectangle(cornerRadius: 19)
                .fill(Color(hex: 0x538F23))
                .replicaFrame(.replica(24, 1_122, 591, 82))

            ReplicaButton(
                "Get started",
                isReady: interactionsReady,
                action: resolveAction(
                    .duolingoGetStarted,
                    onActionPress: onActionPress,
                    fallback: onPrimaryPress
                )
            ) {
                ZStack {
                    RoundedRectangle(cornerRadius: 19)
                        .fill(Color(hex: 0x4BC401))
                    Text("GET STARTED")
                        .font(ReplicaFont.fixed(ReplicaFont.nunitoBlack, size: 21))
                        .tracking(0.5)
                        .foregroundStyle(.white)
                }
            }
            .replicaFrame(.replica(24, 1_116, 591, 79))

            RoundedRectangle(cornerRadius: 19)
                .fill(Color(hex: 0xD8D8D8))
                .replicaFrame(.replica(24, 1_229, 591, 78))

            ReplicaButton(
                "I already have an account",
                isReady: interactionsReady,
                action: resolveAction(
                    .duolingoLogIn,
                    onActionPress: onActionPress,
                    fallback: onSecondaryPress
                )
            ) {
                ZStack {
                    RoundedRectangle(cornerRadius: 19)
                        .fill(.white)
                        .overlay {
                            RoundedRectangle(cornerRadius: 19)
                                .stroke(Color(hex: 0xE3E3E3), lineWidth: 2)
                        }
                    Text("I ALREADY HAVE AN ACCOUNT")
                        .font(ReplicaFont.fixed(ReplicaFont.nunitoBlack, size: 20))
                        .tracking(0.2)
                        .foregroundStyle(Color(hex: 0x4BC401))
                }
            }
            .replicaFrame(.replica(24, 1_223, 591, 79))
        }
        .frame(width: 640, height: 1_385)
    }
}

#Preview("Duolingo · Final") {
    DuolingoWelcome(autoplay: false)
}
