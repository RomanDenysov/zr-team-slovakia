import { getEvents, getRecurringEvents } from '../data/events';
import {
	type Lang,
	getLocationInfo,
	sponsorPlaceholders,
	translations,
} from '../i18n/translations';
import { getPageLangFromDocument } from '../i18n/runtime';
import {
	type ClassType,
	type LocationId,
	classColors,
	locationNames,
	scheduleData,
} from '../data/schedule';

interface SiteState {
	lang: Lang;
	loc: LocationId;
	filter: ClassType | 'ALL';
}

interface ClassModalData {
	kind: 'class';
	day: string;
	time: string;
	type: ClassType;
	level: string;
	coach: string;
	loc: string;
	color: string;
	desc: string;
}

interface LocModalData {
	kind: 'loc';
	city: string;
	badge: string;
	address: string;
	phoneLabel: string;
	phone: string;
	email: string;
	long: string;
	amen: string[];
}

type ModalData =
	| ClassModalData
	| LocModalData
	| { kind: 'trial' }
	| { kind: 'partner' };

function getState(): SiteState {
	return {
		lang: getPageLangFromDocument(),
		loc: 'KE',
		filter: 'ALL',
	};
}

let state = getState();
let modal: ModalData | null = null;
let trialSent = false;
let partnerSent = false;

function t() {
	return translations[state.lang];
}

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function initDynamicUI(): void {
	updateFilterButtons();
	updateLocButtons();
	renderAllSchedules();
	renderEventsSections();
	renderLocationCards();
	updatePartnerGrids();
}

function updateFilterButtons(): void {
	const tr = t();
	document.querySelectorAll<HTMLButtonElement>('.filter-btn').forEach((btn) => {
		const filter = btn.dataset.filter ?? 'ALL';
		const active = filter === state.filter;
		const label = filter === 'ALL' ? tr.filterAll : filter;
		btn.textContent = label;
		btn.className = `filter-btn cursor-pointer rounded-full px-4 py-2 text-[13px] font-semibold tracking-wide border ${
			active
				? 'bg-zr-green text-zr-bg border-zr-green'
				: 'bg-zr-bg-muted text-[#c9d2cb] border-white/8'
		}`;
	});
}

function updateLocButtons(): void {
	document.querySelectorAll<HTMLButtonElement>('.loc-btn').forEach((btn) => {
		const active = btn.dataset.loc === state.loc;
		btn.className = `loc-btn font-condensed cursor-pointer rounded-md px-5 py-2 text-sm font-bold tracking-wide ${
			active ? 'bg-zr-green text-zr-bg' : 'bg-transparent text-[#c9d2cb]'
		}`;
	});
}

function buildWeekDays(): { name: string; classes: typeof scheduleData; empty: boolean; isWeekend: boolean }[] {
	const tr = t();
	return tr.daysShort.map((name, dayIndex) => {
		const classes = scheduleData
			.filter(
				(c) =>
					c.location === state.loc &&
					c.dayIndex === dayIndex &&
					(state.filter === 'ALL' || c.type === state.filter),
			)
			.sort((a, b) => a.start.localeCompare(b.start));
		return { name, classes, empty: classes.length === 0, isWeekend: dayIndex >= 5 };
	});
}

function renderClassCard(
	entry: (typeof scheduleData)[0],
	dayIndex: number,
): string {
	const tr = t();
	const time = `${entry.start}–${entry.end}`;
	const level = tr.levels[entry.level];
	const color = classColors[entry.type];
	const locName = locationNames[entry.location];
	const day = tr.days[dayIndex];

	return `
		<button type="button" class="clscard w-full cursor-pointer rounded border border-white/7 border-l-[3px] bg-zr-bg-surface p-2.5 text-left transition-colors hover:border-zr-green/55"
			style="border-left-color:${color}"
			data-class-modal='${escapeHtml(JSON.stringify({ day, time, type: entry.type, level, coach: entry.coach, loc: locName, color, desc: tr.typeDesc[entry.type] }))}'>
			<div class="font-condensed text-[13px] font-bold tracking-wide text-zr-green">${escapeHtml(time)}</div>
			<div class="font-display mt-0.5 text-sm font-semibold tracking-wide text-white uppercase">${escapeHtml(entry.type)}</div>
			<div class="mt-0.5 text-[11.5px] text-zr-text-muted">${escapeHtml(level)}</div>
			<div class="mt-1 text-[11px] text-zr-text-faint">${escapeHtml(entry.coach)}</div>
		</button>`;
}

