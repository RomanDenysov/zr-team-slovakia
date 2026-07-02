export type ClassType = 'Gi' | 'No-Gi' | 'Kids' | 'Open Mat';
export type LocationId = 'KE' | 'BA';
export type LevelKey = 'all' | 'beg' | 'adv' | 'kids';

export interface ScheduleEntry {
	dayIndex: number;
	start: string;
	end: string;
	type: ClassType;
	level: LevelKey;
	coach: string;
	location: LocationId;
}

export const classColors: Record<ClassType, string> = {
	Gi: '#43c95b',
	'No-Gi': '#3a9bd9',
	Kids: '#e0a83c',
	'Open Mat': '#b06ae0',
};

export const scheduleData: ScheduleEntry[] = [
	{ dayIndex: 0, start: '18:00', end: '19:30', type: 'Gi', level: 'all', coach: 'José R.', location: 'KE' },
	{ dayIndex: 0, start: '19:30', end: '20:30', type: 'Open Mat', level: 'all', coach: '—', location: 'KE' },
	{ dayIndex: 1, start: '17:00', end: '18:00', type: 'Kids', level: 'kids', coach: 'Marek H.', location: 'KE' },
	{ dayIndex: 1, start: '18:00', end: '19:30', type: 'No-Gi', level: 'all', coach: 'José R.', location: 'KE' },
	{ dayIndex: 2, start: '18:00', end: '19:30', type: 'Gi', level: 'beg', coach: 'Tomáš V.', location: 'KE' },
	{ dayIndex: 2, start: '19:30', end: '21:00', type: 'Gi', level: 'adv', coach: 'José R.', location: 'KE' },
	{ dayIndex: 3, start: '17:00', end: '18:00', type: 'Kids', level: 'kids', coach: 'Marek H.', location: 'KE' },
	{ dayIndex: 3, start: '18:30', end: '20:00', type: 'No-Gi', level: 'adv', coach: 'José R.', location: 'KE' },
	{ dayIndex: 4, start: '18:00', end: '19:30', type: 'Gi', level: 'all', coach: 'Tomáš V.', location: 'KE' },
	{ dayIndex: 5, start: '10:00', end: '11:30', type: 'Open Mat', level: 'all', coach: '—', location: 'KE' },
	{ dayIndex: 0, start: '17:30', end: '18:30', type: 'Kids', level: 'kids', coach: 'Lucia B.', location: 'BA' },
	{ dayIndex: 0, start: '18:30', end: '20:00', type: 'Gi', level: 'all', coach: 'Pavol K.', location: 'BA' },
	{ dayIndex: 1, start: '18:00', end: '19:30', type: 'No-Gi', level: 'all', coach: 'Pavol K.', location: 'BA' },
	{ dayIndex: 2, start: '17:30', end: '18:30', type: 'Kids', level: 'kids', coach: 'Lucia B.', location: 'BA' },
	{ dayIndex: 2, start: '18:30', end: '20:00', type: 'Gi', level: 'beg', coach: 'Daniel S.', location: 'BA' },
	{ dayIndex: 3, start: '18:30', end: '20:00', type: 'No-Gi', level: 'adv', coach: 'Pavol K.', location: 'BA' },
	{ dayIndex: 4, start: '18:00', end: '19:30', type: 'Gi', level: 'all', coach: 'Pavol K.', location: 'BA' },
	{ dayIndex: 4, start: '19:30', end: '20:30', type: 'Open Mat', level: 'all', coach: '—', location: 'BA' },
	{ dayIndex: 6, start: '10:30', end: '12:00', type: 'Open Mat', level: 'all', coach: '—', location: 'BA' },
];

export const locationNames: Record<LocationId, string> = {
	KE: 'KOŠICE',
	BA: 'BRATISLAVA',
};

export const classTypes: (ClassType | 'ALL')[] = ['ALL', 'Gi', 'No-Gi', 'Kids', 'Open Mat'];

export const legendItems: ClassType[] = ['Gi', 'No-Gi', 'Kids', 'Open Mat'];
