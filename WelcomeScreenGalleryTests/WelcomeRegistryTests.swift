import Testing
@testable import WelcomeScreenGallery

@Suite("Welcome registry")
struct WelcomeRegistryTests {
    @Test func allTenScreensAreRegistered() {
        #expect(WelcomeScreenID.allCases.count == 10)
        #expect(Set(WelcomeScreenID.allCases.map(\.rawValue)).count == 10)
    }

    @Test func perplexityIsTheOnlyStillOnlyStudy() {
        let stillOnly = WelcomeScreenID.allCases.filter {
            $0.motionDurationMilliseconds == nil
        }
        #expect(stillOnly == [.perplexity])
    }

    @Test func semanticActionsStayUnique() {
        #expect(WelcomeAction.allCases.count == 33)
        #expect(Set(WelcomeAction.allCases.map(\.rawValue)).count == 33)
    }
}
