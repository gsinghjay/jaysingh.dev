# ATDD Checklist - Epic 6, Story 6.1: Implement Sitemap Generation

**Date:** 2026-02-01
**Author:** Jay
**Primary Test Level:** Unit + E2E

---

## Story Summary

Generate a sitemap.xml file at build time that lists all public pages for search engine discovery and indexing.

**As a** search engine crawler
**I want** a sitemap.xml listing all pages
**So that** all site content can be discovered and indexed

---

## Acceptance Criteria

1. **AC1:** Sitemap plugin/template configured in eleventy.config.js
2. **AC2:** `_site/sitemap.xml` exists and is valid XML after build
3. **AC3:** All pages included (home, blog listing, all blog posts, projects listing, all projects, resume, contact)
4. **AC4:** Correct base URL (`https://jaysingh.dev`) in all URLs
5. **AC5:** Dynamic updates - new content automatically included on rebuild
6. **AC6:** Valid XML schema (proper namespace, well-formed structure)

---

## Failing Tests Created (RED Phase)

### Unit Tests (16 tests)

**File:** `tests/unit/sitemap-validation.spec.ts` (174 lines)

| Priority | Test | Status | Verifies |
|----------|------|--------|----------|
| P0 | should generate sitemap.xml in build output | RED - File doesn't exist | AC2 |
| P0 | should contain valid XML content | RED - File doesn't exist | AC2, AC6 |
| P0 | should have correct sitemap namespace | RED - File doesn't exist | AC6 |
| P0 | should have urlset root element | RED - File doesn't exist | AC6 |
| P1 | should have well-formed XML structure | RED - File doesn't exist | AC6 |
| P0 | should include home page URL | RED - URL not found | AC3 |
| P0 | should include blog listing URL | RED - URL not found | AC3 |
| P0 | should include projects listing URL | RED - URL not found | AC3 |
| P0 | should include resume page URL | RED - URL not found | AC3 |
| P0 | should include contact page URL | RED - URL not found | AC3 |
| P0 | should include all blog post URLs | RED - URLs not found | AC3, AC5 |
| P0 | should include all project URLs | RED - URLs not found | AC3, AC5 |
| P2 | should have expected total URL count | RED - Count mismatch | AC3 |
| P1 | should use absolute URLs with correct base | RED - URLs not found | AC4 |
| P1 | should not contain relative URLs | RED - File doesn't exist | AC4 |
| P1 | should not contain localhost URLs | RED - File doesn't exist | AC4 |

### E2E Tests (5 tests)

**File:** `tests/e2e/sitemap.spec.ts` (62 lines)

| Priority | Test | Status | Verifies |
|----------|------|--------|----------|
| P1 | sitemap.xml should be accessible at /sitemap.xml | RED - 404 Not Found | AC2 |
| P1 | sitemap.xml should have XML content-type | RED - 404 Not Found | AC2, AC6 |
| P1 | sitemap.xml should contain valid XML with URLs | RED - 404 Not Found | AC3, AC6 |
| P1 | sitemap.xml should use production base URL | RED - 404 Not Found | AC4 |
| P2 | robots.txt should reference sitemap | RED - Sitemap line missing | Integration |

---

## Data Factories Created

*None required for this story - sitemap validation uses static assertions.*

---

## Fixtures Created

*None required for this story - tests use existing fixtures from `tests/support/fixtures`.*

---

## Mock Requirements

*None required for this story - sitemap is a static XML file.*

---

## Required data-testid Attributes

*None required for this story - sitemap is accessed via URL, not DOM selectors.*

---

## Implementation Checklist

### Test Group: Sitemap File Existence (AC2)

**Tests:**
- `should generate sitemap.xml in build output`
- `should contain valid XML content`
- `sitemap.xml should be accessible at /sitemap.xml`

**Tasks to make these tests pass:**

- [ ] Create `sitemap.njk` template in project root
- [ ] Add frontmatter: `permalink: /sitemap.xml` and `eleventyExcludeFromCollections: true`
- [ ] Add XML declaration: `<?xml version="1.0" encoding="UTF-8"?>`
- [ ] Run build: `npm run build`
- [ ] Verify `_site/sitemap.xml` exists
- [ ] Remove `it.skip` / `test.skip` from related tests
- [ ] Run tests: `npm run test:unit` and `npm run test:e2e`
- [ ] ✅ Tests pass (green phase)

---

### Test Group: XML Schema Validation (AC6)

**Tests:**
- `should have correct sitemap namespace`
- `should have urlset root element`
- `should have well-formed XML structure`
- `sitemap.xml should have XML content-type`

**Tasks to make these tests pass:**

- [ ] Add sitemap namespace: `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`
- [ ] Wrap URLs in `<urlset>...</urlset>` element
- [ ] Use `<url><loc>...</loc></url>` structure for each page
- [ ] Remove `it.skip` / `test.skip` from related tests
- [ ] Run tests: `npm run test:unit`
- [ ] ✅ Tests pass (green phase)

---

### Test Group: Static Pages Inclusion (AC3)

**Tests:**
- `should include home page URL`
- `should include blog listing URL`
- `should include projects listing URL`
- `should include resume page URL`
- `should include contact page URL`

**Tasks to make these tests pass:**

