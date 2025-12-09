# Toolkit Backlog

Ideas and enhancements for the video creation toolkit. Items here are not yet scheduled - they're captured for future consideration.

## Commands

### `/generate-voiceover`
Interactive voiceover generation:
- Read script from VOICEOVER-SCRIPT.md or prompt for text
- Use configured voice ID
- Generate and save to project's public/audio/
- Report duration for timing sync

### `/record-demo`
Guided Playwright recording:
- Ask for URL, output name
- Select viewport (1080p, 720p, mobile)
- Run recording script
- Output duration/frames for config

### `/convert-asset`
FFmpeg helper command:
- GIF → MP4
- Resize video
- Compress for web
- Extract audio

### `/sync-timing`
Timing calculator:
- Analyze voiceover duration
- Calculate demo segment timings
- Suggest playbackRate adjustments
- Update sprint-config.ts

### `/video-status`
Project dashboard:
- List required vs existing assets
- Show total duration calculation
- Timeline visualization
- Missing asset warnings

### `/toolkit-status`
Meta command for toolkit development:
- Show current roadmap phase
- List skill maturity status
- Show recent changes
- List backlog items

### `/discover-app`
Automated web app exploration for demo planning:
- Crawl all links from a starting URL
- Identify interactive elements (buttons, forms, dropdowns, modals)
- Map navigation flows and page hierarchy
- Detect authentication requirements
- Screenshot each discovered page
- Output site map, suggested recording scripts, and asset manifest

---

## Skills

### App Discovery Skill
Playwright-based web app exploration and analysis:
- **Crawling**: Discover pages within a domain, respect robots.txt
- **Element detection**: Find clickable elements, forms, navigation patterns
- **Flow mapping**: Identify common user journeys (login, signup, CRUD)
- **Screenshot capture**: Visual inventory of all discovered pages
- **Auth detection**: Identify login walls and protected routes
- **Output formats**:
  - Mermaid site map / flow diagram
  - JSON structure of pages, elements, and actions
  - Recording script templates for each discovered flow
  - Asset manifest for Remotion planning (page count, estimated durations)
- **Use cases**:
  - Plan demo sequences before recording
  - Ensure complete feature coverage in sprint reviews
  - Generate boilerplate recording scripts automatically
  - Understand unfamiliar apps quickly

### Terminal Recording Skill
- Asciinema recording and conversion
- svg-term-cli usage
- Typing effect animations in Remotion

### Video Timing Skill
- Scene duration guidelines
- Voiceover pacing recommendations
- Break tag usage patterns
- Demo playback rate calculations

### Video Accessibility Skill
- Subtitle/caption generation
- Transcript creation
- Color contrast guidelines
- Audio description patterns

---

## Templates

### Product Demo Template
Extract from digital-samba-skill-demo:
- Dark theme
- Problem → Solution → Demo → CTA flow
- Code snippet components
- Stats cards

### Tutorial Template
- Chapter-based structure
- Progress indicator
- Step-by-step sections
- Code highlighting

### Changelog Template
- Version header
- Feature list with icons
- Breaking changes section
- Compact format

### Comparison Template
- Before/After split screen
- Feature comparison cards
- Toggle animations

---

## Infrastructure

### Shared Component Library
Extract common components to workspace level:
- AnimatedBackground
- SlideTransition
- Label
- NarratorPiP
- CodeHighlight

### Asset Validation Script
Pre-render check:
- All referenced videos exist
- All audio files exist
- Duration matches config
- TypeScript compiles

### Multi-Format Output
Render pipeline for:
- MP4 (primary)
- WebM (web fallback)
- GIF (preview/social)
- Square format (social)
- Vertical format (mobile/stories)

### Cost Tracking
ElevenLabs usage monitoring:
- Log character counts per generation
- Track music minutes
- Monthly usage summary

---

## Improvements

### Voice Management
- Store voice ID in workspace config vs hardcoded
- Support multiple voices per project
- Voice settings presets

### Playwright Enhancements
- Auth state persistence between recordings
- Click ripple effect improvements
- Slow typing simulation
- Scroll smoothing

### Template Improvements
- More transition styles
- Additional color themes
- Logo watermark component
- Progress bar component

---

## Documentation

- [ ] Video tutorial: Using the toolkit
- [ ] Skill creation guide
- [ ] Template customization guide
- [ ] Troubleshooting guide
