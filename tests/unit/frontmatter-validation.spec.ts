/**
 * Story 5.1: Blog Content Pipeline - Frontmatter Validation Tests (ATDD - RED PHASE)
 *
 * These tests define EXPECTED behavior for frontmatter validation.
 * All tests will FAIL until validation is implemented in eleventy.config.js.
 *
 * Acceptance Criteria:
 * - AC2: Frontmatter schema validation (id, title, date, excerpt, tags, readTime)
 * - AC6: Frontmatter validation errors (clear error messages)
 *
 * TDD Workflow:
 * 1. RED: Run these tests - they will fail (current state)
 * 2. GREEN: Implement validateBlogPost function in eleventy.config.js
 * 3. REFACTOR: Improve validation while keeping tests green
 *
 * NOTE: These are unit tests for the validation function, not E2E tests.
 * The validation runs at BUILD time, so E2E tests cannot catch build errors.
 */

import { describe, it, expect, beforeAll } from 'vitest';

// Type for blog post frontmatter
interface BlogFrontmatter {
  id?: string;
  title?: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
  readTime?: string;
  featured?: boolean;
  relatedProjectIds?: string[];
  permalink?: string;
  layout?: string;
}

// Validation result type
interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// Import the actual validation function from lib/filters.js
import { validateBlogPost as validateBlogPostImpl } from '../../lib/filters.js';

/**
 * Wrapper to ensure TypeScript types are satisfied
 */
function validateBlogPost(frontmatter: BlogFrontmatter, filePath: string): ValidationResult {
  return validateBlogPostImpl(frontmatter, filePath);
}

