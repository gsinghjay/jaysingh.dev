# ATDD Checklist - Story 5.2: Implement Project Content Pipeline

**Date:** 2026-02-01
**Author:** Jay
**Primary Test Levels:** Unit (Vitest) + E2E (Playwright)

---

## Story Summary

As a content author (Jay), I want to create project case studies using Markdown files, so that I can showcase my work using a consistent structure.

**As a** content author (Jay)
**I want** to create project case studies using Markdown files
**So that** I can showcase my work using a consistent structure

---

## Acceptance Criteria

1. **AC1:** Project File Recognition - Files in `_content/projects/*.md` recognized by 11ty
2. **AC2:** Required Frontmatter Schema - id, title, description, tags/technologies, projectType
3. **AC3:** Optional Frontmatter Fields - githubUrl, liveUrl, diagramContent, etc.
4. **AC4:** Collection and URL Generation - Projects in collection, URLs at `/projects/{id}/`
5. **AC5:** Markdown Body Rendering - Challenge/Solution/Impact sections render correctly
6. **AC6:** Mermaid Diagram Integration - diagramContent renders to SVG

---

## Failing Tests Created (RED Phase)

### Unit Tests (22 tests)

**File:** `tests/unit/project-validation.spec.ts` (373 lines)

| Priority | Test | Status | Verifies |
|----------|------|--------|----------|
| P0 | should require id field | RED - validateProject missing | AC2 |
| P0 | should require title field | RED - validateProject missing | AC2 |
| P0 | should require description field | RED - validateProject missing | AC2 |
| P0 | should require projectType field | RED - validateProject missing | AC2 |
| P0 | should require tags OR technologies array | RED - validateProject missing | AC2 |
| P0 | should accept technologies array (backward compat) | RED - validateProject missing | AC2 |
| P0 | should accept tags array | RED - validateProject missing | AC2 |
| P0 | should accept projectType "work" | RED - validateProject missing | AC2 |
| P0 | should accept projectType "personal" | RED - validateProject missing | AC2 |
| P0 | should reject invalid projectType | RED - validateProject missing | AC2 |
| P1 | should validate id is a string | RED - validateProject missing | AC2 |
| P1 | should validate technologies is an array | RED - validateProject missing | AC2 |
| P1 | should accept valid frontmatter (required fields) | RED - validateProject missing | AC2 |
| P1 | should accept valid frontmatter (optional fields) | RED - validateProject missing | AC3 |
| P1 | should include file path in error messages | RED - validateProject missing | AC2 |
| P1 | should include field name in error messages | RED - validateProject missing | AC2 |
| P2 | should report all errors at once | RED - validateProject missing | AC2 |
| P2 | should handle empty frontmatter object | RED - validateProject missing | AC2 |
| P2 | should handle empty string values | RED - validateProject missing | AC2 |
| P2 | should handle empty technologies array | RED - validateProject missing | AC2 |
| P2 | should gracefully handle optional fields | RED - validateProject missing | AC3 |

### E2E Tests (20 tests) - Regression Guards

**File:** `tests/e2e/project-content-pipeline.spec.ts` (287 lines)

| Priority | Test | Expected Status | Verifies |
|----------|------|-----------------|----------|
| P0 | projects listing shows all 9 projects | PASS | AC1, AC4 |
| P0 | known project is accessible | PASS | AC1 |
| P0 | project URL uses id from frontmatter | PASS | AC4 |
| P0 | projects collection populates listing | PASS | AC4 |
| P0 | project URLs follow /projects/{id}/ pattern | PASS | AC4 |
| P0 | project displays title from frontmatter | PASS | AC2 |
| P0 | projects listing page loads | PASS | AC1 |
| P0 | project detail page loads | PASS | AC1 |
| P1 | all 9 existing projects are accessible | PASS | AC1 |
| P1 | project URLs are clean | PASS | AC4 |
| P1 | project displays description | PASS | AC2 |
| P1 | project displays technology tags | PASS | AC2 |
| P1 | project shows Challenge/Solution/Impact | PASS | AC5 |
| P1 | project shows key features | PASS | AC5 |
| P1 | project with mermaid shows diagram | PASS | AC6 |
| P1 | navigation from listing to detail works | PASS | AC4 |
| P1 | back navigation works from detail | PASS | AC4 |
| P1 | project cards have data attributes for filtering | PASS | AC4 |
| P1 | work projects are distinguishable | PASS | AC2 |
| P2 | project without diagram renders gracefully | PASS | AC6 |
| P2 | project shows GitHub link when present | PASS | AC3 |
| P2 | project shows live URL when present | PASS | AC3 |

---

## Implementation Checklist

### Task 1: Implement validateProject Function

**File:** `lib/filters.js`

**Tasks to make unit tests pass:**

