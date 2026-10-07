'use client'

import type { ReactNode } from 'react'
import { useModal } from './ModalProvider'

/** Opens the free-trial modal. Used in the nav, hero, CTA band and class modal. */
export function TrialButton({
  className,
  children,
  onClick,
}: {
  className?: string
  children: ReactNode
  onClick?: () => void
}) {
  const { open } = useModal()

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.()
        open({ kind: 'trial' })
      }}
    >
      {children}
    </button>
  )
}

export function PartnerButton({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const { open } = useModal()

  return (
    <button type="button" className={className} onClick={() => open({ kind: 'partner' })}>
      {children}
    </button>
  )
}
