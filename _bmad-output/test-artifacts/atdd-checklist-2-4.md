# ATDD Checklist - Epic 2, Story 2.4: Implement Code Copy Functionality

**Date:** 2026-01-30
**Author:** Jay
**Primary Test Level:** E2E

---

## Story Summary

As a site visitor, I want to copy code from code blocks so that I can easily use examples in my own projects.

**As a** site visitor
**I want** to copy code from code blocks
**So that** I can easily use examples in my own projects

---

## Acceptance Criteria

1. **AC1**: Copy button visible on syntax-highlighted code blocks
2. **AC2**: Click copy button → code copied to clipboard
3. **AC3**: Visual feedback ("COPIED" for 2s, then reverts to "COPY")
4. **AC4**: Vanilla JS with event delegation and data-* attributes
5. **AC5**: Graceful degradation (code visible if JS disabled)
6. **AC6**: Keyboard accessible (focusable, Enter/Space activation)

---

## Failing Tests Created (RED Phase)

### E2E Tests (15 tests)

**File:** `tests/e2e/blog.spec.ts` (lines 1036-1291)

#### Story 2.4: Code Copy Button Visibility (AC1)

- ✅ **Test:** `[P0] copy button is visible on code blocks`
  - **Status:** RED - `[data-copy-button]` element not found
  - **Verifies:** Copy button appears on code blocks

- ✅ **Test:** `[P0] language label displays correctly`
  - **Status:** RED - `.code-block-language` element not found
  - **Verifies:** Header shows language name in uppercase

- ✅ **Test:** `[P1] code block has wrapper structure`
  - **Status:** RED - `[data-code-block]` wrapper not found
  - **Verifies:** Code blocks wrapped with header structure

- ✅ **Test:** `[P2] multiple code blocks each have copy button`
  - **Status:** RED - No copy buttons found
  - **Verifies:** Each code block gets its own copy button

#### Story 2.4: Copy Feedback (AC2, AC3)

- ✅ **Test:** `[P0] copy button shows COPIED feedback on click`
  - **Status:** RED - No button to click
  - **Verifies:** Button text changes to "COPIED" on click

- ✅ **Test:** `[P0] copy button reverts after feedback timeout`
  - **Status:** RED - No button to click
  - **Verifies:** Button reverts to "COPY" after 2 seconds

- ✅ **Test:** `[P1] copy button has visual state change during feedback`
  - **Status:** RED - No button to click
  - **Verifies:** Button gets `is-copied` class during feedback

#### Story 2.4: Keyboard Accessibility (AC6)

- ✅ **Test:** `[P1] copy button is keyboard focusable`
  - **Status:** RED - No button to focus
  - **Verifies:** Button receives focus via Tab

- ✅ **Test:** `[P1] Enter key activates copy button`
  - **Status:** RED - No button to activate
  - **Verifies:** Enter key triggers copy action

- ✅ **Test:** `[P2] Space key activates copy button`
  - **Status:** RED - No button to activate
  - **Verifies:** Space key triggers copy action

- ✅ **Test:** `[P2] copy button has visible focus indicator`
  - **Status:** RED - No button to check
  - **Verifies:** Focus outline is visible (not 0px)

#### Story 2.4: Neubrutalist Styling (AC1)

- ✅ **Test:** `[P1] copy button has lime-400 background`
  - **Status:** RED - No button to check
  - **Verifies:** Button background is `rgb(163, 230, 53)`

- ✅ **Test:** `[P1] copy button has black border`
  - **Status:** RED - No button to check
  - **Verifies:** Button has 2px black border

- ✅ **Test:** `[P1] code block header has black background`
  - **Status:** RED - No header to check
  - **Verifies:** Header background is `rgb(0, 0, 0)`

- ✅ **Test:** `[P2] code block header has flex layout`
  - **Status:** RED - No header to check
  - **Verifies:** Header uses flexbox with space-between

---

## API Tests (0 tests)

No API endpoints required for this story (browser-only feature).

