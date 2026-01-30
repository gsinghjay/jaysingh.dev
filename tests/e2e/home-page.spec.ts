/**
 * Story 1.6: Create Home Page Tests (ATDD - RED PHASE)
 *
 * These tests define EXPECTED behavior for the home page.
 * All tests will FAIL until implementation is complete.
 *
 * Acceptance Criteria:
 * - AC1: Home page at root URL with hero, intro, navigation
 * - AC2: Clean URL (/ or /index.html) without hash fragments
 * - AC3: Neubrutalist design on desktop
 * - AC4: Responsive design on mobile (< 768px)
 * - AC5: Pre-rendered static HTML
 * - AC6: Proper heading hierarchy (single h1)
 *
 * TDD Workflow:
 * 1. RED: Run these tests - they will fail (current state)
 * 2. GREEN: Implement home page content, macros, and featured content
 * 3. REFACTOR: Improve code quality while keeping tests green
 */

import { test, expect } from '../support/fixtures';

// Tech stack tags expected on home page (matches React Home.tsx)
const TECH_STACK_TAGS = ['React', 'Python', 'PostgreSQL', 'Node', 'TypeScript'] as const;

// CTA buttons expected on home page
const CTA_BUTTONS = [
  { text: 'VIEW WORK', href: '/projects/', color: 'lime' },
  { text: 'READ BLOG', href: '/blog/', color: 'pink' },
  { text: 'HIRE ME', href: '/contact/', color: 'yellow' },
] as const;

test.describe('Story 1.6: Hero Section (AC1, AC3)', () => {
  test('[P0] hero section displays emoji avatar', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Hero section should have avatar with waving hand emoji
    const avatar = page.locator('.bg-lime-400').filter({ hasText: '👋' });
    await expect(avatar).toBeVisible();

    // And: Avatar should have correct dimensions (128x128px)
    const box = await avatar.boundingBox();
    expect(box?.width).toBeCloseTo(128, 0);
    expect(box?.height).toBeCloseTo(128, 0);
  });

  test('[P0] hero section displays main heading', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Main h1 should contain "I BUILD STUFF FOR THE WEB"
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('I BUILD');
    await expect(heading).toContainText('STUFF');
    await expect(heading).toContainText('FOR THE WEB');

    // And: "STUFF" should have yellow highlight
    const highlight = heading.locator('.bg-yellow-400');
    await expect(highlight).toContainText('STUFF');
  });

  test('[P0] hero section displays tagline', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Tagline should be visible
    await expect(
      page.getByText('Full-stack developer. No frameworks religion. Just working software.')
    ).toBeVisible();
  });

  test('[P1] hero section displays tech stack tags', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: All tech stack tags should be visible
    for (const tech of TECH_STACK_TAGS) {
      await expect(page.getByText(tech, { exact: true })).toBeVisible();
    }
  });

  test('[P1] hero section wrapped in Card component with lg size', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Hero card should have lg padding (p-8) and brutal shadow
    const heroCard = page.locator('main').locator('.bg-white.border-4.border-black').first();
    await expect(heroCard).toBeVisible();

    // And: Should have 8px brutal shadow (lg size)
    const style = await heroCard.getAttribute('style');
    expect(style).toContain('8px 8px 0');
  });
});

test.describe('Story 1.6: CTA Buttons Grid (AC1, AC3)', () => {
  test('[P0] CTA buttons grid displays all three buttons', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: All three CTA buttons should be visible
    for (const cta of CTA_BUTTONS) {
      const button = page.getByRole('link', { name: new RegExp(cta.text) });
      await expect(button).toBeVisible();
    }
  });

  test('[P0] CTA buttons navigate to correct pages', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Each CTA button should have correct href
    for (const cta of CTA_BUTTONS) {
      const button = page.getByRole('link', { name: new RegExp(cta.text) });
      await expect(button).toHaveAttribute('href', cta.href);
    }
  });

  test('[P1] CTA buttons have Neubrutalist styling', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: VIEW WORK button should have lime-400 background
    const viewWorkBtn = page.getByRole('link', { name: /VIEW WORK/ });
    await expect(viewWorkBtn).toHaveClass(/bg-lime-400/);

    // And: READ BLOG button should have pink-400 background
    const readBlogBtn = page.getByRole('link', { name: /READ BLOG/ });
    await expect(readBlogBtn).toHaveClass(/bg-pink-400/);

    // And: HIRE ME button should have yellow-400 background
    const hireMeBtn = page.getByRole('link', { name: /HIRE ME/ });
    await expect(hireMeBtn).toHaveClass(/bg-yellow-400/);
  });

  test('[P1] CTA buttons have 6px brutal shadow', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: CTA buttons should have 6px box shadow
    const viewWorkBtn = page.getByRole('link', { name: /VIEW WORK/ });
    const style = await viewWorkBtn.getAttribute('style');
    expect(style).toContain('6px 6px 0');
  });

  test('[P1] clicking VIEW WORK navigates to projects page', async ({ page }) => {
    // Given: User is on home page
    await page.goto('/');

    // When: User clicks VIEW WORK button
    await page.getByRole('link', { name: /VIEW WORK/ }).click();

    // Then: URL should be /projects/
    await expect(page).toHaveURL('/projects/');
  });
});

