import { sanityClient } from 'sanity:client';
import { defineQuery } from 'groq';
import type { Lang } from '../../i18n/translations';
import { langs } from '../../i18n/translations';
import type {
	EventItem,
	EventType,
	EventsClientData,
	LocalizedString,
	RecurringEventItem,
} from '../../types/events';
import { EVENT_TYPE_LABELS, WEEKDAY_LABELS } from '../../types/events';
import { pickLocalized, pickLocalizedBlocks, type LocalizedBlocks } from './localized';
import {
	coverImageProjection,
	mapCardImage,
	mapCoverImage,
	type SanityContentImage,
} from './contentImage';
import type { PortableTextBlock } from '@portabletext/types';

const EVENTS_QUERY = defineQuery(
	`*[_type == "event" && defined(slug.current)] | order(startDate asc){
    "slug": slug.current,
    eventType,
    startDate,
    endDate,
    title,
    description,
    place,
    ${coverImageProjection}
  }`,
);

const EVENT_QUERY = defineQuery(
	`*[_type == "event" && slug.current == $slug][0]{
    "slug": slug.current,
    eventType,
    startDate,
    endDate,
    title,
    description,
    body,
    place,
    registrationUrl,
    ${coverImageProjection}
  }`,
);

const EVENT_PATHS_QUERY = defineQuery(
	`*[_type == "event" && defined(slug.current)]{
    "slug": slug.current
  }`,
);

const RECURRING_EVENTS_QUERY = defineQuery(
	`*[_type == "recurringEvent"] | order(dayOfWeek asc, time asc){
    title,
    dayOfWeek,
    time,
    place
  }`,
);

interface SanityEvent {
	slug: string;
	eventType: EventType;
	startDate: string;
	endDate: string | null;
	title: LocalizedString | null;
	description: LocalizedString | null;
	body?: LocalizedBlocks | null;
	place: LocalizedString | null;
	coverImage?: SanityContentImage | null;
	registrationUrl?: string | null;
}

interface SanityRecurringEvent {
	title: LocalizedString | null;
	dayOfWeek: number;
	time: string;
	place: LocalizedString | null;
}

const MONTHS: Record<Lang, string[]> = {
	SK: [
		'JAN',
		'FEB',
		'MAR',
		'APR',
		'MÁJ',
		'JÚN',
		'JÚL',
		'AUG',
		'SEP',
		'OKT',
		'NOV',
		'DEC',
	],
	EN: [
		'JAN',
		'FEB',
		'MAR',
		'APR',
		'MAY',
		'JUN',
		'JUL',
		'AUG',
		'SEP',
		'OCT',
		'NOV',
		'DEC',
	],
	UA: [
		'СІЧ',
		'ЛЮТ',
		'БЕР',
		'КВІ',
		'ТРА',
		'ЧЕР',
		'ЛИП',
		'СЕР',
		'ВЕР',
		'ЖОВ',
		'ЛИС',
		'ГРУ',
	],
};

function formatSingleDate(date: string, lang: Lang): string {
	const [year, month, day] = date.split('-').map(Number);
	if (!year || !month || !day) return date;

	switch (lang) {
		case 'SK':
			return `${day}. ${MONTHS.SK[month - 1]} ${year}`;
		case 'EN':
			return `${MONTHS.EN[month - 1]} ${day}, ${year}`;
		case 'UA':
			return `${day} ${MONTHS.UA[month - 1]} ${year}`;
		default: {
			const exhaustive: never = lang;
			return exhaustive;
		}
	}
}

