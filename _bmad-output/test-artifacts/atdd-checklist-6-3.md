# ATDD Checklist - Epic 6, Story 6.3: Implement Meta Tags and Open Graph

**Date:** 2026-02-02
**Author:** Jay
**Primary Test Level:** Unit (Vitest) + E2E (Playwright)

---

## Story Summary

Implement comprehensive meta tags and Open Graph tags for SEO and social media sharing. Blog posts should be identified as "article" type with published dates, while other pages use "website" type. Twitter Card tags should be added for rich social previews.

**As a** site visitor sharing content
**I want** rich previews when sharing links
**So that** shared content looks professional on social media

---

## Acceptance Criteria

1. **AC1:** Basic Meta Tags Present (`<title>`, `<meta description>`, `<link canonical>`)
2. **AC2:** Unique Meta Tags Per Page (no duplicate titles/descriptions)
3. **AC3:** Open Graph Tags Present (`og:title`, `og:description`, `og:url`, `og:type`)
4. **AC4:** Article Type for Blog Posts (`og:type="article"`, `article:published_time`)
5. **AC5:** Website Type for Home Page (`og:type="website"`)
6. **AC6:** Social Media Preview (Twitter Card tags)
7. **AC7:** Reusable Partial Implementation (`partials/meta.njk`)
8. **AC8:** Direct Landing Works (HTTP 200, no redirects, full content)

---

## Failing Tests Created (RED Phase)

### Unit Tests (21 failing / 37 passing)

**File:** `tests/unit/meta-tags-validation.spec.ts` (~280 lines)

**Failing Tests:**

- **Test:** [P1] blog post should have og:type="article"
  - **Status:** RED - Returns "website" instead of "article"
  - **Verifies:** AC4 - Blog posts identified as articles

- **Test:** [P1] blog post should have article:published_time
  - **Status:** RED - Tag not found
  - **Verifies:** AC4 - Published date for articles

- **Test:** [P2] blog post should have article:author
  - **Status:** RED - Tag not found
  - **Verifies:** AC4 - Author attribution

- **Test:** [P1] all blog posts should have og:type="article"
  - **Status:** RED - All return "website"
  - **Verifies:** AC4 - Consistent article typing

- **Test:** [P1] should have twitter:card (5 pages)
  - **Status:** RED - Tags missing
  - **Verifies:** AC6 - Twitter Card presence

- **Test:** [P1] should have twitter:title (5 pages)
  - **Status:** RED - Tags missing
  - **Verifies:** AC6 - Twitter title

- **Test:** [P1] should have twitter:description (5 pages)
  - **Status:** RED - Tags missing
  - **Verifies:** AC6 - Twitter description

- **Test:** [P2] should have twitter:image
  - **Status:** RED - Tag missing
  - **Verifies:** AC6 - Social image

- **Test:** [P2] all pages should have consistent meta tag structure
  - **Status:** RED - Twitter tags missing
  - **Verifies:** AC7 - Partial consistency

**Passing Tests (Already Implemented):**

- ✅ AC1: Basic meta tags (title, description, canonical) - All pages
- ✅ AC2: Unique titles and descriptions
- ✅ AC3: Basic Open Graph tags (og:title, og:description, og:url, og:type)
- ✅ AC5: Home/listing pages have og:type="website"
- ✅ AC7: og:site_name on all pages

### E2E Tests (16 tests)

**File:** `tests/e2e/meta-tags.spec.ts` (~165 lines)

- ✅ **Test:** Basic meta tags HTTP accessibility (all pages)
  - **Status:** Expected to PASS
  - **Verifies:** AC1, AC8

- ✅ **Test:** Open Graph tags HTTP accessibility (all pages)
  - **Status:** Expected to PASS (basic OG tags)
  - **Verifies:** AC3

- **Test:** Blog post og:type="article" via HTTP
  - **Status:** RED - Returns "website"
  - **Verifies:** AC4

- **Test:** Blog post article:published_time via HTTP
  - **Status:** RED - Tag missing
  - **Verifies:** AC4

- **Test:** Twitter Card tags via HTTP (all pages)
  - **Status:** RED - Tags missing
  - **Verifies:** AC6

- ✅ **Test:** Direct landing HTTP 200
  - **Status:** Expected to PASS
  - **Verifies:** AC8

---

## Data Factories Created

**Not Required** - This story tests static HTML output, no dynamic test data needed.

---

## Fixtures Created

**Using Existing:** `tests/support/fixtures/index.ts`

No new fixtures required - tests use Playwright's built-in `request` fixture for HTTP validation and Vitest's `fs` module for build output validation.

---

## Mock Requirements

**None Required** - Testing static HTML files and HTTP responses from 11ty build output.

---

## Required data-testid Attributes

**None Required** - Meta tags are in `<head>` and validated via HTML parsing, not UI interaction.

---

## Implementation Checklist

### Test: blog post og:type="article"

**File:** `tests/unit/meta-tags-validation.spec.ts`

**Tasks to make this test pass:**

- [ ] Update `_includes/layouts/blog-post.njk` frontmatter to set `og_type: article`
- [ ] Verify `meta.njk` uses `{{ og_type | default('website') }}` (already does)
- [ ] Run test: `npx vitest run tests/unit/meta-tags-validation.spec.ts -t "og:type"`
- [ ] ✅ Test passes (green phase)

---

### Test: article:published_time

**File:** `tests/unit/meta-tags-validation.spec.ts`

**Tasks to make this test pass:**

