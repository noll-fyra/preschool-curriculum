"use client";

import { create } from "zustand";
import type {
  Class,
  Child,
  Milestone,
  ChildMilestoneProgress,
  ActivitySession,
  TeacherObservation,
  PlannedActivity,
  ActivityFeedback,
  Report,
} from "./types";
import {
  CLASSES,
  MILESTONES,
  CHILDREN,
  buildInitialProgress,
  DEMO_SESSIONS,
  DEMO_OBSERVATIONS,
  DEMO_PLANNED_ACTIVITIES,
  DEMO_ACTIVITY_FEEDBACK,
} from "./seed-data";
import { computeStatus } from "./mastery";
import { generateReportDraft } from "./report-generator";

// ─── Store shape ───────────────────────────────────────────────────────────

export interface NurtureStore {
  // Data
  classes: Class[];
  activeClassId: string;
  children: Child[];
  milestones: Milestone[];
  progress: ChildMilestoneProgress[];
  sessions: ActivitySession[];
  observations: TeacherObservation[];
  plannedActivities: PlannedActivity[];
  activityFeedback: ActivityFeedback[];
  reports: Report[];

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
}

// ─── Store ─────────────────────────────────────────────────────────────────

const initialProgress = buildInitialProgress();

export const useStore = create<NurtureStore>((set, get) => ({
  classes: CLASSES,
  activeClassId: CLASSES[0].id,
  children: CHILDREN,
  milestones: MILESTONES,
  progress: initialProgress,
  sessions: DEMO_SESSIONS,
  observations: DEMO_OBSERVATIONS,
  plannedActivities: DEMO_PLANNED_ACTIVITIES,
  activityFeedback: DEMO_ACTIVITY_FEEDBACK,
  reports: [],

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
}));
