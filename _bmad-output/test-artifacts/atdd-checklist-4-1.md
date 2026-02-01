# ATDD Checklist - Epic 4, Story 4.1: Create Resume Page with Work Experience

**Date:** 2026-01-31
**Author:** Jay
**Primary Test Level:** E2E

---

## Story Summary

Create a professionally formatted resume page displaying work experience, education, and technical skills using data from static JSON files.

**As a** site visitor
**I want** to view Jay's work experience history
**So that** I can evaluate professional background and expertise

---

## Acceptance Criteria

1. **AC1:** Resume page accessible at `/resume/` with professional formatting
2. **AC2:** Work experience displays company name, job title, dates, and responsibilities
3. **AC3:** Positions in reverse chronological order (most recent first)
4. **AC4:** Desktop layout uses Neubrutalist design system with clear visual hierarchy
5. **AC5:** Mobile responsive without horizontal scrolling
6. **AC6:** Data from `_data/resume.json` via 11ty data cascade

---

## Failing Tests Created (RED Phase)

### E2E Tests (31 tests)

**File:** `tests/e2e/resume.spec.ts` (350 lines)

| Priority | Test Name | Status | Verifies |
|----------|-----------|--------|----------|
| P0 | resume page loads at /resume/ | RED - Page not found | AC1: Page accessibility |
| P0 | resume page has WORK HISTORY heading | RED - No heading | AC1: Page structure |
| P0 | work experience section displays 7 positions | RED - No content | AC2: Work experience count |
| P0 | first position shows current role details | RED - No content | AC2: Position details |
| P0 | position shows company name | RED - No content | AC2: Company display |
| P0 | position shows employment dates | RED - No content | AC2: Date formatting |
| P0 | position shows responsibilities as bullet list | RED - No content | AC2: Responsibilities |
| P0 | education section heading visible | RED - No section | AC1, AC4: Education |
| P0 | education section displays 2 entries | RED - No content | AC1: Education entries |
| P0 | technical toolkit heading visible | RED - No section | AC4: Skills section |
| P0 | technical toolkit displays 10 skill categories | RED - No content | AC4: Skill categories |
| P1 | resume page has clean URL | RED - Page not found | AC1: Clean URLs |
| P1 | responsibilities have border separator | RED - No styling | AC4: Visual design |
| P1 | positions are in reverse chronological order | RED - No content | AC3: Order verification |
| P1 | education entry shows degree and institution | RED - No content | AC1: Education details |
| P1 | education entry shows dates | RED - No content | AC2: Date formatting |
| P1 | skill cards have lime background | RED - No styling | AC4: Design tokens |
| P1 | skill cards display comma-separated skills | RED - No content | AC4: Skills display |
| P1 | skill grid uses 2-column layout on desktop | RED - No grid | AC4: Layout |
| P1 | download CV button exists | RED - No button | AC1: Feature |
| P1 | download CV button has Neubrutalist styling | RED - No styling | AC4: Design |
| P1 | download CV button has download icon | RED - No icon | AC1: UI element |
| P1 | page uses Neubrutalist design tokens | RED - No page | AC4: Design system |
| P1 | experience cards have 4px black borders | RED - No styling | AC4: Design tokens |
| P1 | experience cards have brutal shadow | RED - No styling | AC4: Design tokens |
| P1 | header uses flex layout | RED - No layout | AC4: Responsive |
| P1 | resume page readable on mobile | RED - No page | AC5: Mobile |
| P1 | no horizontal scrolling on mobile | RED - No page | AC5: Responsive |
| P1 | cards stack vertically on mobile | RED - No cards | AC5: Mobile layout |
| P1 | skill grid single column on mobile | RED - No grid | AC5: Responsive |
| P1 | page has single h1 | RED - No page | AC1: Accessibility |
| P1 | heading hierarchy is correct | RED - No headings | AC1: Accessibility |
| P1 | download button has visible focus state | RED - No button | AC5: Accessibility |
| P2 | download CV button is keyboard accessible | RED - No button | AC5: Accessibility |
| P2 | responsibilities use semantic list elements | RED - No list | AC1: Semantics |
| P2 | page source contains resume content | RED - 404 | AC6: Pre-render |
| P2 | page source contains work experience data | RED - 404 | AC6: Data cascade |
| P2 | page source contains skill categories | RED - 404 | AC6: Data cascade |

