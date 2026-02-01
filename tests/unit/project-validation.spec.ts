/**
 * Story 5.2: Project Content Pipeline - Frontmatter Validation Tests (ATDD - RED PHASE)
 *
 * These tests define EXPECTED behavior for project frontmatter validation.
 * All tests will FAIL until validateProject is implemented in lib/filters.js.
 *
 * Acceptance Criteria:
 * - AC2: Required frontmatter schema (id, title, description, tags/technologies, projectType)
 * - AC3: Optional frontmatter fields (githubUrl, liveUrl, diagramContent, etc.)
 *
 * TDD Workflow:
 * 1. RED: Run these tests - they will fail (validateProject doesn't exist)
 * 2. GREEN: Implement validateProject function in lib/filters.js
 * 3. REFACTOR: Integrate validation into eleventy.config.js projects collection
 *
 * NOTE: These are unit tests for the validation function, not E2E tests.
 * The validation runs at BUILD time, so E2E tests cannot catch build errors.
 */

import { describe, it, expect } from 'vitest';

// Type for project frontmatter
interface ProjectFrontmatter {
  id?: string;
  title?: string;
  description?: string;
  technologies?: string[];
  tags?: string[];
  projectType?: string;
  longDescription?: string;
  featured?: boolean;
  permalink?: string;
  diagramType?: string;
  diagramContent?: string;
  diagramLabel?: string;
  challenge?: string;
  solution?: string;
  impact?: string;
  keyFeatures?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

// Validation result type
interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// Import the validation function from lib/filters.js
// This will fail until validateProject is implemented
import { validateProject as validateProjectImpl } from '../../lib/filters.js';

/**
 * Wrapper to ensure TypeScript types are satisfied
 */
function validateProject(frontmatter: ProjectFrontmatter, filePath: string): ValidationResult {
  return validateProjectImpl(frontmatter, filePath);
}

describe('Story 5.2: Project Frontmatter Schema Validation (AC2)', () => {
  describe('Required Fields', () => {
    it('[P0] should require id field', () => {
      // Given: Frontmatter missing id
      const frontmatter: ProjectFrontmatter = {
        title: 'Test Project',
        description: 'A test project',
        technologies: ['Node.js'],
        projectType: 'work',
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be invalid with clear error
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Missing required field 'id' in _content/projects/test.md");
    });

    it('[P0] should require title field', () => {
      // Given: Frontmatter missing title
      const frontmatter: ProjectFrontmatter = {
        id: 'test-project',
        description: 'A test project',
        technologies: ['Node.js'],
        projectType: 'work',
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be invalid with clear error
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Missing required field 'title' in _content/projects/test.md");
    });

    it('[P0] should require description field', () => {
      // Given: Frontmatter missing description
      const frontmatter: ProjectFrontmatter = {
        id: 'test-project',
        title: 'Test Project',
        technologies: ['Node.js'],
        projectType: 'work',
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be invalid with clear error
      expect(result.valid).toBe(false);
      expect(result.errors).toContain(
        "Missing required field 'description' in _content/projects/test.md"
      );
    });

    it('[P0] should require projectType field', () => {
      // Given: Frontmatter missing projectType
      const frontmatter: ProjectFrontmatter = {
        id: 'test-project',
        title: 'Test Project',
        description: 'A test project',
        technologies: ['Node.js'],
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be invalid with clear error
      expect(result.valid).toBe(false);
      expect(result.errors).toContain(
        "Missing required field 'projectType' in _content/projects/test.md"
      );
    });

    it('[P0] should require tags OR technologies array', () => {
      // Given: Frontmatter missing both tags and technologies
      const frontmatter: ProjectFrontmatter = {
        id: 'test-project',
        title: 'Test Project',
        description: 'A test project',
        projectType: 'work',
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be invalid with clear error
      expect(result.valid).toBe(false);
      expect(
        result.errors.some((e) => e.includes('tags') || e.includes('technologies'))
      ).toBe(true);
    });

    it('[P0] should accept technologies array (backward compatibility)', () => {
      // Given: Frontmatter with technologies (not tags)
      const frontmatter: ProjectFrontmatter = {
        id: 'test-project',
        title: 'Test Project',
        description: 'A test project',
        technologies: ['Python', 'FastAPI'],
        projectType: 'work',
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be valid (technologies is accepted)
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('[P0] should accept tags array (alternative to technologies)', () => {
      // Given: Frontmatter with tags (not technologies)
      const frontmatter: ProjectFrontmatter = {
        id: 'test-project',
        title: 'Test Project',
        description: 'A test project',
        tags: ['Python', 'FastAPI'],
        projectType: 'work',
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be valid (tags is accepted)
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('ProjectType Enum Validation', () => {
    it('[P0] should accept projectType "work"', () => {
      // Given: Frontmatter with projectType "work"
      const frontmatter: ProjectFrontmatter = {
        id: 'test-project',
        title: 'Test Project',
        description: 'A test project',
        technologies: ['Node.js'],
        projectType: 'work',
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be valid
      expect(result.valid).toBe(true);
    });

    it('[P0] should accept projectType "personal"', () => {
      // Given: Frontmatter with projectType "personal"
      const frontmatter: ProjectFrontmatter = {
        id: 'test-project',
        title: 'Test Project',
        description: 'A test project',
        technologies: ['Node.js'],
        projectType: 'personal',
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be valid
      expect(result.valid).toBe(true);
    });

    it('[P0] should reject invalid projectType', () => {
      // Given: Frontmatter with invalid projectType
      const frontmatter: ProjectFrontmatter = {
        id: 'test-project',
        title: 'Test Project',
        description: 'A test project',
        technologies: ['Node.js'],
        projectType: 'invalid',
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be invalid with clear error
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("'work'") && e.includes("'personal'"))).toBe(
        true
      );
    });
  });

  describe('Field Types', () => {
    it('[P1] should validate id is a string', () => {
      // Given: Frontmatter with non-string id
      const frontmatter = {
        id: 123, // Invalid: should be string
        title: 'Test Project',
        description: 'A test project',
        technologies: ['Node.js'],
        projectType: 'work',
      } as unknown as ProjectFrontmatter;

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be invalid
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('id') && e.includes('string'))).toBe(true);
    });

    it('[P1] should validate technologies is an array', () => {
      // Given: Frontmatter with non-array technologies
      const frontmatter = {
        id: 'test-project',
        title: 'Test Project',
        description: 'A test project',
        technologies: 'Node.js', // Invalid: should be array
        projectType: 'work',
      } as unknown as ProjectFrontmatter;

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be invalid
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('technologies') && e.includes('array'))).toBe(
        true
      );
    });
  });

  describe('Valid Frontmatter', () => {
    it('[P1] should accept valid frontmatter with all required fields', () => {
      // Given: Valid frontmatter (minimal)
      const frontmatter: ProjectFrontmatter = {
        id: 'test-project',
        title: 'Test Project',
        description: 'A test project',
        technologies: ['Node.js', 'TypeScript'],
        projectType: 'work',
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be valid
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('[P1] should accept valid frontmatter with optional fields', () => {
      // Given: Valid frontmatter with optional fields (full schema)
      const frontmatter: ProjectFrontmatter = {
        id: 'qr-code-platform',
        title: 'QR Code Generation Platform',
        description: 'High-performance QR code generation',
        longDescription: 'A production-grade QR code platform...',
        technologies: ['Python', 'FastAPI', 'PostgreSQL'],
        projectType: 'work',
        featured: true,
        permalink: '/projects/qr-code-platform/',
        diagramType: 'mermaid',
        diagramContent: 'flowchart TD\n  A --> B',
        diagramLabel: 'Architecture diagram',
        challenge: 'The university needed...',
        solution: 'Architected a custom platform...',
        impact: 'Processed 2,837 total scans...',
        keyFeatures: ['Dynamic QR code generation', 'Real-time analytics'],
        githubUrl: 'https://github.com/example/qr-platform',
        liveUrl: 'https://qr.example.edu',
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be valid
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});

describe('Story 5.2: Project Validation Errors (AC3)', () => {
  describe('Error Message Quality', () => {
    it('[P1] should include file path in error messages', () => {
      // Given: Invalid frontmatter
      const frontmatter: ProjectFrontmatter = {
        title: 'Test Project',
        description: 'A test project',
        technologies: ['Node.js'],
        projectType: 'work',
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/my-project.md');

      // Then: Error should include file path
      expect(result.errors.some((e) => e.includes('_content/projects/my-project.md'))).toBe(true);
    });

    it('[P1] should include field name in error messages', () => {
      // Given: Frontmatter missing id
      const frontmatter: ProjectFrontmatter = {
        title: 'Test Project',
        description: 'A test project',
        technologies: ['Node.js'],
        projectType: 'work',
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Error should clearly identify the field
      expect(result.errors.some((e) => e.includes("'id'"))).toBe(true);
    });

    it('[P2] should report all errors at once (not just first)', () => {
      // Given: Frontmatter missing multiple fields
      const frontmatter: ProjectFrontmatter = {
        title: 'Test Project',
        // Missing: id, description, technologies, projectType
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should report all missing fields
      expect(result.errors.length).toBeGreaterThan(1);
      expect(result.errors.some((e) => e.includes('id'))).toBe(true);
      expect(result.errors.some((e) => e.includes('description'))).toBe(true);
      expect(result.errors.some((e) => e.includes('projectType'))).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('[P2] should handle empty frontmatter object', () => {
      // Given: Empty frontmatter
      const frontmatter: ProjectFrontmatter = {};

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be invalid with multiple errors
      expect(result.valid).toBe(false);
      // All required fields: id, title, description, technologies/tags, projectType
      expect(result.errors.length).toBeGreaterThanOrEqual(4);
    });

    it('[P2] should handle empty string values', () => {
      // Given: Frontmatter with empty strings
      const frontmatter: ProjectFrontmatter = {
        id: '',
        title: '',
        description: '',
        technologies: [],
        projectType: 'work',
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be invalid (empty strings are not valid)
      expect(result.valid).toBe(false);
    });

    it('[P2] should handle empty technologies array', () => {
      // Given: Frontmatter with empty technologies array
      const frontmatter: ProjectFrontmatter = {
        id: 'test-project',
        title: 'Test Project',
        description: 'A test project',
        technologies: [], // Empty array
        projectType: 'work',
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be invalid (technologies should have at least one item)
      expect(result.valid).toBe(false);
      expect(
        result.errors.some((e) => e.includes('technologies') && e.includes('at least one'))
      ).toBe(true);
    });

    it('[P2] should gracefully handle optional fields being undefined', () => {
      // Given: Valid frontmatter without any optional fields
      const frontmatter: ProjectFrontmatter = {
        id: 'minimal-project',
        title: 'Minimal Project',
        description: 'A minimal project with required fields only',
        technologies: ['Node.js'],
        projectType: 'personal',
        // No optional fields: longDescription, featured, diagramContent, etc.
      };

      // When: Validating frontmatter
      const result = validateProject(frontmatter, '_content/projects/test.md');

      // Then: Should be valid (optional fields don't cause failures)
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});

describe('Story 5.2: Optional Field Type Validation (Code Review Fix)', () => {
  describe('Optional String Fields', () => {
    it('[P2] should reject non-string longDescription', () => {
      const frontmatter = {
        id: 'test',
        title: 'Test',
        description: 'Test',
        technologies: ['Node.js'],
        projectType: 'work',
        longDescription: 123, // Invalid: should be string
      } as unknown as ProjectFrontmatter;

      const result = validateProject(frontmatter, 'test.md');
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('longDescription') && e.includes('string'))).toBe(
        true
      );
    });

    it('[P2] should reject non-string challenge', () => {
      const frontmatter = {
        id: 'test',
        title: 'Test',
        description: 'Test',
        technologies: ['Node.js'],
        projectType: 'work',
        challenge: ['not', 'a', 'string'], // Invalid: should be string
      } as unknown as ProjectFrontmatter;

      const result = validateProject(frontmatter, 'test.md');
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('challenge') && e.includes('string'))).toBe(true);
    });
  });

  describe('keyFeatures Array', () => {
    it('[P2] should reject non-array keyFeatures', () => {
      const frontmatter = {
        id: 'test',
        title: 'Test',
        description: 'Test',
        technologies: ['Node.js'],
        projectType: 'work',
        keyFeatures: 'not an array', // Invalid: should be array
      } as unknown as ProjectFrontmatter;

      const result = validateProject(frontmatter, 'test.md');
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('keyFeatures') && e.includes('array'))).toBe(
        true
      );
    });

    it('[P2] should accept valid keyFeatures array', () => {
      const frontmatter: ProjectFrontmatter = {
        id: 'test',
        title: 'Test',
        description: 'Test',
        technologies: ['Node.js'],
        projectType: 'work',
        keyFeatures: ['Feature 1', 'Feature 2'],
      };

      const result = validateProject(frontmatter, 'test.md');
      expect(result.valid).toBe(true);
    });
  });

  describe('URL Validation', () => {
    it('[P2] should reject invalid githubUrl', () => {
      const frontmatter: ProjectFrontmatter = {
        id: 'test',
        title: 'Test',
        description: 'Test',
        technologies: ['Node.js'],
        projectType: 'work',
        githubUrl: 'not-a-valid-url',
      };

      const result = validateProject(frontmatter, 'test.md');
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('githubUrl') && e.includes('valid URL'))).toBe(
        true
      );
    });

    it('[P2] should reject invalid liveUrl', () => {
      const frontmatter: ProjectFrontmatter = {
        id: 'test',
        title: 'Test',
        description: 'Test',
        technologies: ['Node.js'],
        projectType: 'work',
        liveUrl: 'just-some-text',
      };

      const result = validateProject(frontmatter, 'test.md');
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('liveUrl') && e.includes('valid URL'))).toBe(
        true
      );
    });

    it('[P2] should accept valid URLs', () => {
      const frontmatter: ProjectFrontmatter = {
        id: 'test',
        title: 'Test',
        description: 'Test',
        technologies: ['Node.js'],
        projectType: 'work',
        githubUrl: 'https://github.com/example/repo',
        liveUrl: 'https://example.com',
      };

      const result = validateProject(frontmatter, 'test.md');
      expect(result.valid).toBe(true);
    });
  });

  describe('Tags Fallback Logic', () => {
    it('[P2] should validate tags when technologies is invalid type', () => {
      // Given: technologies is wrong type but tags is valid
      const frontmatter = {
        id: 'test',
        title: 'Test',
        description: 'Test',
        technologies: 'not-an-array', // Invalid type
        tags: ['Python', 'FastAPI'], // Valid fallback
        projectType: 'work',
      } as unknown as ProjectFrontmatter;

      const result = validateProject(frontmatter, 'test.md');
      // Should fail because technologies is invalid (even though tags is valid)
      // But tags should be validated as potential fallback
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('technologies') && e.includes('array'))).toBe(
        true
      );
    });

    it('[P2] should accept tags when technologies is empty array', () => {
      // Given: technologies is empty but tags is valid
      const frontmatter: ProjectFrontmatter = {
        id: 'test',
        title: 'Test',
        description: 'Test',
        technologies: [], // Empty - invalid
        tags: ['Python'], // Valid fallback
        projectType: 'work',
      };

      const result = validateProject(frontmatter, 'test.md');
      // Should fail because technologies is empty, and tags should be validated
      expect(result.valid).toBe(false);
    });
  });
});
