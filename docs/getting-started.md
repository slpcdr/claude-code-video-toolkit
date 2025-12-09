# Getting Started

This guide will help you create your first video using the claude-code-video-toolkit.

## Prerequisites

- [Claude Code](https://claude.ai/code) CLI installed
- [Node.js](https://nodejs.org/) 18+
- [Python](https://python.org/) 3.9+ (for audio tools)
- [FFmpeg](https://ffmpeg.org/) installed
- [ElevenLabs API key](https://elevenlabs.io/) (for voiceovers)

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/claude-code-video-toolkit.git
   cd claude-code-video-toolkit
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env and add your ELEVENLABS_API_KEY
   ```

3. **Install Python dependencies**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r tools/requirements.txt
   ```

4. **Start Claude Code**
   ```bash
   claude
   ```

## Your First Video

The easiest way to create a video is using the `/new-sprint-video` command:

```
/new-sprint-video
```

This interactive wizard will:
1. Ask for sprint details (name, dates, version)
2. Help you plan demo recordings
3. Set up voiceover preferences
4. Create a new project in `projects/`

## Manual Project Creation

If you prefer manual setup:

1. **Copy a template**
   ```bash
   cp -r templates/sprint-review projects/my-video
   cd projects/my-video
   npm install
   ```

2. **Edit the config**
   Edit `src/config/sprint-config.ts` with your content.

3. **Add demo videos**
   Place `.mp4` files in `public/demos/`

4. **Preview**
   ```bash
   npm run studio
   ```

5. **Render**
   ```bash
   npm run render
   ```

## Available Commands

| Command | Description |
|---------|-------------|
| `/new-sprint-video` | Create a new sprint review video project |
| `/record-demo` | Record browser interactions with Playwright |
| `/generate-voiceover` | Generate AI voiceover from script |

## Project Structure

After creating a project, you'll have:

```
projects/my-video/
├── src/
│   ├── config/
│   │   ├── sprint-config.ts  # Edit this!
│   │   └── theme.ts
│   └── components/
├── public/
│   ├── demos/      # Your demo videos
│   └── audio/      # Voiceovers, music, SFX
└── package.json
```

## Next Steps

- [Creating Templates](./creating-templates.md)
- [Creating Brands](./creating-brands.md)
- [Recording Demos](./recording-demos.md)
