---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
status: complete
completedAt: '2026-01-29'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - docs/index.md
  - docs/architecture.md
  - docs/technology-stack.md
  - docs/architecture-patterns.md
  - docs/component-inventory.md
  - docs/content-schema.md
  - docs/state-management.md
  - docs/project-structure.md
  - docs/source-tree-analysis.md
  - docs/development-guide.md
workflowType: 'architecture'
project_name: 'jaysingh.dev'
user_name: 'Jay'
date: '2026-01-29'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (40 FRs):**

The PRD defines a comprehensive feature parity migration organized into 8 categories:

| Category | FRs | Architectural Implication |
|----------|-----|---------------------------|
| Navigation & Structure | FR1-FR5 | 11ty layout templates, clean URL routing |
| Content Display | FR6-FR11 | Build-time rendering, Nunjucks partials |
| Blog Functionality | FR12-FR16 | Collections, list/detail templates, related content |
| Project Showcase | FR17-FR21 | Collections, filters (client JS), detail templates |
| Resume & Contact | FR22-FR27 | Static data files, layout templates |
| Content Authoring | FR28-FR32 | Markdown pipeline, frontmatter schemas |
| Build & Deployment | FR33-FR37 | 11ty config, GitHub Actions, TailwindCSS pipeline |
| SEO & Discoverability | FR38-FR40 | Sitemap plugin, meta tags, robots.txt |

**Non-Functional Requirements (23 NFRs):**

| Category | NFRs | Target | Architectural Driver |
|----------|------|--------|----------------------|
| Performance | NFR1-NFR7 | Lighthouse 100, FCP < 1s, LCP < 1.5s | Pre-rendered HTML, purged CSS, build-time SVG |
| Accessibility | NFR8-NFR14 | WCAG 2.1 AA, Lighthouse 100 | Semantic HTML, ARIA, skip links, focus states |
| Maintainability | NFR15-NFR20 | 11ty conventions, CMS-ready | Data cascade, content separation, schema stability |
| Security | NFR21-NFR23 | HTTPS, no sensitive data | Static site simplicity, GitHub Pages default |

**Scale & Complexity:**

- **Primary domain:** Static Site Generation (Jamstack)
- **Complexity level:** Low-Medium (migration with clear parity target)
- **Estimated architectural components:** ~12 (layouts, partials, collections, filters, plugins)

### Technical Constraints & Dependencies

| Constraint | Source | Impact |
|------------|--------|--------|
| Node.js 24 LTS | PRD | Build environment, plugin compatibility |
| 11ty + Nunjucks | PRD | Templating paradigm, no React/JSX |
| TailwindCSS 3.4.x | Existing | Design system portability, purge config |
| GitHub Pages | PRD | Static output only, no server functions |
| Build-time Mermaid SVG | PRD | Custom plugin or mermaid-cli integration |

### Cross-Cutting Concerns Identified

1. **Performance Budget** - 100% Lighthouse is the primary architectural constraint. Every decision must prioritize minimal JS, optimized CSS, and pre-rendered content.

2. **Content Abstraction** - Current Markdown + YAML schemas must map cleanly to future Sanity.io. Architecture should separate content fetching from rendering.

3. **Design System Tokens** - TailwindCSS config (colors, shadows, typography) must transfer unchanged. Component styling patterns (brutal borders, box shadows) must be preserved in Nunjucks.

4. **Accessibility Throughout** - Not a checkbox but a structural requirement. Skip links, landmarks, focus states, and ARIA must be built into base templates.

5. **CI/CD Pipeline** - GitHub Actions workflow must handle: content changes → build → deploy. Future hook for Sanity webhooks.

## Starter Template Evaluation

### Primary Technology Domain

**Static Site Generation (Jamstack)** - Migration from React SPA to pre-rendered static site.

### Starter Options Considered

| Option | Considered | Verdict |
|--------|------------|---------|
| `eleventy-base-blog` | Official 11ty starter | Too opinionated for component migration |
| `11ty-tailwind-starter` | Community starter | TailwindCSS config may conflict with existing |
| `eleventy-high-performance-blog` | Google's starter | Over-engineered for this scope |
| **Vanilla 11ty** | Minimal setup | Best fit - full control for migration |

