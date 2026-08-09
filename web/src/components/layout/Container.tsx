import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Container({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={cn('mx-auto w-full container px-5 md:px-10', className)}>{children}</div>
}
