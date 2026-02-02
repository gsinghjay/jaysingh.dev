/**
 * Story 6.2: robots.txt Implementation - E2E HTTP Accessibility Tests
 *
 * These tests verify robots.txt is accessible via HTTP and serves correct content.
 * robots.txt was pre-implemented and fixed in Story 6.1 (passthrough copy).
 *
 * Acceptance Criteria:
 * - AC1: robots.txt File Exists (accessible at /robots.txt)
 * - AC2: Allows All Crawlers (content verification)
 * - AC3: Sitemap Reference (content verification)
 * - AC5: No Unintended Blocks (crawler accessibility)
 *
 * NOTE: These E2E tests require the dev server running on port 8080.
 */

import { test, expect } from '../support/fixtures';

test.describe('Story 6.2: robots.txt HTTP Accessibility (AC1)', () => {
  test('[P0] robots.txt should be accessible at /robots.txt', async ({ request }) => {
    // Given: The site is running
    // When: We request robots.txt
    const response = await request.get('/robots.txt');

    // Then: It should return 200 OK
    expect(response.status()).toBe(200);
  });

  test('[P1] robots.txt should have text/plain content-type', async ({ request }) => {
    // Given: The site is running
    // When: We request robots.txt
    const response = await request.get('/robots.txt');

    // Then: Content-type should be text/plain
    const contentType = response.headers()['content-type'];
    expect(contentType).toMatch(/text\/plain/);
  });

  test('[P2] robots.txt should not redirect', async ({ request }) => {
    // Given: The site is running
    // When: We request robots.txt
    const response = await request.get('/robots.txt', {
      maxRedirects: 0,
    });

    // Then: Should be direct response (no redirect)
    expect(response.status()).toBe(200);
  });
});

test.describe('Story 6.2: robots.txt Content Verification (AC2, AC3)', () => {
  test('[P0] robots.txt should contain User-agent directive', async ({ request }) => {
    // Given: The site is running
    // When: We fetch robots.txt
    const response = await request.get('/robots.txt');
    const content = await response.text();

    // Then: Should contain User-agent: *
    expect(content).toContain('User-agent: *');
  });

  test('[P0] robots.txt should contain Allow directive', async ({ request }) => {
    // Given: The site is running
    // When: We fetch robots.txt
    const response = await request.get('/robots.txt');
    const content = await response.text();

    // Then: Should contain Allow: /
    expect(content).toContain('Allow: /');
  });

  test('[P0] robots.txt should reference sitemap', async ({ request }) => {
    // Given: The site is running
    // When: We fetch robots.txt
    const response = await request.get('/robots.txt');
    const content = await response.text();

    // Then: Should reference sitemap with production URL
    expect(content).toContain('Sitemap: https://jaysingh.dev/sitemap.xml');
  });

  test('[P1] robots.txt should not contain Disallow directives', async ({ request }) => {
    // Given: The site is running
    // When: We fetch robots.txt
    const response = await request.get('/robots.txt');
    const content = await response.text();

    // Then: Should not block any paths
    expect(content).not.toContain('Disallow:');
  });
});

test.describe('Story 6.2: Sitemap Integration (AC3)', () => {
  test('[P1] sitemap URL in robots.txt should be reachable', async ({ request }) => {
    // Given: The site is running
    // When: We fetch robots.txt and extract sitemap URL
    const robotsResponse = await request.get('/robots.txt');
    const robotsContent = await robotsResponse.text();

    // Extract sitemap URL
    const sitemapMatch = robotsContent.match(/Sitemap:\s*(.+)/);
    expect(sitemapMatch).not.toBeNull();

    // Note: In dev environment, we test the local sitemap path
    // Production URL https://jaysingh.dev/sitemap.xml won't be accessible locally
    const localSitemapResponse = await request.get('/sitemap.xml');

    // Then: Local sitemap should be accessible
    expect(localSitemapResponse.status()).toBe(200);
  });

  test('[P2] sitemap referenced in robots.txt should be valid XML', async ({ request }) => {
    // Given: The local sitemap is accessible
    const response = await request.get('/sitemap.xml');
    const content = await response.text();

    // Then: Should be valid XML
    expect(content).toContain('<?xml');
    expect(content).toContain('<urlset');
  });
});

test.describe('Story 6.2: Crawler Accessibility (AC5)', () => {
  test('[P1] robots.txt should allow access to blog section', async ({ request }) => {
    // Given: robots.txt allows all paths
    const robotsResponse = await request.get('/robots.txt');
    const content = await robotsResponse.text();

    // Verify no block on /blog
    expect(content).not.toContain('Disallow: /blog');

    // And: Blog section should be accessible
    const blogResponse = await request.get('/blog/');
    expect(blogResponse.status()).toBe(200);
  });

  test('[P1] robots.txt should allow access to projects section', async ({ request }) => {
    // Given: robots.txt allows all paths
    const robotsResponse = await request.get('/robots.txt');
    const content = await robotsResponse.text();

    // Verify no block on /projects
    expect(content).not.toContain('Disallow: /projects');

    // And: Projects section should be accessible
    const projectsResponse = await request.get('/projects/');
    expect(projectsResponse.status()).toBe(200);
  });

  test('[P2] robots.txt should be accessible from any browser', async ({ page }) => {
    // Given: A browser navigates to robots.txt
    const response = await page.goto('/robots.txt');

    // Then: Should load successfully
    expect(response?.status()).toBe(200);

    // And: Content should be visible
    const content = await page.content();
    expect(content).toContain('User-agent');
  });
});
