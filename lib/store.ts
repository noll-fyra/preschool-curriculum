"use client";

import { create } from "zustand";
import type {
  Class,
  Teacher,
  Child,
  Milestone,
  ChildMilestoneProgress,
  ActivitySession,
  TeacherObservation,
  PlannedActivity,
  ActivityFeedback,
  Report,
  TeacherUpdate,
  PersonalitySnapshot,
  TeacherStrategies,
  FamilyContext,
  TeacherNote,
  NoteTag,
} from "./types";
import type { ActivityConfig } from "./activity-data";
import {
  CLASSES,
  TEACHERS,
  MILESTONES,
  CHILDREN,
  buildInitialProgress,
  DEMO_SESSIONS,
  DEMO_OBSERVATIONS,
  DEMO_PLANNED_ACTIVITIES,
  DEMO_ACTIVITY_FEEDBACK,
  DEMO_TEACHER_UPDATES,
  DEMO_PERSONALITY_SNAPSHOTS,
  DEMO_TEACHER_STRATEGIES,
  DEMO_FAMILY_CONTEXTS,
  DEMO_TEACHER_NOTES,
} from "./seed-data";
import { computeStatus } from "./mastery";
import { generateReportDraft } from "./report-generator";

// ─── Store shape ───────────────────────────────────────────────────────────

export interface NurtureStore {
  // Data
  classes: Class[];
  activeClassId: string;
  teachers: Teacher[];
  children: Child[];
  milestones: Milestone[];
  progress: ChildMilestoneProgress[];
  sessions: ActivitySession[];
  observations: TeacherObservation[];
  plannedActivities: PlannedActivity[];
  activityFeedback: ActivityFeedback[];
  reports: Report[];
  teacherUpdates: TeacherUpdate[];
  activityConfigOverrides: Record<string, ActivityConfig>;
  personalitySnapshots: PersonalitySnapshot[];
  teacherStrategies: TeacherStrategies[];
  familyContexts: FamilyContext[];
  teacherNotes: TeacherNote[];

  // Actions
  setActiveClass: (classId: string) => void;
  setChildTeacherNote: (childId: string, note: string) => void;
  recordSession: (childId: string, milestoneId: string, score: number) => void;
  logObservation: (childId: string, milestoneId: string) => void;
  undoObservation: (childId: string, milestoneId: string) => void;
  createActivity: (activity: Omit<PlannedActivity, "id" | "createdAt" | "classId">) => void;
  deleteActivity: (activityId: string) => void;
  saveFeedback: (activityId: string, childId: string, note: string) => void;
  deleteFeedback: (activityId: string, childId: string) => void;
  saveReportNotes: (reportId: string, teacherNotes: string) => void;
  publishReport: (reportId: string) => void;
  generateReport: (childId: string) => void;
  createTeacherUpdate: (update: Omit<TeacherUpdate, "id" | "createdAt">) => void;
  savePersonalitySnapshot: (childId: string, content: string) => void;
  saveTeacherStrategies: (childId: string, whatWorks: string, whatToWatch: string) => void;
  saveFamilyContext: (childId: string, content: string) => void;
  addTeacherNote: (childId: string, content: string, tags: NoteTag[]) => void;
  deleteTeacherNote: (noteId: string) => void;

  // Admin actions
  addClass: (c: Omit<Class, "id">) => void;
  updateClass: (id: string, c: Partial<Omit<Class, "id">>) => void;
  deleteClass: (id: string) => void;
  addTeacher: (t: Omit<Teacher, "id">) => void;
  updateTeacher: (id: string, t: Partial<Omit<Teacher, "id">>) => void;
  deleteTeacher: (id: string) => void;
  addChild: (c: Omit<Child, "id">) => void;
  updateChild: (id: string, c: Partial<Omit<Child, "id">>) => void;
  deleteChild: (id: string) => void;
  setChildClass: (childId: string, classId: string) => void;
  setTeacherClasses: (teacherId: string, classIds: string[]) => void;
  setActivityConfig: (milestoneId: string, config: ActivityConfig) => void;
  clearActivityConfigOverride: (milestoneId: string) => void;
}

// ─── Store ─────────────────────────────────────────────────────────────────

const initialProgress = buildInitialProgress();

