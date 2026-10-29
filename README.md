# Omar Alafa — Portfolio

A small personal site that introduces me and lists my public GitHub repositories as projects.

Built with **Vite**, **React**, **TypeScript**, **Tailwind CSS v4** and **shadcn/ui**, deployed to **GitHub Pages** with GitHub Actions.

Live at: <https://omar-devloop.github.io/portfolio/>

## Sections

- **Home** — name, one-line pitch, availability, primary links.
- **Projects** — cards generated from my public repositories (language, tags, stars, last update).
- **About** — short bio, how I work, and the toolkit.
- **Contact** — email and GitHub.

Dark and light themes, responsive layout, keyboard-friendly navigation.

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

To hide a repository, add its name to `hidden` in `src/data/projects.config.json`. To pin the order, list names in `featured`.

## Build

```bash
npm run build      # type-check + static build to dist/
npm run preview    # serve dist/ locally at /portfolio/
```

`vite.config.ts` sets the production base path to `/portfolio/` because this is a GitHub Pages **project** site. If the repository is renamed, update `repoBase` there.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. In the repository settings, **Pages → Build and deployment → Source** must be set to **GitHub Actions**.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Refresh project data, start Vite |
| `npm run build` | Refresh project data, type-check, build |
| `npm run preview` | Preview the production build |
| `npm run projects` | Refresh `projects.generated.json` only |
| `npm run typecheck` | TypeScript only |
| `npm run lint` | oxlint |
