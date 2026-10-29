import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { projects } from '@/lib/projects'
import { site } from '@/data/site'
import { Link } from '@/components/link'
import { ProjectCard } from '@/components/project-card'
import { Button } from '@/components/ui/button'

export function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 rounded-md font-mono text-[11px] tracking-wide text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <ArrowLeft className="size-3" aria-hidden />
        Back home
      </Link>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
            Projects
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Everything I&apos;ve shipped in public
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
            {projects.length === 1
              ? 'One public repository so far.'
              : `${projects.length} public repositories, updated as new work lands.`}{' '}
            Mostly small tools that remove manual steps from field data collection.
          </p>
        </div>

        <Button asChild variant="outline" size="sm">
          <a href={site.githubRepos} target="_blank" rel="noreferrer">
            Browse on GitHub
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </div>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      {projects.length === 0 ? (
        <p className="mt-9 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No public repositories to show yet.
        </p>
      ) : null}

      <div className="mt-12 flex items-center justify-between border-t border-border/70 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to the home page
        </Link>
        <a
          href={site.githubRepos}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          GitHub
        </a>
      </div>
    </section>
  )
}
