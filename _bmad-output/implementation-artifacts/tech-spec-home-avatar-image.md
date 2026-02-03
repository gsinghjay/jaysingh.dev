---
title: 'Replace Home Page Avatar with Profile Image'
slug: 'home-avatar-image'
created: '2026-02-02'
status: 'completed'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['11ty', 'Nunjucks', 'TailwindCSS', 'Playwright']
files_to_modify: ['index.njk', 'public/images/', 'tests/e2e/home-page.spec.ts']
code_patterns: ['brutal-shadow', 'passthrough-copy']
test_patterns: ['playwright-e2e']
---

# Tech-Spec: Replace Home Page Avatar with Profile Image

**Created:** 2026-02-02

## Overview

### Problem Statement

The home page hero section displays a placeholder wave emoji (👋) in a styled box instead of a real avatar image. This looks temporary and doesn't represent Jay personally.

### Solution

Replace the emoji with Jay's avatar image (`docs/jay-singh-avatar-1.jpg`), maintaining the neubrutalist design aesthetic with a lime border and brutal shadow. The image will fill the 128x128 box completely.

### Scope

**In Scope:**
- Copy avatar image to `public/images/avatar.jpg`
- Update `index.njk` hero section to use `<img>` tag
- Update e2e tests to verify image instead of emoji

**Out of Scope:**
- Other pages (resume, contact, etc.)
- Image optimization or responsive variants
- Any other home page changes

## Context for Development

### Codebase Patterns

- **Static assets**: Files in `public/` are passthrough-copied to `_site/` root via `eleventy.config.js`
- **Brutal styling**: 4px black borders, `box-shadow: 4px 4px 0 #000` pattern used throughout
- **Image location**: `public/images/` → accessible at `/images/` in browser

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `index.njk:17-20` | Current avatar div with emoji - replace with `<img>` tag |
| `docs/jay-singh-avatar-1.jpg` | Source avatar image (512x512 JPG) |
| `public/images/avatar.jpg` | Destination path for avatar |
| `tests/e2e/home-page.spec.ts:34-46` | Test `[P0] hero section displays emoji avatar` - update selector |
| `tests/e2e/home-page.spec.ts:308` | Mobile test checking emoji - update to check image |
| `eleventy.config.js:181` | Passthrough copy: `{ "public": "." }` → `/images/avatar.jpg` |

### Technical Decisions

1. **Image filename**: Use `avatar.jpg` for simplicity and potential reuse
2. **Styling approach**: Keep 128x128 dimensions, replace lime background with lime border on the image itself
3. **Alt text**: "Jay Singh" (concise, descriptive)

## Implementation Plan

### Tasks

- [x] **Task 1**: Copy avatar image to public folder
  - Copy `docs/jay-singh-avatar-1.jpg` to `public/images/avatar.jpg`

- [x] **Task 2**: Update home page template
  - File: `index.njk:17-20`
  - Replace:
    ```njk
    <div class="w-32 h-32 bg-lime-400 border-4 border-black flex items-center justify-center text-6xl flex-shrink-0"
         style="box-shadow: 4px 4px 0 #000;">
      👋
    </div>
    ```
  - With:
    ```njk
    <img src="/images/avatar.jpg"
         alt="Jay Singh"
         class="w-32 h-32 border-4 border-lime-400 object-cover flex-shrink-0"
         style="box-shadow: 4px 4px 0 #000;">
    ```

- [x] **Task 3**: Update e2e tests
  - File: `tests/e2e/home-page.spec.ts`
  - **Lines 34-46** - Update test name and selector:
    - Rename: `'[P0] hero section displays emoji avatar'` → `'[P0] hero section displays avatar image'`
    - Change selector from `.bg-lime-400` with text to `page.getByRole('img', { name: 'Jay Singh' })`
    - Update dimension check to work with img element
  - **Line 308** - Update mobile test:
    - Change `page.getByText('👋')` → `page.getByRole('img', { name: 'Jay Singh' })`

### Acceptance Criteria

```gherkin
AC1: Avatar image displays on home page
  Given I navigate to the home page
  When the page loads
  Then I should see Jay's avatar image in the hero section
  And the image should have alt text "Jay Singh"

AC2: Avatar maintains brutal design aesthetic
  Given the avatar image is displayed
  Then it should be 128x128 pixels
  And have a 4px lime-400 border
  And have the brutal shadow (4px 4px 0 #000)

AC3: Avatar image is accessible
  Given the avatar image is displayed
  Then it should have appropriate alt text
  And the image should load successfully (no broken image)

AC4: E2E tests pass
  Given the implementation is complete
  When I run the Playwright tests
  Then all home page tests should pass
```

## Additional Context

### Dependencies

- None - all dependencies already in place

### Testing Strategy

1. **Manual verification**: Run dev server, check home page visually
2. **E2E tests**: Update and run `tests/e2e/home-page.spec.ts`
3. **Build verification**: Run `npm run build` to ensure image copies correctly

### Notes

- The original implementation used emoji as a placeholder per Story 1-6
- This is a visual enhancement with minimal code change
- Image is already available at `docs/jay-singh-avatar-1.jpg`

## Review Notes

- Adversarial review completed
- Findings: 12 total, 12 fixed, 0 skipped
- Resolution approach: fix-all

### Enhancements Applied (beyond original scope)

1. **Image optimization**: Resized from 52KB to 6KB (1x) + 16KB (2x retina)
2. **Responsive images**: Added srcset for 1x/2x device pixel ratios
3. **CLS prevention**: Added explicit width/height attributes
4. **Performance**: Added loading="eager", decoding="async", fetchpriority="high"
5. **Fallback**: Added onerror handler to show emoji if image fails
6. **Accessibility**: Enhanced alt text to "Jay Singh - Software Engineer"
7. **Test robustness**: Added naturalWidth check to verify image loads
8. **Cleanup**: Removed duplicate source image from docs/
