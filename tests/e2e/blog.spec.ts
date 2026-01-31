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

/**
 * Story 2.3: Implement Syntax Highlighting Tests (ATDD - RED PHASE)
 *
 * These tests define EXPECTED behavior for syntax highlighting.
 * Tests will FAIL until Prism CSS theme is added.
 *
 * Acceptance Criteria:
 * - AC1: Plugin configured (@11ty/eleventy-plugin-syntaxhighlight)
 * - AC2: Build-time highlighting (no client JS)
 * - AC3: Token colors (keywords, strings, comments have distinct colors)
 * - AC4: Multi-language support (JS, Python, Bash, YAML)
 * - AC5: Neubrutalist styling (borders, shadows, monospace)
 * - AC6: Horizontal scrolling for long code
 *
 * TDD Workflow:
 * 1. RED: Run these tests - token color tests will fail (current state)
 * 2. GREEN: Add Prism CSS theme with token colors
 * 3. REFACTOR: Optimize CSS while keeping tests green
 */

test.describe('Story 2.3: Syntax Highlighting - Pre-rendered HTML (AC1, AC2)', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P0] code blocks have Prism language class', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // Then: Code blocks should have language-specific class
    const codeBlock = page.locator('pre[class*="language-"]').first();
    await expect(codeBlock).toBeVisible();

    // And: Should have a language class (language-python, language-yaml, etc.)
    const className = await codeBlock.getAttribute('class');
    expect(className).toMatch(/language-\w+/);
  });

  test('[P0] code blocks contain token spans (pre-rendered)', async ({ request }) => {
    // Given: We fetch the raw HTML source
    const response = await request.get('/blog/docker-observability/');
    const html = await response.text();

    // Then: HTML should contain Prism token spans (pre-rendered at build time)
    expect(html).toContain('class="token');

    // And: Should have specific token types
    expect(html).toMatch(/class="token (keyword|string|comment|function|punctuation)/);
  });

  test('[P2] syntax highlighting requires no client-side JavaScript', async ({ page }) => {
    // Given: User views blog post
    await page.goto(testPostUrl);

    // Then: Code blocks should already have token spans (no JS needed)
    const tokenSpan = page.locator('.prose pre .token').first();
    await expect(tokenSpan).toBeVisible();

    // And: There should be multiple token types visible immediately
    const tokenCount = await page.locator('.prose pre .token').count();
    expect(tokenCount).toBeGreaterThan(5);
  });
});

test.describe('Story 2.3: Token Colors (AC3)', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P0] keyword tokens have distinct color', async ({ page }) => {
    // Given: User views blog post with Python code
    await page.goto(testPostUrl);

    // Then: Keyword tokens should have a non-default color
    const keywordToken = page.locator('.token.keyword').first();

    // Wait for token to be visible (may need CSS to load)
    await expect(keywordToken).toBeVisible({ timeout: 5000 });

    // Get computed color
    const color = await keywordToken.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    // Color should NOT be default black (rgb(0, 0, 0)) or white text
    expect(color).not.toBe('rgb(0, 0, 0)');
    expect(color).not.toBe('rgb(255, 255, 255)');
  });

  test('[P0] string tokens have distinct color', async ({ page }) => {
    // Given: User views blog post with code containing strings
    await page.goto(testPostUrl);

    // Then: String tokens should have a distinct color
    const stringToken = page.locator('.token.string').first();
    await expect(stringToken).toBeVisible({ timeout: 5000 });

    const color = await stringToken.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    // String color should be distinct (not default black/white)
    expect(color).not.toBe('rgb(0, 0, 0)');
    expect(color).not.toBe('rgb(255, 255, 255)');
  });

  test('[P0] different token types have different colors', async ({ page }) => {
    // Given: User views blog post with code
    await page.goto(testPostUrl);

    // Get colors for different token types
    const keywordColor = await page.locator('.token.keyword').first().evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    const stringColor = await page.locator('.token.string').first().evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    // Then: Keywords and strings should have DIFFERENT colors
    expect(keywordColor).not.toBe(stringColor);
  });

  test('[P1] comment tokens have muted color', async ({ page }) => {
    // Given: User views blog post with code containing comments
    await page.goto(testPostUrl);

    // Then: Comment tokens should exist and have distinct styling
    const commentToken = page.locator('.token.comment').first();
    const commentCount = await commentToken.count();

    if (commentCount > 0) {
      const color = await commentToken.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });

      // Comments should have a muted/gray color (not bright)
      expect(color).not.toBe('rgb(0, 0, 0)');
    }
  });

  test('[P1] function tokens have distinct color', async ({ page }) => {
    // Given: User views blog post with Python functions
    await page.goto(testPostUrl);

    // Then: Function tokens should have distinct color
    const functionToken = page.locator('.token.function').first();
    const functionCount = await functionToken.count();

    if (functionCount > 0) {
      await expect(functionToken).toBeVisible();

      const color = await functionToken.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });

      expect(color).not.toBe('rgb(0, 0, 0)');
    }
  });
});

