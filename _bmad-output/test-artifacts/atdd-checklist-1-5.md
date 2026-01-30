# ATDD Checklist - Epic 1, Story 1.5: Implement Accessibility Foundation

**Date:** 2026-01-29
**Author:** Jay (via TEA Agent)
**Primary Test Level:** E2E

---

## Story Summary

Verify and enhance the accessibility foundation implementation from Stories 1.2 and 1.3.

**As a** site visitor using assistive technology
**I want** accessible navigation and page structure
**So that** I can use the site with keyboard or screen reader

---

## Acceptance Criteria

1. **AC1: Skip Link First Focus** - Tab focuses skip link first ✅ VERIFIED
2. **AC2: Skip Link Function** - Enter navigates to main content ❌ NEEDS FIX
3. **AC3: Visible Focus Indicators** - 4px black outline on focus ✅ VERIFIED
4. **AC4: Screen Reader Landmarks** - ARIA landmarks present ✅ VERIFIED
5. **AC5: Keyboard Navigation** - Tab/Enter navigation works ✅ VERIFIED
6. **AC6: Reduced Motion Support** - Animations disabled with media query ✅ VERIFIED

---

## Test Execution Results

### E2E Tests (23 tests)

**File:** `tests/e2e/accessibility.spec.ts` (445 lines)

#### Skip Link Tests (AC1, AC2) - P0/P1

- ✅ **Test:** skip link receives focus on first Tab press
  - **Status:** GREEN - Passes
  - **Verifies:** AC1 - First focusable element

- ✅ **Test:** skip link becomes visible on focus
  - **Status:** GREEN - Passes
  - **Verifies:** AC1 - Visual visibility

- ❌ **Test:** skip link navigates to main content
  - **Status:** RED - Focus doesn't transfer to `<main>`
  - **Verifies:** AC2 - Skip link function
  - **Fix Required:** Add `tabindex="-1"` to `<main>` element

- ✅ **Test:** skip link exists on all pages
  - **Status:** GREEN - Passes
  - **Verifies:** AC1 - Consistency

#### Focus Indicator Tests (AC3) - P1

- ✅ **Test:** interactive elements have visible 4px focus outline
  - **Status:** GREEN - Passes
  - **Verifies:** AC3 - Focus visibility

- ✅ **Test:** nav links have visible focus state
  - **Status:** GREEN - Passes (≥2px outline)
  - **Verifies:** AC3 - Nav focus

- ✅ **Test:** focus is not color-only (accessible indicator)
  - **Status:** GREEN - Passes
  - **Verifies:** AC3 - WCAG compliance

#### Landmark Tests (AC4) - P1/P2

- ✅ **Test:** page has required ARIA landmarks
  - **Status:** GREEN - Passes
  - **Verifies:** AC4 - header, nav, main, footer

- ✅ **Test:** html element has lang attribute
  - **Status:** GREEN - Passes
  - **Verifies:** AC4 - Language declaration

- ✅ **Test:** landmarks are consistent across all pages
  - **Status:** GREEN - Passes
  - **Verifies:** AC4 - Consistency

- ✅ **Test:** logo has accessible name
  - **Status:** GREEN - Passes
  - **Verifies:** AC4 - ARIA labels

#### Keyboard Navigation Tests (AC5) - P0/P1/P2

- ✅ **Test:** Tab moves focus forward through interactive elements
  - **Status:** GREEN - Passes
  - **Verifies:** AC5 - Forward navigation

- ✅ **Test:** Shift+Tab moves focus backward
  - **Status:** GREEN - Passes
  - **Verifies:** AC5 - Backward navigation

- ✅ **Test:** Enter activates links
  - **Status:** GREEN - Passes
  - **Verifies:** AC5 - Link activation

- ✅ **Test:** Space activates buttons
  - **Status:** GREEN - Passes
  - **Verifies:** AC5 - Button activation

- ✅ **Test:** no keyboard traps exist
  - **Status:** GREEN - Passes
  - **Verifies:** AC5 - No traps

