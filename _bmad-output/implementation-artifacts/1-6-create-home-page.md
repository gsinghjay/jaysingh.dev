# Story 1.6: Create Home Page

Status: done

## Story

As a **site visitor**,
I want **a complete home page**,
so that **I can see an overview of Jay's portfolio and navigate to other sections**.

## Acceptance Criteria

1. **AC1: Home Page at Root URL**
   - Given I navigate to the root URL (`/`)
   - When the page loads
   - Then I see the home page with hero section, introduction, and navigation to other sections

2. **AC2: Clean URL**
   - Given the home page exists
   - When I view the URL
   - Then it is a clean URL (`/` or `/index.html`) without hash fragments

3. **AC3: Neubrutalist Design (Desktop)**
   - Given the home page content
   - When I view on desktop
   - Then the layout uses the Neubrutalist design system with proper spacing and visual hierarchy

4. **AC4: Responsive Design (Mobile)**
   - Given the home page content
   - When I view on mobile (< 768px)
   - Then the layout is fully responsive and readable

5. **AC5: Pre-rendered Static HTML**
   - Given the home page is rendered
   - When I view the page source
   - Then it is pre-rendered static HTML (no client-side rendering required for content)

6. **AC6: Proper Heading Hierarchy**
   - Given the home page has a heading structure
   - When I inspect the headings
   - Then there is exactly one `<h1>` and headings follow proper hierarchy (h1 → h2 → h3)

## Tasks / Subtasks

