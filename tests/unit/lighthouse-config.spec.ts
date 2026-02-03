/**
 * Story 6.5: Lighthouse 100 Scores - Configuration Tests
 *
 * Unit tests for Lighthouse CI configuration validation.
 * Verifies that all required assertions and settings are properly configured.
 *
 * Acceptance Criteria:
 * - AC1-5: Lighthouse scores configuration (Performance, Accessibility, Best Practices, SEO)
 * - AC6: Core Web Vitals thresholds
 * - AC7-8: Resource budget assertions
 */

import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Story 6.5: Lighthouse CI Configuration', () => {
  let config: {
    ci: {
      collect: {
        staticDistDir: string;
        url: string[];
        numberOfRuns: number;
        settings?: Record<string, unknown>;
      };
      assert: {
        assertions: Record<string, [string, { minScore?: number; maxNumericValue?: number }]>;
      };
      upload: {
        target: string;
      };
    };
  };

  beforeAll(async () => {
    // Load the lighthouse config using dynamic import for CommonJS
    const configPath = path.join(process.cwd(), 'lighthouserc.cjs');
    expect(fs.existsSync(configPath)).toBe(true);

    // Use require for CommonJS module
    const { createRequire } = await import('module');
    const require = createRequire(import.meta.url);
    config = require(configPath);
  });

  describe('Configuration Structure', () => {
    it('has ci.collect configuration', () => {
      expect(config.ci).toBeDefined();
      expect(config.ci.collect).toBeDefined();
    });

    it('uses static server for local testing', () => {
      expect(config.ci.collect.staticDistDir).toBe('./_site');
    });

    it('tests required pages', () => {
      const urls = config.ci.collect.url;
      expect(urls).toContain('http://localhost/');
      expect(urls).toContain('http://localhost/blog/');
      expect(urls).toContain('http://localhost/projects/');
      expect(urls).toContain('http://localhost/resume/');
      expect(urls).toContain('http://localhost/contact/');
    });

    it('runs multiple times for consistency', () => {
      expect(config.ci.collect.numberOfRuns).toBeGreaterThanOrEqual(3);
    });
  });

  describe('AC1-5: Category Score Assertions', () => {
    it('asserts Performance score >= 100', () => {
      const assertion = config.ci.assert.assertions['categories:performance'];
      expect(assertion).toBeDefined();
      expect(assertion[0]).toBe('error');
      expect(assertion[1].minScore).toBe(1); // 1 = 100%
    });

    it('asserts Accessibility score >= 100', () => {
      const assertion = config.ci.assert.assertions['categories:accessibility'];
      expect(assertion).toBeDefined();
      expect(assertion[0]).toBe('error');
      expect(assertion[1].minScore).toBe(1);
    });

    it('asserts Best Practices score >= 100', () => {
      const assertion = config.ci.assert.assertions['categories:best-practices'];
      expect(assertion).toBeDefined();
      expect(assertion[0]).toBe('error');
      expect(assertion[1].minScore).toBe(1);
    });

    it('asserts SEO score >= 100', () => {
      const assertion = config.ci.assert.assertions['categories:seo'];
      expect(assertion).toBeDefined();
      expect(assertion[0]).toBe('error');
      expect(assertion[1].minScore).toBe(1);
    });
  });

  describe('AC6: Core Web Vitals Assertions', () => {
    it('asserts FCP < 1.0s (1000ms)', () => {
      const assertion = config.ci.assert.assertions['first-contentful-paint'];
      expect(assertion).toBeDefined();
      expect(assertion[0]).toBe('error');
      expect(assertion[1].maxNumericValue).toBeLessThanOrEqual(1000);
    });

    it('asserts LCP < 1.5s (1500ms)', () => {
      const assertion = config.ci.assert.assertions['largest-contentful-paint'];
      expect(assertion).toBeDefined();
      expect(assertion[0]).toBe('error');
      expect(assertion[1].maxNumericValue).toBeLessThanOrEqual(1500);
    });

    it('asserts TBT < 100ms', () => {
      const assertion = config.ci.assert.assertions['total-blocking-time'];
      expect(assertion).toBeDefined();
      expect(assertion[0]).toBe('error');
      expect(assertion[1].maxNumericValue).toBeLessThanOrEqual(100);
    });

    it('asserts CLS < 0.1', () => {
      const assertion = config.ci.assert.assertions['cumulative-layout-shift'];
      expect(assertion).toBeDefined();
      expect(assertion[0]).toBe('error');
      expect(assertion[1].maxNumericValue).toBeLessThanOrEqual(0.1);
    });
  });

  describe('AC7-8: Resource Budget Assertions', () => {
    it('asserts CSS bundle < 50KB', () => {
      const assertion = config.ci.assert.assertions['resource-summary:stylesheet:size'];
      expect(assertion).toBeDefined();
      expect(assertion[0]).toBe('error');
      expect(assertion[1].maxNumericValue).toBeLessThanOrEqual(51200); // 50KB in bytes
    });

    it('asserts JavaScript bundle < 50KB', () => {
      const assertion = config.ci.assert.assertions['resource-summary:script:size'];
      expect(assertion).toBeDefined();
      expect(assertion[0]).toBe('error');
      expect(assertion[1].maxNumericValue).toBeLessThanOrEqual(51200);
    });
  });

  describe('Upload Configuration', () => {
    it('uses temporary public storage', () => {
      expect(config.ci.upload.target).toBe('temporary-public-storage');
    });
  });
});

describe('Story 6.5: GitHub Actions Workflow', () => {
  let workflowContent: string;

  beforeAll(() => {
    const workflowPath = path.join(process.cwd(), '.github/workflows/lighthouse.yml');
    expect(fs.existsSync(workflowPath)).toBe(true);
    workflowContent = fs.readFileSync(workflowPath, 'utf-8');
  });

  it('workflow file exists', () => {
    expect(workflowContent).toBeDefined();
    expect(workflowContent.length).toBeGreaterThan(0);
  });

  it('triggers on push to main', () => {
    expect(workflowContent).toMatch(/push:/);
    expect(workflowContent).toMatch(/branches:.*\[main\]/);
  });

  it('triggers on pull requests to main', () => {
    expect(workflowContent).toMatch(/pull_request:/);
  });

  it('uses treosh/lighthouse-ci-action', () => {
    expect(workflowContent).toMatch(/treosh\/lighthouse-ci-action/);
  });

  it('references correct config file', () => {
    expect(workflowContent).toMatch(/lighthouserc\.cjs/);
  });

  it('uploads artifacts', () => {
    expect(workflowContent).toMatch(/uploadArtifacts:\s*true/);
  });

  it('builds site before running Lighthouse', () => {
    // Workflow should have build steps before Lighthouse
    const lines = workflowContent.split('\n');
    const buildIndex = lines.findIndex((l) => l.includes('npm run build') || l.includes('npx eleventy'));
    const lighthouseIndex = lines.findIndex((l) => l.includes('lighthouse-ci-action'));

    expect(buildIndex).toBeLessThan(lighthouseIndex);
  });
});