### Selected Approach: Vanilla 11ty Configuration

**Rationale for Selection:**
- Brownfield migration requires preserving existing patterns, not adopting new ones
- Existing TailwindCSS config with Neubrutalist tokens must be ported intact
- 22 React components need 1:1 translation to Nunjucks without starter conventions in the way
- Content structure (`content/blog/`, `content/projects/`) is already 11ty-compatible

**Initialization Approach:**

```bash
npm init -y
npm install @11ty/eleventy --save-dev
npm install @11ty/eleventy-plugin-syntaxhighlight --save-dev
npm install tailwindcss postcss autoprefixer --save-dev
```

### Architectural Decisions (Manual Configuration)

**Language & Runtime:**
- Node.js 24 LTS
- JavaScript (ESM) for config files
- No TypeScript in templates (Nunjucks)

**Styling Solution:**
- TailwindCSS 3.4.x (ported from existing config)
- PostCSS pipeline with autoprefixer
- Build-time CSS purging for production

**Build Tooling:**
- 11ty as primary build orchestrator
- npm scripts for development/production
- GitHub Actions for CI/CD

**Templating:**
- Nunjucks for layouts and partials
- Markdown for content with YAML frontmatter
- 11ty data cascade for global data

**Code Organization:**
```
├── _data/           # Global data (profile, resume, skills)
├── _includes/
│   ├── layouts/     # base.njk, blog.njk, project.njk
│   └── components/  # header.njk, footer.njk, card.njk, etc.
├── content/
│   ├── blog/        # Markdown blog posts (existing)
│   └── projects/    # Markdown projects (existing)
├── css/
│   └── styles.css   # TailwindCSS entry point
├── js/
│   └── main.js      # Minimal client JS (copy, menu, share)
├── eleventy.config.js
├── tailwind.config.js  # Ported from existing
└── package.json
```

**Development Experience:**
- `npm run dev` - 11ty serve with hot reload
- `npm run build` - Production build with CSS purge
- Local Lighthouse testing before deploy

**Note:** First implementation story should be "Initialize 11ty project with TailwindCSS pipeline."

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Content source strategy (keep existing `content/` structure)
- Build pipeline (11ty + TailwindCSS + Mermaid pre-render)
- URL structure (clean URLs without dates)

**Important Decisions (Shape Architecture):**
- Layout hierarchy and component organization
- Client-side JavaScript scope
- GitHub Actions workflow

**MVP Decisions (Sanity.io Integration):**
- Sanity.io as primary content source for collaborators
- Webhook-triggered rebuilds on content publish
- Dual-source architecture (Sanity API + local Markdown fallback)

**Deferred Decisions (Post-MVP):**
- Image optimization pipeline
- Search functionality
- Content preview/draft mode

### Data Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Content Source | Dual-source: Sanity API (primary) + local Markdown (fallback) | Collaborators use CMS, Jay can use Git |
| Global Data | `_data/` folder with Sanity fetch | Auto-loaded, fetches from Sanity at build time |
| CMS Integration | Sanity.io with @sanity/client | Build-time fetch, static output, webhook rebuilds |
| Collections | `blog` and `projects` from Sanity API | Maps to Sanity schemas |
| Fallback | Local `content/` structure | Zero-dependency local development |

**Content Flow:**
```
Sanity API ─────────────┐
                        ├──▶ 11ty Collections ──▶ Nunjucks Templates ──▶ _site/
content/blog/*.md ──────┘ (fallback)

Sanity API ─────────────┐
                        ├──▶ Global Data ──▶ Available in all templates
_data/*.json ───────────┘ (fallback)

Webhook: Sanity Publish ──▶ GitHub Actions ──▶ Build & Deploy
```

**Sanity.io Configuration:**

| Setting | Value | Purpose |
|---------|-------|---------|
| Project | Single project | jaysingh.dev content |
| Dataset | `production` | Live content |
| API Version | `2024-01-01` | Stable API |
| Fetch Method | @sanity/client in `_data/` | Build-time fetch |
| Webhook | repository_dispatch to GitHub | Trigger rebuilds |

