---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-success
  - step-04-journeys
  - step-05-domain-skipped
  - step-06-innovation-skipped
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
status: complete
completedAt: 2026-01-29
classification:
  projectType: web_app_static
  domain: general
  complexity: low
  projectContext: brownfield
  deploymentTarget: github_pages
  migrationScope:
    from: React 18 SPA + Vite + TypeScript
    to: 11ty + Nunjucks + JavaScript
    nodeVersion: 24 LTS
    preserved:
      - TailwindCSS
      - Neubrutalist design system
      - Content schemas (frontmatter)
      - Mermaid diagrams
inputDocuments:
  - docs/index.md
  - docs/project-structure.md
  - docs/existing-documentation.md
  - docs/architecture-patterns.md
  - docs/technology-stack.md
  - docs/component-inventory.md
  - docs/state-management.md
  - docs/content-schema.md
  - docs/source-tree-analysis.md
  - docs/development-guide.md
  - docs/architecture.md
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 11
workflowType: 'prd'
---

# Product Requirements Document - jaysingh.dev

**Author:** Jay
**Date:** 2026-01-29

## Executive Summary

**Project:** Migrate jaysingh.dev from React 18 SPA to 11ty static site generator

**Objective:** Achieve 1:1 feature parity with 100% Lighthouse scores across all categories (Performance, Accessibility, Best Practices, SEO) while establishing a CMS-ready architecture for future Sanity.io integration.

**Key Deliverables:**
- Complete migration of 5 pages, 22 components, 5 blog posts, and 9 projects
- Pre-rendered static HTML with build-time SVG rendering for Mermaid diagrams
- GitHub Pages deployment via GitHub Actions CI/CD
- Clean file-based URLs replacing hash-based SPA routing
- Preserved Neubrutalist design system using TailwindCSS

**Technology Stack:** 11ty + Nunjucks + TailwindCSS + Node.js 24 LTS

**Scope:** MVP includes migration parity AND Sanity.io CMS integration for collaborator content authoring.

## Success Criteria

### User Success

- **Lighthouse Scores:** 100/100 across all four categories (Performance, Accessibility, Best Practices, SEO) on both mobile and desktop
- **Visual Parity:** Identical visual experience to current React site - Neubrutalist design system, all components, interactions preserved
- **URL Improvement:** Clean URLs (`/blog/post-name/` instead of `/#blog/post-name`)
- **Content Parity:** All 5 blog posts, 9 projects, resume, and contact pages functional

### Business Success

- **Deployment:** Successfully deployed to GitHub Pages
- **Maintainability:** Codebase follows 11ty best practices for long-term maintenance
- **Timeline:** Quality over speed - no technical debt shortcuts

### Technical Success

- **11ty Best Practices:** Data cascade, collections, layouts, partials, proper use of Nunjucks
- **CMS-Ready Architecture:** Content abstraction layer designed for future Sanity.io integration (schemas, data fetching patterns, separation of concerns)
- **Code Quality:** Clean, documented, following established 11ty conventions
- **Build Pipeline:** Node.js 24 LTS, TailwindCSS integration, Mermaid build-time SVG rendering

### Measurable Outcomes

| Metric | Target |
|--------|--------|
| Lighthouse Performance (Mobile) | 100 |
| Lighthouse Performance (Desktop) | 100 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| Feature Parity | 100% of current features |
| Visual Parity | Identical to React version |

## Product Scope

### MVP - Minimum Viable Product

- Complete 1:1 migration of all pages (Home, Blog, Projects, Resume, Contact)
- All 22 React components translated to Nunjucks partials/macros
- Content pipeline migrated (Markdown → 11ty collections)
- TailwindCSS Neubrutalist design system preserved
- Mermaid diagram rendering (build-time SVG)
- Clean file-based URLs
- GitHub Pages deployment with working CI/CD
- 100% Lighthouse scores achieved
- Sanity.io Studio with content schemas (blog, projects, profile, config)
- Webhook-triggered rebuilds on Sanity publish
- Collaborator access to CMS for content authoring

### Growth Features (Post-MVP)

- Content preview/draft mode
- Structured content editing enhancements

### Vision (Future)

- Real-time content updates via Sanity webhooks
- Enhanced content features (search, filtering, related content algorithms)

## User Journeys

### Journey 1: The Recruiter (Site Visitor - Evaluation)

**Sarah, Engineering Manager at a SaaS startup**

Sarah is hiring a senior DevOps engineer. She received Jay's application and clicks the portfolio link. She lands on the homepage and immediately sees a clean, professional design with clear navigation.

