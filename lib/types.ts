export type LearningAreaId = "LL" | "NUM" | "SED";
export type LevelId = "B" | "D" | "S";
export type MilestoneStatus = "not_started" | "in_progress" | "achieved";
export type ReportStatus = "draft" | "published";
export type Pronoun = "he" | "she" | "they";

export type YearLevelId = "N1" | "N2" | "K1" | "K2";

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
  areaId: LearningAreaId;
  levelId: LevelId;
  sequence: number;
}

export interface Class {
  id: string;
  name: string;
  termLabel: string;
}

export interface Child {
  id: string;
  name: string;
  pronoun: Pronoun;
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
  createdAt: string;
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
