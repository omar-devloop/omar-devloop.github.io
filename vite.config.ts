import { copyFile } from 'node:fs/promises'
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
 * GitHub Pages serves 404.html for unknown paths and has no SPA rewrites. A
 * copy of index.html lets the client router handle deep links like /projects.
 */
function spaFallback(): Plugin {
  let outDir = resolve('dist')

  return {
    name: 'gh-pages-spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      await copyFile(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), spaFallback()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
