export const REFERENCE_WIDTH = 640;
export const REFERENCE_HEIGHT = 1385;

export type Box = readonly [x: number, y: number, width: number, height: number];

export function box([left, top, width, height]: Box) {
  return {
    position: 'absolute' as const,
    left,
    top,
    width,
    height,
  };
}

export function center(width: number, top: number, height: number) {
  return box([(REFERENCE_WIDTH - width) / 2, top, width, height]);
}

export function clamp01(value: number) {
  'worklet';
  return Math.min(1, Math.max(0, value));
}

export function segment(timeMs: number, startMs: number, endMs: number) {
  'worklet';
  if (endMs <= startMs) {
    return timeMs >= endMs ? 1 : 0;
  }
  return clamp01((timeMs - startMs) / (endMs - startMs));
}
