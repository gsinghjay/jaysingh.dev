# Story 4.4: Create Contact Page

Status: done

## Story

As a **site visitor**,
I want **to view contact information and social links**,
so that **I can reach out to Jay professionally**.

## Acceptance Criteria

1. **AC1: Contact Page Accessible**
   - Given I navigate to `/contact/`
   - When the page loads
   - Then I see a contact page with available contact methods

2. **AC2: Contact Methods Displayed**
   - Given the contact page
   - When I view the content
   - Then I see links/buttons for Email, GitHub, and LinkedIn

3. **AC3: Email Link Functional**
   - Given I click the Email link
   - When the action completes
   - Then my email client opens with Jay's email address pre-filled

4. **AC4: GitHub Link Functional**
   - Given I click the GitHub link
   - When the navigation completes
   - Then a new tab opens with Jay's GitHub profile

5. **AC5: LinkedIn Link Functional**
   - Given I click the LinkedIn link
   - When the navigation completes
   - Then a new tab opens with Jay's LinkedIn profile

6. **AC6: External Links Security**
   - Given the external links
   - When I inspect the HTML
   - Then links have `target="_blank"` and `rel="noopener noreferrer"` for security

7. **AC7: Neubrutalist Design**
   - Given the contact page
   - When I view the design
   - Then it uses Neubrutalist styling with clear, prominent contact options

8. **AC8: Profile Data Source**
   - Given the contact data
   - When I review the implementation
   - Then it pulls from `_data/profile.json` socialLinks

## Tasks / Subtasks