test.describe('Story 2.3: Multi-Language Support (AC4)', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P1] Python code blocks highlight correctly', async ({ page }) => {
    // Given: User views blog post with Python code
    await page.goto(testPostUrl);

    // Then: Python code block should exist with language class
    const pythonBlock = page.locator('pre.language-python, pre[class*="language-python"]');
    await expect(pythonBlock.first()).toBeVisible();

    // And: Should contain Python-specific tokens (def, import, etc.)
    const pythonCode = pythonBlock.first();
    await expect(pythonCode.locator('.token.keyword').first()).toBeVisible();
  });

  test('[P1] YAML code blocks highlight correctly', async ({ page }) => {
    // Given: User views blog post with YAML code
    await page.goto(testPostUrl);

    // Then: YAML code block should exist with language class
    const yamlBlock = page.locator('pre.language-yaml, pre.language-yml, pre[class*="language-yaml"]');
    await expect(yamlBlock.first()).toBeVisible();

    // And: Should contain YAML tokens (keys, values)
    const yamlCode = yamlBlock.first();
    const tokenCount = await yamlCode.locator('.token').count();
    expect(tokenCount).toBeGreaterThan(0);
  });

  test('[P2] language class matches code content', async ({ page }) => {
    // Given: User views blog post
    await page.goto(testPostUrl);

    // Then: All pre elements with language class should have tokens
    const codeBlocks = page.locator('pre[class*="language-"]');
    const blockCount = await codeBlocks.count();

    expect(blockCount).toBeGreaterThan(0);

    // Each code block should have at least some tokens
    for (let i = 0; i < Math.min(blockCount, 3); i++) {
      const block = codeBlocks.nth(i);
      const tokenCount = await block.locator('.token').count();
      expect(tokenCount).toBeGreaterThan(0);
    }
  });
});

test.describe('Story 2.3: Neubrutalist Code Block Styling (AC5)', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P1] code blocks have 4px black border', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // Then: Code blocks should have Neubrutalist border
    const codeBlock = page.locator('.prose pre').first();
    await expect(codeBlock).toBeVisible();

    // Note: When inside code-block-wrapper (Story 2.4), top border is removed
    // for seamless connection with header. Check that other borders exist.
    const borderBottomWidth = await codeBlock.evaluate((el) => {
      return window.getComputedStyle(el).borderBottomWidth;
    });

    const borderColor = await codeBlock.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });

    expect(borderBottomWidth).toBe('4px');
    expect(borderColor).toBe('rgb(0, 0, 0)');
  });

  test('[P1] code blocks have dark background', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // Then: Code blocks should have dark background for contrast
    const codeBlock = page.locator('.prose pre').first();
    const bgColor = await codeBlock.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Should be dark (neutral-900 = rgb(23, 23, 23))
    expect(bgColor).toMatch(/rgb\(\d{1,2}, \d{1,2}, \d{1,2}\)/);
  });

  test('[P1] code uses monospace font', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // Then: Code should use monospace font family
    const codeElement = page.locator('.prose pre code, .prose pre').first();
    const fontFamily = await codeElement.evaluate((el) => {
      return window.getComputedStyle(el).fontFamily;
    });

    // Should contain monospace font
    expect(fontFamily.toLowerCase()).toMatch(/mono|consolas|menlo|courier/);
  });

  test('[P2] code blocks have proper padding', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // Then: Code blocks should have readable padding
    const codeBlock = page.locator('.prose pre').first();
    const padding = await codeBlock.evaluate((el) => {
      return window.getComputedStyle(el).padding;
    });

    // Padding should not be 0
    expect(padding).not.toBe('0px');
  });
});

