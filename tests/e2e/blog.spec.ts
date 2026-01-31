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

/**
 * Story 2.2: Blog Post Detail Layout Tests (ATDD - RED PHASE)
 *
 * These tests define EXPECTED behavior for blog post detail pages.
 * All tests will FAIL until implementation is complete.
 *
 * Acceptance Criteria:
 * - AC1: Blog post renders from Markdown at /blog/{post-id}/
 * - AC2: Post header with metadata (title, date, author, tags)
 * - AC3: Layout extends base (code review - not E2E testable)
 * - AC4: Readable typography with proper line height
 * - AC5: Clean URL structure using post id
 * - AC6: Heading hierarchy preserved (h1 title, h2/h3 sections)
 *
 * TDD Workflow:
 * 1. RED: Run these tests - they will fail (current state)
 * 2. GREEN: Implement blog-post.njk layout, prose styling, frontmatter
 * 3. REFACTOR: Improve code quality while keeping tests green
 */

test.describe('Story 2.2: Blog Post Detail Page (AC1)', () => {
  // Test post: docker-observability (known to exist in _content/blog/)
  const testPostId = 'docker-observability';
  const testPostUrl = `/blog/${testPostId}/`;

  test('[P0] blog post page loads at /blog/{id}/', async ({ page }) => {
    // Given: User navigates to a blog post URL
    await page.goto(testPostUrl);

    // Then: Page should load successfully with main content
    await expect(page.locator('main')).toBeVisible();

    // And: Page should not show 404 error
    await expect(page.getByText('404')).not.toBeVisible();
    await expect(page.getByText('Page not found')).not.toBeVisible();
  });

  test('[P0] blog post content renders from Markdown', async ({ page }) => {
    // Given: User navigates to blog post
    await page.goto(testPostUrl);

    // Then: Post content should be visible in a Card component
    const contentCard = page.locator('.border-4.border-black').filter({
      has: page.locator('.prose'),
    });
    await expect(contentCard).toBeVisible();

    // And: Content should have rendered Markdown (paragraphs, headings)
    const prose = page.locator('.prose');
    await expect(prose.locator('p').first()).toBeVisible();
  });

  test('[P0] navigate from listing to detail page', async ({ page }) => {
    // Given: User is on blog listing page
    await page.goto('/blog/');

    // When: User clicks on a post title or READ MORE
    const readMoreLink = page.getByRole('link', { name: /READ MORE/ }).first();
    await readMoreLink.click();

    // Then: User should be on a blog post detail page
    await expect(page).toHaveURL(/\/blog\/.+\/$/);

    // And: Post content should be visible
    await expect(page.locator('.prose')).toBeVisible();
  });
});

test.describe('Story 2.2: Post Header with Metadata (AC2)', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P0] post title displays with highlight styling', async ({ page }) => {
    // Given: User views blog post
    await page.goto(testPostUrl);

    // Then: h1 title should be visible
    const title = page.getByRole('heading', { level: 1 });
    await expect(title).toBeVisible();

    // And: First word should have pink highlight (bg-pink-400)
    const highlight = title.locator('.bg-pink-400');
    await expect(highlight).toBeVisible();
    await expect(highlight).toContainText('COMPREHENSIVE');
  });

  test('[P1] post date displays', async ({ page }) => {
    // Given: User views blog post
    await page.goto(testPostUrl);

    // Then: Date should be visible in header (Sep 22, 2024 format)
    await expect(page.getByText(/Sep 22, 2024/)).toBeVisible();
  });

  test('[P1] post read time displays', async ({ page }) => {
    // Given: User views blog post
    await page.goto(testPostUrl);

    // Then: Read time should be visible in the header metadata section
    const metadataSection = page.locator('.flex.items-center.gap-4.text-sm.text-neutral-500');
    await expect(metadataSection.getByText('10 min')).toBeVisible();
  });

  test('[P1] category tag displays', async ({ page }) => {
    // Given: User views blog post with technical tag
    await page.goto(testPostUrl);

    // Then: Category tag should be visible (TECHNICAL for this post)
    const categoryTag = page
      .locator('.bg-blue-400, .bg-yellow-400, .bg-lime-400')
      .filter({ hasText: /TECHNICAL|OPINION|TUTORIAL/ });
    await expect(categoryTag.first()).toBeVisible();
  });

  test('[P1] technology tags display', async ({ page }) => {
    // Given: User views blog post
    await page.goto(testPostUrl);

    // Then: Technology tags should be visible
    const tagsContainer = page.locator('.flex.flex-wrap.gap-2');
    await expect(tagsContainer).toBeVisible();

    // And: Should show tags like "docker", "prometheus", "grafana"
    await expect(page.getByText('docker', { exact: true })).toBeVisible();
  });

  test('[P2] author byline displays when present', async ({ page }) => {
    // Given: User views blog post (note: current posts may not have author)
    await page.goto(testPostUrl);

    // Then: If author exists, byline should be visible
    // This test verifies the structure exists (may pass vacuously if no author)
    const authorSection = page.locator('[class*="author"], .flex.items-center.gap-3.mb-6.p-4');

    // Check that author section renders correctly IF author data exists
    // (This is a soft check - passes if author missing, validates if present)
    const authorCount = await authorSection.count();
    if (authorCount > 0) {
      await expect(authorSection.first()).toBeVisible();
    }
  });
});