function formatEventDate(startDate: string, endDate: string | null, lang: Lang): string {
	if (!endDate || endDate === startDate) {
		return formatSingleDate(startDate, lang);
	}

	const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
	const [endYear, endMonth, endDay] = endDate.split('-').map(Number);

	if (!startYear || !startMonth || !startDay || !endYear || !endMonth || !endDay) {
		return formatSingleDate(startDate, lang);
	}

	switch (lang) {
		case 'SK':
			if (startMonth === endMonth && startYear === endYear) {
				return `${startDay}.–${endDay}. ${MONTHS.SK[startMonth - 1]} ${startYear}`;
			}
			return `${formatSingleDate(startDate, lang)} – ${formatSingleDate(endDate, lang)}`;
		case 'EN':
			if (startMonth === endMonth && startYear === endYear) {
				return `${MONTHS.EN[startMonth - 1]} ${startDay}–${endDay}, ${startYear}`;
			}
			return `${formatSingleDate(startDate, lang)} – ${formatSingleDate(endDate, lang)}`;
		case 'UA':
			if (startMonth === endMonth && startYear === endYear) {
				return `${startDay}–${endDay} ${MONTHS.UA[startMonth - 1]} ${startYear}`;
			}
			return `${formatSingleDate(startDate, lang)} – ${formatSingleDate(endDate, lang)}`;
		default: {
			const exhaustive: never = lang;
			return exhaustive;
		}
	}
}

function mapEvent(event: SanityEvent, lang: Lang): EventItem {
	const title = pickLocalized(event.title, lang);
	const cardImage = mapCardImage(event.coverImage, lang, title);

	return {
		slug: event.slug,
		tag: EVENT_TYPE_LABELS[event.eventType][lang],
		date: formatEventDate(event.startDate, event.endDate, lang),
		title,
		desc: pickLocalized(event.description, lang),
		place: pickLocalized(event.place, lang),
		imageUrl: cardImage.url,
		imageAlt: cardImage.alt,
	};
}

function mapRecurringEvent(event: SanityRecurringEvent, lang: Lang): RecurringEventItem {
	return {
		day: WEEKDAY_LABELS[lang][event.dayOfWeek] ?? '',
		time: event.time,
		title: pickLocalized(event.title, lang),
		place: pickLocalized(event.place, lang),
	};
}

export async function getEventsForClient(): Promise<EventsClientData> {
	const [events, recurringEvents] = await Promise.all([
		sanityClient.fetch<SanityEvent[]>(EVENTS_QUERY),
		sanityClient.fetch<SanityRecurringEvent[]>(RECURRING_EVENTS_QUERY),
	]);

	const eventsByLang = {} as Record<Lang, EventItem[]>;
	const recurringByLang = {} as Record<Lang, RecurringEventItem[]>;

	for (const lang of langs) {
		eventsByLang[lang] = events
			.filter((event): event is SanityEvent & { slug: string } => Boolean(event.slug))
			.map((event) => mapEvent(event, lang));
		recurringByLang[lang] = recurringEvents.map((event) => mapRecurringEvent(event, lang));
	}

	return { events: eventsByLang, recurring: recurringByLang };
}

export async function getEvents(lang: Lang): Promise<EventItem[]> {
	const data = await getEventsForClient();
	return data.events[lang];
}

export async function getRecurringEvents(lang: Lang): Promise<RecurringEventItem[]> {
	const data = await getEventsForClient();
	return data.recurring[lang];
}

export interface EventDetail extends EventItem {
	body: PortableTextBlock[];
	registrationUrl: string | null;
}

export async function getEvent(slug: string, lang: Lang): Promise<EventDetail | null> {
	const event = await sanityClient.fetch<SanityEvent | null>(EVENT_QUERY, { slug });
	if (!event?.slug) return null;

	const mapped = mapEvent(event, lang);
	const cover = mapCoverImage(event.coverImage, lang, mapped.title);

	return {
		...mapped,
		imageUrl: cover.url ?? mapped.imageUrl,
		imageAlt: cover.alt,
		body: pickLocalizedBlocks(event.body, lang),
		registrationUrl: event.registrationUrl ?? null,
	};
}

export async function getEventSlugs(): Promise<string[]> {
	const events = await sanityClient.fetch<Array<{ slug: string | null }>>(EVENT_PATHS_QUERY);
	return events.map((event) => event.slug).filter((slug): slug is string => Boolean(slug));
}
