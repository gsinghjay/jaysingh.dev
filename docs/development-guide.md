# Development Guide

**Generated:** 2026-01-29
**Project:** jaysingh.dev

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | 18+ (→ 24 LTS target) | Required for build tools |
| npm | 9+ | Comes with Node.js |
| Git | 2.x | Version control |

## Quick Start

```bash
# Clone repository
git clone https://github.com/gsinghjay/jaysingh.dev.git
cd jaysingh.dev

# Install dependencies
npm install

# Build content and start dev server
npm run dev
```

The development server will be available at `http://localhost:5173`.

## NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run build:content && vite` | Build content + start dev server |
| `build` | `npm run build:content && vite build` | Production build to `dist/` |
| `build:content` | `node scripts/build-content.js` | Process markdown to JSON |
| `preview` | `vite preview` | Preview production build |
| `lint` | `eslint .` | Run ESLint |
| `typecheck` | `tsc --noEmit -p tsconfig.app.json` | Type check without emit |

## Development Workflow

### 1. Content Changes

Edit files in `content/`:
```bash
# Edit a blog post
vim content/blog/my-new-post.md

# Rebuild content (dev server auto-reloads)
npm run build:content
```

### 2. Component Changes

Edit files in `src/components/`:
```bash
# Edit a component
vim src/components/Card.tsx

# Dev server hot-reloads automatically
```

### 3. Style Changes

Edit TailwindCSS in components or `src/index.css`:
```bash
# Add custom styles
vim src/index.css

# Dev server hot-reloads automatically
```

## Project Configuration

### Vite (`vite.config.ts`)

```typescript
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  assetsInclude: ['**/*.md', '**/*.yaml', '**/*.yml'],
});
```

### TypeScript (`tsconfig.app.json`)

- Target: ES2020
- Module: ESNext
- JSX: react-jsx
- Strict mode enabled

### Tailwind (`tailwind.config.js`)

Custom extensions:
- Color: `cream: #FFFBEB`
- Shadows: `brutal-sm`, `brutal`, `brutal-md`, `brutal-lg`
- Border radius: All set to 0 (brutalist style)

### ESLint (`eslint.config.js`)

- React hooks rules
- React refresh rules
- TypeScript-ESLint integration

## Adding Content

### New Blog Post

1. Create file: `content/blog/my-post.md`
2. Add frontmatter:
```yaml
---
id: my-post
title: MY POST TITLE
date: 2026-01-29
excerpt: Short description for previews.
tags:
  - tag1
  - tag2
readTime: 5 min
featured: false
---
```
3. Write markdown content
4. Run `npm run build:content`

### New Project

1. Create file: `content/projects/my-project.md`
2. Add frontmatter:
```yaml
---
id: my-project
title: MY PROJECT TITLE
description: Short description for cards.
technologies:
  - Tech1
  - Tech2
liveUrl: null
githubUrl: https://github.com/...
imageAlt: Alt text
featured: false
projectType: personal
---
```
3. Add sections: intro, `## Challenge`, `## Solution`, `## Impact`
4. Run `npm run build:content`

## Adding Components

1. Create file: `src/components/MyComponent.tsx`
2. Define props interface:
```typescript
interface MyComponentProps {
  // props
}
```
3. Export default function component
4. Follow brutalist design patterns (see component-inventory.md)
5. Import and use in pages

## Testing

Currently no automated tests are configured.

**Recommended for migration:**
- Unit tests: Vitest (Vite-native)
- E2E tests: Playwright or Cypress

## Building for Production

```bash
# Full production build
npm run build

# Output in dist/
ls dist/
```

Production build includes:
- Minified JavaScript bundles
- Optimized CSS with Tailwind purging
- Static assets copied from `public/`

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| (none currently used) | - | - |

The `.env` file exists but is empty. Supabase integration (if any) has been deprecated.

## Troubleshooting

### Content not updating

```bash
# Force rebuild content
npm run build:content

# Restart dev server
npm run dev
```

### Type errors

```bash
# Check types without building
npm run typecheck

# Fix any TypeScript errors in src/
```

### Lint errors

```bash
# Run linter
npm run lint

# Auto-fix where possible
npx eslint . --fix
```
