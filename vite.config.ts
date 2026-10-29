import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'

// This is a GitHub Pages *user* site (omar-devloop.github.io), served from the
// domain root. Set BASE_PATH to deploy the same build under a subpath instead.
const base = process.env.BASE_PATH ?? '/'

/**
 * GitHub Pages serves static files only. Every client route gets its own
 * index.html so deep links answer with a 200, and 404.html keeps unknown paths
 * inside the app shell. Titles match src/App.tsx.
 */
const prerenderedPages = [
  { route: 'projects', title: 'Projects — Omar Alafa', url: 'https://omar-devloop.github.io/projects/' },
]

function withMeta(html: string, title: string, url?: string) {
  const withTitle = html.replace(/<title>.*<\/title>/, `<title>${title}</title>`)
  if (!url) return withTitle
  return withTitle.replace(
    /(<meta property="og:url" content=")[^"]*(" \/>)/,
    `$1${url}$2`,
  )
}

function staticRoutes(): Plugin {
  let outDir = resolve('dist')

  return {
    name: 'gh-pages-static-routes',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const indexPath = resolve(outDir, 'index.html')
      const html = await readFile(indexPath, 'utf8')

      await writeFile(resolve(outDir, '404.html'), withMeta(html, 'Page not found — Omar Alafa'))

      for (const page of prerenderedPages) {
        const dir = resolve(outDir, page.route)
        await mkdir(dir, { recursive: true })
        await writeFile(resolve(dir, 'index.html'), withMeta(html, page.title, page.url))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), staticRoutes()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
