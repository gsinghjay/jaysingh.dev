# Architecture Patterns

**Generated:** 2026-01-29
**Project:** jaysingh.dev

## Current Architecture

### Pattern: Component-Based SPA with File-Based CMS

```
┌─────────────────────────────────────────────────────────────┐
│                      BUILD TIME                              │
├─────────────────────────────────────────────────────────────┤
│  content/                                                    │
│  ├── blog/*.md          ─┐                                   │
│  ├── projects/*.md       ├──▶ build-content.js ──▶ public/  │
│  └── config/*.yaml      ─┘         │               ├── blog-posts.json
│                                    │               └── projects.json
│                                    ▼                         │
│                              gray-matter                     │
│                              (frontmatter)                   │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      RUNTIME (CLIENT)                        │
├─────────────────────────────────────────────────────────────┤
│  React App                                                   │
│  ├── App.tsx (router via hash)                               │
│  ├── pages/                                                  │
│  │   ├── Home.tsx                                            │
│  │   ├── Blog.tsx ────▶ fetch('/blog-posts.json')           │
│  │   ├── Projects.tsx ─▶ fetch('/projects.json')            │
│  │   ├── Resume.tsx ───▶ import resume.json                 │
│  │   └── Contact.tsx                                         │
│  └── components/ (22 reusable UI components)                 │
└─────────────────────────────────────────────────────────────┘
```

### Routing Strategy

**Hash-based SPA routing:**
```typescript
// Current implementation in App.tsx
const handleNavigate = (page: Page, id?: string) => {
  window.location.hash = id ? `${page}/${id}` : page;
};

// URL patterns:
// /#home
// /#blog
// /#blog/docker-observability
// /#projects
// /#projects/qr-code-platform
// /#resume
// /#contact
```

### State Management

**React useState hooks (minimal state):**
- `currentPage` - Active page/route
- `selectedItemId` - Selected blog post or project ID
- `blogPosts` - Loaded blog content
- `projects` - Loaded project content
- `loading` - Content loading state

No external state management library (Redux, Zustand, etc.)

### Content Processing Pipeline

**Build script: `scripts/build-content.js`**

```
1. Read markdown files from content/blog/ and content/projects/
2. Parse frontmatter with gray-matter
3. Convert markdown to ContentBlock[] structure
4. Handle special block types:
   - ```mermaid → diagram block
   - ```{language} → code block
   - ![alt](url) → image block
   - > quote → callout block
   - Regular text → text block
5. Write JSON to public/blog-posts.json and public/projects.json
```

### Component Architecture

**Hierarchy:**
```
App.tsx
├── Header.tsx (navigation)
├── main (page content)
│   ├── Home.tsx
│   │   ├── Card.tsx
│   │   ├── Button.tsx
│   │   └── Tag.tsx
│   ├── Blog.tsx
│   │   ├── Card.tsx
│   │   ├── Tag.tsx
│   │   └── BlogDetail.tsx
│   │       ├── ContentBlock.tsx
│   │       │   ├── CodeBlock.tsx
│   │       │   ├── MermaidDiagram.tsx
│   │       │   └── CalloutBox.tsx
│   │       ├── ReadingProgress.tsx
│   │       ├── SocialShare.tsx
│   │       └── RelatedProjects.tsx
│   ├── Projects.tsx
│   │   ├── Card.tsx
│   │   ├── Tag.tsx
│   │   └── ProjectDetail.tsx
│   │       ├── MermaidDiagram.tsx
│   │       ├── DiagramImage.tsx
│   │       └── DocumentDownload.tsx
│   ├── Resume.tsx
│   │   └── Card.tsx
│   └── Contact.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Textarea.tsx
│       └── Button.tsx
└── Footer.tsx
```

## Migration Target Architecture (11ty + Nunjucks)

### Pattern: Static Site Generator with Data Cascade

```
┌─────────────────────────────────────────────────────────────┐
│                      BUILD TIME (11ty)                       │
├─────────────────────────────────────────────────────────────┤
│  content/                    _includes/                      │
│  ├── blog/*.md    ─────────▶ ├── layouts/                   │
│  ├── projects/*.md           │   ├── base.njk               │
│  └── config/*.yaml           │   ├── blog.njk               │
│         │                    │   └── project.njk            │
│         ▼                    ├── components/                 │
│  _data/                      │   ├── header.njk              │
│  ├── profile.json            │   ├── footer.njk              │
│  ├── skills.json             │   ├── card.njk                │
│  └── resume.json             │   └── tag.njk                 │
│         │                    └── partials/                   │
│         ▼                                                    │
│  11ty Data Cascade ──▶ Nunjucks Templates ──▶ _site/        │
└─────────────────────────────────────────────────────────────┘
```

### URL Structure (11ty)

**File-based routing:**
```
/                          → index.html
/blog/                     → blog/index.html
/blog/docker-observability → blog/docker-observability/index.html
/projects/                 → projects/index.html
/projects/qr-code-platform → projects/qr-code-platform/index.html
/resume/                   → resume/index.html
/contact/                  → contact/index.html
```

### Component → Partial Mapping

| React Component | Nunjucks Equivalent |
|-----------------|---------------------|
| `Header.tsx` | `_includes/components/header.njk` |
| `Footer.tsx` | `_includes/components/footer.njk` |
| `Card.tsx` | `_includes/components/card.njk` (macro) |
| `Button.tsx` | `_includes/components/button.njk` (macro) |
| `Tag.tsx` | `_includes/components/tag.njk` (macro) |
| `CodeBlock.tsx` | Markdown-it plugin + CSS |
| `MermaidDiagram.tsx` | Client-side JS + shortcode |
| `ContentBlock.tsx` | Markdown processing pipeline |