export const useStore = create<NurtureStore>((set, get) => ({
  classes: CLASSES,
  activeClassId: CLASSES[0].id,
  teachers: TEACHERS,
  children: CHILDREN,
  milestones: MILESTONES,
  progress: initialProgress,
  sessions: DEMO_SESSIONS,
  observations: DEMO_OBSERVATIONS,
  plannedActivities: DEMO_PLANNED_ACTIVITIES,
  activityFeedback: DEMO_ACTIVITY_FEEDBACK,
  reports: [],
  teacherUpdates: DEMO_TEACHER_UPDATES,
  activityConfigOverrides: {},
  personalitySnapshots: DEMO_PERSONALITY_SNAPSHOTS,
  teacherStrategies: DEMO_TEACHER_STRATEGIES,
  familyContexts: DEMO_FAMILY_CONTEXTS,
  teacherNotes: DEMO_TEACHER_NOTES,

  // ── Switch active class ──────────────────────────────────────────────────
  setActiveClass: (classId) => set({ activeClassId: classId }),

  // ── Save a per-child teacher note ────────────────────────────────────────
  setChildTeacherNote: (childId, note) =>
    set((state) => ({
      children: state.children.map((child) =>
        child.id === childId ? { ...child, teacherNote: note } : child,
      ),
    })),

  // ── Record a student activity session ───────────────────────────────────
  recordSession: (childId, milestoneId, score) => {
    const newSession: ActivitySession = {
      id: `ses-${Date.now()}`,
      childId,
      milestoneId,
      passed: score >= 2,
      score,
      attemptedAt: new Date().toISOString(),
    };

    set((state) => {
      const newSessions = [...state.sessions, newSession];
      const milestone = state.milestones.find((m) => m.id === milestoneId);
      if (!milestone) return { sessions: newSessions };

      const newStatus = computeStatus(milestone, childId, newSessions, state.observations);
      const newProgress = state.progress.map((p) =>
        p.childId === childId && p.milestoneId === milestoneId
          ? {
              ...p,
              status: newStatus,
              achievedAt:
                newStatus === "achieved" && p.status !== "achieved"
                  ? new Date().toISOString()
                  : p.achievedAt,
            }
          : p
      );
      return { sessions: newSessions, progress: newProgress };
    });
  },

  // ── Log a teacher observation (SED) ─────────────────────────────────────
  logObservation: (childId, milestoneId) => {
    const today = new Date().toISOString().slice(0, 10);
    const { observations } = get();

    const alreadyLogged = observations.some(
      (o) => o.childId === childId && o.milestoneId === milestoneId && o.observedAt === today
    );
    if (alreadyLogged) return;

    const newObs: TeacherObservation = {
      id: `obs-${Date.now()}`,
      childId,
      milestoneId,
      observedAt: today,
    };

    set((state) => {
      const newObservations = [...state.observations, newObs];
      const milestone = state.milestones.find((m) => m.id === milestoneId);
      if (!milestone) return { observations: newObservations };

      const newStatus = computeStatus(milestone, childId, state.sessions, newObservations);
      const newProgress = state.progress.map((p) =>
        p.childId === childId && p.milestoneId === milestoneId
          ? {
              ...p,
              status: newStatus,
              achievedAt:
                newStatus === "achieved" && p.status !== "achieved"
                  ? new Date().toISOString()
                  : p.achievedAt,
            }
          : p
      );
      return { observations: newObservations, progress: newProgress };
    });
  },

  // ── Undo today's observation (SED) ──────────────────────────────────────
  undoObservation: (childId, milestoneId) => {
    const today = new Date().toISOString().slice(0, 10);

    set((state) => {
      const newObservations = state.observations.filter(
        (o) =>
          !(o.childId === childId && o.milestoneId === milestoneId && o.observedAt === today)
      );
      const milestone = state.milestones.find((m) => m.id === milestoneId);
      if (!milestone) return { observations: newObservations };

      const newStatus = computeStatus(milestone, childId, state.sessions, newObservations);
      const newProgress = state.progress.map((p) =>
        p.childId === childId && p.milestoneId === milestoneId
          ? { ...p, status: newStatus, achievedAt: newStatus === "achieved" ? p.achievedAt : undefined }
          : p
      );
      return { observations: newObservations, progress: newProgress };
    });
  },

  // ── Create a planned activity ─────────────────────────────────────────
  createActivity: (activity: Omit<PlannedActivity, "id" | "createdAt" | "classId">) => {
    const newActivity: PlannedActivity = {
      ...activity,
      classId: get().activeClassId,
      id: `act-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      plannedActivities: [...state.plannedActivities, newActivity],
    }));
  },

  // ── Delete a planned activity ─────────────────────────────────────────
  deleteActivity: (activityId) => {
    set((state) => ({
      plannedActivities: state.plannedActivities.filter((a) => a.id !== activityId),
      activityFeedback: state.activityFeedback.filter((f) => f.activityId !== activityId),
    }));
  },

  // ── Save (or update) feedback for a child on an activity ─────────────
  saveFeedback: (activityId, childId, note) => {
    set((state) => {
      const existing = state.activityFeedback.find(
        (f) => f.activityId === activityId && f.childId === childId
      );
      if (existing) {
        return {
          activityFeedback: state.activityFeedback.map((f) =>
            f.activityId === activityId && f.childId === childId
              ? { ...f, note, createdAt: new Date().toISOString() }
              : f
          ),
        };
      }
      return {
        activityFeedback: [
          ...state.activityFeedback,
          {
            id: `fb-${Date.now()}`,
            activityId,
            childId,
            note,
            createdAt: new Date().toISOString(),
          },
        ],
      };
    });
  },

  // ── Delete feedback for a child on an activity ────────────────────────
  deleteFeedback: (activityId, childId) => {
    set((state) => ({
      activityFeedback: state.activityFeedback.filter(
        (f) => !(f.activityId === activityId && f.childId === childId)
      ),
    }));
  },

  // ── Save teacher notes on a report ──────────────────────────────────────
  saveReportNotes: (reportId, teacherNotes) => {
    set((state) => ({
      reports: state.reports.map((r) => (r.id === reportId ? { ...r, teacherNotes } : r)),
    }));
  },

  // ── Publish a report ────────────────────────────────────────────────────
  publishReport: (reportId) => {
    set((state) => ({
      reports: state.reports.map((r) =>
        r.id === reportId
          ? { ...r, status: "published", publishedAt: new Date().toISOString() }
          : r
      ),
    }));
  },

  // ── Create a teacher update (class or student-specific) ──────────────────
  createTeacherUpdate: (update) => {
    const newUpdate: TeacherUpdate = {
      ...update,
      id: `update-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((s) => ({ teacherUpdates: [...s.teacherUpdates, newUpdate] }));
  },

  // ── Generate a new report draft ─────────────────────────────────────────
  generateReport: (childId) => {
    const state = get();
    const draftContent = generateReportDraft(
      childId,
      state.children,
      state.milestones,
      state.progress,
      state.sessions,
      state.observations
    );
    const newReport: Report = {
      id: `report-${childId}-${Date.now()}`,
      childId,
      draftContent,
      teacherNotes: "",
      status: "draft",
      generatedAt: new Date().toISOString(),
    };
    set((s) => ({ reports: [...s.reports, newReport] }));
  },

  // ── Profile: personality snapshot ────────────────────────────────────────
  savePersonalitySnapshot: (childId, content) => {
    set((state) => {
      const existing = state.personalitySnapshots.find((s) => s.childId === childId);
      const updated = { childId, content, updatedAt: new Date().toISOString() };
      return {
        personalitySnapshots: existing
          ? state.personalitySnapshots.map((s) => (s.childId === childId ? updated : s))
          : [...state.personalitySnapshots, updated],
      };
    });
  },

  // ── Profile: teacher strategies (what works / what to watch) ──────────────
  saveTeacherStrategies: (childId, whatWorks, whatToWatch) => {
    set((state) => {
      const existing = state.teacherStrategies.find((s) => s.childId === childId);
      const updated = { childId, whatWorks, whatToWatch, updatedAt: new Date().toISOString() };
      return {
        teacherStrategies: existing
          ? state.teacherStrategies.map((s) => (s.childId === childId ? updated : s))
          : [...state.teacherStrategies, updated],
      };
    });
  },

  // ── Profile: family context ───────────────────────────────────────────────
  saveFamilyContext: (childId, content) => {
    set((state) => {
      const existing = state.familyContexts.find((f) => f.childId === childId);
      const updated = { childId, content, updatedAt: new Date().toISOString() };
      return {
        familyContexts: existing
          ? state.familyContexts.map((f) => (f.childId === childId ? updated : f))
          : [...state.familyContexts, updated],
      };
    });
  },

  // ── Profile: teacher notes ────────────────────────────────────────────────
  addTeacherNote: (childId, content, tags) => {
    const newNote: TeacherNote = {
      id: `tnote-${Date.now()}`,
      childId,
      content,
      tags,
      welfare: tags.includes("welfare"),
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ teacherNotes: [...state.teacherNotes, newNote] }));
  },

  deleteTeacherNote: (noteId) => {
    set((state) => {
      const note = state.teacherNotes.find((n) => n.id === noteId);
      if (!note || note.welfare) return {}; // welfare notes cannot be deleted
      return {
        teacherNotes: state.teacherNotes.map((n) =>
          n.id === noteId ? { ...n, deletedAt: new Date().toISOString() } : n
        ),
      };
    });
  },

  // ── Admin: classes ────────────────────────────────────────────────────
  addClass: (c) => {
    const id = `class-${Date.now()}`;
    set((s) => ({ classes: [...s.classes, { ...c, id }] }));
  },
  updateClass: (id, c) => {
    set((s) => ({
      classes: s.classes.map((x) => (x.id === id ? { ...x, ...c } : x)),
    }));
  },
  deleteClass: (id) => {
    set((s) => ({
      classes: s.classes.filter((x) => x.id !== id),
      teachers: s.teachers.map((t) => ({
        ...t,
        classIds: t.classIds.filter((cid) => cid !== id),
      })),
      children: s.children.map((c) =>
        c.classId === id ? { ...c, classId: "" } : c
      ),
      teacherUpdates: s.teacherUpdates.filter((u) => u.classId !== id),
    }));
  },

  // ── Admin: teachers ───────────────────────────────────────────────────
  addTeacher: (t) => {
    const id = `teacher-${Date.now()}`;
    set((s) => ({
      teachers: [...s.teachers, { ...t, id, classIds: t.classIds ?? [] }],
    }));
  },
  updateTeacher: (id, t) => {
    set((s) => ({
      teachers: s.teachers.map((x) => (x.id === id ? { ...x, ...t } : x)),
    }));
  },
  deleteTeacher: (id) => {
    set((s) => ({ teachers: s.teachers.filter((x) => x.id !== id) }));
  },

  // ── Admin: children ────────────────────────────────────────────────────
  addChild: (c) => {
    const id = `child-${Date.now()}`;
    const state = get();
    const newProgress: ChildMilestoneProgress[] = state.milestones.map((m) => ({
      childId: id,
      milestoneId: m.id,
      status: "not_started" as const,
    }));
    set((s) => ({
      children: [...s.children, { ...c, id }],
      progress: [...s.progress, ...newProgress],
    }));
  },
  updateChild: (id, c) => {
    set((s) => ({
      children: s.children.map((x) => (x.id === id ? { ...x, ...c } : x)),
    }));
  },
  deleteChild: (id) => {
    set((s) => ({
      children: s.children.filter((x) => x.id !== id),
      progress: s.progress.filter((p) => p.childId !== id),
      sessions: s.sessions.filter((x) => x.childId !== id),
      observations: s.observations.filter((x) => x.childId !== id),
      reports: s.reports.filter((r) => r.childId !== id),
      activityFeedback: s.activityFeedback.filter((f) => f.childId !== id),
      teacherUpdates: s.teacherUpdates
        .filter((u) => {
          if (u.childIds.length === 0) return true;
          const remaining = u.childIds.filter((cid) => cid !== id);
          return remaining.length > 0;
        })
        .map((u) => ({
          ...u,
          childIds: u.childIds.length === 0 ? u.childIds : u.childIds.filter((cid) => cid !== id),
        })),
    }));
  },
  setChildClass: (childId, classId) => {
    set((s) => ({
      children: s.children.map((c) =>
        c.id === childId ? { ...c, classId } : c
      ),
    }));
  },
  setTeacherClasses: (teacherId, classIds) => {
    set((s) => ({
      teachers: s.teachers.map((t) =>
        t.id === teacherId ? { ...t, classIds } : t
      ),
    }));
  },

  // ── Admin: activity config overrides (for student play) ─────────────────
  setActivityConfig: (milestoneId, config) => {
    set((s) => ({
      activityConfigOverrides: { ...s.activityConfigOverrides, [milestoneId]: config },
    }));
  },
  clearActivityConfigOverride: (milestoneId) => {
    set((s) => {
      const next = { ...s.activityConfigOverrides };
      delete next[milestoneId];
      return { activityConfigOverrides: next };
    });
  },
}));
