import { ArrowRight } from 'lucide-react'
import { projects } from '@/lib/projects'
import { SectionHeading } from '@/components/section-heading'
import { ProjectCard } from '@/components/project-card'
import { Button } from '@/components/ui/button'
import { Link } from '@/components/link'

const featuredProjects = projects.slice(0, 3)

export function Projects() {
  return (
    <section id="projects" className="border-t border-border/70">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built and shipped"
          description="A few things I've built, mostly tools that remove manual steps from field data collection. Every card links straight to the repository."
        />

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>

        {projects.length === 0 ? (
          <p className="mt-9 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No public repositories to show yet.
          </p>
        ) : (
          <div className="mt-9 flex justify-center">
            <Button asChild variant="outline" size="lg" className="px-4">
              <Link to="/projects">
                {projects.length > featuredProjects.length
                  ? `See all ${projects.length} projects`
                  : 'See all projects'}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
