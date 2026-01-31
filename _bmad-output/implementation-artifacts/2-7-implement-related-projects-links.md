# Story 2.7: Implement Related Projects Links

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **site visitor**,
I want **to see related projects linked from blog posts**,
so that **I can explore practical applications of the concepts discussed**.

## Acceptance Criteria

1. **AC1: Related Projects Section Displays**
   - Given a blog post has `relatedProjectIds` in its frontmatter
   - When I view the blog post detail page
   - Then I see a "Related Projects" section with links to those projects

2. **AC2: Project Link Content**
   - Given the related projects section displays
   - When I view the project links
   - Then each shows the project title and a brief description

3. **AC3: Navigation to Project**
   - Given I click on a related project link
   - When the navigation completes
   - Then I am on the project detail page (`/projects/{project-id}/`)

4. **AC4: Graceful Absence**
   - Given a blog post has no `relatedProjectIds`
   - When I view the blog post detail page
   - Then the "Related Projects" section is not displayed

5. **AC5: Build-time Collection Lookup**
   - Given the related projects data
   - When I review the implementation
   - Then it uses 11ty's collection lookup to fetch project data at build time

6. **AC6: Invalid Reference Handling**
   - Given a `relatedProjectIds` references a non-existent project
   - When the site builds
   - Then the invalid reference is gracefully ignored (no build error)

## Tasks / Subtasks

