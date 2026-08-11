import SwiftUI
import UIKit

enum ReplicaFont {
    static let interRegular = "Inter-Regular"
    static let interMedium = "Inter-Medium"
    static let interSemiBold = "Inter-SemiBold"
    static let interBold = "Inter-Bold"
    static let interExtraBold = "Inter-ExtraBold"
    static let nunitoRegular = "Nunito-Regular"
    static let nunitoSemiBold = "Nunito-SemiBold"
    static let nunitoBold = "Nunito-Bold"
    static let nunitoExtraBold = "Nunito-ExtraBold"
    static let nunitoBlack = "Nunito-Black"

    static func fixed(_ name: String, size: CGFloat) -> Font {
        .custom(name, fixedSize: size)
    }
}

struct ReplicaImage: View {
    enum Sizing {
        case fill
        case fit
        case stretch
    }

    let screen: String
    let name: String
    var sizing: Sizing = .fit
    var alignment: Alignment = .center
    var tint: Color?

    private var image: Image {
        let path = "welcome/\(screen)/\(name)"
        if let uiImage = UIImage(named: path) {
            return Image(uiImage: uiImage)
        }
        if let url = Bundle.main.url(
            forResource: name,
            withExtension: "png",
            subdirectory: "welcome/\(screen)"
        ), let uiImage = UIImage(contentsOfFile: url.path) {
            return Image(uiImage: uiImage)
        }
        assertionFailure("Missing replica image: \(path).png")
        return Image(systemName: "photo")
    }

    @ViewBuilder
    var body: some View {
        switch sizing {
        case .fill:
            styledImage
                .scaledToFill()
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: alignment)
                .clipped()
        case .fit:
            styledImage.scaledToFit()
        case .stretch:
            styledImage
        }
    }

    private var styledImage: some View {
        image
            .resizable()
            .renderingMode(tint == nil ? .original : .template)
            .foregroundStyle(tint ?? .primary)
    }
}