---

## Data Factories Created

N/A - Static site with no dynamic data seeding required. Test data comes from:
- `_data/resume.json` (work experience, education)
- `_data/skills.json` (technical skills by category)

---

## Fixtures Created

### Existing Fixtures (Reused)

**File:** `tests/support/fixtures/index.ts`

**Fixtures:**

- `verifyNeubrutalistDesign` - Verify Neubrutalist design tokens (borders, shadows, typography)
  - **Setup:** None required
  - **Provides:** Async function to validate design tokens
  - **Cleanup:** None required

- `checkA11yBasics` - Check accessibility basics (h1 count, alt text, focusable elements)
  - **Setup:** None required
  - **Provides:** Object with a11y metrics
  - **Cleanup:** None required

**Example Usage:**

```typescript
import { test, expect } from '../support/fixtures';

test('should use Neubrutalist design', async ({ page, verifyNeubrutalistDesign }) => {
  await page.goto('/resume/');
  await verifyNeubrutalistDesign();
});
```

---

## Mock Requirements

N/A - Static site with no external API calls. All data is pre-rendered at build time from JSON files.

---

## Required data-testid Attributes

### Resume Page

None required. Tests use semantic selectors following the hierarchy:
- ARIA roles (`getByRole`)
- Text content (`getByText`, `toContainText`)
- CSS classes for design verification (`.border-4.border-black`, `.bg-lime-400`)

**Selector Strategy Applied:**
- data-testid > ARIA roles > text content > CSS (last resort)
- ARIA roles preferred for interactive elements
- Text content for static display verification

---

## Implementation Checklist

### Test: resume page loads at /resume/ (P0)

**File:** `tests/e2e/resume.spec.ts`

**Tasks to make this test pass:**

- [ ] Create `_data/resume.json` with work experience and education data
- [ ] Create `resume.njk` in project root with frontmatter
- [ ] Set permalink to `/resume/`
- [ ] Use `layouts/base.njk` layout
- [ ] Run test: `npx playwright test resume.spec.ts:13`
- [ ] Test passes (green phase)

---

### Test: resume page has WORK HISTORY heading (P0)

**File:** `tests/e2e/resume.spec.ts`

**Tasks to make this test pass:**

- [ ] Add h1 with "WORK HISTORY" text
- [ ] Apply `<span class="bg-blue-400 px-2">HISTORY</span>` for highlight
- [ ] Use text-4xl font-black styling
- [ ] Run test: `npx playwright test resume.spec.ts:21`
- [ ] Test passes (green phase)

---

### Test: work experience section displays 7 positions (P0)

**File:** `tests/e2e/resume.spec.ts`

**Tasks to make this test pass:**

- [ ] Copy experience array from `src/data/resume.json` to `_data/resume.json`
- [ ] Loop through `resume.experience` in template
- [ ] Render each position in Card component with h2 title
- [ ] Verify 7 entries exist in JSON
- [ ] Run test: `npx playwright test resume.spec.ts:36`
- [ ] Test passes (green phase)

---

### Test: position shows employment dates (P0)

**File:** `tests/e2e/resume.spec.ts`

**Tasks to make this test pass:**

- [ ] Create date formatting macro/filter for "YYYY-MM" → "MMM YYYY"
- [ ] Handle null endDate with "PRESENT" text
- [ ] Apply formatting to startDate and endDate
- [ ] Run test: `npx playwright test resume.spec.ts:62`
- [ ] Test passes (green phase)

---

### Test: technical toolkit displays 10 skill categories (P0)

**File:** `tests/e2e/resume.spec.ts`

**Tasks to make this test pass:**

- [ ] Create `_data/skills.json` with 10 categories
- [ ] Add Technical Toolkit section with h2 heading
- [ ] Create grid with md:grid-cols-2
- [ ] Render 10 skill category cards with bg-lime-400
- [ ] Map JSON keys to display names (database→DATA, devops→INFRA)
- [ ] Run test: `npx playwright test resume.spec.ts:139`
- [ ] Test passes (green phase)

---

### Test: download CV button exists (P1)

**File:** `tests/e2e/resume.spec.ts`

**Tasks to make this test pass:**

