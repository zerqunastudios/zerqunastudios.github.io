// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { redirects } from './src/data/redirects.mjs';

const movedPaths = redirects.map((r) => r.from);

// The public URL is never hard-coded. In GitHub Actions, the deploy workflow
// reads it from the repository's GitHub Pages settings (actions/configure-pages)
// and passes it in. Locally, the site builds for localhost.
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', tr: 'tr' } },
      // Keep the root language redirect, the 404 page and moved-page
      // redirects out of the sitemap.
      filter: (page) =>
        /\/(en|tr)\//.test(page) && !movedPaths.some((p) => new RegExp(`/(en|tr)${p}$`).test(page)),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
