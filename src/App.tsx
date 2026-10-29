import { useEffect } from 'react'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import { About } from '@/components/about'
import { Contact, SiteFooter } from '@/components/contact'
import { ProjectsPage } from '@/pages/projects-page'
import { TooltipProvider } from '@/components/ui/tooltip'
import { site } from '@/data/site'
import { Link } from '@/components/link'
import { useRoute } from '@/hooks/use-route'
import { Button } from '@/components/ui/button'

const titles: Record<string, string> = {
  '/': `${site.name} — ${site.role}`,
  '/projects': `Projects — ${site.name}`,
}

function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </>
  )
}

function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[60svh] max-w-5xl flex-col items-start justify-center px-6 py-16">
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">This page doesn&apos;t exist.</h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        The link may be out of date. Everything I&apos;ve shipped is on the projects page.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/">Back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/projects">See all projects</Link>
        </Button>
      </div>
    </section>
  )
}

export default function App() {
  const path = useRoute()
  const known = path === '/' || path === '/projects'

  useEffect(() => {
    document.title = titles[path] ?? `Page not found — ${site.name}`

    // Route changes start at the top, or at the requested section for links
    // such as /#about coming from the projects page.
    const hash = window.location.hash.slice(1)
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView()
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [path])

  return (
    <TooltipProvider delayDuration={150}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-xs focus:text-background"
      >
        Skip to content
      </a>

      <div className="flex min-h-svh flex-col">
        <SiteHeader path={path} />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {path === '/' ? <HomePage /> : path === '/projects' ? <ProjectsPage /> : null}
          {known ? null : <NotFoundPage />}
        </main>
        <SiteFooter />
      </div>
    </TooltipProvider>
  )
}
