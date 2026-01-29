/**
 * Page Object for the Home page
 *
 * Target: 11ty static site
 * PRD: Home page with navigation and Neubrutalist design
 *
 * Encapsulates selectors and actions for the home page.
 * Use this pattern for complex pages with many interactions.
 */

import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly header: Locator;
  readonly main: Locator;
  readonly footer: Locator;
  readonly skipLink: Locator;
  readonly blogLink: Locator;
  readonly projectsLink: Locator;
  readonly resumeLink: Locator;
  readonly contactLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1').first();
    this.header = page.locator('header');
    this.main = page.locator('main');
    this.footer = page.locator('footer');
    this.skipLink = page.locator('a[href="#main"], a[href="#main-content"], .skip-link');
    this.blogLink = page.locator('a[href="/blog/"]');
    this.projectsLink = page.locator('a[href="/projects/"]');
    this.resumeLink = page.locator('a[href="/resume/"]');
    this.contactLink = page.locator('a[href="/contact/"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectToBeVisible(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async expectLayoutComplete(): Promise<void> {
    await expect(this.header).toBeVisible();
    await expect(this.main).toBeVisible();
    await expect(this.footer).toBeVisible();
  }

  async navigateToBlog(): Promise<void> {
    await this.blogLink.click();
    await expect(this.page).toHaveURL(/\/blog\//);
  }

  async navigateToProjects(): Promise<void> {
    await this.projectsLink.click();
    await expect(this.page).toHaveURL(/\/projects\//);
  }

  async navigateToResume(): Promise<void> {
    await this.resumeLink.click();
    await expect(this.page).toHaveURL(/\/resume\//);
  }

  async navigateToContact(): Promise<void> {
    await this.contactLink.click();
    await expect(this.page).toHaveURL(/\/contact\//);
  }

  async useSkipLink(): Promise<void> {
    await this.skipLink.first().focus();
    await this.skipLink.first().click();
    // Should focus main content
  }
}
