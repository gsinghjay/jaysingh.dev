---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
status: complete
completedAt: 2026-01-29
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
---

# jaysingh.dev - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for jaysingh.dev, decomposing the requirements from the PRD and Architecture documents into implementable stories.

## Requirements Inventory

### Functional Requirements

**Navigation & Site Structure (FR1-FR5):**
- FR1: Visitors can navigate between all main sections (Home, Blog, Projects, Resume, Contact) via persistent header navigation
- FR2: Visitors can navigate using clean URLs (`/blog/`, `/projects/`, etc.) without hash fragments
- FR3: Visitors can access the site on mobile devices with a responsive navigation menu
- FR4: Visitors can use keyboard navigation to access all interactive elements
- FR5: Visitors can skip to main content using a skip link

**Content Display (FR6-FR11):**
- FR6: Visitors can view pre-rendered HTML pages without requiring JavaScript for core content
- FR7: Visitors can view Mermaid diagrams rendered as static SVG images
- FR8: Visitors can view syntax-highlighted code blocks
- FR9: Visitors can copy code from code blocks to clipboard
- FR10: Visitors can view content with the Neubrutalist design system (bold borders, box shadows, monospace typography)
- FR11: Visitors can view content responsively across mobile, tablet, and desktop breakpoints

**Blog Functionality (FR12-FR16):**
- FR12: Visitors can browse a list of all blog posts with title, date, excerpt, and tags
- FR13: Visitors can read individual blog post detail pages with full content
- FR14: Visitors can see related projects linked from blog posts
- FR15: Visitors can share blog posts via social sharing functionality
- FR16: Visitors can see estimated reading time for blog posts

**Project Showcase (FR17-FR21):**
- FR17: Visitors can browse a list of all projects with title, description, and technology tags
- FR18: Visitors can view individual project detail pages with Challenge/Solution/Impact sections
- FR19: Visitors can view architecture diagrams (Mermaid SVG) on project pages
- FR20: Visitors can access external links (GitHub, live demo) from project pages
- FR21: Visitors can filter projects by type (work/personal) or available resources (GitHub, docs, diagrams)

**Resume & Professional Information (FR22-FR25):**
- FR22: Visitors can view work experience history with company, role, dates, and responsibilities
- FR23: Visitors can view education history
- FR24: Visitors can view categorized technical skills
- FR25: Visitors can view profile information (name, role, bio, contact details)

**Contact & Communication (FR26-FR27):**
- FR26: Visitors can view contact information and social links
- FR27: Visitors can access email, GitHub, and LinkedIn directly from the contact page

**Content Authoring (FR28-FR32):**
- FR28: Author (Jay) can create new blog posts by adding Markdown files with YAML frontmatter
- FR29: Author (Jay) can create new projects by adding Markdown files with YAML frontmatter
- FR30: Author (Jay) can update site configuration via YAML data files
- FR31: Author (Jay) can include Mermaid diagram code in Markdown that renders as SVG at build time
- FR32: Author (Jay) can preview content locally before publishing

**Build & Deployment (FR33-FR37):**
- FR33: System can build the complete site using 11ty with Node.js 24 LTS
- FR34: System can process TailwindCSS and purge unused styles in production
- FR35: System can generate a sitemap.xml automatically
- FR36: System can deploy to GitHub Pages via GitHub Actions on push to main
- FR37: System can achieve 100% Lighthouse scores (Performance, Accessibility, Best Practices, SEO)

**SEO & Discoverability (FR38-FR40):**
- FR38: Visitors arriving via search engines can land directly on blog post pages
- FR39: Search engines can crawl all public pages via robots.txt allowance
- FR40: Each page can have unique meta tags (title, description, Open Graph)

### NonFunctional Requirements

**Performance (NFR1-NFR7):**
- NFR1: Lighthouse Performance Score = 100 (Mobile & Desktop)
- NFR2: First Contentful Paint < 1.0s (Mobile 3G simulation)
- NFR3: Largest Contentful Paint < 1.5s (Mobile 3G simulation)
- NFR4: Total Blocking Time < 100ms (Mobile)
- NFR5: Cumulative Layout Shift < 0.1 (All pages)
- NFR6: Time to Interactive < 2.0s (Mobile 3G simulation)
- NFR7: Page Weight (HTML + CSS + JS) < 200KB (Gzipped, excluding images)

**Accessibility (NFR8-NFR14):**
- NFR8: Lighthouse Accessibility Score = 100 (Mobile & Desktop)
- NFR9: WCAG Compliance Level 2.1 AA (All pages)
- NFR10: Color Contrast Ratio ≥ 4.5:1 (Text on backgrounds)
- NFR11: Keyboard Navigation = 100% (All interactive elements)
- NFR12: Screen Reader Compatibility = Full (NVDA, VoiceOver tested)
- NFR13: Focus Indicators = Visible (All focusable elements)
- NFR14: Reduced Motion Support = Respected (`prefers-reduced-motion`)

**Maintainability (NFR15-NFR20):**
- NFR15: Code Organization follows 11ty conventions (_includes, _data, content separation)
- NFR16: Component Reusability via Nunjucks macros for reusable UI patterns
- NFR17: Content Schema Stability - Frontmatter schemas compatible with Sanity.io migration
- NFR18: Build Reproducibility - Locked dependencies, deterministic builds
- NFR19: Local Development - Full site buildable and previewable locally
- NFR20: Documentation - README with setup, build, and content authoring instructions

**Security (NFR21-NFR23):**
- NFR21: HTTPS Enforcement - All traffic served over HTTPS (GitHub Pages default)
- NFR22: No Sensitive Data - No user data collection, no forms submitting to backend
- NFR23: Dependency Security - No known vulnerabilities in production dependencies

### Additional Requirements

**From Architecture Document:**

1. **Starter Template: Vanilla 11ty** - No pre-built starter. Initialize manually with:
   - @11ty/eleventy, @11ty/eleventy-plugin-syntaxhighlight
   - tailwindcss, postcss, autoprefixer, concurrently

2. **Build Pipeline Sequence:**
   - Step 1: CSS build (TailwindCSS → _site/css/styles.css)
   - Step 2: Mermaid build (Frontmatter → _site/diagrams/*.svg)
   - Step 3: 11ty build (*.njk, content/*.md → _site/**/*.html)

