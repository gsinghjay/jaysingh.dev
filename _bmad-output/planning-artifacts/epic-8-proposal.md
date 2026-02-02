# Epic 8: Educational Platform - Capstone Project Showcase (PROPOSAL)

**Status:** Draft Proposal (Pending Approval)
**Depends On:** Epic 7 (Sanity.io CMS Integration)
**Generated:** 2026-02-01
**Source:** Brainstorming Session - Post-Epic 7 Opportunities

---

## Overview

Transform jaysingh.dev's Sanity + GitHub Pages foundation into an educational platform for managing capstone class projects. Students submit projects through Sanity Studio, instructors review and grade submissions, and approved projects are showcased publicly.

**Core Value Proposition:**
- Students get a professional portfolio piece on a public showcase
- Instructors get structured submission/review workflows without building custom software
- The platform runs entirely on free tiers (Sanity + GitHub Pages + GitHub Actions)

---

## New Functional Requirements

| FR | Description |
|----|-------------|
| FR46 | Students can create and edit their own project submission via Sanity Studio |
| FR47 | Students can upload screenshots and demo videos to their project |
| FR48 | Students can track their submission status (Draft, Submitted, Under Review, Needs Revision, Approved) |
| FR49 | Instructors can view all student projects in a dashboard |
| FR50 | Instructors can provide structured feedback using rubric-based scoring |
| FR51 | Instructors can request revisions with specific feedback items |
| FR52 | Instructors can approve projects for public showcase |
| FR53 | Instructors can manage cohorts (semesters/years) with student rosters |
| FR54 | Instructors can publish announcements visible to all students |
| FR55 | Visitors can browse approved projects in a public showcase gallery |
| FR56 | Visitors can filter showcase projects by technology, cohort, or category |
| FR57 | Visitors can view individual project case studies with Challenge/Solution/Impact format |
| FR58 | System rebuilds showcase when instructor approves a project |

---

## Architecture Decisions

### Student Access Model
**Decision:** Students are Sanity Studio editors with document-level permissions

**Rationale:**
- Sanity free tier allows **unlimited** editor accounts
- Built-in version history, real-time collaboration, asset management
- No custom auth system needed
- Students learn professional CMS workflows

**Trade-off:** Requires students to create Sanity accounts (low friction, professional skill)

### Showcase Visibility
**Decision:** Only `approved` projects appear on public GitHub Pages site

**Rationale:**
- Instructor controls quality of public showcase
- Students can iterate in draft without public visibility
- Build webhook only triggers on status change to `approved`

### Cohort Isolation
**Decision:** Cohorts are separate Sanity documents, projects reference their cohort

**Rationale:**
- Clean archive of previous semesters
- Easy filtering by cohort on showcase
- No need for separate Sanity datasets (stays on free tier)

---

## Free Tier Validation

| Resource | Limit | Expected Usage | Status |
|----------|-------|----------------|--------|
| Sanity Editors | Unlimited | 30 students + 3 instructors | ✅ |
| Sanity API Requests | 100K/month | ~2K/day with 30 active students | ✅ |
| Sanity Assets | 5GB | ~100MB/student (screenshots) = 3GB | ✅ |
| Sanity Bandwidth | 10GB/month | Static site caches, minimal API calls | ✅ |
| GitHub Actions | 2,000 min/month | ~5 min/build × 100 builds = 500 min | ✅ |
| GitHub Pages | 1GB storage, 100GB bandwidth | Static HTML + images via Sanity CDN | ✅ |

---

## Story Breakdown

### Story 8.1: Define Student and Project Schemas

As a **developer**,
I want **Sanity schemas for students and their project submissions**,
So that **the CMS can manage educational content alongside portfolio content**.

**Acceptance Criteria:**

**Given** the Sanity Studio schema directory
**When** I review the schema definitions
**Then** a `student` schema exists with fields:
- `name` (string, required)
- `email` (string, required, validated)
- `bio` (text, optional)
- `avatar` (image, optional)
- `github` (url, optional)
- `linkedin` (url, optional)
- `cohort` (reference to cohort, required)
- `sanityUserId` (string, system-managed)

**Given** the Sanity Studio schema directory
**When** I review the schema definitions
**Then** a `capstoneProject` schema exists with fields:
- `title` (string, required)
- `student` (reference to student, required)
- `cohort` (reference to cohort, required)
- `status` (string enum: draft/submitted/under_review/needs_revision/approved, default: draft)
- `description` (text, required)
- `challenge` (portable text, required)
- `solution` (portable text, required)
- `impact` (portable text, required)
- `techStack` (array of strings, required)
- `repoUrl` (url, optional)
- `demoUrl` (url, optional)
- `screenshots` (array of images, min 1 required)
- `submittedAt` (datetime, system-managed)
- `approvedAt` (datetime, system-managed)

