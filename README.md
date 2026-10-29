# Omar Alafa — Portfolio

A small personal site that introduces me and lists my public GitHub repositories as projects.

Built with **Vite**, **React**, **TypeScript**, **Tailwind CSS v4** and **shadcn/ui**, deployed to **GitHub Pages** with GitHub Actions.

Live at: <https://omar-devloop.github.io/>

## Pages

- **Home** (`/`) — name, one-line pitch, availability, three featured projects, about, and contact.
- **All projects** (`/projects`) — the complete list of public repositories, generated from GitHub.
- **404** — any unknown path shows a short page with links back.

Project cards show the language, tags, stars, and last update. Dark and light themes, responsive layout, keyboard-friendly navigation.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
```

Requires Node 20+.

## Editing content

| What | Where |
| --- | --- |
| Name, role, headline, bio, skills, links | `src/data/site.ts` |
| Project order, hidden repos, tags, description overrides | `src/data/projects.config.json` |
| Colors, fonts, radius | `src/index.css` (shadcn theme tokens) |

### Projects

`scripts/fetch-projects.mjs` pulls public repositories from the GitHub API on every `dev` and `build`, filters out forks and archived repos, applies the overrides above, and writes `src/data/projects.generated.json`.

That snapshot is committed, so the site still builds if the API is unavailable or rate-limited. Set `GITHUB_TOKEN` to raise the rate limit (CI does this automatically).

To hide a repository, add its name to `hidden` in `src/data/projects.config.json`. To pin the order, list names in `featured`. The home page shows the first three projects in that order; `/projects` shows all of them.

## Build

```bash
npm run build      # type-check + static build to dist/
npm run preview    # serve dist/ locally at http://localhost:4173/
```

## Routing

This is a two-route single-page app with a tiny hand-rolled router (`src/lib/router.ts`) — no router dependency.

GitHub Pages has no SPA rewrites, so the build copies `dist/index.html` to `dist/404.html`. A direct visit to `/projects` is answered with that fallback, and the router renders the right page from the URL.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. In the repository settings, **Pages → Build and deployment → Source** must be set to **GitHub Actions**.

The repository is named `omar-devloop.github.io`, so it is a GitHub Pages **user** site served from the domain root and Vite's base path is `/`. To deploy under a subpath instead, set the `BASE_PATH` environment variable (e.g. `BASE_PATH=/portfolio/`).

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Refresh project data, start Vite |
| `npm run build` | Refresh project data, type-check, build |
| `npm run preview` | Preview the production build |
| `npm run projects` | Refresh `projects.generated.json` only |
| `npm run typecheck` | TypeScript only |
| `npm run lint` | oxlint |