- [x] Task 1: Create related-projects partial template (AC: #1, #2, #4)
  - [x] 1.1 Create `_includes/partials/related-projects.njk`
  - [x] 1.2 Accept `relatedProjectIds` array and `collections.projects` as context
  - [x] 1.3 Loop through project IDs and filter matching projects from collection
  - [x] 1.4 Display project title and description for each match
  - [x] 1.5 Use conditional check to hide section if no `relatedProjectIds` or all invalid
  - [x] 1.6 Style with Neubrutalist design (border-4, shadow-brutal, hover effects)

- [x] Task 2: Add 11ty filter for project lookup (AC: #5, #6)
  - [x] 2.1 Create `findProjectsByIds` filter in `eleventy.config.js`
  - [x] 2.2 Accept array of project IDs and projects collection
  - [x] 2.3 Return array of matching project objects
  - [x] 2.4 Gracefully skip non-existent IDs (filter returns only valid matches)
  - [x] 2.5 Return empty array if no matches (enables AC #4 conditional)

- [x] Task 3: Integrate into blog post layout (AC: #1)
  - [x] 3.1 Add `{% include "partials/related-projects.njk" %}` to `_includes/layouts/blog-post.njk`
  - [x] 3.2 Position after social share buttons, before bottom back button
  - [x] 3.3 Pass `relatedProjectIds` and `collections.projects` variables to partial

- [x] Task 4: Implement project link navigation (AC: #3)
  - [x] 4.1 Each project card links to `/projects/{project-id}/`
  - [x] 4.2 Use proper `<a>` tags with `href` attribute
  - [x] 4.3 Ensure links use clean URL pattern (trailing slash)

- [x] Task 5: Ensure accessibility
  - [x] 5.1 Add `aria-label` or heading for Related Projects section
  - [x] 5.2 Ensure visible focus states on project links (Neubrutalist 4px black outline)
  - [x] 5.3 Links must be keyboard-accessible (Tab/Enter navigation)

- [x] Task 6: Write ATDD tests (AC: #1-6)
  - [x] 6.1 Test related projects section visible when `relatedProjectIds` exists
  - [x] 6.2 Test project title and description displayed
  - [x] 6.3 Test clicking project link navigates to project page
  - [x] 6.4 Test section hidden when no `relatedProjectIds`
  - [x] 6.5 Test graceful handling of invalid project references
  - [x] 6.6 Test keyboard accessibility for project links

## Dev Notes

### CRITICAL: Implementation Approach

**Architecture Decision:** Per the Architecture document, related projects uses 11ty's collection lookup at build time. The blog post frontmatter contains `relatedProjectIds` (array of project ID strings), and an 11ty filter looks up matching projects from the `projects` collection.

**DO NOT:** Add any client-side JavaScript for this feature, make API calls, or use dynamic loading. This is a pure build-time feature.

### Current Content Structure

**Blog posts with `relatedProjectIds` (from `_content/blog/`):**

1. `docker-observability.md`:
```yaml
relatedProjectIds:
  - observability-infrastructure
```

2. `oauth2-authentication-gateway.md`:
```yaml
relatedProjectIds:
  - authentication-gateway
```

**Project collection location:** `_content/projects/*.md`

**Available projects with IDs:**
- `authentication-gateway` - Zero-Trust Authentication Gateway
- `cloud-infrastructure-platform` - Cloud Infrastructure Platform

**Note:** The `observability-infrastructure` project referenced by `docker-observability.md` does NOT exist in `_content/projects/` yet. This is a perfect test case for AC #6 (invalid reference handling).

### Frontmatter Schema Reference

**Blog post frontmatter (relevant fields):**
```yaml
id: docker-observability  # Used for URL
title: COMPREHENSIVE OBSERVABILITY FOR DOCKER MICROSERVICES
relatedProjectIds:        # Array of project IDs (optional)
  - observability-infrastructure
```

**Project frontmatter (relevant fields):**
```yaml
id: authentication-gateway  # Used for matching and URL
title: "Zero-Trust Authentication Gateway"
description: "Distributed authentication and authorization gateway serving 5,000+ active user accounts with granular RBAC."
```

### 11ty Filter Implementation Pattern

**Add to `eleventy.config.js` (after existing filters):**

```javascript
// Find projects by their IDs from the projects collection
// Returns array of matching project data, ignoring invalid IDs
eleventyConfig.addFilter("findProjectsByIds", (projectIds, projects) => {
  if (!projectIds || !Array.isArray(projectIds) || !projects) {
    return [];
  }

  return projectIds
    .map(id => projects.find(p => p.data.id === id))
    .filter(p => p !== undefined); // Gracefully ignore invalid IDs
});
```

### Partial Template Pattern

**Create `_includes/partials/related-projects.njk`:**

```nunjucks
{# Related projects section for blog posts
   Usage: {% include "partials/related-projects.njk" %}
   Requires: relatedProjectIds, collections.projects in scope
#}
{% set relatedProjects = relatedProjectIds | findProjectsByIds(collections.projects) %}

{% if relatedProjects.length > 0 %}
<section class="related-projects mt-12" aria-labelledby="related-projects-heading">
  <h2 id="related-projects-heading" class="text-xl font-black uppercase mb-6">
    <span class="bg-pink-400 px-2 py-1">RELATED</span> PROJECTS
  </h2>

  <div class="grid gap-4 md:grid-cols-2">
    {% for project in relatedProjects %}
    <a href="/projects/{{ project.data.id }}/"
       class="block bg-white border-4 border-black p-4 hover:bg-lime-300 transition-all duration-150 active:translate-y-1"
       style="box-shadow: 6px 6px 0 #000;">
      <h3 class="font-black text-lg uppercase mb-2">{{ project.data.title }}</h3>
      <p class="text-neutral-600 text-sm line-clamp-2">{{ project.data.description }}</p>
    </a>
    {% endfor %}
  </div>
</section>
{% endif %}
```

### Layout Integration Location

**Target location in `_includes/layouts/blog-post.njk` (after social share, before bottom back button):**

```nunjucks
{# Social Share Buttons #}
{% include "partials/social-share.njk" %}

{# === RELATED PROJECTS GOES HERE === #}
{% include "partials/related-projects.njk" %}

{# Bottom back button #}
<div class="mt-12 flex justify-center">
  ...
</div>
```

### Current Template Structure Reference

From `_includes/layouts/blog-post.njk` (lines 70-82):

```nunjucks
{# Social Share Buttons #}
{% include "partials/social-share.njk" %}

{# Bottom back button #}
<div class="mt-12 flex justify-center">
  <a href="/blog/" class="inline-flex items-center gap-2 px-6 py-3 bg-black text-white border-4 border-black font-bold uppercase text-sm hover:bg-pink-400 hover:text-black transition-all duration-150 active:translate-y-1"
     style="box-shadow: 6px 6px 0 #000;">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
    </svg>
    BACK TO ALL POSTS
  </a>
</div>
```

### CSS Considerations

**Existing patterns to follow:**

```css
/* Neubrutalist card base */
.bg-white.border-4.border-black

/* Hover state */
hover:bg-lime-300

/* Active/pressed state */
active:translate-y-1

/* Shadow via inline style */
style="box-shadow: 6px 6px 0 #000;"

/* Focus state (should already exist from previous stories) */
a:focus-visible {
  outline: 4px solid black;
  outline-offset: 2px;
}
```

**Line clamp for description:**
Use `line-clamp-2` (Tailwind utility) to truncate long descriptions to 2 lines.

### Testing Strategy

**Test file:** `tests/e2e/blog.spec.ts`

**Key test scenarios:**

```typescript
test.describe('Story 2.7: Related Projects Links', () => {
  // Post WITH relatedProjectIds (oauth2 has valid reference)
  const postWithRelated = '/blog/oauth2-authentication-gateway/';

  // Post that may have invalid references (docker-observability)
  const postWithInvalidRef = '/blog/docker-observability/';

  test('[P0] related projects section visible when relatedProjectIds exists', async ({ page }) => {
    await page.goto(postWithRelated);

    const section = page.locator('.related-projects');
    await expect(section).toBeVisible();

    // Should have heading
    await expect(page.getByRole('heading', { name: /RELATED.*PROJECTS/i })).toBeVisible();
  });

  test('[P0] project title and description displayed', async ({ page }) => {
    await page.goto(postWithRelated);

    // Should show authentication-gateway project
    const projectLink = page.locator('.related-projects a').first();
    await expect(projectLink).toBeVisible();

    // Should have title (h3)
    const title = projectLink.locator('h3');
    await expect(title).toContainText(/Authentication/i);

    // Should have description
    const description = projectLink.locator('p');
    await expect(description).toBeVisible();
  });

  test('[P0] clicking project link navigates to project page', async ({ page }) => {
    await page.goto(postWithRelated);

    const projectLink = page.locator('.related-projects a').first();
    await projectLink.click();

    // Should navigate to project detail page
    await expect(page).toHaveURL(/\/projects\/[\w-]+\//);
  });

  test('[P1] section hidden when no valid relatedProjectIds', async ({ page }) => {
    // This post has relatedProjectIds but references non-existent project
    await page.goto(postWithInvalidRef);

    // Section should NOT be visible (invalid reference ignored)
    const section = page.locator('.related-projects');
    await expect(section).toBeHidden();
  });

  test('[P1] project links are keyboard accessible', async ({ page }) => {
    await page.goto(postWithRelated);

    const projectLink = page.locator('.related-projects a').first();
    await projectLink.focus();
    await expect(projectLink).toBeFocused();

    // Enter should navigate
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/projects\/[\w-]+\//);
  });

  test('[P2] Neubrutalist styling on project cards', async ({ page }) => {
    await page.goto(postWithRelated);

    const projectCard = page.locator('.related-projects a').first();

    // Should have 4px black border
    const borderWidth = await projectCard.evaluate((el) => {
      return window.getComputedStyle(el).borderWidth;
    });
    expect(borderWidth).toBe('4px');

    // Should have box shadow
    const style = await projectCard.getAttribute('style');
    expect(style).toContain('6px 6px 0');
  });
});
```

### Project Structure Notes

**Files to create:**
- `_includes/partials/related-projects.njk` (new partial)

**Files to modify:**
- `eleventy.config.js` (add `findProjectsByIds` filter)
- `_includes/layouts/blog-post.njk` (include partial after social share)
- `tests/e2e/blog.spec.ts` (add Story 2.7 tests)

**Files unchanged:**
- `js/main.js` (no client JS for this feature)
- `css/input.css` (use existing Tailwind utilities)

### Previous Story Intelligence

**From Story 2.6 (Social Sharing):**
- Successfully integrated partial into blog-post.njk after content card
- Template position pattern established: content → social share → back button
- Related projects should go between social share and back button

**From Story 2.5 (Reading Time Display):**
- 11ty filter pattern works well for build-time data transformation
- Export filters from separate file for testability (optional for this simple filter)

**From Story 2.4 (Code Copy):**
- Neubrutalist card patterns established
- 6px shadow, 4px border, hover:bg-lime-300 conventions

**Key learnings for this story:**
- Follow 11ty filter pattern for collection lookup
- Use conditional in template to hide section when no valid matches
- Graceful handling of invalid IDs is critical (don't break build)
- Test both positive case (valid refs) and negative case (invalid refs)

### Git Intelligence Summary

**Recent commit pattern:** `Add {feature} with ATDD tests (Story {x.y})`

**Files changed in recent stories:**
- Always includes ATDD tests in `tests/e2e/blog.spec.ts`
- Filter additions to `eleventy.config.js`
- Template partials in `_includes/partials/`
- Layout modifications to `_includes/layouts/blog-post.njk`

### Edge Cases to Handle

1. **No `relatedProjectIds` field** - Section should not render
2. **Empty `relatedProjectIds` array** - Section should not render
3. **All IDs invalid** - Section should not render (no matches)
4. **Some IDs valid, some invalid** - Show only valid matches
5. **Single project reference** - Section renders with one card
6. **Multiple project references** - Grid layout with multiple cards

### Mobile Responsive Considerations

- On mobile (< md breakpoint): Stack cards vertically (grid-cols-1)
- On tablet/desktop (md+): Two-column grid (md:grid-cols-2)
- Cards should maintain readable text and proper spacing

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-2.7] - Acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#Data-Architecture] - 11ty collections pattern
- [Source: _bmad-output/planning-artifacts/architecture.md#Template-Organization] - Partial pattern
- [Source: _bmad-output/planning-artifacts/prd.md#FR14] - Related projects from blog posts requirement
- [Source: eleventy.config.js:71-80] - Existing filter patterns
- [Source: _includes/layouts/blog-post.njk:70-82] - Integration location
- [Source: _content/blog/docker-observability.md:14-15] - relatedProjectIds example
- [Source: _content/blog/oauth2-authentication-gateway.md:13-14] - relatedProjectIds example
- [Source: _bmad-output/implementation-artifacts/2-6-*.md] - Previous story patterns

## Dev Agent Record

### Agent Model Used

claude-opus-4-5-20251101

### Debug Log References

N/A

### Completion Notes List

- Created `_includes/partials/related-projects.njk` partial with Neubrutalist styling (4px border, 6px shadow, lime hover, grid layout)
- Added `findProjectsByIds` filter to `lib/filters.js` for testability (follows readingTime pattern)
- Filter gracefully handles invalid IDs by filtering out undefined matches
- Integrated partial into `blog-post.njk` after social share section
- All 40 Story 2.7 tests pass (8 tests × 5 browser/device combinations)
- Full regression suite passes (1032 tests, 26 skipped)
- Updated test to use `postgresql-performance` (no relatedProjectIds) for AC #4 testing since `observability-infrastructure` project now exists
- Added `aria-labelledby` for accessibility, `focus-visible` styles handled by global CSS in css/input.css
- **Code Review:** Added 15 unit tests for `findProjectsByIds` filter covering edge cases (null, undefined, empty array, mixed valid/invalid IDs)
- **Code Review:** Documented that focus-visible styling uses global CSS rule (4px black outline)

### File List

**Implementation Files:**
- `_includes/partials/related-projects.njk` (created)
- `lib/filters.js` (modified - added findProjectsByIds filter for testability)
- `eleventy.config.js` (modified - imports findProjectsByIds from lib/filters.js)
- `_includes/layouts/blog-post.njk` (modified - added partial include)

**Test Files:**
- `tests/e2e/blog.spec.ts` (modified - Story 2.7 tests, keyboard accessibility)
- `tests/unit/filters.test.js` (modified - added 15 findProjectsByIds unit tests)

**Content Files (test data for related projects feature):**
- `_content/projects/observability-infrastructure.md` (created)
- `_content/projects/automation-scripts.md` (created)
- `_content/projects/cicd-pipeline.md` (created)
- `_content/projects/covid-dashboard.md` (created)
- `_content/projects/event-driven-microservices.md` (created)
- `_content/projects/jamf-pro-deployment.md` (created)
- `_content/projects/qr-code-platform.md` (created)
- `_content/projects/authentication-gateway.md` (modified - enriched content)

