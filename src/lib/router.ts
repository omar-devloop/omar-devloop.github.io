/**
 * A deliberately small client-side router for a two-page site.
 *
 * Routes are read from `window.location.pathname` (minus Vite's base) and
 * navigation uses the History API. On GitHub Pages, deep links such as
 * /projects are served through the generated 404.html fallback, which boots
 * the same app shell.
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '')

function stripBase(pathname: string) {
  if (!base) return pathname
  return pathname.startsWith(base) ? pathname.slice(base.length) : pathname
}

/** Current route without a trailing slash, e.g. "/" or "/projects". */
export function currentPath() {
  const path = stripBase(window.location.pathname).replace(/\/+$/, '')
  return path === '' ? '/' : path
}

/** Builds a full href for an app path and optional hash. */
export function hrefFor(path: string, hash?: string) {
  const pathname = path === '/' ? base || '/' : `${base}${path}`
  return hash ? `${pathname}#${hash}` : pathname
}

/** Client-side navigation. Accepts "/projects", "/#about" or "#about". */
export function navigate(to: string) {
  const [rawPath = '', hash] = to.split('#')
  const path = rawPath ? (rawPath.startsWith('/') ? rawPath : `/${rawPath}`) : currentPath()

  if (path !== currentPath()) {
    window.history.pushState(null, '', hrefFor(path, hash))
    window.dispatchEvent(new PopStateEvent('popstate'))
    return
  }

  // Same route: update the hash and scroll, without a page load.
  window.history.replaceState(null, '', hrefFor(path, hash))
  if (hash) {
    document.getElementById(hash)?.scrollIntoView()
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

/** Resolves a section anchor to a link that also works from other routes. */
export function sectionHref(hash: string) {
  return hrefFor('/', hash.replace(/^#/, ''))
}
