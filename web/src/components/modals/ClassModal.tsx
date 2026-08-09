'use client'

import type { Messages } from '../../i18n/messages'
import type { ClassModalData, ModalData } from './types'

function Cell({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-zr-bg-surface px-4 py-4">
      <div className="text-[11px] tracking-wide text-zr-text-faint">{label}</div>
      <div className={`mt-1 text-[15px] font-semibold ${accent ? 'text-zr-green' : 'text-white'}`}>
        {value}
      </div>
    </div>
  )
}

export function ClassModal({
  data,
  messages,
  onClose,
  onTrial,
}: {
  data: ClassModalData
  messages: Messages
  onClose: () => void
  onTrial: (modal: ModalData) => void
}) {
  return (
    <>
      <div style={{ height: 8, background: data.color }} />
      <div className="px-9 pt-8 pb-9">
        <div className="flex items-start justify-between gap-4">
          <div className="font-display text-[34px] leading-none font-bold text-white uppercase">
            {data.type}
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
        <div className="mt-4 text-[15.5px] leading-relaxed text-zr-text-secondary">
          {data.description}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/8 bg-white/8">
          <Cell label={messages.mClassDay} value={data.day} />
          <Cell label={messages.mClassTime} value={data.time} accent />
          <Cell label={messages.mClassLevel} value={data.level} />
          <Cell label={messages.mClassCoach} value={data.coach} />
          <div className="col-span-2 bg-zr-bg-surface px-4 py-4">
            <div className="text-[11px] tracking-wide text-zr-text-faint">{messages.mClassLoc}</div>
            <div className="mt-1 text-[15px] font-semibold text-white">{data.academy}</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onTrial({ kind: 'trial' })}
          className="font-condensed mt-6 w-full cursor-pointer rounded-md bg-zr-green py-4 text-base font-bold tracking-wider text-zr-bg uppercase"
        >
          {messages.mClassCta}
        </button>
      </div>
    </>
  )
}
