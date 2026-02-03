# UI Component Inventory

**Generated:** 2026-02-01
**Project:** jaysingh.dev
**Framework:** 11ty + Nunjucks
**Status:** Migration Complete

---

## Component Overview

The project uses Nunjucks templates with macros and partials for reusable components.

| Category | Count | Location |
|----------|-------|----------|
| **Layouts** | 3 | `_includes/layouts/` |
| **Components** | 4 | `_includes/components/` |
| **Partials** | 6 | `_includes/partials/` |
| **Client JS** | 4 functions | `js/main.js` |

---

## Layouts

### base.njk
Base HTML layout with global structure.

```
<!DOCTYPE html> → Meta → Title → Styles → Body
  ├── Skip Link (accessibility)
  ├── Header (sticky)
  ├── Main Content (slot)
  ├── Footer
  └── JavaScript
```

**Variables:**
- `title` - Page title (optional, prefixed to site title)
- `content` - Page content (Nunjucks slot)

### blog-post.njk
Blog post detail layout with TOC sidebar.

**Extends:** `layouts/base.njk`

**Features:**
- Back button navigation
- Category tag from tags
- Title with first word highlighted
- Author byline (optional)
- Technology tags
- Prose content rendering
- Social share buttons
- Related projects
- Table of Contents (JS-powered)
- Scroll progress indicator

**Variables:**
- `title`, `date`, `lastUpdated`, `tags`, `author`, `relatedProjectIds`

### project.njk
Project case study layout with structured sections.

**Extends:** `layouts/base.njk`

**Features:**
- Project type badge
- Title with first word highlighted (lime)
- Description and technologies
- External links (GitHub, Live, Docs)
- Collapsible sections: Overview, Architecture, Challenge, Solution, Impact, Key Features
- Table of Contents sidebar
- Diagram viewer integration

**Variables:**
- `title`, `description`, `longDescription`, `technologies`, `projectType`
- `challenge`, `solution`, `impact`, `keyFeatures`
- `githubUrl`, `liveUrl`, `documentationUrl`
- `diagramContent`, `diagramLabel`

---

## Components (Macros)

### card.njk
Neubrutalist card container macro.

```nunjucks
{% from "components/card.njk" import card %}
{% call card("lg") %}
  Content here
{% endcall %}
```

**Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `size` | string | `"default"` | `sm`, `default`, `lg` |
| `clickable` | boolean | `false` | Add hover/active states |

**Styling:**
- White background
- 4px black border
- Shadow based on size (4px/6px/8px)

### tag.njk
Technology/category tag component.

```nunjucks
{% from "components/tag.njk" import tag %}
{{ tag("Python", "tech") }}
{{ tag("TECHNICAL", "category") }}
```

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `text` | string | Tag text |
| `variant` | string | `tech` or `category` |

**Color Logic:**
- Category tags: Pink background
- Tech tags: Color varies by technology keyword

### button.njk
Neubrutalist action button macro.

```nunjucks
{% from "components/button.njk" import button %}
{{ button("Submit", "lime", "submit") }}
```

**Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `text` | string | required | Button label |
| `variant` | string | `"lime"` | Color variant |
| `type` | string | `"button"` | HTML button type |

**Variants:** `lime`, `pink`, `yellow`, `blue`, `secondary`

### external-links.njk
External link buttons for projects.

```nunjucks
{% from "components/external-links.njk" import externalLinks %}
{{ externalLinks(githubUrl, liveUrl, documentationUrl) }}
```

**Features:**
- GitHub link with icon
- Live demo link with icon
- Documentation link with icon
- Conditional rendering (only if URL provided)

---

## Partials

### header.njk
Site header with navigation.

**Features:**
- Logo button (JAY SINGH)
- Desktop nav (horizontal links)
- Mobile menu button (hamburger/X toggle)
- Mobile nav (vertical links, hidden by default)
- Active page highlighting (`aria-current`)

**Navigation Items:**
```javascript
[
  { url: '/', text: 'HOME' },
  { url: '/blog/', text: 'BLOG' },
  { url: '/projects/', text: 'PROJECTS' },
  { url: '/resume/', text: 'RESUME' },
  { url: '/contact/', text: 'CONTACT' }
]
```

### footer.njk
Site footer with social links and copyright.

**Data Source:** `_data/profile.json`

### meta.njk
HTML meta tags for SEO and social sharing.

**Features:**
- Charset, viewport
- Description, author
- Open Graph tags
- Theme color
- Canonical URL

**Data Source:** `_data/site.json`

### skip-link.njk
Accessibility skip link for keyboard navigation.

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

Visible only on focus (screen reader accessible).

### social-share.njk
Social sharing buttons for blog posts.

**Features:**
- Twitter share (popup)
- LinkedIn share (popup)
- Native share (Web Share API, progressive)

### related-projects.njk
Related projects section for blog posts.

**Features:**
- Uses `findProjectsByIds` filter
- Renders project cards with links
- Only shown if `relatedProjectIds` exists

---

## Client-Side JavaScript

### main.js Functions

| Function | Purpose |
|----------|---------|
| `initCodeCopy()` | Wrap code blocks, add copy buttons |
| `initSocialShare()` | Handle share button clicks |
| `initDiagramViewer()` | Fullscreen modal with zoom/pan |
| `initResumePrint()` | Print button for resume |
| Mobile menu toggle | Hamburger menu behavior |

### Progressive Enhancement

All content works without JavaScript:
- Code is readable without copy button
- Diagrams are viewable without modal
- Navigation links work natively
- Share URLs are in data attributes

JavaScript enhances:
- Copy to clipboard
- Share popups
- Diagram zoom/pan
- Mobile menu animation

---

## Design System Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `cream` | `#FFFBEB` | Background |
| `lime-400` | Tailwind | Primary accent |
| `pink-400` | Tailwind | Secondary accent |
| `yellow-400` | Tailwind | Active states |
| `blue-400` | Tailwind | Info elements |

### Shadows
```css
--shadow-brutal-sm: 3px 3px 0 #000;
--shadow-brutal: 4px 4px 0 #000;
--shadow-brutal-md: 6px 6px 0 #000;
--shadow-brutal-lg: 8px 8px 0 #000;
```

### Typography
- Font: `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace`
- Headings: `font-weight: 900`
- Body: `line-height: 1.6`

---

*Generated by BMAD document-project workflow*