function renderScheduleGrid(container: HTMLElement): void {
	const tr = t();
	const week = buildWeekDays();

	container.innerHTML = week
		.map(
			(day) => `
		<div class="min-h-[200px] overflow-hidden rounded-md border border-white/6 bg-zr-bg">
			<div class="font-display border-b border-white/6 px-2.5 py-2.5 text-center text-[13px] font-semibold tracking-widest uppercase ${
				day.isWeekend
					? 'bg-zr-green/8 text-zr-green'
					: 'bg-white/3 text-[#dfe5e0]'
			}">${escapeHtml(day.name)}</div>
			<div class="flex flex-col gap-2 p-2">
				${day.classes.map((c) => renderClassCard(c, c.dayIndex)).join('')}
				${day.empty ? `<div class="px-1.5 py-4 text-center text-[11.5px] text-[#4a554c]">${escapeHtml(tr.restLabel)}</div>` : ''}
			</div>
		</div>`,
		)
		.join('');
}

function renderLegend(container: HTMLElement): void {
	container.innerHTML = ['Gi', 'No-Gi', 'Kids', 'Open Mat']
		.map(
			(type) => `
		<div class="flex items-center gap-1.5">
			<span class="h-[11px] w-[11px] rounded-sm" style="background:${classColors[type as ClassType]}"></span>
			<span class="text-[12.5px] text-zr-text-muted">${escapeHtml(type)}</span>
		</div>`,
		)
		.join('');
}

function renderAllSchedules(): void {
	document.querySelectorAll<HTMLElement>('[data-schedule-grid]').forEach(renderScheduleGrid);
	document.querySelectorAll<HTMLElement>('[data-schedule-legend]').forEach(renderLegend);
}

