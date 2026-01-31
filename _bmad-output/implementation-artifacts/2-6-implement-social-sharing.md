# Story 2.6: Implement Social Sharing

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **site visitor**,
I want **to share blog posts on social media**,
so that **I can share interesting content with my network**.

## Acceptance Criteria

1. **AC1: Share Buttons Visible**
   - Given I am on a blog post detail page
   - When I look for sharing options
   - Then I see social share buttons (Twitter/X, LinkedIn, and a generic Share button)

2. **AC2: Web Share API Support**
   - Given the browser supports Web Share API
   - When I click the Share button
   - Then the native share dialog opens with the post title and URL

3. **AC3: Platform Fallback Buttons**
   - Given the browser does not support Web Share API
   - When I click a specific platform button (Twitter, LinkedIn)
   - Then a new window opens with the platform's share URL pre-populated

4. **AC4: Vanilla JS Implementation**
   - Given the share functionality
   - When I review the JavaScript
   - Then it uses vanilla JS with progressive enhancement per Architecture spec

5. **AC5: Keyboard Accessibility**
   - Given the share buttons
   - When I use keyboard navigation
   - Then all buttons are focusable and activatable

6. **AC6: Reusable Partial**
   - Given the social share component
   - When I review the code
   - Then it is implemented as a reusable partial (`partials/social-share.njk`)

## Tasks / Subtasks

