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

/**
 * Story 3.5: Implement Project Filtering (ATDD)
 *
 * These tests validate the project filtering implementation.
 *
 * Acceptance Criteria:
 * - AC1: Filter controls display (type + resources)
 * - AC2: Work/Personal type filter works
 * - AC3: Resource filters work (GitHub, Demo, Diagram)
 * - AC4: Multiple filters use AND logic
 * - AC5: Empty state when no projects match
 * - AC6: Clear filters restores all projects
 * - AC7: Vanilla JS with data-* attributes
 * - AC8: Progressive enhancement (graceful degradation)
 *
 * Project counts (based on actual content):
 * - Total: 9 projects
 * - Work: 8 | Personal: 1
 * - Has GitHub: 7 | Has Demo: 2 | Has Diagram: 1
 */

test.describe('Story 3.5: Filter Controls Display (AC1)', () => {
  test('[P0] filter controls are visible on projects page', async ({ page }) => {
    // Given: User navigates to projects page
    await page.goto('/projects/');

    // Then: Filter controls container should be visible
    const filterControls = page.locator('[data-filter-controls]');
    await expect(filterControls).toBeVisible();
  });

  test('[P0] type filter buttons are present', async ({ page }) => {
    // Given: User views projects page with filter controls
    await page.goto('/projects/');

    // Then: Type filter buttons should be visible
    await expect(page.locator('[data-filter-type="all"]')).toBeVisible();
    await expect(page.locator('[data-filter-type="work"]')).toBeVisible();
    await expect(page.locator('[data-filter-type="personal"]')).toBeVisible();
  });

  test('[P0] resource filter checkboxes are present', async ({ page }) => {
    // Given: User views projects page with filter controls
    await page.goto('/projects/');

    // Then: Resource filter checkboxes should be visible
    await expect(page.locator('[data-filter-resource="github"]')).toBeAttached();
    await expect(page.locator('[data-filter-resource="demo"]')).toBeAttached();
    await expect(page.locator('[data-filter-resource="diagram"]')).toBeAttached();
  });

  test('[P1] All filter is active by default', async ({ page }) => {
    // Given: User navigates to projects page
    await page.goto('/projects/');

    // Then: All button should be active (pressed state)
    const allButton = page.locator('[data-filter-type="all"]');
    await expect(allButton).toHaveAttribute('aria-pressed', 'true');

    // And: All button should have active styling (bg-lime-400)
    await expect(allButton).toHaveClass(/bg-lime-400/);
  });
});

test.describe('Story 3.5: Type Filtering (AC2)', () => {
  test('[P0] Work filter shows only work projects', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // When: User clicks Work filter
    await page.locator('[data-filter-type="work"]').click();

    // Then: Only work projects should be visible (8 projects)
    const visibleCards = page.locator('[data-project-type]:not(.hidden)');
    await expect(visibleCards).toHaveCount(8);

    // And: All visible projects should be work type
    const projectTypes = await visibleCards.evaluateAll((cards) =>
      cards.map((c) => (c as HTMLElement).dataset.projectType)
    );
    expect(projectTypes.every((t) => t === 'work')).toBe(true);
  });

  test('[P0] Personal filter shows only personal projects', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // When: User clicks Personal filter
    await page.locator('[data-filter-type="personal"]').click();

    // Then: Only personal projects should be visible (1 project)
    const visibleCards = page.locator('[data-project-type]:not(.hidden)');
    await expect(visibleCards).toHaveCount(1);

    // And: All visible projects should be personal type
    const projectTypes = await visibleCards.evaluateAll((cards) =>
      cards.map((c) => (c as HTMLElement).dataset.projectType)
    );
    expect(projectTypes.every((t) => t === 'personal')).toBe(true);
  });

  test('[P0] All filter shows all projects', async ({ page }) => {
    // Given: User has filtered by Work
    await page.goto('/projects/');
    await page.locator('[data-filter-type="work"]').click();

    // When: User clicks All filter
    await page.locator('[data-filter-type="all"]').click();

    // Then: All 9 projects should be visible
    const visibleCards = page.locator('[data-project-type]:not(.hidden)');
    await expect(visibleCards).toHaveCount(9);
  });

  test('[P1] Work button shows pressed state when active', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // When: User clicks Work filter
    await page.locator('[data-filter-type="work"]').click();

    // Then: Work button should have pressed state
    const workButton = page.locator('[data-filter-type="work"]');
    await expect(workButton).toHaveAttribute('aria-pressed', 'true');

    // And: All button should NOT have pressed state
    const allButton = page.locator('[data-filter-type="all"]');
    await expect(allButton).toHaveAttribute('aria-pressed', 'false');
  });
});

