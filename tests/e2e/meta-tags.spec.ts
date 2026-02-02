/**
 * Story 6.3: Meta Tags and Open Graph - E2E HTTP Accessibility Tests (ATDD - RED PHASE)
 *
 * These tests verify meta tags are accessible via HTTP.
 * Tests verify HTTP responses contain expected meta tags.
 *
 * Acceptance Criteria:
 * - AC1: Basic Meta Tags Present (accessible via HTTP)
 * - AC3: Open Graph Tags Present (accessible via HTTP)
 * - AC6: Social Media Preview (Twitter Card tags via HTTP)
 * - AC8: Direct Landing Works (no redirects, full content)
 *
 * TDD Workflow:
 * 1. RED: Run these tests - some will fail (missing implementation)
 * 2. GREEN: Implement meta tags
 * 3. REFACTOR: Improve templates while keeping tests green
 *
 * NOTE: These E2E tests require the dev server running on port 8080.
 */

import { test, expect } from '../support/fixtures';

// Pages to test
const PAGES = [
  { name: 'home', path: '/' },
  { name: 'blog', path: '/blog/' },
  { name: 'projects', path: '/projects/' },
  { name: 'resume', path: '/resume/' },
  { name: 'contact', path: '/contact/' },
];

// Blog post for article-specific tests
const BLOG_POST = { name: 'docker-observability', path: '/blog/docker-observability/' };

