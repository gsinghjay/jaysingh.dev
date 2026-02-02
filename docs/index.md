# jaysingh.dev - Project Documentation Index

**Generated:** 2026-02-01
**Scan Level:** Exhaustive (Full Rescan)
**Status:** Migration Complete

---

## Project Overview

| Attribute | Value |
|-----------|-------|
| **Type** | Static Site |
| **Repository** | Monolith |
| **Framework** | 11ty (Eleventy) 3.1.2 |
| **Templating** | Nunjucks |
| **Styling** | TailwindCSS 3.4.1 |
| **Node.js** | >=24.0.0 |
| **Testing** | Playwright + Vitest |

---

## Quick Reference

### Tech Stack
- **Framework:** 11ty (Eleventy) with Nunjucks
- **Styling:** TailwindCSS (Neubrutalist design)
- **Build:** 11ty + PostCSS + Mermaid CLI
- **Testing:** Playwright (E2E), Vitest (Unit)
- **Content:** Markdown with YAML frontmatter

### Architecture
- Pre-rendered static HTML
- File-based routing with clean URLs
- Build-time content validation
- Progressive enhancement (JS optional)

### Entry Points
- **11ty Config:** `eleventy.config.js`
- **Home Page:** `index.njk`
- **CSS Entry:** `css/input.css`
- **Mermaid Build:** `scripts/render-mermaid.js`

---

## Generated Documentation

### Core Documents

| Document | Description |
|----------|-------------|
| [Architecture](./architecture.md) | System architecture, data flow, component hierarchy |
| [Technology Stack](./technology-stack.md) | Dependencies, versions, build pipeline |
| [Project Structure](./project-structure.md) | High-level project overview, directory layout |

### Component Documentation

| Document | Description |
|----------|-------------|
| [Component Inventory](./component-inventory.md) | Nunjucks layouts, macros, partials, JS functions |

### Content & Schema

| Document | Description |
|----------|-------------|
| [Content Schema](./content-schema.md) | Frontmatter schemas, data files, validation rules |

### Development

| Document | Description |
|----------|-------------|
| [Development Guide](./development-guide.md) | Setup, scripts, workflow, troubleshooting |

### Metadata

| Document | Description |
|----------|-------------|
| [Existing Documentation](./existing-documentation.md) | Inventory of pre-existing docs |
| [project-parts.json](./project-parts.json) | Machine-readable project metadata |
| [project-scan-report.json](./project-scan-report.json) | Scan workflow state |

---

## Content Inventory

### Blog Posts (5)
- `_content/blog/building-fastapi-microservices.md`
- `_content/blog/ci-cd-best-practices.md`
- `_content/blog/docker-observability.md`
- `_content/blog/oauth2-authentication-gateway.md`
- `_content/blog/postgresql-performance.md`

### Projects (9)
- `_content/projects/authentication-gateway.md`
- `_content/projects/automation-scripts.md`
- `_content/projects/cicd-pipeline.md`
- `_content/projects/cloud-infrastructure-platform.md`
- `_content/projects/covid-dashboard.md`
- `_content/projects/event-driven-microservices.md`
- `_content/projects/jamf-pro-deployment.md`
- `_content/projects/observability-infrastructure.md`
- `_content/projects/qr-code-platform.md`

### Data Files
- `_data/site.json` - Site metadata
- `_data/profile.json` - Author profile
- `_data/resume.json` - Work experience, education
- `_data/skills.json` - Technical skills

---

## Sprint Status

| Epic | Status |
|------|--------|
| Epic 1: Foundation & Site Shell | ✅ Done |
| Epic 2: Blog Experience | ✅ Done |
| Epic 3: Project Showcase | 🔄 In Progress (3-5 ready) |
| Epic 4: Professional Profile | ✅ Done |
| Epic 5: Content Authoring Pipeline | ✅ Done |
| Epic 6: Production Deployment & SEO | ⏳ Backlog |
| Epic 7: Sanity.io CMS Integration | ⏳ Backlog |

---

## Getting Started

### Development
```bash
git clone https://github.com/gsinghjay/jaysingh.dev.git
cd jaysingh.dev
npm install
npm run dev
```

Site runs at `http://localhost:8080` with hot reload.

### Content Changes
```bash
# Edit content
vim _content/blog/my-post.md

# 11ty auto-rebuilds on save
```

### Production Build
```bash
npm run build
# Output: _site/
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `eleventy.config.js` | 11ty configuration, filters, collections |
| `tailwind.config.js` | Design system tokens |
| `playwright.config.ts` | E2E test configuration |
| `lib/filters.js` | Custom 11ty filters |
| `scripts/render-mermaid.js` | Mermaid SVG generator |
| `package.json` | Dependencies and scripts |

---

## Legacy Code

The following directories contain the original React implementation:

| Directory | Status | Notes |
|-----------|--------|-------|
| `src/` | Ignored by 11ty | React components for reference |
| `content/` | Ignored by 11ty | Has Jinja2 syntax conflicts |

These can be removed after full validation of 11ty implementation.

---

## Next Steps

When creating features or modifications:

1. **UI Changes:** Reference [Component Inventory](./component-inventory.md) for Nunjucks patterns
2. **Content Changes:** Follow schemas in [Content Schema](./content-schema.md)
3. **Architecture Changes:** Review [Architecture](./architecture.md) for system understanding
4. **New Features:** Check sprint status for next available story

---

*This documentation was generated by the BMAD document-project workflow (2026-02-01).*