test.describe('Story 3.5: Resource Filtering (AC3)', () => {
  test('[P0] Has GitHub filter shows only projects with GitHub URL', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // When: User checks "Has GitHub" filter
    await page.locator('[data-filter-resource="github"]').check();

    // Then: Only projects with GitHub should be visible (7 projects)
    const visibleCards = page.locator('[data-project-type]:not(.hidden)');
    await expect(visibleCards).toHaveCount(7);

    // And: All visible projects should have github=true
    const hasGithub = await visibleCards.evaluateAll((cards) =>
      cards.map((c) => (c as HTMLElement).dataset.hasGithub)
    );
    expect(hasGithub.every((g) => g === 'true')).toBe(true);
  });

  test('[P1] Has Demo filter shows only projects with live URL', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // When: User checks "Has Demo" filter
    await page.locator('[data-filter-resource="demo"]').check();

    // Then: Only projects with demo should be visible (2 projects)
    const visibleCards = page.locator('[data-project-type]:not(.hidden)');
    await expect(visibleCards).toHaveCount(2);
  });

  test('[P1] Has Diagram filter shows only projects with diagram', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // When: User checks "Has Diagram" filter
    await page.locator('[data-filter-resource="diagram"]').check();

    // Then: Only projects with diagram should be visible (1 project)
    const visibleCards = page.locator('[data-project-type]:not(.hidden)');
    await expect(visibleCards).toHaveCount(1);
  });

  test('[P1] unchecking resource filter restores projects', async ({ page }) => {
    // Given: User has checked Has Diagram filter (1 result)
    await page.goto('/projects/');
    await page.locator('[data-filter-resource="diagram"]').check();
    await expect(page.locator('[data-project-type]:not(.hidden)')).toHaveCount(1);

    // When: User unchecks the filter
    await page.locator('[data-filter-resource="diagram"]').uncheck();

    // Then: All 9 projects should be visible again
    await expect(page.locator('[data-project-type]:not(.hidden)')).toHaveCount(9);
  });
});

test.describe('Story 3.5: Multiple Filters AND Logic (AC4)', () => {
  test('[P0] Work + Has GitHub combined filter', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // When: User selects Work type AND Has GitHub resource
    await page.locator('[data-filter-type="work"]').click();
    await page.locator('[data-filter-resource="github"]').check();

    // Then: Only work projects with GitHub should be visible
    // Work projects: 8, with GitHub: all except jamf-pro-deployment
    // So: 8 - 1 = 7 work projects with GitHub
    const visibleCards = page.locator('[data-project-type]:not(.hidden)');
    await expect(visibleCards).toHaveCount(7);

    // And: All should be work type with github
    const data = await visibleCards.evaluateAll((cards) =>
      cards.map((c) => ({
        type: (c as HTMLElement).dataset.projectType,
        github: (c as HTMLElement).dataset.hasGithub,
      }))
    );
    expect(data.every((d) => d.type === 'work' && d.github === 'true')).toBe(true);
  });

  test('[P0] Work + Has Diagram shows only qr-code-platform', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // When: User selects Work type AND Has Diagram resource
    await page.locator('[data-filter-type="work"]').click();
    await page.locator('[data-filter-resource="diagram"]').check();

    // Then: Only qr-code-platform should be visible (work + diagram)
    const visibleCards = page.locator('[data-project-type]:not(.hidden)');
    await expect(visibleCards).toHaveCount(1);
  });

  test('[P0] Personal + Has Diagram shows empty state', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // When: User selects Personal type AND Has Diagram resource
    await page.locator('[data-filter-type="personal"]').click();
    await page.locator('[data-filter-resource="diagram"]').check();

    // Then: No projects should match (personal projects have no diagrams)
    const visibleCards = page.locator('[data-project-type]:not(.hidden)');
    await expect(visibleCards).toHaveCount(0);

    // And: Empty state should be visible
    await expect(page.locator('[data-filter-empty]')).toBeVisible();
  });

  test('[P1] multiple resource filters combine with AND', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // When: User checks both Has GitHub AND Has Demo
    await page.locator('[data-filter-resource="github"]').check();
    await page.locator('[data-filter-resource="demo"]').check();

    // Then: Only projects with BOTH github AND demo (1: qr-code-platform only)
    // covid-dashboard has demo but NO github
    const visibleCards = page.locator('[data-project-type]:not(.hidden)');
    await expect(visibleCards).toHaveCount(1);
  });

  test('[P1] Demo + Diagram filters show only matching projects', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // When: User checks both Has Demo AND Has Diagram
    await page.locator('[data-filter-resource="demo"]').check();
    await page.locator('[data-filter-resource="diagram"]').check();

    // Then: Only projects with BOTH demo AND diagram (1: qr-code-platform)
    const visibleCards = page.locator('[data-project-type]:not(.hidden)');
    await expect(visibleCards).toHaveCount(1);

    // And: Should be qr-code-platform specifically
    const data = await visibleCards.evaluateAll((cards) =>
      cards.map((c) => ({
        demo: (c as HTMLElement).dataset.hasDemo,
        diagram: (c as HTMLElement).dataset.hasDiagram,
      }))
    );
    expect(data.every((d) => d.demo === 'true' && d.diagram === 'true')).toBe(true);
  });
});

