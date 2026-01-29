# Test Design: All Epics Summary - jaysingh.dev

**Date:** 2026-01-29
**Author:** Jay
**Status:** Draft
**Project:** React SPA → 11ty Static Site Migration

---

## Executive Summary

**Scope:** Comprehensive test design for 6 epics (29 stories) covering the complete jaysingh.dev migration.

### Risk Summary

| Category | Count | Critical (Score ≥6) |
|----------|-------|---------------------|
| PERF | 5 | 3 |
| A11Y | 4 | 2 |
| TECH | 4 | 1 |
| SEO | 3 | 1 |
| DATA | 2 | 0 |
| **Total** | **18** | **7** |

### Coverage Summary

| Priority | Scenarios | Est. Hours | Run Frequency |
|----------|-----------|------------|---------------|
| P0 | 28 | 56 hrs | Every commit |
| P1 | 35 | 35 hrs | PR to main |
| P2 | 24 | 12 hrs | Nightly |
| P3 | 15 | 4 hrs | On-demand |
| **Total** | **102** | **107 hrs** | ~13 days |

### Key Decision

**Lighthouse 100 is the primary constraint.** Every test strategy prioritizes performance, accessibility, best practices, and SEO validation. The static site architecture means tests should verify pre-rendered HTML, not client-side JavaScript behavior.

---

## Risk Matrix

```
              | Unlikely (1) | Possible (2) | Likely (3)
--------------+--------------+--------------+------------
Critical (3)  |    🟢 3      |    🟠 6      |    🔴 9
Degraded (2)  |    🟢 2      |    🟡 4      |    🟠 6
Minor (1)     |    🟢 1      |    🟢 2      |    🟢 3
```

**Thresholds:** 🟢 DOCUMENT (1-3) | 🟡 MONITOR (4-5) | 🟠 MITIGATE (6-8) | 🔴 BLOCK (9)

---

## Epic-by-Epic Risk Assessment

### Epic 1: Foundation & Site Shell

**Risk Level:** 🟠 HIGH (2 risks ≥6)

| Risk ID | Category | Description | P | I | Score | Mitigation |
|---------|----------|-------------|---|---|-------|------------|
| R1-001 | PERF | TailwindCSS purge fails → bloated CSS → LCP violation | 2 | 3 | 6 | Verify CSS <50KB in CI |
| R1-002 | A11Y | Skip link broken → Lighthouse Accessibility <100 | 2 | 3 | 6 | Test skip link every commit |
| R1-003 | TECH | Mobile nav JS fails gracefully (no-JS fallback) | 2 | 2 | 4 | Test with JS disabled |
| R1-004 | PERF | Neubrutalist shadow-brutal → excessive paint time | 1 | 2 | 2 | Monitor CLS in Lighthouse |

**Critical Path:** Home page loads → Navigation works → Design system applied → Mobile responsive

---

### Epic 2: Blog Experience

**Risk Level:** 🟠 HIGH (2 risks ≥6)

| Risk ID | Category | Description | P | I | Score | Mitigation |
|---------|----------|-------------|---|---|-------|------------|
| R2-001 | PERF | Syntax highlighting adds client JS → TBT violation | 2 | 3 | 6 | Verify build-time highlight only |
| R2-002 | SEO | Blog posts missing meta tags → SEO <100 | 2 | 3 | 6 | Validate OG tags per post |
| R2-003 | TECH | Code copy button fails silently | 2 | 1 | 2 | Test clipboard API |
| R2-004 | DATA | Reading time calculation wrong | 1 | 1 | 1 | Unit test filter |

**Critical Path:** Blog listing loads → Post detail renders → Syntax highlighting works → Social sharing functions

---

### Epic 3: Project Showcase

**Risk Level:** 🟠 HIGH (2 risks ≥6)

| Risk ID | Category | Description | P | I | Score | Mitigation |
|---------|----------|-------------|---|---|-------|------------|
| R3-001 | PERF | Mermaid SVG render fails → broken diagrams | 2 | 3 | 6 | Validate SVG output in build |
| R3-002 | A11Y | Diagrams missing alt text → Accessibility <100 | 2 | 3 | 6 | Test alt attributes |
| R3-003 | TECH | Project filter JS fails (no-JS fallback) | 2 | 2 | 4 | Test with JS disabled |
| R3-004 | DATA | External links open in same tab (security) | 1 | 2 | 2 | Verify target="_blank" rel |

**Critical Path:** Projects listing loads → Project detail renders → Mermaid diagram displays → External links work

---

### Epic 4: Professional Profile

**Risk Level:** 🟡 MEDIUM (0 risks ≥6)

