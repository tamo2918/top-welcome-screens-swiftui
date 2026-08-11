import SwiftUI

struct SpeakLanguageWelcome: View {
    private let blue = Color(hex: 0x173FFE)

    var autoplay = true
    var replayKey: AnyHashable = 0
    var onActionPress: WelcomeActionPressHandler?
    var onPrimaryPress: (@MainActor () -> Void)?
    var onSecondaryPress: (@MainActor () -> Void)?

    var body: some View {
        MotionTimeline(
            durationMilliseconds: 5_070,
            autoplay: autoplay,
            replayKey: replayKey
        ) { frame in
            ReferenceCanvas(backgroundColor: Color(hex: 0xFDFDFD)) {
                content(frame)
            }
        }
        .preferredColorScheme(.light)
    }

    private func content(_ frame: MotionFrame) -> some View {
        let contentOpacity = frame.segment(from: 300, to: 333)
        let splashOpacity = 1 - ReplicaEasing.cubicOut(frame.segment(from: 33, to: 200))
        let loaderOpacity = min(
            frame.segment(from: 80, to: 180),
            1 - frame.segment(from: 290, to: 333)
        )
        let tapOpacity = 1 - frame.segment(from: 3_200, to: 3_400)
        let buttonOpacity = ReplicaEasing.quadInOut(frame.segment(from: 3_800, to: 4_400))
        let contentReady = frame.milliseconds >= 333
        let tapExpired = frame.milliseconds >= 3_400
        let ctaReady = frame.milliseconds >= 4_400
        let spinnerRotation = frame.milliseconds / 920 * 360

        return ZStack(alignment: .topLeading) {
            Color(hex: 0xFDFDFD)

            ReplicaImage(screen: "speak-language", name: "lower-blur", sizing: .fill)
                .opacity(0.85)
                .replicaFrame(.replica(0, 120, 640, 1_385))

            ZStack(alignment: .topLeading) {
                ReplicaButton(
                    "Sign in",
                    isReady: contentReady,
                    action: resolveAction(
                        .speakLanguageSignIn,
                        onActionPress: onActionPress,
                        fallback: onSecondaryPress
                    )
                ) {
                    Text("Sign in")
                        .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 27))
                        .tracking(-0.5)
                        .foregroundStyle(blue)
                        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .trailing)
                }
                .replicaFrame(.replica(471, 88, 115, 68))

                onboardingPage(
                    copy: "Adults can become fluent — even faster than kids.",
                    index: 0,
                    frame: frame
                )
                onboardingPage(
                    copy: "The secret? Speaking early and often, not memorizing flashcards.",
                    index: 1,
                    frame: frame
                )
                onboardingPage(
                    copy: "Speak turns science into real speaking practice from Day 1.",
                    index: 2,
                    frame: frame
                )

                ReplicaButton(
                    "Tap to continue",
                    isReady: contentReady && !tapExpired,
                    action: resolveAction(
                        .speakLanguageTapToContinue,
                        onActionPress: onActionPress
                    )
                ) {
                    Text("Tap to continue")
                        .font(ReplicaFont.fixed(ReplicaFont.interRegular, size: 20))
                        .foregroundStyle(Color(hex: 0x777777))
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                }
                .opacity(tapOpacity)
                .replicaFrame(.replica(0, 1_242, 640, 42))

                ReplicaButton(
                    "Start speaking today",
                    isReady: ctaReady,
                    action: resolveAction(
                        .speakLanguageStartSpeakingToday,
                        onActionPress: onActionPress,
                        fallback: onPrimaryPress
                    )
                ) {
                    ZStack {
                        RoundedRectangle(cornerRadius: 27).fill(blue)
                        Text("Start speaking today")
                            .font(ReplicaFont.fixed(ReplicaFont.interSemiBold, size: 27))
                            .tracking(-0.5)
                            .foregroundStyle(.white)
                    }
                }
                .opacity(buttonOpacity)
                .replicaFrame(.replica(27, 1_136, 587, 88))
            }
            .opacity(contentOpacity)

            ReplicaSpinner(
                color: Color(hex: 0x777777),
                diameter: 24,
                strokeWidth: 3,
                rotationDegrees: spinnerRotation
            )
            .opacity(loaderOpacity)
            .replicaFrame(.replica(299, 682, 42, 42))
            .allowsHitTesting(false)

            ZStack(alignment: .topLeading) {
                Color(hex: 0x0745FE)
                Text("Speak")
                    .font(ReplicaFont.fixed(ReplicaFont.interSemiBold, size: 42))
                    .tracking(-2.1)
                    .foregroundStyle(.white)
                    .multilineTextAlignment(.center)
                    .replicaFrame(.replica(230, 663, 180, 58))

                ReplicaSpinner(
                    color: .white,
                    diameter: 18,
                    strokeWidth: 2,
                    rotationDegrees: spinnerRotation
                )
                .replicaFrame(.replica(306, 740, 28, 28))
            }
            .opacity(splashOpacity)
            .allowsHitTesting(false)
        }
    }

    private func onboardingPage(
        copy: String,
        index: Int,
        frame: MotionFrame
    ) -> some View {
        let x: Double
        let opacity: Double

        switch index {
        case 0:
            let exit = ReplicaEasing.cubicInOut(frame.segment(from: 2_833, to: 3_100))
            x = -640 * exit
            opacity = 1 - frame.segment(from: 3_030, to: 3_100)
        case 1:
            let enter = ReplicaEasing.cubicInOut(frame.segment(from: 2_833, to: 3_100))
            let exit = ReplicaEasing.cubicInOut(frame.segment(from: 3_267, to: 3_533))
            x = 640 * (1 - enter) - 640 * exit
            opacity = min(enter, 1 - frame.segment(from: 3_460, to: 3_533))
        default:
            let enter = ReplicaEasing.cubicInOut(frame.segment(from: 3_267, to: 3_533))
            x = 640 * (1 - enter)
            opacity = enter
        }

        return ZStack(alignment: .topLeading) {
            speakLockup
                .replicaFrame(.replica(53, 374, 205, 56), alignment: .leading)

            HStack(spacing: 15) {
                ForEach(0..<3, id: \.self) { barIndex in
                    Capsule()
                        .fill(barIndex <= index ? blue : Color(hex: 0xD8DCE6))
                        .frame(width: 44, height: 6)
                }
            }
            .replicaFrame(.replica(54, 504, 162, 8))

            Text(copy)
                .font(ReplicaFont.fixed(ReplicaFont.interBold, size: 46))
                .tracking(-2.1)
                .lineSpacing(10)
                .foregroundStyle(Color(hex: 0x171717))
                .scaleEffect(x: 1.1, y: 1, anchor: .leading)
                .replicaFrame(.replica(48, 590, 500, 210), alignment: .leading)
        }
        .frame(width: 640, height: 920)
        .opacity(opacity)
        .offset(x: x)
    }

    private var speakLockup: some View {
        HStack(spacing: 5) {
            HStack(alignment: .center, spacing: 4) {
                ForEach(Array([20.0, 34.0, 44.0, 32.0, 20.0].enumerated()), id: \.offset) { _, height in
                    Capsule()
                        .fill(blue)
                        .frame(width: 9, height: height)
                }
            }
            .frame(width: 65, height: 44)

            Text("Speak")
                .font(ReplicaFont.fixed(ReplicaFont.interExtraBold, size: 40))
                .tracking(-2.7)
                .foregroundStyle(Color(hex: 0x171717))
        }
        .frame(height: 56)
    }
}

#Preview("Speak Language · Final") {
    SpeakLanguageWelcome(autoplay: false)
}
