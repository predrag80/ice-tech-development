import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";

test("restricted receiver validates archives, preserves backups and rolls back failed releases", () => {
  const result = spawnSync("python3", ["-B", "tests/deploy_receiver_test.py"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  console.log(result.stderr.trim());
});

test("production deploy is gated by checks and main with no overlapping publications", async () => {
  const workflow = await readFile(".github/workflows/verify.yml", "utf8");
  assert.match(workflow, /needs: check/);
  assert.match(workflow, /if: github.ref == 'refs\/heads\/main' && \(github.event_name == 'push' \|\| github.event_name == 'workflow_dispatch'\)/);
  assert.match(workflow, /group: unlimited-production\n\s+cancel-in-progress: false/);
  assert.match(workflow, /environment:\n\s+name: production/);
  assert.match(workflow, /gh run download "\$GITHUB_RUN_ID"/);
  assert.doesNotMatch(workflow, /pull_request_target|StrictHostKeyChecking=no/);
});
