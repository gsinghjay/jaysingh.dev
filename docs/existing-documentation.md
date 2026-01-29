# Existing Documentation Inventory

**Generated:** 2026-01-29
**Project:** jaysingh.dev

## Documentation Files Found

### Placeholder Directories
| File | Purpose |
|------|---------|
| `public/docs/README.md` | Placeholder for project documentation files |
| `public/diagrams/README.md` | Placeholder for architecture diagram images |

### Content Files (Source of Truth)
| Directory | File Count | Purpose |
|-----------|------------|---------|
| `content/blog/` | 5 files | Technical blog posts in Markdown |
| `content/projects/` | 9 files | Project case studies in Markdown |
| `content/config/` | 3 files | Configuration data in YAML |

## Missing Documentation

The following standard documentation files are not present:
- README.md (project root)
- CONTRIBUTING.md
- ARCHITECTURE.md
- DEPLOYMENT.md
- CHANGELOG.md

## User-Provided Context

### Migration Notes
- **Current Stack:** React 18 + Vite + TailwindCSS
- **Target Stack:** 11ty (Eleventy) + Nunjucks + TailwindCSS
- **Migration Type:** 1:1 feature parity migration

### Deprecated Dependencies (Do Not Document)
- `@supabase/supabase-js` - Referenced in package.json but not actively used; will be removed during migration

### Documentation Focus Areas
Given the migration context, documentation should emphasize:
1. Content structure and frontmatter schema
2. Component patterns (translatable to Nunjucks partials/macros)
3. Build-time content processing logic
4. Design system tokens and CSS patterns
5. Page routing and navigation structure
