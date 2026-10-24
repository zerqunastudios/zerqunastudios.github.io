// Post-build checks for the static site in ./dist. No dependencies.
// Run after `npm run build`. Exits with code 1 if anything is wrong,
// which stops the GitHub Pages deployment.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname, sep } from 'node:path';

const DIST = 'dist';
const BASE = (process.env.BASE_PATH || '/').replace(/\/+$/, '');
const SITE = (process.env.SITE_URL || 'http://localhost:4321').replace(/\/+$/, '');
const LANGS = ['en', 'tr'];
const EMAIL = 'zerquna.studios@gmail.com';
// Projects that must never appear on this website, and retired game names.
// ("Dead Sector: Outbreak" is now VELKRION: THE FIRST BREACH. The old URL slug
// "dead-sector-outbreak" is allowed only for the redirect pages.)
const FORBIDDEN = [/synapse/i, /BM Voice/, /Kenna Studio Dashboard/i, /Dead\s+Sector/i];
// Official store pages that must be linked from their game pages.
const STORE_LINKS = {
  spincraft: 'https://zerqunastudios.itch.io/spincraft-wood-workshop',
  'echoes-of-the-earth': 'https://zerqunastudios.itch.io/echoes-of-the-earth',
  'velkrion-the-first-breach': 'https://zerqunastudios.itch.io/velkrion-the-first-breach',
};

const errors = [];
const fail = (msg) => errors.push(msg);

if (!existsSync(DIST)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}
const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const rel = (f) => relative(DIST, f).split(sep).join('/');

// 1. Required routes ----------------------------------------------------------
const gamesSrc = readFileSync('src/data/games.ts', 'utf8');
const slugs = [...gamesSrc.matchAll(/^\s{4}slug: '([^']+)'/gm)].map((m) => m[1]);
if (slugs.length === 0) fail('Could not read game slugs from src/data/games.ts');

const required = ['index.html', '404.html', 'robots.txt', 'sitemap-index.xml', 'favicon.svg'];
for (const lang of LANGS) {
  for (const p of ['', 'games/', 'devlogs/', 'downloads/', 'about/', 'support/', 'contact/', 'privacy-policy/', 'terms-of-use/']) {
    required.push(`${lang}/${p}index.html`);
  }
  for (const slug of slugs) {
    required.push(`${lang}/games/${slug}/index.html`, `${lang}/support/${slug}/index.html`);
  }
}
for (const r of required) if (!existsSync(join(DIST, r))) fail(`Missing route: /${r}`);

// 2. Forbidden content ----------------------------------------------------------
for (const f of files) {
  if (!['.html', '.xml', '.txt', '.js', '.json', '.css'].includes(extname(f))) continue;
  const text = readFileSync(f, 'utf8');
  for (const re of FORBIDDEN) if (re.test(text) || re.test(rel(f))) fail(`Forbidden content ${re} in /${rel(f)}`);
}

// 3. Per-page checks + collect ids ---------------------------------------------
const pages = new Map();
for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  pages.set(rel(f), { html, ids });
}

