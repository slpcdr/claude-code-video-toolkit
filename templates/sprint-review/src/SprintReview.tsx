import { AbsoluteFill, Audio, Series, Sequence, staticFile, getStaticFiles } from 'remotion';
import { ThemeProvider, defaultTheme } from './config/theme';
import { sprintConfig, seconds } from './config/sprint-config';

// Core components
import { AnimatedBackground, SlideTransition, NarratorPiP } from './components/core';

// Slides
import { TitleSlide, OverviewSlide, SummarySlide, EndCredits } from './components/slides';

// Demos
import { DemoSection, SplitScreen } from './components/demos';

export const SprintReview: React.FC = () => {
  const { demos, audio, narrator } = sprintConfig;
  const staticFiles = getStaticFiles();

  // Check which audio files exist
  const hasVoiceover = audio.voiceoverFile && staticFiles.some((f) => f.name === `audio/${audio.voiceoverFile}`);
  const hasBackgroundMusic = audio.backgroundMusicFile && staticFiles.some((f) => f.name === `audio/${audio.backgroundMusicFile}`);
  const hasChime = audio.chimeFile && staticFiles.some((f) => f.name === `audio/${audio.chimeFile}`);

  return (
    <ThemeProvider theme={defaultTheme}>
      <AbsoluteFill>
        {/* Persistent animated background */}
        <AnimatedBackground variant="subtle" />

        <Series>
          {/* Title Card - 5 seconds */}
          <Series.Sequence durationInFrames={seconds(5)}>
            <SlideTransition durationInFrames={seconds(5)} style="zoom">
              <TitleSlide />
            </SlideTransition>
          </Series.Sequence>

          {/* Overview - 15 seconds */}
          <Series.Sequence durationInFrames={seconds(15)}>
            <SlideTransition durationInFrames={seconds(15)} style="zoom">
              <OverviewSlide />
            </SlideTransition>
          </Series.Sequence>

          {/* Dynamic demo sections from config */}
          {demos.map((demo, index) => (
            <Series.Sequence key={index} durationInFrames={seconds(demo.durationSeconds)}>
              <SlideTransition durationInFrames={seconds(demo.durationSeconds)} style="blur-fade">
                {demo.type === 'split' ? (
                  <SplitScreen
                    leftVideo={demo.leftVideo!}
                    rightVideo={demo.rightVideo!}
                    leftLabel={demo.leftLabel}
                    rightLabel={demo.rightLabel}
                    bottomLabel={demo.label}
                    jiraRef={demo.jiraRef}
                    leftStartFrom={demo.leftStartFrom}
                    rightStartFrom={demo.rightStartFrom}
                    playbackRate={demo.playbackRate}
                  />
                ) : (
                  <DemoSection
                    videoFile={demo.videoFile!}
                    label={demo.label}
                    jiraRef={demo.jiraRef}
                    startFrom={demo.startFrom}
                    playbackRate={demo.playbackRate}
                  />
                )}
              </SlideTransition>
            </Series.Sequence>
          ))}

          {/* Summary - 15 seconds */}
          <Series.Sequence durationInFrames={seconds(15)}>
            <SlideTransition durationInFrames={seconds(15)} style="zoom" transitionDuration={20}>
              <SummarySlide />
            </SlideTransition>
          </Series.Sequence>

          {/* End Credits - 30 seconds */}
          <Series.Sequence durationInFrames={seconds(30)}>
            <EndCredits />
          </Series.Sequence>
        </Series>

        {/* Voiceover audio track */}
        {hasVoiceover && (
          <Sequence from={audio.voiceoverStartFrame || 0}>
            <Audio src={staticFile(`audio/${audio.voiceoverFile}`)} />
          </Sequence>
        )}

        {/* Background music - low volume */}
        {hasBackgroundMusic && (
          <Audio
            src={staticFile(`audio/${audio.backgroundMusicFile}`)}
            volume={audio.backgroundMusicVolume || 0.15}
          />
        )}

        {/* Success chime on summary slide */}
        {hasChime && audio.chimeFrame && (
          <Sequence from={audio.chimeFrame}>
            <Audio src={staticFile(`audio/${audio.chimeFile}`)} volume={0.5} />
          </Sequence>
        )}

        {/* Narrator PiP - synced with voiceover */}
        {narrator?.enabled && (
          <Sequence from={narrator.startFrame || audio.voiceoverStartFrame || 0}>
            <NarratorPiP
              videoFile={narrator.videoFile}
              position={narrator.position}
              size={narrator.size}
            />
          </Sequence>
        )}
      </AbsoluteFill>
    </ThemeProvider>
  );
};
