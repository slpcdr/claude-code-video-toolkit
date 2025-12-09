import { OffthreadVideo, staticFile, getStaticFiles, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { useTheme } from '../../config/theme';

interface NarratorPiPProps {
  videoFile?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
  fadeInFrames?: number;
  fadeOutFrames?: number;
}

export const NarratorPiP: React.FC<NarratorPiPProps> = ({
  videoFile = 'narrator.mp4',
  position = 'bottom-right',
  size = 'md',
  fadeInFrames = 15,
  fadeOutFrames = 30,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const theme = useTheme();

  // Check if narrator video exists
  const staticFiles = getStaticFiles();
  const hasVideo = staticFiles.some((f) => f.name === videoFile);

  if (!hasVideo) {
    return null;
  }

  // Size configurations
  const sizes = {
    sm: { width: 240, height: 135 },
    md: { width: 320, height: 180 },
    lg: { width: 400, height: 225 },
  };

  // Position configurations
  const positions = {
    'bottom-right': { bottom: 40, right: 40 },
    'bottom-left': { bottom: 40, left: 40 },
    'top-right': { top: 40, right: 40 },
    'top-left': { top: 40, left: 40 },
  };

  // Fade in/out animation
  const opacity = interpolate(
    frame,
    [0, fadeInFrames, durationInFrames - fadeOutFrames - fadeInFrames, durationInFrames - fadeOutFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const { width, height } = sizes[size];
  const posStyle = positions[position];

  return (
    <div
      style={{
        position: 'absolute',
        ...posStyle,
        width,
        height,
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        border: '2px solid rgba(255,255,255,0.1)',
        opacity,
      }}
    >
      <OffthreadVideo
        src={staticFile(videoFile)}
        style={{
          width: '100%',
          height: '130%', // Slightly overflow to crop bottom (hands)
          objectFit: 'cover',
          objectPosition: 'center top',
        }}
        muted
      />
      {/* Gradient fade at bottom to soften any remaining visibility */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