**Given** the Sanity Studio schema directory
**When** I review the schema definitions
**Then** a `cohort` schema exists with fields:
- `name` (string, required, e.g., "Fall 2026")
- `year` (number, required)
- `semester` (string enum: spring/summer/fall, required)
- `startDate` (date, required)
- `endDate` (date, required)
- `isActive` (boolean, default: false)

**Given** the schemas are deployed
**When** I create a test capstone project in Sanity Studio
**Then** all field validations enforce required fields and formats

---

### Story 8.2: Configure Role-Based Access Control

As an **instructor**,
I want **students to only edit their own project submissions**,
So that **each student manages only their work while I maintain oversight**.

**Acceptance Criteria:**

**Given** the Sanity project settings
**When** I review the access control configuration
**Then** a `student` role exists with permissions:
- Can create `capstoneProject` documents
- Can read/update `capstoneProject` documents where `student._ref` matches their user
- Can read all `cohort` and `announcement` documents
- Cannot delete any documents
- Cannot publish (only save drafts)

**Given** the Sanity project settings
**When** I review the access control configuration
**Then** an `instructor` role exists with permissions:
- Full CRUD on all document types
- Can publish/unpublish all documents
- Can manage user roles

**Given** a student logs into Sanity Studio
**When** they view the content list
**Then** they only see their own `capstoneProject` document(s)

**Given** a student attempts to access another student's project via URL
**When** the page loads
**Then** they see an access denied message

**Given** an instructor logs into Sanity Studio
**When** they view the content list
**Then** they see all `capstoneProject` documents with filtering options

---

### Story 8.3: Build Student Submission Interface

As a **student**,
I want **a streamlined interface to submit my capstone project**,
So that **I can focus on content without being overwhelmed by CMS complexity**.

**Acceptance Criteria:**

**Given** a student logs into Sanity Studio
**When** they access the dashboard
**Then** they see a simplified view with:
- Their project submission (or "Create Project" button if none exists)
- Current submission status prominently displayed
- Deadline countdown (if applicable)
- Recent announcements

**Given** a student is editing their project
**When** they view the form
**Then** fields are organized in logical sections:
- Section 1: Basic Info (title, description, tech stack)
- Section 2: Case Study (challenge, solution, impact)
- Section 3: Links & Media (repo, demo, screenshots)

**Given** a student has filled all required fields
**When** they are ready to submit for review
**Then** they see a "Submit for Review" button that:
- Changes status from `draft` to `submitted`
- Records `submittedAt` timestamp
- Triggers notification to instructor (future enhancement)

**Given** a student's project has status `needs_revision`
**When** they view their project
**Then** they see the instructor's feedback prominently displayed

**Given** a student's project has status `submitted` or `under_review`
**When** they attempt to edit
**Then** editing is disabled with message "Project is under review"

---

### Story 8.4: Build Instructor Review Dashboard

As an **instructor**,
I want **a dashboard showing all student submissions and their status**,
So that **I can efficiently manage the review process**.

**Acceptance Criteria:**

**Given** an instructor accesses Sanity Studio
**When** they view the instructor dashboard
**Then** they see a filterable list of all `capstoneProject` documents showing:
- Student name
- Project title
- Status (with color coding)
- Submitted date
- Cohort

**Given** the instructor dashboard
**When** I filter by status
**Then** I can view only projects in a specific status (e.g., "submitted" for review queue)

**Given** the instructor dashboard
**When** I filter by cohort
**Then** I can view only projects from a specific semester

**Given** an instructor opens a project for review
**When** they view the review interface
**Then** they see:
- Full project content (read-only view of student submission)
- Status dropdown to change status
- Feedback text field (visible to student when status = needs_revision)
- "Approve for Showcase" button (sets status to `approved`, records `approvedAt`)

**Given** an instructor clicks "Approve for Showcase"
**When** the action completes
**Then** the project status changes to `approved` AND a webhook fires to trigger site rebuild

---

### Story 8.5: Implement Rubric-Based Assessment

As an **instructor**,
I want **to score projects using a consistent rubric**,
So that **grading is fair and students receive structured feedback**.

**Acceptance Criteria:**

