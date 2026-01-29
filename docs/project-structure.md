# Project Structure

**Generated:** 2026-01-29
**Project:** jaysingh.dev
**Scan Level:** Exhaustive

## Repository Overview

| Attribute | Value |
|-----------|-------|
| Repository Type | Monolith |
| Project Type | Web Application |
| Primary Language | TypeScript |
| Framework | React 18.3.1 |
| Build Tool | Vite 5.4.2 |
| Styling | TailwindCSS 3.4.1 |

## Project Purpose

Personal portfolio and blog website for Jay Singh, featuring:
- Professional portfolio showcase
- Technical blog with markdown content
- Resume/work history display
- Project case studies with diagrams
- Contact information

## Technology Stack

### Frontend
- React 18.3.1
- TypeScript 5.5.3
- TailwindCSS 3.4.1
- Lucide React (icons)

### Build & Tooling
- Vite 5.4.2
- PostCSS 8.4.35
- Autoprefixer
- ESLint 9.9.1

### Content Processing
- gray-matter 4.0.3 (frontmatter parsing)
- remark 15.0.1 (markdown processing)
- rehype 11.1.2 (HTML processing)
- rehype-highlight 7.0.2 (syntax highlighting)
- js-yaml 4.1.1 (YAML parsing)
- mermaid 11.12.2 (diagram rendering)

### External Services
- Supabase (referenced but not actively used in scanned code)

## Architecture Pattern

**Component-Based SPA with File-Based CMS**

The application follows a single-page application pattern with:
- Hash-based routing (`window.location.hash`)
- Build-time content processing (markdown → JSON)
- Runtime content fetching from static JSON files
- Component-based UI architecture

## Design System

**Neubrutalist/Brutalist Design** characterized by:
- Bold 4px black borders on all elements
- Box shadows for depth (brutal-sm, brutal, brutal-md, brutal-lg)
- Bright accent colors: lime-400, pink-400, yellow-400, blue-400
- Cream background (#FFFBEB)
- Monospace typography (ui-monospace, SF Mono, Menlo)
- Zero border radius on all elements
- Interactive button press effects

## Source Code Statistics

| Category | Count |
|----------|-------|
| Components | 22 |
| Pages | 5 |
| Utility Files | 1 |
| Type Definition Files | 1 |
| Data Files | 4 |
| Build Scripts | 1 |
| Blog Posts | 5 |
| Projects | 9 |
