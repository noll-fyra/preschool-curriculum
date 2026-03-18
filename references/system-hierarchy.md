# System Hierarchy

This document is the canonical reference for all entities and relationships in the Nurture platform. Update this file whenever the data model changes.

---

## Entity overview

```
Organisation
  └── School (1:many)
        ├── Class (1:many)
        │     ├── ClassTeacherAssignment → Employee (many:many, isPrimary flag)
        │     └── StudentEnrollment → Child (1:many, historised)
        └── EmployeeSchoolRole → Employee (many:many)

Employee (org-scoped)
  └── EmployeeSchoolRole (1:many across schools)

Child (org-scoped)
  ├── StudentEnrollment → Class (1:many, history preserved)
  └── StudentParentLink → Parent (many:many)

Parent (org-scoped)
  └── StudentParentLink → Child (many:many, children can span schools)
```

---

## Entities

### Organisation
The top-level tenant. The app is deployed at the organisation level. All schools, employees, children, and parents belong to one organisation.

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | |
| `name` | string | e.g. "My First Skool" |
| `logoUrl` | string? | |

---

### School
A physical preschool site belonging to an organisation.

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | |
| `organisationId` | string | FK → Organisation |
| `name` | string | e.g. "Blk 322A Tengah Drive" |
| `address` | string | Full street address |
| `openingHours` | string | Human-readable, e.g. "7:00am – 7:00pm" |
| `supportedYears` | YearLevelId[] | Subset of ["N1","N2","K1","K2"] this site offers |

---

### Employee
Any staff member of the organisation — teachers, specialists, and admins share this entity. Roles are stored separately per school.

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | |
| `organisationId` | string | FK → Organisation |
| `firstName` | string | |
| `lastName` | string | |
| `email` | string | |
| `photoUrl` | string? | |

---

### EmployeeSchoolRole
Tracks what role(s) an employee holds at which school(s). One employee can have roles at multiple schools and can hold multiple roles.

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | |
| `employeeId` | string | FK → Employee |
| `schoolId` | string? | FK → School; **null for org_admin** |
| `role` | EmployeeRole | `"teacher"`, `"specialist"`, `"school_admin"`, `"org_admin"` |
| `isPrimary` | boolean | Primary role/school for this employee |
| `startDate` | string | ISO date (YYYY-MM-DD) |
| `endDate` | string? | ISO date; null = currently active |

**Role notes:**
- `teacher` — assigned to one or more classes within their school; delivers day-to-day instruction.
- `specialist` — supports children with developmental concerns for a defined short period; may work with children across classes.
- `school_admin` — manages their school's data (classes, enrollment, reports). `schoolId` is set.
- `org_admin` — same capabilities as school_admin but across all schools. `schoolId` is null.
- Employees can hold roles at multiple schools simultaneously (e.g. a specialist covering two sites).
- Access to a school's data is determined by having an active `EmployeeSchoolRole` for that school (or being an org_admin).

---

### Class
A cohort of children at a school for a given academic year.

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | |
| `schoolId` | string | FK → School |
| `name` | string | No fixed convention; set per school (e.g. "Sunshine Class") |
| `preschoolYear` | YearLevelId | `"N1"`, `"N2"`, `"K1"`, or `"K2"` |
| `academicYear` | number | e.g. `2025` |
| `termLabel` | string | e.g. "Term 1 2025" (display only) |

Classes are created fresh each year. Students are not automatically re-enrolled.

---

### ClassTeacherAssignment
Links teachers (employees with role `"teacher"`) to a class. A class can have multiple teachers; exactly one is primary.

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | |
| `classId` | string | FK → Class |
| `employeeId` | string | FK → Employee |
| `isPrimary` | boolean | Exactly one primary teacher per class |

---

### Child
A student enrolled at a school. All milestone progress, activity sessions, and observations are keyed to the child and persist across class changes and school transfers.

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | |
| `organisationId` | string | FK → Organisation |
| `schoolId` | string | Current school (denormalised for quick lookup) |
| `firstName` | string | |
| `lastName` | string | |
| `gender` | Gender | `"male"`, `"female"`, `"non-binary"` |
| `dateOfBirth` | string? | ISO date (YYYY-MM-DD) |
| `yearLevel` | YearLevelId? | Current level, e.g. `"K2"` |
| `photoUrl` | string? | |
| `flags` | ChildFlags? | Medical, welfare, special need flags |

> **Note:** `classId` is no longer a direct field on `Child`. Current class membership is the active record in `StudentEnrollment`. History is preserved across re-enrollments and school transfers.

---

### StudentEnrollment
Tracks a child's class membership over time. A child has exactly one active enrollment at a time.

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | |
| `childId` | string | FK → Child |
| `classId` | string | FK → Class |
| `startDate` | string | ISO date |
| `endDate` | string? | ISO date; null = currently active |
| `isActive` | boolean | Convenience flag; true for the current enrollment |

---

### Parent
An account holder who is a parent or guardian of one or more children. Invited to the app by a teacher or admin.

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | |
| `organisationId` | string | FK → Organisation (parents are org-scoped) |
| `firstName` | string | |
| `lastName` | string | |
| `email` | string | Used for login and invitations |
| `phone` | string? | |
| `photoUrl` | string? | |

A parent can have children across different schools within the same organisation.

---

### StudentParentLink
Links a child to their parent(s) and guardian(s). Defines the relationship type and the level of app access.

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | |
| `childId` | string | FK → Child |
| `parentId` | string | FK → Parent |
| `relationship` | `"parent"` \| `"guardian"` | Label only; no functional difference in permissions |
| `parentType` | `"active"` \| `"passive"` | `passive` = progress feed only; `active` = progress feed + co-activity suggestions |

---

## Types reference

```typescript
// Preschool year levels
type YearLevelId = "N1" | "N2" | "K1" | "K2";
// N1 = Nursery 1 (~age 3–4)
// N2 = Nursery 2 (~age 4–5)
// K1 = Kindergarten 1 (~age 5–6)
// K2 = Kindergarten 2 (~age 6–7)

type EmployeeRole = "teacher" | "specialist" | "school_admin" | "org_admin";

type ParentRelationship = "parent" | "guardian";
type ParentType = "active" | "passive";
```

---

## Onboarding flow (invitation)

1. Admin or teacher creates a `Parent` record and sends an invitation email.
2. Parent clicks the invite link and sets a password.
3. Admin or teacher creates a `StudentParentLink` connecting the parent to their child(ren).
4. Parent logs in and sees only the children they are linked to.

---

## Access control summary

| Role | Scope | Can do |
|------|-------|--------|
| `org_admin` | Entire org | Everything across all schools |
| `school_admin` | Their school | Manage classes, employees, enrollment, reports for that school |
| `teacher` | Assigned classes | Record sessions/observations, write notes, publish updates, invite parents |
| `specialist` | Children they support | Record observations and notes for assigned children |
| `parent` (active) | Their children | View progress feed + co-activity suggestions |
| `parent` (passive) | Their children | View progress feed only |
