# ATDD Checklist - Epic 5, Story 5.1: Implement Blog Content Pipeline

**Date:** 2026-02-01
**Author:** Jay
**Primary Test Level:** E2E + Unit

---

## Story Summary

Formalize the blog content authoring pipeline by documenting the workflow, consolidating the directory structure, and adding frontmatter validation for better author experience.

**As a** content author (Jay)
**I want** to create blog posts using Markdown files
**So that** I can publish technical articles using my preferred workflow

---

## Acceptance Criteria

1. **AC1:** Blog post file recognition - Files in `content/blog/` or `_content/blog/` with valid YAML frontmatter are recognized by 11ty
2. **AC2:** Frontmatter schema validation - Required fields: `id` (string), `title` (string), `date` (YYYY-MM-DD), `excerpt` (string), `tags` (array), `readTime` (string)
3. **AC3:** Collection and URL generation - Posts appear in `posts` collection and generate pages at `/blog/{id}/`
4. **AC4:** Markdown rendering - Headings, lists, code blocks, links, and emphasis render correctly
5. **AC5:** Syntax highlighting - Fenced code blocks with language identifiers get build-time syntax highlighting
6. **AC6:** Frontmatter validation errors - Invalid/missing frontmatter produces clear error messages

---

## Failing Tests Created (RED Phase)

### E2E Tests (20 tests)

**File:** `tests/e2e/blog-content-pipeline.spec.ts` (220 lines)

- ✅ **Test:** `[P0] blog posts from _content/blog/ are recognized`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC1 - Blog post file recognition

- ✅ **Test:** `[P0] known blog post is accessible`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC1 - Blog post file recognition

- ✅ **Test:** `[P1] all 5 existing blog posts are accessible`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC1 - All posts recognized

- ✅ **Test:** `[P0] post has id-based URL`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC2, AC3 - ID from frontmatter generates URL

- ✅ **Test:** `[P0] post displays title from frontmatter`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC2 - Title schema field

- ✅ **Test:** `[P0] post displays date from frontmatter`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC2 - Date schema field

- ✅ **Test:** `[P1] post displays excerpt on listing page`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC2 - Excerpt schema field

- ✅ **Test:** `[P1] post displays tags from frontmatter`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC2 - Tags schema field

- ✅ **Test:** `[P1] post displays readTime from frontmatter`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC2 - ReadTime schema field

- ✅ **Test:** `[P0] posts collection populates blog listing`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC3 - Collection generation

- ✅ **Test:** `[P0] post URLs follow /blog/{id}/ pattern`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC3 - URL generation

- ✅ **Test:** `[P0] clicking post navigates to correct URL`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC3 - Navigation

- ✅ **Test:** `[P1] post URLs are clean (no hash, no query params)`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC3 - Clean URLs

- ✅ **Test:** `[P0] headings render correctly`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC4 - Markdown headings

- ✅ **Test:** `[P1] lists render correctly`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC4 - Markdown lists

- ✅ **Test:** `[P1] links render correctly`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC4 - Markdown links

- ✅ **Test:** `[P1] code blocks render correctly`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC4 - Markdown code blocks

- ✅ **Test:** `[P0] code blocks have language class`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC5 - Syntax highlighting

- ✅ **Test:** `[P0] code blocks contain token spans`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC5 - Prism.js tokens

- ✅ **Test:** `[P1] syntax highlighting is pre-rendered (no JS needed)`
  - **Status:** GREEN (expected) - Existing functionality
  - **Verifies:** AC5 - Build-time rendering

### Unit Tests (15 tests)

**File:** `tests/unit/frontmatter-validation.spec.ts` (180 lines)

- ❌ **Test:** `[P0] should require id field`
  - **Status:** RED - validateBlogPost not implemented
  - **Verifies:** AC2, AC6 - Required field validation

- ❌ **Test:** `[P0] should require title field`
  - **Status:** RED - validateBlogPost not implemented
  - **Verifies:** AC2, AC6 - Required field validation