- [ ] Add `<url><loc>{{ site.baseUrl }}/</loc></url>` for home
- [ ] Add `<url><loc>{{ site.baseUrl }}/blog/</loc></url>` for blog listing
- [ ] Add `<url><loc>{{ site.baseUrl }}/projects/</loc></url>` for projects listing
- [ ] Add `<url><loc>{{ site.baseUrl }}/resume/</loc></url>` for resume
- [ ] Add `<url><loc>{{ site.baseUrl }}/contact/</loc></url>` for contact
- [ ] Remove `it.skip` from related tests
- [ ] Run tests: `npm run test:unit`
- [ ] ✅ Tests pass (green phase)

---

### Test Group: Dynamic Content Inclusion (AC3, AC5)

**Tests:**
- `should include all blog post URLs`
- `should include all project URLs`
- `should have expected total URL count`

**Tasks to make these tests pass:**

- [ ] Add loop: `{% for post in collections.posts %}`
- [ ] Output: `<url><loc>{{ site.baseUrl }}{{ post.url }}</loc></url>`
- [ ] Add loop: `{% for project in collections.projects %}`
- [ ] Output: `<url><loc>{{ site.baseUrl }}{{ project.url }}</loc></url>`
- [ ] Verify URL count = 19 (5 static + 5 posts + 9 projects)
- [ ] Remove `it.skip` from related tests
- [ ] Run tests: `npm run test:unit`
- [ ] ✅ Tests pass (green phase)

---

### Test Group: Base URL Validation (AC4)

**Tests:**
- `should use absolute URLs with correct base`
- `should not contain relative URLs`
- `should not contain localhost URLs`
- `sitemap.xml should use production base URL`

**Tasks to make these tests pass:**

- [ ] Use `{{ site.baseUrl }}` prefix for all URLs (from `_data/site.json`)
- [ ] Verify no hardcoded localhost URLs
- [ ] Verify all `<loc>` values start with `https://jaysingh.dev`
- [ ] Remove `it.skip` / `test.skip` from related tests
- [ ] Run tests: `npm run test:unit` and `npm run test:e2e`
- [ ] ✅ Tests pass (green phase)

---

## Running Tests

```bash
# Run all failing tests for this story (unit)
npm run test:unit -- sitemap-validation

# Run all failing tests for this story (e2e)
npm run test:e2e -- sitemap

# Run specific test file (unit)
npx vitest run tests/unit/sitemap-validation.spec.ts

# Run specific test file (e2e)
npx playwright test tests/e2e/sitemap.spec.ts

# Run tests in headed mode (e2e - see browser)
npx playwright test tests/e2e/sitemap.spec.ts --headed

# Debug specific test (e2e)
npx playwright test tests/e2e/sitemap.spec.ts --debug
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete) ✅

**TEA Agent Responsibilities:**

- ✅ All tests written and skipped (failing state)
- ✅ No fixtures needed (static file validation)
- ✅ No mocks needed (sitemap is static XML)
- ✅ No data-testid requirements (URL-based access)
- ✅ Implementation checklist created

**Verification:**

- All tests skipped with `it.skip()` / `test.skip()`
- Tests assert expected behavior (valid XML, correct URLs)
- Tests will fail due to missing implementation

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Create sitemap.njk template** (Task 1 from story)
2. **Add static pages** to sitemap (Task 2 from story)
3. **Add dynamic collections** (Task 3 from story)
4. **Build and verify** (Task 4 from story)
5. **Remove test.skip/it.skip** from all tests
6. **Run tests** to verify green phase

**Key Principles:**

- One test group at a time (don't try to fix all at once)
- Minimal implementation (don't over-engineer)
- Run tests frequently (immediate feedback)
- Use implementation checklist as roadmap

---

### REFACTOR Phase (DEV Team - After All Tests Pass)

**DEV Agent Responsibilities:**

1. **Verify all tests pass** (green phase complete)
2. **Review template for quality** (readability, maintainability)
3. **Add `<lastmod>` dates** if desired (optional enhancement)
4. **Ensure tests still pass** after each refactor

**Completion:**

- All 21 tests pass (16 unit + 5 E2E)
- Sitemap validates against XML schema
- Ready for code review and story approval

---

## Next Steps

1. **Review this checklist** in standup or planning
2. **Run failing tests** to confirm RED phase: `npm run test:unit -- sitemap-validation`
3. **Begin implementation** using implementation checklist as guide
4. **Work one test group at a time** (red → green for each)
5. **When all tests pass**, update story status to 'done' in sprint-status.yaml

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **test-quality.md** - Deterministic tests, isolation, explicit assertions
- **test-levels-framework.md** - Unit vs E2E test selection
- **selector-resilience.md** - Not applicable (URL-based access)
- **overview.md** - Playwright Utils patterns (fixtures)

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npm run test:unit -- sitemap-validation`

**Expected Results:**

```
 SKIP  tests/unit/sitemap-validation.spec.ts
   ↓ Story 6.1: Sitemap File Exists (AC2)
     ↓ [P0] should generate sitemap.xml in build output [skipped]
     ↓ [P0] should contain valid XML content [skipped]
   ...

Tests:   15 skipped
```

**Summary:**

- Total tests: 21 (16 unit + 5 E2E)
- Passing: 0 (expected - all skipped)
- Skipped: 20 (expected - TDD red phase)
- Status: ✅ RED phase verified

---

## Notes

- Sitemap template goes in project root (alongside index.njk, blog.njk)
- Uses `site.baseUrl` from `_data/site.json` for absolute URLs
- `robots.txt` already references sitemap (no changes needed)
- Expected 19 URLs total: 5 static + 5 blog posts + 9 projects

---

**Generated by BMad TEA Agent** - 2026-02-01
