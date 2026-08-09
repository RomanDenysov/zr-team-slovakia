import type { Locale } from '../i18n/config'
import type { Messages } from '../i18n/messages'

function parts(date: string): [number, number, number] | null {
  const [year, month, day] = date.slice(0, 10).split('-').map(Number)
  if (!year || !month || !day) return null
  return [year, month, day]
}

function singleDate(date: string, locale: Locale, messages: Messages): string {
  const parsed = parts(date)
  if (!parsed) return date
  const [year, month, day] = parsed
  const monthName = messages.monthsShort[month - 1]

  switch (locale) {
    case 'sk':
      return `${day}. ${monthName} ${year}`
    case 'en':
      return `${monthName} ${day}, ${year}`
    case 'uk':
      return `${day} ${monthName} ${year}`
  }
}

/** "12. JÚL 2026", "10.–12. OKT 2026" — matches the original Astro output. */
export function formatEventDate(
  startDate: string,
  endDate: string | null | undefined,
  locale: Locale,
  messages: Messages,
): string {
  if (!endDate || endDate.slice(0, 10) === startDate.slice(0, 10)) {
    return singleDate(startDate, locale, messages)
  }

  const start = parts(startDate)
  const end = parts(endDate)
  if (!start || !end) return singleDate(startDate, locale, messages)

  const [startYear, startMonth, startDay] = start
  const [endYear, endMonth, endDay] = end
  const sameMonth = startMonth === endMonth && startYear === endYear
  const monthName = messages.monthsShort[startMonth - 1]

  if (!sameMonth) {
    return `${singleDate(startDate, locale, messages)} – ${singleDate(endDate, locale, messages)}`
  }

  switch (locale) {
    case 'sk':
      return `${startDay}.–${endDay}. ${monthName} ${startYear}`
    case 'en':
      return `${monthName} ${startDay}–${endDay}, ${startYear}`
    case 'uk':
      return `${startDay}–${endDay} ${monthName} ${startYear}`
  }
}

const intlLocale: Record<Locale, string> = {
  sk: 'sk-SK',
  en: 'en-GB',
  uk: 'uk-UA',
}

/** "20. júna 2026" — long form used on post cards and post pages. */
export function formatPostDate(isoDate: string, locale: Locale): string {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate

  return new Intl.DateTimeFormat(intlLocale[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
