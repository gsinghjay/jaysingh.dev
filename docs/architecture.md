# Architecture Document

**Generated:** 2026-01-29
**Project:** jaysingh.dev
**Version:** 1.0.0

---

## Executive Summary

jaysingh.dev is a personal portfolio and blog website built as a React Single Page Application (SPA) with a file-based content management approach. The site features a distinctive Neubrutalist design system and processes Markdown content at build time for runtime consumption.

**Key Characteristics:**
- Static content, dynamic rendering
- Component-based UI architecture
- Build-time content processing
- No backend server required
- Planned migration to 11ty + Nunjucks

---

## Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Runtime | Node.js | 18+ → 24 LTS |
| Language | TypeScript | 5.5.3 |
| Framework | React | 18.3.1 |
| Build Tool | Vite | 5.4.2 |
| Styling | TailwindCSS | 3.4.1 |
| Content | Markdown + YAML | - |
| Icons | Lucide React | 0.344.0 |
| Diagrams | Mermaid | 11.12.2 |

---

## Architecture Pattern

### Component-Based SPA with File-Based CMS

```
┌─────────────────────────────────────────────────────────────────┐
│                         BUILD TIME                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  content/          scripts/              public/                 │
│  ├── blog/*.md     build-content.js      ├── blog-posts.json    │
│  ├── projects/*.md ──────────────────▶   └── projects.json      │
│  └── config/*.yaml                                               │
│                                                                  │
│  gray-matter: Parse frontmatter                                  │
│  Custom parser: Convert markdown to ContentBlock[]               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         RUNTIME (CLIENT)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  index.html ──▶ main.tsx ──▶ App.tsx                            │
│                                    │                             │
│                    ┌───────────────┼───────────────┐             │
│                    ▼               ▼               ▼             │
│               [Header]        [Page]          [Footer]           │
│                                    │                             │
│        ┌──────┬──────┬─────┬──────┼──────┐                      │
│        ▼      ▼      ▼     ▼      ▼      ▼                      │
│      Home   Blog  Projects Resume Contact                        │
│              │       │                                           │
│              ▼       ▼                                           │
│        BlogDetail  ProjectDetail                                 │
│              │                                                   │
│              ▼                                                   │
│        ContentBlock ──▶ CodeBlock, MermaidDiagram, etc.         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Content Loading

```
1. App.tsx mounts
2. useEffect triggers loadContent()
3. fetch('/blog-posts.json') + fetch('/projects.json')
4. setBlogPosts() + setProjects()
5. Components receive data via props
```

### Navigation

```
1. User clicks navigation link
2. handleNavigate(page, id?) called
3. window.location.hash updated
4. hashchange event fires
5. State updated: currentPage, selectedItemId
6. React re-renders appropriate page component
```

### URL Structure

| URL Hash | State | Component |
|----------|-------|-----------|
| `#home` | `currentPage: 'home'` | Home |
| `#blog` | `currentPage: 'blog'` | Blog (listing) |
| `#blog/docker-observability` | `currentPage: 'blog', selectedItemId: '...'` | BlogDetail |
| `#projects` | `currentPage: 'projects'` | Projects (listing) |
| `#projects/qr-code-platform` | `currentPage: 'projects', selectedItemId: '...'` | ProjectDetail |
| `#resume` | `currentPage: 'resume'` | Resume |
| `#contact` | `currentPage: 'contact'` | Contact |

---

## Component Architecture

### Hierarchy

```
App
├── Header (sticky navigation)
├── main
│   └── [Page Component]
│       └── [Detail Component]
│           └── [Content Components]
└── Footer
```

### Design System Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `cream` | `#FFFBEB` | Background |
| `brutal-sm` | `3px 3px 0 #000` | Small shadow |
| `brutal` | `4px 4px 0 #000` | Default shadow |
| `brutal-md` | `6px 6px 0 #000` | Medium shadow |
| `brutal-lg` | `8px 8px 0 #000` | Large shadow |
| Border | `4px solid #000` | All elements |
| Border radius | `0` | Brutalist style |
| Font | `ui-monospace` | Monospace stack |

### Component Categories

