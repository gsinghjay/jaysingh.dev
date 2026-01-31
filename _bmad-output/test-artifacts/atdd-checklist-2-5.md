# ATDD Checklist - Epic 2, Story 2.5: Implement Reading Time Display

**Date:** 2026-01-30
**Author:** Jay
**Primary Test Level:** E2E

---

## Story Summary

Display estimated reading time for blog posts, calculated at build-time using an 11ty filter at ~200 words per minute.

**As a** site visitor
**I want** to see estimated reading time for blog posts
**So that** I can decide if I have time to read the article

---

## Acceptance Criteria

1. **AC1: Build-Time Calculation** - Reading time calculated at ~200 WPM during 11ty build
2. **AC2: Display on Detail Page** - Reading time shown in post header metadata
3. **AC3: Display on Listing Page** - Reading time shown on post cards
4. **AC4: 11ty Filter Implementation** - Uses filter/computed data, not client-side JS
5. **AC5: Minimum Value** - Very short posts show "1 min read" minimum

---

## Failing Tests Created (RED Phase)

### E2E Tests (9 tests across 5 browsers = 45 test runs)

**File:** `tests/e2e/blog.spec.ts` (lines 1237-1388)

| Test | Priority | Status | Failure Reason |
|------|----------|--------|----------------|
| reading time on listing shows "min read" format | P0 | RED | Current: "10 min" → Expected: "X min read" |
| all post cards show reading time with correct format | P1 | RED | Format mismatch |
| reading time on detail shows "min read" format | P0 | RED | Current: "10 min" → Expected: "X min read" |
| reading time has bold styling on detail page | P1 | RED | Format not matching selector |
| reading time value is reasonable for content length | P1 | RED | Cannot find "X min read" to parse |
| short posts show minimum "1 min read" | P2 | PASS* | Incidental pass on existing data |
| reading time is pre-rendered in HTML (no client JS) | P2 | RED | HTML contains "10 min" not "X min read" |
| listing page reading time is pre-rendered | P2 | RED | HTML format mismatch |
| listing and detail show same reading time value | P2 | RED | Cannot find elements to compare |

*Note: One test passes incidentally because it checks minimum >= 1 on existing values.

---

## Data Factories Created

None required - static site with no dynamic data seeding.

---

## Fixtures Created

No new fixtures required. Tests use existing:
- `tests/support/fixtures/index.ts` - Base Playwright fixtures with Neubrutalist verification

---

## Mock Requirements

None - static site with no external API calls.

---

## Required data-testid Attributes

None required for this story. Tests use:
- Text locators: `/\d+ min read/`
- CSS class selectors: `.font-bold`, `.flex.items-center.gap-4`
- Existing page structure

---

## Implementation Checklist

### Test: [P0] reading time on listing shows "min read" format

**File:** `tests/e2e/blog.spec.ts:1255`

**Tasks to make this test pass:**

- [ ] Add `readingTime` filter to `eleventy.config.js`
- [ ] Filter should strip HTML, count words, calculate at 200 WPM
- [ ] Filter should return format: `"X min read"`
- [ ] Update `blog.njk` line 23: change `{{ post.data.readTime }}` to `{{ post.content | readingTime }}`
- [ ] Run test: `npx playwright test --grep "reading time on listing shows"`
- [ ] Test passes (green phase)

---

### Test: [P0] reading time on detail shows "min read" format

**File:** `tests/e2e/blog.spec.ts:1286`

**Tasks to make this test pass:**

- [ ] (Depends on filter from above)
- [ ] Update `_includes/layouts/blog-post.njk` line 29: change `{{ readTime }}` to `{{ content | readingTime }}`
- [ ] Run test: `npx playwright test --grep "reading time on detail shows"`
- [ ] Test passes (green phase)

---

### Test: [P1] all post cards show reading time with correct format

**File:** `tests/e2e/blog.spec.ts:1265`

**Tasks to make this test pass:**

- [ ] (Depends on listing page template change above)
- [ ] Run test: `npx playwright test --grep "all post cards show reading time"`
- [ ] Test passes (green phase)

---

### Test: [P1] reading time has bold styling on detail page

