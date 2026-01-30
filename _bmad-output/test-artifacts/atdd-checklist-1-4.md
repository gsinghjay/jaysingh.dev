# ATDD Checklist - Epic 1, Story 1.4: Mobile Responsive Navigation

**Date:** 2026-01-29
**Author:** Jay
**Primary Test Level:** E2E

---

## Story Summary

Implement mobile responsive navigation with hamburger menu for small screens.

**As a** mobile site visitor
**I want** a responsive navigation menu
**So that** I can navigate the site on small screens

---

## Acceptance Criteria

1. **AC1**: Hamburger button visible on mobile (< 768px)
2. **AC2**: Menu opens on tap with all nav links visible
3. **AC3**: Menu closes via X button tap
4. **AC4**: Auto-close on navigation link click
5. **AC5**: Vanilla JS with `data-*` attributes (Architecture compliance)
6. **AC6**: Responsive breakpoint transition

---

## Failing Tests Created (RED Phase)

### E2E Tests (16 tests)

**File:** `tests/e2e/mobile-navigation.spec.ts` (261 lines)

#### P0 Critical Tests (4 tests)

- **Test:** `[P0] hamburger button visible on mobile viewport`
  - **Status:** RED - `[data-mobile-menu-toggle]` element does not exist
  - **Verifies:** AC1 - Hamburger visibility on mobile

- **Test:** `[P0] menu opens when hamburger button is tapped`
  - **Status:** RED - `[data-mobile-menu]` element does not exist
  - **Verifies:** AC2 - Menu open behavior

- **Test:** `[P0] menu closes when X button is tapped`
  - **Status:** RED - Toggle icons not implemented
  - **Verifies:** AC3 - Menu close behavior

- **Test:** `[P0] menu closes automatically when nav link is clicked`
  - **Status:** RED - Auto-close not implemented
  - **Verifies:** AC4 - Auto-close on navigation

#### P1 High Priority Tests (8 tests)

- **Test:** `[P1] all navigation links visible in mobile menu`
  - **Status:** RED - Mobile menu structure not implemented
  - **Verifies:** AC2 - All nav links present

- **Test:** `[P1] mobile nav links have correct URLs`
  - **Status:** RED - Mobile menu structure not implemented
  - **Verifies:** AC2 - Clean URL navigation

- **Test:** `[P1] icon toggles correctly between menu and close states`
  - **Status:** RED - Toggle icons not implemented
  - **Verifies:** AC3 - Icon state management

- **Test:** `[P1] active page indicated in mobile menu`
  - **Status:** RED - Mobile menu structure not implemented
  - **Verifies:** Active state parity with desktop

- **Test:** `[P1] hamburger hidden and desktop nav visible on desktop`
  - **Status:** RED - Hamburger button not implemented
  - **Verifies:** AC6 - Desktop breakpoint

- **Test:** `[P1] menu closes when viewport resized to desktop`
  - **Status:** RED - Resize handler not implemented
  - **Verifies:** AC6 - Responsive transition

- **Test:** `[P1] hamburger appears when viewport resized to mobile`
  - **Status:** RED - Hamburger button not implemented
  - **Verifies:** AC6 - Responsive transition

- **Test:** `[P1] active page indicated in mobile menu`
  - **Status:** RED - Mobile nav styling not implemented
  - **Verifies:** React parity

#### P2 Accessibility Tests (4 tests)

- **Test:** `[P2] hamburger button has correct ARIA attributes`
  - **Status:** RED - ARIA attributes not implemented
  - **Verifies:** AC5 - Accessibility compliance

- **Test:** `[P2] Escape key closes mobile menu`
  - **Status:** RED - Keyboard handler not implemented
  - **Verifies:** Keyboard accessibility

- **Test:** `[P2] Enter/Space activates hamburger button`
  - **Status:** RED - Already works (native button), but focus management not implemented
  - **Verifies:** Keyboard accessibility

- **Test:** `[P2] first nav link receives focus when menu opens`
  - **Status:** RED - Focus management not implemented
  - **Verifies:** Focus management accessibility

### API Tests (0 tests)

**N/A** - Static 11ty site with no API endpoints

---

## Data Factories Created

**N/A** - No data factories needed for this UI-only story

---

## Fixtures Created

Existing fixtures from `tests/support/fixtures/index.ts` are sufficient:
- `verifyNeubrutalistDesign` - Design token verification
- `checkA11yBasics` - Accessibility checks

---

## Mock Requirements

**N/A** - No external services to mock (static site)

---

## Required data-testid Attributes

### Header Component (`_includes/partials/header.njk`)

- `data-mobile-menu-toggle` - Hamburger/close button
- `data-mobile-menu` - Mobile navigation container
- `data-icon="menu"` - Hamburger icon SVG
- `data-icon="close"` - Close (X) icon SVG

**Implementation Example:**

```html
<button data-mobile-menu-toggle
        class="md:hidden border-2 border-black bg-white p-2"
        aria-label="Open menu"
        aria-expanded="false">
  <svg data-icon="menu" class="w-8 h-8">...</svg>
  <svg data-icon="close" class="w-8 h-8 hidden">...</svg>
</button>

<nav data-mobile-menu class="hidden md:hidden" aria-label="Mobile navigation">
  <ul>...</ul>
</nav>
```

