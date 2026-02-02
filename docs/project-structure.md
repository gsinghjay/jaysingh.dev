# jaysingh.dev - Project Structure

**Generated:** 2026-02-01
**Scan Type:** Full Rescan (Exhaustive)

---

## Overview

| Attribute | Value |
|-----------|-------|
| **Repository Type** | Monolith |
| **Project Type** | Web (Static Site) |
| **Framework** | 11ty (Eleventy) 3.1.2 |
| **Language** | JavaScript + Nunjucks |
| **Styling** | TailwindCSS 3.4.1 |
| **Build System** | 11ty + PostCSS + Mermaid CLI |
| **Testing** | Playwright (E2E) + Vitest (Unit) |
| **Node.js** | >=24.0.0 |

---

## Migration Status

This project has completed migration from React/Vite to 11ty/Nunjucks:

| Component | Previous | Current | Status |
|-----------|----------|---------|--------|
| Framework | React 18.3.1 | 11ty 3.1.2 | ✅ Migrated |
| Templating | JSX | Nunjucks | ✅ Migrated |
| Routing | Hash-based SPA | File-based static | ✅ Migrated |
| Build Tool | Vite 5.4.2 | 11ty + PostCSS | ✅ Migrated |
| Node.js | 18+ | 24+ | ✅ Upgraded |
| Rendering | Client-side | Pre-rendered | ✅ Migrated |

**Legacy Code Status:**
- `src/` - React components (ignored by 11ty, retained for reference)
- `content/` - React-era content (ignored, has Jinja2/Prometheus syntax conflicts)

---

## Directory Structure

```
jaysingh.dev/
├── _content/              # 11ty content source
│   ├── blog/              # Blog posts (5 posts)
│   └── projects/          # Project case studies (9 projects)
├── _data/                 # Global data files
│   ├── site.json          # Site metadata
│   ├── profile.json       # Author profile
│   ├── resume.json        # Work experience
│   └── skills.json        # Technical skills
├── _includes/             # Nunjucks templates
│   ├── layouts/           # Page layouts
│   │   ├── base.njk       # Base HTML layout
│   │   ├── blog-post.njk  # Blog post layout
│   │   └── project.njk    # Project detail layout
│   ├── components/        # Reusable components
│   │   ├── button.njk     # Button component
│   │   ├── card.njk       # Card component
│   │   ├── tag.njk        # Tag/badge component
│   │   └── external-links.njk # External link component
│   └── partials/          # Page partials
│       ├── header.njk     # Site header
│       ├── footer.njk     # Site footer
│       ├── meta.njk       # Meta tags
│       ├── skip-link.njk  # Accessibility skip link
│       ├── social-share.njk # Social sharing
│       └── related-projects.njk # Related projects
├── _site/                 # Build output (generated)
├── css/                   # TailwindCSS source
│   └── input.css          # Tailwind input file
├── js/                    # Client-side JavaScript
│   ├── mobile-nav.js      # Mobile navigation
│   ├── code-copy.js       # Code block copy button
│   └── diagram-viewer.js  # Mermaid diagram viewer
├── lib/                   # Node.js utilities
│   └── filters.js         # 11ty filters
├── public/                # Static assets (passthrough)
│   ├── images/            # Image assets
│   ├── diagrams/          # Pre-rendered Mermaid SVGs
│   └── fonts/             # Font files
├── scripts/               # Build scripts
│   ├── build-content.js   # Legacy React content builder
│   └── render-mermaid.js  # Mermaid SVG renderer
├── tests/                 # Test suite
│   ├── e2e/               # Playwright E2E tests (15 specs)
│   ├── unit/              # Vitest unit tests (4 specs)
│   └── support/           # Test utilities
├── content/               # [LEGACY] React content
├── src/                   # [LEGACY] React components
├── docs/                  # Project documentation
├── eleventy.config.js     # 11ty configuration
├── tailwind.config.js     # Tailwind configuration
├── playwright.config.ts   # Playwright configuration
├── vitest.config.ts       # Vitest configuration
└── package.json           # Node.js manifest
```

---

## Entry Points

| Entry Point | File | Purpose |
|-------------|------|---------|
| **11ty Config** | `eleventy.config.js` | Main 11ty configuration |
| **Home Page** | `index.njk` | Site homepage |
| **Blog Listing** | `blog.njk` | Blog index page |
| **Projects Listing** | `projects.njk` | Projects index page |
| **Resume Page** | `resume.njk` | Resume/CV page |
| **Contact Page** | `contact.njk` | Contact form page |
| **CSS Entry** | `css/input.css` | TailwindCSS entry |
| **Mermaid Build** | `scripts/render-mermaid.js` | Diagram pre-rendering |

---

## Content Inventory

### Blog Posts (5)
| File | Title |
|------|-------|
| `_content/blog/building-fastapi-microservices.md` | Building FastAPI Microservices |
| `_content/blog/ci-cd-best-practices.md` | CI/CD Best Practices |
| `_content/blog/docker-observability.md` | Docker Observability |
| `_content/blog/oauth2-authentication-gateway.md` | OAuth2 Authentication Gateway |
| `_content/blog/postgresql-performance.md` | PostgreSQL Performance |

### Projects (9)
| File | Title |
|------|-------|
| `_content/projects/authentication-gateway.md` | Authentication Gateway |
| `_content/projects/automation-scripts.md` | Automation Scripts |
| `_content/projects/cicd-pipeline.md` | CI/CD Pipeline |
| `_content/projects/cloud-infrastructure-platform.md` | Cloud Infrastructure Platform |
| `_content/projects/covid-dashboard.md` | COVID Dashboard |
| `_content/projects/event-driven-microservices.md` | Event-Driven Microservices |
| `_content/projects/jamf-pro-deployment.md` | Jamf Pro Deployment |
| `_content/projects/observability-infrastructure.md` | Observability Infrastructure |
| `_content/projects/qr-code-platform.md` | QR Code Platform |

### Data Files (4)
| File | Purpose |
|------|---------|
| `_data/site.json` | Site metadata (title, description, baseUrl) |
| `_data/profile.json` | Author profile information |
| `_data/resume.json` | Work experience and education |
| `_data/skills.json` | Technical skills inventory |

---

## Test Coverage

### E2E Tests (Playwright) - 15 specs
- `accessibility.spec.ts` - WCAG compliance
- `base-layout.spec.ts` - Layout structure
- `blog.spec.ts` - Blog functionality
- `blog-content-pipeline.spec.ts` - Content processing
- `contact.spec.ts` - Contact form
- `header-footer.spec.ts` - Navigation
- `home-page.spec.ts` - Homepage
- `local-dev-workflow.spec.ts` - Development workflow
- `mermaid-processing.spec.ts` - Diagram rendering
- `mobile-navigation.spec.ts` - Mobile menu
- `profile.spec.ts` - Profile data
- `project-content-pipeline.spec.ts` - Project processing
- `projects.spec.ts` - Projects functionality
- `resume.spec.ts` - Resume page
- `site-configuration.spec.ts` - Site config
- `smoke.spec.ts` - Basic functionality

### Unit Tests (Vitest) - 4 specs
- `filters.test.js` - 11ty filter functions
- `frontmatter-validation.spec.ts` - Blog frontmatter
- `project-validation.spec.ts` - Project frontmatter
- `dev-workflow-config.spec.ts` - Dev workflow

---

*Generated by BMAD document-project workflow*
