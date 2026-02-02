/**
 * Story 6.1: Sitemap Generation - E2E Accessibility Tests (ATDD - RED PHASE)
 *
 * These tests verify sitemap.xml is accessible via HTTP.
 * All tests will FAIL until sitemap.njk template is implemented.
 *
 * Acceptance Criteria:
 * - AC2: Sitemap File Exists (accessible via HTTP)
 * - AC6: Valid XML (correct content-type)
 *
 * TDD Workflow:
 * 1. RED: Run these tests - they will fail (404 - sitemap doesn't exist)
 * 2. GREEN: Implement sitemap.njk template
 * 3. REFACTOR: Improve template while keeping tests green
 *
 * NOTE: These E2E tests require the dev server running on port 8080.
 */

import { test, expect } from '../support/fixtures';

test.describe('Story 6.1: Sitemap HTTP Accessibility (AC2)', () => {
  test('[P1] sitemap.xml should be accessible at /sitemap.xml', async ({ page, request }) => {
    // Given: The site is running
    // When: We request the sitemap
    const response = await request.get('/sitemap.xml');

    // Then: It should return 200 OK
    expect(response.status()).toBe(200);
  });

  test('[P1] sitemap.xml should have XML content-type', async ({ request }) => {
    // Given: The site is running
    // When: We request the sitemap
    const response = await request.get('/sitemap.xml');

    // Then: Content-type should indicate XML
    const contentType = response.headers()['content-type'];
    expect(contentType).toMatch(/xml/);
  });
});

test.describe('Story 6.1: Sitemap Content Verification (AC3, AC4)', () => {
  test('[P1] sitemap.xml should contain valid XML with URLs', async ({ request }) => {
    // Given: The site is running
    // When: We fetch the sitemap
    const response = await request.get('/sitemap.xml');
    const content = await response.text();

    // Then: Should contain XML declaration
    expect(content).toContain('<?xml');

    // And: Should contain urlset element
    expect(content).toContain('<urlset');

    // And: Should contain at least one URL
    expect(content).toContain('<url>');
    expect(content).toContain('<loc>');
  });

  test('[P1] sitemap.xml should use production base URL', async ({ request }) => {
    // Given: The site is running
    // When: We fetch the sitemap
    const response = await request.get('/sitemap.xml');
    const content = await response.text();

    // Then: URLs should use production base URL
    expect(content).toContain('https://jaysingh.dev');

    // And: Should not contain localhost
    expect(content).not.toContain('localhost');
  });
});

test.describe('Story 6.1: robots.txt Integration', () => {
  test('[P2] robots.txt should reference sitemap', async ({ request }) => {
    // Given: The site is running
    // When: We fetch robots.txt
    const response = await request.get('/robots.txt');
    const content = await response.text();

    // Then: It should reference the sitemap
    expect(content).toContain('Sitemap: https://jaysingh.dev/sitemap.xml');
  });
});
