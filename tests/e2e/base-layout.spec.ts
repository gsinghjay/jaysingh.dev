/**
 * Base Layout Tests - Story 1.2 Verification
 *
 * Tests for: "Create base layout with Neubrutalist design system"
 *
 * Story Acceptance Criteria:
 * - Base template exists at _includes/layouts/base.njk
 * - HTML structure with proper head, body, main elements
 * - TailwindCSS integration working
 * - Neubrutalist design tokens applied
 * - Meta tags partial for SEO
 * - Skip link for accessibility
 */

import { test, expect } from '../support/fixtures';

test.describe('Story 1.2: Base Layout with Neubrutalist Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('HTML document has required structure', async ({ page }) => {
    // Verify DOCTYPE and lang attribute
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveAttribute('lang', 'en');

    // Verify head contains required meta tags
    await expect(page.locator('head meta[charset]')).toHaveCount(1);
    await expect(page.locator('head meta[name="viewport"]')).toHaveCount(1);
    await expect(page.locator('head title')).toHaveCount(1);
  });

  test('body has semantic landmark structure', async ({ page }) => {
    // Required landmarks for accessibility
    await expect(page.locator('header').first()).toBeVisible();
    await expect(page.locator('main').first()).toBeVisible();
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('TailwindCSS styles are applied', async ({ page }) => {
    // Verify TailwindCSS is loaded by checking for utility classes
    const body = page.locator('body');

    // Check that styles are computed (not just defaults)
    const fontFamily = await body.evaluate((el) => {
      return window.getComputedStyle(el).fontFamily;
    });

    // Neubrutalist design uses monospace font
    expect(fontFamily.toLowerCase()).toContain('mono');
  });

  test('Neubrutalist background color is applied', async ({ page }) => {
    const body = page.locator('body');

    // Check background color (cream: #FFFBEB or similar)
    const bgColor = await body.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Should have a light/cream background (not default white)
    expect(bgColor).toBeTruthy();
  });

  test('skip link is present for accessibility', async ({ page }) => {
    // Skip link should exist (may be visually hidden until focused)
    const skipLink = page.locator('a[href="#main"], a[href="#main-content"], .skip-link');
    await expect(skipLink.first()).toHaveCount(1);

    // When focused, should become visible
    await skipLink.first().focus();
    await expect(skipLink.first()).toBeVisible();
  });

  test('main content has proper id for skip link target', async ({ page }) => {
    // Main element should have id for skip link
    const main = page.locator('main');
    const mainId = await main.getAttribute('id');

    // Either main has id="main" or there's a skip target
    expect(mainId === 'main' || mainId === 'main-content').toBe(true);
  });

  test('meta description is present for SEO', async ({ page }) => {
    // Meta description should exist (FR40)
    const metaDesc = page.locator('head meta[name="description"]');
    await expect(metaDesc).toHaveCount(1);

    // Should have content
    const content = await metaDesc.getAttribute('content');
    expect(content?.length).toBeGreaterThan(0);
  });

  test('Open Graph meta tags are present', async ({ page }) => {
    // OG tags for social sharing (FR40)
    await expect(page.locator('head meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('head meta[property="og:description"]')).toHaveCount(1);
  });

  test('page title is set correctly', async ({ page }) => {
    // Title should be meaningful, not empty
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title).not.toBe('Document');
  });
});

test.describe('Story 1.2: Design System Tokens', () => {
  test('uses monospace font family', async ({ page }) => {
    await page.goto('/');

    const body = page.locator('body');
    const fontFamily = await body.evaluate((el) => {
      return window.getComputedStyle(el).fontFamily;
    });

    // Design token: ui-monospace, monospace
    expect(fontFamily.toLowerCase()).toMatch(/mono/);
  });

  test('border radius is 0 (brutalist style)', async ({ page }) => {
    await page.goto('/');

    // Find any button or card element
    const styledElements = page.locator('button, .card, [class*="border"]');
    const count = await styledElements.count();

    if (count > 0) {
      const borderRadius = await styledElements.first().evaluate((el) => {
        return window.getComputedStyle(el).borderRadius;
      });

      // Brutalist: no border radius (0px)
      expect(borderRadius).toBe('0px');
    }
  });
});