She clicks **Projects** and scans the cards - she's specifically interested in infrastructure work. She spots "Observability Infrastructure" and clicks through. The Mermaid architecture diagram loads, showing the Prometheus/Grafana stack. She reads the Challenge/Solution/Impact sections - exactly what she needed to assess technical depth.

She navigates to **Resume** to verify work history, then to **Blog** to see how Jay communicates technical concepts. The "Docker Observability" post catches her eye. She reads it on mobile during her commute - it loads fast, renders perfectly.

**Outcome:** Sarah adds Jay to the interview shortlist. The portfolio answered her key questions quickly.

**Capabilities revealed:** Fast page loads, mobile-responsive, project detail pages, resume page

### Journey 2: The Technical Peer (Site Visitor - Learning)

**Marcus, Platform Engineer**

Marcus finds Jay's blog post "PostgreSQL Performance" via Google search. He lands directly on the article - no interstitial, no popups. The code blocks are syntax-highlighted and copy-able. The Mermaid diagrams illustrate the concepts clearly.

He wants to see what else Jay has written. He clicks **Blog** and browses other posts. He finds the CI/CD best practices article relevant to his current work. He shares the link on Slack with his team.

**Outcome:** Marcus bookmarks the site and returns when researching new topics.

**Capabilities revealed:** SEO (direct article landing), code block functionality, social sharing, blog discovery

### Journey 3: The Git-Native Author (Jay - Content via Git)

**Jay wants to publish a new blog post**

Jay opens his editor, creates `content/blog/kubernetes-secrets.md`, adds the frontmatter (id, title, date, tags, readTime), and writes the markdown content including a Mermaid diagram.

He commits and pushes to `main`. GitHub Actions detects the push, runs `npm run build`, and deploys to GitHub Pages. Within 2-3 minutes, the new post is live at `/blog/kubernetes-secrets/`.

Jay checks the live site, confirms the Mermaid diagram rendered, and shares the link on LinkedIn.

**Outcome:** Content published without leaving the terminal/editor workflow.

**Capabilities revealed:** Git-triggered CI/CD, automated build, GitHub Pages deployment, content pipeline processing

### Journey 4: The CMS Author (Team Member - Content via Sanity)

**Alex, a content collaborator with Sanity access**

Alex logs into Sanity.io Studio, sees the list of blog posts and projects. They click "Create new Blog Post" and fill in the structured fields - title, excerpt, tags. They write the body content in Sanity's rich text editor.

They click "Publish." Sanity triggers a webhook to GitHub, which triggers a rebuild. The new post goes live on GitHub Pages within minutes.

Alex previews the post on the live site without needing to know Git, Markdown, or the command line.

**Outcome:** Non-technical team members can contribute content through a friendly CMS interface.

**Capabilities revealed:** Sanity.io integration, webhook-triggered builds, structured content editing, CMS preview

### Journey 5: The Site Maintainer (Jay - Deployment & Updates)

**Jay needs to update dependencies and deploy**

Jay pulls the latest, runs `npm update`, tests locally with `npm run dev`. Everything works. He runs Lighthouse locally to verify scores are still at 100.

He commits the dependency updates, pushes to `main`. GitHub Actions runs the build and deploys automatically. He checks the live site to confirm.

Later, when adding Sanity.io, Jay updates the data fetching layer to pull from Sanity API alongside local markdown. The abstraction layer means minimal code changes.

**Outcome:** Maintenance is straightforward, and the architecture supports incremental CMS integration.

**Capabilities revealed:** Local development, CI/CD pipeline, Lighthouse testing, modular architecture for CMS integration

### Journey Requirements Summary

| Journey | Key Capabilities Required |
|---------|---------------------------|
| Recruiter | Fast loads, mobile-responsive, project detail pages, resume page |
| Technical Peer | SEO, code blocks, Mermaid diagrams, social sharing, blog listing |
| Git Author | Markdown content pipeline, Git-triggered CI/CD, GitHub Pages deployment |
| CMS Author | Sanity.io Studio, webhooks, structured content, rebuild triggers (MVP) |
| Maintainer | Local dev environment, Lighthouse testing, modular data layer |

## Web App Specific Requirements

### Project-Type Overview

**Migration Type:** SPA (React) → MPA (11ty Static Site)

This project transforms a client-side rendered Single Page Application into a pre-rendered Multi-Page Application using 11ty. The result is a collection of static HTML pages served from GitHub Pages, with client-side JavaScript only where necessary (Mermaid diagrams, code copy buttons, mobile menu).

