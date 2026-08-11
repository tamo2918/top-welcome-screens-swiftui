import Foundation

enum WelcomeAction: String, CaseIterable, Sendable {
    case duolingoGetStarted = "duolingo.get-started"
    case duolingoLogIn = "duolingo.log-in"
    case stravaJoinForFree = "strava.join-for-free"
    case stravaLogIn = "strava.log-in"
    case myFitnessPalSignUpForFree = "myfitnesspal.sign-up-for-free"
    case myFitnessPalLogIn = "myfitnesspal.log-in"
    case perplexityClose = "perplexity.close"
    case perplexityContinueWithApple = "perplexity.continue-with-apple"
    case perplexityContinueWithGoogle = "perplexity.continue-with-google"
    case perplexitySignInWithEmail = "perplexity.sign-in-with-email"
    case perplexitySingleSignOn = "perplexity.single-sign-on"
    case perplexityPrivacyPolicy = "perplexity.privacy-policy"
    case perplexityTermsOfService = "perplexity.terms-of-service"
    case yazioGetStarted = "yazio.get-started"
    case yazioLogIn = "yazio.log-in"
    case onxContinueWithApple = "onx-hunt.continue-with-apple"
    case onxContinueWithGoogle = "onx-hunt.continue-with-google"
    case onxSignUpWithEmail = "onx-hunt.sign-up-with-email"
    case onxLogIn = "onx-hunt.log-in"
    case speakLearnLogIn = "speak-learn.log-in"
    case speakLearnLetsGo = "speak-learn.lets-go"
    case speakLearnPrivacyPolicy = "speak-learn.privacy-policy"
    case speakLearnTermsOfService = "speak-learn.terms-of-service"
    case hallowClose = "hallow.close"
    case hallowContinueWithEmail = "hallow.continue-with-email"
    case hallowContinueWithApple = "hallow.continue-with-apple"
    case hallowContinueWithGoogle = "hallow.continue-with-google"
    case hallowTerms = "hallow.terms"
    case scrlGetStarted = "scrl.get-started"
    case scrlSignIn = "scrl.sign-in"
    case speakLanguageSignIn = "speak-language.sign-in"
    case speakLanguageTapToContinue = "speak-language.tap-to-continue"
    case speakLanguageStartSpeakingToday = "speak-language.start-speaking-today"
}

typealias WelcomeActionPressHandler = @MainActor (WelcomeAction) -> Void

@MainActor
func resolveAction(
    _ action: WelcomeAction,
    onActionPress: WelcomeActionPressHandler?,
    fallback: (@MainActor () -> Void)? = nil
) -> (@MainActor () -> Void)? {
    if let onActionPress {
        return { onActionPress(action) }
    }
    return fallback
}
