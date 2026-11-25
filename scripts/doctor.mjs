#!/usr/bin/env node
/**
 * Health check script for ultra-edit.
 * Verifies that all core programmatic video editing tools are installed and loadable.
 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();

const packagesToCheck = [
  "hyperframes",
  "@hyperframes/core",
  "@hyperframes/player",
  "@hyperframes/sdk",
  "remotion",
  "@remotion/cli",
  "@remotion/renderer",
  "@remotion/three",
  "@remotion/transitions",
  "@remotion/shapes",
  "@remotion/captions",
  "@remotion/media-utils",
  "@remotion/lottie",
  "three",
  "@react-three/fiber",
  "@react-three/drei",
  "@react-three/postprocessing",
  "gsap",
  "@gsap/react",
  "motion",
  "lottie-web",
  "ffmpeg-static",
  "ffprobe-static",
];

let failed = 0;

console.log("=== ultra-edit Environment Doctor ===");
console.log(`Node.js:  v${process.versions.node}`);
console.log(`Platform: ${process.platform} (${process.arch})\n`);

console.log("Checking installed packages:");
for (const pkg of packagesToCheck) {
  const pkgPath = path.join(rootDir, "node_modules", ...pkg.split("/"), "package.json");
  if (existsSync(pkgPath)) {
    const pkgJson = JSON.parse(readFileSync(pkgPath, "utf8"));
    console.log(`  [OK] ${pkg.padEnd(30)} v${pkgJson.version}`);
  } else {
    console.log(`  [MISSING] ${pkg}`);
    failed++;
  }
}

console.log("\nChecking CLI tools:");
const cliChecks = [
  { name: "ffmpeg (system)", cmd: "ffmpeg", args: ["-version"] },
  { name: "remotion CLI", cmd: process.platform === "win32" ? "npx.cmd" : "npx", args: ["remotion", "versions"] },
  { name: "hyperframes CLI", cmd: process.platform === "win32" ? "npx.cmd" : "npx", args: ["hyperframes", "--version"] },
];

for (const check of cliChecks) {
  const res = spawnSync(check.cmd, check.args, { encoding: "utf8", shell: process.platform === "win32" });
  if (res.status === 0) {
    const firstLine = (res.stdout || res.stderr || "").split(/\r?\n/)[0].trim();
    console.log(`  [OK] ${check.name.padEnd(20)} ${firstLine}`);
  } else {
    console.log(`  [WARN] ${check.name.padEnd(20)} not available on PATH`);
  }
}

if (failed > 0) {
  console.error(`\nDoctor found ${failed} missing package(s). Run \`npm run setup\` to install.`);
  process.exit(1);
}

console.log("\nAll core video editing packages are installed and ready.");
