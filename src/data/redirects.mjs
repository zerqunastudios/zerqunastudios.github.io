// Old, language-neutral paths that moved. GitHub Pages cannot do server
// redirects, so each entry becomes a small static page (in every language)
// that forwards visitors and search engines to the new address.
// Plain JavaScript so astro.config.mjs can also read it (sitemap filter).

/** @type {{ from: string; to: string }[]} */
export const redirects = [
  // The game was renamed to VELKRION: THE FIRST BREACH on 2026-10-25.
  { from: '/games/dead-sector-outbreak/', to: '/games/velkrion-the-first-breach/' },
  { from: '/support/dead-sector-outbreak/', to: '/support/velkrion-the-first-breach/' },
];
