# Creating Brand Profiles

Brand profiles let you maintain consistent visual identity across videos. Each brand defines colors, fonts, and voice settings.

## Brand Structure

```
brands/
├── default/
│   ├── brand.json     # Colors, fonts, spacing
│   ├── voice.json     # Voice settings
│   └── assets/        # Logo, backgrounds, watermarks
│       ├── logo.svg
│       └── background.mp4
└── my-company/
    ├── brand.json
    ├── voice.json
    └── assets/
```

## Creating a New Brand

1. **Copy the default brand**
   ```bash
   cp -r brands/default brands/my-company
   ```

2. **Edit brand.json**
   ```json
   {
     "name": "My Company",
     "description": "Corporate brand for My Company videos",
     "colors": {
       "primary": "#2563eb",
       "primaryLight": "#3b82f6",
       "textDark": "#1e293b",
       ...
     },
     "fonts": {
       "primary": "Inter, sans-serif",
       "mono": "JetBrains Mono, monospace"
     }
   }
   ```

3. **Configure voice settings** (optional)
   Edit `voice.json` to use a different ElevenLabs voice:
   ```json
   {
     "voiceId": "your-voice-id",
     "settings": {
       "stability": 0.75,
       "similarityBoost": 0.9
     }
   }
   ```

4. **Add brand assets**
   Place logo, background videos, or watermarks in `assets/`.

## Using a Brand in a Project

When creating a new project, specify the brand:

```
/new-sprint-video --brand my-company
```

Or manually reference it in your project's config:

```typescript
// sprint-config.ts
import { loadBrand } from '../../../brands/loader';

const brand = loadBrand('my-company');
```

## Brand Properties

### Colors

| Property | Description |
|----------|-------------|
| `primary` | Main accent color |
| `primaryLight` | Lighter variant for hover/highlight |
| `textDark` | Primary text color |
| `textMedium` | Secondary text color |
| `textLight` | Tertiary/muted text |
| `bgLight` | Light background |
| `bgDark` | Dark background |
| `bgOverlay` | Semi-transparent overlay |
| `divider` | Border/divider color |
| `shadow` | Shadow color (with alpha) |

### Fonts

| Property | Description |
|----------|-------------|
| `primary` | Main font for headings and body |
| `mono` | Monospace font for code |

### Typography

Define sizes and weights for each text style:
- `h1`, `h2`, `h3` - Heading styles
- `body` - Body text
- `label` - Labels and captions

## Voice Settings

| Property | Description |
|----------|-------------|
| `voiceId` | ElevenLabs voice ID |
| `stability` | Voice stability (0-1, higher = more consistent) |
| `similarityBoost` | Voice similarity (0-1, higher = more similar to original) |
| `style` | Style exaggeration (0-1) |
| `model` | ElevenLabs model to use |