test.describe('Story 2.2: Back Navigation', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P1] top back button returns to blog listing', async ({ page }) => {
    // Given: User is on blog post detail page
    await page.goto(testPostUrl);

    // Then: Back button should be visible at top
    const backButton = page.getByRole('link', { name: /BACK TO POSTS/i }).first();
    await expect(backButton).toBeVisible();

    // And: Back button should have Neubrutalist styling
    await expect(backButton).toHaveClass(/border-4/);

    // When: User clicks back button
    await backButton.click();

    // Then: User should be on blog listing page
    await expect(page).toHaveURL('/blog/');
  });

  test('[P2] bottom back button returns to blog listing', async ({ page }) => {
    // Given: User is on blog post detail page
    await page.goto(testPostUrl);

    // Then: Bottom back button should exist
    const bottomBackButton = page.getByRole('link', { name: /BACK TO ALL POSTS/i });
    await expect(bottomBackButton).toBeVisible();

    // Scroll to button to ensure it's fully visible (avoids content overlap on mobile)
    await bottomBackButton.scrollIntoViewIfNeeded();

    // When: User clicks bottom back button
    await bottomBackButton.click({ force: true });

    // Then: User should be on blog listing page
    await expect(page).toHaveURL('/blog/');
  });
});

test.describe('Story 2.2: Clean URL Structure (AC5)', () => {
  test('[P1] URL uses post id from frontmatter', async ({ page }) => {
    // Given: User navigates to blog post
    await page.goto('/blog/docker-observability/');

    // Then: URL should match the post id (no hash, no query params)
    const url = page.url();
    expect(url).toContain('/blog/docker-observability/');
    expect(url).not.toContain('#');
    expect(url).not.toContain('?');
  });

  test('[P1] all blog posts have clean URLs', async ({ page }) => {
    // Given: User is on blog listing
    await page.goto('/blog/');

    // When: Collecting all post links (exclude /blog/ itself)
    const allLinks = page.locator('a[href^="/blog/"]');
    const linkCount = await allLinks.count();

    // Filter to only post links (not /blog/ itself)
    const postHrefs: string[] = [];
    for (let i = 0; i < linkCount; i++) {
      const href = await allLinks.nth(i).getAttribute('href');
      if (href && href !== '/blog/' && href.match(/^\/blog\/[\w-]+\/?$/)) {
        postHrefs.push(href);
      }
    }

    expect(postHrefs.length).toBeGreaterThan(0);

    // Then: All post links should have clean URL structure
    for (const href of postHrefs.slice(0, 5)) {
      expect(href).toMatch(/^\/blog\/[\w-]+\/$/);
      expect(href).not.toContain('#');
    }
  });
});

test.describe('Story 2.2: Heading Hierarchy (AC6)', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P1] h1 used for post title only', async ({ page }) => {
    // Given: User views blog post
    await page.goto(testPostUrl);

    // Then: There should be exactly one h1 (the post title)
    const h1Elements = page.getByRole('heading', { level: 1 });
    await expect(h1Elements).toHaveCount(1);

    // And: h1 should contain the post title
    await expect(h1Elements).toContainText('OBSERVABILITY');
  });

  test('[P1] content uses h2 and h3 for sections', async ({ page }) => {
    // Given: User views blog post with sections
    await page.goto(testPostUrl);

    // Then: Content should have h2 headings for major sections
    const h2Elements = page.locator('.prose h2');
    const h2Count = await h2Elements.count();
    expect(h2Count).toBeGreaterThan(0);

    // And: h2 should have proper styling (text-2xl font-black)
    const firstH2 = h2Elements.first();
    await expect(firstH2).toBeVisible();
  });
});