3. **Implementation Patterns (AI Agent Consistency):**
   - kebab-case file naming for templates
   - camelCase for frontmatter fields
   - `js-*` prefix for JavaScript hook classes
   - Use Nunjucks comments `{# #}` not HTML comments
   - Import macros with `{% from %}`, never inline

4. **Project Structure Boundaries:**
   - Layouts: `_includes/layouts/` (extends pattern)
   - Components: `_includes/components/` (macro imports)
   - Partials: `_includes/partials/` (include pattern)
   - Data: `_data/` (JSON format)
   - Content: `content/` (Markdown with YAML frontmatter)

5. **First Story Directive:**
   - Architecture specifies: "First implementation story should be 'Initialize 11ty project with TailwindCSS pipeline.'"

6. **Mermaid Script Requirement:**
   - `scripts/render-mermaid.js` needs implementation

7. **GitHub Actions Deployment:**
   - Workflow in `.github/workflows/deploy.yml`
   - Triggers on push to main
   - Runs: npm ci → build:css → build:mermaid → build → deploy

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 1 | Header navigation between sections |
| FR2 | Epic 1 | Clean URLs without hash fragments |
| FR3 | Epic 1 | Mobile responsive navigation |
| FR4 | Epic 1 | Keyboard navigation |
| FR5 | Epic 1 | Skip to main content link |
| FR6 | Epic 1 | Pre-rendered HTML pages |
| FR7 | Epic 3 | Mermaid diagrams as static SVG |
| FR8 | Epic 2 | Syntax-highlighted code blocks |
| FR9 | Epic 2 | Code copy to clipboard |
| FR10 | Epic 1 | Neubrutalist design system |
| FR11 | Epic 1 | Responsive breakpoints |
| FR12 | Epic 2 | Blog listing with title, date, excerpt, tags |
| FR13 | Epic 2 | Blog detail pages |
| FR14 | Epic 2 | Related projects from blog posts |
| FR15 | Epic 2 | Social sharing |
| FR16 | Epic 2 | Reading time display |
| FR17 | Epic 3 | Project listing with tags |
| FR18 | Epic 3 | Project detail pages (Challenge/Solution/Impact) |
| FR19 | Epic 3 | Architecture diagrams on projects |
| FR20 | Epic 3 | External links (GitHub, demo) |
| FR21 | Epic 3 | Project filtering |
| FR22 | Epic 4 | Work experience history |
| FR23 | Epic 4 | Education history |
| FR24 | Epic 4 | Technical skills |
| FR25 | Epic 4 | Profile information |
| FR26 | Epic 4 | Contact information and social links |
| FR27 | Epic 4 | Email, GitHub, LinkedIn access |
| FR28 | Epic 5 | Create blog posts via Markdown |
| FR29 | Epic 5 | Create projects via Markdown |
| FR30 | Epic 5 | Update config via YAML data files |
| FR31 | Epic 5 | Mermaid in Markdown → SVG |
| FR32 | Epic 5 | Local content preview |
| FR33 | Epic 5 | 11ty build with Node.js 24 LTS |
| FR34 | Epic 5 | TailwindCSS purge in production |
| FR35 | Epic 6 | Sitemap.xml generation |
| FR36 | Epic 6 | GitHub Actions deployment |
| FR37 | Epic 6 | Lighthouse 100 scores |
| FR38 | Epic 6 | Direct blog page landing via search |
| FR39 | Epic 6 | robots.txt for crawlers |
| FR40 | Epic 6 | Unique meta tags per page |
| FR41 | Epic 7 | Collaborators create/edit blog posts via Sanity |
| FR42 | Epic 7 | Collaborators create/edit projects via Sanity |
| FR43 | Epic 7 | Collaborators update profile/resume/skills via Sanity |
| FR44 | Epic 7 | Collaborators update site config via Sanity |
| FR45 | Epic 7 | System rebuilds on Sanity publish |

## Epic List

### Epic 1: Foundation & Site Shell
Visitors can view a working home page with navigation and the Neubrutalist design system.

**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR10, FR11

### Epic 2: Blog Experience
Visitors can browse and read blog posts with syntax highlighting, code copying, and social sharing.

**FRs covered:** FR8, FR9, FR12, FR13, FR14, FR15, FR16

### Epic 3: Project Showcase
Visitors can browse projects and view detailed case studies with architecture diagrams.

**FRs covered:** FR7, FR17, FR18, FR19, FR20, FR21

### Epic 4: Professional Profile
Visitors can view Jay's resume, skills, education, and contact information.

**FRs covered:** FR22, FR23, FR24, FR25, FR26, FR27

### Epic 5: Content Authoring Pipeline
Jay can create and preview content via Markdown with Mermaid diagrams.

**FRs covered:** FR28, FR29, FR30, FR31, FR32, FR33, FR34

### Epic 6: Production Deployment & SEO
Site is deployed to GitHub Pages, SEO-optimized, and achieves Lighthouse 100.

**FRs covered:** FR35, FR36, FR37, FR38, FR39, FR40

### Epic 7: Sanity.io CMS Integration
Collaborators can manage all content through Sanity Studio, with automatic site rebuilds on publish.

**FRs covered:** FR41, FR42, FR43, FR44, FR45

---

## Epic 1: Foundation & Site Shell

Visitors can view a working home page with navigation and the Neubrutalist design system.

### Story 1.1: Initialize 11ty Project with TailwindCSS Pipeline

As a **developer**,
I want **a working 11ty project with TailwindCSS build pipeline**,
So that **I have the foundation to build all site pages**.

**Acceptance Criteria:**

**Given** an empty project directory
**When** I run `npm install`
**Then** all dependencies are installed (@11ty/eleventy, @11ty/eleventy-plugin-syntaxhighlight, tailwindcss, postcss, autoprefixer, concurrently)

**Given** the project is initialized
**When** I run `npm run dev`
**Then** 11ty serves the site with hot reload and TailwindCSS watches for changes

**Given** the project is initialized
**When** I run `npm run build`
**Then** the site builds to `_site/` with minified, purged CSS

**Given** the build completes
**When** I inspect `_site/css/styles.css`
**Then** it contains only used TailwindCSS utilities (purged)

