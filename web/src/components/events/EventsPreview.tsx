import Image from 'next/image'
import Link from 'next/link'
import { localeHref, type Locale } from '../../i18n/config'
import type { EventListItem } from '../../lib/content'
import { PlaceholderImage } from '../ui/PlaceholderImage'

export function EventsPreview({
  events,
  locale,
}: {
  events: EventListItem[]
  locale: Locale
}) {
  return (
    <div className="events-preview-grid grid grid-cols-3 gap-4">
      {events.map((event) => (
        <Link
          key={event.slug}
          href={localeHref(locale, `events/${event.slug}`)}
          className="group block overflow-hidden rounded-lg border border-white/7 bg-zr-bg-card transition-colors hover:border-zr-green/40"
        >
          <div className="relative h-[130px] overflow-hidden bg-zr-bg-surface">
            <span className="font-condensed absolute top-3 left-3.5 z-10 rounded bg-zr-green px-2.5 py-1 text-xs font-bold tracking-wide text-zr-bg">
              {event.tag}
            </span>
            {event.image ? (
              <Image
                src={event.image.url}
                alt={event.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            ) : (
              <PlaceholderImage label="[ event photo ]" />
            )}
          </div>
          <div className="p-5">
            <div className="font-condensed text-[13px] font-bold tracking-wide text-zr-green">
              {event.date}
            </div>
            <div className="font-display mt-1.5 text-xl leading-tight font-semibold text-white uppercase group-hover:text-zr-green">
              {event.title}
            </div>
            <div className="mt-3 text-[12.5px] text-zr-text-faint">{event.place}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
