# Sprint Change Proposal

**Date:** 2026-02-01
**Triggered By:** Requirements clarification during implementation
**Status:** APPROVED

---

## Issue Summary

### Triggering Event
Requirements clarification: **Collaborators need CMS access to contribute content for MVP launch.**

### Core Problem Statement

| Aspect | Detail |
|--------|--------|
| **Issue Type** | New requirement emerged / Original requirement misunderstood |
| **Problem** | PRD assumed Jay as sole author for MVP. Reality: collaborators need to create/edit all content types (blog, projects, profile, config) but cannot use Git. |
| **Impact** | Sanity.io integration must move from Growth Phase → MVP scope |
| **Gate** | Needed as soon as GitHub Pages deployment is live |

### Evidence
- Collaborators cannot use Git workflow
- All four content types require CMS management
- Required at launch, not post-launch

---

## Impact Analysis

### Epic Impact

| Epic | Status | Impact |
|------|--------|--------|
| Epic 1: Foundation & Site Shell | ✅ Done | No change |
| Epic 2: Blog Experience | ✅ Done | No change |
| Epic 3: Project Showcase | 🔄 In Progress | No change |
| Epic 4: Professional Profile | ✅ Done | No change |
| Epic 5: Content Authoring Pipeline | 🔄 In Progress | Review for dual-source |
| Epic 6: Production Deployment & SEO | ⏸️ Backlog | Gate for Sanity webhooks |
| **Epic 7: Sanity.io CMS Integration** | **NEW** | **Added** |

### Artifact Conflicts

| Artifact | Change Required |
|----------|-----------------|
| PRD | Move Sanity from Growth → MVP scope |
| Architecture | Add Sanity as content source, webhook config |
| Epics | Add Epic 7 with 6 stories |
| Sprint Status | Add Epic 7 entries, resequence |

---

## Recommended Approach

**Option 1: Direct Adjustment** (Selected)

- Add new Epic 7 for Sanity integration
- Modify Epic 5 for dual-source content
- Keep all existing work intact
- Resequence: Epic 6 → Epic 7 → Epic 5 completion

**Rationale:**
- Existing work is valid and reusable
- Sanity is additive, not a redesign
- Architecture is already "CMS-ready"
- Clear dependency: deployment must be live for webhooks

---

## Detailed Changes

### PRD Updates
- Executive Summary: Update scope statement
- MVP Features: Add Sanity.io integration
- User Journeys: Remove "[Growth Phase]" from Journey 4
- Functional Requirements: Add FR41-FR45 for CMS authoring

### Architecture Updates
- Data Architecture: Add Sanity as content source
- Content Flow: Add Sanity API path
- Infrastructure: Add webhook configuration

### New Epic 7: Sanity.io CMS Integration

| Story | Description |
|-------|-------------|
| 7-1 | Initialize Sanity Project and Studio |
| 7-2 | Define Content Schemas |
| 7-3 | Implement 11ty Sanity Data Source |
| 7-4 | Configure Webhook Rebuilds |
| 7-5 | Deploy Sanity Studio |
| 7-6 | Validate End-to-End Content Workflow |

---

## Implementation Handoff

### Scope Classification
**MODERATE** - Backlog reorganization and artifact updates required

### Action Plan

| Step | Action | Owner |
|------|--------|-------|
| 1 | Update PRD | PM |
| 2 | Update Architecture | Architect |
| 3 | Add Epic 7 to epics.md | PM |
| 4 | Update sprint-status.yaml | SM |
| 5 | Complete Story 3-5 | Dev |
| 6 | Complete Epic 6 | Dev |
| 7 | Execute Epic 7 | Dev |

### Success Criteria
- Collaborators can log into Sanity Studio
- All content types manageable in Sanity
- Publishing triggers automatic rebuild
- Content appears on live site within 5 minutes

---

**Approved:** 2026-02-01
