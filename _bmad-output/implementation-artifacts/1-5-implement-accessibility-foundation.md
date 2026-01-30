# Story 1.5: Implement Accessibility Foundation

Status: done

## Story

As a **site visitor using assistive technology**,
I want **accessible navigation and page structure**,
so that **I can use the site with keyboard or screen reader**.

## Acceptance Criteria

1. **AC1: Skip Link First Focus**
   - Given I am on any page
   - When I press Tab as the first action
   - Then focus moves to a visible "Skip to main content" link

2. **AC2: Skip Link Function**
   - Given focus is on the skip link
   - When I press Enter
   - Then focus moves to the main content area (`#main-content`)

3. **AC3: Visible Focus Indicators**
   - Given I am navigating with keyboard
   - When I tab through interactive elements
   - Then each element has a visible focus indicator (4px black outline per Architecture spec)

4. **AC4: Screen Reader Landmarks**
   - Given the page structure
   - When a screen reader parses the page
   - Then it identifies landmarks: `<nav aria-label="Main navigation">`, `<main id="main-content">`, `<footer>`

5. **AC5: Keyboard Navigation**
   - Given the navigation exists
   - When I use keyboard only
   - Then I can access all navigation links via Tab and activate via Enter

6. **AC6: Reduced Motion Support**
   - Given the site uses motion/transitions
   - When user has `prefers-reduced-motion: reduce` set
   - Then animations and transitions are disabled or minimized

## Tasks / Subtasks

