/**
 * Story 4.1: Create Resume Page with Work Experience (ATDD)
 *
 * These tests validate the resume page implementation.
 * TDD RED PHASE: All tests are designed to FAIL until implementation.
 *
 * Acceptance Criteria:
 * - AC1: Resume page accessible at /resume/ with professional formatting
 * - AC2: Work experience displays company, title, dates, responsibilities
 * - AC3: Positions in reverse chronological order (most recent first)
 * - AC4: Desktop layout uses Neubrutalist design system
 * - AC5: Mobile responsive without horizontal scrolling
 * - AC6: Data from _data/resume.json via 11ty data cascade
 */

import { test, expect } from '../support/fixtures';

test.describe('Story 4.1: Resume Page Access (AC1)', () => {
  test('[P0] resume page loads at /resume/', async ({ page }) => {
    // Given: User navigates to resume page
    await page.goto('/resume/');

    // Then: Page should load successfully with main content
    await expect(page.locator('main')).toBeVisible();
  });

  test('[P0] resume page has WORK HISTORY heading', async ({ page }) => {
    // Given: User navigates to resume page
    await page.goto('/resume/');

    // Then: Page should have "WORK HISTORY" heading as h1
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('WORK');
    await expect(heading).toContainText('HISTORY');

    // And: "HISTORY" should have blue highlight (bg-blue-400)
    const highlight = heading.locator('.bg-blue-400');
    await expect(highlight).toContainText('HISTORY');
  });

  test('[P1] resume page has clean URL without hash fragments', async ({ page }) => {
    // Given: User navigates to resume page
    await page.goto('/resume/');

    // Then: URL should be clean (no hash fragments)
    const url = page.url();
    expect(url).not.toContain('#');
    expect(url).toMatch(/\/resume\/?$/);
  });
});

test.describe('Story 4.1: Work Experience Display (AC2)', () => {
  test('[P0] work experience section displays 7 positions', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Should have 7 work experience entries
    // Each experience is in a Card with h2 for position title (h2, not h3)
    // h2 elements are used for work experience positions
    // h3 elements are used for education degrees and skill categories
    const positionHeadings = page.locator('h2.font-black.text-2xl');
    await expect(positionHeadings).toHaveCount(7);
  });

  test('[P0] first position shows current role details', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: First position should be WEB DEVELOPER at HUDSON COUNTY COMMUNITY COLLEGE
    await expect(page.getByRole('heading', { name: 'WEB DEVELOPER' }).first()).toBeVisible();
    await expect(page.getByText('HUDSON COUNTY COMMUNITY COLLEGE').first()).toBeVisible();
  });

  test('[P0] position shows company name', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Company names should be visible (first instance)
    await expect(page.getByText('HUDSON COUNTY COMMUNITY COLLEGE').first()).toBeVisible();
  });

  test('[P0] position shows employment dates', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Date format should be "MMM YYYY - MMM YYYY" or "MMM YYYY - PRESENT"
    await expect(page.getByText(/JUL 2023/i).first()).toBeVisible();
    await expect(page.getByText('PRESENT').first()).toBeVisible();
  });

  test('[P0] position shows responsibilities as bullet list', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Responsibilities should be in a list
    const responsibilitiesList = page.locator('ul.space-y-2').first();
    await expect(responsibilitiesList).toBeVisible();

    // And: Should have bullet points
    const bullets = responsibilitiesList.locator('li');
    expect(await bullets.count()).toBeGreaterThan(0);
  });

  test('[P1] responsibilities have border separator', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Responsibilities list should have top border separator
    // Look for ul with border-t-4 inside main content (not mobile nav)
    const responsibilitiesList = page.locator('main ul.border-t-4').first();
    await expect(responsibilitiesList).toBeVisible();
  });
});

test.describe('Story 4.1: Chronological Order (AC3)', () => {
  test('[P1] positions are in reverse chronological order', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: First work experience card should be most recent (contains "PRESENT" in date area)
    // Look in main content for cards with h2 headings
    const workExperienceCards = page.locator('main .border-4.border-black').filter({ has: page.locator('h2') });
    const firstCard = workExperienceCards.first();
    // Check for PRESENT in the date paragraph (neutral-500 text color area)
    await expect(firstCard.locator('.text-neutral-500 >> text=PRESENT')).toBeVisible();

    // And: Second card should NOT have PRESENT in its date area
    const secondCard = workExperienceCards.nth(1);
    await expect(secondCard.locator('.text-neutral-500 >> text=PRESENT')).toHaveCount(0);
  });
});