function renderEventsSections(): void {
	const events = getEvents();
	const tr = t();

	document.querySelectorAll<HTMLElement>('[data-events-preview]').forEach((container) => {
		container.innerHTML = events
			.slice(0, 3)
			.map(
				(ev) => `
			<div class="overflow-hidden rounded-lg border border-white/7 bg-zr-bg-card">
				<div class="ph relative flex h-[130px] items-end bg-zr-bg-surface p-3.5">
					<span class="absolute top-3 left-3.5 font-condensed rounded bg-zr-green px-2.5 py-1 text-xs font-bold tracking-wide text-zr-bg">${escapeHtml(ev.tag)}</span>
					<span class="font-mono text-[11px] text-[#5a6a5d]">[ event photo ]</span>
				</div>
				<div class="p-5">
					<div class="font-condensed text-[13px] font-bold tracking-wide text-zr-green">${escapeHtml(ev.date)}</div>
					<div class="font-display mt-1.5 text-xl leading-tight font-semibold text-white uppercase">${escapeHtml(ev.title)}</div>
					<div class="mt-3 text-[12.5px] text-zr-text-faint">${escapeHtml(ev.place)}</div>
				</div>
			</div>`,
			)
			.join('');
	});

	document.querySelectorAll<HTMLElement>('[data-events-timeline]').forEach((container) => {
		container.innerHTML = events
			.map(
				(ev) => `
			<div class="grid grid-cols-[120px_1fr]">
				<div class="pt-0.5 pr-6 text-right">
					<div class="font-condensed text-[13px] font-bold tracking-wide text-zr-green leading-tight">${escapeHtml(ev.date)}</div>
					<div class="mt-1 text-[11px] text-zr-text-faint">${escapeHtml(ev.tag)}</div>
				</div>
				<div class="relative border-l-2 border-white/10 pb-9 pl-8">
					<span class="absolute -left-2 top-1 h-3.5 w-3.5 rounded-full border-[3px] border-zr-bg bg-zr-green"></span>
					<div class="overflow-hidden rounded-lg border border-white/7 bg-zr-bg-card">
						<div class="ph flex h-[120px] items-end bg-zr-bg-surface p-3.5">
							<span class="font-mono text-[11px] text-[#5a6a5d]">[ event photo ]</span>
						</div>
						<div class="px-6 py-5">
							<div class="font-display text-2xl leading-tight font-semibold text-white uppercase">${escapeHtml(ev.title)}</div>
							<div class="mt-3 text-[14.5px] leading-relaxed text-zr-text-secondary">${escapeHtml(ev.desc)}</div>
							<div class="mt-4 flex items-center gap-2">
								<span class="h-1.5 w-1.5 rounded-full bg-zr-green"></span>
								<span class="text-[13px] font-semibold text-zr-text-muted">${escapeHtml(ev.place)}</span>
							</div>
						</div>
					</div>
				</div>
			</div>`,
			)
			.join('');
	});

	document.querySelectorAll<HTMLElement>('[data-events-recurring]').forEach((container) => {
		const recurring = getRecurringEvents();
		container.innerHTML = recurring
			.map(
				(r) => `
			<div class="rounded-md border border-white/7 border-l-[3px] border-l-zr-openmat bg-zr-bg-surface px-4 py-3.5">
				<div class="font-display text-[15px] font-semibold text-white uppercase">${escapeHtml(r.title)}</div>
				<div class="mt-2 flex items-center gap-2">
					<span class="font-condensed text-[13px] font-bold tracking-wide text-zr-green">${escapeHtml(r.day)}</span>
					<span class="text-[13px] text-zr-text-muted">· ${escapeHtml(r.time)}</span>
				</div>
				<div class="mt-1.5 text-xs text-zr-text-faint">${escapeHtml(r.place)}</div>
			</div>`,
			)
			.join('');
	});

	document.querySelectorAll<HTMLElement>('[data-events-show-more]').forEach((el) => {
		el.textContent = `${tr.showMore} →`;
	});
}

function renderLocationCards(): void {
	const locations = getLocationInfo(state.lang);
	const tr = t();

	document.querySelectorAll<HTMLElement>('[data-locations]').forEach((container) => {
		const variant = container.dataset.locationsVariant ?? 'teaser';
		container.innerHTML = locations
			.map((lo) => {
				const modalData: LocModalData = {
					kind: 'loc',
					city: lo.city,
					badge: lo.badge,
					address: lo.address,
					phoneLabel: lo.phoneLabel,
					phone: lo.phone,
					email: lo.email,
					long: tr.locLong[lo.id],
					amen: tr.amen[lo.id],
				};
				if (variant === 'full') {
					return `
				<button type="button" class="clscard w-full cursor-pointer rounded-lg border border-white/8 border-t-[3px] border-t-zr-green bg-zr-bg p-6 text-left transition-colors hover:border-zr-green/55"
					data-loc-modal='${escapeHtml(JSON.stringify(modalData))}'>
					<div class="flex items-center justify-between">
						<div class="font-display text-2xl font-bold text-white uppercase">${escapeHtml(lo.city)}</div>
						<span class="font-condensed rounded-full border border-zr-green/40 px-2.5 py-1 text-xs font-bold tracking-wide text-zr-green">${escapeHtml(lo.badge)}</span>
					</div>
					<div class="mt-3 text-sm leading-relaxed text-zr-text-muted">${escapeHtml(lo.address)}</div>
					<div class="mt-4 flex gap-6">
						<div><div class="text-[11px] tracking-wide text-zr-text-faint">${escapeHtml(lo.phoneLabel)}</div><div class="mt-0.5 text-sm font-semibold text-[#dfe5e0]">${escapeHtml(lo.phone)}</div></div>
						<div><div class="text-[11px] tracking-wide text-zr-text-faint">EMAIL</div><div class="mt-0.5 text-sm font-semibold text-[#dfe5e0]">${escapeHtml(lo.email)}</div></div>
					</div>
				</button>`;
				}
				return `
			<button type="button" class="clscard flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg border border-white/8 border-l-[3px] border-l-zr-green bg-zr-bg-card px-6 py-5 text-left transition-colors hover:border-zr-green/55"
				data-loc-modal='${escapeHtml(JSON.stringify(modalData))}'>
				<div>
					<div class="font-display text-xl font-bold text-white uppercase">${escapeHtml(lo.city)}</div>
					<div class="mt-1 text-[13px] text-zr-text-muted">${escapeHtml(lo.address)}</div>
				</div>
				<span class="font-condensed shrink-0 rounded-full border border-zr-green/40 px-2.5 py-1 text-[11px] font-bold tracking-wide text-zr-green">${escapeHtml(lo.badge)}</span>
			</button>`;
			})
			.join('');
	});
}