### Browser Support Matrix

| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome | Latest 2 versions | Full |
| Firefox | Latest 2 versions | Full |
| Safari | Latest 2 versions | Full |
| Edge | Latest 2 versions | Full |
| Mobile Safari (iOS) | Latest 2 versions | Full |
| Chrome Mobile (Android) | Latest 2 versions | Full |

**No support required for:** IE11, legacy Edge, older mobile browsers

### Responsive Design

**Breakpoints (preserved from React site):**

| Breakpoint | Width | Target |
|------------|-------|--------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |

**Approach:**
- Mobile-first CSS via TailwindCSS
- Same responsive behavior as current React implementation
- Touch-friendly interactions on mobile (menu, navigation)

### Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance (Mobile) | 100 | Chrome DevTools |
| Lighthouse Performance (Desktop) | 100 | Chrome DevTools |
| First Contentful Paint | < 1.0s | Mobile 3G simulation |
| Largest Contentful Paint | < 1.5s | Mobile 3G simulation |
| Total Blocking Time | < 100ms | Mobile |
| Cumulative Layout Shift | < 0.1 | All pages |

**Performance strategies:**
- Pre-rendered HTML (no hydration delay)
- Optimized TailwindCSS (purged unused styles)
- Build-time SVG rendering for Mermaid diagrams (no client JS)
- No JavaScript required for core content viewing

### SEO Strategy

| Requirement | Implementation |
|-------------|----------------|
| Clean URLs | `/blog/post-name/` (11ty default) |
| Meta tags | Title, description, Open Graph per page |
| Semantic HTML | Proper heading hierarchy, landmarks |
| Sitemap | Auto-generated sitemap.xml |
| Robots.txt | Allow all crawlers |
| Canonical URLs | Self-referencing canonicals |

**SEO improvements over React SPA:**
- Direct page URLs (no hash routing)
- Full HTML content in source (vs client-rendered)
- Faster crawl and index by search engines

### Accessibility Level

**Target:** WCAG 2.1 AA (Lighthouse Accessibility 100)

| Requirement | Implementation |
|-------------|----------------|
| Keyboard navigation | All interactive elements focusable |
| Focus indicators | Visible focus states (Neubrutalist style) |
| Color contrast | 4.5:1 minimum (black on cream/colors) |
| Alt text | All images have descriptive alt |
| ARIA labels | Navigation landmarks, buttons |
| Skip links | Skip to main content |
| Reduced motion | Respect `prefers-reduced-motion` |

### Implementation Considerations

**Client-side JavaScript (minimal):**
- Code block copy-to-clipboard
- Mobile navigation toggle
- Social share functionality

**Build-time rendering (no client JS):**
- Mermaid diagrams → SVG at build time

**No JavaScript required for:**
- Page navigation
- Content viewing
- Blog/project browsing
- Resume viewing

**Build-time processing:**
- Markdown → HTML via 11ty
- TailwindCSS compilation
- Syntax highlighting (11ty plugin)

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Feature Parity Migration

This is a **technical migration** project, not a new product launch. The MVP philosophy is:
- **Parity first** - Match all existing React functionality before adding anything new
- **Quality over features** - 100% Lighthouse scores are non-negotiable
- **Zero client-side JS where possible** - Pre-render everything at build time
- **CMS-ready architecture** - Structure for Sanity.io without implementing it yet

**Resource Requirements:** Solo developer (Jay) with 11ty, TailwindCSS, and GitHub Actions expertise

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Site visitors browsing portfolio, blog, projects, resume
- Git-based content authoring workflow
- Automated deployment via GitHub Actions

**Must-Have Capabilities:**

| Category | Capability | Implementation |
|----------|------------|----------------|
| **Pages** | Home, Blog, Blog Detail, Projects, Project Detail, Resume, Contact | 11ty templates + Nunjucks |
| **Components** | All 22 React components translated | Nunjucks partials/macros |
| **Content** | 5 blog posts, 9 projects, resume data | 11ty collections + data cascade |
| **Diagrams** | Mermaid architecture diagrams | **Build-time SVG rendering** (no client JS) |
| **Code Blocks** | Syntax highlighting with copy button | 11ty syntax highlight plugin + minimal JS |
| **Design** | Neubrutalist design system | TailwindCSS (same config) |
| **Performance** | 100% Lighthouse (all 4 categories) | Pre-rendered HTML, optimized CSS, minimal JS |
| **SEO** | Clean URLs, meta tags, sitemap | 11ty defaults + plugins |
| **Deployment** | GitHub Pages | GitHub Actions workflow |

