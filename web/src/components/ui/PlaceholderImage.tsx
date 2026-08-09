import { cn } from '../../lib/cn'

/** The diagonal-stripe stand-in used wherever a photo has not been uploaded. */
export function PlaceholderImage({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <div className={cn('ph flex h-full items-end p-3.5', className)}>
      <span className="font-mono text-[11px] tracking-wide text-[#5a6a5d]">{label}</span>
    </div>
  )
}
