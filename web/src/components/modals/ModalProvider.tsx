'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Locale } from '../../i18n/config'
import type { Messages } from '../../i18n/messages'
import { ClassModal } from './ClassModal'
import { LocationModal } from './LocationModal'
import { PartnerForm } from './PartnerForm'
import { TrialForm } from './TrialForm'
import type { ModalData } from './types'

interface ModalContextValue {
  open: (data: ModalData) => void
  close: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function useModal(): ModalContextValue {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used inside <ModalProvider>')
  return context
}

export function ModalProvider({
  messages,
  locale,
  academies,
  children,
}: {
  messages: Messages
  locale: Locale
  academies: string[]
  children: ReactNode
}) {
  const [modal, setModal] = useState<ModalData | null>(null)

  const open = useCallback((data: ModalData) => setModal(data), [])
  const close = useCallback(() => setModal(null), [])
  const value = useMemo(() => ({ open, close }), [open, close])

  useEffect(() => {
    if (!modal) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [modal, close])

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modal ? (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-[rgba(4,6,4,0.82)] p-8 backdrop-blur-xs"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="site-modal-panel max-h-[88vh] w-full max-w-[560px] overflow-auto rounded-xl border border-white/10 bg-zr-bg-card shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            {modal.kind === 'class' ? (
              <ClassModal data={modal} messages={messages} onClose={close} onTrial={open} />
            ) : null}
            {modal.kind === 'location' ? (
              <LocationModal data={modal} messages={messages} onClose={close} />
            ) : null}
            {modal.kind === 'trial' ? (
              <TrialForm
                messages={messages}
                locale={locale}
                academies={academies}
                onClose={close}
              />
            ) : null}
            {modal.kind === 'partner' ? (
              <PartnerForm messages={messages} locale={locale} onClose={close} />
            ) : null}
          </div>
        </div>
      ) : null}
    </ModalContext.Provider>
  )
}
