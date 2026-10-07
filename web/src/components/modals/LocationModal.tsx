'use client'

import type { Messages } from '../../i18n/messages'
import type { LocationModalData } from './types'

export function LocationModal({
  data,
  messages,
  onClose,
}: {
  data: LocationModalData
  messages: Messages
  onClose: () => void
}) {
  return (
    <>
      <div className="h-2 bg-zr-green" />
      <div className="px-9 pt-8 pb-9">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="font-display text-[34px] leading-none font-bold text-white uppercase">
              {data.city}
            </div>
            <span className="font-condensed rounded-full border border-zr-green/40 px-2.5 py-1 text-xs font-bold tracking-wide text-zr-green">
              {data.badge}
            </span>
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
        <div className="ph mt-5 flex h-[150px] items-end rounded-lg bg-zr-bg-surface p-3.5">
          <span className="font-mono text-[11px] text-[#5a6a5d]">[ map / gym photo ]</span>
        </div>
        {data.amenities.length > 0 ? (
          <div className="mt-5">
            <div className="mb-2.5 text-[11px] tracking-widest text-zr-text-faint">
              {messages.mLocAmen}
            </div>
            <div className="flex flex-wrap gap-2">
              {data.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full border border-white/8 bg-zr-bg-surface px-3 py-1.5 text-[13px] text-[#dfe5e0]"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-5 flex gap-7">
          <div>
            <div className="text-[11px] tracking-wide text-zr-text-faint">
              {messages.phoneLabel}
            </div>
            <div className="mt-0.5 text-[15px] font-semibold text-[#dfe5e0]">{data.phone}</div>
          </div>
          <div>
            <div className="text-[11px] tracking-wide text-zr-text-faint">
              {messages.emailLabel}
            </div>
            <div className="mt-0.5 text-[15px] font-semibold text-[#dfe5e0]">{data.email}</div>
          </div>
        </div>
      </div>
    </>
  )
}