| Risk ID | Category | Description | P | I | Score | Mitigation |
|---------|----------|-------------|---|---|-------|------------|
| R4-001 | DATA | Resume data file malformed → build fails | 2 | 2 | 4 | Validate JSON schema |
| R4-002 | A11Y | Contact links not keyboard accessible | 2 | 2 | 4 | Test tab navigation |
| R4-003 | SEO | Resume page missing structured data | 1 | 2 | 2 | Future enhancement |

**Critical Path:** Resume page loads → Work experience displays → Skills render → Contact links work

---

### Epic 5: Content Authoring Pipeline

**Risk Level:** 🟡 MEDIUM (1 risk ≥6)

| Risk ID | Category | Description | P | I | Score | Mitigation |
|---------|----------|-------------|---|---|-------|------------|
| R5-001 | TECH | Mermaid CLI fails on invalid syntax → build breaks | 3 | 2 | 6 | Validate Mermaid in pre-commit |
| R5-002 | DATA | Frontmatter schema drift → inconsistent rendering | 2 | 2 | 4 | Schema validation in build |
| R5-003 | TECH | Hot reload breaks on CSS changes | 1 | 1 | 1 | Manual verification |

**Critical Path:** Markdown → HTML conversion works → Mermaid → SVG works → Hot reload functional

---

### Epic 6: Production Deployment & SEO

**Risk Level:** 🔴 CRITICAL (1 risk = 9, 1 risk ≥6)

| Risk ID | Category | Description | P | I | Score | Mitigation |
|---------|----------|-------------|---|---|-------|------------|
| R6-001 | PERF | **Lighthouse <100 on any metric** | 3 | 3 | **9** | **BLOCKER** - Full Lighthouse CI |
| R6-002 | SEO | Sitemap missing pages → poor indexing | 2 | 3 | 6 | Validate sitemap completeness |
| R6-003 | TECH | GitHub Actions deploy fails | 2 | 2 | 4 | Test workflow locally |
| R6-004 | SEO | robots.txt blocks crawlers | 1 | 3 | 3 | Verify Allow directives |

**Critical Path:** Build succeeds → Deploy to GH Pages → Lighthouse 100 all categories → Sitemap valid

---

## Test Coverage Plan by Epic

### Epic 1: Foundation & Site Shell (6 Stories)

| Story | Test Level | P0 | P1 | P2 | Risk Links |
|-------|------------|----|----|-----|------------|
| 1.1 Initialize 11ty | Unit/Build | 2 | 2 | 1 | - |
| 1.2 Neubrutalist Design | E2E | 3 | 2 | 2 | R1-001, R1-004 |
| 1.3 Header/Footer | E2E | 2 | 3 | 1 | - |
| 1.4 Mobile Navigation | E2E | 2 | 2 | 2 | R1-003 |
| 1.5 Accessibility | E2E | 4 | 2 | 1 | R1-002 |
| 1.6 Home Page | E2E | 2 | 2 | 1 | - |

**Epic 1 Totals:** P0: 15, P1: 13, P2: 8 | **~36 tests**

---

### Epic 2: Blog Experience (7 Stories)

| Story | Test Level | P0 | P1 | P2 | Risk Links |
|-------|------------|----|----|-----|------------|
| 2.1 Blog Collection | E2E | 2 | 2 | 1 | - |
| 2.2 Blog Detail | E2E | 2 | 3 | 2 | R2-002 |
| 2.3 Syntax Highlighting | E2E/Unit | 3 | 2 | 1 | R2-001 |
| 2.4 Code Copy | E2E | 1 | 2 | 1 | R2-003 |
| 2.5 Reading Time | Unit | 1 | 1 | 1 | R2-004 |
| 2.6 Social Sharing | E2E | 1 | 2 | 2 | - |
| 2.7 Related Projects | E2E | 1 | 2 | 1 | - |

**Epic 2 Totals:** P0: 11, P1: 14, P2: 9 | **~34 tests**

---

### Epic 3: Project Showcase (5 Stories)

| Story | Test Level | P0 | P1 | P2 | Risk Links |
|-------|------------|----|----|-----|------------|
| 3.1 Projects Collection | E2E | 2 | 2 | 1 | - |
| 3.2 Project Detail | E2E | 2 | 2 | 2 | - |
| 3.3 Mermaid Diagrams | E2E/Build | 3 | 2 | 1 | R3-001, R3-002 |
| 3.4 External Links | E2E | 2 | 1 | 1 | R3-004 |
| 3.5 Project Filtering | E2E | 1 | 2 | 2 | R3-003 |

**Epic 3 Totals:** P0: 10, P1: 9, P2: 7 | **~26 tests**

