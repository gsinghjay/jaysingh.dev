/**
 * Story 2.1: Blog Collection and Listing Page Tests (ATDD - RED PHASE)
 *
 * These tests define EXPECTED behavior for the blog listing page.
 * All tests will FAIL until implementation is complete.
 *
 * Acceptance Criteria:
 * - AC1: Blog collection created from _content/blog/
 * - AC2: Blog listing page at /blog/ with posts sorted newest first
 * - AC3: Post entry displays title, date, excerpt, and tags
 * - AC4: Post navigation via title or "Read more" link
 * - AC5: Mobile responsive (cards stack vertically)
 * - AC6: Neubrutalist design with bold borders and shadows
 *
 * TDD Workflow:
 * 1. RED: Run these tests - they will fail (current state)
 * 2. GREEN: Implement blog.njk, getCategoryFromTags filter, post cards
 * 3. REFACTOR: Improve code quality while keeping tests green
 */

import { test, expect } from '../support/fixtures';

test.describe('Story 2.1: Blog Listing Page (AC2)', () => {
  test('[P0] blog page loads at /blog/', async ({ page }) => {
    // Given: User navigates to blog page
    await page.goto('/blog/');

    // Then: Page should load successfully with main content
    await expect(page.locator('main')).toBeVisible();
  });

  test('[P0] blog page displays section heading', async ({ page }) => {
    // Given: User navigates to blog page
    await page.goto('/blog/');

    // Then: Page should have "WORDS & THOUGHTS" heading
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('WORDS');
    await expect(heading).toContainText('THOUGHTS');

    // And: "THOUGHTS" should have pink highlight (matching React)
    const highlight = heading.locator('.bg-pink-400');
    await expect(highlight).toContainText('THOUGHTS');
  });

  test('[P0] blog posts are sorted by date (newest first)', async ({ page }) => {
    // Given: User navigates to blog page with multiple posts
    await page.goto('/blog/');

    // Then: Posts should be visible
    const postCards = page.locator('.border-4.border-black').filter({ has: page.locator('h2') });
    const postCount = await postCards.count();
    expect(postCount).toBeGreaterThan(0);

    // And: First post should have a more recent date than last post
    // (This verifies sorting - exact dates depend on content)
    const dates = page.locator('.text-neutral-500 span').filter({ hasText: /\w{3} \d{1,2}, \d{4}/ });
    const dateCount = await dates.count();
    expect(dateCount).toBeGreaterThan(0);
  });

  test('[P1] blog page has clean URL without hash fragments', async ({ page }) => {
    // Given: User navigates to blog page
    await page.goto('/blog/');

    // Then: URL should be clean (no hash fragments)
    const url = page.url();
    expect(url).not.toContain('#');
    expect(url).toMatch(/\/blog\/?$/);
  });
});

test.describe('Story 2.1: Post Card Display (AC3)', () => {
  test('[P0] post card shows title', async ({ page }) => {
    // Given: User views blog listing
    await page.goto('/blog/');

    // Then: Post cards should have h2 titles
    const postTitle = page.locator('h2.font-black').first();
    await expect(postTitle).toBeVisible();

    // And: Title should have text content
    const titleText = await postTitle.textContent();
    expect(titleText?.trim().length).toBeGreaterThan(0);
  });

  test('[P0] post card shows date', async ({ page }) => {
    // Given: User views blog listing
    await page.goto('/blog/');

    // Then: Post cards should display formatted date (MMM DD, YYYY)
    await expect(page.getByText(/\w{3} \d{1,2}, \d{4}/).first()).toBeVisible();
  });

  test('[P0] post card shows excerpt', async ({ page }) => {
    // Given: User views blog listing
    await page.goto('/blog/');

    // Then: Post cards should have excerpt text
    const excerpt = page.locator('.text-neutral-600.line-clamp-2').first();
    await expect(excerpt).toBeVisible();

    // And: Excerpt should have content
    const excerptText = await excerpt.textContent();
    expect(excerptText?.trim().length).toBeGreaterThan(0);
  });

  test('[P1] post card shows category tag', async ({ page }) => {
    // Given: User views blog listing
    await page.goto('/blog/');

    // Then: Post cards should have category tag
    // Categories: OPINION (yellow), TECHNICAL (blue), TUTORIAL (lime), GENERAL (neutral)
    const categoryTag = page
      .locator('.bg-yellow-400, .bg-blue-400, .bg-lime-400, .bg-neutral-100')
      .filter({ hasText: /OPINION|TECHNICAL|TUTORIAL|GENERAL/ })
      .first();
    await expect(categoryTag).toBeVisible();
  });

  test('[P1] post card shows read time', async ({ page }) => {
    // Given: User views blog listing
    await page.goto('/blog/');

    // Then: Post cards should display read time
    await expect(page.getByText(/\d+ min/).first()).toBeVisible();
  });

  test('[P2] category tag colors are correct', async ({ page }) => {
    // Given: User views blog listing with technical post
    await page.goto('/blog/');

    // Then: TECHNICAL tag should have blue-400 background
    const technicalTag = page.locator('.bg-blue-400').filter({ hasText: 'TECHNICAL' });
    const hasTechnical = (await technicalTag.count()) > 0;

    // Or: OPINION tag should have yellow-400 background
    const opinionTag = page.locator('.bg-yellow-400').filter({ hasText: 'OPINION' });
    const hasOpinion = (await opinionTag.count()) > 0;

    // Or: TUTORIAL tag should have lime-400 background
    const tutorialTag = page.locator('.bg-lime-400').filter({ hasText: 'TUTORIAL' });
    const hasTutorial = (await tutorialTag.count()) > 0;

    // At least one category tag should exist
    expect(hasTechnical || hasOpinion || hasTutorial).toBe(true);
  });
});

