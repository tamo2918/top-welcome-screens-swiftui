import SwiftUI

struct YazioWelcome: View {
    var autoplay = true
    var replayKey: AnyHashable = 0
    var onActionPress: WelcomeActionPressHandler?
    var onPrimaryPress: (@MainActor () -> Void)?
    var onSecondaryPress: (@MainActor () -> Void)?

    var body: some View {
        MotionTimeline(
            durationMilliseconds: 1_733,
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
        let shellVisible = frame.milliseconds >= 700
        let splashOpacity = 1 - ReplicaEasing.quadOut(frame.segment(from: 567, to: 800))
        let interactionsReady = frame.milliseconds >= 1_733

        return ZStack(alignment: .topLeading) {
            Color(hex: 0xFDFDFD)

            if shellVisible {
                ZStack(alignment: .topLeading) {
                    ReplicaImage(screen: "yazio", name: "wordmark")
                        .replicaFrame(.replica(230, 102, 180, 50))

                    Text("Hit your goal weight\nin a few taps a day")
                        .font(ReplicaFont.fixed(ReplicaFont.nunitoBlack, size: 44))
                        .tracking(-1.9)
                        .lineSpacing(12)
                        .foregroundStyle(Color(hex: 0x0C0F0D))
                        .multilineTextAlignment(.center)
                        .fixedSize(horizontal: true, vertical: true)
                        .scaleEffect(x: 1.26, y: 1)
                        .replicaFrame(.replica(55, 212, 530, 120))

                    if frame.milliseconds < 1_733 {
                        ZStack(alignment: .topLeading) {
                            springAsset(
                                frame: frame,
                                name: "carrot",
                                rect: .replica(240, 178, 225, 116),
                                enter: 1_167...1_410,
                                fromX: 40,
                                fromY: -29,
                                toY: 50,
                                fromRotation: 20
                            )
                            springAsset(
                                frame: frame,
                                name: "apples",
                                rect: .replica(0, 10, 270, 270),
                                enter: 1_233...1_490,
                                fromX: -25,
                                fromY: -30,
                                toX: 12,
                                toY: 20,
                                fromRotation: -13
                            )
                            springAsset(
                                frame: frame,
                                name: "clock",
                                rect: .replica(375, 105, 90, 90),
                                enter: 1_300...1_540,
                                fromX: 35,
                                fromY: -25,
                                toY: 15,
                                fromRotation: 18
                            )
                            springAsset(
                                frame: frame,
                                name: "calendar",
                                rect: .replica(360, -15, 100, 100),
                                enter: 1_367...1_620,
                                fromX: 25,
                                fromY: -40,
                                toY: 10,
                                fromRotation: 24
                            )
                            springAsset(
                                frame: frame,
                                name: "chef-hat",
                                rect: .replica(190, -25, 150, 130),
                                enter: 1_467...1_733,
                                fromX: -25,
                                fromY: -45,
                                toY: 10,
                                fromRotation: -18
                            )
                        }
                        .replicaFrame(.replica(69, 600, 463, 320))
                    } else {
                        ZStack(alignment: .topLeading) {
                            ReplicaImage(screen: "yazio", name: "apples")
                                .replicaFrame(.replica(0, 10, 270, 270))
                            ReplicaImage(screen: "yazio", name: "carrot")
                                .replicaFrame(.replica(240, 178, 225, 116))
                            ReplicaImage(screen: "yazio", name: "clock")
                                .replicaFrame(.replica(375, 105, 90, 90))
                        }
                        .replicaFrame(.replica(69, 600, 463, 320))
                    }

                    HStack(spacing: 8) {
                        ForEach(0..<4, id: \.self) { index in
                            Circle()
                                .fill(index == 0 ? Color(hex: 0x00AD91) : Color(hex: 0xD3D3D3))
                                .frame(width: 14, height: 14)
                        }
                    }
                    .replicaFrame(.replica(284, 1_034, 72, 15))

                    ReplicaButton(
                        "Get started",
                        isReady: interactionsReady,
                        action: resolveAction(
                            .yazioGetStarted,
                            onActionPress: onActionPress,
                            fallback: onPrimaryPress
                        )
                    ) {
                        ZStack {
                            RoundedRectangle(cornerRadius: 24)
                                .fill(Color(hex: 0x212322))
                            Text("Get Started")
                                .font(ReplicaFont.fixed(ReplicaFont.nunitoExtraBold, size: 27))
                                .foregroundStyle(.white)
                        }
                    }
                    .replicaFrame(.replica(27, 1_090, 587, 90))

                    ReplicaButton(
                        "I already have an account",
                        isReady: interactionsReady,
                        action: resolveAction(
                            .yazioLogIn,
                            onActionPress: onActionPress,
                            fallback: onSecondaryPress
                        )
                    ) {
                        ZStack {
                            RoundedRectangle(cornerRadius: 24)
                                .fill(.white)
                                .overlay {
                                    RoundedRectangle(cornerRadius: 24)
                                        .stroke(Color(hex: 0xE7E7E7), lineWidth: 2)
                                }
                            Text("I already have an account")
                                .font(ReplicaFont.fixed(ReplicaFont.nunitoExtraBold, size: 26))
                                .foregroundStyle(Color(hex: 0x111111))
                        }
                    }
                    .replicaFrame(.replica(27, 1_209, 587, 95))
                }
            }

            ZStack(alignment: .topLeading) {
                Color.white
                ReplicaImage(screen: "yazio", name: "intro-mascot")
                    .replicaFrame(.replica(194, 519, 252, 252))
                ReplicaImage(screen: "yazio", name: "wordmark")
                    .replicaFrame(.replica(131, 721, 378, 101))
            }
            .opacity(splashOpacity)
            .allowsHitTesting(false)
        }
    }

    private func springAsset(
        frame: MotionFrame,
        name: String,
        rect: CGRect,
        enter: ClosedRange<Double>,
        fromX: Double,
        fromY: Double,
        toX: Double = 0,
        toY: Double = 0,
        fromRotation: Double
    ) -> some View {
        let progress = ReplicaEasing.backOut(
            frame.segment(from: enter.lowerBound, to: enter.upperBound),
            overshoot: 1.5
        )
        let x = fromX + (toX - fromX) * progress
        let y = fromY + (toY - fromY) * progress
        let rotation = fromRotation * (1 - progress)
        let scale = 0.94 + 0.06 * progress

        return ReplicaImage(screen: "yazio", name: name)
            .opacity(frame.milliseconds >= enter.lowerBound ? 1 : 0)
            .scaleEffect(scale)
            .rotationEffect(.degrees(rotation))
            .offset(x: x, y: y)
            .replicaFrame(rect)
    }
}

#Preview("Yazio · Final") {
    YazioWelcome(autoplay: false)
}