**Given** the Sanity schema directory
**When** I review the schema definitions
**Then** a `rubric` schema exists with fields:
- `name` (string, required)
- `cohort` (reference to cohort, required)
- `criteria` (array of objects):
  - `name` (string, e.g., "Technical Complexity")
  - `description` (text)
  - `maxPoints` (number)
  - `weight` (number, percentage)

**Given** the Sanity schema directory
**When** I review the schema definitions
**Then** a `projectReview` schema exists with fields:
- `project` (reference to capstoneProject, required)
- `reviewer` (reference to instructor/user, required)
- `scores` (array of objects):
  - `criterion` (string, matches rubric criterion name)
  - `score` (number)
  - `feedback` (text)
- `overallFeedback` (text)
- `totalScore` (number, computed)
- `reviewedAt` (datetime)
- `isPrivate` (boolean, default: true - if false, visible to student)

**Given** an instructor reviews a project
**When** they access the scoring interface
**Then** they see the rubric criteria with score inputs for each

**Given** an instructor completes scoring
**When** they save the review
**Then** the total score is computed as weighted sum of criterion scores

**Given** an instructor marks a review as not private
**When** the student views their project
**Then** they can see the feedback and scores

---

### Story 8.6: Create Public Showcase Gallery

As a **site visitor**,
I want **to browse approved capstone projects**,
So that **I can see student work and potentially hire talented graduates**.

**Acceptance Criteria:**

**Given** I navigate to `/showcase/`
**When** the page loads
**Then** I see a gallery of all `approved` capstone projects displayed as cards

**Given** the showcase gallery
**When** I view a project card
**Then** I see:
- Project title
- Student name
- Hero screenshot (first screenshot from array)
- Tech stack tags
- Cohort badge

**Given** the showcase gallery
**When** I use the filter controls
**Then** I can filter by:
- Technology (from techStack values across all projects)
- Cohort (semester/year)

**Given** I click on a project card
**When** the page loads
**Then** I see the full project detail page at `/showcase/{project-slug}/`

**Given** the project detail page
**When** I view the content
**Then** I see:
- Project title and student info (with optional links to GitHub/LinkedIn)
- Tech stack tags
- Challenge / Solution / Impact sections
- Screenshots gallery
- Links to repo and demo (if provided)
- "Back to Showcase" navigation

**Given** the showcase uses the Neubrutalist design system
**When** I view on mobile
**Then** the gallery and detail pages are fully responsive

---

### Story 8.7: Implement Cohort Management

As an **instructor**,
I want **to manage cohorts and onboard students**,
So that **I can organize submissions by semester and control access**.

**Acceptance Criteria:**

**Given** an instructor accesses Sanity Studio
**When** they create a new cohort
**Then** they can specify name, year, semester, start/end dates

**Given** a cohort exists
**When** an instructor sets `isActive: true`
**Then** that cohort appears as the default for new student registrations

