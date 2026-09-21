'use client'

import type { Messages } from '../../i18n/messages'
import type { LocationView } from '../../lib/content'
import { useModal } from '../modals/ModalProvider'

export function LocationCards({
  locations,
  messages,
  variant = 'teaser',
}: {
  locations: LocationView[]
  messages: Messages
  variant?: 'teaser' | 'full'
}) {
  const { open } = useModal()

  const openLocation = (location: LocationView) =>
    open({
      kind: 'location',
      city: location.city,
      badge: location.badge,
      address: location.address,
      phone: location.phone,
      email: location.email,
      description: location.description,
      amenities: location.amenities,
    })

  if (variant === 'full') {
    return (
      <div className="grid grid-cols-2 gap-4">
        {locations.map((location) => (
          <button
            key={location.code}
            type="button"
            onClick={() => openLocation(location)}
            className="clscard w-full cursor-pointer rounded-lg border border-t-[3px] border-white/8 border-t-zr-green bg-zr-bg p-6 text-left transition-colors hover:border-zr-green/55"
          >
            <div className="flex items-center justify-between">
              <div className="font-display text-2xl font-bold text-white uppercase">
                {location.city}
              </div>
              <span className="font-condensed rounded-full border border-zr-green/40 px-2.5 py-1 text-xs font-bold tracking-wide text-zr-green">
                {location.badge}
              </span>
            </div>
            <div className="mt-3 text-sm leading-relaxed text-zr-text-muted">{location.address}</div>
            <div className="mt-4 flex gap-6">
              <div>
                <div className="text-[11px] tracking-wide text-zr-text-faint">
                  {messages.phoneLabel}
                </div>
                <div className="mt-0.5 text-sm font-semibold text-[#dfe5e0]">{location.phone}</div>
              </div>
              <div>
                <div className="text-[11px] tracking-wide text-zr-text-faint">
                  {messages.emailLabel}
                </div>
                <div className="mt-0.5 text-sm font-semibold text-[#dfe5e0]">{location.email}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3.5">
      {locations.map((location) => (
        <button
          key={location.code}
          type="button"
          onClick={() => openLocation(location)}
          className="clscard flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg border border-l-[3px] border-white/8 border-l-zr-green bg-zr-bg-card px-6 py-5 text-left transition-colors hover:border-zr-green/55"
        >
          <div>
            <div className="font-display text-xl font-bold text-white uppercase">
              {location.city}
            </div>
            <div className="mt-1 text-[13px] text-zr-text-muted">{location.address}</div>
          </div>
          <span className="font-condensed shrink-0 rounded-full border border-zr-green/40 px-2.5 py-1 text-[11px] font-bold tracking-wide text-zr-green">
            {location.badge}
          </span>
        </button>
      ))}
    </div>
  )
}
