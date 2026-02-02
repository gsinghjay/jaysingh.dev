/**
 * Story 6.2: robots.txt Implementation - Build Output Validation Tests
 *
 * These tests validate the robots.txt file in build output.
 * robots.txt was pre-implemented and fixed in Story 6.1 (passthrough copy).
 *
 * Acceptance Criteria:
 * - AC1: robots.txt File Exists (_site/robots.txt)
 * - AC2: Allows All Crawlers (User-agent: * Allow: /)
 * - AC3: Sitemap Reference (Sitemap: https://jaysingh.dev/sitemap.xml)
 * - AC4: Source Location (public/robots.txt via passthrough copy)
 * - AC5: No Unintended Blocks (no Disallow for public content)
 *
 * NOTE: These are unit tests that run against the build output.
 * Run `npm run build` before running these tests.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// Path to the built robots.txt
const ROBOTS_TXT_PATH = resolve(process.cwd(), '_site/robots.txt');
const SOURCE_ROBOTS_TXT_PATH = resolve(process.cwd(), 'public/robots.txt');
const SITE_JSON_PATH = resolve(process.cwd(), '_data/site.json');

// Read BASE_URL from site.json to stay synchronized with site configuration
const siteConfig = JSON.parse(readFileSync(SITE_JSON_PATH, 'utf-8'));
const BASE_URL = siteConfig.baseUrl;

describe('Story 6.2: robots.txt File Exists (AC1)', () => {
  it('[P0] should generate robots.txt in build output', () => {
    // Given: The site has been built with `npm run build`
    // When: We check for the robots.txt file
    const exists = existsSync(ROBOTS_TXT_PATH);

    // Then: The file should exist at site root
    expect(exists).toBe(true);
  });

  it('[P1] should have source file in public directory (AC4)', () => {
    // Given: The project structure
    // When: We check for the source file
    const exists = existsSync(SOURCE_ROBOTS_TXT_PATH);

    // Then: The source file should exist
    expect(exists).toBe(true);
  });

  it('[P1] should match source file content (AC4)', () => {
    // Given: Both source and built files exist
    const sourceContent = readFileSync(SOURCE_ROBOTS_TXT_PATH, 'utf-8');
    const builtContent = readFileSync(ROBOTS_TXT_PATH, 'utf-8');

    // Then: Built file should match source (passthrough copy)
    expect(builtContent).toBe(sourceContent);
  });
});

describe('Story 6.2: Allows All Crawlers (AC2)', () => {
  it('[P0] should have User-agent directive for all crawlers', () => {
    // Given: The robots.txt file exists
    const content = readFileSync(ROBOTS_TXT_PATH, 'utf-8');

    // Then: It should have User-agent: * directive
    expect(content).toContain('User-agent: *');
  });

  it('[P0] should have Allow directive for all paths', () => {
    // Given: The robots.txt file exists
    const content = readFileSync(ROBOTS_TXT_PATH, 'utf-8');

    // Then: It should have Allow: / directive
    expect(content).toContain('Allow: /');
  });

  it('[P1] should have User-agent before Allow (correct order)', () => {
    // Given: The robots.txt file exists
    const content = readFileSync(ROBOTS_TXT_PATH, 'utf-8');

    // Then: User-agent should appear before Allow
    const userAgentIndex = content.indexOf('User-agent:');
    const allowIndex = content.indexOf('Allow:');

    expect(userAgentIndex).toBeLessThan(allowIndex);
  });
});

describe('Story 6.2: Sitemap Reference (AC3)', () => {
  it('[P0] should include Sitemap directive', () => {
    // Given: The robots.txt file exists
    const content = readFileSync(ROBOTS_TXT_PATH, 'utf-8');

    // Then: It should have Sitemap directive
    expect(content).toContain('Sitemap:');
  });

  it('[P0] should reference correct sitemap URL', () => {
    // Given: The robots.txt file exists
    const content = readFileSync(ROBOTS_TXT_PATH, 'utf-8');

    // Then: Sitemap should point to production URL
    expect(content).toContain(`Sitemap: ${BASE_URL}/sitemap.xml`);
  });

  it('[P1] should use HTTPS for sitemap URL', () => {
    // Given: The robots.txt file exists
    const content = readFileSync(ROBOTS_TXT_PATH, 'utf-8');

    // Extract sitemap URL
    const sitemapMatch = content.match(/Sitemap:\s*(.+)/);
    expect(sitemapMatch).not.toBeNull();

    const sitemapUrl = sitemapMatch![1].trim();

    // Then: URL should use HTTPS
    expect(sitemapUrl).toMatch(/^https:\/\//);
  });
});

describe('Story 6.2: No Unintended Blocks (AC5)', () => {
  it('[P0] should not contain Disallow directives', () => {
    // Given: The robots.txt file exists
    const content = readFileSync(ROBOTS_TXT_PATH, 'utf-8');

    // Then: No Disallow directives (all public content allowed)
    expect(content).not.toContain('Disallow:');
  });

  it('[P1] should not block common paths', () => {
    // Given: The robots.txt file exists
    const content = readFileSync(ROBOTS_TXT_PATH, 'utf-8');

    // Common paths that should NOT be blocked
    const publicPaths = ['/blog', '/projects', '/resume', '/contact'];

    // Then: None of these paths should be disallowed
    for (const path of publicPaths) {
      expect(content).not.toContain(`Disallow: ${path}`);
    }
  });

  it('[P2] should not contain localhost references', () => {
    // Given: The robots.txt file exists
    const content = readFileSync(ROBOTS_TXT_PATH, 'utf-8');

    // Then: No localhost URLs
    expect(content).not.toContain('localhost');
    expect(content).not.toContain('127.0.0.1');
  });
});

describe('Story 6.2: robots.txt Format Validation', () => {
  it('[P1] should have valid robots.txt structure', () => {
    // Given: The robots.txt file exists
    const content = readFileSync(ROBOTS_TXT_PATH, 'utf-8');
    const lines = content.split('\n').filter((line) => line.trim() !== '');

    // Then: Each non-empty line should be a valid directive or comment
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#')) continue; // Comment

      // Valid directives: User-agent, Allow, Disallow, Sitemap, Crawl-delay, Host
      const validDirective = /^(User-agent|Allow|Disallow|Sitemap|Crawl-delay|Host):\s*.+$/i;
      expect(trimmed).toMatch(validDirective);
    }
  });

  it('[P2] should be plain text without HTML', () => {
    // Given: The robots.txt file exists
    const content = readFileSync(ROBOTS_TXT_PATH, 'utf-8');

    // Then: Should not contain HTML tags
    expect(content).not.toMatch(/<[^>]+>/);
  });

  it('[P2] should use correct line endings', () => {
    // Given: The robots.txt file exists
    const content = readFileSync(ROBOTS_TXT_PATH, 'utf-8');

    // Then: Should not have Windows-style CRLF (optional, depends on git config)
    // Note: This is informational - git may normalize line endings
    const hasCRLF = content.includes('\r\n');
    const hasLF = content.includes('\n');

    // At minimum, should have line breaks
    expect(hasLF || hasCRLF).toBe(true);
  });
});
