# Story 4.3: Implement Profile Data Files

Status: done

## Story

As a **developer**,
I want **structured data files for profile information**,
so that **profile data is centralized and reusable across templates**.

## Acceptance Criteria

1. **AC1: Data Files Present**
   - Given the `_data/` directory
   - When I review the files
   - Then I see `profile.json`, `resume.json`, and `skills.json`

2. **AC2: Profile JSON Contents**
   - Given `profile.json`
   - When I review its contents
   - Then it contains: name, role/title, bio, social links (GitHub, LinkedIn, email)

3. **AC3: Resume JSON Contents**
   - Given `resume.json`
   - When I review its contents
   - Then it contains: work experience array and education array with all required fields
   - **Status: ALREADY EXISTS** - Verified in Story 4.1

4. **AC4: Skills JSON Contents**
   - Given `skills.json`
   - When I review its contents
   - Then it contains: categorized skills with category names and skill arrays
   - **Status: ALREADY EXISTS** - Verified in Story 4.1

5. **AC5: Template Access**
   - Given the data files exist
   - When 11ty builds the site
   - Then data is accessible in templates as `{{ profile.name }}`, `{{ resume.experience }}`, `{{ skills }}`

6. **AC6: Schema Compatibility**
   - Given the data file schemas
   - When I review the structure
   - Then they are compatible with future Sanity.io migration (camelCase fields, flat structure)

## Tasks / Subtasks

