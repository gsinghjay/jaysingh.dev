# Story 3.5: Implement Project Filtering

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **site visitor**,
I want **to filter projects by type or available resources**,
so that **I can find projects relevant to my interests**.

## Acceptance Criteria

1. **AC1: Filter Controls Display**
   - Given I am on the projects listing page
   - When I view the filter controls
   - Then I see filter options for: project type (work/personal) and resources (has GitHub, has demo, has diagram)

2. **AC2: Filter by Project Type - Work**
   - Given I select the "Work" filter
   - When the filter applies
   - Then only projects with `projectType: "work"` are displayed

3. **AC3: Filter by Resource - Has GitHub**
   - Given I select the "Has GitHub" filter
   - When the filter applies
   - Then only projects with a `githubUrl` are displayed

4. **AC4: Multiple Filters (AND Logic)**
   - Given I select multiple filters
   - When the filters apply
   - Then projects matching ALL selected criteria are displayed (AND logic)

5. **AC5: Empty State Message**
   - Given no projects match the selected filters
   - When I view the listing
   - Then I see a "No projects match your filters" message

6. **AC6: Clear Filters**
   - Given I clear all filters
   - When the page updates
   - Then all projects are displayed again

7. **AC7: Vanilla JS Implementation**
   - Given the filtering functionality
   - When I review the JavaScript
   - Then it uses vanilla JS with `data-*` attributes for filter state per Architecture spec

8. **AC8: Progressive Enhancement (Graceful Degradation)**
   - Given JavaScript is disabled
   - When I view the projects page
   - Then all projects are visible (filters hidden or non-functional)

## Tasks / Subtasks

