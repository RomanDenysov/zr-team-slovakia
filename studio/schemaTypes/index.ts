import {event} from './documents/event'
import {page} from './documents/page'
import {recurringEvent} from './documents/recurring-event'
import {scheduleEntry} from './documents/schedule-entry'
import {siteSettings} from './documents/site-settings'
import {heroSection} from './objects/hero-section'
import {heroStat} from './objects/hero-stat'
import {localizedString} from './objects/localized-string'
import {localizedText} from './objects/localized-text'

export const schemaTypes = [
  localizedString,
  localizedText,
  heroStat,
  heroSection,
  page,
  siteSettings,
  event,
  recurringEvent,
  scheduleEntry,
]
