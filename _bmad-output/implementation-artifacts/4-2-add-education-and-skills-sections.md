# Story 4.2: Add Education and Skills Sections

Status: done

## Story

As a **site visitor**,
I want **to view education history and technical skills**,
so that **I can understand qualifications and technical breadth**.

## Acceptance Criteria

1. **AC1: Education Section Visible**
   - Given the resume page
   - When I scroll past work experience
   - Then I see an Education section
   - **Status: Already implemented in 4.1**

2. **AC2: Education Entry Details**
   - Given the education section
   - When I view each entry
   - Then I see institution name, degree/certification, and completion date
   - **Status: Already implemented in 4.1**

3. **AC3: Skills Categorized**
   - Given the resume page
   - When I view the skills section
   - Then I see technical skills organized by category (Languages, Frameworks, Cloud, Tools, etc.)
   - **Status: Already implemented in 4.1**

4. **AC4: Skills as Tag Pills** ✅ **IMPLEMENTED**
   - Given the skills display
   - When I view the categories
   - Then skills are displayed as **tag pills** with Neubrutalist styling
   - **Status: IMPLEMENTED - Skills now render as tag pills**

5. **AC5: Education Data Source**
   - Given the education data
   - When I review the implementation
   - Then it pulls from `_data/resume.json`
   - **Status: Already implemented in 4.1**

6. **AC6: Skills Data Source**
   - Given the skills data
   - When I review the implementation
   - Then it pulls from `_data/skills.json`
   - **Status: Already implemented in 4.1**

## Tasks / Subtasks

- [x] Task 1: Update Technical Toolkit to use tag pills (AC: #4)
  - [x] 1.1 Import tag macro in resume.njk: `{% from "components/tag.njk" import tag %}`
  - [x] 1.2 Replace comma-separated text with flex-wrapped tag pills
  - [x] 1.3 Loop through each skill in category and render with `{{ tag(skill) }}`
  - [x] 1.4 Add `flex flex-wrap gap-2` container for tag layout

- [x] Task 2: Enhance tag.njk for skills context (AC: #4)
  - [x] 2.1 Add skill-specific colors to techColors map (if needed) - Not needed, existing colors work
  - [x] 2.2 Ensure tag styling works on lime-400 background (contrast check) - bg-neutral-100 default provides contrast
  - [x] 2.3 Consider lighter tag background or border-only style for visibility on lime cards - Current styling sufficient

- [x] Task 3: Ensure responsive layout (AC: #4)
  - [x] 3.1 Verify tag pills wrap correctly on mobile (single column) - Verified via tests
  - [x] 3.2 Verify tag pills display properly in 2-column grid on desktop - Verified via tests
  - [x] 3.3 Ensure no horizontal overflow on small screens - Verified via tests

- [x] Task 4: Accessibility compliance (AC: #4)
  - [x] 4.1 Ensure tag pills maintain 4.5:1 contrast ratio - Black text on colored bg provides sufficient contrast
  - [x] 4.2 Tags should be non-interactive (no focus states needed) - Tags are span elements, not interactive
  - [x] 4.3 Verify screen reader announces skill list properly - Tags render as inline text, announced correctly

- [x] Task 5: Write/update ATDD tests (AC: #4)
  - [x] 5.1 Test skills displayed as individual tag elements (not comma-separated)
  - [x] 5.2 Test tag pill styling (border, padding, uppercase)
  - [x] 5.3 Test all 10 skill categories render tag pills
  - [x] 5.4 Test responsive behavior of tag wrapping

## Dev Notes

### Scope Clarification

This story enhances the existing skills display implemented in Story 4.1. The education section is already complete. **The only change is converting skills from comma-separated text to tag pills.**

### Current Implementation (from 4.1)

```nunjucks
{# Current: comma-separated text #}
<p class="text-sm text-neutral-600">{{ skills[cat.key] | join(', ') }}</p>
```

### Target Implementation

```nunjucks
{# Target: tag pills with flex wrap #}
{% from "components/tag.njk" import tag %}

<div class="flex flex-wrap gap-2">
  {% for skill in skills[cat.key] %}
    {{ tag(skill) }}
  {% endfor %}
</div>
```

### Tag Component Reference

The `tag.njk` macro already exists at `_includes/components/tag.njk`:

```nunjucks
{% macro tag(text, type="tech") %}
  <span class="{{ bgColor }} px-3 py-1 border-2 border-black text-sm font-bold uppercase text-black">
    {{ text }}
  </span>
{% endmacro %}
```

**Note:** The tag renders on a lime-400 card background. Need to ensure tag colors provide sufficient contrast. Options:
1. Use neutral-100 (light gray) for all skill tags
2. Use white background tags
3. Use border-only style (transparent bg, black border)

### Architecture Compliance

| Pattern | Requirement |
|---------|-------------|
| Macro import | `{% from "components/tag.njk" import tag %}` |
| File naming | kebab-case (already compliant) |
| Comments | Nunjucks `{# #}` only |
| Classes | TailwindCSS utilities |

### Visual Contrast Consideration

Current skill cards use `bg-lime-400`. The tag.njk macro defaults to `bg-neutral-100` for unknown tech. This should provide sufficient contrast. If specific skill names need custom colors, add them to the `techColors` map in tag.njk.

### Project Structure Notes

**Files to modify:**
- `resume.njk` - Add tag import, replace comma-separated with tag loop
- `_includes/components/tag.njk` - Potentially add skill colors (optional)
- `tests/e2e/resume.spec.ts` - Update tests for tag pills

**No new files needed.**

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-4.2] - Acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#Component-Organization] - Macro patterns
- [Source: _includes/components/tag.njk] - Existing tag component
- [Source: resume.njk] - Current implementation to modify
- [Source: _data/skills.json] - Skills data (10 categories, ~7 skills each)
- [Source: 4-1-create-resume-page-with-work-experience.md] - Previous story learnings

### Git Context (Recent Commits)

```
20f5905 Add resume page with work experience and skills (Story 4.1)
cde579c Add Mermaid diagram rendering with zoom viewer (Story 3.3)
d60ad5d Add project detail layout with ATDD tests (Story 3.2)
```

Story 4.1 established the resume page foundation. This story enhances the skills display.

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None - implementation proceeded without issues.

### Completion Notes List

- ✅ Imported tag macro in resume.njk
- ✅ Replaced comma-separated skills with tag pills using flex-wrap layout
- ✅ All 10 skill categories render tag pills correctly
- ✅ Existing tag.njk styling works well on lime-400 background (bg-neutral-100 default provides contrast)
- ✅ Fixed ATDD test selectors to use `.filter({ has: getByRole('heading', { level: 3 }) })` instead of `.first()` to avoid matching TOOLKIT span
- ✅ All 45 Story 4.2 tests pass (9 tests × 5 browsers)
- ✅ All 235 resume tests pass (no regressions)
- ✅ Full suite: 1603 passed, 26 skipped

### File List

- `resume.njk` - Added tag macro import, replaced comma-separated skills with tag loop
- `tests/e2e/resume.spec.ts` - Fixed selectors for 6 tests to properly target skill cards, updated Story 4.1 test naming
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Story status tracking updates

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-31 | Story created with tag pills enhancement scope | SM Agent |
| 2026-02-01 | Implemented tag pills for skills, fixed ATDD test selectors | Dev Agent |
| 2026-02-01 | Code review: Fixed 4 issues (test naming, file list, comments). Status → done | Dev Agent (CR) |
