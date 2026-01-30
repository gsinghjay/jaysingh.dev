# ATDD Checklist - Story 1.3: Implement Site Header and Footer

**Date:** 2026-01-29
**Author:** Jay
**Primary Test Level:** E2E

---

## Story Summary

Implement persistent header navigation and footer components for the jaysingh.dev static site.

**As a** site visitor
**I want** persistent header navigation and footer
**So that** I can navigate between all sections of the site

---

## Acceptance Criteria

1. **AC1:** Header displays navigation links for Home, Blog, Projects, Resume, Contact
2. **AC2:** Clean URL navigation (`/`, `/blog/`, `/projects/`, `/resume/`, `/contact/`)
3. **AC3:** Active page link is visually indicated with `is-active` class
4. **AC4:** Footer shows copyright notice and social links placeholder
5. **AC5:** Uses `{% include "partials/header.njk" %}` pattern (architecture compliance)

---

## Failing Tests Created (RED Phase)

### E2E Tests (22 tests)

**File:** `tests/e2e/header-footer.spec.ts` (200+ lines)

#### Header Navigation Tests

| Test | Priority | Status | Verifies |
|------|----------|--------|----------|
| header displays all navigation links | P0 | 🔴 RED | AC1: 5 nav links visible |
| navigation links use clean URLs | P0 | 🔴 RED | AC2: correct href attributes |
| clicking "Home" navigates to / | P0 | 🔴 RED | AC2: navigation works |
| clicking "Blog" navigates to /blog/ | P0 | 🔴 RED | AC2: navigation works |
| clicking "Projects" navigates to /projects/ | P0 | 🔴 RED | AC2: navigation works |
| clicking "Resume" navigates to /resume/ | P0 | 🔴 RED | AC2: navigation works |
| clicking "Contact" navigates to /contact/ | P0 | 🔴 RED | AC2: navigation works |

#### Active Page Indication Tests

| Test | Priority | Status | Verifies |
|------|----------|--------|----------|
| "Home" link shows active state on / | P1 | 🔴 RED | AC3: is-active class |
| "Blog" link shows active state on /blog/ | P1 | 🔴 RED | AC3: is-active class |
| "Projects" link shows active state on /projects/ | P1 | 🔴 RED | AC3: is-active class |
| "Resume" link shows active state on /resume/ | P1 | 🔴 RED | AC3: is-active class |
| "Contact" link shows active state on /contact/ | P1 | 🔴 RED | AC3: is-active class |
| active state is not color-only (accessible) | P1 | 🔴 RED | AC3: WCAG compliance |

#### Footer Tests

| Test | Priority | Status | Verifies |
|------|----------|--------|----------|
| footer displays copyright notice | P1 | 🔴 RED | AC4: © 2026 Jay Singh |
| footer displays social links | P1 | 🔴 RED | AC4: GitHub, LinkedIn, Email |
| external links have security attributes | P2 | 🔴 RED | AC4: rel="noopener noreferrer" |
| footer is consistent across all pages | P1 | 🔴 RED | AC4: same on all pages |

#### Keyboard Navigation Tests

| Test | Priority | Status | Verifies |
|------|----------|--------|----------|
| header navigation is keyboard accessible | P2 | 🔴 RED | WCAG: Tab navigation |
| focus state is visible on navigation links | P2 | 🔴 RED | WCAG: Focus indicator |
| navigation links are activated with Enter key | P2 | 🔴 RED | WCAG: Keyboard activation |

#### Accessibility Tests

| Test | Priority | Status | Verifies |
|------|----------|--------|----------|
| header has navigation landmark | P2 | 🔴 RED | ARIA: nav[aria-label] |
| header contains site logo/name linking to home | P2 | 🔴 RED | Logo links to / |

---

## Required data-testid Attributes

None required — tests use semantic selectors (ARIA roles, text content) per selector-resilience best practices.

### Selector Patterns Used

- `header nav, header [role="navigation"]` — Navigation container
- `getByRole('link', { name: 'Blog' })` — Nav links by accessible name
- `footer` — Footer element
- `getByText(/© 2026/)` — Copyright text
- `.is-active` class — Active page indication

---

## Implementation Checklist

### Phase 1: Header Partial (AC1, AC2, AC5)

**File:** `_includes/partials/header.njk`

- [ ] Create `_includes/partials/header.njk` file
- [ ] Add `<header>` with `<nav aria-label="Main navigation">`
- [ ] Add 5 navigation links with correct hrefs:
  - [ ] Home → `/`
  - [ ] Blog → `/blog/`
  - [ ] Projects → `/projects/`
  - [ ] Resume → `/resume/`
  - [ ] Contact → `/contact/`
- [ ] Style with Neubrutalist design (border-4 border-black, cream bg)
- [ ] Update `_includes/layouts/base.njk` to use `{% include "partials/header.njk" %}`
- [ ] Run tests: `npx playwright test header-footer --grep "navigation links"`
- [ ] ✅ P0 tests pass (7 tests)