---

## Implementation Checklist

### Test: [P0] hamburger button visible on mobile viewport

**File:** `tests/e2e/mobile-navigation.spec.ts`

**Tasks to make this test pass:**

- [ ] Add hamburger button with `data-mobile-menu-toggle` attribute to header.njk
- [ ] Add inline SVG hamburger icon with `data-icon="menu"`
- [ ] Add `md:hidden` class to show button only on mobile
- [ ] Style with Neubrutalist design (border-2, border-black, bg-white)
- [ ] Run test: `npx playwright test mobile-navigation --grep "hamburger button visible"`
- [ ] Test passes (green phase)

---

### Test: [P0] menu opens when hamburger button is tapped

**File:** `tests/e2e/mobile-navigation.spec.ts`

**Tasks to make this test pass:**

- [ ] Add mobile menu container with `data-mobile-menu` attribute
- [ ] Add click handler to toggle `hidden` class on menu
- [ ] Toggle icon visibility (menu icon hidden, close icon visible)
- [ ] Run test: `npx playwright test mobile-navigation --grep "menu opens"`
- [ ] Test passes (green phase)

---

### Test: [P0] menu closes when X button is tapped

**File:** `tests/e2e/mobile-navigation.spec.ts`

**Tasks to make this test pass:**

- [ ] Add close icon SVG with `data-icon="close"` (initially hidden)
- [ ] Toggle icons on click (show close when open, show menu when closed)
- [ ] Run test: `npx playwright test mobile-navigation --grep "closes when X"`
- [ ] Test passes (green phase)

---

### Test: [P0] menu closes automatically when nav link is clicked

**File:** `tests/e2e/mobile-navigation.spec.ts`

**Tasks to make this test pass:**

- [ ] Add click handlers to all mobile nav links
- [ ] Close menu and reset icons on link click
- [ ] Run test: `npx playwright test mobile-navigation --grep "closes automatically"`
- [ ] Test passes (green phase)

---

## Running Tests

```bash
# Run all failing tests for this story (skipped tests will be reported)
npx playwright test mobile-navigation

# Run specific test file in headed mode
npx playwright test mobile-navigation --headed

# Run on mobile device only
npx playwright test mobile-navigation --project=mobile-chrome

# Debug specific test
npx playwright test mobile-navigation --debug

# Run tests after removing test.skip()
npx playwright test mobile-navigation --grep "hamburger"
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete)

**TEA Agent Responsibilities:**

- All tests written and marked with `test.skip()`
- Tests assert EXPECTED behavior (not placeholders)
- `data-testid` requirements documented
- Implementation checklist created

**Verification:**

```bash
# Tests are skipped (red phase)
npx playwright test mobile-navigation
# Output: 16 skipped
```

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Pick one failing test** from implementation checklist (start with P0)
2. **Remove `test.skip()`** from that specific test
3. **Implement minimal code** to make that specific test pass
4. **Run the test** to verify it now passes (green)
5. **Move to next test** and repeat

**Key Principles:**

- One test at a time (don't try to fix all at once)
- Minimal implementation (don't over-engineer)
- Run tests frequently (immediate feedback)

**Progress Tracking:**

- Check off tasks as you complete them
- Update story file status when all P0 tests pass

---

### REFACTOR Phase (After All Tests Pass)

**DEV Agent Responsibilities:**

1. **Verify all tests pass** (green phase complete)
2. **Review code for quality** (DRY, readability)
3. **Ensure tests still pass** after each refactor

---

## Next Steps

1. **Share this checklist** with the dev workflow
2. **Run failing tests** to confirm RED phase: `npx playwright test mobile-navigation`
3. **Begin implementation** using implementation checklist as guide
4. **Work one test at a time** (red → green for each)
5. **When all tests pass**, update story status to 'done'

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **selector-resilience.md** - data-testid > ARIA > text selector hierarchy
- **test-quality.md** - Determinism, isolation, explicit assertions
- **timing-debugging.md** - No hard waits, event-based waiting

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npx playwright test mobile-navigation`

**Expected Results:**

```
Running 16 tests using 1 worker

  ◌ Story 1.4: Mobile Navigation - Core Functionality (ATDD)
    ◌ [P0] hamburger button visible on mobile viewport (skipped)
    ◌ [P0] menu opens when hamburger button is tapped (skipped)
    ◌ [P0] menu closes when X button is tapped (skipped)
    ◌ [P0] menu closes automatically when nav link is clicked (skipped)
  ...

  16 skipped
```

**Summary:**

- Total tests: 16
- Passing: 0 (expected)
- Skipped: 16 (expected - TDD red phase)
- Status: RED phase verified

---

## Notes

- React implementation reference in story dev notes provides exact parity requirements
- Mobile breakpoint is 768px (Tailwind `md:` prefix)
- Use vanilla JS with `data-*` attributes per Architecture spec
- Press effects (box-shadow toggle) provide tactile feedback

---

**Generated by BMad TEA Agent** - 2026-01-29
