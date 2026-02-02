# ATDD Checklist - Epic 6, Story 6.4: Implement GitHub Actions Deployment

**Date:** 2026-02-02
**Author:** Jay
**Primary Test Level:** Unit (YAML validation)

---

## Story Summary

Implement automated deployment to GitHub Pages when code is pushed to the main branch. This story creates the GitHub Actions workflow that orchestrates the build pipeline (CSS, Mermaid, Eleventy) and deploys to GitHub Pages using official GitHub Actions.

**As a** content author (Jay)
**I want** automatic deployment when I push to main
**So that** content goes live without manual steps

---

## Acceptance Criteria

1. **AC1: Workflow File Exists** - `.github/workflows/deploy.yml` exists
2. **AC2: Trigger on Push to Main** - Workflow triggers on `push` to `main` branch
3. **AC3: Complete Build Pipeline** - Steps: checkout → Node 24 → npm ci → build:css → build:mermaid → eleventy → deploy
4. **AC4: Successful Deployment** - Site is live at GitHub Pages URL (manual verification)
5. **AC5: Quick Deployment Time** - Changes live within 2-3 minutes (manual verification)
6. **AC6: Clear Error Messages** - Build failures show actionable error messages (manual verification)
7. **AC7: GitHub Pages Action** - Uses `actions/deploy-pages@v4`
8. **AC8: No Additional Secrets Required** - Only uses `GITHUB_TOKEN` via permissions

---

## Failing Tests Created (RED Phase)

### Unit Tests (27 tests)

**File:** `tests/unit/github-actions-workflow.spec.ts` (280 lines)

| Test | Status | Verifies |
|------|--------|----------|
| `[P0] should have deploy.yml in .github/workflows/` | RED - File not found | AC1 |
| `[P0] should contain valid YAML content` | RED - File not found | AC1 |
| `[P1] should have a descriptive workflow name` | RED - File not found | AC1 |
| `[P0] should trigger on push events` | SKIPPED | AC2 |
| `[P0] should trigger on push to main branch` | SKIPPED | AC2 |
| `[P2] should support manual workflow_dispatch trigger` | SKIPPED | AC2 |
| `[P0] should run on ubuntu-latest` | SKIPPED | AC3 |
| `[P0] should checkout repository with actions/checkout@v4` | SKIPPED | AC3 |
| `[P0] should setup Node.js 24 with actions/setup-node@v4` | SKIPPED | AC3 |
| `[P0] should install dependencies with npm ci` | SKIPPED | AC3 |
| `[P0] should build CSS with npm run build:css` | SKIPPED | AC3 |
| `[P0] should build Mermaid diagrams with npm run build:mermaid` | SKIPPED | AC3 |
| `[P0] should build site with eleventy` | SKIPPED | AC3 |
| `[P1] should execute build steps in correct order` | SKIPPED | AC3 |
| `[P0] should use actions/configure-pages for setup` | SKIPPED | AC7 |
| `[P0] should use actions/upload-pages-artifact to upload _site/` | SKIPPED | AC7 |
| `[P0] should have deploy job using actions/deploy-pages@v4` | SKIPPED | AC7 |
| `[P1] should have deploy job depend on build job` | SKIPPED | AC7 |
| `[P1] should configure github-pages environment` | SKIPPED | AC7 |
| `[P0] should define permissions at workflow level` | SKIPPED | AC8 |
| `[P0] should have contents: read permission` | SKIPPED | AC8 |
| `[P0] should have pages: write permission` | SKIPPED | AC8 |
| `[P0] should have id-token: write permission for OIDC` | SKIPPED | AC8 |
| `[P1] should NOT reference secrets.* (except GITHUB_TOKEN)` | SKIPPED | AC8 |
| `[P2] should have concurrency group to prevent parallel deployments` | SKIPPED | AC8 |
| `[P2] should use npm cache for faster builds` | SKIPPED | Quality |
| `[P2] should have descriptive step names` | SKIPPED | Quality |

### E2E Tests (0 tests)

No E2E tests required - this story is infrastructure configuration, not UI functionality.

### API Tests (0 tests)

No API tests required - no API endpoints involved.

---

## Data Factories Created

None required - this story creates a static YAML configuration file.

---

## Fixtures Created

None required - tests use standard file system operations.

---

## Mock Requirements

None required - tests validate static file content.

---

## Required data-testid Attributes

None required - this story has no UI components.

---

