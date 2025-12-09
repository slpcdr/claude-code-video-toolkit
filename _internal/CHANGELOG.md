# Toolkit Changelog

All notable changes to the video creation toolkit.

## [Unreleased]

### Added
- `/generate-voiceover` command - guided ElevenLabs TTS generation
- `/record-demo` command - guided Playwright browser recording
- Interactive recording stop controls (Escape key, Stop button)
- Window scaling for laptop screens (`--scale` option, default 0.75)
- FFmpeg skill (beta) - common video/audio conversion commands
- Playwright recording skill (beta) - browser demo capture
- Playwright infrastructure (`playwright/`) with recording scripts
- Toolkit development tracking (`_toolkit/`)
- Python tools: `voiceover.py`, `music.py`, `sfx.py`
- Skills registry (`_toolkit/skills-registry.json`) for centralized config

### Changed
- Updated CLAUDE.md with new skills documentation
- Playwright recordings now output at 30fps (matches Remotion)

### Fixed
- FFmpeg trim command syntax (use `-to` not `-t` for end time)
- Playwright double navigation issue
- Recording frame rate mismatch (was 25fps, now 30fps)

---

## [0.2.0] - 2024-12-09

### Added
- Sprint review template (`sprint-review-template/`)
  - Theme system with colors, fonts, spacing
  - Config-driven content via `sprint-config.ts`
  - Slide components: Title, Overview, Summary, EndCredits
  - Demo components: DemoSection, SplitScreen
  - NarratorPiP component for picture-in-picture narrator
  - Audio integration (voiceover, background music, SFX)
- `/new-sprint-video` slash command for guided project creation
- Narrator PiP support with configurable position and size

---

## [0.1.0] - 2024-12-04

### Added
- Initial workspace setup
- Remotion skill documentation
- ElevenLabs skill documentation
- First video project: sprint-review-cho-oyu
- Voice cloning workflow with ElevenLabs
- Basic generate_voiceover.py script
