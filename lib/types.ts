export type LearningAreaId = "LL" | "NUM" | "SED" | "ACE" | "DOW" | "HMS";
export type LevelId = "B" | "D" | "S";
export type MilestoneStatus = "not_started" | "in_progress" | "achieved";
export type ReportStatus = "draft" | "published";
export type Pronoun = "he" | "she" | "they";
export type Gender = "male" | "female" | "non-binary";

// N1 = Nursery 1 (~age 3–4), N2 = Nursery 2 (~age 4–5)
// K1 = Kindergarten 1 (~age 5–6), K2 = Kindergarten 2 (~age 6–7)
export type YearLevelId = "N1" | "N2" | "K1" | "K2";

export type EmployeeRole = "teacher" | "specialist" | "school_admin" | "org_admin";
export type ParentRelationship = "parent" | "guardian";
export type ParentType = "active" | "passive";

// ─── Organisation ────────────────────────────────────────────────────────────

export interface Organisation {
  id: string;
  name: string;
  logoUrl?: string;
}

// ─── School ──────────────────────────────────────────────────────────────────

export interface School {
  id: string;
  organisationId: string;
  name: string;
  address: string;
  openingHours: string; // e.g. "7:00am – 7:00pm"
  supportedYears: YearLevelId[];
}

// ─── Employee & Roles ─────────────────────────────────────────────────────────

export interface Employee {
  id: string;
  organisationId: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl?: string;
}

export interface EmployeeSchoolRole {
  id: string;
  employeeId: string;
  /** null for org_admin (access spans all schools) */
  schoolId: string | null;
  role: EmployeeRole;
  isPrimary: boolean;
  startDate: string; // YYYY-MM-DD
  endDate?: string;  // YYYY-MM-DD; undefined = currently active
}

// ─── Parent / Guardian ────────────────────────────────────────────────────────

export interface Parent {
  id: string;
  organisationId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  photoUrl?: string;
}

export interface StudentParentLink {
  id: string;
  childId: string;
  parentId: string;
  /** Label only — no functional permission difference */
  relationship: ParentRelationship;
  /** passive = progress feed only; active = feed + co-activity suggestions */
  parentType: ParentType;
}

// ─── Student Enrollment ───────────────────────────────────────────────────────

export interface StudentEnrollment {
  id: string;
  childId: string;
  classId: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;  // YYYY-MM-DD; undefined = currently active
  isActive: boolean;
}

// ─── Class Teacher Assignment ─────────────────────────────────────────────────

export interface ClassTeacherAssignment {
  id: string;
  classId: string;
  employeeId: string;
  /** Exactly one primary teacher per class */
  isPrimary: boolean;
}

export interface ChildGuardian {
  name: string;
  phone?: string;
  email?: string;
}

export interface ChildFlags {
  allergy?: string;
  medicalNote?: string;
  specialNeed?: string;
  welfareConcern?: string;
}

export interface LearningArea {
  id: LearningAreaId;
  name: string;
  assessmentType: "skill" | "behaviour";
}

export interface DevelopmentalLevel {
  id: LevelId;
  name: string;
  sortOrder: number;
}

export interface Milestone {
  id: string; // e.g. "LL-B-01"
  statement: string;
  parentDescription: string;
  /** Observable criteria for teacher/admin rubric reference — "what to look for" */
  teacherNotes: string;
  areaId: LearningAreaId;
  levelId: LevelId;
  sequence: number;
}

export interface Class {
  id: string;
  schoolId: string;
  name: string;
  preschoolYear: YearLevelId;
  academicYear: number; // e.g. 2025
  termLabel: string;    // display only, e.g. "Term 1 2025"
}

/** @deprecated Use Employee + EmployeeSchoolRole + ClassTeacherAssignment instead. Kept for MVP compatibility. */
export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  classIds: string[]; // classes this teacher is assigned to
}

export interface Child {
  id: string;
  organisationId: string;
  /** Current school — denormalised for quick lookup. Source of truth is StudentEnrollment. */
  schoolId: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  /** @deprecated Use StudentEnrollment for class membership. Kept for MVP compatibility. */
  classId: string;
  dateOfBirth?: string; // ISO date string (YYYY-MM-DD)
  yearLevel?: YearLevelId;
  photoUrl?: string;
  primaryGuardian?: ChildGuardian;
  flags?: ChildFlags;
  teacherNote?: string;
}

export interface ChildMilestoneProgress {
  childId: string;
  milestoneId: string;
  status: MilestoneStatus;
  achievedAt?: string; // ISO date string
}

export interface ActivitySession {
  id: string;
  childId: string;
  milestoneId: string;
  passed: boolean;
  score: number; // 0–3
  attemptedAt: string; // ISO datetime string
}

export interface TeacherObservation {
  id: string;
  childId: string;
  milestoneId: string;
  observedAt: string; // YYYY-MM-DD date string
  note?: string;
  teacherId?: string;
}

export interface WeeklyAssignment {
  childId: string;
  milestoneId: string;
  weekStart: string; // ISO date string (Monday)
  isSwapped: boolean;
}

export interface PlannedActivity {
  id: string;
  classId: string;
  title: string;
  description: string;
  areaId: LearningAreaId;
  milestoneId?: string; // optional link to a specific milestone
  childIds: string[];   // children this activity is assigned to
  date: string;         // YYYY-MM-DD — specific day the activity is scheduled
  startTime?: string;   // "HH:MM" 24-hour, e.g. "09:00"
  durationMins?: number; // e.g. 30
  createdAt: string;
}

