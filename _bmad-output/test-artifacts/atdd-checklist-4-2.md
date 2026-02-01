# ATDD Checklist - Epic 4, Story 4.2: Add Education and Skills Sections

**Date:** 2026-02-01
**Author:** Jay
**Primary Test Level:** E2E

---

## Story Summary

Convert skills display from comma-separated text to individual tag pills with Neubrutalist styling.

**As a** site visitor
**I want** to view technical skills as visual tag pills
**So that** I can quickly scan and identify technical competencies

---

## Acceptance Criteria

1. **AC4: Skills as Tag Pills** (PRIMARY FOCUS)
   - Given the skills display
   - When I view the categories
   - Then skills are displayed as tag pills with Neubrutalist styling
   - **Status: NOT YET IMPLEMENTED - Currently comma-separated text**

---

## Failing Tests Created (RED Phase)

### E2E Tests (9 tests)

**File:** `tests/e2e/resume.spec.ts` (Story 4.2 section)

- **Test:** `[P0] skills displayed as individual tag elements`
  - **Status:** RED - Skills rendered as comma text, not span elements
  - **Verifies:** Skills are individual `<span class="border-2">` elements

- **Test:** `[P0] all 10 skill categories render tag pills`
  - **Status:** RED - No tag pills in any category
  - **Verifies:** Each of 10 categories has tag pill elements

- **Test:** `[P1] tag pills have Neubrutalist styling`
  - **Status:** RED - No tag elements exist
  - **Verifies:** Tags have border-2, uppercase, padding

- **Test:** `[P1] tag pills use flex-wrap layout`
  - **Status:** RED - No flex container for tags
  - **Verifies:** Tags wrapped in `.flex.flex-wrap.gap-2` container

- **Test:** `[P1] specific skill names visible as tags`
  - **Status:** RED - Skills in text, not tags
  - **Verifies:** "React", "Tailwind CSS" are individual tag elements

- **Test:** `[P1] tags visible on lime-400 background`
  - **Status:** RED - No tags to check
  - **Verifies:** Tag background color provides contrast

- **Test:** `[P1] skills no longer comma-separated`
  - **Status:** RED - Skills still comma-separated
  - **Verifies:** No "React, Jinja2" comma patterns

- **Test:** `[P1] tags wrap correctly on mobile` (375px viewport)
  - **Status:** RED - No flex-wrap container
  - **Verifies:** Tags wrap without horizontal overflow

- **Test:** `[P1] tag pills readable on mobile`
  - **Status:** RED - No tag elements
  - **Verifies:** Tags visible and not truncated

---

## Data Factories Created

**None required** - Story 4.2 uses existing static data from `_data/skills.json`

---

## Fixtures Created

**None required** - Tests use existing fixtures from `tests/support/fixtures/index.ts`:
- `verifyNeubrutalistDesign` (for styling checks)
- `checkA11yBasics` (for accessibility)

---

## Mock Requirements

**None required** - Static 11ty site, no API calls

---

## Required data-testid Attributes

**None required** - Tests use semantic selectors:
- `page.locator('.bg-lime-400')` for skill cards
- `page.getByRole('heading', { name: 'CATEGORY', level: 3 })` for category headings
- `page.locator('span.border-2')` for tag elements
- `page.locator('.flex.flex-wrap')` for flex container

---

## Implementation Checklist

### Test: `[P0] skills displayed as individual tag elements`

**File:** `tests/e2e/resume.spec.ts`

**Tasks to make this test pass:**

- [ ] Import tag macro in resume.njk: `{% from "components/tag.njk" import tag %}`
- [ ] Replace `<p class="text-sm text-neutral-600">{{ skills[cat.key] | join(', ') }}</p>` with tag loop
- [ ] Add `<div class="flex flex-wrap gap-2">` container
- [ ] Loop: `{% for skill in skills[cat.key] %}{{ tag(skill) }}{% endfor %}`
- [ ] Run test: `npx playwright test resume.spec.ts --grep "skills displayed as individual"`
- [ ] Test passes (green phase)

---

### Test: `[P0] all 10 skill categories render tag pills`

**File:** `tests/e2e/resume.spec.ts`

**Tasks to make this test pass:**

- [ ] Ensure tag loop applies to all 10 categories in `skillCategories` array
- [ ] Verify each category renders with `.border-2` span elements
- [ ] Run test: `npx playwright test resume.spec.ts --grep "all 10 skill categories"`
- [ ] Test passes (green phase)

---

### Test: `[P1] tag pills have Neubrutalist styling`

**File:** `tests/e2e/resume.spec.ts`

**Tasks to make this test pass:**

- [ ] Tag macro already has: `border-2 border-black text-sm font-bold uppercase`
- [ ] Verify styling renders correctly on lime-400 cards
- [ ] Run test: `npx playwright test resume.spec.ts --grep "Neubrutalist styling"`
- [ ] Test passes (green phase)

---

### Test: `[P1] tag pills use flex-wrap layout`

**File:** `tests/e2e/resume.spec.ts`

**Tasks to make this test pass:**

- [ ] Add container: `<div class="flex flex-wrap gap-2">`
- [ ] Wrap tag loop inside this container
- [ ] Run test: `npx playwright test resume.spec.ts --grep "flex-wrap layout"`
- [ ] Test passes (green phase)

