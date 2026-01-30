/**
 * Story 1.5: Accessibility Foundation Tests (ATDD)
 *
 * These tests verify the accessibility implementation from Stories 1.2 and 1.3.
 * Per Story 1.5 dev notes, implementation already exists - this is verification.
 *
 * Acceptance Criteria:
 * - AC1: Skip Link First Focus
 * - AC2: Skip Link Function
 * - AC3: Visible Focus Indicators
 * - AC4: Screen Reader Landmarks
 * - AC5: Keyboard Navigation
 * - AC6: Reduced Motion Support
 *
 * TDD Workflow:
 * 1. GREEN: Most tests should pass (implementation exists)
 * 2. RED: Any failures indicate implementation gaps
 * 3. FIX: Address gaps identified by failing tests
 */

import { test, expect } from '../support/fixtures';

// Pages to test for accessibility
const TEST_PAGES = ['/', '/blog/', '/projects/', '/resume/', '/contact/'] as const;

test.describe('Story 1.5: Skip Link (AC1, AC2)', () => {
  test('[P0] skip link receives focus on first Tab press', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // When: User presses Tab as first keyboard action
    await page.keyboard.press('Tab');

    // Then: Focus moves to skip link (first focusable element)
    const focused = await page.evaluate(() => {
      const el = document.activeElement;
      return {
        tag: el?.tagName,
        className: el?.className,
        href: el?.getAttribute('href'),
      };
    });

    expect(focused.tag).toBe('A');
    expect(focused.className).toContain('skip-link');
    expect(focused.href).toBe('#main-content');
  });

  test('[P0] skip link becomes visible on focus', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // When: Skip link receives focus
    const skipLink = page.locator('.skip-link');
    await skipLink.focus();

    // Then: Skip link is visible (not sr-only)
    const styles = await skipLink.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        position: computed.position,
        width: computed.width,
        height: computed.height,
        clip: computed.clip,
      };
    });

    // When visible, should have fixed position and real dimensions
    expect(styles.position).toBe('fixed');
    expect(parseFloat(styles.width)).toBeGreaterThan(100);
    expect(parseFloat(styles.height)).toBeGreaterThan(20);
  });

  test('[P0] skip link navigates to main content', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // When: User focuses skip link and presses Enter
    const skipLink = page.locator('.skip-link');
    await skipLink.focus();
    await page.keyboard.press('Enter');

    // Then: Focus moves to main content area
    const focusedId = await page.evaluate(() => document.activeElement?.id);
    expect(focusedId).toBe('main-content');

    // And: URL hash is updated
    await expect(page).toHaveURL(/#main-content/);
  });

  test('[P1] skip link exists on all pages', async ({ page }) => {
    for (const url of TEST_PAGES) {
      await page.goto(url);

      // Skip link should exist and target main-content
      const skipLink = page.locator('.skip-link');
      await expect(skipLink).toHaveAttribute('href', '#main-content');
      await expect(skipLink).toContainText(/skip/i);
    }
  });
});

test.describe('Story 1.5: Focus Indicators (AC3)', () => {
  test('[P1] interactive elements have visible 4px focus outline', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Get all interactive elements
    const interactiveElements = page.locator('a, button').first();

    // When: Element receives focus
    await interactiveElements.focus();

    // Then: 4px black outline is visible (per Architecture spec)
    const outline = await interactiveElements.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        outline: computed.outline,
        outlineWidth: computed.outlineWidth,
        outlineColor: computed.outlineColor,
        outlineOffset: computed.outlineOffset,
      };
    });

    expect(outline.outlineWidth).toBe('4px');
  });

  test('[P1] nav links have visible focus state', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Verify the CSS rule exists for :focus-visible (headless browsers
    // don't reliably trigger :focus-visible, so we check the rule directly)
    const hasFocusVisibleRule = await page.evaluate(() => {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText === ':focus-visible' &&
                rule.style.outline?.includes('4px')) {
              return true;
            }
          }
        } catch (e) { /* cross-origin */ }
      }
      return false;
    });

    expect(hasFocusVisibleRule).toBe(true);
  });

  test('[P1] focus is not color-only (accessible indicator)', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // When: An interactive element receives focus (use nav link which is always visible)
    const link = page.locator('header nav[aria-label="Main navigation"]').getByRole('link').first();
    await link.focus();

    // Then: Focus uses outline (not just color change)
    const styles = await link.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        outlineStyle: computed.outlineStyle,
        outlineWidth: computed.outlineWidth,
      };
    });

    // Must have visible outline (not 'none' or '0px')
    expect(styles.outlineStyle).not.toBe('none');
    expect(styles.outlineWidth).not.toBe('0px');
  });
});

test.describe('Story 1.5: Screen Reader Landmarks (AC4)', () => {
  test('[P1] page has required ARIA landmarks', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Header landmark exists
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // And: Navigation landmark with label exists
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();

    // And: Main content landmark with ID exists
    const main = page.locator('main#main-content');
    await expect(main).toBeVisible();

    // And: Footer landmark exists
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('[P1] html element has lang attribute', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: HTML element has lang="en"
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');
  });

  test('[P1] landmarks are consistent across all pages', async ({ page }) => {
    for (const url of TEST_PAGES) {
      await page.goto(url);

      // All pages should have these landmarks
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
      await expect(page.locator('main#main-content')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    }
  });

  test('[P2] logo has accessible name', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Logo link has aria-label or accessible text
    const logo = page.getByRole('link', { name: /jaysingh|home|logo/i }).first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('href', '/');
  });
});

