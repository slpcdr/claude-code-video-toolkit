import { AbsoluteFill, OffthreadVideo, staticFile, getStaticFiles } from 'remotion';
import { useTheme } from '../../config/theme';
import { Label } from '../core/Label';

interface SplitScreenProps {
  leftVideo: string;
  rightVideo: string;
  leftLabel?: string;
  rightLabel?: string;
  bottomLabel?: string;
  jiraRef?: string;
  startFrom?: number;
  leftStartFrom?: number;
  rightStartFrom?: number;
  playbackRate?: number;
}

const VideoOrPlaceholder: React.FC<{
  videoFile: string;
  startFrom: number;
  playbackRate: number;
}> = ({ videoFile, startFrom, playbackRate }) => {
  const theme = useTheme();
  const staticFiles = getStaticFiles();
  const videoPath = `demos/${videoFile}`;
  const hasVideo = staticFiles.some((f) => f.name === videoPath);

  if (hasVideo) {
    return (
      <OffthreadVideo
        src={staticFile(videoPath)}
        startFrom={startFrom}
        playbackRate={playbackRate}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        fontFamily: theme.fonts.primary,
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>🎬</div>
      <div style={{ color: theme.colors.textLight, fontSize: 16 }}>Video placeholder</div>
      <div style={{ color: theme.colors.primary, fontSize: 14, marginTop: 8, fontFamily: theme.fonts.mono }}>
        {videoFile}
      </div>
    </div>
  );
};

export const SplitScreen: React.FC<SplitScreenProps> = ({
  leftVideo,
  rightVideo,
  leftLabel = 'Left',
  rightLabel = 'Right',
  bottomLabel,
  jiraRef,
  startFrom = 0,
  leftStartFrom,
  rightStartFrom,
  playbackRate = 1,
}) => {
  const theme = useTheme();

  // Allow individual overrides, fall back to shared startFrom
  const leftOffset = leftStartFrom ?? startFrom;
  const rightOffset = rightStartFrom ?? startFrom;

  const styles = {
    container: {
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'row' as const,
    },
    panel: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      position: 'relative' as const,
    },
    divider: {
      width: 4,
      backgroundColor: theme.colors.divider,
    },
    panelLabel: {
      position: 'absolute' as const,
      top: 24,
      left: 24,
      backgroundColor: theme.colors.bgOverlay,
      color: theme.colors.textDark,
      padding: '14px 24px',
      borderRadius: theme.borderRadius.md,
      fontFamily: theme.fonts.primary,
      fontSize: 32,
      fontWeight: 500,
      boxShadow: `0 4px 12px ${theme.colors.shadow}`,
    },
  };

  return (
    <AbsoluteFill style={styles.container}>
      {/* Left panel */}
      <div style={styles.panel}>
        <VideoOrPlaceholder videoFile={leftVideo} startFrom={leftOffset} playbackRate={playbackRate} />
        <div style={styles.panelLabel}>{leftLabel}</div>
      </div>

      <div style={styles.divider} />

      {/* Right panel */}
      <div style={styles.panel}>
        <VideoOrPlaceholder videoFile={rightVideo} startFrom={rightOffset} playbackRate={playbackRate} />
        <div style={styles.panelLabel}>{rightLabel}</div>
      </div>

      {/* Bottom label */}
      {bottomLabel && <Label text={bottomLabel} jiraRef={jiraRef} position="bottom-left" />}
    </AbsoluteFill>
  );
};
