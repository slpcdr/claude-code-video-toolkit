# Video Toolkit Roadmap

This document tracks the development of the AI-assisted video creation toolkit.

## Vision

An evolving, reusable toolkit for AI-assisted video creation using Remotion, with:
- Reusable templates for common video types
- Claude skills providing deep domain knowledge
- Automated asset pipelines (recording, conversion, audio generation)
- Slash commands for guided workflows

---

## Current Status

**Phase:** 2 - Skills & Automation
**Focus:** Building out skills and recording infrastructure

---

## Phases

### Phase 1: Foundation ✅ COMPLETE

- [x] Sprint review template with theme system
- [x] Config-driven video content
- [x] `/new-sprint-video` slash command
- [x] Narrator PiP component
- [x] Remotion skill (pre-existing)
- [x] ElevenLabs skill (pre-existing)

### Phase 2: Skills & Automation 🔄 IN PROGRESS

**Skills:**
- [x] FFmpeg skill - common video/audio conversions (status: beta)
- [x] Playwright recording skill - browser demo capture (status: beta)
- [x] Review and validate FFmpeg skill → promoted to beta (2024-12-09)
- [x] Review and validate Playwright skill → promoted to beta (2024-12-09)
- [x] Test Playwright infrastructure with real recording

**Python Tools (`tools/`):**
- [x] `voiceover.py` - CLI for ElevenLabs TTS generation
- [x] `music.py` - CLI for background music generation
- [x] `sfx.py` - CLI for sound effects with presets
- [x] `config.py` - Shared configuration (reads from skills-registry.json)
- [x] `requirements.txt` - Python dependencies

**Commands:**
- [x] `/generate-voiceover` - streamlined audio generation (created 2024-12-09)
- [x] `/record-demo` - guided Playwright recording (created 2024-12-09, enhanced with stop button + scale)
- [ ] `/video-status` - project dashboard

**Reviews:**
- [ ] Review sprint-review template & `/new-sprint-video` command

**Infrastructure:**
- [x] Playwright recording setup (`playwright/`)
- [x] Centralize voice ID in skills-registry.json (tools read from config)
- [ ] Asset validation script (check all assets exist before render)

### Phase 3: Templates & Components

- [ ] Product demo template (extract from digital-samba-skill-demo)
- [ ] `/new-marketing-video` command
- [ ] Shared component library (workspace-level reusable components)
- [ ] Tutorial template
- [ ] Changelog/release notes template

### Phase 4: Polish & Advanced

- [ ] Multi-format output (MP4, WebM, GIF, social formats)
- [ ] Subtitle generation from voiceover scripts
- [ ] Thumbnail auto-generation
- [ ] Pre-render validation command
- [ ] Video accessibility skill

---

## Skill Maturity Levels

| Status | Meaning |
|--------|---------|
| **draft** | Just created, untested, may have errors |
| **beta** | Functional, needs real-world validation |
| **stable** | Battle-tested, well-documented, recommended |

### Current Skill Status

| Skill | Status | Notes |
|-------|--------|-------|
| remotion | stable | Pre-existing, well-tested |
| elevenlabs | stable | Pre-existing, well-tested |
| ffmpeg | beta | Reviewed 2024-12-09, trim fix applied |
| playwright-recording | beta | Reviewed 2024-12-09, frame rate + nav fixes |

---

## Review Process

For new skills to progress:

1. **draft → beta**
   - Verify all code examples compile/run
   - Test core functionality manually
   - Document any issues in `_toolkit/reviews/`
   - Fix critical issues

2. **beta → stable**
   - Use skill in a real project
   - Gather feedback on gaps/improvements
   - Complete documentation
   - No known critical issues

---

## Metrics & Goals

**Template Usage:**
- Sprint review template: Used in 1 project (cho-oyu)

**Skills Created:** 4 (2 stable, 2 beta)

**Tools Created:** 3 (`voiceover.py`, `music.py`, `sfx.py`)

**Commands Created:** 3 (`/new-sprint-video`, `/record-demo`, `/generate-voiceover`)

---

## Next Actions

1. ~~Review ffmpeg skill - verify examples work~~ ✅
2. ~~Review playwright skill - verify examples work~~ ✅
3. ~~Test playwright recording with a real demo~~ ✅
4. ~~Create `/record-demo` command~~ ✅
5. ~~Create `/generate-voiceover` command~~ ✅
6. Test `/generate-voiceover` command (restart Claude Code first)
7. Review sprint-review template & `/new-sprint-video` command
8. Create `/video-status` command