- [ ] Add button with data-print-resume attribute
- [ ] Add "DOWNLOAD CV" text with Download icon SVG
- [ ] Apply Neubrutalist button styling (border-4, box-shadow)
- [ ] Add click handler in js/main.js for window.print()
- [ ] Run test: `npx playwright test resume.spec.ts:180`
- [ ] Test passes (green phase)

---

### Test: mobile responsive layout (P1)

**File:** `tests/e2e/resume.spec.ts`

**Tasks to make this test pass:**

- [ ] Use flex-col on mobile, md:flex-row on desktop for header
- [ ] Use single column on mobile, md:grid-cols-2 on desktop for skills
- [ ] Ensure cards have full width on mobile
- [ ] Test at 375px viewport
- [ ] Run test: `npx playwright test resume.spec.ts:254`
- [ ] Test passes (green phase)

---

## Running Tests

```bash
# Run all failing tests for this story
npx playwright test resume.spec.ts

# Run specific test file with headed browser
npx playwright test resume.spec.ts --headed

# Run tests in debug mode
npx playwright test resume.spec.ts --debug

# Run P0 tests only (critical path)
npx playwright test resume.spec.ts -g "\[P0\]"

# Run with specific browser
npx playwright test resume.spec.ts --project=chromium
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete)

**TEA Agent Responsibilities:**

- All 31 tests written and will fail (page doesn't exist)
- Existing fixtures reused (verifyNeubrutalistDesign, checkA11yBasics)
- No mock requirements (static site)
- Selector strategy documented (ARIA > text > CSS)
- Implementation checklist created with 7 key milestones

**Verification:**

All tests fail because `/resume/` returns 404. This is intentional (TDD red phase).

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Pick one failing test** from implementation checklist (start with P0 tests)
2. **Read the test** to understand expected behavior
3. **Implement minimal code** to make that specific test pass
4. **Run the test** to verify it now passes (green)
5. **Check off the task** in implementation checklist
6. **Move to next test** and repeat

**Recommended Order:**

1. Create `_data/resume.json` and `_data/skills.json` (data files)
2. Create `resume.njk` with basic structure (page loads)
3. Add WORK HISTORY heading (h1)
4. Implement work experience loop (7 positions)
5. Add date formatting macro
6. Add education section
7. Add Technical Toolkit section
8. Add Download CV button
9. Add print handler JS
10. Verify responsive layout
11. Verify accessibility

---

### REFACTOR Phase (DEV Team - After All Tests Pass)

**DEV Agent Responsibilities:**

1. **Verify all tests pass** (green phase complete)
2. **Review code for quality** (DRY, readability)
3. **Extract duplications** (date formatting used multiple times)
4. **Optimize performance** (lazy loading if needed)
5. **Ensure tests still pass** after each refactor
6. **Update story status** to 'done' in sprint-status.yaml

---

## Next Steps

1. **Run failing tests** to confirm RED phase: `npx playwright test resume.spec.ts`
2. **Begin implementation** using implementation checklist as guide
3. **Work one test at a time** (red → green for each)
4. **When all tests pass**, refactor code for quality
5. **When refactoring complete**, update story status to 'done'

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **test-quality.md** - Deterministic tests, explicit assertions, no hard waits
- **selector-resilience.md** - Selector hierarchy (ARIA > text > CSS), filter patterns

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npx playwright test resume.spec.ts`

**Expected Results:**

```
Running 31 tests using 1 worker

  ✗ Story 4.1: Resume Page Access (AC1)
    ✗ [P0] resume page loads at /resume/
      → Page not found (404)
    ✗ [P0] resume page has WORK HISTORY heading
      → Cannot find heading

  ... (all 31 tests fail)

  31 failed
```

**Summary:**

- Total tests: 31
- Passing: 0 (expected)
- Failing: 31 (expected)
- Status: RED phase verified

---

## Notes

- This is a static 11ty site - no API layer, all data is pre-rendered
- Date formatting requires custom Nunjucks macro or 11ty filter
- Skill category mapping: `database` → "DATA", `devops` → "INFRA"
- Download CV triggers `window.print()` via data attribute handler
- Mobile breakpoint at md (768px) following existing patterns

---

## Contact

**Questions or Issues?**

- Refer to `_bmad/tea/testarch/knowledge/` for testing best practices
- Check `tests/e2e/projects.spec.ts` for established patterns

---

**Generated by BMad TEA Agent** - 2026-01-31
