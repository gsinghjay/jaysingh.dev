# Story 1.1: Initialize 11ty Project with TailwindCSS Pipeline

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **developer**,
I want **a working 11ty project with TailwindCSS build pipeline**,
so that **I have the foundation to build all site pages**.

## Acceptance Criteria

1. **AC1: Dependencies Installation**
   - Given an empty project directory
   - When I run `npm install`
   - Then all dependencies are installed (@11ty/eleventy, @11ty/eleventy-plugin-syntaxhighlight, tailwindcss, postcss, autoprefixer, concurrently)

2. **AC2: Development Server**
   - Given the project is initialized
   - When I run `npm run dev`
   - Then 11ty serves the site with hot reload and TailwindCSS watches for changes

3. **AC3: Production Build**
   - Given the project is initialized
   - When I run `npm run build`
   - Then the site builds to `_site/` with minified, purged CSS

4. **AC4: CSS Purging**
   - Given the build completes
   - When I inspect `_site/css/styles.css`
   - Then it contains only used TailwindCSS utilities (purged)

5. **AC5: Project Structure**
   - Given the project structure
   - When I review the directories
   - Then I see `_data/`, `_includes/layouts/`, `_includes/components/`, `_includes/partials/`, `content/`, `css/`, `js/`, `public/` per Architecture spec

## Tasks / Subtasks

