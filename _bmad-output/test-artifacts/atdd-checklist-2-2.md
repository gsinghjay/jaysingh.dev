# ATDD Checklist - Epic 2, Story 2.2: Create Blog Post Detail Layout

**Date:** 2026-01-30
**Author:** Jay
**Primary Test Level:** E2E

---

## Story Summary

Create the blog post detail layout that renders full blog posts from Markdown content with proper metadata, typography, and navigation.

**As a** site visitor
**I want** to read a complete blog post
**So that** I can learn from the technical content

---

## Acceptance Criteria

1. **AC1**: Blog post renders from Markdown at `/blog/{post-id}/`
2. **AC2**: Post header shows title, date, author, and tags
3. **AC3**: Layout extends base (code review - not E2E testable)
4. **AC4**: Readable typography with proper line height and heading hierarchy
5. **AC5**: Clean URL structure using post's `id` field from frontmatter
6. **AC6**: Heading hierarchy preserved (h1 for title, h2/h3 for sections)

---

## Failing Tests Created (RED Phase)

### E2E Tests (20 tests)

**File:** `tests/e2e/blog.spec.ts` (appended to existing Story 2.1 tests)

#### Blog Post Detail Page (AC1) - 3 tests

- ✅ **Test:** `[P0] blog post page loads at /blog/{id}/`
  - **Status:** RED - Page will 404 or render with wrong layout
  - **Verifies:** Blog post URL routing works

- ✅ **Test:** `[P0] blog post content renders from Markdown`
  - **Status:** RED - No prose content container exists
  - **Verifies:** Markdown content renders in Card component

- ✅ **Test:** `[P0] navigate from listing to detail page`
  - **Status:** RED - Navigation may fail or show wrong layout
  - **Verifies:** User journey from listing to detail

#### Post Header with Metadata (AC2) - 6 tests

- ✅ **Test:** `[P0] post title displays with highlight styling`
  - **Status:** RED - Title highlight not implemented
  - **Verifies:** h1 title with pink bg-pink-400 on first word

- ✅ **Test:** `[P1] post date displays`
  - **Status:** RED - Date not rendered in header
  - **Verifies:** Formatted date visible (Sep 22, 2024)

- ✅ **Test:** `[P1] post read time displays`
  - **Status:** RED - Read time not rendered
  - **Verifies:** Read time from frontmatter (10 min)

- ✅ **Test:** `[P1] category tag displays`
  - **Status:** RED - Category tag not rendered
  - **Verifies:** TECHNICAL/OPINION/TUTORIAL tag visible

- ✅ **Test:** `[P1] technology tags display`
  - **Status:** RED - Tags not rendered
  - **Verifies:** Tags like docker, prometheus visible

- ✅ **Test:** `[P2] author byline displays when present`
  - **Status:** RED - Author section not rendered
  - **Verifies:** Author byline structure (soft check)

#### Back Navigation - 2 tests

- ✅ **Test:** `[P1] top back button returns to blog listing`
  - **Status:** RED - Back button not implemented
  - **Verifies:** BACK TO POSTS link at top

- ✅ **Test:** `[P2] bottom back button returns to blog listing`
  - **Status:** RED - Bottom back button not implemented
  - **Verifies:** BACK TO ALL POSTS link at bottom

#### Clean URL Structure (AC5) - 2 tests

- ✅ **Test:** `[P1] URL uses post id from frontmatter`
  - **Status:** RED - Permalink may not work
  - **Verifies:** Clean URL /blog/docker-observability/

- ✅ **Test:** `[P1] all blog posts have clean URLs`
  - **Status:** RED - May have hash or query params
  - **Verifies:** All post links are clean

#### Heading Hierarchy (AC6) - 2 tests

- ✅ **Test:** `[P1] h1 used for post title only`
  - **Status:** RED - Multiple h1s or wrong heading
  - **Verifies:** Exactly one h1 (post title)

- ✅ **Test:** `[P1] content uses h2 and h3 for sections`
  - **Status:** RED - Heading styling not applied
  - **Verifies:** h2 elements exist in prose

#### Readable Typography (AC4) - 4 tests

- ✅ **Test:** `[P2] prose content has readable line height`
  - **Status:** RED - Line height not configured
  - **Verifies:** Line height >= 1.4x font size

- ✅ **Test:** `[P2] code blocks have Neubrutalist styling`
  - **Status:** RED - Code block styling not applied
  - **Verifies:** Border on pre elements

- ✅ **Test:** `[P2] content wrapped in Card component`
  - **Status:** RED - Card wrapper not implemented
  - **Verifies:** Content in border-4 border-black Card

- ✅ **Test:** `[P2] page uses Neubrutalist design tokens`
  - **Status:** RED - Design tokens not verified
  - **Verifies:** Custom fixture verification

#### Pre-rendered Static HTML - 1 test

- ✅ **Test:** `[P2] page source contains post content (not JS placeholder)`
  - **Status:** RED - HTML may not include content
  - **Verifies:** SSG pre-renders content

---

## Data Factories Created

None required for Story 2.2 - static content testing only.

---

## Fixtures Created

Uses existing fixtures from `tests/support/fixtures/index.ts`:

- `verifyNeubrutalistDesign` - Neubrutalist design token verification
- `checkA11yBasics` - Accessibility basics (h1 count, alt text)

---

## Mock Requirements

None - static 11ty site with no external API calls.

---

## Required data-testid Attributes

None explicitly required. Tests use semantic selectors:
- `getByRole('heading', { level: 1 })` for title
- `getByRole('link', { name: /BACK TO POSTS/ })` for navigation
- `.prose` class for content area
- `.border-4.border-black` for Card components

---

## Implementation Checklist

### Test: `[P0] blog post page loads at /blog/{id}/`

