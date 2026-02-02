# ATDD Checklist: Story 6.2 - Implement robots.txt

**Generated:** 2026-02-01
**Story Status:** Validation Coverage (feature pre-implemented)
**TDD Phase:** GREEN (tests expected to PASS)

---

## Story Summary

**As a** search engine crawler,
**I want** a robots.txt file indicating crawl permissions,
**So that** I know which pages to index.

**Implementation Status:** ✅ Pre-implemented in Story 6.1 (passthrough copy fixed)

---

## Test Generation Summary

| Category | Count | Status |
|----------|-------|--------|
| Unit Tests (Vitest) | 15 | ✅ Created |
| E2E Tests (Playwright) | 12 | ✅ Created |
| **Total** | **27** | ✅ All passing |

---

## Acceptance Criteria Coverage

### AC1: robots.txt File Exists
| Test | Level | Priority | File |
|------|-------|----------|------|
| should generate robots.txt in build output | Unit | P0 | robots-txt-validation.spec.ts |
| robots.txt should be accessible at /robots.txt | E2E | P0 | robots-txt.spec.ts |
| should have source file in public directory | Unit | P1 | robots-txt-validation.spec.ts |
| should match source file content | Unit | P1 | robots-txt-validation.spec.ts |

### AC2: Allows All Crawlers
| Test | Level | Priority | File |
|------|-------|----------|------|
| should have User-agent directive for all crawlers | Unit | P0 | robots-txt-validation.spec.ts |
| should have Allow directive for all paths | Unit | P0 | robots-txt-validation.spec.ts |
| should have User-agent before Allow (correct order) | Unit | P1 | robots-txt-validation.spec.ts |
| robots.txt should contain User-agent directive | E2E | P0 | robots-txt.spec.ts |
| robots.txt should contain Allow directive | E2E | P0 | robots-txt.spec.ts |

### AC3: Sitemap Reference
| Test | Level | Priority | File |
|------|-------|----------|------|
| should include Sitemap directive | Unit | P0 | robots-txt-validation.spec.ts |
| should reference correct sitemap URL | Unit | P0 | robots-txt-validation.spec.ts |
| should use HTTPS for sitemap URL | Unit | P1 | robots-txt-validation.spec.ts |
| robots.txt should reference sitemap | E2E | P0 | robots-txt.spec.ts |
| sitemap URL in robots.txt should be reachable | E2E | P1 | robots-txt.spec.ts |

### AC4: Source Location
| Test | Level | Priority | File |
|------|-------|----------|------|
| should have source file in public directory | Unit | P1 | robots-txt-validation.spec.ts |
| should match source file content | Unit | P1 | robots-txt-validation.spec.ts |

### AC5: No Unintended Blocks
| Test | Level | Priority | File |
|------|-------|----------|------|
| should not contain Disallow directives | Unit | P0 | robots-txt-validation.spec.ts |
| should not block common paths | Unit | P1 | robots-txt-validation.spec.ts |
| should not contain localhost references | Unit | P2 | robots-txt-validation.spec.ts |
| robots.txt should not contain Disallow directives | E2E | P1 | robots-txt.spec.ts |
| robots.txt should allow access to blog section | E2E | P1 | robots-txt.spec.ts |
| robots.txt should allow access to projects section | E2E | P1 | robots-txt.spec.ts |

---

## Priority Distribution

| Priority | Count | Description |
|----------|-------|-------------|
| P0 | 9 | Critical SEO - must pass |
| P1 | 11 | Important validation |
| P2 | 3 | Nice-to-have checks |

---

## Generated Test Files

```
tests/
├── unit/
│   └── robots-txt-validation.spec.ts    # 15 tests (Vitest)
└── e2e/
    └── robots-txt.spec.ts               # 12 tests (Playwright × 5 browsers = 60)
```

---

## Validation Commands

```bash
# Run unit tests only
npm run test:unit -- robots-txt-validation

# Run E2E tests only (requires dev server)
npm run test:e2e -- robots-txt

# Run all tests
npm test
```

---

## Implementation Notes

### Current robots.txt Content

```
User-agent: *
Allow: /

Sitemap: https://jaysingh.dev/sitemap.xml
```

### Key Files

| File | Purpose |
|------|---------|
| `public/robots.txt` | Source file |
| `_site/robots.txt` | Build output (passthrough copy) |
| `eleventy.config.js` | Passthrough copy configuration |
| `_data/site.json` | Base URL (https://jaysingh.dev) |

### Dependencies

- Story 6.1: Sitemap Generation (completed - fixed passthrough copy)
- sitemap.xml must be accessible for cross-validation tests

---

## Story Completion Checklist

- [x] Unit tests created (`tests/unit/robots-txt-validation.spec.ts`)
- [x] E2E tests created (`tests/e2e/robots-txt.spec.ts`)
- [x] Run unit tests: `npm run test:unit` - 15/15 passed
- [x] Run E2E tests: `npm run test:e2e` - 60/60 passed (5 browsers)
- [x] All tests passing
- [x] Update story status in `sprint-status.yaml`
- [ ] Commit with story reference

---

## References

- [robots.txt Specification](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt)
- [Robots Exclusion Protocol](https://www.robotstxt.org/robotstxt.html)
- Story 6.1: Implementation notes on passthrough copy fix
