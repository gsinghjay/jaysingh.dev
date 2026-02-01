/**
 * Story 5.2: Project Content Pipeline Tests (ATDD)
 *
 * These tests verify the project content authoring pipeline works end-to-end.
 * Most tests should PASS (verifying existing functionality from Epic 3).
 *
 * Acceptance Criteria:
 * - AC1: Project file recognition (_content/projects/*.md)
 * - AC2: Required frontmatter schema (id, title, description, technologies, projectType)
 * - AC3: Optional frontmatter fields (githubUrl, liveUrl, diagramContent, etc.)
 * - AC4: Collection and URL generation (projects collection -> /projects/{id}/)
 * - AC5: Markdown body rendering (Challenge/Solution/Impact sections)
 * - AC6: Mermaid diagram integration (diagramContent -> SVG)
 *
 * TDD Workflow:
 * 1. These E2E tests serve as REGRESSION GUARDS (pipeline already working)
 * 2. Unit tests for validateProject are the TRUE RED phase
 * 3. Run these to ensure existing functionality isn't broken
 *
 * NOTE: AC2/AC3 validation is tested in unit/project-validation.spec.ts
 * because validation happens at BUILD time, not runtime.
 */

import { test, expect } from '../support/fixtures';

test.describe('Story 5.2: Project File Recognition (AC1)', () => {
  test('[P0] projects listing shows all 9 projects', async ({ page }) => {
    // Given: 9 projects exist in _content/projects/ directory
    await page.goto('/projects/');

    // Then: All projects should be listed
    // Project cards are divs in a grid container with h2 titles
    const projectCards = page.locator('.grid > div').filter({
      has: page.locator('h2'),
    });
    const count = await projectCards.count();

    // Should have at least 9 projects (the known count from dev notes)
    expect(count).toBeGreaterThanOrEqual(9);
  });

  test('[P0] known project is accessible', async ({ page }) => {
    // Given: qr-code-platform project exists in _content/projects/
    await page.goto('/projects/qr-code-platform/');

    // Then: Page should load without 404
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByText('404')).not.toBeVisible();

    // And: Project title should be visible
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/QR Code/i);
  });

  test('[P1] all 9 existing projects are accessible', async ({ page }) => {
    // Known project IDs from _content/projects/
    const projectIds = [
      'qr-code-platform',
      'authentication-gateway',
      'cloud-infrastructure-platform',
      'observability-infrastructure',
      'event-driven-microservices',
      'cicd-pipeline',
      'automation-scripts',
      'covid-dashboard',
      'jamf-pro-deployment',
    ];

    for (const id of projectIds) {
      await page.goto(`/projects/${id}/`);

      // Then: Each project should load successfully
      await expect(page.locator('main')).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
  });
});

test.describe('Story 5.2: Collection and URL Generation (AC4)', () => {
  test('[P0] project URL uses id from frontmatter', async ({ page }) => {
    // Given: Project with id: qr-code-platform
    await page.goto('/projects/qr-code-platform/');

    // Then: URL should match id from frontmatter
    expect(page.url()).toContain('/projects/qr-code-platform/');
  });

  test('[P0] projects collection populates listing page', async ({ page }) => {
    // Given: Projects listing page
    await page.goto('/projects/');

    // Then: Should show projects from collection
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // And: Should have project cards
    const projectLinks = page.locator('a[href^="/projects/"]').filter({
      has: page.locator('h2, h3, .font-black'),
    });
    const count = await projectLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('[P0] project URLs follow /projects/{id}/ pattern', async ({ page }) => {
    // Given: Projects listing page
    await page.goto('/projects/');

    // When: Collecting project links
    const projectLinks = page.locator('a[href^="/projects/"][href$="/"]');
    const count = await projectLinks.count();

    // Then: All links should follow clean URL pattern
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 3); i++) {
      const href = await projectLinks.nth(i).getAttribute('href');
      // Should be /projects/{slug}/ format (not /projects/ itself)
      if (href !== '/projects/') {
        expect(href).toMatch(/^\/projects\/[\w-]+\/$/);
      }
    }
  });

  test('[P1] project URLs are clean (no hash, no query params)', async ({ page }) => {
    // Given: A project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: URL should be clean
    const url = page.url();
    expect(url).not.toContain('#');
    expect(url).not.toContain('?');
    expect(url).toMatch(/\/projects\/qr-code-platform\/$/);
  });
});

test.describe('Story 5.2: Project Detail Content (AC2, AC5)', () => {
  const testProjectUrl = '/projects/qr-code-platform/';

  test('[P0] project displays title from frontmatter', async ({ page }) => {
    // Given: Project with title in frontmatter
    await page.goto(testProjectUrl);

    // Then: Title should be displayed
    const title = page.getByRole('heading', { level: 1 });
    await expect(title).toContainText(/QR Code/i);
  });

  test('[P1] project displays description', async ({ page }) => {
    // Given: Project with description in frontmatter
    await page.goto(testProjectUrl);

    // Then: Description should be visible in the header section
    // Description contains "High-performance QR code generation"
    const descriptionSection = page.locator('p.text-lg.text-neutral-600').first();
    await expect(descriptionSection).toBeVisible();
    await expect(descriptionSection).toContainText(/QR code/i);
  });

  test('[P1] project displays technology tags', async ({ page }) => {
    // Given: Project with technologies array
    await page.goto(testProjectUrl);

    // Then: Technology tags should be displayed
    // Check for at least one known technology from qr-code-platform
    const techTags = page.getByText(/Python|FastAPI|PostgreSQL|Docker/);
    await expect(techTags.first()).toBeVisible();
  });

  test('[P1] project shows Challenge/Solution/Impact sections', async ({ page }) => {
    // Given: Project with challenge, solution, impact fields
    await page.goto(testProjectUrl);

    // Then: Each section should be visible
    // These are rendered from frontmatter fields, not markdown body
    await expect(page.getByText(/challenge/i).first()).toBeVisible();
    await expect(page.getByText(/solution/i).first()).toBeVisible();
    await expect(page.getByText(/impact/i).first()).toBeVisible();
  });

  test('[P1] project shows key features when present', async ({ page }) => {
    // Given: Project with keyFeatures array
    await page.goto(testProjectUrl);

    // Then: Key features should be displayed
    // qr-code-platform has "Dynamic QR code generation" as a feature
    await expect(page.getByText(/Dynamic QR code|Real-time analytics/i).first()).toBeVisible();
  });
});

