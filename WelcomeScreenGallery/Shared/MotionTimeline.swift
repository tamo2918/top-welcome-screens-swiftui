import Foundation
import SwiftUI

struct MotionFrame: Equatable, Sendable {
    let milliseconds: Double
    let durationMilliseconds: Double

    func segment(from start: Double, to end: Double) -> Double {
        guard end > start else { return milliseconds >= end ? 1 : 0 }
        return min(1, max(0, (milliseconds - start) / (end - start)))
    }

    func isWithin(_ range: Range<Double>) -> Bool {
        range.contains(milliseconds)
    }
}

struct MotionTimeline<Content: View>: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var startDate = Date()

    let durationMilliseconds: Double
    let autoplay: Bool
    let replayKey: AnyHashable
    @ViewBuilder let content: (MotionFrame) -> Content

    var body: some View {
        let shouldAnimate = autoplay && !reduceMotion

        TimelineView(.animation(minimumInterval: 1 / 60, paused: !shouldAnimate)) { context in
            let elapsed = context.date.timeIntervalSince(startDate) * 1_000
            let milliseconds = shouldAnimate
                ? min(durationMilliseconds, max(0, elapsed))
                : durationMilliseconds
            content(MotionFrame(
                milliseconds: milliseconds,
                durationMilliseconds: durationMilliseconds
            ))
        }
        .onChange(of: replayKey) { _ in
            startDate = Date()
        }
        .onChange(of: autoplay) { _ in
            startDate = Date()
        }
        .onChange(of: reduceMotion) { _ in
            startDate = Date()
        }
    }
}

enum ReplicaEasing {
    static func quadInOut(_ value: Double) -> Double {
        let value = clamp(value)
        return value < 0.5
            ? 2 * value * value
            : 1 - pow(-2 * value + 2, 2) / 2
    }

    static func quadOut(_ value: Double) -> Double {
        let value = clamp(value)
        return 1 - (1 - value) * (1 - value)
    }

    static func cubicIn(_ value: Double) -> Double {
        pow(clamp(value), 3)
    }

    static func cubicOut(_ value: Double) -> Double {
        1 - pow(1 - clamp(value), 3)
    }

    static func cubicInOut(_ value: Double) -> Double {
        let value = clamp(value)
        return value < 0.5
            ? 4 * value * value * value
            : 1 - pow(-2 * value + 2, 3) / 2
    }

    static func exponentialOut(_ value: Double) -> Double {
        let value = clamp(value)
        return value == 1 ? 1 : 1 - pow(2, -10 * value)
    }

    static func backOut(_ value: Double, overshoot: Double = 1.5) -> Double {
        let shifted = clamp(value) - 1
        return 1 + (overshoot + 1) * pow(shifted, 3) + overshoot * pow(shifted, 2)
    }

    static func interpolate(
        _ value: Double,
        input: [Double],
        output: [Double]
    ) -> Double {
        precondition(input.count == output.count && input.count >= 2)
        let value = min(input.last ?? value, max(input.first ?? value, value))

        for index in 0..<(input.count - 1) where value <= input[index + 1] {
            let progress = (value - input[index]) / (input[index + 1] - input[index])
            return output[index] + progress * (output[index + 1] - output[index])
        }
        return output.last ?? value
    }

    private static func clamp(_ value: Double) -> Double {
        min(1, max(0, value))
    }
}
