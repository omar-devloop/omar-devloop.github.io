import { useEffect, useState } from 'react'
import { currentPath } from '@/lib/router'

/** Current client-side route, updated on back/forward and in-app navigation. */
export function useRoute() {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    const sync = () => setPath(currentPath())
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  return path
}
