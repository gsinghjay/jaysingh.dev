# jaysingh.dev

[![Deploy to GitHub Pages](https://github.com/gsinghjay/jaysingh.dev/actions/workflows/deploy.yml/badge.svg)](https://github.com/gsinghjay/jaysingh.dev/actions/workflows/deploy.yml)
[![Lighthouse CI](https://github.com/gsinghjay/jaysingh.dev/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/gsinghjay/jaysingh.dev/actions/workflows/lighthouse.yml)

My personal portfolio and blog — rebuilt from scratch with [Eleventy (11ty)](https://www.11ty.dev/) and a bold Neubrutalist design system.

## What's This?

This is where I showcase my projects, write about DevOps and engineering topics, and share my professional background. The site is designed to hit 100% Lighthouse scores across the board while staying easy to maintain and extend.

## Tech Stack

| Tech | What It Does |
|------|--------------|
| [11ty](https://www.11ty.dev/) | Static site generator — fast builds, zero client JS by default |
| [Nunjucks](https://mozilla.github.io/nunjucks/) | Templating engine |
| [TailwindCSS](https://tailwindcss.com/) | Utility-first CSS with the Neubrutalist design system |
| [Playwright](https://playwright.dev/) | E2E and accessibility testing |
| [Sanity.io](https://www.sanity.io/) | Headless CMS *(coming soon — Growth phase)* |

### Why 11ty?

Previously this was a React SPA. The migration to 11ty gives me:
- Pre-rendered HTML (instant loads, great SEO)
- Clean URLs (`/blog/post-name/` instead of `/#blog/post-name`)
- Build-time Mermaid diagrams (no client-side JS)
- CMS-ready architecture for when Sanity.io gets wired up

## Getting Started

**Prerequisites:** Node.js 24 LTS or higher

```bash
# Clone it
git clone https://github.com/gsinghjay/jaysingh.dev.git
cd jaysingh.dev

# Install dependencies
npm install

# Fire up the dev server
npm run dev
```

Site runs at `http://localhost:8080` with hot reload.

## Scripts

| Command | What It Does |
|---------|--------------|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build → `_site/` |
| `npm run test` | Run Playwright tests |
| `npm run test:ui` | Playwright tests with UI mode |

## Adding Content

### Blog Posts

Drop a Markdown file in `content/blog/`:

```markdown
---
id: my-new-post
title: My New Post
date: 2026-01-30
tags:
  - devops
  - docker
excerpt: A brief description of the post.
readTime: 5 min
---

Your content here...
```

### Projects

Drop a Markdown file in `content/projects/`:

```markdown
---
id: my-project
title: My Project
description: Brief project description.
technologies:
  - Python
  - FastAPI
challenge: The problem being solved.
solution: How it was solved.
impact: Results achieved.
---

Detailed project write-up...
```

### Site Config

Tweak these YAML files in `content/config/`:

- `profile.yaml` — Name, bio, contact info
- `resume.yaml` — Work experience, education
- `skills.yaml` — Technical skills by category

## Project Structure

```
jaysingh.dev/
├── content/           # All the content lives here
│   ├── blog/          # Blog posts (Markdown)
│   ├── projects/      # Project case studies (Markdown)
│   └── config/        # Site config (YAML)
├── src/
│   ├── _includes/     # Layouts and partials (Nunjucks)
│   ├── _data/         # Global data files
│   └── assets/        # CSS, JS, images
├── tests/             # Playwright tests
├── eleventy.config.js # 11ty config
└── tailwind.config.js # TailwindCSS config
```

## Sanity.io Integration (Planned)

The content structure is designed to plug into Sanity.io without major rewrites. When that happens:

- Content can be managed via Sanity Studio (no Git required)
- Webhooks trigger rebuilds on publish
- Markdown files remain as a fallback/local dev option

## Contributing

PRs welcome! Fork it, branch it, push it, PR it — the usual flow.

```bash
git checkout -b feature/cool-thing
# make changes
git commit -m "Add cool thing"
git push origin feature/cool-thing
# open PR
```

## Questions?

Open an issue or reach out via the contact info on the site.