- ✅ **Test:** tab order follows visual order
  - **Status:** GREEN - Passes
  - **Verifies:** AC5 - Logical order

#### Reduced Motion Tests (AC6) - P2

- ✅ **Test:** reduced motion media query exists in CSS
  - **Status:** GREEN - Passes
  - **Verifies:** AC6 - Media query present

- ✅ **Test:** transitions disabled in reduced motion mode
  - **Status:** GREEN - Passes
  - **Verifies:** AC6 - Transitions disabled

- ✅ **Test:** hover effects disabled in reduced motion mode
  - **Status:** GREEN - Passes
  - **Verifies:** AC6 - Hover effects disabled

#### Integration Tests - P1/P2

- ✅ **Test:** page has exactly one h1 element
  - **Status:** GREEN - Passes
  - **Verifies:** Heading structure

- ✅ **Test:** all images have alt text
  - **Status:** GREEN - Passes
  - **Verifies:** Image accessibility

- ✅ **Test:** page has sufficient focusable elements
  - **Status:** GREEN - Passes
  - **Verifies:** Interactive elements

---

## Implementation Checklist

### Test: skip link navigates to main content

**File:** `tests/e2e/accessibility.spec.ts:74`

**Tasks to make this test pass:**

- [ ] Open `_includes/layouts/base.njk`
- [ ] Find `<main id="main-content">`
- [ ] Add `tabindex="-1"` attribute: `<main id="main-content" tabindex="-1">`
- [ ] Run test: `npm run test:e2e -- tests/e2e/accessibility.spec.ts --grep "navigates to main"`
- [ ] ✅ Test passes (green phase)

**Why this works:**
By default, non-interactive elements (`<main>`, `<div>`, etc.) cannot receive focus. When a skip link targets `#main-content`, the browser scrolls to it but doesn't transfer focus. Adding `tabindex="-1"` makes the element programmatically focusable (but not in the tab order).

---

## Running Tests

```bash
# Run all accessibility tests
npm run test:e2e -- tests/e2e/accessibility.spec.ts

# Run specific test file on Chromium only
npm run test:e2e -- tests/e2e/accessibility.spec.ts --project=chromium

# Run tests in headed mode (see browser)
npm run test:e2e -- tests/e2e/accessibility.spec.ts --headed

# Debug specific test
npm run test:e2e -- tests/e2e/accessibility.spec.ts --debug

# Run with UI mode
npm run test:e2e:ui
```

---

## Verification Status

### GREEN Phase Status

| AC | Tests | Status | Notes |
|----|-------|--------|-------|
| AC1 | 4 | ✅ All Pass | Skip link focus on Tab |
| AC2 | 1 | ❌ 1 Fail | Needs `tabindex="-1"` fix |
| AC3 | 3 | ✅ All Pass | Focus indicators visible |
| AC4 | 4 | ✅ All Pass | Landmarks present |
| AC5 | 6 | ✅ All Pass | Keyboard nav works |
| AC6 | 3 | ✅ All Pass | Reduced motion support |

**Summary:** 22/23 tests passing (96%)

---

## Next Steps

1. **Fix Implementation** - Add `tabindex="-1"` to `<main>` element
2. **Run Tests** - Verify all 23 tests pass
3. **Update Story Status** - Mark 1.5 as `done` in sprint-status.yaml
4. **Code Review** - Submit PR with test file and fix

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **selector-resilience.md** - Used getByRole, getByText for resilient selectors
- **test-quality.md** - Deterministic waits, explicit assertions
- **component-tdd.md** - Accessibility testing patterns

---

## Notes

- Most implementation already existed from Stories 1.2 and 1.3
- Only 1 implementation gap found (skip link focus transfer)
- Firefox and WebKit browsers need to be installed for full cross-browser testing
- Mobile Chrome tests also pass (22/23)

---

**Generated by BMad TEA Agent** - 2026-01-29
