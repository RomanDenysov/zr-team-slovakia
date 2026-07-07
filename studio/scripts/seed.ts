import {createClient, type SanityClient} from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? '7wvqvm3e'
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'

function getClient(): SanityClient {
  const token = process.env.SANITY_API_WRITE_TOKEN

  if (token) {
    return createClient({
      projectId,
      dataset,
      token,
      apiVersion: '2025-01-01',
      useCdn: false,
    })
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const {getCliClient} = require('sanity/cli') as typeof import('sanity/cli')
    return getCliClient({apiVersion: '2025-01-01'})
  } catch {
    console.error(
      'Missing write access. Either set SANITY_API_WRITE_TOKEN or run:\n  pnpm exec sanity exec scripts/seed.ts --with-user-token',
    )
    process.exit(1)
  }
}

type LocalizedString = {sk: string; en: string; ua: string}
type LocalizedText = {sk: string; en: string; ua: string}

const events = [
  {
    _id: 'event-seminar-leg-lock-2026',
    _type: 'event' as const,
    eventType: 'seminar' as const,
    startDate: '2026-07-12',
    title: {
      sk: 'Leg Lock seminár',
      en: 'Leg Lock Seminar',
      ua: 'Семінар Leg Lock',
    } satisfies LocalizedString,
    description: {
      sk: 'Celodenný seminár zameraný na nožné páky s hosťujúcim trénerom.',
      en: 'Full-day seminar focused on leg locks with a guest instructor.',
      ua: 'Цілоденний семінар із ножних замків із запрошеним тренером.',
    } satisfies LocalizedText,
    place: {
      sk: 'Košice',
      en: 'Košice',
      ua: 'Кошице',
    } satisfies LocalizedString,
  },
  {
    _id: 'event-tournament-zr-open-2026',
    _type: 'event' as const,
    eventType: 'tournament' as const,
    startDate: '2026-08-24',
    title: {
      sk: 'ZR Open 2026',
      en: 'ZR Open 2026',
      ua: 'ZR Open 2026',
    } satisfies LocalizedString,
    description: {
      sk: 'Domáci turnaj Gi & No-Gi pre všetky úrovne a vekové kategórie.',
      en: 'Home Gi & No-Gi tournament for all levels and age groups.',
      ua: 'Домашній турнір Gi та No-Gi для всіх рівнів і вікових груп.',
    } satisfies LocalizedText,
    place: {
      sk: 'Bratislava',
      en: 'Bratislava',
      ua: 'Братислава',
    } satisfies LocalizedString,
  },
  {
    _id: 'event-workshop-self-defense-2026',
    _type: 'event' as const,
    eventType: 'workshop' as const,
    startDate: '2026-09-05',
    title: {
      sk: 'Obrana proti útoku',
      en: 'Self-defense basics',
      ua: 'Основи самозахисту',
    } satisfies LocalizedString,
    description: {
      sk: 'Praktický workshop sebaobrany pre začiatočníkov aj verejnosť.',
      en: 'Hands-on self-defense workshop for beginners and the public.',
      ua: 'Практичний воркшоп із самозахисту для початківців і всіх охочих.',
    } satisfies LocalizedText,
    place: {
      sk: 'Košice',
      en: 'Košice',
      ua: 'Кошице',
    } satisfies LocalizedString,
  },
  {
    _id: 'event-camp-autumn-bjj-2026',
    _type: 'event' as const,
    eventType: 'camp' as const,
    startDate: '2026-10-10',
    endDate: '2026-10-12',
    title: {
      sk: 'Jesenný BJJ kemp',
      en: 'Autumn BJJ camp',
      ua: 'Осінній BJJ kemp',
    } satisfies LocalizedString,
    description: {
      sk: 'Víkendový kemp s trénermi oboch akadémií v horskom prostredí.',
      en: 'Weekend camp with coaches from both academies in the mountains.',
      ua: 'Вікенд-кемп із тренерами обох академій у горах.',
    } satisfies LocalizedText,
    place: {
      sk: 'Vysoké Tatry',
      en: 'High Tatras',
      ua: 'Високі Татри',
    } satisfies LocalizedString,
  },
]