---

## Data Factories Created

None required - this story uses static DOM elements only.

---

## Fixtures Created

No new fixtures required - uses existing `verifyNeubrutalistDesign` fixture from `tests/support/fixtures/index.ts`.

---

## Mock Requirements

None - this story uses the native `navigator.clipboard.writeText()` API which works in real browser contexts.

---

## Required data-testid Attributes

### Code Block Wrapper

- `data-code-block` - Wrapper container for enhanced code block
- `data-copy-button` - Copy button element for event delegation

### CSS Classes Required

- `.code-block-wrapper` - Container styling
- `.code-block-header` - Header bar with language + button
- `.code-block-language` - Language label styling
- `.code-block-copy` - Copy button styling
- `.is-copied` - Copied state modifier

**Implementation Example:**

```html
<div class="code-block-wrapper" data-code-block>
  <div class="code-block-header">
    <span class="code-block-language">PYTHON</span>
    <button class="code-block-copy" data-copy-button aria-label="Copy Python code">
      COPY
    </button>
  </div>
  <pre class="language-python" tabindex="0">
    <code class="language-python">...</code>
  </pre>
</div>
```

---

## Implementation Checklist

### Test: `[P0] copy button is visible on code blocks`

**File:** `tests/e2e/blog.spec.ts:1058`

**Tasks to make this test pass:**

- [ ] Create `initCodeCopy()` function in `js/main.js`
- [ ] Find all `pre[class*="language-"]` elements on page load
- [ ] Create wrapper div with `data-code-block` attribute
- [ ] Create header div with `.code-block-header` class
- [ ] Create button with `data-copy-button` attribute and "COPY" text
- [ ] Add button to header, wrap pre element
- [ ] Run test: `npx playwright test --grep "copy button is visible"`
- [ ] ✅ Test passes (green phase)

---

### Test: `[P0] language label displays correctly`

**File:** `tests/e2e/blog.spec.ts:1070`

**Tasks to make this test pass:**

- [ ] Extract language from `pre` class (e.g., `language-python` → `PYTHON`)
- [ ] Create span with `.code-block-language` class
- [ ] Set text content to uppercase language name
- [ ] Add label to header before button
- [ ] Run test: `npx playwright test --grep "language label displays"`
- [ ] ✅ Test passes (green phase)

---

### Test: `[P0] copy button shows COPIED feedback on click`

**File:** `tests/e2e/blog.spec.ts:1116`

**Tasks to make this test pass:**

- [ ] Add click event delegation on document for `[data-copy-button]`
- [ ] Get code text from `wrapper.querySelector('code').textContent`
- [ ] Call `navigator.clipboard.writeText(codeText)`
- [ ] Change button text to "COPIED" on success
- [ ] Run test: `npx playwright test --grep "shows COPIED feedback"`
- [ ] ✅ Test passes (green phase)

---

### Test: `[P0] copy button reverts after feedback timeout`

**File:** `tests/e2e/blog.spec.ts:1128`

**Tasks to make this test pass:**

- [ ] Set `setTimeout(() => { button.textContent = 'COPY'; }, 2000)`
- [ ] Ensure timeout clears any previous timeout (debounce)
- [ ] Run test: `npx playwright test --grep "reverts after feedback"`
- [ ] ✅ Test passes (green phase)

---

### Test: `[P1] copy button has lime-400 background`

**File:** `tests/e2e/blog.spec.ts:1222`

**Tasks to make this test pass:**

- [ ] Add CSS in `css/input.css`:
  ```css
  .code-block-copy {
    @apply px-2 py-1 bg-lime-400 text-black border-2 border-black text-xs font-bold uppercase;
  }
  ```
- [ ] Run test: `npx playwright test --grep "lime-400 background"`
- [ ] ✅ Test passes (green phase)

---

### Test: `[P1] code block header has black background`

**File:** `tests/e2e/blog.spec.ts:1255`

**Tasks to make this test pass:**

