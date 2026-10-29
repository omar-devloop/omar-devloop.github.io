import { ArrowUpRight, Mail } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { site } from '@/data/site'
import { Link } from '@/components/link'
import { Button } from '@/components/ui/button'

export function Contact() {
  return (
    <section id="contact" className="border-t border-border/70">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-8 rounded-2xl border border-border bg-muted/30 p-7 sm:p-10 lg:flex-row lg:items-center">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Contact
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Have something worth building?
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
              I'm open to collaboration, feedback, and new opportunities. The fastest way to
              reach me is email.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild size="lg" className="px-4">
              <a href={`mailto:${site.email}`}>
                <Mail data-icon="inline-start" />
                Email me
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-4">
              <a href={site.github} target="_blank" rel="noreferrer">
                <GithubIcon data-icon="inline-start" />
                GitHub
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

const year = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono">
          © {year} {site.name}
        </p>
        <div className="flex items-center gap-4 font-mono">
          <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
            GitHub
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-foreground">
            Email
          </a>
          <Link to="/" className="hover:text-foreground">
            Top ↑
          </Link>
        </div>
      </div>
    </footer>
  )
}
