import projectsJson from '@/data/projects.generated.json'

export type Project = {
  name: string
  description: string
  url: string
  homepage: string | null
  language: string | null
  tags: string[]
  stars: number
  updatedAt: string
}

type ProjectsSnapshot = {
  username: string
  generatedAt: string
  repos: Project[]
}

export const projects = (projectsJson as ProjectsSnapshot).repos
