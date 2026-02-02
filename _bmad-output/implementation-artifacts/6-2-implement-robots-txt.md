# Story 6.2: Implement robots.txt

Status: done

## Story

As a **search engine crawler**,
I want **a robots.txt file indicating crawl permissions**,
so that **I know which pages to index**.

## Acceptance Criteria

1. **AC1: robots.txt File Exists**
   - Given the site builds
   - When I inspect `_site/robots.txt`
   - Then the file exists at the root

2. **AC2: Allows All Crawlers**
   - Given the robots.txt content
   - When I review the directives
   - Then it allows all crawlers to access all public pages (`User-agent: * Allow: /`)

3. **AC3: Sitemap Reference**
   - Given the robots.txt content
   - When I review the sitemap reference
   - Then it includes `Sitemap: https://jaysingh.dev/sitemap.xml` (or correct base URL)

4. **AC4: Source Location**
   - Given the robots.txt file
   - When I review the source
   - Then it is created via passthrough copy from `public/robots.txt` or template generation

5. **AC5: No Unintended Blocks**
   - Given crawlers follow robots.txt
   - When they access the site
   - Then all public pages are crawlable (no unintended blocks)

## Tasks / Subtasks

- [x] Task 1: Verify robots.txt Source File (AC: #4)
  - [x] 1.1 Confirm `public/robots.txt` exists with correct content
  - [x] 1.2 Verify passthrough copy configuration in `eleventy.config.js`

- [x] Task 2: Verify robots.txt Content (AC: #2, #3)
  - [x] 2.1 Confirm `User-agent: *` directive present
  - [x] 2.2 Confirm `Allow: /` directive present
  - [x] 2.3 Confirm `Sitemap: https://jaysingh.dev/sitemap.xml` present

- [x] Task 3: Build Verification (AC: #1, #5)
  - [x] 3.1 Run `npm run build`
  - [x] 3.2 Verify `_site/robots.txt` exists at root (not in subdirectory)
  - [x] 3.3 Verify file content matches source

- [x] Task 4: Test Coverage (AC: #1, #2, #3, #5)
  - [x] 4.1 Add unit test to verify robots.txt content format
  - [x] 4.2 Add E2E test to verify robots.txt is accessible at `/robots.txt`
  - [x] 4.3 Add E2E test to verify sitemap URL in robots.txt is valid

- [x] Task 5: robots.txt Standards Validation (AC: #2, #5)
  - [x] 5.1 Validate robots.txt against standard format
  - [x] 5.2 Verify no syntax errors that could block crawlers

## Dev Notes

### Implementation Status

**CRITICAL FINDING:** This story is essentially pre-implemented. The robots.txt file:
- **Already exists** at `public/robots.txt`
- **Already has correct content** (User-agent, Allow, Sitemap directives)
- **Already deploys correctly** to `_site/robots.txt` (fixed in Story 6.1)

The main work for this story is **validation and test coverage**.

### Current robots.txt Content

```
User-agent: *
Allow: /

Sitemap: https://jaysingh.dev/sitemap.xml
```

### robots.txt Standard Format

Per the [Robots Exclusion Protocol](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt):

| Directive | Purpose | Our Value |
|-----------|---------|-----------|
| `User-agent` | Specifies which crawlers the rules apply to | `*` (all crawlers) |
| `Allow` | Explicitly allows access to paths | `/` (all paths) |
| `Disallow` | Blocks access to paths | Not used (all allowed) |
| `Sitemap` | Points crawlers to sitemap location | `https://jaysingh.dev/sitemap.xml` |

### Story 6.1 Learnings (Critical Context)

From the previous story's implementation:

1. **Passthrough Copy Fixed:** The `eleventy.config.js` now has `eleventyConfig.addPassthroughCopy({ "public": "." })` which copies `public/` contents to site root
2. **robots.txt Location:** Was incorrectly at `_site/public/robots.txt`, now correctly at `_site/robots.txt`
3. **Sitemap Reference:** Already points to correct URL `https://jaysingh.dev/sitemap.xml`

### Technical Requirements

**From Architecture Document:**
- Static file via passthrough copy (no template generation needed)
- File location: `public/robots.txt` → `_site/robots.txt`
- Must reference sitemap.xml

**From PRD:**
- FR39: Search engines can crawl all public pages via robots.txt allowance
- Supports FR38 (direct blog post landing via search engines)

### Project Structure Notes

- **Source file:** `public/robots.txt`
- **Build output:** `_site/robots.txt`
- **Passthrough copy:** Configured in `eleventy.config.js`
- **Base URL:** From `_data/site.json` → `https://jaysingh.dev`

### Test Approach

**Unit Tests (tests/unit/robots-txt-validation.spec.ts):**
- Verify file exists in build output
- Validate User-agent directive format
- Validate Allow directive (no Disallow for public content)
- Validate Sitemap URL format and correctness

**E2E Tests (tests/e2e/robots-txt.spec.ts):**
- HTTP 200 response for `/robots.txt`
- Content-type is `text/plain`
- Contains expected directives
- Sitemap URL is reachable

### Related Files

| File | Purpose |
|------|---------|
| `public/robots.txt` | Source file |
| `eleventy.config.js` | Passthrough copy config |
| `_data/site.json` | Base URL (`https://jaysingh.dev`) |
| `sitemap.njk` | Sitemap template (Story 6.1) |
| `_site/sitemap.xml` | Generated sitemap (verified working) |

### References

- [Source: epics.md#Story-6.2] - Acceptance criteria and user story
- [Source: architecture.md#Project-Structure-Boundaries] - File locations
- [Source: 6-1-implement-sitemap-generation.md#Completion-Notes] - Passthrough copy fix
- [Google robots.txt Specification](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt)
- [Robots Exclusion Protocol](https://www.robotstxt.org/robotstxt.html)

### Related Stories

- **Story 6.1:** Implement Sitemap Generation (done - fixed passthrough copy)
- **Story 6.3:** Implement Meta Tags and Open Graph (next - SEO optimization)
- **Story 6.4:** Implement GitHub Actions Deployment (deploys all SEO files)

### Git Intelligence (Last 5 Commits)

```
d0b37a5 Add sitemap.xml generation for SEO (Story 6.1)
0eea48b Add project filtering with accessibility improvements (Story 3.5)
2ed7583 Update architecture document to align with implementation
72c11eb Add Epic 8 proposal for Educational Platform (Capstone Showcase)
c0a5ba6 Add local development workflow with Node.js 24 enforcement (Story 5.5)
```

**Pattern from Story 6.1:**
- Used Vitest for unit tests (`tests/unit/`)
- Used Playwright for E2E tests (`tests/e2e/`)
- Test naming: `{feature}-validation.spec.ts` for unit, `{feature}.spec.ts` for E2E

### Minimal Implementation Required

Since the robots.txt file and deployment are already working, this story primarily requires:

1. **Verification tasks** - Confirm existing implementation meets all AC
2. **Test coverage** - Add unit and E2E tests for robots.txt validation
3. **Documentation** - Complete story file with dev notes

The developer should verify first, then write tests that validate the existing implementation.

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

**Test Execution Results (Code Review Verification):**
- Unit tests: `npm run test:unit -- robots-txt-validation` → 15/15 passed
- E2E tests: `npm run test:e2e -- robots-txt` → 60/60 passed (5 browsers × 12 tests)
- Build verification: `_site/robots.txt` exists (66 bytes), content matches source

### Completion Notes List

- **Task 1 (Verification):** Confirmed `public/robots.txt` exists with correct directives. Verified passthrough copy in `eleventy.config.js` line 181: `eleventyConfig.addPassthroughCopy({ "public": "." })`.
- **Task 2 (Content):** Verified all directives present: `User-agent: *`, `Allow: /`, `Sitemap: https://jaysingh.dev/sitemap.xml`.
- **Task 3 (Build):** Build succeeded, `_site/robots.txt` exists at root (66 bytes), content matches source file exactly.
- **Task 4 (Tests):** Unit tests (15 tests) and E2E tests (12 tests × 5 browsers = 60) all pass. Tests validate file existence, content format, HTTP accessibility, and sitemap integration.
- **Task 5 (Standards):** robots.txt validated against Robots Exclusion Protocol - no syntax errors, no unintended blocks, HTTPS sitemap URL.

### Implementation Summary

This story was a **validation-focused** story since robots.txt was pre-implemented and fixed in Story 6.1. The main deliverables were:
1. Comprehensive unit test suite (15 tests) covering all acceptance criteria
2. E2E test suite (12 tests) verifying HTTP accessibility across 5 browser configurations
3. Full regression test pass (85 unit tests, 60 E2E tests)

### Test Results

- **Unit Tests:** 15/15 passed (robots-txt-validation.spec.ts)
- **E2E Tests:** 60/60 passed across chromium, firefox, webkit, mobile-chrome, mobile-safari
- **Regression:** 85 unit tests passed, no regressions

### File List

| File | Status | Purpose |
|------|--------|---------|
| `public/robots.txt` | Unchanged | Source file (pre-existing) |
| `eleventy.config.js` | Unchanged | Passthrough copy config (pre-existing) |
| `tests/unit/robots-txt-validation.spec.ts` | Created | Unit tests (15 tests) |
| `tests/e2e/robots-txt.spec.ts` | Created | E2E tests (12 tests × 5 browsers) |
| `_site/robots.txt` | Generated | Build output |

### Change Log

- 2026-02-02: Story completed - all verification tasks passed, test coverage confirmed (15 unit + 60 E2E tests)
- 2026-02-02: Code review passed - Fixed 4 MEDIUM issues (documentation accuracy, test count sync, BASE_URL sync with site.json)

