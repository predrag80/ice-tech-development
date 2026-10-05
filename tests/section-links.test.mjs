import test from "node:test";
import assert from "node:assert/strict";
import { pendingSection, sectionDestination } from "../src/lib/section-links.ts";

const home = "https://icetechdevelopment.com/";

test("section destinations remove fragments while preserving route and query", () => {
  assert.deepEqual(sectionDestination("#work", home), { id: "work", path: "/", sameDocument: true });
  assert.deepEqual(sectionDestination("#about", `${home}?ref=email#work`), {
    id: "about", path: "/?ref=email", sameDocument: true,
  });
  assert.deepEqual(sectionDestination("/#about", `${home}projects/smoki-navijaj/`), {
    id: "about", path: "/", sameDocument: false,
  });
  assert.deepEqual(sectionDestination("/?ref=work#contact", `${home}projects/`), {
    id: "contact", path: "/?ref=work", sameDocument: false,
  });
  assert.deepEqual(sectionDestination("#main-content", `${home}services/`), {
    id: "main-content", path: "/services/", sameDocument: true,
  });
  assert.equal(sectionDestination("#a%20b", home).id, "a b");
});

test("ordinary, external, email and browser-owned links keep native behavior", () => {
  for (const href of ["/projects/", "#", "https://example.com/#work", "mailto:info@icetechdevelopment.com", "#:~:text=ICE", "#work:~:text=ICE", "#%E0%A4%A"]) {
    assert.equal(sectionDestination(href, home), null, href);
  }
});

test("cross-page section requests must be valid, fresh and for this exact page", () => {
  const now = 100_000;
  const entry = { path: "/?ref=work", id: "about", createdAt: now - 1000 };
  assert.equal(pendingSection(JSON.stringify(entry), "/?ref=work", now), "about");
  assert.equal(pendingSection(JSON.stringify(entry), "/", now), null);
  assert.equal(pendingSection(JSON.stringify(entry), "/projects/", now), null);
  for (const changes of [{ createdAt: now - 30_000 }, { createdAt: now + 1 }, { createdAt: "99000" }, { id: "" }, { id: 1 }]) {
    assert.equal(pendingSection(JSON.stringify({ ...entry, ...changes }), "/?ref=work", now), null);
  }
  for (const raw of [null, "", "invalid json", "null", "42", "{}", "[]"]) {
    assert.equal(pendingSection(raw, "/", now), null);
  }
});