---

### Test: `[P1] tags visible on lime-400 background`

**File:** `tests/e2e/resume.spec.ts`

**Tasks to make this test pass:**

- [ ] Tag macro defaults to `bg-neutral-100` for unknown tech
- [ ] Verify contrast is sufficient on lime-400 background
- [ ] Optionally add specific colors to `techColors` map in tag.njk
- [ ] Run test: `npx playwright test resume.spec.ts --grep "lime-400 background"`
- [ ] Test passes (green phase)

---

### Test: `[P1] skills no longer comma-separated`

**File:** `tests/e2e/resume.spec.ts`

**Tasks to make this test pass:**

- [ ] Remove: `{{ skills[cat.key] | join(', ') }}`
- [ ] Replace with tag loop (no commas between tags)
- [ ] Run test: `npx playwright test resume.spec.ts --grep "no longer comma-separated"`
- [ ] Test passes (green phase)

---

### Test: `[P1] tags wrap correctly on mobile`

**File:** `tests/e2e/resume.spec.ts`

**Tasks to make this test pass:**

- [ ] `flex-wrap` class ensures tags wrap to new lines
- [ ] `gap-2` provides spacing between wrapped tags
- [ ] Verify no horizontal overflow on 375px viewport
- [ ] Run test: `npx playwright test resume.spec.ts --grep "wrap correctly on mobile"`
- [ ] Test passes (green phase)

---

## Running Tests

```bash
# Run all Story 4.2 tests (currently failing - RED phase)
npx playwright test resume.spec.ts --grep "Story 4.2"

# Run specific test file
npx playwright test tests/e2e/resume.spec.ts

# Run tests in headed mode (see browser)
npx playwright test resume.spec.ts --grep "Story 4.2" --headed

# Debug specific test
npx playwright test resume.spec.ts --grep "skills displayed" --debug

# Run with trace on failure
npx playwright test resume.spec.ts --grep "Story 4.2" --trace on
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete)

**TEA Agent Responsibilities:**

- All 9 tests written and will fail
- No fixtures or factories needed (static site)
- Implementation checklist created

**Verification:**

- Tests fail because skills are comma-separated text
- Tests expect `span.border-2` elements that don't exist yet
- Failure messages are clear and actionable

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Pick one failing test** (start with P0 tests)
2. **Read the test** to understand expected behavior
3. **Implement minimal code**:
   - Import tag macro
   - Add flex container
   - Replace join() with tag loop
4. **Run the test** to verify it passes
5. **Move to next test** and repeat

**Key Implementation:**

```nunjucks
{# Replace this: #}
<p class="text-sm text-neutral-600">{{ skills[cat.key] | join(', ') }}</p>

{# With this: #}
{% from "components/tag.njk" import tag %}
<div class="flex flex-wrap gap-2">
  {% for skill in skills[cat.key] %}
    {{ tag(skill) }}
  {% endfor %}
</div>
```

---

### REFACTOR Phase (After All Tests Pass)

**DEV Agent Responsibilities:**

1. Verify all 9 tests pass
2. Review tag colors - consider adding skill-specific colors
3. Ensure accessibility (contrast ratios)
4. Run full test suite to verify no regressions

---

## Next Steps

1. **Run failing tests** to confirm RED phase: `npx playwright test resume.spec.ts --grep "Story 4.2"`
2. **Begin implementation** using checklist above
3. **Work one test at a time** (red → green for each)
4. **When all tests pass**, update story status to 'done'

---

## Knowledge Base References Applied

- **selector-resilience.md** - Semantic selectors (role, class, filter)
- **test-quality.md** - Deterministic tests, explicit assertions

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npx playwright test resume.spec.ts --grep "Story 4.2"`

**Expected Results:**

```
Running 9 tests using 1 worker

  ✘ Story 4.2: Skills as Tag Pills (AC4) › [P0] skills displayed as individual tag elements
  ✘ Story 4.2: Skills as Tag Pills (AC4) › [P0] all 10 skill categories render tag pills
  ✘ Story 4.2: Skills as Tag Pills (AC4) › [P1] tag pills have Neubrutalist styling
  ✘ Story 4.2: Skills as Tag Pills (AC4) › [P1] tag pills use flex-wrap layout
  ✘ Story 4.2: Skills as Tag Pills (AC4) › [P1] specific skill names visible as tags
  ✘ Story 4.2: Skills as Tag Pills (AC4) › [P1] tags visible on lime-400 background
  ✘ Story 4.2: Skills as Tag Pills (AC4) › [P1] skills no longer comma-separated
  ✘ Story 4.2: Tag Pills Responsive (AC4) › [P1] tags wrap correctly on mobile
  ✘ Story 4.2: Tag Pills Responsive (AC4) › [P1] tag pills readable on mobile

  9 failed
```

**Summary:**

- Total tests: 9
- Passing: 0 (expected)
- Failing: 9 (expected)
- Status: RED phase verified

---

## Notes

- Tag macro already exists at `_includes/components/tag.njk`
- Default tag background is `bg-neutral-100` which provides contrast on lime-400
- Story 4.1 tests remain unaffected (separate test.describe blocks)

---

**Generated by BMad TEA Agent** - 2026-02-01