### Frontend Architecture

**Layout Hierarchy:**

| Layout | Extends | Purpose |
|--------|---------|---------|
| `base.njk` | - | HTML shell, head, meta, header/footer |
| `page.njk` | base | Static pages (home, contact, resume) |
| `blog-post.njk` | base | Blog detail pages |
| `project.njk` | base | Project detail pages |

**Component Organization:**

```
_includes/
├── layouts/
│   ├── base.njk           # HTML shell
│   ├── blog-post.njk      # Blog detail
│   └── project.njk        # Project detail
├── components/
│   ├── card.njk           # Macro: reusable card
│   ├── button.njk         # Macro: action button
│   ├── tag.njk            # Macro: technology tag
│   └── callout.njk        # Macro: info/warning box
└── partials/
    ├── header.njk         # Site header/nav
    ├── footer.njk         # Site footer
    ├── social-share.njk   # Share buttons
    └── reading-progress.njk # Scroll progress
```

**Client-Side JavaScript (Minimal):**

| Feature | Implementation | Size |
|---------|----------------|------|
| Mobile menu | Vanilla JS toggle | ~15 lines |
| Code copy | Event delegation on code blocks | ~20 lines |
| Social share | Web Share API with fallback | ~25 lines |

**No client JS for:** Navigation, Mermaid diagrams, syntax highlighting, content rendering.

### URL Structure

**Decision:** Clean URLs without dates

| Content Type | URL Pattern | Example |
|--------------|-------------|---------|
| Blog listing | `/blog/` | `/blog/` |
| Blog post | `/blog/{id}/` | `/blog/docker-observability/` |
| Project listing | `/projects/` | `/projects/` |
| Project detail | `/projects/{id}/` | `/projects/qr-code-platform/` |
| Static pages | `/{page}/` | `/resume/`, `/contact/` |

**Rationale:**
- Content is evergreen (technical tutorials, case studies)
- Unique `id` fields already exist in frontmatter
- Cleaner, more shareable URLs
- Dates display on page, not in URL

### Build Pipeline

**Mermaid Rendering:**

| Step | Tool | Output |
|------|------|--------|
| Pre-build | `@mermaid-js/mermaid-cli` | SVG files in `_site/diagrams/` |
| In templates | `<img src="/diagrams/{id}.svg">` | Static image reference |

**TailwindCSS Integration:**

| Step | Command | Purpose |
|------|---------|---------|
| Development | `npx tailwindcss -i ./css/input.css -o ./_site/css/styles.css --watch` | Hot reload |
| Production | `npx tailwindcss -i ./css/input.css -o ./_site/css/styles.css --minify` | Purged, minified |

**Build Sequence:**
```bash
npm run build:css      # TailwindCSS → _site/css/styles.css
npm run build:mermaid  # Mermaid → _site/diagrams/*.svg
npm run build          # 11ty → _site/
```

### Infrastructure & Deployment

**GitHub Actions Workflow:**

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
      - run: npm ci
      - run: npm run build:css
      - run: npm run build:mermaid
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

**Environment Configuration:**

| Environment | Command | Features |
|-------------|---------|----------|
| Development | `npm run dev` | 11ty serve, Tailwind watch, hot reload |
| Production | `npm run build` | Full optimization, CSS purge, minification |

**No secrets required** - static site with no API keys or sensitive configuration.

### Decision Impact Analysis

**Implementation Sequence:**
1. Initialize 11ty with base configuration
2. Set up TailwindCSS pipeline (port existing config)
3. Create base layout with header/footer
4. Implement component macros (card, button, tag)
5. Set up blog collection and templates
6. Set up projects collection and templates
7. Implement Mermaid pre-rendering
8. Add minimal client JS (menu, copy, share)
9. Configure GitHub Actions deployment
10. Lighthouse optimization pass

**Cross-Component Dependencies:**
- All pages depend on `base.njk` layout
- Blog/project details depend on component macros
- Mermaid rendering must complete before 11ty build
- TailwindCSS must include all component classes

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 8 areas where AI agents could make different choices

### Naming Patterns

**File Naming Convention:**