- [ ] Add CSS in `css/input.css`:
  ```css
  .code-block-header {
    @apply flex items-center justify-between bg-black text-white px-4 py-2 border-4 border-black;
  }
  ```
- [ ] Run test: `npx playwright test --grep "header has black background"`
- [ ] ✅ Test passes (green phase)

---

## Running Tests

```bash
# Run all failing tests for this story
npx playwright test --grep "Story 2.4" --project=chromium

# Run specific test file
npx playwright test tests/e2e/blog.spec.ts --grep "Story 2.4"

# Run tests in headed mode (see browser)
npx playwright test --grep "Story 2.4" --headed --project=chromium

# Debug specific test
npx playwright test --grep "copy button is visible" --debug

# Run with trace on failure
npx playwright test --grep "Story 2.4" --trace=on
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete) ✅

**TEA Agent Responsibilities:**

- ✅ All tests written and failing (15 tests)
- ✅ Tests use real assertions (not placeholders)
- ✅ Resilient selectors (`[data-copy-button]`, `.code-block-language`)
- ✅ data-testid requirements listed
- ✅ Implementation checklist created

**Verification:**

```
15 failed
All tests fail due to missing [data-copy-button] elements
```

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Pick one failing test** from implementation checklist (start with P0)
2. **Read the test** to understand expected behavior
3. **Implement minimal code** to make that specific test pass
4. **Run the test** to verify it now passes (green)
5. **Check off the task** in implementation checklist
6. **Move to next test** and repeat

**Recommended Order:**

1. `[P0] copy button is visible` - Creates DOM structure
2. `[P0] language label displays correctly` - Adds language extraction
3. `[P1] code block has wrapper structure` - Should pass after #1
4. `[P0] copy button shows COPIED feedback` - Adds click handler
5. `[P0] copy button reverts after feedback` - Adds timeout
6. Remaining P1/P2 tests - Styling and accessibility

**Key Principles:**

- One test at a time (don't try to fix all at once)
- Minimal implementation (don't over-engineer)
- Run tests frequently (immediate feedback)

---

### REFACTOR Phase (DEV Team - After All Tests Pass)

**DEV Agent Responsibilities:**

1. **Verify all tests pass** (green phase complete)
2. **Review code for quality** (readability, maintainability)
3. **Extract duplications** (DRY principle)
4. **Ensure tests still pass** after each refactor

---

## Next Steps

1. **Review this checklist** with team
2. **Run failing tests** to confirm RED phase: `npx playwright test --grep "Story 2.4"`
3. **Begin implementation** using checklist as guide
4. **Work one test at a time** (red → green for each)
5. **When all tests pass**, refactor code for quality
6. **When complete**, update story status to 'done'

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **test-quality.md** - Deterministic tests, no hard waits, explicit assertions
- **selector-resilience.md** - data-testid > ARIA > text > CSS hierarchy

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npx playwright test --grep "Story 2.4" --project=chromium`

**Results:**

```
15 failed
  [chromium] › blog.spec.ts:1058 › Story 2.4: Code Copy Button Visibility (AC1) › [P0] copy button is visible on code blocks
  [chromium] › blog.spec.ts:1070 › Story 2.4: Code Copy Button Visibility (AC1) › [P0] language label displays correctly
  [chromium] › blog.spec.ts:1083 › Story 2.4: Code Copy Button Visibility (AC1) › [P1] code block has wrapper structure
  ... (12 more)
```

**Summary:**

- Total tests: 15
- Passing: 0 (expected)
- Failing: 15 (expected)
- Status: ✅ RED phase verified

---

## Notes

- All tests target `/blog/docker-observability/` which has multiple Python and YAML code blocks
- Clipboard API (`navigator.clipboard.writeText()`) requires HTTPS or localhost
- The React reference implementation in `src/components/CodeBlock.tsx` provides styling guidance
- Implementation should go in `js/main.js` (runtime enhancement) and `css/input.css` (styling)

---

**Generated by BMad TEA Agent** - 2026-01-30
