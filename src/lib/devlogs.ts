import { getCollection, type CollectionEntry } from 'astro:content';
import { LOCALES, type Locale } from '../data/site';

export type Devlog = CollectionEntry<'devlogs'>;

export interface DevlogView {
  slug: string;
  lang: Locale;
  /** The entry actually shown (may be the English one if no translation exists). */
  entry: Devlog;
  isFallback: boolean;
}

function split(id: string): { lang: string; slug: string } {
  const [lang, ...rest] = id.split('/');
  return { lang, slug: rest.join('/') };
}

/** All published devlogs, newest first, resolved for every site language. */
export async function getDevlogViews(): Promise<DevlogView[]> {
  const entries = (await getCollection('devlogs', ({ data }) => !data.draft)).filter((e) =>
    (LOCALES as readonly string[]).includes(split(e.id).lang),
  );

  const bySlug = new Map<string, Partial<Record<Locale, Devlog>>>();
  for (const entry of entries) {
    const { lang, slug } = split(entry.id);
    const group = bySlug.get(slug) ?? {};
    group[lang as Locale] = entry;
    bySlug.set(slug, group);
  }

  const views: DevlogView[] = [];
  for (const [slug, group] of bySlug) {
    for (const lang of LOCALES) {
      const own = group[lang];
      const fallback = group.en ?? group.tr;
      const entry = own ?? fallback;
      if (!entry) continue;
      views.push({ slug, lang, entry, isFallback: !own });
    }
  }
  return views.sort((a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime());
}

export async function getDevlogsFor(lang: Locale, game?: string): Promise<DevlogView[]> {
  const all = await getDevlogViews();
  return all.filter((v) => v.lang === lang && (!game || v.entry.data.game === game));
}