| Type | Pattern | Example |
|------|---------|---------|
| Layouts | `kebab-case.njk` | `blog-post.njk`, `base.njk` |
| Components | `kebab-case.njk` | `card.njk`, `social-share.njk` |
| Partials | `kebab-case.njk` | `header.njk`, `footer.njk` |
| Data files | `kebab-case.json` | `profile.json`, `resume.json` |
| Content | `kebab-case.md` | `docker-observability.md` |

**Collection Naming:**

| Collection | Name | Source |
|------------|------|--------|
| Blog posts | `posts` | `content/blog/*.md` |
| Projects | `projects` | `content/projects/*.md` |

**Frontmatter Fields:** camelCase (matches existing React schemas)
- ✓ `readTime`, `relatedProjectIds`, `projectType`
- ✗ `read_time`, `related_project_ids`, `project_type`

### Structure Patterns

**Template Organization:**

```
_includes/
├── layouts/           # Extend with {% extends %}
│   ├── base.njk
│   ├── blog-post.njk
│   └── project.njk
├── components/        # Import with {% from %} for macros
│   ├── card.njk
│   ├── button.njk
│   └── tag.njk
└── partials/          # Use with {% include %}
    ├── header.njk
    ├── footer.njk
    └── meta.njk
```

**Macro vs Include Decision:**

| Pattern | Use When | Example |
|---------|----------|---------|
| `{% extends %}` | Page inherits layout structure | `{% extends "layouts/base.njk" %}` |
| `{% include %}` | Static partial, no parameters | `{% include "partials/header.njk" %}` |
| `{% from %} import` | Reusable component with props | `{% from "components/card.njk" import card %}` |

### Format Patterns

**Nunjucks Code Style:**

```nunjucks
{# Spacing: single space inside braces #}
{{ variable }}
{% if condition %}

{# Filters: pipe with spaces #}
{{ title | upper | safe }}

{# Macro signature: defaults last #}
{% macro card(title, content, className="") %}

{# Comments: use Nunjucks comments, not HTML #}
{# This is correct #}
```

**Data File Format:**

| Location | Format | Example |
|----------|--------|---------|
| `_data/` | JSON | `{ "name": "Jay Singh" }` |
| Frontmatter | YAML | `title: My Post` |

### CSS & JavaScript Patterns

**CSS Class Conventions:**

| Type | Pattern | Example |
|------|---------|---------|
| Utility | TailwindCSS only | `bg-lime-400 border-4 border-black` |
| State | `is-*` / `has-*` prefix | `is-active`, `has-error` |
| JS hooks | `js-*` prefix | `js-mobile-menu`, `js-copy-button` |

**JavaScript Patterns:**

```javascript
// Use data attributes for JS hooks, not classes
// <button data-copy-target="code-1">Copy</button>

// Event delegation for dynamic content
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-copy-target]')) {
    // handle copy
  }
});

// No jQuery, no external dependencies
// Vanilla JS only for the 3 features: menu, copy, share
```

### Accessibility Patterns

**HTML Structure:**

| Element | Rule |
|---------|------|
| `<h1>` | Exactly one per page (in content, not header) |
| Heading order | Never skip levels (h1 → h2 → h3) |
| `<nav>` | Include `aria-label="Main navigation"` |
| `<main>` | Include `id="main-content"` for skip link |
| Images | Always include meaningful `alt` |
| Links | Descriptive text or `aria-label` |

**Focus States:**

All interactive elements must have visible focus states using the Neubrutalist style:
```css
:focus-visible {
  outline: 4px solid black;
  outline-offset: 2px;
}
```

### Enforcement Guidelines

**All AI Agents MUST:**

1. Follow kebab-case file naming for all template files
2. Use camelCase for frontmatter fields (preserve existing schemas)
3. Use `js-*` prefix for JavaScript hook classes
4. Use Nunjucks comments `{# #}` not HTML comments
5. Import macros explicitly with `{% from %}`, never use inline macro definitions
6. Maintain heading hierarchy (never skip levels)
7. Include `alt` on all images, `aria-label` on icon-only buttons

### Pattern Examples

