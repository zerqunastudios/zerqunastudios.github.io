# Zerquna Studios — Official Website

Static, bilingual (English / Türkçe) website for Zerquna Studios: game portfolio, devlogs, downloads,
support center, central Privacy Policy and Terms of Use. Built with **Astro 7**, **Tailwind CSS 4** and
**TypeScript**, deployed to **GitHub Pages** with GitHub Actions. No server, database, cookies or analytics.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (needs Node.js 22.23+; tested on Node 24) |
| `npm run dev` | Local dev server at http://localhost:4321 |
| `npm run check` | TypeScript + Astro validation |
| `npm run build` | Production build into `dist/` |
| `npm run verify` | Checks `dist/`: required routes, broken links/anchors, SEO tags, forbidden content |
| `npm run test` | check + build + verify |
| `npm run preview` | Serve the production build locally |

`node_modules/`, `dist/` and `.astro/` are generated and can always be deleted; `npm install` and
`npm run build` recreate them.

## Where things live

| Path | Contents |
|---|---|
| `src/data/games.ts` | **All game data.** Add or edit a game here; its pages are generated automatically |
| `src/data/site.ts` | Studio email, policy dates |
| `src/data/support.ts` | General troubleshooting text |
| `src/i18n/ui.ts` | Interface text in English and Turkish |
| `src/pages/[lang]/privacy-policy.astro` | Central Privacy Policy (English is the reference text) |
| `src/pages/[lang]/terms-of-use.astro` | Website Terms of Use |
| `src/content/devlogs/` | Devlog posts (Markdown). See `_TEMPLATE.md` |
| `src/assets/games/<slug>/` | Game images (WebP). Optimized automatically at build time |
| `scripts/verify-build.mjs` | Post-build checks, also run by the deploy workflow |
| `.github/workflows/deploy.yml` | Build, verify and deploy to GitHub Pages |
| `PRIVACY_REVIEW.md` | Open privacy questions per game. Read before submitting to Microsoft Store |

## Adding content

**A game:** add an object to `games` in `src/data/games.ts`. Only fill in verified facts; leave
`storeLinks`, `downloads`, `releaseDate`, `requirements` and `trailerYouTubeId` empty until they are real.
Then follow section 5 of `PRIVACY_REVIEW.md`.

**A devlog:** copy `src/content/devlogs/_TEMPLATE.md` to `src/content/devlogs/en/<slug>.md`, and
optionally `src/content/devlogs/tr/<slug>.md` for Turkish. A missing translation shows the English
post with a notice.

**A download:** add an entry to the game's `downloads` array with an official itch.io or GitHub
Releases URL. Never commit game builds to this repository.

**A store link:** add `{ store: 'itch.io', url: 'https://…' }` to the game's `storeLinks`.

## Publishing on GitHub Pages

Git and the GitHub CLI were not installed on the development PC, so the repository has not been
created or pushed yet. To publish:

1. Install Git for Windows: https://git-scm.com/download/win
2. Create a new **public** repository on GitHub. For the cleanest URL, name it
   `<your-github-username>.github.io` — the site is then served at `https://<username>.github.io/`.
   Any other name works too and is served at `https://<username>.github.io/<repo>/`.
3. In this folder:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial website"
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
4. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
5. The **Deploy to GitHub Pages** workflow runs on every push to `main`. It reads the correct site URL
   and base path from the Pages settings, so no code change is needed. If any check fails, nothing is deployed.
6. Optional custom domain: **Settings → Pages → Custom domain**, then tick **Enforce HTTPS**.
   The next deployment picks up the new address automatically.

Note: `robots.txt` is only read by search engines at the root of a domain, so it is effective for a
`<username>.github.io` repository or a custom domain, not for a `/<repo>/` sub-path site. The sitemap
works in every setup.

## Content rules

- Only the four games in `src/data/games.ts` belong on this site. SYNAPSE_BREACH and non-game software
  must never be added (`npm run verify` fails the build if "synapse" appears anywhere in the output).
- Do not publish unverified facts: store links, release dates, system requirements, awards, staff,
  partners, or privacy claims.
- Do not commit secrets. There are none in this project, and none are needed.
