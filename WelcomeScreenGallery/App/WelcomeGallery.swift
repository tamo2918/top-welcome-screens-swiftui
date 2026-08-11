import SwiftUI

struct WelcomeGallery: View {
    @State private var selectedScreen: WelcomeScreenID
    @State private var autoplay: Bool
    @State private var replayKey: Int

    init() {
        let launch = GalleryLaunchConfiguration.current
        _selectedScreen = State(initialValue: launch.screen)
        _autoplay = State(initialValue: launch.autoplay)
        _replayKey = State(initialValue: launch.replayKey)
    }

    var body: some View {
        WelcomeScreen(
            name: selectedScreen,
            autoplay: autoplay,
            replayKey: replayKey,
            onActionPress: { action in
                #if DEBUG
                print("Welcome action: \(action.rawValue)")
                #endif
            }
        )
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .onOpenURL(perform: open)
    }

    private func open(_ url: URL) {
        guard url.scheme == "welcome-showcase" else { return }
        let candidate = url.host ?? url.pathComponents.dropFirst().first
        if let candidate, let screen = WelcomeScreenID(rawValue: candidate) {
            selectedScreen = screen
        }

        let components = URLComponents(url: url, resolvingAgainstBaseURL: false)
        if let motion = components?.queryItems?.first(where: { $0.name == "motion" })?.value {
            autoplay = motion != "0"
        }
        if components?.queryItems?.contains(where: { $0.name == "replay" }) == true {
            replayKey += 1
        }
    }
}

private struct GalleryLaunchConfiguration {
    let screen: WelcomeScreenID
    let autoplay: Bool
    let replayKey: Int

    static var current: GalleryLaunchConfiguration {
        let arguments = ProcessInfo.processInfo.arguments
        let screen = argument(named: "-welcome-screen", in: arguments)
            .flatMap(WelcomeScreenID.init(rawValue:)) ?? .duolingo
        let autoplay = argument(named: "-welcome-motion", in: arguments) != "0"
        let replay = Int(argument(named: "-welcome-replay", in: arguments) ?? "0") ?? 0
        return GalleryLaunchConfiguration(screen: screen, autoplay: autoplay, replayKey: replay)
    }

    private static func argument(named name: String, in arguments: [String]) -> String? {
        guard let index = arguments.firstIndex(of: name), arguments.indices.contains(index + 1) else {
            return nil
        }
        return arguments[index + 1]
    }
}
