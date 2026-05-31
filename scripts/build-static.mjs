import { cpSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const outputDir = "dist";
const pathsToCopy = [
  "index.html",
  "styles.css",
  "script.js",
  "manifest.webmanifest",
  "service-worker.js",
  "docs",
  "database",
  "icons"
];

rmSync(outputDir, { force: true, recursive: true });
mkdirSync(outputDir, { recursive: true });

for (const path of pathsToCopy) {
  cpSync(path, join(outputDir, path), { recursive: true });
}

console.log(`Built static site into ${outputDir}/`);