- [x] Task 1: Create Contact Page Layout (AC: #1, #2, #7, #8)
  - [x] 1.1 Replace placeholder content in `contact.njk` with full implementation
  - [x] 1.2 Add page intro section with heading and descriptive text
  - [x] 1.3 Create contact card grid (1-column mobile, responsive desktop)
  - [x] 1.4 Use `{{ profile.socialLinks }}` from `_data/profile.json` for link URLs
  - [x] 1.5 Apply Neubrutalist card styling (border-4, shadow-brutal, lime/pink/yellow variants)

- [x] Task 2: Implement Contact Cards/Buttons (AC: #2, #3, #4, #5, #6)
  - [x] 2.1 Import button macro: `{% from "components/button.njk" import button %}` (not needed - cards are anchor elements)
  - [x] 2.2 Create Email card with `mailto:` link from `{{ profile.socialLinks.email }}`
  - [x] 2.3 Create GitHub card with external link from `{{ profile.socialLinks.github }}`
  - [x] 2.4 Create LinkedIn card with external link from `{{ profile.socialLinks.linkedin }}`
  - [x] 2.5 Add `target="_blank"` and `rel="noopener noreferrer"` to external links
  - [x] 2.6 Add descriptive icons/labels for each contact method

- [x] Task 3: Add Visual Enhancements (AC: #7)
  - [x] 3.1 Add SVG icons for each contact type (envelope, GitHub logo, LinkedIn logo)
  - [x] 3.2 Style cards with different Neubrutalist colors (Email: yellow, GitHub: lime, LinkedIn: blue)
  - [x] 3.3 Add hover state transitions per architecture spec
  - [x] 3.4 Ensure responsive layout (stack on mobile, row on desktop)

- [x] Task 4: Accessibility Compliance (AC: #1, #2)
  - [x] 4.1 Add proper heading hierarchy (single h1, h2 for sections if needed)
  - [x] 4.2 Add `aria-label` to icon-only elements or ensure visible text labels
  - [x] 4.3 Ensure links are keyboard focusable with visible focus states
  - [x] 4.4 Add descriptive link text (not just "Click here")

- [x] Task 5: Write ATDD Tests (AC: #1-#8)
  - [x] 5.1 Create `tests/e2e/contact.spec.ts` with Story 4.4 tests
  - [x] 5.2 Test page loads at `/contact/` with correct title
  - [x] 5.3 Test email link has correct `mailto:` href
  - [x] 5.4 Test GitHub link has `target="_blank"` and contains github.com
  - [x] 5.5 Test LinkedIn link has `target="_blank"` and contains linkedin.com
  - [x] 5.6 Test external links have `rel="noopener noreferrer"`
  - [x] 5.7 Enable skipped test in `profile.spec.ts` for social links (fixed selector collision)

## Dev Notes

### Profile Data Source

The contact page uses `_data/profile.json` which was created in Story 4.3:

```json
{
  "name": "Jay Singh",
  "role": "Software Engineer",
  "bio": "Full-stack developer specializing in Python/FastAPI, React, and DevOps...",
  "location": "New Jersey, USA",
  "socialLinks": {
    "github": "https://github.com/jaysingh",
    "linkedin": "https://linkedin.com/in/jaysingh",
    "email": "mailto:jay@jaysingh.dev"
  }
}
```

Access in templates:
- `{{ profile.socialLinks.email }}` → `mailto:jay@jaysingh.dev`
- `{{ profile.socialLinks.github }}` → `https://github.com/jaysingh`
- `{{ profile.socialLinks.linkedin }}` → `https://linkedin.com/in/jaysingh`

### Current Contact Page State

The placeholder `contact.njk` exists with minimal content:

```nunjucks
---
layout: layouts/base.njk
title: Contact
description: Get in touch with Jay Singh
permalink: /contact/
---

<h1 class="text-4xl md:text-5xl font-black mb-8">Contact</h1>

{# Content coming in Epic 4 #}
<p class="text-lg">Coming soon...</p>
```

### Target Implementation

Replace placeholder with full contact page:

```nunjucks
---
layout: layouts/base.njk
title: Contact
description: Get in touch with Jay Singh - Email, GitHub, LinkedIn
permalink: /contact/
---

{% from "components/button.njk" import button %}

<h1 class="text-4xl md:text-5xl font-black mb-8">CONTACT</h1>

<p class="text-lg mb-8 max-w-2xl">
  Want to collaborate, discuss a project, or just say hello? Reach out through any of these channels.
</p>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  {# Email Card #}
  <a href="{{ profile.socialLinks.email }}"
     class="contact-card bg-yellow-400 border-4 border-black p-6 text-center transition-all duration-150 active:translate-y-1"
     style="box-shadow: 6px 6px 0 #000">
    <svg class="w-12 h-12 mx-auto mb-4" ...>...</svg>
    <h2 class="text-xl font-black uppercase">Email</h2>
    <p class="text-sm mt-2">jay@jaysingh.dev</p>
  </a>

  {# GitHub Card #}
  <a href="{{ profile.socialLinks.github }}"
     target="_blank"
     rel="noopener noreferrer"
     class="contact-card bg-lime-400 border-4 border-black p-6 text-center transition-all duration-150 active:translate-y-1"
     style="box-shadow: 6px 6px 0 #000">
    <svg class="w-12 h-12 mx-auto mb-4" ...>...</svg>
    <h2 class="text-xl font-black uppercase">GitHub</h2>
    <p class="text-sm mt-2">@jaysingh</p>
  </a>

  {# LinkedIn Card #}
  <a href="{{ profile.socialLinks.linkedin }}"
     target="_blank"
     rel="noopener noreferrer"
     class="contact-card bg-blue-400 border-4 border-black p-6 text-center transition-all duration-150 active:translate-y-1"
     style="box-shadow: 6px 6px 0 #000">
    <svg class="w-12 h-12 mx-auto mb-4" ...>...</svg>
    <h2 class="text-xl font-black uppercase">LinkedIn</h2>
    <p class="text-sm mt-2">in/jaysingh</p>
  </a>
</div>
```

### Architecture Compliance

| Pattern | Requirement | Implementation |
|---------|-------------|----------------|
| File naming | kebab-case | `contact.njk` (already exists) |
| Layout extension | `{% extends %}` | Uses `layout: layouts/base.njk` frontmatter |
| Comments | Nunjucks `{# #}` | No HTML comments |
| External links | Security attributes | `target="_blank" rel="noopener noreferrer"` |
| Focus states | 4px black outline | TailwindCSS focus-visible classes |
| Data access | 11ty cascade | `{{ profile.socialLinks.* }}` |

### SVG Icons

Use simple inline SVGs for contact icons (no external dependencies):

**Email (Envelope):**
```html
<svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  <rect x="2" y="4" width="20" height="16" rx="2"/>
  <path d="M22 6l-10 7L2 6"/>
</svg>
```

**GitHub (Octocat outline or simple logo):**
```html
<svg class="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385..."/>
</svg>
```

**LinkedIn:**
```html
<svg class="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037..."/>
</svg>
```

### Testing Strategy

Create `tests/e2e/contact.spec.ts`:

```typescript
import { test, expect } from '../support/fixtures';

test.describe('Story 4.4: Contact Page (ATDD)', () => {
  test('[P0] contact page loads with correct title', async ({ page }) => {
    await page.goto('/contact/');
    await expect(page).toHaveTitle(/Contact.*Jay Singh/);
  });

  test('[P0] email link has mailto href', async ({ page }) => {
    await page.goto('/contact/');
    const emailLink = page.getByRole('link', { name: /email/i });
    await expect(emailLink).toHaveAttribute('href', /^mailto:/);
  });

  test('[P0] github link opens in new tab', async ({ page }) => {
    await page.goto('/contact/');
    const githubLink = page.getByRole('link', { name: /github/i });
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('href', /github\.com/);
  });

  test('[P0] linkedin link opens in new tab', async ({ page }) => {
    await page.goto('/contact/');
    const linkedinLink = page.getByRole('link', { name: /linkedin/i });
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    await expect(linkedinLink).toHaveAttribute('href', /linkedin\.com/);
  });

  test('[P1] external links have security attributes', async ({ page }) => {
    await page.goto('/contact/');
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();

    for (let i = 0; i < count; i++) {
      await expect(externalLinks.nth(i)).toHaveAttribute('rel', /noopener/);
    }
  });
});
```

**Also update `profile.spec.ts`:** Remove `test.skip()` from the social links test (line 90).

### Previous Story Learnings (from 4.3)

1. **Profile data works correctly** - Templates successfully access `{{ profile.socialLinks }}`
2. **Test patterns established** - Use `getByRole('link', { name: /pattern/i })` for link selection
3. **File list documentation important** - Include all modified/created files in Dev Agent Record
4. **Consistent patterns** - Follow macro import, kebab-case naming, Nunjucks comments

### Git Context (Recent Commits)

```
c5cddbd Add profile data files with template integration (Story 4.3)
ff90f33 Add skills as tag pills with Neubrutalist styling (Story 4.2)
20f5905 Add resume page with work experience and skills (Story 4.1)
```

Story 4.3 created `profile.json` with `socialLinks`. This story consumes that data for the contact page.

### Project Structure Notes

**Files to modify:**
- `contact.njk` - Replace placeholder with full contact page implementation

**Files to create:**
- `tests/e2e/contact.spec.ts` - ATDD tests for Story 4.4

**Files to update:**
- `tests/e2e/profile.spec.ts` - Remove `test.skip()` from social links test
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Update story status

**No new data files needed** - Uses existing `_data/profile.json` from Story 4.3

### Dependencies

- **Depends on Story 4.3:** Uses `profile.socialLinks` from `_data/profile.json`
- **Completes Epic 4:** This is the final story in the Professional Profile epic

### Responsive Design

| Breakpoint | Layout |
|------------|--------|
| Mobile (< md) | Single column stack |
| Tablet/Desktop (md+) | 3-column grid |

Use TailwindCSS: `grid grid-cols-1 md:grid-cols-3 gap-6`

### Color Scheme (Neubrutalist)

| Contact Type | Background | Rationale |
|--------------|------------|-----------|
| Email | `bg-yellow-400` | Warm, personal |
| GitHub | `bg-lime-400` | Tech, matches site accent |
| LinkedIn | `bg-blue-400` | Professional, LinkedIn brand adjacent |

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-4.4] - Acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend-Architecture] - Layout patterns
- [Source: _bmad-output/planning-artifacts/prd.md#Contact-&-Communication] - FR26, FR27
- [Source: _data/profile.json] - Social links data source
- [Source: contact.njk] - Current placeholder to replace
- [Source: _includes/components/button.njk] - Button macro reference
- [Source: tests/e2e/profile.spec.ts] - Skipped test to enable
- [Source: 4-3-implement-profile-data-files.md] - Previous story learnings

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None

### Completion Notes List

- **2026-02-01**: Implemented full contact page with Neubrutalist styling
  - Replaced placeholder `contact.njk` with 3-card grid layout
  - Email card (yellow): `mailto:` link from `profile.socialLinks.email`
  - GitHub card (lime): External link with `target="_blank"` and `rel="noopener noreferrer"`
  - LinkedIn card (blue): External link with security attributes
  - Added inline SVG icons for each contact method (envelope, GitHub, LinkedIn)
  - Responsive grid: 1-column mobile, 3-column desktop (`grid-cols-1 md:grid-cols-3`)
  - Accessibility: `aria-hidden="true"` on decorative icons, visible text labels, keyboard-focusable links with focus-visible states
  - Fixed selector collision in `profile.spec.ts` (changed `/email|contact/i` to `/email/i`)
  - All 10 contact tests passing, all 7 profile tests passing (17 total)

- **2026-02-01**: Code Review Fixes (Claude Opus 4.5)
  - **MEDIUM #1 Fixed**: Corrected File List documentation - `tests/e2e/contact.spec.ts` was CREATED (not pre-existing)
  - **MEDIUM #2 Fixed**: Replaced inline `style="box-shadow: 6px 6px 0 #000"` with TailwindCSS `shadow-brutal-md` class on all 3 contact cards (architecture compliance)
  - LOW issues documented but not fixed (hardcoded display text, test data coupling, no hover animation test) - acceptable for story completion
  - All 50 Story 4.4 tests passing across 6 browsers

### File List

**Modified:**
- `contact.njk` - Full contact page implementation with 3 contact cards (inline styles replaced with TailwindCSS classes per code review)
- `tests/e2e/profile.spec.ts` - Fixed email link selector (line 109)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Story status: in-progress → review

**Created:**
- `tests/e2e/contact.spec.ts` - 10 ATDD tests for Story 4.4