**Given** the project structure
**When** I review the directories
**Then** I see `_data/`, `_includes/layouts/`, `_includes/components/`, `_includes/partials/`, `content/`, `css/`, `js/`, `public/` per Architecture spec

### Story 1.2: Create Base Layout with Neubrutalist Design System

As a **site visitor**,
I want **pages rendered with the Neubrutalist design system**,
So that **the site has a consistent, bold visual identity**.

**Acceptance Criteria:**

**Given** the TailwindCSS config
**When** I review `tailwind.config.js`
**Then** it includes Neubrutalist tokens: colors (lime-400, cream background), `shadow-brutal` utility, border-4 patterns, monospace typography

**Given** the base layout exists
**When** I view any page
**Then** it uses semantic HTML5 structure (html, head, body, main)

**Given** the base layout exists
**When** I view the page source
**Then** I see proper `<meta>` tags (charset, viewport, description)

**Given** the CSS is loaded
**When** I view any page
**Then** the Neubrutalist design is applied: bold black borders, box shadows, high-contrast colors

**Given** the layout renders
**When** I view on different screen sizes
**Then** the base responsive breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px) are functional

### Story 1.3: Implement Site Header and Footer

As a **site visitor**,
I want **persistent header navigation and footer**,
So that **I can navigate between all sections of the site**.

**Acceptance Criteria:**

**Given** I am on any page
**When** I view the header
**Then** I see navigation links for Home, Blog, Projects, Resume, Contact

**Given** the navigation links exist
**When** I click a navigation link
**Then** I navigate to the correct page using clean URLs (`/blog/`, `/projects/`, `/resume/`, `/contact/`)

**Given** I am on a specific page
**When** I view the navigation
**Then** the current page link is visually indicated as active

**Given** I am on any page
**When** I view the footer
**Then** I see consistent footer content (copyright, social links placeholder)

**Given** the header and footer partials
**When** I review the code
**Then** they use `{% include "partials/header.njk" %}` pattern per Architecture spec

### Story 1.4: Implement Mobile Responsive Navigation

As a **mobile site visitor**,
I want **a responsive navigation menu**,
So that **I can navigate the site on small screens**.

**Acceptance Criteria:**

**Given** I am viewing on a screen < 768px (md breakpoint)
**When** I view the header
**Then** I see a hamburger menu button instead of horizontal nav links

**Given** the mobile menu is closed
**When** I tap the hamburger button
**Then** the navigation menu opens/expands with all nav links visible

**Given** the mobile menu is open
**When** I tap the hamburger button again
**Then** the navigation menu closes/collapses

**Given** the mobile menu is open
**When** I tap a navigation link
**Then** I navigate to that page and the menu closes

**Given** the mobile menu toggle
**When** I review the JavaScript
**Then** it uses vanilla JS with `data-*` attributes for hooks (not class-based selectors) per Architecture spec

**Given** I am viewing on a screen >= 768px
**When** I resize from mobile to desktop
**Then** the horizontal navigation reappears and mobile menu is hidden

### Story 1.5: Implement Accessibility Foundation

As a **site visitor using assistive technology**,
I want **accessible navigation and page structure**,
So that **I can use the site with keyboard or screen reader**.

**Acceptance Criteria:**

**Given** I am on any page
**When** I press Tab as the first action
**Then** focus moves to a visible "Skip to main content" link

**Given** focus is on the skip link
**When** I press Enter
**Then** focus moves to the main content area (`#main-content`)

**Given** I am navigating with keyboard
**When** I tab through interactive elements
**Then** each element has a visible focus indicator (4px black outline per Architecture spec)

**Given** the page structure
**When** a screen reader parses the page
**Then** it identifies landmarks: `<nav aria-label="Main navigation">`, `<main id="main-content">`, `<footer>`

**Given** the navigation exists
**When** I use keyboard only
**Then** I can access all navigation links via Tab and activate via Enter

**Given** the site uses motion/transitions
**When** user has `prefers-reduced-motion: reduce` set
**Then** animations and transitions are disabled or minimized

### Story 1.6: Create Home Page

As a **site visitor**,
I want **a complete home page**,
So that **I can see an overview of Jay's portfolio and navigate to other sections**.

**Acceptance Criteria:**

**Given** I navigate to the root URL (`/`)
**When** the page loads
**Then** I see the home page with hero section, introduction, and navigation to other sections

**Given** the home page exists
**When** I view the URL
**Then** it is a clean URL (`/` or `/index.html`) without hash fragments

**Given** the home page content
**When** I view on desktop
**Then** the layout uses the Neubrutalist design system with proper spacing and visual hierarchy

**Given** the home page content
**When** I view on mobile (< 768px)
**Then** the layout is fully responsive and readable

**Given** the home page is rendered
**When** I view the page source
**Then** it is pre-rendered static HTML (no client-side rendering required for content)

**Given** the home page has a heading structure
**When** I inspect the headings
**Then** there is exactly one `<h1>` and headings follow proper hierarchy (h1 → h2 → h3)

---

## Epic 2: Blog Experience

Visitors can browse and read blog posts with syntax highlighting, code copying, and social sharing.

### Story 2.1: Create Blog Collection and Listing Page

As a **site visitor**,
I want **to browse a list of all blog posts**,
So that **I can discover and choose articles to read**.

**Acceptance Criteria:**

**Given** blog posts exist in `content/blog/`
**When** 11ty builds the site
**Then** a `posts` collection is created containing all blog posts

**Given** I navigate to `/blog/`
**When** the page loads
**Then** I see a list of all blog posts sorted by date (newest first)

**Given** the blog listing displays
**When** I view a post entry
**Then** I see the title, date, excerpt, and tags for each post

**Given** the blog listing exists
**When** I click on a post title or "Read more" link
**Then** I navigate to the individual blog post detail page

**Given** the blog listing page
**When** I view on mobile
**Then** the post cards stack vertically and remain readable

**Given** the blog listing page
**When** I view the design
**Then** it uses the Neubrutalist card component with bold borders and shadows

### Story 2.2: Create Blog Post Detail Layout

As a **site visitor**,
I want **to read a complete blog post**,
So that **I can learn from the technical content**.

**Acceptance Criteria:**

