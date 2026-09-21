import type { Locale } from '../config'
import { en } from './en'
import { sk } from './sk'
import { uk } from './uk'
import type { Messages } from './types'

const dictionaries: Record<Locale, Messages> = { sk, en, uk }

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale]
}

export type { Messages }
