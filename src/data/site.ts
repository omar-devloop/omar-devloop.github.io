/**
 * Site-wide content. This is the only file you need to edit to change the
 * text on the page — project cards come from src/data/projects.generated.json.
 */
import avatarUrl from '@/assets/avatar.jpg'

export const site = {
  name: 'Omar Alafa',
  shortName: 'Omar',
  initials: 'OA',
  username: 'omar-devloop',
  role: 'Flutter Developer',
  headline: 'I build Flutter apps and small tools that make data collection less manual.',
  summary:
    'Self-taught developer focused on Flutter and Android. I turn repetitive, error-prone workflows into small, dependable products — most of them around KoboToolbox.',
  email: 'omaralafadouma@gmail.com',
  avatar: avatarUrl,
  github: 'https://github.com/omar-devloop',
  githubRepos: 'https://github.com/omar-devloop?tab=repositories',
  url: 'https://omar-devloop.github.io/',
  availability: 'Open to collaboration and new opportunities',
  now: {
    name: 'KoboMobile',
    url: 'https://github.com/omar-devloop/KoboMobile',
    note: 'a Flutter Android companion app for KoboToolbox field teams',
  },
  nav: [
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
} as const

export const about = {
  paragraphs: [
    "I'm a self-taught developer who builds mobile apps and browser tools for people who work with data in the field. My focus is Flutter on Android: fast interfaces, offline-friendly behaviour, and the small details that keep a workflow from breaking at the worst possible moment.",
    'Most of my projects orbit KoboToolbox, an open-source data collection platform used by humanitarian and research teams. I built an Android companion app for browsing, validating, and exporting submissions, and a browser extension for the bulk project administration that would otherwise be hours of clicking.',
    "Outside of that I'm always learning, experimenting, and shipping. I care about software that stays out of the way and does one job properly.",
  ],
  principles: [
    {
      title: 'Small and focused',
      description: 'One clear problem per tool, with the rough edges removed.',
    },
    {
      title: 'Built for the field',
      description: 'Assumes slow connections, cheap devices, and busy people.',
    },
    {
      title: 'Open by default',
      description: 'Public repositories, readable code, and room for feedback.',
    },
  ],
  skillGroups: [
    { label: 'Mobile', items: ['Flutter', 'Dart', 'Android'] },
    { label: 'Web & scripting', items: ['TypeScript', 'JavaScript', 'Python', 'HTML/CSS'] },
    { label: 'Tooling', items: ['Git', 'GitHub Actions', 'REST APIs', 'Chrome Extensions'] },
    { label: 'Domain', items: ['KoboToolbox', 'Data collection', 'Field surveys'] },
  ],
} as const
