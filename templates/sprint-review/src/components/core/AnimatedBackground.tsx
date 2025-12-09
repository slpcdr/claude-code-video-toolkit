import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { useTheme } from '../../config/theme';

type BackgroundVariant = 'subtle' | 'tech' | 'warm';

interface AnimatedBackgroundProps {
  variant?: BackgroundVariant;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = 'subtle',
}) => {
  const frame = useCurrentFrame();
  const theme = useTheme();

  // Generate colors based on theme and variant
  const getColors = () => {
    const primary = theme.colors.primary;
    const secondary = theme.colors.textLight;

    switch (variant) {
      case 'tech':
        return {
          bg: theme.colors.bgLight,
          shape1: hexToRgba(primary, 0.04),
          shape2: hexToRgba(secondary, 0.03),
          shape3: hexToRgba(theme.colors.primaryLight, 0.02),
        };
      case 'warm':
        return {
          bg: '#fffbf7',
          shape1: hexToRgba(primary, 0.05),
          shape2: hexToRgba(primary, 0.03),
          shape3: hexToRgba(theme.colors.primaryLight, 0.03),
        };
      case 'subtle':
      default:
        return {
          bg: theme.colors.bgLight,
          shape1: hexToRgba(primary, 0.03),
          shape2: hexToRgba(theme.colors.textDark, 0.02),
          shape3: hexToRgba(primary, 0.02),
        };
    }
  };

  const c = getColors();

  // Slow, organic movements
  const rotation1 = interpolate(frame, [0, 900], [0, 360], {
    extrapolateRight: 'extend',
  });
  const rotation2 = interpolate(frame, [0, 1200], [360, 0], {
    extrapolateRight: 'extend',
  });

  const float1Y = Math.sin(frame * 0.008) * 30;
  const float2Y = Math.cos(frame * 0.006) * 40;
  const float3X = Math.sin(frame * 0.005) * 50;

  const scale1 = 1 + Math.sin(frame * 0.004) * 0.1;
  const scale2 = 1 + Math.cos(frame * 0.003) * 0.08;

  return (
    <AbsoluteFill style={{ backgroundColor: c.bg, overflow: 'hidden' }}>
      {/* Large slow-moving circle top-right */}
      <div
        style={{
          position: 'absolute',
          top: -200 + float1Y,
          right: -150,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${c.shape1} 0%, transparent 70%)`,
          transform: `rotate(${rotation1}deg) scale(${scale1})`,
        }}
      />

      {/* Medium shape bottom-left */}
      <div
        style={{
          position: 'absolute',
          bottom: -100 + float2Y,
          left: -100 + float3X,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${c.shape2} 0%, transparent 70%)`,
          transform: `rotate(${rotation2}deg) scale(${scale2})`,
        }}
      />

      {/* Subtle accent shape center-left */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: -200 + float3X * 0.5,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${c.shape3} 0%, transparent 60%)`,
          transform: `scale(${scale1 * 0.9})`,
        }}
      />

      {/* Fine grid pattern overlay for tech variant */}
      {variant === 'tech' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(${hexToRgba(theme.colors.textLight, 0.03)} 1px, transparent 1px),
              linear-gradient(90deg, ${hexToRgba(theme.colors.textLight, 0.03)} 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      )}
    </AbsoluteFill>
  );
};

// Helper to convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