---

### Epic 4: Professional Profile (4 Stories)

| Story | Test Level | P0 | P1 | P2 | Risk Links |
|-------|------------|----|----|-----|------------|
| 4.1 Resume Page | E2E | 2 | 2 | 1 | - |
| 4.2 Education/Skills | E2E | 1 | 2 | 1 | - |
| 4.3 Profile Data Files | Unit | 1 | 2 | 2 | R4-001 |
| 4.4 Contact Page | E2E | 2 | 2 | 1 | R4-002 |

**Epic 4 Totals:** P0: 6, P1: 8, P2: 5 | **~19 tests**

---

### Epic 5: Content Authoring Pipeline (5 Stories)

| Story | Test Level | P0 | P1 | P2 | Risk Links |
|-------|------------|----|----|-----|------------|
| 5.1 Blog Pipeline | Build/Unit | 2 | 2 | 1 | - |
| 5.2 Project Pipeline | Build/Unit | 2 | 2 | 1 | - |
| 5.3 Site Config | Unit | 1 | 2 | 1 | - |
| 5.4 Mermaid Processing | Build | 3 | 2 | 1 | R5-001, R5-002 |
| 5.5 Local Dev Workflow | Manual | 0 | 1 | 2 | R5-003 |

**Epic 5 Totals:** P0: 8, P1: 9, P2: 6 | **~23 tests**

---

### Epic 6: Production Deployment & SEO (5 Stories)

| Story | Test Level | P0 | P1 | P2 | Risk Links |
|-------|------------|----|----|-----|------------|
| 6.1 Sitemap | Build/E2E | 2 | 2 | 1 | R6-002 |
| 6.2 robots.txt | E2E | 1 | 1 | 1 | R6-004 |
| 6.3 Meta Tags/OG | E2E | 3 | 2 | 1 | - |
| 6.4 GitHub Actions | CI | 2 | 2 | 1 | R6-003 |
| 6.5 Lighthouse 100 | E2E/CI | **6** | 2 | 1 | **R6-001** |

**Epic 6 Totals:** P0: 14, P1: 9, P2: 5 | **~28 tests**

---

## Test Execution Strategy

### Smoke Tests (<2 min) - Every Commit

**Purpose:** Fast feedback, catch build-breaking issues

```bash
npx playwright test --grep @smoke
```

| Test | Description | Time |
|------|-------------|------|
| Home page loads | Pre-rendered HTML visible | 10s |
| Navigation present | Header/footer exist | 10s |
| Skip link works | Accessibility foundation | 15s |
| Clean URLs work | No hash fragments | 10s |
| CSS loaded | Neubrutalist styles applied | 15s |

**Total:** ~5 tests, <1 min

---

### P0 Tests (<10 min) - Every Commit (after smoke)

**Purpose:** Critical path validation

```bash
npx playwright test --grep @p0
```

| Category | Test Count | Focus |
|----------|------------|-------|
| Lighthouse CI | 6 | Performance 100, Accessibility 100, BP 100, SEO 100 |
| Core Navigation | 4 | All nav links work, mobile nav |
| Blog Critical | 3 | Listing, detail, syntax highlighting |
| Projects Critical | 3 | Listing, detail, Mermaid SVG |
| Accessibility | 4 | Skip link, landmarks, focus states |
| SEO | 4 | Meta tags, OG, sitemap, robots |

**Total:** ~28 tests, <10 min

---

### P1 Tests (<30 min) - PR to main

**Purpose:** Feature coverage

```bash
npx playwright test --grep "@p0|@p1"
```

| Category | Test Count | Focus |
|----------|------------|-------|
| Blog Features | 8 | Reading time, social share, related projects |
| Project Features | 6 | Filtering, external links |
| Profile Features | 5 | Resume, skills, contact |
| Responsive | 6 | Mobile/tablet breakpoints |
| No-JS Fallback | 4 | Core content without JavaScript |

**Total:** ~35 tests, <30 min

---

### P2/P3 Tests (<60 min) - Nightly/On-demand

**Purpose:** Full regression, edge cases

```bash
npx playwright test
```

| Category | Test Count | Focus |
|----------|------------|-------|
| Edge Cases | 12 | Empty states, long content, special characters |
| Visual Regression | 8 | Design token verification |
| Performance Deep | 4 | CLS, TBT, FCP individual metrics |
| Build Validation | 6 | CSS purge, sitemap completeness |
| Manual/Exploratory | 9 | Hot reload, content preview |

**Total:** ~39 tests, <60 min

---

## Resource Estimates

### Test Development Effort

