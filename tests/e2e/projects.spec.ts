/**
 * Story 3.1: Projects Collection and Listing Page Tests (ATDD)
 *
 * These tests validate the projects listing page implementation.
 *
 * Acceptance Criteria:
 * - AC1: Projects collection exists from _content/projects/
 * - AC2: Projects listing page accessible at /projects/ with project cards
 * - AC3: Project card displays title, description, and technology tags
 * - AC4: Clicking project card navigates to detail page
 * - AC5: Mobile responsive (cards stack vertically)
 * - AC6: Neubrutalist design with bold borders and shadows
 *
 */

import { test, expect } from '../support/fixtures';

test.describe('Story 3.1: Projects Listing Page (AC2)', () => {
  test('[P0] projects page loads at /projects/', async ({ page }) => {
    // Given: User navigates to projects page
    await page.goto('/projects/');

    // Then: Page should load successfully with main content
    await expect(page.locator('main')).toBeVisible();
  });

  test('[P0] projects page displays section heading', async ({ page }) => {
    // Given: User navigates to projects page
    await page.goto('/projects/');

    // Then: Page should have "PROJECTS" heading
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('PROJECTS');

    // And: "PROJECTS" should have pink highlight (matching Neubrutalist style)
    const highlight = heading.locator('.bg-pink-400');
    await expect(highlight).toContainText('PROJECTS');
  });

  test('[P0] all 9 projects are displayed', async ({ page }) => {
    // Given: User navigates to projects page
    await page.goto('/projects/');

    // Then: Should have 9 project cards (matching _content/projects/ count)
    const projectCards = page.locator('.border-4.border-black').filter({ has: page.locator('h2') });
    await expect(projectCards).toHaveCount(9);
  });

  test('[P1] projects page has clean URL without hash fragments', async ({ page }) => {
    // Given: User navigates to projects page
    await page.goto('/projects/');

    // Then: URL should be clean (no hash fragments)
    const url = page.url();
    expect(url).not.toContain('#');
    expect(url).toMatch(/\/projects\/?$/);
  });
});

test.describe('Story 3.1: Project Card Display (AC3)', () => {
  test('[P0] project card shows title', async ({ page }) => {
    // Given: User views projects listing
    await page.goto('/projects/');

    // Then: Project cards should have h2 titles
    const projectTitle = page.locator('h2.font-black').first();
    await expect(projectTitle).toBeVisible();

    // And: Title should have text content
    const titleText = await projectTitle.textContent();
    expect(titleText?.trim().length).toBeGreaterThan(0);
  });

  test('[P0] project card shows description', async ({ page }) => {
    // Given: User views projects listing
    await page.goto('/projects/');

    // Then: Project cards should have description text
    const description = page.locator('.text-neutral-600.line-clamp-2').first();
    await expect(description).toBeVisible();

    // And: Description should have content
    const descText = await description.textContent();
    expect(descText?.trim().length).toBeGreaterThan(0);
  });

  test('[P0] project card shows technology tags', async ({ page }) => {
    // Given: User views projects listing
    await page.goto('/projects/');

    // Then: Project cards should have technology tags
    // Technology tags use various background colors per tag component (blue, cyan, yellow, pink, etc.)
    // Find tags within project cards (with h2 headings) to exclude nav elements
    const projectCards = page.locator('.border-4.border-black').filter({ has: page.locator('h2') });
    const techTags = projectCards.first().locator('.border-2.border-black.text-sm.font-bold.uppercase');
    await expect(techTags.first()).toBeVisible();
  });

  test('[P1] project card shows project type badge', async ({ page }) => {
    // Given: User views projects listing
    await page.goto('/projects/');

    // Then: Project cards should have project type indicator (work/personal)
    // Filter for actual project cards (have h2 heading) to exclude nav elements
    // The type badge is in a flex justify-between container at top of card
    const projectCards = page.locator('.border-4.border-black').filter({ has: page.locator('h2') });
    // Find badge by looking for WORK or PERSONAL text (trimmed)
    const typeBadge = projectCards.first().locator('.flex.justify-between .bg-neutral-100').first();
    await expect(typeBadge).toBeVisible();

    // And: Badge should contain WORK or PERSONAL
    const badgeText = await typeBadge.textContent();
    expect(badgeText?.trim().toUpperCase()).toMatch(/WORK|PERSONAL/);
  });

  test('[P2] technology tags limited to 4 with overflow indicator', async ({ page }) => {
    // Given: User views projects listing with projects having many technologies
    await page.goto('/projects/');

    // Find a project card with many technologies
    const cards = page.locator('.border-4.border-black').filter({ has: page.locator('h2') });
    const firstCard = cards.first();

    // Then: Should show max 4 technology tags
    const tagsInCard = firstCard.locator('.bg-pink-400');
    const tagCount = await tagsInCard.count();
    expect(tagCount).toBeLessThanOrEqual(4);

    // And: If more technologies exist, show "+X more" indicator
    const overflowIndicator = firstCard.getByText(/\+\d+ more/);
    // This is optional - only appears if project has >4 technologies
    const hasOverflow = (await overflowIndicator.count()) > 0;
    if (hasOverflow) {
      await expect(overflowIndicator).toBeVisible();
    }
  });

  test('[P2] project card shows feature indicator icons', async ({ page }) => {
    // Given: User views projects listing
    await page.goto('/projects/');

    // Then: Project with diagram should show diagram icon
    const projectCards = page.locator('.border-4.border-black').filter({ has: page.locator('h2') });

    // Find the icons container (flex gap-2 containing the icons)
    const iconsContainer = projectCards.first().locator('.flex.gap-2').last();
    await expect(iconsContainer).toBeVisible();
  });
});

