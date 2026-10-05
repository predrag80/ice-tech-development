import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { chmod, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { spawn } from "node:child_process";

const artifact = resolve(process.argv[2] ?? "releases");
const revision = process.env.GITHUB_SHA;
if (!/^[a-f0-9]{40}$/.test(revision ?? "")) throw new Error("A full verified commit SHA is required.");
const privateKey = process.env.UNLIMITED_DEPLOY_KEY;
if (!privateKey?.includes("PRIVATE KEY")) throw new Error("Configure UNLIMITED_DEPLOY_KEY in the production environment before deploying.");
delete process.env.UNLIMITED_DEPLOY_KEY;
const archives = (await readdir(artifact)).filter((name) => /^ice-tech-production-.*\.zip$/.test(name));
if (archives.length !== 1) throw new Error("Expected exactly one verified release archive.");
const archive = join(artifact, archives[0]);
const hash = createHash("sha256").update(await readFile(archive)).digest("hex");
const expected = (await readFile(`${archive}.sha256`, "utf8")).trim();
if (expected !== `${hash}  ${archives[0]}`) throw new Error("Release checksum mismatch.");
const directory = await mkdtemp(join(tmpdir(), "ice-tech-deploy-key-"));
try {
  await chmod(directory, 0o700);
  const key = join(directory, "key");
  await writeFile(key, privateKey.trim() + "\n", { mode: 0o600 });
  const child = spawn("ssh", [
    "-T", "-p", "9780", "-i", key,
    "-o", "IdentitiesOnly=yes", "-o", "BatchMode=yes", "-o", "ConnectTimeout=20",
    "-o", "ServerAliveInterval=15", "-o", "ServerAliveCountMax=3",
    "-o", "StrictHostKeyChecking=yes", "-o", `UserKnownHostsFile=${resolve("hosting/unlimited-known-hosts")}`,
    "prowebsy@s34.unlimited.rs", `deploy ${revision} ${hash}`,
  ], { stdio: ["pipe", "inherit", "inherit"] });
  await new Promise((done, reject) => {
    const stream = createReadStream(archive);
    child.once("error", reject);
    stream.once("error", reject);
    child.stdin.on("error", (error) => { if (error.code !== "EPIPE") reject(error); });
    child.once("close", (code) => {
      stream.destroy();
      if (code === 0) done();
      else reject(new Error(`Deployment failed (SSH exit ${code}).`));
    });
    stream.pipe(child.stdin);
  });
} finally {
  // Only this invocation's newly-created private-key directory is removed.
  await rm(directory, { recursive: true, force: true });
}