**Given** an instructor needs to onboard students
**When** they access the cohort management interface
**Then** they see options to:
- Invite students via email (Sanity's built-in invite)
- View list of students in cohort
- Remove student from cohort

**Given** a semester ends
**When** an instructor sets `isActive: false` on a cohort
**Then** students in that cohort can no longer edit their projects (read-only)

**Given** multiple cohorts exist
**When** visitors browse the showcase
**Then** they can filter by cohort to see projects from specific semesters

**Given** an instructor wants to archive old cohorts
**When** they view cohort management
**Then** they can hide cohorts from the showcase while preserving data

---

### Story 8.8: Implement Announcement System

As an **instructor**,
I want **to publish announcements to all students**,
So that **I can communicate deadlines, updates, and feedback to the class**.

**Acceptance Criteria:**

**Given** the Sanity schema directory
**When** I review the schema definitions
**Then** an `announcement` schema exists with fields:
- `title` (string, required)
- `content` (portable text, required)
- `cohort` (reference to cohort, or null for all cohorts)
- `isPinned` (boolean, default: false)
- `publishedAt` (datetime, required)
- `expiresAt` (datetime, optional)

**Given** an instructor creates an announcement
**When** they publish it
**Then** it appears in the student dashboard

**Given** an announcement has `isPinned: true`
**When** students view their dashboard
**Then** pinned announcements appear at the top

**Given** an announcement has `expiresAt` in the past
**When** students view their dashboard
**Then** the announcement is not displayed

**Given** announcements exist
**When** visitors view the showcase
**Then** announcements are NOT visible (student/instructor only)

---

### Story 8.9: Configure Webhook for Showcase Rebuilds

As a **developer**,
I want **the showcase to rebuild only when projects are approved**,
So that **we minimize unnecessary builds and keep the showcase current**.

**Acceptance Criteria:**

**Given** the Sanity webhook configuration
**When** I review the webhooks
**Then** a webhook exists with filter:
```groq
_type == "capstoneProject" &&
delta::changedAny(status) &&
status == "approved"
```

**Given** an instructor approves a project
**When** the status changes to `approved`
**Then** the webhook triggers GitHub Actions `repository_dispatch`

**Given** the GitHub Actions workflow
**When** `repository_dispatch` is received with type `sanity-showcase-update`
**Then** the build runs: npm ci → build:css → build → deploy

**Given** a student edits their draft project
**When** they save changes
**Then** NO webhook fires (drafts don't trigger rebuilds)

**Given** the build completes
**When** I check the showcase
**Then** the newly approved project appears in the gallery

---

### Story 8.10: Validate End-to-End Educational Workflow

As an **instructor**,
I want **to verify the complete student submission workflow**,
So that **I can confirm the platform is ready for a real cohort**.

**Acceptance Criteria:**

**Given** a test cohort is created
**When** I invite a test student via email
**Then** they receive an invitation to join Sanity Studio

**Given** a test student accepts the invitation
**When** they log into Sanity Studio
**Then** they see the simplified student dashboard

**Given** a test student creates a project
**When** they fill all required fields and submit for review
**Then** the project status changes to `submitted`

**Given** a submitted project exists
**When** the instructor reviews and requests revisions
**Then** the student can see feedback and edit their project again

**Given** a revised project is submitted
**When** the instructor approves it
**Then** the webhook fires and the project appears on the public showcase

**Given** the approved project on the showcase
**When** I view the project detail page
**Then** all content matches what was entered in Sanity Studio

**Given** the complete workflow
**When** I measure the time from approval to live on showcase
**Then** it is less than 5 minutes

---

## Dependencies

| Story | Depends On |
|-------|------------|
| 8.1 | Epic 7 complete (Sanity project initialized) |
| 8.2 | 8.1 (schemas exist) |
| 8.3 | 8.1, 8.2 (schemas + roles) |
| 8.4 | 8.1, 8.2 (schemas + roles) |
| 8.5 | 8.1, 8.4 (project schema + review interface) |
| 8.6 | 8.1 (project schema) |
| 8.7 | 8.1 (cohort schema) |
| 8.8 | 8.1 (announcement schema) |
| 8.9 | 8.1, Epic 7.4 (webhooks configured) |
| 8.10 | All previous stories |

---

## Implementation Notes

### Sanity Studio Customization
- Use Sanity's Structure Builder to create role-specific dashboards
- Student view: Simplified, focused on their project
- Instructor view: Full access with review queue

### Portable Text for Rich Content
- Challenge/Solution/Impact fields use Portable Text
- Allows embedded images, code blocks, links within content
- Renders to HTML at build time

### Tech Stack Taxonomy
- Maintain a predefined list of technologies in `_data/techStack.json`
- Students select from list (prevents typos/duplicates)
- Enables consistent filtering on showcase

### Screenshot Requirements
- Minimum 1 screenshot required
- Recommended: 3-5 screenshots showing key features
- Sanity image CDN handles responsive sizing

---

## Future Enhancements (Not in Epic 8)

These ideas emerged from brainstorming but are out of scope for initial implementation:

- **Peer Review:** Students review each other's projects
- **GitHub Integration:** Auto-pull repo stats, README content
- **Lighthouse Audits:** Automated performance scoring of demo URLs
- **Presentation Mode:** Slideshow view for demo day
- **Alumni Tracking:** Where are graduates now?
- **Job Board:** Connect sponsors with students
- **Completion Certificates:** Generated PDF/image on approval

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Student onboarding time | < 10 minutes from invite to first draft |
| Submission to approval cycle | < 48 hours average |
| Showcase page load time | < 2 seconds |
| Lighthouse scores (showcase) | 100 across all categories |
| Student satisfaction | Qualitative feedback positive |
| Instructor time saved vs manual process | > 50% reduction |

---

## Approval

- [ ] Jay approves Epic 8 scope
- [ ] Architecture review (Sanity permissions model)
- [ ] PRD updated with new FRs (FR46-FR58)
- [ ] Stories added to sprint backlog

---

*Generated by Business Analyst Agent (Mary) from brainstorming session on 2026-02-01*
