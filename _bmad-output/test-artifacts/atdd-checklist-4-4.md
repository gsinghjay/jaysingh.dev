# ATDD Checklist - Epic 4, Story 4.4: Create Contact Page

**Date:** 2026-02-01
**Author:** Jay
**Primary Test Level:** E2E

---

## Story Summary

Create a contact page that displays contact methods (Email, GitHub, LinkedIn) with Neubrutalist styling and proper security attributes.

**As a** site visitor
**I want** to view contact information and social links
**So that** I can reach out to Jay professionally

---

## Acceptance Criteria

1. **AC1:** Contact page accessible at `/contact/`
2. **AC2:** Email, GitHub, LinkedIn links displayed
3. **AC3:** Email link has `mailto:` href
4. **AC4:** GitHub link opens in new tab with github.com URL
5. **AC5:** LinkedIn link opens in new tab with linkedin.com URL
6. **AC6:** External links have `target="_blank"` and `rel="noopener noreferrer"`
7. **AC7:** Neubrutalist design with contact cards
8. **AC8:** Links use `profile.json` socialLinks data

---

## Failing Tests Created (RED Phase)

### E2E Tests (10 tests)

**File:** `tests/e2e/contact.spec.ts` (158 lines)

- ✅ **Test:** [P0] AC1: contact page loads with correct title
  - **Status:** GREEN (title already exists in placeholder)
  - **Verifies:** Page accessible with correct title

- ✅ **Test:** [P0] AC2: all contact methods are visible
  - **Status:** RED - Element not found: getByRole('link', { name: /email/i })
  - **Verifies:** Email, GitHub, LinkedIn links visible

- ✅ **Test:** [P0] AC3: email link has mailto href
  - **Status:** RED - Element not found: getByRole('link', { name: /email/i })
  - **Verifies:** Email link has mailto:jay@jaysingh.dev

- ✅ **Test:** [P0] AC4: github link opens in new tab with correct URL
  - **Status:** RED - Element not found: getByRole('link', { name: /github/i })
  - **Verifies:** GitHub link has target="_blank" and github.com URL

- ✅ **Test:** [P0] AC5: linkedin link opens in new tab with correct URL
  - **Status:** RED - Element not found: getByRole('link', { name: /linkedin/i })
  - **Verifies:** LinkedIn link has target="_blank" and linkedin.com URL

- ✅ **Test:** [P1] AC6: external links have security attributes
  - **Status:** RED - Expected count >= 2, got less
  - **Verifies:** External links have rel="noopener noreferrer"

- ✅ **Test:** [P2] AC7: contact cards have Neubrutalist styling
  - **Status:** RED - Card count < 3
  - **Verifies:** Contact cards with border-4 and shadow styling

- ✅ **Test:** [P1] AC8: links use profile.json socialLinks data
  - **Status:** RED - Element not found
  - **Verifies:** Links match exact profile.json values

- ✅ **Test:** [P1] single h1 heading on contact page
  - **Status:** GREEN (h1 exists in placeholder)
  - **Verifies:** Accessibility - single h1

- ✅ **Test:** [P1] contact links are keyboard focusable
  - **Status:** RED - Element not found
  - **Verifies:** Accessibility - keyboard navigation

---

## Data Factories Created

None required - static page using existing `_data/profile.json`

---

## Fixtures Created

Using existing project fixtures:

### Custom Fixtures

**File:** `tests/support/fixtures/index.ts`

**Fixtures:**

- `verifyNeubrutalistDesign` - Verify Neubrutalist design tokens
  - **Provides:** Design verification function
  - **Cleanup:** None needed

- `checkA11yBasics` - Check accessibility basics
  - **Provides:** A11y check function (h1 count, alt text, focusable elements)
  - **Cleanup:** None needed

---

## Mock Requirements

None - static 11ty page, no external API calls

---

## Required data-testid Attributes

### Contact Page

None strictly required - tests use ARIA roles (`getByRole('link', { name: /email/i })`)

**Optional for styling tests:**
- `.contact-card` class on each contact card (for Neubrutalist verification)

---

## Implementation Checklist

### Test: [P0] AC2: all contact methods are visible

**File:** `tests/e2e/contact.spec.ts:38`

**Tasks to make this test pass:**

- [ ] Replace placeholder content in `contact.njk`
- [ ] Create Email link with accessible name containing "Email"
- [ ] Create GitHub link with accessible name containing "GitHub"
- [ ] Create LinkedIn link with accessible name containing "LinkedIn"
- [ ] Run test: `npx playwright test contact.spec.ts:38 --project=chromium`
- [ ] ✅ Test passes (green phase)

---

### Test: [P0] AC3: email link has mailto href

**File:** `tests/e2e/contact.spec.ts:55`

**Tasks to make this test pass:**

- [ ] Set Email link href to `{{ profile.socialLinks.email }}`
- [ ] Verify href resolves to `mailto:jay@jaysingh.dev`
- [ ] Run test: `npx playwright test contact.spec.ts:55 --project=chromium`
- [ ] ✅ Test passes (green phase)

---

### Test: [P0] AC4: github link opens in new tab

**File:** `tests/e2e/contact.spec.ts:64`

**Tasks to make this test pass:**

- [ ] Set GitHub link href to `{{ profile.socialLinks.github }}`
- [ ] Add `target="_blank"` to GitHub link
- [ ] Run test: `npx playwright test contact.spec.ts:64 --project=chromium`
- [ ] ✅ Test passes (green phase)

---

### Test: [P0] AC5: linkedin link opens in new tab

**File:** `tests/e2e/contact.spec.ts:73`

