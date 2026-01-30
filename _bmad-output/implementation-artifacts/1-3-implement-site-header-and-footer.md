# Story 1.3: Implement Site Header and Footer

Status: done

## Story

As a **site visitor**,
I want **persistent header navigation and footer**,
so that **I can navigate between all sections of the site**.

## Acceptance Criteria

1. **AC1: Header Navigation Links**
   - Given I am on any page
   - When I view the header
   - Then I see navigation links for Home, Blog, Projects, Resume, Contact

2. **AC2: Clean URL Navigation**
   - Given the navigation links exist
   - When I click a navigation link
   - Then I navigate to the correct page using clean URLs (`/`, `/blog/`, `/projects/`, `/resume/`, `/contact/`)

3. **AC3: Active Page Indication**
   - Given I am on a specific page
   - When I view the navigation
   - Then the current page link is visually indicated as active

4. **AC4: Footer Content**
   - Given I am on any page
   - When I view the footer
   - Then I see consistent footer content (copyright, tagline) matching React Footer.tsx

5. **AC5: Architecture Compliance**
   - Given the header and footer partials
   - When I review the code
   - Then they use `{% include "partials/header.njk" %}` pattern per Architecture spec

## Tasks / Subtasks

- [x] Task 1: Create header partial with navigation (AC: #1, #2, #5)
  - [x] 1.1 Create `_includes/partials/header.njk` file
  - [x] 1.2 Add site logo/name link to home (`/`)
  - [x] 1.3 Add navigation links: Home (`/`), Blog (`/blog/`), Projects (`/projects/`), Resume (`/resume/`), Contact (`/contact/`)
  - [x] 1.4 Style header with Neubrutalist design (border-4 border-black, cream background)
  - [x] 1.5 Apply responsive layout (horizontal nav on desktop, prepare for mobile menu in 1.4)

- [x] Task 2: Implement active page styling (AC: #3)
  - [x] 2.1 Use 11ty's `page.url` to detect current page
  - [x] 2.2 Add conditional class for active nav link (`is-active` state class per Architecture)
  - [x] 2.3 Style active link with visual distinction (lime-400 background, bold text)
  - [x] 2.4 Ensure active state is accessible (not color-only indication)

- [x] Task 3: Create footer partial (AC: #4, #5)
  - [x] 3.1 Create `_includes/partials/footer.njk` file
  - [x] 3.2 Add copyright notice with current year (hardcode 2026)
  - [x] 3.3 Add tagline "Built with raw HTML energy" (React parity - no social links per Footer.tsx)
  - [x] 3.4 Style footer with Neubrutalist design (bg-black text-white per React parity)
  - [N/A] 3.5 External link security attributes (no external links in React footer)

- [x] Task 4: Integrate partials into base layout (AC: #5)
  - [x] 4.1 Update `_includes/layouts/base.njk` to use `{% include "partials/header.njk" %}`
  - [x] 4.2 Update `_includes/layouts/base.njk` to use `{% include "partials/footer.njk" %}`
  - [x] 4.3 Remove placeholder comments from header/footer sections

- [x] Task 5: Create navigation target pages (AC: #2)
  - [x] 5.1 Create `blog.njk` page shell at `/blog/`
  - [x] 5.2 Create `projects.njk` page shell at `/projects/`
  - [x] 5.3 Create `resume.njk` page shell at `/resume/`
  - [x] 5.4 Create `contact.njk` page shell at `/contact/`
  - [x] 5.5 Verify all pages use `layouts/base.njk` and have proper titles

- [x] Task 6: Verify and test (AC: #1-5)
  - [x] 6.1 Test navigation between all pages
  - [x] 6.2 Verify active state appears correctly on each page
  - [x] 6.3 Test keyboard navigation (Tab through nav links)
  - [x] 6.4 Verify build succeeds with `npm run build`

## Dev Notes

### Architecture Compliance - CRITICAL

**File Organization (per Architecture spec):**
```
_includes/
├── layouts/
│   └── base.njk           # Uses {% extends %} pattern - DO NOT TOUCH layout structure
└── partials/
    ├── header.njk         # NEW - Use {% include %} pattern
    ├── footer.njk         # NEW - Use {% include %} pattern
    ├── meta.njk           # EXISTS - Already extracted
    └── skip-link.njk      # EXISTS - Already extracted
```

**Template Patterns (Architecture spec):**
- Partials: Use `{% include "partials/header.njk" %}` - static fragments
- State classes: Use `is-*` prefix (e.g., `is-active`)
- Nunjucks comments: Use `{# comment #}` NOT HTML comments

### Navigation Structure

| Link Text | URL | 11ty Permalink |
|-----------|-----|----------------|
| Home | `/` | `index.njk` (default) |
| Blog | `/blog/` | `blog.njk` with `permalink: /blog/` |
| Projects | `/projects/` | `projects.njk` with `permalink: /projects/` |
| Resume | `/resume/` | `resume.njk` with `permalink: /resume/` |
| Contact | `/contact/` | `contact.njk` with `permalink: /contact/` |

### Active State Detection

Use 11ty's `page.url` variable to detect current page:

```nunjucks
{# Header navigation with active state #}
{% set navItems = [
  { url: '/', text: 'Home' },
  { url: '/blog/', text: 'Blog' },
  { url: '/projects/', text: 'Projects' },
  { url: '/resume/', text: 'Resume' },
  { url: '/contact/', text: 'Contact' }
] %}

{% for item in navItems %}
  <a href="{{ item.url }}"
     class="nav-link {% if page.url == item.url %}is-active{% endif %}">
    {{ item.text }}
  </a>
{% endfor %}
```

### Neubrutalist Header Styling (React Parity)

```css
/* Header styles - implemented in css/input.css as .nav-btn */
.nav-btn {
  @apply px-4 py-2 text-sm font-bold uppercase border-2 border-black bg-white text-black;
  box-shadow: var(--shadow-brutal-sm);
  transition: var(--transition-default);
}

.nav-btn:hover {
  @apply bg-lime-300;
}

.nav-btn.is-active {
  @apply bg-yellow-400 text-black;
}
```

### Footer Structure (React Parity)

```nunjucks
{# Footer partial - 1:1 parity with React Footer.tsx #}
<div class="flex flex-col md:flex-row justify-between items-center gap-4">
  <p class="text-base font-bold">
    &copy; 2026 JAYSINGH.DEV
  </p>
  <p class="text-base text-neutral-500">
    Built with raw HTML energy
  </p>
</div>
```

### Page Shell Template

Each page needs this structure:

```nunjucks
---
title: Page Title
description: Page description for SEO
permalink: /page-slug/
---

{% extends "layouts/base.njk" %}

{% block content %}
<h1 class="text-4xl md:text-5xl font-black mb-8">Page Title</h1>

{# Content coming in future stories #}
<p>Coming soon...</p>
{% endblock %}
```

**Wait** - current base.njk uses `{{ content | safe }}` not blocks. Keep this pattern:

```nunjucks
---
title: Page Title
description: Page description for SEO
permalink: /page-slug/
layout: layouts/base.njk
---

<h1 class="text-4xl md:text-5xl font-black mb-8">Page Title</h1>

{# Content coming in future stories #}
<p class="text-lg">Coming soon...</p>
```

### Accessibility Requirements

1. **Navigation landmark**: `<nav aria-label="Main navigation">`
2. **Focus states**: All nav links must show focus indicator (already in CSS)
3. **Active state**: Must not rely on color alone - use border + background
4. **aria-current**: Active nav link has `aria-current="page"` for screen readers

### Project Structure Notes

**Files to Create:**
- `_includes/partials/header.njk`
- `_includes/partials/footer.njk`
- `blog.njk`
- `projects.njk`
- `resume.njk`
- `contact.njk`

**Files to Modify:**
- `_includes/layouts/base.njk` - Add include statements
- `css/input.css` - Add nav-link styles

**Existing Files (reference only):**
- `index.njk` - Already exists from Story 1.1
- `_includes/partials/meta.njk` - Exists
- `_includes/partials/skip-link.njk` - Exists

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-1.3] - Acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#Template-Organization] - Partial patterns
- [Source: _bmad-output/planning-artifacts/architecture.md#Naming-Patterns] - State class naming (is-*)
- [Source: _bmad-output/planning-artifacts/architecture.md#Accessibility-Patterns] - ARIA labels
- [Source: _bmad-output/planning-artifacts/architecture.md#CSS--JavaScript-Patterns] - State class conventions

## Previous Story Intelligence

### From Story 1.2 Learnings

**What was established:**
- Complete Neubrutalist CSS in `css/input.css` (shadow variants, hover-lift utilities)
- Base layout uses partials pattern (`{% include "partials/meta.njk" %}`)
- Skip link with proper focus styling
- Focus states: 4px black outline per Architecture spec
- CSS custom properties: `--transition-default`, `--shadow-brutal-*`

**Patterns established:**
- Extract reusable elements to `partials/` directory
- Use Nunjucks comments `{# #}` not HTML comments
- State classes use `is-*` prefix
- Reduced motion support in CSS

**Issues from 1.2 review (avoid repeating):**
- Don't use inline styles when CSS utilities exist
- Extract partials per Architecture spec (don't inline)
- Use `:focus-visible` not `:focus` for keyboard-only focus

### From Story 1.1 Learnings

**What was established:**
- 11ty 3.1.2 with syntax highlighting plugin
- TailwindCSS pipeline (18KB purged)
- ESM config syntax
- Content paths excluded from 11ty processing

### Git Intelligence

**Recent commits:**
- `feb3e86` - Neubrutalist design system complete (Story 1.2)
- `74959d0` - 11ty foundation initialized (Story 1.1)

**Patterns from commits:**
- Atomic commits per feature
- Clear commit messages referencing story

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None required.

### Completion Notes List

**Initial Implementation:**
- Created header partial with 5 nav links using data-driven navItems array
- Implemented active page detection using `page.url` comparison
- Added `aria-current="page"` for screen reader accessibility
- Created 4 page shells (blog, projects, resume, contact) with proper permalinks

**React Parity Amendment (per user request):**
- Logo: Black button with box-shadow (`JAYSINGH.DEV`), hover yellow
- Nav text: UPPERCASE to match React Header.tsx
- Active state: `bg-yellow-400` (was lime-400) to match React
- Nav buttons: Added 3px box shadows matching React's button style
- Header: `sticky top-0 z-50`, `bg-white`, `max-w-6xl`
- Footer: `bg-black text-white` with "Built with raw HTML energy" tagline (matches React Footer.tsx)
- Removed social links from footer (not in React version)
- All layout widths updated from `max-w-4xl` to `max-w-6xl`
- Body uses `flex flex-col min-h-screen` for sticky footer

**Tests:**
- All 46 E2E tests pass on Chromium
- Updated test expectations for UPPERCASE nav text and React-parity footer content

### File List

**Created:**
- `_includes/partials/header.njk`
- `_includes/partials/footer.njk`
- `blog.njk`
- `projects.njk`
- `resume.njk`
- `contact.njk`

**Modified:**
- `_includes/layouts/base.njk` - Added header/footer includes
- `css/input.css` - Added nav-btn styles (renamed from nav-link for React parity)
- `tests/e2e/header-footer.spec.ts` - Enabled all 22 tests (removed test.skip)
- `tests/e2e/smoke.spec.ts` - Fixed nav selector to use `header nav` (2 nav elements now exist)
- `package.json` - Added @seontechnologies/playwright-utils dependency

### Change Log

- 2026-01-29: Story 1.3 implementation complete - header, footer, navigation, active states
- 2026-01-29: Amended for 1:1 React parity - logo button, uppercase nav, yellow active state, black footer
- 2026-01-29: Code review fixes - Updated AC4/Task 3.3 for React parity (no social links), removed redundant aria-label from header, documented package.json dependency

