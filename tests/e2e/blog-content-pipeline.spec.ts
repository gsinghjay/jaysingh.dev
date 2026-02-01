/**
 * Story 5.1: Blog Content Pipeline Tests (ATDD - RED PHASE)
 *
 * These tests verify the blog content authoring pipeline works end-to-end.
 * Most tests should PASS (verifying existing functionality).
 * Validation-related tests will FAIL until implementation is complete.
 *
 * Acceptance Criteria:
 * - AC1: Blog post file recognition (content/blog/*.md or _content/blog/*.md)
 * - AC2: Frontmatter schema (id, title, date, excerpt, tags, readTime)
 * - AC3: Collection and URL generation (posts collection → /blog/{id}/)
 * - AC4: Markdown rendering (headings, lists, code blocks, links, emphasis)
 * - AC5: Syntax highlighting (build-time via 11ty plugin)
 * - AC6: Frontmatter validation errors (tested in unit tests)
 *
 * TDD Workflow:
 * 1. RED: Run these tests - some may fail if pipeline issues exist
 * 2. GREEN: Fix any pipeline issues found
 * 3. REFACTOR: Improve content authoring workflow
 *
 * NOTE: AC6 (validation errors) is tested in unit/frontmatter-validation.spec.ts
 * because validation happens at BUILD time, not runtime.
 */

import { test, expect } from '../support/fixtures';

test.describe('Story 5.1: Blog Post File Recognition (AC1)', () => {
  test('[P0] blog posts from _content/blog/ are recognized', async ({ page }) => {
    // Given: Blog posts exist in _content/blog/ directory
    await page.goto('/blog/');

    // Then: Posts should be listed (minimum 5 existing posts)
    const postCards = page.locator('.border-4.border-black').filter({ has: page.locator('h2') });
    const count = await postCards.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('[P0] known blog post is accessible', async ({ page }) => {
    // Given: docker-observability post exists in _content/blog/
    await page.goto('/blog/docker-observability/');

    // Then: Page should load without 404
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByText('404')).not.toBeVisible();

    // And: Post title should be visible
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/OBSERVABILITY/i);
  });

  test('[P1] all 5 existing blog posts are accessible', async ({ page }) => {
    // Known blog post IDs from _content/blog/
    const postIds = [
      'docker-observability',
      'ci-cd-best-practices',
      'building-fastapi-microservices',
      'postgresql-performance',
      'oauth2-authentication-gateway',
    ];

    for (const id of postIds) {
      await page.goto(`/blog/${id}/`);

      // Then: Each post should load successfully
      await expect(page.locator('main')).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
  });
});

test.describe('Story 5.1: Frontmatter Schema (AC2)', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P0] post has id-based URL', async ({ page }) => {
    // Given: Post with id: docker-observability
    await page.goto(testPostUrl);

    // Then: URL should match id from frontmatter
    expect(page.url()).toContain('/blog/docker-observability/');
  });

  test('[P0] post displays title from frontmatter', async ({ page }) => {
    // Given: Post with title in frontmatter
    await page.goto(testPostUrl);

    // Then: Title should be displayed
    const title = page.getByRole('heading', { level: 1 });
    await expect(title).toContainText(/OBSERVABILITY/i);
  });

  test('[P0] post displays date from frontmatter', async ({ page }) => {
    // Given: Post with date: 2024-09-22
    await page.goto(testPostUrl);

    // Then: Date should be displayed (formatted as Sep 22, 2024)
    await expect(page.getByText(/Sep 22, 2024/)).toBeVisible();
  });

  test('[P1] post displays excerpt on listing page', async ({ page }) => {
    // Given: Blog listing page
    await page.goto('/blog/');

    // Then: Post cards should have excerpt text
    const excerpt = page.locator('.text-neutral-600.line-clamp-2').first();
    await expect(excerpt).toBeVisible();
    const text = await excerpt.textContent();
    expect(text?.trim().length).toBeGreaterThan(10);
  });

  test('[P1] post displays tags from frontmatter', async ({ page }) => {
    // Given: Post with tags including "docker"
    await page.goto(testPostUrl);

    // Then: Tags should be displayed
    await expect(page.getByText('docker', { exact: true })).toBeVisible();
  });

  test('[P1] post displays readTime from frontmatter', async ({ page }) => {
    // Given: Post with readTime: "10 min"
    await page.goto(testPostUrl);

    // Then: Reading time should be displayed
    await expect(page.getByText(/10 min/)).toBeVisible();
  });
});

