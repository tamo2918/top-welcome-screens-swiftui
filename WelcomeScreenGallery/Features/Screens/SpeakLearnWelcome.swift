import SwiftUI

struct SpeakLearnWelcome: View {
    var autoplay = true
    var replayKey: AnyHashable = 0
    var onActionPress: WelcomeActionPressHandler?
    var onPrimaryPress: (@MainActor () -> Void)?
    var onSecondaryPress: (@MainActor () -> Void)?

    var body: some View {
        MotionTimeline(
            durationMilliseconds: 4_940,
            autoplay: autoplay,
            replayKey: replayKey
        ) { frame in
            ReferenceCanvas(backgroundColor: Color(hex: 0x3895FF)) {
                content(frame)
            }
            .preferredColorScheme(frame.milliseconds >= 3_800 ? .light : .dark)
        }
    }

    private func content(_ frame: MotionFrame) -> some View {
        let stem = ReplicaEasing.cubicOut(frame.segment(from: 100, to: 967))
        let echoOne = ReplicaEasing.cubicOut(frame.segment(from: 180, to: 980))
        let echoTwo = ReplicaEasing.cubicOut(frame.segment(from: 260, to: 1_030))
        let bubbleEnter = ReplicaEasing.backOut(
            frame.segment(from: 1_133, to: 1_567),
            overshoot: 1.35
        )
        let bubbleExit = 1 - frame.segment(from: 3_267, to: 3_533)
        let generatedLogo = frame.segment(from: 1_533, to: 1_600)
        let pageProgress = ReplicaEasing.exponentialOut(frame.segment(from: 3_567, to: 3_800))
        let pageX = 640 * (1 - pageProgress)
        let interactionsReady = frame.milliseconds >= 3_800

        return ZStack(alignment: .topLeading) {
            Color(hex: 0x3895FF)

            logoBuild(
                stem: stem,
                echoOne: echoOne,
                echoTwo: echoTwo,
                bubbleEnter: bubbleEnter,
                bubbleOpacity: min(bubbleEnter, bubbleExit),
                generatedLogo: generatedLogo
            )
            .replicaFrame(.replica(162, 545.5, 294, 294))

            finalPage(interactionsReady: interactionsReady)
                .offset(x: pageX)
        }
    }

    private func logoBuild(
        stem: Double,
        echoOne: Double,
        echoTwo: Double,
        bubbleEnter: Double,
        bubbleOpacity: Double,
        generatedLogo: Double
    ) -> some View {
        ZStack(alignment: .topLeading) {
            ZStack(alignment: .topLeading) {
                RoundedRectangle(cornerRadius: 26)
                    .fill(Color(hex: 0x1375DC))
                    .frame(width: 52, height: 148)
                    .offset(x: 86 + 64 * (1 - echoTwo), y: 71)
                    .opacity(echoTwo * 0.32)

                RoundedRectangle(cornerRadius: 26)
                    .fill(Color(hex: 0xA7D2FE))
                    .frame(width: 52, height: 148)
                    .offset(x: 97 + 42 * (1 - echoOne), y: 71)
                    .opacity(echoOne * 0.58)

                SelectiveRoundedRectangle(
                    topLeading: 26,
                    topTrailing: 26,
                    bottomTrailing: 0,
                    bottomLeading: 26
                )
                .fill(.white)
                .frame(width: 52, height: 148)
                .scaleEffect(x: 1, y: 0.15 + 0.85 * stem, anchor: .bottom)
                .rotationEffect(.degrees(-48 * (1 - stem)), anchor: .bottom)
                .offset(x: 109, y: 71)
                .opacity(stem)
            }
            .opacity(1 - generatedLogo)

            ReplicaImage(
                screen: "speak-learn",
                name: "logo-mark",
                sizing: .stretch
            )
            .frame(width: 299, height: 289)
            .offset(x: 0, y: 6)
            .frame(width: 170, height: 294, alignment: .topLeading)
            .clipped()
            .opacity(generatedLogo)

            SpeakBubbleShape()
                .fill(.white)
                .frame(width: 63, height: 53)
                .scaleEffect(0.1 + 0.9 * bubbleEnter)
                .offset(x: 164 - 38 * (1 - bubbleEnter), y: 169)
                .opacity(bubbleOpacity)
        }
    }

