/**
 * Navigation helpers for 11ty static site
 *
 * jaysingh.dev uses clean URLs (11ty default):
 * - /blog/ (listing)
 * - /blog/post-name/ (detail)
 * - /projects/
 * - /resume/
 * - /contact/
 *
 * PRD: Clean URLs replacing hash-based SPA routing
 */

import { Page, expect } from '@playwright/test';

/**
 * Valid page routes in the application
 * Per PRD: Home, Blog, Projects, Resume, Contact
 */
export type PageRoute = 'home' | 'blog' | 'projects' | 'resume' | 'contact';

/**
 * Route URL mapping
 */
const routeMap: Record<PageRoute, string> = {
  home: '/',
  blog: '/blog/',
  projects: '/projects/',
  resume: '/resume/',
  contact: '/contact/',
};

/**
 * Navigate to a page and verify the URL
 */
export async function navigateToPage(page: Page, route: PageRoute): Promise<void> {
  await page.goto(routeMap[route]);
  await page.waitForLoadState('networkidle');

  if (route === 'home') {
    await expect(page).toHaveURL(/\/$/);
  } else {
    await expect(page).toHaveURL(new RegExp(`/${route}/`));
  }
}

/**
 * Navigate to a blog post detail page
 * PRD: Clean URLs /blog/post-name/
 */
export async function navigateToBlogPost(page: Page, slug: string): Promise<void> {
  await page.goto(`/blog/${slug}/`);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(new RegExp(`/blog/${slug}/`));
}

/**
 * Navigate to a project detail page
 * PRD: Clean URLs /projects/project-name/
 */
export async function navigateToProject(page: Page, slug: string): Promise<void> {
  await page.goto(`/projects/${slug}/`);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(new RegExp(`/projects/${slug}/`));
}

/**
 * Verify skip link functionality (PRD: NFR14 - Skip links)
 */
export async function verifySkipLink(page: Page): Promise<boolean> {
  const skipLink = page.locator('a[href="#main"], a[href="#main-content"], .skip-link');
  const hasSkipLink = (await skipLink.count()) > 0;

  if (hasSkipLink) {
    // Focus the skip link (it may be visually hidden until focused)
    await skipLink.first().focus();
    await expect(skipLink.first()).toBeVisible();
  }

  return hasSkipLink;
}

/**
 * Get all navigation links from the header
 */
export async function getNavLinks(page: Page): Promise<string[]> {
  const navLinks = page.locator('header nav a, header a[href^="/"]');
  return navLinks.allTextContents();
}

/**
 * Verify Mermaid diagrams are rendered as SVG (not client-side JS)
 * PRD: Build-time SVG rendering for Mermaid diagrams
 */
export async function verifyMermaidSVG(page: Page): Promise<{
  hasMermaid: boolean;
  renderedAsSvg: boolean;
}> {
  // Look for mermaid content (either pre-rendered SVG or mermaid code blocks)
  const mermaidSvg = page.locator('svg.mermaid, [data-mermaid] svg, .mermaid svg');
  const mermaidCode = page.locator('pre.mermaid, code.language-mermaid');

  const svgCount = await mermaidSvg.count();
  const codeCount = await mermaidCode.count();

  return {
    hasMermaid: svgCount > 0 || codeCount > 0,
    renderedAsSvg: svgCount > 0 && codeCount === 0, // Should be SVG, not code blocks
  };
}
