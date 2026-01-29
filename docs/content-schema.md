# Content Schema Reference

**Generated:** 2026-01-29
**Project:** jaysingh.dev

## Overview

Content is authored in Markdown with YAML frontmatter. The build script (`scripts/build-content.js`) processes these files and outputs JSON for runtime consumption.

---

## Blog Post Schema

**Location:** `content/blog/*.md`
**Output:** `public/blog-posts.json`

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✓ | Unique identifier (URL slug) |
| `title` | string | ✓ | Post title (displayed as-is, often uppercase) |
| `date` | string | ✓ | Publication date (YYYY-MM-DD) |
| `excerpt` | string | ✓ | Short description for previews |
| `tags` | string[] | ✓ | Technology/category tags |
| `readTime` | string | ✓ | Estimated read time (e.g., "10 min") |
| `featured` | boolean | | Show on homepage (default: false) |
| `relatedProjectIds` | string[] | | IDs of related projects |
| `author` | object | | Author information (optional) |
| `lastUpdated` | string | | Last update date (YYYY-MM-DD) |
| `coverImage` | string | | Cover image URL |

### Example

```yaml
---
id: docker-observability
title: COMPREHENSIVE OBSERVABILITY FOR DOCKER MICROSERVICES
date: 2024-09-22
excerpt: Building a complete monitoring stack with Prometheus, Grafana, Loki, and OpenTelemetry.
tags:
  - docker
  - prometheus
  - grafana
  - observability
readTime: 10 min
featured: true
relatedProjectIds:
  - observability-infrastructure
---
```

### TypeScript Interface

```typescript
interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
  contentBlocks?: ContentBlock[];
  tags: string[];
  readTime: string;
  featured: boolean;
  relatedProjectIds?: string[];
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  lastUpdated?: string;
  coverImage?: string;
}
```

---

## Project Schema

**Location:** `content/projects/*.md`
**Output:** `public/projects.json`

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✓ | Unique identifier (URL slug) |
| `title` | string | ✓ | Project title (often uppercase) |
| `description` | string | ✓ | Short description for cards |
| `technologies` | string[] | ✓ | Technology tags |
| `liveUrl` | string\|null | | Live demo URL |
| `githubUrl` | string\|null | | GitHub repository URL |
| `imageAlt` | string | ✓ | Alt text for project image |
| `featured` | boolean | | Show on homepage (default: false) |
| `projectType` | string | | 'personal' or 'work' (default: 'personal') |
| `diagramType` | string | | 'mermaid' or 'image' |
| `diagramLabel` | string | | Diagram section title |
| `diagramContent` | string | | Mermaid diagram code |
| `diagramImageUrl` | string | | Image diagram URL |
| `keyFeatures` | string[] | | List of key features |
| `documentationUrl` | string | | Link to external docs |

### Markdown Body Sections

The markdown body is parsed into sections by `## ` headings:

| Section | Description |
|---------|-------------|
| (intro) | Long description paragraph(s) |
| `## Challenge` | Problem statement |
| `## Solution` | How the problem was solved |
| `## Impact` | Results and metrics |

### Example

```yaml
---
id: qr-code-platform
title: QR CODE GENERATION PLATFORM
description: High-performance QR code generation and analytics platform.
technologies:
  - Python
  - FastAPI
  - PostgreSQL
  - Docker
  - Prometheus
  - Grafana
liveUrl: null
githubUrl: https://github.com/gsinghjay/qr-platform
imageAlt: QR code analytics dashboard
featured: true
projectType: work
diagramType: mermaid
diagramLabel: System Architecture
diagramContent: |
  graph TB
      A[User Browser] -->|HTTPS| B[Traefik Reverse Proxy]
      B --> C[FastAPI Application]
      ...
keyFeatures:
  - Real-time analytics dashboard
  - Advanced bot detection
  - Mobile-optimized interface
---

Introduction paragraph here...

## Challenge

Problem statement...

## Solution

How we solved it...

## Impact

Results and metrics...
```