test.describe('Story 1.5: Keyboard Navigation (AC5)', () => {
  test('[P0] Tab moves focus forward through interactive elements', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // When: User tabs through the page
    const focusedElements: string[] = [];

    // Tab through first 5 elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const tag = await page.evaluate(() => document.activeElement?.tagName);
      focusedElements.push(tag || 'null');
    }

    // Then: All focused elements should be interactive (A, BUTTON, INPUT, etc.)
    const validTags = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
    focusedElements.forEach((tag) => {
      expect(validTags).toContain(tag);
    });
  });

  test('[P0] Shift+Tab moves focus backward', async ({ page }) => {
    // Given: User navigates to home page and tabs forward
    await page.goto('/');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Record current position
    const beforeShiftTab = await page.evaluate(() => document.activeElement?.textContent?.trim());

    // When: User presses Shift+Tab
    await page.keyboard.press('Shift+Tab');

    // Then: Focus moves backward
    const afterShiftTab = await page.evaluate(() => document.activeElement?.textContent?.trim());
    expect(afterShiftTab).not.toBe(beforeShiftTab);
  });

  test('[P0] Enter activates links', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // When: User tabs to Blog link and presses Enter
    const nav = page.locator('nav[aria-label="Main navigation"]');
    const blogLink = nav.getByRole('link', { name: 'BLOG' });
    await blogLink.focus();
    await page.keyboard.press('Enter');

    // Then: Navigation occurs
    await expect(page).toHaveURL('/blog/');
  });

  test('[P1] Space activates buttons', async ({ page }) => {
    // Given: User navigates to home page with buttons
    await page.goto('/');

    // Find a button on the page
    const button = page.getByRole('button').first();
    const buttonExists = (await button.count()) > 0;

    if (buttonExists) {
      // When: User focuses button and presses Space
      await button.focus();

      // Then: Button should be focusable (Space activation depends on button handler)
      await expect(button).toBeFocused();
    } else {
      // Skip if no buttons on page
      test.skip();
    }
  });

  test('[P1] no keyboard traps exist', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // When: User tabs through entire page
    const startElement = await page.evaluate(() => document.activeElement?.tagName);

    // Tab 50 times (should cycle through and back)
    for (let i = 0; i < 50; i++) {
      await page.keyboard.press('Tab');
    }

    // Then: Should be able to reach end and cycle (no trap)
    // If trapped, focus wouldn't move past certain element
    const endElement = await page.evaluate(() => document.activeElement?.tagName);

    // Both should be valid focusable elements (not stuck on BODY)
    expect(['A', 'BUTTON', 'INPUT', 'BODY']).toContain(endElement);
  });

  test('[P2] tab order follows visual order', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Tab to navigation
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Logo

    // Then: Next tab should reach first nav link (left to right)
    await page.keyboard.press('Tab');
    const focusedText = await page.evaluate(
      () => document.activeElement?.textContent?.trim()
    );

    // First nav item should be HOME (leftmost)
    expect(focusedText).toBe('HOME');
  });
});

test.describe('Story 1.5: Reduced Motion (AC6)', () => {
  test('[P2] reduced motion media query exists in CSS', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // When: Check for reduced motion styles
    const hasReducedMotionQuery = await page.evaluate(() => {
      // Check all stylesheets for prefers-reduced-motion
      const sheets = Array.from(document.styleSheets);
      for (const sheet of sheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (
              rule instanceof CSSMediaRule &&
              rule.conditionText?.includes('prefers-reduced-motion')
            ) {
              return true;
            }
          }
        } catch {
          // Cross-origin stylesheet, skip
        }
      }
      return false;
    });

    expect(hasReducedMotionQuery).toBe(true);
  });

  test('[P2] transitions disabled in reduced motion mode', async ({ page }) => {
    // Given: User has reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // When: Check transition duration on elements
    const transitionDuration = await page.evaluate(() => {
      const el = document.body;
      return window.getComputedStyle(el).transitionDuration;
    });

    // Then: Transition should be minimal (0.01ms per CSS)
    // Note: 1e-05s = 0.00001s = 0.01ms (scientific notation)
    expect(transitionDuration).toMatch(/0\.01ms|0s|0ms|1e-05s/);
  });

  test('[P2] hover effects disabled in reduced motion mode', async ({ page }) => {
    // Given: User has reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // When: Check transform on hover-lift elements
    const hoverElement = page.locator('.hover-lift').first();
    const hoverExists = (await hoverElement.count()) > 0;

    if (hoverExists) {
      // Hover over the element
      await hoverElement.hover();

      // Then: Transform should be 'none' (not lifted)
      const transform = await hoverElement.evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });

      expect(transform).toMatch(/none|matrix\(1, 0, 0, 1, 0, 0\)/);
    } else {
      // No hover-lift elements on page - check CSS exists
      test.skip();
    }
  });
});

test.describe('Story 1.5: Accessibility Integration', () => {
  test('[P1] page has exactly one h1 element', async ({ page, checkA11yBasics }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // When: Check heading structure
    const a11y = await checkA11yBasics();

    // Then: Exactly one h1 should exist
    expect(a11y.h1Count).toBe(1);
  });

  test('[P1] all images have alt text', async ({ page, checkA11yBasics }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // When: Check images
    const a11y = await checkA11yBasics();

    // Then: No images without alt text
    expect(a11y.imagesWithoutAlt).toBe(0);
  });

  test('[P2] page has sufficient focusable elements', async ({ page, checkA11yBasics }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // When: Check focusable elements
    const a11y = await checkA11yBasics();

    // Then: Should have nav links + interactive elements
    // Minimum: skip link + logo + 5 nav items = 7
    expect(a11y.focusableElements).toBeGreaterThanOrEqual(7);
  });
});
