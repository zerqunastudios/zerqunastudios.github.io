import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { games } from './data/games';

const gameSlugs = games.map((g) => g.slug) as [string, ...string[]];

// Devlogs: one Markdown file per language.
//   src/content/devlogs/en/<post-slug>.md
//   src/content/devlogs/tr/<post-slug>.md   (optional translation, same file name)
// Files starting with "_" (like _TEMPLATE.md) are ignored.
const devlogs = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/devlogs' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(200),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      // Which game the post is about, or "studio" for studio news.
      game: z.enum([...gameSlugs, 'studio']),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { devlogs };