## Implementation Checklist

### Task 1: Create GitHub Actions Workflow Directory Structure (AC1)

**Tasks to make tests pass:**

- [ ] Create `.github/` directory
- [ ] Create `.github/workflows/` directory
- [ ] Create `.github/workflows/deploy.yml` file
- [ ] Run test: `npm run test:unit -- tests/unit/github-actions-workflow.spec.ts`
- [ ] Verify first 3 tests pass (file exists)

---

### Task 2: Configure Workflow Triggers (AC2)

**Tasks to make tests pass:**

- [ ] Add `name: Deploy to GitHub Pages`
- [ ] Add `on: push: branches: [main]` trigger
- [ ] Add `workflow_dispatch:` for manual triggers
- [ ] Run test: `npm run test:unit -- tests/unit/github-actions-workflow.spec.ts`
- [ ] Verify AC2 tests pass

---

### Task 3: Configure Permissions (AC8)

**Tasks to make tests pass:**

- [ ] Add `permissions:` block at workflow level
- [ ] Add `contents: read`
- [ ] Add `pages: write`
- [ ] Add `id-token: write`
- [ ] Add `concurrency:` block with `group: "pages"` and `cancel-in-progress: true`
- [ ] Run test: `npm run test:unit -- tests/unit/github-actions-workflow.spec.ts`
- [ ] Verify AC8 tests pass

---

### Task 4: Define Build Job (AC3)

**Tasks to make tests pass:**

- [ ] Add `jobs: build:` section
- [ ] Set `runs-on: ubuntu-latest`
- [ ] Add `actions/checkout@v4` step
- [ ] Add `actions/setup-node@v4` step with `node-version: '24'` and `cache: 'npm'`
- [ ] Add `npm ci` step
- [ ] Add `npm run build:css` step
- [ ] Add `npm run build:mermaid` step
- [ ] Add `npx eleventy` step
- [ ] Add `actions/configure-pages@v4` step
- [ ] Add `actions/upload-pages-artifact@v3` step with `path: '_site'`
- [ ] Run test: `npm run test:unit -- tests/unit/github-actions-workflow.spec.ts`
- [ ] Verify AC3 and AC7 (partial) tests pass

---

### Task 5: Define Deploy Job (AC7)

**Tasks to make tests pass:**

- [ ] Add `deploy:` job section
- [ ] Set `needs: build`
- [ ] Set `runs-on: ubuntu-latest`
- [ ] Configure `environment: name: github-pages` with `url: ${{ steps.deployment.outputs.page_url }}`
- [ ] Add `actions/deploy-pages@v4` step with `id: deployment`
- [ ] Run test: `npm run test:unit -- tests/unit/github-actions-workflow.spec.ts`
- [ ] Verify all 27 tests pass (GREEN phase)

---

### Task 6: Manual Verification (AC4, AC5, AC6)

**Post-implementation verification (requires actual GitHub Actions run):**

- [ ] Push workflow to main branch
- [ ] Verify workflow triggers in GitHub Actions tab
- [ ] Verify all build steps complete successfully
- [ ] Verify site is live at GitHub Pages URL (AC4)
- [ ] Measure deployment time (target: 2-3 minutes) (AC5)
- [ ] Test failure scenario (introduce error, verify error messages are clear) (AC6)
- [ ] Revert test error

---

### Task 7: Repository Settings (Optional)

**Configure GitHub Pages source:**

- [ ] Go to repository Settings → Pages
- [ ] Set Source to "GitHub Actions" (not "Deploy from a branch")
- [ ] Verify deployment environment shows in Actions tab

---

## Running Tests

