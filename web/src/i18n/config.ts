export const locales = ['sk', 'en', 'uk'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'sk'

/** Locale codes as used in `<html lang>` and hreflang. Identical to our URL codes. */
export const htmlLang: Record<Locale, string> = {
  sk: 'sk',
  en: 'en',
  uk: 'uk',
}

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'sk' || value === 'en' || value === 'uk'
}

/**
 * Build an href for a locale. The default locale is served unprefixed
 * (`/schedule`), other locales are prefixed (`/en/schedule`).
 */
export function localeHref(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '')
  if (locale === defaultLocale) return clean ? `/${clean}` : '/'
  return clean ? `/${locale}/${clean}` : `/${locale}`
}

/** Strip a leading locale segment from a pathname, returning the bare route. */
export function routePath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  if (isLocale(segments[0])) segments.shift()
  return segments.join('/')
}
