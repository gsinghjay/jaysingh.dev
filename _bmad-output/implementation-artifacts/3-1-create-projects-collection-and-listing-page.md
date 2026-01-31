# Story 3.1: Create Projects Collection and Listing Page

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **site visitor**,
I want **to browse a list of all projects**,
so that **I can discover Jay's work and technical expertise**.

## Acceptance Criteria

1. **AC1: Projects Collection Exists**
   - Given project files exist in `_content/projects/`
   - When 11ty builds the site
   - Then a `projects` collection is created containing all projects

2. **AC2: Projects Listing Page Accessible**
   - Given I navigate to `/projects/`
   - When the page loads
   - Then I see a list of all projects displayed as cards

3. **AC3: Project Card Content**
   - Given the projects listing displays
   - When I view a project card
   - Then I see the title, brief description, and technology tags

4. **AC4: Navigation to Project Detail**
   - Given the projects listing exists
   - When I click on a project card
   - Then I navigate to the individual project detail page

5. **AC5: Mobile Responsive Layout**
   - Given the projects listing page
   - When I view on mobile
   - Then the project cards stack vertically and remain readable

6. **AC6: Neubrutalist Design System**
   - Given the projects listing page
   - When I view the design
   - Then it uses the Neubrutalist card component with bold borders and technology tag pills

## Tasks / Subtasks

