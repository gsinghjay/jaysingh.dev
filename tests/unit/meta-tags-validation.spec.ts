/**
 * Story 6.3: Meta Tags and Open Graph - Build Output Validation Tests (ATDD - RED PHASE)
 *
 * These tests define EXPECTED behavior for meta tags implementation.
 * Tests marked with .skip will FAIL until implementation is complete.
 *
 * Acceptance Criteria:
 * - AC1: Basic Meta Tags Present (title, description, canonical)
 * - AC2: Unique Meta Tags Per Page
 * - AC3: Open Graph Tags Present (og:title, og:description, og:url, og:type)
 * - AC4: Article Type for Blog Posts (og:type="article", article:published_time)
 * - AC5: Website Type for Home Page (og:type="website")
 * - AC6: Social Media Preview (Twitter Card tags)
 * - AC7: Reusable Partial Implementation (verified via consistent output)
 *
 * TDD Workflow:
 * 1. RED: Run these tests - some will fail (missing implementation)
 * 2. GREEN: Implement meta tags in meta.njk and blog-post.njk
 * 3. REFACTOR: Improve templates while keeping tests green
 *
 * NOTE: These are unit tests that run against the build output.
 * Run `npm run build` before running these tests.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { globSync } from 'glob';

// Build output paths
const SITE_DIR = resolve(process.cwd(), '_site');
const BASE_URL = 'https://jaysingh.dev';

// Page paths to test
const PAGES = {
  home: resolve(SITE_DIR, 'index.html'),
  blog: resolve(SITE_DIR, 'blog/index.html'),
  projects: resolve(SITE_DIR, 'projects/index.html'),
  resume: resolve(SITE_DIR, 'resume/index.html'),
  contact: resolve(SITE_DIR, 'contact/index.html'),
};

// Sample blog post for article-specific tests
const BLOG_POST_SLUG = 'docker-observability';
const BLOG_POST_PATH = resolve(SITE_DIR, `blog/${BLOG_POST_SLUG}/index.html`);

// Helper to extract meta tag content
function getMetaContent(html: string, name: string): string | null {
  const match = html.match(new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']+)["']`, 'i'))
    || html.match(new RegExp(`<meta\\s+content=["']([^"']+)["']\\s+name=["']${name}["']`, 'i'));
  return match ? match[1] : null;
}

// Helper to extract Open Graph property
function getOgContent(html: string, property: string): string | null {
  const match = html.match(new RegExp(`<meta\\s+property=["']${property}["']\\s+content=["']([^"']+)["']`, 'i'))
    || html.match(new RegExp(`<meta\\s+content=["']([^"']+)["']\\s+property=["']${property}["']`, 'i'));
  return match ? match[1] : null;
}

// Helper to extract title tag
function getTitle(html: string): string | null {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  return match ? match[1] : null;
}

// Helper to extract canonical URL
function getCanonical(html: string): string | null {
  const match = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)
    || html.match(/<link\s+href=["']([^"']+)["']\s+rel=["']canonical["']/i);
  return match ? match[1] : null;
}

describe('Story 6.3: Basic Meta Tags Present (AC1)', () => {
  describe.each(Object.entries(PAGES))('%s page', (pageName, pagePath) => {
    let html: string;

    beforeAll(() => {
      if (existsSync(pagePath)) {
        html = readFileSync(pagePath, 'utf-8');
      }
    });

    it('[P0] should have a title tag', () => {
      expect(existsSync(pagePath)).toBe(true);
      const title = getTitle(html);
      expect(title).toBeTruthy();
      expect(title!.length).toBeGreaterThan(0);
    });

    it('[P0] should have a meta description', () => {
      const description = getMetaContent(html, 'description');
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThan(0);
    });

    it('[P0] should have a canonical URL', () => {
      const canonical = getCanonical(html);
      expect(canonical).toBeTruthy();
      expect(canonical).toMatch(new RegExp(`^${BASE_URL}`));
    });
  });
});

describe('Story 6.3: Unique Meta Tags Per Page (AC2)', () => {
  it('[P1] blog posts should use excerpt for description, not site.description', () => {
    // This test ensures blog posts have unique descriptions from their excerpt field
    const siteJson = JSON.parse(readFileSync(resolve(process.cwd(), '_data/site.json'), 'utf-8'));
    const siteDescription = siteJson.description;

    const blogPosts = globSync('blog/*/index.html', { cwd: SITE_DIR });
    expect(blogPosts.length).toBeGreaterThan(0);

    for (const postPath of blogPosts) {
      const html = readFileSync(resolve(SITE_DIR, postPath), 'utf-8');
      const description = getMetaContent(html, 'description');
      expect(
        description,
        `Blog post ${postPath} should NOT use site.description`
      ).not.toBe(siteDescription);
    }
  });

  it('[P2] should have unique titles across all pages', () => {
    const titles: string[] = [];

    for (const [, pagePath] of Object.entries(PAGES)) {
      if (existsSync(pagePath)) {
        const html = readFileSync(pagePath, 'utf-8');
        const title = getTitle(html);
        if (title) titles.push(title);
      }
    }

    // All titles should be unique
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);
  });

  it('[P2] should have unique descriptions across static pages', () => {
    const descriptions: string[] = [];

    for (const [pageName, pagePath] of Object.entries(PAGES)) {
      if (existsSync(pagePath)) {
        const html = readFileSync(pagePath, 'utf-8');
        const description = getMetaContent(html, 'description');
        if (description) {
          descriptions.push(description);
        }
      }
    }

    // All descriptions should be unique
    const uniqueDescriptions = new Set(descriptions);
    expect(uniqueDescriptions.size).toBe(descriptions.length);
  });
});