function updatePartnerGrids(): void {
	document.querySelectorAll<HTMLElement>('[data-partners-grid]').forEach((container) => {
		const count = Number(container.dataset.partnersCount ?? '4');
		container.innerHTML = sponsorPlaceholders
			.slice(0, count)
			.map(
				(sp) => `
			<div class="ph flex items-center justify-center rounded-lg border border-white/7 bg-zr-bg-card ${count > 4 ? 'h-[120px]' : 'h-24'}">
				<span class="font-mono text-[11px] text-[#5a6a5d]">${escapeHtml(sp)}</span>
			</div>`,
			)
			.join('');
	});
}

function renderWayItems(): void {
	const tr = t();
	document.querySelectorAll<HTMLElement>('[data-way-items]').forEach((container) => {
		container.innerHTML = tr.wayItems
			.map(
				(w) => `
			<div class="rounded-lg border border-white/7 border-t-[3px] border-t-zr-green bg-zr-bg-card p-6">
				<div class="font-display text-[22px] font-semibold text-white uppercase">${escapeHtml(w.t)}</div>
				<div class="mt-2.5 text-[14.5px] leading-relaxed text-zr-text-muted">${escapeHtml(w.b)}</div>
			</div>`,
			)
			.join('');
	});
}

function openModal(data: ModalData): void {
	modal = data;
	trialSent = false;
	partnerSent = false;
	renderModal();
}

function closeModal(): void {
	modal = null;
	trialSent = false;
	partnerSent = false;
	const el = document.getElementById('site-modal');
	if (el) {
		el.classList.add('hidden');
		el.classList.remove('flex');
		el.setAttribute('aria-hidden', 'true');
	}
}

