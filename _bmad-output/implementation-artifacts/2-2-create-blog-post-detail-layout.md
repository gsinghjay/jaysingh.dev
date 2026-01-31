# Story 2.2: Create Blog Post Detail Layout

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **site visitor**,
I want **to read a complete blog post**,
so that **I can learn from the technical content**.

## Acceptance Criteria

1. **AC1: Blog Post Renders from Markdown**
   - Given a blog post exists in `_content/blog/`
   - When I navigate to `/blog/{post-id}/`
   - Then I see the full blog post content rendered from Markdown

2. **AC2: Post Header with Metadata**
   - Given the blog post detail page
   - When I view the header
   - Then I see the post title, publication date, author, and tags

3. **AC3: Layout Extends Base**
   - Given the blog post layout
   - When I review the code
   - Then it uses `{% extends "layouts/base.njk" %}` pattern per Architecture spec

4. **AC4: Readable Typography**
   - Given the blog post content
   - When I view the typography
   - Then body text is readable with proper line height, headings have clear hierarchy

5. **AC5: Clean URL Structure**
   - Given the blog post page
   - When I view the URL
   - Then it is a clean URL (`/blog/docker-observability/`) using the post's `id` field from frontmatter

6. **AC6: Heading Hierarchy Preserved**
   - Given the Markdown content includes headings
   - When I inspect the rendered HTML
   - Then heading hierarchy is preserved (h1 for title, h2/h3 for sections)

## Tasks / Subtasks

