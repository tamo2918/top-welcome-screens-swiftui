import Foundation

enum WelcomeScreenID: String, CaseIterable, Identifiable, Sendable {
    case duolingo
    case strava
    case myfitnesspal
    case perplexity
    case yazio
    case onxHunt = "onx-hunt"
    case speakLearn = "speak-learn"
    case hallow
    case scrl
    case speakLanguage = "speak-language"

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .duolingo: "Duolingo"
        case .strava: "Strava"
        case .myfitnesspal: "MyFitnessPal"
        case .perplexity: "Perplexity"
        case .yazio: "Yazio"
        case .onxHunt: "onX Hunt"
        case .speakLearn: "Speak & Learn"
        case .hallow: "Hallow"
        case .scrl: "SCRL"
        case .speakLanguage: "Speak: Language Learning"
        }
    }

    var motionDurationMilliseconds: Double? {
        switch self {
        case .duolingo: 2_667
        case .strava: 6_600
        case .myfitnesspal: 8_867
        case .perplexity: nil
        case .yazio: 1_733
        case .onxHunt: 1_467
        case .speakLearn: 4_940
        case .hallow: 4_500
        case .scrl: 1_999
        case .speakLanguage: 5_070
        }
    }
}