- [ ] Extend `date` filter in `eleventy.config.js` with `'iso'` format option
- [ ] Add to `meta.njk`:
  ```nunjucks
  {% if og_type == "article" %}
  <meta property="article:published_time" content="{{ date | date('iso') }}">
  {% endif %}
  ```
- [ ] Run test: `npx vitest run tests/unit/meta-tags-validation.spec.ts -t "published_time"`
- [ ] ✅ Test passes (green phase)

---

### Test: article:author

**File:** `tests/unit/meta-tags-validation.spec.ts`

**Tasks to make this test pass:**

- [ ] Add to `meta.njk` (inside `og_type == "article"` block):
  ```nunjucks
  <meta property="article:author" content="{{ site.author }}">
  ```
- [ ] Run test: `npx vitest run tests/unit/meta-tags-validation.spec.ts -t "author"`
- [ ] ✅ Test passes (green phase)

---

### Test: Twitter Card tags (all pages)

**File:** `tests/unit/meta-tags-validation.spec.ts`

**Tasks to make this test pass:**

- [ ] Add to `meta.njk`:
  ```nunjucks
  {# Twitter Card meta tags #}
  <meta name="twitter:card" content="{% if og_image or site.socialImage %}summary_large_image{% else %}summary{% endif %}">
  <meta name="twitter:title" content="{% if title %}{{ title }} | {% endif %}{{ site.shortTitle }}">
  <meta name="twitter:description" content="{{ metaDescription or description or site.description }}">
  {% if site.socialImage %}
  <meta name="twitter:image" content="{{ site.baseUrl }}{{ site.socialImage }}">
  {% endif %}
  ```
- [ ] Run test: `npx vitest run tests/unit/meta-tags-validation.spec.ts -t "twitter"`
- [ ] ✅ Test passes (green phase)

---

### Test: Unique descriptions for static pages

**File:** `tests/unit/meta-tags-validation.spec.ts`

**Tasks to make this test pass:**

- [ ] Add `metaDescription` to `blog.njk` frontmatter
- [ ] Add `metaDescription` to `projects.njk` frontmatter
- [ ] Add `metaDescription` to `resume.njk` frontmatter
- [ ] Add `metaDescription` to `contact.njk` frontmatter
- [ ] Run test: `npx vitest run tests/unit/meta-tags-validation.spec.ts -t "unique"`
- [ ] ✅ Test passes (green phase)

---

## Running Tests

```bash
# Run all unit tests for this story
npx vitest run tests/unit/meta-tags-validation.spec.ts

# Run specific test by name
npx vitest run tests/unit/meta-tags-validation.spec.ts -t "article"

# Run all E2E tests for this story
npx playwright test tests/e2e/meta-tags.spec.ts

# Run E2E tests in headed mode (see browser)
npx playwright test tests/e2e/meta-tags.spec.ts --headed

# Run tests with coverage
npx vitest run tests/unit/meta-tags-validation.spec.ts --coverage
```

---

## Red-Green-Refactor Workflow

### RED Phase (Current) ✅

**TEA Agent Responsibilities:**

- ✅ All tests written (58 total)
- ✅ 21 tests failing (expected - missing implementation)
- ✅ 37 tests passing (partial implementation exists)
- ✅ Implementation checklist created

**Verification:**

```
Unit Tests: 37 passed, 21 failed
E2E Tests: Ready to run (some will fail)
```

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Pick one failing test** from implementation checklist
2. **Read the test** to understand expected behavior
3. **Implement minimal code** to make that specific test pass
4. **Run the test** to verify it now passes (green)
5. **Check off the task** in implementation checklist
6. **Move to next test** and repeat

**Recommended Order:**

1. First: `og_type: article` in blog-post.njk (unlocks AC4)
2. Second: `date` filter ISO format (enables article:published_time)
3. Third: article-specific meta tags in meta.njk
4. Fourth: Twitter Card tags in meta.njk
5. Fifth: metaDescription for static pages

---

### REFACTOR Phase (DEV Team - After All Tests Pass)

1. **Verify all tests pass** (green phase complete)
2. **Review code for quality** (DRY, readability)
3. **Optimize if needed** (template performance)
4. **Ensure tests still pass** after each refactor

---

## Next Steps

1. **Review this checklist** with team
2. **Run failing tests** to confirm RED phase: `npx vitest run tests/unit/meta-tags-validation.spec.ts`
3. **Begin implementation** using implementation checklist as guide
4. **Work one test at a time** (red → green for each)
5. **When all tests pass**, refactor code for quality
6. **When refactoring complete**, update story status to 'done'

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **test-quality.md** - Deterministic tests, Given-When-Then format, explicit assertions
- **test-levels-framework.md** - Unit vs E2E selection for static content testing

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npx vitest run tests/unit/meta-tags-validation.spec.ts`

**Results:**

```
✓ 37 tests passed
✕ 21 tests failed

Failing categories:
- Article type tests (4 failures)
- Twitter Card tests (16 failures)
- Consistency test (1 failure)
```

**Summary:**

- Total tests: 58
- Passing: 37 (partial implementation exists)
- Failing: 21 (expected - TDD red phase)
- Status: ✅ RED phase verified

---

## Notes

- Partial implementation exists (basic meta tags, OG tags)
- Main gaps: article type for blog posts, Twitter Card tags
- SVG social image may need PNG alternative for full Twitter compatibility
- Tests follow established patterns from Story 6.1 (sitemap tests)

---

**Generated by BMad TEA Agent** - 2026-02-02
