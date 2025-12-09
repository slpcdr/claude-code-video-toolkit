# claude-code-video-toolkit

An AI-native video production workspace for [Claude Code](https://claude.ai/code). Create professional videos with AI assistance — from concept to final render.

## What is this?

This toolkit gives Claude Code the knowledge and tools to help you create videos:

- **Skills** — Domain expertise in Remotion, ElevenLabs, FFmpeg, Playwright
- **Commands** — Guided workflows like `/new-sprint-video`
- **Templates** — Ready-to-customize video structures
- **Tools** — Python CLI for audio generation

Clone this repo, open it in Claude Code, and start creating videos.

## Quick Start

### Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed
- [Node.js](https://nodejs.org/) 18+
- [Python](https://python.org/) 3.9+
- [FFmpeg](https://ffmpeg.org/)
- [ElevenLabs API key](https://elevenlabs.io/) (for AI voiceovers)

### Setup

```bash
# Clone the toolkit
git clone https://github.com/digitalsamba/claude-code-video-toolkit.git
cd claude-code-video-toolkit

# Set up environment
cp .env.example .env
# Edit .env and add your ELEVENLABS_API_KEY

# Install Python dependencies
python -m venv .venv
source .venv/bin/activate
pip install -r tools/requirements.txt

# Start Claude Code
claude
```

### Create Your First Video

In Claude Code, run:

```
/new-sprint-video
```

This interactive wizard will guide you through creating a sprint review video.

## Features

### Skills

Claude Code has deep knowledge in:

| Skill | Description |
|-------|-------------|
| **remotion** | React-based video framework — compositions, animations, rendering |
| **elevenlabs** | AI audio — text-to-speech, voice cloning, music, sound effects |
| **ffmpeg** | Media processing — format conversion, compression, resizing |
| **playwright-recording** | Browser automation — record demos as video |

### Commands

| Command | Description |
|---------|-------------|
| `/new-sprint-video` | Create a sprint review video project |
| `/record-demo` | Record browser interactions with Playwright |
| `/generate-voiceover` | Generate AI voiceover from a script |

### Templates

Pre-built video structures in `templates/`:

- **sprint-review** — Sprint review videos with demos, stats, and voiceover

### Brand Profiles

Define visual identity in `brands/`:

```
brands/my-brand/
├── brand.json    # Colors, fonts, typography
├── voice.json    # ElevenLabs voice settings
└── assets/       # Logo, backgrounds
```

### Python Tools

Audio generation CLI in `tools/`:

```bash
# Generate voiceover
python tools/voiceover.py --script script.md --output voiceover.mp3

# Generate background music
python tools/music.py --prompt "Upbeat corporate" --duration 120 --output music.mp3

# Generate sound effects
python tools/sfx.py --preset whoosh --output sfx.mp3
```

## Project Structure

```
claude-code-video-toolkit/
├── .claude/
│   ├── skills/          # Domain knowledge
│   └── commands/        # Slash commands
├── tools/               # Python CLI tools
├── templates/           # Video templates
├── brands/              # Brand profiles
├── projects/            # Your video projects
├── assets/              # Shared assets
├── playwright/          # Recording infrastructure
├── docs/                # Documentation
└── _internal/           # Toolkit metadata
```

## Documentation

- [Getting Started](docs/getting-started.md)
- [Creating Templates](docs/creating-templates.md)
- [Creating Brands](docs/creating-brands.md)

## How It Works

1. **You describe** what video you want
2. **Claude Code uses skills** to understand the domain (Remotion, audio, etc.)
3. **Commands guide** complex workflows step-by-step
4. **Templates provide** ready-made video structures
5. **Tools automate** repetitive tasks (voiceover, music, SFX)
6. **You iterate** with live preview until it's perfect
7. **Render** to MP4

## Video Workflow

```
Concept → /new-sprint-video → Record demos → Generate audio → Preview → Render
```

1. **Plan** — Define content and structure
2. **Create project** — Use a command or copy a template
3. **Record assets** — Demos, screenshots, screen recordings
4. **Generate audio** — AI voiceover, background music, SFX
5. **Preview** — `npm run studio` for live preview
6. **Iterate** — Adjust timing, styling, content
7. **Render** — `npm run render` for final MP4

## Requirements

- **Claude Code** — The AI coding assistant
- **Node.js 18+** — For Remotion
- **Python 3.9+** — For audio tools
- **FFmpeg** — For media processing
- **ElevenLabs API key** — For AI voiceovers (optional but recommended)

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Built for use with [Claude Code](https://claude.ai/code) by Anthropic.
