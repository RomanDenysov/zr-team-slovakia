import type { MetadataRoute } from 'next'
import { defaultLocale, htmlLang, localeHref, locales } from '../i18n/config'
import { getEventSlugs, getPageSlugs, getPostSlugs } from '../lib/content'
import { RESERVED_SLUGS } from '../collections/Pages'

const STATIC_ROUTES = ['', 'schedule', 'events', 'posts', 'about', 'partners']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000').replace(/\/$/, '')

  const [eventSlugs, postSlugs, pageSlugs] = await Promise.all([
    getEventSlugs(),
    getPostSlugs(),
    getPageSlugs(),
  ])

  const routes = [
    ...STATIC_ROUTES,
    ...eventSlugs.map((slug) => `events/${slug}`),
    ...postSlugs.map((slug) => `posts/${slug}`),
    ...pageSlugs.filter((slug) => !RESERVED_SLUGS.includes(slug)),
  ]

  return routes.map((route) => ({
    url: `${base}${localeHref(defaultLocale, route)}`,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [htmlLang[locale], `${base}${localeHref(locale, route)}`]),
      ),
    },
  }))
}
