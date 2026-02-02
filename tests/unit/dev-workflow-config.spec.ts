/**
 * Story 5.5: Local Development Workflow - Configuration Tests
 *
 * ATDD: Tests written BEFORE implementation (TDD Red Phase)
 * These tests verify Node.js version requirements from Story 5.5 acceptance criteria.
 *
 * AC7: Node.js Version (24 LTS)
 *
 * 🔴 RED PHASE: These tests will FAIL until implementation is complete.
 * - package.json needs `engines` field added
 * - .nvmrc should contain "24"
 *
 * @see _bmad-output/implementation-artifacts/5-5-implement-local-development-workflow.md
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Story 5.5: AC7 - Node.js Version Requirements', () => {
  const projectRoot = process.cwd();

  describe('package.json engines field', () => {
    it('[P2] should specify Node.js >= 24.0.0 in engines field', () => {
      // Given: package.json exists
      const packageJsonPath = path.join(projectRoot, 'package.json');
      expect(fs.existsSync(packageJsonPath)).toBe(true);

      // When: We read the package.json
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // Then: engines field should exist
      // 🔴 RED PHASE: This will FAIL - engines field not yet added
      expect(packageJson.engines).toBeDefined();

      // And: Node version should be >= 24.0.0
      expect(packageJson.engines.node).toBeDefined();
      expect(packageJson.engines.node).toMatch(/>=\s*24/);
    });

    it('[P3] should have start script as alias for dev', () => {
      // Given: package.json exists
      const packageJsonPath = path.join(projectRoot, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // Then: start script should exist and reference dev
      // 🔴 RED PHASE: This may FAIL if start script not added
      expect(packageJson.scripts.start).toBeDefined();
      expect(packageJson.scripts.start).toBe('npm run dev');
    });
  });

  describe('.nvmrc file', () => {
    it('[P2] should contain Node.js version 24', () => {
      // Given: .nvmrc exists
      const nvmrcPath = path.join(projectRoot, '.nvmrc');
      expect(fs.existsSync(nvmrcPath)).toBe(true);

      // When: We read the .nvmrc content
      const nvmrcContent = fs.readFileSync(nvmrcPath, 'utf-8').trim();

      // Then: It should specify version 24
      expect(nvmrcContent).toBe('24');
    });
  });

  describe('Tailwind configuration', () => {
    it('[P1] should include _content directory in content paths', () => {
      // Given: tailwind.config.js exists
      const tailwindConfigPath = path.join(projectRoot, 'tailwind.config.js');
      expect(fs.existsSync(tailwindConfigPath)).toBe(true);

      // When: We read the config content
      const configContent = fs.readFileSync(tailwindConfigPath, 'utf-8');

      // Then: It should include _content directory for 11ty templates
      // 🔴 RED PHASE: This will FAIL - _content path not yet added
      expect(configContent).toContain('_content');

      // And: It should scan markdown and njk files
      expect(configContent).toMatch(/_content.*\.(njk|md)/);
    });
  });
});

describe('Story 5.5: Build Configuration Validation', () => {
  describe('npm scripts', () => {
    it('should have dev script that runs 11ty and tailwind concurrently', () => {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // Dev script should use concurrently
      expect(packageJson.scripts.dev).toContain('concurrently');
      expect(packageJson.scripts['dev:11ty']).toBeDefined();
      expect(packageJson.scripts['dev:css']).toBeDefined();
    });

    it('should have build script that builds CSS, mermaid, and 11ty', () => {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // Build script should run all build steps
      expect(packageJson.scripts.build).toContain('build:css');
      expect(packageJson.scripts.build).toContain('eleventy');
    });

    it('should have build:css script that minifies output', () => {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // Build CSS should include --minify flag
      expect(packageJson.scripts['build:css']).toContain('--minify');
    });
  });
});