**Good Example - Card Macro:**
```nunjucks
{# _includes/components/card.njk #}
{% macro card(title, content, href="", className="") %}
  <article class="bg-white border-4 border-black shadow-brutal p-6 {{ className }}">
    <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
    <p>{{ content }}</p>
    {% if href %}
      <a href="{{ href }}" class="text-blue-600 hover:underline">Read more</a>
    {% endif %}
  </article>
{% endmacro %}
```

**Anti-Patterns:**
```nunjucks
{# ✗ Wrong: PascalCase filename #}
{# _includes/components/Card.njk #}

{# ✗ Wrong: inline macro in page template #}
{% macro card() %}...{% endmacro %}

{# ✗ Wrong: snake_case frontmatter #}
{# read_time: 10 min #}

{# ✗ Wrong: class-based JS hooks #}
{# <button class="copy-button"> - Should be js-copy-button or data-* #}
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```
jaysingh.dev/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions: build + deploy
│
├── _data/                          # Global data (11ty auto-loads)
│   ├── profile.json                # Name, role, bio, social links
│   ├── resume.json                 # Work experience, education
│   ├── skills.json                 # Technical skills
│   └── site.json                   # Site metadata
│
├── _includes/
│   ├── layouts/                    # Page layouts
│   │   ├── base.njk                # HTML shell
│   │   ├── blog-post.njk           # Blog detail
│   │   └── project.njk             # Project detail
│   ├── components/                 # Reusable macros
│   │   ├── card.njk
│   │   ├── button.njk
│   │   ├── tag.njk
│   │   ├── callout.njk
│   │   └── social-share.njk
│   └── partials/                   # Static includes
│       ├── header.njk
│       ├── footer.njk
│       ├── meta.njk
│       ├── skip-link.njk
│       └── reading-progress.njk
│
├── content/
│   ├── blog/                       # Blog posts (5 existing)
│   └── projects/                   # Projects (9 existing)
│
├── css/
│   └── input.css                   # TailwindCSS entry
│
├── js/
│   └── main.js                     # Minimal client JS
│
├── public/                         # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── diagrams/
│
├── scripts/
│   └── render-mermaid.js           # Mermaid SVG generator
│
├── index.njk                       # Home
├── blog.njk                        # Blog listing
├── projects.njk                    # Projects listing
├── resume.njk                      # Resume
├── contact.njk                     # Contact
├── 404.njk                         # Error page
│
├── eleventy.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

### Architectural Boundaries

**Template Hierarchy:**

| Layer | Directory | Pattern | Purpose |
|-------|-----------|---------|---------|
| Layouts | `_includes/layouts/` | `{% extends %}` | Page structure |
| Components | `_includes/components/` | `{% from %} import` | Reusable UI |
| Partials | `_includes/partials/` | `{% include %}` | Static fragments |
| Pages | Root `*.njk` | Extend layouts | Content pages |

**Data Flow:**

| Source | 11ty Access | Template Variable |
|--------|-------------|-------------------|
| `_data/profile.json` | Auto-loaded | `{{ profile.name }}` |
| `_data/resume.json` | Auto-loaded | `{{ resume.experience }}` |
| `content/blog/*.md` | Collection | `{{ collections.posts }}` |
| `content/projects/*.md` | Collection | `{{ collections.projects }}` |
| Frontmatter | Page data | `{{ title }}`, `{{ date }}` |

**Build Pipeline:**

| Step | Command | Input | Output |
|------|---------|-------|--------|
| 1. CSS | `build:css` | `css/input.css` | `_site/css/styles.css` |
| 2. Diagrams | `build:mermaid` | Frontmatter | `_site/diagrams/*.svg` |
| 3. HTML | `eleventy` | `*.njk`, `content/*.md` | `_site/**/*.html` |
| 4. Assets | Passthrough | `public/*` | `_site/*` |

### Requirements to Structure Mapping

**FR Category Mapping:**

