/**
 * Story 4.4: Create Contact Page (ATDD)
 *
 * These tests verify the contact page displays contact methods
 * (Email, GitHub, LinkedIn) with proper functionality and security.
 *
 * Acceptance Criteria:
 * - AC1: Contact page accessible at /contact/
 * - AC2: Email, GitHub, LinkedIn links displayed
 * - AC3: Email link has mailto: href
 * - AC4: GitHub link opens in new tab
 * - AC5: LinkedIn link opens in new tab
 * - AC6: External links have security attributes
 * - AC7: Neubrutalist design styling
 * - AC8: Uses profile.json socialLinks data
 *
 * TDD Workflow:
 * 1. RED: Run these tests - they will fail (current state)
 * 2. GREEN: Implement contact.njk, tests pass
 * 3. REFACTOR: Improve code quality while keeping tests green
 *
 * Data Source: _data/profile.json socialLinks
 */

import { test, expect } from '../support/fixtures';

test.describe('Story 4.4: Contact Page (ATDD)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact/');
  });

  test('[P0] AC1: contact page loads with correct title', async ({ page }) => {
    // Given: User navigates to contact page
    // Then: Page should have appropriate title
    await expect(page).toHaveTitle(/Contact.*Jay Singh|Jay Singh.*Contact/i);
  });

  test('[P0] AC2: all contact methods are visible', async ({ page }) => {
    // Given: User is on contact page
    // Then: Email, GitHub, and LinkedIn links should be visible

    // Email link
    const emailLink = page.getByRole('link', { name: /email/i });
    await expect(emailLink).toBeVisible();

    // GitHub link
    const githubLink = page.getByRole('link', { name: /github/i });
    await expect(githubLink).toBeVisible();

    // LinkedIn link
    const linkedinLink = page.getByRole('link', { name: /linkedin/i });
    await expect(linkedinLink).toBeVisible();
  });

  test('[P0] AC3: email link has mailto href', async ({ page }) => {
    // Given: User is on contact page
    // When: User inspects email link
    // Then: Link should have mailto: href with correct email
    const emailLink = page.getByRole('link', { name: /email/i });
    await expect(emailLink).toHaveAttribute('href', /^mailto:/);
    await expect(emailLink).toHaveAttribute('href', /jay@jaysingh\.dev/);
  });

  test('[P0] AC4: github link opens in new tab with correct URL', async ({ page }) => {
    // Given: User is on contact page
    // When: User inspects GitHub link
    // Then: Link should open in new tab and point to github.com
    const githubLink = page.getByRole('link', { name: /github/i });
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('href', /github\.com/);
  });

  test('[P0] AC5: linkedin link opens in new tab with correct URL', async ({ page }) => {
    // Given: User is on contact page
    // When: User inspects LinkedIn link
    // Then: Link should open in new tab and point to linkedin.com
    const linkedinLink = page.getByRole('link', { name: /linkedin/i });
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    await expect(linkedinLink).toHaveAttribute('href', /linkedin\.com/);
  });

  test('[P1] AC6: external links have security attributes', async ({ page }) => {
    // Given: User is on contact page
    // When: User inspects external links (GitHub, LinkedIn)
    // Then: Links should have rel="noopener noreferrer" for security
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();

    expect(count).toBeGreaterThanOrEqual(2); // GitHub + LinkedIn minimum

    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });

  test('[P2] AC7: contact cards have Neubrutalist styling', async ({
    page,
    verifyNeubrutalistDesign,
  }) => {
    // Given: User is on contact page
    // Then: Contact cards should have Neubrutalist design tokens

    // Verify page-level Neubrutalist design
    const design = await verifyNeubrutalistDesign();
    expect(design.hasNeubrutalistBg).toBe(true);

    // Verify contact cards have border and shadow
    const contactCards = page.locator('.contact-card, [class*="border-4"]');
    const cardCount = await contactCards.count();
    expect(cardCount).toBeGreaterThanOrEqual(3); // Email, GitHub, LinkedIn
  });

  test('[P1] AC8: links use profile.json socialLinks data', async ({ page }) => {
    // Given: User is on contact page
    // Then: Links should match profile.json socialLinks values
    // Expected from _data/profile.json:
    // - email: "mailto:jay@jaysingh.dev"
    // - github: "https://github.com/jaysingh"
    // - linkedin: "https://linkedin.com/in/jaysingh"

    const emailLink = page.getByRole('link', { name: /email/i });
    await expect(emailLink).toHaveAttribute('href', 'mailto:jay@jaysingh.dev');

    const githubLink = page.getByRole('link', { name: /github/i });
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/jaysingh');

    const linkedinLink = page.getByRole('link', { name: /linkedin/i });
    await expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/jaysingh');
  });
});

test.describe('Story 4.4: Contact Page Accessibility (ATDD)', () => {
  test('[P1] single h1 heading on contact page', async ({ page, checkA11yBasics }) => {
    await page.goto('/contact/');

    const a11y = await checkA11yBasics();
    expect(a11y.h1Count).toBe(1);
  });

  test('[P1] contact links are keyboard focusable', async ({ page }) => {
    await page.goto('/contact/');

    // Tab through and verify focus reaches contact links
    const emailLink = page.getByRole('link', { name: /email/i });
    const githubLink = page.getByRole('link', { name: /github/i });
    const linkedinLink = page.getByRole('link', { name: /linkedin/i });

    // Focus each link and verify it's focusable
    await emailLink.focus();
    await expect(emailLink).toBeFocused();

    await githubLink.focus();
    await expect(githubLink).toBeFocused();

    await linkedinLink.focus();
    await expect(linkedinLink).toBeFocused();
  });
});
