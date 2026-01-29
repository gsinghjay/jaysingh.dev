# UI Component Inventory

**Generated:** 2026-01-29
**Project:** jaysingh.dev
**Total Components:** 22

## Component Categories

### Layout Components (2)

| Component | File | Props | Purpose |
|-----------|------|-------|---------|
| **Header** | `src/components/Header.tsx` | `currentPage`, `onNavigate` | Sticky navigation bar with mobile menu |
| **Footer** | `src/components/Footer.tsx` | None | Site footer with copyright |

### Page Components (5)

| Component | File | Props | Purpose |
|-----------|------|-------|---------|
| **Home** | `src/pages/Home.tsx` | `featuredPosts`, `featuredProjects`, `onNavigate` | Landing page with hero and featured content |
| **Blog** | `src/pages/Blog.tsx` | `posts`, `projects`, `selectedPostId`, `onNavigate` | Blog listing and detail router |
| **Projects** | `src/pages/Projects.tsx` | `projects`, `selectedProjectId`, `onNavigate` | Project listing with filters |
| **Resume** | `src/pages/Resume.tsx` | None | Work history and skills display |
| **Contact** | `src/pages/Contact.tsx` | None | Contact form and links |

### Detail Views (2)

| Component | File | Props | Purpose |
|-----------|------|-------|---------|
| **BlogDetail** | `src/components/BlogDetail.tsx` | `post`, `projects`, `onBack`, `onNavigate` | Full blog post with TOC sidebar |
| **ProjectDetail** | `src/components/ProjectDetail.tsx` | `project`, `onBack`, `onNavigate` | Project case study with sections |

### Primitive UI Components (7)

| Component | File | Props | Purpose | Migration Notes |
|-----------|------|-------|---------|-----------------|
| **Card** | `src/components/Card.tsx` | `children`, `className`, `onClick`, `size` | Brutalist card container | → Nunjucks macro |
| **Button** | `src/components/Button.tsx` | `variant`, `children`, `...HTMLButtonAttributes` | Action button with variants | → Nunjucks macro |
| **Tag** | `src/components/Tag.tsx` | `children`, `onClick`, `variant` | Technology/category tag | → Nunjucks macro |
| **Input** | `src/components/Input.tsx` | `label`, `focusColor`, `...HTMLInputAttributes` | Form text input | → HTML + CSS |
| **Textarea** | `src/components/Textarea.tsx` | `label`, `focusColor`, `...HTMLTextareaAttributes` | Form textarea | → HTML + CSS |
| **Section** | `src/components/Section.tsx` | `children`, `className`, `bordered` | Content section wrapper | → Nunjucks macro |
| **CalloutBox** | `src/components/CalloutBox.tsx` | `content`, `type` | Info/warning/tip callout | → Shortcode |

### Content Rendering Components (5)

| Component | File | Props | Purpose | Migration Notes |
|-----------|------|-------|---------|-----------------|
| **ContentBlock** | `src/components/ContentBlock.tsx` | `block`, `index` | Renders content by type | → Markdown pipeline |
| **CodeBlock** | `src/components/CodeBlock.tsx` | `code`, `language` | Syntax-highlighted code with copy | → Highlight.js plugin |
| **MermaidDiagram** | `src/components/MermaidDiagram.tsx` | `content`, `label` | Mermaid diagram with fullscreen | → Client-side JS |
| **DiagramImage** | `src/components/DiagramImage.tsx` | `src`, `alt`, `label` | Image diagram with zoom | → HTML + JS |
| **DocumentDownload** | `src/components/DocumentDownload.tsx` | `url`, `filename` | Download link button | → HTML |

### Utility/Enhancement Components (4)

| Component | File | Props | Purpose | Migration Notes |
|-----------|------|-------|---------|-----------------|
| **ReadingProgress** | `src/components/ReadingProgress.tsx` | None | Scroll progress bar | → Vanilla JS |
| **SocialShare** | `src/components/SocialShare.tsx` | `title`, `url` | Twitter/LinkedIn/Copy share | → Nunjucks partial |
| **RelatedProjects** | `src/components/RelatedProjects.tsx` | `projects`, `onNavigate` | Related project cards | → Nunjucks loop |