- [x] Task 1: Create blog-post layout template (AC: #3, #4)
  - [x] 1.1 Create `_includes/layouts/blog-post.njk`
  - [x] 1.2 Use `{% extends "layouts/base.njk" %}` pattern
  - [x] 1.3 Define `content` block for article content
  - [x] 1.4 Add prose styling for Markdown content

- [x] Task 2: Implement post header section (AC: #2, #6)
  - [x] 2.1 Add category tag (using existing `getCategoryFromTags` filter)
  - [x] 2.2 Add metadata row: date, lastUpdated (if different), readTime
  - [x] 2.3 Style title: first word highlighted with `bg-pink-400` (match React)
  - [x] 2.4 Add author byline section (if author data exists)
  - [x] 2.5 Add technology tags using `tag.njk` macro

- [x] Task 3: Implement "Back to Posts" navigation (AC: #1)
  - [x] 3.1 Add back button at top: `← BACK TO POSTS` linking to `/blog/`
  - [x] 3.2 Style with Neubrutalist button: `bg-white border-4 border-black shadow-brutal`
  - [x] 3.3 Add hover state: `hover:bg-lime-300`
  - [x] 3.4 Add back button at bottom: `← BACK TO ALL POSTS`

- [x] Task 4: Apply blog content frontmatter and permalink (AC: #5)
  - [x] 4.1 Ensure `permalink: /blog/{{ id }}/` in blog post frontmatter
  - [x] 4.2 Set layout to `layouts/blog-post.njk` in blog posts
  - [x] 4.3 Verify all 5 posts have correct permalinks

- [x] Task 5: Style prose content (AC: #4, #6)
  - [x] 5.1 Add TailwindCSS prose classes or custom prose styles
  - [x] 5.2 Style headings: h2 gets `text-2xl font-black`, h3 gets `text-xl font-bold`
  - [x] 5.3 Style paragraphs: `text-lg leading-relaxed text-neutral-700 mb-6`
  - [x] 5.4 Style code blocks with Neubrutalist borders
  - [x] 5.5 Style blockquotes with left border and background

- [x] Task 6: Wrap content in Card component (AC: #4)
  - [x] 6.1 Use `card.njk` macro with size="lg" for main content
  - [x] 6.2 Card should contain rendered Markdown body

- [x] Task 7: Verify React parity (AC: #1-6)
  - [x] 7.1 Compare layout with React `src/components/BlogDetail.tsx`
  - [x] 7.2 Verify header styling matches React
  - [x] 7.3 Verify prose typography matches React
  - [x] 7.4 Run ATDD tests in `tests/e2e/blog.spec.ts`

- [x] Task 8: Implement Table of Contents sidebar (Optional Enhancement)
  - [x] 8.1 Add TOC sidebar HTML structure (sticky, hidden on mobile)
  - [x] 8.2 Add JavaScript to extract h2/h3 headings from content
  - [x] 8.3 Generate TOC navigation items with click-to-scroll
  - [x] 8.4 Track scroll position and highlight active section
  - [x] 8.5 Display scroll progress percentage
  - [x] 8.6 Add 5 E2E tests for TOC functionality

## Dev Notes

### CRITICAL: React Parity Requirement

The user requires **1:1 parity with React implementation**. The React blog detail is in `src/components/BlogDetail.tsx`.

### React Implementation Reference

**Source File:** `src/components/BlogDetail.tsx`

**Page Structure (exact):**
```jsx
<div className="min-h-screen bg-cream py-16">
  <ReadingProgress />  {/* Note: Deferred to Story 2.5 or later */}
  <div className="max-w-6xl mx-auto px-6 relative">
    {/* Back button */}
    <button className="flex items-center gap-2 px-4 py-2 bg-white border-4 border-black font-bold uppercase text-sm hover:bg-lime-300 transition-all duration-150 active:translate-y-1 mb-8"
            style={{ boxShadow: '6px 6px 0 #000' }}>
      <ArrowLeft size={20} /> BACK TO POSTS
    </button>

    {/* Main content grid */}
    <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-8">
      <div className="lg:col-start-1">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Tag variant="category">{getCategoryFromTags(post.tags)}</Tag>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <span>{post.date}</span>
              {post.lastUpdated && post.lastUpdated !== post.date && (
                <span>Updated: {post.lastUpdated}</span>
              )}
              <span className="font-bold">{post.readTime}</span>
            </div>
          </div>

          {/* Title with first word highlighted */}
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-pink-400">{firstWord}</span> {restOfTitle}
          </h1>

          {/* Author byline (if exists) */}
          {post.author && (
            <div className="flex items-center gap-3 mb-6 p-4 bg-white border-4 border-black"
                 style={{ boxShadow: '4px 4px 0 #000' }}>
              {post.author.avatar && <img ... />}
              <div>
                <p className="font-bold">{post.author.name}</p>
                {post.author.bio && <p className="text-sm text-neutral-600">{post.author.bio}</p>}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
          </div>
        </div>

        {/* Content Card */}
        <Card size="lg">
          <div className="prose max-w-none">
            {/* Rendered markdown content */}
          </div>
        </Card>

        {/* Social Share - Deferred to Story 2.6 */}
        <div className="mt-8"><SocialShare title={post.title} /></div>

        {/* Related Projects - Deferred to Story 2.7 */}
        {relatedProjects.length > 0 && <RelatedProjects ... />}

        {/* Bottom back button */}
        <div className="mt-12 flex justify-center">
          <button className="... bg-black text-white hover:bg-pink-400 hover:text-black">
            <ArrowLeft /> BACK TO ALL POSTS
          </button>
        </div>
      </div>

      {/* Table of Contents sidebar - Optional enhancement */}
      {headings.length > 0 && (
        <aside className="hidden lg:block lg:col-start-2">...</aside>
      )}
    </div>
  </div>
</div>
```

### What's IN SCOPE for Story 2.2

- Blog post layout template (`_includes/layouts/blog-post.njk`)
- Post header with title, date, author, tags
- Back navigation (top and bottom)
- Content in Card component
- Prose styling for Markdown
- Clean URLs via permalink

### What's DEFERRED to Later Stories

- **Story 2.3**: Syntax highlighting (already works via plugin, may need styling)
- **Story 2.5**: Reading time display (readTime already in frontmatter)
- **Story 2.6**: Social sharing component
- **Story 2.7**: Related projects component
- Table of Contents sidebar (optional enhancement)
- Reading progress bar (optional enhancement)

### 11ty Implementation Pattern

**blog-post.njk Layout:**
```nunjucks
---
layout: layouts/base.njk
---

{% from "components/card.njk" import card %}
{% from "components/tag.njk" import tag %}
{% from "components/button.njk" import button %}

<div class="min-h-screen bg-cream py-16">
  <div class="max-w-6xl mx-auto px-6 relative">
    {# Back button #}
    <a href="/blog/" class="inline-flex items-center gap-2 px-4 py-2 bg-white border-4 border-black font-bold uppercase text-sm hover:bg-lime-300 transition-all duration-150 active:translate-y-1 mb-8"
       style="box-shadow: 6px 6px 0 #000;">
      ← BACK TO POSTS
    </a>

    <div class="lg:grid lg:grid-cols-[1fr_250px] lg:gap-8">
      <div class="lg:col-start-1">
        {# Header #}
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            {{ tag(tags | getCategoryFromTags, "category") }}
            <div class="flex items-center gap-4 text-sm text-neutral-500">
              <span>{{ date | date }}</span>
              {% if lastUpdated and lastUpdated != date %}
                <span>Updated: {{ lastUpdated | date }}</span>
              {% endif %}
              <span class="font-bold">{{ readTime }}</span>
            </div>
          </div>

          {# Title with first word highlighted #}
          {% set titleWords = title.split(' ') %}
          <h1 class="text-4xl md:text-5xl font-black mb-6">
            <span class="bg-pink-400">{{ titleWords[0] }}</span>
            {% for word in titleWords %}{% if loop.index0 > 0 %} {{ word }}{% endif %}{% endfor %}
          </h1>

          {# Author byline #}
          {% if author %}
            <div class="flex items-center gap-3 mb-6 p-4 bg-white border-4 border-black" style="box-shadow: 4px 4px 0 #000;">
              {% if author.avatar %}
                <img src="{{ author.avatar }}" alt="{{ author.name }}" class="w-12 h-12 border-2 border-black">
              {% endif %}
              <div>
                <p class="font-bold">{{ author.name }}</p>
                {% if author.bio %}
                  <p class="text-sm text-neutral-600">{{ author.bio }}</p>
                {% endif %}
              </div>
            </div>
          {% endif %}

          {# Tags #}
          <div class="flex flex-wrap gap-2 mb-6">
            {% for t in tags %}
              {{ tag(t, "tech") }}
            {% endfor %}
          </div>
        </div>

        {# Content Card #}
        {% call card("lg") %}
          <div class="prose max-w-none">
            {{ content | safe }}
          </div>
        {% endcall %}

        {# Bottom back button #}
        <div class="mt-12 flex justify-center">
          <a href="/blog/" class="inline-flex items-center gap-2 px-6 py-3 bg-black text-white border-4 border-black font-bold uppercase text-sm hover:bg-pink-400 hover:text-black transition-all duration-150 active:translate-y-1"
             style="box-shadow: 6px 6px 0 #000;">
            ← BACK TO ALL POSTS
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Blog Post Frontmatter Schema

From existing posts in `_content/blog/`:
```yaml
---
id: docker-observability
title: "COMPREHENSIVE OBSERVABILITY FOR DOCKER MICROSERVICES"
date: 2024-09-22
excerpt: "Building a complete monitoring stack..."
tags:
  - docker
  - prometheus
  - grafana
  - observability
  - technical
readTime: 10 min
featured: true
relatedProjectIds:
  - observability-infrastructure
permalink: /blog/docker-observability/
layout: layouts/blog-post.njk  # ADD THIS
---
```

### Prose Styling Requirements

Add to `css/input.css` or use TailwindCSS Typography plugin:

```css
/* Blog post prose styling */
.prose h2 {
  @apply text-2xl font-black mt-8 mb-4;
}
.prose h3 {
  @apply text-xl font-bold mt-6 mb-3;
}
.prose p {
  @apply text-lg leading-relaxed text-neutral-700 mb-6;
}
.prose ul, .prose ol {
  @apply mb-6 ml-6;
}
.prose li {
  @apply text-lg leading-relaxed text-neutral-700 mb-2;
}
.prose pre {
  @apply bg-neutral-900 text-white p-4 mb-6 overflow-x-auto border-4 border-black;
}
.prose code:not(pre code) {
  @apply bg-neutral-100 px-1 py-0.5 text-sm font-mono;
}
.prose blockquote {
  @apply border-l-4 border-black pl-4 py-2 bg-yellow-50 mb-6 italic;
}
.prose a {
  @apply text-pink-600 hover:underline font-bold;
}
```

### Existing Components to Reuse

**Card Macro** (`_includes/components/card.njk`):
- Use with `{% call card("lg") %}...{% endcall %}`
- Already supports size "lg" with 8px shadow

**Tag Macro** (`_includes/components/tag.njk`):
- Use `{{ tag(text, "tech") }}` for technology tags
- Use `{{ tag(text, "category") }}` for category badge

**Button Macro** (`_includes/components/button.njk`):
- May need for back buttons, or use anchor tags with button styling

### Project Structure Notes

**Files to Create:**
- `_includes/layouts/blog-post.njk` - Blog post layout

**Files to Modify:**
- `_content/blog/*.md` - Add `layout: layouts/blog-post.njk` to frontmatter
- `css/input.css` - Add prose styling (if not using Tailwind Typography)

**Existing Files to Reuse:**
- `_includes/layouts/base.njk` - Extend this
- `_includes/components/card.njk` - For content wrapper
- `_includes/components/tag.njk` - For tags display

### Previous Story Intelligence

**From Story 2.1 (Blog Listing):**
- `getCategoryFromTags` filter already in `eleventy.config.js`
- `date` filter already configured (short format)
- Posts collection sources from `_content/blog/*.md`
- Blog posts already have `permalink` field set
- Card and tag macros working properly

**Key Patterns Established:**
- Nunjucks macro imports: `{% from "components/X.njk" import X %}`
- Card caller pattern: `{% call card(...) %}...{% endcall %}`
- Date formatting: `{{ date | date }}`
- Category derivation: `{{ tags | getCategoryFromTags }}`

### Git Intelligence

**Recent Commits:**
- `5c6bf9e` - Story 2.1: Blog listing with getCategoryFromTags filter
- `0a3235c` - Story 1.6: Home page with card/tag macros
- Blog posts migrated with Nunjucks-safe syntax

**Patterns to Follow:**
- Use existing macros, don't recreate
- Leverage established filters
- Keep prose styling minimal but effective

### Testing Notes

**Existing Tests:**
- `tests/e2e/blog.spec.ts` - Has blog listing tests, need blog detail tests

**Tests to Add/Verify:**
- Navigate to blog post from listing
- Verify post content renders
- Verify header metadata displays
- Verify back button works
- Verify URL is clean (no hash)

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-2.2] - Acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#Template-Organization] - Layout patterns
- [Source: src/components/BlogDetail.tsx] - React implementation for exact parity
- [Source: src/components/Card.tsx] - Card component reference
- [Source: src/components/Tag.tsx] - Tag component reference
- [Source: _bmad-output/implementation-artifacts/2-1-*.md] - Previous story learnings

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Fixed date filter timezone issue by using UTC methods in eleventy.config.js
- Fixed test selector specificity for read time (narrowed to metadata section)
- Fixed clean URLs test to properly exclude /blog/ base path
- Fixed mobile bottom back button click interception with scrollIntoViewIfNeeded()

### Completion Notes List

- Created blog-post.njk layout with React parity (grid layout, header, back buttons, Card wrapper)
- Added comprehensive prose CSS styling for Markdown content (h2, h3, p, ul, ol, li, pre, code, blockquote, a)
- Updated all 5 blog posts with `layout: layouts/blog-post.njk` frontmatter
- Title highlight uses first word with bg-pink-400 (matches React)
- Category tag uses getCategoryFromTags filter
- Author byline conditionally renders when author data exists
- Bottom back button styled differently (black bg, pink hover) per React design
- Implemented Table of Contents sidebar with full React parity:
  - Sticky positioning, hidden on mobile (lg:block)
  - JavaScript extracts h2/h3 headings and generates TOC items
  - Click-to-scroll with smooth scrolling and offset
  - Active section tracking on scroll
  - Scroll progress percentage display
  - Neubrutalist styling with pink highlight on active item
- Fixed content width overflow with min-w-0 overflow-hidden on grid column
- All 125 Story 2.2 ATDD tests pass across 5 browsers/devices (100 original + 25 TOC tests)

### Code Review Fixes (CR Pass)

- Fixed padding from `py-8` to `py-16` for React parity (BlogDetail.tsx:95)
- Added `aria-label="Table of Contents"` to `<nav>` element (Architecture compliance)
- Added `aria-label="Table of Contents"` to `<aside>` element (Accessibility)
- Replaced HTML entity `&larr;` with Heroicons SVG arrow (Tailwind-compatible, better visual parity)
- Removed unused `href` variable in test file (code quality)

### File List

**Created:**
- `_includes/layouts/blog-post.njk` - Blog post detail layout with TOC sidebar and inline JavaScript

**Modified:**
- `css/input.css` - Added prose styling for blog content (.prose h2, h3, p, ul, ol, li, pre, code, blockquote, a)
- `eleventy.config.js` - Fixed date filter to use UTC methods (avoid timezone date shifts)
- `_content/blog/docker-observability.md` - Added `layout: layouts/blog-post.njk`
- `_content/blog/oauth2-authentication-gateway.md` - Added `layout: layouts/blog-post.njk`
- `_content/blog/building-fastapi-microservices.md` - Added `layout: layouts/blog-post.njk`
- `_content/blog/postgresql-performance.md` - Added `layout: layouts/blog-post.njk`
- `_content/blog/ci-cd-best-practices.md` - Added `layout: layouts/blog-post.njk`
- `tests/e2e/blog.spec.ts` - Enabled Story 2.2 tests, added 25 TOC sidebar tests, fixed selector specificity