**Explicitly Deferred (Not in MVP):**
- Content preview/draft mode (advanced Sanity feature)
- Search functionality
- Related content algorithms
- Analytics integration

### Post-MVP Features

**Phase 2 (Growth) - Sanity.io Integration:**
- Sanity Studio setup with content schemas
- Dual-source content (Git markdown + Sanity API)
- Webhook-triggered rebuilds on Sanity publish
- Content preview for CMS authors
- Up to 20 Sanity seats for collaborators

**Phase 3 (Expansion) - Enhanced Features:**
- Real-time content updates
- Site search (Pagefind or similar)
- Related content recommendations
- Reading time estimates
- View/engagement analytics

### Risk Mitigation Strategy

| Risk Type | Risk | Likelihood | Mitigation |
|-----------|------|------------|------------|
| **Technical** | Lighthouse 100 with diagrams | Medium | Build-time SVG rendering eliminates Mermaid JS |
| **Technical** | Component translation errors | Low | Visual regression testing, side-by-side comparison |
| **Technical** | TailwindCSS integration issues | Low | Use established `eleventy-plugin-tailwindcss` patterns |
| **Scope Creep** | Adding features during migration | Medium | Strict parity rule - log ideas for Phase 2, don't implement |
| **Performance** | CSS bundle size | Low | TailwindCSS purge in production build |
| **Compatibility** | 11ty + Node 24 LTS | Low | Test early, use LTS version |

### Technical Decisions Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Mermaid Rendering | Build-time SVG | Zero client JS, instant render, Lighthouse 100 |
| Syntax Highlighting | 11ty plugin (Prism/Shiki) | Build-time, no client JS |
| CSS Framework | TailwindCSS | Already in use, portable |
| Templating | Nunjucks | 11ty default, macro support |
| Deployment | GitHub Actions → GitHub Pages | Free, integrated, reliable |
| Node Version | 24 LTS | Modern, long-term support |

## Functional Requirements

### Navigation & Site Structure

- **FR1:** Visitors can navigate between all main sections (Home, Blog, Projects, Resume, Contact) via persistent header navigation
- **FR2:** Visitors can navigate using clean URLs (`/blog/`, `/projects/`, etc.) without hash fragments
- **FR3:** Visitors can access the site on mobile devices with a responsive navigation menu
- **FR4:** Visitors can use keyboard navigation to access all interactive elements
- **FR5:** Visitors can skip to main content using a skip link

### Content Display

- **FR6:** Visitors can view pre-rendered HTML pages without requiring JavaScript for core content
- **FR7:** Visitors can view Mermaid diagrams rendered as static SVG images
- **FR8:** Visitors can view syntax-highlighted code blocks
- **FR9:** Visitors can copy code from code blocks to clipboard
- **FR10:** Visitors can view content with the Neubrutalist design system (bold borders, box shadows, monospace typography)
- **FR11:** Visitors can view content responsively across mobile, tablet, and desktop breakpoints

### Blog Functionality

- **FR12:** Visitors can browse a list of all blog posts with title, date, excerpt, and tags
- **FR13:** Visitors can read individual blog post detail pages with full content
- **FR14:** Visitors can see related projects linked from blog posts
- **FR15:** Visitors can share blog posts via social sharing functionality
- **FR16:** Visitors can see estimated reading time for blog posts

### Project Showcase

- **FR17:** Visitors can browse a list of all projects with title, description, and technology tags
- **FR18:** Visitors can view individual project detail pages with Challenge/Solution/Impact sections
- **FR19:** Visitors can view architecture diagrams (Mermaid SVG) on project pages
- **FR20:** Visitors can access external links (GitHub, live demo) from project pages
- **FR21:** Visitors can filter projects by type (work/personal) or available resources (GitHub, docs, diagrams)

### Resume & Professional Information

- **FR22:** Visitors can view work experience history with company, role, dates, and responsibilities
- **FR23:** Visitors can view education history
- **FR24:** Visitors can view categorized technical skills
- **FR25:** Visitors can view profile information (name, role, bio, contact details)

### Contact & Communication

- **FR26:** Visitors can view contact information and social links
- **FR27:** Visitors can access email, GitHub, and LinkedIn directly from the contact page

### Content Authoring (Git Workflow)

