/**
 * Story 1.4: Mobile Responsive Navigation (ATDD)
 *
 * E2E tests for mobile navigation menu functionality.
 *
 * Acceptance Criteria:
 * - AC1: Hamburger button visible on mobile (< 768px)
 * - AC2: Menu opens on tap with all nav links visible
 * - AC3: Menu closes via X button tap
 * - AC4: Auto-close on navigation link click
 * - AC5: JS pattern compliance (data-* attributes) - code review
 * - AC6: Responsive breakpoint transition
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

// Mobile viewport (iPhone SE width)
const MOBILE_VIEWPORT = { width: 375, height: 667 };

// Desktop viewport (above md breakpoint)
const DESKTOP_VIEWPORT = { width: 1024, height: 768 };

test.describe('Story 1.4: Mobile Navigation - Core Functionality (ATDD)', () => {
  test('[P0] hamburger button visible on mobile viewport', async ({ page }) => {
    // Given: User is viewing on mobile viewport (< 768px)
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');

    // Then: Hamburger button should be visible
    const menuButton = page.locator('[data-mobile-menu-toggle]');
    await expect(menuButton).toBeVisible();

    // And: Desktop nav should be hidden
    const desktopNav = page.locator('nav[aria-label="Main navigation"] ul');
    await expect(desktopNav).toBeHidden();
  });

  test('[P0] menu opens when hamburger button is tapped', async ({ page }) => {
    // Given: User is on mobile viewport with menu closed
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');

    const menuButton = page.locator('[data-mobile-menu-toggle]');
    const mobileMenu = page.locator('[data-mobile-menu]');

    // When: User taps the hamburger button
    await menuButton.click();

    // Then: Mobile menu should be visible
    await expect(mobileMenu).toBeVisible();

    // And: Menu icon should be hidden, close icon should be visible
    const menuIcon = page.locator('[data-icon="menu"]');
    const closeIcon = page.locator('[data-icon="close"]');
    await expect(menuIcon).toBeHidden();
    await expect(closeIcon).toBeVisible();
  });

  test('[P0] menu closes when X button is tapped', async ({ page }) => {
    // Given: User is on mobile with menu open
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');

    const menuButton = page.locator('[data-mobile-menu-toggle]');
    const mobileMenu = page.locator('[data-mobile-menu]');

    // Open the menu first
    await menuButton.click();
    await expect(mobileMenu).toBeVisible();

    // When: User taps the close button (same button, now shows X)
    await menuButton.click();

    // Then: Mobile menu should be hidden
    await expect(mobileMenu).toBeHidden();

    // And: Menu icon should be visible, close icon should be hidden
    const menuIcon = page.locator('[data-icon="menu"]');
    const closeIcon = page.locator('[data-icon="close"]');
    await expect(menuIcon).toBeVisible();
    await expect(closeIcon).toBeHidden();
  });

  test('[P0] menu closes automatically when nav link is clicked', async ({ page }) => {
    // Given: User is on mobile with menu open
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');

    const menuButton = page.locator('[data-mobile-menu-toggle]');
    const mobileMenu = page.locator('[data-mobile-menu]');

    await menuButton.click();
    await expect(mobileMenu).toBeVisible();

    // When: User clicks a navigation link in mobile menu
    const blogLink = mobileMenu.getByRole('link', { name: 'BLOG' });
    await blogLink.click();

    // Then: Should navigate to the page
    await expect(page).toHaveURL('/blog/');

    // And: Menu should be closed
    await expect(mobileMenu).toBeHidden();
  });
});

test.describe('Story 1.4: Mobile Navigation - Menu Content (ATDD)', () => {
  test('[P1] all navigation links visible in mobile menu', async ({ page }) => {
    // Given: User is on mobile with menu open
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');

    const menuButton = page.locator('[data-mobile-menu-toggle]');
    const mobileMenu = page.locator('[data-mobile-menu]');

    await menuButton.click();
    await expect(mobileMenu).toBeVisible();

    // Then: All 5 nav links should be visible
    for (const item of NAV_ITEMS) {
      await expect(mobileMenu.getByRole('link', { name: item.text })).toBeVisible();
    }
  });

  test('[P1] mobile nav links have correct URLs', async ({ page }) => {
    // Given: User is on mobile with menu open
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');

    const menuButton = page.locator('[data-mobile-menu-toggle]');
    const mobileMenu = page.locator('[data-mobile-menu]');

    await menuButton.click();

    // Then: Each link should have correct href
    for (const item of NAV_ITEMS) {
      const link = mobileMenu.getByRole('link', { name: item.text });
      await expect(link).toHaveAttribute('href', item.url);
    }
  });

  test('[P1] icon toggles correctly between menu and close states', async ({ page }) => {
    // Given: User is on mobile viewport
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');

    const menuButton = page.locator('[data-mobile-menu-toggle]');
    const menuIcon = page.locator('[data-icon="menu"]');
    const closeIcon = page.locator('[data-icon="close"]');

    // Initial state: menu icon visible, close icon hidden
    await expect(menuIcon).toBeVisible();
    await expect(closeIcon).toBeHidden();

    // When: Open menu
    await menuButton.click();

    // Then: Icons should toggle
    await expect(menuIcon).toBeHidden();
    await expect(closeIcon).toBeVisible();

    // When: Close menu
    await menuButton.click();

    // Then: Icons should toggle back
    await expect(menuIcon).toBeVisible();
    await expect(closeIcon).toBeHidden();
  });

  test('[P1] active page indicated in mobile menu', async ({ page }) => {
    // Given: User is on /blog/ page
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/blog/');

    const menuButton = page.locator('[data-mobile-menu-toggle]');
    const mobileMenu = page.locator('[data-mobile-menu]');

    await menuButton.click();

    // Then: Blog link should have active state
    const blogLink = mobileMenu.getByRole('link', { name: 'BLOG' });
    await expect(blogLink).toHaveClass(/is-active/);

    // And: Other links should NOT have active state
    const homeLink = mobileMenu.getByRole('link', { name: 'HOME' });
    await expect(homeLink).not.toHaveClass(/is-active/);
  });
});

test.describe('Story 1.4: Mobile Navigation - Responsive Behavior (ATDD)', () => {
  test('[P1] hamburger hidden and desktop nav visible on desktop', async ({ page }) => {
    // Given: User is viewing on desktop viewport (>= 768px)
    await page.setViewportSize(DESKTOP_VIEWPORT);
    await page.goto('/');

    // Then: Hamburger button should be hidden
    const menuButton = page.locator('[data-mobile-menu-toggle]');
    await expect(menuButton).toBeHidden();

    // And: Desktop nav should be visible
    const desktopNav = page.locator('header nav[aria-label="Main navigation"]');
    await expect(desktopNav).toBeVisible();
  });

  test('[P1] menu closes when viewport resized to desktop', async ({ page }) => {
    // Given: User is on mobile with menu open
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');

    const menuButton = page.locator('[data-mobile-menu-toggle]');
    const mobileMenu = page.locator('[data-mobile-menu]');

    await menuButton.click();
    await expect(mobileMenu).toBeVisible();

    // When: Viewport is resized to desktop
    await page.setViewportSize(DESKTOP_VIEWPORT);

    // Then: Mobile menu should be hidden (auto-closed on resize)
    await expect(mobileMenu).toBeHidden();

    // And: Hamburger button should be hidden
    await expect(menuButton).toBeHidden();
  });

  test('[P1] hamburger appears when viewport resized to mobile', async ({ page }) => {
    // Given: User is viewing on desktop
    await page.setViewportSize(DESKTOP_VIEWPORT);
    await page.goto('/');

    const menuButton = page.locator('[data-mobile-menu-toggle]');
    await expect(menuButton).toBeHidden();

    // When: Viewport is resized to mobile
    await page.setViewportSize(MOBILE_VIEWPORT);

    // Then: Hamburger button should appear
    await expect(menuButton).toBeVisible();
  });
});

test.describe('Story 1.4: Mobile Navigation - Accessibility (ATDD)', () => {
  test('[P2] hamburger button has correct ARIA attributes', async ({ page }) => {
    // Given: User is on mobile viewport
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');

    const menuButton = page.locator('[data-mobile-menu-toggle]');

    // Then: Button should have aria-label
    await expect(menuButton).toHaveAttribute('aria-label', 'Open menu');

    // And: aria-expanded should be false initially
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // When: Menu is opened
    await menuButton.click();

    // Then: aria-expanded should update to true
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // And: aria-label should update
    await expect(menuButton).toHaveAttribute('aria-label', 'Close menu');
  });

  test('[P2] Escape key closes mobile menu', async ({ page }) => {
    // Given: User is on mobile with menu open
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');

    const menuButton = page.locator('[data-mobile-menu-toggle]');
    const mobileMenu = page.locator('[data-mobile-menu]');

    await menuButton.click();
    await expect(mobileMenu).toBeVisible();

    // When: User presses Escape key
    await page.keyboard.press('Escape');

    // Then: Menu should close
    await expect(mobileMenu).toBeHidden();

    // And: Focus should return to hamburger button
    await expect(menuButton).toBeFocused();
  });

  test('[P2] Enter/Space activates hamburger button', async ({ page }) => {
    // Given: User is on mobile viewport
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');

    const menuButton = page.locator('[data-mobile-menu-toggle]');
    const mobileMenu = page.locator('[data-mobile-menu]');

    // Focus the hamburger button
    await menuButton.focus();

    // When: User presses Enter
    await page.keyboard.press('Enter');

    // Then: Menu should open
    await expect(mobileMenu).toBeVisible();

    // Refocus button (focus moved to first link when menu opened)
    await menuButton.focus();

    // When: User presses Space (to close)
    await page.keyboard.press('Space');

    // Then: Menu should close
    await expect(mobileMenu).toBeHidden();
  });

  test('[P2] first nav link receives focus when menu opens', async ({ page }) => {
    // Given: User is on mobile viewport
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');

    const menuButton = page.locator('[data-mobile-menu-toggle]');
    const mobileMenu = page.locator('[data-mobile-menu]');

    // When: User opens the menu
    await menuButton.click();
    await expect(mobileMenu).toBeVisible();

    // Then: First nav link should receive focus
    const firstLink = mobileMenu.getByRole('link').first();
    await expect(firstLink).toBeFocused();
  });

  test('[P2] mobile menu has navigation landmark', async ({ page }) => {
    // Given: User is on mobile with menu open
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto('/');

    const menuButton = page.locator('[data-mobile-menu-toggle]');
    await menuButton.click();

    // Then: Mobile menu should have navigation role and label
    const mobileNav = page.locator('[data-mobile-menu][aria-label="Mobile navigation"], nav[data-mobile-menu]');
    await expect(mobileNav).toBeVisible();
  });
});
