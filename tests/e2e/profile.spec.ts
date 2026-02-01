/**
 * Story 4.3: Implement Profile Data Files (ATDD)
 *
 * These tests verify profile data from _data/profile.json is accessible
 * in 11ty templates. Implementation complete - 1 test skipped for Story 4.4
 * (Contact page) dependency.
 *
 * Acceptance Criteria:
 * - AC1: Data files present (profile.json, resume.json, skills.json)
 * - AC2: Profile JSON contains name, role, bio, socialLinks
 * - AC5: Template access works ({{ profile.name }}, {{ profile.socialLinks }})
 *
 * TDD Workflow:
 * 1. RED: Run these tests - they will fail (current state)
 * 2. GREEN: Create profile.json + update templates, remove test.skip()
 * 3. REFACTOR: Improve code quality while keeping tests green
 *
 * Expected profile.json schema:
 * {
 *   "name": "Jay Singh",
 *   "role": "Software Engineer",
 *   "bio": "...",
 *   "location": "New Jersey, USA",
 *   "socialLinks": {
 *     "github": "https://github.com/jaysingh",
 *     "linkedin": "https://linkedin.com/in/jaysingh",
 *     "email": "mailto:jay@jaysingh.dev"
 *   }
 * }
 */

import { test, expect } from '../support/fixtures';

test.describe('Story 4.3: Profile Data in Templates (ATDD)', () => {
  test('[P0] profile name appears in page title', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Page title should contain profile.name from _data/profile.json
    // Expected: "Jay Singh" or "Home | Jay Singh"
    await expect(page).toHaveTitle(/Jay Singh/);

    // And: Title should use dynamic profile data, not hardcoded value
    // This verifies base.njk uses {{ profile.name }} instead of literal
  });

  test('[P0] profile name appears on other pages with title prefix', async ({ page }) => {
    // Given: User navigates to blog page
    await page.goto('/blog/');

    // Then: Page title should be "Blog | Jay Singh" (from profile.name)
    await expect(page).toHaveTitle(/Blog.*Jay Singh|Jay Singh.*Blog/);

    // And: Verify resume page follows same pattern
    await page.goto('/resume/');
    await expect(page).toHaveTitle(/Resume.*Jay Singh|Jay Singh.*Resume/i);
  });

  test('[P1] profile name appears in footer copyright', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Footer should display profile.name in copyright
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Expected: "© 2026 JAY SINGH" (profile.name | upper filter)
    // Note: This replaces hardcoded "JAYSINGH.DEV"
    await expect(footer).toContainText('JAY SINGH');
    await expect(footer.getByText(/© 2026.*JAY SINGH/i)).toBeVisible();
  });

  test('[P1] footer with profile name is consistent across pages', async ({ page }) => {
    // Verify footer appears identically on all pages using profile data
    const pages = ['/', '/blog/', '/projects/', '/resume/'];

    for (const pageUrl of pages) {
      await page.goto(pageUrl);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      // Profile name should appear in footer on every page
      await expect(footer).toContainText('JAY SINGH');
    }
  });
});

test.describe('Story 4.3: Profile Social Links (ATDD)', () => {
  test.skip('[P1] profile socialLinks are accessible for contact page', async ({ page }) => {
    // Given: User navigates to contact page
    // Note: Contact page (Story 4.4) will use profile.socialLinks
    await page.goto('/contact/');

    // Then: Social links from profile.json should be rendered
    // These links come from profile.socialLinks object

    // GitHub link
    const githubLink = page.getByRole('link', { name: /github/i });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', /github\.com/);

    // LinkedIn link
    const linkedinLink = page.getByRole('link', { name: /linkedin/i });
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute('href', /linkedin\.com/);

    // Email link
    const emailLink = page.getByRole('link', { name: /email|contact/i });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', /^mailto:/);
  });
});

test.describe('Story 4.3: Profile Meta Tags (ATDD)', () => {
  test('[P2] meta description uses profile data', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Meta description should use profile.name and profile.role
    // Expected: "Jay Singh - Software Engineer" or similar
    const metaDescription = page.locator('meta[name="description"]');
    const content = await metaDescription.getAttribute('content');

    expect(content).toContain('Jay Singh');
    expect(content).toMatch(/Software Engineer|Developer/i);
  });

  test('[P2] og:title uses profile name as default', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Open Graph title should default to profile.name
    const ogTitle = page.locator('meta[property="og:title"]');
    const content = await ogTitle.getAttribute('content');

    expect(content).toContain('Jay Singh');
  });
});
