import SwiftUI

struct StravaWelcome: View {
    var autoplay = true
    var replayKey: AnyHashable = 0
    var onActionPress: WelcomeActionPressHandler?
    var onPrimaryPress: (@MainActor () -> Void)?
    var onSecondaryPress: (@MainActor () -> Void)?

    var body: some View {
        MotionTimeline(
            durationMilliseconds: 6_600,
            autoplay: autoplay,
            replayKey: replayKey
        ) { frame in
            ReferenceCanvas(backgroundColor: Color(hex: 0xFDFDFD)) {
                content(frame)
            }
        }
        .preferredColorScheme(.dark)
    }

    private func content(_ frame: MotionFrame) -> some View {
        let splashVisible = frame.milliseconds < 5_133
        let spinnerVisible = frame.milliseconds >= 867 && frame.milliseconds < 5_133
        let interactionsReady = frame.milliseconds >= 5_133
        let spinnerRotation = frame.milliseconds / 920 * 360

        return ZStack(alignment: .topLeading) {
            Color(hex: 0xFDFDFD)

            ReplicaImage(screen: "strava", name: "hero", sizing: .stretch)
                .replicaFrame(.replica(0, 0, 640, 943))
                .zIndex(1)

            ZStack(alignment: .topLeading) {
                Color(hex: 0xFDFDFD)

                Text("Track your active life in one place.")
                    .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 29))
                    .tracking(-1.05)
                    .foregroundStyle(Color(hex: 0x171717))
                    .multilineTextAlignment(.center)
                    .replicaFrame(.replica(45, 132, 550, 48))

                HStack(spacing: 15) {
                    ForEach(0..<4, id: \.self) { index in
                        Circle()
                            .fill(index == 0 ? Color(hex: 0xED4400) : Color(hex: 0x424242))
                            .frame(width: 8, height: 8)
                    }
                }
                .replicaFrame(.replica(282, 218, 76, 12))

                ReplicaButton(
                    "Join for free",
                    isReady: interactionsReady,
                    action: resolveAction(
                        .stravaJoinForFree,
                        onActionPress: onActionPress,
                        fallback: onPrimaryPress
                    )
                ) {
                    ZStack {
                        Capsule().fill(Color(hex: 0xFB4600))
                        Text("Join for free")
                            .font(ReplicaFont.fixed(ReplicaFont.interSemiBold, size: 23))
                            .tracking(-0.35)
                            .foregroundStyle(.white)
                    }
                }
                .replicaFrame(.replica(38, 264, 567, 81))

                ReplicaButton(
                    "Log in",
                    isReady: interactionsReady,
                    action: resolveAction(
                        .stravaLogIn,
                        onActionPress: onActionPress,
                        fallback: onSecondaryPress
                    )
                ) {
                    Text("Log in")
                        .font(ReplicaFont.fixed(ReplicaFont.interSemiBold, size: 22))
                        .foregroundStyle(Color(hex: 0xFB4600))
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                }
                .replicaFrame(.replica(245, 367, 150, 60))
            }
            .replicaFrame(.replica(0, 866, 640, 519))

            if splashVisible {
                ZStack(alignment: .topLeading) {
                    Color(hex: 0xFC4700)
                    ReplicaImage(
                        screen: "strava",
                        name: "wordmark",
                        tint: .white
                    )
                    .replicaFrame(.replica(173, 516, 294, 54))

                    if spinnerVisible {
                        ReplicaSpinner(
                            color: .white,
                            diameter: 26,
                            strokeWidth: 3,
                            rotationDegrees: spinnerRotation
                        )
                        .replicaFrame(.replica(307, 1_102, 26, 26))
                    }
                }
                .transition(.identity)
                .zIndex(2)
            }
        }
    }
}

#Preview("Strava · Final") {
    StravaWelcome(autoplay: false)
}
