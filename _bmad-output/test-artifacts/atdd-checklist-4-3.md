# ATDD Checklist - Epic 4, Story 4.3: Implement Profile Data Files

**Date:** 2026-02-01
**Author:** Jay
**Primary Test Level:** E2E

---

## Story Summary

Create `profile.json` data file and update templates to use dynamic profile data. This centralizes profile information for reuse across the site and enables future Sanity.io migration.

**As a** developer
**I want** structured data files for profile information
**So that** profile data is centralized and reusable across templates

---

## Acceptance Criteria

1. **AC1:** Data files present - `profile.json`, `resume.json`, `skills.json` exist in `_data/`
2. **AC2:** Profile JSON contains name, role, bio, socialLinks
3. **AC3:** Resume JSON has experience[] and education[] *(ALREADY EXISTS)*
4. **AC4:** Skills JSON has categorized skills *(ALREADY EXISTS)*
5. **AC5:** Template access - data accessible as `{{ profile.name }}`, `{{ resume.experience }}`, `{{ skills }}`
6. **AC6:** Schema compatibility - camelCase fields for Sanity.io migration

---

## Failing Tests Created (RED Phase)

### E2E Tests (7 tests)

**File:** `tests/e2e/profile.spec.ts` (85 lines)

| # | Test | Priority | Status | Verifies |
|---|------|----------|--------|----------|
| 1 | profile name appears in page title | P0 | 🔴 RED | AC5 - `{{ profile.name }}` in base.njk title |
| 2 | profile name appears on other pages with title prefix | P0 | 🔴 RED | AC5 - consistent title pattern across pages |
| 3 | profile name appears in footer copyright | P1 | 🔴 RED | AC5 - `{{ profile.name \| upper }}` in footer.njk |
| 4 | footer with profile name is consistent across pages | P1 | 🔴 RED | AC5 - footer renders identically on all pages |
| 5 | profile socialLinks are accessible for contact page | P1 | 🔴 RED | AC2, AC5 - socialLinks object available |
| 6 | meta description uses profile data | P2 | 🔴 RED | AC5 - `{{ profile.name }}` in meta.njk |
| 7 | og:title uses profile name as default | P2 | 🔴 RED | AC5 - Open Graph tags use profile data |

**Priority Coverage:**
- P0: 2 tests
- P1: 3 tests
- P2: 2 tests

---

## Data Factories Created

**None required.** Story 4.3 tests static site content rendered from `_data/profile.json`. No dynamic data generation needed.

---

## Fixtures Created

**None additional.** Tests use existing fixtures from `tests/support/fixtures/index.ts`:
- `test` - Extended Playwright test with custom fixtures
- `expect` - Playwright expect with custom matchers

---

## Mock Requirements

**None.** This is a static site (11ty) - no external API calls to mock. Data is read from JSON files at build time.

---

## Required data-testid Attributes

**None required.** Tests use semantic selectors:
- `page.locator('footer')` - Footer element
- `page.getByRole('link', { name: /github/i })` - Social links by accessible name
- `page.locator('meta[name="description"]')` - Meta tags by attribute

---

## Implementation Checklist

### Test: profile name appears in page title

**File:** `tests/e2e/profile.spec.ts:35`

**Tasks to make this test pass:**

- [ ] Create `_data/profile.json` with `name: "Jay Singh"`
- [ ] Update `_includes/layouts/base.njk` line 6:
  - FROM: `<title>{% if title %}{{ title }} | {% endif %}Jay Singh</title>`
  - TO: `<title>{% if title %}{{ title }} | {% endif %}{{ profile.name }}</title>`
- [ ] Remove `test.skip()` from test
- [ ] Run test: `npx playwright test tests/e2e/profile.spec.ts -g "page title"`
- [ ] ✅ Test passes (green phase)

---

### Test: profile name appears in footer copyright

**File:** `tests/e2e/profile.spec.ts:59`

**Tasks to make this test pass:**

- [ ] Ensure `_data/profile.json` exists with `name: "Jay Singh"`
- [ ] Update `_includes/partials/footer.njk` line 5:
  - FROM: `© 2026 JAYSINGH.DEV`
  - TO: `© 2026 {{ profile.name | upper }}`
- [ ] Remove `test.skip()` from test
- [ ] Run test: `npx playwright test tests/e2e/profile.spec.ts -g "footer copyright"`
- [ ] ✅ Test passes (green phase)

