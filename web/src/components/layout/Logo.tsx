import Image from 'next/image'
import { cn } from '../../lib/cn'

export function Logo({
  className,
  width = 44,
  height = 44,
  alt = 'ZRTeam',
  decorative = false,
}: {
  className?: string
  width?: number
  height?: number
  alt?: string
  decorative?: boolean
}) {
  return (
    <Image
      src="/zr-logo.svg"
      alt={decorative ? '' : alt}
      className={cn('shrink-0', className)}
      width={width}
      height={height}
      aria-hidden={decorative ? 'true' : undefined}
      priority={!decorative}
    />
  )
}