function renderModal(): void {
	const el = document.getElementById('site-modal');
	const panel = document.getElementById('site-modal-panel');
	if (!el || !panel || !modal) return;

	const tr = t();
	el.classList.remove('hidden');
	el.classList.add('flex');
	el.setAttribute('aria-hidden', 'false');

	if (modal.kind === 'class') {
		panel.innerHTML = `
			<div style="height:8px;background:${modal.color}"></div>
			<div class="px-9 pt-8 pb-9">
				<div class="flex items-start justify-between gap-4">
					<div class="font-display text-[34px] leading-none font-bold text-white uppercase">${escapeHtml(modal.type)}</div>
					<button type="button" data-action="close-modal" class="cursor-pointer text-2xl leading-none text-zr-text-dim">×</button>
				</div>
				<div class="mt-4 text-[15.5px] leading-relaxed text-zr-text-secondary">${escapeHtml(modal.desc)}</div>
				<div class="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/8 bg-white/8">
					<div class="bg-zr-bg-surface px-4 py-4"><div class="text-[11px] tracking-wide text-zr-text-faint">${escapeHtml(tr.mClassDay)}</div><div class="mt-1 text-[15px] font-semibold text-white">${escapeHtml(modal.day)}</div></div>
					<div class="bg-zr-bg-surface px-4 py-4"><div class="text-[11px] tracking-wide text-zr-text-faint">${escapeHtml(tr.mClassTime)}</div><div class="mt-1 text-[15px] font-semibold text-zr-green">${escapeHtml(modal.time)}</div></div>
					<div class="bg-zr-bg-surface px-4 py-4"><div class="text-[11px] tracking-wide text-zr-text-faint">${escapeHtml(tr.mClassLevel)}</div><div class="mt-1 text-[15px] font-semibold text-white">${escapeHtml(modal.level)}</div></div>
					<div class="bg-zr-bg-surface px-4 py-4"><div class="text-[11px] tracking-wide text-zr-text-faint">${escapeHtml(tr.mClassCoach)}</div><div class="mt-1 text-[15px] font-semibold text-white">${escapeHtml(modal.coach)}</div></div>
					<div class="col-span-2 bg-zr-bg-surface px-4 py-4"><div class="text-[11px] tracking-wide text-zr-text-faint">${escapeHtml(tr.mClassLoc)}</div><div class="mt-1 text-[15px] font-semibold text-white">${escapeHtml(modal.loc)}</div></div>
				</div>
				<button type="button" data-action="open-trial" class="font-condensed mt-6 w-full cursor-pointer rounded-md bg-zr-green py-4 text-base font-bold tracking-wider text-zr-bg uppercase">${escapeHtml(tr.mClassCta)}</button>
			</div>`;
	} else if (modal.kind === 'loc') {
		panel.innerHTML = `
			<div class="h-2 bg-zr-green"></div>
			<div class="px-9 pt-8 pb-9">
				<div class="flex items-start justify-between gap-4">
					<div class="flex items-center gap-3.5">
						<div class="font-display text-[34px] leading-none font-bold text-white uppercase">${escapeHtml(modal.city)}</div>
						<span class="font-condensed rounded-full border border-zr-green/40 px-2.5 py-1 text-xs font-bold tracking-wide text-zr-green">${escapeHtml(modal.badge)}</span>
					</div>
					<button type="button" data-action="close-modal" class="cursor-pointer text-2xl leading-none text-zr-text-dim">×</button>
				</div>
				<div class="mt-4 text-[15.5px] leading-relaxed text-zr-text-secondary">${escapeHtml(modal.long)}</div>
				<div class="ph mt-5 flex h-[150px] items-end rounded-lg bg-zr-bg-surface p-3.5"><span class="font-mono text-[11px] text-[#5a6a5d]">[ map / gym photo ]</span></div>
				<div class="mt-5">
					<div class="mb-2.5 text-[11px] tracking-widest text-zr-text-faint">${escapeHtml(tr.mLocAmen)}</div>
					<div class="flex flex-wrap gap-2">${modal.amen.map((a) => `<span class="rounded-full border border-white/8 bg-zr-bg-surface px-3 py-1.5 text-[13px] text-[#dfe5e0]">${escapeHtml(a)}</span>`).join('')}</div>
				</div>
				<div class="mt-5 flex gap-7">
					<div><div class="text-[11px] tracking-wide text-zr-text-faint">${escapeHtml(modal.phoneLabel)}</div><div class="mt-0.5 text-[15px] font-semibold text-[#dfe5e0]">${escapeHtml(modal.phone)}</div></div>
					<div><div class="text-[11px] tracking-wide text-zr-text-faint">EMAIL</div><div class="mt-0.5 text-[15px] font-semibold text-[#dfe5e0]">${escapeHtml(modal.email)}</div></div>
				</div>
			</div>`;
	} else if (modal.kind === 'trial') {
		if (trialSent) {
			panel.innerHTML = `
				<div class="h-2 bg-zr-green"></div>
				<div class="px-9 py-12 text-center">
					<div class="font-display text-[34px] font-bold text-zr-green uppercase">${escapeHtml(tr.trialDoneT)}</div>
					<div class="mx-auto mt-3.5 max-w-[380px] text-base leading-relaxed text-zr-text-secondary">${escapeHtml(tr.trialDoneB)}</div>
					<button type="button" data-action="close-modal" class="font-condensed mt-6 inline-block cursor-pointer rounded-md border border-white/22 px-8 py-3 text-[15px] font-bold tracking-wider text-white uppercase">${escapeHtml(tr.closeLabel)}</button>
				</div>`;
		} else {
			const locs = getLocationInfo(state.lang);
			panel.innerHTML = `
				<div class="h-2 bg-zr-green"></div>
				<div class="px-9 pt-8 pb-9">
					<div class="flex items-start justify-between gap-4">
						<div class="font-display text-[30px] leading-tight font-bold text-white uppercase">${escapeHtml(tr.trialTitle)}</div>
						<button type="button" data-action="close-modal" class="cursor-pointer text-2xl leading-none text-zr-text-dim">×</button>
					</div>
					<div class="mt-3 text-[14.5px] leading-relaxed text-zr-text-muted">${escapeHtml(tr.trialSub)}</div>
					<form data-trial-form class="mt-6 flex flex-col gap-3.5">
						<input name="name" placeholder="${escapeHtml(tr.fName)}" class="rounded-md border border-white/12 bg-zr-bg-surface px-3.5 py-3 text-sm text-white outline-none" />
						<div class="flex gap-3.5">
							<input name="email" placeholder="${escapeHtml(tr.fEmail)}" class="flex-1 rounded-md border border-white/12 bg-zr-bg-surface px-3.5 py-3 text-sm text-white outline-none" />
							<input name="phone" placeholder="${escapeHtml(tr.fPhone)}" class="flex-1 rounded-md border border-white/12 bg-zr-bg-surface px-3.5 py-3 text-sm text-white outline-none" />
						</div>
						<select name="location" class="rounded-md border border-white/12 bg-zr-bg-surface px-3.5 py-3 text-sm text-[#dfe5e0] outline-none">
							${locs.map((l) => `<option value="${escapeHtml(l.city)}" class="bg-zr-bg-surface">${escapeHtml(l.city)}</option>`).join('')}
						</select>
						<textarea name="message" rows="3" placeholder="${escapeHtml(tr.fMsg)}" class="resize-vertical rounded-md border border-white/12 bg-zr-bg-surface px-3.5 py-3 text-sm text-white outline-none"></textarea>
						<button type="submit" class="font-condensed cursor-pointer rounded-md bg-zr-green py-4 text-base font-bold tracking-wider text-zr-bg uppercase">${escapeHtml(tr.fSubmit)}</button>
					</form>
				</div>`;
		}
	} else if (modal.kind === 'partner') {
		if (partnerSent) {
			panel.innerHTML = `
				<div class="h-2 bg-zr-green"></div>
				<div class="px-9 py-12 text-center">
					<div class="font-display text-[34px] font-bold text-zr-green uppercase">${escapeHtml(tr.partnerDoneT)}</div>
					<div class="mx-auto mt-3.5 max-w-[380px] text-base leading-relaxed text-zr-text-secondary">${escapeHtml(tr.partnerDoneB)}</div>
					<button type="button" data-action="close-modal" class="font-condensed mt-6 inline-block cursor-pointer rounded-md border border-white/22 px-8 py-3 text-[15px] font-bold tracking-wider text-white uppercase">${escapeHtml(tr.closeLabel)}</button>
				</div>`;
		} else {
			panel.innerHTML = `
				<div class="h-2 bg-zr-green"></div>
				<div class="px-9 pt-8 pb-9">
					<div class="flex items-start justify-between gap-4">
						<div class="font-display text-[30px] leading-tight font-bold text-white uppercase">${escapeHtml(tr.partnerTitle)}</div>
						<button type="button" data-action="close-modal" class="cursor-pointer text-2xl leading-none text-zr-text-dim">×</button>
					</div>
					<div class="mt-3 text-[14.5px] leading-relaxed text-zr-text-muted">${escapeHtml(tr.partnerSub)}</div>
					<form data-partner-form class="mt-6 flex flex-col gap-3.5">
						<input name="company" placeholder="${escapeHtml(tr.fCompany)}" class="rounded-md border border-white/12 bg-zr-bg-surface px-3.5 py-3 text-sm text-white outline-none" />
						<input name="contact" placeholder="${escapeHtml(tr.fContact)}" class="rounded-md border border-white/12 bg-zr-bg-surface px-3.5 py-3 text-sm text-white outline-none" />
						<div class="flex gap-3.5">
							<input name="email" placeholder="${escapeHtml(tr.fEmail)}" class="flex-1 rounded-md border border-white/12 bg-zr-bg-surface px-3.5 py-3 text-sm text-white outline-none" />
							<input name="phone" placeholder="${escapeHtml(tr.fPhone)}" class="flex-1 rounded-md border border-white/12 bg-zr-bg-surface px-3.5 py-3 text-sm text-white outline-none" />
						</div>
						<textarea name="message" rows="3" placeholder="${escapeHtml(tr.fMsg)}" class="resize-vertical rounded-md border border-white/12 bg-zr-bg-surface px-3.5 py-3 text-sm text-white outline-none"></textarea>
						<button type="submit" class="font-condensed cursor-pointer rounded-md bg-zr-green py-4 text-base font-bold tracking-wider text-zr-bg uppercase">${escapeHtml(tr.partnerSubmit)}</button>
					</form>
				</div>`;
		}
	}
}

