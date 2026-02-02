/**
 * Story 6.4: GitHub Actions Deployment - Workflow Validation Tests (ATDD - RED PHASE)
 *
 * These tests define EXPECTED behavior for the GitHub Actions deployment workflow.
 * All tests will FAIL until .github/workflows/deploy.yml is implemented.
 *
 * Acceptance Criteria:
 * - AC1: Workflow File Exists (.github/workflows/deploy.yml)
 * - AC2: Trigger on Push to Main
 * - AC3: Complete Build Pipeline (checkout → Node 24 → npm ci → CSS → Mermaid → build → deploy)
 * - AC7: GitHub Pages Action (actions/deploy-pages@v4)
 * - AC8: No Additional Secrets Required (only GITHUB_TOKEN via permissions)
 *
 * TDD Workflow:
 * 1. RED: Run these tests - they will fail (current state)
 * 2. GREEN: Create .github/workflows/deploy.yml
 * 3. REFACTOR: Improve workflow while keeping tests green
 *
 * NOTE: AC4, AC5, AC6 require actual GitHub Actions execution and are manual verification items.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import yaml from 'js-yaml';

// Path to the workflow file
const WORKFLOW_PATH = resolve(process.cwd(), '.github/workflows/deploy.yml');

// Expected configuration values
const EXPECTED_NODE_VERSION = '24';
const EXPECTED_BUILD_STEPS = ['checkout', 'setup-node', 'npm ci', 'build:css', 'build:mermaid', 'eleventy'];
const EXPECTED_PERMISSIONS = ['contents', 'pages', 'id-token'];

// Type for parsed workflow YAML
interface WorkflowYAML {
  name?: string;
  on?: {
    push?: {
      branches?: string[];
    };
    workflow_dispatch?: Record<string, unknown> | null;
  };
  permissions?: {
    contents?: string;
    pages?: string;
    'id-token'?: string;
  };
  concurrency?: {
    group?: string;
    'cancel-in-progress'?: boolean;
  };
  jobs?: {
    build?: {
      'runs-on'?: string;
      steps?: Array<{
        name?: string;
        uses?: string;
        with?: Record<string, unknown>;
        run?: string;
      }>;
    };
    deploy?: {
      'runs-on'?: string;
      needs?: string;
      environment?: {
        name?: string;
        url?: string;
      };
      steps?: Array<{
        name?: string;
        uses?: string;
        id?: string;
      }>;
    };
  };
}

describe('Story 6.4: Workflow File Exists (AC1)', () => {
  it('[P0] should have deploy.yml in .github/workflows/', () => {
    // Given: The repository structure
    // When: We check for the workflow file
    const exists = existsSync(WORKFLOW_PATH);

    // Then: The file should exist
    expect(exists).toBe(true);
  });

  it('[P0] should contain valid YAML content', () => {
    // Given: The workflow file exists
    const content = readFileSync(WORKFLOW_PATH, 'utf-8');

    // When: We parse the YAML
    const parsed = yaml.load(content);

    // Then: It should parse without errors
    expect(parsed).toBeDefined();
    expect(typeof parsed).toBe('object');
  });

  it('[P1] should have a descriptive workflow name', () => {
    // Given: The workflow file exists
    const content = readFileSync(WORKFLOW_PATH, 'utf-8');
    const workflow = yaml.load(content) as WorkflowYAML;

    // Then: It should have a name containing "Deploy" or "GitHub Pages"
    expect(workflow.name).toBeDefined();
    expect(workflow.name?.toLowerCase()).toMatch(/deploy|pages/);
  });
});

describe('Story 6.4: Trigger on Push to Main (AC2)', () => {
  let workflow: WorkflowYAML;

  beforeAll(() => {
    const content = readFileSync(WORKFLOW_PATH, 'utf-8');
    workflow = yaml.load(content) as WorkflowYAML;
  });

  it('[P0] should trigger on push events', () => {
    // Given: The workflow configuration
    // Then: It should have push trigger defined
    expect(workflow.on?.push).toBeDefined();
  });

  it('[P0] should trigger on push to main branch', () => {
    // Given: The workflow configuration
    const branches = workflow.on?.push?.branches;

    // Then: It should include 'main' in push branches
    expect(branches).toBeDefined();
    expect(branches).toContain('main');
  });

  it('[P2] should support manual workflow_dispatch trigger', () => {
    // Given: The workflow configuration
    // Then: It should have workflow_dispatch for manual triggers
    expect(workflow.on?.workflow_dispatch).toBeDefined();
  });
});

describe('Story 6.4: Complete Build Pipeline (AC3)', () => {
  let workflow: WorkflowYAML;
  let buildSteps: Array<{ name?: string; uses?: string; run?: string }>;

  beforeAll(() => {
    const content = readFileSync(WORKFLOW_PATH, 'utf-8');
    workflow = yaml.load(content) as WorkflowYAML;
    buildSteps = workflow.jobs?.build?.steps || [];
  });

  it('[P0] should run on ubuntu-latest', () => {
    // Given: The workflow configuration
    // Then: Build job should use ubuntu-latest
    expect(workflow.jobs?.build?.['runs-on']).toBe('ubuntu-latest');
  });

  it('[P0] should checkout repository with actions/checkout@v4', () => {
    // Given: The build steps
    const checkoutStep = buildSteps.find((step) => step.uses?.includes('actions/checkout'));

    // Then: Should use actions/checkout@v4
    expect(checkoutStep).toBeDefined();
    expect(checkoutStep?.uses).toMatch(/actions\/checkout@v4/);
  });

  it('[P0] should setup Node.js 24 with actions/setup-node@v4', () => {
    // Given: The build steps
    const nodeStep = buildSteps.find((step) => step.uses?.includes('actions/setup-node'));

    // Then: Should use actions/setup-node@v4 with node-version 24
    expect(nodeStep).toBeDefined();
    expect(nodeStep?.uses).toMatch(/actions\/setup-node@v4/);
    expect(nodeStep?.with?.['node-version']).toBe(EXPECTED_NODE_VERSION);
  });

  it('[P0] should install dependencies with npm ci', () => {
    // Given: The build steps
    const installStep = buildSteps.find((step) => step.run?.includes('npm ci'));

    // Then: Should have npm ci step
    expect(installStep).toBeDefined();
  });

  it('[P0] should build CSS with npm run build:css', () => {
    // Given: The build steps
    const cssStep = buildSteps.find((step) => step.run?.includes('build:css'));

    // Then: Should have CSS build step
    expect(cssStep).toBeDefined();
  });

  it('[P0] should build Mermaid diagrams with npm run build:mermaid', () => {
    // Given: The build steps
    const mermaidStep = buildSteps.find((step) => step.run?.includes('build:mermaid'));

    // Then: Should have Mermaid build step
    expect(mermaidStep).toBeDefined();
  });

  it('[P0] should build site with eleventy', () => {
    // Given: The build steps
    const buildStep = buildSteps.find(
      (step) => step.run?.includes('eleventy') || step.run?.includes('npm run build')
    );

    // Then: Should have Eleventy build step
    expect(buildStep).toBeDefined();
  });

  it('[P1] should execute build steps in correct order', () => {
    // Given: The build steps
    const stepNames = buildSteps.map((step) => {
      if (step.uses?.includes('checkout')) return 'checkout';
      if (step.uses?.includes('setup-node')) return 'setup-node';
      if (step.run?.includes('npm ci')) return 'npm ci';
      if (step.run?.includes('build:css')) return 'build:css';
      if (step.run?.includes('build:mermaid')) return 'build:mermaid';
      if (step.run?.includes('eleventy')) return 'eleventy';
      return step.name || 'unknown';
    });

    // Then: Steps should be in correct order (checkout before setup-node before npm ci, etc.)
    const checkoutIndex = stepNames.indexOf('checkout');
    const nodeIndex = stepNames.indexOf('setup-node');
    const installIndex = stepNames.indexOf('npm ci');
    const cssIndex = stepNames.indexOf('build:css');
    const mermaidIndex = stepNames.indexOf('build:mermaid');
    const buildIndex = stepNames.indexOf('eleventy');

    expect(checkoutIndex).toBeLessThan(nodeIndex);
    expect(nodeIndex).toBeLessThan(installIndex);
    expect(installIndex).toBeLessThan(cssIndex);
    expect(cssIndex).toBeLessThan(mermaidIndex);
    expect(mermaidIndex).toBeLessThan(buildIndex);
  });
});

describe('Story 6.4: GitHub Pages Action (AC7)', () => {
  let workflow: WorkflowYAML;

  beforeAll(() => {
    const content = readFileSync(WORKFLOW_PATH, 'utf-8');
    workflow = yaml.load(content) as WorkflowYAML;
  });

  it('[P0] should use actions/configure-pages for setup', () => {
    // Given: The build steps
    const buildSteps = workflow.jobs?.build?.steps || [];
    const configureStep = buildSteps.find((step) => step.uses?.includes('configure-pages'));

    // Then: Should use actions/configure-pages
    expect(configureStep).toBeDefined();
    expect(configureStep?.uses).toMatch(/actions\/configure-pages@v/);
  });

  it('[P0] should use actions/upload-pages-artifact to upload _site/', () => {
    // Given: The build steps
    const buildSteps = workflow.jobs?.build?.steps || [];
    const uploadStep = buildSteps.find((step) => step.uses?.includes('upload-pages-artifact'));

    // Then: Should use actions/upload-pages-artifact with path _site
    expect(uploadStep).toBeDefined();
    expect(uploadStep?.uses).toMatch(/actions\/upload-pages-artifact@v/);
    expect(uploadStep?.with?.path).toBe('_site');
  });

  it('[P0] should have deploy job using actions/deploy-pages@v4', () => {
    // Given: The deploy job
    const deploySteps = workflow.jobs?.deploy?.steps || [];
    const deployStep = deploySteps.find((step) => step.uses?.includes('deploy-pages'));

    // Then: Should use actions/deploy-pages@v4
    expect(deployStep).toBeDefined();
    expect(deployStep?.uses).toMatch(/actions\/deploy-pages@v4/);
  });

  it('[P1] should have deploy job depend on build job', () => {
    // Given: The deploy job
    // Then: Should have needs: build
    expect(workflow.jobs?.deploy?.needs).toBe('build');
  });

  it('[P1] should configure github-pages environment', () => {
    // Given: The deploy job
    const environment = workflow.jobs?.deploy?.environment;

    // Then: Should configure github-pages environment
    expect(environment).toBeDefined();
    expect(environment?.name).toBe('github-pages');
  });
});

describe('Story 6.4: No Additional Secrets Required (AC8)', () => {
  let workflow: WorkflowYAML;
  let workflowContent: string;

  beforeAll(() => {
    workflowContent = readFileSync(WORKFLOW_PATH, 'utf-8');
    workflow = yaml.load(workflowContent) as WorkflowYAML;
  });

  it('[P0] should define permissions at workflow level', () => {
    // Given: The workflow configuration
    // Then: Should have permissions block
    expect(workflow.permissions).toBeDefined();
  });

  it('[P0] should have contents: read permission', () => {
    // Given: The permissions block
    // Then: Should have contents: read
    expect(workflow.permissions?.contents).toBe('read');
  });

  it('[P0] should have pages: write permission', () => {
    // Given: The permissions block
    // Then: Should have pages: write
    expect(workflow.permissions?.pages).toBe('write');
  });

  it('[P0] should have id-token: write permission for OIDC', () => {
    // Given: The permissions block
    // Then: Should have id-token: write for OIDC authentication
    expect(workflow.permissions?.['id-token']).toBe('write');
  });

  it('[P1] should NOT reference secrets.* (except GITHUB_TOKEN)', () => {
    // Given: The workflow content
    // Then: Should not contain secrets references (GITHUB_TOKEN is implicit)
    const secretsMatches = workflowContent.match(/secrets\.\w+/g) || [];
    const nonGithubTokenSecrets = secretsMatches.filter(
      (match) => !match.includes('GITHUB_TOKEN')
    );

    expect(nonGithubTokenSecrets).toHaveLength(0);
  });

  it('[P2] should have concurrency group to prevent parallel deployments', () => {
    // Given: The workflow configuration
    // Then: Should have concurrency configuration
    expect(workflow.concurrency).toBeDefined();
    expect(workflow.concurrency?.group).toBeDefined();
    expect(workflow.concurrency?.['cancel-in-progress']).toBe(true);
  });
});

describe('Story 6.4: Additional Workflow Quality Checks', () => {
  let workflow: WorkflowYAML;

  beforeAll(() => {
    const content = readFileSync(WORKFLOW_PATH, 'utf-8');
    workflow = yaml.load(content) as WorkflowYAML;
  });

  it('[P2] should use npm cache for faster builds', () => {
    // Given: The build steps
    const buildSteps = workflow.jobs?.build?.steps || [];
    const nodeStep = buildSteps.find((step) => step.uses?.includes('setup-node'));

    // Then: Should have cache: npm configuration
    expect(nodeStep?.with?.cache).toBe('npm');
  });

  it('[P2] should have descriptive step names', () => {
    // Given: The build steps
    const buildSteps = workflow.jobs?.build?.steps || [];

    // Then: Most steps should have descriptive names
    const namedSteps = buildSteps.filter((step) => step.name);
    expect(namedSteps.length).toBeGreaterThanOrEqual(buildSteps.length * 0.5);
  });
});
