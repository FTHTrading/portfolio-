/**
 * Build validation script for portfolio-unykorn.
 * Checks all required HTML pages exist and contain expected markers.
 * No external deps — pure Node.js.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const VALIDATE_ONLY = process.argv.includes("--validate-only");

const REQUIRED_PAGES = [
  { file: "index.html",                    must: ["Request a System Build", "View Services"] },
  { file: "services/index.html",           must: ["RWA Readiness Packet", "$2,500", "$75,000"] },
  { file: "rwa-readiness/index.html",      must: ["witness log", "readiness report", "not legal"] },
  { file: "build-request/index.html",      must: ["name", "email", "budget", "problem"] },
  { file: "systems/index.html",            must: ["AI Operating System", "RWA", "x402"] },
  { file: "systems/troptions/index.html",  must: ["TROPTIONS", "Exchange OS", "troptions-catalog.json"] },
  { file: "command-center/index.html",     must: ["Command Center", "url-health-table", "troptions-catalog.json"] },
  { file: "developer/index.html",          must: ["Quant API", "Predictive Metrics", "12345"] },
];

const REQUIRED_DATA = [
  { file: "data/troptions-catalog.json", must: ["troptionsmint.com", "exchange-os", "T-VEX-8"] },
];

let ok = 0;
let fail = 0;

for (const { file, must } of REQUIRED_PAGES) {
  const fullPath = path.join(ROOT, file);
  if (!fs.existsSync(fullPath)) {
    console.error(`  ✗ MISSING: ${file}`);
    fail++;
    continue;
  }
  const content = fs.readFileSync(fullPath, "utf8");
  const missing = must.filter((m) => !content.toLowerCase().includes(m.toLowerCase()));
  if (missing.length > 0) {
    console.error(`  ✗ ${file}: missing required content: ${missing.join(", ")}`);
    fail++;
  } else {
    console.log(`  ✓ ${file}`);
    ok++;
  }
}

for (const { file, must } of REQUIRED_DATA) {
  const fullPath = path.join(ROOT, file);
  if (!fs.existsSync(fullPath)) {
    console.error(`  ✗ MISSING: ${file}`);
    fail++;
    continue;
  }
  const content = fs.readFileSync(fullPath, "utf8");
  const missing = must.filter((m) => !content.toLowerCase().includes(m.toLowerCase()));
  if (missing.length > 0) {
    console.error(`  ✗ ${file}: missing: ${missing.join(", ")}`);
    fail++;
  } else {
    console.log(`  ✓ ${file}`);
    ok++;
  }
}

if (!VALIDATE_ONLY) {
  console.log(`\nBuild: ${ok} checks OK, ${fail} failed.`);
}

if (fail > 0) {
  process.exit(1);
}
console.log("\n✅ Build passed.");
