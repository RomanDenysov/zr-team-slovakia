import type { Metadata } from 'next'

import { Container } from '../../../../components/layout/Container'
import { ScheduleBoard } from '../../../../components/schedule/ScheduleBoard'
import { getMessages } from '../../../../i18n/messages'
import { getClassTypes, getLocations, getSchedule } from '../../../../lib/content'
import { alternates, resolveLocale } from '../../../../lib/routing'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const messages = getMessages(locale)

  return {
    title: messages.schedTitle,
    alternates: alternates(locale, 'schedule'),
  }
}

export default async function SchedulePage({ params }: Props) {
  const locale = await resolveLocale(params)
  const messages = getMessages(locale)

  const [schedule, classTypes, locations] = await Promise.all([
    getSchedule({ locale }),
    getClassTypes({ locale }),
    getLocations({ locale }),
  ])

  return (
    <Container className="max-w-7xl py-16">
      <ScheduleBoard
        entries={schedule}
        classTypes={classTypes}
        locations={locations}
        messages={messages}
        titleSize="xl"
      />
    </Container>
  )
}
