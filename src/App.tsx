import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import { About } from '@/components/about'
import { Contact, SiteFooter } from '@/components/contact'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function App() {
  return (
    <TooltipProvider delayDuration={150}>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-xs focus:text-background"
      >
        Skip to content
      </a>

      <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Hero />
          <Projects />
          <About />
          <Contact />
        </main>
        <SiteFooter />
      </div>
    </TooltipProvider>
  )
}