**Given** a blog post exists in `content/blog/`
**When** I navigate to `/blog/{post-id}/`
**Then** I see the full blog post content rendered from Markdown

**Given** the blog post detail page
**When** I view the header
**Then** I see the post title, publication date, author, and tags

**Given** the blog post layout
**When** I review the code
**Then** it uses `{% extends "layouts/base.njk" %}` pattern per Architecture spec

**Given** the blog post content
**When** I view the typography
**Then** body text is readable with proper line height, headings have clear hierarchy

**Given** the blog post page
**When** I view the URL
**Then** it is a clean URL (`/blog/docker-observability/`) using the post's `id` field from frontmatter

**Given** the Markdown content includes headings
**When** I inspect the rendered HTML
**Then** heading hierarchy is preserved (h1 for title, h2/h3 for sections)

### Story 2.3: Implement Syntax Highlighting

As a **site visitor**,
I want **code blocks with syntax highlighting**,
So that **code examples are readable and language-specific**.

**Acceptance Criteria:**

**Given** the 11ty configuration
**When** I review `eleventy.config.js`
**Then** the `@11ty/eleventy-plugin-syntaxhighlight` plugin is configured

**Given** a blog post contains a fenced code block with language identifier
**When** the site builds
**Then** the code block is rendered with syntax highlighting at build time (no client JS)

**Given** syntax-highlighted code blocks
**When** I view them on the page
**Then** keywords, strings, comments, and other tokens have distinct colors

**Given** code blocks with various languages (JavaScript, Python, Bash, YAML)
**When** I view each
**Then** language-appropriate highlighting is applied

**Given** the syntax highlighting styles
**When** I view code blocks
**Then** they have the Neubrutalist styling (border, background contrast, monospace font)

**Given** a long code block
**When** content exceeds the container width
**Then** horizontal scrolling is enabled (no text wrapping in code)

### Story 2.4: Implement Code Copy Functionality

As a **site visitor**,
I want **to copy code from code blocks**,
So that **I can easily use examples in my own projects**.

**Acceptance Criteria:**

**Given** a syntax-highlighted code block
**When** I view it
**Then** I see a "Copy" button positioned in the corner of the code block

**Given** I click the Copy button
**When** the action completes
**Then** the code content is copied to my clipboard

**Given** the copy succeeds
**When** I view the button
**Then** it shows brief feedback ("Copied!" or checkmark) before reverting to "Copy"

**Given** the copy functionality
**When** I review the JavaScript
**Then** it uses vanilla JS with event delegation and `data-*` attributes per Architecture spec

**Given** JavaScript is disabled
**When** I view a code block
**Then** the code is still visible and readable (copy button may be hidden)

**Given** the Copy button
**When** I use keyboard navigation
**Then** the button is focusable and activatable via Enter/Space

### Story 2.5: Implement Reading Time Display

As a **site visitor**,
I want **to see estimated reading time for blog posts**,
So that **I can decide if I have time to read the article**.

**Acceptance Criteria:**

**Given** a blog post with content
**When** 11ty builds the site
**Then** reading time is calculated based on word count (~200-250 words per minute)

**Given** I view a blog post detail page
**When** I look at the post header/metadata
**Then** I see the estimated reading time displayed (e.g., "5 min read")

**Given** the blog listing page
**When** I view a post card
**Then** the reading time is displayed alongside date and tags

**Given** the reading time calculation
**When** I review the implementation
**Then** it uses an 11ty filter or computed data (not client-side JS)

**Given** a very short post (< 1 minute)
**When** I view the reading time
**Then** it displays "1 min read" (minimum)

### Story 2.6: Implement Social Sharing

As a **site visitor**,
I want **to share blog posts on social media**,
So that **I can share interesting content with my network**.

**Acceptance Criteria:**

**Given** I am on a blog post detail page
**When** I look for sharing options
**Then** I see social share buttons (Twitter/X, LinkedIn, and a generic Share button)

**Given** the browser supports Web Share API
**When** I click the Share button
**Then** the native share dialog opens with the post title and URL

**Given** the browser does not support Web Share API
**When** I click a specific platform button (Twitter, LinkedIn)
**Then** a new window opens with the platform's share URL pre-populated

**Given** the share functionality
**When** I review the JavaScript
**Then** it uses vanilla JS with progressive enhancement per Architecture spec

**Given** the share buttons
**When** I use keyboard navigation
**Then** all buttons are focusable and activatable

**Given** the social share component
**When** I review the code
**Then** it is implemented as a reusable partial (`partials/social-share.njk`)

### Story 2.7: Implement Related Projects Links

As a **site visitor**,
I want **to see related projects linked from blog posts**,
So that **I can explore practical applications of the concepts discussed**.

**Acceptance Criteria:**

**Given** a blog post has `relatedProjectIds` in its frontmatter
**When** I view the blog post detail page
**Then** I see a "Related Projects" section with links to those projects

**Given** the related projects section
**When** I view the project links
**Then** each shows the project title and a brief description

**Given** I click on a related project link
**When** the navigation completes
**Then** I am on the project detail page (`/projects/{project-id}/`)

**Given** a blog post has no `relatedProjectIds`
**When** I view the blog post detail page
**Then** the "Related Projects" section is not displayed

**Given** the related projects data
**When** I review the implementation
**Then** it uses 11ty's collection lookup to fetch project data at build time

**Given** a `relatedProjectIds` references a non-existent project
**When** the site builds
**Then** the invalid reference is gracefully ignored (no build error)

---

## Epic 3: Project Showcase

Visitors can browse projects and view detailed case studies with architecture diagrams.

### Story 3.1: Create Projects Collection and Listing Page

As a **site visitor**,
I want **to browse a list of all projects**,
So that **I can discover Jay's work and technical expertise**.

**Acceptance Criteria:**

**Given** project files exist in `content/projects/`
**When** 11ty builds the site
**Then** a `projects` collection is created containing all projects

**Given** I navigate to `/projects/`
**When** the page loads
**Then** I see a list of all projects displayed as cards

**Given** the projects listing displays
**When** I view a project card
**Then** I see the title, brief description, and technology tags

**Given** the projects listing exists
**When** I click on a project card
**Then** I navigate to the individual project detail page

**Given** the projects listing page
**When** I view on mobile
**Then** the project cards stack vertically and remain readable

