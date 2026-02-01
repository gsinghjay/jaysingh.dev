# Story 4.1: Create Resume Page with Work Experience

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **site visitor**,
I want **to view Jay's work experience history**,
so that **I can evaluate professional background and expertise**.

## Acceptance Criteria

1. **AC1: Resume Page Accessible**
   - Given I navigate to `/resume/`
   - When the page loads
   - Then I see a professionally formatted resume page

2. **AC2: Work Experience Display**
   - Given the resume page displays work experience
   - When I view each position
   - Then I see company name, job title, employment dates, and key responsibilities

3. **AC3: Chronological Order**
   - Given the work experience section
   - When I view the entries
   - Then positions are listed in reverse chronological order (most recent first)

4. **AC4: Desktop Layout**
   - Given the resume page
   - When I view on desktop
   - Then the layout uses clear visual hierarchy with the Neubrutalist design system

5. **AC5: Mobile Responsive**
   - Given the resume page
   - When I view on mobile
   - Then the layout is fully responsive and readable without horizontal scrolling

6. **AC6: Data Source**
   - Given the work experience data
   - When I review the implementation
   - Then it pulls from `_data/resume.json` using 11ty data cascade

## Tasks / Subtasks

- [x] Task 1: Create resume data file (AC: #6)
  - [x] 1.1 Create `_data/resume.json` by copying from `src/data/resume.json`
  - [x] 1.2 Verify JSON structure matches React format (experience array, education array)
  - [x] 1.3 Confirm all 7 experience entries and 2 education entries are present

- [x] Task 2: Create skills data file (AC: #4)
  - [x] 2.1 Create `_data/skills.json` by copying from `src/data/skills.json`
  - [x] 2.2 Verify all 10 skill categories: frontend, backend, database, devops, observability, security, testing, tools, architecture, cloud

- [x] Task 3: Create resume page template (AC: #1, #4)
  - [x] 3.1 Create `resume.njk` in project root
  - [x] 3.2 Add frontmatter: layout, title, description, permalink
  - [x] 3.3 Import card component from components

- [x] Task 4: Implement page header (AC: #1, #4)
  - [x] 4.1 Add "WORK <span class="bg-blue-400">HISTORY</span>" heading matching React exactly
  - [x] 4.2 Add "DOWNLOAD CV" button with Download icon
  - [x] 4.3 Button uses Neubrutalist styling: border-4, box-shadow, hover:bg-lime-400
  - [x] 4.4 Wire button to `window.print()` via JS data attribute

- [x] Task 5: Implement work experience section (AC: #2, #3, #4)
  - [x] 5.1 Loop through `resume.experience` array
  - [x] 5.2 Display each experience in a Card component
  - [x] 5.3 Show position (h2), company name, dates (formatted MMM YYYY)
  - [x] 5.4 Display "PRESENT" for current positions
  - [x] 5.5 List responsibilities as bullet points with border-t-4 separator
  - [x] 5.6 Entries render in array order (already reverse-chronological)

- [x] Task 6: Implement date formatting (AC: #2)
  - [x] 6.1 Create 11ty filter or inline Nunjucks for date formatting
  - [x] 6.2 Format: "YYYY-MM" → "MMM YYYY" (e.g., "2023-07" → "JUL 2023")
  - [x] 6.3 Handle null endDate with "PRESENT"

- [x] Task 7: Implement education section (AC: #1, #4)
  - [x] 7.1 Conditionally render if `resume.education` exists and has entries
  - [x] 7.2 Add "EDUCATION" heading
  - [x] 7.3 Display each education entry in a Card
  - [x] 7.4 Show degree (h3), institution, dates

- [x] Task 8: Implement Technical Toolkit section (AC: #4)
  - [x] 8.1 Add "TECHNICAL <span class="bg-lime-400">TOOLKIT</span>" heading
  - [x] 8.2 Create 2-column grid (md:grid-cols-2)
  - [x] 8.3 Display 10 skill category cards with lime-400 background
  - [x] 8.4 Each card shows category name (h3) and skills as comma-separated list
  - [x] 8.5 Skill categories: FRONTEND, BACKEND, DATA, INFRA, OBSERVABILITY, SECURITY, TESTING, TOOLS, ARCHITECTURE, CLOUD

- [x] Task 9: Add print-resume JavaScript (AC: #1)
  - [x] 9.1 Add event listener in main.js for `[data-print-resume]` button
  - [x] 9.2 Trigger `window.print()` on click

- [x] Task 10: Ensure responsive layout (AC: #5)
  - [x] 10.1 Header: flex-col on mobile, md:flex-row on desktop
  - [x] 10.2 Date display: stack on mobile, side-by-side on desktop
  - [x] 10.3 Skill grid: single column on mobile, 2-column on md+
  - [x] 10.4 Cards maintain readable padding at all sizes

- [x] Task 11: Ensure accessibility (AC: #1-5)
  - [x] 11.1 Single h1 for page title ("WORK HISTORY")
  - [x] 11.2 h2 for position titles, h3 for education degrees
  - [x] 11.3 Visible focus states on Download button (4px black outline)
  - [x] 11.4 Semantic list elements for responsibilities

- [x] Task 12: Write ATDD tests (AC: #1-6)
  - [x] 12.1 Test resume page accessible at `/resume/`
  - [x] 12.2 Test work experience entries displayed (7 positions)
  - [x] 12.3 Test positions show company, title, dates, responsibilities
  - [x] 12.4 Test education section displayed (2 entries)
  - [x] 12.5 Test Technical Toolkit with 10 skill categories
  - [x] 12.6 Test responsive layout (mobile vs desktop)
  - [x] 12.7 Test Neubrutalist styling (border, shadow)
  - [x] 12.8 Test Download CV button exists and is clickable

## Dev Notes

### CRITICAL: 1:1 React Parity Implementation

**This story MUST match the React implementation exactly.** Reference file: `src/pages/Resume.tsx`

**DO NOT:**
- Change the section order (Work History → Education → Technical Toolkit)
- Alter the styling (blue-400 for HISTORY, lime-400 for TOOLKIT and skill cards)
- Add features not in the React version
- Skip the Download CV button

### React Component Analysis

**Page Structure (from Resume.tsx):**
```tsx
<div className="max-w-6xl mx-auto px-6 py-16">
  {/* Header with title and download button */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
    <h1>WORK <span className="bg-blue-400 px-2">HISTORY</span></h1>
    <button onClick={handleDownloadCV}>DOWNLOAD CV</button>
  </div>

  {/* Experience cards */}
  <div className="space-y-6">
    {resume.experience.map(exp => <Card>...</Card>)}
  </div>

  {/* Education section (conditional) */}
  {resume.education?.length > 0 && (
    <div className="mt-12">
      <h2>EDUCATION</h2>
      {resume.education.map(edu => <Card>...</Card>)}
    </div>
  )}

  {/* Technical Toolkit */}
  <div className="mt-12">
    <h2>TECHNICAL <span className="bg-lime-400 px-2">TOOLKIT</span></h2>
    <div className="grid md:grid-cols-2 gap-6">
      {/* 10 skill category cards */}
    </div>
  </div>
</div>
```

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-4.1] - Acceptance criteria
- [Source: _bmad-output/planning-artifacts/architecture.md#Data-Architecture] - Data file patterns
- [Source: _bmad-output/planning-artifacts/prd.md#FR22-FR24] - Resume requirements
- [Source: src/pages/Resume.tsx] - **PRIMARY** React implementation for 1:1 parity
- [Source: src/data/resume.json] - Work experience and education data
- [Source: src/data/skills.json] - Technical skills data
- [Source: _includes/components/card.njk] - Card component
- [Source: js/main.js] - JavaScript patterns for event delegation

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

N/A - Implementation completed without blocking issues.

### Completion Notes List

- Created `_data/resume.json` with 7 work experience entries and 2 education entries from React source
- Created `_data/skills.json` with 10 skill categories matching React implementation
- Updated `resume.njk` template with full implementation:
  - Page header with "WORK HISTORY" h1 and blue-400 highlight
  - Download CV button with Neubrutalist styling and lucide Download icon SVG
  - Work experience section using Card component with h2 position titles
  - Date formatting macro converting "YYYY-MM" to "MMM YYYY"
  - Education section with h2 heading and h3 degree titles
  - Technical Toolkit section with 10 lime-400 skill cards in 2-column grid
- Added `initResumePrint()` function to `js/main.js` for print functionality
- 190 ATDD tests pass across all 5 browser projects (chromium, firefox, webkit, mobile-chrome, mobile-safari)
- Full test suite (1558 tests) passes with no regressions
- 1:1 React parity achieved for all visible elements and styling

### Code Review Fixes (2026-01-31)

- **H1 Fixed**: Added mousedown/mouseup/mouseleave press effects to Download CV button for full React parity
- **M1 Fixed**: Documented sprint-status.yaml in File List
- **M2 Fixed**: Refactored 10 hardcoded skill cards to use Nunjucks loop with skillCategories array

### File List

**Created:**
- `_data/resume.json` - Work experience and education data (7 positions, 2 education entries)
- `_data/skills.json` - Technical skills by category (10 categories)

**Modified:**
- `resume.njk` - Complete resume page template (was placeholder, now full implementation)
- `js/main.js` - Added `initResumePrint()` function for Download CV button
- `tests/e2e/resume.spec.ts` - ATDD tests (38 test cases across 6 test groups)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Story status tracking

**Unchanged:**
- `_includes/layouts/base.njk` - Reused existing layout
- `_includes/components/card.njk` - Reused existing Card component
- `eleventy.config.js` - No changes needed

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-31 | Story implementation complete - all tasks done, 190 tests pass | Dev Agent |
| 2026-01-31 | Code review fixes: Added button press effect for React parity, refactored skill cards to use loop, documented sprint-status.yaml in File List | Code Review |
