/**
 * Story 1.3: Header and Footer Tests (ATDD - RED PHASE)
 *
 * These tests define EXPECTED behavior for header navigation and footer.
 * All tests use test() because implementation doesn't exist yet.
 *
 * Acceptance Criteria:
 * - AC1: Header shows nav links (Home, Blog, Projects, Resume, Contact)
 * - AC2: Clean URL navigation works
 * - AC3: Active page is visually indicated
 * - AC4: Footer shows copyright and social links
 * - AC5: Architecture compliance (code review, not automatable)
 *
 * TDD Workflow:
 * 1. RED: Run these tests - they will fail (current state)
 * 2. GREEN: Implement header.njk and footer.njk, remove test()
 * 3. REFACTOR: Improve code quality while keeping tests green
 */

import { test, expect } from '../support/fixtures';

// Navigation routes per PRD - UPPERCASE to match React Header.tsx
const NAV_ITEMS = [
  { text: 'HOME', url: '/' },
  { text: 'BLOG', url: '/blog/' },
  { text: 'PROJECTS', url: '/projects/' },
  { text: 'RESUME', url: '/resume/' },
  { text: 'CONTACT', url: '/contact/' },
] as const;

test.describe('Story 1.3: Header Navigation (ATDD)', () => {
  test('[P0] header displays all navigation links', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Header should contain navigation with 5 links
    const nav = page.locator('header nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();

    // And: All navigation links should be visible
    for (const item of NAV_ITEMS) {
      await expect(nav.getByRole('link', { name: item.text })).toBeVisible();
    }
  });

  test('[P0] navigation links use clean URLs', async ({ page }) => {
    // Given: User is on home page
    await page.goto('/');

    const nav = page.locator('header nav[aria-label="Main navigation"]');

    // Then: Each link should have correct href (clean URL)
    for (const item of NAV_ITEMS) {
      const link = nav.getByRole('link', { name: item.text });
      await expect(link).toHaveAttribute('href', item.url);
    }
  });

  // Parametrized navigation tests for each route
  for (const item of NAV_ITEMS) {
    test(`[P0] clicking "${item.text}" navigates to ${item.url}`, async ({ page }) => {
      // Given: User is on home page
      await page.goto('/');

      // When: User clicks navigation link
      const nav = page.locator('header nav[aria-label="Main navigation"]');
      await nav.getByRole('link', { name: item.text }).click();

      // Then: URL should be the clean URL for that page
      await expect(page).toHaveURL(item.url);

      // And: Page should load successfully (not 404)
      await expect(page.locator('main')).toBeVisible();
    });
  }
});

test.describe('Story 1.3: Active Page Indication (ATDD)', () => {
  for (const item of NAV_ITEMS) {
    test(`[P1] "${item.text}" link shows active state on ${item.url}`, async ({ page }) => {
      // Given: User is on the specific page
      await page.goto(item.url);

      // Then: The corresponding nav link should have active state
      const nav = page.locator('header nav[aria-label="Main navigation"]');
      const link = nav.getByRole('link', { name: item.text });

      // Active state indicated by is-active class (per Architecture spec)
      await expect(link).toHaveClass(/is-active/);

      // And: Other links should NOT have active state
      for (const other of NAV_ITEMS) {
        if (other.text !== item.text) {
          const otherLink = nav.getByRole('link', { name: other.text });
          await expect(otherLink).not.toHaveClass(/is-active/);
        }
      }
    });
  }

  test('[P1] active state is not color-only (accessible)', async ({ page }) => {
    // Given: User is on blog page
    await page.goto('/blog/');

    // Then: Active link should have visual distinction beyond color
    const nav = page.locator('header nav[aria-label="Main navigation"]');
    const activeLink = nav.getByRole('link', { name: 'Blog' });

    // Check for border or background change (not just color)
    const styles = await activeLink.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        borderWidth: computed.borderWidth,
        backgroundColor: computed.backgroundColor,
        fontWeight: computed.fontWeight,
      };
    });

    // Active state should have visible border or background
    const hasBorder = styles.borderWidth !== '0px';
    const hasBackground = styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
    const isBold = parseInt(styles.fontWeight) >= 700;

    expect(hasBorder || hasBackground || isBold).toBe(true);
  });
});