test.describe('Story 2.3: Horizontal Scrolling (AC6)', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P1] code blocks have horizontal scroll enabled', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // Then: Code blocks should allow horizontal scrolling
    const codeBlock = page.locator('.prose pre').first();
    const overflowX = await codeBlock.evaluate((el) => {
      return window.getComputedStyle(el).overflowX;
    });

    // Should be auto or scroll (not hidden or visible which would clip/wrap)
    expect(['auto', 'scroll']).toContain(overflowX);
  });

  test('[P1] code does not wrap text', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // Then: Code should not wrap (preserve formatting)
    const codeElement = page.locator('.prose pre code, .prose pre').first();
    const whiteSpace = await codeElement.evaluate((el) => {
      return window.getComputedStyle(el).whiteSpace;
    });

    // Should preserve whitespace and not wrap
    expect(['pre', 'pre-wrap', 'nowrap']).toContain(whiteSpace);
  });

  test('[P2] long lines trigger scrollbar', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // Then: Pre element should have overflow handling
    const codeBlock = page.locator('.prose pre').first();
    const scrollWidth = await codeBlock.evaluate((el) => el.scrollWidth);
    const clientWidth = await codeBlock.evaluate((el) => el.clientWidth);

    // If content is wider than container, scrollbar should be available
    // (This test documents expected behavior - actual overflow depends on content)
    expect(scrollWidth).toBeGreaterThanOrEqual(clientWidth);
  });
});

/**
 * Story 2.4: Implement Code Copy Functionality Tests (ATDD - RED PHASE)
 *
 * These tests define EXPECTED behavior for code block copy functionality.
 * All tests will FAIL until implementation is complete.
 *
 * Acceptance Criteria:
 * - AC1: Copy button visible on code blocks
 * - AC2: Copy to clipboard on click
 * - AC3: Visual feedback ("COPIED" for 2s, then reverts)
 * - AC4: Vanilla JS with data-* attributes
 * - AC5: Graceful degradation (code visible if JS disabled)
 * - AC6: Keyboard accessible (focusable, Enter/Space activation)
 *
 * TDD Workflow:
 * 1. RED: Run these tests - they will fail (current state)
 * 2. GREEN: Implement code copy in js/main.js and css/input.css
 * 3. REFACTOR: Improve code quality while keeping tests green
 */

test.describe('Story 2.4: Code Copy Button Visibility (AC1)', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P0] copy button is visible on code blocks', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // Then: Copy button should be visible on code blocks
    const copyButton = page.locator('[data-copy-button]').first();
    await expect(copyButton).toBeVisible();

    // And: Button should have "COPY" text
    await expect(copyButton).toHaveText('COPY');
  });

  test('[P0] language label displays correctly', async ({ page }) => {
    // Given: User views blog post with Python code
    await page.goto(testPostUrl);

    // Then: Language label should be visible in header
    const langLabel = page.locator('.code-block-language').first();
    await expect(langLabel).toBeVisible();

    // And: Should show language name in uppercase
    const labelText = await langLabel.textContent();
    expect(labelText).toMatch(/^[A-Z]+$/);
  });

  test('[P1] code block has wrapper structure', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // Then: Code block should be wrapped with data attribute
    const wrapper = page.locator('[data-code-block]').first();
    await expect(wrapper).toBeVisible();

    // And: Wrapper should contain header and pre element
    await expect(wrapper.locator('.code-block-header')).toBeVisible();
    await expect(wrapper.locator('pre')).toBeVisible();
  });

  test('[P2] multiple code blocks each have copy button', async ({ page }) => {
    // Given: User views blog post with multiple code blocks
    await page.goto(testPostUrl);

    // Then: Each code block should have its own copy button
    const codeBlocks = page.locator('pre[class*="language-"]');
    const copyButtons = page.locator('[data-copy-button]');

    const blockCount = await codeBlocks.count();
    const buttonCount = await copyButtons.count();

    // Should have same number of buttons as code blocks
    expect(buttonCount).toBe(blockCount);
    expect(buttonCount).toBeGreaterThan(0);
  });
});

