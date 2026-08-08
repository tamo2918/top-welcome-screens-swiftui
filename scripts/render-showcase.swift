#!/usr/bin/env swift

import AppKit
import Foundation

private struct PhonePlacement {
  let centerX: CGFloat
  let rotation: CGFloat
}

private struct Panel {
  let captures: [String]
  let output: String
}

private let canvasWidth = 1536
private let canvasHeight = 1024
private let sourceWidth = 1206
private let sourceHeight = 2622
private let screenWidth: CGFloat = 276
private let screenHeight = screenWidth * CGFloat(sourceHeight) / CGFloat(sourceWidth)
private let bezel: CGFloat = 6
private let phoneWidth = screenWidth + (bezel * 2)
private let phoneHeight = screenHeight + (bezel * 2)

private let placements = [
  PhonePlacement(centerX: 165, rotation: -1.5),
  PhonePlacement(centerX: 466.5, rotation: -0.6),
  PhonePlacement(centerX: 768, rotation: 0),
  PhonePlacement(centerX: 1069.5, rotation: 0.6),
  PhonePlacement(centerX: 1371, rotation: 1.5),
]

// Draw the outer pair first, then the inner pair, and the center phone last so
// overlaps remain symmetrical without perspective or non-uniform scaling.
private let drawOrder = [0, 4, 1, 3, 2]

private let panels = [
  Panel(
    captures: [
      "duolingo-static-final.png",
      "strava-final.png",
      "myfitnesspal-static-final.png",
      "perplexity-final.png",
      "yazio-static-final.png",
    ],
    output: "welcome-screens-showcase-01.png"
  ),
  Panel(
    captures: [
      "onx-hunt-final-qa.png",
      "speak-learn-qa-final-motion.png",
      "hallow-final-qa.png",
      "scrl-static-final.png",
      "speak-language-final-2.png",
    ],
    output: "welcome-screens-showcase-02.png"
  ),
]

private func fail(_ message: String) -> Never {
  FileHandle.standardError.write(Data("Showcase render failed: \(message)\n".utf8))
  exit(1)
}

private func loadBitmap(at path: String, expectedSize: NSSize? = nil) -> NSImage {
  let url = URL(fileURLWithPath: path)
  guard let data = try? Data(contentsOf: url),
        let representation = NSBitmapImageRep(data: data) else {
    fail("could not read \(path)")
  }

  if let expectedSize,
     representation.pixelsWide != Int(expectedSize.width)
       || representation.pixelsHigh != Int(expectedSize.height) {
    fail(
      "\(path) is \(representation.pixelsWide)x\(representation.pixelsHigh); "
        + "expected \(Int(expectedSize.width))x\(Int(expectedSize.height))"
    )
  }

  let image = NSImage(
    size: NSSize(width: representation.pixelsWide, height: representation.pixelsHigh)
  )
  image.addRepresentation(representation)
  return image
}

private func drawPhone(image: NSImage, placement: PhonePlacement) {
  NSGraphicsContext.saveGraphicsState()

  let transform = NSAffineTransform()
  transform.translateX(by: placement.centerX, yBy: CGFloat(canvasHeight) / 2)
  transform.rotate(byDegrees: placement.rotation)
  transform.concat()

  let phoneRect = NSRect(
    x: -phoneWidth / 2,
    y: -phoneHeight / 2,
    width: phoneWidth,
    height: phoneHeight
  )
  let screenRect = NSRect(
    x: -screenWidth / 2,
    y: -screenHeight / 2,
    width: screenWidth,
    height: screenHeight
  )

  NSGraphicsContext.saveGraphicsState()
  let phoneShadow = NSShadow()
  phoneShadow.shadowColor = NSColor.black.withAlphaComponent(0.76)
  phoneShadow.shadowBlurRadius = 28
  phoneShadow.shadowOffset = NSSize(width: 0, height: -18)
  phoneShadow.set()

  NSColor(calibratedWhite: 0.018, alpha: 1).setFill()
  NSBezierPath(
    roundedRect: phoneRect,
    xRadius: 51,
    yRadius: 51
  ).fill()
  NSGraphicsContext.restoreGraphicsState()

  let outerEdge = NSBezierPath(
    roundedRect: phoneRect.insetBy(dx: 0.5, dy: 0.5),
    xRadius: 50.5,
    yRadius: 50.5
  )
  outerEdge.lineWidth = 1
  NSColor(calibratedWhite: 0.42, alpha: 0.72).setStroke()
  outerEdge.stroke()

  NSGraphicsContext.saveGraphicsState()
  NSBezierPath(
    roundedRect: screenRect,
    xRadius: 45,
    yRadius: 45
  ).addClip()
  image.draw(
    in: screenRect,
    from: .zero,
    operation: .sourceOver,
    fraction: 1,
    respectFlipped: true,
    hints: [.interpolation: NSImageInterpolation.high]
  )
  NSGraphicsContext.restoreGraphicsState()

  let screenEdge = NSBezierPath(
    roundedRect: screenRect.insetBy(dx: 0.5, dy: 0.5),
    xRadius: 44.5,
    yRadius: 44.5
  )
  screenEdge.lineWidth = 1
  NSColor.white.withAlphaComponent(0.16).setStroke()
  screenEdge.stroke()

  NSGraphicsContext.restoreGraphicsState()
}