---

### Test: profile socialLinks are accessible for contact page

**File:** `tests/e2e/profile.spec.ts:90`

**Tasks to make this test pass:**

- [ ] Add `socialLinks` object to `_data/profile.json`:
  ```json
  "socialLinks": {
    "github": "https://github.com/jaysingh",
    "linkedin": "https://linkedin.com/in/jaysingh",
    "email": "mailto:jay@jaysingh.dev"
  }
  ```
- [ ] Contact page (Story 4.4) must render social links from `{{ profile.socialLinks }}`
- [ ] Remove `test.skip()` from test
- [ ] Run test: `npx playwright test tests/e2e/profile.spec.ts -g "socialLinks"`
- [ ] ✅ Test passes (green phase)

**Note:** This test may require Story 4.4 (Contact page) to be implemented first.

---

### Test: meta description uses profile data

**File:** `tests/e2e/profile.spec.ts:116`

**Tasks to make this test pass:**

- [ ] Ensure `_data/profile.json` has `name` and `role` fields
- [ ] Update `_includes/partials/meta.njk` line 4:
  - FROM: `<meta name="description" content="{{ description | default('Jay Singh - Software Engineer') }}">`
  - TO: `<meta name="description" content="{{ description | default(profile.name + ' - ' + profile.role) }}">`
- [ ] Remove `test.skip()` from test
- [ ] Run test: `npx playwright test tests/e2e/profile.spec.ts -g "meta description"`
- [ ] ✅ Test passes (green phase)

---

## Running Tests

```bash
# Run all failing tests for this story (currently skipped)
npx playwright test tests/e2e/profile.spec.ts

# Run specific test file with one browser
npx playwright test tests/e2e/profile.spec.ts --project=chromium

# Run tests in headed mode (see browser)
npx playwright test tests/e2e/profile.spec.ts --headed

# Debug specific test
npx playwright test tests/e2e/profile.spec.ts -g "page title" --debug

# Run with UI mode for interactive debugging
npx playwright test tests/e2e/profile.spec.ts --ui
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete) ✅

**TEA Agent Responsibilities:**

- ✅ All tests written and skipped (`test.skip()`)
- ✅ Tests assert expected behavior
- ✅ Selector strategy defined (semantic selectors)
- ✅ Implementation checklist created
- ✅ No fixtures needed (static site)

**Verification:**

```
35 skipped (7 tests × 5 browsers)
```

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Create `_data/profile.json`** with required fields
2. **Update templates** to use `{{ profile.name }}` and `{{ profile.socialLinks }}`
3. **Remove `test.skip()`** from each test as you implement
4. **Run tests** to verify they pass
5. **Check off tasks** in implementation checklist above

**Key Principles:**

- One test at a time (start with P0 tests)
- Minimal implementation (don't over-engineer)
- Run tests frequently (immediate feedback)

---

### REFACTOR Phase (After All Tests Pass)

**DEV Agent Responsibilities:**

1. Verify all 7 tests pass (green phase complete)
2. Review template changes for consistency
3. Ensure profile.json schema is Sanity.io compatible
4. Update Story 4.3 status to `done`

---

## Next Steps

1. **Share this checklist** with the dev workflow
2. **Create `_data/profile.json`** - this is the first implementation task
3. **Run failing tests** to confirm RED phase: `npx playwright test tests/e2e/profile.spec.ts`
4. **Begin implementation** using implementation checklist as guide
5. **Remove `test.skip()`** as you implement each feature
6. **When all tests pass**, update story status to 'done'

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **test-quality.md** - Test design principles (determinism, isolation, explicit assertions)
- **selector-resilience.md** - Selector hierarchy (semantic selectors over CSS classes)

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npx playwright test tests/e2e/profile.spec.ts`

**Results:**

```
Running 35 tests using 8 workers
  - 35 skipped
```

**Summary:**

- Total tests: 7 (× 5 browsers = 35)
- Passing: 0 (expected)
- Skipped: 35 (expected - TDD red phase)
- Status: ✅ RED phase verified

---

## Notes

- AC3 and AC4 are already satisfied by existing `resume.json` and `skills.json` files (Story 4.1)
- The socialLinks test depends on Story 4.4 (Contact page) for full verification
- Profile data uses camelCase field names for Sanity.io migration compatibility
- No breaking changes to existing tests - new test file added

---

**Generated by BMad TEA Agent** - 2026-02-01
