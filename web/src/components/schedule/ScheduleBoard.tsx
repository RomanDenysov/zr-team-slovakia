'use client'

import { useMemo, useState } from 'react'
import type { Messages } from '../../i18n/messages'
import type { ClassTypeView, LocationView, ScheduleView } from '../../lib/content'
import { useModal } from '../modals/ModalProvider'

const TITLE_CLASSES = {
  md: 'text-[34px]',
  lg: 'text-[42px]',
  xl: 'text-5xl',
} as const

export function ScheduleBoard({
  entries,
  classTypes,
  locations,
  messages,
  titleSize = 'lg',
}: {
  entries: ScheduleView[]
  classTypes: ClassTypeView[]
  locations: LocationView[]
  messages: Messages
  titleSize?: keyof typeof TITLE_CLASSES
}) {
  const { open } = useModal()
  const [locationCode, setLocationCode] = useState(locations[0]?.code ?? '')
  const [filter, setFilter] = useState<string>('ALL')

  const descriptions = useMemo(
    () => new Map(classTypes.map((type) => [type.name, type.description])),
    [classTypes],
  )

  const week = useMemo(
    () =>
      messages.daysShort.map((name, dayIndex) => ({
        name,
        isWeekend: dayIndex >= 5,
        classes: entries
          .filter(
            (entry) =>
              entry.locationCode === locationCode &&
              entry.dayIndex === dayIndex &&
              (filter === 'ALL' || entry.type === filter),
          )
          .sort((a, b) => a.start.localeCompare(b.start)),
      })),
    [entries, locationCode, filter, messages.daysShort],
  )

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="font-condensed mb-2.5 text-sm font-semibold tracking-[4px] text-zr-green">
            {messages.schedKicker}
          </div>
          <div
            className={`font-display leading-none font-bold text-white uppercase ${TITLE_CLASSES[titleSize]}`}
          >
            {messages.schedTitle}
          </div>
        </div>

        {locations.length > 1 ? (
          <div className="flex gap-1.5 rounded-lg bg-zr-bg-muted p-1.5" role="group" aria-label="Location">
            {locations.map((location) => {
              const active = location.code === locationCode
              return (
                <button
                  key={location.code}
                  type="button"
                  onClick={() => setLocationCode(location.code)}
                  aria-pressed={active}
                  className={`loc-btn font-condensed cursor-pointer rounded-md px-5 py-2 text-sm font-bold tracking-wide ${
                    active ? 'bg-zr-green text-zr-bg' : 'bg-transparent text-[#c9d2cb]'
                  }`}
                >
                  {location.city}
                </button>
              )
            })}
          </div>
        ) : null}
      </div>

      <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Class type filter">
        {['ALL', ...classTypes.map((type) => type.name)].map((value) => {
          const active = value === filter
          return (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={active}
              className={`filter-btn cursor-pointer rounded-full border px-4 py-2 text-[13px] font-semibold tracking-wide ${
                active
                  ? 'border-zr-green bg-zr-green text-zr-bg'
                  : 'border-white/8 bg-zr-bg-muted text-[#c9d2cb]'
              }`}
            >
              {value === 'ALL' ? messages.filterAll : value}
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid grid-cols-7 gap-2.5" data-schedule-grid>
        {week.map((day) => (
          <div
            key={day.name}
            className="min-h-[200px] overflow-hidden rounded-md border border-white/6 bg-zr-bg"
          >
            <div
              className={`font-display border-b border-white/6 px-2.5 py-2.5 text-center text-[13px] font-semibold tracking-widest uppercase ${
                day.isWeekend ? 'bg-zr-green/8 text-zr-green' : 'bg-white/3 text-[#dfe5e0]'
              }`}
            >
              {day.name}
            </div>
            <div className="flex flex-col gap-2 p-2">
              {day.classes.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() =>
                    open({
                      kind: 'class',
                      day: messages.days[entry.dayIndex] ?? '',
                      time: `${entry.start}–${entry.end}`,
                      type: entry.type,
                      level: messages.levels[entry.level] ?? entry.level,
                      coach: entry.coach,
                      academy: entry.locationName,
                      color: entry.color,
                      description: descriptions.get(entry.type) ?? '',
                    })
                  }
                  style={{ borderLeftColor: entry.color }}
                  className="clscard w-full cursor-pointer rounded border border-l-[3px] border-white/7 bg-zr-bg-surface p-2.5 text-left transition-colors hover:border-zr-green/55"
                >
                  <div className="font-condensed text-[13px] font-bold tracking-wide text-zr-green">
                    {entry.start}–{entry.end}
                  </div>
                  <div className="font-display mt-0.5 text-sm font-semibold tracking-wide text-white uppercase">
                    {entry.type}
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-zr-text-muted">
                    {messages.levels[entry.level] ?? entry.level}
                  </div>
                  <div className="mt-1 text-[11px] text-zr-text-faint">{entry.coach}</div>
                </button>
              ))}
              {day.classes.length === 0 ? (
                <div className="px-1.5 py-4 text-center text-[11.5px] text-[#4a554c]">
                  {messages.restLabel}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-5">
        {classTypes.map((type) => (
          <div key={type.name} className="flex items-center gap-1.5">
            <span
              className="h-[11px] w-[11px] rounded-sm"
              style={{ background: type.color }}
              aria-hidden="true"
            />
            <span className="text-[12.5px] text-zr-text-muted">{type.name}</span>
          </div>
        ))}
      </div>
    </>
  )
}
