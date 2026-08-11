import Testing
@testable import WelcomeScreenGallery

@Suite("Motion timeline")
struct MotionTimelineTests {
    @Test func segmentClampsBelowAndAboveRange() {
        #expect(MotionFrame(milliseconds: 10, durationMilliseconds: 100).segment(from: 20, to: 80) == 0)
        #expect(MotionFrame(milliseconds: 90, durationMilliseconds: 100).segment(from: 20, to: 80) == 1)
    }

    @Test func segmentInterpolatesLinearly() {
        let value = MotionFrame(milliseconds: 50, durationMilliseconds: 100).segment(from: 20, to: 80)
        #expect(abs(value - 0.5) < 0.000_001)
    }

    @Test func easingEndpointsAreStable() {
        #expect(ReplicaEasing.cubicIn(0) == 0)
        #expect(ReplicaEasing.cubicIn(1) == 1)
        #expect(ReplicaEasing.cubicOut(0) == 0)
        #expect(ReplicaEasing.cubicOut(1) == 1)
        #expect(ReplicaEasing.quadInOut(0) == 0)
        #expect(ReplicaEasing.quadInOut(1) == 1)
    }

    @Test func piecewiseInterpolationMatchesDuolingoRevealKeyframes() {
        let value = ReplicaEasing.interpolate(
            0.67,
            input: [0, 0.34, 0.67, 1],
            output: [0, 2.6, 7.5, 10]
        )
        #expect(abs(value - 7.5) < 0.000_001)
    }
}