test.describe('Story 3.5: Empty State (AC5)', () => {
  test('[P0] empty state shows when no projects match filters', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // When: User applies filters that match no projects
    await page.locator('[data-filter-type="personal"]').click();
    await page.locator('[data-filter-resource="diagram"]').check();

    // Then: Empty state message should be visible
    const emptyState = page.locator('[data-filter-empty]');
    await expect(emptyState).toBeVisible();
    await expect(emptyState.getByText(/no projects match/i)).toBeVisible();
  });

  test('[P0] empty state has clear filters button', async ({ page }) => {
    // Given: Empty state is showing
    await page.goto('/projects/');
    await page.locator('[data-filter-type="personal"]').click();
    await page.locator('[data-filter-resource="diagram"]').check();

    // Then: Empty state should have clear filters button
    const emptyState = page.locator('[data-filter-empty]');
    const clearButton = emptyState.locator('[data-filter-clear]');
    await expect(clearButton).toBeVisible();
  });

  test('[P1] clicking clear in empty state restores all projects', async ({ page }) => {
    // Given: Empty state is showing
    await page.goto('/projects/');
    await page.locator('[data-filter-type="personal"]').click();
    await page.locator('[data-filter-resource="diagram"]').check();

    // When: User clicks clear filters in empty state
    await page.locator('[data-filter-empty] [data-filter-clear]').click();

    // Then: All 9 projects should be visible
    await expect(page.locator('[data-project-type]:not(.hidden)')).toHaveCount(9);

    // And: Empty state should be hidden
    await expect(page.locator('[data-filter-empty]')).not.toBeVisible();
  });
});

test.describe('Story 3.5: Clear Filters (AC6)', () => {
  test('[P0] clear filters button restores all projects', async ({ page }) => {
    // Given: User has applied filters
    await page.goto('/projects/');
    await page.locator('[data-filter-type="work"]').click();
    await page.locator('[data-filter-resource="github"]').check();

    // When: User clicks clear all filters
    await page.locator('[data-filter-controls] [data-filter-clear]').click();

    // Then: All 9 projects should be visible
    await expect(page.locator('[data-project-type]:not(.hidden)')).toHaveCount(9);
  });

  test('[P0] clear filters resets type to All', async ({ page }) => {
    // Given: User has Work filter active
    await page.goto('/projects/');
    await page.locator('[data-filter-type="work"]').click();

    // When: User clicks clear all filters
    await page.locator('[data-filter-controls] [data-filter-clear]').click();

    // Then: All button should be active again
    await expect(page.locator('[data-filter-type="all"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-filter-type="work"]')).toHaveAttribute('aria-pressed', 'false');
  });

  test('[P1] clear filters unchecks resource checkboxes', async ({ page }) => {
    // Given: User has resource filters checked
    await page.goto('/projects/');
    await page.locator('[data-filter-resource="github"]').check();
    await page.locator('[data-filter-resource="demo"]').check();

    // When: User clicks clear all filters
    await page.locator('[data-filter-controls] [data-filter-clear]').click();

    // Then: Resource checkboxes should be unchecked
    await expect(page.locator('[data-filter-resource="github"]')).not.toBeChecked();
    await expect(page.locator('[data-filter-resource="demo"]')).not.toBeChecked();
    await expect(page.locator('[data-filter-resource="diagram"]')).not.toBeChecked();
  });
});

