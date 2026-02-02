/**
 * Story 5.5: Local Development Workflow - E2E Tests
 *
 * ATDD: Tests written BEFORE implementation (TDD Red Phase)
 * These tests verify build output requirements from Story 5.5 acceptance criteria.
 *
 * AC5: Production CSS Size (< 50KB)
 * AC6: Complete Build Output
 *
 * @see _bmad-output/implementation-artifacts/5-5-implement-local-development-workflow.md
 */

import { test, expect } from '../support/fixtures';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Story 5.5: Local Development Workflow', () => {
  test.describe('AC5: Production CSS Size', () => {
    test('[P1] production CSS should be minified and under 50KB', async ({ page }) => {
      // Given: The site is built and running
      await page.goto('/');

      // When: We check the CSS file size
      // The CSS file is at _site/css/styles.css after build
      const cssPath = path.resolve(process.cwd(), '_site/css/styles.css');

      // Then: CSS file should exist
      expect(fs.existsSync(cssPath)).toBe(true);

      // And: CSS file should be under 50KB (50 * 1024 = 51200 bytes)
      const stats = fs.statSync(cssPath);
      const fileSizeKB = stats.size / 1024;

      expect(fileSizeKB).toBeLessThan(50);
    });

    test('[P1] CSS should be linked in HTML pages', async ({ page }) => {
      // Given: User navigates to home page
      await page.goto('/');

      // Then: CSS stylesheet should be linked
      const cssLink = page.locator('link[rel="stylesheet"][href*="styles.css"]');
      await expect(cssLink).toHaveCount(1);

      // And: CSS should actually load (no 404)
      const response = await page.request.get('/css/styles.css');
      expect(response.status()).toBe(200);
    });

    test('[P2] CSS should contain Tailwind utilities used in templates', async ({ page }) => {
      // Given: The site is built with proper Tailwind purging
      await page.goto('/');

      // When: We check if Neubrutalist styles are present
      // These classes are used in templates and should NOT be purged
      const body = page.locator('body');

      // Then: Body should have monospace font (Neubrutalist design)
      const fontFamily = await body.evaluate((el) => {
        return window.getComputedStyle(el).fontFamily;
      });
      expect(fontFamily.toLowerCase()).toContain('mono');

      // And: Cream background color should be applied (Neubrutalist design token)
      // This verifies Tailwind config theme extensions are working
      const bgColor = await body.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      // Cream (#FFFBEB) = rgb(255, 251, 235)
      expect(bgColor).toMatch(/rgb\(255,\s*251,\s*235\)|rgba\(255,\s*251,\s*235/);
    });
  });

  test.describe('AC6: Complete Build Output', () => {
    test('[P1] build output should contain all required directories', async ({}) => {
      // Given: npm run build has completed
      const siteDir = path.resolve(process.cwd(), '_site');

      // Then: _site directory should exist
      expect(fs.existsSync(siteDir)).toBe(true);

      // And: All required directories should be present
      const requiredDirs = ['blog', 'projects', 'resume', 'contact', 'css'];

      for (const dir of requiredDirs) {
        const dirPath = path.join(siteDir, dir);
        expect(fs.existsSync(dirPath), `Missing directory: ${dir}`).toBe(true);
      }
    });

    test('[P1] build output should contain index.html at root', async ({}) => {
      // Given: npm run build has completed
      const indexPath = path.resolve(process.cwd(), '_site/index.html');

      // Then: index.html should exist at root
      expect(fs.existsSync(indexPath)).toBe(true);

      // And: It should contain valid HTML
      const content = fs.readFileSync(indexPath, 'utf-8');
      expect(content).toContain('<!DOCTYPE html>');
      expect(content).toContain('<html');
      expect(content).toContain('</html>');
    });

    test('[P1] all pages should be accessible via clean URLs', async ({ page }) => {
      // Given: User navigates to various pages
      const pages = [
        { url: '/', title: /Jay Singh/i },
        { url: '/blog/', title: /Blog/i },
        { url: '/projects/', title: /Projects/i },
        { url: '/resume/', title: /Resume/i },
        { url: '/contact/', title: /Contact/i },
      ];

      for (const { url, title } of pages) {
        // When: Navigating to the page
        const response = await page.goto(url);

        // Then: Page should load successfully (no 404)
        expect(response?.status(), `Page ${url} failed to load`).toBe(200);

        // And: Page should have expected title
        await expect(page).toHaveTitle(title);

        // And: URL should be clean (no hash routing)
        expect(page.url()).not.toContain('#');
      }
    });

    test('[P2] static assets should be properly linked', async ({ page }) => {
      // Given: User is on the home page
      await page.goto('/');

      // Then: All linked stylesheets should load
      const stylesheets = await page.locator('link[rel="stylesheet"]').all();
      for (const link of stylesheets) {
        const href = await link.getAttribute('href');
        if (href && !href.startsWith('http')) {
          const response = await page.request.get(href);
          expect(response.status(), `Stylesheet ${href} failed to load`).toBe(200);
        }
      }
    });
  });
});
