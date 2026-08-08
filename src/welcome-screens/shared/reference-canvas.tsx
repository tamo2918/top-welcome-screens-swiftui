import type { PropsWithChildren } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { REFERENCE_HEIGHT, REFERENCE_WIDTH } from './geometry';

type ReferenceCanvasProps = PropsWithChildren<{
  backgroundColor?: string;
  testID?: string;
}>;

export function ReferenceCanvas({
  backgroundColor = '#FFFFFF',
  children,
  testID,
}: ReferenceCanvasProps) {
  const viewport = useWindowDimensions();
  const widthScale = viewport.width / REFERENCE_WIDTH;
  const heightScale = viewport.height / REFERENCE_HEIGHT;
  const scaleDelta = Math.abs(widthScale - heightScale) / Math.min(widthScale, heightScale);
  const scale = scaleDelta <= 0.02
    ? Math.max(widthScale, heightScale)
    : Math.min(widthScale, heightScale);
  const width = REFERENCE_WIDTH * scale;
  const height = REFERENCE_HEIGHT * scale;

  return (
    <View style={[styles.viewport, { backgroundColor }]} testID={testID}>
      <View
        style={[
          styles.canvas,
          {
            left: (viewport.width - width) / 2,
            top: (viewport.height - height) / 2,
            transform: [{ scale }],
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewport: {
    flex: 1,
    overflow: 'hidden',
  },
  canvas: {
    position: 'absolute',
    width: REFERENCE_WIDTH,
    height: REFERENCE_HEIGHT,
    transformOrigin: 'top left',
  },
});