describe('Story 5.1: Frontmatter Schema Validation (AC2)', () => {
  describe('Required Fields', () => {
    it('[P0] should require id field', () => {
      // Given: Frontmatter missing id
      const frontmatter: BlogFrontmatter = {
        title: 'Test Post',
        date: '2024-01-01',
        excerpt: 'Test excerpt',
        tags: ['test'],
        readTime: '5 min',
      };

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Should be invalid with clear error
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Missing required field 'id' in content/blog/test.md");
    });

    it('[P0] should require title field', () => {
      // Given: Frontmatter missing title
      const frontmatter: BlogFrontmatter = {
        id: 'test-post',
        date: '2024-01-01',
        excerpt: 'Test excerpt',
        tags: ['test'],
        readTime: '5 min',
      };

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Should be invalid with clear error
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Missing required field 'title' in content/blog/test.md");
    });

    it('[P0] should require date field', () => {
      // Given: Frontmatter missing date
      const frontmatter: BlogFrontmatter = {
        id: 'test-post',
        title: 'Test Post',
        excerpt: 'Test excerpt',
        tags: ['test'],
        readTime: '5 min',
      };

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Should be invalid with clear error
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Missing required field 'date' in content/blog/test.md");
    });

    it('[P0] should require excerpt field', () => {
      // Given: Frontmatter missing excerpt
      const frontmatter: BlogFrontmatter = {
        id: 'test-post',
        title: 'Test Post',
        date: '2024-01-01',
        tags: ['test'],
        readTime: '5 min',
      };

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Should be invalid with clear error
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Missing required field 'excerpt' in content/blog/test.md");
    });

    it('[P0] should require tags field', () => {
      // Given: Frontmatter missing tags
      const frontmatter: BlogFrontmatter = {
        id: 'test-post',
        title: 'Test Post',
        date: '2024-01-01',
        excerpt: 'Test excerpt',
        readTime: '5 min',
      };

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Should be invalid with clear error
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Missing required field 'tags' in content/blog/test.md");
    });

    it('[P0] should require readTime field', () => {
      // Given: Frontmatter missing readTime
      const frontmatter: BlogFrontmatter = {
        id: 'test-post',
        title: 'Test Post',
        date: '2024-01-01',
        excerpt: 'Test excerpt',
        tags: ['test'],
      };

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Should be invalid with clear error
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Missing required field 'readTime' in content/blog/test.md");
    });
  });

  describe('Field Types', () => {
    it('[P1] should validate id is a string', () => {
      // Given: Frontmatter with non-string id
      const frontmatter = {
        id: 123, // Invalid: should be string
        title: 'Test Post',
        date: '2024-01-01',
        excerpt: 'Test excerpt',
        tags: ['test'],
        readTime: '5 min',
      } as unknown as BlogFrontmatter;

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Should be invalid
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('id') && e.includes('string'))).toBe(true);
    });

    it('[P1] should validate date format (YYYY-MM-DD)', () => {
      // Given: Frontmatter with invalid date format
      const frontmatter: BlogFrontmatter = {
        id: 'test-post',
        title: 'Test Post',
        date: '01/01/2024', // Invalid: should be YYYY-MM-DD
        excerpt: 'Test excerpt',
        tags: ['test'],
        readTime: '5 min',
      };

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Should be invalid
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('date') && e.includes('YYYY-MM-DD'))).toBe(true);
    });

    it('[P1] should validate tags is an array', () => {
      // Given: Frontmatter with non-array tags
      const frontmatter = {
        id: 'test-post',
        title: 'Test Post',
        date: '2024-01-01',
        excerpt: 'Test excerpt',
        tags: 'test', // Invalid: should be array
        readTime: '5 min',
      } as unknown as BlogFrontmatter;

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Should be invalid
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('tags') && e.includes('array'))).toBe(true);
    });
  });

  describe('Valid Frontmatter', () => {
    it('[P0] should accept valid frontmatter with all required fields', () => {
      // Given: Valid frontmatter
      const frontmatter: BlogFrontmatter = {
        id: 'test-post',
        title: 'Test Post',
        date: '2024-01-01',
        excerpt: 'Test excerpt',
        tags: ['test', 'unit-test'],
        readTime: '5 min',
      };

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Should be valid
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('[P1] should accept valid frontmatter with optional fields', () => {
      // Given: Valid frontmatter with optional fields
      const frontmatter: BlogFrontmatter = {
        id: 'test-post',
        title: 'Test Post',
        date: '2024-01-01',
        excerpt: 'Test excerpt',
        tags: ['test'],
        readTime: '5 min',
        featured: true,
        relatedProjectIds: ['project-1', 'project-2'],
        permalink: '/blog/custom-url/',
        layout: 'layouts/blog-post.njk',
      };

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Should be valid
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});

describe('Story 5.1: Frontmatter Validation Errors (AC6)', () => {
  describe('Error Message Quality', () => {
    it('[P1] should include file path in error messages', () => {
      // Given: Invalid frontmatter
      const frontmatter: BlogFrontmatter = {
        title: 'Test Post',
        date: '2024-01-01',
        excerpt: 'Test excerpt',
        tags: ['test'],
        readTime: '5 min',
      };

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/my-post.md');

      // Then: Error should include file path
      expect(result.errors.some((e) => e.includes('content/blog/my-post.md'))).toBe(true);
    });

    it('[P1] should include field name in error messages', () => {
      // Given: Frontmatter missing id
      const frontmatter: BlogFrontmatter = {
        title: 'Test Post',
        date: '2024-01-01',
        excerpt: 'Test excerpt',
        tags: ['test'],
        readTime: '5 min',
      };

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Error should clearly identify the field
      expect(result.errors.some((e) => e.includes("'id'"))).toBe(true);
    });

    it('[P2] should report all errors at once (not just first)', () => {
      // Given: Frontmatter missing multiple fields
      const frontmatter: BlogFrontmatter = {
        title: 'Test Post',
        // Missing: id, date, excerpt, tags, readTime
      };

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Should report all missing fields
      expect(result.errors.length).toBeGreaterThan(1);
      expect(result.errors.some((e) => e.includes('id'))).toBe(true);
      expect(result.errors.some((e) => e.includes('date'))).toBe(true);
      expect(result.errors.some((e) => e.includes('readTime'))).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('[P2] should handle empty frontmatter object', () => {
      // Given: Empty frontmatter
      const frontmatter: BlogFrontmatter = {};

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Should be invalid with multiple errors
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(6); // All required fields: id, title, date, excerpt, tags, readTime
    });

    it('[P2] should handle empty string values', () => {
      // Given: Frontmatter with empty strings
      const frontmatter: BlogFrontmatter = {
        id: '',
        title: '',
        date: '2024-01-01',
        excerpt: '',
        tags: [],
        readTime: '5 min',
      };

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Should be invalid (empty strings are not valid)
      expect(result.valid).toBe(false);
    });

    it('[P2] should handle empty tags array', () => {
      // Given: Frontmatter with empty tags array
      const frontmatter: BlogFrontmatter = {
        id: 'test-post',
        title: 'Test Post',
        date: '2024-01-01',
        excerpt: 'Test excerpt',
        tags: [], // Empty array
        readTime: '5 min',
      };

      // When: Validating frontmatter
      const result = validateBlogPost(frontmatter, 'content/blog/test.md');

      // Then: Should be invalid (tags should have at least one item)
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('tags') && e.includes('at least one'))).toBe(
        true
      );
    });
  });
});