test.describe('Story 1.3: Footer Content (ATDD)', () => {
  test('[P1] footer displays copyright notice', async ({ page }) => {
    // Given: User is on home page
    await page.goto('/');

    // Then: Footer should contain copyright (matches React Footer.tsx)
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByText(/© 2026/)).toBeVisible();
    await expect(footer.getByText(/JAYSINGH\.DEV/i)).toBeVisible();
  });

  test('[P1] footer displays tagline', async ({ page }) => {
    // Given: User is on home page
    await page.goto('/');

    // Then: Footer should contain tagline (matches React Footer.tsx)
    const footer = page.locator('footer');
    await expect(footer.getByText(/Built with raw HTML energy/i)).toBeVisible();
  });

  test('[P1] footer has dark background', async ({ page }) => {
    // Given: User is on home page
    await page.goto('/');

    // Then: Footer should have black background (matches React Footer.tsx)
    const footer = page.locator('footer');
    const bgColor = await footer.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // bg-black = rgb(0, 0, 0)
    expect(bgColor).toBe('rgb(0, 0, 0)');
  });

  test('[P1] footer is consistent across all pages', async ({ page }) => {
    // Verify footer appears identically on all pages
    for (const item of NAV_ITEMS) {
      await page.goto(item.url);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
      await expect(footer.getByText(/© 2026/)).toBeVisible();
    }
  });
});

test.describe('Story 1.3: Keyboard Navigation (ATDD)', () => {
  test('[P2] header navigation is keyboard accessible', async ({ page }) => {
    // Given: User is on home page
    await page.goto('/');

    // When: User tabs through navigation
    const nav = page.locator('header nav[aria-label="Main navigation"]');
    const firstLink = nav.getByRole('link').first();

    // Focus first nav link
    await firstLink.focus();
    await expect(firstLink).toBeFocused();

    // Tab through all nav links
    for (let i = 1; i < NAV_ITEMS.length; i++) {
      await page.keyboard.press('Tab');
      const focusedText = await page.locator(':focus').textContent();
      expect(focusedText?.trim()).toBe(NAV_ITEMS[i].text);
    }
  });

  test('[P2] focus state is visible on navigation links', async ({ page }) => {
    // Given: User is on home page
    await page.goto('/');

    // When: User focuses a nav link
    const nav = page.locator('header nav[aria-label="Main navigation"]');
    const link = nav.getByRole('link', { name: 'Blog' });
    await link.focus();

    // Then: Focus indicator should be visible (4px black outline per Architecture)
    const outline = await link.evaluate((el) => {
      return window.getComputedStyle(el).outline;
    });

    // Should have visible outline (not 'none' or '0px')
    expect(outline).not.toBe('none');
    expect(outline).not.toMatch(/^0px/);
  });

  test('[P2] navigation links are activated with Enter key', async ({ page }) => {
    // Given: User is on home page
    await page.goto('/');

    // When: User focuses Blog link and presses Enter
    const nav = page.locator('header nav[aria-label="Main navigation"]');
    const blogLink = nav.getByRole('link', { name: 'Blog' });
    await blogLink.focus();
    await page.keyboard.press('Enter');

    // Then: Should navigate to /blog/
    await expect(page).toHaveURL('/blog/');
  });
});

test.describe('Story 1.3: Header Accessibility (ATDD)', () => {
  test('[P2] header has navigation landmark', async ({ page }) => {
    // Given: User is on home page
    await page.goto('/');

    // Then: Navigation should have proper ARIA landmark (desktop + mobile navs both have aria-labels)
    const mainNav = page.locator('header nav[aria-label="Main navigation"]');
    await expect(mainNav).toHaveCount(1);

    // And: Should have descriptive label
    const ariaLabel = await mainNav.getAttribute('aria-label');
    expect(ariaLabel?.toLowerCase()).toContain('main');
  });

  test('[P2] header contains site logo/name linking to home', async ({ page }) => {
    // Given: User is on /blog/ page
    await page.goto('/blog/');

    // Then: Header should have logo/name that links to home
    const header = page.locator('header');
    const homeLink = header.getByRole('link', { name: /Jay Singh|Home|Logo/i }).first();

    await expect(homeLink).toHaveAttribute('href', '/');

    // When: User clicks the logo
    await homeLink.click();

    // Then: Should navigate to home
    await expect(page).toHaveURL('/');
  });
});
