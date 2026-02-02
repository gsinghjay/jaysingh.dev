# Architecture Document

**Generated:** 2026-02-01
**Project:** jaysingh.dev
**Framework:** 11ty + Nunjucks
**Status:** Migration Complete

---

## Executive Summary

jaysingh.dev is a personal portfolio and blog website built as a static site using 11ty (Eleventy) with Nunjucks templating. The site features a Neubrutalist design system and pre-renders all content at build time for optimal performance and SEO.

**Key Characteristics:**
- Pre-rendered static HTML pages
- File-based routing with clean URLs
- Build-time content processing with validation
- Zero client-side JavaScript by default (progressive enhancement)
- Mermaid diagrams pre-rendered to SVG at build time

---

## Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Runtime | Node.js | >=24.0.0 |
| Framework | 11ty (Eleventy) | 3.1.2 |
| Templating | Nunjucks | Built-in |
| Styling | TailwindCSS | 3.4.1 |
| CSS Processing | PostCSS | 8.4.35 |
| Diagrams | Mermaid CLI | 11.12.0 |
| E2E Testing | Playwright | 1.50.0 |
| Unit Testing | Vitest | 4.0.18 |

---

## Architecture Pattern

### Static Site Generator (SSG)

```
┌─────────────────────────────────────────────────────────────────┐
│                         BUILD TIME                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  _content/           _data/              _includes/             │
│  ├── blog/*.md       ├── site.json       ├── layouts/           │
│  └── projects/*.md   ├── profile.json    │   ├── base.njk       │
│         │            ├── resume.json     │   ├── blog-post.njk  │
│         │            └── skills.json     │   └── project.njk    │
│         │                   │            ├── components/        │
│         └───────────────────┴────────────┴── partials/          │
│                             │                                   │
│                             ▼                                   │
│                      eleventy.config.js                         │
│                             │                                   │
│         ┌───────────────────┼───────────────────┐               │
│         ▼                   ▼                   ▼               │
│    Collections          Filters            Transforms           │
│    - posts              - readingTime      - mermaid-to-svg     │
│    - projects           - date             (replace code blocks │
│                         - findProjectsByIds  with pre-rendered  │
│                         - getCategoryFromTags  SVG images)      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      OUTPUT (_site/)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  _site/                                                         │
│  ├── index.html                                                 │
│  ├── blog/                                                      │
│  │   ├── index.html              (listing page)                 │
│  │   └── {post-slug}/index.html  (detail pages)                 │
│  ├── projects/                                                  │
│  │   ├── index.html              (listing page)                 │
│  │   └── {project-slug}/index.html (detail pages)               │
│  ├── resume/index.html                                          │
│  ├── contact/index.html                                         │
│  ├── css/styles.css              (minified TailwindCSS)         │
│  ├── js/main.js                  (progressive enhancement)      │
│  ├── diagrams/*.svg              (pre-rendered Mermaid)         │
│  └── public/                     (passthrough static assets)    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Build Pipeline

```
1. npm run build
   ├── build:css      → TailwindCSS compiles and minifies
   ├── build:mermaid  → Mermaid CLI renders diagrams to SVG
   └── eleventy       → 11ty builds HTML pages
       ├── Load _data/*.json (global data)
       ├── Process collections (posts, projects)
       │   └── Validate frontmatter (throws on error)
       ├── Render templates (Nunjucks)
       ├── Apply transforms (mermaid-to-svg)
       └── Write to _site/
```

### Request Flow (Production)

```
1. User requests /blog/my-post/
2. CDN/server serves _site/blog/my-post/index.html
3. Browser renders pre-built HTML immediately
4. CSS loads from /css/styles.css
5. JS loads from /js/main.js (optional enhancements)
   ├── Code copy buttons
   ├── Diagram fullscreen viewer
   ├── Social share buttons
   └── Mobile menu toggle
```

### URL Structure

| URL | Template | Content Source |
|-----|----------|----------------|
| `/` | `index.njk` | Featured posts/projects from collections |
| `/blog/` | `blog.njk` | `collections.posts` |
| `/blog/{slug}/` | `layouts/blog-post.njk` | `_content/blog/{slug}.md` |
| `/projects/` | `projects.njk` | `collections.projects` |
| `/projects/{slug}/` | `layouts/project.njk` | `_content/projects/{slug}.md` |
| `/resume/` | `resume.njk` | `_data/resume.json` |
| `/contact/` | `contact.njk` | Static form |

---

## Component Architecture

### Template Hierarchy

```
layouts/base.njk
├── partials/meta.njk      (SEO meta tags)
├── partials/skip-link.njk (accessibility)
├── partials/header.njk    (navigation)
├── {{ content }}          (page slot)
├── partials/footer.njk    (footer)
└── js/main.js             (enhancements)

layouts/blog-post.njk extends base.njk
├── components/tag.njk     (category, tech tags)
├── components/card.njk    (content wrapper)
├── partials/social-share.njk
├── partials/related-projects.njk
└── Inline TOC script

layouts/project.njk extends base.njk
├── components/tag.njk
├── components/card.njk
├── components/external-links.njk
└── Inline TOC script
```

### Component Patterns

| Component | Type | Description |
|-----------|------|-------------|
| `card.njk` | Macro | Callable with size parameter |
| `tag.njk` | Macro | Tech/category badge |
| `button.njk` | Macro | Action button with variants |
| `header.njk` | Partial | Included once per page |
| `footer.njk` | Partial | Included once per page |
| `social-share.njk` | Partial | Blog posts only |

---

## Content Architecture

### Collections

| Collection | Source | Validation |
|------------|--------|------------|
| `posts` | `_content/blog/*.md` | `validateBlogPost()` |
| `projects` | `_content/projects/*.md` | `validateProject()` |

### Global Data

| File | Purpose | Access |
|------|---------|--------|
| `site.json` | Site metadata | `{{ site.title }}` |
| `profile.json` | Author info | `{{ profile.name }}` |
| `resume.json` | Experience/education | `{{ resume.experience }}` |
| `skills.json` | Technical skills | `{{ skills.languages }}` |

### Frontmatter Validation

Build fails fast if required fields are missing:
- Blog: `id`, `title`, `date`, `excerpt`, `tags`, `readTime`
- Projects: `id`, `title`, `description`, `projectType`, `technologies|tags`

---

## Build Configuration

### 11ty (eleventy.config.js)

- **Input:** `.` (project root)
- **Output:** `_site`
- **Includes:** `_includes`
- **Data:** `_data`
- **Template formats:** `njk`, `md`, `html`
- **Ignored:** `_bmad*`, `src/`, `node_modules/`, `docs/`, `content/`

### TailwindCSS (tailwind.config.js)

- Custom `cream` color
- Brutal shadows (`brutal-sm`, `brutal`, `brutal-md`, `brutal-lg`)
- Zero border-radius (brutalist)
- Content sources: `_includes/**/*.njk`, `_content/**/*.md`, `*.njk`

### Playwright (playwright.config.ts)

- **Base URL:** `http://localhost:8080`
- **Projects:** Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Web Server:** Auto-starts `npm run dev:11ty`