**Tasks to make this test pass:**

- [ ] Set LinkedIn link href to `{{ profile.socialLinks.linkedin }}`
- [ ] Add `target="_blank"` to LinkedIn link
- [ ] Run test: `npx playwright test contact.spec.ts:73 --project=chromium`
- [ ] ✅ Test passes (green phase)

---

### Test: [P1] AC6: external links have security attributes

**File:** `tests/e2e/contact.spec.ts:82`

**Tasks to make this test pass:**

- [ ] Add `rel="noopener noreferrer"` to GitHub link
- [ ] Add `rel="noopener noreferrer"` to LinkedIn link
- [ ] Run test: `npx playwright test contact.spec.ts:82 --project=chromium`
- [ ] ✅ Test passes (green phase)

---

### Test: [P2] AC7: contact cards have Neubrutalist styling

**File:** `tests/e2e/contact.spec.ts:98`

**Tasks to make this test pass:**

- [ ] Wrap each contact method in a card element
- [ ] Add `border-4 border-black` to cards
- [ ] Add `box-shadow: 6px 6px 0 #000` or `shadow-brutal` class
- [ ] Add color variants: Email (yellow), GitHub (lime), LinkedIn (blue)
- [ ] Run test: `npx playwright test contact.spec.ts:98 --project=chromium`
- [ ] ✅ Test passes (green phase)

---

### Test: [P1] AC8: links use profile.json socialLinks data

**File:** `tests/e2e/contact.spec.ts:115`

**Tasks to make this test pass:**

- [ ] Import profile data via 11ty data cascade
- [ ] Use `{{ profile.socialLinks.email }}` for email href
- [ ] Use `{{ profile.socialLinks.github }}` for GitHub href
- [ ] Use `{{ profile.socialLinks.linkedin }}` for LinkedIn href
- [ ] Run test: `npx playwright test contact.spec.ts:115 --project=chromium`
- [ ] ✅ Test passes (green phase)

---

### Test: [P1] contact links are keyboard focusable

**File:** `tests/e2e/contact.spec.ts:142`

**Tasks to make this test pass:**

- [ ] Ensure all contact links are `<a>` elements (naturally focusable)
- [ ] Add visible focus states with `focus-visible:outline-4 focus-visible:outline-black`
- [ ] Run test: `npx playwright test contact.spec.ts:142 --project=chromium`
- [ ] ✅ Test passes (green phase)

---

## Running Tests

```bash
# Run all failing tests for this story
npx playwright test tests/e2e/contact.spec.ts --project=chromium

# Run specific test file
npx playwright test contact.spec.ts --project=chromium

# Run tests in headed mode (see browser)
npx playwright test contact.spec.ts --project=chromium --headed

# Debug specific test
npx playwright test contact.spec.ts --project=chromium --debug

# Run with HTML report
npx playwright test contact.spec.ts --project=chromium --reporter=html
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete) ✅

**TEA Agent Responsibilities:**

- ✅ All tests written (10 total)
- ✅ 8 tests failing as expected
- ✅ 2 tests passing (existing placeholder structure)
- ✅ Uses existing fixtures (no new factories needed)
- ✅ Implementation checklist created

**Verification:**

```
Running 10 tests using 8 workers
  ✓ [P0] AC1: contact page loads with correct title
  ✘ [P0] AC2: all contact methods are visible
  ✘ [P0] AC3: email link has mailto href
  ✘ [P0] AC4: github link opens in new tab
  ✘ [P0] AC5: linkedin link opens in new tab
  ✘ [P1] AC6: external links have security attributes
  ✘ [P2] AC7: contact cards have Neubrutalist styling
  ✘ [P1] AC8: links use profile.json socialLinks data
  ✓ [P1] single h1 heading on contact page
  ✘ [P1] contact links are keyboard focusable
```

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Pick one failing test** from implementation checklist (start with AC2)
2. **Read the test** to understand expected behavior
3. **Implement minimal code** in `contact.njk` to make that test pass
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
2. **Review code for quality** (readability, DRY, accessibility)
3. **Ensure tests still pass** after each refactor
4. **Update story file** with Dev Agent Record

---

## Next Steps

1. **Run failing tests** to confirm RED phase: `npx playwright test contact.spec.ts --project=chromium`
2. **Begin implementation** using implementation checklist as guide
3. **Work one test at a time** (red → green for each)
4. **When all tests pass**, refactor code for quality
5. **Update story status** to 'done' in sprint-status.yaml

---

## Knowledge Base References Applied

- **test-quality.md** - Deterministic tests, explicit assertions, isolation
- **selector-resilience.md** - ARIA roles over CSS selectors (getByRole pattern)

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npx playwright test contact.spec.ts --project=chromium`

**Results:**

```
Running 10 tests using 8 workers
  ✓ 2 tests passed
  ✘ 8 tests failed
```

**Summary:**

- Total tests: 10
- Passing: 2 (existing structure)
- Failing: 8 (expected - features not implemented)
- Status: ✅ RED phase verified

---

## Notes

- Email link does NOT need `target="_blank"` (mailto: opens email client)
- GitHub and LinkedIn links need both `target="_blank"` AND `rel="noopener noreferrer"`
- Profile data already exists from Story 4.3 - no new data files needed
- Contact page is final story in Epic 4 (Professional Profile)

---

## Files Created/Modified

**Created:**
- `tests/e2e/contact.spec.ts` - ATDD tests for Story 4.4

**Modified:**
- `tests/e2e/profile.spec.ts` - Removed `test.skip()` from social links test

---

**Generated by BMad TEA Agent** - 2026-02-01
