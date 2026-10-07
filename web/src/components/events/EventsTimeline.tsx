import Image from 'next/image'
import Link from 'next/link'
import { localeHref, type Locale } from '../../i18n/config'
import type { EventListItem } from '../../lib/content'
import { PlaceholderImage } from '../ui/PlaceholderImage'

export function EventsTimeline({
  events,
  locale,
}: {
  events: EventListItem[]
  locale: Locale
}) {
  return (
    <div className="flex flex-col">
      {events.map((event) => (
        <div key={event.slug} className="grid grid-cols-[120px_1fr]">
          <div className="pt-0.5 pr-6 text-right">
            <div className="font-condensed text-[13px] leading-tight font-bold tracking-wide text-zr-green">
              {event.date}
            </div>
            <div className="mt-1 text-[11px] text-zr-text-faint">{event.tag}</div>
          </div>
          <div className="relative border-l-2 border-white/10 pb-9 pl-8">
            <span
              className="absolute top-1 -left-2 h-3.5 w-3.5 rounded-full border-[3px] border-zr-bg bg-zr-green"
              aria-hidden="true"
            />
            <Link
              href={localeHref(locale, `events/${event.slug}`)}
              className="group block overflow-hidden rounded-lg border border-white/7 bg-zr-bg-card transition-colors hover:border-zr-green/40"
            >
              <div className="relative h-[120px] overflow-hidden bg-zr-bg-surface">
                {event.image ? (
                  <Image
                    src={event.image.url}
                    alt={event.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <PlaceholderImage label="[ event photo ]" />
                )}
              </div>
              <div className="px-6 py-5">
                <div className="font-display text-2xl leading-tight font-semibold text-white uppercase group-hover:text-zr-green">
                  {event.title}
                </div>
                <div className="mt-3 text-[14.5px] leading-relaxed text-zr-text-secondary">
                  {event.desc}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-zr-green" aria-hidden="true" />
                  <span className="text-[13px] font-semibold text-zr-text-muted">{event.place}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