---

## Deployment Architecture

### Production Build

```
npm run build
    │
    ▼
_site/
├── index.html
├── blog/
│   ├── index.html
│   └── */index.html
├── projects/
│   ├── index.html
│   └── */index.html
├── resume/index.html
├── contact/index.html
├── css/styles.css (minified)
├── js/main.js
├── diagrams/*.svg
└── public/
    └── images/, fonts/, etc.
```

### Deployment Target

GitHub Pages (Epic 6):
- Static file hosting
- CDN-friendly
- Clean URLs via directory indexes
- No server-side processing

---

## Security Considerations

- No backend or database (static site)
- No authentication required
- No user data collection (contact form uses FormSubmit/similar)
- Content is public by design
- All dependencies audited via `npm audit`

---

## Performance Characteristics

| Metric | Value | Notes |
|--------|-------|-------|
| First Contentful Paint | <1s | Pre-rendered HTML |
| Time to Interactive | <1s | No JS hydration |
| Total Blocking Time | 0ms | No main thread blocking |
| Lighthouse Score | Target 100 | All categories |

### Optimizations

- Pre-rendered HTML (no client-side rendering)
- CSS minified and purged (TailwindCSS)
- Mermaid diagrams pre-rendered (no runtime JS)
- Progressive enhancement (JS optional)
- Clean URLs for SEO

---

## Legacy Code

The `src/` and `content/` directories contain the original React implementation:
- **Status:** Ignored by 11ty
- **Purpose:** Reference during migration
- **Future:** Can be removed after full validation

---

*Generated by BMAD document-project workflow*
