import Image from 'next/image'
import Link from 'next/link'
import type { ImageView } from '../../lib/media'
import { PlaceholderImage } from '../ui/PlaceholderImage'

export function ContentCard({
  href,
  kicker,
  title,
  excerpt,
  tag,
  meta,
  image,
  placeholderLabel = '[ photo ]',
}: {
  href: string
  kicker: string
  title: string
  excerpt?: string
  tag?: string
  meta?: string
  image?: ImageView | null
  placeholderLabel?: string
}) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-lg border border-white/7 bg-zr-bg-card transition-colors hover:border-zr-green/40"
    >
      <div className="relative h-[130px] overflow-hidden bg-zr-bg-surface">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <PlaceholderImage label={placeholderLabel} />
        )}
        {tag ? (
          <span className="font-condensed absolute top-3 left-3.5 z-10 rounded bg-zr-green px-2.5 py-1 text-xs font-bold tracking-wide text-zr-bg">
            {tag}
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <div className="font-condensed text-[13px] font-bold tracking-wide text-zr-green">
          {kicker}
        </div>
        <div className="font-display mt-1.5 text-xl leading-tight font-semibold text-white uppercase group-hover:text-zr-green">
          {title}
        </div>
        {excerpt ? (
          <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-zr-text-secondary">
            {excerpt}
          </p>
        ) : null}
        {meta ? <div className="mt-3 text-[12.5px] text-zr-text-faint">{meta}</div> : null}
      </div>
    </Link>
  )
}
