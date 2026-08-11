import SwiftUI

struct ReferenceCanvas<Content: View>: View {
    let backgroundColor: Color
    @ViewBuilder let content: () -> Content

    var body: some View {
        GeometryReader { proxy in
            let widthScale = proxy.size.width / ReferenceGeometry.width
            let heightScale = proxy.size.height / ReferenceGeometry.height
            let minimumScale = min(widthScale, heightScale)
            let scaleDelta = abs(widthScale - heightScale) / max(minimumScale, 0.000_1)
            let scale = scaleDelta <= 0.02
                ? max(widthScale, heightScale)
                : minimumScale
            let canvasWidth = ReferenceGeometry.width * scale
            let canvasHeight = ReferenceGeometry.height * scale

            backgroundColor
                .frame(width: proxy.size.width, height: proxy.size.height)
                .overlay(alignment: .topLeading) {
                content()
                    .frame(width: ReferenceGeometry.width, height: ReferenceGeometry.height)
                    .scaleEffect(scale, anchor: .topLeading)
                    .offset(
                        x: (proxy.size.width - canvasWidth) / 2,
                        y: (proxy.size.height - canvasHeight) / 2
                    )
                }
            .clipped()
        }
        .ignoresSafeArea()
    }
}