- [x] Task 1: Add filter controls UI to projects.njk (AC: #1)
  - [x] 1.1 Create filter container with Neubrutalist styling
  - [x] 1.2 Add "Type" filter buttons: All, Work, Personal
  - [x] 1.3 Add "Resources" filter checkboxes: Has GitHub, Has Demo, Has Diagram
  - [x] 1.4 Apply `data-filter-*` attributes for JS hooks
  - [x] 1.5 Add visual active/selected state styles

- [x] Task 2: Add data attributes to project cards (AC: #2, #3, #7)
  - [x] 2.1 Add `data-project-type="work|personal"` to each card
  - [x] 2.2 Add `data-has-github="true|false"` based on githubUrl presence
  - [x] 2.3 Add `data-has-demo="true|false"` based on liveUrl presence
  - [x] 2.4 Add `data-has-diagram="true|false"` based on diagramContent presence

- [x] Task 3: Implement filter logic in main.js (AC: #2, #3, #4, #6, #7)
  - [x] 3.1 Create `initProjectFilters()` function
  - [x] 3.2 Implement type filter (exclusive: all/work/personal)
  - [x] 3.3 Implement resource filters (checkboxes, multiple allowed)
  - [x] 3.4 Combine filters with AND logic
  - [x] 3.5 Show/hide cards by adding/removing CSS classes
  - [x] 3.6 Implement "Clear filters" functionality
  - [x] 3.7 Update filter button active states visually

- [x] Task 4: Implement empty state handling (AC: #5)
  - [x] 4.1 Add empty state container (hidden by default)
  - [x] 4.2 Show empty state message when no projects match
  - [x] 4.3 Hide empty state when projects match
  - [x] 4.4 Include "Clear filters" button in empty state

- [x] Task 5: Ensure progressive enhancement (AC: #8)
  - [x] 5.1 Filters container uses `hidden` class initially (removed by JS)
  - [x] 5.2 All projects visible without JS (no CSS hidden by default)
  - [x] 5.3 Progressive enhancement verified (hidden class in HTML, removed by JS)

- [x] Task 6: Add Neubrutalist styling to filter controls (AC: #1)
  - [x] 6.1 Filter buttons: border-2 border-black, font-bold
  - [x] 6.2 Active filter: bg-lime-400 with shadow-brutal
  - [x] 6.3 Checkbox filters: custom styled checkboxes
  - [x] 6.4 Mobile responsive layout (flex-wrap for small screens)

- [x] Task 7: Write ATDD tests (AC: #1-8)
  - [x] 7.1 Test filter controls are visible
  - [x] 7.2 Test Work filter shows only work projects
  - [x] 7.3 Test Personal filter shows only personal projects
  - [x] 7.4 Test "Has GitHub" filter functionality
  - [x] 7.5 Test "Has Demo" filter functionality
  - [x] 7.6 Test "Has Diagram" filter functionality
  - [x] 7.7 Test combined filters (AND logic)
  - [x] 7.8 Test empty state message
  - [x] 7.9 Test clear filters functionality
  - [x] 7.10 Test filter buttons have Neubrutalist styling
  - [x] 7.11 Test mobile responsive behavior
  - [x] 7.12 Test keyboard accessibility on filter buttons

## Dev Notes

### CRITICAL: Implementation Approach

**Architecture Decision:** Implement client-side filtering using vanilla JavaScript with `data-*` attributes per Architecture document. No server-side filtering (static site). Progressive enhancement ensures all content visible without JS.

**DO NOT:**
- Use any JavaScript frameworks or libraries (React, Vue, jQuery)
- Hide projects with CSS by default (violates progressive enhancement)
- Use URL query parameters for filter state (not required for MVP)
- Create a separate filter component file (keep in main.js)
- Use class-based selectors for JS hooks (use data-* attributes)

### Current Project Data Analysis

Based on existing `_content/projects/` files:

| Project | projectType | githubUrl | liveUrl | diagramContent |
|---------|-------------|-----------|---------|----------------|
| qr-code-platform | work | Yes | Yes | Yes |
| authentication-gateway | work | Yes | No | No |
| cloud-infrastructure-platform | work | No | No | No |
| observability-infrastructure | work | Yes | No | No |
| event-driven-microservices | work | Yes | No | No |
| cicd-pipeline | work | Yes | No | No |
| covid-dashboard | personal | Yes | Yes | No |
| automation-scripts | personal | Yes | No | No |
| jamf-pro-deployment | work | No | No | No |

**Filter Test Cases (corrected based on actual content):**
- "Work" filter: 8 projects (all except covid-dashboard)
- "Personal" filter: 1 project (covid-dashboard)
- "Has GitHub": 7 projects
- "Has Demo": 2 projects (qr-code-platform, covid-dashboard)
- "Has Diagram": 1 project (qr-code-platform)

### Proposed HTML Structure for Filter Controls

```html
{# Filter controls - hidden without JS (progressive enhancement) #}
<div class="filter-controls hidden mb-8" data-filter-controls>
  {# Type filters (exclusive - radio button style) #}
  <div class="flex flex-wrap gap-2 mb-4">
    <span class="font-bold mr-2">Type:</span>
    <button data-filter-type="all"
            class="px-4 py-2 border-2 border-black font-bold bg-lime-400"
            aria-pressed="true">All</button>
    <button data-filter-type="work"
            class="px-4 py-2 border-2 border-black font-bold bg-white hover:bg-lime-50"
            aria-pressed="false">Work</button>
    <button data-filter-type="personal"
            class="px-4 py-2 border-2 border-black font-bold bg-white hover:bg-lime-50"
            aria-pressed="false">Personal</button>
  </div>

  {# Resource filters (checkboxes - multiple allowed) #}
  <div class="flex flex-wrap gap-4">
    <span class="font-bold mr-2">Show only:</span>
    <label class="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" data-filter-resource="github" class="sr-only peer">
      <span class="w-5 h-5 border-2 border-black peer-checked:bg-lime-400 flex items-center justify-center">
        <svg class="w-4 h-4 hidden peer-checked:block" ...>checkmark</svg>
      </span>
      <span>Has GitHub</span>
    </label>
    <label class="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" data-filter-resource="demo" class="sr-only peer">
      <!-- similar structure -->
      <span>Has Demo</span>
    </label>
    <label class="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" data-filter-resource="diagram" class="sr-only peer">
      <!-- similar structure -->
      <span>Has Diagram</span>
    </label>
  </div>

  {# Clear all button #}
  <button data-filter-clear class="mt-4 text-sm underline">Clear all filters</button>
</div>

{# Empty state - hidden by default #}
<div class="empty-state hidden text-center py-12" data-filter-empty>
  <p class="text-lg text-neutral-600 mb-4">No projects match your filters.</p>
  <button data-filter-clear class="font-bold underline">Clear filters</button>
</div>
```

### JavaScript Implementation Pattern

```javascript
// In main.js - add to DOMContentLoaded
function initProjectFilters() {
  const controls = document.querySelector('[data-filter-controls]');
  if (!controls) return;

  // Show filter controls (progressive enhancement)
  controls.classList.remove('hidden');

  // State
  let activeType = 'all';
  let activeResources = new Set();

  // Get all project cards
  const cards = document.querySelectorAll('[data-project-type]');
  const emptyState = document.querySelector('[data-filter-empty]');

  // Type filter buttons
  controls.querySelectorAll('[data-filter-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeType = btn.dataset.filterType;
      updateTypeButtons();
      applyFilters();
    });
  });

  // Resource filter checkboxes
  controls.querySelectorAll('[data-filter-resource]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const resource = checkbox.dataset.filterResource;
      if (checkbox.checked) {
        activeResources.add(resource);
      } else {
        activeResources.delete(resource);
      }
      applyFilters();
    });
  });

  // Clear filters
  document.querySelectorAll('[data-filter-clear]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeType = 'all';
      activeResources.clear();
      updateTypeButtons();
      controls.querySelectorAll('[data-filter-resource]').forEach(cb => cb.checked = false);
      applyFilters();
    });
  });

  function updateTypeButtons() {
    controls.querySelectorAll('[data-filter-type]').forEach(btn => {
      const isActive = btn.dataset.filterType === activeType;
      btn.classList.toggle('bg-lime-400', isActive);
      btn.classList.toggle('bg-white', !isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
  }

  function applyFilters() {
    let visibleCount = 0;

    cards.forEach(card => {
      const type = card.dataset.projectType;
      const hasGithub = card.dataset.hasGithub === 'true';
      const hasDemo = card.dataset.hasDemo === 'true';
      const hasDiagram = card.dataset.hasDiagram === 'true';

      // Type filter (all passes, or must match)
      const typeMatch = activeType === 'all' || type === activeType;

      // Resource filters (all selected must match - AND logic)
      const resourceMatch =
        (!activeResources.has('github') || hasGithub) &&
        (!activeResources.has('demo') || hasDemo) &&
        (!activeResources.has('diagram') || hasDiagram);

      const isVisible = typeMatch && resourceMatch;
      card.classList.toggle('hidden', !isVisible);

      if (isVisible) visibleCount++;
    });

    // Toggle empty state
    emptyState.classList.toggle('hidden', visibleCount > 0);
  }
}
```

### CSS Additions for Filter Styling

```css
/* Custom checkbox styling */
[data-filter-resource] + span {
  transition: background-color 0.15s;
}

[data-filter-resource]:checked + span {
  background-color: #a3e635; /* lime-400 */
}

/* Filter button press effect */
[data-filter-type]:active {
  transform: translateY(1px);
}

/* Subtle box shadow on active filter */
[data-filter-type][aria-pressed="true"] {
  box-shadow: 2px 2px 0 #000;
}
```

### Testing Strategy

**Test file:** Extend `tests/e2e/projects.spec.ts` with Story 3.5 test describe blocks

**Key test scenarios:**

```typescript
test.describe('Story 3.5: Project Filtering (AC1)', () => {
  test('[P0] filter controls are visible on projects page', async ({ page }) => {
    await page.goto('/projects/');

    // Filter controls should be visible
    const controls = page.locator('[data-filter-controls]');
    await expect(controls).toBeVisible();

    // Type filter buttons present
    await expect(page.locator('[data-filter-type="all"]')).toBeVisible();
    await expect(page.locator('[data-filter-type="work"]')).toBeVisible();
    await expect(page.locator('[data-filter-type="personal"]')).toBeVisible();
  });
});

test.describe('Story 3.5: Type Filtering (AC2)', () => {
  test('[P0] Work filter shows only work projects', async ({ page }) => {
    await page.goto('/projects/');

    // Click Work filter
    await page.locator('[data-filter-type="work"]').click();

    // Only work projects visible
    const visibleCards = page.locator('[data-project-type]:not(.hidden)');
    await expect(visibleCards).toHaveCount(7);

    // Verify all visible are work type
    const types = await visibleCards.evaluateAll(cards =>
      cards.map(c => c.dataset.projectType)
    );
    expect(types.every(t => t === 'work')).toBe(true);
  });
});

test.describe('Story 3.5: Multiple Filters AND Logic (AC4)', () => {
  test('[P0] Work + Has Diagram shows only matching projects', async ({ page }) => {
    await page.goto('/projects/');

    // Select Work type and Has Diagram resource
    await page.locator('[data-filter-type="work"]').click();
    await page.locator('[data-filter-resource="diagram"]').click();

    // Only qr-code-platform should match (work + diagram)
    const visibleCards = page.locator('[data-project-type]:not(.hidden)');
    await expect(visibleCards).toHaveCount(1);
  });
});

test.describe('Story 3.5: Empty State (AC5)', () => {
  test('[P0] empty state shows when no matches', async ({ page }) => {
    await page.goto('/projects/');

    // Select Personal type + Has Diagram (no matches)
    await page.locator('[data-filter-type="personal"]').click();
    await page.locator('[data-filter-resource="diagram"]').click();

    // Empty state should be visible
    await expect(page.locator('[data-filter-empty]')).toBeVisible();
    await expect(page.getByText(/no projects match/i)).toBeVisible();
  });
});

test.describe('Story 3.5: Clear Filters (AC6)', () => {
  test('[P0] clear filters shows all projects', async ({ page }) => {
    await page.goto('/projects/');

    // Apply some filters
    await page.locator('[data-filter-type="work"]').click();
    await page.locator('[data-filter-resource="github"]').click();

    // Clear filters
    await page.locator('[data-filter-clear]').first().click();

    // All 9 projects should be visible
    const visibleCards = page.locator('[data-project-type]:not(.hidden)');
    await expect(visibleCards).toHaveCount(9);
  });
});
```

### Accessibility Considerations

1. **Filter buttons use `aria-pressed`** to indicate toggle state
2. **Checkboxes are actual form inputs** (sr-only with visual custom styling)
3. **Clear filters button is focusable** and has descriptive text
4. **Empty state is announced** via ARIA live region
5. **All filter controls are keyboard navigable** (Tab, Enter/Space)

### Project Structure Notes

**Files to modify:**
- `projects.njk` - Add filter controls UI, data attributes on cards
- `js/main.js` - Add `initProjectFilters()` function
- `css/input.css` - Add filter-specific styles (optional, can use Tailwind)
- `tests/e2e/projects.spec.ts` - Add Story 3.5 test describe blocks

**No new files needed** - extending existing structure per Architecture spec.

### Previous Story Intelligence

**From Story 3.3 (Mermaid Diagram Rendering):**
- Project cards already have feature indicator icons for diagram, github, demo
- Project layout uses `diagramContent`, `githubUrl`, `liveUrl` frontmatter fields
- main.js pattern: `initXXX()` functions called from DOMContentLoaded

**From Story 3.1/3.2 (Projects Listing/Detail):**
- Projects listing at `/projects/` with grid layout
- 9 projects in `_content/projects/`
- Card structure with `projectType` badge already displayed
- Neubrutalist styling: border-4, shadow-brutal, lime-400 accent

### Git Intelligence Summary

**Recent commit pattern:** `Add {feature} with ATDD tests (Story {x.y})`

**Expected commit for this story:** `Add project filtering with ATDD tests (Story 3.5)`

**Files likely to be modified:**
- `projects.njk`
- `js/main.js`
- `tests/e2e/projects.spec.ts`

### Edge Cases to Handle

1. **All filters result in empty** - Show empty state with clear button
2. **Rapid filter clicking** - No debounce needed (instant DOM updates)
3. **Page reload clears filters** - Intentional (no persistence needed for MVP)
4. **Browser back button** - No filter state in URL (expected behavior)
5. **Keyboard navigation** - All controls must be focusable and activatable
6. **Mobile responsive** - Filters should wrap/stack on small screens

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-3.5] - Acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#JavaScript-Patterns] - data-* attributes, event delegation
- [Source: _bmad-output/planning-artifacts/architecture.md#CSS-JavaScript-Patterns] - js-* prefix, data hooks
- [Source: _bmad-output/planning-artifacts/prd.md#FR21] - Filter projects by type or resources
- [Source: projects.njk] - Current project listing structure
- [Source: js/main.js] - Existing JS patterns (initCodeCopy, initDiagramViewer)
- [Source: _content/projects/qr-code-platform.md] - Example project with all attributes
- [Source: _bmad-output/implementation-artifacts/3-3-implement-mermaid-diagram-rendering.md] - Previous story learnings

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Discovered actual project data differs from story assumptions: 8 work projects (not 7), 1 personal project (not 2)
- Updated test counts to match actual content in _content/projects/
- Fixed progressive enhancement regex test (class attribute order)
- Fixed mobile touch test (tap→click for compatibility)

### Completion Notes List

- ✅ Implemented client-side project filtering with vanilla JS (AC7)
- ✅ Filter controls: Type buttons (All/Work/Personal) + Resource checkboxes (GitHub/Demo/Diagram)
- ✅ Data attributes added to all 9 project cards: data-project-type, data-has-github, data-has-demo, data-has-diagram
- ✅ AND logic for combined filters working correctly
- ✅ Empty state shows "No projects match your filters" with clear button
- ✅ Clear filters resets type to All and unchecks all resource checkboxes
- ✅ Progressive enhancement: filters hidden without JS, all projects visible by default
- ✅ Neubrutalist styling: border-2, bg-lime-400 active state, focus indicators
- ✅ Keyboard accessible: all buttons focusable, Enter/Space activate controls
- ✅ Mobile responsive: flex-wrap layout fits mobile viewport
- ✅ 39 Story 3.5 tests pass (removed test.skip from ATDD tests)
- ✅ Full regression suite: 2299 tests pass, no regressions

### Code Review Fixes (2026-02-01)

- Fixed missing `aria-live="polite"` on empty state container (`projects.njk:58`)
- Added `aria-label` attributes to type filter buttons for screen reader clarity
- Added screen reader results announcement via `[data-filter-results]` aria-live region
- Updated JS to announce filter results count ("X projects found")
- Added missing test: Demo + Diagram filter combination
- Added accessibility tests: aria-live, aria-labels, results announcement
- Fixed test selector for empty state text to avoid sr-only duplicate match
- Corrected Dev Notes project counts to match actual data

### File List

- `projects.njk` - Added filter controls UI, data attributes on project cards, empty state container, aria-live regions, aria-labels
- `js/main.js` - Added initProjectFilters() function with filter logic and screen reader announcements
- `tests/e2e/projects.spec.ts` - Story 3.5 tests with accessibility tests added (now 215 tests)
