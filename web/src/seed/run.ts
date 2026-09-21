import config from '@payload-config'
import { getPayload, type Payload, type Where } from 'payload'
import { locales, type Locale } from '../i18n/config'
import {
  classTypes,
  events,
  locations,
  posts,
  recurringEvents,
  schedule,
  settings,
  wayItems,
  type L,
} from './data'

/** Minimal Lexical document — the seed content is plain paragraphs. */
function richText(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        textFormat: 0,
        textStyle: '',
        children: [
          {
            type: 'text',
            text,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            version: 1,
          },
        ],
      })),
    },
  }
}

type Collection = Parameters<Payload['create']>[0]['collection']

/**
 * Create-or-update one document in all three locales. Payload writes one
 * locale per request, so the Slovak version is written first and the other
 * two are layered on top.
 */
async function upsert(
  payload: Payload,
  collection: Collection,
  where: Where,
  dataFor: (locale: Locale) => Record<string, unknown>,
): Promise<number> {
  const existing = await payload.find({ collection, where, limit: 1, depth: 0 })
  let id = existing.docs[0]?.id as number | undefined

  if (id === undefined) {
    const created = await payload.create({
      collection,
      locale: 'sk',
      data: dataFor('sk') as never,
    })
    id = created.id as number
  }

  for (const locale of locales) {
    await payload.update({
      collection,
      id,
      locale,
      data: dataFor(locale) as never,
    })
  }

  return id
}

function pick<T>(value: L<T>, locale: Locale): T {
  return value[locale]
}

async function seed() {
  const payload = await getPayload({ config })

  // ---------------------------------------------------------------- class types
  const classTypeIds = new Map<string, number>()
  for (const type of classTypes) {
    const id = await upsert(payload, 'class-types', { name: { equals: type.name } }, (locale) => ({
      name: type.name,
      color: type.color,
      order: type.order,
      description: pick(type.description, locale),
    }))
    classTypeIds.set(type.name, id)
  }
  payload.logger.info(`✓ ${classTypes.length} class types`)

  // ----------------------------------------------------------------- locations
  const locationIds = new Map<string, number>()
  for (const location of locations) {
    const id = await upsert(payload, 'locations', { code: { equals: location.code } }, (locale) => ({
      code: location.code,
      order: location.order,
      phone: location.phone,
      email: location.email,
      city: pick(location.city, locale),
      badge: pick(location.badge, locale),
      address: pick(location.address, locale),
      description: pick(location.description, locale),
      amenities: pick(location.amenities, locale).map((label) => ({ label })),
    }))
    locationIds.set(location.code, id)
  }
  payload.logger.info(`✓ ${locations.length} academies`)

  // ------------------------------------------------------------------ schedule
  for (const entry of schedule) {
    const classType = classTypeIds.get(entry.classType)
    const location = locationIds.get(entry.location)
    if (!classType || !location) continue

    await upsert(
      payload,
      'schedule',
      {
        and: [
          { dayIndex: { equals: String(entry.dayIndex) } },
          { startTime: { equals: entry.startTime } },
          { location: { equals: location } },
          { classType: { equals: classType } },
        ],
      },
      () => ({
        dayIndex: String(entry.dayIndex),
        startTime: entry.startTime,
        endTime: entry.endTime,
        classType,
        level: entry.level,
        coach: entry.coach,
        location,
      }),
    )
  }
  payload.logger.info(`✓ ${schedule.length} schedule entries`)

  // ---------------------------------------------------------- recurring events
  for (const item of recurringEvents) {
    await upsert(
      payload,
      'recurring-events',
      {
        and: [
          { dayIndex: { equals: String(item.dayIndex) } },
          { time: { equals: item.time } },
        ],
      },
      (locale) => ({
        dayIndex: String(item.dayIndex),
        time: item.time,
        title: pick(item.title, locale),
        place: pick(item.place, locale),
      }),
    )
  }
  payload.logger.info(`✓ ${recurringEvents.length} recurring events`)

  // -------------------------------------------------------------------- events
  for (const event of events) {
    await upsert(payload, 'events', { slug: { equals: event.slug } }, (locale) => ({
      slug: event.slug,
      eventType: event.eventType,
      startDate: event.startDate,
      endDate: event.endDate ?? null,
      title: pick(event.title, locale),
      description: pick(event.description, locale),
      place: pick(event.place, locale),
      body: richText(pick(event.body, locale)),
    }))
  }
  payload.logger.info(`✓ ${events.length} events`)

  // --------------------------------------------------------------------- posts
  for (const post of posts) {
    await upsert(payload, 'posts', { slug: { equals: post.slug } }, (locale) => ({
      slug: post.slug,
      publishedAt: post.publishedAt,
      title: pick(post.title, locale),
      excerpt: pick(post.excerpt, locale),
      body: richText(pick(post.body, locale)),
    }))
  }
  payload.logger.info(`✓ ${posts.length} posts`)

  // ------------------------------------------------------------------- globals
  for (const locale of locales) {
    await payload.updateGlobal({
      slug: 'settings',
      locale,
      data: {
        title: settings.title,
        description: pick(settings.description, locale),
        hero: {
          kicker: pick(settings.hero.kicker, locale),
          title: pick(settings.hero.title, locale),
          subtitle: pick(settings.hero.subtitle, locale),
          stats: settings.hero.stats.map((stat) => ({
            value: stat.value,
            label: pick(stat.label, locale),
          })),
        },
      },
    })

    await payload.updateGlobal({
      slug: 'about',
      locale,
      data: {
        wayItems: wayItems.map((item) => ({
          title: pick(item.title, locale),
          body: pick(item.body, locale),
        })),
      },
    })
  }
  payload.logger.info('✓ site settings and about page')

  // -------------------------------------------------------------- first editor
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  if (email && password) {
    const existing = await payload.find({ collection: 'users', limit: 1 })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'users', data: { email, password } })
      payload.logger.info(`✓ admin user ${email}`)
    }
  }

  payload.logger.info('Seed complete.')
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
