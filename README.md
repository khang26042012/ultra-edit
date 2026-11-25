# ultra-edit

All-in-one programmatic video editing & motion graphics studio powered by the strongest modern web/3D animation tools:

- **HyperFrames** (`hyperframes`, `@hyperframes/core`, `@hyperframes/player`, `@hyperframes/sdk`) — Agent-first HTML/CSS/JS video rendering engine
- **Remotion** (`remotion`, `@remotion/cli`, `@remotion/renderer`, `@remotion/three`, `@remotion/transitions`, `@remotion/shapes`, `@remotion/captions`, `@remotion/lottie`, `@remotion/media-utils`) — React programmatic video studio
- **React Three Fiber & Three.js** (`three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`) — 3D WebGL scenes & post-processing
- **GSAP & Motion** (`gsap`, `@gsap/react`, `motion`, `lottie-web`) — Precision timelines, spring physics, and vector animations
- **FFmpeg & FFprobe** (`ffmpeg-static`, `ffprobe-static`) — Media encoding & inspection

> **For AI Agents:** Read [agent.md](./agent.md) immediately after cloning for one-command auto-setup (`node scripts/setup.mjs`).

## Quick Start

```bash
git clone https://github.com/khang26042012/ultra-edit.git
cd ultra-edit
node scripts/setup.mjs
```

## Useful Scripts

- `npm run setup` — Automated post-clone installer (dependencies, Chromium browser, doctor check)
- `npm run doctor` — Verify all video tools and CLIs
- `npm run remotion:studio` — Launch Remotion Studio UI
- `npm run remotion:render` — Render `UltraShowcase` (3D R3F + GSAP) to `out/ultra-showcase.mp4`
- `npm run remotion:render:type` — Render `MotionTypography` to `out/motion-typography.mp4`
- `npm run hyperframes:preview` — Preview HyperFrames starter composition
- `npm run hyperframes:render` — Render HyperFrames starter to `out/hyperframes-intro.mp4`
- `npm run typecheck` — Run TypeScript type check
- `npm run skills:install` — Install official AI agent skills for HyperFrames & Remotion
