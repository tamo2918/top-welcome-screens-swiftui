import CoreGraphics
import SwiftUI

enum ReferenceGeometry {
    static let width: CGFloat = 640
    static let height: CGFloat = 1_385
    static let size = CGSize(width: width, height: height)
}

extension CGRect {
    static func replica(_ x: CGFloat, _ y: CGFloat, _ width: CGFloat, _ height: CGFloat) -> CGRect {
        CGRect(x: x, y: y, width: width, height: height)
    }
}

extension View {
    func replicaFrame(_ rect: CGRect, alignment: Alignment = .center) -> some View {
        frame(width: rect.width, height: rect.height, alignment: alignment)
            .position(x: rect.midX, y: rect.midY)
    }
}
