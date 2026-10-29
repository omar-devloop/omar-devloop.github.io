import { useState } from 'react'
import type { MouseEvent } from 'react'
import { Mail, Menu } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { cn } from 'cn'
import { site } from '@/data/site'
import { useActiveSection } from '@/hooks/use-active-section'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Link } from '@/components/link'
import { navigate, sectionHref } from '@/lib/router'

const sectionIds = ['home', 'about', 'contact']

export function SiteHeader({ path }: { path: string }) {
  const [open, setOpen] = useState(false)
  const activeSection = useActiveSection(sectionIds, path)
  const isCurrent = (href: string) => href === path

  /**
   * The menu locks page scrolling while open, so an in-page anchor would fire
   * against a locked body. Close first, then scroll once the lock is released.
   */
  const handleSectionLink = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setOpen(false)
    const target = href.startsWith('#') ? (path === '/' ? href : `/${href}`) : href
    window.setTimeout(() => navigate(target), 400)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6">
        <Link
          to="/"
          className="group flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="flex size-7 items-center justify-center rounded-md border border-border bg-muted/60 font-mono text-[11px] font-medium tracking-tight">
            {site.initials}
          </span>
          <span className="text-sm font-medium tracking-tight">{site.name}</span>
          <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
            / {site.role}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => {
            const isRoute = !item.href.startsWith('#')
            const isActive = isRoute ? isCurrent(item.href) : activeSection === item.href.slice(1)
            const className = cn(
              'relative rounded-md px-3 py-1.5 text-sm transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50',
              isActive ? 'text-foreground' : 'text-muted-foreground',
            )
            const content = (
              <>
                {item.label}
                {isActive ? (
                  <span className="absolute inset-x-3 -bottom-[9px] h-px bg-foreground" />
                ) : null}
              </>
            )

            return isRoute ? (
              <Link
                key={item.href}
                to={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={className}
              >
                {content}
              </Link>
            ) : (
              <a
                key={item.href}
                href={sectionHref(item.href)}
                aria-current={isActive ? 'true' : undefined}
                className={className}
              >
                {content}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="icon" className="hidden sm:inline-flex">
            <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <GithubIcon />
            </a>
          </Button>
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex flex-col gap-1 px-4 pt-14">
                {site.nav.map((item) =>
                  item.href.startsWith('#') ? (
                    <a
                      key={item.href}
                      href={path === '/' ? item.href : `/${item.href}`}
                      onClick={handleSectionLink(item.href)}
                      className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isCurrent(item.href) ? 'page' : undefined}
                      className={cn(
                        'rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground',
                        isCurrent(item.href) ? 'text-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-3 flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"
                >
                  <GithubIcon className="size-4" />
                  GitHub
                </a>
                <a
                  href={`mailto:${site.email}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground"
                >
                  <Mail className="size-4" aria-hidden />
                  {site.email}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
