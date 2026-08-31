#!/usr/bin/env node
/**
 * Walks the exported site in out/ and reports, for every page, the values the
 * August 2026 SEO audit asks about: URL, title, description, H1, canonical and
 * robots.
 *
 * It prints a table, writes a CSV (the "адрес — title — description — H1"
 * hand-off), lists the URLs closed to indexing, and exits non-zero if any of
 * the audit's rules is broken — so a regression is caught before a deploy
 * rather than in the next audit.
 *
 *   node scripts/seo-audit.mjs [outDir]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const OUT = process.argv[2] ?? "out";
const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESC_MAX = 155;

async function htmlFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_next") continue;
      found.push(...(await htmlFiles(full)));
    } else if (entry.name.endsWith(".html")) {
      found.push(full);
    }
  }
  return found;
}

const decode = (value) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x2F;/g, "/")
    .replace(/&amp;/g, "&")
    .trim();

function meta(html, name) {
  const tag = html.match(
    new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]*>`, "i"),
  )?.[0];
  if (!tag) return "";
  return decode(tag.match(/content=["']([^"']*)["']/i)?.[1] ?? "");
}

function parse(file) {
  const html = readFileSync(file, "utf8");
  const url =
    "/" +
    relative(OUT, file)
      .split(sep)
      .join("/")
      .replace(/\.html$/, "")
      .replace(/^index$/, "")
      .replace(/\/index$/, "");

  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    decode(m[1].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ")),
  );

  return {
    url,
    title: decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ""),
    description: meta(html, "description"),
    robots: meta(html, "robots"),
    canonical: decode(
      html
        .match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0]
        ?.match(/href=["']([^"']*)["']/i)?.[1] ?? "",
    ),
    h1: h1s[0] ?? "",
    h1Count: h1s.length,
    // Images missing an alt attribute entirely. alt="" is deliberate (A3:
    // decorative), so only a wholly absent attribute is a finding.
    imagesWithoutAlt: [...html.matchAll(/<img\b[^>]*>/gi)].filter(
      (m) => !/\balt=/i.test(m[0]),
    ).length,
    jsonLdTypes: [
      ...html.matchAll(
        /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi,
      ),
    ].flatMap((m) => {
      try {
        const data = JSON.parse(m[1].replace(/\\u003c/g, "<"));
        return (Array.isArray(data) ? data : [data]).map((d) => d["@type"]);
      } catch {
        return [];
      }
    }),
  };
}

function duplicates(pages, key) {
  const seen = new Map();
  for (const page of pages) {
    const value = page[key];
    if (!value) continue;
    seen.set(value, [...(seen.get(value) ?? []), page.url]);
  }
  return [...seen.entries()].filter(([, urls]) => urls.length > 1);
}

/** Path of a canonical URL, normalised the way the built URLs are. */
function canonicalPath(href) {
  try {
    return new URL(href).pathname.replace(/\/+$/, "") || "/";
  } catch {
    return href;
  }
}

const pages = (await htmlFiles(OUT))
  .map(parse)
  .sort((a, b) => a.url.localeCompare(b.url));

/** Every URL this build actually serves — the target set for canonicals. */
const builtUrls = new Set(pages.map((p) => p.url || "/"));

const problems = [];
const add = (msg) => problems.push(msg);
const indexable = pages.filter((p) => !p.robots.includes("noindex"));

for (const page of indexable) {
  if (!page.title) add(`${page.url}: missing <title>`);
  else if (page.title.length < TITLE_MIN || page.title.length > TITLE_MAX)
    add(
      `${page.url}: title is ${page.title.length} chars (want ${TITLE_MIN}-${TITLE_MAX}) — ${JSON.stringify(page.title)}`,
    );
  if (/temp|placeholder|lorem/i.test(page.title))
    add(`${page.url}: placeholder title ${JSON.stringify(page.title)}`);

  if (!page.description) add(`${page.url}: missing meta description`);
  else if (page.description.length > DESC_MAX)
    add(
      `${page.url}: description is ${page.description.length} chars (max ${DESC_MAX})`,
    );

  // B1 — a canonical aimed at a URL the site does not serve de-indexes the
  // real page, so it is checked against what the build actually emitted.
  if (!page.canonical) add(`${page.url}: missing canonical`);
  else if (!builtUrls.has(canonicalPath(page.canonical)))
    add(
      `${page.url}: canonical points at a URL this build does not serve (${page.canonical})`,
    );

  if (page.h1Count === 0) add(`${page.url}: no <h1>`);
  else if (page.h1Count > 1) add(`${page.url}: ${page.h1Count} <h1> tags`);

  if (page.imagesWithoutAlt)
    add(`${page.url}: ${page.imagesWithoutAlt} <img> without an alt attribute`);

  // A4 — every page carries Organization + WebSite from the layout.
  for (const type of ["Organization", "WebSite"])
    if (!page.jsonLdTypes.includes(type))
      add(`${page.url}: missing ${type} JSON-LD`);
}

// A noindex page must not canonicalise elsewhere: "do not index me, index that
// one instead" is contradictory, and it is what an inherited canonical does.
for (const page of pages) {
  if (!page.canonical || !page.robots.includes("noindex")) continue;
  const target = canonicalPath(page.canonical);
  if (target !== (page.url || "/"))
    add(`${page.url || "/"}: noindex page canonicalises to ${target}`);
}

for (const [title, urls] of duplicates(indexable, "title"))
  add(`duplicate title ${JSON.stringify(title)}: ${urls.join(", ")}`);
for (const [, urls] of duplicates(indexable, "description"))
  add(`duplicate description on: ${urls.join(", ")}`);
for (const [h1, urls] of duplicates(indexable, "h1"))
  add(`duplicate H1 ${JSON.stringify(h1)}: ${urls.join(", ")}`);

const csv = [
  "url,title,description,h1,canonical,robots",
  ...pages.map((p) =>
    [p.url, p.title, p.description, p.h1, p.canonical, p.robots]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(","),
  ),
].join("\n");
writeFileSync(join(OUT, "seo-report.csv"), csv);

const noindexed = pages.filter((p) => p.robots.includes("noindex"));

console.log(`\nScanned ${pages.length} pages in ${OUT}/\n`);
console.table(
  pages.map((p) => ({
    url: p.url || "/",
    title: p.title.slice(0, 50),
    len: p.title.length,
    desc: p.description.length,
    h1: p.h1.slice(0, 30),
    "h1s": p.h1Count,
    schema: [...new Set(p.jsonLdTypes)].join("+"),
    robots: p.robots.includes("noindex") ? "noindex" : "",
  })),
);

console.log(`\nClosed to indexing (${noindexed.length}):`);
if (!noindexed.length)
  console.log("  (none — this site has no cart, accounts or admin)");
for (const page of noindexed) console.log(`  ${page.url}  [${page.robots}]`);

console.log(`\nCSV written to ${join(OUT, "seo-report.csv")}`);

if (problems.length) {
  console.error(`\n${problems.length} SEO problem(s):`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}
console.log("\nNo SEO problems found.\n");
