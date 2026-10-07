import { cache } from 'react'
import type { Locale } from '../i18n/config'
import { getMessages, type Messages } from '../i18n/messages'
import type {
  About as AboutGlobal,
  ClassType,
  Event as EventDoc,
  Location as LocationDoc,
  Page as PageDoc,
  Partner as PartnerDoc,
  Post as PostDoc,
  RecurringEvent as RecurringDoc,
  Schedule as ScheduleDoc,
  Setting,
} from '../payload-types'
import { formatEventDate, formatPostDate } from './format'
import { imageView, type ImageView } from './media'
import { getPayloadClient } from './payload'

/** Payload returns every localized field already resolved for this locale. */
type Query = { locale: Locale }

// ---------------------------------------------------------------- view models

export interface HeroView {
  kicker: string
  title: string
  subtitle: string
  image: ImageView | null
  stats: { value: string; label: string }[]
}

export interface EventListItem {
  slug: string
  tag: string
  date: string
  title: string
  desc: string
  place: string
  image: ImageView | null
}

export interface EventDetail extends EventListItem {
  body: PostDoc['body']
  registrationUrl: string | null
}

export interface RecurringView {
  id: number
  day: string
  time: string
  title: string
  place: string
}

export interface PostListItem {
  slug: string
  title: string
  excerpt: string
  date: string
  image: ImageView | null
}

export interface PostDetail extends PostListItem {
  body: PostDoc['body']
}

export interface PageView {
  slug: string
  title: string
  excerpt: string
  body: PageDoc['body']
}

export interface ClassTypeView {
  name: string
  color: string
  description: string
}

export interface ScheduleView {
  id: number
  dayIndex: number
  start: string
  end: string
  type: string
  color: string
  level: string
  coach: string
  locationCode: string
  locationName: string
}

export interface LocationView {
  code: string
  city: string
  badge: string
  address: string
  phone: string
  email: string
  description: string
  amenities: string[]
}

export interface PartnerView {
  id: number
  name: string
  url: string | null
  logo: ImageView | null
}

export interface WayItem {
  title: string
  body: string
}

// ------------------------------------------------------------------- helpers

function relation<T extends { id: number }>(value: number | T | null | undefined): T | null {
  return typeof value === 'object' && value !== null ? value : null
}

function dayNumber(value: string | null | undefined): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

// -------------------------------------------------------------------- globals

export const getSettings = cache(async ({ locale }: Query): Promise<Setting> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'settings', locale, depth: 1 })
})

export async function getHero({ locale }: Query): Promise<HeroView> {
  const messages = getMessages(locale)
  const settings = await getSettings({ locale })
  const hero = settings.hero

  const fallbackStats = [
    { value: '2', label: messages.statAcademies },
    { value: '20+', label: messages.statClasses },
    { value: 'IBJJF', label: messages.statLineage },
  ]

  const stats =
    hero?.stats?.filter((stat) => stat.value && stat.label).map((stat) => ({
      value: stat.value,
      label: stat.label,
    })) ?? []

  const title = hero?.title || messages.heroTitle

  return {
    kicker: hero?.kicker || messages.heroKicker,
    title,
    subtitle: hero?.subtitle || messages.heroSub,
    image: imageView(hero?.image, 'hero', title),
    stats: stats.length > 0 ? stats : fallbackStats,
  }
}

export const getWayItems = cache(async ({ locale }: Query): Promise<WayItem[]> => {
  const payload = await getPayloadClient()
  const about: AboutGlobal = await payload.findGlobal({ slug: 'about', locale, depth: 0 })
  return (about.wayItems ?? []).map((item) => ({ title: item.title, body: item.body }))
})

// ---------------------------------------------------------------------- club

export const getLocations = cache(async ({ locale }: Query): Promise<LocationView[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'locations',
    locale,
    depth: 0,
    limit: 50,
    sort: 'order',
  })

  return docs.map((doc: LocationDoc) => ({
    code: doc.code,
    city: doc.city,
    badge: doc.badge,
    address: doc.address,
    phone: doc.phone,
    email: doc.email,
    description: doc.description,
    amenities: (doc.amenities ?? []).map((item) => item.label),
  }))
})

export const getClassTypes = cache(async ({ locale }: Query): Promise<ClassTypeView[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'class-types',
    locale,
    depth: 0,
    limit: 50,
    sort: 'order',
  })

  return docs.map((doc: ClassType) => ({
    name: doc.name,
    color: doc.color,
    description: doc.description,
  }))
})