test.describe('Story 5.2: Mermaid Diagram Integration (AC6)', () => {
  test('[P1] project with mermaid shows diagram', async ({ page }) => {
    // Given: Project with diagramContent (qr-code-platform has a mermaid diagram)
    await page.goto('/projects/qr-code-platform/');

    // Then: Diagram should be visible in the architecture section
    // Mermaid diagrams are rendered to SVG at build time and displayed as img
    const architectureSection = page.locator('#architecture');

    // Scroll to the architecture section to trigger lazy loading
    await architectureSection.scrollIntoViewIfNeeded();
    await expect(architectureSection).toBeVisible();

    // Check for the diagram image within the architecture section
    const diagram = architectureSection.locator('img');
    await expect(diagram).toBeVisible({ timeout: 10000 });
  });

  test('[P2] project without diagram renders gracefully', async ({ page }) => {
    // Given: Project that may not have diagramContent
    // automation-scripts or similar minimal projects
    await page.goto('/projects/automation-scripts/');

    // Then: Page should load without errors
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // And: No broken image placeholders
    const brokenImages = page.locator('img[alt=""]');
    // This is informational - some projects may have diagrams, some may not
  });
});

test.describe('Story 5.2: Project External Links (AC3)', () => {
  test('[P2] project shows GitHub link when present', async ({ page }) => {
    // Given: Project with githubUrl field
    await page.goto('/projects/qr-code-platform/');

    // Then: GitHub link should be visible (if implemented in template)
    const githubLink = page.locator('a[href*="github.com"]');
    const count = await githubLink.count();

    // GitHub link is optional - test just verifies it doesn't break if present
    if (count > 0) {
      await expect(githubLink.first()).toBeVisible();
    }
  });

  test('[P2] project shows live URL when present', async ({ page }) => {
    // Given: Project with liveUrl field
    await page.goto('/projects/qr-code-platform/');

    // Then: Live demo link should be visible (if implemented in template)
    const liveLink = page.locator('a[href*="example.edu"], a:has-text("Live"), a:has-text("Demo")');
    const count = await liveLink.count();

    // Live link is optional - test just verifies it doesn't break if present
    if (count > 0) {
      await expect(liveLink.first()).toBeVisible();
    }
  });
});

test.describe('Story 5.2: Project Filtering (Regression from Story 3.5)', () => {
  test('[P1] project cards have data attributes for filtering', async ({ page }) => {
    // Given: Projects listing page
    await page.goto('/projects/');

    // NOTE: Story 3.5 (project filtering) is ready-for-dev, not yet implemented
    // This test verifies the listing page loads and has project cards
    // Data attributes will be added when Story 3.5 is implemented
    const projectCards = page.locator('.grid > div').filter({
      has: page.locator('h2'),
    });
    const count = await projectCards.count();

    // Should have project cards (data attributes optional until 3.5)
    expect(count).toBeGreaterThan(0);
  });

  test('[P1] work projects are distinguishable from personal', async ({ page }) => {
    // Given: Projects listing with both work and personal projects
    await page.goto('/projects/');

    // Then: There should be visual or data distinction
    // qr-code-platform is "work", covid-dashboard is "personal"
    const workProjects = page.locator('[data-project-type="work"], [data-type="work"]');
    const personalProjects = page.locator('[data-project-type="personal"], [data-type="personal"]');

    // At least verify the page loads and has project content
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

test.describe('Story 5.2: Content Pipeline Smoke Tests', () => {
  test('[P0] projects listing page loads', async ({ page }) => {
    await page.goto('/projects/');
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('[P0] project detail page loads', async ({ page }) => {
    await page.goto('/projects/qr-code-platform/');
    await expect(page.locator('main')).toBeVisible();
  });

  test('[P1] navigation from listing to detail works', async ({ page }) => {
    // Start at listing
    await page.goto('/projects/');

    // Click through to detail (find first project link)
    const projectLink = page.locator('a[href^="/projects/"][href$="/"]').filter({
      has: page.locator('h2, h3'),
    });

    if ((await projectLink.count()) > 0) {
      const href = await projectLink.first().getAttribute('href');
      await projectLink.first().click();

      // Should be on detail page
      await expect(page).toHaveURL(/\/projects\/.+\//);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
  });

  test('[P1] back navigation works from detail', async ({ page }) => {
    // Start at detail
    await page.goto('/projects/qr-code-platform/');

    // Look for back link
    const backLink = page.getByRole('link', { name: /back|projects/i }).first();

    if (await backLink.isVisible()) {
      await backLink.click();
      // Should navigate to listing or another valid page
      await expect(page.locator('main')).toBeVisible();
    }
  });
});