### Phase 2: Page Shells (AC2)

**Files:** `blog.njk`, `projects.njk`, `resume.njk`, `contact.njk`

- [ ] Create `blog.njk` with `permalink: /blog/`
- [ ] Create `projects.njk` with `permalink: /projects/`
- [ ] Create `resume.njk` with `permalink: /resume/`
- [ ] Create `contact.njk` with `permalink: /contact/`
- [ ] Verify all pages use `layouts/base.njk`
- [ ] Run tests: `npx playwright test header-footer --grep "navigates to"`
- [ ] ✅ Navigation tests pass (5 tests)

### Phase 3: Active State (AC3)

**File:** `_includes/partials/header.njk`

- [ ] Use `page.url` to detect current page
- [ ] Add `is-active` class conditionally:
  ```nunjucks
  {% if page.url == item.url %}is-active{% endif %}
  ```
- [ ] Style `.is-active` with visible distinction (not color-only):
  - [ ] `bg-lime-400`
  - [ ] `border-black`
  - [ ] Bold text
- [ ] Run tests: `npx playwright test header-footer --grep "active state"`
- [ ] ✅ Active state tests pass (6 tests)

### Phase 4: Footer Partial (AC4, AC5)

**File:** `_includes/partials/footer.njk`

- [ ] Create `_includes/partials/footer.njk` file
- [ ] Add `<footer>` with `border-t-4 border-black`
- [ ] Add copyright: `© 2026 Jay Singh`
- [ ] Add social links section with `<nav aria-label="Social links">`:
  - [ ] GitHub link (`target="_blank" rel="noopener noreferrer"`)
  - [ ] LinkedIn link (`target="_blank" rel="noopener noreferrer"`)
  - [ ] Email link (mailto:)
- [ ] Update `_includes/layouts/base.njk` to use `{% include "partials/footer.njk" %}`
- [ ] Run tests: `npx playwright test header-footer --grep "footer"`
- [ ] ✅ Footer tests pass (4 tests)

### Phase 5: Keyboard & Accessibility (WCAG)

- [ ] Verify Tab order is logical (logo → nav links)
- [ ] Verify focus states are visible (4px black outline)
- [ ] Verify Enter key activates links
- [ ] Run tests: `npx playwright test header-footer --grep "keyboard\|landmark"`
- [ ] ✅ Accessibility tests pass (5 tests)

---

## Running Tests

```bash
# Run all failing tests for this story
npx playwright test header-footer.spec.ts

# Run specific test file
npx playwright test tests/e2e/header-footer.spec.ts

# Run tests in headed mode (see browser)
npx playwright test header-footer.spec.ts --headed

# Debug specific test
npx playwright test header-footer.spec.ts --debug

# Run with UI mode
npx playwright test header-footer.spec.ts --ui
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete) ✅

**TEA Agent Responsibilities:**

- ✅ All 22 tests written and marked with test.skip()
- ✅ Tests assert expected behavior (not placeholders)
- ✅ Semantic selectors used (ARIA roles, text)
- ✅ Implementation checklist created

**Verification:**

```bash
# Tests are skipped but syntax-valid
npx playwright test header-footer.spec.ts --list
```

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. Pick implementation phase from checklist (start with Phase 1)
2. Implement the code per checklist tasks
3. Remove `test.skip()` from related tests
4. Run tests to verify they pass
5. Move to next phase

**Key Principles:**

- One phase at a time (don't implement all at once)
- Run tests after each change
- Check off tasks as completed

---

### REFACTOR Phase (After All Tests Pass)

1. Review code for quality
2. Extract duplications
3. Ensure tests still pass
4. Ready for code review

---

## Knowledge Base References Applied

- **selector-resilience.md** — Semantic selectors (getByRole, getByText)
- **test-quality.md** — Deterministic assertions, no hard waits
- **component-tdd.md** — Red-Green-Refactor workflow

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npx playwright test header-footer.spec.ts --list`

**Expected Output:**

```
Listing tests:
  [chromium] › header-footer.spec.ts:31:3 › Story 1.3: Header Navigation (ATDD) › [P0] header displays all navigation links
  [chromium] › header-footer.spec.ts:44:3 › Story 1.3: Header Navigation (ATDD) › [P0] navigation links use clean URLs
  ... (22 tests total, all skipped)
```

**Summary:**

- Total tests: 22
- Passing: 0 (all skipped)
- Status: ✅ RED phase verified

---

## Notes

- This is a **static site story** — no API tests needed
- Tests use **ARIA roles** and **text content** for selector resilience
- Active state verification checks for **non-color-only** indication (WCAG)
- Footer social links are **placeholders** — URLs can be updated later

---

**Generated by BMad TEA Agent** - 2026-01-29
