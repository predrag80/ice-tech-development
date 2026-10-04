import { mkdir, readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

await mkdir("releases", { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const archive = `ice-tech-production-${stamp}.zip`;
// Include hidden .htaccess; do not include the local-preview header manifest.
execFileSync("zip", ["-qr", `../releases/${archive}`, ".", "-x", ".headers.json"], { cwd: "out" });
const hash = createHash("sha256").update(await readFile(`releases/${archive}`)).digest("hex");
await writeFile(`releases/${archive}.sha256`, `${hash}  ${archive}\n`);
console.log(`Release package: releases/${archive}\nSHA-256: ${hash}`);
