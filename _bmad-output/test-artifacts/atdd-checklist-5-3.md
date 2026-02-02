# ATDD Checklist - Story 5.3: Site Configuration via Data Files

**Date:** 2026-02-01
**Author:** Jay
**Primary Test Level:** E2E

---

## Story Summary

**As a** content author (Jay)
**I want** to update site configuration through data files
**So that** I can modify site-wide settings without editing templates

---

## Acceptance Criteria

1. **AC1:** `_data/site.json` exists with title, description, baseUrl, author
2. **AC2:** Site settings reflect in templates (meta tags, header/footer)
3. **AC3:** Profile updates cascade to contact page and footer
4. **AC4:** Skills updates cascade to resume page
5. **AC5:** JSON format uses camelCase field names
6. **AC6:** Clear error handling for JSON syntax errors

---

## Failing Tests Created (RED Phase)

### E2E Tests (18 tests)

**File:** `tests/e2e/site-configuration.spec.ts` (185 lines)

| Priority | Test Name | Verifies | Expected Failure |
|----------|-----------|----------|------------------|
| P0 | site title appears in page title | AC1, AC2 | `site.json` missing |
| P0 | site description appears in meta description | AC1, AC2 | Template hardcodes value |
| P0 | site title consistent across pages | AC2 | Template not using `site.title` |
| P1 | canonical URL uses site.baseUrl | AC2 | Template hardcodes URL |
| P1 | og:url uses site.baseUrl | AC2 | Template hardcodes URL |
| P1 | og:site_name uses site.shortTitle | AC2 | `site.json` missing |
| P2 | theme-color meta tag uses site.themeColor | AC2 | `site.json` missing |
| P1 | footer copyright shows site.author | AC2 | Footer hardcodes author |
| P1 | header shows site branding | AC2 | Header hardcodes text |
| P2 | footer copyright includes current year | AC2 | May already pass |
| P1 | profile social links appear on contact page | AC3 | May already pass (Story 4.4) |
| P2 | profile social links appear in footer | AC3 | May not be implemented |
| P1 | profile name appears on contact page | AC3 | May already pass (Story 4.4) |
| P1 | skills categories appear on resume page | AC4 | May already pass (Story 4.2) |
| P2 | individual skills appear under categories | AC4 | May already pass (Story 4.2) |
| P2 | page source contains site title (pre-rendered) | AC1 | `site.json` missing |
| P2 | page source contains meta description | AC2 | May already pass |
| P2 | canonical URL in page source uses baseUrl | AC2 | Template hardcodes URL |

### API Tests (0 tests)

No API tests needed - this is a static site configuration story.

---

## Data Files to Create

### `_data/site.json` (NEW)

```json
{
  "title": "Jay Singh - Software Engineer",
  "shortTitle": "Jay Singh",
  "description": "Personal portfolio and technical blog of Jay Singh, a full-stack developer specializing in Python/FastAPI, React, and DevOps.",
  "baseUrl": "https://jaysingh.dev",
  "author": "Jay Singh",
  "language": "en",
  "themeColor": "#bef264",
  "socialImage": "/images/og-default.png"
}
```

---

## Templates to Modify

### `_includes/partials/meta.njk`

```njk
<title>{{ metaTitle or site.title }}</title>
<meta name="description" content="{{ metaDescription or site.description }}">
<link rel="canonical" href="{{ site.baseUrl }}{{ page.url }}">
<meta property="og:url" content="{{ site.baseUrl }}{{ page.url }}">
<meta property="og:site_name" content="{{ site.shortTitle }}">
<meta name="theme-color" content="{{ site.themeColor }}">
```

### `_includes/partials/header.njk`

```njk
<a href="/" class="...">{{ site.shortTitle }}</a>
```

### `_includes/partials/footer.njk`

```njk
<p>&copy; {{ currentYear }} {{ site.author }}. All rights reserved.</p>
```

---

## Implementation Checklist

### Task 1: Create `_data/site.json`

- [ ] Create `_data/site.json` with schema from Dev Notes
- [ ] Verify JSON syntax is valid
- [ ] Ensure all fields use camelCase
- [ ] Run test: `npx playwright test site-configuration --grep "site title"`
- [ ] ✅ P0 tests pass

### Task 2: Update Meta Tags Partial

- [ ] Update `_includes/partials/meta.njk` to use `site.*` variables
- [ ] Add canonical URL using `site.baseUrl`
- [ ] Add og:url using `site.baseUrl`
- [ ] Add og:site_name using `site.shortTitle`
- [ ] Add theme-color using `site.themeColor`
- [ ] Run tests: `npx playwright test site-configuration --grep "meta|canonical|og:"`
- [ ] ✅ P1 meta tag tests pass

### Task 3: Update Header/Footer

- [ ] Update header to use `site.shortTitle`
- [ ] Update footer to use `site.author`
- [ ] Verify currentYear filter works
- [ ] Run tests: `npx playwright test site-configuration --grep "header|footer"`
- [ ] ✅ P1 header/footer tests pass

### Task 4: Verify Data Cascade (AC3, AC4)

- [ ] Confirm contact page reads from `profile.socialLinks`
- [ ] Confirm footer social links use `profile.socialLinks`
- [ ] Confirm resume page reads from `skills.json`
- [ ] Run tests: `npx playwright test site-configuration --grep "profile|skills"`
- [ ] ✅ P1/P2 cascade tests pass

### Task 5: Run Full Test Suite

- [ ] Run all site-configuration tests: `npx playwright test site-configuration`
- [ ] All 18 tests pass
- [ ] ✅ Story 5.3 complete

---

## Running Tests

```bash
# Run all Story 5.3 tests
npx playwright test site-configuration

# Run P0 tests only (critical)
npx playwright test site-configuration --grep "\[P0\]"

# Run in headed mode (see browser)
npx playwright test site-configuration --headed

# Run specific test
npx playwright test site-configuration --grep "site title appears"

# Debug mode
npx playwright test site-configuration --debug
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete) ✅

**TEA Agent Responsibilities:**

- ✅ All E2E tests written
- ✅ Tests follow project patterns (Given-When-Then, P0-P2)
- ✅ Resilient selectors used (locator, getByText)
- ✅ Implementation checklist created

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Create `_data/site.json`** with required fields
2. **Update templates** to use `site.*` variables
3. **Run tests** after each change
4. **Check off tasks** in implementation checklist
5. **All tests pass** = GREEN phase complete

### REFACTOR Phase (After All Tests Pass)

- Review template code for DRY violations
- Ensure consistent variable naming
- Update documentation if needed

---

## Notes

- Some tests (AC3, AC4) may already pass from Stories 4.2-4.4
- These serve as regression tests to verify cascade still works
- AC6 (error handling) is build-time behavior - 11ty provides clear JSON parse errors
- Test file follows existing patterns from `blog.spec.ts`

---

## Knowledge Base References Applied

- **test-quality.md** - Given-When-Then structure, deterministic tests
- **selector-resilience.md** - Resilient selectors (locator, getByText)
- **overview.md** - Playwright Utils patterns (not needed for static site)

---

**Generated by BMad TEA Agent** - 2026-02-01
