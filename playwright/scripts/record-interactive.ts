/**
 * Interactive browser recording script
 *
 * Opens a visible browser window and records your manual actions.
 * Press Escape, click Stop button, or Ctrl+C to stop recording.
 *
 * Usage:
 *   npx tsx scripts/record-interactive.ts --url "https://example.com" --name "my-demo"
 *
 * Options:
 *   --url       URL to open (required)
 *   --name      Output filename without extension (required)
 *   --output    Output directory (default: ./output)
 *   --viewport  Viewport preset: 1080p, 720p, mobile, tablet (default: 1080p)
 *   --scale     Window scale factor 0.5-1.0 (default: 1.0). Use 0.75 for laptops.
 *               Records at full resolution but shows smaller window.
 *   --slowMo    Delay between actions in ms (default: 50)
 *   --duration  Max recording duration in seconds (default: 120)
 */

import { chromium, Browser, BrowserContext, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

// Parse command line arguments
function parseArgs(): {
  url: string;
  name: string;
  output: string;
  viewport: { width: number; height: number };
  scale: number;
  slowMo: number;
  duration: number;
} {
  const args = process.argv.slice(2);
  const parsed: Record<string, string> = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    const value = args[i + 1];
    parsed[key] = value;
  }

  if (!parsed.url || !parsed.name) {
    console.error('Error: --url and --name are required');
    console.error('Usage: npx tsx scripts/record-interactive.ts --url "https://example.com" --name "my-demo"');
    process.exit(1);
  }

  const viewports: Record<string, { width: number; height: number }> = {
    '1080p': { width: 1920, height: 1080 },
    '720p': { width: 1280, height: 720 },
    'mobile': { width: 390, height: 844 },
    'tablet': { width: 1024, height: 768 },
  };

  const viewportName = parsed.viewport || '1080p';
  const viewport = viewports[viewportName] || viewports['1080p'];

  // Scale factor: 0.5-1.0, default 1.0 (no scaling)
  let scale = parseFloat(parsed.scale || '1.0');
  scale = Math.max(0.5, Math.min(1.0, scale)); // Clamp to valid range

  return {
    url: parsed.url,
    name: parsed.name,
    output: parsed.output || './output',
    viewport,
    scale,
    slowMo: parseInt(parsed.slowMo || '50', 10),
    duration: parseInt(parsed.duration || '120', 10),
  };
}

const config = parseArgs();
const targetFps = 30;

async function injectCursorVisualization(page: Page): Promise<void> {
  await page.addStyleTag({
    content: `
      .playwright-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(234, 88, 12, 0.6);
        border: 2px solid rgba(234, 88, 12, 0.9);
        border-radius: 50%;
        pointer-events: none;
        z-index: 999999;
        transform: translate(-50%, -50%);
        transition: transform 0.05s ease, background 0.1s ease;
      }
      .playwright-cursor.clicking {
        transform: translate(-50%, -50%) scale(0.8);
        background: rgba(234, 88, 12, 0.9);
      }
      .click-ripple {
        position: fixed;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(234, 88, 12, 0.3);
        border: 2px solid rgba(234, 88, 12, 0.6);
        pointer-events: none;
        z-index: 999998;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 0.4s ease-out forwards;
      }
      @keyframes ripple {
        to {
          transform: translate(-50%, -50%) scale(2.5);
          opacity: 0;
        }
      }
      .recording-control-panel {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: flex;
        align-items: center;
        gap: 12px;
        background: rgba(0, 0, 0, 0.85);
        padding: 10px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }
      .recording-indicator {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #fff;
        font-size: 13px;
        font-weight: 500;
      }
      .recording-dot {
        width: 10px;
        height: 10px;
        background: #ef4444;
        border-radius: 50%;
        animation: pulse 1.5s ease-in-out infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(0.9); }
      }
      .recording-timer {
        font-variant-numeric: tabular-nums;
        color: #a1a1aa;
        font-size: 13px;
        min-width: 45px;
      }
      .stop-recording-btn {
        background: #dc2626;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: background 0.15s ease;
      }
      .stop-recording-btn:hover {
        background: #b91c1c;
      }
      .stop-recording-btn .shortcut {
        background: rgba(255, 255, 255, 0.2);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 500;
      }
    `
  });

  await page.evaluate(() => {
    const cursor = document.createElement('div');
    cursor.className = 'playwright-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', (e) => {
      cursor.classList.add('clicking');

      const ripple = document.createElement('div');
      ripple.className = 'click-ripple';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 400);
    });

    document.addEventListener('mouseup', () => {
      cursor.classList.remove('clicking');
    });
  });
}

async function injectRecordingControls(page: Page, maxDuration: number): Promise<void> {
  // Use addScriptTag with raw JS to avoid tsx transpiler issues
  await page.addScriptTag({
    content: `
      (function() {
        // Prevent duplicate injection
        if (document.querySelector('.recording-control-panel')) return;

        const maxDur = ${maxDuration};

        // Create control panel
        const panel = document.createElement('div');
        panel.className = 'recording-control-panel';
        panel.innerHTML = \`
          <div class="recording-indicator">
            <div class="recording-dot"></div>
            <span>REC</span>
          </div>
          <div class="recording-timer">0:00</div>
          <button class="stop-recording-btn">
            Stop <span class="shortcut">Esc</span>
          </button>
        \`;
        document.body.appendChild(panel);

        // Timer update
        const timerEl = panel.querySelector('.recording-timer');
        const startTime = Date.now();

        setInterval(function() {
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          const mins = Math.floor(elapsed / 60);
          const secs = elapsed % 60;
          timerEl.textContent = mins + ':' + secs.toString().padStart(2, '0');

          // Flash warning when approaching max duration
          if (elapsed >= maxDur - 10) {
            timerEl.style.color = '#ef4444';
          }
        }, 1000);

        // Stop button click
        const stopBtn = panel.querySelector('.stop-recording-btn');
        stopBtn.addEventListener('click', function() {
          window.__stopRecording = true;
        });

        // Escape key to stop
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            e.preventDefault();
            window.__stopRecording = true;
          }
        });
      })();
    `
  });
}

