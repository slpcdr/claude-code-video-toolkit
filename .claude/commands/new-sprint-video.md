# New Sprint Review Video

Help me create a new sprint review video project. I'll guide you through the setup process step by step.

## Your Tasks

1. **Gather Sprint Information**
   Ask me the following questions using the AskUserQuestion tool:

   **Question 1 - Sprint Details:**
   - Sprint name (e.g., "Cho Oyu", "Everest", "K2")
   - Date range (e.g., "24th Nov – 8th Dec")
   - Product name (e.g., "Digital Samba Mobile")
   - Platform (e.g., "iOS App Update", "Android Release", "Web Dashboard")
   - Version number (e.g., "4.0.2")
   - Build number (optional)

   **Question 2 - Overview Items:**
   Ask me to list the main highlights/changes for this sprint (3-5 bullet points).
   Format: "Feature: Description" or "Fix: Description"

   **Question 3 - Demo Videos:**
   For each demo I want to include, ask:
   - Demo type: single video or split-screen comparison?
   - Brief description/label
   - JIRA reference (optional)
   - Estimated duration (in seconds)
   - If split-screen: what are the two views? (e.g., "Mobile vs Desktop")

   **Question 4 - Summary Stats:**
   Ask what stats to show on the summary slide (usually 3 numbers):
   - Example: "5 Features, 12 Bug Fixes, 3 Improvements"

   **Question 5 - Narrator PiP:**
   Ask if I want to include a narrator PiP (picture-in-picture) video.
   If yes, ask for the narrator video file path or if I need to record one.

   **Question 6 - Audio:**
   Ask about audio preferences:
   - Generate voiceover with ElevenLabs? (yes/no)
   - Include background music? (yes/no)
   - Use existing voice clone or default voice?

2. **Create the Project**
   After gathering info:

   a) Copy the template from `templates/sprint-review/` to `projects/`
      Name format: `projects/sprint-review-{sprint-name-lowercase}/`

   b) Update `src/config/sprint-config.ts` with the collected information

   c) If narrator PiP is requested, add the NarratorPiP component to SprintReview.tsx

   d) Create a VOICEOVER-SCRIPT.md template based on the overview items and demos

   e) Create an asset checklist in PROJECT-STATUS.md

3. **Provide Next Steps**
   Tell me:
   - Where to place demo videos (`public/demos/`)
   - Where to place the narrator video if using PiP (`public/narrator.mp4`)
   - How to generate voiceover audio
   - How to preview (`npm run studio`)
   - How to render (`npm run render`)

## Template Location
`templates/sprint-review/`

## Output Location
`projects/`

## NarratorPiP Component (add if requested)
```tsx
// Add to SprintReview.tsx
const NarratorPiP: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 15, totalFrames - 60, totalFrames - 30],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div style={{
      position: "absolute",
      bottom: 40,
      right: 40,
      width: 320,
      height: 180,
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      border: "2px solid rgba(255,255,255,0.1)",
      opacity,
    }}>
      <OffthreadVideo
        src={staticFile("narrator.mp4")}
        style={{
          width: "100%",
          height: "130%",
          objectFit: "cover",
          objectPosition: "center top",
        }}
        muted
      />
    </div>
  );
};
```

## Output Files to Create
- `projects/sprint-review-{name}/` - New project folder
- `src/config/sprint-config.ts` - Populated with sprint data
- `VOICEOVER-SCRIPT.md` - Script template for voiceover
- `PROJECT-STATUS.md` - Asset checklist and status tracking