export const getSchedule = cache(async ({ locale }: Query): Promise<ScheduleView[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'schedule',
    locale,
    depth: 1,
    limit: 200,
    sort: ['dayIndex', 'startTime'],
  })

  return docs
    .map((doc: ScheduleDoc): ScheduleView | null => {
      const type = relation<ClassType>(doc.classType)
      const location = relation<LocationDoc>(doc.location)
      if (!type || !location) return null

      return {
        id: doc.id,
        dayIndex: dayNumber(doc.dayIndex),
        start: doc.startTime,
        end: doc.endTime,
        type: type.name,
        color: type.color,
        level: doc.level,
        coach: doc.coach,
        locationCode: location.code,
        locationName: location.city,
      }
    })
    .filter((entry): entry is ScheduleView => entry !== null)
})

export const getPartners = cache(async (): Promise<PartnerView[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'partners',
    depth: 1,
    limit: 50,
    sort: 'order',
  })

  return docs.map((doc: PartnerDoc) => ({
    id: doc.id,
    name: doc.name,
    url: doc.url ?? null,
    logo: imageView(doc.logo, 'card', doc.name),
  }))
})

// -------------------------------------------------------------------- events

function toEventListItem(doc: EventDoc, locale: Locale, messages: Messages): EventListItem {
  return {
    slug: doc.slug,
    tag: messages.eventTypes[doc.eventType] ?? doc.eventType,
    date: formatEventDate(doc.startDate, doc.endDate, locale, messages),
    title: doc.title,
    desc: doc.description,
    place: doc.place,
    image: imageView(doc.coverImage, 'card', doc.title),
  }
}

export const getEvents = cache(async ({ locale }: Query): Promise<EventListItem[]> => {
  const payload = await getPayloadClient()
  const messages = getMessages(locale)
  const { docs } = await payload.find({
    collection: 'events',
    locale,
    depth: 1,
    limit: 100,
    sort: 'startDate',
  })

  return docs.map((doc: EventDoc) => toEventListItem(doc, locale, messages))
})

export async function getEvent(slug: string, { locale }: Query): Promise<EventDetail | null> {
  const payload = await getPayloadClient()
  const messages = getMessages(locale)
  const { docs } = await payload.find({
    collection: 'events',
    locale,
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  })

  const doc = docs[0]
  if (!doc) return null

  return {
    ...toEventListItem(doc, locale, messages),
    image: imageView(doc.coverImage, 'cover', doc.title),
    body: doc.body,
    registrationUrl: doc.registrationUrl ?? null,
  }
}

export const getRecurringEvents = cache(async ({ locale }: Query): Promise<RecurringView[]> => {
  const payload = await getPayloadClient()
  const messages = getMessages(locale)
  const { docs } = await payload.find({
    collection: 'recurring-events',
    locale,
    depth: 0,
    limit: 100,
    sort: ['dayIndex', 'time'],
  })

  return docs.map((doc: RecurringDoc) => ({
    id: doc.id,
    day: messages.weekdays[dayNumber(doc.dayIndex)] ?? '',
    time: doc.time,
    title: doc.title,
    place: doc.place,
  }))
})

// --------------------------------------------------------------------- posts

function toPostListItem(doc: PostDoc, locale: Locale): PostListItem {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    date: formatPostDate(doc.publishedAt, locale),
    image: imageView(doc.coverImage, 'card', doc.title),
  }
}

export const getPosts = cache(async ({ locale }: Query): Promise<PostListItem[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    locale,
    depth: 1,
    limit: 100,
    sort: '-publishedAt',
  })

  return docs.map((doc: PostDoc) => toPostListItem(doc, locale))
})

export async function getPost(slug: string, { locale }: Query): Promise<PostDetail | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    locale,
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  })

  const doc = docs[0]
  if (!doc) return null

  return {
    ...toPostListItem(doc, locale),
    image: imageView(doc.coverImage, 'cover', doc.title),
    body: doc.body,
  }
}

// --------------------------------------------------------------------- pages

export async function getPage(slug: string, { locale }: Query): Promise<PageView | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    locale,
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  })

  const doc = docs[0]
  if (!doc) return null

  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt ?? '',
    body: doc.body,
  }
}

// ------------------------------------------------------- static path helpers

async function slugsOf(collection: 'events' | 'posts' | 'pages'): Promise<string[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection,
    depth: 0,
    limit: 500,
    pagination: false,
    select: { slug: true },
  })

  return docs.map((doc) => doc.slug).filter((slug): slug is string => Boolean(slug))
}

export const getEventSlugs = cache(() => slugsOf('events'))
export const getPostSlugs = cache(() => slugsOf('posts'))
export const getPageSlugs = cache(() => slugsOf('pages'))
