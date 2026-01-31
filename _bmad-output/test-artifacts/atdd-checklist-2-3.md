# ATDD Checklist - Epic 2, Story 2.3: Implement Syntax Highlighting

**Date:** 2026-01-30
**Author:** Jay
**Primary Test Level:** E2E

---

## Story Summary

**As a** site visitor,
**I want** code blocks with syntax highlighting,
**So that** code examples are readable and language-specific.

---

## Acceptance Criteria

1. **AC1:** Plugin Configured - `@11ty/eleventy-plugin-syntaxhighlight` configured in eleventy.config.js
2. **AC2:** Build-Time Highlighting - Code blocks rendered with syntax highlighting at build time (no client JS)
3. **AC3:** Token Colors - Keywords, strings, comments, and other tokens have distinct colors
4. **AC4:** Multi-Language Support - JavaScript, Python, Bash, YAML highlighting works
5. **AC5:** Neubrutalist Styling - Borders, background contrast, monospace font
6. **AC6:** Horizontal Scrolling - Long code blocks scroll horizontally (no text wrapping)

---

## Failing Tests Created (RED Phase)

### E2E Tests (18 tests)

**File:** `tests/e2e/blog.spec.ts` (appended to existing)

#### Passing Tests (Already Working - 14 tests)

| Priority | Test | Status | Verifies |
|----------|------|--------|----------|
| P0 | code blocks have Prism language class | ✅ GREEN | AC1 - Plugin generates classes |
| P0 | code blocks contain token spans (pre-rendered) | ✅ GREEN | AC2 - Build-time rendering |
| P2 | syntax highlighting requires no client-side JavaScript | ✅ GREEN | AC2 - No JS needed |
| P1 | comment tokens have muted color | ✅ GREEN | AC3 - (vacuously, no comments in test content) |
| P1 | function tokens have distinct color | ✅ GREEN | AC3 - (vacuously, function check optional) |
| P1 | YAML code blocks highlight correctly | ✅ GREEN | AC4 - YAML language class detected |
| P2 | language class matches code content | ✅ GREEN | AC4 - All blocks have tokens |
| P1 | code blocks have 4px black border | ✅ GREEN | AC5 - Neubrutalist borders |
| P1 | code blocks have dark background | ✅ GREEN | AC5 - Dark bg-neutral-900 |
| P1 | code uses monospace font | ✅ GREEN | AC5 - Monospace font-family |
| P2 | code blocks have proper padding | ✅ GREEN | AC5 - Readable padding |
| P1 | code blocks have horizontal scroll enabled | ✅ GREEN | AC6 - overflow-x: auto |
| P1 | code does not wrap text | ✅ GREEN | AC6 - white-space preserved |
| P2 | long lines trigger scrollbar | ✅ GREEN | AC6 - Scroll behavior |

#### Failing Tests (Need Implementation - 4 tests)

| Priority | Test | Status | Failure Reason |
|----------|------|--------|----------------|
| P0 | keyword tokens have distinct color | 🔴 RED | Color is `rgb(255,255,255)` - no CSS styles |
| P0 | string tokens have distinct color | 🔴 RED | Color is `rgb(255,255,255)` - no CSS styles |
| P0 | different token types have different colors | 🔴 RED | All tokens same white color |
| P1 | Python code blocks highlight correctly | 🔴 RED | Keywords visible but unstyled |

---

## Required CSS (To Make Tests Pass)

### Prism Token Color Styles

Add to `css/input.css`:

```css
/* Prism Token Colors - Neubrutalist Theme */
.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #6b7280; /* neutral-500 - muted comments */
}

.token.punctuation {
  color: #e5e7eb; /* neutral-200 - subtle punctuation */
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol {
  color: #dc2626; /* red-600 - values */
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin {
  color: #22c55e; /* green-500 - strings */
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #f59e0b; /* amber-500 - operators */
}

.token.atrule,
.token.attr-value,
.token.keyword {
  color: #a855f7; /* purple-500 - keywords */
}

.token.function,
.token.class-name {
  color: #3b82f6; /* blue-500 - functions */
}

.token.regex,
.token.important,
.token.variable {
  color: #f97316; /* orange-500 - regex/variables */
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}
```

---

## Implementation Checklist

### Test: keyword tokens have distinct color

**File:** `tests/e2e/blog.spec.ts:782`

**Tasks to make this test pass:**

