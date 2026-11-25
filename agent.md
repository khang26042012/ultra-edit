# AGENT.md — Auto-Setup & Video Editing Playbook (`ultra-edit`)

> **MANDATORY FIRST STEP FOR AI AGENTS:**
> If you have just cloned this repository (or if `node_modules/` is missing), immediately run the automated setup script below before writing or rendering any video code.

---

## 1. Zero-Touch Auto-Setup (Run Immediately After Clone)

Run these commands from the repository root:

```bash
# 1. Install all npm packages, ensure headless Chromium for Remotion, and run health diagnostics
node scripts/setup.mjs

# (Optional) Also install official AI coding agent skills for HyperFrames & Remotion
node scripts/setup.mjs --with-skills
```

### What `node scripts/setup.mjs` automatically does:
1. Verifies **Node.js >= 20**.
2. Installs all locked dependencies via `npm ci` (fallback `npm install`), including **HyperFrames**, **Remotion**, **React Three Fiber**, **Three.js**, **GSAP**, **Motion**, **Lottie**, and bundled **FFmpeg/FFprobe**.
3. Runs `npx remotion browser ensure` to download the headless Chromium renderer for Remotion.
4. Checks whether system `ffmpeg` is available on `PATH` (and confirms bundled `ffmpeg-static` / `ffprobe-static`).
5. Runs `node scripts/doctor.mjs` to verify every tool is importable and ready.

### System FFmpeg Installation (if `doctor` reports system `ffmpeg` missing)
While `ffmpeg-static` is bundled in `node_modules`, installing system `ffmpeg` is recommended for **HyperFrames CLI** and custom shell video pipelines:

- **Windows (winget):** `winget install Gyan.FFmpeg`
- **macOS (Homebrew):** `brew install ffmpeg`
- **Ubuntu/Debian:** `sudo apt-get update && sudo apt-get install -y ffmpeg`

### Re-verify Environment Anytime
```bash
npm run doctor
npm run typecheck
```

---

## 2. Installed Video Editing & Motion Graphics Stack

| Category | Packages | Best Used For |
| --- | --- | --- |
| **HTML/CSS Video Engine** | `hyperframes`, `@hyperframes/core`, `@hyperframes/player`, `@hyperframes/sdk` | Agent-first HTML/CSS/JS compositions, rapid marketing/social videos, paused GSAP timelines, Apache 2.0 open-source rendering |
| **React Video Engine** | `remotion`, `@remotion/cli`, `@remotion/renderer`, `@remotion/player`, `@remotion/transitions`, `@remotion/shapes`, `@remotion/captions`, `@remotion/media-utils`, `@remotion/lottie`, `@remotion/google-fonts` | Component-driven videos, data-driven templates, frame-accurate React compositions, subtitles/captions, transitions |
| **3D & WebGL** | `three`, `@types/three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `postprocessing`, `@remotion/three` | 3D product showcases, WebGL shaders, camera flythroughs, kinetic 3D typography, bloom/post-processing |
| **2D Motion & Timelines** | `gsap`, `@gsap/react`, `motion`, `lottie-web`, `lucide-react` | Complex choreographed timelines, physics/spring motion, After Effects Lottie JSON playback, crisp vector icons |
| **Media Encoding & Schemas** | `ffmpeg-static`, `ffprobe-static`, `zod` | Video/audio probing, muxing, transcoding, and strongly typed composition props |

---

## 3. Project Structure

```text
ultra-edit/
├── agent.md                           # This file — AI agent auto-setup & workflow guide
├── package.json                       # All dependencies & npm scripts
├── remotion.config.ts                 # Remotion rendering & OpenGL settings
├── tsconfig.json                      # TypeScript config
├── scripts/
│   ├── setup.mjs                      # Post-clone automated installer
│   └── doctor.mjs                     # Environment & dependency verifier
├── src/
│   ├── remotion/
│   │   ├── index.ts                   # Remotion entry point (registerRoot)
│   │   ├── Root.tsx                   # Composition registry
│   │   └── compositions/
│   │       ├── UltraShowcase.tsx      # React Three Fiber + Three.js + GSAP + Remotion
│   │       └── MotionTypography.tsx   # 2D typography & @remotion/shapes starter
│   └── hyperframes/
│       └── intro/
│           └── index.html             # HyperFrames HTML/CSS + GSAP starter
└── out/                               # Rendered MP4/WebM outputs (gitignored)
```

---

## 4. Common Commands for Agents

### Remotion Workflow
```bash
# Open interactive Remotion Studio preview
npm run remotion:studio

# Render the 3D R3F + GSAP showcase composition
npm run remotion:render

# Render the 2D MotionTypography composition
npm run remotion:render:type

# Render any custom composition with JSON props
npx remotion render src/remotion/index.ts <CompositionId> out/<output>.mp4 --props='{"title":"Custom"}'
```

### HyperFrames Workflow
```bash
# Check HyperFrames environment
npm run hyperframes:doctor

# Preview HyperFrames HTML composition
npm run hyperframes:preview

# Render HyperFrames composition to MP4
npm run hyperframes:render
```

---

## 5. Rules for Deterministic, Frame-Accurate Video Code

When creating or editing compositions in this repo, AI agents MUST follow these rules:

1. **No wall-clock timers in Remotion:** Never drive animations with `setInterval`, `requestAnimationFrame`, or CSS `transition`/`@keyframes` inside Remotion components. Always derive state from `useCurrentFrame()` and `useVideoConfig()`.
2. **Deterministic GSAP in Remotion:** Always create paused timelines (`gsap.timeline({ paused: true })`) and seek explicitly to `frame / fps` (`tl.seek(frame / fps)`), never call `tl.play()`.
3. **3D in Remotion:** Always wrap React Three Fiber scenes in `<ThreeCanvas width={width} height={height}>` from `@remotion/three` instead of R3F's standard `<Canvas>`.
4. **Deterministic Randomness:** Use `random("my-seed")` from `remotion` instead of `Math.random()`.
5. **Output Directory:** Write rendered media files into `out/` (gitignored) so large binaries are never committed to Git.
6. **Type Safety:** Run `npm run typecheck` after editing TypeScript compositions before rendering.
7. **Secrets Safety:** Never hardcode or commit API keys, GitHub tokens, or `.env` files.
