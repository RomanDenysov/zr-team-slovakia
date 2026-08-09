import type { Metadata } from 'next'

import { EventsTimeline } from '../../../../components/events/EventsTimeline'
import { RecurringList } from '../../../../components/events/RecurringList'
import { Container } from '../../../../components/layout/Container'
import { getMessages } from '../../../../i18n/messages'
import { getEvents, getRecurringEvents } from '../../../../lib/content'
import { alternates, resolveLocale } from '../../../../lib/routing'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const messages = getMessages(locale)

  return {
    title: messages.eventsTitle,
    description: messages.eventsLead,
    alternates: alternates(locale, 'events'),
  }
}

export default async function EventsPage({ params }: Props) {
  const locale = await resolveLocale(params)
  const messages = getMessages(locale)

  const [events, recurring] = await Promise.all([
    getEvents({ locale }),
    getRecurringEvents({ locale }),
  ])

  return (
    <Container className="max-w-7xl py-16">
      <div className="font-condensed mb-2.5 text-sm font-semibold tracking-[4px] text-zr-green">
        {messages.eventsKicker}
      </div>
      <h1 className="font-display mb-2 text-5xl leading-none font-bold text-white uppercase">
        {messages.eventsTitle}
      </h1>
      <p className="mb-12 max-w-[560px] text-base text-zr-text-muted">{messages.eventsLead}</p>

      <div className="events-page-grid grid grid-cols-[300px_1fr] items-start gap-12">
        <aside className="sticky top-[90px] rounded-[10px] border border-white/7 bg-zr-bg-card p-6">
          <div className="font-display text-lg font-semibold tracking-wide text-white uppercase">
            {messages.recurringTitle}
          </div>
          <p className="mt-1.5 mb-4 text-[13px] leading-relaxed text-zr-text-dim">
            {messages.recurringSub}
          </p>
          <RecurringList items={recurring} />
        </aside>

        <EventsTimeline events={events} locale={locale} />
      </div>
    </Container>
  )
}
