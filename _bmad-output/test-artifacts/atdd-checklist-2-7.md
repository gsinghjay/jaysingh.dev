# ATDD Checklist - Epic 2, Story 2.7: Implement Related Projects Links

**Date:** 2026-01-31
**Author:** Jay
**Primary Test Level:** E2E

---

## Story Summary

Display related projects on blog post detail pages, allowing visitors to explore practical applications of the concepts discussed. Links are rendered at build-time using 11ty collection lookup.

**As a** site visitor
**I want** to see related projects linked from blog posts
**So that** I can explore practical applications of the concepts discussed

---

## Acceptance Criteria

1. **AC1:** Related Projects Section Displays when `relatedProjectIds` exists in frontmatter
2. **AC2:** Project Link Content shows title and brief description
3. **AC3:** Navigation to Project page at `/projects/{project-id}/`
4. **AC4:** Graceful Absence - section hidden when no `relatedProjectIds`
5. **AC5:** Build-time Collection Lookup using 11ty filter
6. **AC6:** Invalid Reference Handling - gracefully ignored (no build error)

---

## Failing Tests Created (RED Phase)

### E2E Tests (8 tests)

**File:** `tests/e2e/blog.spec.ts` (appended to existing file)

| Priority | Test | Status | Verifies |
|----------|------|--------|----------|
| P0 | related projects section visible when relatedProjectIds exists | RED - `.related-projects` doesn't exist | AC1 |
| P0 | project title and description displayed | RED - no project cards rendered | AC2 |
| P0 | clicking project link navigates to project page | RED - no project links | AC3 |
| P1 | section hidden when all relatedProjectIds are invalid | RED - section may error | AC4, AC6 |
| P1 | project links are keyboard accessible | RED - no focusable links | AC3 |
| P1 | invalid project references gracefully ignored | RED - may cause errors | AC6 |
| P2 | related projects pre-rendered in HTML (no client JS) | RED - no HTML content | AC5 |
| P2 | project cards have Neubrutalist styling | RED - no cards exist | AC1 |

### API Tests (0 tests)

N/A - This is a pure build-time template feature with no API endpoints.

---

## Data Factories Created

N/A - No data factories needed. Tests use existing blog content:
- `/blog/oauth2-authentication-gateway/` - has valid `relatedProjectIds: [authentication-gateway]`
- `/blog/docker-observability/` - has invalid reference `relatedProjectIds: [observability-infrastructure]`

---

## Fixtures Created

N/A - Uses existing fixtures from `tests/support/fixtures/index.ts`:
- `verifyNeubrutalistDesign` - available but not used for this story
- Standard Playwright `page` and `request` fixtures

---

## Mock Requirements

N/A - No external services to mock. This is a build-time 11ty feature.

---

## Required data-testid Attributes

N/A - Tests use semantic selectors:
- `.related-projects` - section class
- `.related-projects a` - project links
- `h3` within links - project titles
- `p` within links - project descriptions

---

## Implementation Checklist

### Test: related projects section visible when relatedProjectIds exists

**File:** `tests/e2e/blog.spec.ts`

**Tasks to make this test pass:**

- [x] Create `_includes/partials/related-projects.njk` partial template
- [x] Add `findProjectsByIds` filter to `lib/filters.js` (imported in eleventy.config.js)
- [x] Include partial in `_includes/layouts/blog-post.njk` after social share
- [x] Pass `relatedProjectIds` and `collections.projects` to partial
- [x] Add `.related-projects` class to section element
- [x] Add `aria-labelledby` for accessibility
- [x] Run test: `npx playwright test --grep "related projects section visible"`
- [x] Test passes (green phase)

---

### Test: project title and description displayed

**File:** `tests/e2e/blog.spec.ts`

**Tasks to make this test pass:**

- [x] Loop through `relatedProjectIds` in partial template
- [x] Use `findProjectsByIds` filter to get project data
- [x] Render `<h3>` with `project.data.title`
- [x] Render `<p>` with `project.data.description`
- [x] Apply `line-clamp-2` for description truncation
- [x] Run test: `npx playwright test --grep "project title and description"`
- [x] Test passes (green phase)

---

### Test: clicking project link navigates to project page

**File:** `tests/e2e/blog.spec.ts`

**Tasks to make this test pass:**

- [x] Wrap project card in `<a href="/projects/{{ project.data.id }}/">`
- [x] Ensure trailing slash in URL
- [x] Run test: `npx playwright test --grep "clicking project link navigates"`
- [x] Test passes (green phase)

---

### Test: section hidden when no relatedProjectIds

**File:** `tests/e2e/blog.spec.ts`

**Tasks to make this test pass:**

- [x] Implement `findProjectsByIds` filter to return empty array for invalid IDs
- [x] Add conditional `{% if relatedProjects.length > 0 %}` in partial
- [x] Run test: `npx playwright test --grep "section hidden when no"`
- [x] Test passes (green phase)

**Note:** Test updated to use `/blog/postgresql-performance/` (no relatedProjectIds) since `observability-infrastructure` project now exists.

---

### Test: project links are keyboard accessible

