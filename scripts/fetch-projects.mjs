/**
 * Pulls public repositories from the GitHub API and writes a static snapshot to
 * src/data/projects.generated.json at dev/build time.
 *
 * No token is required for local builds, but CI passes GITHUB_TOKEN to avoid
 * the low unauthenticated rate limit.
 *
 * If the API call fails, the existing snapshot is kept so builds never break.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outFile = resolve(root, 'src/data/projects.generated.json')
const configFile = resolve(root, 'src/data/projects.config.json')

const username = process.env.GITHUB_USER ?? 'omar-devloop'

const readJson = async (file, fallback) => {
  try {
    return JSON.parse(await readFile(file, 'utf8'))
  } catch {
    return fallback
  }
}

const config = await readJson(configFile, {})
const hidden = new Set(config.hidden ?? [])
const featured = config.featured ?? []
const tags = config.tags ?? {}
const descriptions = config.descriptions ?? {}

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': `${username}-portfolio-build`,
}
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
}

try {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
    { headers },
  )

  if (!response.ok) {
    throw new Error(`GitHub API responded ${response.status} ${response.statusText}`)
  }

  const raw = await response.json()

  const repos = raw
    .filter((repo) => !repo.fork && !repo.archived && !hidden.has(repo.name))
    .map((repo) => ({
      name: repo.name,
      description: descriptions[repo.name] ?? repo.description ?? '',
      url: repo.html_url,
      homepage: repo.homepage?.trim().includes('github.com')
        ? null
        : repo.homepage?.trim() || null,
      language: repo.language ?? null,
      tags: tags[repo.name] ?? repo.topics ?? [],
      stars: repo.stargazers_count ?? 0,
      updatedAt: repo.pushed_at ?? repo.updated_at,
    }))
    .sort((a, b) => {
      const ai = featured.indexOf(a.name)
      const bi = featured.indexOf(b.name)
      if (ai !== -1 || bi !== -1) {
        if (ai === -1) return 1
        if (bi === -1) return -1
        return ai - bi
      }
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    })

  await mkdir(dirname(outFile), { recursive: true })
  await writeFile(
    outFile,
    `${JSON.stringify({ username, generatedAt: new Date().toISOString(), repos }, null, 2)}\n`,
  )
  console.log(`[projects] fetched ${repos.length} repos for ${username}`)
} catch (error) {
  console.warn(`[projects] could not refresh projects: ${error.message}`)
  const snapshot = await readJson(outFile, null)
  if (!snapshot) {
    throw new Error('No cached projects snapshot available. Run again with network access.')
  }
  console.warn('[projects] using the committed snapshot instead')
}
