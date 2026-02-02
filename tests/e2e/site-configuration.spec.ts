/**
 * Story 5.3: Implement Site Configuration via Data Files (ATDD - RED PHASE)
 *
 * These tests define EXPECTED behavior for site configuration via data files.
 * Tests will FAIL until implementation is complete.
 *
 * Acceptance Criteria:
 * - AC1: Site data file exists with title, description, baseUrl, author
 * - AC2: Site settings reflect in templates (meta tags, header/footer)
 * - AC3: Profile updates cascade to contact page and footer
 * - AC4: Skills updates cascade to resume page
 * - AC5: JSON format uses camelCase field names
 * - AC6: Clear error handling for JSON syntax errors (build-time, not E2E testable)
 *
 * NOTE: AC6 tests JSON parse error handling which occurs at 11ty build time.
 * This cannot be tested via Playwright E2E tests. Verification is done manually
 * by introducing syntax errors in data files and observing build output.
 *
 * TDD Workflow:
 * 1. RED: Run these tests - they will fail (current state)
 * 2. GREEN: Create site.json, update templates to use site.* variables
 * 3. REFACTOR: Improve code quality while keeping tests green
 */

import { test, expect } from '../support/fixtures';

test.describe('Story 5.3: Site Title and Description (AC1, AC2)', () => {
  test('[P0] site title appears in page title', async ({ page }) => {
    // Given: User navigates to homepage
    await page.goto('/');

    // Then: Page title should contain site title from site.json
    await expect(page).toHaveTitle(/Jay Singh/);
  });

  test('[P0] site description appears in meta description', async ({ page }) => {
    // Given: User navigates to homepage
    await page.goto('/');

    // Then: Meta description should contain site description from site.json
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute(
      'content',
      /portfolio|developer|engineer|full-stack/i
    );
  });

  test('[P0] site title consistent across pages', async ({ page }) => {
    // Given: User navigates to blog page
    await page.goto('/blog/');

    // Then: Page title should still reference site title
    await expect(page).toHaveTitle(/Jay Singh/);

    // And: Navigate to contact page
    await page.goto('/contact/');
    await expect(page).toHaveTitle(/Jay Singh/);
  });
});

test.describe('Story 5.3: Base URL in Meta Tags (AC2)', () => {
  test('[P1] canonical URL uses site.baseUrl', async ({ page }) => {
    // Given: User navigates to blog page
    await page.goto('/blog/');

    // Then: Canonical link should use production baseUrl
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /jaysingh\.dev.*\/blog\/?/);
  });

  test('[P1] og:url uses site.baseUrl', async ({ page }) => {
    // Given: User navigates to homepage
    await page.goto('/');

    // Then: Open Graph URL should use production baseUrl
    const ogUrl = page.locator('meta[property="og:url"]');
    await expect(ogUrl).toHaveAttribute('content', /jaysingh\.dev/);
  });

  test('[P1] og:site_name uses site.shortTitle', async ({ page }) => {
    // Given: User navigates to homepage
    await page.goto('/');

    // Then: Open Graph site name should use shortTitle from site.json
    const ogSiteName = page.locator('meta[property="og:site_name"]');
    await expect(ogSiteName).toHaveAttribute('content', /Jay Singh/);
  });

  test('[P2] theme-color meta tag uses site.themeColor', async ({ page }) => {
    // Given: User navigates to homepage
    await page.goto('/');

    // Then: Theme color should be lime-400 (#bef264) from site.json
    const themeColor = page.locator('meta[name="theme-color"]');
    await expect(themeColor).toHaveAttribute('content', /#bef264/i);
  });

  test('[P1] og:image uses site.socialImage', async ({ page }) => {
    // Given: User navigates to homepage
    await page.goto('/');

    // Then: Open Graph image should use socialImage from site.json
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /jaysingh\.dev.*og-default/);
  });
});

test.describe('Story 5.3: Header and Footer Integration (AC2)', () => {
  test('[P1] footer copyright shows site.author', async ({ page }) => {
    // Given: User navigates to homepage
    await page.goto('/');

    // Then: Footer should display copyright with author name from site.json
    const footer = page.locator('footer');
    await expect(footer).toContainText(/Jay Singh/);
    await expect(footer).toContainText(/©|All rights reserved/i);
  });

  test('[P1] header shows site branding', async ({ page }) => {
    // Given: User navigates to homepage
    await page.goto('/');

    // Then: Header should display site shortTitle or logo text
    const header = page.locator('header');
    const logoLink = header.locator('a[href="/"]').first();
    await expect(logoLink).toContainText(/Jay Singh|JS/i);
  });

  test('[P2] footer copyright includes current year', async ({ page }) => {
    // Given: User navigates to homepage
    await page.goto('/');

    // Then: Footer should display current year in copyright
    const currentYear = new Date().getFullYear().toString();
    const footer = page.locator('footer');
    await expect(footer).toContainText(currentYear);
  });
});