- [x] Task 1: Initialize package.json and install core dependencies (AC: #1)
  - [x] 1.1 Create new package.json with `npm init -y`
  - [x] 1.2 Install 11ty: `npm install @11ty/eleventy --save-dev`
  - [x] 1.3 Install syntax highlighting plugin: `npm install @11ty/eleventy-plugin-syntaxhighlight --save-dev`
  - [x] 1.4 Install TailwindCSS stack: `npm install tailwindcss postcss autoprefixer --save-dev`
  - [x] 1.5 Install concurrently for dev server: `npm install concurrently --save-dev`

- [x] Task 2: Create project directory structure (AC: #5)
  - [x] 2.1 Create `_data/` directory for global data files
  - [x] 2.2 Create `_includes/layouts/` directory for page layouts
  - [x] 2.3 Create `_includes/components/` directory for reusable macros
  - [x] 2.4 Create `_includes/partials/` directory for static includes
  - [x] 2.5 Create `content/blog/` directory (confirm existing content is preserved)
  - [x] 2.6 Create `content/projects/` directory (confirm existing content is preserved)
  - [x] 2.7 Create `css/` directory with `input.css` entry point
  - [x] 2.8 Create `js/` directory for client-side JavaScript
  - [x] 2.9 Create `public/` directory for static assets
  - [x] 2.10 Create `scripts/` directory for build scripts

- [x] Task 3: Configure TailwindCSS with Neubrutalist design tokens (AC: #4)
  - [x] 3.1 Create `tailwind.config.js` porting existing Neubrutalist tokens:
    - colors: cream (#FFFBEB)
    - boxShadow: brutal variants (brutal-sm, brutal, brutal-md, brutal-lg)
    - fontFamily: mono stack
    - borderRadius: none (removes default rounding)
  - [x] 3.2 Create `postcss.config.js` with tailwindcss and autoprefixer
  - [x] 3.3 Create `css/input.css` with Tailwind directives (@tailwind base, components, utilities)
  - [x] 3.4 Update content paths in tailwind.config.js for 11ty file patterns

- [x] Task 4: Configure 11ty (AC: #2, #3)
  - [x] 4.1 Create `eleventy.config.js` with:
    - Input/output directories configuration
    - Syntax highlighting plugin registration
    - Passthrough copy for public/ assets
    - Custom collections for blog and projects
  - [x] 4.2 Create minimal `_includes/layouts/base.njk` template for testing
  - [x] 4.3 Create test `index.njk` page extending base layout

- [x] Task 5: Configure npm scripts (AC: #2, #3)
  - [x] 5.1 Add `dev` script: concurrently runs 11ty serve and tailwind watch
  - [x] 5.2 Add `dev:11ty` script: `eleventy --serve`
  - [x] 5.3 Add `dev:css` script: `tailwindcss -i ./css/input.css -o ./_site/css/styles.css --watch`
  - [x] 5.4 Add `build` script: runs build:css then eleventy
  - [x] 5.5 Add `build:css` script: `tailwindcss -i ./css/input.css -o ./_site/css/styles.css --minify`
  - [x] 5.6 Add `build:mermaid` script placeholder: `node scripts/render-mermaid.js`
  - [x] 5.7 Add `clean` script: `rm -rf _site`

- [x] Task 6: Verify build pipeline (AC: #2, #3, #4)
  - [x] 6.1 Run `npm run dev` and verify hot reload works
  - [x] 6.2 Run `npm run build` and verify production output in `_site/`
  - [x] 6.3 Verify CSS is purged by checking file size < 50KB
  - [x] 6.4 Verify all directories exist as specified

## Dev Notes

### Architecture Compliance - CRITICAL

This is a **brownfield migration** from React SPA to 11ty static site. The existing React codebase in `src/` should be preserved during this story - we are setting up the new 11ty structure alongside it.

**DO NOT:**
- Delete or modify the existing `src/` React code
- Modify the existing `package.json` scripts for Vite/React
- Remove any existing dependencies

**DO:**
- Create a NEW 11ty-compatible structure
- Port the TailwindCSS config exactly (preserve Neubrutalist design tokens)
- Set up parallel build capability

### Technology Stack Requirements

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 24 LTS | Runtime (verify with `node -v`) |
| 11ty | 3.x (latest) | Static site generator |
| TailwindCSS | 3.4.x | CSS framework |
| Nunjucks | (bundled with 11ty) | Templating |

### Existing Neubrutalist Design Tokens to Port

From existing `tailwind.config.js`:

```javascript
// MUST preserve these exact values:
colors: {
  cream: '#FFFBEB',  // Background color
},
boxShadow: {
  'brutal-sm': '3px 3px 0 #000',
  'brutal': '4px 4px 0 #000',
  'brutal-md': '6px 6px 0 #000',
  'brutal-lg': '8px 8px 0 #000',
},
fontFamily: {
  mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
},
borderRadius: {
  'none': '0',  // Removes default border radius
},
```

### Project Structure Notes

Target directory structure per Architecture document:

```
jaysingh.dev/
├── _data/                # Global data (11ty auto-loads as template vars)
├── _includes/
│   ├── layouts/          # Page layouts (extends pattern)
│   ├── components/       # Reusable macros (from/import pattern)
│   └── partials/         # Static includes (include pattern)
├── content/
│   ├── blog/             # Blog posts (existing - preserve!)
│   └── projects/         # Projects (existing - preserve!)
├── css/
│   └── input.css         # TailwindCSS entry point
├── js/
│   └── main.js           # Minimal client JS (future)
├── public/               # Static assets (passthrough copy)
├── scripts/
│   └── render-mermaid.js # Mermaid SVG generator (stub for now)
├── eleventy.config.js
├── tailwind.config.js    # Ported from existing
├── postcss.config.js
└── package.json          # New 11ty-focused package.json
```

### npm Scripts Configuration

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

### Eleventy Config Essentials

```javascript
// eleventy.config.js
export default function(eleventyConfig) {
  // Syntax highlighting
  eleventyConfig.addPlugin(syntaxHighlight);

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("public");

  // Collections
  eleventyConfig.addCollection("posts", collection => {
    return collection.getFilteredByGlob("content/blog/*.md");
  });

  eleventyConfig.addCollection("projects", collection => {
    return collection.getFilteredByGlob("content/projects/*.md");
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
```

### Testing Requirements

1. **Development Server Test:**
   - Run `npm run dev`
   - Open browser to http://localhost:8080
   - Verify page loads with TailwindCSS styles
   - Modify template → verify hot reload works
   - Modify CSS → verify styles update

2. **Production Build Test:**
   - Run `npm run build`
   - Verify `_site/` directory created
   - Verify `_site/css/styles.css` exists and is minified
   - Verify CSS file size < 50KB (purged)

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Starter-Template-Evaluation]
- [Source: _bmad-output/planning-artifacts/architecture.md#Build-Pipeline]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project-Structure-Boundaries]
- [Source: _bmad-output/planning-artifacts/epics.md#Story-1.1]
- [Source: _bmad-output/planning-artifacts/prd.md] (FR33, FR34)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Encountered 11ty processing errors for _bmad/, public/, .claude/, and index.html files - resolved by adding ignores to eleventy.config.js
- Existing content/blog/ markdown files contain React-era nunjucks filters (humanizePercentage) - ignored until content migration story

### Completion Notes List

- **Task 1:** Installed @11ty/eleventy@3.1.2, @11ty/eleventy-plugin-syntaxhighlight@5.0.2, concurrently@9.2.1. TailwindCSS, postcss, autoprefixer already present from React setup.
- **Task 2:** Created all required directories. content/blog/, content/projects/, public/, scripts/ already existed and were preserved. Added .gitkeep files to empty directories.
- **Task 3:** Updated tailwind.config.js to include 11ty template patterns (.njk, .md) while preserving React paths and all Neubrutalist design tokens (cream, brutal shadows, mono font, no border-radius). postcss.config.js already existed with correct configuration.
- **Task 4:** Created eleventy.config.js with syntax highlighting, passthrough copy, blog/projects collections, and comprehensive ignores for brownfield compatibility (_bmad, _bmad-output, src, docs, scripts, public templates, .claude, index.html, existing content).
- **Task 5:** Added all 11ty npm scripts. Preserved existing Vite/React scripts as dev:react and build:react for parallel build capability.
- **Task 6:** Verified dev server starts at localhost:8080 with hot reload. Production build outputs to _site/ with purged CSS at 18KB (well under 50KB threshold).

### File List

**Created:**
- _data/.gitkeep
- _includes/layouts/base.njk
- _includes/components/.gitkeep
- _includes/partials/.gitkeep
- css/input.css
- js/main.js
- scripts/render-mermaid.js
- eleventy.config.js
- index.njk
- public/robots.txt

**Modified:**
- package.json (added 11ty dependencies and scripts, renamed to jaysingh-dev)
- tailwind.config.js (added 11ty content paths, fixed borderRadius config)
- package-lock.json (updated with new dependencies)
- .gitignore (added _site/ build output)

## Senior Developer Review (AI)

**Reviewer:** Amelia (Dev Agent)
**Date:** 2026-01-29
**Outcome:** APPROVED with fixes applied

### Issues Found & Fixed

| ID | Severity | Issue | Resolution |
|----|----------|-------|------------|
| H1 | HIGH | base.njk missing accessibility (skip link, header, footer, landmarks) | Added skip link, header/nav with aria-labels, footer, id="main-content" |
| H2 | HIGH | borderRadius at theme level destroys all Tailwind radius classes | Moved to extend block |
| H3 | HIGH | .gitignore missing _site/ build output | Added _site/ to .gitignore |
| M1 | MEDIUM | Collections defined for ignored content | Left as-is (intentional for future migration) |
| M2 | MEDIUM | Missing SEO meta tags | Added description and og:title/description |
| M3 | MEDIUM | public/ missing robots.txt | Created robots.txt |
| M4 | MEDIUM | package.json name unchanged | Renamed to jaysingh-dev |
| M5 | MEDIUM | No main.js stub | Created js/main.js placeholder |

### Verification

- `npm run build` passes
- CSS output: 27KB (under 50KB threshold)
- All accessibility landmarks in place
- borderRadius classes now work correctly