for (const [path, { html }] of pages) {
  // Moved-page redirects are tiny forwarding pages: check only that they forward.
  if (/<meta http-equiv="refresh"/.test(html) && path !== 'index.html') {
    if (!/<meta name="robots" content="noindex/.test(html)) fail(`/${path}: redirect page must be noindex`);
    const to = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (!to) fail(`/${path}: redirect page has no canonical target`);
    continue;
  }
  const isRedirect = path === 'index.html';
  if (!/<html lang="(en|tr)"/.test(html)) fail(`/${path}: missing <html lang>`);
  if (!/<title>[^<]+<\/title>/.test(html)) fail(`/${path}: missing <title>`);
  if (!isRedirect && !/<meta name="description" content="[^"]+"/.test(html)) fail(`/${path}: missing meta description`);
  const noindex = /<meta name="robots" content="noindex/.test(html);
  if (!noindex && !/<link rel="canonical" href="[^"]+"/.test(html)) fail(`/${path}: missing canonical`);
  if (!noindex && !isRedirect && !/hreflang="en"/.test(html)) fail(`/${path}: missing hreflang`);
  for (const m of html.matchAll(/<script[^>]+src="(https?:)?\/\/[^"]+"/g)) fail(`/${path}: external script ${m[0]}`);
  for (const m of html.matchAll(/mailto:([^"?]+)/g)) if (m[1] !== EMAIL) fail(`/${path}: unexpected mailto ${m[1]}`);
  if (!isRedirect && !html.includes('privacy-policy/')) fail(`/${path}: no link to the Privacy Policy`);
  if (!isRedirect && !html.includes('/support/')) fail(`/${path}: no link to Support`);
}

// 4. Internal links and anchors -------------------------------------------------
function toDistPath(url) {
  let p = url;
  if (p.startsWith(SITE)) p = p.slice(SITE.length);
  if (!p.startsWith('/')) return null;
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length);
  p = p.replace(/^\//, '');
  return p === '' || p.endsWith('/') ? `${p}index.html` : p;
}

let checked = 0;
for (const [path, { html }] of pages) {
  const refs = [
    ...[...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0])),
  ];
  for (const raw of refs) {
    const url = raw.replace(/&amp;/g, '&');
    if (/^(mailto:|tel:|data:|javascript:)/.test(url)) continue;
    if (/^https?:\/\//.test(url) && !url.startsWith(SITE)) continue; // external
    const [target, hash] = url.split('#');
    if (target === '' && hash) {
      if (!pages.get(path).ids.has(hash)) fail(`/${path}: broken anchor #${hash}`);
      continue;
    }
    const dp = toDistPath(target.split('?')[0]);
    if (dp === null) continue;
    checked++;
    if (!existsSync(join(DIST, dp))) {
      fail(`/${path}: broken link ${url}`);
      continue;
    }
    if (hash && dp.endsWith('.html') && !pages.get(dp)?.ids.has(hash)) fail(`/${path}: broken anchor ${url}`);
  }
}

// 5. Store links on game pages -------------------------------------------------
for (const [slug, url] of Object.entries(STORE_LINKS)) {
  for (const lang of LANGS) {
    const page = pages.get(`${lang}/games/${slug}/index.html`);
    if (!page) continue; // reported as a missing route above
    const anchors = [...page.html.matchAll(new RegExp(`<a[^>]+href="${url.replace(/[.]/g, '\\.')}"[^>]*>`, 'g'))];
    if (anchors.length < 2) fail(`/${lang}/games/${slug}/: expected the itch.io link in the hero and in "Where to Get"`);
    for (const a of anchors) {
      if (!/rel="noopener noreferrer"/.test(a[0]) || !/target="_blank"/.test(a[0])) fail(`/${lang}/games/${slug}/: external link without rel/target`);
    }
  }
}

// 6. Sitemap ---------------------------------------------------------------------
const sitemapFiles = files.filter((f) => /sitemap-\d+\.xml$/.test(f));
const sitemap = sitemapFiles.map((f) => readFileSync(f, 'utf8')).join('\n');
for (const lang of LANGS) {
  for (const p of ['privacy-policy/', 'support/']) {
    if (!sitemap.includes(`/${lang}/${p}</loc>`)) fail(`Sitemap is missing /${lang}/${p}`);
  }
}
if (/<loc>[^<]*404/.test(sitemap)) fail('Sitemap contains the 404 page');
if (/dead-sector/i.test(sitemap)) fail('Sitemap contains a moved (redirect) page');

// Report -------------------------------------------------------------------------
console.log(`Checked ${htmlFiles.length} HTML pages, ${checked} internal links, ${slugs.length} games.`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s) found:`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('✓ All build checks passed.');