// ─── Attendance ───────────────────────────────────────────────────────────────

export type AttendanceStatus = "pending" | "present" | "absent" | "late";

export interface ChildAttendance {
  id: string;
  childId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  /** Required when status is "absent"; reason provided by parent or teacher */
  absentReason?: string;
}

export interface ActivityFeedback {
  id: string;
  activityId: string;
  childId: string;
  note: string;
  createdAt: string;
}

export interface Report {
  id: string;
  childId: string;
  draftContent: string;
  teacherNotes: string;
  status: ReportStatus;
  generatedAt: string;
  publishedAt?: string;
}

export interface TeacherUpdateMedia {
  type: "photo" | "video";
  url: string;
}

export interface TeacherUpdate {
  id: string;
  teacherId: string;
  classId: string;
  /** Empty = whole class; non-empty = only these students */
  childIds: string[];
  text: string;
  media: TeacherUpdateMedia[];
  createdAt: string;
}

export type ChatMessageKind = "message" | "progress_update";

export interface ChatMessage {
  id: string;
  childId: string;
  senderId: string;
  senderType: "teacher" | "parent";
  /** "progress_update" is teacher-only; tagged visually and surfaced in the parent home feed */
  kind: ChatMessageKind;
  text: string;
  media: TeacherUpdateMedia[];
  createdAt: string;
  /** ISO timestamp when the teacher read this message; undefined = unread (only relevant for parent-sent messages) */
  readAt?: string;
}

export type NoteTag =
  | "learning"
  | "milestone_moment"
  | "behaviour"
  | "social"
  | "welfare"
  | "family";

export interface PersonalitySnapshot {
  childId: string;
  content: string;
  updatedAt: string; // ISO datetime
}

export interface TeacherStrategies {
  childId: string;
  whatWorks: string; // newline-separated items
  whatToWatch: string; // newline-separated items
  updatedAt: string;
}

export interface FamilyContext {
  childId: string;
  content: string;
  updatedAt: string;
}

export interface TeacherNote {
  id: string;
  childId: string;
  content: string;
  tags: NoteTag[];
  welfare: boolean;
  createdAt: string;
  deletedAt?: string; // welfare notes cannot be soft-deleted
}

// ─── Calendar ─────────────────────────────────────────────────────────────────

export interface CalendarHoliday {
  id: string;
  organisationId: string;
  /** null = org-wide (all schools); non-null = school-specific */
  schoolId: string | null;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD (inclusive; same as startDate for single-day)
  createdAt: string;
}

export type RecurrenceType = "weekly" | "monthly";
export type ScheduleScope = "year_level" | "class";

export interface ClassSchedule {
  id: string;
  organisationId: string;
  schoolId: string;
  scope: ScheduleScope;
  yearLevel?: YearLevelId;  // when scope === "year_level"
  classId?: string;          // when scope === "class"
  title: string;
  description?: string;
  recurrence: RecurrenceType;
  /** 1=Mon … 7=Sun; used when recurrence === "weekly" */
  daysOfWeek?: number[];
  /** 1–31; used when recurrence === "monthly" */
  dayOfMonth?: number;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  startTime?: string; // "HH:MM" 24h
  endTime?: string;   // "HH:MM" 24h
  createdAt: string;
}

// Derived / view types

export interface MilestoneWithProgress extends Milestone {
  status: MilestoneStatus;
  masteryCount: number; // sessions passed or unique observation days
  masteryTotal: number; // 3 (skill) or 5 (SED)
  achievedAt?: string;
}

export interface ChildWithLevels extends Child {
  levels: Record<LearningAreaId, LevelId>;
}

export const LEARNING_AREAS: LearningArea[] = [
  { id: "LL", name: "Language & Literacy", assessmentType: "skill" },
  { id: "NUM", name: "Numeracy", assessmentType: "skill" },
  { id: "SED", name: "Social & Emotional Development", assessmentType: "behaviour" },
  { id: "ACE", name: "Aesthetics & Creative Expression", assessmentType: "behaviour" },
  { id: "DOW", name: "Discovery of the World", assessmentType: "behaviour" },
  { id: "HMS", name: "Health, Safety & Motor Skills", assessmentType: "behaviour" },
];

export const DEVELOPMENTAL_LEVELS: DevelopmentalLevel[] = [
  { id: "B", name: "Beginning", sortOrder: 1 },
  { id: "D", name: "Developing", sortOrder: 2 },
  { id: "S", name: "Secure", sortOrder: 3 },
];

export const LEVEL_LABELS: Record<LevelId, string> = {
  B: "Beginning",
  D: "Developing",
  S: "Secure",
};

// ─── Daily Updates ────────────────────────────────────────────────────────

export type MoodType = "happy" | "settled" | "tired" | "upset" | "excited";

export interface DailyUpdate {
  id: string;
  childId: string;
  teacherId: string;
  text: string;
  mood: MoodType;
  photos: string[];
  date: string;       // YYYY-MM-DD
  createdAt: string;  // ISO datetime
}

// ─── AI-generated documents ────────────────────────────────────────────────

export type GeneratedDocType =
  | "report"
  | "portfolio"
  | "lesson_plan"
  | "curriculum"
  | "evaluation"
  | "proposal";

export interface GeneratedDocument {
  id: string;
  type: GeneratedDocType;
  /** For child-specific documents (report, portfolio, evaluation) */
  childId?: string;
  /** For class-level documents (curriculum) */
  classId?: string;
  title: string;
  /** Markdown content */
  content: string;
  createdAt: string;
}
