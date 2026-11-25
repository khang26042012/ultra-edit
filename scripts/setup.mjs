#!/usr/bin/env node
/**
 * Automated post-clone setup script for ultra-edit.
 * Designed to be executed by AI coding agents or developers right after `git clone`.
 *
 * Usage:
 *   node scripts/setup.mjs
 *   node scripts/setup.mjs --skip-browser   (skip Chromium download)
 *   node scripts/setup.mjs --with-skills    (also install HyperFrames & Remotion AI agent skills)
 */

import { execSync, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const args = new Set(process.argv.slice(2));
const skipBrowser = args.has("--skip-browser");
const withSkills = args.has("--with-skills");
const rootDir = process.cwd();

function log(step, message) {
  console.log(`\n[ultra-edit:setup] [${step}] ${message}`);
}

function run(cmd, options = {}) {
  console.log(`  $ ${cmd}`);
  execSync(cmd, {
    cwd: rootDir,
    stdio: "inherit",
    ...options,
  });
}

function commandExists(cmd) {
  const probe = process.platform === "win32" ? "where" : "which";
  const result = spawnSync(probe, [cmd], { stdio: "ignore" });
  return result.status === 0;
}

// 1. Check Node.js version
const major = Number(process.versions.node.split(".")[0]);
log("1/5", `Checking Node.js version (found v${process.versions.node})...`);
if (major < 20) {
  console.error("ERROR: Node.js >= 20 is required. Please upgrade Node.js and re-run.");
  process.exit(1);
}

// 2. Install npm dependencies
log("2/5", "Installing all npm packages (HyperFrames, Remotion, R3F, Three.js, GSAP, Motion, Lottie, FFmpeg)...");
const hasLockfile = existsSync(path.join(rootDir, "package-lock.json"));
try {
  run(hasLockfile ? "npm ci" : "npm install");
} catch {
  console.warn("  npm ci failed or lockfile out of sync, falling back to npm install...");
  run("npm install");
}

// 3. Ensure Remotion headless browser (Chrome Headless Shell)
if (!skipBrowser) {
  log("3/5", "Ensuring headless Chromium browser for Remotion rendering...");
  try {
    run("npx remotion browser ensure");
  } catch (err) {
    console.warn("  Warning: Could not pre-download Remotion browser automatically. It will download on first render.");
  }
} else {
  log("3/5", "Skipping browser download (--skip-browser).");
}

// 4. Check FFmpeg availability
log("4/5", "Checking FFmpeg availability...");
if (commandExists("ffmpeg")) {
  console.log("  System FFmpeg detected on PATH.");
} else {
  console.log("  System FFmpeg not found on PATH; bundled `ffmpeg-static` is installed in node_modules.");
  console.log("  Tip: For HyperFrames CLI rendering, installing system FFmpeg is recommended:");
  console.log("    - Windows: winget install Gyan.FFmpeg");
  console.log("    - macOS:   brew install ffmpeg");
  console.log("    - Linux:   sudo apt-get install -y ffmpeg");
}

// 5. Optional: Install AI Agent Skills (HyperFrames + Remotion)
if (withSkills) {
  log("5/5", "Installing AI agent skills for HyperFrames and Remotion...");
  try {
    run("npx skills add heygen-com/hyperframes -y");
  } catch {
    console.warn("  Warning: Could not install heygen-com/hyperframes skill automatically.");
  }
  try {
    run("npx skills add remotion-dev/skills -y");
  } catch {
    console.warn("  Warning: Could not install remotion-dev/skills automatically.");
  }
} else {
  log("5/5", "Skipping external agent skills (run `node scripts/setup.mjs --with-skills` to install them).");
}

console.log("\n[ultra-edit:setup] Running verification via `npm run doctor`...\n");
run("node scripts/doctor.mjs");
console.log("\n[ultra-edit:setup] Setup complete! Ready to edit and render videos.");