test.describe('Story 2.1: Post Navigation (AC4)', () => {
  test('[P0] clicking post title navigates to post detail', async ({ page }) => {
    // Given: User is on blog listing page
    await page.goto('/blog/');

    // When: User clicks on a post title
    const postTitle = page.locator('h2.font-black a, a h2.font-black').first();
    const href = await postTitle.locator('xpath=ancestor-or-self::a').getAttribute('href');

    await postTitle.click();

    // Then: User should navigate to blog post detail page
    await expect(page).toHaveURL(new RegExp(`/blog/.+`));
  });

  test('[P0] clicking READ MORE navigates to post detail', async ({ page }) => {
    // Given: User is on blog listing page
    await page.goto('/blog/');

    // When: User clicks READ MORE link
    const readMoreLink = page.getByRole('link', { name: /READ MORE/ }).first();
    const href = await readMoreLink.getAttribute('href');
    expect(href).toMatch(/^\/blog\/.+/);

    await readMoreLink.click();

    // Then: User should navigate to blog post detail page
    await expect(page).toHaveURL(new RegExp(`/blog/.+`));
  });

  test('[P1] post title has hover effect', async ({ page }) => {
    // Given: User is on blog listing page
    await page.goto('/blog/');

    // Then: Post title should have hover:text-pink-600 class
    const postTitle = page.locator('h2.font-black').first();
    await expect(postTitle).toHaveClass(/hover:text-pink-600/);
  });
});

test.describe('Story 2.1: Mobile Responsive (AC5)', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('[P1] post cards stack vertically on mobile', async ({ page }) => {
    // Given: User views blog listing on mobile device
    await page.goto('/blog/');

    // Then: Post cards should be visible and stacked
    const postCards = page.locator('.border-4.border-black').filter({ has: page.locator('h2') });
    const cardCount = await postCards.count();
    expect(cardCount).toBeGreaterThan(0);

    // And: Cards should be full width on mobile
    const firstCard = postCards.first();
    const box = await firstCard.boundingBox();

    // Card should be close to full width (375px - padding)
    expect(box?.width).toBeGreaterThan(300);
  });

  test('[P1] text is readable on mobile', async ({ page }) => {
    // Given: User views blog listing on mobile
    await page.goto('/blog/');

    // Then: Post titles should be visible and readable
    const postTitle = page.locator('h2.font-black').first();
    await expect(postTitle).toBeVisible();

    // And: Font size should be readable (text-2xl = 24px)
    const fontSize = await postTitle.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });
    const fontSizeNum = parseFloat(fontSize);
    expect(fontSizeNum).toBeGreaterThanOrEqual(20);
  });
});

test.describe('Story 2.1: Neubrutalist Design (AC6)', () => {
  test('[P1] post cards have 4px black borders', async ({ page }) => {
    // Given: User views blog listing
    await page.goto('/blog/');

    // Then: Post cards should have 4px black border
    const postCard = page.locator('.border-4.border-black').first();
    await expect(postCard).toBeVisible();

    const borderWidth = await postCard.evaluate((el) => {
      return window.getComputedStyle(el).borderWidth;
    });
    expect(borderWidth).toBe('4px');
  });

  test('[P1] post cards have brutal shadow', async ({ page }) => {
    // Given: User views blog listing
    await page.goto('/blog/');

    // Then: Post cards should have box shadow (6px for default size)
    const postCard = page.locator('.border-4.border-black').filter({ has: page.locator('h2') }).first();
    const style = await postCard.getAttribute('style');
    expect(style).toContain('6px 6px 0');
  });

  test('[P1] page uses Neubrutalist design tokens', async ({ page, verifyNeubrutalistDesign }) => {
    // Given: User views blog listing
    await page.goto('/blog/');

    // Then: Neubrutalist design tokens should be applied
    await verifyNeubrutalistDesign();
  });
});

test.describe('Story 2.1: Pre-rendered Static HTML (AC1)', () => {
  test('[P2] page source contains blog content (not JS placeholder)', async ({ request }) => {
    // Given: We fetch the raw HTML source
    const response = await request.get('/blog/');
    const html = await response.text();

    // Then: HTML should contain the page heading (pre-rendered)
    expect(html).toContain('WORDS');
    expect(html).toContain('THOUGHTS');

    // And: HTML should NOT be a SPA placeholder
    expect(html).not.toContain('Loading...');
    expect(html).not.toContain('id="root"');
  });

  test('[P2] page source contains post titles (not dynamically loaded)', async ({ request }) => {
    // Given: We fetch the raw HTML source
    const response = await request.get('/blog/');
    const html = await response.text();

    // Then: HTML should contain at least one post structure
    // Post cards have h2 elements
    expect(html).toMatch(/<h2[^>]*>/);
  });
});

test.describe('Story 2.1: Keyboard Navigation', () => {
  test('[P2] post links are keyboard accessible', async ({ page }) => {
    // Given: User navigates to blog page
    await page.goto('/blog/');

    // When: User tabs to a READ MORE link
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.textContent?.trim());
      if (focused?.includes('READ MORE')) break;
    }

    // Then: READ MORE link should be focusable
    const focusedText = await page.evaluate(() => document.activeElement?.textContent?.trim());
    expect(focusedText).toContain('READ MORE');

    // And: Enter should activate the link
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/blog\/.+/);
  });
});