**Given** the projects listing page
**When** I view the design
**Then** it uses the Neubrutalist card component with bold borders and technology tag pills

### Story 3.2: Create Project Detail Layout

As a **site visitor**,
I want **to view detailed project case studies**,
So that **I can understand the technical challenges and solutions**.

**Acceptance Criteria:**

**Given** a project exists in `content/projects/`
**When** I navigate to `/projects/{project-id}/`
**Then** I see the full project detail page

**Given** the project detail page
**When** I view the content structure
**Then** I see clearly defined sections: Challenge, Solution, and Impact

**Given** the project detail layout
**When** I review the code
**Then** it uses `{% extends "layouts/base.njk" %}` pattern per Architecture spec

**Given** the project detail page
**When** I view the header
**Then** I see the project title, description, and technology tags

**Given** the project page
**When** I view the URL
**Then** it is a clean URL (`/projects/qr-code-platform/`) using the project's `id` field from frontmatter

**Given** the project content includes Markdown formatting
**When** I view the rendered page
**Then** headings, lists, and code blocks are properly styled

### Story 3.3: Implement Mermaid Diagram Rendering

As a **site visitor**,
I want **to view architecture diagrams as static images**,
So that **diagrams load instantly without JavaScript**.

**Acceptance Criteria:**

**Given** a project has a `mermaid` field in its frontmatter containing diagram code
**When** `npm run build:mermaid` runs
**Then** an SVG file is generated at `_site/diagrams/{project-id}.svg`

**Given** the Mermaid rendering script
**When** I review `scripts/render-mermaid.js`
**Then** it uses `@mermaid-js/mermaid-cli` to convert Mermaid code to SVG

**Given** a project detail page with a diagram
**When** I view the page
**Then** the diagram displays as an `<img>` tag referencing the pre-rendered SVG

**Given** the rendered SVG diagram
**When** I view it
**Then** it has appropriate sizing and is responsive (scales with container)

**Given** the diagram image
**When** I inspect the HTML
**Then** it has proper `alt` text describing the diagram content

**Given** a project without a `mermaid` field
**When** I view the project detail page
**Then** no diagram section is displayed (graceful absence)

**Given** the build pipeline
**When** I run `npm run build`
**Then** Mermaid rendering runs before the 11ty build (CSS → Mermaid → 11ty)

### Story 3.4: Implement External Project Links

As a **site visitor**,
I want **to access project source code and live demos**,
So that **I can explore the implementation details**.

**Acceptance Criteria:**

**Given** a project has a `github` URL in its frontmatter
**When** I view the project detail page
**Then** I see a "View on GitHub" link/button

**Given** a project has a `demo` URL in its frontmatter
**When** I view the project detail page
**Then** I see a "Live Demo" link/button

**Given** I click the GitHub link
**When** the navigation completes
**Then** a new tab opens with the GitHub repository

**Given** I click the Demo link
**When** the navigation completes
**Then** a new tab opens with the live demo site

**Given** the external links
**When** I inspect the HTML
**Then** links have `target="_blank"` and `rel="noopener noreferrer"` for security

**Given** a project has neither `github` nor `demo` URLs
**When** I view the project detail page
**Then** no external links section is displayed

**Given** the external link buttons
**When** I view the design
**Then** they use the Neubrutalist button component style

### Story 3.5: Implement Project Filtering

As a **site visitor**,
I want **to filter projects by type or available resources**,
So that **I can find projects relevant to my interests**.

**Acceptance Criteria:**

**Given** I am on the projects listing page
**When** I view the filter controls
**Then** I see filter options for: project type (work/personal) and resources (has GitHub, has demo, has diagram)

**Given** I select the "Work" filter
**When** the filter applies
**Then** only projects with `projectType: "work"` are displayed

**Given** I select the "Has GitHub" filter
**When** the filter applies
**Then** only projects with a `github` URL are displayed

**Given** I select multiple filters
**When** the filters apply
**Then** projects matching ALL selected criteria are displayed (AND logic)

**Given** no projects match the selected filters
**When** I view the listing
**Then** I see a "No projects match your filters" message

**Given** I clear all filters
**When** the page updates
**Then** all projects are displayed again

**Given** the filtering functionality
**When** I review the JavaScript
**Then** it uses vanilla JS with `data-*` attributes for filter state per Architecture spec

**Given** JavaScript is disabled
**When** I view the projects page
**Then** all projects are visible (filters hidden or non-functional)

---

## Epic 4: Professional Profile

Visitors can view Jay's resume, skills, education, and contact information.

### Story 4.1: Create Resume Page with Work Experience

As a **site visitor**,
I want **to view Jay's work experience history**,
So that **I can evaluate professional background and expertise**.

**Acceptance Criteria:**

**Given** I navigate to `/resume/`
**When** the page loads
**Then** I see a professionally formatted resume page

**Given** the resume page displays work experience
**When** I view each position
**Then** I see company name, job title, employment dates, and key responsibilities

**Given** the work experience section
**When** I view the entries
**Then** positions are listed in reverse chronological order (most recent first)

**Given** the resume page
**When** I view on desktop
**Then** the layout uses clear visual hierarchy with the Neubrutalist design system

**Given** the resume page
**When** I view on mobile
**Then** the layout is fully responsive and readable without horizontal scrolling

**Given** the work experience data
**When** I review the implementation
**Then** it pulls from `_data/resume.json` using 11ty data cascade

### Story 4.2: Add Education and Skills Sections

As a **site visitor**,
I want **to view education history and technical skills**,
So that **I can understand qualifications and technical breadth**.

**Acceptance Criteria:**

**Given** the resume page
**When** I scroll past work experience
**Then** I see an Education section

**Given** the education section
**When** I view each entry
**Then** I see institution name, degree/certification, and completion date

**Given** the resume page
**When** I view the skills section
**Then** I see technical skills organized by category (e.g., Languages, Frameworks, Cloud, Tools)

**Given** the skills display
**When** I view the categories
**Then** skills are displayed as tag pills with Neubrutalist styling

**Given** the education data
**When** I review the implementation
**Then** it pulls from `_data/resume.json`

**Given** the skills data
**When** I review the implementation
**Then** it pulls from `_data/skills.json`

### Story 4.3: Implement Profile Data Files

