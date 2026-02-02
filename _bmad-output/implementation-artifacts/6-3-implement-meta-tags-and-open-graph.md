# Story 6.3: Implement Meta Tags and Open Graph

Status: done

## Story

As a **site visitor sharing content**,
I want **rich previews when sharing links**,
so that **shared content looks professional on social media**.

## Acceptance Criteria

1. **AC1: Basic Meta Tags Present**
   - Given any page on the site
   - When I view the HTML `<head>`
   - Then I see `<title>`, `<meta name="description">`, and `<link rel="canonical">`

2. **AC2: Unique Meta Tags Per Page**
   - Given each page's meta tags
   - When I compare across pages
   - Then each page has unique title and description appropriate to its content

3. **AC3: Open Graph Tags Present**
   - Given any page on the site
   - When I view the HTML `<head>`
   - Then I see Open Graph tags: `og:title`, `og:description`, `og:url`, `og:type`

4. **AC4: Article Type for Blog Posts**
   - Given a blog post page
   - When I inspect Open Graph tags
   - Then `og:type` is "article" and includes `article:published_time`

5. **AC5: Website Type for Home Page**
   - Given the home page
   - When I inspect Open Graph tags
   - Then `og:type` is "website"

6. **AC6: Social Media Preview**
   - Given I share a blog post URL on Twitter/LinkedIn
   - When the preview generates
   - Then it shows the post title, description, and site name

7. **AC7: Reusable Partial Implementation**
   - Given the meta tags implementation
   - When I review the code
   - Then it uses a reusable `partials/meta.njk` partial with template variables

8. **AC8: Direct Landing Works**
   - Given visitors arriving from search engines
   - When they land on a blog post URL directly
   - Then the page loads with full content (no redirects, no JavaScript required)

## Tasks / Subtasks

