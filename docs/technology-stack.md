# Technology Stack

**Generated:** 2026-02-01
**Project:** jaysingh.dev
**Status:** Migration Complete (React → 11ty)

---

## Stack Overview

| Category | Technology | Version | Notes |
|----------|------------|---------|-------|
| **Runtime** | Node.js | >=24.0.0 | LTS version enforced in package.json |
| **Framework** | 11ty (Eleventy) | 3.1.2 | Static site generator |
| **Templating** | Nunjucks | Built-in | Mozilla templating engine |
| **Styling** | TailwindCSS | 3.4.1 | Utility-first CSS |
| **CSS Processing** | PostCSS | 8.4.35 | With autoprefixer |
| **Syntax Highlighting** | eleventy-plugin-syntaxhighlight | 5.0.2 | PrismJS-based |
| **Diagrams** | Mermaid CLI | 11.12.0 | Build-time SVG generation |
| **E2E Testing** | Playwright | 1.50.0 | Cross-browser testing |
| **Unit Testing** | Vitest | 4.0.18 | Fast unit test runner |

---

## Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `gray-matter` | 4.0.3 | Frontmatter parsing |
| `js-yaml` | 4.1.1 | YAML data file parsing |
| `mermaid` | 11.12.2 | Diagram rendering (runtime) |
| `rehype-highlight` | 7.0.2 | Syntax highlighting pipeline |
| `rehype-stringify` | 10.0.1 | HTML generation |
| `remark` | 15.0.1 | Markdown processing |
| `remark-parse` | 11.0.0 | Markdown parsing |
| `remark-rehype` | 11.1.2 | Markdown to HTML transform |

### Legacy Dependencies (Still in package.json)

| Package | Version | Status |
|---------|---------|--------|
| `react` | 18.3.1 | Unused (legacy React code in src/) |
| `react-dom` | 18.3.1 | Unused (legacy React code in src/) |
| `lucide-react` | 0.344.0 | Unused (icons now static SVG) |

---

## Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@11ty/eleventy` | 3.1.2 | Static site generator |
| `@11ty/eleventy-plugin-syntaxhighlight` | 5.0.2 | Code syntax highlighting |
| `@mermaid-js/mermaid-cli` | 11.12.0 | Build-time diagram SVG generation |
| `@playwright/test` | 1.50.0 | E2E testing framework |
| `concurrently` | 9.2.1 | Run multiple npm scripts |
| `tailwindcss` | 3.4.1 | Utility CSS framework |
| `postcss` | 8.4.35 | CSS processing |
| `autoprefixer` | 10.4.18 | CSS vendor prefixes |
| `vitest` | 4.0.18 | Unit test runner |
| `eslint` | 9.9.1 | JavaScript linting |

---

## Architecture Pattern

**Static Site Generator (SSG)**

```
_content/*.md → 11ty Collections → Nunjucks Templates → _site/*.html
_data/*.json  → Global Data     →                    →
```

### Key Characteristics

- **Pre-rendered HTML**: All pages built at compile time
- **File-based routing**: URL structure mirrors file structure
- **Zero client-side JS by default**: Progressive enhancement
- **Build-time data processing**: Content compiled, not fetched

---

## Build Pipeline

### Development

```
npm run dev
  ├── dev:11ty   → eleventy --serve (port 8080)
  └── dev:css    → tailwindcss --watch
```

### Production

```
npm run build
  ├── build:css     → tailwindcss --minify
  ├── build:mermaid → node scripts/render-mermaid.js
  └── eleventy      → Build static site to _site/
```

---

## Content Processing

### 11ty Collections

| Collection | Source | Validation |
|------------|--------|------------|
| `posts` | `_content/blog/*.md` | `validateBlogPost()` |
| `projects` | `_content/projects/*.md` | `validateProject()` |

### Custom Filters (lib/filters.js)

| Filter | Purpose |
|--------|---------|
| `readingTime(content)` | Calculate estimated read time |
| `findProjectsByIds(ids, projects)` | Lookup related projects |
| `date(dateObj, format)` | Date formatting |
| `getCategoryFromTags(tags)` | Extract category from tags |
| `where(array, key)` | Filter by truthy attribute |
| `take(array, count)` | Limit array to N items |

### Mermaid Transform

Build-time transformation replaces `language-mermaid` code blocks with pre-rendered SVG images via `scripts/render-mermaid.js`.

---

## Design System Tokens

### Neubrutalist Theme

| Token | Value | Usage |
|-------|-------|-------|
| `cream` | `#FFFBEB` | Page background |
| `border-black` | `#000000` | 4px borders on all elements |
| `border-radius` | `0` | No rounded corners |

### Shadow Variants

```css
--shadow-brutal-sm: 3px 3px 0 #000;   /* Small elements */
--shadow-brutal: 4px 4px 0 #000;      /* Default */
--shadow-brutal-md: 6px 6px 0 #000;   /* Cards */
--shadow-brutal-lg: 8px 8px 0 #000;   /* Modal, hero */
```

### Typography

```css
font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
```

### Accent Colors

- `lime-400` - Primary (CTAs, success)
- `pink-400` - Secondary (links)
- `yellow-400` - Tertiary (highlights, active states)
- `blue-400` - Info

---

## NPM Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `start` | `npm run dev` | Alias for dev |
| `dev` | `concurrently "npm:dev:11ty" "npm:dev:css"` | Development server |
| `dev:11ty` | `eleventy --serve` | 11ty with hot reload |
| `dev:css` | `tailwindcss -i ./css/input.css -o ./_site/css/styles.css --watch` | Tailwind watch |
| `build` | `npm run build:css && npm run build:mermaid && eleventy` | Production build |
| `build:css` | `tailwindcss -i ./css/input.css -o ./_site/css/styles.css --minify` | Minified CSS |
| `build:mermaid` | `node scripts/render-mermaid.js` | Pre-render diagrams |
| `clean` | `rm -rf _site` | Clean build output |
| `test:e2e` | `playwright test` | E2E tests |
| `test:e2e:ui` | `playwright test --ui` | Playwright UI mode |
| `test:unit` | `vitest run tests/unit` | Unit tests |
| `lint` | `eslint .` | JavaScript linting |

---

## Client-Side JavaScript

### main.js Features

| Function | Purpose |
|----------|---------|
| `initCodeCopy()` | Wrap code blocks, add copy buttons |
| `initSocialShare()` | Twitter, LinkedIn, Web Share API |
| `initDiagramViewer()` | Fullscreen modal with zoom controls |
| `initResumePrint()` | Print button for resume page |
| Mobile menu toggle | Accessible hamburger menu |

### Progressive Enhancement

- All content accessible without JavaScript
- JS adds interactivity (copy, share, zoom)
- Focus management for accessibility
- Keyboard navigation support

---

## Test Configuration

### Playwright (playwright.config.ts)

- **Base URL**: `http://localhost:8080`
- **Projects**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Web Server**: Starts `npm run dev:11ty` automatically
- **Artifacts**: Screenshots, videos, traces on failure

### Vitest (vitest.config.ts)

- **Test Directory**: `tests/unit`
- **Environment**: Node.js

---

*Generated by BMAD document-project workflow*