const recurringEvents = [
  {
    _id: 'recurring-open-mat-kosice',
    _type: 'recurringEvent' as const,
    dayOfWeek: 6,
    time: '10:00',
    title: {
      sk: 'Open Mat — Košice',
      en: 'Open Mat — Košice',
      ua: 'Open Mat — Кошице',
    } satisfies LocalizedString,
    place: {
      sk: 'Košice',
      en: 'Košice',
      ua: 'Кошице',
    } satisfies LocalizedString,
  },
  {
    _id: 'recurring-open-mat-bratislava',
    _type: 'recurringEvent' as const,
    dayOfWeek: 0,
    time: '10:30',
    title: {
      sk: 'Open Mat — Bratislava',
      en: 'Open Mat — Bratislava',
      ua: 'Open Mat — Братислава',
    } satisfies LocalizedString,
    place: {
      sk: 'Bratislava',
      en: 'Bratislava',
      ua: 'Братислава',
    } satisfies LocalizedString,
  },
]

type ScheduleSeed = {
  _id: string
  dayIndex: number
  startTime: string
  endTime: string
  classType: 'Gi' | 'No-Gi' | 'Kids' | 'Open Mat'
  level: 'all' | 'beg' | 'adv' | 'kids'
  coach: string
  location: 'KE' | 'BA'
}

