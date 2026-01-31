# Story 2.5: Implement Reading Time Display

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **site visitor**,
I want **to see estimated reading time for blog posts**,
so that **I can decide if I have time to read the article**.

## Acceptance Criteria

1. **AC1: Build-Time Calculation**
   - Given a blog post with content
   - When 11ty builds the site
   - Then reading time is calculated based on word count (~200-250 words per minute)

2. **AC2: Display on Detail Page**
   - Given I view a blog post detail page
   - When I look at the post header/metadata
   - Then I see the estimated reading time displayed (e.g., "5 min read")

3. **AC3: Display on Listing Page**
   - Given the blog listing page
   - When I view a post card
   - Then the reading time is displayed alongside date and tags

4. **AC4: 11ty Filter Implementation**
   - Given the reading time calculation
   - When I review the implementation
   - Then it uses an 11ty filter or computed data (not client-side JS)

5. **AC5: Minimum Value**
   - Given a very short post (< 1 minute)
   - When I view the reading time
   - Then it displays "1 min read" (minimum)

## Tasks / Subtasks

- [x] Task 1: Create readingTime filter in eleventy.config.js (AC: #1, #4, #5)
  - [x] 1.1 Add `readingTime` filter that accepts content string
  - [x] 1.2 Strip HTML tags from content to get plain text
  - [x] 1.3 Count words (split by whitespace)
  - [x] 1.4 Calculate minutes at 200 WPM (standard average reading speed)
  - [x] 1.5 Return minimum of 1 minute
  - [x] 1.6 Format output as "X min read"

- [x] Task 2: Update blog listing page to use calculated reading time (AC: #3)
  - [x] 2.1 Modify `blog.njk` to use `{{ post.content | readingTime }}` filter
  - [x] 2.2 Fallback to `post.data.readTime` frontmatter if filter unavailable (N/A - filter always available)
  - [x] 2.3 Verify existing display location and styling preserved

- [x] Task 3: Update blog post detail page to use calculated reading time (AC: #2)
  - [x] 3.1 Modify `_includes/layouts/blog-post.njk` header section
  - [x] 3.2 Replace `{{ readTime }}` with calculated value from content
  - [x] 3.3 Verify styling and positioning unchanged

- [x] Task 4: Handle edge cases (AC: #5)
  - [x] 4.1 Test with very short post content (< 200 words) - Filter returns "1 min read" minimum
  - [x] 4.2 Test with code blocks (should code be counted?) - Counts all text including code (conservative estimate)
  - [x] 4.3 Ensure filter handles undefined/null content gracefully - Returns "1 min read"

- [x] Task 5: Write ATDD tests (AC: #1-5)
  - [x] 5.1 Test reading time displays on blog listing page
  - [x] 5.2 Test reading time displays on blog detail page
  - [x] 5.3 Test reading time format matches "X min read"
  - [x] 5.4 Test short posts show "1 min read" minimum
  - [x] 5.5 Test calculated value vs frontmatter value matches (consistency check)

- [x] Task 6: Verify React parity (AC: #2, #3)
  - [x] 6.1 Compare reading time display with React implementation
  - [x] 6.2 Ensure font styling matches (font-bold, text-neutral-500)
  - [x] 6.3 Run all Story 2.5 ATDD tests - 45 passed (9 tests × 5 browsers)

## Dev Notes

### CRITICAL: Current Implementation Status

**Current state:** Blog posts have `readTime` hardcoded in frontmatter (e.g., `readTime: 10 min`). The templates already display this value. This story adds **automatic calculation** as an enhancement.

**Decision Point:** Two approaches:
1. **Option A: Keep frontmatter, add filter as enhancement** - Continue using frontmatter `readTime`, add filter for validation or override
2. **Option B: Replace frontmatter with calculated value** - Remove hardcoded `readTime` from frontmatter, calculate dynamically (RECOMMENDED per PRD FR16)

**Recommended: Option B** - This aligns with PRD requirement FR16 "Visitors can see estimated reading time for blog posts" and prevents manual maintenance. The filter provides consistent, accurate values.

### Current Template Locations

**Blog Listing (`blog.njk` lines 20-24):**
```nunjucks
<div class="flex items-center gap-4 text-sm text-neutral-500">
  <span>{{ post.data.date | date }}</span>
  <span>{{ post.data.readTime }}</span>
</div>
```

**Blog Detail (`_includes/layouts/blog-post.njk` lines 24-29):**
```nunjucks
<div class="flex items-center gap-4 text-sm text-neutral-500">
  <span>{{ date | date }}</span>
  {% if lastUpdated and lastUpdated != date %}
    <span>Updated: {{ lastUpdated | date }}</span>
  {% endif %}
  <span class="font-bold">{{ readTime }}</span>
</div>
```

### 11ty Filter Implementation Pattern

**Add to `eleventy.config.js` (after existing filters ~line 87):**

```javascript
// Reading time filter for blog posts
// Calculates estimated reading time from content at 200 WPM
eleventyConfig.addFilter("readingTime", (content) => {
  if (!content) return "1 min read";

  // Strip HTML tags to get plain text
  const text = content.replace(/<[^>]*>/g, '');

  // Count words (split by whitespace, filter empty)
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Calculate minutes at 200 WPM (standard average reading speed)
  const minutes = Math.ceil(wordCount / 200);

  // Minimum 1 minute
  const readTime = Math.max(1, minutes);

  return `${readTime} min read`;
});
```

### Template Changes Required

**In `blog.njk` (listing page):**
```nunjucks
{# Change from: #}
<span>{{ post.data.readTime }}</span>

{# Change to: #}
<span>{{ post.content | readingTime }}</span>
```

**In `_includes/layouts/blog-post.njk` (detail page):**
```nunjucks
{# Change from: #}
<span class="font-bold">{{ readTime }}</span>

{# Change to: #}
<span class="font-bold">{{ content | readingTime }}</span>
```

### Existing Filter Patterns in eleventy.config.js

The project already has several filters established:
- `date` filter (lines 41-58) - Date formatting with UTC handling
- `getCategoryFromTags` filter (lines 61-67) - Category extraction from tags
- `where` filter (lines 70-80) - Array filtering by attribute
- `take` filter (lines 83-86) - First N items from array

**Follow the same pattern:** Export function with clear documentation, handle edge cases gracefully.

### Word Count Considerations

**What counts toward reading time:**
- Regular body text
- Heading text
- List items

**What should NOT count (or count less):**
- Code blocks (readers skim or copy, don't read word-by-word)
- Mermaid diagram code blocks

**Simple approach (recommended for MVP):** Count all text including code. This gives a conservative (higher) estimate. If refinement needed post-MVP, adjust WPM for technical content.

### Test Post Analysis

**Current frontmatter values:**
| Post | Hardcoded readTime | Estimated Words |
|------|-------------------|-----------------|
| docker-observability | 10 min | ~1,500 words |
| oauth2-authentication-gateway | 12 min | ~1,800 words |
| building-fastapi-microservices | 10 min | ~1,500 words |
| postgresql-performance | 12 min | ~1,800 words |
| ci-cd-best-practices | 9 min | ~1,400 words |

At 200 WPM, these match reasonably well. Use `/blog/docker-observability/` for primary testing.

### Project Structure Notes

- **Filter location:** `eleventy.config.js` (existing filter section)
- **Listing template:** `blog.njk` (root level)
- **Detail template:** `_includes/layouts/blog-post.njk`
- **Test location:** `tests/e2e/blog.spec.ts`

### Accessibility Considerations

- Reading time is informational, not interactive
- Screen readers will read the text naturally
- No ARIA attributes needed
- Styling via existing `text-neutral-500` provides sufficient contrast

### Testing Strategy

**Test file:** `tests/e2e/blog.spec.ts`

**Tests to add:**
```typescript
test.describe('Story 2.5: Reading Time Display', () => {
  test('[P0] reading time displays on blog listing', async ({ page }) => {
    await page.goto('/blog/');
    const readingTime = page.locator('text=/\\d+ min read/').first();
    await expect(readingTime).toBeVisible();
  });

  test('[P0] reading time displays on blog detail', async ({ page }) => {
    await page.goto('/blog/docker-observability/');
    const readingTime = page.locator('.font-bold', { hasText: /\d+ min read/ });
    await expect(readingTime).toBeVisible();
  });

  test('[P1] reading time format is correct', async ({ page }) => {
    await page.goto('/blog/docker-observability/');
    const readingTime = page.locator('text=/\\d+ min read/').first();
    const text = await readingTime.textContent();
    expect(text).toMatch(/^\d+ min read$/);
  });

  test('[P1] reading time is reasonable for content length', async ({ page }) => {
    await page.goto('/blog/docker-observability/');
    const readingTime = page.locator('text=/\\d+ min read/').first();
    const text = await readingTime.textContent();
    const minutes = parseInt(text);
    // Docker observability post is ~1500 words, should be 7-10 min
    expect(minutes).toBeGreaterThanOrEqual(5);
    expect(minutes).toBeLessThanOrEqual(15);
  });
});
```

### Previous Story Intelligence

**From Story 2.4 (Code Copy Functionality):**
- All JS functionality in `js/main.js` using event delegation
- CSS changes in `css/input.css` using TailwindCSS @apply
- Tests in `tests/e2e/blog.spec.ts` with P0/P1 priority markers
- Clipboard permissions needed special handling in Playwright config

**Relevant learnings for this story:**
- This story requires NO JavaScript changes (build-time filter only)
- Template changes are minimal (swap variable for filter)
- Follow existing test patterns in `blog.spec.ts`

### Git Intelligence Summary

**Recent commits show pattern:**
- Stories build incrementally on blog functionality
- ATDD tests written alongside implementation
- Code review catches edge cases

**Files to modify:**
- `eleventy.config.js` - Add readingTime filter
- `blog.njk` - Update reading time display
- `_includes/layouts/blog-post.njk` - Update reading time display
- `tests/e2e/blog.spec.ts` - Add Story 2.5 tests

**Files unchanged:**
- `js/main.js` - No JavaScript needed
- `css/input.css` - No CSS changes needed

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-2.5] - Acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#11ty-Filters] - Filter patterns
- [Source: _bmad-output/planning-artifacts/prd.md#FR16] - Reading time requirement
- [Source: eleventy.config.js:41-86] - Existing filter implementations
- [Source: blog.njk:20-24] - Current listing page reading time display
- [Source: _includes/layouts/blog-post.njk:24-29] - Current detail page reading time display
- [Source: _bmad-output/implementation-artifacts/2-4-*.md] - Previous story patterns

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None required - implementation straightforward per Dev Notes guidance.

### Completion Notes List

- Implemented `readingTime` filter in `eleventy.config.js:88-104` following existing filter patterns
- Filter strips HTML tags, counts words, calculates at 200 WPM, enforces 1 min minimum
- Updated `blog.njk:22` to use `{{ post.content | readingTime }}`
- Updated `blog-post.njk:29` to use `{{ content | readingTime }}`
- All 9 ATDD tests pass across 5 browsers (45 test runs total)
- Full regression suite: 950 passed, 18 skipped, 0 failed
- Reading time now calculated dynamically instead of hardcoded frontmatter
- Option B implemented per Dev Notes recommendation (PRD FR16 alignment)

**Code Review Fixes (2026-01-31):**
- Extracted `readingTime` filter to `lib/filters.js` for testability
- Added `WORDS_PER_MINUTE` constant (200) to replace magic number
- Created 22 unit tests in `tests/unit/filters.test.js` using Node built-in test runner
- All unit tests pass, verifying edge cases: null/undefined, empty, HTML stripping, word counts

### File List

- `eleventy.config.js` - Imports readingTime filter from lib/filters.js (line 2, 91)
- `lib/filters.js` - Extracted readingTime filter with WORDS_PER_MINUTE constant (new file)
- `blog.njk` - Updated to use readingTime filter (line 22)
- `_includes/layouts/blog-post.njk` - Updated to use readingTime filter (line 29)
- `tests/e2e/blog.spec.ts` - Story 2.5 ATDD tests (lines 1236-1386)
- `tests/unit/filters.test.js` - Unit tests for readingTime filter (new file, 22 tests)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Sprint tracking updates

