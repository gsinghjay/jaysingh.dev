# Test Suite - jaysingh.dev

End-to-end test suite for the jaysingh.dev portfolio site using **Playwright**.

## Target

11ty static site (migration from React SPA)

## PRD Alignment

Tests are designed to verify PRD requirements:
- **Lighthouse 100** across all categories
- **WCAG 2.1 AA** accessibility compliance
- **Clean URLs** (no hash routing)
- **Neubrutalist design system** preservation
- **Pre-rendered HTML** (no JavaScript required for core content)

---

## Setup

### Prerequisites

- Node.js 24 LTS (check `.nvmrc`)
- npm 10+

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

### Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Default configuration targets the 11ty dev server at `http://localhost:8080`.

---

## Running Tests

### Local Development

```bash
# Run all tests (starts 11ty dev server automatically)
npm run test:e2e

# Run tests with UI mode (interactive debugging)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test tests/e2e/smoke.spec.ts

# Run tests with specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Debug Mode

```bash
# Run with Playwright Inspector
npx playwright test --debug

# Run with trace recording
npx playwright test --trace on
```

### CI Mode

```bash
# Run in CI (serial execution, retries enabled)
CI=true npm run test:e2e
```

---

## Architecture

```
tests/
├── e2e/                    # E2E test specs
│   ├── smoke.spec.ts       # Core functionality tests
│   └── base-layout.spec.ts # Story 1.2 verification
├── support/
│   ├── fixtures/           # Playwright fixtures
│   │   └── index.ts        # Merged fixtures (import from here)
│   ├── helpers/            # Utility functions
│   │   └── navigation.ts   # Clean URL navigation helpers
│   └── page-objects/       # Page Object Models
│       └── HomePage.ts     # Home page interactions
└── README.md               # This file
```

### Fixtures

Import the merged test object in all specs:

```typescript
import { test, expect } from '../support/fixtures';

test('example', async ({ page, checkA11yBasics }) => {
  await page.goto('/');
  const { h1Count } = await checkA11yBasics();
  expect(h1Count).toBe(1);
});
```

**Available Fixtures:**
- `verifyNeubrutalistDesign()` - Check design token compliance
- `checkA11yBasics()` - Basic accessibility checks

### Page Objects

Use for complex pages with many interactions:

```typescript
import { HomePage } from '../support/page-objects/HomePage';

test('navigation works', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.expectLayoutComplete();
});
```

---

## Best Practices

### Selectors

Prefer in order:
1. `data-testid` attributes (most resilient)
2. Semantic roles: `getByRole('button', { name: 'Submit' })`
3. Text content: `getByText('Welcome')`
4. CSS selectors (last resort)

```typescript
// Good
await page.getByTestId('submit-button').click();
await page.getByRole('link', { name: 'Blog' }).click();

// Avoid
await page.click('.btn.btn-primary.submit');
```

### Test Isolation

Each test should:
- Start from a known state
- Not depend on other tests
- Clean up after itself (if needed)

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});
```

### Clean URLs

11ty uses clean URLs (no hash routing):

```typescript
// Correct (11ty)
await page.goto('/blog/');
await expect(page).toHaveURL(/\/blog\//);

// Wrong (React SPA)
await page.goto('/#blog');
```

### PRD Requirement Traceability

Reference PRD requirements in test comments:

```typescript
test('skip link is present', async ({ page }) => {
  // FR5: Visitors can skip to main content using a skip link
  // NFR14: Skip links
  await expect(page.locator('.skip-link')).toBeVisible();
});
```

---

## CI Integration

### GitHub Actions

Tests run automatically on push/PR. Artifacts uploaded on failure:

- `test-results/` - Screenshots, videos, traces
- `playwright-report/` - HTML report

### Viewing Reports

```bash
# Open HTML report after test run
npx playwright show-report
```

---

## Test Coverage by Epic

| Epic | Coverage Status |
|------|-----------------|
| Epic 1: Foundation | ✅ smoke.spec.ts, base-layout.spec.ts |
| Epic 2: Blog | 🔲 Pending (blog.spec.ts) |
| Epic 3: Projects | 🔲 Pending (projects.spec.ts) |
| Epic 4: Professional Profile | 🔲 Pending (resume.spec.ts) |
| Epic 5: Content Pipeline | 🔲 Pending (content.spec.ts) |
| Epic 6: Deployment & SEO | 🔲 Pending (lighthouse.spec.ts) |

---

## Troubleshooting

### 11ty server not starting

```bash
# Check if port 8080 is in use
lsof -i :8080

# Start manually first
npm run dev:11ty
```

### Tests timing out

Increase timeout in `playwright.config.ts`:

```typescript
timeout: 120_000, // 2 minutes
```

### Browser installation issues

```bash
# Reinstall browsers
npx playwright install --with-deps
```

---

## Knowledge Base

This test suite follows patterns from the TEA (Test Engineering Architecture) knowledge base:

- `fixture-architecture.md` - Composable fixture patterns
- `playwright-config.md` - Configuration guardrails
- `data-factories.md` - Factory patterns (for future API testing)
- `test-quality.md` - Definition of Done criteria

---

## Related Commands

```bash
npm run dev:11ty       # Start 11ty dev server
npm run build          # Build production site
npm run test:e2e       # Run E2E tests
npm run test:e2e:ui    # Run with Playwright UI
npm run test:e2e:headed # Run in headed mode
```
