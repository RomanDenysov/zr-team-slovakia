'use server'

import { defaultLocale, isLocale, type Locale } from '../i18n/config'
import { getMessages } from '../i18n/messages'
import { getPayloadClient } from '../lib/payload'
import type { FormState } from './form-state'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function text(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

function resolveLocale(formData: FormData): Locale {
  const value = formData.get('locale')
  return typeof value === 'string' && isLocale(value) ? value : defaultLocale
}

async function notify(subject: string, lines: string[]): Promise<void> {
  const to = process.env.EMAIL_TO
  if (!to) return

  try {
    const payload = await getPayloadClient()
    await payload.sendEmail({
      to,
      subject,
      text: lines.filter(Boolean).join('\n'),
    })
  } catch (error) {
    // A failed notification must not lose the submission — it is already stored.
    console.error('Failed to send form notification email', error)
  }
}

export async function submitTrial(_prev: FormState, formData: FormData): Promise<FormState> {
  const locale = resolveLocale(formData)
  const messages = getMessages(locale)

  // Honeypot: bots fill hidden fields, humans never see this one.
  if (text(formData, 'website')) return { status: 'success' }

  const name = text(formData, 'name')
  const email = text(formData, 'email')
  const phone = text(formData, 'phone')
  const location = text(formData, 'location')
  const message = text(formData, 'message')

  if (!name || !email) return { status: 'error', error: messages.errRequired }
  if (!EMAIL_PATTERN.test(email)) return { status: 'error', error: messages.errEmail }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'form-submissions',
      data: { formType: 'trial', name, email, phone, location, message, locale },
    })
  } catch (error) {
    console.error('Failed to store trial submission', error)
    return { status: 'error', error: messages.errGeneric }
  }

  await notify(`Trial class request — ${name}`, [
    `Name: ${name}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    location && `Academy: ${location}`,
    message && `Message: ${message}`,
    `Language: ${locale}`,
  ])

  return { status: 'success' }
}

export async function submitPartner(_prev: FormState, formData: FormData): Promise<FormState> {
  const locale = resolveLocale(formData)
  const messages = getMessages(locale)

  if (text(formData, 'website')) return { status: 'success' }

  const company = text(formData, 'company')
  const contact = text(formData, 'contact')
  const email = text(formData, 'email')
  const phone = text(formData, 'phone')
  const message = text(formData, 'message')

  if (!company || !email) return { status: 'error', error: messages.errRequired }
  if (!EMAIL_PATTERN.test(email)) return { status: 'error', error: messages.errEmail }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'form-submissions',
      data: { formType: 'partner', company, contact, email, phone, message, locale },
    })
  } catch (error) {
    console.error('Failed to store partner submission', error)
    return { status: 'error', error: messages.errGeneric }
  }

  await notify(`Partnership enquiry — ${company}`, [
    `Company: ${company}`,
    contact && `Contact: ${contact}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    message && `Message: ${message}`,
    `Language: ${locale}`,
  ])

  return { status: 'success' }
}