| Category | Requirements | Primary Files |
|----------|--------------|---------------|
| Navigation | FR1-FR5 | `partials/header.njk`, `layouts/base.njk` |
| Content Display | FR6-FR11 | `components/*.njk`, `css/input.css` |
| Blog | FR12-FR16 | `blog.njk`, `layouts/blog-post.njk`, `content/blog/` |
| Projects | FR17-FR21 | `projects.njk`, `layouts/project.njk`, `content/projects/` |
| Resume/Contact | FR22-FR27 | `resume.njk`, `contact.njk`, `_data/resume.json` |
| Build/Deploy | FR33-FR37 | `eleventy.config.js`, `.github/workflows/deploy.yml` |
| SEO | FR38-FR40 | `partials/meta.njk`, sitemap plugin config |

### npm Scripts

```json
{
  "dev": "concurrently \"npm:dev:*\"",
  "dev:11ty": "eleventy --serve",
  "dev:css": "tailwindcss -i ./css/input.css -o ./_site/css/styles.css --watch",
  "build": "npm run build:css && npm run build:mermaid && eleventy",
  "build:css": "tailwindcss -i ./css/input.css -o ./_site/css/styles.css --minify",
  "build:mermaid": "node scripts/render-mermaid.js",
  "clean": "rm -rf _site"
}
```

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices (11ty 3.x, TailwindCSS 3.4.x, Node.js 24 LTS, Nunjucks) are fully compatible and commonly used together. No version conflicts detected.

**Pattern Consistency:**
Implementation patterns (kebab-case files, camelCase frontmatter, macro imports) align with 11ty conventions and existing content schemas.

**Structure Alignment:**
Project structure follows 11ty conventions (`_includes/`, `_data/`, `content/`) and supports all architectural decisions.

### Requirements Coverage Validation ✅

**Functional Requirements:** 40/40 FRs have architectural support mapped to specific files and directories.

**Non-Functional Requirements:** 23/23 NFRs addressed through pre-rendering (performance), semantic patterns (accessibility), 11ty conventions (maintainability), and static architecture (security).

### Implementation Readiness Validation ✅

**Decision Completeness:** All critical decisions documented with versions and examples.

**Structure Completeness:** Complete directory tree with all files defined.

**Pattern Completeness:** 8 conflict points resolved with naming conventions and anti-patterns.

### Gap Analysis Results

**Critical Gaps:** None

**Important Gaps:**
- Mermaid rendering script (`scripts/render-mermaid.js`) needs implementation as first story

**Nice-to-Have (Post-MVP):**
- Image optimization (11ty Image plugin)
- Testing strategy (visual regression)

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context analyzed (migration from React SPA)
- [x] Scale assessed (low-medium complexity)
- [x] Technical constraints identified (GitHub Pages, Node 24)
- [x] Cross-cutting concerns mapped (performance, accessibility, CMS-ready)

**✅ Architectural Decisions**
- [x] Technology stack: 11ty + Nunjucks + TailwindCSS
- [x] Data architecture: 11ty data cascade + collections
- [x] URL structure: Clean URLs without dates
- [x] Build pipeline: CSS → Mermaid → 11ty

**✅ Implementation Patterns**
- [x] Naming conventions (kebab-case files, camelCase frontmatter)
- [x] Template patterns (extends/include/macro hierarchy)
- [x] JavaScript patterns (data attributes, event delegation)
- [x] Accessibility patterns (heading hierarchy, ARIA)

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Template boundaries established
- [x] Data flow documented
- [x] Requirements mapped to files

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**
- Clean migration path preserving existing content
- Performance-first architecture (pre-rendered, minimal JS)
- CMS-ready design for future Sanity.io integration
- Clear patterns prevent AI agent conflicts

**Areas for Future Enhancement:**
- Image optimization pipeline
- Advanced caching strategies
- Search functionality (Pagefind)

### Implementation Handoff

**AI Agent Guidelines:**
1. Follow all architectural decisions exactly as documented
2. Use implementation patterns consistently across all components
3. Respect project structure and boundaries
4. Refer to this document for all architectural questions

**First Implementation Priority:**
Initialize 11ty project with TailwindCSS pipeline using:
```bash
npm init -y
npm install @11ty/eleventy @11ty/eleventy-plugin-syntaxhighlight --save-dev
npm install tailwindcss postcss autoprefixer concurrently --save-dev
```

