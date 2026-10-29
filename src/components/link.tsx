import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { hrefFor, navigate } from '@/lib/router'

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** App-relative target, e.g. "/" or "/projects#top". */
  to: string
}

/** Anchor that navigates client-side, falling back to normal links for new tabs. */
export function Link({ to, onClick, ...props }: LinkProps) {
  const [path = '/', hash] = to.split('#')

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    navigate(to)
  }

  return <a href={hrefFor(path || '/', hash)} onClick={handleClick} {...props} />
}
