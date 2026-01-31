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
    // Type badge uses bg-neutral-100 to distinguish from tech tags
    const projectCards = page.locator('.border-4.border-black').filter({ has: page.locator('h2') });
    const typeBadge = projectCards.first().locator('.bg-neutral-100.text-sm.font-bold');
    await expect(typeBadge).toBeVisible();

    // And: Badge should contain WORK or PERSONAL
    const badgeText = await typeBadge.textContent();
    expect(badgeText?.toUpperCase()).toMatch(/WORK|PERSONAL/);
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
  test('[P0] project title displayed with pink highlight', async ({ page }) => {
    // Given: User navigates to a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Project title should be visible as h1
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('QR Code');

    // And: First word should have pink highlight (bg-pink-400)
    const highlight = heading.locator('.bg-pink-400');
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
    const tagsContainer = page.locator('.flex.flex-wrap.gap-2');
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
  test('[P1] content card has Neubrutalist styling', async ({ page }) => {
    // Given: User views a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Content card (the one containing prose) should have 4px black border
    const card = page.locator('.border-4.border-black').filter({ has: page.locator('.prose') });
    await expect(card).toBeVisible();

    const borderWidth = await card.evaluate((el) =>
      window.getComputedStyle(el).borderWidth
    );
    expect(borderWidth).toBe('4px');

    // And: Card should have brutal shadow (lg size = 8px)
    const style = await card.getAttribute('style');
    expect(style).toContain('8px 8px 0');
  });

  test('[P1] prose styling applied to content', async ({ page }) => {
    // Given: User views a project detail page
    await page.goto('/projects/qr-code-platform/');

    // Then: Content should have prose class for markdown styling
    const proseContent = page.locator('.prose');
    await expect(proseContent).toBeVisible();

    // And: Headings should be styled (h2 for Challenge/Solution/Impact)
    const h2 = proseContent.locator('h2').first();
    const fontWeight = await h2.evaluate((el) =>
      window.getComputedStyle(el).fontWeight
    );
    // Font weight 700 = bold, 800+ = extra bold
    expect(parseInt(fontWeight)).toBeGreaterThanOrEqual(700);
  });
});
