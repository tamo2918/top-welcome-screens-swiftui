import SwiftUI

struct WelcomeScreen: View {
    let name: WelcomeScreenID
    var autoplay = true
    var replayKey: AnyHashable = 0
    var onActionPress: WelcomeActionPressHandler?
    var onClosePress: (@MainActor () -> Void)?
    var onPrimaryPress: (@MainActor () -> Void)?
    var onSecondaryPress: (@MainActor () -> Void)?

    @ViewBuilder
    var body: some View {
        switch name {
        case .duolingo:
            DuolingoWelcome(
                autoplay: autoplay,
                replayKey: replayKey,
                onActionPress: onActionPress,
                onPrimaryPress: onPrimaryPress,
                onSecondaryPress: onSecondaryPress
            )
        case .strava:
            StravaWelcome(
                autoplay: autoplay,
                replayKey: replayKey,
                onActionPress: onActionPress,
                onPrimaryPress: onPrimaryPress,
                onSecondaryPress: onSecondaryPress
            )
        case .myfitnesspal:
            MyFitnessPalWelcome(
                autoplay: autoplay,
                replayKey: replayKey,
                onActionPress: onActionPress,
                onPrimaryPress: onPrimaryPress,
                onSecondaryPress: onSecondaryPress
            )
        case .perplexity:
            PerplexityWelcome(
                onActionPress: onActionPress,
                onClosePress: onClosePress,
                onPrimaryPress: onPrimaryPress,
                onSecondaryPress: onSecondaryPress
            )
        case .yazio:
            YazioWelcome(
                autoplay: autoplay,
                replayKey: replayKey,
                onActionPress: onActionPress,
                onPrimaryPress: onPrimaryPress,
                onSecondaryPress: onSecondaryPress
            )
        case .onxHunt:
            OnxHuntWelcome(
                autoplay: autoplay,
                replayKey: replayKey,
                onActionPress: onActionPress,
                onPrimaryPress: onPrimaryPress,
                onSecondaryPress: onSecondaryPress
            )
        case .speakLearn:
            SpeakLearnWelcome(
                autoplay: autoplay,
                replayKey: replayKey,
                onActionPress: onActionPress,
                onPrimaryPress: onPrimaryPress,
                onSecondaryPress: onSecondaryPress
            )
        case .hallow:
            HallowWelcome(
                autoplay: autoplay,
                replayKey: replayKey,
                onActionPress: onActionPress,
                onClosePress: onClosePress,
                onPrimaryPress: onPrimaryPress,
                onSecondaryPress: onSecondaryPress
            )
        case .scrl:
            ScrlWelcome(
                autoplay: autoplay,
                replayKey: replayKey,
                onActionPress: onActionPress,
                onPrimaryPress: onPrimaryPress,
                onSecondaryPress: onSecondaryPress
            )
        case .speakLanguage:
            SpeakLanguageWelcome(
                autoplay: autoplay,
                replayKey: replayKey,
                onActionPress: onActionPress,
                onPrimaryPress: onPrimaryPress,
                onSecondaryPress: onSecondaryPress
            )
        }
    }
}
