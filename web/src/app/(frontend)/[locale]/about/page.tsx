import type { Metadata } from 'next'
import Link from 'next/link'

import { WayGrid } from '../../../../components/about/WayGrid'
import { ContentCard } from '../../../../components/content/ContentCard'
import { EventsPreview } from '../../../../components/events/EventsPreview'
import { Container } from '../../../../components/layout/Container'
import { LocationCards } from '../../../../components/locations/LocationCards'
import { CtaBand } from '../../../../components/sections/CtaBand'
import { localeHref } from '../../../../i18n/config'
import { getMessages } from '../../../../i18n/messages'
import { getEvents, getLocations, getPosts, getWayItems } from '../../../../lib/content'
import { alternates, resolveLocale } from '../../../../lib/routing'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const messages = getMessages(locale)

  return {
    title: messages.wayTitle,
    description: messages.aboutBody1,
    alternates: alternates(locale, 'about'),
  }
}

export default async function AboutPage({ params }: Props) {
  const locale = await resolveLocale(params)
  const messages = getMessages(locale)

  const [wayItems, locations, events, posts] = await Promise.all([
    getWayItems({ locale }),
    getLocations({ locale }),
    getEvents({ locale }),
    getPosts({ locale }),
  ])

  return (
    <>
      <Container className="max-w-7xl py-16">
        <div className="max-w-[760px]">
          <div className="font-condensed mb-2.5 text-sm font-semibold tracking-[4px] text-zr-green">
            {messages.wayKicker}
          </div>
          <h1 className="font-display text-5xl leading-tight font-bold text-white uppercase">
            {messages.wayTitle}
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-zr-text-secondary">
            {messages.wayIntro}
          </p>
        </div>

        <WayGrid items={wayItems} />

        <section className="mt-14 border-t border-white/7 pt-12">
          <h2 className="font-display mb-1.5 text-[30px] leading-none font-bold text-white uppercase">
            {messages.aboutTitle}
          </h2>
          <p className="mb-6 text-[13px] text-zr-text-faint">{messages.aboutClickHint}</p>
          <LocationCards locations={locations} messages={messages} variant="full" />
        </section>

        <section className="mt-14 border-t border-white/7 pt-12">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <div className="font-condensed mb-2 text-sm font-semibold tracking-[4px] text-zr-green">
                {messages.eventsKicker}
              </div>
              <h2 className="font-display text-[34px] leading-none font-bold text-white uppercase">
                {messages.eventsTitle}
              </h2>
            </div>
            <Link
              href={localeHref(locale, 'events')}
              className="font-condensed text-sm font-bold tracking-wide text-zr-green uppercase"
            >
              {messages.showMore} →
            </Link>
          </div>
          <EventsPreview events={events.slice(0, 3)} locale={locale} />
        </section>

        <section className="mt-14 border-t border-white/7 pt-12">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <div className="font-condensed mb-2 text-sm font-semibold tracking-[4px] text-zr-green">
                {messages.postsKicker}
              </div>
              <h2 className="font-display text-[34px] leading-none font-bold text-white uppercase">
                {messages.postsTitle}
              </h2>
            </div>
            <Link
              href={localeHref(locale, 'posts')}
              className="font-condensed text-sm font-bold tracking-wide text-zr-green uppercase"
            >
              {messages.showAllPosts} →
            </Link>
          </div>
          {posts.length > 0 ? (
            <div className="events-preview-grid grid grid-cols-3 gap-4">
              {posts.slice(0, 3).map((post) => (
                <ContentCard
                  key={post.slug}
                  href={localeHref(locale, `posts/${post.slug}`)}
                  kicker={post.date}
                  title={post.title}
                  excerpt={post.excerpt}
                  image={post.image}
                />
              ))}
            </div>
          ) : (
            <p className="text-zr-text-muted">—</p>
          )}
        </section>
      </Container>

      <Container className="max-w-7xl pb-16">
        <CtaBand messages={messages} />
      </Container>
    </>
  )
}
