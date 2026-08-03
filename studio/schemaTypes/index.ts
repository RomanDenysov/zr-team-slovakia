import {event} from './documents/event'
import {page} from './documents/page'
import {post} from './documents/post'
import {recurringEvent} from './documents/recurring-event'
import {scheduleEntry} from './documents/schedule-entry'
import {siteSettings} from './documents/site-settings'
import {contentImage} from './objects/content-image'
import {heroSection} from './objects/hero-section'
import {heroStat} from './objects/hero-stat'
import {localizedBlockContent} from './objects/localized-block-content'
import {localizedString} from './objects/localized-string'
import {localizedText} from './objects/localized-text'

export const schemaTypes = [
  localizedString,
  localizedText,
  localizedBlockContent,
  contentImage,
  heroStat,
  heroSection,
  page,
  post,
  siteSettings,
  event,
  recurringEvent,
  scheduleEntry,
]