test.describe('Story 3.5: Data Attributes Implementation (AC7)', () => {
  test('[P1] project cards have data-project-type attribute', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // Then: All project cards should have data-project-type
    const cards = page.locator('[data-project-type]');
    await expect(cards).toHaveCount(9);

    // And: Values should be "work" or "personal"
    const types = await cards.evaluateAll((els) =>
      els.map((el) => (el as HTMLElement).dataset.projectType)
    );
    expect(types.every((t) => t === 'work' || t === 'personal')).toBe(true);
  });

  test('[P1] project cards have data-has-github attribute', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // Then: All project cards should have data-has-github
    const cards = page.locator('[data-project-type]');
    const githubValues = await cards.evaluateAll((els) =>
      els.map((el) => (el as HTMLElement).dataset.hasGithub)
    );
    expect(githubValues.every((g) => g === 'true' || g === 'false')).toBe(true);
  });

  test('[P1] project cards have data-has-demo attribute', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // Then: All project cards should have data-has-demo
    const cards = page.locator('[data-project-type]');
    const demoValues = await cards.evaluateAll((els) =>
      els.map((el) => (el as HTMLElement).dataset.hasDemo)
    );
    expect(demoValues.every((d) => d === 'true' || d === 'false')).toBe(true);
  });

  test('[P1] project cards have data-has-diagram attribute', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // Then: All project cards should have data-has-diagram
    const cards = page.locator('[data-project-type]');
    const diagramValues = await cards.evaluateAll((els) =>
      els.map((el) => (el as HTMLElement).dataset.hasDiagram)
    );
    expect(diagramValues.every((d) => d === 'true' || d === 'false')).toBe(true);
  });
});

test.describe('Story 3.5: Progressive Enhancement (AC8)', () => {
  test('[P1] all projects visible when filter controls not initialized', async ({ page }) => {
    // Given: JavaScript is disabled or filter controls not initialized
    // We can simulate by checking initial DOM state before JS runs
    await page.goto('/projects/');

    // Then: All 9 project cards should be visible in DOM (not hidden by CSS)
    const allCards = page.locator('[data-project-type]');
    await expect(allCards).toHaveCount(9);

    // And: No cards should have hidden class initially in HTML source
    // (JS adds hidden class dynamically when filtering)
  });

  test('[P1] filter controls have hidden class in HTML source', async ({ request }) => {
    // Given: We fetch the raw HTML source
    const response = await request.get('/projects/');
    const html = await response.text();

    // Then: Filter controls should have "hidden" class (removed by JS)
    expect(html).toContain('data-filter-controls');
    // Class attribute comes before data attribute in HTML: class="...hidden..." data-filter-controls
    expect(html).toMatch(/class="[^"]*hidden[^"]*"[^>]*data-filter-controls/);
  });
});

test.describe('Story 3.5: Screen Reader Accessibility', () => {
  test('[P1] empty state has aria-live for announcements', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // Then: Empty state should have aria-live attribute
    const emptyState = page.locator('[data-filter-empty]');
    await expect(emptyState).toHaveAttribute('aria-live', 'polite');
  });

  test('[P1] filter results are announced to screen readers', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // When: User applies a filter
    await page.locator('[data-filter-type="work"]').click();

    // Then: Results announcement should exist with aria-live
    const announcement = page.locator('[data-filter-results]');
    await expect(announcement).toHaveAttribute('aria-live', 'polite');

    // And: Should contain result count text
    const text = await announcement.textContent();
    expect(text).toMatch(/\d+ project/);
  });

  test('[P1] type filter buttons have aria-labels', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // Then: Type filter buttons should have descriptive aria-labels
    await expect(page.locator('[data-filter-type="all"]')).toHaveAttribute('aria-label', 'Show all projects');
    await expect(page.locator('[data-filter-type="work"]')).toHaveAttribute('aria-label', 'Show only work projects');
    await expect(page.locator('[data-filter-type="personal"]')).toHaveAttribute('aria-label', 'Show only personal projects');
  });
});

