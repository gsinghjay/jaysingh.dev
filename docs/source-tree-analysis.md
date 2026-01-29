# Source Tree Analysis

**Generated:** 2026-01-29
**Project:** jaysingh.dev

## Directory Structure

```
jaysingh.dev/
├── .claude/                    # Claude Code configuration
├── .env                        # Environment variables (empty)
├── .gitignore                  # Git ignore rules
├── _bmad/                      # BMAD framework (not part of app)
├── _bmad-output/               # BMAD output artifacts
│
├── content/                    # 📝 SOURCE CONTENT (Markdown + YAML)
│   ├── config/                 # Site configuration
│   │   ├── profile.yaml        # Personal profile data
│   │   ├── resume.yaml         # Work experience
│   │   └── skills.yaml         # Technical skills
│   ├── blog/                   # Blog posts (5 files)
│   │   ├── building-fastapi-microservices.md
│   │   ├── ci-cd-best-practices.md
│   │   ├── docker-observability.md
│   │   ├── oauth2-authentication-gateway.md
│   │   └── postgresql-performance.md
│   └── projects/               # Project case studies (9 files)
│       ├── authentication-gateway.md
│       ├── automation-scripts.md
│       ├── cicd-pipeline.md
│       ├── covid-dashboard.md
│       ├── event-driven-microservices.md
│       ├── jamf-pro-deployment.md
│       ├── observability-infrastructure.md
│       └── qr-code-platform.md
│
├── docs/                       # 📚 GENERATED DOCUMENTATION (this folder)
│
├── public/                     # 🌐 STATIC ASSETS
│   ├── blog-posts.json         # ⚡ Generated: compiled blog content
│   ├── projects.json           # ⚡ Generated: compiled project content
│   ├── blog/                   # Blog markdown (public access)
│   ├── projects/               # Project markdown (public access)
│   ├── config/                 # Config YAML (public access)
│   ├── diagrams/               # Diagram images (placeholder)
│   │   └── README.md
│   └── docs/                   # Documentation files (placeholder)
│       └── README.md
│
├── scripts/                    # 🔧 BUILD SCRIPTS
│   └── build-content.js        # ★ ENTRY: Content processing script
│
├── src/                        # 💻 APPLICATION SOURCE
│   ├── main.tsx                # ★ ENTRY: React app entry point
│   ├── App.tsx                 # ★ ROOT: Main app component
│   ├── index.css               # Global styles + Tailwind
│   ├── vite-env.d.ts           # Vite TypeScript env
│   │
│   ├── components/             # 🧩 UI COMPONENTS (22 files)
│   │   ├── Header.tsx          # Navigation bar
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Card.tsx            # Brutalist card container
│   │   ├── Button.tsx          # Action button
│   │   ├── Tag.tsx             # Technology/category tag
│   │   ├── Input.tsx           # Form input
│   │   ├── Textarea.tsx        # Form textarea
│   │   ├── Section.tsx         # Content section wrapper
│   │   ├── BlogDetail.tsx      # Full blog post view
│   │   ├── ProjectDetail.tsx   # Project case study view
│   │   ├── ContentBlock.tsx    # Content type router
│   │   ├── CodeBlock.tsx       # Syntax-highlighted code
│   │   ├── MermaidDiagram.tsx  # Mermaid diagram viewer
│   │   ├── DiagramImage.tsx    # Image diagram viewer
│   │   ├── CalloutBox.tsx      # Info/warning callout
│   │   ├── DocumentDownload.tsx # Download button
│   │   ├── ReadingProgress.tsx # Scroll progress bar
│   │   ├── SocialShare.tsx     # Share buttons
│   │   └── RelatedProjects.tsx # Related project cards
│   │
│   ├── pages/                  # 📄 PAGE COMPONENTS (5 files)
│   │   ├── Home.tsx            # Landing page
│   │   ├── Blog.tsx            # Blog listing + detail router
│   │   ├── Projects.tsx        # Project listing + filters
│   │   ├── Resume.tsx          # Work history
│   │   └── Contact.tsx         # Contact form
│   │
│   ├── types/                  # 📐 TYPE DEFINITIONS
│   │   └── index.ts            # All TypeScript interfaces
│   │
│   ├── utils/                  # 🛠 UTILITIES
│   │   └── content-loader.ts   # Content fetching functions
│   │
│   └── data/                   # 📊 BUNDLED DATA (JSON)
│       ├── profile.json        # Profile data (bundled)
│       ├── skills.json         # Skills data (bundled)
│       ├── resume.json         # Resume data (bundled)
│       ├── blog-posts.json     # Symlink to public (bundled)
│       └── projects.json       # Symlink to public (bundled)
│
├── index.html                  # HTML entry point
├── package.json                # Dependencies & scripts
├── package-lock.json           # Dependency lockfile
├── tsconfig.json               # TypeScript config (references)
├── tsconfig.app.json           # App TypeScript config
├── tsconfig.node.json          # Node TypeScript config
├── vite.config.ts              # Vite build config
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
└── eslint.config.js            # ESLint config
```

## Critical Folders

### `content/` - Source of Truth

All site content lives here as Markdown and YAML. Changes here trigger content rebuild.

| Subfolder | Purpose | File Count |
|-----------|---------|------------|
| `config/` | Site configuration data | 3 |
| `blog/` | Blog post content | 5 |
| `projects/` | Project case studies | 9 |

### `src/components/` - UI Library

Reusable React components implementing the Neubrutalist design system.

| Category | Components |
|----------|------------|
| Layout | Header, Footer |
| Primitives | Card, Button, Tag, Input, Textarea, Section |
| Content | ContentBlock, CodeBlock, MermaidDiagram, DiagramImage, CalloutBox |
| Views | BlogDetail, ProjectDetail |
| Utility | ReadingProgress, SocialShare, RelatedProjects, DocumentDownload |

### `src/pages/` - Route Components

Page-level components that compose the UI for each route.

| Page | Route | Description |
|------|-------|-------------|
| Home | `#home` | Landing with featured content |
| Blog | `#blog`, `#blog/{id}` | Blog listing and detail |
| Projects | `#projects`, `#projects/{id}` | Project listing and detail |
| Resume | `#resume` | Work history and skills |
| Contact | `#contact` | Contact form |

### `public/` - Static Assets

Files served directly without processing. Generated JSON files live here.

| File/Folder | Purpose |
|-------------|---------|
| `blog-posts.json` | Compiled blog content (generated) |
| `projects.json` | Compiled project content (generated) |
| `diagrams/` | Architecture diagram images |
| `docs/` | Downloadable documentation files |

## Entry Points

| File | Purpose | Command |
|------|---------|---------|
| `src/main.tsx` | React app bootstrap | `npm run dev` |
| `scripts/build-content.js` | Content processing | `npm run build:content` |
| `index.html` | HTML shell | Served by Vite |

## Build Artifacts

| Output | Source | Command |
|--------|--------|---------|
| `public/blog-posts.json` | `content/blog/*.md` | `npm run build:content` |
| `public/projects.json` | `content/projects/*.md` | `npm run build:content` |
| `dist/` | Entire app | `npm run build` |

## Migration Mapping (11ty)

| Current | 11ty Equivalent |
|---------|-----------------|
| `content/` | Same (11ty reads markdown) |
| `src/components/` | `_includes/components/` |
| `src/pages/` | Root `.njk` files + layouts |
| `src/data/` | `_data/` |
| `public/` | `public/` (passthrough copy) |
| `scripts/build-content.js` | Remove (11ty handles) |
| `dist/` | `_site/` |