- [x] Task 1: Create profile.json data file (AC: #1, #2, #6)
  - [x] 1.1 Create `_data/profile.json` with Jay's profile information
  - [x] 1.2 Include: name, role, bio, location fields
  - [x] 1.3 Include socialLinks object with: github, linkedin, email URLs
  - [x] 1.4 Use camelCase for all field names (Sanity.io compatible)

- [x] Task 2: Verify existing data files (AC: #3, #4)
  - [x] 2.1 Confirm `_data/resume.json` has experience[] and education[] arrays
  - [x] 2.2 Confirm `_data/skills.json` has categorized skills structure
  - [x] 2.3 Document any schema adjustments needed for consistency

- [x] Task 3: Update templates to use profile data (AC: #5)
  - [x] 3.1 Update footer.njk to use `{{ profile.name }}` for copyright
  - [x] 3.2 Update base.njk title to use `{{ profile.name }}` instead of hardcoded "Jay Singh"
  - [x] 3.3 Update meta.njk defaults to use profile data

- [x] Task 4: Write ATDD tests (AC: #1, #2, #5)
  - [x] 4.1 Test profile data accessible in footer (name appears in copyright)
  - [x] 4.2 Test profile data accessible in page title
  - [ ] 4.3 Test social links accessible for contact page (Story 4.4 dependency)

## Dev Notes

### Scope Clarification

This story creates the `profile.json` data file and ensures it integrates with existing templates. The `resume.json` and `skills.json` files already exist from Stories 4.1/4.2.

### Current Data File State

**EXISTS: `_data/resume.json`**
```json
{
  "experience": [...],  // 7 positions
  "education": [...],   // 2 entries
  "certifications": []
}
```

**EXISTS: `_data/skills.json`**
```json
{
  "languages": [...],
  "backend": [...],
  "frontend": [...],
  // ... 10 categories total
}
```

**NEEDS CREATION: `_data/profile.json`**

### Profile Data Schema

Create `_data/profile.json` with this structure:

```json
{
  "name": "Jay Singh",
  "role": "Software Engineer",
  "bio": "Full-stack developer specializing in Python/FastAPI, React, and DevOps. Building scalable web applications with a focus on clean architecture and observability.",
  "location": "New Jersey, USA",
  "socialLinks": {
    "github": "https://github.com/jaysingh",
    "linkedin": "https://linkedin.com/in/jaysingh",
    "email": "mailto:jay@jaysingh.dev"
  }
}
```

**Note:** User should provide actual social links. Placeholder values shown above need verification.

### Template Updates Required

**1. `_includes/layouts/base.njk`** - Line 6
```nunjucks
{# FROM: #}
<title>{% if title %}{{ title }} | {% endif %}Jay Singh</title>

{# TO: #}
<title>{% if title %}{{ title }} | {% endif %}{{ profile.name }}</title>
```

**2. `_includes/partials/footer.njk`** - Line 5
```nunjucks
{# FROM: #}
&copy; 2026 JAYSINGH.DEV

{# TO: #}
&copy; 2026 {{ profile.name | upper }}
```

**3. `_includes/partials/meta.njk`** - Lines 4, 8
```nunjucks
{# FROM: #}
<meta name="description" content="{{ description | default('Jay Singh - Software Engineer') }}">
<meta property="og:title" content="{{ title | default('Jay Singh') }}">

{# TO: #}
<meta name="description" content="{{ description | default(profile.name + ' - ' + profile.role) }}">
<meta property="og:title" content="{{ title | default(profile.name) }}">
```

### Architecture Compliance

| Pattern | Requirement |
|---------|-------------|
| File naming | `kebab-case.json` (profile.json) ✓ |
| Field naming | camelCase (socialLinks, not social_links) ✓ |
| Data format | JSON (not YAML) ✓ |
| 11ty access | Auto-loaded from `_data/` folder |

### 11ty Data Cascade Reference

11ty automatically loads JSON files from `_data/` and makes them available as global data:
- `_data/profile.json` → `{{ profile }}`
- `_data/resume.json` → `{{ resume }}`
- `_data/skills.json` → `{{ skills }}`

No configuration changes needed - 11ty handles this automatically.

### Project Structure Notes

**Files to create:**
- `_data/profile.json` - New profile data file

**Files to modify:**
- `_includes/layouts/base.njk` - Use profile.name in title
- `_includes/partials/footer.njk` - Use profile.name in copyright
- `_includes/partials/meta.njk` - Use profile data in defaults
- `tests/e2e/resume.spec.ts` or new `tests/e2e/profile.spec.ts` - Add ATDD tests

**No changes to resume.json or skills.json** - They already meet AC requirements.

### Testing Strategy

Create tests in `tests/e2e/profile.spec.ts`:

```typescript
// Test profile data appears in page elements
test('profile name appears in page title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Jay Singh/);
});

test('profile name appears in footer copyright', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer).toContainText('JAY SINGH');
});
```

### Dependencies

- **Blocks Story 4.4:** Contact page will use `profile.socialLinks` for GitHub, LinkedIn, email links
- **No blockers:** This story can be implemented independently

### Git Context (Recent Commits)

```
20f5905 Add resume page with work experience and skills (Story 4.1)
```

Story 4.1 established `resume.json` and `skills.json`. This story adds `profile.json` to complete the data layer.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-4.3] - Acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#Data-Architecture] - Data file patterns
- [Source: _bmad-output/planning-artifacts/architecture.md#Project-Structure] - File organization
- [Source: _data/resume.json] - Existing resume data
- [Source: _data/skills.json] - Existing skills data
- [Source: _includes/layouts/base.njk] - Template to update
- [Source: _includes/partials/footer.njk] - Template to update
- [Source: _includes/partials/meta.njk] - Template to update
- [Source: 4-2-add-education-and-skills-sections.md] - Previous story patterns

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None

### Completion Notes List

- Created `_data/profile.json` with name, role, bio, location, and socialLinks (github, linkedin, email)
- Verified `resume.json` has 7 experience entries and 2 education entries
- Verified `skills.json` has 10 categorized skill groups with camelCase keys
- No schema adjustments needed - existing files already meet requirements
- Updated `base.njk` to use `{{ profile.name }}` in page title
- Updated `footer.njk` to use `{{ profile.name | upper }}` in copyright
- Updated `meta.njk` to use profile data in description and og:title
- Fixed og:title to match page title pattern (`Title | Profile Name`)
- Enabled 6 ATDD tests in `profile.spec.ts` (1 skipped for Story 4.4 dependency)
- Updated `header-footer.spec.ts` to expect new footer text pattern
- All 28 header-footer and profile tests passing
- 339 tests passing in full regression suite (2 pre-existing failures unrelated to this story)

### File List

**New Files:**
- `_data/profile.json`
- `tests/e2e/profile.spec.ts`

**Modified Files:**
- `_includes/layouts/base.njk`
- `_includes/partials/footer.njk`
- `_includes/partials/meta.njk`
- `tests/e2e/header-footer.spec.ts`

**Test Artifacts:**
- `_bmad-output/test-artifacts/atdd-checklist-4-3.md`

**Tracking Files Updated:**
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log

- 2026-02-01: Implemented Story 4.3 - Created profile.json, updated templates to use profile data, enabled ATDD tests
- 2026-02-01: Code Review (Amelia) - Fixed 3 issues: og:description consistency, file list completeness, stale test comment. Social links confirmed correct by user. Status → done

