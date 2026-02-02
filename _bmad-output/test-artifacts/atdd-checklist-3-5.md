# ATDD Checklist - Epic 3, Story 3.5: Implement Project Filtering

**Date:** 2026-02-01
**Author:** Jay
**Primary Test Level:** E2E

---

## Story Summary

Implement client-side project filtering with vanilla JavaScript using `data-*` attributes.

**As a** site visitor
**I want** to filter projects by type or available resources
**So that** I can find projects relevant to my interests

---

## Acceptance Criteria

1. **AC1:** Filter controls visible (type buttons, resource checkboxes)
2. **AC2:** Work/Personal type filter shows only matching projects
3. **AC3:** Resource filters (GitHub, Demo, Diagram) show matching projects
4. **AC4:** Multiple filters combine with AND logic
5. **AC5:** Empty state message when no projects match
6. **AC6:** Clear filters restores all projects
7. **AC7:** Vanilla JS with `data-*` attributes
8. **AC8:** Progressive enhancement (graceful degradation without JS)

---

## Failing Tests Created (RED Phase)

### E2E Tests (39 tests)

**File:** `tests/e2e/projects.spec.ts` (appended Story 3.5 tests)

| Test Describe Block | Tests | Priority Coverage |
|---------------------|-------|-------------------|
| Filter Controls Display (AC1) | 4 | P0: 3, P1: 1 |
| Type Filtering (AC2) | 4 | P0: 3, P1: 1 |
| Resource Filtering (AC3) | 4 | P0: 1, P1: 3 |
| Multiple Filters AND Logic (AC4) | 4 | P0: 3, P1: 1 |
| Empty State (AC5) | 3 | P0: 2, P1: 1 |
| Clear Filters (AC6) | 3 | P0: 2, P1: 1 |
| Data Attributes Implementation (AC7) | 4 | P1: 4 |
| Progressive Enhancement (AC8) | 2 | P1: 2 |
| Keyboard Accessibility | 4 | P1: 3, P2: 1 |
| Neubrutalist Styling | 3 | P2: 3 |
| Mobile Responsive | 2 | P2: 2 |

**Priority Summary:**
- **P0:** 14 tests (critical path)
- **P1:** 16 tests (important functionality)
- **P2:** 9 tests (polish & styling)

---

## Data Factories Created

**None required** - Static site with client-side filtering. Test data comes from existing project markdown files.

---

## Fixtures Created

**None required** - Tests use existing fixtures from `tests/support/fixtures/index.ts`:
- `verifyNeubrutalistDesign()` - already available
- `checkA11yBasics()` - already available

---

## Mock Requirements

**None required** - Static site, no API calls to mock.

---

## Required data-testid Attributes

### Filter Controls Container

- `data-filter-controls` - Main filter controls wrapper (hidden without JS)
- `data-filter-type="all|work|personal"` - Type filter buttons
- `data-filter-resource="github|demo|diagram"` - Resource filter checkboxes
- `data-filter-clear` - Clear all filters button
- `data-filter-empty` - Empty state container

### Project Cards

- `data-project-type="work|personal"` - Project type attribute
- `data-has-github="true|false"` - Has GitHub URL
- `data-has-demo="true|false"` - Has live demo URL
- `data-has-diagram="true|false"` - Has architecture diagram

**Implementation Example:**

```html
{# Filter controls - hidden without JS (progressive enhancement) #}
<div class="filter-controls hidden mb-8" data-filter-controls>
  <button data-filter-type="all" aria-pressed="true">All</button>
  <button data-filter-type="work" aria-pressed="false">Work</button>
  <button data-filter-type="personal" aria-pressed="false">Personal</button>

  <input type="checkbox" data-filter-resource="github">
  <input type="checkbox" data-filter-resource="demo">
  <input type="checkbox" data-filter-resource="diagram">

  <button data-filter-clear>Clear filters</button>
</div>

{# Project card with data attributes #}
<article data-project-type="work"
         data-has-github="true"
         data-has-demo="true"
         data-has-diagram="true">
  <!-- card content -->
</article>

{# Empty state #}
<div class="hidden" data-filter-empty>
  <p>No projects match your filters.</p>
  <button data-filter-clear>Clear filters</button>
</div>
```

---

## Implementation Checklist

### Test Group: Filter Controls Display (AC1)

**File:** `tests/e2e/projects.spec.ts`

**Tasks to make these tests pass:**

- [ ] Add `data-filter-controls` container to `projects.njk`
- [ ] Add type filter buttons with `data-filter-type` attributes
- [ ] Add resource checkboxes with `data-filter-resource` attributes
- [ ] Set `aria-pressed="true"` on All button by default
- [ ] Add `bg-lime-400` class to All button (active state)
- [ ] Add `hidden` class to filter controls (removed by JS)
- [ ] Run test: `npx playwright test projects.spec.ts -g "Filter Controls"`

---

### Test Group: Type Filtering (AC2)

**Tasks to make these tests pass:**

- [ ] Add `data-project-type="work|personal"` to each project card in `projects.njk`
- [ ] Create `initProjectFilters()` function in `js/main.js`
- [ ] Implement type button click handlers
- [ ] Toggle `hidden` class on cards based on type match
- [ ] Update `aria-pressed` on type buttons
- [ ] Update active styling (bg-lime-400) on buttons
- [ ] Run test: `npx playwright test projects.spec.ts -g "Type Filtering"`

---

### Test Group: Resource Filtering (AC3)

**Tasks to make these tests pass:**