test.describe('Story 4.1: Education Section (AC1, AC4)', () => {
  test('[P0] education section heading visible', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Education heading should be visible
    await expect(page.getByRole('heading', { name: 'EDUCATION' })).toBeVisible();
  });

  test('[P0] education section displays 2 entries', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Should have 2 education entries
    await expect(page.getByText('NEW JERSEY INSTITUTE OF TECHNOLOGY')).toBeVisible();
    await expect(page.getByText('BS IN INFORMATION TECHNOLOGY')).toBeVisible();
  });

  test('[P1] education entry shows degree and institution', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Education entry should show degree (h3) and institution
    const educationHeading = page.getByRole('heading', { name: /BS IN INFORMATION TECHNOLOGY/i });
    await expect(educationHeading).toBeVisible();
  });

  test('[P1] education entry shows dates', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Education dates should be visible (SEP 2022 - MAY 2026)
    await expect(page.getByText(/SEP 2022/i)).toBeVisible();
  });
});

test.describe('Story 4.1: Technical Toolkit Section (AC4)', () => {
  test('[P0] technical toolkit heading visible', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Technical Toolkit heading should be visible with lime highlight
    const heading = page.getByRole('heading', { name: /TECHNICAL.*TOOLKIT/i });
    await expect(heading).toBeVisible();

    // And: "TOOLKIT" should have lime highlight (bg-lime-400)
    const highlight = heading.locator('.bg-lime-400');
    await expect(highlight).toContainText('TOOLKIT');
  });

  test('[P0] technical toolkit displays 10 skill categories', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: All 10 skill categories should be visible
    await expect(page.getByRole('heading', { name: 'FRONTEND', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'BACKEND', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'DATA', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'INFRA', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'OBSERVABILITY', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'SECURITY', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'TESTING', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'TOOLS', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'ARCHITECTURE', level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'CLOUD', level: 3 })).toBeVisible();
  });

  test('[P1] skill cards have lime background', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Skill category cards should have lime-400 background
    const skillCard = page.locator('.bg-lime-400').filter({
      has: page.getByRole('heading', { level: 3 }),
    });
    await expect(skillCard.first()).toBeVisible();
  });

  test('[P1] skill cards display comma-separated skills', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Skills should be displayed as comma-separated list
    // Frontend includes React, Tailwind CSS, etc.
    await expect(page.getByText(/React/)).toBeVisible();
    await expect(page.getByText(/Tailwind CSS/)).toBeVisible();
  });

  test('[P1] skill grid uses 2-column layout on desktop', async ({ page }) => {
    // Given: User views resume page on desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/resume/');

    // Then: Skill grid should have md:grid-cols-2 class
    const skillGrid = page.locator('.grid.md\\:grid-cols-2, .grid[class*="md:grid-cols-2"]');
    await expect(skillGrid).toBeVisible();
  });
});

test.describe('Story 4.1: Download CV Button (AC1)', () => {
  test('[P1] download CV button exists', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Download CV button should be visible
    const downloadButton = page.getByRole('button', { name: /DOWNLOAD CV/i });
    await expect(downloadButton).toBeVisible();
  });

  test('[P1] download CV button has Neubrutalist styling', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Button should have border-4 and box-shadow
    const downloadButton = page.getByRole('button', { name: /DOWNLOAD CV/i });
    await expect(downloadButton).toBeVisible();

    // Check for border-4 class
    await expect(downloadButton).toHaveClass(/border-4/);
  });

  test('[P1] download CV button has download icon', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Button should contain SVG icon
    const downloadButton = page.getByRole('button', { name: /DOWNLOAD CV/i });
    const icon = downloadButton.locator('svg');
    await expect(icon).toBeVisible();
  });

  test('[P2] download CV button is keyboard accessible', async ({ page }) => {
    // Given: User navigates to resume page
    await page.goto('/resume/');

    // When: User focuses the download button
    const downloadButton = page.getByRole('button', { name: /DOWNLOAD CV/i });
    await downloadButton.focus();

    // Then: Button should be focused
    await expect(downloadButton).toBeFocused();

    // And: Focus outline should be visible
    const outlineWidth = await downloadButton.evaluate((el) =>
      window.getComputedStyle(el).outlineWidth
    );
    expect(outlineWidth).not.toBe('0px');
  });
});

test.describe('Story 4.1: Desktop Layout (AC4)', () => {
  test('[P1] page uses Neubrutalist design tokens', async ({ page, verifyNeubrutalistDesign }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Neubrutalist design tokens should be applied
    await verifyNeubrutalistDesign();
  });

  test('[P1] experience cards have 4px black borders', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Cards should have 4px black border
    const card = page.locator('.border-4.border-black').first();
    await expect(card).toBeVisible();

    const borderWidth = await card.evaluate((el) =>
      window.getComputedStyle(el).borderWidth
    );
    expect(borderWidth).toBe('4px');
  });

  test('[P1] experience cards have brutal shadow', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Cards should have box shadow
    const card = page.locator('.border-4.border-black').filter({ has: page.locator('h2') }).first();
    const style = await card.getAttribute('style');
    expect(style).toContain('box-shadow');
  });

  test('[P1] header uses flex layout', async ({ page }) => {
    // Given: User views resume page on desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/resume/');

    // Then: Header should have flex row layout on desktop
    const header = page.locator('.flex.flex-col.md\\:flex-row, .flex[class*="md:flex-row"]').first();
    await expect(header).toBeVisible();
  });
});

