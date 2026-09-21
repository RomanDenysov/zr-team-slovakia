'use client'

import { useActionState } from 'react'
import { initialFormState } from '../../actions/form-state'
import { submitPartner } from '../../actions/forms'
import type { Locale } from '../../i18n/config'
import type { Messages } from '../../i18n/messages'
import { Honeypot, ModalDone, SubmitButton, TextArea, TextField } from './FormFields'

export function PartnerForm({
  messages,
  locale,
  onClose,
}: {
  messages: Messages
  locale: Locale
  onClose: () => void
}) {
  const [state, formAction, pending] = useActionState(submitPartner, initialFormState)

  if (state.status === 'success') {
    return (
      <ModalDone
        title={messages.partnerDoneT}
        body={messages.partnerDoneB}
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
            {messages.partnerTitle}
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
          {messages.partnerSub}
        </div>
        <form action={formAction} className="mt-6 flex flex-col gap-3.5">
          <input type="hidden" name="locale" value={locale} />
          <Honeypot />
          <TextField name="company" placeholder={messages.fCompany} required />
          <TextField name="contact" placeholder={messages.fContact} autoComplete="name" />
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
          <TextArea name="message" rows={3} placeholder={messages.fMsg} />
          {state.status === 'error' && state.error ? (
            <p role="alert" className="text-sm text-[#e0703c]">
              {state.error}
            </p>
          ) : null}
          <SubmitButton label={messages.partnerSubmit} pending={pending} />
        </form>
      </div>
    </>
  )
}
