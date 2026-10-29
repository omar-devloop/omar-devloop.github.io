import { ArrowUpRight, FolderGit2, Star } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import type { Project } from '@/lib/projects'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const languageColors: Record<string, string> = {
  Dart: '#00b4ab',
  TypeScript: '#3178c6',
  JavaScript: '#e3d34b',
  Python: '#3572a5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Kotlin: '#a97bff',
  Java: '#b07219',
}

function formatUpdated(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(date)
}

export function ProjectCard({ project }: { project: Project }) {
  const updated = formatUpdated(project.updatedAt)

  return (
    <Card className="relative flex h-full flex-col gap-0 py-0 ring-foreground/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-md/5 hover:ring-foreground/25">
      <CardHeader className="gap-3 p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground">
            <FolderGit2 className="size-4" aria-hidden />
          </span>

          <div className="relative z-10 flex items-center gap-0.5">
            {project.homepage ? (
              <Button asChild variant="ghost" size="icon-sm">
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open the live site for ${project.name}`}
                >
                  <ArrowUpRight />
                </a>
              </Button>
            ) : null}
            <Button asChild variant="ghost" size="icon-sm">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.name} source on GitHub`}
              >
                <GithubIcon />
              </a>
            </Button>
          </div>
        </div>

        <CardTitle className="text-base">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm outline-none after:absolute after:inset-0 after:content-[''] hover:underline hover:decoration-border hover:underline-offset-4 focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
          >
            {project.name}
          </a>
        </CardTitle>

        <CardDescription className="line-clamp-4 leading-relaxed text-pretty">
          {project.description || 'No description yet — take a look at the code.'}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto p-5 pt-0">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-[11px] font-normal text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <div className="flex items-center gap-3 border-t border-border/70 px-5 py-2.5 font-mono text-[11px] text-muted-foreground">
        {project.language ? (
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="size-2 rounded-full ring-1 ring-inset ring-black/10 dark:ring-white/15"
              style={{ backgroundColor: languageColors[project.language] ?? 'currentColor' }}
            />
            {project.language}
          </span>
        ) : null}
        {project.stars > 0 ? (
          <span className="flex items-center gap-1">
            <Star className="size-3" aria-hidden />
            {project.stars}
          </span>
        ) : null}
        {updated ? <span className="ml-auto">{updated}</span> : null}
      </div>
    </Card>
  )
}