test.describe('Story 3.1: Project Navigation (AC4)', () => {
  test('[P0] clicking project title navigates to detail page', async ({ page }) => {
    // Given: User is on projects listing page
    await page.goto('/projects/');

    // When: User clicks on a project title
    const projectTitle = page.locator('h2.font-black a, a h2.font-black').first();
    await projectTitle.click();

    // Then: User should navigate to project detail page
    await expect(page).toHaveURL(/\/projects\/[\w-]+\//);
  });

  test('[P0] clicking VIEW PROJECT navigates to detail page', async ({ page }) => {
    // Given: User is on projects listing page
    await page.goto('/projects/');

    // When: User clicks VIEW PROJECT link (has aria-label for accessibility)
    const viewProjectLink = page.getByRole('link', { name: /View .+ project details/i }).first();
    const href = await viewProjectLink.getAttribute('href');
    expect(href).toMatch(/^\/projects\/[\w-]+\/?$/);

    await viewProjectLink.click();

    // Then: User should navigate to project detail page
    await expect(page).toHaveURL(/\/projects\/[\w-]+\//);
  });

  test('[P1] project title has hover effect', async ({ page }) => {
    // Given: User is on projects listing page
    await page.goto('/projects/');

    // Then: Project title should have hover:text-pink-600 class
    const projectTitle = page.locator('h2.font-black').first();
    await expect(projectTitle).toHaveClass(/hover:text-pink-600/);
  });

  test('[P1] project links have correct URL structure', async ({ page }) => {
    // Given: User is on projects listing page
    await page.goto('/projects/');

    // When: Collecting all project detail links (exclude /projects/ page link itself)
    // Use regex to match project detail URLs: /projects/{project-id}/
    const projectLinks = page.locator('a[href^="/projects/"][href$="/"]').filter({
      has: page.locator(':scope') // Self-filter to get the element
    });

    // Get all hrefs and filter to only project detail pages
    const allLinks = await page.locator('a[href^="/projects/"]').all();
    const detailLinks = [];
    for (const link of allLinks) {
      const href = await link.getAttribute('href');
      if (href && href !== '/projects/' && href.match(/^\/projects\/[\w-]+\/$/)) {
        detailLinks.push(href);
      }
    }

    expect(detailLinks.length).toBeGreaterThan(0);

    // Then: All project detail links should have clean URL structure
    for (const href of detailLinks.slice(0, 5)) {
      expect(href).toMatch(/^\/projects\/[\w-]+\/$/);
      expect(href).not.toContain('#');
    }
  });
});

test.describe('Story 3.1: Mobile Responsive (AC5)', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('[P1] project cards stack vertically on mobile', async ({ page }) => {
    // Given: User views projects listing on mobile device
    await page.goto('/projects/');

    // Then: Project cards should be visible and stacked
    const projectCards = page.locator('.border-4.border-black').filter({ has: page.locator('h2') });
    const cardCount = await projectCards.count();
    expect(cardCount).toBeGreaterThan(0);

    // And: Cards should be full width on mobile
    const firstCard = projectCards.first();
    const box = await firstCard.boundingBox();

    // Card should be close to full width (375px - padding)
    expect(box?.width).toBeGreaterThan(300);
  });

  test('[P1] cards are stacked not side-by-side on mobile', async ({ page }) => {
    // Given: User views projects listing on mobile
    await page.goto('/projects/');

    const cards = page.locator('.border-4.border-black').filter({ has: page.locator('h2') });
    const firstCard = cards.first();
    const secondCard = cards.nth(1);

    // Get bounding boxes
    const firstBox = await firstCard.boundingBox();
    const secondBox = await secondCard.boundingBox();

    // Then: Second card should be below first card (stacked vertically)
    expect(secondBox!.y).toBeGreaterThan(firstBox!.y + firstBox!.height - 10);
  });

  test('[P1] text is readable on mobile', async ({ page }) => {
    // Given: User views projects listing on mobile
    await page.goto('/projects/');

    // Then: Project titles should be visible and readable
    const projectTitle = page.locator('h2.font-black').first();
    await expect(projectTitle).toBeVisible();

    // And: Font size should be readable (text-xl = 20px minimum)
    const fontSize = await projectTitle.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });
    const fontSizeNum = parseFloat(fontSize);
    expect(fontSizeNum).toBeGreaterThanOrEqual(18);
  });
});

