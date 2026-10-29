import type { ReactNode } from 'react'
import { cn } from 'cn'

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-6', className)}>
      <div className="max-w-xl">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="pb-1">{action}</div> : null}
    </div>
  )
}