As a **developer**,
I want **structured data files for profile information**,
So that **profile data is centralized and reusable across templates**.

**Acceptance Criteria:**

**Given** the `_data/` directory
**When** I review the files
**Then** I see `profile.json`, `resume.json`, and `skills.json`

**Given** `profile.json`
**When** I review its contents
**Then** it contains: name, role/title, bio, social links (GitHub, LinkedIn, email)

**Given** `resume.json`
**When** I review its contents
**Then** it contains: work experience array and education array with all required fields

**Given** `skills.json`
**When** I review its contents
**Then** it contains: categorized skills with category names and skill arrays

**Given** the data files exist
**When** 11ty builds the site
**Then** data is accessible in templates as `{{ profile.name }}`, `{{ resume.experience }}`, `{{ skills }}`

**Given** the data file schemas
**When** I review the structure
**Then** they are compatible with future Sanity.io migration (camelCase fields, flat structure)

### Story 4.4: Create Contact Page

As a **site visitor**,
I want **to view contact information and social links**,
So that **I can reach out to Jay professionally**.

**Acceptance Criteria:**

**Given** I navigate to `/contact/`
**When** the page loads
**Then** I see a contact page with available contact methods

**Given** the contact page
**When** I view the content
**Then** I see links/buttons for Email, GitHub, and LinkedIn

**Given** I click the Email link
**When** the action completes
**Then** my email client opens with Jay's email address pre-filled

**Given** I click the GitHub link
**When** the navigation completes
**Then** a new tab opens with Jay's GitHub profile

**Given** I click the LinkedIn link
**When** the navigation completes
**Then** a new tab opens with Jay's LinkedIn profile

**Given** the external links
**When** I inspect the HTML
**Then** links have `target="_blank"` and `rel="noopener noreferrer"` for security

**Given** the contact page
**When** I view the design
**Then** it uses Neubrutalist styling with clear, prominent contact options

**Given** the contact data
**When** I review the implementation
**Then** it pulls from `_data/profile.json` social links

---

## Epic 5: Content Authoring Pipeline

Jay can create and preview content via Markdown with Mermaid diagrams.

### Story 5.1: Implement Blog Content Pipeline

As a **content author (Jay)**,
I want **to create blog posts using Markdown files**,
So that **I can publish technical articles using my preferred workflow**.

**Acceptance Criteria:**

**Given** I create a new file `content/blog/my-new-post.md`
**When** I add valid YAML frontmatter (id, title, date, excerpt, tags, readTime)
**Then** the file is recognized as a blog post by 11ty

**Given** the blog post frontmatter
**When** I review the required fields
**Then** schema includes: `id` (string), `title` (string), `date` (YYYY-MM-DD), `excerpt` (string), `tags` (array), `readTime` (string)

**Given** the blog post has valid frontmatter
**When** 11ty builds the site
**Then** the post appears in the `posts` collection and generates a page at `/blog/{id}/`

**Given** the Markdown body content
**When** I write using standard Markdown syntax
**Then** headings, lists, code blocks, links, and emphasis render correctly

**Given** I include a fenced code block with language identifier
**When** the site builds
**Then** syntax highlighting is applied at build time

**Given** a blog post has invalid or missing frontmatter
**When** 11ty builds the site
**Then** a clear error message indicates which field is missing/invalid

### Story 5.2: Implement Project Content Pipeline

As a **content author (Jay)**,
I want **to create project case studies using Markdown files**,
So that **I can showcase my work using a consistent structure**.

**Acceptance Criteria:**

**Given** I create a new file `content/projects/my-new-project.md`
**When** I add valid YAML frontmatter
**Then** the file is recognized as a project by 11ty

**Given** the project frontmatter
**When** I review the required fields
**Then** schema includes: `id` (string), `title` (string), `description` (string), `tags` (array), `projectType` (work/personal)

**Given** the project frontmatter
**When** I review the optional fields
**Then** schema includes: `github` (URL), `demo` (URL), `mermaid` (string), `relatedBlogIds` (array)

**Given** the project has valid frontmatter
**When** 11ty builds the site
**Then** the project appears in the `projects` collection and generates a page at `/projects/{id}/`

**Given** the Markdown body content
**When** I structure it with Challenge/Solution/Impact sections
**Then** each section renders with proper headings and formatting

**Given** I include a `mermaid` field in frontmatter
**When** the build runs
**Then** the Mermaid code is rendered to SVG and available on the project page

### Story 5.3: Implement Site Configuration via Data Files

As a **content author (Jay)**,
I want **to update site configuration through data files**,
So that **I can modify site-wide settings without editing templates**.

**Acceptance Criteria:**

**Given** the `_data/` directory
**When** I review `site.json`
**Then** it contains: site title, description, base URL, author name

**Given** I update `_data/site.json` values
**When** 11ty rebuilds
**Then** the changes are reflected in meta tags and site header/footer

**Given** I update `_data/profile.json` social links
**When** 11ty rebuilds
**Then** the contact page and footer social links update

**Given** I add a new skill category to `_data/skills.json`
**When** 11ty rebuilds
**Then** the resume page displays the new category

**Given** the data files use JSON format
**When** I review the structure
**Then** all use camelCase field names per Architecture spec

**Given** I introduce a JSON syntax error
**When** 11ty attempts to build
**Then** a clear error message indicates the file and line with the issue

### Story 5.4: Implement Mermaid in Markdown Processing

As a **content author (Jay)**,
I want **to include Mermaid diagrams in my content**,
So that **I can illustrate architecture and flows without external tools**.

**Acceptance Criteria:**

**Given** a project file has a `mermaid` field in frontmatter
**When** I add valid Mermaid syntax (flowchart, sequence, etc.)
**Then** the diagram code is stored for processing

**Given** the `npm run build:mermaid` script runs
**When** it processes content files
**Then** each file with a `mermaid` field generates an SVG at `_site/diagrams/{id}.svg`

**Given** the Mermaid rendering script
**When** I review error handling
**Then** invalid Mermaid syntax produces a clear error with file name and issue

**Given** I update the Mermaid code in a project file
**When** I rebuild the site
**Then** the SVG is regenerated with the updated diagram

**Given** Mermaid diagrams exist
**When** I view the generated SVGs
**Then** they use a consistent theme/style matching the Neubrutalist design

