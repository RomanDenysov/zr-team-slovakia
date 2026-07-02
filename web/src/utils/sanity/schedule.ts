import { sanityClient } from 'sanity:client';
import { defineQuery } from 'groq';
import type {
	ClassType,
	LevelKey,
	LocationId,
	ScheduleEntry,
} from '../../data/schedule';

const SCHEDULE_QUERY = defineQuery(
	`*[_type == "scheduleEntry"] | order(dayIndex asc, startTime asc){
    dayIndex,
    startTime,
    endTime,
    classType,
    level,
    coach,
    location
  }`,
);

interface SanityScheduleEntry {
	dayIndex: number;
	startTime: string;
	endTime: string;
	classType: ClassType;
	level: LevelKey;
	coach: string;
	location: LocationId;
}

export async function getScheduleEntries(): Promise<ScheduleEntry[]> {
	const rows = await sanityClient.fetch<SanityScheduleEntry[]>(SCHEDULE_QUERY);

	return rows.map((row) => ({
		dayIndex: row.dayIndex,
		start: row.startTime,
		end: row.endTime,
		type: row.classType,
		level: row.level,
		coach: row.coach,
		location: row.location,
	}));
}