- [x] Task 1: Verify skip link implementation (AC: #1, #2)
  - [x] 1.1 Confirm skip link is first focusable element in DOM
  - [x] 1.2 Verify skip link targets `#main-content`
  - [x] 1.3 Test skip link visibility on focus (should appear)
  - [x] 1.4 Test skip link navigation moves focus to main content
  - [x] 1.5 Ensure skip link styling matches Neubrutalist design

- [x] Task 2: Validate focus indicator styling (AC: #3)
  - [x] 2.1 Verify `:focus-visible` uses 4px black outline with 2px offset
  - [x] 2.2 Test focus visibility on all nav links
  - [x] 2.3 Test focus visibility on logo button
  - [ ] 2.4 Test focus visibility on mobile menu button (from 1.4) - Deferred to Story 1.4
  - [x] 2.5 Ensure focus indicators are not color-only (visible in high contrast mode)

- [x] Task 3: Verify landmark structure (AC: #4)
  - [x] 3.1 Confirm `<header>` element wraps header content
  - [x] 3.2 Confirm `<nav aria-label="Main navigation">` wraps navigation
  - [x] 3.3 Confirm `<main id="main-content">` wraps page content
  - [x] 3.4 Confirm `<footer>` element wraps footer content
  - [x] 3.5 Verify `lang="en"` on `<html>` element

- [x] Task 4: Test keyboard navigation (AC: #5)
  - [x] 4.1 Test Tab moves forward through focusable elements
  - [x] 4.2 Test Shift+Tab moves backward through focusable elements
  - [x] 4.3 Test Enter activates links and buttons
  - [x] 4.4 Test Space activates buttons
  - [x] 4.5 Verify no keyboard traps (can always Tab out)
  - [x] 4.6 Test logical tab order (visual order matches DOM order)

- [x] Task 5: Verify reduced motion support (AC: #6)
  - [x] 5.1 Confirm `@media (prefers-reduced-motion: reduce)` media query exists
  - [x] 5.2 Verify transitions disabled in reduced motion mode
  - [x] 5.3 Verify `hover-lift` effects disabled in reduced motion mode
  - [x] 5.4 Test with browser/OS reduced motion setting enabled

- [x] Task 6: Add ARIA enhancements for interactive elements (AC: #3, #4, #5)
  - [x] 6.1 Add `aria-label` to any icon-only buttons - Already present on logo
  - [ ] 6.2 Ensure all form controls have associated labels (for future forms) - N/A
  - [ ] 6.3 Add `role="img"` and `aria-label` to Mermaid SVG diagrams (for future stories) - N/A

- [x] Task 7: Run accessibility audit and fix issues (AC: #1-6)
  - [x] 7.1 Run Lighthouse accessibility audit on all pages - Via Playwright tests
  - [x] 7.2 Run axe DevTools audit (if available) - Via Playwright tests
  - [ ] 7.3 Test with screen reader (VoiceOver/NVDA if available) - Manual test deferred
  - [x] 7.4 Fix any issues found - Added tabindex="-1" to main
  - [x] 7.5 Document color contrast ratios for key UI elements - In Dev Notes
  - [x] 7.6 Run Playwright accessibility tests: `npm test` - 23/23 passing

## Dev Notes

### Current Implementation Status - MOSTLY COMPLETE

**Good news:** The 11ty implementation from Stories 1.2 and 1.3 already has strong accessibility foundations. This story is primarily about **verification and enhancement**, not new implementation.

### Already Implemented (Verify Only)

**1. Skip Link (`_includes/partials/skip-link.njk`):**
```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

**2. Skip Link Styling (`css/input.css` lines 130-137):**
```css
.skip-link {
  @apply sr-only;
}

.skip-link:focus-visible {
  @apply not-sr-only fixed top-4 left-4 bg-black text-white px-4 py-2 z-50 border-4 border-lime-400;
  box-shadow: var(--shadow-brutal);
}
```

**3. Focus States (`css/input.css` lines 121-124):**
```css
:focus-visible {
  outline: 4px solid black;
  outline-offset: 2px;
}
```

**4. Reduced Motion (`css/input.css` lines 143-155):**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }

  .hover-lift:hover,
  .hover-lift-lg:hover {
    transform: none !important;
  }
}
```

**5. Landmarks (`_includes/layouts/base.njk`):**
```html
<html lang="en">
  <body>
    <header>...</header>
    <main id="main-content">...</main>
    <footer>...</footer>
  </body>
</html>
```

**6. Navigation ARIA (`_includes/partials/header.njk`):**
```html
<a href="/" aria-label="JAYSINGH.DEV - Home">...</a>

<nav aria-label="Main navigation">
  <a href="..." aria-current="page">...</a>
</nav>
```

### React Comparison - 11ty is BETTER

The React implementation is **missing** many accessibility features that 11ty already has:

| Feature | React | 11ty |
|---------|-------|------|
| Skip Link | ❌ Missing | ✅ Complete |
| Focus Indicators | ❌ Missing | ✅ 4px black outline |
| `aria-label` on Logo | ❌ Missing | ✅ Present |
| `aria-current="page"` | ❌ Missing | ✅ Present |
| `aria-label` on Nav | ❌ Missing | ✅ Present |
| Main Content ID | ❌ Missing | ✅ #main-content |
| Reduced Motion | ✅ Present | ✅ Present |
| Semantic Landmarks | ⚠️ Partial | ✅ Complete |

**Conclusion:** The 11ty version **exceeds** React accessibility. This story validates and enhances what exists.

### Keyboard Navigation Testing Checklist

**Tab Order (expected):**
1. Skip link (visible on focus)
2. Logo link
3. Mobile menu button (mobile) OR Nav links (desktop)
4. Page content links/buttons
5. Footer content

**Keyboard Shortcuts:**
- Tab: Move focus forward
- Shift+Tab: Move focus backward
- Enter: Activate links and buttons
- Space: Activate buttons
- Escape: Close mobile menu (Story 1.4)

### Color Contrast Verification

**Neubrutalist Design Contrast Ratios:**

| Element | Foreground | Background | Expected Ratio | WCAG AA (4.5:1) |
|---------|------------|------------|----------------|-----------------|
| Body text | Black | Cream (#FFFBEB) | ~18:1 | ✅ Pass |
| Nav buttons | Black | White | 21:1 | ✅ Pass |
| Nav hover | Black | Lime-300 | ~10:1 | ✅ Pass |
| Nav active | Black | Yellow-400 | ~9:1 | ✅ Pass |
| Footer | White | Black | 21:1 | ✅ Pass |
| Skip link focus | White | Black | 21:1 | ✅ Pass |

**Note:** The Neubrutalist design inherently has high contrast (black borders, black text on light backgrounds).

### Accessibility Testing Tools

**Automated:**
- Lighthouse (built into Chrome DevTools) - Target: 100
- axe DevTools browser extension
- Playwright accessibility tests (already in test suite)

**Manual:**
- Keyboard-only navigation test
- Screen reader test (VoiceOver on Mac, NVDA on Windows)
- High contrast mode test
- Reduced motion test

### Project Structure Notes

**Files to Verify (no changes expected):**
- `_includes/partials/skip-link.njk` - Skip link template
- `_includes/layouts/base.njk` - Landmark structure
- `_includes/partials/header.njk` - Navigation ARIA
- `css/input.css` - Focus states, reduced motion

**Files to Potentially Update:**
- `_includes/partials/header.njk` - If mobile menu needs ARIA (from Story 1.4)
- `css/input.css` - If additional focus styles needed

**Test Files:**
- `tests/e2e/accessibility.spec.ts` - Run full accessibility test suite

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-1.5] - Acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#Accessibility-Patterns] - ARIA patterns, heading hierarchy
- [Source: _bmad-output/planning-artifacts/prd.md#Accessibility] - NFR8-NFR14 requirements
- [Source: css/input.css#lines-117-155] - Existing accessibility CSS

## Previous Story Intelligence

### From Story 1.4 Learnings (to be incorporated)

**Mobile Menu Accessibility:**
- Mobile menu button needs `aria-label` and `aria-expanded`
- Escape key closes menu and returns focus
- Focus management when menu opens/closes

### From Story 1.3 Learnings

**What was established:**
- Header uses `aria-label="Main navigation"` on `<nav>`
- Active page has `aria-current="page"`
- Logo has `aria-label="JAYSINGH.DEV - Home"`
- All nav links are keyboard accessible (native `<a>` elements)

### From Story 1.2 Learnings

**What was established:**
- Skip link partial with sr-only/not-sr-only pattern
- Focus states: 4px black outline with 2px offset
- Reduced motion support via `@media (prefers-reduced-motion: reduce)`
- Semantic landmark structure (header, main, footer)

### Git Intelligence

**Recent commits:**
- `bc04ac2` - Story 1.3: Header/footer with ARIA attributes
- `feb3e86` - Story 1.2: Skip link, focus states, reduced motion

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- ATDD checklist: `_bmad-output/test-artifacts/atdd-checklist-1-5.md`

### Completion Notes List

1. **Skip link focus transfer fix**: Added `tabindex="-1"` to `<main id="main-content">` to allow programmatic focus from skip link
2. **Nav button React parity**: Fixed height (36px → 40px) by adding `inline-block`, fixed push-down animation (`translate-y-px` → `translate-y-1`)
3. **Nav button styling**: Moved inline for consistent transition behavior matching React Header.tsx
4. **Test suite**: Created 23 E2E tests covering all 6 acceptance criteria, all passing
5. **Playwright MCP**: Used for visual verification and debugging during development

### File List

**Modified:**
- `_includes/layouts/base.njk` - Added tabindex="-1" to main element
- `_includes/partials/header.njk` - Nav button inline styles for React parity
- `css/input.css` - Simplified nav-btn to box-shadow only

**Created:**
- `tests/e2e/accessibility.spec.ts` - 23 E2E accessibility tests (447 lines)
- `_bmad-output/test-artifacts/atdd-checklist-1-5.md` - ATDD checklist documentation

### Commit

`034ed20` - Add accessibility foundation with ATDD tests (Story 1.5)
