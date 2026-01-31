# Story 3.2: Create Project Detail Layout

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **site visitor**,
I want **to view detailed project case studies**,
so that **I can understand the technical challenges and solutions**.

## Acceptance Criteria

1. **AC1: Project Detail Page Accessible**
   - Given a project exists in `_content/projects/`
   - When I navigate to `/projects/{project-id}/`
   - Then I see the full project detail page

2. **AC2: Challenge/Solution/Impact Structure**
   - Given the project detail page
   - When I view the content structure
   - Then I see clearly defined sections: Challenge, Solution, and Impact

3. **AC3: Layout Extends Base**
   - Given the project detail layout
   - When I review the code
   - Then it uses `{% extends "layouts/base.njk" %}` pattern per Architecture spec

4. **AC4: Header Content**
   - Given the project detail page
   - When I view the header
   - Then I see the project title, description, and technology tags

5. **AC5: Clean URL Structure**
   - Given the project page
   - When I view the URL
   - Then it is a clean URL (`/projects/qr-code-platform/`) using the project's `id` field from frontmatter

6. **AC6: Markdown Formatting**
   - Given the project content includes Markdown formatting
   - When I view the rendered page
   - Then headings, lists, and code blocks are properly styled

## Tasks / Subtasks

- [x] Task 1: Create project detail layout (AC: #1, #3)
  - [x] 1.1 Create `_includes/layouts/project.njk` following blog-post.njk pattern
  - [x] 1.2 Use `layout: layouts/base.njk` frontmatter
  - [x] 1.3 Import card and tag macros from components

- [x] Task 2: Implement header section (AC: #4)
  - [x] 2.1 Add "Back to Projects" button at top (match blog-post pattern)
  - [x] 2.2 Display project type badge (WORK/PERSONAL) using tag macro
  - [x] 2.3 Display project title with first word highlighted (pink-400)
  - [x] 2.4 Display project description below title
  - [x] 2.5 Display technology tags using tag macro (all technologies, not limited)

- [x] Task 3: Implement content rendering (AC: #2, #6)
  - [x] 3.1 Wrap content in card component with prose styling
  - [x] 3.2 Ensure Challenge/Solution/Impact sections from markdown render properly
  - [x] 3.3 Apply prose styling for headings, paragraphs, lists, code blocks
  - [x] 3.4 Verify h2 headings (## Challenge, ## Solution, ## Impact) styled correctly

- [x] Task 4: Update project frontmatter for layout (AC: #1, #5)
  - [x] 4.1 Add `layout: layouts/project.njk` to project.json (11ty directory data)
  - [x] 4.2 OR add layout to each project file's frontmatter
  - [x] 4.3 Verify permalinks generate clean URLs

- [x] Task 5: Implement bottom navigation (AC: #1)
  - [x] 5.1 Add "Back to All Projects" button at bottom (centered, prominent)
  - [x] 5.2 Match blog-post styling (black bg, white text, hover pink-400)

- [x] Task 6: Ensure accessibility (AC: #1-6)
  - [x] 6.1 Single h1 for project title
  - [x] 6.2 Heading hierarchy (h1 → h2 for Challenge/Solution/Impact)
  - [x] 6.3 Visible focus states on all links (4px black outline)
  - [x] 6.4 Semantic structure with proper landmarks

- [x] Task 7: Write ATDD tests (AC: #1-6)
  - [x] 7.1 Test project detail page accessible at `/projects/{id}/`
  - [x] 7.2 Test project title, description, and tags displayed
  - [x] 7.3 Test Challenge/Solution/Impact sections visible
  - [x] 7.4 Test back button navigates to projects listing
  - [x] 7.5 Test Neubrutalist styling (border, shadow)
  - [x] 7.6 Test keyboard accessibility for navigation

## Dev Notes

### CRITICAL: Implementation Approach

**Architecture Decision:** Create a new layout file `_includes/layouts/project.njk` following the blog-post.njk pattern. This is a simpler layout than blog posts (no TOC, no social sharing, no reading time).

**DO NOT:**
- Add external links section (that's Story 3.4)
- Add Mermaid diagram rendering (that's Story 3.3)
- Add project filtering (that's Story 3.5)
- Add client-side JavaScript (no TOC needed for projects)

### Project Content Structure

All 9 projects follow this markdown structure:
```markdown
---
id: qr-code-platform
title: "QR Code Generation Platform"
description: "High-performance QR code..."
technologies:
  - Python
  - FastAPI
  - PostgreSQL
projectType: work
featured: true
permalink: /projects/qr-code-platform/
---

Intro paragraph...

## Challenge
Challenge details...

## Solution
Solution details...

## Impact
Impact details...
```

### Layout File Reference: blog-post.njk

Follow the blog-post.njk pattern but SIMPLIFY:
- Keep: Back button, title with highlight, tags, content card, bottom back button
- Remove: Date/reading time, author byline, social share, related projects, TOC sidebar

### Target Layout Structure

```nunjucks
{# _includes/layouts/project.njk #}
---
layout: layouts/base.njk
---

{% from "components/card.njk" import card %}
{% from "components/tag.njk" import tag %}

<div class="py-16">
  {# Back button - top #}
  <a href="/projects/" class="inline-flex items-center gap-2 px-4 py-2 bg-white border-4 border-black font-bold uppercase text-sm hover:bg-lime-300 transition-all duration-150 active:translate-y-1 mb-8"
     style="box-shadow: 6px 6px 0 #000;">
    <svg><!-- arrow icon --></svg>
    BACK TO PROJECTS
  </a>

  <div class="max-w-4xl">
    {# Header #}
    <div class="mb-8">
      {# Project type badge #}
      {{ tag(projectType | capitalize, "category") }}

      {# Title with first word highlighted #}
      <h1 class="text-4xl md:text-5xl font-black my-6">
        <span class="bg-pink-400">{{ titleWords[0] }}</span>
        {{ remaining words }}
      </h1>

      {# Description #}
      <p class="text-lg text-neutral-600 mb-6">{{ description }}</p>

      {# Technology tags #}
      <div class="flex flex-wrap gap-2">
        {% for tech in technologies %}
          {{ tag(tech, "tech") }}
        {% endfor %}
      </div>
    </div>

    {# Content Card #}
    {% call card("lg") %}
      <div class="prose max-w-none">
        {{ content | safe }}
      </div>
    {% endcall %}

    {# Bottom back button #}
    <div class="mt-12 flex justify-center">
      <a href="/projects/" class="...">
        BACK TO ALL PROJECTS
      </a>
    </div>
  </div>
</div>
```

### Directory Data File Option

Create `_content/projects/projects.json` to set layout for all projects:
```json
{
  "layout": "layouts/project.njk"
}
```

This avoids modifying each project file's frontmatter.

### Neubrutalist Styling Reference

From existing components and blog-post layout:
- **Back button:** `bg-white border-4 border-black`, `box-shadow: 6px 6px 0 #000`, `hover:bg-lime-300`, `active:translate-y-1`
- **Card:** Use card macro with "lg" size
- **Title highlight:** First word wrapped in `<span class="bg-pink-400">`
- **Tags:** Use tag macro with "tech" type for technologies, "category" type for project type
- **Focus states:** `outline: 4px solid black; outline-offset: 2px;`

### Prose Styling for Content

The content includes Challenge/Solution/Impact as h2 headings. The prose class handles:
- `h2`: Bold, larger size, proper margin
- `p`: Readable line-height
- `ul/ol`: Proper list styling
- `code`: Syntax highlighting (already configured)

### Testing Strategy

**Test file:** Add to existing `tests/e2e/projects.spec.ts`

**Key test scenarios:**
```typescript
test.describe('Story 3.2: Project Detail Layout', () => {
  test('[P0] project detail page accessible', async ({ page }) => {
    await page.goto('/projects/qr-code-platform/');
    await expect(page).toHaveURL('/projects/qr-code-platform/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('[P0] project header displays title and description', async ({ page }) => {
    await page.goto('/projects/qr-code-platform/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('QR Code');
    await expect(page.getByText('High-performance QR code')).toBeVisible();
  });

  test('[P0] Challenge/Solution/Impact sections visible', async ({ page }) => {
    await page.goto('/projects/qr-code-platform/');
    await expect(page.getByRole('heading', { name: 'Challenge' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Solution' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Impact' })).toBeVisible();
  });

  test('[P0] technology tags displayed', async ({ page }) => {
    await page.goto('/projects/qr-code-platform/');
    await expect(page.getByText('Python')).toBeVisible();
    await expect(page.getByText('FastAPI')).toBeVisible();
  });

  test('[P1] back button navigates to projects listing', async ({ page }) => {
    await page.goto('/projects/qr-code-platform/');
    await page.getByRole('link', { name: /back to projects/i }).click();
    await expect(page).toHaveURL('/projects/');
  });

  test('[P1] Neubrutalist styling on content card', async ({ page }) => {
    await page.goto('/projects/qr-code-platform/');
    const card = page.locator('[class*="border-4"]').first();
    const borderWidth = await card.evaluate(el =>
      window.getComputedStyle(el).borderWidth
    );
    expect(borderWidth).toBe('4px');
  });
});
```

### Project Structure Notes

**Files to create:**
- `_includes/layouts/project.njk` - New project detail layout
- `_content/projects/projects.json` - Directory data file for layout assignment

**Files unchanged:**
- `_content/projects/*.md` - Existing project content files (unless frontmatter needs manual layout)
- `_includes/components/card.njk` - Reuse existing
- `_includes/components/tag.njk` - Reuse existing
- `eleventy.config.js` - No changes needed (collection already exists)

**Files to modify:**
- `tests/e2e/projects.spec.ts` - Add Story 3.2 tests

### Previous Story Intelligence

**From Story 3.1 (Projects Collection and Listing):**
- Projects collection verified working (9 projects)
- Project cards link to `/projects/{project-id}/` URLs
- Frontmatter schema established (id, title, description, technologies, projectType, featured, permalink)
- Tag and card macros work correctly
- Test file exists at `tests/e2e/projects.spec.ts`

**From Story 2.2 (Blog Post Detail Layout):**
- blog-post.njk provides the pattern to follow
- Title highlighting with first word in pink-400
- Card macro used for content wrapper
- Prose class for markdown content styling
- Back buttons at top and bottom
- Focus states for accessibility

**Key learnings:**
- Follow blog-post.njk structure but simplify
- No sidebar needed (projects are shorter)
- No TOC JavaScript needed
- Technology tags should show ALL (not limited to 4 like listing)

### Git Intelligence Summary

**Recent commit pattern:** `Add {feature} with ATDD tests (Story {x.y})`

**Expected commit for this story:** `Add project detail layout with ATDD tests (Story 3.2)`

### Edge Cases to Handle

1. **No technologies array** - Skip tags section gracefully
2. **Missing description** - Display title only
3. **Very long title** - Allow wrapping, responsive text size
4. **No Challenge/Solution/Impact sections** - Content still renders (just no specific headings)
5. **Code blocks in content** - Syntax highlighting already configured

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-3.2] - Acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend-Architecture] - Layout patterns
- [Source: _bmad-output/planning-artifacts/architecture.md#URL-Structure] - Clean URLs
- [Source: _bmad-output/planning-artifacts/prd.md#FR18] - Project detail pages requirement
- [Source: _includes/layouts/blog-post.njk] - Pattern to follow
- [Source: _content/projects/qr-code-platform.md] - Frontmatter schema example
- [Source: _bmad-output/implementation-artifacts/3-1-*.md] - Previous story learnings
- [Source: eleventy.config.js:105-107] - Projects collection

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None required - clean implementation.

### Completion Notes List

- Created `_includes/layouts/project.njk` following blog-post.njk pattern (simplified: no TOC, no social share, no reading time)
- Created `_content/projects/projects.json` directory data file to assign layout to all projects
- Layout includes: back button (top), project type badge, title with pink-400 highlight, description, all technology tags, content card with prose styling, back button (bottom)
- All 9 project detail pages now render at clean URLs (`/projects/{id}/`)
- Story 3.2 tests: 15 tests × 5 browsers = 75 total, all passing
- Fixed test selectors: technology tags use more specific locator to avoid matching body content; Neubrutalist styling test targets card with prose content and expects 8px shadow (lg size)

### Code Review Notes

- **Fixed**: Updated stale TDD comment in test file (was misleading about test.skip())
- **Added**: AC3 test verifying layout extends base.njk (checks main#main-content, skip-link, header, footer)
- **Verified**: All 6 ACs implemented and tested
- **Reviewed**: Code quality, accessibility (aria-hidden on SVGs, focus-visible inherited from CSS)

### File List

**Created:**
- `_includes/layouts/project.njk` - Project detail layout
- `_content/projects/projects.json` - Directory data file for layout assignment

**Modified:**
- `tests/e2e/projects.spec.ts` - Enabled Story 3.2 tests, fixed selectors for technology tags and Neubrutalist styling

**Unchanged:**
- `_content/projects/*.md` - 9 project content files (layout assigned via directory data)
- `_includes/components/card.njk` - Reused existing
- `_includes/components/tag.njk` - Reused existing
- `eleventy.config.js` - No changes needed

### Change Log

- 2026-01-31: Implemented project detail layout with ATDD tests (Story 3.2)
- 2026-01-31: Code review passed - fixed stale comments, added AC3 test (15 tests total)