**File:** `tests/e2e/blog.spec.ts`

**Tasks to make this test pass:**

- [x] Use `<a>` tags (natively focusable)
- [x] Apply visible focus styles (`focus-visible:outline-4 focus-visible:outline focus-visible:outline-black`)
- [x] Run test: `npx playwright test --grep "keyboard accessible"`
- [x] Test passes (green phase)

---

### Test: invalid project references gracefully ignored

**File:** `tests/e2e/blog.spec.ts`

**Tasks to make this test pass:**

- [x] `findProjectsByIds` filter gracefully handles non-existent IDs
- [x] Return only valid matches, filter out undefined
- [x] No build errors or console errors
- [x] Run test: `npx playwright test --grep "invalid project references"`
- [x] Test passes (green phase)

---

### Test: related projects pre-rendered in HTML (no client JS)

**File:** `tests/e2e/blog.spec.ts`

**Tasks to make this test pass:**

- [x] All rendering done in Nunjucks template (build-time)
- [x] No client-side JavaScript for this feature
- [x] Raw HTML contains `related-projects` class and project content
- [x] Run test: `npx playwright test --grep "pre-rendered in HTML"`
- [x] Test passes (green phase)

---

### Test: project cards have Neubrutalist styling

**File:** `tests/e2e/blog.spec.ts`

**Tasks to make this test pass:**

- [x] Apply `border-4 border-black` to project links
- [x] Apply `style="box-shadow: 6px 6px 0 #000;"` inline
- [x] Apply `hover:bg-lime-300` for hover effect
- [x] Run test: `npx playwright test --grep "Neubrutalist styling"`
- [x] Test passes (green phase)

---

## Running Tests

```bash
# Run all failing tests for this story
npx playwright test --grep "Story 2.7"

# Run specific test file
npx playwright test tests/e2e/blog.spec.ts --grep "Story 2.7"

# Run tests in headed mode (see browser)
npx playwright test --grep "Story 2.7" --headed

# Debug specific test
npx playwright test --grep "Story 2.7" --debug

# Run P0 tests only (critical path)
npx playwright test --grep "Story 2.7.*\[P0\]"
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete)

**TEA Agent Responsibilities:**

- [x] All tests written and failing
- [x] Tests follow existing codebase patterns
- [x] Resilient selectors used (class, role, text)
- [x] Implementation checklist created

**Verification:**

- All tests run and fail as expected
- Failure messages are clear and actionable
- Tests fail due to missing implementation, not test bugs

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Pick one failing test** from implementation checklist (start with P0)
2. **Read the test** to understand expected behavior
3. **Implement minimal code** to make that specific test pass
4. **Run the test** to verify it now passes (green)
5. **Check off the task** in implementation checklist
6. **Move to next test** and repeat

**Key Principles:**

- One test at a time (don't try to fix all at once)
- Minimal implementation (don't over-engineer)
- Run tests frequently (immediate feedback)
- Use implementation checklist as roadmap

---

### REFACTOR Phase (DEV Team - After All Tests Pass)

**DEV Agent Responsibilities:**

1. **Verify all tests pass** (green phase complete)
2. **Review code for quality** (readability, maintainability)
3. **Extract duplications** (DRY principle)
4. **Ensure tests still pass** after each refactor

---

## Next Steps

1. **Run failing tests** to confirm RED phase: `npx playwright test --grep "Story 2.7"`
2. **Begin implementation** using implementation checklist as guide
3. **Work one test at a time** (red → green for each)
4. **When all tests pass**, story is complete
5. **Commit** with message: `Add related projects links with ATDD tests (Story 2.7)`

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **test-quality.md** - Test design principles (Given-When-Then, determinism, isolation)
- **selector-resilience.md** - Robust selector strategies (class, role, text hierarchy)

See `tea-index.csv` for complete knowledge fragment mapping.

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npx playwright test --grep "Story 2.7"`

**Expected Results:**

```
Running 8 tests using 1 worker

  ✘ [P0] related projects section visible when relatedProjectIds exists
  ✘ [P0] project title and description displayed
  ✘ [P0] clicking project link navigates to project page
  ✘ [P1] section hidden when all relatedProjectIds are invalid
  ✘ [P1] project links are keyboard accessible
  ✘ [P1] invalid project references gracefully ignored
  ✘ [P2] related projects pre-rendered in HTML (no client JS)
  ✘ [P2] project cards have Neubrutalist styling

  8 failed
```

**Summary:**

- Total tests: 8
- Passing: 0 (expected)
- Failing: 8 (expected)
- Status: RED phase verified

---

## Notes

- Test post `/blog/oauth2-authentication-gateway/` has valid `relatedProjectIds: [authentication-gateway]`
- Test post `/blog/postgresql-performance/` has no `relatedProjectIds` (used for AC #4 test)
- Test post `/blog/docker-observability/` now has valid reference (observability-infrastructure was created)
- No API tests needed - this is a pure build-time 11ty template feature

---

**Generated by BMad TEA Agent** - 2026-01-31
**Completed by Dev Agent** - 2026-01-31 (40 tests passing)