| Epic | P0 | P1 | P2/P3 | Total Tests | Hours |
|------|----|----|-------|-------------|-------|
| Epic 1 | 15 | 13 | 8 | 36 | 24 |
| Epic 2 | 11 | 14 | 9 | 34 | 20 |
| Epic 3 | 10 | 9 | 7 | 26 | 16 |
| Epic 4 | 6 | 8 | 5 | 19 | 10 |
| Epic 5 | 8 | 9 | 6 | 23 | 12 |
| Epic 6 | 14 | 9 | 5 | 28 | 25 |
| **Total** | **64** | **62** | **40** | **166** | **107** |

### Existing Coverage Credit

- 24 tests already written (Epic 1 partial)
- Estimated reuse: ~20 tests
- **Net new tests needed:** ~146 tests
- **Adjusted effort:** ~95 hours (~12 days)

---

## Quality Gate Criteria

### Release Gate (All Must Pass)

| Gate | Threshold | Enforcement |
|------|-----------|-------------|
| Lighthouse Performance | 100 | CI blocker |
| Lighthouse Accessibility | 100 | CI blocker |
| Lighthouse Best Practices | 100 | CI blocker |
| Lighthouse SEO | 100 | CI blocker |
| P0 Tests | 100% pass | CI blocker |
| P1 Tests | ≥95% pass | Waiver required |
| High-Risk Mitigations | 100% complete | Manual review |

### Non-Negotiable Requirements

- [ ] All P0 tests pass
- [ ] No high-risk (≥6) items unmitigated
- [ ] Lighthouse 100 on mobile AND desktop
- [ ] Sitemap includes all public pages
- [ ] Skip link functional on all pages

---

## Mitigation Plans

### R6-001: Lighthouse <100 (Score: 9) - BLOCKER

**Mitigation Strategy:**
1. Run Lighthouse CI on every PR
2. Fail build if any score <100
3. Monitor Core Web Vitals: FCP <1.0s, LCP <1.5s, TBT <100ms, CLS <0.1
4. CSS budget: <50KB gzipped
5. JS budget: <10KB (only for progressive enhancement)

**Owner:** Dev Team
**Verification:** `npm run lighthouse` in CI

---

### R1-001: TailwindCSS Purge Failure (Score: 6)

**Mitigation Strategy:**
1. Verify `_site/css/styles.css` <50KB after build
2. Add size check to CI
3. Test production build locally before PR

**Owner:** Dev Team
**Verification:** `du -h _site/css/styles.css` in CI

---

### R3-001: Mermaid SVG Render Failure (Score: 6)

**Mitigation Strategy:**
1. Validate Mermaid syntax in pre-commit hook
2. Check `_site/diagrams/*.svg` exist after build
3. Visual test that SVG renders correctly

**Owner:** Dev Team
**Verification:** Build step fails on invalid Mermaid

---

## Recommended Test Execution Order

### Sprint 0 (Foundation)

1. Complete Epic 1 tests (foundation must be solid)
2. Set up Lighthouse CI
3. Establish smoke test baseline

### Sprint 1-2 (Core Content)

1. Epic 2 tests (blog is primary content)
2. Epic 3 tests (projects showcase)
3. Run full P0/P1 suite

### Sprint 3 (Profile & Polish)

1. Epic 4 tests (resume/contact)
2. Epic 5 tests (authoring pipeline)
3. Full regression before release

### Sprint 4 (Production)

1. Epic 6 tests (deployment/SEO)
2. Final Lighthouse validation
3. Release gate check

---

## Follow-on Workflows

After this test design is approved:

1. **`/bmad-tea-testarch-atdd`** - Generate failing P0 tests for current sprint
2. **`/bmad-tea-testarch-automate`** - Expand coverage after implementation
3. **`/bmad-tea-testarch-trace`** - Validate requirements-to-tests mapping
4. **`/bmad-tea-testarch-ci`** - Scaffold CI pipeline with quality gates

---

## Appendix: Risk Category Legend

| Category | Description | Examples |
|----------|-------------|----------|
| **PERF** | Performance degradation | LCP, FCP, TBT, CLS violations |
| **A11Y** | Accessibility failures | Missing alt text, broken skip links |
| **TECH** | Technical/Architecture | Build failures, JS errors |
| **SEO** | Search engine optimization | Missing meta tags, sitemap gaps |
| **DATA** | Data integrity | Schema drift, malformed JSON |
| **OPS** | Operations | Deployment failures, CI issues |

---

**Generated by**: BMad TEA Agent - Test Architect Module
**Workflow**: `_bmad/tea/testarch/test-design`
**Version**: 5.0 (All-Epics Summary)
