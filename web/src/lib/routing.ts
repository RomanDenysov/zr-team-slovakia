import { notFound } from 'next/navigation'
import { htmlLang, isLocale, localeHref, locales, defaultLocale, type Locale } from '../i18n/config'

export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return locale
}

/** Canonical URL plus the hreflang set for one route, in every language. */
export function alternates(locale: Locale, path = '') {
  return {
    canonical: localeHref(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((item) => [htmlLang[item], localeHref(item, path)])),
      'x-default': localeHref(defaultLocale, path),
    },
  }
}