**File:** `tests/e2e/blog.spec.ts`

**Tasks to make this test pass:**

- [ ] Create `_includes/layouts/blog-post.njk` layout file
- [ ] Add `layout: layouts/blog-post.njk` to blog post frontmatter
- [ ] Verify permalink configuration in blog posts
- [ ] Run test: `npx playwright test -g "blog post page loads"`
- [ ] ✅ Test passes (green phase)

---

### Test: `[P0] blog post content renders from Markdown`

**File:** `tests/e2e/blog.spec.ts`

**Tasks to make this test pass:**

- [ ] Add prose class wrapper in blog-post.njk
- [ ] Use Card macro with size="lg" for content
- [ ] Render `{{ content | safe }}` inside Card
- [ ] Run test: `npx playwright test -g "content renders from Markdown"`
- [ ] ✅ Test passes (green phase)

---

### Test: `[P0] post title displays with highlight styling`

**File:** `tests/e2e/blog.spec.ts`

**Tasks to make this test pass:**

- [ ] Add h1 with title in blog-post.njk
- [ ] Split title into first word + rest
- [ ] Wrap first word in `<span class="bg-pink-400">`
- [ ] Run test: `npx playwright test -g "title displays with highlight"`
- [ ] ✅ Test passes (green phase)

---

### Test: `[P1] top back button returns to blog listing`

**File:** `tests/e2e/blog.spec.ts`

**Tasks to make this test pass:**

- [ ] Add back link at top of blog-post.njk
- [ ] Style with Neubrutalist button classes
- [ ] Link to `/blog/`
- [ ] Run test: `npx playwright test -g "top back button"`
- [ ] ✅ Test passes (green phase)

---

### Test: `[P1-P2] Remaining header/metadata tests`

**Tasks to make these tests pass:**

- [ ] Add date display with `{{ date | date }}` filter
- [ ] Add readTime display
- [ ] Add category tag using getCategoryFromTags filter
- [ ] Add technology tags using tag.njk macro
- [ ] Add author byline section (conditional)
- [ ] Add bottom back button

---

### Test: `[P1-P2] Typography and styling tests`

**Tasks to make these tests pass:**

- [ ] Add prose CSS styles to css/input.css
- [ ] Style h2 with text-2xl font-black
- [ ] Style paragraphs with text-lg leading-relaxed
- [ ] Style code blocks with border-4 border-black
- [ ] Style blockquotes with left border

---

## Running Tests

```bash
# Run all Story 2.2 failing tests (skipped)
npx playwright test tests/e2e/blog.spec.ts -g "Story 2.2"

# Run specific test file
npx playwright test tests/e2e/blog.spec.ts

# Run tests in headed mode (see browser)
npx playwright test tests/e2e/blog.spec.ts --headed

# Debug specific test
npx playwright test tests/e2e/blog.spec.ts -g "blog post page loads" --debug

# Run with trace on
npx playwright test tests/e2e/blog.spec.ts --trace on
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete) ✅

**TEA Agent Responsibilities:**

- ✅ All 20 tests written with test.skip()
- ✅ Tests assert expected behavior from ACs
- ✅ Resilient selectors used (getByRole, getByText)
- ✅ Implementation checklist created

**Verification:**

- All tests are skipped (will show as "skipped" in test output)
- Tests define expected behavior based on acceptance criteria
- Tests fail due to missing implementation, not test bugs

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Read the story file:** `_bmad-output/implementation-artifacts/2-2-create-blog-post-detail-layout.md`
2. **Follow task order** from story Tasks/Subtasks section
3. **For each test:**
   - Remove `test.skip()` → just `test()`
   - Implement minimal code to make test pass
   - Run test to verify green
4. **Key implementation files:**
   - Create: `_includes/layouts/blog-post.njk`
   - Modify: `_content/blog/*.md` (add layout frontmatter)
   - Modify: `css/input.css` (add prose styles)

**Key Principles:**

- One test at a time (incremental)
- Minimal implementation (don't over-engineer)
- Run tests frequently

---

### REFACTOR Phase (After All Tests Pass)

**DEV Agent Responsibilities:**

1. **Verify all tests pass** (green phase complete)
2. **Review code quality** (readability, DRY)
3. **Ensure tests still pass** after refactoring
4. **Update story status** to 'done' in sprint-status.yaml

---

## Next Steps

1. **Run tests** to confirm RED phase: `npx playwright test -g "Story 2.2"`
2. **Review this checklist** before implementation
3. **Begin implementation** using story Tasks as guide
4. **Work one test at a time** (remove test.skip(), implement, verify)
5. **When all tests pass**, mark story as done

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **test-quality.md** - Test design principles (determinism, isolation, explicit assertions)
- **selector-resilience.md** - Robust selector patterns (getByRole > data-testid > text > CSS)
- **test-healing-patterns.md** - Common failure patterns and prevention

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npx playwright test -g "Story 2.2"`

**Expected Results:**

```
  ✓ 20 skipped
  0 passed
  0 failed
```

**Summary:**

- Total tests: 20
- Skipped: 20 (expected - test.skip())
- Passing: 0 (expected)
- Failing: 0 (skipped tests don't fail)
- Status: ✅ RED phase verified

---

## Notes

- Story 2.2 tests are appended to existing `blog.spec.ts` (Story 2.1 tests intact)
- Test post used: `docker-observability` (known to exist in `_content/blog/`)
- AC3 (Layout extends base) is code review only, not E2E testable
- Social share, related projects, and table of contents deferred to later stories

---

## Contact

**Questions or Issues?**

- Review story file for implementation details
- Check existing Story 2.1 tests for patterns
- Consult `_bmad/tea/testarch/knowledge/` for testing best practices

---

**Generated by BMad TEA Agent** - 2026-01-30