- [ ] Add `validateProject` function export to `lib/filters.js`
- [ ] Validate required fields: id, title, description, projectType
- [ ] Validate tags OR technologies array (accept either)
- [ ] Validate projectType enum ('work' | 'personal')
- [ ] Validate field types (id must be string, technologies must be array)
- [ ] Return `{ valid: boolean, errors: string[] }` matching validateBlogPost pattern
- [ ] Include file path and field name in error messages
- [ ] Report all errors at once (not just first)
- [ ] Run tests: `npm run test:unit -- project-validation`
- [ ] ✅ All unit tests pass (green phase)

### Task 2: Integrate Validation into 11ty

**File:** `eleventy.config.js`

**Tasks:**

- [ ] Import `validateProject` from `lib/filters.js`
- [ ] Add validation call in projects collection (follow posts pattern)
- [ ] Log validation errors during build
- [ ] Run build: `npm run build`
- [ ] Verify all 9 existing projects pass validation

### Task 3: Verify E2E Tests Pass

**Tasks:**

- [ ] Run E2E tests: `npm run test:e2e -- project-content-pipeline`
- [ ] All 20 tests should pass (regression guards)
- [ ] If any fail, investigate (may indicate broken functionality)

---

## Running Tests

```bash
# Run unit tests (RED phase - will fail until validateProject implemented)
npm run test:unit -- project-validation

# Run E2E tests (should PASS - existing functionality)
npm run test:e2e -- project-content-pipeline

# Run specific test file
npx playwright test tests/e2e/project-content-pipeline.spec.ts

# Run tests in headed mode (see browser)
npx playwright test tests/e2e/project-content-pipeline.spec.ts --headed

# Debug specific test
npx playwright test tests/e2e/project-content-pipeline.spec.ts --debug
```

---

## Red-Green-Refactor Workflow

### RED Phase (Current) ✅

**TEA Agent Responsibilities:**

- ✅ Unit tests written and will fail (validateProject missing)
- ✅ E2E tests written as regression guards
- ✅ Implementation checklist created
- ✅ Test patterns follow Story 5.1

**Verification:**

- Unit tests fail at import (`validateProject` doesn't exist)
- E2E tests pass (existing pipeline working)

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Implement validateProject** in `lib/filters.js` (follow validateBlogPost pattern)
2. **Run unit tests** - verify they pass
3. **Integrate into eleventy.config.js** projects collection
4. **Run E2E tests** - verify they still pass
5. **Check off tasks** in implementation checklist

**Key Principles:**

- Follow the validateBlogPost pattern exactly
- Accept both `tags` and `technologies` for backward compatibility
- Validate projectType as enum ('work' | 'personal')

---

### REFACTOR Phase (After All Tests Pass)

**DEV Agent Responsibilities:**

1. Review code quality
2. Ensure consistency with validateBlogPost
3. Update documentation if needed
4. Commit all changes

---

## Acceptance Criteria Coverage

| AC | Description | Unit Tests | E2E Tests |
|----|-------------|------------|-----------|
| AC1 | Project File Recognition | - | 3 tests |
| AC2 | Required Frontmatter Schema | 17 tests | 4 tests |
| AC3 | Optional Frontmatter Fields | 2 tests | 2 tests |
| AC4 | Collection and URL Generation | - | 8 tests |
| AC5 | Markdown Body Rendering | - | 2 tests |
| AC6 | Mermaid Diagram Integration | - | 2 tests |

**Total Coverage:** 42 tests across all 6 acceptance criteria

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **test-quality.md** - Deterministic tests, isolation, explicit assertions
- **selector-resilience.md** - Robust selector hierarchy (data-testid > ARIA > text)
- **test-levels-framework.md** - Unit vs E2E decision matrix

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Unit Tests Command:** `npm run test:unit -- project-validation`

**Expected Results:**

```
❌ FAIL  tests/unit/project-validation.spec.ts
  - Error: Cannot resolve module '../../lib/filters.js'
  - validateProject is not exported from './lib/filters.js'
```

**E2E Tests Command:** `npm run test:e2e -- project-content-pipeline`

**Expected Results:**

```
✅ PASS  tests/e2e/project-content-pipeline.spec.ts
  - 20 tests passing (existing pipeline working)
```

---

## Notes

- Story 5.2 parallels Story 5.1 (Blog Content Pipeline) - use same patterns
- 9 existing projects are valid and working - no content changes needed
- `technologies` is the canonical field name (not `tags`) for projects
- Field names: `githubUrl` and `liveUrl` (not `github` and `demo` per dev notes)

---

## References

- [Story File] `_bmad-output/implementation-artifacts/5-2-implement-project-content-pipeline.md`
- [Validation Pattern] `lib/filters.js` - validateBlogPost function
- [Blog Pipeline Tests] `tests/e2e/blog-content-pipeline.spec.ts` - Reference pattern
- [Unit Test Pattern] `tests/unit/frontmatter-validation.spec.ts` - Reference pattern

---

**Generated by BMad TEA Agent** - 2026-02-01