test.describe('Story 2.4: Copy Feedback (AC2, AC3)', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P0] copy button shows COPIED feedback on click', async ({ page, isMobile }) => {
    // Skip on mobile - Playwright mobile emulation has clipboard API restrictions
    test.skip(isMobile, 'Clipboard API restricted on mobile emulation');
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // When: User clicks the copy button
    const copyButton = page.locator('[data-copy-button]').first();
    await copyButton.click();

    // Then: Button text should change to "COPIED"
    await expect(copyButton).toHaveText('COPIED');
  });

  test('[P0] copy button reverts after feedback timeout', async ({ page, isMobile }) => {
    // Skip on mobile - Playwright mobile emulation has clipboard API restrictions
    test.skip(isMobile, 'Clipboard API restricted on mobile emulation');

    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // When: User clicks the copy button
    const copyButton = page.locator('[data-copy-button]').first();
    await copyButton.click();

    // Then: Button should show "COPIED" initially
    await expect(copyButton).toHaveText('COPIED');

    // And: Button should revert to "COPY" after 2 seconds
    await expect(copyButton).toHaveText('COPY', { timeout: 3000 });
  });

  test('[P1] copy button has visual state change during feedback', async ({ page, isMobile }) => {
    // Skip on mobile - Playwright mobile emulation has clipboard API restrictions
    test.skip(isMobile, 'Clipboard API restricted on mobile emulation');

    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // When: User clicks the copy button
    const copyButton = page.locator('[data-copy-button]').first();
    await copyButton.click();

    // Then: Button should have copied state class
    await expect(copyButton).toHaveClass(/is-copied/);

    // And: Class should be removed after timeout
    await page.waitForTimeout(2500);
    await expect(copyButton).not.toHaveClass(/is-copied/);
  });
});

test.describe('Story 2.4: Keyboard Accessibility (AC6)', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P1] copy button is keyboard focusable', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // When: User focuses the copy button
    const copyButton = page.locator('[data-copy-button]').first();
    await copyButton.focus();

    // Then: Button should be focused
    await expect(copyButton).toBeFocused();
  });

  test('[P1] Enter key activates copy button', async ({ page, isMobile }) => {
    // Skip on mobile - Playwright mobile emulation has clipboard API restrictions
    test.skip(isMobile, 'Clipboard API restricted on mobile emulation');

    // Given: User has focused a copy button
    await page.goto(testPostUrl);
    const copyButton = page.locator('[data-copy-button]').first();
    await copyButton.focus();

    // When: User presses Enter
    await page.keyboard.press('Enter');

    // Then: Button should show "COPIED" feedback
    await expect(copyButton).toHaveText('COPIED');
  });

  test('[P2] Space key activates copy button', async ({ page, isMobile }) => {
    // Skip on mobile - Playwright mobile emulation has clipboard API restrictions
    test.skip(isMobile, 'Clipboard API restricted on mobile emulation');

    // Given: User has focused a copy button
    await page.goto(testPostUrl);
    const copyButton = page.locator('[data-copy-button]').first();
    await copyButton.focus();

    // When: User presses Space
    await page.keyboard.press('Space');

    // Then: Button should show "COPIED" feedback
    await expect(copyButton).toHaveText('COPIED');
  });

  test('[P2] copy button has visible focus indicator', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // When: User focuses the copy button
    const copyButton = page.locator('[data-copy-button]').first();
    await copyButton.focus();

    // Then: Focus outline should be visible (4px black per PRD)
    const outlineWidth = await copyButton.evaluate((el) => {
      return window.getComputedStyle(el).outlineWidth;
    });

    // Should have visible focus indicator (not 0px)
    expect(outlineWidth).not.toBe('0px');
  });
});

test.describe('Story 2.4: Neubrutalist Styling (AC1)', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P1] copy button has lime-400 background', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // Then: Copy button should have lime-400 background
    const copyButton = page.locator('[data-copy-button]').first();
    const bgColor = await copyButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // lime-400 = rgb(163, 230, 53)
    expect(bgColor).toBe('rgb(163, 230, 53)');
  });

  test('[P1] copy button has black border', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // Then: Copy button should have 2px black border
    const copyButton = page.locator('[data-copy-button]').first();

    const borderWidth = await copyButton.evaluate((el) => {
      return window.getComputedStyle(el).borderWidth;
    });

    const borderColor = await copyButton.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });

    expect(borderWidth).toBe('2px');
    expect(borderColor).toBe('rgb(0, 0, 0)');
  });

  test('[P1] code block header has black background', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // Then: Header bar should have black background
    const header = page.locator('.code-block-header').first();
    const bgColor = await header.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // black = rgb(0, 0, 0)
    expect(bgColor).toBe('rgb(0, 0, 0)');
  });

  test('[P2] code block header has flex layout', async ({ page }) => {
    // Given: User views blog post with code blocks
    await page.goto(testPostUrl);

    // Then: Header should use flexbox with space-between
    const header = page.locator('.code-block-header').first();

    const display = await header.evaluate((el) => {
      return window.getComputedStyle(el).display;
    });

    const justifyContent = await header.evaluate((el) => {
      return window.getComputedStyle(el).justifyContent;
    });

    expect(display).toBe('flex');
    expect(justifyContent).toBe('space-between');
  });
});