const scheduleEntries: ScheduleSeed[] = [
  {dayIndex: 0, startTime: '18:00', endTime: '19:30', classType: 'Gi', level: 'all', coach: 'José R.', location: 'KE'},
  {dayIndex: 0, startTime: '19:30', endTime: '20:30', classType: 'Open Mat', level: 'all', coach: '—', location: 'KE'},
  {dayIndex: 1, startTime: '17:00', endTime: '18:00', classType: 'Kids', level: 'kids', coach: 'Marek H.', location: 'KE'},
  {dayIndex: 1, startTime: '18:00', endTime: '19:30', classType: 'No-Gi', level: 'all', coach: 'José R.', location: 'KE'},
  {dayIndex: 2, startTime: '18:00', endTime: '19:30', classType: 'Gi', level: 'beg', coach: 'Tomáš V.', location: 'KE'},
  {dayIndex: 2, startTime: '19:30', endTime: '21:00', classType: 'Gi', level: 'adv', coach: 'José R.', location: 'KE'},
  {dayIndex: 3, startTime: '17:00', endTime: '18:00', classType: 'Kids', level: 'kids', coach: 'Marek H.', location: 'KE'},
  {dayIndex: 3, startTime: '18:30', endTime: '20:00', classType: 'No-Gi', level: 'adv', coach: 'José R.', location: 'KE'},
  {dayIndex: 4, startTime: '18:00', endTime: '19:30', classType: 'Gi', level: 'all', coach: 'Tomáš V.', location: 'KE'},
  {dayIndex: 5, startTime: '10:00', endTime: '11:30', classType: 'Open Mat', level: 'all', coach: '—', location: 'KE'},
  {dayIndex: 0, startTime: '17:30', endTime: '18:30', classType: 'Kids', level: 'kids', coach: 'Lucia B.', location: 'BA'},
  {dayIndex: 0, startTime: '18:30', endTime: '20:00', classType: 'Gi', level: 'all', coach: 'Pavol K.', location: 'BA'},
  {dayIndex: 1, startTime: '18:00', endTime: '19:30', classType: 'No-Gi', level: 'all', coach: 'Pavol K.', location: 'BA'},
  {dayIndex: 2, startTime: '17:30', endTime: '18:30', classType: 'Kids', level: 'kids', coach: 'Lucia B.', location: 'BA'},
  {dayIndex: 2, startTime: '18:30', endTime: '20:00', classType: 'Gi', level: 'beg', coach: 'Daniel S.', location: 'BA'},
  {dayIndex: 3, startTime: '18:30', endTime: '20:00', classType: 'No-Gi', level: 'adv', coach: 'Pavol K.', location: 'BA'},
  {dayIndex: 4, startTime: '18:00', endTime: '19:30', classType: 'Gi', level: 'all', coach: 'Pavol K.', location: 'BA'},
  {dayIndex: 4, startTime: '19:30', endTime: '20:30', classType: 'Open Mat', level: 'all', coach: '—', location: 'BA'},
  {dayIndex: 6, startTime: '10:30', endTime: '12:00', classType: 'Open Mat', level: 'all', coach: '—', location: 'BA'},
].map((entry) => ({
  ...entry,
  _id: `schedule-${entry.location.toLowerCase()}-d${entry.dayIndex}-${entry.startTime.replace(':', '')}-${entry.classType.toLowerCase().replace(/\s+/g, '-')}`,
}))

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings' as const,
  title: 'Zé Radiola Team',
  description: 'Brazilian Jiu-Jitsu in Košice and Bratislava. Two academies, one team.',
  hero: {
    kicker: {
      sk: 'KOŠICE · BRATISLAVA',
      en: 'KOŠICE · BRATISLAVA',
      ua: 'KOŠICE · BRATISLAVA',
    } satisfies LocalizedString,
    title: {
      sk: 'Brazílske jiu-jitsu v Košiciach a Bratislave',
      en: 'Brazilian Jiu-Jitsu in Košice & Bratislava',
      ua: 'Бразильське джиу-джитсу в Кошице та Братиславі',
    } satisfies LocalizedString,
    subtitle: {
      sk: 'Tréningy pre každú úroveň, vedené skúsenými trénermi. Dve akadémie, jeden tím — pridaj sa k ZRTeam.',
      en: 'Classes for every level, led by experienced coaches. Two academies, one team — join ZRTeam.',
      ua: 'Заняття для будь-якого рівня під керівництвом досвідчених тренерів. Дві академії, одна команда — приєднуйся до ZRTeam.',
    } satisfies LocalizedText,
    stats: [
      {
        _key: 'stat-academies',
        value: '2',
        label: {sk: 'AKADÉMIE', en: 'ACADEMIES', ua: 'АКАДЕМІЇ'} satisfies LocalizedString,
      },
      {
        _key: 'stat-classes',
        value: '20+',
        label: {
          sk: 'TRÉNINGOV / TÝŽDEŇ',
          en: 'CLASSES / WEEK',
          ua: 'ЗАНЯТЬ / ТИЖДЕНЬ',
        } satisfies LocalizedString,
      },
      {
        _key: 'stat-lineage',
        value: 'IBJJF',
        label: {sk: 'PÔVOD', en: 'LINEAGE', ua: 'ПОХОДЖЕННЯ'} satisfies LocalizedString,
      },
    ],
  },
}

async function upsertDocuments(client: SanityClient, docs: Array<Record<string, unknown>>) {
  const transaction = client.transaction()
  for (const doc of docs) {
    transaction.createOrReplace(doc)
  }
  await transaction.commit()
}

async function seed() {
  const client = getClient()
  console.log(`Seeding ${dataset} on project ${projectId}…`)

  await upsertDocuments(client, events)
  console.log(`✓ ${events.length} events`)

  await upsertDocuments(client, recurringEvents)
  console.log(`✓ ${recurringEvents.length} recurring events`)

  await upsertDocuments(
    client,
    scheduleEntries.map((entry) => ({
      _type: 'scheduleEntry',
      ...entry,
    })),
  )
  console.log(`✓ ${scheduleEntries.length} schedule entries`)

  await upsertDocuments(client, [siteSettings])
  console.log('✓ site settings with hero content')

  console.log('Done.')
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
