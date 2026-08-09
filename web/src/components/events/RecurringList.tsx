import type { RecurringView } from '../../lib/content'

export function RecurringList({ items }: { items: RecurringView[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-md border border-l-[3px] border-white/7 border-l-zr-openmat bg-zr-bg-surface px-4 py-3.5"
        >
          <div className="font-display text-[15px] font-semibold text-white uppercase">
            {item.title}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-condensed text-[13px] font-bold tracking-wide text-zr-green">
              {item.day}
            </span>
            <span className="text-[13px] text-zr-text-muted">· {item.time}</span>
          </div>
          <div className="mt-1.5 text-xs text-zr-text-faint">{item.place}</div>
        </div>
      ))}
    </div>
  )
}