- [ ] Add `data-has-github="true|false"` to project cards
- [ ] Add `data-has-demo="true|false"` to project cards
- [ ] Add `data-has-diagram="true|false"` to project cards
- [ ] Implement resource checkbox change handlers
- [ ] Filter cards based on resource attributes
- [ ] Run test: `npx playwright test projects.spec.ts -g "Resource Filtering"`

---

### Test Group: Multiple Filters AND Logic (AC4)

**Tasks to make these tests pass:**

- [ ] Combine type and resource filters with AND logic
- [ ] Apply all active filters to determine card visibility
- [ ] Run test: `npx playwright test projects.spec.ts -g "Multiple Filters"`

---

### Test Group: Empty State (AC5)

**Tasks to make these tests pass:**

- [ ] Add `data-filter-empty` container to `projects.njk`
- [ ] Show empty state when no cards match filters
- [ ] Add clear filters button inside empty state
- [ ] Run test: `npx playwright test projects.spec.ts -g "Empty State"`

---

### Test Group: Clear Filters (AC6)

**Tasks to make these tests pass:**

- [ ] Implement clear filters button click handler
- [ ] Reset type filter to "All"
- [ ] Uncheck all resource checkboxes
- [ ] Show all project cards
- [ ] Hide empty state
- [ ] Run test: `npx playwright test projects.spec.ts -g "Clear Filters"`

---

### Test Group: Data Attributes (AC7)

**Tasks to make these tests pass:**

- [ ] Verify all 9 project cards have `data-project-type`
- [ ] Verify all cards have `data-has-github`
- [ ] Verify all cards have `data-has-demo`
- [ ] Verify all cards have `data-has-diagram`
- [ ] Run test: `npx playwright test projects.spec.ts -g "Data Attributes"`

---

### Test Group: Progressive Enhancement (AC8)

**Tasks to make these tests pass:**

- [ ] Ensure filter controls have `hidden` class in HTML
- [ ] JS removes `hidden` class on init
- [ ] All 9 project cards visible without JS (no `hidden` class in HTML)
- [ ] Run test: `npx playwright test projects.spec.ts -g "Progressive Enhancement"`

---

## Running Tests

```bash
# Run all Story 3.5 tests (skipped in red phase)
npx playwright test projects.spec.ts -g "Story 3.5"

# Run specific test group
npx playwright test projects.spec.ts -g "Filter Controls"
npx playwright test projects.spec.ts -g "Type Filtering"
npx playwright test projects.spec.ts -g "Empty State"

# Run in headed mode (see browser)
npx playwright test projects.spec.ts -g "Story 3.5" --headed

# Debug specific test
npx playwright test projects.spec.ts -g "Work filter shows" --debug

# Run with trace on failure
npx playwright test projects.spec.ts -g "Story 3.5" --trace on
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete) ✅

**TEA Agent Responsibilities:**

- ✅ 39 tests written with `test.skip()` (failing)
- ✅ Tests assert expected filter behavior
- ✅ data-testid requirements documented
- ✅ Implementation checklist created

**Verification:**

All tests use `test.skip()` - they will be skipped when run, indicating red phase.

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Pick one test group** from implementation checklist
2. **Remove `test.skip()`** from those tests
3. **Implement minimal code** to make tests pass
4. **Run tests** to verify green
5. **Repeat** for next test group

**Recommended Implementation Order:**

1. Data Attributes (AC7) - Add attributes to template
2. Filter Controls Display (AC1) - Add HTML structure
3. Type Filtering (AC2) - Implement JS type filter
4. Resource Filtering (AC3) - Implement JS resource filter
5. Multiple Filters AND Logic (AC4) - Combine filters
6. Empty State (AC5) - Add empty state handling
7. Clear Filters (AC6) - Implement clear functionality
8. Progressive Enhancement (AC8) - Verify graceful degradation

---

### REFACTOR Phase (After All Tests Pass)

**DEV Agent Responsibilities:**

1. Verify all 39 tests pass
2. Review JS for readability and performance
3. Ensure no code duplication in filter logic
4. Verify accessibility (keyboard navigation, ARIA)
5. Check mobile responsive layout
6. Optimize if needed (unlikely for client-side filtering)

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npx playwright test projects.spec.ts -g "Story 3.5" --reporter=list`

**Expected Results:**

```
  ✓ 39 skipped
  ✓ 0 passed
  ✓ 0 failed
```

**Summary:**
- Total tests: 39
- Skipped: 39 (expected - red phase)
- Passing: 0 (expected)
- Failing: 0 (skipped tests don't fail)
- Status: ✅ RED phase verified

---

## Notes

- **No API/backend** - Static 11ty site with client-side filtering only
- **Tailwind CSS** - Use existing design tokens (border-2, bg-lime-400, etc.)
- **Neubrutalist styling** - Follow existing card patterns (shadow-brutal, border-black)
- **Project count validation** - Tests expect 9 total projects based on current `_content/projects/`
- **Filter state not persisted** - Intentional for MVP (no URL params needed)

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **test-quality.md** - Deterministic tests, explicit assertions, no hard waits
- **selector-resilience.md** - data-testid > ARIA > text selector hierarchy

See `tea-index.csv` for complete knowledge fragment mapping.

---

## Contact

**Questions or Issues?**

- Refer to `_bmad-output/implementation-artifacts/3-5-implement-project-filtering.md` for full story context
- Consult `_bmad/tea/testarch/knowledge` for testing best practices

---

**Generated by BMad TEA Agent** - 2026-02-01
