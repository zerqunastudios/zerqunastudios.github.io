// Studio-wide settings. Edit here; every page reads from this file.

export const SITE = {
  name: 'Zerquna Studios',
  email: 'zerquna.studios@gmail.com',
  // Copyright line start year. The current year is appended automatically.
  copyrightStartYear: 2026,
  // Date the Privacy Policy text was last changed (ISO yyyy-mm-dd).
  // Update this whenever src/pages/[lang]/privacy-policy.astro changes.
  privacyPolicyUpdated: '2026-10-22',
  termsUpdated: '2026-10-22',
  // Official social profiles. Leave empty until an official account exists.
  social: [] as { name: string; url: string }[],
} as const;

export const LOCALES = ['en', 'tr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
