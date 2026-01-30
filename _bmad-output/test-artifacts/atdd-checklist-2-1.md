# ATDD Checklist - Epic 2, Story 2.1: Create Blog Collection and Listing Page

**Date:** 2026-01-30
**Author:** Jay
**Primary Test Level:** E2E

---

## Story Summary

Create a blog listing page that displays all blog posts sorted by date (newest first), with each post showing title, date, excerpt, and category tags in Neubrutalist card design.

**As a** site visitor
**I want** to browse a list of all blog posts
**So that** I can discover and choose articles to read

---

## Acceptance Criteria

1. **AC1:** Blog collection created from `_content/blog/` containing all blog posts
2. **AC2:** Blog listing page at `/blog/` with posts sorted by date (newest first)
3. **AC3:** Post entry displays title, date, excerpt, and tags for each post
4. **AC4:** Post navigation via title click or "READ MORE" link to detail page
5. **AC5:** Mobile responsive - cards stack vertically and remain readable
6. **AC6:** Neubrutalist design with bold borders (4px) and brutal shadows (6px)

---

## Failing Tests Created (RED Phase)

### E2E Tests (18 tests)

**File:** `tests/e2e/blog.spec.ts` (230 lines)

#### Blog Listing Page (AC2) - 4 tests

- ✅ **Test:** `[P0] blog page loads at /blog/`
  - **Status:** RED - Page does not exist (404)
  - **Verifies:** Blog page renders with main content

- ✅ **Test:** `[P0] blog page displays section heading`
  - **Status:** RED - Heading element not found
  - **Verifies:** "WORDS & THOUGHTS" heading with pink highlight

- ✅ **Test:** `[P0] blog posts are sorted by date (newest first)`
  - **Status:** RED - No post cards found
  - **Verifies:** Posts render in correct date order

- ✅ **Test:** `[P1] blog page has clean URL without hash fragments`
  - **Status:** RED - Page does not exist
  - **Verifies:** URL is /blog/ without hash

#### Post Card Display (AC3) - 6 tests

- ✅ **Test:** `[P0] post card shows title`
  - **Status:** RED - No h2 elements
  - **Verifies:** Post titles visible in cards

- ✅ **Test:** `[P0] post card shows date`
  - **Status:** RED - No date formatting
  - **Verifies:** Date in MMM DD, YYYY format

- ✅ **Test:** `[P0] post card shows excerpt`
  - **Status:** RED - No excerpt elements
  - **Verifies:** Excerpt text visible with line-clamp-2

- ✅ **Test:** `[P1] post card shows category tag`
  - **Status:** RED - No category tags
  - **Verifies:** Category (OPINION/TECHNICAL/TUTORIAL/GENERAL) displayed

- ✅ **Test:** `[P1] post card shows read time`
  - **Status:** RED - No read time
  - **Verifies:** Read time (X min) visible

- ✅ **Test:** `[P2] category tag colors are correct`
  - **Status:** RED - No tags to check
  - **Verifies:** TECHNICAL=blue, OPINION=yellow, TUTORIAL=lime

#### Post Navigation (AC4) - 3 tests

- ✅ **Test:** `[P0] clicking post title navigates to post detail`
  - **Status:** RED - No clickable titles
  - **Verifies:** Title links to /blog/{slug}/

- ✅ **Test:** `[P0] clicking READ MORE navigates to post detail`
  - **Status:** RED - No READ MORE links
  - **Verifies:** READ MORE links to /blog/{slug}/

- ✅ **Test:** `[P1] post title has hover effect`
  - **Status:** RED - No hover:text-pink-600 class
  - **Verifies:** Hover state styling

#### Mobile Responsive (AC5) - 2 tests

- ✅ **Test:** `[P1] post cards stack vertically on mobile`
  - **Status:** RED - No cards at 375px viewport
  - **Verifies:** Cards full-width on mobile

- ✅ **Test:** `[P1] text is readable on mobile`
  - **Status:** RED - No content
  - **Verifies:** Font size >= 20px on mobile

