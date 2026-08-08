import Svg, { Circle, G, Path } from 'react-native-svg';

export function AppleIcon({ color = '#000000', size = 27 }) {
  return (
    <Svg height={size} viewBox="0 0 24 24" width={size}>
      <Path
        d="M16.74 12.94c.02 2.47 2.17 3.3 2.19 3.31-.02.06-.34 1.17-1.13 2.31-.69.99-1.4 1.97-2.52 1.99-1.1.02-1.46-.65-2.72-.65-1.27 0-1.66.63-2.7.67-1.08.04-1.91-1.08-2.6-2.07-1.41-2.04-2.49-5.75-1.04-8.27a4.04 4.04 0 0 1 3.44-2.09c1.07-.02 2.09.72 2.72.72.63 0 1.82-.89 3.06-.76.52.02 1.99.21 2.94 1.59-.08.05-1.75 1.02-1.73 3.05ZM14.63 6.79c.58-.7.97-1.68.86-2.66-.84.03-1.85.56-2.45 1.26-.54.62-1.01 1.62-.88 2.57.93.07 1.89-.47 2.47-1.17Z"
        fill={color}
      />
    </Svg>
  );
}

export function GoogleIcon({ size = 26 }: { size?: number }) {
  return (
    <Svg height={size} viewBox="0 0 24 24" width={size}>
      <G fill="none" strokeLinecap="round" strokeWidth={3.3}>
        <Path d="M20.3 12.2A8.6 8.6 0 0 1 12 20.7" stroke="#4285F4" />
        <Path d="M12 20.7A8.7 8.7 0 0 1 4.5 16.3" stroke="#34A853" />
        <Path d="M4.5 16.3A8.7 8.7 0 0 1 4.6 7.6" stroke="#FBBC05" />
        <Path d="M4.6 7.6A8.7 8.7 0 0 1 17.9 5.5" stroke="#EA4335" />
        <Path d="M12.2 12.1h8.2" stroke="#4285F4" />
      </G>
    </Svg>
  );
}

export function EnvelopeIcon({ color = '#233636', size = 25 }) {
  return (
    <Svg height={size} viewBox="0 0 24 24" width={size}>
      <Path
        d="M3.5 5.75h17v12.5h-17zM4.4 7l7.6 5.9L19.6 7"
        fill="none"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={1.7}
      />
    </Svg>
  );
}

export function CloseIcon({ color = '#000000', size = 23 }) {
  return (
    <Svg height={size} viewBox="0 0 24 24" width={size}>
      <Path d="m6 6 12 12M18 6 6 18" stroke={color} strokeLinecap="round" strokeWidth={2.2} />
    </Svg>
  );
}

export function SpinnerDot({ color = '#FFFFFF', size = 8 }) {
  return (
    <Svg height={size} viewBox="0 0 8 8" width={size}>
      <Circle cx="4" cy="4" fill={color} r="4" />
    </Svg>
  );
}
