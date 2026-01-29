/**
 * Merged fixtures for jaysingh.dev tests
 *
 * Target: 11ty static site (migration from React SPA)
 * PRD Requirements: Lighthouse 100, WCAG 2.1 AA, clean URLs
 *
 * Import { test, expect } from this file in all test specs.
 *
 * @example
 * import { test, expect } from '../../support/fixtures';
 *
 * test('my test', async ({ page }) => {
 *   await page.goto('/blog/');
 * });
 */

import { test as base, expect } from '@playwright/test';

// Custom fixture types
type CustomFixtures = {
  /**
   * Verify page uses Neubrutalist design tokens
   * PRD: Preserved Neubrutalist design system
   */
  verifyNeubrutalistDesign: () => Promise<void>;

  /**
   * Check accessibility basics (heading structure, alt text, focus)
   * PRD: WCAG 2.1 AA, Lighthouse Accessibility 100
   */
  checkA11yBasics: () => Promise<{
    h1Count: number;
    imagesWithoutAlt: number;
    focusableElements: number;
  }>;
};

export const test = base.extend<CustomFixtures>({
  // Neubrutalist design verification fixture
  verifyNeubrutalistDesign: async ({ page }, use) => {
    const verify = async () => {
      // Check for Neubrutalist design tokens (per PRD)
      // - Bold borders (4px solid #000)
      // - Box shadows (brutal-* classes)
      // - Monospace typography
      // - Cream background (#FFFBEB)

      // Verify body background
      const bodyBg = await page.locator('body').evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });

      // Verify monospace font
      const bodyFont = await page.locator('body').evaluate((el) => {
        return window.getComputedStyle(el).fontFamily;
      });

      // Check for brutalist elements (cards, buttons with shadows)
      const hasBoxShadow = await page
        .locator('[class*="shadow"], [class*="brutal"]')
        .first()
        .count();

      return {
        hasNeubrutalistBg: bodyBg.includes('255') || bodyBg.includes('fffbeb'),
        hasMonospace: bodyFont.toLowerCase().includes('mono'),
        hasBrutalShadows: hasBoxShadow > 0,
      };
    };

    await use(verify);
  },

  // Accessibility basics fixture
  checkA11yBasics: async ({ page }, use) => {
    const check = async () => {
      // Count h1 elements (should be exactly 1)
      const h1Count = await page.locator('h1').count();

      // Count images without alt text
      const images = page.locator('img');
      const imgCount = await images.count();
      let imagesWithoutAlt = 0;

      for (let i = 0; i < imgCount; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        if (alt === null) imagesWithoutAlt++;
      }

      // Count focusable elements
      const focusableElements = await page
        .locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
        .count();

      return { h1Count, imagesWithoutAlt, focusableElements };
    };

    await use(check);
  },
});

export { expect };
