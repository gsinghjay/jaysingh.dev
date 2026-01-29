# Technology Stack

**Generated:** 2026-01-29
**Project:** jaysingh.dev

## Stack Overview

| Category | Technology | Version | Migration Notes |
|----------|------------|---------|-----------------|
| **Runtime** | Node.js | 18+ → **24 LTS** | Upgrading for 11ty |
| **Language** | TypeScript | 5.5.3 | Will become vanilla JS/Nunjucks |
| **Framework** | React | 18.3.1 | → 11ty + Nunjucks |
| **Build Tool** | Vite | 5.4.2 | → 11ty built-in |
| **Styling** | TailwindCSS | 3.4.1 | Keep (compatible) |
| **CSS Processing** | PostCSS | 8.4.35 | Keep (compatible) |

## Dependencies Analysis

### Production Dependencies (Keep)

| Package | Version | Purpose | 11ty Equivalent |
|---------|---------|---------|-----------------|
| `gray-matter` | 4.0.3 | Frontmatter parsing | 11ty built-in |
| `js-yaml` | 4.1.1 | YAML parsing | 11ty data files |
| `lucide-react` | 0.344.0 | Icons | Lucide static SVGs |
| `mermaid` | 11.12.2 | Diagrams | Keep (client-side) |
| `rehype-highlight` | 7.0.2 | Syntax highlighting | 11ty plugin |
| `rehype-stringify` | 10.0.1 | HTML generation | 11ty built-in |
| `remark` | 15.0.1 | Markdown processing | 11ty markdown-it |
| `remark-parse` | 11.0.0 | Markdown parsing | 11ty built-in |
| `remark-rehype` | 11.1.2 | MD→HTML transform | 11ty built-in |

### Production Dependencies (Remove)

| Package | Version | Reason |
|---------|---------|--------|
| `@supabase/supabase-js` | 2.57.4 | Not used, deprecated |
| `react` | 18.3.1 | Migrating to 11ty |
| `react-dom` | 18.3.1 | Migrating to 11ty |

### Dev Dependencies (Keep Equivalent)

| Package | Version | 11ty Equivalent |
|---------|---------|-----------------|
| `autoprefixer` | 10.4.18 | Keep |
| `eslint` | 9.9.1 | Keep for JS linting |
| `postcss` | 8.4.35 | Keep |
| `tailwindcss` | 3.4.1 | Keep |

### Dev Dependencies (Remove)

| Package | Reason |
|---------|--------|
| `@vitejs/plugin-react` | React-specific |
| `@types/react` | TypeScript types |
| `@types/react-dom` | TypeScript types |
| `typescript` | Not needed for Nunjucks |
| `typescript-eslint` | Not needed |
| `vite` | Replaced by 11ty |

## Architecture Pattern

**Current:** Component-based SPA (React)
- Client-side rendering
- Hash-based routing
- Build-time content processing → runtime JSON fetch

**Target:** Static Site Generator (11ty)
- Pre-rendered HTML pages
- File-based routing
- Build-time content processing → static HTML

## Build Pipeline

### Current (Vite)
```
content/*.md → build-content.js → public/*.json → Vite → dist/
```

### Target (11ty)
```
content/*.md → 11ty data cascade → Nunjucks templates → _site/
```

## Design System Tokens

### Colors (TailwindCSS - Portable)
```css
cream: #FFFBEB          /* Background */
lime-400: default       /* Primary accent */
pink-400: default       /* Secondary accent */
yellow-400: default     /* Tertiary accent */
blue-400: default       /* Quaternary accent */
black: #000000          /* Borders, text */
```

### Shadows (Custom - Portable)
```css
--shadow-brutal-sm: 3px 3px 0 #000;
--shadow-brutal: 4px 4px 0 #000;
--shadow-brutal-md: 6px 6px 0 #000;
--shadow-brutal-lg: 8px 8px 0 #000;
```

### Typography (Portable)
```css
font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
```

## NPM Scripts

| Script | Current Command | Purpose |
|--------|-----------------|---------|
| `dev` | `npm run build:content && vite` | Development server |
| `build` | `npm run build:content && vite build` | Production build |
| `build:content` | `node scripts/build-content.js` | Process markdown |
| `lint` | `eslint .` | Code linting |
| `preview` | `vite preview` | Preview production build |
| `typecheck` | `tsc --noEmit -p tsconfig.app.json` | Type checking |