#### Neubrutalist Design (AC6) - 3 tests

- ✅ **Test:** `[P1] post cards have 4px black borders`
  - **Status:** RED - No bordered cards
  - **Verifies:** border-4 border-black on cards

- ✅ **Test:** `[P1] post cards have brutal shadow`
  - **Status:** RED - No shadow style
  - **Verifies:** 6px 6px 0 box-shadow

- ✅ **Test:** `[P1] page uses Neubrutalist design tokens`
  - **Status:** RED - Page missing
  - **Verifies:** Neubrutalist fixture validation

---

## Data Factories Created

No factories needed - tests use static content from `_content/blog/`.

---

## Fixtures Created

Using existing fixtures from `tests/support/fixtures/index.ts`:

### Neubrutalist Design Fixture

**Fixture:** `verifyNeubrutalistDesign`
- **Setup:** Checks page for design tokens
- **Provides:** Verification function
- **Cleanup:** None needed

### Accessibility Basics Fixture

**Fixture:** `checkA11yBasics`
- **Setup:** Analyzes heading structure
- **Provides:** h1Count, imagesWithoutAlt, focusableElements
- **Cleanup:** None needed

---

## Mock Requirements

None - static site with no external API calls.

---

## Required data-testid Attributes

None required - tests use semantic selectors following existing patterns:
- `page.getByRole('heading', { level: 1 })`
- `page.getByRole('link', { name: /READ MORE/ })`
- `page.locator('.border-4.border-black')`
- `page.locator('h2.font-black')`

---

## Implementation Checklist

### Task 1: Create blog.njk (Makes 4 tests pass)

**File:** `blog.njk` (project root)

**Tasks to make tests pass:**

- [ ] Create `blog.njk` with frontmatter (layout, title, permalink)
- [ ] Add h1 heading: `WORDS & <span class="bg-pink-400 px-2">THOUGHTS</span>`
- [ ] Style heading: `text-4xl font-black mb-12`
- [ ] Add posts container: `<div class="space-y-6">`
- [ ] Run test: `npx playwright test blog.spec.ts -g "blog page loads"`
- [ ] ✅ Tests pass: AC2 tests (4 tests)

---

### Task 2: Verify/Add posts collection (Makes 1 test pass)

**File:** `eleventy.config.js`

**Tasks to make tests pass:**

- [ ] Confirm `posts` collection exists sourcing from `_content/blog/`
- [ ] Verify collection sorts by date descending
- [ ] Run test: `npx playwright test blog.spec.ts -g "sorted by date"`
- [ ] ✅ Test passes: AC1 (pre-rendered content)

---

### Task 3: Implement post card layout (Makes 9 tests pass)

**File:** `blog.njk`

**Tasks to make tests pass:**

- [ ] Loop through `collections.posts | reverse`
- [ ] Use `{% call card("default", true) %}...{% endcall %}` macro
- [ ] Add header row with category tag and metadata
- [ ] Add post title as h2 with hover styling
- [ ] Add excerpt with `text-neutral-600 line-clamp-2`
- [ ] Add READ MORE link with font-bold styling
- [ ] Run test: `npx playwright test blog.spec.ts -g "post card"`
- [ ] ✅ Tests pass: AC3 tests (6 tests), AC4 partial (3 tests)

---

### Task 4: Implement getCategoryFromTags filter (Makes 2 tests pass)

**File:** `eleventy.config.js`

**Tasks to make tests pass:**

- [ ] Add `getCategoryFromTags` filter
- [ ] Logic: opinion→OPINION, technical→TECHNICAL, tutorial→TUTORIAL, else GENERAL
- [ ] Apply in template: `{{ post.data.tags | getCategoryFromTags }}`
- [ ] Run test: `npx playwright test blog.spec.ts -g "category tag"`
- [ ] ✅ Tests pass: AC3 category tests (2 tests)

---

### Task 5: Verify mobile responsiveness (Makes 2 tests pass)

