import type { EventsClientData } from '../types/events';

const emptyEventsData = (): EventsClientData => ({
	events: [],
	recurring: [],
});

export function readEventsData(): EventsClientData {
	if (typeof document === 'undefined') {
		return emptyEventsData();
	}

	const el = document.getElementById('events-data');
	if (!el?.textContent) {
		return emptyEventsData();
	}

	try {
		return JSON.parse(el.textContent) as EventsClientData;
	} catch {
		return emptyEventsData();
	}
}

export function getEvents(): EventsClientData['events'] {
	return readEventsData().events;
}

export function getRecurringEvents(): EventsClientData['recurring'] {
	return readEventsData().recurring;
}