    private func finalPage(interactionsReady: Bool) -> some View {
        ZStack(alignment: .topLeading) {
            LinearGradient(
                stops: [
                    .init(color: Color(hex: 0xA5CFFE), location: 0),
                    .init(color: Color(hex: 0x8FC1F4), location: 0.48),
                    .init(color: Color(hex: 0x60A0E4), location: 1)
                ],
                startPoint: .top,
                endPoint: .bottom
            )

            ReplicaImage(
                screen: "speak-learn",
                name: "hero",
                sizing: .fill,
                alignment: .trailing
            )
            .replicaFrame(.replica(0, -13, 640, 1_469))

            HStack(spacing: 12) {
                Capsule().fill(.white).frame(width: 30, height: 11)
                Capsule().fill(.white.opacity(0.45)).frame(width: 18, height: 11)
            }
            .replicaFrame(.replica(292, 98, 60, 11))

            HStack(spacing: 20) {
                ReplicaImage(screen: "speak-learn", name: "avatar", sizing: .fill)
                    .frame(width: 94, height: 94)
                    .clipShape(Circle())

                VStack(alignment: .leading, spacing: 4) {
                    Text("Jessie Malmon, 24 🇧🇬")
                        .font(ReplicaFont.fixed(ReplicaFont.nunitoExtraBold, size: 20))
                        .foregroundStyle(Color(hex: 0x073F79))
                    Text("I feel more confident speaking,\nthanks to Learna. Highly recommend!")
                        .font(ReplicaFont.fixed(ReplicaFont.nunitoSemiBold, size: 17))
                        .lineSpacing(6)
                        .foregroundStyle(.white)
                }
                Spacer(minLength: 0)
            }
            .padding(.leading, 23)
            .background {
                Capsule()
                    .fill(Color(red: 88 / 255, green: 166 / 255, blue: 238 / 255).opacity(0.12))
                    .overlay { Capsule().stroke(.white.opacity(0.92), lineWidth: 2) }
            }
            .replicaFrame(.replica(35, 208, 571, 127))

            ratingCard
                .replicaFrame(.replica(35, 383, 310, 130))

            VStack(spacing: 0) {
                Text("50M+")
                    .font(ReplicaFont.fixed(ReplicaFont.nunitoBlack, size: 40))
                    .foregroundStyle(Color(hex: 0x073F79))
                Text("Downloads on App Store")
                    .font(ReplicaFont.fixed(ReplicaFont.nunitoBold, size: 18))
                    .foregroundStyle(Color(hex: 0x073F79))
            }
            .padding(.top, 13)
            .frame(width: 330, height: 115, alignment: .top)
            .background {
                Capsule()
                    .fill(Color(red: 88 / 255, green: 166 / 255, blue: 238 / 255).opacity(0.12))
                    .overlay { Capsule().stroke(.white.opacity(0.92), lineWidth: 2) }
            }
            .replicaFrame(.replica(35, 557, 330, 115))

            Text("Welcome to Learna!")
                .font(ReplicaFont.fixed(ReplicaFont.nunitoBlack, size: 43))
                .tracking(-1.4)
                .foregroundStyle(.white)
                .replicaFrame(.replica(35, 891, 540, 62), alignment: .leading)

            Text("Boost your language skills with Learna\neffortlessly anytime, anywhere.")
                .font(ReplicaFont.fixed(ReplicaFont.nunitoSemiBold, size: 27))
                .tracking(-0.55)
                .lineSpacing(6)
                .foregroundStyle(.white)
                .fixedSize(horizontal: true, vertical: true)
                .replicaFrame(.replica(35, 969, 570, 74), alignment: .leading)

            bottomSheet(interactionsReady: interactionsReady)
                .replicaFrame(.replica(0, 1_083, 640, 302))
        }
        .frame(width: 640, height: 1_385)
        .background(Color(hex: 0x60A0E4))
    }

    private var ratingCard: some View {
        ZStack(alignment: .topLeading) {
            SpeakLearnLaurel()
                .fill(Color(hex: 0x188DE6))
                .frame(width: 60, height: 110)
                .offset(x: 0, y: 4)
            SpeakLearnLaurel()
                .fill(Color(hex: 0x188DE6))
                .frame(width: 60, height: 110)
                .scaleEffect(x: -1, y: 1)
                .offset(x: 250, y: 4)

            Text("4.6")
                .font(ReplicaFont.fixed(ReplicaFont.nunitoBlack, size: 42))
                .foregroundStyle(Color(hex: 0x073F79))
                .multilineTextAlignment(.center)
                .replicaFrame(.replica(103, 0, 104, 55))

            Text("App Store Rating")
                .font(ReplicaFont.fixed(ReplicaFont.nunitoBold, size: 20))
                .foregroundStyle(Color(hex: 0x073F79))
                .multilineTextAlignment(.center)
                .replicaFrame(.replica(52, 48, 206, 31))

            HStack(spacing: 4) {
                ForEach(0..<5, id: \.self) { _ in
                    Text("★")
                        .font(.system(size: 28))
                        .foregroundStyle(Color(hex: 0xFF9B22))
                }
            }
            .replicaFrame(.replica(62, 79, 186, 33))
        }
    }

