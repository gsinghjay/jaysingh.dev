# Story 6.1: Implement Sitemap Generation

Status: ready-for-dev

## Story

As a **search engine crawler**,
I want **a sitemap.xml listing all pages**,
so that **all site content can be discovered and indexed**.

## Acceptance Criteria

1. **AC1: Sitemap Plugin Configured**
   - Given the 11ty configuration
   - When I review `eleventy.config.js`
   - Then a sitemap plugin is configured (e.g., `@11ty/eleventy-plugin-sitemap` or custom template)

2. **AC2: Sitemap File Exists**
   - Given the site builds
   - When I inspect `_site/sitemap.xml`
   - Then the file exists and is valid XML

3. **AC3: All Pages Included**
   - Given the sitemap content
   - When I review the URLs listed
   - Then all public pages are included: home, blog listing, all blog posts, projects listing, all projects, resume, contact

4. **AC4: Correct Base URL**
   - Given each URL in the sitemap
   - When I inspect the entry
   - Then it includes the full URL with correct base path (`https://jaysingh.dev`)

5. **AC5: Dynamic Updates**
   - Given a new blog post or project is added
   - When the site rebuilds
   - Then the new page is automatically included in the sitemap

6. **AC6: Valid XML Schema**
   - Given the sitemap.xml
   - When I validate it against sitemap schema
   - Then it passes validation with no errors

## Tasks / Subtasks

- [ ] Task 1: Create sitemap.njk Template (AC: #1, #2, #6)
  - [ ] 1.1 Create `sitemap.njk` in project root with XML declaration and urlset structure
  - [ ] 1.2 Set frontmatter `permalink: /sitemap.xml` and `eleventyExcludeFromCollections: true`
  - [ ] 1.3 Verify valid XML structure with proper namespace

- [ ] Task 2: Add Static Pages to Sitemap (AC: #3, #4)
  - [ ] 2.1 Add home page URL (`/`)
  - [ ] 2.2 Add blog listing URL (`/blog/`)
  - [ ] 2.3 Add projects listing URL (`/projects/`)
  - [ ] 2.4 Add resume page URL (`/resume/`)
  - [ ] 2.5 Add contact page URL (`/contact/`)
  - [ ] 2.6 Ensure all URLs use `{{ site.baseUrl }}` prefix

- [ ] Task 3: Add Dynamic Collection URLs (AC: #3, #5)
  - [ ] 3.1 Loop through `collections.posts` to add all blog post URLs
  - [ ] 3.2 Loop through `collections.projects` to add all project URLs
  - [ ] 3.3 Include `<lastmod>` from frontmatter date where available

- [ ] Task 4: Build Verification (AC: #2, #3)
  - [ ] 4.1 Run `npm run build`
  - [ ] 4.2 Verify `_site/sitemap.xml` exists
  - [ ] 4.3 Inspect file contents - confirm all pages present

- [ ] Task 5: XML Validation (AC: #6)
  - [ ] 5.1 Validate sitemap.xml against sitemap XSD schema
  - [ ] 5.2 Verify no XML parsing errors

- [ ] Task 6: Test Coverage
  - [ ] 6.1 Add unit test to verify sitemap includes expected URLs
  - [ ] 6.2 Add E2E test to verify sitemap.xml is accessible

## Dev Notes

### Implementation Approach

**Decision: Custom Template vs Plugin**

Using a custom `sitemap.njk` template rather than `@11ty/eleventy-plugin-sitemap` for these reasons:
1. More control over output format
2. No additional dependency
3. Simple enough for static site with known page structure
4. Easier to customize (e.g., exclude certain pages)

### Sitemap XML Structure

Per the Sitemaps.org protocol, the sitemap must follow this structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jaysingh.dev/</loc>
    <lastmod>2026-02-01</lastmod>
  </url>
  <!-- More URLs... -->
</urlset>
```

### Pages to Include

| Page | URL | Source |
|------|-----|--------|
| Home | `/` | index.njk |
| Blog Listing | `/blog/` | blog.njk |
| Blog Posts | `/blog/{id}/` | collections.posts |
| Projects Listing | `/projects/` | projects.njk |
| Project Pages | `/projects/{id}/` | collections.projects |
| Resume | `/resume/` | resume.njk |
| Contact | `/contact/` | contact.njk |

### Current Content Counts (as of 2026-02-01)

Based on `_content/` directory analysis:
- Blog posts: 5
- Projects: 9
- Total URLs expected: 5 static + 5 posts + 9 projects = 19 URLs

### robots.txt Integration

The `public/robots.txt` already references the sitemap:
```
Sitemap: https://jaysingh.dev/sitemap.xml
```

No changes needed - robots.txt is already passthrough copied to `_site/`.

### Project Structure Notes

- Sitemap template goes in project root (alongside index.njk, blog.njk, etc.)
- Uses `site.baseUrl` from `_data/site.json` for absolute URLs
- File naming: `sitemap.njk` (follows kebab-case convention)

### Technical Requirements

**From Architecture Document:**
- Build-time generation (no client-side rendering)
- Valid XML output
- Uses 11ty data cascade for site configuration
- Follows 11ty conventions for template location

**From PRD:**
- FR35: System can generate a sitemap.xml automatically
- FR38: Visitors arriving via search engines can land directly on blog post pages

### 11ty Template Patterns

**Permalink Setting:**
```yaml
---
permalink: /sitemap.xml
eleventyExcludeFromCollections: true
---
```

**Accessing Collections:**
```nunjucks
{% for post in collections.posts %}
  <url>
    <loc>{{ site.baseUrl }}{{ post.url }}</loc>
    <lastmod>{{ post.data.date | date: '%Y-%m-%d' }}</lastmod>
  </url>
{% endfor %}
```

### References

- [Source: epics.md#Story-6.1] - Acceptance criteria and user story
- [Source: architecture.md#URL-Structure] - URL patterns
- [Source: architecture.md#Build-Pipeline] - Build sequence
- [Source: prd.md#FR35] - Sitemap requirement
- [Source: _data/site.json] - Base URL configuration
- [Source: public/robots.txt] - Sitemap reference already in place
- [Sitemaps Protocol](https://www.sitemaps.org/protocol.html) - XML schema specification

### Related Stories

- **Story 6.2**: Implement robots.txt (already exists in `public/`, may need updates)
- **Story 6.3**: Implement Meta Tags and Open Graph (SEO optimization)
- **Story 6.4**: Implement GitHub Actions Deployment (will deploy sitemap)

### Previous Story Learnings (Epic 5)

From Story 5.5:
- Tailwind content paths now correctly include `_content/` directory
- Build pipeline: `npm run build` = CSS + Mermaid + 11ty
- All E2E tests passing (except pre-existing mobile nav issue)

From Story 5.3:
- Site configuration in `_data/site.json` includes `baseUrl: "https://jaysingh.dev"`
- Data cascade works correctly with global data

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