function getVideoDuration(filePath: string): number {
  try {
    const output = execSync(
      `ffprobe -v error -show_entries format=duration -of csv=p=0 "${filePath}"`,
      { encoding: 'utf-8' }
    ).trim();
    return parseFloat(output);
  } catch {
    return 0;
  }
}

async function record(): Promise<void> {
  // Calculate scaled window size for display
  const windowWidth = Math.round(config.viewport.width * config.scale);
  const windowHeight = Math.round(config.viewport.height * config.scale);

  console.log(`\n🎬 Interactive Recording`);
  console.log(`   URL: ${config.url}`);
  console.log(`   Output: ${config.name}`);
  console.log(`   Viewport: ${config.viewport.width}x${config.viewport.height}`);
  if (config.scale < 1) {
    console.log(`   Window: ${windowWidth}x${windowHeight} (scaled to ${Math.round(config.scale * 100)}%)`);
  }
  console.log(`   Max duration: ${config.duration}s`);
  console.log(`\n📍 Browser will open. Perform your actions.`);
  console.log(`   To stop: Press Esc, click Stop button, or Ctrl+C\n`);

  const browser: Browser = await chromium.launch({
    slowMo: config.slowMo,
    headless: false,  // Always visible for interactive mode
  });

  const tempDir = './recordings';
  fs.mkdirSync(tempDir, { recursive: true });

  // Use deviceScaleFactor to show smaller window while recording at full resolution
  // deviceScaleFactor > 1 means: render more pixels in the same viewport
  // Combined with a smaller recordVideo size, we get full-res recording in a smaller window
  const deviceScaleFactor = 1 / config.scale;

  const context: BrowserContext = await browser.newContext({
    viewport: {
      width: windowWidth,
      height: windowHeight,
    },
    deviceScaleFactor,
    recordVideo: {
      dir: tempDir,
      size: config.viewport, // Record at full resolution
    },
  });

  const page: Page = await context.newPage();

  // Handle graceful shutdown on Ctrl+C
  let stopped = false;
  const cleanup = async () => {
    if (stopped) return;
    stopped = true;
    console.log('\n\n⏹ Stopping recording...');
    await saveRecording(page, context, browser);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  try {
    await page.goto(config.url);
    await injectCursorVisualization(page);
    await injectRecordingControls(page, config.duration);

    console.log('🔴 Recording... (Press Esc or click Stop button)\n');

    // Re-inject cursor and controls on navigation
    page.on('load', async () => {
      try {
        await injectCursorVisualization(page);
        await injectRecordingControls(page, config.duration);
      } catch {
        // Page might have closed
      }
    });

    // Poll for stop signal from browser or wait for max duration
    const startTime = Date.now();
    while (!stopped) {
      // Check if user clicked Stop button or pressed Escape
      const shouldStop = await page.evaluate(() => (window as any).__stopRecording === true).catch(() => true);

      if (shouldStop) {
        console.log('\n🛑 Stop requested from browser');
        await cleanup();
        break;
      }

      // Check max duration
      const elapsed = (Date.now() - startTime) / 1000;
      if (elapsed >= config.duration) {
        console.log(`\n⏱ Max duration (${config.duration}s) reached.`);
        await cleanup();
        break;
      }

      // Poll every 200ms
      await page.waitForTimeout(200);
    }

  } catch (error) {
    if (!stopped) {
      console.error('Recording error:', error);
      await cleanup();
    }
  }
}

async function saveRecording(page: Page, context: BrowserContext, browser: Browser): Promise<void> {
  await context.close();

  const video = page.video();
  const videoPath = await video?.path();

  if (videoPath && fs.existsSync(videoPath)) {
    fs.mkdirSync(config.output, { recursive: true });

    const webmPath = path.join(config.output, `${config.name}.webm`);
    fs.renameSync(videoPath, webmPath);

    const mp4Path = path.join(config.output, `${config.name}.mp4`);
    console.log(`  Converting to MP4 (30fps)...`);

    try {
      execSync(
        `ffmpeg -y -i "${webmPath}" -c:v libx264 -crf 20 -preset medium -r ${targetFps} -movflags faststart "${mp4Path}"`,
        { stdio: 'pipe' }
      );

      fs.unlinkSync(webmPath);

      const duration = getVideoDuration(mp4Path);
      const frames = Math.ceil(duration * targetFps);

      console.log(`\n✓ Recording saved!`);
      console.log(`\n📊 Video stats:`);
      console.log(`   File: ${mp4Path}`);
      console.log(`   Duration: ${duration.toFixed(2)}s`);
      console.log(`   Frames (${targetFps}fps): ${frames}`);
      console.log(`\n📋 For sprint-config.ts:`);
      console.log(`   durationSeconds: ${Math.ceil(duration)}`);

    } catch (ffmpegError) {
      console.log(`\n⚠ FFmpeg conversion failed. WebM retained at: ${webmPath}`);
    }
  }

  await browser.close();
  process.exit(0);
}

record();