test.describe('Story 6.3: Basic Meta Tags HTTP Accessibility (AC1)', () => {
  for (const page of PAGES) {
    test(`[P0] ${page.name} page should have basic meta tags`, async ({ request }) => {
      // Given: The site is running
      // When: We request the page
      const response = await request.get(page.path);

      // Then: It should return 200 OK
      expect(response.status()).toBe(200);

      const html = await response.text();

      // And: Should have title tag
      expect(html).toMatch(/<title>[^<]+<\/title>/);

      // And: Should have meta description
      expect(html).toMatch(/<meta\s+name=["']description["']\s+content=["'][^"']+["']/i);

      // And: Should have canonical URL
      expect(html).toMatch(/<link\s+rel=["']canonical["']\s+href=["']https:\/\/jaysingh\.dev[^"']*["']/i);
    });
  }
});

test.describe('Story 6.3: Open Graph Tags HTTP Accessibility (AC3)', () => {
  for (const page of PAGES) {
    test(`[P1] ${page.name} page should have Open Graph tags`, async ({ request }) => {
      // Given: The site is running
      // When: We request the page
      const response = await request.get(page.path);
      const html = await response.text();

      // Then: Should have og:title
      expect(html).toMatch(/<meta\s+property=["']og:title["']\s+content=["'][^"']+["']/i);

      // And: Should have og:description
      expect(html).toMatch(/<meta\s+property=["']og:description["']\s+content=["'][^"']+["']/i);

      // And: Should have og:url
      expect(html).toMatch(/<meta\s+property=["']og:url["']\s+content=["']https:\/\/jaysingh\.dev[^"']*["']/i);

      // And: Should have og:type
      expect(html).toMatch(/<meta\s+property=["']og:type["']\s+content=["'][^"']+["']/i);

      // And: Should have og:site_name
      expect(html).toMatch(/<meta\s+property=["']og:site_name["']\s+content=["'][^"']+["']/i);
    });
  }
});

test.describe('Story 6.3: Article Type for Blog Posts (AC4)', () => {
  test('[P1] blog post should have og:type="article"', async ({ request }) => {
    // Given: The site is running
    // When: We request a blog post
    const response = await request.get(BLOG_POST.path);
    const html = await response.text();

    // Then: og:type should be "article"
    expect(html).toMatch(/<meta\s+property=["']og:type["']\s+content=["']article["']/i);
  });

  test('[P1] blog post should have article:published_time', async ({ request }) => {
    // Given: The site is running
    // When: We request a blog post
    const response = await request.get(BLOG_POST.path);
    const html = await response.text();

    // Then: Should have article:published_time with ISO date
    expect(html).toMatch(/<meta\s+property=["']article:published_time["']\s+content=["']\d{4}-\d{2}-\d{2}T[^"']+["']/i);
  });
});

test.describe('Story 6.3: Twitter Card Tags (AC6)', () => {
  for (const page of PAGES) {
    test(`[P1] ${page.name} page should have Twitter Card tags`, async ({ request }) => {
      // Given: The site is running
      // When: We request the page
      const response = await request.get(page.path);
      const html = await response.text();

      // Then: Should have twitter:card
      expect(html).toMatch(/<meta\s+name=["']twitter:card["']\s+content=["'](summary|summary_large_image)["']/i);

      // And: Should have twitter:title
      expect(html).toMatch(/<meta\s+name=["']twitter:title["']\s+content=["'][^"']+["']/i);

      // And: Should have twitter:description
      expect(html).toMatch(/<meta\s+name=["']twitter:description["']\s+content=["'][^"']+["']/i);
    });
  }

  test('[P2] home page should have twitter:image', async ({ request }) => {
    // Given: The site is running
    // When: We request the home page
    const response = await request.get('/');
    const html = await response.text();

    // Then: Should have twitter:image with full URL
    expect(html).toMatch(/<meta\s+name=["']twitter:image["']\s+content=["']https:\/\/jaysingh\.dev[^"']+["']/i);
  });
});

test.describe('Story 6.3: Direct Landing Works (AC8)', () => {
  test('[P0] blog post direct landing should return 200 with full content', async ({ request }) => {
    // Given: A visitor arrives from a search engine
    // When: They land directly on a blog post URL
    const response = await request.get(BLOG_POST.path);

    // Then: The page should return 200 OK
    expect(response.status()).toBe(200);

    const html = await response.text();

    // And: Should have full HTML document
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<html');
    expect(html).toContain('</html>');

    // And: Should have content (not empty shell)
    // Blog posts use div#blog-content with prose styling, not <article>
    expect(html).toContain('id="blog-content"');
    expect(html.length).toBeGreaterThan(5000); // Substantial content
  });

  test('[P0] blog post should not require JavaScript for content', async ({ page }) => {
    // Given: JavaScript is disabled (simulated by checking initial HTML)
    // When: We navigate to a blog post
    const response = await page.goto(BLOG_POST.path);

    // Then: Should return 200
    expect(response?.status()).toBe(200);

    // And: Main content should be visible immediately (SSG)
    // Blog posts use div#blog-content with prose styling, not <article>
    const blogContent = page.locator('#blog-content');
    await expect(blogContent).toBeVisible();

    // And: Should have heading
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
  });

  test('[P1] all static pages should return 200', async ({ request }) => {
    // Given: The site is running
    // When: We request each static page
    for (const page of PAGES) {
      const response = await request.get(page.path);

      // Then: Each page should return 200
      expect(response.status(), `${page.name} should return 200`).toBe(200);
    }
  });

  test('[P2] blog post URL should not redirect', async ({ request }) => {
    // Given: A visitor arrives from a search engine
    // When: They land directly on a blog post URL
    const response = await request.get(BLOG_POST.path, {
      maxRedirects: 0, // Don't follow redirects
    });

    // Then: Should return 200 directly (no redirect)
    // Note: If there's a redirect, this would throw or return 3xx
    expect(response.status()).toBe(200);
  });
});

test.describe('Story 6.3: Content Type Verification', () => {
  test('[P1] all pages should return HTML content-type', async ({ request }) => {
    for (const page of PAGES) {
      // Given: The site is running
      // When: We request a page
      const response = await request.get(page.path);

      // Then: Content-type should be HTML
      const contentType = response.headers()['content-type'];
      expect(contentType, `${page.name} should have HTML content-type`).toMatch(/text\/html/);
    }
  });
});
