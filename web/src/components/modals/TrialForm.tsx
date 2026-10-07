'use client'

import { useActionState } from 'react'
import { initialFormState } from '../../actions/form-state'
import { submitTrial } from '../../actions/forms'
import type { Locale } from '../../i18n/config'
import type { Messages } from '../../i18n/messages'
import { Honeypot, ModalDone, SubmitButton, TextArea, TextField } from './FormFields'

export function TrialForm({
  messages,
  locale,
  academies,
  onClose,
}: {
  messages: Messages
  locale: Locale
  academies: string[]
  onClose: () => void
}) {
  const [state, formAction, pending] = useActionState(submitTrial, initialFormState)

  if (state.status === 'success') {
    return (
      <ModalDone
        title={messages.trialDoneT}
        body={messages.trialDoneB}
        closeLabel={messages.closeLabel}
        onClose={onClose}
      />
    )
  }

  return (
    <>
      <div className="h-2 bg-zr-green" />
      <div className="px-9 pt-8 pb-9">
        <div className="flex items-start justify-between gap-4">
          <div className="font-display text-[30px] leading-tight font-bold text-white uppercase">
            {messages.trialTitle}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={messages.closeLabel}
            className="cursor-pointer text-2xl leading-none text-zr-text-dim"
          >
            ×
          </button>
        </div>
        <div className="mt-3 text-[14.5px] leading-relaxed text-zr-text-muted">
          {messages.trialSub}
        </div>
        <form action={formAction} className="mt-6 flex flex-col gap-3.5">
          <input type="hidden" name="locale" value={locale} />
          <Honeypot />
          <TextField name="name" placeholder={messages.fName} autoComplete="name" required />
          <div className="flex gap-3.5">
            <TextField
              name="email"
              type="email"
              placeholder={messages.fEmail}
              autoComplete="email"
              required
              className="flex-1"
            />
            <TextField
              name="phone"
              type="tel"
              placeholder={messages.fPhone}
              autoComplete="tel"
              className="flex-1"
            />
          </div>
          <select
            name="location"
            className="rounded-md border border-white/12 bg-zr-bg-surface px-3.5 py-3 text-sm text-[#dfe5e0] outline-none"
          >
            {academies.map((academy) => (
              <option key={academy} value={academy} className="bg-zr-bg-surface">
                {academy}
              </option>
            ))}
          </select>
          <TextArea name="message" rows={3} placeholder={messages.fMsg} />
          {state.status === 'error' && state.error ? (
            <p role="alert" className="text-sm text-[#e0703c]">
              {state.error}
            </p>
          ) : null}
          <SubmitButton label={messages.fSubmit} pending={pending} />
        </form>
      </div>
    </>
  )
}