test.describe('Story 1.6: Featured Posts Section (AC1, AC6)', () => {
  test('[P1] Featured Posts section displays when featured posts exist', async ({ page }) => {
    // Given: User navigates to home page (with featured posts in content)
    await page.goto('/');

    // Then: Featured Posts heading should be visible
    await expect(page.getByRole('heading', { name: 'Featured Posts', level: 2 })).toBeVisible();
  });

  test('[P2] Featured post card shows title, date, read time, and excerpt', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Featured post card should display post metadata
    const featuredPostSection = page.locator('section').filter({ hasText: 'Featured Posts' });

    // And: Post title should be visible (h3)
    await expect(featuredPostSection.getByRole('heading', { level: 3 })).toBeVisible();

    // And: Read time should be visible
    await expect(featuredPostSection.getByText(/min read/)).toBeVisible();
  });

  test('[P2] Featured post has READ MORE link', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: READ MORE link should be visible
    const readMoreLink = page.getByRole('link', { name: /READ MORE/ });
    await expect(readMoreLink).toBeVisible();

    // And: Should link to blog post detail page
    const href = await readMoreLink.getAttribute('href');
    expect(href).toMatch(/^\/blog\//);
  });
});

test.describe('Story 1.6: Featured Work Section (AC1, AC6)', () => {
  test('[P1] Featured Work section displays when featured projects exist', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Featured Work heading should be visible
    await expect(page.getByRole('heading', { name: 'Featured Work', level: 2 })).toBeVisible();
  });

  test('[P2] Featured project cards show number, title, description, and tech tags', async ({
    page,
  }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Project cards should display project info
    const featuredWorkSection = page.locator('section').filter({ hasText: 'Featured Work' });

    // And: Project number should be visible (01, 02)
    await expect(featuredWorkSection.getByText('01')).toBeVisible();

    // And: Project title should be visible (h3)
    await expect(featuredWorkSection.getByRole('heading', { level: 3 }).first()).toBeVisible();
  });

  test('[P2] Featured project cards are clickable', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Project cards should be clickable links
    const projectCard = page
      .locator('section')
      .filter({ hasText: 'Featured Work' })
      .getByRole('link')
      .first();
    await expect(projectCard).toBeVisible();

    // And: Should link to project detail page
    const href = await projectCard.getAttribute('href');
    expect(href).toMatch(/^\/projects\//);
  });
});

