import { DEFAULT_LOCALE, LOCALES, type Locale } from '../data/site';
import { ui, type UIKey } from './ui';

export type Localized<T = string> = Record<Locale, T>;

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Translation lookup. Falls back to English so a missing key never shows a broken page. */
export function useTranslations(lang: Locale) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[DEFAULT_LOCALE][key];
  };
}

/** Pick the right language from a localized value, falling back to English. */
export function pick<T>(value: Localized<T>, lang: Locale): T {
  return value[lang] ?? value[DEFAULT_LOCALE];
}

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix a site path with the deploy base path (needed for GitHub project pages). */
export function withBase(path: string): string {
  if (/^[a-z]+:/i.test(path) || path.startsWith('#')) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${clean}`;
}

/** Build a localized, base-aware URL: localePath('tr', '/games/') -> /<base>/tr/games/ */
export function localePath(lang: Locale, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return withBase(`/${lang}${clean}`);
}

/** Strip the base path and the language prefix, returning the language-neutral path. */
export function stripLocale(pathname: string): string {
  let p = pathname;
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length);
  const match = p.match(/^\/(en|tr)(\/.*)?$/);
  return match ? match[2] || '/' : p || '/';
}

export function formatDate(iso: string, lang: Locale): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export const getLangStaticPaths = () => LOCALES.map((lang) => ({ params: { lang } }));