function handleClick(e: Event): void {
	const target = e.target as HTMLElement;
	const actionEl = target.closest<HTMLElement>('[data-action]');
	if (actionEl) {
		const action = actionEl.dataset.action;
		if (action === 'open-trial') {
			e.preventDefault();
			openModal({ kind: 'trial' });
			return;
		}
		if (action === 'open-partner') {
			e.preventDefault();
			openModal({ kind: 'partner' });
			return;
		}
		if (action === 'close-modal') {
			e.preventDefault();
			closeModal();
			return;
		}
	}

	const classBtn = target.closest<HTMLElement>('[data-class-modal]');
	if (classBtn?.dataset.classModal) {
		openModal({ kind: 'class', ...JSON.parse(classBtn.dataset.classModal) } as ClassModalData);
		return;
	}

	const locBtn = target.closest<HTMLElement>('[data-loc-modal]');
	if (locBtn?.dataset.locModal) {
		openModal(JSON.parse(locBtn.dataset.locModal) as LocModalData);
		return;
	}

	const langBtn = target.closest<HTMLButtonElement>('.lang-btn');
	if (langBtn) return;

	const filterBtn = target.closest<HTMLButtonElement>('.filter-btn');
	if (filterBtn?.dataset.filter) {
		state.filter = filterBtn.dataset.filter as ClassType | 'ALL';
		updateFilterButtons();
		renderAllSchedules();
		return;
	}

	const locToggle = target.closest<HTMLButtonElement>('.loc-btn');
	if (locToggle?.dataset.loc) {
		state.loc = locToggle.dataset.loc as LocationId;
		updateLocButtons();
		renderAllSchedules();
		return;
	}

	const modalEl = target.closest('#site-modal');
	const panel = target.closest('#site-modal-panel');
	if (modalEl && !panel) {
		closeModal();
	}
}

function handleSubmit(e: Event): void {
	const form = e.target as HTMLFormElement;
	if (form.matches('[data-trial-form]')) {
		e.preventDefault();
		trialSent = true;
		renderModal();
	}
	if (form.matches('[data-partner-form]')) {
		e.preventDefault();
		partnerSent = true;
		renderModal();
	}
}

function handleKeydown(e: KeyboardEvent): void {
	if (e.key === 'Escape' && modal) closeModal();
}

function init(): void {
	state.lang = getPageLangFromDocument();
	document.addEventListener('click', handleClick);
	document.addEventListener('submit', handleSubmit);
	document.addEventListener('keydown', handleKeydown);
	initDynamicUI();
	renderWayItems();
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