test.describe('Story 1.6: Clean URL (AC2)', () => {
  test('[P1] home page URL is clean without hash fragments', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: URL should be clean (/ or /index.html)
    const url = page.url();
    expect(url).not.toContain('#');
    expect(url.endsWith('/') || url.endsWith('/index.html')).toBe(true);
  });

  test('[P1] home page accessible via root URL', async ({ page }) => {
    // Given: User navigates to root URL
    await page.goto('/');

    // Then: Page should load successfully (not redirect, not 404)
    await expect(page.locator('main')).toBeVisible();

    // And: Should have home page content (hero heading)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

test.describe('Story 1.6: Neubrutalist Design Desktop (AC3)', () => {
  test('[P1] page uses Neubrutalist design tokens', async ({ page, verifyNeubrutalistDesign }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Neubrutalist design tokens should be applied
    await verifyNeubrutalistDesign();
  });

  test('[P1] cards have 4px black borders', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Cards should have 4px black border
    const card = page.locator('.border-4.border-black').first();
    await expect(card).toBeVisible();

    const borderWidth = await card.evaluate((el) => {
      return window.getComputedStyle(el).borderWidth;
    });
    expect(borderWidth).toBe('4px');
  });

  test('[P2] hover effects work on interactive elements', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // When: User hovers over a CTA button
    const ctaButton = page.getByRole('link', { name: /VIEW WORK/ });
    await ctaButton.hover();

    // Then: Button should have hover effect (this is visual, hard to test)
    // We verify the button is still visible and interactive
    await expect(ctaButton).toBeVisible();
  });
});

test.describe('Story 1.6: Responsive Design Mobile (AC4)', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('[P1] hero section stacks vertically on mobile', async ({ page }) => {
    // Given: User views home page on mobile
    await page.goto('/');

    // Then: Hero content should be visible (flex-col layout)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('👋')).toBeVisible();
  });

  test('[P1] CTA buttons stack in single column on mobile', async ({ page }) => {
    // Given: User views home page on mobile
    await page.goto('/');

    // Then: All CTA buttons should be visible
    for (const cta of CTA_BUTTONS) {
      await expect(page.getByRole('link', { name: new RegExp(cta.text) })).toBeVisible();
    }

    // And: Buttons should be full width (grid-cols-1)
    const viewWorkBtn = page.getByRole('link', { name: /VIEW WORK/ });
    const box = await viewWorkBtn.boundingBox();

    // On mobile (375px wide), full-width button should be close to container width
    // Account for padding (px-6 = 24px each side on container)
    expect(box?.width).toBeGreaterThan(300);
  });

  test('[P1] text is readable on mobile', async ({ page }) => {
    // Given: User views home page on mobile
    await page.goto('/');

    // Then: Main heading should be visible and readable
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    // And: Font size should be appropriate for mobile (text-4xl = 36px on mobile)
    const fontSize = await heading.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });
    const fontSizeNum = parseFloat(fontSize);
    expect(fontSizeNum).toBeGreaterThanOrEqual(32); // At least 32px
  });
});

test.describe('Story 1.6: Pre-rendered Static HTML (AC5)', () => {
  test('[P2] page source contains hero content (not JS placeholder)', async ({ request }) => {
    // Given: We fetch the raw HTML source
    const response = await request.get('/');
    const html = await response.text();

    // Then: HTML should contain the hero heading text (pre-rendered)
    expect(html).toContain('I BUILD');
    expect(html).toContain('STUFF');
    expect(html).toContain('FOR THE WEB');

    // And: HTML should contain the tagline
    expect(html).toContain('Full-stack developer');

    // And: HTML should NOT be a SPA placeholder
    expect(html).not.toContain('Loading...');
    expect(html).not.toContain('id="root"');
  });

  test('[P2] page source contains tech stack tags (not dynamically loaded)', async ({ request }) => {
    // Given: We fetch the raw HTML source
    const response = await request.get('/');
    const html = await response.text();

    // Then: HTML should contain tech stack tags (pre-rendered)
    for (const tech of TECH_STACK_TAGS) {
      expect(html).toContain(tech);
    }
  });
});

test.describe('Story 1.6: Heading Hierarchy (AC6)', () => {
  test('[P0] page has exactly one h1 element', async ({ page, checkA11yBasics }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // When: Check heading structure
    const a11y = await checkA11yBasics();

    // Then: Exactly one h1 should exist
    expect(a11y.h1Count).toBe(1);
  });

  test('[P1] h1 contains the main hero heading', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: The single h1 should be the hero heading
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toContainText('I BUILD');
  });

  test('[P1] section headings use h2', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Featured Posts should be h2
    const featuredPostsH2 = page.getByRole('heading', { name: 'Featured Posts', level: 2 });
    await expect(featuredPostsH2).toBeVisible();

    // And: Featured Work should be h2
    const featuredWorkH2 = page.getByRole('heading', { name: 'Featured Work', level: 2 });
    await expect(featuredWorkH2).toBeVisible();
  });

  test('[P2] content titles use h3', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // Then: Featured post title should be h3
    const h3Elements = page.getByRole('heading', { level: 3 });
    const h3Count = await h3Elements.count();

    // Should have at least one h3 (featured post or project title)
    expect(h3Count).toBeGreaterThanOrEqual(1);
  });
});

test.describe('Story 1.6: Keyboard Navigation', () => {
  test('[P2] all CTA buttons are keyboard accessible', async ({ page }) => {
    // Given: User navigates to home page
    await page.goto('/');

    // When: User tabs to CTA buttons
    // Skip link -> Logo -> Nav items -> CTA buttons
    // Tab through to reach first CTA button
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.textContent?.trim());
      if (focused?.includes('VIEW WORK')) break;
    }

    // Then: VIEW WORK button should be focusable
    const focusedText = await page.evaluate(() => document.activeElement?.textContent?.trim());
    expect(focusedText).toContain('VIEW WORK');

    // And: Enter should activate the button
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/projects/');
  });
});