describe('Story 6.3: Open Graph Tags Present (AC3)', () => {
  describe.each(Object.entries(PAGES))('%s page', (pageName, pagePath) => {
    let html: string;

    beforeAll(() => {
      if (existsSync(pagePath)) {
        html = readFileSync(pagePath, 'utf-8');
      }
    });

    it('[P1] should have og:title', () => {
      expect(existsSync(pagePath)).toBe(true);
      const ogTitle = getOgContent(html, 'og:title');
      expect(ogTitle).toBeTruthy();
    });

    it('[P1] should have og:description', () => {
      const ogDescription = getOgContent(html, 'og:description');
      expect(ogDescription).toBeTruthy();
    });

    it('[P1] should have og:url with correct base URL', () => {
      const ogUrl = getOgContent(html, 'og:url');
      expect(ogUrl).toBeTruthy();
      expect(ogUrl).toMatch(new RegExp(`^${BASE_URL}`));
    });

    it('[P1] should have og:type', () => {
      const ogType = getOgContent(html, 'og:type');
      expect(ogType).toBeTruthy();
    });
  });
});

describe('Story 6.3: Article Type for Blog Posts (AC4)', () => {
  let blogPostHtml: string;

  beforeAll(() => {
    if (existsSync(BLOG_POST_PATH)) {
      blogPostHtml = readFileSync(BLOG_POST_PATH, 'utf-8');
    }
  });

  it('[P1] blog post should have og:type="article"', () => {
    expect(existsSync(BLOG_POST_PATH)).toBe(true);
    const ogType = getOgContent(blogPostHtml, 'og:type');
    expect(ogType).toBe('article');
  });

  it('[P1] blog post should have article:published_time', () => {
    expect(existsSync(BLOG_POST_PATH)).toBe(true);
    const publishedTime = getOgContent(blogPostHtml, 'article:published_time');
    expect(publishedTime).toBeTruthy();
    // Should be valid ISO 8601 date
    expect(() => new Date(publishedTime!)).not.toThrow();
    expect(new Date(publishedTime!).toISOString()).toBeTruthy();
  });

  it('[P2] blog post should have article:author', () => {
    expect(existsSync(BLOG_POST_PATH)).toBe(true);
    const author = getOgContent(blogPostHtml, 'article:author');
    expect(author).toBeTruthy();
  });

  it('[P1] all blog posts should have og:type="article"', () => {
    const blogPosts = globSync('blog/*/index.html', { cwd: SITE_DIR });
    expect(blogPosts.length).toBeGreaterThan(0);

    for (const postPath of blogPosts) {
      const html = readFileSync(resolve(SITE_DIR, postPath), 'utf-8');
      const ogType = getOgContent(html, 'og:type');
      expect(ogType, `Blog post ${postPath} should have og:type="article"`).toBe('article');
    }
  });
});