**File:** `tests/e2e/blog.spec.ts:1297`

**Tasks to make this test pass:**

- [ ] Ensure `{{ content | readingTime }}` is wrapped in `.font-bold` span
- [ ] Run test: `npx playwright test --grep "reading time has bold styling"`
- [ ] Test passes (green phase)

---

### Test: [P1] reading time value is reasonable for content length

**File:** `tests/e2e/blog.spec.ts:1310`

**Tasks to make this test pass:**

- [ ] Filter calculates ~200 WPM correctly
- [ ] Docker observability post (~1500 words) should show 7-8 min
- [ ] Run test: `npx playwright test --grep "reading time value is reasonable"`
- [ ] Test passes (green phase)

---

### Test: [P2] reading time is pre-rendered in HTML

**File:** `tests/e2e/blog.spec.ts:1348`

**Tasks to make this test pass:**

- [ ] Build site with filter: `npm run build:11ty`
- [ ] Verify HTML contains "X min read" in source
- [ ] Run test: `npx playwright test --grep "pre-rendered in HTML"`
- [ ] Test passes (green phase)

---

## Running Tests

```bash
# Run all failing tests for this story
npx playwright test --grep "Story 2.5"

# Run specific test file
npx playwright test tests/e2e/blog.spec.ts --grep "Story 2.5"

# Run tests in headed mode (see browser)
npx playwright test --grep "Story 2.5" --headed

# Debug specific test
npx playwright test --grep "Story 2.5" --debug

# Run P0 tests only
npx playwright test --grep "Story 2.5.*\[P0\]"
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete)

**TEA Agent Responsibilities:**

- [x] All tests written and failing
- [x] Tests target NEW expected behavior ("X min read")
- [x] Implementation checklist created
- [x] No fixtures or mocks needed (static site)

**Verification:**

```
45 tests total:
  ✘ 40 failed  ← Expected (format mismatch)
  ✓  5 passed  ← Incidental (minimum value check)
```

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Implement readingTime filter** in `eleventy.config.js`
2. **Update blog.njk** to use `{{ post.content | readingTime }}`
3. **Update blog-post.njk** to use `{{ content | readingTime }}`
4. **Run tests** to verify all pass (green)
5. **Remove frontmatter readTime** values (optional cleanup)

**Implementation Order:**
1. Filter first (Task 1)
2. Listing page template (Task 2)
3. Detail page template (Task 3)
4. Run all Story 2.5 tests

---

### REFACTOR Phase (After All Tests Pass)

**DEV Agent Responsibilities:**

1. Consider removing hardcoded `readTime` from frontmatter
2. Review filter edge cases (code blocks, empty content)
3. Ensure tests still pass after any cleanup

---

## Next Steps

1. **Run failing tests** to confirm RED phase: `npx playwright test --grep "Story 2.5"`
2. **Begin implementation** using checklist above
3. **Work P0 tests first** (most critical)
4. **When all tests pass**, mark story complete
5. **Commit** with message: "Add reading time calculation with ATDD tests (Story 2.5)"

---

## Knowledge Base References Applied

- **test-quality.md** - Deterministic tests, explicit assertions, no hard waits
- **selector-resilience.md** - Text locators with regex for dynamic content

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npx playwright test --grep "Story 2.5"`

**Results:**

```
45 tests total:
  ✘ 40 failed  ← Expected (looking for "X min read", found "X min")
  ✓  5 passed  ← Incidental (minimum value passes on existing data)
```

**Summary:**

- Total tests: 9 unique × 5 browsers = 45 runs
- Passing: 5 (incidental)
- Failing: 40 (expected)
- Status: RED phase verified

**Expected Failure Message:**
```
Error: expect(locator).toBeVisible() failed
Locator: getByText(/\d+ min read/).first()
Expected: visible
Error: element(s) not found
```

---

## Notes

- Current implementation uses frontmatter `readTime: 10 min` (hardcoded)
- New implementation calculates dynamically with "X min read" format suffix
- Format change ("min" → "min read") is the key difference that makes tests fail
- No JavaScript required - purely build-time filter

---

**Generated by BMad TEA Agent** - 2026-01-30
