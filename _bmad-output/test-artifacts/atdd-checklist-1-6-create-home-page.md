# ATDD Checklist - Story 1.6: Create Home Page

**Date:** 2026-01-29
**Author:** Jay
**Primary Test Level:** E2E
**TDD Phase:** RED (Failing Tests)

---

## Story Summary

**As a** site visitor
**I want** a complete home page
**So that** I can see an overview of Jay's portfolio and navigate to other sections

---

## Acceptance Criteria

1. **AC1: Home Page at Root URL** - Hero section with avatar, heading, tagline, tech tags
2. **AC2: Clean URL** - Root URL without hash fragments
3. **AC3: Neubrutalist Design (Desktop)** - Design tokens, brutal shadows, borders
4. **AC4: Responsive Design (Mobile)** - Stacked layout, readable on < 768px
5. **AC5: Pre-rendered Static HTML** - Content in page source, no SPA placeholder
6. **AC6: Proper Heading Hierarchy** - Single h1, proper h2/h3 structure

---

## Failing Tests Created (RED Phase)

### E2E Tests (31 tests)

**File:** `tests/e2e/home-page.spec.ts` (340 lines)

| Priority | Test | Status | Verifies |
|----------|------|--------|----------|
| P0 | hero section displays emoji avatar | RED | AC1 - Avatar with waving hand |
| P0 | hero section displays main heading | RED | AC1 - "I BUILD STUFF FOR THE WEB" |
| P0 | hero section displays tagline | RED | AC1 - Developer tagline |
| P0 | CTA buttons grid displays all three buttons | RED | AC1 - VIEW WORK, READ BLOG, HIRE ME |
| P0 | CTA buttons navigate to correct pages | RED | AC1 - Navigation hrefs |
| P0 | page has exactly one h1 element | PASS | AC6 - Single h1 (existing) |
| P1 | hero section displays tech stack tags | RED | AC1 - React, Python, etc. |
| P1 | hero section wrapped in Card component | RED | AC3 - Card with lg shadow |
| P1 | CTA buttons have Neubrutalist styling | RED | AC3 - Color variants |
| P1 | CTA buttons have 6px brutal shadow | RED | AC3 - Shadow styling |
| P1 | clicking VIEW WORK navigates to projects | RED | AC1 - Navigation works |
| P1 | Featured Posts section displays | RED | AC1, AC6 - Section heading |
| P1 | Featured Work section displays | RED | AC1, AC6 - Section heading |
| P1 | home page URL is clean | PASS | AC2 - Clean URL (existing) |
| P1 | home page accessible via root URL | PASS | AC2 - Root access (existing) |
| P1 | page uses Neubrutalist design tokens | PASS | AC3 - Design system (existing) |
| P1 | cards have 4px black borders | PASS | AC3 - Border styling (existing) |
| P1 | hero section stacks vertically on mobile | RED | AC4 - Mobile layout |
| P1 | CTA buttons stack in single column on mobile | RED | AC4 - Mobile grid |
| P1 | text is readable on mobile | RED | AC4 - Font sizing |
| P1 | h1 contains the main hero heading | RED | AC6 - Correct h1 content |
| P1 | section headings use h2 | RED | AC6 - Heading structure |
| P2 | Featured post card shows metadata | RED | AC1 - Post details |
| P2 | Featured post has READ MORE link | RED | AC1 - Post link |
| P2 | Featured project cards show details | RED | AC1 - Project info |
| P2 | Featured project cards are clickable | RED | AC1 - Project links |
| P2 | hover effects work on interactive elements | RED | AC3 - Hover states |
| P2 | page source contains hero content | RED | AC5 - Pre-rendered |
| P2 | page source contains tech stack tags | RED | AC5 - Pre-rendered |
| P2 | content titles use h3 | RED | AC6 - Heading levels |
| P2 | all CTA buttons are keyboard accessible | RED | A11y - Keyboard nav |

**Current Results:** 6 passing, 25 failing (RED phase verified)

---

## Implementation Checklist

### Task 1: Create Nunjucks Component Macros

- [ ] Create `_includes/components/button.njk` macro
  - Variants: lime, pink, yellow, blue, secondary
  - Arrow suffix support
  - 6px brutal shadow
  - Press effect on active
- [ ] Create `_includes/components/tag.njk` macro
  - Tech stack colors (React→pink, Python→blue, etc.)
  - Category colors
- [ ] Create `_includes/components/card.njk` macro
  - Sizes: sm, default, lg
  - Shadow scaling by size
  - Optional clickable state
- [ ] Run tests: `npx playwright test tests/e2e/home-page.spec.ts --grep "macro"`

### Task 2: Implement Hero Section