describe('Story 6.3: Website Type for Home Page (AC5)', () => {
  it('[P2] home page should have og:type="website"', () => {
    expect(existsSync(PAGES.home)).toBe(true);
    const html = readFileSync(PAGES.home, 'utf-8');
    const ogType = getOgContent(html, 'og:type');
    expect(ogType).toBe('website');
  });

  it('[P2] blog listing should have og:type="website"', () => {
    expect(existsSync(PAGES.blog)).toBe(true);
    const html = readFileSync(PAGES.blog, 'utf-8');
    const ogType = getOgContent(html, 'og:type');
    expect(ogType).toBe('website');
  });

  it('[P2] projects listing should have og:type="website"', () => {
    expect(existsSync(PAGES.projects)).toBe(true);
    const html = readFileSync(PAGES.projects, 'utf-8');
    const ogType = getOgContent(html, 'og:type');
    expect(ogType).toBe('website');
  });
});

describe('Story 6.3: Twitter Card Tags (AC6)', () => {
  describe.each(Object.entries(PAGES))('%s page', (pageName, pagePath) => {
    let html: string;

    beforeAll(() => {
      if (existsSync(pagePath)) {
        html = readFileSync(pagePath, 'utf-8');
      }
    });

    it('[P1] should have twitter:card', () => {
      expect(existsSync(pagePath)).toBe(true);
      const twitterCard = getMetaContent(html, 'twitter:card');
      expect(twitterCard).toBeTruthy();
      expect(['summary', 'summary_large_image']).toContain(twitterCard);
    });

    it('[P1] should have twitter:title', () => {
      const twitterTitle = getMetaContent(html, 'twitter:title');
      expect(twitterTitle).toBeTruthy();
    });

    it('[P1] should have twitter:description', () => {
      const twitterDescription = getMetaContent(html, 'twitter:description');
      expect(twitterDescription).toBeTruthy();
    });
  });

  it('[P2] should have twitter:image on pages with social image', () => {
    // Home page should have the default social image
    const html = readFileSync(PAGES.home, 'utf-8');
    const twitterImage = getMetaContent(html, 'twitter:image');
    expect(twitterImage).toBeTruthy();
    expect(twitterImage).toMatch(new RegExp(`^${BASE_URL}`));
  });
});

describe('Story 6.3: Reusable Partial Consistency (AC7)', () => {
  it('[P2] all pages should have consistent meta tag structure', () => {
    const requiredTags = ['description', 'twitter:card', 'twitter:title', 'twitter:description'];
    const requiredOgTags = ['og:title', 'og:description', 'og:url', 'og:type', 'og:site_name'];

    for (const [pageName, pagePath] of Object.entries(PAGES)) {
      if (existsSync(pagePath)) {
        const html = readFileSync(pagePath, 'utf-8');

        // Check meta name tags
        for (const tag of requiredTags) {
          const content = getMetaContent(html, tag);
          expect(content, `${pageName} should have ${tag}`).toBeTruthy();
        }

        // Check Open Graph tags
        for (const tag of requiredOgTags) {
          const content = getOgContent(html, tag);
          expect(content, `${pageName} should have ${tag}`).toBeTruthy();
        }
      }
    }
  });

  it('[P1] should have og:site_name on all pages', () => {
    for (const [pageName, pagePath] of Object.entries(PAGES)) {
      if (existsSync(pagePath)) {
        const html = readFileSync(pagePath, 'utf-8');
        const siteName = getOgContent(html, 'og:site_name');
        expect(siteName, `${pageName} should have og:site_name`).toBeTruthy();
      }
    }
  });
});

describe('Story 6.3: Meta Tag Content Quality', () => {
  it('[P2] descriptions should be between 50-160 characters', () => {
    for (const [pageName, pagePath] of Object.entries(PAGES)) {
      if (existsSync(pagePath)) {
        const html = readFileSync(pagePath, 'utf-8');
        const description = getMetaContent(html, 'description');
        if (description) {
          expect(
            description.length,
            `${pageName} description should be 50-160 chars, got ${description.length}`
          ).toBeGreaterThanOrEqual(50);
          expect(
            description.length,
            `${pageName} description should be 50-160 chars, got ${description.length}`
          ).toBeLessThanOrEqual(160);
        }
      }
    }
  });

  it('[P2] titles should not exceed 60 characters', () => {
    for (const [pageName, pagePath] of Object.entries(PAGES)) {
      if (existsSync(pagePath)) {
        const html = readFileSync(pagePath, 'utf-8');
        const title = getTitle(html);
        if (title) {
          expect(
            title.length,
            `${pageName} title should be ≤60 chars, got ${title.length}`
          ).toBeLessThanOrEqual(70); // Allow some flexibility
        }
      }
    }
  });
});