- ❌ **Test:** `[P0] should require date field`
  - **Status:** RED - validateBlogPost not implemented
  - **Verifies:** AC2, AC6 - Required field validation

- ❌ **Test:** `[P0] should require excerpt field`
  - **Status:** RED - validateBlogPost not implemented
  - **Verifies:** AC2, AC6 - Required field validation

- ❌ **Test:** `[P0] should require tags field`
  - **Status:** RED - validateBlogPost not implemented
  - **Verifies:** AC2, AC6 - Required field validation

- ❌ **Test:** `[P1] should validate id is a string`
  - **Status:** RED - validateBlogPost not implemented
  - **Verifies:** AC2 - Type validation

- ❌ **Test:** `[P1] should validate date format (YYYY-MM-DD)`
  - **Status:** RED - validateBlogPost not implemented
  - **Verifies:** AC2 - Format validation

- ❌ **Test:** `[P1] should validate tags is an array`
  - **Status:** RED - validateBlogPost not implemented
  - **Verifies:** AC2 - Type validation

- ❌ **Test:** `[P0] should accept valid frontmatter with all required fields`
  - **Status:** RED - validateBlogPost not implemented
  - **Verifies:** AC2 - Valid input acceptance

- ❌ **Test:** `[P1] should accept valid frontmatter with optional fields`
  - **Status:** RED - validateBlogPost not implemented
  - **Verifies:** AC2 - Optional fields

- ❌ **Test:** `[P1] should include file path in error messages`
  - **Status:** RED - validateBlogPost not implemented
  - **Verifies:** AC6 - Error message quality

- ❌ **Test:** `[P1] should include field name in error messages`
  - **Status:** RED - validateBlogPost not implemented
  - **Verifies:** AC6 - Error message quality

- ❌ **Test:** `[P2] should report all errors at once (not just first)`
  - **Status:** RED - validateBlogPost not implemented
  - **Verifies:** AC6 - Error message quality

- ❌ **Test:** `[P2] should handle empty frontmatter object`
  - **Status:** RED - validateBlogPost not implemented
  - **Verifies:** AC6 - Edge case

- ❌ **Test:** `[P2] should handle empty tags array`
  - **Status:** RED - validateBlogPost not implemented
  - **Verifies:** AC6 - Edge case

---

## Data Factories Created

None required for this story - tests use static content from existing blog posts.

---

## Fixtures Created

No new fixtures required - uses existing fixtures from `tests/support/fixtures/index.ts`:
- `verifyNeubrutalistDesign` - Design token verification
- `checkA11yBasics` - Accessibility checks

---

## Mock Requirements

None required - static site, no external APIs.

---

## Required data-testid Attributes

None required - existing selectors sufficient for content pipeline tests.

---

## Implementation Checklist

### Test: Frontmatter Validation (Unit Tests)

**File:** `tests/unit/frontmatter-validation.spec.ts`

**Tasks to make these tests pass:**

- [ ] Create `validateBlogPost` function in `eleventy.config.js`
- [ ] Validate required fields: id, title, date, excerpt, tags
- [ ] Validate field types (id=string, date=YYYY-MM-DD, tags=array)
- [ ] Return clear error messages with file path and field name
- [ ] Report all validation errors at once (not just first)
- [ ] Add validation call in `addCollection("posts")` callback
- [ ] Export validation function for unit testing
- [ ] Run tests: `npm run test:unit`
- [ ] ✅ All 15 unit tests pass (green phase)

**Estimated Effort:** 2-3 hours

---

### Test: Directory Consolidation Decision

**File:** N/A (configuration decision)

**Tasks to complete:**

- [ ] Decide: Keep `_content/blog/` (current) OR migrate to `content/blog/` (PRD)
- [ ] If keeping `_content/`: Document decision in README
- [ ] If migrating to `content/`:
  - [ ] Update `eleventy.config.js` to remove ignore rule
  - [ ] Update collection glob pattern
  - [ ] Move/merge content files
  - [ ] Verify build succeeds
- [ ] Update story documentation with decision
- [ ] ✅ Decision documented and implemented