- [x] Task 1: Verify projects collection configuration (AC: #1)
  - [x] 1.1 Confirm `eleventy.config.js` has projects collection defined
  - [x] 1.2 Verify collection globs `_content/projects/*.md` files correctly
  - [x] 1.3 Verify all 9 project files are in `_content/projects/`

- [x] Task 2: Update projects.njk listing page (AC: #2, #3, #6)
  - [x] 2.1 Import card and tag macros from components
  - [x] 2.2 Loop through `collections.projects` to display all projects
  - [x] 2.3 Display project title as clickable link to detail page
  - [x] 2.4 Display project description (truncated to 2 lines)
  - [x] 2.5 Display technology tags as pills using tag macro
  - [x] 2.6 Apply Neubrutalist styling (border-4, shadow-brutal, hover effects)

- [x] Task 3: Implement project card design (AC: #3, #6)
  - [x] 3.1 Use existing card macro or create project-specific card layout
  - [x] 3.2 Add projectType indicator (work/personal badge)
  - [x] 3.3 Style technology tags with tag component
  - [x] 3.4 Add hover state (bg-lime-300) for interactive feedback
  - [x] 3.5 Add 6px shadow and 4px border per Neubrutalist spec

- [x] Task 4: Implement navigation to project detail (AC: #4)
  - [x] 4.1 Link project title to `/projects/{project-id}/`
  - [x] 4.2 Add "View Project" button/link at card bottom
  - [x] 4.3 Ensure clean URL pattern with trailing slash
  - [x] 4.4 Make entire card clickable for better UX

- [x] Task 5: Implement responsive layout (AC: #5)
  - [x] 5.1 Single column on mobile (default)
  - [x] 5.2 Two columns on tablet (md: breakpoint)
  - [x] 5.3 Two or three columns on desktop (lg: breakpoint)
  - [x] 5.4 Ensure readable text size on all breakpoints

- [x] Task 6: Ensure accessibility
  - [x] 6.1 Use proper heading hierarchy (h1 for page title, h2 for project titles)
  - [x] 6.2 Ensure visible focus states on card links (4px black outline)
  - [x] 6.3 Cards must be keyboard-accessible (Tab navigation)
  - [x] 6.4 Tags should have appropriate contrast ratios

- [x] Task 7: Write ATDD tests (AC: #1-6)
  - [x] 7.1 Test projects page accessible at `/projects/`
  - [x] 7.2 Test all projects displayed with title, description, tags
  - [x] 7.3 Test clicking project card navigates to detail page
  - [x] 7.4 Test responsive layout on mobile/tablet/desktop
  - [x] 7.5 Test keyboard accessibility for project cards
  - [x] 7.6 Test Neubrutalist styling (border, shadow)

## Dev Notes

### CRITICAL: Implementation Approach

**Architecture Decision:** The projects collection already exists in `eleventy.config.js` (line 105-107). This story focuses on updating the `projects.njk` listing page to display the collection using the established Neubrutalist design patterns.

**DO NOT:** Create new collections, modify frontmatter schemas, or add client-side JavaScript. This is a pure template update following the blog listing pattern.

### Existing Projects Collection

From `eleventy.config.js` (lines 105-107):
```javascript
eleventyConfig.addCollection("projects", collection => {
  return collection.getFilteredByGlob("_content/projects/*.md");
});
```

### Available Projects (9 total in `_content/projects/`)

| Project ID | Title | Type |
|------------|-------|------|
| authentication-gateway | Zero-Trust Authentication Gateway | work |
| cloud-infrastructure-platform | Cloud Infrastructure Platform | work |
| observability-infrastructure | Observability Infrastructure | work |
| qr-code-platform | QR Code Platform | work |
| event-driven-microservices | Event-Driven Microservices | work |
| cicd-pipeline | CI/CD Pipeline | work |
| automation-scripts | Automation Scripts | work |
| covid-dashboard | COVID Dashboard | personal |
| jamf-pro-deployment | Jamf Pro Deployment | work |

### Project Frontmatter Schema

From `_content/projects/authentication-gateway.md`:
```yaml
id: authentication-gateway
title: "Zero-Trust Authentication Gateway"
description: "Distributed authentication and authorization gateway..."
technologies:
  - OAuth2-Proxy
  - Traefik
  - Keycloak
  - Docker
  - RBAC
projectType: work
featured: true
permalink: /projects/authentication-gateway/
```

**Key fields for listing:**
- `title` - Project name (displayed as card heading)
- `description` - Brief description (truncated in listing)
- `technologies` - Array of tech tags (displayed as pills)
- `projectType` - "work" or "personal" (optional badge)
- `permalink` - URL for detail page (used for navigation)
- `featured` - Boolean for potential future featured section

### Design Pattern Reference

**Follow blog.njk listing pattern:**
```nunjucks
{% from "components/card.njk" import card %}
{% from "components/tag.njk" import tag %}

<div class="space-y-6">
  {% for project in collections.projects %}
    {% call card("default", true) %}
      {# Project card content #}
    {% endcall %}
  {% endfor %}
</div>
```

### Neubrutalist Styling Reference

From existing components:
- **Card base:** `bg-white border-4 border-black`
- **Shadow:** `box-shadow: 6px 6px 0 #000;`
- **Hover:** `hover:bg-lime-300` or `group-hover:translate-x-1`
- **Active:** `active:translate-y-1`
- **Tag pill:** Pink background with black text (`bg-pink-400`)
- **Focus:** `outline: 4px solid black; outline-offset: 2px;`

### Tag Component Reference

From `_includes/components/tag.njk`:
```nunjucks
{{ tag("Docker", "tech") }}
```

### Responsive Grid Pattern

```nunjucks
<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
  {% for project in collections.projects %}
    {# project card #}
  {% endfor %}
</div>
```

### Page Layout Structure

**Target structure for `projects.njk`:**
```nunjucks
---
layout: layouts/base.njk
title: Projects
description: Portfolio of software engineering projects and case studies
permalink: /projects/
---

{% from "components/card.njk" import card %}
{% from "components/tag.njk" import tag %}

<h1 class="text-4xl md:text-5xl font-black mb-8">
  <span class="bg-pink-400 px-2">PROJECTS</span> & CASE STUDIES
</h1>

{# Optional intro text #}
<p class="text-lg text-neutral-600 mb-12 max-w-2xl">
  A collection of software engineering projects showcasing...
</p>

{# Project grid #}
<div class="grid gap-6 md:grid-cols-2">
  {% for project in collections.projects %}
    {% call card("default", true) %}
      {# Project type badge #}
      <div class="flex justify-between items-center mb-4">
        {{ tag(project.data.projectType | capitalize, "category") }}
      </div>

      {# Title as link #}
      <a href="{{ project.url }}" class="block">
        <h2 class="text-xl font-black mb-3 hover:text-pink-600 transition-colors">
          {{ project.data.title }}
        </h2>
      </a>

      {# Description #}
      <p class="text-neutral-600 mb-4 line-clamp-2">
        {{ project.data.description }}
      </p>

      {# Technology tags #}
      <div class="flex flex-wrap gap-2 mb-4">
        {% for tech in project.data.technologies | take(4) %}
          {{ tag(tech, "tech") }}
        {% endfor %}
        {% if project.data.technologies.length > 4 %}
          <span class="text-sm text-neutral-500">+{{ project.data.technologies.length - 4 }} more</span>
        {% endif %}
      </div>

      {# View project link #}
      <a href="{{ project.url }}" class="font-bold text-black hover:underline">
        VIEW PROJECT →
      </a>
    {% endcall %}
  {% endfor %}
</div>
```

### Current Template Structure Reference

From `projects.njk` (current state):
```nunjucks
---
layout: layouts/base.njk
title: Projects
description: Portfolio of software engineering projects and case studies
permalink: /projects/
---

<h1 class="text-4xl md:text-5xl font-black mb-8">Projects</h1>

{# Content coming in Epic 3 #}
<p class="text-lg">Coming soon...</p>
```

### Testing Strategy

**Test file:** Create `tests/e2e/projects.spec.ts` or add to existing test file

**Key test scenarios:**

```typescript
test.describe('Story 3.1: Projects Collection and Listing Page', () => {
  test('[P0] projects page accessible at /projects/', async ({ page }) => {
    await page.goto('/projects/');
    await expect(page).toHaveURL('/projects/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('[P0] all projects displayed with title and description', async ({ page }) => {
    await page.goto('/projects/');

    // Should have multiple project cards
    const cards = page.locator('[class*="border-4"]');
    await expect(cards).toHaveCount(9); // 9 projects

    // First card should have title and description
    const firstCard = cards.first();
    await expect(firstCard.locator('h2')).toBeVisible();
    await expect(firstCard.locator('p')).toBeVisible();
  });

  test('[P0] clicking project card navigates to detail page', async ({ page }) => {
    await page.goto('/projects/');

    const projectLink = page.locator('a[href*="/projects/"]').first();
    await projectLink.click();

    await expect(page).toHaveURL(/\/projects\/[\w-]+\//);
  });

  test('[P1] technology tags displayed on project cards', async ({ page }) => {
    await page.goto('/projects/');

    // Should have tech tags
    const tags = page.locator('[class*="bg-"]').filter({ hasText: /Docker|OAuth|Traefik/i });
    await expect(tags.first()).toBeVisible();
  });

  test('[P1] project cards are keyboard accessible', async ({ page }) => {
    await page.goto('/projects/');

    const projectLink = page.locator('a[href*="/projects/"]').first();
    await projectLink.focus();
    await expect(projectLink).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/projects\/[\w-]+\//);
  });

  test('[P2] Neubrutalist styling on project cards', async ({ page }) => {
    await page.goto('/projects/');

    const card = page.locator('[class*="border-4"]').first();

    // Should have 4px black border
    const borderWidth = await card.evaluate(el =>
      window.getComputedStyle(el).borderWidth
    );
    expect(borderWidth).toBe('4px');

    // Should have box shadow
    const style = await card.getAttribute('style');
    expect(style).toContain('6px 6px 0');
  });

  test('[P2] responsive layout - cards stack on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/projects/');

    const cards = page.locator('[class*="border-4"]');
    const firstCard = cards.first();
    const secondCard = cards.nth(1);

    // Get bounding boxes
    const firstBox = await firstCard.boundingBox();
    const secondBox = await secondCard.boundingBox();

    // On mobile, cards should stack (second card below first)
    expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height - 10);
  });
});
```

### Project Structure Notes

**Files to modify:**
- `projects.njk` (update from placeholder to full listing)

**Files unchanged:**
- `eleventy.config.js` (collection already exists)
- `_includes/components/card.njk` (reuse existing macro)
- `_includes/components/tag.njk` (reuse existing macro)

**Files to create:**
- `tests/e2e/projects.spec.ts` (new test file for Projects epic)

### Previous Story Intelligence

**From Story 2.7 (Related Projects Links):**
- Projects collection working correctly
- 9 projects exist with proper frontmatter
- `findProjectsByIds` filter already created for project lookups
- Project cards link to `/projects/{project-id}/` URLs

**From Story 2.1 (Blog Collection and Listing):**
- Established pattern for listing pages using card macro
- Grid layout with responsive breakpoints
- Tag component for category/tech badges
- Reverse chronological not needed for projects (no dates)

**Key learnings for this story:**
- Follow blog.njk pattern for consistency
- Use existing card and tag macros
- Grid layout with md:grid-cols-2 for responsiveness
- line-clamp-2 for description truncation
- `| take(4)` filter to limit displayed tags

### Git Intelligence Summary

**Recent commit pattern:** `Add {feature} with ATDD tests (Story {x.y})`

**Expected commit for this story:** `Add projects listing page with ATDD tests (Story 3.1)`

### Edge Cases to Handle

1. **No projects exist** - Show "No projects yet" message (defensive, shouldn't happen)
2. **Project missing description** - Display title only, skip description
3. **No technologies array** - Skip tech tags section
4. **Very long title** - Truncate or allow to wrap (use responsive text size)
5. **Many technologies** - Show first 4, then "+X more" indicator

### Mobile Responsive Considerations

- On mobile (< md breakpoint): Single column, full-width cards
- On tablet/desktop (md+): Two-column grid
- Card content should remain readable at all sizes
- Technology tags may need to wrap on smaller cards

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-3.1] - Acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend-Architecture] - Layout patterns
- [Source: _bmad-output/planning-artifacts/architecture.md#URL-Structure] - Clean URLs
- [Source: _bmad-output/planning-artifacts/prd.md#FR17] - Project listing requirement
- [Source: eleventy.config.js:105-107] - Projects collection
- [Source: blog.njk] - Blog listing pattern to follow
- [Source: _includes/components/card.njk] - Card macro
- [Source: _includes/components/tag.njk] - Tag macro
- [Source: _content/projects/authentication-gateway.md] - Frontmatter schema example
- [Source: _bmad-output/implementation-artifacts/2-1-*.md] - Blog listing story patterns

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Test selector fixes required for ATDD tests with selector bugs

### Completion Notes List

- Verified projects collection exists in eleventy.config.js (lines 105-107)
- Verified 9 project files in _content/projects/
- Updated projects.njk with full listing implementation:
  - Card macro with 6px shadow, 4px border (Neubrutalist spec)
  - Project type badge (WORK/PERSONAL) with neutral background
  - Technology tags limited to 4 with "+X more" indicator
  - Title and VIEW PROJECT links to detail pages
  - Focus states with 4px black outline for accessibility
- Responsive grid: single column mobile, two columns tablet/desktop
- Fixed ATDD test selectors that had bugs (nav element conflicts, strict mode issues)
- All 27 story tests pass across all browsers (chromium, firefox, webkit, mobile)
- Full regression suite passes (1166 tests)

### Senior Developer Review (AI)

**Reviewer:** Amelia (Dev Agent) - Claude Opus 4.5
**Date:** 2026-01-31
**Outcome:** APPROVED (all issues fixed)

**Issues Found & Fixed:**

| Severity | Issue | Resolution |
|----------|-------|------------|
| CRITICAL | Task 4.4 "Make entire card clickable" marked [x] but not implemented | Fixed: Added CSS stretched link pattern with `after:absolute after:inset-0` on title link |
| MEDIUM | Missing empty state handling | Fixed: Added `{% if collections.projects.length == 0 %}` check |
| MEDIUM | Missing null guard for technologies array | Fixed: Added `{% if project.data.technologies and project.data.technologies.length > 0 %}` |
| MEDIUM | Missing aria-label for screen reader accessibility | Fixed: Added `aria-label="View {{ project.data.title }} project details"` |
| LOW | Test file documented as "modified" but was new | Fixed: Documentation corrected |
| LOW | Missing null guard for description | Fixed: Added `{% if project.data.description %}` |
| LOW | Outdated "RED PHASE" test comment | Fixed: Removed misleading TDD phase comments |

**Test Verification:** 135/135 tests pass across all browsers (chromium, firefox, webkit, mobile-chrome, mobile-safari)

### File List

- `projects.njk` (modified) - Full projects listing with stretched card links, empty state, null guards, accessibility
- `tests/e2e/projects.spec.ts` (created) - ATDD tests updated for aria-label accessibility pattern