### TypeScript Interface

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  imageAlt: string;
  featured: boolean;
  longDescription?: string;
  challenge?: string;
  solution?: string;
  impact?: string;
  keyFeatures?: string[];
  projectType?: 'personal' | 'work';
  documentationUrl?: string;
  diagramType?: 'mermaid' | 'image';
  diagramContent?: string;
  diagramImageUrl?: string;
  diagramLabel?: string;
}
```

---

## Profile Schema

**Location:** `content/config/profile.yaml`
**Output:** `src/data/profile.json`

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name |
| `role` | string | Job title |
| `tagline` | string | Short tagline |
| `bio` | string | Extended biography |
| `location` | string | Location |
| `availability` | string | Availability status |
| `email` | string | Contact email |
| `phone` | string | Phone number |
| `github` | string | GitHub profile URL |
| `linkedin` | string | LinkedIn profile URL |
| `twitter` | string\|null | Twitter handle/URL |

---

## Skills Schema

**Location:** `content/config/skills.yaml`
**Output:** `src/data/skills.json`

### Fields

All fields are string arrays:

| Field | Description |
|-------|-------------|
| `languages` | Programming languages |
| `frontend` | Frontend technologies |
| `backend` | Backend technologies |
| `database` | Database technologies |
| `devops` | DevOps tools |
| `observability` | Monitoring tools |
| `security` | Security practices |
| `testing` | Testing tools |
| `tools` | Development tools |
| `architecture` | Architecture patterns |
| `cloud` | Cloud platforms |

---

## Resume Schema

**Location:** `content/config/resume.yaml`
**Output:** `src/data/resume.json`

### Experience Entry

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier |
| `company` | string | Company name |
| `position` | string | Job title |
| `location` | string | Work location |
| `startDate` | string | Start date (YYYY-MM) |
| `endDate` | string\|null | End date or null if current |
| `current` | boolean | Currently employed |
| `responsibilities` | string[] | List of responsibilities |

### Education Entry

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier |
| `institution` | string | School name |
| `degree` | string | Degree title |
| `location` | string | Location |
| `startDate` | string | Start date (YYYY-MM) |
| `endDate` | string | End date (YYYY-MM) |
| `gpa` | string | Grade point average |
| `details` | string | Additional details |

---

## ContentBlock Schema (Runtime)

The build script converts markdown to structured content blocks:

### Block Types

| Type | Description | Metadata |
|------|-------------|----------|
| `text` | Paragraph text | None |
| `heading` | Section heading | `level: 2|3|4` |
| `code` | Code block | `language: string` |
| `diagram` | Mermaid diagram | `diagramType: 'mermaid'` |
| `image` | Image | `imageUrl`, `imageAlt`, `caption` |
| `callout` | Blockquote callout | `calloutType: 'info'|'warning'|'tip'|'important'` |
| `divider` | Horizontal rule | None |

### TypeScript Interface

```typescript
interface ContentBlock {
  type: 'text' | 'heading' | 'code' | 'diagram' | 'image' | 'callout' | 'divider';
  content: string;
  metadata?: {
    language?: string;
    diagramType?: 'mermaid';
    level?: 2 | 3 | 4;
    calloutType?: 'info' | 'warning' | 'tip' | 'important';
    imageUrl?: string;
    imageAlt?: string;
    caption?: string;
  };
}
```

---

## Migration Notes for 11ty

### Frontmatter Compatibility

11ty natively supports YAML frontmatter. The existing content files can be used directly with minimal changes.

### Data Files

Move YAML configs to 11ty's data cascade:
- `content/config/*.yaml` → `_data/*.json` or `_data/*.yaml`

### Collections

11ty collections replace the JSON output:
```javascript
// .eleventy.js
eleventyConfig.addCollection("posts", collection => {
  return collection.getFilteredByGlob("content/blog/*.md");
});

eleventyConfig.addCollection("projects", collection => {
  return collection.getFilteredByGlob("content/projects/*.md");
});
```

### Markdown Processing

Replace custom ContentBlock processing with 11ty plugins:
- Mermaid: Use `eleventy-plugin-mermaid` or client-side rendering
- Code highlighting: Use `@11ty/eleventy-plugin-syntaxhighlight`
- Callouts: Create custom markdown-it plugin or shortcodes