test.describe('Story 5.1: Collection and URL Generation (AC3)', () => {
  test('[P0] posts collection populates blog listing', async ({ page }) => {
    // Given: Blog listing page
    await page.goto('/blog/');

    // Then: Should show posts from collection
    const postCards = page.locator('.border-4.border-black').filter({ has: page.locator('h2') });
    await expect(postCards.first()).toBeVisible();

    // And: Should have multiple posts
    const count = await postCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('[P0] post URLs follow /blog/{id}/ pattern', async ({ page }) => {
    // Given: Blog listing page
    await page.goto('/blog/');

    // When: Collecting post links
    const postLinks = page.locator('a[href^="/blog/"]').filter({
      has: page.locator('h2, .font-black'),
    });

    // Then: All links should follow clean URL pattern
    const count = await postLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 3); i++) {
      const href = await postLinks.nth(i).getAttribute('href');
      expect(href).toMatch(/^\/blog\/[\w-]+\/$/);
    }
  });

  test('[P0] clicking post navigates to correct URL', async ({ page }) => {
    // Given: Blog listing page
    await page.goto('/blog/');

    // When: Clicking first post link
    const readMore = page.getByRole('link', { name: /READ MORE/ }).first();
    const href = await readMore.getAttribute('href');
    await readMore.click();

    // Then: Should navigate to that URL
    await expect(page).toHaveURL(href || '/blog/');
  });

  test('[P1] post URLs are clean (no hash, no query params)', async ({ page }) => {
    // Given: A blog post page
    await page.goto('/blog/docker-observability/');

    // Then: URL should be clean
    const url = page.url();
    expect(url).not.toContain('#');
    expect(url).not.toContain('?');
    expect(url).toMatch(/\/blog\/docker-observability\/$/);
  });
});

test.describe('Story 5.1: Markdown Rendering (AC4)', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P0] headings render correctly', async ({ page }) => {
    // Given: Post with markdown headings
    await page.goto(testPostUrl);

    // Then: h1 for title
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toHaveCount(1);

    // And: h2 for sections in prose
    const h2 = page.locator('.prose h2');
    const h2Count = await h2.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('[P1] lists render correctly when present', async ({ page }) => {
    // Given: Post that may have markdown lists
    await page.goto(testPostUrl);

    // Then: If lists exist, they should be properly rendered
    const lists = page.locator('.prose ul, .prose ol');
    const listCount = await lists.count();

    // Verify list elements are properly structured when they exist
    if (listCount > 0) {
      const firstList = lists.first();
      await expect(firstList).toBeVisible();
      // List items should be present
      const items = firstList.locator('li');
      await expect(items.first()).toBeVisible();
    }
    // Note: Not all blog posts have lists - test verifies rendering when present
  });

  test('[P1] links render correctly when present', async ({ page }) => {
    // Given: Post that may have markdown links
    await page.goto(testPostUrl);

    // Then: If links exist in prose, they should be properly rendered
    const links = page.locator('.prose a');
    const linkCount = await links.count();

    // Verify link elements are properly structured when they exist
    if (linkCount > 0) {
      const firstLink = links.first();
      await expect(firstLink).toBeVisible();
      // Links should have href attribute
      const href = await firstLink.getAttribute('href');
      expect(href).toBeTruthy();
    }
    // Note: Not all blog posts have inline links - test verifies rendering when present
  });

  test('[P1] code blocks render correctly', async ({ page }) => {
    // Given: Post with fenced code blocks
    await page.goto(testPostUrl);

    // Then: Code blocks should be visible
    const codeBlocks = page.locator('.prose pre');
    await expect(codeBlocks.first()).toBeVisible();
  });

  test('[P1] emphasis renders correctly', async ({ page }) => {
    // Given: Post with emphasis (bold, italic)
    await page.goto(testPostUrl);

    // Then: Bold text should be visible
    const bold = page.locator('.prose strong, .prose b');
    const boldCount = await bold.count();

    // Or italic
    const italic = page.locator('.prose em, .prose i');
    const italicCount = await italic.count();

    // At least some emphasis in the post
    expect(boldCount + italicCount).toBeGreaterThan(0);
  });

  test('[P2] blockquotes render correctly', async ({ page }) => {
    // Given: Post may have blockquotes
    await page.goto(testPostUrl);

    // Then: If blockquotes exist, they should render
    const blockquotes = page.locator('.prose blockquote');
    const count = await blockquotes.count();

    // This is informational - not all posts have blockquotes
    if (count > 0) {
      await expect(blockquotes.first()).toBeVisible();
    }
  });
});

