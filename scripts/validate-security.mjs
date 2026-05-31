import { readFileSync } from "node:fs";

const seedFile = readFileSync("backend/src/auth/seed-super-admin.ts", "utf8");
if (!seedFile.includes("process.env.ADMIN_PASSWORD")) {
  throw new Error("Super Admin seeder must read ADMIN_PASSWORD from environment.");
}
if (/password\s*=\s*["'`][^"'`]+["'`]/i.test(seedFile)) {
  throw new Error("Potential hardcoded password assignment detected in seeder.");
}
console.log("Security validation passed: admin password is environment sourced.");
