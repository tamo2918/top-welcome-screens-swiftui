import SwiftUI

struct SelectiveRoundedRectangle: Shape {
    var topLeading: CGFloat = 0
    var topTrailing: CGFloat = 0
    var bottomTrailing: CGFloat = 0
    var bottomLeading: CGFloat = 0

    func path(in rect: CGRect) -> Path {
        let tl = min(topLeading, min(rect.width, rect.height) / 2)
        let tr = min(topTrailing, min(rect.width, rect.height) / 2)
        let br = min(bottomTrailing, min(rect.width, rect.height) / 2)
        let bl = min(bottomLeading, min(rect.width, rect.height) / 2)

        var path = Path()
        path.move(to: CGPoint(x: rect.minX + tl, y: rect.minY))
        path.addLine(to: CGPoint(x: rect.maxX - tr, y: rect.minY))
        path.addQuadCurve(
            to: CGPoint(x: rect.maxX, y: rect.minY + tr),
            control: CGPoint(x: rect.maxX, y: rect.minY)
        )
        path.addLine(to: CGPoint(x: rect.maxX, y: rect.maxY - br))
        path.addQuadCurve(
            to: CGPoint(x: rect.maxX - br, y: rect.maxY),
            control: CGPoint(x: rect.maxX, y: rect.maxY)
        )
        path.addLine(to: CGPoint(x: rect.minX + bl, y: rect.maxY))
        path.addQuadCurve(
            to: CGPoint(x: rect.minX, y: rect.maxY - bl),
            control: CGPoint(x: rect.minX, y: rect.maxY)
        )
        path.addLine(to: CGPoint(x: rect.minX, y: rect.minY + tl))
        path.addQuadCurve(
            to: CGPoint(x: rect.minX + tl, y: rect.minY),
            control: CGPoint(x: rect.minX, y: rect.minY)
        )
        path.closeSubpath()
        return path
    }
}

struct ReplicaButton<Label: View>: View {
    let accessibilityLabel: String
    let isReady: Bool
    let action: (@MainActor () -> Void)?
    @ViewBuilder let label: () -> Label

    init(
        _ accessibilityLabel: String,
        isReady: Bool = true,
        action: (@MainActor () -> Void)?,
        @ViewBuilder label: @escaping () -> Label
    ) {
        self.accessibilityLabel = accessibilityLabel
        self.isReady = isReady
        self.action = action
        self.label = label
    }

    private var canInteract: Bool { isReady && action != nil }

    var body: some View {
        Button {
            action?()
        } label: {
            label()
                .contentShape(Rectangle())
        }
        .buttonStyle(ReplicaButtonStyle())
        .disabled(!canInteract)
        .accessibilityLabel(accessibilityLabel)
        .accessibilityHidden(!canInteract)
    }
}

private struct ReplicaButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .opacity(configuration.isPressed ? 0.78 : 1)
    }
}

struct ReplicaSpinner: View {
    let color: Color
    let diameter: CGFloat
    let strokeWidth: CGFloat
    let rotationDegrees: Double

    var body: some View {
        ZStack {
            ForEach(0..<12, id: \.self) { index in
                Capsule()
                    .fill(color.opacity(Double(index + 1) / 12))
                    .frame(width: strokeWidth, height: diameter * 0.27)
                    .offset(y: -diameter * 0.27)
                    .rotationEffect(.degrees(Double(index) * 30))
            }
        }
        .frame(width: diameter, height: diameter)
        .rotationEffect(.degrees(rotationDegrees))
    }
}

struct AppleIcon: View {
    let color: Color
    let size: CGFloat

    var body: some View {
        Image(systemName: "apple.logo")
            .font(.system(size: size, weight: .medium))
            .foregroundStyle(color)
    }
}

struct CloseIcon: View {
    let color: Color
    let size: CGFloat

    var body: some View {
        Image(systemName: "xmark")
            .font(.system(size: size, weight: .regular))
            .foregroundStyle(color)
    }
}

struct EnvelopeIcon: View {
    let color: Color
    let size: CGFloat

    var body: some View {
        Image(systemName: "envelope")
            .font(.system(size: size, weight: .regular))
            .foregroundStyle(color)
    }
}

struct GoogleIcon: View {
    let size: CGFloat

    var body: some View {
        Canvas { context, canvasSize in
            let lineWidth = canvasSize.width * 0.14
            let rect = CGRect(
                x: lineWidth / 2,
                y: lineWidth / 2,
                width: canvasSize.width - lineWidth,
                height: canvasSize.height - lineWidth
            )

            drawArc(context: &context, rect: rect, from: -42, to: 43, color: Color(red: 0.26, green: 0.52, blue: 0.96), lineWidth: lineWidth)
            drawArc(context: &context, rect: rect, from: 43, to: 134, color: Color(red: 0.20, green: 0.66, blue: 0.33), lineWidth: lineWidth)
            drawArc(context: &context, rect: rect, from: 134, to: 216, color: Color(red: 0.98, green: 0.74, blue: 0.02), lineWidth: lineWidth)
            drawArc(context: &context, rect: rect, from: 216, to: 318, color: Color(red: 0.92, green: 0.26, blue: 0.21), lineWidth: lineWidth)

            var bar = Path()
            bar.move(to: CGPoint(x: canvasSize.width * 0.52, y: canvasSize.height * 0.50))
            bar.addLine(to: CGPoint(x: canvasSize.width * 0.91, y: canvasSize.height * 0.50))
            context.stroke(bar, with: .color(Color(red: 0.26, green: 0.52, blue: 0.96)), style: StrokeStyle(lineWidth: lineWidth, lineCap: .round))
        }
        .frame(width: size, height: size)
    }

    private func drawArc(
        context: inout GraphicsContext,
        rect: CGRect,
        from start: Double,
        to end: Double,
        color: Color,
        lineWidth: CGFloat
    ) {
        var path = Path()
        path.addArc(
            center: CGPoint(x: rect.midX, y: rect.midY),
            radius: rect.width / 2,
            startAngle: .degrees(start),
            endAngle: .degrees(end),
            clockwise: false
        )
        context.stroke(path, with: .color(color), style: StrokeStyle(lineWidth: lineWidth, lineCap: .round))
    }
}

extension Color {
    init(hex: UInt32, alpha: Double = 1) {
        self.init(
            .sRGB,
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255,
            opacity: alpha
        )
    }

    static func interpolated(from: UInt32, to: UInt32, progress: Double) -> Color {
        let progress = min(1, max(0, progress))
        func component(_ color: UInt32, shift: UInt32) -> Double {
            Double((color >> shift) & 0xFF) / 255
        }
        return Color(
            .sRGB,
            red: component(from, shift: 16) + (component(to, shift: 16) - component(from, shift: 16)) * progress,
            green: component(from, shift: 8) + (component(to, shift: 8) - component(from, shift: 8)) * progress,
            blue: component(from, shift: 0) + (component(to, shift: 0) - component(from, shift: 0)) * progress,
            opacity: 1
        )
    }
}