test.describe('Story 3.1: Neubrutalist Design (AC6)', () => {
  test('[P1] project cards have 4px black borders', async ({ page }) => {
    // Given: User views projects listing
    await page.goto('/projects/');

    // Then: Project cards should have 4px black border
    const projectCard = page.locator('.border-4.border-black').first();
    await expect(projectCard).toBeVisible();

    const borderWidth = await projectCard.evaluate((el) => {
      return window.getComputedStyle(el).borderWidth;
    });
    expect(borderWidth).toBe('4px');

    const borderColor = await projectCard.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
    expect(borderColor).toBe('rgb(0, 0, 0)');
  });

  test('[P1] project cards have brutal shadow', async ({ page }) => {
    // Given: User views projects listing
    await page.goto('/projects/');

    // Then: Project cards should have box shadow (6px per design system)
    const projectCard = page.locator('.border-4.border-black').filter({ has: page.locator('h2') }).first();
    const style = await projectCard.getAttribute('style');
    expect(style).toContain('6px 6px 0');
  });

  test('[P1] page uses Neubrutalist design tokens', async ({ page, verifyNeubrutalistDesign }) => {
    // Given: User views projects listing
    await page.goto('/projects/');

    // Then: Neubrutalist design tokens should be applied
    await verifyNeubrutalistDesign();
  });

  test('[P2] project cards have white background', async ({ page }) => {
    // Given: User views projects listing
    await page.goto('/projects/');

    // Then: Project cards should have white background
    // Filter for actual project cards (have h2 heading) to exclude nav elements
    const projectCard = page.locator('.border-4.border-black').filter({ has: page.locator('h2') }).first();
    const bgColor = await projectCard.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // white = rgb(255, 255, 255)
    expect(bgColor).toBe('rgb(255, 255, 255)');
  });
});

