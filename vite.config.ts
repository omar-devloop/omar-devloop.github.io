import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages project sites are served from https://<user>.github.io/<repo>/
// so production builds need the repo name as base. Local dev stays at "/".
const repoBase = process.env.BASE_PATH ?? '/portfolio/'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  // `vite preview` serves the built files, so it needs the same base as the build.
  base: command === 'build' || isPreview ? repoBase : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