- [ ] Replace demo content in `index.njk`
- [ ] Add avatar box (128x128px, lime-400 bg, 4px border, 4px shadow)
- [ ] Add waving hand emoji "👋"
- [ ] Add h1: "I BUILD STUFF FOR THE WEB" with yellow highlight on "STUFF"
- [ ] Add tagline paragraph
- [ ] Add tech stack tags using tag macro
- [ ] Wrap in Card component (lg size)
- [ ] Run tests: `npx playwright test tests/e2e/home-page.spec.ts --grep "Hero"`

### Task 3: Implement CTA Buttons Grid

- [ ] Add 3-column grid (1-col mobile, 3-col desktop)
- [ ] Add VIEW WORK button (lime) → /projects/
- [ ] Add READ BLOG button (pink) → /blog/
- [ ] Add HIRE ME button (yellow) → /contact/
- [ ] Apply button macro with arrows
- [ ] Run tests: `npx playwright test tests/e2e/home-page.spec.ts --grep "CTA"`

### Task 4: Create Sample Featured Content

- [ ] Create `content/blog/sample-post.md` with `featured: true`
- [ ] Create `content/projects/sample-project-1.md` with `featured: true`
- [ ] Create `content/projects/sample-project-2.md` with `featured: true`
- [ ] Configure collections in `eleventy.config.js` if needed
- [ ] Run tests: `npx playwright test tests/e2e/home-page.spec.ts --grep "Featured"`

### Task 5: Implement Featured Sections

- [ ] Add "Featured Posts" h2 section
- [ ] Display featured blog post (conditional)
- [ ] Add post title (h3), date, read time, excerpt
- [ ] Add READ MORE link
- [ ] Add "Featured Work" h2 section
- [ ] Display top 2 featured projects (conditional)
- [ ] Add project number (01, 02), title, description, tech tags
- [ ] Make project cards clickable
- [ ] Run tests: `npx playwright test tests/e2e/home-page.spec.ts --grep "Featured"`

### Task 6: Verify All Tests Pass

- [ ] Run full test suite: `npx playwright test tests/e2e/home-page.spec.ts`
- [ ] Verify 0 failures (GREEN phase)
- [ ] Run mobile viewport tests
- [ ] Verify pre-rendered HTML checks
- [ ] Verify heading hierarchy

---

## Running Tests

```bash
# Run all home page tests (RED phase - expect failures)
npx playwright test tests/e2e/home-page.spec.ts

# Run specific test group
npx playwright test tests/e2e/home-page.spec.ts --grep "Hero"
npx playwright test tests/e2e/home-page.spec.ts --grep "CTA"
npx playwright test tests/e2e/home-page.spec.ts --grep "Featured"

# Run in headed mode (see browser)
npx playwright test tests/e2e/home-page.spec.ts --headed

# Run with debug inspector
npx playwright test tests/e2e/home-page.spec.ts --debug

# Run mobile viewport tests
npx playwright test tests/e2e/home-page.spec.ts --grep "Mobile"
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete)

**TEA Agent Responsibilities:**

- [x] All tests written and failing
- [x] Test file created: `tests/e2e/home-page.spec.ts`
- [x] Acceptance criteria covered
- [x] Implementation checklist created

**Verification:**

```
Test Results (RED):
  Passed: 6 (existing infrastructure)
  Failed: 25 (expected - feature not implemented)
```

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Pick one failing test group** from implementation checklist
2. **Read the test** to understand expected behavior
3. **Implement minimal code** to make tests pass
4. **Run the tests** to verify green
5. **Check off the task** in implementation checklist
6. **Move to next group** and repeat

**Key Principles:**

- One test group at a time
- Minimal implementation (don't over-engineer)
- Run tests frequently
- Use implementation checklist as roadmap

---

### REFACTOR Phase (After All Tests Pass)

**DEV Agent Responsibilities:**

1. **Verify all 31 tests pass** (green phase complete)
2. **Review code quality** (readability, maintainability)
3. **Extract duplications** if any
4. **Ensure tests still pass** after each refactor
5. **Run Lighthouse audit** for performance

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **test-quality.md** - Deterministic tests, explicit assertions, isolation
- **selector-resilience.md** - Selector hierarchy (data-testid > ARIA > text > CSS)
- **component-tdd.md** - Red-Green-Refactor cycle

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npx playwright test tests/e2e/home-page.spec.ts --project=chromium`

**Results:**

```
Running 31 tests using 8 workers
  6 passed
  25 failed
```

**Summary:**

- Total tests: 31
- Passing: 6 (existing infrastructure)
- Failing: 25 (expected)
- Status: RED phase verified

---

## Notes

- Tests follow existing project patterns (no `test.skip()`)
- Tests fail naturally because implementation doesn't exist
- 6 passing tests verify existing infrastructure (clean URLs, design tokens)
- Mobile tests use viewport override: `{ width: 375, height: 667 }`
- Custom fixtures used: `verifyNeubrutalistDesign`, `checkA11yBasics`

---

**Generated by BMad TEA Agent** - 2026-01-29