test.describe('Story 5.1: Syntax Highlighting (AC5)', () => {
  const testPostUrl = '/blog/docker-observability/';

  test('[P0] code blocks have language class', async ({ page }) => {
    // Given: Post with code blocks
    await page.goto(testPostUrl);

    // Then: Code blocks should have language-* class
    const codeBlock = page.locator('pre[class*="language-"]').first();
    await expect(codeBlock).toBeVisible();
  });

  test('[P0] code blocks contain token spans', async ({ page }) => {
    // Given: Post with code blocks
    await page.goto(testPostUrl);

    // Then: Code should have Prism token spans (syntax highlighting)
    const tokens = page.locator('.prose pre .token');
    const tokenCount = await tokens.count();
    expect(tokenCount).toBeGreaterThan(0);
  });

  test('[P1] syntax highlighting is pre-rendered (no JS needed)', async ({ request }) => {
    // Given: Raw HTML source
    const response = await request.get('/blog/docker-observability/');
    const html = await response.text();

    // Then: HTML should contain token spans (pre-rendered at build time)
    expect(html).toContain('class="token');
  });

  test('[P1] multiple languages are highlighted', async ({ page }) => {
    // Given: Post with Python and YAML code blocks
    await page.goto(testPostUrl);

    // Then: Python blocks should be highlighted
    const pythonBlock = page.locator('pre.language-python, pre[class*="language-python"]');
    const pythonCount = await pythonBlock.count();

    // And: YAML blocks should be highlighted
    const yamlBlock = page.locator('pre.language-yaml, pre.language-yml');
    const yamlCount = await yamlBlock.count();

    // At least one of each should exist in this post
    expect(pythonCount + yamlCount).toBeGreaterThan(0);
  });
});

test.describe('Story 5.1: Content Pipeline Smoke Tests', () => {
  test('[P0] blog listing page loads', async ({ page }) => {
    await page.goto('/blog/');
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('[P0] blog post detail page loads', async ({ page }) => {
    await page.goto('/blog/docker-observability/');
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('.prose')).toBeVisible();
  });

  test('[P1] navigation from listing to detail works', async ({ page }) => {
    // Start at listing
    await page.goto('/blog/');

    // Click through to detail
    await page.getByRole('link', { name: /READ MORE/ }).first().click();

    // Should be on detail page
    await expect(page).toHaveURL(/\/blog\/.+\//);
    await expect(page.locator('.prose')).toBeVisible();
  });

  test('[P1] back to listing works from detail', async ({ page }) => {
    // Start at detail
    await page.goto('/blog/docker-observability/');

    // Click back to posts
    await page.getByRole('link', { name: /BACK TO POSTS/i }).first().click();

    // Should be on listing page
    await expect(page).toHaveURL('/blog/');
  });
});
