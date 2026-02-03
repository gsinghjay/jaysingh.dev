/**
 * Story 6.5: Achieve Lighthouse 100 Scores - Image CLS Prevention Tests (AC9)
 *
 * Verifies that images have width and height attributes to prevent
 * Cumulative Layout Shift (CLS) during page load.
 *
 * Acceptance Criteria:
 * - AC9: Images have width and height attributes (prevents CLS)
 */

import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

describe('Story 6.5 AC9: Image CLS Prevention', () => {
  let htmlFiles: string[] = [];

  beforeAll(async () => {
    const siteDir = path.join(process.cwd(), '_site');
    htmlFiles = await glob('**/*.html', { cwd: siteDir, absolute: true });
  });

  it('site has HTML files to test', () => {
    expect(htmlFiles.length).toBeGreaterThan(0);
  });

  it('blog post diagram images have width/height attributes', async () => {
    // Check blog post pages specifically
    const blogPosts = htmlFiles.filter((f) => f.includes('/blog/') && !f.endsWith('/blog/index.html'));

    for (const file of blogPosts) {
      const content = fs.readFileSync(file, 'utf-8');

      // Find all img tags pointing to diagrams
      const diagramImgRegex = /<img[^>]*src="[^"]*\/diagrams\/[^"]*"[^>]*>/g;
      const diagramImages = content.match(diagramImgRegex) || [];

      for (const img of diagramImages) {
        expect(img).toMatch(/width=["']\d+["']/);
        expect(img).toMatch(/height=["']\d+["']/);
      }
    }
  });

  it('project page diagram images have width/height attributes', async () => {
    // Check project pages specifically
    const projectPages = htmlFiles.filter(
      (f) => f.includes('/projects/') && !f.endsWith('/projects/index.html')
    );

    for (const file of projectPages) {
      const content = fs.readFileSync(file, 'utf-8');

      // Find all img tags pointing to diagrams
      const diagramImgRegex = /<img[^>]*src="[^"]*\/diagrams\/[^"]*"[^>]*>/g;
      const diagramImages = content.match(diagramImgRegex) || [];

      for (const img of diagramImages) {
        expect(img).toMatch(/width=["']\d+["']/);
        expect(img).toMatch(/height=["']\d+["']/);
      }
    }
  });

  it('diagram images use aspect-ratio for responsive sizing', async () => {
    // Check a sample of pages for aspect-ratio styling
    const pagesWithDiagrams = htmlFiles.filter(
      (f) =>
        (f.includes('/blog/') || f.includes('/projects/')) &&
        !f.endsWith('/blog/index.html') &&
        !f.endsWith('/projects/index.html')
    );

    for (const file of pagesWithDiagrams) {
      const content = fs.readFileSync(file, 'utf-8');

      // Find all img tags pointing to diagrams
      const diagramImgRegex = /<img[^>]*src="[^"]*\/diagrams\/[^"]*"[^>]*>/g;
      const diagramImages = content.match(diagramImgRegex) || [];

      for (const img of diagramImages) {
        // Should have aspect-ratio in style attribute
        expect(img).toMatch(/aspect-ratio/);
      }
    }
  });

  it('eleventy config includes CLS prevention attributes in mermaid transform', () => {
    const configPath = path.join(process.cwd(), 'eleventy.config.js');
    const content = fs.readFileSync(configPath, 'utf-8');

    // Check that the mermaid transform includes width/height
    expect(content).toMatch(/width="800"/);
    expect(content).toMatch(/height="400"/);
    expect(content).toMatch(/aspect-ratio/);
    // Check that alt text includes content context (M1 fix)
    expect(content).toMatch(/Diagram.*for.*contentId/);
  });

  it('project template includes CLS prevention attributes for diagrams', () => {
    const templatePath = path.join(process.cwd(), '_includes/layouts/project.njk');
    const content = fs.readFileSync(templatePath, 'utf-8');

    // Check that the template includes width/height
    expect(content).toMatch(/width="800"/);
    expect(content).toMatch(/height="400"/);
    expect(content).toMatch(/aspect-ratio/);
  });

  it('blog post template includes dimensions for author avatar', () => {
    const templatePath = path.join(process.cwd(), '_includes/layouts/blog-post.njk');
    const content = fs.readFileSync(templatePath, 'utf-8');

    // Check that avatar img has width/height
    expect(content).toMatch(/width="48"/);
    expect(content).toMatch(/height="48"/);
  });
});