private func render(panel: Panel, captureDirectory: String, repoRoot: String) {
  let outputPath = URL(fileURLWithPath: repoRoot)
    .appendingPathComponent("docs/images")
    .appendingPathComponent(panel.output)
    .path
  let backdropPath = URL(fileURLWithPath: repoRoot)
    .appendingPathComponent("docs/images/showcase-backdrop.png")
    .path

  let backdrop = loadBitmap(
    at: backdropPath,
    expectedSize: NSSize(width: canvasWidth, height: canvasHeight)
  )
  let captures = panel.captures.map { capture -> NSImage in
    loadBitmap(
      at: URL(fileURLWithPath: captureDirectory).appendingPathComponent(capture).path,
      expectedSize: NSSize(width: sourceWidth, height: sourceHeight)
    )
  }

  guard let bitmap = NSBitmapImageRep(
    bitmapDataPlanes: nil,
    pixelsWide: canvasWidth,
    pixelsHigh: canvasHeight,
    bitsPerSample: 8,
    samplesPerPixel: 4,
    hasAlpha: true,
    isPlanar: false,
    colorSpaceName: NSColorSpaceName.deviceRGB,
    bytesPerRow: 0,
    bitsPerPixel: 0
  ), let context = NSGraphicsContext(bitmapImageRep: bitmap) else {
    fail("could not create the \(canvasWidth)x\(canvasHeight) output context")
  }

  let previousContext = NSGraphicsContext.current
  NSGraphicsContext.current = context
  context.imageInterpolation = NSImageInterpolation.high

  backdrop.draw(
    in: NSRect(x: 0, y: 0, width: canvasWidth, height: canvasHeight),
    from: .zero,
    operation: .copy,
    fraction: 1,
    respectFlipped: true,
    hints: [.interpolation: NSImageInterpolation.high]
  )

  // One shared grounding shadow ties the five devices to the same studio floor.
  NSGraphicsContext.saveGraphicsState()
  let floorShadow = NSShadow()
  floorShadow.shadowColor = NSColor.black.withAlphaComponent(0.72)
  floorShadow.shadowBlurRadius = 34
  floorShadow.shadowOffset = NSSize(width: 0, height: -5)
  floorShadow.set()
  NSColor.black.withAlphaComponent(0.54).setFill()
  NSBezierPath(
    ovalIn: NSRect(x: 74, y: 168, width: 1388, height: 82)
  ).fill()
  NSGraphicsContext.restoreGraphicsState()

  for index in drawOrder {
    drawPhone(image: captures[index], placement: placements[index])
  }

  context.flushGraphics()
  NSGraphicsContext.current = previousContext

  guard let png = bitmap.representation(
    using: NSBitmapImageRep.FileType.png,
    properties: [NSBitmapImageRep.PropertyKey.compressionFactor: 1]
  ) else {
    fail("could not encode \(panel.output)")
  }

  do {
    try png.write(to: URL(fileURLWithPath: outputPath), options: Data.WritingOptions.atomic)
  } catch {
    fail("could not write \(outputPath): \(error.localizedDescription)")
  }

  let renderedWidth = String(format: "%.3f", screenWidth)
  let renderedHeight = String(format: "%.3f", screenHeight)
  let renderedRatio = String(format: "%.9f", screenHeight / screenWidth)
  print(
    "Rendered \(panel.output): \(canvasWidth)x\(canvasHeight), "
      + "screens \(renderedWidth)x\(renderedHeight), ratio \(renderedRatio):1"
  )
}

let repoRoot = FileManager.default.currentDirectoryPath
let captureDirectory = ProcessInfo.processInfo.environment["WELCOME_SHOWCASE_CAPTURE_DIR"]
  ?? "/private/tmp/wsg-screens"

for panel in panels {
  render(panel: panel, captureDirectory: captureDirectory, repoRoot: repoRoot)
}
