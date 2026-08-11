import SwiftUI

struct MyFitnessPalWelcome: View {
    var autoplay = true
    var replayKey: AnyHashable = 0
    var onActionPress: WelcomeActionPressHandler?
    var onPrimaryPress: (@MainActor () -> Void)?
    var onSecondaryPress: (@MainActor () -> Void)?

    var body: some View {
        MotionTimeline(
            durationMilliseconds: 8_867,
            autoplay: autoplay,
            replayKey: replayKey
        ) { frame in
            ReferenceCanvas(backgroundColor: Color(hex: 0xFDFDFD)) {
                content(frame)
            }
            .preferredColorScheme(frame.milliseconds >= 7_333 ? .light : .dark)
        }
    }

    private func content(_ frame: MotionFrame) -> some View {
        let splashVisible = frame.milliseconds < 7_333
        let interactionsReady = frame.milliseconds >= 7_333
        let spinnerRotation = frame.milliseconds / 920 * 360

        return ZStack(alignment: .topLeading) {
            Color(hex: 0xFDFDFD)

            Text("Welcome to")
                .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 19))
                .foregroundStyle(Color(hex: 0x6C6C6C))
                .multilineTextAlignment(.center)
                .replicaFrame(.replica(200, 136, 240, 31))

            ReplicaImage(screen: "myfitnesspal", name: "wordmark")
                .replicaFrame(.replica(174, 176, 293, 44))

            ZStack(alignment: .topLeading) {
                ReplicaImage(
                    screen: "myfitnesspal",
                    name: "card",
                    sizing: .fill,
                    alignment: .bottom
                )
                .clipShape(RoundedRectangle(cornerRadius: 28))
                .replicaFrame(.replica(70, 13, 500, 610))

                ReplicaImage(
                    screen: "myfitnesspal",
                    name: "next-card",
                    sizing: .fill
                )
                .clipShape(RoundedRectangle(cornerRadius: 28))
                .opacity(0.82)
                .replicaFrame(.replica(608, 13, 500, 610))
            }
            .clipped()
            .replicaFrame(.replica(0, 280, 640, 636))

            Text("Ready for some wins? Start\ntracking, it's easy!")
                .font(ReplicaFont.fixed(ReplicaFont.interBold, size: 30))
                .tracking(-1.1)
                .lineSpacing(8)
                .foregroundStyle(Color(hex: 0x111111))
                .multilineTextAlignment(.center)
                .replicaFrame(.replica(111, 928, 419, 84))

            HStack(spacing: 21) {
                ForEach(0..<3, id: \.self) { index in
                    Circle()
                        .fill(index == 0 ? Color(hex: 0x005AEB) : Color(hex: 0xB3B3B5))
                        .frame(width: 12, height: 12)
                }
            }
            .replicaFrame(.replica(278, 1_047, 82, 16))

            ReplicaButton(
                "Sign up for free",
                isReady: interactionsReady,
                action: resolveAction(
                    .myFitnessPalSignUpForFree,
                    onActionPress: onActionPress,
                    fallback: onPrimaryPress
                )
            ) {
                ZStack {
                    Capsule().fill(Color(hex: 0x005AEB))
                    Text("Sign Up For Free")
                        .font(ReplicaFont.fixed(ReplicaFont.interSemiBold, size: 23))
                        .foregroundStyle(.white)
                }
            }
            .replicaFrame(.replica(56, 1_121, 527, 81))

            ReplicaButton(
                "Log in",
                isReady: interactionsReady,
                action: resolveAction(
                    .myFitnessPalLogIn,
                    onActionPress: onActionPress,
                    fallback: onSecondaryPress
                )
            ) {
                Text("Log In")
                    .font(ReplicaFont.fixed(ReplicaFont.interSemiBold, size: 22))
                    .foregroundStyle(Color(hex: 0x005AEB))
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
            .replicaFrame(.replica(250, 1_228, 140, 64))

            Text("Version 26.22.0.74659")
                .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 17))
                .foregroundStyle(Color(hex: 0x696969))
                .multilineTextAlignment(.center)
                .replicaFrame(.replica(160, 1_301, 320, 32))

            if splashVisible {
                ZStack(alignment: .topLeading) {
                    Color(hex: 0x005AEE)

                    ReplicaImage(
                        screen: "myfitnesspal",
                        name: "wordmark",
                        tint: .white
                    )
                    .replicaFrame(.replica(129, 582, 382, 58))

                    ReplicaSpinner(
                        color: .white,
                        diameter: 38,
                        strokeWidth: 4,
                        rotationDegrees: spinnerRotation
                    )
                    .replicaFrame(.replica(291, 1_180, 58, 58))

                    Text(frame.milliseconds < 2_900 ? "Updating..." : "Loading...")
                        .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 21))
                        .foregroundStyle(.white)
                        .multilineTextAlignment(.center)
                        .replicaFrame(.replica(200, 1_245, 240, 40))
                }
            }
        }
    }
}

#Preview("MyFitnessPal · Final") {
    MyFitnessPalWelcome(autoplay: false)
}
