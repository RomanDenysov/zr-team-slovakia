import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RichText } from '../../../../components/content/RichText'
import { Container } from '../../../../components/layout/Container'
import { localeHref, locales } from '../../../../i18n/config'
import { RESERVED_SLUGS } from '../../../../collections/Pages'
import { getPage, getPageSlugs } from '../../../../lib/content'
import { alternates, resolveLocale } from '../../../../lib/routing'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  const slugs = (await getPageSlugs()).filter((slug) => !RESERVED_SLUGS.includes(slug))
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const locale = await resolveLocale(params)
  const page = await getPage(slug, { locale })
  if (!page) return {}

  return {
    title: page.title,
    description: page.excerpt || undefined,
    alternates: alternates(locale, slug),
  }
}

export default async function GenericPage({ params }: Props) {
  const { slug } = await params
  const locale = await resolveLocale(params)

  if (RESERVED_SLUGS.includes(slug)) notFound()

  const page = await getPage(slug, { locale })
  if (!page) notFound()

  return (
    <Container className="max-w-3xl py-16">
      <Link
        href={localeHref(locale, '')}
        className="font-condensed text-sm font-bold tracking-wide text-zr-green uppercase hover:underline"
      >
        ← Home
      </Link>
      <article className="mt-8">
        <h1 className="font-display text-4xl leading-tight font-bold text-white uppercase">
          {page.title}
        </h1>
        {page.excerpt ? (
          <p className="mt-4 text-lg leading-relaxed text-zr-text-secondary">{page.excerpt}</p>
        ) : null}
        <RichText data={page.body} />
      </article>
    </Container>
  )
}
