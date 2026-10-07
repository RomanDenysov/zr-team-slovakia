import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { EventsPreview } from '../../../components/events/EventsPreview'
import { Container } from '../../../components/layout/Container'
import { Logo } from '../../../components/layout/Logo'
import { LocationCards } from '../../../components/locations/LocationCards'
import { PartnerButton, TrialButton } from '../../../components/modals/ModalTriggers'
import { PartnersGrid } from '../../../components/partners/PartnersGrid'
import { ScheduleBoard } from '../../../components/schedule/ScheduleBoard'
import { CtaBand } from '../../../components/sections/CtaBand'
import { localeHref } from '../../../i18n/config'
import { getMessages } from '../../../i18n/messages'
import {
  getClassTypes,
  getEvents,
  getHero,
  getLocations,
  getPartners,
  getSchedule,
} from '../../../lib/content'
import { alternates, resolveLocale } from '../../../lib/routing'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const hero = await getHero({ locale })

  return {
    title: 'Zé Radiola Team — Brazilian Jiu-Jitsu',
    description: hero.subtitle,
    alternates: alternates(locale),
  }
}

export default async function HomePage({ params }: Props) {
  const locale = await resolveLocale(params)
  const messages = getMessages(locale)

  const [hero, schedule, classTypes, locations, events, partners] = await Promise.all([
    getHero({ locale }),
    getSchedule({ locale }),
    getClassTypes({ locale }),
    getLocations({ locale }),
    getEvents({ locale }),
    getPartners(),
  ])

  return (
    <Container className="max-w-7xl pb-12 md:pb-16 lg:pb-20">
      <div className="hero-grid grid min-h-[520px] grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center py-20">
          <div className="font-condensed mb-4 text-[15px] font-semibold tracking-[5px] text-zr-green">
            {hero.kicker}
          </div>
          <h1 className="hero-title font-display text-[66px] leading-none font-bold text-white uppercase">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[490px] text-lg leading-relaxed text-zr-text-secondary">
            {hero.subtitle}
          </p>
          <div className="mt-9 flex gap-3.5">
            <TrialButton className="font-condensed cursor-pointer rounded bg-zr-green px-9 py-4 text-[17px] font-bold tracking-wider text-zr-bg uppercase">
              {messages.ctaTrial}
            </TrialButton>
            <Link
              href={localeHref(locale, 'schedule')}
              className="font-condensed rounded border border-white/25 px-9 py-4 text-[17px] font-semibold tracking-wider text-white uppercase"
            >
              {messages.ctaSchedule}
            </Link>
          </div>
          <div className="mt-12 flex gap-9">
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-[34px] font-bold text-zr-green">{stat.value}</div>
                <div className="text-[13px] tracking-wide text-zr-text-dim">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="ph relative flex items-end overflow-hidden bg-zr-bg-surface"
          style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)' }}
        >
          {hero.image ? (
            <Image
              src={hero.image.url}
              alt={hero.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
              className="object-cover"
            />
          ) : null}
          <Logo
            decorative
            className="absolute -right-[90px] -bottom-[60px] w-[380px] opacity-[0.08]"
            width={380}
            height={380}
          />
          {!hero.image ? (
            <span className="relative p-5 font-mono text-xs tracking-wide text-[#5a6a5d]">
              [ training / roll photo ]
            </span>
          ) : null}
        </div>
      </div>

      <section id="schedule" className="border-t border-white/7 py-16">
        <ScheduleBoard
          entries={schedule}
          classTypes={classTypes}
          locations={locations}
          messages={messages}
        />
      </section>

      <section className="border-t border-white/7 py-16">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <div className="font-condensed mb-2 text-sm font-semibold tracking-[4px] text-zr-green">
              {messages.eventsKicker}
            </div>
            <div className="font-display text-[34px] leading-none font-bold text-white uppercase">
              {messages.eventsTitle}
            </div>
          </div>
          <Link
            href={localeHref(locale, 'events')}
            className="font-condensed cursor-pointer text-sm font-bold tracking-wide text-zr-green uppercase"
          >
            {messages.showMore} →
          </Link>
        </div>
        <EventsPreview events={events.slice(0, 3)} locale={locale} />
      </section>

      <section className="border-t border-white/7 py-16">
        <div className="about-grid grid grid-cols-2 items-center gap-12">
          <div>
            <div className="font-condensed mb-2.5 text-sm font-semibold tracking-[4px] text-zr-green">
              {messages.aboutKicker}
            </div>
            <div className="font-display text-4xl leading-tight font-bold text-white uppercase">
              {messages.aboutTitle}
            </div>
            <p className="mt-5 text-base leading-relaxed text-zr-text-secondary">
              {messages.aboutBody1}
            </p>
            <Link
              href={localeHref(locale, 'about')}
              className="font-condensed mt-6 inline-block text-[15px] font-bold tracking-wider text-zr-green uppercase"
            >
              {messages.aboutTeaserCta} →
            </Link>
          </div>
          <LocationCards locations={locations} messages={messages} variant="teaser" />
        </div>
      </section>

      <section className="border-t border-white/7 py-16 text-center">
        <div className="font-condensed mb-2.5 text-sm font-semibold tracking-[4px] text-zr-green">
          {messages.sponsorsKicker}
        </div>
        <div className="font-display mb-2 text-[34px] leading-none font-bold text-white uppercase">
          {messages.sponsorsTitle}
        </div>
        <p className="mx-auto mb-8 max-w-[520px] text-[15px] text-zr-text-muted">
          {messages.partnersTeaserSub}
        </p>
        <PartnersGrid partners={partners} count={4} />
        <PartnerButton className="font-condensed mt-8 inline-block cursor-pointer rounded bg-zr-green px-10 py-4 text-base font-bold tracking-wider text-zr-bg uppercase">
          {messages.becomePartner}
        </PartnerButton>
      </section>

      <CtaBand messages={messages} />
    </Container>
  )
}