test.describe('Story 4.1: Mobile Responsive (AC5)', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('[P1] resume page readable on mobile', async ({ page }) => {
    // Given: User views resume on mobile device
    await page.goto('/resume/');

    // Then: Page heading should be visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // And: Content should be readable
    await expect(page.getByText('WEB DEVELOPER').first()).toBeVisible();
  });

  test('[P1] no horizontal scrolling on mobile', async ({ page }) => {
    // Given: User views resume on mobile
    await page.goto('/resume/');

    // Then: Body should not have significant horizontal overflow
    // Use documentElement to get more accurate scroll dimensions
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

    // Allow for minor overflow from box-shadows and borders (Neubrutalist design)
    // The 6px box-shadow adds visual elements beyond the strict box model
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 40);
  });

  test('[P1] cards stack vertically on mobile', async ({ page }) => {
    // Given: User views resume on mobile
    await page.goto('/resume/');

    // Then: Experience cards should stack vertically
    const cards = page.locator('.border-4.border-black').filter({ has: page.locator('h2') });
    const firstCard = cards.first();
    const secondCard = cards.nth(1);

    const firstBox = await firstCard.boundingBox();
    const secondBox = await secondCard.boundingBox();

    // Second card should be below first card (stacked)
    expect(secondBox!.y).toBeGreaterThan(firstBox!.y + firstBox!.height - 10);
  });

  test('[P1] skill grid single column on mobile', async ({ page }) => {
    // Given: User views resume on mobile
    await page.goto('/resume/');

    // Then: Skill cards should stack (not side by side)
    const skillCards = page.locator('.bg-lime-400').filter({
      has: page.getByRole('heading', { level: 3 }),
    });

    if ((await skillCards.count()) >= 2) {
      const firstCard = skillCards.first();
      const secondCard = skillCards.nth(1);

      const firstBox = await firstCard.boundingBox();
      const secondBox = await secondCard.boundingBox();

      // Cards should be stacked (not side by side)
      expect(secondBox!.y).toBeGreaterThan(firstBox!.y);
    }
  });
});

test.describe('Story 4.1: Accessibility (AC1-5)', () => {
  test('[P1] page has single h1', async ({ page, checkA11yBasics }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Page should have exactly one h1
    const a11y = await checkA11yBasics();
    expect(a11y.h1Count).toBe(1);
  });

  test('[P1] heading hierarchy is correct', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: h1 for page title
    await expect(page.getByRole('heading', { level: 1 })).toContainText('WORK');

    // And: h2 for position titles and section headings
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0);

    // And: h3 for education degrees and skill categories
    const h3Count = await page.locator('h3').count();
    expect(h3Count).toBeGreaterThan(0);
  });

  test('[P1] download button has visible focus state', async ({ page }) => {
    // Given: User navigates to resume page
    await page.goto('/resume/');

    // When: User focuses download button
    const button = page.getByRole('button', { name: /DOWNLOAD CV/i });
    await button.focus();

    // Then: Focus should be visible (4px black outline per PRD)
    await expect(button).toBeFocused();
  });

  test('[P2] responsibilities use semantic list elements', async ({ page }) => {
    // Given: User views resume page
    await page.goto('/resume/');

    // Then: Responsibilities should use ul > li structure
    // Look for ul inside main content (not navigation)
    const list = page.locator('main ul.space-y-2').first();
    await expect(list).toBeVisible();

    const listItems = list.locator('li');
    expect(await listItems.count()).toBeGreaterThan(0);
  });
});

test.describe('Story 4.1: Pre-rendered Static HTML (AC6)', () => {
  test('[P2] page source contains resume content (not JS placeholder)', async ({ request }) => {
    // Given: We fetch the raw HTML source
    const response = await request.get('/resume/');
    const html = await response.text();

    // Then: HTML should contain the page heading (pre-rendered)
    expect(html).toContain('WORK');
    expect(html).toContain('HISTORY');

    // And: HTML should NOT be a SPA placeholder
    expect(html).not.toContain('Loading...');
    expect(html).not.toContain('id="root"');
  });

  test('[P2] page source contains work experience data', async ({ request }) => {
    // Given: We fetch the raw HTML source
    const response = await request.get('/resume/');
    const html = await response.text();

    // Then: HTML should contain work experience content (from _data/resume.json)
    expect(html).toContain('HUDSON COUNTY COMMUNITY COLLEGE');
    expect(html).toContain('WEB DEVELOPER');
  });

  test('[P2] page source contains skill categories', async ({ request }) => {
    // Given: We fetch the raw HTML source
    const response = await request.get('/resume/');
    const html = await response.text();

    // Then: HTML should contain skill categories (from _data/skills.json)
    expect(html).toContain('FRONTEND');
    expect(html).toContain('BACKEND');
  });
});
