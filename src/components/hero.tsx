import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { site } from '@/data/site'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section id="home">
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              {site.availability}
            </p>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {site.name}
            </h1>

            <p className="mt-4 max-w-xl text-lg leading-snug text-foreground/90 text-pretty sm:text-xl">
              {site.headline}
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground text-pretty">
              {site.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Button asChild size="lg" className="px-4">
                <a href="#projects">
                  View projects
                  <ArrowRight data-icon="inline-end" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-4">
                <a href={site.github} target="_blank" rel="noreferrer">
                  GitHub
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              </Button>
            </div>
          </div>

          <div className="order-first md:order-none">
            <div className="relative size-20 md:size-40 lg:size-48">
              <div className="absolute inset-0 rounded-full border border-border" />
              <div className="absolute inset-2 rounded-full border border-dashed border-border/70 md:inset-3" />
              <img
                src={site.avatar}
                alt={site.name}
                width={192}
                height={192}
                className="absolute inset-2 size-[calc(100%-1rem)] rounded-full object-cover md:inset-3 md:size-[calc(100%-1.5rem)]"
              />
            </div>
          </div>
        </div>

        <p className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border/70 pt-5 font-mono text-[11px] text-muted-foreground sm:mt-16">
          <span className="tracking-[0.18em] uppercase">Currently building</span>
          <a
            href={site.now.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-foreground underline-offset-4 hover:underline"
          >
            {site.now.name}
            <ArrowUpRight className="size-3" aria-hidden />
          </a>
          <span className="text-muted-foreground/70">— {site.now.note}</span>
        </p>
      </div>
    </section>
  )
}