- [ ] Add `.token.keyword` CSS rule with purple color
- [ ] Verify Python `def`, `return`, `import` keywords get styled
- [ ] Run test: `npx playwright test --grep "keyword tokens"`
- [ ] ✅ Test passes (green phase)

---

### Test: string tokens have distinct color

**File:** `tests/e2e/blog.spec.ts:802`

**Tasks to make this test pass:**

- [ ] Add `.token.string` CSS rule with green color
- [ ] Verify quoted strings in code blocks get styled
- [ ] Run test: `npx playwright test --grep "string tokens"`
- [ ] ✅ Test passes (green phase)

---

### Test: different token types have different colors

**File:** `tests/e2e/blog.spec.ts:819`

**Tasks to make this test pass:**

- [ ] Add all Prism token CSS rules (keyword, string, comment, function, etc.)
- [ ] Verify keyword color ≠ string color
- [ ] Run test: `npx playwright test --grep "different token types"`
- [ ] ✅ Test passes (green phase)

---

### Test: Python code blocks highlight correctly

**File:** `tests/e2e/blog.spec.ts:877`

**Tasks to make this test pass:**

- [ ] Complete all token CSS rules
- [ ] Verify Python-specific tokens are styled (def, import, class)
- [ ] Run test: `npx playwright test --grep "Python code blocks"`
- [ ] ✅ Test passes (green phase)

---

## Running Tests

```bash
# Run all Story 2.3 tests
npx playwright test --grep "Story 2.3" --project=chromium

# Run only failing token color tests
npx playwright test --grep "Token Colors" --project=chromium

# Run in headed mode (see browser)
npx playwright test --grep "Story 2.3" --project=chromium --headed

# Debug specific test
npx playwright test --grep "keyword tokens" --project=chromium --debug
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete) ✅

**TEA Agent Responsibilities:**

- ✅ All 18 tests written and running
- ✅ 4 tests failing as expected (token colors)
- ✅ 14 tests passing (infrastructure already working)
- ✅ Implementation checklist created

**Verification:**

- Token color tests fail with: `Expected: not "rgb(255, 255, 255)"`
- This confirms no Prism CSS theme exists

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Add Prism CSS token styles** to `css/input.css`
2. **Run failing tests** to verify they now pass
3. **Check all 18 tests pass** (green phase complete)

**Key Tasks:**

- [ ] Copy Prism token CSS from "Required CSS" section above
- [ ] Paste into `css/input.css` after `.prose` rules
- [ ] Run: `npx playwright test --grep "Story 2.3"`
- [ ] Verify: 18/18 tests passing

---

### REFACTOR Phase (DEV Team - After All Tests Pass)

**Optional improvements:**

- Adjust token colors for better contrast on dark background
- Add language-specific styling if needed
- Consider adding diff highlighting support (`.token.inserted`, `.token.deleted`)

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npx playwright test --grep "Story 2.3" --project=chromium`

**Results:**

```
Running 18 tests using 8 workers

  ✅ Passed: 14
  🔴 Failed: 4

Failures:
  - [P0] keyword tokens have distinct color
    Error: expect(received).not.toBe(expected)
    Expected: not "rgb(255, 255, 255)"

  - [P0] string tokens have distinct color
    Error: expect(received).not.toBe(expected)
    Expected: not "rgb(255, 255, 255)"

  - [P0] different token types have different colors
    Error: expect(received).not.toBe(expected)
    Expected: not "rgb(255, 255, 255)"

  - [P1] Python code blocks highlight correctly
    Error: expect(received).not.toBe(expected)
```

**Summary:**

- Total tests: 18
- Passing: 14 (infrastructure working)
- Failing: 4 (need Prism CSS theme)
- Status: ✅ RED phase verified

---

## Notes

- Plugin `@11ty/eleventy-plugin-syntaxhighlight@^5.0.2` is already installed and configured
- Prism classes ARE being generated in HTML (e.g., `.token.keyword`, `.token.string`)
- Only the CSS styling for these classes is missing
- Test post used: `/blog/docker-observability/` (has Python and YAML code blocks)

---

## Knowledge Base References Applied

- **test-quality.md** - Deterministic waits, explicit assertions, no hard sleeps
- **selector-resilience.md** - Semantic selectors (`.token.keyword` classes from Prism)

---

**Generated by BMad TEA Agent** - 2026-01-30
