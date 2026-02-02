/**
 * Story 6.1: Sitemap Generation - Build Output Validation Tests (ATDD - RED PHASE)
 *
 * These tests define EXPECTED behavior for sitemap.xml generation.
 * All tests will FAIL until sitemap.njk template is implemented.
 *
 * Acceptance Criteria:
 * - AC2: Sitemap File Exists (_site/sitemap.xml)
 * - AC3: All Pages Included (static + dynamic content)
 * - AC4: Correct Base URL (https://jaysingh.dev)
 * - AC6: Valid XML Schema
 *
 * TDD Workflow:
 * 1. RED: Run these tests - they will fail (current state)
 * 2. GREEN: Implement sitemap.njk template
 * 3. REFACTOR: Improve template while keeping tests green
 *
 * NOTE: These are unit tests that run against the build output.
 * Run `npm run build` before running these tests.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// Path to the built sitemap
const SITEMAP_PATH = resolve(process.cwd(), '_site/sitemap.xml');
const BASE_URL = 'https://jaysingh.dev';

// Expected static pages
const STATIC_PAGES = ['/', '/blog/', '/projects/', '/resume/', '/contact/'];

// Expected blog post IDs (from _content/blog/*.md)
const BLOG_POST_IDS = [
  'docker-observability',
  'oauth2-authentication-gateway',
  'building-fastapi-microservices',
  'postgresql-performance',
  'ci-cd-best-practices',
];

// Expected project IDs (from _content/projects/*.md)
const PROJECT_IDS = [
  'qr-code-platform',
  'authentication-gateway',
  'cloud-infrastructure-platform',
  'observability-infrastructure',
  'event-driven-microservices',
  'cicd-pipeline',
  'automation-scripts',
  'covid-dashboard',
  'jamf-pro-deployment',
];

// Total expected URLs: 5 static + 5 blog posts + 9 projects = 19
const EXPECTED_URL_COUNT = STATIC_PAGES.length + BLOG_POST_IDS.length + PROJECT_IDS.length;

describe('Story 6.1: Sitemap File Exists (AC2)', () => {
  it('[P0] should generate sitemap.xml in build output', () => {
    // Given: The site has been built with `npm run build`
    // When: We check for the sitemap file
    const exists = existsSync(SITEMAP_PATH);

    // Then: The file should exist
    expect(exists).toBe(true);
  });

  it('[P0] should contain valid XML content', () => {
    // Given: The sitemap file exists
    const content = readFileSync(SITEMAP_PATH, 'utf-8');

    // Then: It should start with XML declaration
    expect(content).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  });
});

describe('Story 6.1: Valid XML Schema (AC6)', () => {
  it('[P0] should have correct sitemap namespace', () => {
    // Given: The sitemap file exists
    const content = readFileSync(SITEMAP_PATH, 'utf-8');

    // Then: It should have the correct sitemap namespace
    expect(content).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  });

  it('[P0] should have urlset root element', () => {
    // Given: The sitemap file exists
    const content = readFileSync(SITEMAP_PATH, 'utf-8');

    // Then: It should have urlset as root element
    expect(content).toContain('<urlset');
    expect(content).toContain('</urlset>');
  });

  it('[P1] should have well-formed XML structure', () => {
    // Given: The sitemap file exists
    const content = readFileSync(SITEMAP_PATH, 'utf-8');

    // Then: Each URL should be wrapped in <url><loc>...</loc></url>
    // Count <url> and </url> tags - they should match
    const openTags = (content.match(/<url>/g) || []).length;
    const closeTags = (content.match(/<\/url>/g) || []).length;

    expect(openTags).toBe(closeTags);
    expect(openTags).toBeGreaterThan(0);
  });
});

describe('Story 6.1: All Pages Included (AC3)', () => {
  describe('Static Pages', () => {
    it('[P0] should include home page URL', () => {
      // Given: The sitemap file exists
      const content = readFileSync(SITEMAP_PATH, 'utf-8');

      // Then: Home page should be listed
      expect(content).toContain(`<loc>${BASE_URL}/</loc>`);
    });

    it('[P0] should include blog listing URL', () => {
      // Given: The sitemap file exists
      const content = readFileSync(SITEMAP_PATH, 'utf-8');

      // Then: Blog listing should be listed
      expect(content).toContain(`<loc>${BASE_URL}/blog/</loc>`);
    });

    it('[P0] should include projects listing URL', () => {
      // Given: The sitemap file exists
      const content = readFileSync(SITEMAP_PATH, 'utf-8');

      // Then: Projects listing should be listed
      expect(content).toContain(`<loc>${BASE_URL}/projects/</loc>`);
    });

    it('[P0] should include resume page URL', () => {
      // Given: The sitemap file exists
      const content = readFileSync(SITEMAP_PATH, 'utf-8');

      // Then: Resume page should be listed
      expect(content).toContain(`<loc>${BASE_URL}/resume/</loc>`);
    });

    it('[P0] should include contact page URL', () => {
      // Given: The sitemap file exists
      const content = readFileSync(SITEMAP_PATH, 'utf-8');

      // Then: Contact page should be listed
      expect(content).toContain(`<loc>${BASE_URL}/contact/</loc>`);
    });
  });

  describe('Blog Posts', () => {
    it('[P0] should include all blog post URLs', () => {
      // Given: The sitemap file exists
      const content = readFileSync(SITEMAP_PATH, 'utf-8');

      // Then: All blog posts should be listed
      for (const postId of BLOG_POST_IDS) {
        expect(content).toContain(`<loc>${BASE_URL}/blog/${postId}/</loc>`);
      }
    });
  });

  describe('Projects', () => {
    it('[P0] should include all project URLs', () => {
      // Given: The sitemap file exists
      const content = readFileSync(SITEMAP_PATH, 'utf-8');

      // Then: All projects should be listed
      for (const projectId of PROJECT_IDS) {
        expect(content).toContain(`<loc>${BASE_URL}/projects/${projectId}/</loc>`);
      }
    });
  });

  describe('URL Count', () => {
    it('[P2] should have expected total URL count', () => {
      // Given: The sitemap file exists
      const content = readFileSync(SITEMAP_PATH, 'utf-8');

      // Count <loc> tags
      const urlCount = (content.match(/<loc>/g) || []).length;

      // Then: Should have exactly 19 URLs (5 static + 5 posts + 9 projects)
      expect(urlCount).toBe(EXPECTED_URL_COUNT);
    });
  });
});

describe('Story 6.1: Correct Base URL (AC4)', () => {
  it('[P1] should use absolute URLs with correct base', () => {
    // Given: The sitemap file exists
    const content = readFileSync(SITEMAP_PATH, 'utf-8');

    // Extract all <loc> values
    const locMatches = content.match(/<loc>([^<]+)<\/loc>/g) || [];

    // Then: All URLs should start with the base URL
    for (const loc of locMatches) {
      const url = loc.replace(/<\/?loc>/g, '');
      expect(url).toMatch(new RegExp(`^${BASE_URL}`));
    }
  });

  it('[P1] should not contain relative URLs', () => {
    // Given: The sitemap file exists
    const content = readFileSync(SITEMAP_PATH, 'utf-8');

    // Extract all <loc> values
    const locMatches = content.match(/<loc>([^<]+)<\/loc>/g) || [];

    // Then: No URLs should be relative (start with /)
    for (const loc of locMatches) {
      const url = loc.replace(/<\/?loc>/g, '');
      expect(url).not.toMatch(/^\/[^/]/); // Relative path pattern
    }
  });

  it('[P1] should not contain localhost URLs', () => {
    // Given: The sitemap file exists
    const content = readFileSync(SITEMAP_PATH, 'utf-8');

    // Then: No localhost URLs
    expect(content).not.toContain('localhost');
    expect(content).not.toContain('127.0.0.1');
  });
});