- **FR28:** Author (Jay) can create new blog posts by adding Markdown files with YAML frontmatter
- **FR29:** Author (Jay) can create new projects by adding Markdown files with YAML frontmatter
- **FR30:** Author (Jay) can update site configuration via YAML data files
- **FR31:** Author (Jay) can include Mermaid diagram code in Markdown that renders as SVG at build time
- **FR32:** Author (Jay) can preview content locally before publishing

### Build & Deployment

- **FR33:** System can build the complete site using 11ty with Node.js 24 LTS
- **FR34:** System can process TailwindCSS and purge unused styles in production
- **FR35:** System can generate a sitemap.xml automatically
- **FR36:** System can deploy to GitHub Pages via GitHub Actions on push to main
- **FR37:** System can achieve 100% Lighthouse scores (Performance, Accessibility, Best Practices, SEO)

### SEO & Discoverability

- **FR38:** Visitors arriving via search engines can land directly on blog post pages
- **FR39:** Search engines can crawl all public pages via robots.txt allowance
- **FR40:** Each page can have unique meta tags (title, description, Open Graph)

### Content Authoring (CMS Workflow)

- **FR41:** Collaborators can create and edit blog posts via Sanity Studio
- **FR42:** Collaborators can create and edit projects via Sanity Studio
- **FR43:** Collaborators can update profile, resume, and skills data via Sanity Studio
- **FR44:** Collaborators can update site configuration via Sanity Studio
- **FR45:** System rebuilds and deploys automatically when content is published in Sanity

## Non-Functional Requirements

### Performance

| Requirement | Target | Measurement |
|-------------|--------|-------------|
| **NFR1:** Lighthouse Performance Score | 100 | Mobile & Desktop |
| **NFR2:** First Contentful Paint | < 1.0s | Mobile 3G simulation |
| **NFR3:** Largest Contentful Paint | < 1.5s | Mobile 3G simulation |
| **NFR4:** Total Blocking Time | < 100ms | Mobile |
| **NFR5:** Cumulative Layout Shift | < 0.1 | All pages |
| **NFR6:** Time to Interactive | < 2.0s | Mobile 3G simulation |
| **NFR7:** Page Weight (HTML + CSS + JS) | < 200KB | Gzipped, excluding images |

**Performance Strategies:**
- Pre-rendered static HTML (no client-side hydration)
- Build-time SVG for Mermaid diagrams (no Mermaid JS)
- TailwindCSS purging in production
- Deferred/async loading for non-critical JS (copy button, mobile menu)

### Accessibility

| Requirement | Target | Standard |
|-------------|--------|----------|
| **NFR8:** Lighthouse Accessibility Score | 100 | Mobile & Desktop |
| **NFR9:** WCAG Compliance Level | 2.1 AA | All pages |
| **NFR10:** Color Contrast Ratio | ≥ 4.5:1 | Text on backgrounds |
| **NFR11:** Keyboard Navigation | 100% | All interactive elements |
| **NFR12:** Screen Reader Compatibility | Full | NVDA, VoiceOver tested |
| **NFR13:** Focus Indicators | Visible | All focusable elements |
| **NFR14:** Reduced Motion Support | Respected | `prefers-reduced-motion` |

**Accessibility Implementation:**
- Semantic HTML5 elements (nav, main, article, section)
- ARIA landmarks and labels where needed
- Skip-to-main-content link
- Alt text for all images
- Proper heading hierarchy (h1 → h2 → h3)

### Maintainability

| Requirement | Description |
|-------------|-------------|
| **NFR15:** Code Organization | Follows 11ty conventions (_includes, _data, content separation) |
| **NFR16:** Component Reusability | Nunjucks macros for reusable UI patterns |
| **NFR17:** Content Schema Stability | Frontmatter schemas compatible with Sanity.io migration |
| **NFR18:** Build Reproducibility | Locked dependencies, deterministic builds |
| **NFR19:** Local Development | Full site buildable and previewable locally |
| **NFR20:** Documentation | README with setup, build, and content authoring instructions |

**Maintainability Strategies:**
- Clear separation: content (Markdown) / templates (Nunjucks) / styles (Tailwind) / data (YAML/JSON)
- Content schemas designed for future Sanity.io mapping
- No custom build scripts beyond standard 11ty patterns

### Security (Minimal - Static Site)

| Requirement | Description |
|-------------|-------------|
| **NFR21:** HTTPS Enforcement | All traffic served over HTTPS (GitHub Pages default) |
| **NFR22:** No Sensitive Data | No user data collection, no forms submitting to backend |
| **NFR23:** Dependency Security | No known vulnerabilities in production dependencies |

