import Image from 'next/image'
import type { PartnerView } from '../../lib/content'

/**
 * Falls back to numbered placeholder tiles so the section keeps its shape
 * before any partner logos have been uploaded.
 */
export function PartnersGrid({
  partners,
  count,
}: {
  partners: PartnerView[]
  count: number
}) {
  const tileHeight = count > 4 ? 'h-[120px]' : 'h-24'
  const visible = partners.slice(0, count)
  const placeholders = Array.from({ length: Math.max(0, count - visible.length) }, (_, index) => ({
    key: `placeholder-${index}`,
    label: `[ logo ${visible.length + index + 1} ]`,
  }))

  return (
    <div className="partners-grid grid grid-cols-4 gap-4">
      {visible.map((partner) => {
        const tile = (
          <div
            className={`relative flex items-center justify-center rounded-lg border border-white/7 bg-zr-bg-card ${tileHeight}`}
          >
            {partner.logo ? (
              <Image
                src={partner.logo.url}
                alt={partner.name}
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-contain p-5"
              />
            ) : (
              <span className="font-condensed text-sm font-bold tracking-wide text-zr-text-muted uppercase">
                {partner.name}
              </span>
            )}
          </div>
        )

        return partner.url ? (
          <a
            key={partner.id}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {tile}
          </a>
        ) : (
          <div key={partner.id}>{tile}</div>
        )
      })}

      {placeholders.map((placeholder) => (
        <div
          key={placeholder.key}
          className={`ph flex items-center justify-center rounded-lg border border-white/7 bg-zr-bg-card ${tileHeight}`}
        >
          <span className="font-mono text-[11px] text-[#5a6a5d]">{placeholder.label}</span>
        </div>
      ))}
    </div>
  )
}
