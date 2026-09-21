'use client'

import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

const FIELD_CLASS =
  'rounded-md border border-white/12 bg-zr-bg-surface px-3.5 py-3 text-sm text-white outline-none focus:border-zr-green/60'

export function TextField({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${FIELD_CLASS} ${className}`} />
}

export function TextArea({ className = '', ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`resize-vertical ${FIELD_CLASS} ${className}`} />
}

/** Hidden from humans, irresistible to bots. */
export function Honeypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute left-[-9999px] h-0 w-0 opacity-0"
    />
  )
}

export function SubmitButton({ label, pending }: { label: string; pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="font-condensed cursor-pointer rounded-md bg-zr-green py-4 text-base font-bold tracking-wider text-zr-bg uppercase disabled:opacity-60"
    >
      {label}
    </button>
  )
}

export function ModalDone({
  title,
  body,
  closeLabel,
  onClose,
}: {
  title: string
  body: string
  closeLabel: string
  onClose: () => void
}) {
  return (
    <>
      <div className="h-2 bg-zr-green" />
      <div className="px-9 py-12 text-center">
        <div className="font-display text-[34px] font-bold text-zr-green uppercase">{title}</div>
        <div className="mx-auto mt-3.5 max-w-[380px] text-base leading-relaxed text-zr-text-secondary">
          {body}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="font-condensed mt-6 inline-block cursor-pointer rounded-md border border-white/22 px-8 py-3 text-[15px] font-bold tracking-wider text-white uppercase"
        >
          {closeLabel}
        </button>
      </div>
    </>
  )
}