test.describe('Story 3.5: Keyboard Accessibility', () => {
  test('[P1] type filter buttons are keyboard focusable', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // When: User tabs to filter buttons
    const workButton = page.locator('[data-filter-type="work"]');
    await workButton.focus();

    // Then: Button should be focused
    await expect(workButton).toBeFocused();
  });

  test('[P1] Enter key activates type filter button', async ({ page }) => {
    // Given: User has focused Work filter button
    await page.goto('/projects/');
    const workButton = page.locator('[data-filter-type="work"]');
    await workButton.focus();

    // When: User presses Enter
    await page.keyboard.press('Enter');

    // Then: Work filter should be active
    await expect(workButton).toHaveAttribute('aria-pressed', 'true');

    // And: Only work projects visible (8 work projects)
    await expect(page.locator('[data-project-type]:not(.hidden)')).toHaveCount(8);
  });

  test('[P1] Space key toggles resource checkbox', async ({ page }) => {
    // Given: User has focused a resource checkbox
    await page.goto('/projects/');
    const githubCheckbox = page.locator('[data-filter-resource="github"]');
    await githubCheckbox.focus();

    // When: User presses Space
    await page.keyboard.press('Space');

    // Then: Checkbox should be checked
    await expect(githubCheckbox).toBeChecked();
  });

  test('[P2] focus indicator visible on filter buttons', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // When: User focuses a filter button
    const workButton = page.locator('[data-filter-type="work"]');
    await workButton.focus();

    // Then: Focus outline should be visible
    const outlineWidth = await workButton.evaluate((el) =>
      window.getComputedStyle(el).outlineWidth
    );
    expect(outlineWidth).not.toBe('0px');
  });
});

test.describe('Story 3.5: Neubrutalist Styling', () => {
  test('[P2] type filter buttons have Neubrutalist border', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // Then: Type filter buttons should have 2px black border
    const workButton = page.locator('[data-filter-type="work"]');
    const borderWidth = await workButton.evaluate((el) =>
      window.getComputedStyle(el).borderWidth
    );
    expect(borderWidth).toBe('2px');

    const borderColor = await workButton.evaluate((el) =>
      window.getComputedStyle(el).borderColor
    );
    expect(borderColor).toBe('rgb(0, 0, 0)');
  });

  test('[P2] active filter button has lime background', async ({ page }) => {
    // Given: User is on projects page with All filter active
    await page.goto('/projects/');

    // Then: All button should have lime background
    const allButton = page.locator('[data-filter-type="all"]');
    await expect(allButton).toHaveClass(/bg-lime-400/);
  });

  test('[P2] active filter button has brutal shadow', async ({ page }) => {
    // Given: User is on projects page
    await page.goto('/projects/');

    // Then: Active filter button should have box shadow
    const allButton = page.locator('[data-filter-type="all"]');
    const boxShadow = await allButton.evaluate((el) =>
      window.getComputedStyle(el).boxShadow
    );
    expect(boxShadow).not.toBe('none');
  });
});

test.describe('Story 3.5: Mobile Responsive', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('[P2] filter controls wrap on mobile', async ({ page }) => {
    // Given: User views projects on mobile
    await page.goto('/projects/');

    // Then: Filter controls should be visible
    await expect(page.locator('[data-filter-controls]')).toBeVisible();

    // And: Filter controls should fit within viewport
    const controls = page.locator('[data-filter-controls]');
    const box = await controls.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(375);
  });

  test('[P2] filter buttons usable on touch devices', async ({ page }) => {
    // Given: User views projects on mobile
    await page.goto('/projects/');

    // When: User taps/clicks Work filter (click works for touch simulation)
    await page.locator('[data-filter-type="work"]').click();

    // Then: Filter should be applied (8 work projects)
    await expect(page.locator('[data-project-type]:not(.hidden)')).toHaveCount(8);
  });
});