**Given** the build pipeline order
**When** I run `npm run build`
**Then** Mermaid SVGs are generated before 11ty processes templates

### Story 5.5: Implement Local Development Workflow

As a **content author (Jay)**,
I want **to preview content locally before publishing**,
So that **I can verify formatting and catch errors early**.

**Acceptance Criteria:**

**Given** I run `npm run dev`
**When** the command completes startup
**Then** the site is served locally with hot reload enabled

**Given** I edit a Markdown content file
**When** I save the file
**Then** the browser automatically refreshes with the updated content

**Given** I edit a Nunjucks template
**When** I save the file
**Then** the browser automatically refreshes with the updated layout

**Given** I edit `css/input.css` or `tailwind.config.js`
**When** I save the file
**Then** TailwindCSS recompiles and the browser refreshes

**Given** I run `npm run build`
**When** the build completes
**Then** TailwindCSS is purged and minified for production (< 50KB)

**Given** the production build
**When** I inspect `_site/`
**Then** all HTML, CSS, and assets are present and properly linked

**Given** the build uses Node.js
**When** I check the version
**Then** it runs on Node.js 24 LTS as specified in Architecture

---

## Epic 6: Production Deployment & SEO

Site is deployed to GitHub Pages, SEO-optimized, and achieves Lighthouse 100.

### Story 6.1: Implement Sitemap Generation

As a **search engine crawler**,
I want **a sitemap.xml listing all pages**,
So that **all site content can be discovered and indexed**.

**Acceptance Criteria:**

**Given** the 11ty configuration
**When** I review `eleventy.config.js`
**Then** a sitemap plugin is configured (e.g., `@11ty/eleventy-plugin-sitemap` or custom template)

**Given** the site builds
**When** I inspect `_site/sitemap.xml`
**Then** the file exists and is valid XML

**Given** the sitemap content
**When** I review the URLs listed
**Then** all public pages are included: home, blog listing, all blog posts, projects listing, all projects, resume, contact

**Given** each URL in the sitemap
**When** I inspect the entry
**Then** it includes the full URL with correct base path for GitHub Pages

**Given** a new blog post or project is added
**When** the site rebuilds
**Then** the new page is automatically included in the sitemap

**Given** the sitemap.xml
**When** I validate it against sitemap schema
**Then** it passes validation with no errors

### Story 6.2: Implement robots.txt

As a **search engine crawler**,
I want **a robots.txt file indicating crawl permissions**,
So that **I know which pages to index**.

**Acceptance Criteria:**

**Given** the site builds
**When** I inspect `_site/robots.txt`
**Then** the file exists at the root

**Given** the robots.txt content
**When** I review the directives
**Then** it allows all crawlers to access all public pages (`User-agent: * Allow: /`)

**Given** the robots.txt content
**When** I review the sitemap reference
**Then** it includes `Sitemap: https://jaysingh.dev/sitemap.xml` (or correct base URL)

**Given** the robots.txt file
**When** I review the source
**Then** it is created via passthrough copy from `public/robots.txt` or template generation

**Given** crawlers follow robots.txt
**When** they access the site
**Then** all public pages are crawlable (no unintended blocks)

### Story 6.3: Implement Meta Tags and Open Graph

As a **site visitor sharing content**,
I want **rich previews when sharing links**,
So that **shared content looks professional on social media**.

**Acceptance Criteria:**

**Given** any page on the site
**When** I view the HTML `<head>`
**Then** I see `<title>`, `<meta name="description">`, and `<link rel="canonical">`

**Given** each page's meta tags
**When** I compare across pages
**Then** each page has unique title and description appropriate to its content

**Given** any page on the site
**When** I view the HTML `<head>`
**Then** I see Open Graph tags: `og:title`, `og:description`, `og:url`, `og:type`

**Given** a blog post page
**When** I inspect Open Graph tags
**Then** `og:type` is "article" and includes `article:published_time`

**Given** the home page
**When** I inspect Open Graph tags
**Then** `og:type` is "website"

**Given** I share a blog post URL on Twitter/LinkedIn
**When** the preview generates
**Then** it shows the post title, description, and site name

**Given** the meta tags implementation
**When** I review the code
**Then** it uses a reusable `partials/meta.njk` partial with template variables

**Given** visitors arriving from search engines
**When** they land on a blog post URL directly
**Then** the page loads with full content (no redirects, no JavaScript required)

### Story 6.4: Implement GitHub Actions Deployment

As a **content author (Jay)**,
I want **automatic deployment when I push to main**,
So that **content goes live without manual steps**.

**Acceptance Criteria:**

**Given** the repository
**When** I review `.github/workflows/deploy.yml`
**Then** a GitHub Actions workflow exists for deployment

**Given** the workflow configuration
**When** I review the trigger
**Then** it runs on push to `main` branch

**Given** the workflow runs
**When** I review the steps
**Then** it executes: checkout → setup Node 24 → npm ci → build:css → build:mermaid → build → deploy

**Given** the workflow completes successfully
**When** I check GitHub Pages
**Then** the site is live at the configured URL

**Given** I push a content change to main
**When** the workflow completes
**Then** the change is live on the site within 2-3 minutes

**Given** the build fails (e.g., invalid Markdown)
**When** I check the workflow
**Then** I see a clear error message indicating the failure reason

**Given** the deployment uses GitHub Pages
**When** I review the workflow
**Then** it uses `peaceiris/actions-gh-pages@v3` or GitHub's official pages action

**Given** the workflow
**When** I review secrets usage
**Then** it only uses `GITHUB_TOKEN` (no additional secrets required)

### Story 6.5: Achieve Lighthouse 100 Scores

As a **site visitor**,
I want **a fast, accessible, well-built site**,
So that **I have an excellent browsing experience**.

**Acceptance Criteria:**

**Given** the deployed site
**When** I run Lighthouse on the home page (mobile)
**Then** Performance score is 100

**Given** the deployed site
**When** I run Lighthouse on the home page (desktop)
**Then** Performance score is 100

**Given** the deployed site
**When** I run Lighthouse on any page
**Then** Accessibility score is 100

**Given** the deployed site
**When** I run Lighthouse on any page
**Then** Best Practices score is 100