| Category | Count | Purpose |
|----------|-------|---------|
| Layout | 2 | Header, Footer |
| Pages | 5 | Route-level views |
| Detail Views | 2 | BlogDetail, ProjectDetail |
| Primitives | 7 | Card, Button, Tag, Input, etc. |
| Content | 5 | CodeBlock, MermaidDiagram, etc. |
| Utility | 4 | ReadingProgress, SocialShare, etc. |

---

## Content Architecture

### Source Files

| Location | Format | Purpose |
|----------|--------|---------|
| `content/blog/*.md` | Markdown + YAML frontmatter | Blog posts |
| `content/projects/*.md` | Markdown + YAML frontmatter | Projects |
| `content/config/*.yaml` | YAML | Configuration |

### Processing Pipeline

```
Markdown File
    │
    ▼
gray-matter (parse frontmatter)
    │
    ▼
convertMarkdownToContentBlocks()
    │
    ├── ```mermaid ──▶ { type: 'diagram', ... }
    ├── ```{lang}  ──▶ { type: 'code', ... }
    ├── ![...]     ──▶ { type: 'image', ... }
    ├── > ...      ──▶ { type: 'callout', ... }
    └── text       ──▶ { type: 'text', ... }
    │
    ▼
JSON Output (blog-posts.json, projects.json)
```

### ContentBlock Types

| Type | Source | Rendered By |
|------|--------|-------------|
| `text` | Plain paragraphs | `<p>` |
| `heading` | `## `, `### `, `#### ` | `<h2>`, `<h3>`, `<h4>` |
| `code` | ` ```language ` | CodeBlock.tsx |
| `diagram` | ` ```mermaid ` | MermaidDiagram.tsx |
| `image` | `![alt](url)` | `<img>` |
| `callout` | `> text` | CalloutBox.tsx |

---

## Build Configuration

### Vite

- React plugin enabled
- Lucide React excluded from optimization (large icon library)
- Markdown and YAML included as assets

### TypeScript

- Strict mode enabled
- ES2020 target
- React JSX transform

### Tailwind

- Custom colors and shadows for brutalist design
- All border-radius overridden to 0
- Monospace font family

---

## Deployment Architecture

### Current (Development)

```
npm run build
    │
    ▼
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── blog-posts.json
├── projects.json
└── [static assets]
```

### Target (Production)

Static file hosting (Vercel, Netlify, GitHub Pages, etc.)
- No server-side processing required
- CDN-friendly static assets
- Client-side routing via hash

---

## Migration Plan (11ty + Nunjucks)

### Architecture Changes

| Current | Target |
|---------|--------|
| Client-side rendering | Pre-rendered HTML |
| Hash routing (`#page`) | Clean URLs (`/page/`) |
| Runtime JSON fetch | Build-time data cascade |
| React components | Nunjucks templates/macros |
| Vite build | 11ty build |

### Preserved Elements

- TailwindCSS styling
- Neubrutalist design tokens
- Content structure (frontmatter schema)
- Mermaid diagrams (client-side)
- Lucide icons (static SVGs)

### New Structure

```
jaysingh.dev/
├── _data/                  # Global data
│   ├── profile.json
│   ├── skills.json
│   └── resume.json
├── _includes/
│   ├── layouts/
│   │   ├── base.njk
│   │   ├── blog.njk
│   │   └── project.njk
│   └── components/
│       ├── header.njk
│       ├── footer.njk
│       ├── card.njk
│       └── tag.njk
├── content/
│   ├── blog/               # Same markdown files
│   └── projects/           # Same markdown files
├── css/
│   └── styles.css          # Tailwind entry
├── js/
│   └── main.js             # Mermaid, interactions
├── index.njk
├── blog.njk
├── projects.njk
├── resume.njk
├── contact.njk
└── .eleventy.js            # 11ty config
```

---

## Security Considerations

- No backend or database (static site)
- No authentication required
- No user data collection (contact form is non-functional)
- Content is public by design
- No sensitive configuration (Supabase removed)

---

## Performance Characteristics

| Metric | Current | Notes |
|--------|---------|-------|
| Bundle Size | ~200KB gzipped | React + dependencies |
| First Paint | Fast | Vite optimized |
| TTI | Depends on JSON fetch | Content loading |
| Lighthouse | Expected 90+ | Static content |

### Optimization Opportunities

- Pre-render with 11ty (eliminates JS hydration)
- Image optimization (not currently implemented)
- Font subsetting
- Lazy load Mermaid diagrams