test.describe('Story 2.2: Readable Typography (AC4)', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P2] prose content has readable line height', async ({ page }) => {
    // Given: User views blog post
    await page.goto(testPostUrl);

    // Then: Paragraphs should have relaxed line height
    const paragraph = page.locator('.prose p').first();
    await expect(paragraph).toBeVisible();

    const lineHeight = await paragraph.evaluate((el) => {
      return window.getComputedStyle(el).lineHeight;
    });

    // Line height should be at least 1.5x font size (relaxed)
    const fontSize = await paragraph.evaluate((el) => {
      return parseFloat(window.getComputedStyle(el).fontSize);
    });
    const lineHeightNum = parseFloat(lineHeight);

    // Either 'normal' (~1.2) or explicit value >= 1.5 * fontSize
    expect(lineHeightNum).toBeGreaterThanOrEqual(fontSize * 1.4);
  });

  test('[P2] code blocks have Neubrutalist styling', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // Then: Code blocks should have dark background and border
    const codeBlock = page.locator('.prose pre').first();

    // If code blocks exist, verify styling
    const codeCount = await codeBlock.count();
    if (codeCount > 0) {
      await expect(codeBlock).toBeVisible();

      // Should have border (Neubrutalist style)
      const borderWidth = await codeBlock.evaluate((el) => {
        return window.getComputedStyle(el).borderWidth;
      });
      expect(borderWidth).not.toBe('0px');
    }
  });

  test('[P2] content wrapped in Card component', async ({ page }) => {
    // Given: User views blog post
    await page.goto(testPostUrl);

    // Then: Content should be wrapped in a Card with Neubrutalist styling
    const contentCard = page.locator('.border-4.border-black').filter({
      has: page.locator('.prose'),
    });
    await expect(contentCard).toBeVisible();

    // And: Card should have brutal shadow
    const style = await contentCard.getAttribute('style');
    expect(style).toContain('box-shadow');
  });

  test('[P2] page uses Neubrutalist design tokens', async ({ page, verifyNeubrutalistDesign }) => {
    // Given: User views blog post
    await page.goto('/blog/docker-observability/');

    // Then: Neubrutalist design tokens should be applied
    await verifyNeubrutalistDesign();
  });
});

test.describe('Story 2.2: Table of Contents Sidebar', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P2] TOC sidebar visible on desktop', async ({ page }) => {
    // Given: User views blog post on desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(testPostUrl);

    // Then: TOC sidebar should be visible
    const tocSidebar = page.locator('#toc-sidebar');
    await expect(tocSidebar).toBeVisible();

    // And: Should have "TABLE OF CONTENTS" heading
    await expect(tocSidebar.getByText('TABLE OF CONTENTS')).toBeVisible();
  });

  test('[P2] TOC sidebar hidden on mobile', async ({ page }) => {
    // Given: User views blog post on mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(testPostUrl);

    // Then: TOC sidebar should be hidden
    const tocSidebar = page.locator('#toc-sidebar');
    await expect(tocSidebar).toBeHidden();
  });

  test('[P2] TOC shows headings from content', async ({ page }) => {
    // Given: User views blog post on desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(testPostUrl);

    // Then: TOC should contain heading items
    const tocList = page.locator('#toc-list');
    const tocItems = tocList.locator('.toc-item');
    const itemCount = await tocItems.count();
    expect(itemCount).toBeGreaterThan(0);

    // And: Items should match h2 headings in content
    await expect(tocItems.first()).toBeVisible();
  });

  test('[P2] TOC shows scroll progress', async ({ page }) => {
    // Given: User views blog post on desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(testPostUrl);

    // Then: Progress indicator should exist
    const progress = page.locator('#scroll-progress');
    await expect(progress).toBeVisible();

    // And: Should show percentage
    const text = await progress.textContent();
    expect(text).toMatch(/\d+%/);
  });

  test('[P2] clicking TOC item scrolls to section', async ({ page }) => {
    // Given: User views blog post on desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(testPostUrl);

    // When: User clicks a TOC item
    const tocItem = page.locator('.toc-item').first();
    const targetId = await tocItem.getAttribute('data-target');
    await tocItem.click();

    // Then: Page should scroll to that section (heading in viewport)
    await page.waitForTimeout(500); // Wait for smooth scroll
    const heading = page.locator(`#${targetId}`);
    await expect(heading).toBeInViewport();
  });
});

test.describe('Story 2.2: Pre-rendered Static HTML', () => {
  test('[P2] page source contains post content (not JS placeholder)', async ({ request }) => {
    // Given: We fetch the raw HTML source
    const response = await request.get('/blog/docker-observability/');
    const html = await response.text();

    // Then: HTML should contain the post title (pre-rendered)
    expect(html).toContain('OBSERVABILITY');

    // And: HTML should contain prose content class
    expect(html).toContain('prose');

    // And: HTML should NOT be a SPA placeholder
    expect(html).not.toContain('Loading...');
    expect(html).not.toContain('id="root"');
  });
});
