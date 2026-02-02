# ATDD Checklist - Story 5.4: Implement Mermaid in Markdown Processing

**Date:** 2026-02-01
**Author:** Jay
**Primary Test Level:** E2E (Playwright)

---

## Story Summary

**As a** content author (Jay)
**I want** to include Mermaid diagrams in my content
**So that** I can illustrate architecture and flows without external tools

---

## Acceptance Criteria

1. **AC1:** Mermaid frontmatter stored (`mermaid`/`diagramContent` field)
2. **AC2:** SVG generation from frontmatter via `npm run build:mermaid`
3. **AC3:** Error handling for invalid syntax (build-time)
4. **AC4:** SVG regeneration on update (build-time)
5. **AC5:** Neubrutalist theme consistency in generated SVGs
6. **AC6:** Build pipeline order (Mermaid before 11ty)

---

## Failing Tests Created (Validation Phase)

### E2E Tests (13 tests)

**File:** `tests/e2e/mermaid-processing.spec.ts` (180 lines)

**Note:** Story 5-4 validates existing implementation from Story 3.3. Tests run immediately (no `test.skip()`) to reveal any gaps.

#### Inline Mermaid in Blog Posts (AC1, AC2)

- ✅ **Test:** `[P0] blog post with inline mermaid displays SVG image`
  - **Verifies:** Inline ` ```mermaid ` blocks render as `<img>` tags

- ✅ **Test:** `[P0] inline mermaid SVG has correct src path pattern`
  - **Verifies:** SVG src follows `/diagrams/blog-{id}-{index}.svg` convention

- ✅ **Test:** `[P1] inline mermaid has meaningful alt text`
  - **Verifies:** Accessibility via alt text on diagram images

- ✅ **Test:** `[P1] multiple inline mermaid diagrams all render`
  - **Verifies:** All diagrams in a post are rendered

#### Diagram Viewer Container (AC5)

- ✅ **Test:** `[P1] blog diagram has viewer container with data attribute`
  - **Verifies:** `data-diagram-viewer` wrapper exists

- ✅ **Test:** `[P1] diagram viewer has Neubrutalist border styling`
  - **Verifies:** 4px black border on container

- ✅ **Test:** `[P1] diagram viewer has brutal shadow`
  - **Verifies:** 8px box-shadow per design system

- ✅ **Test:** `[P1] project diagram also uses viewer container`
  - **Verifies:** Consistent pattern across content types

#### Diagram Viewer Interaction (AC5)

- ✅ **Test:** `[P2] diagram viewer shows expand hint`
  - **Verifies:** "Click to expand" hint visible

- ✅ **Test:** `[P2] clicking diagram triggers expansion behavior`
  - **Verifies:** Click interaction is handled

- ✅ **Test:** `[P2] diagram is keyboard accessible`
  - **Verifies:** Focusable for keyboard users

#### Cross-Content Consistency

- ✅ **Test:** `[P1] blog and project diagrams use consistent styling`
  - **Verifies:** Same Neubrutalist styling on both

- ✅ **Test:** `[P2] diagrams use responsive sizing`
  - **Verifies:** max-width or w-full for responsiveness

---

## Build-Time Behaviors (Not E2E Testable)

| AC | Description | Verification Method |
|----|-------------|---------------------|
| AC3 | Error handling for invalid syntax | Manual: Add malformed Mermaid, run `npm run build:mermaid` |
| AC4 | SVG regeneration on update | Manual: Modify diagram, rebuild, verify SVG updated |
| AC6 | Build pipeline order | Verified: `package.json` has correct order |

---

## Data Factories Created

None required - tests use static content from `_content/blog/` and `_content/projects/`.

---

## Fixtures Created

Tests use existing fixtures from `tests/support/fixtures/index.ts`:
- `verifyNeubrutalistDesign` - Design token verification
- `checkA11yBasics` - Accessibility checks

---

## Required data-testid Attributes

### Diagram Viewer Container

- `data-diagram-viewer` - Wrapper around each Mermaid diagram (already implemented)

---

## Implementation Checklist

### Test: Blog post with inline mermaid displays SVG

**File:** `tests/e2e/mermaid-processing.spec.ts`

**Tasks to verify this test passes:**

- [x] 11ty transform replaces ` ```mermaid ` blocks with `<img>` tags
- [x] `scripts/render-mermaid.js` processes blog content
- [x] SVGs generated to `_site/diagrams/`
- [x] Manifest maps code blocks to SVG paths
- [ ] Run test: `npx playwright test mermaid-processing --grep "displays SVG"`
- [ ] ✅ Test passes

---

### Test: Diagram viewer has Neubrutalist styling

**File:** `tests/e2e/mermaid-processing.spec.ts`

**Tasks to verify this test passes:**

- [x] Template wraps diagram in `data-diagram-viewer` container
- [x] Container has `border-4 border-black` classes
- [x] Container has `style="box-shadow: 8px 8px 0 #000;"`
- [ ] Run test: `npx playwright test mermaid-processing --grep "Neubrutalist"`
- [ ] ✅ Test passes

---

### Test: Diagram viewer shows expand hint

**File:** `tests/e2e/mermaid-processing.spec.ts`

**Tasks to make this test pass:**

- [ ] Add "Click to expand" hint text to diagram viewer template
- [ ] Style hint per Neubrutalist design
- [ ] Run test: `npx playwright test mermaid-processing --grep "expand hint"`
- [ ] ✅ Test passes

---

## Running Tests

```bash
# Run all Story 5-4 tests
npx playwright test mermaid-processing

# Run specific test file with headed browser
npx playwright test mermaid-processing --headed

# Run tests in debug mode
npx playwright test mermaid-processing --debug

# Run tests with specific browser
npx playwright test mermaid-processing --project=chromium

# Run tests with coverage report
npx playwright test mermaid-processing --reporter=html
```

---

## Validation Workflow

### Phase 1: Run Tests (Current)

Since implementation exists from Story 3.3:

1. **Run tests immediately**: `npx playwright test mermaid-processing`
2. **Review results**:
   - Passing tests = Implementation complete
   - Failing tests = Gaps to address

### Phase 2: Fix Gaps (If Any)

For each failing test:
1. Identify missing implementation
2. Update template/script
3. Re-run test
4. Verify pass

### Phase 3: Commit

1. All tests pass
2. Commit test file: `tests/e2e/mermaid-processing.spec.ts`
3. Update story status to `done`

---

## Next Steps

1. **Run validation tests**: `npx playwright test mermaid-processing`
2. **Review test results** for any gaps
3. **Fix failing tests** if any (likely P2 interaction tests)
4. **Mark Task 6 complete** in story file
5. **Continue with remaining tasks** (Neubrutalist theme config)

---

## Knowledge Base References Applied

- **test-quality.md** - Deterministic waits, explicit assertions
- **selector-resilience.md** - data-testid > ARIA > text hierarchy
- **overview.md** - Playwright utils patterns (fixtures)

---

## Priority Coverage Summary

| Priority | Count | Description |
|----------|-------|-------------|
| P0 | 2 | Critical path - blocks release |
| P1 | 7 | Important UX - should fix before release |
| P2 | 4 | Nice to have - can defer |
| **Total** | **13** | |

---

## Notes

- Story 5-4 is primarily **validation** of existing Story 3.3 implementation
- Inline Mermaid in 5 blog posts available for testing
- Project Mermaid diagrams already tested in `projects.spec.ts` (Story 3.3)
- P2 tests for expand hint/interaction may fail if not yet implemented

---

**Generated by BMAD TEA Agent** - 2026-02-01