---

## Component Design Patterns

### Brutalist Box Shadow Pattern

All interactive components use consistent shadow behavior:
```typescript
const shadowStyles = {
  sm: '4px 4px 0 #000',
  default: '6px 6px 0 #000',
  lg: '8px 8px 0 #000',
};

// On mouse down: reduce shadow
// On mouse up/leave: restore shadow
```

### Color Variants (Button, Tag)

```typescript
// Button variants
const variantClasses = {
  lime: 'bg-lime-400 text-black',
  pink: 'bg-pink-400 text-black',
  yellow: 'bg-yellow-400 text-black',
  blue: 'bg-blue-400 text-black',
  secondary: 'bg-white text-black hover:bg-yellow-400',
};

// Tag color logic
const getTechColor = (tech: string): string => {
  if (tech.includes('react') || tech.includes('vue')) return 'bg-pink-400';
  if (tech.includes('python') || tech.includes('go')) return 'bg-blue-400';
  if (tech.includes('postgres') || tech.includes('sql')) return 'bg-green-400';
  if (tech.includes('node') || tech.includes('typescript')) return 'bg-lime-400';
  return 'bg-neutral-100';
};
```

### Size Variants (Card)

```typescript
const paddingClasses = {
  sm: 'p-4',
  default: 'p-6',
  lg: 'p-8',
};
```

---

## Component Dependency Tree

```
App.tsx
├── Header (layout)
│   └── lucide-react: Menu, X
├── Footer (layout)
├── Home (page)
│   ├── Card
│   ├── Button
│   └── Tag
├── Blog (page)
│   ├── Card
│   ├── Tag
│   └── BlogDetail
│       ├── Card
│       ├── Tag
│       ├── ContentBlock
│       │   ├── CodeBlock (lucide: Copy, Check)
│       │   ├── MermaidDiagram (lucide: Maximize2, Copy, Check, ZoomIn, ZoomOut, RotateCcw)
│       │   └── CalloutBox (lucide: Info, AlertTriangle, Lightbulb, AlertCircle)
│       ├── ReadingProgress
│       ├── SocialShare (lucide: Share2, Check)
│       └── RelatedProjects (lucide: ExternalLink)
├── Projects (page)
│   ├── Card
│   ├── Tag
│   └── ProjectDetail
│       ├── Card
│       ├── Tag
│       ├── MermaidDiagram
│       ├── DiagramImage (lucide: Maximize2, ZoomIn, ZoomOut)
│       └── DocumentDownload (lucide: FileText, Download)
├── Resume (page)
│   ├── Card
│   └── lucide-react: Download
└── Contact (page)
    ├── Card
    ├── Input
    ├── Textarea
    ├── Button
    └── lucide-react: Send, CheckCircle
```

---

## Lucide Icons Used

| Icon | Component(s) | Context |
|------|--------------|---------|
| `Menu` | Header | Mobile menu open |
| `X` | Header | Mobile menu close |
| `ArrowLeft` | BlogDetail, ProjectDetail | Back navigation |
| `Copy` | CodeBlock, MermaidDiagram | Copy to clipboard |
| `Check` | CodeBlock, MermaidDiagram, SocialShare | Copy success |
| `Maximize2` | MermaidDiagram, DiagramImage | Fullscreen toggle |
| `ZoomIn` | MermaidDiagram, DiagramImage | Zoom in |
| `ZoomOut` | MermaidDiagram, DiagramImage | Zoom out |
| `RotateCcw` | MermaidDiagram | Reset zoom/pan |
| `Info` | CalloutBox | Info callout |
| `AlertTriangle` | CalloutBox | Warning callout |
| `Lightbulb` | CalloutBox | Tip callout |
| `AlertCircle` | CalloutBox | Important callout |
| `Share2` | SocialShare | Share header |
| `ExternalLink` | RelatedProjects, ProjectDetail | External links |
| `Github` | Projects, ProjectDetail | GitHub links |
| `FileText` | Projects, DocumentDownload | Documentation |
| `Network` | Projects | Architecture diagram indicator |
| `Download` | Resume, DocumentDownload | Download action |
| `Send` | Contact | Send message |
| `CheckCircle` | Contact | Success message |