- [x] Task 1: Create social-share partial template (AC: #1, #6)
  - [x] 1.1 Create `_includes/partials/social-share.njk`
  - [x] 1.2 Implement Twitter/X share button with icon
  - [x] 1.3 Implement LinkedIn share button with icon
  - [x] 1.4 Implement generic Share button (for Web Share API)
  - [x] 1.5 Style with Neubrutalist design (border-4, shadow-brutal, hover effects)
  - [x] 1.6 Accept page title and URL as macro parameters

- [x] Task 2: Add JavaScript for share functionality (AC: #2, #3, #4)
  - [x] 2.1 Add `initSocialShare()` function to `js/main.js`
  - [x] 2.2 Use event delegation with `data-share-*` attributes
  - [x] 2.3 Implement Web Share API for generic Share button (feature detection)
  - [x] 2.4 Implement fallback URLs for Twitter/X: `https://twitter.com/intent/tweet?url={url}&text={title}`
  - [x] 2.5 Implement fallback URLs for LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url={url}`
  - [x] 2.6 Open platform URLs in new window with appropriate dimensions
  - [x] 2.7 Hide generic Share button if Web Share API not supported

- [x] Task 3: Integrate into blog post layout (AC: #1)
  - [x] 3.1 Add `{% include "partials/social-share.njk" %}` to `_includes/layouts/blog-post.njk`
  - [x] 3.2 Position after content card, before bottom back button
  - [x] 3.3 Pass `title` and `page.url` variables to partial

- [x] Task 4: Ensure accessibility (AC: #5)
  - [x] 4.1 Add `aria-label` to each share button describing action
  - [x] 4.2 Ensure visible focus states on all buttons (Neubrutalist 4px black outline)
  - [x] 4.3 Buttons must be keyboard-activatable (Enter/Space)
  - [x] 4.4 Test with keyboard-only navigation

- [x] Task 5: Add CSS styles (AC: #1)
  - [x] 5.1 Add `.social-share-*` styles to `css/input.css` if needed
  - [x] 5.2 Ensure consistent button sizing and spacing
  - [x] 5.3 Mobile-responsive layout (stack vertically on small screens)

- [x] Task 6: Write ATDD tests (AC: #1-6)
  - [x] 6.1 Test share buttons visible on blog detail page
  - [x] 6.2 Test Twitter button opens correct URL
  - [x] 6.3 Test LinkedIn button opens correct URL
  - [x] 6.4 Test Web Share API integration (where supported)
  - [x] 6.5 Test keyboard navigation for share buttons
  - [x] 6.6 Test responsive layout (mobile stacking)

## Dev Notes

### CRITICAL: Implementation Approach

**Architecture Decision:** Per the Architecture document, social sharing uses progressive enhancement:
1. If Web Share API is available → generic "Share" button triggers native share dialog
2. Always show Twitter/X and LinkedIn buttons → these work in all browsers via intent URLs

**DO NOT:** Add any server-side tracking, add Facebook share (not mentioned in PRD), or require any external JavaScript libraries.

### Current Template Structure

**Target location in `_includes/layouts/blog-post.njk`:**
The share buttons should appear **after** the content card and **before** the bottom back button. Current structure (lines 63-79):

```nunjucks
{# Content Card #}
{% call card("lg") %}
  <div class="prose max-w-none" id="blog-content">
    {{ content | safe }}
  </div>
{% endcall %}

{# === SOCIAL SHARE GOES HERE === #}

{# Bottom back button #}
<div class="mt-12 flex justify-center">
  ...
</div>
```

### Platform Share URLs

**Twitter/X Intent URL:**
```
https://twitter.com/intent/tweet?url={encodedUrl}&text={encodedTitle}
```

**LinkedIn Share URL:**
```
https://www.linkedin.com/sharing/share-offsite/?url={encodedUrl}
```

Note: LinkedIn only accepts URL, not text parameter.

### Web Share API Implementation

```javascript
// Feature detection
if (navigator.share) {
  // Web Share API available
  navigator.share({
    title: 'Post Title',
    url: 'https://jaysingh.dev/blog/post-slug/'
  });
}
```

**Browser Support:** Chrome (all platforms), Safari (iOS/macOS), Edge. Not Firefox desktop. Use progressive enhancement - hide generic Share button where unsupported.

### Partial Template Pattern

**Create `_includes/partials/social-share.njk`:**

```nunjucks
{# Social share buttons for blog posts
   Usage: {% include "partials/social-share.njk" %}
   Requires: title, page.url variables in scope
#}
<div class="social-share mt-8 flex flex-wrap justify-center gap-4" role="region" aria-label="Share this post">
  {# Twitter/X share #}
  <button
    class="inline-flex items-center gap-2 px-4 py-2 bg-white border-4 border-black font-bold uppercase text-sm hover:bg-lime-300 transition-all duration-150 active:translate-y-1"
    style="box-shadow: 4px 4px 0 #000;"
    data-share-twitter
    data-share-url="{{ page.url | url }}"
    data-share-title="{{ title }}"
    aria-label="Share on Twitter">
    {# Twitter/X icon #}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
    TWITTER
  </button>

  {# LinkedIn share #}
  <button
    class="inline-flex items-center gap-2 px-4 py-2 bg-white border-4 border-black font-bold uppercase text-sm hover:bg-lime-300 transition-all duration-150 active:translate-y-1"
    style="box-shadow: 4px 4px 0 #000;"
    data-share-linkedin
    data-share-url="{{ page.url | url }}"
    aria-label="Share on LinkedIn">
    {# LinkedIn icon #}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
    </svg>
    LINKEDIN
  </button>

  {# Generic Share button (Web Share API) - hidden if unsupported #}
  <button
    class="inline-flex items-center gap-2 px-4 py-2 bg-pink-400 border-4 border-black font-bold uppercase text-sm hover:bg-lime-300 transition-all duration-150 active:translate-y-1 hidden"
    style="box-shadow: 4px 4px 0 #000;"
    data-share-native
    data-share-url="{{ page.url | url }}"
    data-share-title="{{ title }}"
    aria-label="Share this post">
    {# Share icon #}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
    </svg>
    SHARE
  </button>
</div>
```

### JavaScript Implementation Pattern

**Add to `js/main.js` after `initCodeCopy()` initialization:**

```javascript
// Social share functionality
function initSocialShare() {
  // Show native share button if Web Share API is available
  const nativeShareBtn = document.querySelector('[data-share-native]');
  if (nativeShareBtn && navigator.share) {
    nativeShareBtn.classList.remove('hidden');
  }

  // Event delegation for all share buttons
  document.addEventListener('click', async (e) => {
    // Twitter share
    const twitterBtn = e.target.closest('[data-share-twitter]');
    if (twitterBtn) {
      const url = encodeURIComponent(window.location.origin + twitterBtn.dataset.shareUrl);
      const title = encodeURIComponent(twitterBtn.dataset.shareTitle);
      window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        'share-twitter',
        'width=550,height=450'
      );
      return;
    }

    // LinkedIn share
    const linkedinBtn = e.target.closest('[data-share-linkedin]');
    if (linkedinBtn) {
      const url = encodeURIComponent(window.location.origin + linkedinBtn.dataset.shareUrl);
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        'share-linkedin',
        'width=550,height=450'
      );
      return;
    }

    // Native share (Web Share API)
    const nativeBtn = e.target.closest('[data-share-native]');
    if (nativeBtn && navigator.share) {
      try {
        await navigator.share({
          title: nativeBtn.dataset.shareTitle,
          url: window.location.origin + nativeBtn.dataset.shareUrl
        });
      } catch (err) {
        // User cancelled or error - ignore silently
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    }
  });
}
```

### URL Construction Notes

**CRITICAL:** The `page.url` in 11ty returns the **path** only (e.g., `/blog/docker-observability/`). For share URLs, we need the **full URL** including domain.

Options:
1. Use `site.url + page.url` in template (requires `_data/site.json` with `url` field)
2. Use `window.location.origin + shareUrl` in JavaScript (recommended - works without data file)

**Recommended:** Pass path via `data-share-url`, construct full URL in JavaScript using `window.location.origin`.

### Existing JavaScript Patterns to Follow

From `js/main.js`:
- Use `data-*` attributes for element targeting (e.g., `data-share-twitter`)
- Event delegation via `document.addEventListener('click', ...)`
- Feature detection before using APIs
- `closest()` for finding parent elements from click target
- Clean error handling in async functions

### CSS Considerations

**Existing button patterns (from header, back buttons):**
```css
/* Neubrutalist button base */
.inline-flex.items-center.gap-2.px-4.py-2.bg-white.border-4.border-black.font-bold.uppercase.text-sm

/* Hover state */
hover:bg-lime-300

/* Active/pressed state */
active:translate-y-1

/* Shadow via inline style */
style="box-shadow: 4px 4px 0 #000;"
```

**Focus state (add to `css/input.css` if not present):**
```css
[data-share-twitter]:focus-visible,
[data-share-linkedin]:focus-visible,
[data-share-native]:focus-visible {
  outline: 4px solid black;
  outline-offset: 2px;
}
```

### Testing Strategy

**Test file:** `tests/e2e/blog.spec.ts`

**Key test scenarios:**

```typescript
test.describe('Story 2.6: Social Sharing', () => {
  test('[P0] share buttons visible on blog detail', async ({ page }) => {
    await page.goto('/blog/docker-observability/');
    await expect(page.locator('[data-share-twitter]')).toBeVisible();
    await expect(page.locator('[data-share-linkedin]')).toBeVisible();
  });

  test('[P1] Twitter share opens correct URL', async ({ page, context }) => {
    await page.goto('/blog/docker-observability/');

    // Listen for popup
    const popupPromise = context.waitForEvent('page');
    await page.click('[data-share-twitter]');
    const popup = await popupPromise;

    const url = popup.url();
    expect(url).toContain('twitter.com/intent/tweet');
    expect(url).toContain(encodeURIComponent('docker-observability'));
  });

  test('[P1] LinkedIn share opens correct URL', async ({ page, context }) => {
    await page.goto('/blog/docker-observability/');

    const popupPromise = context.waitForEvent('page');
    await page.click('[data-share-linkedin]');
    const popup = await popupPromise;

    const url = popup.url();
    expect(url).toContain('linkedin.com/sharing');
    expect(url).toContain(encodeURIComponent('docker-observability'));
  });

  test('[P1] share buttons are keyboard accessible', async ({ page }) => {
    await page.goto('/blog/docker-observability/');

    // Tab to Twitter button
    const twitterBtn = page.locator('[data-share-twitter]');
    await twitterBtn.focus();
    await expect(twitterBtn).toBeFocused();

    // Tab to LinkedIn button
    await page.keyboard.press('Tab');
    const linkedinBtn = page.locator('[data-share-linkedin]');
    await expect(linkedinBtn).toBeFocused();
  });

  test('[P2] Web Share API button hidden when unsupported', async ({ page }) => {
    // Most Playwright browsers don't support Web Share API
    await page.goto('/blog/docker-observability/');
    await expect(page.locator('[data-share-native]')).toBeHidden();
  });
});
```

### Project Structure Notes

**Files to create:**
- `_includes/partials/social-share.njk` (new partial)

**Files to modify:**
- `_includes/layouts/blog-post.njk` (include partial after content)
- `js/main.js` (add initSocialShare function)
- `css/input.css` (add focus styles if needed)
- `tests/e2e/blog.spec.ts` (add Story 2.6 tests)

**Files unchanged:**
- `eleventy.config.js` (no new filters needed)
- `blog.njk` (listing page - no share buttons)

### Previous Story Intelligence

**From Story 2.5 (Reading Time Display):**
- Successfully used 11ty filter pattern
- Templates updated without breaking existing functionality
- ATDD tests verify feature across all browsers

**From Story 2.4 (Code Copy Functionality):**
- Event delegation pattern in `js/main.js` works well
- Use `data-*` attributes for JavaScript hooks
- Handle async operations with try/catch
- Reset state after user interaction (timeout pattern)

**Key learnings for this story:**
- Follow event delegation pattern from code copy
- Use `data-share-*` attributes consistently
- Progressive enhancement: buttons work without JS (links), enhanced with JS
- Test popup windows in Playwright using `context.waitForEvent('page')`

### Git Intelligence Summary

**Recent commit pattern:** `Add {feature} with ATDD tests (Story {x.y})`

**Files changed in recent stories:**
- Always includes ATDD tests in `tests/e2e/blog.spec.ts`
- JavaScript changes to `js/main.js`
- Template changes to layouts or partials
- CSS changes to `css/input.css` when styling needed

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-2.6] - Acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#Client-Side-JavaScript] - JS patterns (data attributes, event delegation)
- [Source: _bmad-output/planning-artifacts/architecture.md#Template-Organization] - Partial pattern
- [Source: _bmad-output/planning-artifacts/prd.md#FR15] - Social sharing requirement
- [Source: js/main.js:111-142] - Event delegation pattern (code copy)
- [Source: _includes/layouts/blog-post.njk:63-79] - Content card and back button location
- [Source: _bmad-output/implementation-artifacts/2-5-*.md] - Previous story patterns
- [Source: _bmad-output/implementation-artifacts/2-4-*.md] - Code copy JS patterns

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None required.

### Completion Notes List

- Created reusable `social-share.njk` partial with Twitter/X, LinkedIn, and native Share buttons
- Implemented `initSocialShare()` in main.js using event delegation pattern (consistent with code copy)
- Twitter/X button opens twitter.com/intent/tweet (redirects to x.com)
- LinkedIn button opens linkedin.com/sharing/share-offsite (updated API endpoint)
- Native Share button uses Web Share API with feature detection (hidden when unsupported)
- All buttons have Neubrutalist styling: 4px black border, brutal shadow, lime-300 hover
- Accessibility: aria-labels, keyboard navigation (Tab/Enter/Space), visible focus states
- Mobile responsive: flex-wrap with centered gap layout
- ATDD tests: 41 passed, 8 skipped (mobile popup tests - browser emulation limitation)
- Full regression suite: 989 passed, 24 skipped - no regressions

### Code Review Fixes (2026-01-31)

- **M1 Fixed:** Added popup blocker fallback - if `window.open()` returns null, navigates to share URL in current window
- **L1 Fixed:** Updated LinkedIn share URL from deprecated `shareArticle?mini=true` to current `sharing/share-offsite/?url=` API
- **L2 Fixed:** Added Space key activation test for share buttons (keyboard accessibility completeness)
- **L3 Fixed:** Removed verbose `role="region"` from share section, kept `aria-label` for accessibility

### File List

- `_includes/partials/social-share.njk` (created, then modified - removed role="region")
- `_includes/layouts/blog-post.njk` (modified - added social share include)
- `js/main.js` (modified - added initSocialShare function, added popup blocker handling, updated LinkedIn URL)
- `tests/e2e/blog.spec.ts` (modified - Story 2.6 tests, Space key test, updated LinkedIn URL assertion)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified - status update)