```bash
# Run all failing tests for this story
npm run test:unit -- tests/unit/github-actions-workflow.spec.ts

# Run all unit tests
npm run test:unit

# Run specific test by pattern
npm run test:unit -- -t "Workflow File Exists"

# Run tests in watch mode
npm run test:unit:watch -- tests/unit/github-actions-workflow.spec.ts
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete) ✅

**TEA Agent Responsibilities:**

- ✅ All 27 unit tests written and failing (file not found)
- ✅ Tests cover all testable acceptance criteria (AC1, AC2, AC3, AC7, AC8)
- ✅ Manual verification items documented (AC4, AC5, AC6)
- ✅ Implementation checklist created

**Verification:**

- All tests run and fail as expected
- Failure message: `ENOENT: no such file or directory, open '.github/workflows/deploy.yml'`
- Tests fail due to missing implementation, not test bugs

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Create the workflow file** following the checklist tasks
2. **Run tests after each task** to verify progress
3. **All 27 tests should pass** when workflow is complete
4. **Perform manual verification** for AC4, AC5, AC6 after pushing to GitHub

**Key Principles:**

- Follow the recommended workflow structure from story Dev Notes
- Use official GitHub Actions (not peaceiris/actions-gh-pages)
- Ensure build order: CSS → Mermaid → Eleventy
- Test locally before pushing (tests validate YAML structure)

**Progress Tracking:**

- Task 1: File exists → 3 tests pass
- Task 2: Triggers → 6 tests pass
- Task 3: Permissions → 12 tests pass
- Task 4: Build job → 24 tests pass
- Task 5: Deploy job → 27 tests pass (GREEN)
- Task 6: Manual verification → Story complete

---

### REFACTOR Phase (DEV Team - After All Tests Pass)

**DEV Agent Responsibilities:**

1. **Verify all 27 tests pass** (green phase complete)
2. **Review workflow for best practices** (caching, naming, comments)
3. **Optimize if needed** (parallel steps, artifact caching)
4. **Ensure tests still pass** after each refactor
5. **Document any configuration notes**

**Key Principles:**

- Tests provide safety net (refactor with confidence)
- Don't change workflow behavior (only optimization)
- Verify tests pass after each change

**Completion:**

- All 27 tests pass
- Workflow runs successfully on GitHub
- Site deploys within 2-3 minutes
- Ready for code review and story approval

---

## Next Steps

1. **DEV workflow receives this checklist** (manual handoff)
2. **Review checklist** and story Dev Notes
3. **Run failing tests** to confirm RED phase: `npm run test:unit -- tests/unit/github-actions-workflow.spec.ts`
4. **Begin implementation** using implementation checklist as guide
5. **Work one task at a time** (create file → add triggers → add permissions → etc.)
6. **When all 27 tests pass**, perform manual verification (AC4, AC5, AC6)
7. **When manual verification complete**, update story status to 'done' in sprint-status.yaml

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **test-quality.md** - Deterministic tests, Given-When-Then structure, explicit assertions
- **data-factories.md** - N/A (no dynamic test data needed)
- **component-tdd.md** - N/A (no UI components)
- **test-healing-patterns.md** - N/A (static file validation)
- **selector-resilience.md** - N/A (no UI selectors)
- **timing-debugging.md** - N/A (no async operations)

See `tea-index.csv` for complete knowledge fragment mapping.

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npm run test:unit -- tests/unit/github-actions-workflow.spec.ts`

**Results:**

```
 ❯ tests/unit/github-actions-workflow.spec.ts (27 tests | 3 failed | 24 skipped)
     × [P0] should have deploy.yml in .github/workflows/
     × [P0] should contain valid YAML content
     × [P1] should have a descriptive workflow name
     ↓ [P0] should trigger on push events (skipped)
     ↓ [P0] should trigger on push to main branch (skipped)
     ... (24 more skipped)

Error: ENOENT: no such file or directory, open '.github/workflows/deploy.yml'
```

**Summary:**

- Total tests: 27
- Passing: 0 (expected)
- Failing: 3 (expected - file not found)
- Skipped: 24 (expected - beforeAll fails)
- Status: ✅ RED phase verified

**Expected Failure Messages:**

- `ENOENT: no such file or directory, open '.github/workflows/deploy.yml'`

---

## Notes

- **Why Unit Tests, Not E2E:** This story creates a YAML configuration file, not UI functionality. Unit tests validate the file structure without needing a browser.
- **Manual Verification Required:** AC4 (deployment success), AC5 (timing), and AC6 (error messages) require actual GitHub Actions execution and cannot be automated locally.
- **Official Actions Recommended:** Use GitHub's official `actions/deploy-pages@v4` instead of `peaceiris/actions-gh-pages` as recommended in the architecture docs.
- **Build Order Critical:** CSS must build before Mermaid, Mermaid before Eleventy. The workflow should enforce this sequence.

---

## Contact

**Questions or Issues?**

- Ask in team standup
- Refer to `_bmad-output/implementation-artifacts/6-4-implement-github-actions-deployment.md` for Dev Notes
- Consult `_bmad/tea/testarch/knowledge` for testing best practices

---

**Generated by BMad TEA Agent** - 2026-02-02