test.describe('Story 5.3: Profile Data Cascade (AC3)', () => {
  test('[P1] profile social links appear on contact page', async ({ page }) => {
    // Given: User navigates to contact page
    await page.goto('/contact/');

    // Then: Social links from profile.json should be visible
    // Use .first() since links appear in both content and footer
    await expect(page.locator('a[href*="github.com"]').first()).toBeVisible();
    await expect(page.locator('a[href*="linkedin.com"]').first()).toBeVisible();
  });

  test('[P2] profile social links appear in footer', async ({ page }) => {
    // Given: User navigates to homepage
    await page.goto('/');

    // Then: Footer should contain social links from profile.json
    const footer = page.locator('footer');

    // Check for GitHub link in footer
    const githubLink = footer.locator('a[href*="github.com"]');
    const githubCount = await githubLink.count();

    // Check for LinkedIn link in footer
    const linkedinLink = footer.locator('a[href*="linkedin.com"]');
    const linkedinCount = await linkedinLink.count();

    // At least one social link should be in footer
    expect(githubCount + linkedinCount).toBeGreaterThan(0);
  });

  test('[P1] profile name appears on contact page', async ({ page }) => {
    // Given: User navigates to contact page
    await page.goto('/contact/');

    // Then: Profile name from profile.json should be visible
    // Use .first() since name may appear in multiple places (content + footer)
    await expect(page.getByText(/Jay Singh/).first()).toBeVisible();
  });
});

test.describe('Story 5.3: Skills Data Cascade (AC4)', () => {
  test('[P1] skills categories appear on resume page', async ({ page }) => {
    // Given: User navigates to resume page
    await page.goto('/resume/');

    // Then: Skill categories from skills.json should be visible
    // Check for common category headings
    await expect(page.getByText(/languages/i)).toBeVisible();
    await expect(page.getByText(/backend|frameworks/i)).toBeVisible();
  });

  test('[P2] individual skills appear under categories', async ({ page }) => {
    // Given: User navigates to resume page
    await page.goto('/resume/');

    // Then: Individual skills from skills.json should be visible
    // Check for common skills that should be in the data file
    const skillsSection = page.locator('main');

    // At least some technical skills should be displayed
    const pythonVisible = await skillsSection.getByText(/python/i).count();
    const javascriptVisible = await skillsSection.getByText(/javascript|typescript/i).count();
    const reactVisible = await skillsSection.getByText(/react/i).count();

    // At least one of these common skills should be visible
    expect(pythonVisible + javascriptVisible + reactVisible).toBeGreaterThan(0);
  });
});

test.describe('Story 5.3: Pre-rendered Static HTML (AC1, AC2)', () => {
  test('[P2] page source contains site title (pre-rendered)', async ({ request }) => {
    // Given: We fetch raw HTML source
    const response = await request.get('/');
    const html = await response.text();

    // Then: HTML should contain site title (pre-rendered at build time)
    expect(html).toContain('Jay Singh');

    // And: Should NOT be a SPA placeholder
    expect(html).not.toContain('Loading...');
    expect(html).not.toContain('id="root"');
  });

  test('[P2] page source contains meta description (pre-rendered)', async ({ request }) => {
    // Given: We fetch raw HTML source
    const response = await request.get('/');
    const html = await response.text();

    // Then: HTML should contain meta description tag
    expect(html).toMatch(/meta.*name=["']description["']/);

    // And: Description should have meaningful content
    expect(html).toMatch(/content=["'][^"']{20,}["']/);
  });

  test('[P2] canonical URL in page source uses baseUrl', async ({ request }) => {
    // Given: We fetch raw HTML source of blog page
    const response = await request.get('/blog/');
    const html = await response.text();

    // Then: HTML should contain canonical link with production URL
    expect(html).toMatch(/link.*rel=["']canonical["']/);
    expect(html).toContain('jaysingh.dev');
  });
});

test.describe('Story 5.3: Data File Format Consistency (AC5)', () => {
  test('[P2] site config renders without errors', async ({ page }) => {
    // Given: User navigates to homepage
    await page.goto('/');

    // Then: Page should load without console errors related to data parsing
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    // Reload to capture console messages
    await page.reload();
    await expect(page.locator('main')).toBeVisible();

    // Filter for data-related errors
    const dataErrors = consoleErrors.filter(
      (e) => e.includes('JSON') || e.includes('parse') || e.includes('undefined')
    );
    expect(dataErrors).toHaveLength(0);
  });
});

test.describe('Story 5.3: Mobile Responsive Configuration (AC2)', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('[P2] site title visible in mobile header', async ({ page }) => {
    // Given: User views site on mobile device
    await page.goto('/');

    // Then: Site branding should still be visible in mobile header
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // And: Logo/brand link should be accessible
    const logoLink = header.locator('a[href="/"]').first();
    await expect(logoLink).toBeVisible();
  });

  test('[P2] footer copyright visible on mobile', async ({ page }) => {
    // Given: User views site on mobile device
    await page.goto('/');

    // Then: Footer copyright should be visible
    const footer = page.locator('footer');
    await expect(footer).toContainText(/Jay Singh/);
  });
});
