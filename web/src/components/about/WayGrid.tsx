import type { WayItem } from '../../lib/content'

export function WayGrid({ items }: { items: WayItem[] }) {
  return (
    <div className="way-grid mt-10 grid grid-cols-2 gap-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-lg border border-t-[3px] border-white/7 border-t-zr-green bg-zr-bg-card p-6"
        >
          <div className="font-display text-[22px] font-semibold text-white uppercase">
            {item.title}
          </div>
          <div className="mt-2.5 text-[14.5px] leading-relaxed text-zr-text-muted">{item.body}</div>
        </div>
      ))}
    </div>
  )
}
