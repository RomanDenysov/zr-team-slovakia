import type { Lang } from '../i18n/translations';

export interface EventItem {
	tag: string;
	date: string;
	title: string;
	desc: string;
	place: string;
}

export interface RecurringEventItem {
	day: string;
	time: string;
	title: string;
	place: string;
}

export interface EventsClientData {
	events: EventItem[];
	recurring: RecurringEventItem[];
}

export type EventType = 'seminar' | 'tournament' | 'workshop' | 'camp';

export interface LocalizedString {
	sk?: string;
	en?: string;
	ua?: string;
}

export const EVENT_TYPE_LABELS: Record<EventType, Record<Lang, string>> = {
	seminar: { SK: 'SEMINÁR', EN: 'SEMINAR', UA: 'СЕМІНАР' },
	tournament: { SK: 'TURNAJ', EN: 'TOURNAMENT', UA: 'ТУРНІР' },
	workshop: { SK: 'WORKSHOP', EN: 'WORKSHOP', UA: 'ВОРКШОП' },
	camp: { SK: 'KEMP', EN: 'CAMP', UA: 'КЕМП' },
};

export const WEEKDAY_LABELS: Record<Lang, string[]> = {
	SK: ['NEDEĽA', 'PONDELOK', 'UTOROK', 'STREDA', 'ŠTVRTOK', 'PIATOK', 'SOBOTA'],
	EN: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
	UA: ['НЕДІЛЯ', 'ПОНЕДІЛОК', 'ВІВТОРОК', 'СЕРЕДА', 'ЧЕТВЕР', "П'ЯТНИЦЯ", 'СУБОТА'],
};