**Estimated Effort:** 1 hour

---

### Test: E2E Content Pipeline Verification

**File:** `tests/e2e/blog-content-pipeline.spec.ts`

**Tasks to make these tests pass:**

- [ ] Verify all 5 blog posts are accessible
- [ ] Run E2E tests: `npx playwright test tests/e2e/blog-content-pipeline.spec.ts`
- [ ] All 20 E2E tests should pass (existing functionality)
- [ ] ✅ Pipeline verified working

**Estimated Effort:** 0.5 hours (verification only)

---

## Prerequisites

**Unit Test Framework Setup Required:**

Vitest is not yet configured. Before running unit tests:

```bash
# Install vitest
npm install -D vitest

# Add to package.json scripts:
# "test:unit": "vitest run"
# "test:unit:watch": "vitest"
```

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.spec.ts'],
    globals: true,
  },
});
```

---

## Running Tests

```bash
# Run all failing tests for this story
npx playwright test tests/e2e/blog-content-pipeline.spec.ts
npm run test:unit -- tests/unit/frontmatter-validation.spec.ts

# Run specific test file
npx playwright test tests/e2e/blog-content-pipeline.spec.ts --project=chromium

# Run tests in headed mode (see browser)
npx playwright test tests/e2e/blog-content-pipeline.spec.ts --headed

# Debug specific test
npx playwright test tests/e2e/blog-content-pipeline.spec.ts --debug

# Run unit tests
npm run test:unit
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete) ✅

**TEA Agent Responsibilities:**

- ✅ All tests written
- ✅ E2E tests verify existing functionality (should pass)
- ✅ Unit tests for new validation logic (will fail until implemented)
- ✅ Implementation checklist created

**Verification:**

- E2E tests should pass (verifying existing pipeline)
- Unit tests will fail (validation not yet implemented)

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Run E2E tests first** - Verify pipeline works (should pass)
2. **Implement validateBlogPost function** in `eleventy.config.js`
3. **Run unit tests** - Should start passing as validation is implemented
4. **Make directory decision** - Document in story file
5. **Check off tasks** as completed

**Key Principles:**

- Most of this story is verification/formalization, not new features
- Only AC6 (validation) requires new implementation
- Directory decision is a documentation task

---

### REFACTOR Phase (DEV Team - After All Tests Pass)

**DEV Agent Responsibilities:**

1. **Verify all tests pass**
2. **Review validation code** for clarity
3. **Update documentation** with authoring workflow
4. **Ensure error messages** are helpful for authors

---

## Next Steps

1. **Run E2E tests** to verify existing pipeline: `npx playwright test tests/e2e/blog-content-pipeline.spec.ts`
2. **Implement frontmatter validation** in `eleventy.config.js`
3. **Run unit tests** to verify validation: `npm run test:unit`
4. **Make directory decision** and document
5. **Update story status** to 'done' when complete

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **test-quality.md** - Test design principles (Given-When-Then, determinism)
- **fixture-architecture.md** - Fixture patterns (existing fixtures reused)
- **test-levels-framework.md** - Test level selection (E2E for UI, Unit for validation)

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**E2E Command:** `npx playwright test tests/e2e/blog-content-pipeline.spec.ts`

**Expected Results:**
- Total tests: 20
- Passing: 20 (existing functionality works)
- Failing: 0

**Unit Command:** `npm run test:unit -- tests/unit/frontmatter-validation.spec.ts`

**Expected Results:**
- Total tests: 15
- Passing: 0 (validation not implemented)
- Failing: 15 (expected - RED phase)

---

## Notes

- **Most of Story 5.1 is already implemented** from Stories 2.1-2.7
- This story is primarily about **formalization and validation**
- E2E tests verify existing functionality works correctly
- Unit tests are for the NEW validation feature (AC6)
- Directory consolidation is a decision/documentation task

---

## Contact

**Questions or Issues?**

- Tag @tea in standup
- Refer to `tests/README.md` for test documentation

---

**Generated by BMad TEA Agent** - 2026-02-01