**Given** the deployed site
**When** I run Lighthouse on any page
**Then** SEO score is 100

**Given** the performance metrics
**When** I review Core Web Vitals
**Then** FCP < 1.0s, LCP < 1.5s, TBT < 100ms, CLS < 0.1

**Given** the page weight
**When** I measure HTML + CSS + JS (gzipped)
**Then** total is < 200KB (excluding images)

**Given** the CSS bundle
**When** I measure `styles.css` (gzipped)
**Then** size is < 50KB (TailwindCSS purged)

**Given** any page with images
**When** I inspect the HTML
**Then** images have `width` and `height` attributes (prevents CLS)

**Given** a blog post with Mermaid diagram
**When** I run Lighthouse
**Then** Performance remains 100 (SVG is pre-rendered, no client JS)

---

## Epic 7: Sanity.io CMS Integration

Collaborators can manage all content through Sanity Studio, with automatic site rebuilds on publish.

**FRs covered:** FR41, FR42, FR43, FR44, FR45

### Story 7.1: Initialize Sanity Project and Studio

As a **developer**,
I want **a configured Sanity project with Studio**,
So that **collaborators have a CMS interface to manage content**.

**Acceptance Criteria:**

**Given** the jaysingh.dev repository
**When** I run Sanity CLI init
**Then** a Sanity project is created with production dataset

**Given** the Sanity project exists
**When** I run `npm run dev` in the studio directory
**Then** Sanity Studio runs locally and connects to the project

**Given** the Sanity configuration
**When** I review the project settings
**Then** the project ID and dataset are stored in environment variables

**Given** the repository structure
**When** I review the directories
**Then** Sanity Studio is in a `studio/` directory at project root

### Story 7.2: Define Content Schemas

As a **developer**,
I want **Sanity schemas matching existing content structure**,
So that **CMS content maps cleanly to 11ty templates**.

**Acceptance Criteria:**

**Given** the Sanity Studio
**When** I review the schema definitions
**Then** a `post` schema exists with fields: id, title, date, excerpt, tags, readTime, body, relatedProjectIds

**Given** the Sanity Studio
**When** I review the schema definitions
**Then** a `project` schema exists with fields: id, title, description, tags, projectType, github, demo, mermaid, challenge, solution, impact

**Given** the Sanity Studio
**When** I review the schema definitions
**Then** a `profile` schema exists with fields: name, role, bio, email, github, linkedin

**Given** the Sanity Studio
**When** I review the schema definitions
**Then** a `resume` schema exists with fields: experience (array), education (array)

**Given** the Sanity Studio
**When** I review the schema definitions
**Then** a `skills` schema exists with categorized skill arrays

**Given** the Sanity Studio
**When** I review the schema definitions
**Then** a `siteConfig` schema exists with fields: title, description, baseUrl

**Given** all schemas
**When** I review field naming
**Then** all fields use camelCase matching existing frontmatter conventions

### Story 7.3: Implement 11ty Sanity Data Source

As a **developer**,
I want **11ty to fetch content from Sanity at build time**,
So that **CMS content appears on the built site**.

**Acceptance Criteria:**

**Given** the project dependencies
**When** I review package.json
**Then** @sanity/client is installed

**Given** the `_data/` directory
**When** I review the data files
**Then** JavaScript files exist that fetch from Sanity API (e.g., `posts.js`, `projects.js`, `profile.js`)

**Given** the Sanity data files
**When** 11ty builds the site
**Then** content from Sanity is available in templates as collections and global data

**Given** environment variables are not set
**When** 11ty builds the site
**Then** it falls back to local Markdown files gracefully

**Given** the Sanity fetch
**When** I review the GROQ queries
**Then** queries are optimized and fetch only required fields

**Given** a successful build
**When** I inspect the output
**Then** content from Sanity renders identically to content from Markdown

### Story 7.4: Configure Webhook Rebuilds

As a **collaborator**,
I want **the site to rebuild when I publish in Sanity**,
So that **my content goes live automatically**.

**Acceptance Criteria:**

**Given** the Sanity project settings
**When** I review webhooks
**Then** a webhook is configured to call GitHub API on publish

**Given** the GitHub repository
**When** I review Actions workflows
**Then** a workflow triggers on `repository_dispatch` event

**Given** content is published in Sanity
**When** the webhook fires
**Then** GitHub Actions starts a build within 30 seconds

**Given** the rebuild completes
**When** I check GitHub Pages
**Then** the new content is live

**Given** the webhook configuration
**When** I review security
**Then** the webhook uses a secret token for authentication

**Given** the rebuild workflow
**When** I review the steps
**Then** it runs the same build pipeline as push to main (CSS → Mermaid → 11ty → Deploy)

### Story 7.5: Deploy Sanity Studio

As a **collaborator**,
I want **to access Sanity Studio from a stable URL**,
So that **I can manage content from anywhere**.

**Acceptance Criteria:**

**Given** the Sanity Studio
**When** I run the deploy command
**Then** Studio is deployed to Sanity's hosting

**Given** the deployed Studio
**When** I access the URL
**Then** I can log in and see content

**Given** the Studio deployment
**When** I review the URL
**Then** it is accessible at a memorable URL (e.g., jaysingh.sanity.studio)

**Given** the deployed Studio
**When** a collaborator accesses it
**Then** they can authenticate with their Sanity account

**Given** the Studio configuration
**When** I review access settings
**Then** only authorized collaborators can edit content

### Story 7.6: Validate End-to-End Content Workflow

As a **collaborator**,
I want **to create content and see it live**,
So that **I can confirm the workflow works**.

**Acceptance Criteria:**

**Given** access to Sanity Studio
**When** I create a new blog post with all required fields
**Then** the post saves successfully

**Given** a saved blog post
**When** I click Publish
**Then** the webhook triggers within 30 seconds

**Given** the webhook triggered
**When** the build completes
**Then** the new post appears on the live site at `/blog/{id}/`

**Given** the live post
**When** I compare to the Sanity content
**Then** all fields render correctly (title, date, body, tags)

**Given** all content types
**When** I test create/edit/publish for each
**Then** blog posts, projects, profile, resume, skills, and site config all work

**Given** a content update in Sanity
**When** I measure time to live
**Then** changes appear on the live site within 5 minutes of publish