test.describe('Story 3.1: Keyboard Accessibility', () => {
  test('[P1] project links are keyboard focusable', async ({ page }) => {
    // Given: User navigates to projects page
    await page.goto('/projects/');

    // When: User focuses a project link (find links with hyphens = project IDs)
    const projectLink = page.locator('a[href^="/projects/"][href*="-"]').first();
    await projectLink.focus();

    // Then: Link should be focused
    await expect(projectLink).toBeFocused();
  });

  test('[P1] Enter key activates project link', async ({ page }) => {
    // Given: User has focused a project link
    await page.goto('/projects/');

    // Find project detail links (not the /projects/ page link)
    // Use a regex to match /projects/{project-id}/ pattern
    const projectLink = page.locator('a[href^="/projects/"][href*="-"]').first();
    await projectLink.focus();

    // When: User presses Enter
    await page.keyboard.press('Enter');

    // Then: Should navigate to project detail page
    await expect(page).toHaveURL(/\/projects\/[\w-]+\//);
  });

  test('[P2] focus indicator is visible on project cards', async ({ page }) => {
    // Given: User navigates to projects page
    await page.goto('/projects/');

    // When: User focuses a project link (find links with hyphens = project IDs)
    const projectLink = page.locator('a[href^="/projects/"][href*="-"]').first();
    await projectLink.focus();

    // Then: Focus outline should be visible (4px black per PRD)
    const outlineWidth = await projectLink.evaluate((el) => {
      return window.getComputedStyle(el).outlineWidth;
    });

    // Should have visible focus indicator
    expect(outlineWidth).not.toBe('0px');
  });
});

test.describe('Story 3.1: Pre-rendered Static HTML (AC1)', () => {
  test('[P2] page source contains project content (not JS placeholder)', async ({ request }) => {
    // Given: We fetch the raw HTML source
    const response = await request.get('/projects/');
    const html = await response.text();

    // Then: HTML should contain the page heading (pre-rendered)
    expect(html).toContain('PROJECTS');

    // And: HTML should NOT be a SPA placeholder
    expect(html).not.toContain('Loading...');
    expect(html).not.toContain('id="root"');
  });

  test('[P2] page source contains project titles (not dynamically loaded)', async ({ request }) => {
    // Given: We fetch the raw HTML source
    const response = await request.get('/projects/');
    const html = await response.text();

    // Then: HTML should contain project structures (h2 elements)
    expect(html).toMatch(/<h2[^>]*>/);

    // And: Should contain at least one known project title
    expect(html).toMatch(/Authentication|Cloud|Observability|QR Code|Microservices/i);
  });
});

test.describe('Story 3.1: Grid Layout', () => {
  test('[P2] desktop shows two-column grid', async ({ page }) => {
    // Given: User views projects on desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/projects/');

    // Then: Grid container should exist
    const grid = page.locator('.grid.gap-6');
    await expect(grid).toBeVisible();

    // And: First two cards should be side by side
    const cards = page.locator('.border-4.border-black').filter({ has: page.locator('h2') });
    const firstBox = await cards.first().boundingBox();
    const secondBox = await cards.nth(1).boundingBox();

    // Cards should be at similar Y position (side by side)
    expect(Math.abs(firstBox!.y - secondBox!.y)).toBeLessThan(20);
  });

  test('[P2] tablet shows two-column grid', async ({ page }) => {
    // Given: User views projects on tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/projects/');

    // Then: First two cards should be side by side
    const cards = page.locator('.border-4.border-black').filter({ has: page.locator('h2') });
    const firstBox = await cards.first().boundingBox();
    const secondBox = await cards.nth(1).boundingBox();

    // Cards should be at similar Y position (side by side, md:grid-cols-2)
    expect(Math.abs(firstBox!.y - secondBox!.y)).toBeLessThan(20);
  });
});

/**
 * Story 3.2: Create Project Detail Layout
 *
 * These tests validate the project detail page implementation.
 *
 * Acceptance Criteria:
 * - AC1: Project detail page accessible at /projects/{project-id}/
 * - AC2: Challenge/Solution/Impact structure visible
 * - AC3: Layout extends base.njk (verified via main#main-content from base layout)
 * - AC4: Header with title, description, technology tags
 * - AC5: Clean URL structure using project id field
 * - AC6: Markdown formatting properly styled
 */

test.describe('Story 3.2: Project Detail Page Access (AC1, AC5)', () => {
  test('[P0] project detail page loads at clean URL', async ({ page }) => {
    // Given: A project exists with id "qr-code-platform"
    // When: User navigates to the project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Page should load successfully (200 status)
    await expect(page).toHaveURL('/projects/qr-code-platform/');

    // And: Page should have main content area
    await expect(page.locator('main')).toBeVisible();

    // And: Page should have exactly one h1 (accessibility)
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  test('[P2] invalid project URL returns 404 or redirects', async ({ page }) => {
    // Given: User navigates to a non-existent project
    const response = await page.goto('/projects/non-existent-project/');

    // Then: Should return 404 or redirect to projects listing
    const status = response?.status();
    const url = page.url();

    // Either 404 page or redirect to /projects/
    expect(status === 404 || url.endsWith('/projects/')).toBeTruthy();
  });

  test('[P1] layout extends base.njk with proper structure (AC3)', async ({ page }) => {
    // Given: User navigates to a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Page should have main element with id from base.njk
    const main = page.locator('main#main-content');
    await expect(main).toBeVisible();

    // And: Page should have skip link (from base.njk)
    const skipLink = page.locator('a.skip-link');
    await expect(skipLink).toBeAttached();

    // And: Page should have header with navigation (from base.njk)
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // And: Page should have footer (from base.njk)
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});

test.describe('Story 3.2: Project Header Content (AC4)', () => {
  test('[P0] project title displayed with lime highlight', async ({ page }) => {
    // Given: User navigates to a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Project title should be visible as h1
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('QR Code');

    // And: First word should have lime highlight (bg-lime-400) - aligned with React version
    const highlight = heading.locator('.bg-lime-400');
    await expect(highlight).toBeVisible();
  });

  test('[P0] project description displayed', async ({ page }) => {
    // Given: User navigates to a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Project description should be visible
    // Description contains "High-performance QR code" from frontmatter
    await expect(page.getByText(/High-performance QR code/i)).toBeVisible();
  });

  test('[P0] all technology tags displayed', async ({ page }) => {
    // Given: User navigates to a project with multiple technologies
    await page.goto('/projects/qr-code-platform/');

    // Then: All technology tags should be visible (not limited to 4 like listing)
    // QR Code Platform has: Python, FastAPI, PostgreSQL, Docker, Prometheus
    // Use exact text match to avoid matching content in body text
    const tagsContainer = page.locator('.flex.flex-wrap.gap-2').first();
    await expect(tagsContainer.getByText('Python', { exact: true })).toBeVisible();
    await expect(tagsContainer.getByText('FastAPI', { exact: true })).toBeVisible();
    await expect(tagsContainer.getByText('PostgreSQL', { exact: true })).toBeVisible();
    await expect(tagsContainer.getByText('Docker', { exact: true })).toBeVisible();
    await expect(tagsContainer.getByText('Prometheus', { exact: true })).toBeVisible();
  });

  test('[P1] project type badge displayed', async ({ page }) => {
    // Given: User navigates to a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Project type badge should be visible (WORK or PERSONAL)
    const typeBadge = page.locator('.bg-neutral-100.text-sm.font-bold, [class*="bg-neutral"]');
    await expect(typeBadge.first()).toBeVisible();

    // And: Badge should contain WORK (this is a work project)
    await expect(page.getByText(/WORK/i)).toBeVisible();
  });
});

test.describe('Story 3.2: Overview Section', () => {
  test('[P0] Overview section heading visible', async ({ page }) => {
    // Given: User navigates to a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Overview heading should be visible as h2
    const overviewHeading = page.getByRole('heading', { name: 'Overview', level: 2 });
    await expect(overviewHeading).toBeVisible();
  });

  test('[P1] Overview section contains longDescription content', async ({ page }) => {
    // Given: User navigates to a project detail page with longDescription
    await page.goto('/projects/qr-code-platform/');

    // Then: Overview should contain the longDescription text
    await expect(page.getByText(/production-grade QR code generation/i)).toBeVisible();
  });
});

test.describe('Story 3.2: Challenge/Solution/Impact Sections (AC2)', () => {
  test('[P0] Challenge section heading visible', async ({ page }) => {
    // Given: User navigates to a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Challenge heading should be visible as h2
    const challengeHeading = page.getByRole('heading', { name: 'Challenge', level: 2 });
    await expect(challengeHeading).toBeVisible();
  });

  test('[P0] Solution section heading visible', async ({ page }) => {
    // Given: User navigates to a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Solution heading should be visible as h2
    const solutionHeading = page.getByRole('heading', { name: 'Solution', level: 2 });
    await expect(solutionHeading).toBeVisible();
  });

  test('[P0] Impact section heading visible', async ({ page }) => {
    // Given: User navigates to a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Impact heading should be visible as h2
    const impactHeading = page.getByRole('heading', { name: 'Impact', level: 2 });
    await expect(impactHeading).toBeVisible();
  });

  test('[P1] Challenge section has red border accent', async ({ page }) => {
    // Given: User navigates to a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Challenge section card should have red left border
    const challengeCard = page.locator('.border-l-red-400');
    await expect(challengeCard).toBeVisible();
  });

  test('[P1] Solution section has blue border accent', async ({ page }) => {
    // Given: User navigates to a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Solution section card should have blue left border
    const solutionCard = page.locator('.border-l-blue-400');
    await expect(solutionCard).toBeVisible();
  });

  test('[P1] Impact section has lime border accent', async ({ page }) => {
    // Given: User navigates to a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Impact section card should have lime left border
    const impactCard = page.locator('.border-l-lime-400');
    await expect(impactCard).toBeVisible();
  });
});

test.describe('Story 3.2: Key Features Section', () => {
  test('[P0] Key Features section heading visible', async ({ page }) => {
    // Given: User navigates to a project with keyFeatures
    await page.goto('/projects/qr-code-platform/');

    // Then: Key Features heading should be visible as h2
    const featuresHeading = page.getByRole('heading', { name: 'Key Features', level: 2 });
    await expect(featuresHeading).toBeVisible();
  });

  test('[P1] Key Features section has yellow border accent', async ({ page }) => {
    // Given: User navigates to a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Key Features section card should have yellow left border
    const featuresCard = page.locator('.border-l-yellow-400');
    await expect(featuresCard).toBeVisible();
  });

  test('[P1] Key Features displays as numbered list', async ({ page }) => {
    // Given: User navigates to a project with keyFeatures
    await page.goto('/projects/qr-code-platform/');

    // Then: Features should be in an ordered list
    const featuresList = page.locator('ol.list-decimal');
    await expect(featuresList).toBeVisible();

    // And: List should have multiple items
    const listItems = featuresList.locator('li');
    expect(await listItems.count()).toBeGreaterThan(2);
  });
});

test.describe('Story 3.2: External Links', () => {
  test('[P1] GitHub link displayed when URL exists', async ({ page }) => {
    // Given: User navigates to a project with githubUrl
    await page.goto('/projects/qr-code-platform/');

    // Then: GitHub link should be visible
    const githubLink = page.getByRole('link', { name: /GitHub/i });
    await expect(githubLink).toBeVisible();

    // And: Link should open in new tab
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('[P1] Live Demo link displayed when URL exists', async ({ page }) => {
    // Given: User navigates to a project with liveUrl
    await page.goto('/projects/qr-code-platform/');

    // Then: Live Demo link should be visible
    const liveLink = page.getByRole('link', { name: /Live Demo/i });
    await expect(liveLink).toBeVisible();

    // And: Link should open in new tab
    await expect(liveLink).toHaveAttribute('target', '_blank');
  });

  test('[P1] Documentation link displayed when URL exists', async ({ page }) => {
    // Given: User navigates to a project with documentationUrl
    await page.goto('/projects/cloud-infrastructure-platform/');

    // Then: Documentation link should be visible
    const docsLink = page.getByRole('link', { name: /Documentation/i });
    await expect(docsLink).toBeVisible();
  });

  test('[P2] External links not shown when URLs missing', async ({ page }) => {
    // Given: User navigates to a project without external links
    // (authentication-gateway has no liveUrl or documentationUrl)
    await page.goto('/projects/authentication-gateway/');

    // Then: Live Demo link should NOT be visible
    const liveLink = page.getByRole('link', { name: /Live Demo/i });
    await expect(liveLink).not.toBeVisible();
  });
});

test.describe('Story 3.2: Table of Contents Sidebar', () => {
  test('[P1] TOC sidebar visible on desktop', async ({ page }) => {
    // Given: User views project on desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/projects/qr-code-platform/');

    // Then: TOC sidebar should be visible (matching blog layout)
    const tocNav = page.locator('aside').filter({ hasText: 'TABLE OF CONTENTS' });
    await expect(tocNav).toBeVisible();
  });

  test('[P1] TOC sidebar hidden on mobile', async ({ page }) => {
    // Given: User views project on mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/projects/qr-code-platform/');

    // Then: TOC sidebar should be hidden
    const tocNav = page.locator('aside').filter({ hasText: 'TABLE OF CONTENTS' });
    await expect(tocNav).not.toBeVisible();
  });

  test('[P2] TOC contains buttons for all sections', async ({ page }) => {
    // Given: User views project on desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/projects/qr-code-platform/');

    // Then: TOC should have buttons for major sections (matching blog)
    const toc = page.locator('aside').filter({ hasText: 'TABLE OF CONTENTS' });
    await expect(toc.getByRole('button', { name: 'Overview' })).toBeVisible();
    await expect(toc.getByRole('button', { name: 'Challenge' })).toBeVisible();
    await expect(toc.getByRole('button', { name: 'Solution' })).toBeVisible();
    await expect(toc.getByRole('button', { name: 'Impact' })).toBeVisible();
  });

  test('[P2] TOC shows scroll progress', async ({ page }) => {
    // Given: User views project on desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/projects/qr-code-platform/');

    // Then: TOC should show progress indicator
    const toc = page.locator('aside').filter({ hasText: 'TABLE OF CONTENTS' });
    await expect(toc.getByText('PROGRESS')).toBeVisible();
    await expect(toc.locator('#scroll-progress')).toBeVisible();
  });

  test('[P2] TOC buttons navigate to sections', async ({ page }) => {
    // Given: User views project on desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/projects/qr-code-platform/');

    // When: User clicks on Challenge button in TOC
    const toc = page.locator('aside').filter({ hasText: 'TABLE OF CONTENTS' });
    await toc.getByRole('button', { name: 'Challenge' }).click();

    // Then: Challenge section should be scrolled into view
    const challengeSection = page.locator('#challenge');
    await expect(challengeSection).toBeInViewport();
  });
});

test.describe('Story 3.2: Navigation (AC1)', () => {
  test('[P1] top back button navigates to projects listing', async ({ page }) => {
    // Given: User is on a project detail page
    await page.goto('/projects/qr-code-platform/');

    // When: User clicks the back button at top
    const backButton = page.getByRole('link', { name: /back to projects/i }).first();
    await expect(backButton).toBeVisible();
    await backButton.click();

    // Then: User should navigate to projects listing
    await expect(page).toHaveURL('/projects/');
  });

  test('[P1] bottom back button present and styled', async ({ page }) => {
    // Given: User is on a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Bottom back button should be visible
    const bottomBackButton = page.getByRole('link', { name: /back to all projects/i });
    await expect(bottomBackButton).toBeVisible();

    // And: Button should have black background with white text (per blog-post pattern)
    const bgColor = await bottomBackButton.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toBe('rgb(0, 0, 0)'); // black
  });

  test('[P1] keyboard navigation works on back buttons', async ({ page }) => {
    // Given: User navigates to project detail page
    await page.goto('/projects/qr-code-platform/');

    // When: User tabs to back button and presses Enter
    const backButton = page.getByRole('link', { name: /back to projects/i }).first();
    await backButton.focus();
    await expect(backButton).toBeFocused();

    // Then: Focus outline should be visible (accessibility)
    const outlineWidth = await backButton.evaluate((el) =>
      window.getComputedStyle(el).outlineWidth
    );
    expect(outlineWidth).not.toBe('0px');
  });
});

test.describe('Story 3.2: Neubrutalist Styling (AC1, AC6)', () => {
  test('[P1] section cards have Neubrutalist styling', async ({ page }) => {
    // Given: User views a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Section cards should have 4px black border
    const card = page.locator('.border-4.border-black').first();
    await expect(card).toBeVisible();

    const borderWidth = await card.evaluate((el) =>
      window.getComputedStyle(el).borderWidth
    );
    expect(borderWidth).toBe('4px');
  });

  test('[P1] cards have brutal shadow', async ({ page }) => {
    // Given: User views a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Cards should have box shadow (8px per design system)
    const card = page.locator('[style*="8px 8px 0"]').first();
    await expect(card).toBeVisible();
  });
});

/**
 * Story 3.3: Implement Mermaid Diagram Rendering
 *
 * These tests validate the Mermaid diagram rendering implementation.
 *
 * Acceptance Criteria:
 * - AC1: SVG Generation from Frontmatter (build-time, validated via AC3)
 * - AC2: Mermaid CLI Script (build-time, validated via AC3)
 * - AC3: Diagram Display on Project Page (img tag with correct src)
 * - AC4: Responsive SVG Sizing (w-full, h-auto)
 * - AC5: Accessible Alt Text (meaningful alt attribute)
 * - AC6: Graceful Absence Without Mermaid (no diagram section)
 * - AC7: Build Pipeline Order (build-time, validated via AC1/AC3)
 */

test.describe('Story 3.3: Mermaid Diagram Rendering (AC3)', () => {
  // Test project that has mermaid diagram (using diagramContent field)
  const projectWithDiagram = 'qr-code-platform';

  test('[P0] project with diagram shows Architecture heading', async ({ page }) => {
    // Given: A project with diagramContent in frontmatter
    await page.goto(`/projects/${projectWithDiagram}/`);

    // Then: Architecture section heading should be visible
    const architectureHeading = page.getByRole('heading', { name: 'Architecture', level: 2 });
    await expect(architectureHeading).toBeVisible();
  });

  test('[P0] diagram image has correct src path', async ({ page }) => {
    // Given: A project with mermaid diagram
    await page.goto(`/projects/${projectWithDiagram}/`);

    // Then: Diagram image should reference the pre-rendered SVG
    const diagramImg = page.locator('img[src*="/diagrams/"]');
    await expect(diagramImg).toBeVisible();
    await expect(diagramImg).toHaveAttribute('src', `/diagrams/${projectWithDiagram}.svg`);
  });

  test('[P0] diagram image has meaningful alt text', async ({ page }) => {
    // Given: A project with mermaid diagram
    await page.goto(`/projects/${projectWithDiagram}/`);

    // Then: Diagram image should have accessible alt text
    const diagramImg = page.locator('img[src*="/diagrams/"]');
    await expect(diagramImg).toBeVisible();

    // And: Alt text should be meaningful (not empty, at least 10 characters)
    const altText = await diagramImg.getAttribute('alt');
    expect(altText).toBeTruthy();
    expect(altText!.length).toBeGreaterThan(10);
  });
});

test.describe('Story 3.3: Diagram Styling (AC4)', () => {
  const projectWithDiagram = 'qr-code-platform';

  test('[P1] diagram image is responsive', async ({ page }) => {
    // Given: A project with mermaid diagram
    await page.goto(`/projects/${projectWithDiagram}/`);

    // Then: Diagram image should have responsive class (w-full)
    const diagramImg = page.locator('img[src*="/diagrams/"]');
    await expect(diagramImg).toBeVisible();
    await expect(diagramImg).toHaveClass(/w-full/);
  });

  test('[P1] diagram card has Neubrutalist styling', async ({ page }) => {
    // Given: A project with mermaid diagram
    await page.goto(`/projects/${projectWithDiagram}/`);

    // Then: Diagram should be wrapped in a card with 4px black border
    // The structure is: card div > centering div > img, so we need to go up two levels
    const diagramCard = page.locator('#architecture .border-4.border-black');
    await expect(diagramCard).toBeVisible();

    const borderWidth = await diagramCard.evaluate((el) =>
      window.getComputedStyle(el).borderWidth
    );
    expect(borderWidth).toBe('4px');

    // And: Card should have brutal shadow
    const style = await diagramCard.getAttribute('style');
    expect(style).toContain('8px 8px 0');
  });
});

test.describe('Story 3.3: Graceful Absence (AC6)', () => {
  // Test project that does NOT have mermaid diagram
  const projectWithoutDiagram = 'authentication-gateway';

  test('[P0] project without diagram has no Architecture section', async ({ page }) => {
    // Given: A project without diagramContent field in frontmatter
    await page.goto(`/projects/${projectWithoutDiagram}/`);

    // Then: Architecture heading should NOT be visible
    const architectureHeading = page.getByRole('heading', { name: 'Architecture', level: 2 });
    await expect(architectureHeading).not.toBeVisible();
  });

  test('[P0] project without diagram has no diagram image', async ({ page }) => {
    // Given: A project without diagramContent field in frontmatter
    await page.goto(`/projects/${projectWithoutDiagram}/`);

    // Then: No diagram image should be present
    const diagramImg = page.locator('img[src*="/diagrams/"]');
    await expect(diagramImg).not.toBeVisible();
  });
});

test.describe('Story 3.3: Diagram Accessibility', () => {
  const projectWithDiagram = 'qr-code-platform';

  test('[P1] diagram image has loading=lazy for performance', async ({ page }) => {
    // Given: A project with mermaid diagram
    await page.goto(`/projects/${projectWithDiagram}/`);

    // Then: Diagram image should use lazy loading
    const diagramImg = page.locator('img[src*="/diagrams/"]');
    await expect(diagramImg).toHaveAttribute('loading', 'lazy');
  });

  test('[P2] diagram alt text is not generic placeholder', async ({ page }) => {
    // Given: A project with mermaid diagram
    await page.goto(`/projects/${projectWithDiagram}/`);

    // Then: Alt text should NOT be a generic placeholder
    const diagramImg = page.locator('img[src*="/diagrams/"]');
    const altText = await diagramImg.getAttribute('alt');

    // Generic placeholders to avoid
    expect(altText?.toLowerCase()).not.toContain('image');
    expect(altText?.toLowerCase()).not.toContain('diagram.svg');
    expect(altText?.toLowerCase()).not.toContain('placeholder');
  });
});