    private func bottomSheet(interactionsReady: Bool) -> some View {
        ZStack(alignment: .topLeading) {
            SelectiveRoundedRectangle(topLeading: 42, topTrailing: 42)
                .fill(.white)

            ReplicaButton(
                "Log in",
                isReady: interactionsReady,
                action: resolveAction(
                    .speakLearnLogIn,
                    onActionPress: onActionPress,
                    fallback: onSecondaryPress
                )
            ) {
                (Text("Already have an account? ")
                    .foregroundColor(Color(hex: 0x888888))
                + Text("Log in")
                    .foregroundColor(Color(hex: 0x3193FB)))
                    .font(ReplicaFont.fixed(ReplicaFont.nunitoSemiBold, size: 24))
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
            .replicaFrame(.replica(90, 28, 460, 56))

            RoundedRectangle(cornerRadius: 18)
                .fill(Color(hex: 0x1775C5))
                .replicaFrame(.replica(34, 109, 572, 99))

            ReplicaButton(
                "Let's Go",
                isReady: interactionsReady,
                action: resolveAction(
                    .speakLearnLetsGo,
                    onActionPress: onActionPress,
                    fallback: onPrimaryPress
                )
            ) {
                ZStack {
                    RoundedRectangle(cornerRadius: 18)
                        .fill(Color(hex: 0x3193FB))
                    Text("Let's Go")
                        .font(ReplicaFont.fixed(ReplicaFont.nunitoBold, size: 27))
                        .foregroundStyle(.white)
                }
            }
            .replicaFrame(.replica(34, 101, 572, 94))

            HStack(spacing: 3) {
                Text("By continuing, you agree to our")
                ReplicaButton(
                    "Privacy Policy",
                    isReady: interactionsReady,
                    action: resolveAction(
                        .speakLearnPrivacyPolicy,
                        onActionPress: onActionPress
                    )
                ) {
                    Text("Privacy Policy").underline()
                }
                Text("and")
                ReplicaButton(
                    "Terms of Service",
                    isReady: interactionsReady,
                    action: resolveAction(
                        .speakLearnTermsOfService,
                        onActionPress: onActionPress
                    )
                ) {
                    Text("Terms of Service").underline()
                }
            }
            .font(ReplicaFont.fixed(ReplicaFont.nunitoRegular, size: 14))
            .foregroundStyle(Color(hex: 0x8A8A8A))
            .replicaFrame(.replica(45, 226, 550, 48))
        }
    }
}

private struct SpeakBubbleShape: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.minX, y: rect.maxY))
        path.addLine(to: CGPoint(x: rect.minX, y: rect.minY + rect.height * 18 / 51))
        path.addCurve(
            to: CGPoint(x: rect.minX + rect.width * 21 / 59, y: rect.minY),
            control1: CGPoint(x: rect.minX, y: rect.minY + rect.height * 7 / 51),
            control2: CGPoint(x: rect.minX + rect.width * 8 / 59, y: rect.minY)
        )
        path.addLine(to: CGPoint(x: rect.minX + rect.width * 31 / 59, y: rect.minY))
        path.addCurve(
            to: CGPoint(x: rect.maxX, y: rect.minY + rect.height * 24 / 51),
            control1: CGPoint(x: rect.minX + rect.width * 47 / 59, y: rect.minY),
            control2: CGPoint(x: rect.maxX, y: rect.minY + rect.height * 9 / 51)
        )
        path.addCurve(
            to: CGPoint(x: rect.minX + rect.width * 31 / 59, y: rect.minY + rect.height * 50 / 51),
            control1: CGPoint(x: rect.maxX, y: rect.minY + rect.height * 40 / 51),
            control2: CGPoint(x: rect.minX + rect.width * 46 / 59, y: rect.minY + rect.height * 50 / 51)
        )
        path.addCurve(
            to: CGPoint(x: rect.minX, y: rect.maxY),
            control1: CGPoint(x: rect.minX + rect.width * 20 / 59, y: rect.minY + rect.height * 50 / 51),
            control2: CGPoint(x: rect.minX + rect.width * 13 / 59, y: rect.minY + rect.height * 44 / 51)
        )
        path.closeSubpath()
        return path
    }
}

private struct SpeakLearnLaurel: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: point(50, 105, in: rect))
        path.addCurve(
            to: point(14, 7, in: rect),
            control1: point(37, 83, in: rect),
            control2: point(24, 55, in: rect)
        )
        for leaf in leaves {
            path.addEllipse(in: CGRect(
                x: rect.minX + CGFloat(leaf.x - 4) / 60 * rect.width,
                y: rect.minY + CGFloat(leaf.y - 9) / 110 * rect.height,
                width: 8 / 60 * rect.width,
                height: 18 / 110 * rect.height
            ))
        }
        return path
    }

    private let leaves: [(x: Double, y: Double)] = [
        (43, 90), (50, 82), (34, 71), (42, 64), (26, 51),
        (34, 45), (19, 31), (26, 26), (14, 13)
    ]

    private func point(_ x: Double, _ y: Double, in rect: CGRect) -> CGPoint {
        CGPoint(
            x: rect.minX + CGFloat(x / 60) * rect.width,
            y: rect.minY + CGFloat(y / 110) * rect.height
        )
    }
}

#Preview("Speak & Learn · Final") {
    SpeakLearnWelcome(autoplay: false)
}
