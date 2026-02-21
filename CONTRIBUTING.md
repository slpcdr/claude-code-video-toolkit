# Contributing to antigravity-video-toolkit

Thank you for your interest in contributing! This toolkit is designed to help people create videos with Google Antigravity assistance.

## Ways to Contribute

### Report Issues
- Bug reports
- Feature requests
- Documentation improvements

### Submit Pull Requests
- Bug fixes
- New templates
- New skills or commands
- Documentation updates

## Development Setup

1. Fork and clone the repository
2. Set up your environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r tools/requirements.txt
   ```
3. Add your ElevenLabs API key to `.env`

## Project Structure

```
├── .agents/skills/     # Domain knowledge for Google Antigravity
├── .agents/commands/   # Guided workflow commands
├── tools/              # Python CLI tools
├── templates/          # Video templates
├── brands/             # Brand profiles
└── docs/               # Documentation
```

## Adding a New Template

1. Create a new folder in `templates/`
2. Include a working Remotion project
3. Add a `README.md` explaining the template
4. Register it in `_internal/toolkit-registry.json`
5. **Update documentation** (see checklist below)
6. Test with `npm run studio` and `npm run render`

## Adding a New Skill

1. Create a folder in `.agents/skills/`
2. Add `SKILL.md` with the skill definition
3. Optionally add `reference.md` for detailed docs
4. Register it in `_internal/toolkit-registry.json`
5. **Update documentation** (see checklist below)
6. Test by asking Google Antigravity questions about the domain

## Adding a New Command

1. Create a markdown file in `.agents/commands/`
2. Follow the existing command format
3. Register it in `_internal/toolkit-registry.json`
4. **Update documentation** (see checklist below)
5. Test by running the command in Google Antigravity

## Documentation Checklist

When adding or modifying commands, skills, or templates, update these files:

| What Changed | Update These Files |
|--------------|-------------------|
| New command | `README.md` (Commands table), `AGENT.md` (Commands section) |
| New skill | `README.md` (Skills table), `AGENT.md` (Skills Reference) |
| New template | `README.md` (Templates section), `AGENT.md` (Templates section) |
| New component | `AGENT.md` (Shared Components table) |
| New transition | `README.md` (Scene Transitions), `lib/transitions/README.md` |

**Quick verification:** After adding a command, grep for it across docs:
```bash
grep -r "/your-command" README.md AGENT.md
```

## Code Style

- Use clear, descriptive names
- Comment complex logic
- Follow existing patterns in the codebase

## Pull Request Process

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Update documentation if needed
5. Submit a PR with a clear description

## Toolkit Tracking Files

| File | Purpose |
|------|---------|
| `_internal/ROADMAP.md` | What we're building (phases, current work) |
| `_internal/BACKLOG.md` | What we might build (unscheduled ideas) |
| `_internal/CHANGELOG.md` | What we built (historical record) |

For more details on the toolkit's evolution principles and local contribution workflow, see `docs/contributing.md`.

## Questions?

Open an issue for questions or discussions.