- [x] Task 1: Create hero section with emoji avatar (AC: #1, #3, #4)
  - [x] 1.1 Create avatar box: 128x128px, lime-400 bg, 4px black border, brutal shadow
  - [x] 1.2 Add waving hand emoji "👋" inside avatar
  - [x] 1.3 Add main heading: "I BUILD **STUFF** FOR THE WEB" with yellow highlight
  - [x] 1.4 Add tagline: "Full-stack developer. No frameworks religion. Just working software."
  - [x] 1.5 Add tech stack tags (React, Python, PostgreSQL, Node, TypeScript)
  - [x] 1.6 Wrap in Card component (lg size, brutal shadow)
  - [x] 1.7 Make responsive: stacked on mobile, side-by-side on desktop

- [x] Task 2: Create CTA buttons grid (AC: #1, #3, #4)
  - [x] 2.1 Create 3-column grid (1-col mobile, 3-col desktop)
  - [x] 2.2 Add "VIEW WORK →" button (lime-400) linking to `/projects/`
  - [x] 2.3 Add "READ BLOG →" button (pink-400) linking to `/blog/`
  - [x] 2.4 Add "HIRE ME →" button (yellow-400) linking to `/contact/`
  - [x] 2.5 Style buttons with Neubrutalist design (6px shadow, 4px border, press effect)

- [x] Task 3: Create Featured Post section (AC: #1, #3, #6)
  - [x] 3.1 Add "Featured Posts" h2 heading
  - [x] 3.2 Display featured blog post (conditional: only if featured posts exist)
  - [x] 3.3 Show: title, date, read time, excerpt (2-line clamp)
  - [x] 3.4 Add "READ MORE →" link to post detail
  - [x] 3.5 Wrap in Card component

- [x] Task 4: Create Featured Projects section (AC: #1, #3, #6)
  - [x] 4.1 Add "Featured Work" h2 heading
  - [x] 4.2 Display top 2 featured projects (conditional: only if featured projects exist)
  - [x] 4.3 Show: project number (01, 02), title, description, tech tags
  - [x] 4.4 Make cards clickable linking to project detail
  - [x] 4.5 Add hover effect (title color change, arrow appears)

- [x] Task 5: Create button macro (AC: #3)
  - [x] 5.1 Create `_includes/components/button.njk` macro
  - [x] 5.2 Support variants: lime, pink, yellow, blue, secondary
  - [x] 5.3 Support arrow suffix for primary buttons
  - [x] 5.4 Implement press effect (shadow reduction on mousedown)

- [x] Task 6: Create tag macro (AC: #3)
  - [x] 6.1 Create `_includes/components/tag.njk` macro
  - [x] 6.2 Support tech stack color coding (React→pink, Python→blue, etc.)
  - [x] 6.3 Support category color coding (TECHNICAL→blue, etc.)

- [x] Task 7: Add sample featured content (AC: #1)
  - [x] 7.1 Create sample featured blog post in `_content/blog/`
  - [x] 7.2 Mark blog post as `featured: true` in frontmatter
  - [x] 7.3 Create sample featured projects in `_content/projects/`
  - [x] 7.4 Mark projects as `featured: true` in frontmatter

- [x] Task 8: Verify and test (AC: #1-6)
  - [x] 8.1 Verify page renders at `/` with full content
  - [x] 8.2 Test responsive layout (mobile/tablet/desktop)
  - [x] 8.3 Test all navigation links work
  - [x] 8.4 Verify heading hierarchy (exactly one h1)
  - [x] 8.5 Run Lighthouse audit (skipped - browser requirement)
  - [x] 8.6 Run Playwright tests: All 31 home-page.spec.ts tests pass

## Dev Notes

### React Implementation Reference - CRITICAL for Parity

**Source File:** `src/pages/Home.tsx`

### Hero Section Structure

**React Implementation (lines 15-40):**
```jsx
<Card size="lg">
  <div className="flex flex-col md:flex-row items-start gap-8">
    {/* Avatar */}
    <div className="w-32 h-32 bg-lime-400 border-4 border-black flex items-center justify-center text-6xl flex-shrink-0"
         style={{ boxShadow: '4px 4px 0 #000' }}>
      👋
    </div>

    {/* Content */}
    <div className="flex-1">
      <h1 className="text-4xl md:text-5xl font-black mb-4">
        I BUILD <span className="bg-yellow-400 px-2">STUFF</span> FOR THE WEB
      </h1>
      <p className="text-lg text-neutral-600 mb-6">
        Full-stack developer. No frameworks religion. Just working software.
      </p>
      <div className="flex flex-wrap gap-2">
        <Tag tech="React" />
        <Tag tech="Python" />
        <Tag tech="PostgreSQL" />
        <Tag tech="Node" />
        <Tag tech="TypeScript" />
      </div>
    </div>
  </div>
</Card>
```

**11ty Implementation:**
```nunjucks
{% from "components/card.njk" import card %}
{% from "components/tag.njk" import tag %}

{% call card("lg") %}
  <div class="flex flex-col md:flex-row items-start gap-8">
    {# Avatar #}
    <div class="w-32 h-32 bg-lime-400 border-4 border-black flex items-center justify-center text-6xl flex-shrink-0"
         style="box-shadow: 4px 4px 0 #000;">
      👋
    </div>

    {# Content #}
    <div class="flex-1">
      <h1 class="text-4xl md:text-5xl font-black mb-4">
        I BUILD <span class="bg-yellow-400 px-2">STUFF</span> FOR THE WEB
      </h1>
      <p class="text-lg text-neutral-600 mb-6">
        Full-stack developer. No frameworks religion. Just working software.
      </p>
      <div class="flex flex-wrap gap-2">
        {{ tag("React", "tech") }}
        {{ tag("Python", "tech") }}
        {{ tag("PostgreSQL", "tech") }}
        {{ tag("Node", "tech") }}
        {{ tag("TypeScript", "tech") }}
      </div>
    </div>
  </div>
{% endcall %}
```

### CTA Buttons Grid

**React Implementation (lines 42-52):**
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <Button variant="lime" onClick={() => onNavigate('projects')}>VIEW WORK</Button>
  <Button variant="pink" onClick={() => onNavigate('blog')}>READ BLOG</Button>
  <Button variant="yellow" onClick={() => onNavigate('contact')}>HIRE ME</Button>
</div>
```

**11ty Implementation:**
```nunjucks
{% from "components/button.njk" import button %}

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  {{ button("VIEW WORK", "/projects/", "lime", true) }}
  {{ button("READ BLOG", "/blog/", "pink", true) }}
  {{ button("HIRE ME", "/contact/", "yellow", true) }}
</div>
```

### Button Macro Specification

**File:** `_includes/components/button.njk`

```nunjucks
{# Button macro with Neubrutalist styling #}
{# Parameters: text, href, variant (lime/pink/yellow/blue/secondary), showArrow #}
{% macro button(text, href, variant="lime", showArrow=false) %}
  {% set variantClasses = {
    "lime": "bg-lime-400",
    "pink": "bg-pink-400",
    "yellow": "bg-yellow-400",
    "blue": "bg-blue-400",
    "secondary": "bg-white"
  } %}
  {% set shadowSize = "6px 6px 0 #000" if variant != "secondary" else "3px 3px 0 #000" %}

  <a href="{{ href }}"
     class="btn-brutal {{ variantClasses[variant] }} border-4 border-black px-6 py-6 text-xl font-black uppercase text-black text-center block transition-all duration-150 active:translate-y-1"
     style="box-shadow: {{ shadowSize }};">
    {{ text }}{% if showArrow %} →{% endif %}
  </a>
{% endmacro %}
```

### Tag Macro Specification

**File:** `_includes/components/tag.njk`

```nunjucks
{# Tag macro for tech stack and categories #}
{# Parameters: text, type (tech/category) #}
{% macro tag(text, type="tech") %}
  {% set techColors = {
    "React": "bg-pink-400",
    "Vue": "bg-pink-400",
    "Python": "bg-blue-400",
    "Go": "bg-blue-400",
    "PostgreSQL": "bg-green-400",
    "SQL": "bg-green-400",
    "Node": "bg-lime-400",
    "JavaScript": "bg-lime-400",
    "TypeScript": "bg-lime-400"
  } %}
  {% set categoryColors = {
    "OPINION": "bg-yellow-400",
    "TECHNICAL": "bg-blue-400",
    "WAR": "bg-red-400",
    "TUTORIAL": "bg-lime-400",
    "ANNOUNCEMENT": "bg-pink-400"
  } %}

  {% if type == "tech" %}
    {% set bgColor = techColors[text] | default("bg-neutral-100") %}
  {% else %}
    {% set bgColor = categoryColors[text] | default("bg-neutral-100") %}
  {% endif %}

  <span class="{{ bgColor }} px-3 py-1 border-2 border-black text-sm font-bold uppercase text-black">
    {{ text }}
  </span>
{% endmacro %}
```

### Card Macro Specification

**File:** `_includes/components/card.njk`

```nunjucks
{# Card macro with Neubrutalist styling #}
{# Parameters: size (sm/default/lg), clickable #}
{% macro card(size="default", clickable=false) %}
  {% set paddingClass = {
    "sm": "p-4",
    "default": "p-6",
    "lg": "p-8"
  } %}
  {% set shadowSize = {
    "sm": "4px 4px 0 #000",
    "default": "6px 6px 0 #000",
    "lg": "8px 8px 0 #000"
  } %}

  <div class="bg-white border-4 border-black {{ paddingClass[size] }}{% if clickable %} cursor-pointer active:translate-y-1 transition-all duration-150 group{% endif %}"
       style="box-shadow: {{ shadowSize[size] }};">
    {{ caller() }}
  </div>
{% endmacro %}
```

### Featured Content Logic

**Blog Posts:**
- Filter for `featured: true` in frontmatter
- Use 11ty collections: `collections.posts | selectattr("data.featured") | first`
- Display only if featured posts exist

**Projects:**
- Filter for `featured: true` in frontmatter
- Use 11ty collections: `collections.projects | selectattr("data.featured") | list | slice(0, 2)`
- Display only if featured projects exist

### Sample Content Frontmatter

**Blog Post (`_content/blog/sample-post.md`):**
```yaml
---
id: building-observable-systems
title: "Building Observable Systems"
date: 2026-01-15
excerpt: "A deep dive into observability patterns and monitoring infrastructure for modern distributed systems."
tags:
  - DevOps
  - Monitoring
readTime: "8 min"
featured: true
permalink: /blog/building-observable-systems/
---
```

**Project (`_content/projects/sample-project.md`):**
```yaml
---
id: sample-project
title: "Cloud Infrastructure Platform"
description: "Enterprise-grade cloud management with automated scaling and monitoring."
technologies:
  - Go
  - Kubernetes
  - AWS
projectType: work
featured: true
permalink: /projects/cloud-infrastructure-platform/
---
```

### Page Container Layout

**React:** `max-w-6xl mx-auto px-6 py-16 space-y-12`

**11ty (in index.njk):**
```nunjucks
<div class="space-y-12">
  {# Hero Section #}
  {# CTA Buttons #}
  {# Featured Posts (conditional) #}
  {# Featured Projects (conditional) #}
</div>
```

Note: `max-w-6xl mx-auto px-6` is already in `base.njk` main content wrapper.

### Heading Hierarchy

| Element | Level | Text |
|---------|-------|------|
| Hero | h1 | I BUILD STUFF FOR THE WEB |
| Featured Posts | h2 | Featured Posts |
| Blog title | h3 | (post title) |
| Featured Work | h2 | Featured Work |
| Project title | h3 | (project title) |

### Project Structure Notes

**Files to Create:**
- `_includes/components/button.njk` - Button macro
- `_includes/components/tag.njk` - Tag macro
- `_includes/components/card.njk` - Card macro
- `content/blog/sample-post.md` - Sample featured blog post
- `content/projects/sample-project-1.md` - Sample featured project 1
- `content/projects/sample-project-2.md` - Sample featured project 2

**Files to Modify:**
- `index.njk` - Replace demo content with actual home page
- `eleventy.config.js` - Add blog/project collections if not present

**Existing Files (verify):**
- `css/input.css` - Component styles (brutal-box, hover-lift)

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-1.6] - Acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#Component-Organization] - Macro patterns
- [Source: src/pages/Home.tsx] - React implementation for parity
- [Source: src/components/Button.tsx] - Button component
- [Source: src/components/Card.tsx] - Card component
- [Source: src/components/Tag.tsx] - Tag component

## Previous Story Intelligence

### From Story 1.5 Learnings

**What should be verified:**
- Single h1 per page (accessibility)
- Proper heading hierarchy (h1 → h2 → h3)
- All interactive elements keyboard accessible

### From Story 1.4 Learnings

**What was established:**
- Mobile menu toggle functionality
- Responsive breakpoint behavior

### From Story 1.3 Learnings

**What was established:**
- Header with navigation links (all uppercase)
- Footer with copyright and tagline
- Active state uses `bg-yellow-400`
- Navigation links work for all pages

### From Story 1.2 Learnings

**What was established:**
- Neubrutalist design tokens (shadows, borders)
- `brutal-box`, `brutal-box-sm`, `brutal-box-lg` utilities
- `hover-lift`, `hover-lift-lg` utilities
- Focus states: 4px black outline

**CSS already available:**
- Shadow utilities: `--shadow-brutal-sm` (3px), `--shadow-brutal` (4px), `--shadow-brutal-md` (6px), `--shadow-brutal-lg` (8px)
- Transition: `--transition-default: all 0.15s ease`

### Git Intelligence

**Recent commits:**
- `bc04ac2` - Story 1.3: Header/footer
- `feb3e86` - Story 1.2: Neubrutalist design system
- `74959d0` - Story 1.1: 11ty foundation

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

N/A

### Completion Notes List

- **2026-01-29 (Code Review)**: Fixed issues from adversarial code review:
  - Added missing `tests/e2e/home-page.spec.ts` to File List
  - Added tech colors for Kubernetes, AWS, Docker, OAuth2, Traefik, Keycloak in tag.njk
  - Added active shadow reduction (`active:shadow-[2px_2px_0_#000]`) to button.njk for React parity
  - Updated Dev Notes sample frontmatter to match actual implementation (technologies vs tags, correct paths)
- **2026-01-29**: Implemented complete home page with hero section, CTA buttons, featured posts, and featured work sections
- Created reusable Nunjucks macros: card.njk, tag.njk, button.njk
- Added custom 11ty filters: `where` (filter by attribute) and `take` (slice first N items)
- Added `date` filter for date formatting
- Created sample featured content in `_content/` directory with proper permalinks
- All 31 ATDD tests from `tests/e2e/home-page.spec.ts` pass
- Full test suite passes: 525 passed, 8 skipped, 0 failed
- Fixed test selector issues for dual nav elements (desktop + mobile)
- Content collections now use `_content/blog/` and `_content/projects/` directories
- Original `content/` directory content ignored due to Prometheus/Jinja2 template syntax conflicts

### File List

**New Files:**
- `_includes/components/card.njk` - Card macro with Neubrutalist styling
- `_includes/components/tag.njk` - Tag macro for tech stack and categories
- `_includes/components/button.njk` - Button macro with variants
- `_content/blog/building-observable-systems.md` - Sample featured blog post
- `_content/projects/cloud-infrastructure-platform.md` - Sample featured project 1
- `_content/projects/authentication-gateway.md` - Sample featured project 2
- `tests/e2e/home-page.spec.ts` - ATDD tests for home page (31 test cases)

**Modified Files:**
- `index.njk` - Replaced demo content with home page implementation
- `eleventy.config.js` - Added date/where/take filters, updated collection paths
- `_includes/partials/header.njk` - Added `is-active` class to active nav links
- `_includes/components/tag.njk` - Added tech colors for Kubernetes, AWS, Docker, OAuth2, Traefik, Keycloak (code review)
- `_includes/components/button.njk` - Added active shadow reduction for React parity (code review)
- `tests/e2e/header-footer.spec.ts` - Fixed selectors for dual nav elements
- `tests/e2e/accessibility.spec.ts` - Fixed selectors and focus test
- `tests/e2e/smoke.spec.ts` - Fixed nav selector for strict mode
