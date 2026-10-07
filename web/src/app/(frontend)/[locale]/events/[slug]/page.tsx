import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '../../../../../components/layout/Container'
import { RichText } from '../../../../../components/content/RichText'
import { localeHref, locales } from '../../../../../i18n/config'
import { getMessages } from '../../../../../i18n/messages'
import { getEvent, getEventSlugs } from '../../../../../lib/content'
import { alternates, resolveLocale } from '../../../../../lib/routing'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  const slugs = await getEventSlugs()
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const locale = await resolveLocale(params)
  const event = await getEvent(slug, { locale })
  if (!event) return {}

  return {
    title: event.title,
    description: event.desc,
    alternates: alternates(locale, `events/${slug}`),
    openGraph: event.image ? { images: [{ url: event.image.url }] } : undefined,
  }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const locale = await resolveLocale(params)
  const messages = getMessages(locale)
  const event = await getEvent(slug, { locale })

  if (!event) notFound()

  return (
    <Container className="max-w-3xl py-16">
      <Link
        href={localeHref(locale, 'events')}
        className="font-condensed text-sm font-bold tracking-wide text-zr-green uppercase hover:underline"
      >
        ← {messages.eventsTitle}
      </Link>
      <article className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-condensed rounded bg-zr-green px-2.5 py-1 text-xs font-bold tracking-wide text-zr-bg">
            {event.tag}
          </span>
          <span className="font-condensed text-[13px] font-bold tracking-wide text-zr-green">
            {event.date}
          </span>
        </div>
        <h1 className="font-display mt-4 text-4xl leading-tight font-bold text-white uppercase">
          {event.title}
        </h1>
        <div className="mt-3 flex items-center gap-2 text-zr-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-zr-green" aria-hidden="true" />
          <span className="text-[14px] font-semibold">{event.place}</span>
        </div>
        {event.image ? (
          <Image
            src={event.image.url}
            alt={event.image.alt}
            width={event.image.width}
            height={event.image.height}
            sizes="(max-width: 768px) 100vw, 768px"
            className="mt-6 aspect-video w-full rounded-lg object-cover"
          />
        ) : null}
        <p className="mt-5 text-lg leading-relaxed text-zr-text-secondary">{event.desc}</p>
        {event.registrationUrl ? (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-condensed mt-6 inline-block rounded bg-zr-green px-8 py-3.5 text-[15px] font-bold tracking-wider text-zr-bg uppercase"
          >
            {messages.eventRegister}
          </a>
        ) : null}
        <RichText data={event.body} />
      </article>
    </Container>
  )
}