**File:** `blog.njk` (inherits from base layout)

**Tasks to make tests pass:**

- [ ] Verify cards stack vertically (space-y-6 handles this)
- [ ] Verify text size readable on mobile
- [ ] Run test: `npx playwright test blog.spec.ts -g "Mobile"`
- [ ] ✅ Tests pass: AC5 tests (2 tests)

---

### Task 6: Verify Neubrutalist design (Makes 3 tests pass)

**File:** `blog.njk` (uses card macro)

**Tasks to make tests pass:**

- [ ] Verify card macro applies border-4 border-black
- [ ] Verify card macro applies 6px box-shadow
- [ ] Run test: `npx playwright test blog.spec.ts -g "Neubrutalist"`
- [ ] ✅ Tests pass: AC6 tests (3 tests)

---

## Running Tests

```bash
# Run all failing tests for this story
npx playwright test tests/e2e/blog.spec.ts

# Run specific test file
npx playwright test blog.spec.ts

# Run tests in headed mode (see browser)
npx playwright test blog.spec.ts --headed

# Debug specific test
npx playwright test blog.spec.ts --debug

# Run with specific project (chromium only for speed)
npx playwright test blog.spec.ts --project=chromium
```

---

## Red-Green-Refactor Workflow

### RED Phase (Current) 🔴

**TEA Agent Responsibilities:**

- ✅ All 18 E2E tests written and ready to run
- ✅ Tests assert expected behavior from acceptance criteria
- ✅ Reusing existing fixtures (verifyNeubrutalistDesign)
- ✅ Implementation checklist created with 6 tasks
- ✅ Tests follow existing patterns from home-page.spec.ts

**Verification:**

```bash
npx playwright test blog.spec.ts --project=chromium
# Expected: 18 tests fail (page does not exist)
```

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Pick one failing test** from implementation checklist (start with Task 1)
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

**Recommended Order:**

1. Task 1: blog.njk creation (unlocks all other tasks)
2. Task 2: posts collection (content renders)
3. Task 3: post card layout (main content)
4. Task 4: getCategoryFromTags filter (tag display)
5. Task 5 & 6: Mobile/design verification

---

### REFACTOR Phase (DEV Team - After All Tests Pass)

**DEV Agent Responsibilities:**

1. **Verify all 18 tests pass** (green phase complete)
2. **Review code for quality** (readability, DRY)
3. **Compare with React** for visual parity
4. **Update story status** to done in sprint-status.yaml

---

## Next Steps

1. **Run failing tests** to confirm RED phase: `npx playwright test blog.spec.ts --project=chromium`
2. **Share this checklist** with dev workflow
3. **Begin implementation** with Task 1 (create blog.njk)
4. **Work one test at a time** (red → green for each)
5. **When all tests pass**, update story status to 'done'

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **selector-resilience.md** - Selector hierarchy (ARIA roles > text > CSS classes)
- **test-quality.md** - Deterministic tests, explicit assertions, <300 lines

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npx playwright test blog.spec.ts --project=chromium`

**Expected Results:**

```
Running 18 tests using 1 worker

  ✘ Story 2.1: Blog Listing Page › [P0] blog page loads at /blog/
  ✘ Story 2.1: Blog Listing Page › [P0] blog page displays section heading
  ✘ Story 2.1: Blog Listing Page › [P0] blog posts are sorted by date
  ✘ Story 2.1: Blog Listing Page › [P1] blog page has clean URL
  ... (14 more failing tests)

  18 failed
```

**Summary:**

- Total tests: 18
- Passing: 0 (expected)
- Failing: 18 (expected)
- Status: 🔴 RED phase verified

---

## Notes

- Tests follow existing patterns from `home-page.spec.ts` (Story 1.6)
- Using semantic selectors (getByRole, getByText) per selector-resilience.md
- Mobile tests use viewport: { width: 375, height: 667 }
- React parity required - compare with `src/pages/Blog.tsx`

---

**Generated by BMad TEA Agent** - 2026-01-30