- [x] Task 1: Audit Existing Meta Tags (AC: #1, #3, #7)
  - [x] 1.1 Review current `partials/meta.njk` implementation
  - [x] 1.2 Verify meta.njk is included in `layouts/base.njk`
  - [x] 1.3 Document current state vs. required state

- [x] Task 2: Add Article-Specific Open Graph Tags (AC: #4)
  - [x] 2.1 Update blog-post.njk to set `og_type: "article"` in frontmatter
  - [x] 2.2 Extend `date` filter in eleventy.config.js with `'iso'` format option
  - [x] 2.3 Add `article:published_time` meta tag to meta.njk (uses `date | date('iso')`)
  - [x] 2.4 Add `article:author` meta tag (uses site.author)

- [x] Task 3: Ensure Unique Meta Tags Per Page (AC: #2)
  - [x] 3.1 Verify blog posts have `excerpt` field (already validated by frontmatter)
  - [x] 3.2 Verify projects have `description` field (already validated by frontmatter)
  - [x] 3.3 Add `metaDescription` to blog.njk frontmatter
  - [x] 3.4 Add `metaDescription` to projects.njk frontmatter (already has description)
  - [x] 3.5 Add `metaDescription` to resume.njk frontmatter (already has description)
  - [x] 3.6 Add `metaDescription` to contact.njk frontmatter (already has description)
  - [x] 3.7 Verify index.njk uses site.description (no change needed)

- [x] Task 4: Twitter Card Meta Tags (AC: #6)
  - [x] 4.1 Add `twitter:card` meta tag (summary_large_image or summary)
  - [x] 4.2 Add `twitter:title`, `twitter:description` meta tags
  - [x] 4.3 Add `twitter:site` meta tag (conditional, if site.twitterHandle exists)
  - [x] 4.4 Add `twitter:image` meta tag (conditional, if image exists)
  - [x] 4.5 (Optional) Add `twitterHandle` to `_data/site.json` if Jay has Twitter/X account (skipped - conditional support added)

- [x] Task 5: Build Verification (AC: #1, #3, #5, #8)
  - [x] 5.1 Run `npm run build`
  - [x] 5.2 Inspect home page HTML for og:type="website"
  - [x] 5.3 Inspect blog post HTML for og:type="article" and article:published_time
  - [x] 5.4 Verify canonical URLs are correct for all pages

- [x] Task 6: Test Coverage (AC: #1, #2, #3, #4, #5, #8)
  - [x] 6.1 Add unit tests to verify meta tag presence in built HTML (tests existed, fixed)
  - [x] 6.2 Add E2E tests to verify meta tags are accessible via HTTP (tests existed, fixed)
  - [x] 6.3 Add validation for unique descriptions across pages

## Dev Notes

### Implementation Status

**PARTIAL IMPLEMENTATION FOUND:** The meta tags infrastructure already exists but needs enhancement:

**Already Implemented:**
- ✅ `partials/meta.njk` exists and is included in `layouts/base.njk`
- ✅ Basic meta tags: charset, viewport, description, canonical
- ✅ Open Graph tags: og:title, og:description, og:url, og:type, og:site_name
- ✅ Theme color meta tag
- ✅ og:image support (conditional rendering)
- ⚠️ `site.socialImage` is `/images/og-default.svg` - SVG may not render on all platforms

**Social Image Consideration:**
The current `socialImage` in `site.json` is an SVG file (`/images/og-default.svg`). While this works for some platforms:
- ✅ LinkedIn: Supports SVG
- ⚠️ Twitter/X: Prefers PNG/JPG (1200x630px recommended)
- ⚠️ Facebook: May not render SVG correctly

**Recommendation:** For full compatibility, consider creating a PNG version (`og-default.png`) at 1200x630px. This is a nice-to-have enhancement, not blocking for this story.

**Needs Implementation:**
- ❌ `og_type` is not set to "article" for blog posts (defaults to "website")
- ❌ `article:published_time` meta tag missing for blog posts
- ❌ Twitter Card meta tags missing
- ❌ Some static pages may lack unique descriptions
- ❌ Test coverage for meta tags

### Current meta.njk Analysis

```nunjucks
{# Current implementation - what already works #}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="{{ metaDescription or description or site.description }}">
<link rel="canonical" href="{{ site.baseUrl }}{{ page.url }}">

{# Open Graph - exists but needs article type support #}
<meta property="og:title" content="{% if title %}{{ title }} | {% endif %}{{ site.shortTitle }}">
<meta property="og:description" content="{{ metaDescription or description or site.description }}">
<meta property="og:url" content="{{ site.baseUrl }}{{ page.url }}">
<meta property="og:type" content="{{ og_type | default('website') }}">  {# ← og_type never set for articles #}
<meta property="og:site_name" content="{{ site.shortTitle }}">
```

### Required Changes

**1. Blog Post Layout (`blog-post.njk`):**
Set `og_type` in the layout frontmatter or pass it via 11ty data cascade:

```yaml
---
layout: layouts/base.njk
og_type: article
---
```

**2. meta.njk - Add Article-Specific Tags:**
```nunjucks
{# Article-specific Open Graph (only for blog posts) #}
{% if og_type == "article" %}
<meta property="article:published_time" content="{{ date | date('iso') }}">
{% if lastUpdated %}
<meta property="article:modified_time" content="{{ lastUpdated | date('iso') }}">
{% endif %}
<meta property="article:author" content="{{ site.author }}">
{% endif %}
```

**3. meta.njk - Add Twitter Card Tags:**
```nunjucks
{# Twitter Card meta tags #}
<meta name="twitter:card" content="{% if og_image or site.socialImage %}summary_large_image{% else %}summary{% endif %}">
<meta name="twitter:title" content="{% if title %}{{ title }} | {% endif %}{{ site.shortTitle }}">
<meta name="twitter:description" content="{{ metaDescription or description or site.description }}">
{% if site.twitterHandle %}
<meta name="twitter:site" content="{{ site.twitterHandle }}">
{% endif %}
{% if og_image %}
<meta name="twitter:image" content="{{ og_image }}">
{% elif site.socialImage %}
<meta name="twitter:image" content="{{ site.baseUrl }}{{ site.socialImage }}">
{% endif %}
```

**Note on twitter:site:** If Jay has a Twitter/X handle, add `"twitterHandle": "@jaysinghdev"` to `_data/site.json`. This associates shared content with the account.

### Data Flow for Meta Tags

| Page Type | title | description Source | og_type | Date Source |
|-----------|-------|-------------------|---------|-------------|
| Home | index.njk frontmatter | site.description | website | N/A |
| Blog Listing | blog.njk frontmatter | metaDescription | website | N/A |
| Blog Post | post frontmatter | excerpt | article | date |
| Projects Listing | projects.njk frontmatter | metaDescription | website | N/A |
| Project Detail | project frontmatter | description | website | N/A |
| Resume | resume.njk frontmatter | metaDescription | website | N/A |
| Contact | contact.njk frontmatter | metaDescription | website | N/A |

### Static Pages to Audit

Need to verify these pages have unique descriptions. Add `metaDescription` to frontmatter if missing:

| Page | File | metaDescription Value to Add |
|------|------|---------------------|
| Home | index.njk | Falls back to `site.description` - no change needed |
| Blog | blog.njk | `metaDescription: "Technical blog posts on software engineering, DevOps, Python, and cloud infrastructure by Jay Singh."` |
| Projects | projects.njk | `metaDescription: "Portfolio of software engineering projects and case studies showcasing full-stack development expertise."` |
| Resume | resume.njk | `metaDescription: "Professional resume of Jay Singh - Full-stack developer specializing in Python, FastAPI, React, and DevOps."` |
| Contact | contact.njk | `metaDescription: "Get in touch with Jay Singh for software engineering opportunities and collaborations."` |

**Implementation:** Add `metaDescription` field to each page's YAML frontmatter. The meta.njk partial already supports this via the cascade: `{{ metaDescription or description or site.description }}`

### 11ty Filter Requirement

The existing `date` filter in `eleventy.config.js` supports `'%Y-%m-%d'` format but NOT full ISO 8601.

**Extend the existing filter** (do NOT create a separate `isoDate` filter):

```javascript
// In eleventy.config.js - extend existing date filter
eleventyConfig.addFilter("date", (dateObj, format) => {
  if (!dateObj) return '';
  const date = new Date(dateObj);

  // Add ISO 8601 format for article:published_time
  if (format === 'iso') {
    return date.toISOString();
  }

  // ... existing format handling ...
});
```

**Usage in meta.njk:**
```nunjucks
<meta property="article:published_time" content="{{ date | date('iso') }}">
```

**Why extend instead of new filter:** Keeps all date formatting in one place, follows DRY principle, matches existing pattern.

### Testing Approach

**Unit Tests (tests/unit/meta-tags-validation.spec.ts):**
- Verify all pages have `<title>` tag
- Verify all pages have `<meta name="description">`
- Verify all pages have `<link rel="canonical">`
- Verify all pages have og:title, og:description, og:url, og:type
- Verify blog posts have og:type="article"
- Verify blog posts have article:published_time
- Verify home page has og:type="website"
- Verify Twitter card tags present

**E2E Tests (tests/e2e/meta-tags.spec.ts):**
- HTTP 200 for all pages
- Meta tags visible in response headers/body
- Social preview validation (optional - may use external service)

### Technical Requirements

**From Architecture Document:**
- Meta tags in `partials/meta.njk` (✅ exists)
- Included in `layouts/base.njk` (✅ exists)
- Uses 11ty data cascade for values
- Build-time generation (no client-side rendering)

**From PRD:**
- FR40: Each page can have unique meta tags (title, description, Open Graph)
- FR38: Visitors arriving via search engines can land directly on blog post pages

**From Epics:**
- Story 6.3 is part of Epic 6: Production Deployment & SEO
- Supports Lighthouse SEO score of 100

### Project Structure Notes

| File | Purpose |
|------|---------|
| `_includes/partials/meta.njk` | Meta tags partial (modify) |
| `_includes/layouts/base.njk` | Base layout (no changes needed) |
| `_includes/layouts/blog-post.njk` | Blog layout (add og_type) |
| `_data/site.json` | Site metadata (already has all needed values) |
| `lib/filters.js` | Custom filters (add isoDate if needed) |

### References

- [Source: epics.md#Story-6.3] - Acceptance criteria and user story
- [Source: architecture.md#Frontend-Architecture] - Partial organization
- [Source: architecture.md#Implementation-Patterns] - Nunjucks patterns
- [Source: prd.md#FR40] - Unique meta tags requirement
- [Open Graph Protocol](https://ogp.me/) - OG tag specification
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started) - Twitter card types
- [Google SEO Documentation](https://developers.google.com/search/docs/crawling-indexing/special-tags) - Meta tags for SEO

### Related Stories

- **Story 6.1:** Implement Sitemap Generation (done - sitemap includes all pages)
- **Story 6.2:** Implement robots.txt (ready-for-dev - crawlers allowed)
- **Story 6.4:** Implement GitHub Actions Deployment (next - deploys SEO files)
- **Story 6.5:** Achieve Lighthouse 100 Scores (depends on SEO optimization)

### Git Intelligence (Last 5 Commits)

```
d0b37a5 Add sitemap.xml generation for SEO (Story 6.1)
0eea48b Add project filtering with accessibility improvements (Story 3.5)
2ed7583 Update architecture document to align with implementation
72c11eb Add Epic 8 proposal for Educational Platform (Capstone Showcase)
c0a5ba6 Add local development workflow with Node.js 24 enforcement (Story 5.5)
```

**Patterns from Story 6.1:**
- Used Vitest for unit tests (`tests/unit/`)
- Used Playwright for E2E tests (`tests/e2e/`)
- Test naming: `{feature}-validation.spec.ts` for unit, `{feature}.spec.ts` for E2E

### Story 6.1 Learnings (Critical Context)

From the previous story's implementation:
1. Passthrough copy already fixed: `eleventyConfig.addPassthroughCopy({ "public": "." })`
2. Nunjucks filter syntax: `| date('%Y-%m-%d')` not Ruby-style `| date: '%Y-%m-%d'`
3. All tests must pass in 5 browsers (Chromium, Firefox, WebKit, Edge, Mobile Chrome)
4. Sitemap already generates 19 URLs with correct base URL

### Minimal vs. Full Implementation

**Minimal Scope (Recommended):**
1. Add `og_type: article` to blog-post.njk frontmatter
2. Add `article:published_time` to meta.njk (conditional)
3. Add Twitter Card tags to meta.njk
4. Extend existing `date` filter with `'iso'` format option
5. Add `metaDescription` to static pages (blog.njk, projects.njk, resume.njk, contact.njk)
6. Add unit tests for meta tag validation
7. Add E2E tests for meta tag accessibility

**Full Scope (If Time Permits):**
- Add article:author meta tag
- Add article:modified_time for updated posts
- Add article:section for blog categories
- Add og:locale tag
- Social preview testing with external validation

### Estimated File Changes

| File | Change Type | Complexity |
|------|-------------|------------|
| `_includes/partials/meta.njk` | Modified | Medium |
| `_includes/layouts/blog-post.njk` | Modified | Low |
| `eleventy.config.js` | Modified | Low (extend date filter) |
| `blog.njk` | Modified | Low (add metaDescription) |
| `projects.njk` | Modified | Low (add metaDescription) |
| `resume.njk` | Modified | Low (add metaDescription) |
| `contact.njk` | Modified | Low (add metaDescription) |
| `tests/unit/meta-tags-validation.spec.ts` | Created | Medium |
| `tests/e2e/meta-tags.spec.ts` | Created | Medium |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

N/A - Implementation completed without errors

### Completion Notes List

- **2026-02-02**: Story implementation completed
  - Added `og_type: article` to blog-post.njk layout frontmatter
  - Extended `date` filter with ISO 8601 format (`'iso'`) for article:published_time
  - Added article-specific OG tags: article:published_time, article:author (conditional on og_type == "article")
  - Added complete Twitter Card meta tags: twitter:card, twitter:title, twitter:description, twitter:image
  - Added `metaDescription` to blog.njk frontmatter for unique description
  - Verified projects.njk, resume.njk, contact.njk already have `description` fields that cascade correctly
  - Fixed E2E tests that incorrectly expected `<article>` element (site uses `#blog-content`)
  - All 149 unit tests pass
  - All 2519 E2E tests pass across 5 browsers (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari)

### File List

- `_includes/partials/meta.njk` - Modified: Added article-specific OG tags, Twitter Card tags, and `excerpt` to description cascade
- `_includes/layouts/blog-post.njk` - Modified: Added `og_type: article` to frontmatter
- `eleventy.config.js` - Modified: Extended date filter with 'iso' format option
- `blog.njk` - Modified: Added `metaDescription` to frontmatter
- `projects.njk` - Modified: Enhanced description for better SEO
- `tests/e2e/meta-tags.spec.ts` - Modified: Fixed incorrect `<article>` expectation to `#blog-content`
- `tests/unit/meta-tags-validation.spec.ts` - Modified: Added test for blog post unique descriptions

### Change Log

- 2026-02-02: Implemented meta tags and Open Graph for SEO (Story 6.3)
- 2026-02-02: Code Review Fixes - Added `excerpt` to meta description cascade (AC2 fix), added unit test for blog post unique descriptions, updated projects.njk description

