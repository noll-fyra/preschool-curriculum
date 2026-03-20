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
  TeacherUpdateMedia,
  ChatMessage,
  ChatMessageKind,
  PersonalitySnapshot,
  TeacherStrategies,
  FamilyContext,
  TeacherNote,
  NoteTag,
  CalendarHoliday,
  ClassSchedule,
  Organisation,
  School,
  Employee,
  EmployeeSchoolRole,
  ClassTeacherAssignment,
  Parent,
  StudentParentLink,
  StudentEnrollment,
  EmployeeRole,
  GeneratedDocument,
  ChildAttendance,
  AttendanceStatus,
  DailyUpdate,
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
  DEMO_CHAT_MESSAGES,
  DEMO_PERSONALITY_SNAPSHOTS,
  DEMO_TEACHER_STRATEGIES,
  DEMO_FAMILY_CONTEXTS,
  DEMO_TEACHER_NOTES,
  DEMO_CALENDAR_HOLIDAYS,
  DEMO_CLASS_SCHEDULES,
  DEMO_ATTENDANCE,
  DEMO_DAILY_UPDATES,
  ORGANISATION,
  SCHOOL,
  EMPLOYEES,
  EMPLOYEE_SCHOOL_ROLES,
  CLASS_TEACHER_ASSIGNMENTS,
  PARENTS,
  STUDENT_PARENT_LINKS,
  STUDENT_ENROLLMENTS,
} from "./seed-data";
import { computeStatus } from "./mastery";
import { generateReportDraft } from "./report-generator";

// ─── Store shape ───────────────────────────────────────────────────────────

// ─── Demo persona state ────────────────────────────────────────────────────
export interface DemoPersona {
  /** Employee ID of the active teacher persona (emp-siti or emp-lim) */
  teacherEmployeeId: string;
  /** ID of the active parent persona */
  parentId: string;
  /** Role of the active school-admin persona */
  adminRole: EmployeeRole;
  /** Child ID currently viewed in student demo */
  studentChildId: string;
}

export interface NurtureStore {
  // ── Hierarchy ─────────────────────────────────────────────────────────────
  organisation: Organisation;
  school: School;
  employees: Employee[];
  employeeSchoolRoles: EmployeeSchoolRole[];
  classTeacherAssignments: ClassTeacherAssignment[];
  parents: Parent[];
  studentParentLinks: StudentParentLink[];
  studentEnrollments: StudentEnrollment[];

  // ── Demo persona ──────────────────────────────────────────────────────────
  demoPersona: DemoPersona;
  setDemoTeacher: (employeeId: string, classId: string) => void;
  setDemoParent: (parentId: string) => void;
  setDemoAdmin: (role: EmployeeRole) => void;
  setDemoStudent: (childId: string) => void;

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
  chatMessages: ChatMessage[];
  activityConfigOverrides: Record<string, ActivityConfig>;
  personalitySnapshots: PersonalitySnapshot[];
  teacherStrategies: TeacherStrategies[];
  familyContexts: FamilyContext[];
  teacherNotes: TeacherNote[];
  calendarHolidays: CalendarHoliday[];
  classSchedules: ClassSchedule[];
  generatedDocuments: GeneratedDocument[];
  attendance: ChildAttendance[];
  dailyUpdates: DailyUpdate[];

  // Quick-log sheet global state
  quickLogOpen: boolean;
  openQuickLog: () => void;
  closeQuickLog: () => void;

  // Notifications panel global state
  notificationsOpen: boolean;
  openNotifications: () => void;
  closeNotifications: () => void;

  // Actions
  setActiveClass: (classId: string) => void;
  markAttendance: (childId: string, date: string, status: AttendanceStatus, reason?: string) => void;
  setChildTeacherNote: (childId: string, note: string) => void;
  recordSession: (childId: string, milestoneId: string, score: number) => void;
  logObservation: (childId: string, milestoneId: string, note?: string, teacherId?: string) => void;
  undoObservation: (childId: string, milestoneId: string) => void;
  createActivity: (activity: Omit<PlannedActivity, "id" | "createdAt" | "classId">) => void;
  deleteActivity: (activityId: string) => void;
  saveFeedback: (activityId: string, childId: string, note: string) => void;
  deleteFeedback: (activityId: string, childId: string) => void;
  saveReportNotes: (reportId: string, teacherNotes: string) => void;
  publishReport: (reportId: string) => void;
  generateReport: (childId: string) => void;
  postChatMessage: (msg: Omit<ChatMessage, "id" | "createdAt">) => void;
  broadcastChatMessage: (classId: string, senderId: string, senderType: "teacher" | "parent", kind: ChatMessageKind, text: string, media: TeacherUpdateMedia[]) => void;
  markThreadRead: (childId: string) => void;
  savePersonalitySnapshot: (childId: string, content: string) => void;
  saveTeacherStrategies: (childId: string, whatWorks: string, whatToWatch: string) => void;
  saveFamilyContext: (childId: string, content: string) => void;
  addTeacherNote: (childId: string, content: string, tags: NoteTag[]) => void;
  deleteTeacherNote: (noteId: string) => void;
  saveGeneratedDocument: (doc: Omit<GeneratedDocument, "id" | "createdAt">) => void;
  deleteGeneratedDocument: (docId: string) => void;
  createDailyUpdate: (update: Omit<DailyUpdate, "id" | "createdAt">) => void;

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

  // Calendar actions
  createHoliday: (h: Omit<CalendarHoliday, "id" | "createdAt">) => void;
  updateHoliday: (id: string, h: Partial<Omit<CalendarHoliday, "id" | "createdAt">>) => void;
  deleteHoliday: (id: string) => void;
  createSchedule: (s: Omit<ClassSchedule, "id" | "createdAt">) => void;
  updateSchedule: (id: string, s: Partial<Omit<ClassSchedule, "id" | "createdAt">>) => void;
  deleteSchedule: (id: string) => void;

  // Hierarchy CRUD
  addEmployee: (e: Omit<Employee, "id">) => void;
  updateEmployee: (id: string, e: Partial<Omit<Employee, "id">>) => void;
  deleteEmployee: (id: string) => void;
  addEmployeeRole: (r: Omit<EmployeeSchoolRole, "id">) => void;
  removeEmployeeRole: (id: string) => void;
  addParent: (p: Omit<Parent, "id">) => void;
  updateParent: (id: string, p: Partial<Omit<Parent, "id">>) => void;
  deleteParent: (id: string) => void;
  linkStudentParent: (link: Omit<StudentParentLink, "id">) => void;
  unlinkStudentParent: (id: string) => void;
  enrollStudent: (e: Omit<StudentEnrollment, "id">) => void;
  transferStudent: (childId: string, newClassId: string) => void;
}

// ─── Store ─────────────────────────────────────────────────────────────────

const initialProgress = buildInitialProgress();

export const useStore = create<NurtureStore>((set, get) => ({
  // ── Hierarchy initial state ────────────────────────────────────────────────
  organisation: ORGANISATION,
  school: SCHOOL,
  employees: EMPLOYEES,
  employeeSchoolRoles: EMPLOYEE_SCHOOL_ROLES,
  classTeacherAssignments: CLASS_TEACHER_ASSIGNMENTS,
  parents: PARENTS,
  studentParentLinks: STUDENT_PARENT_LINKS,
  studentEnrollments: STUDENT_ENROLLMENTS,

  // ── Demo persona initial state ────────────────────────────────────────────
  demoPersona: {
    teacherEmployeeId: "emp-siti",
    parentId: "parent-ahmed",
    adminRole: "org_admin",
    studentChildId: "child-rayan",
  },
  setDemoTeacher: (employeeId, classId) =>
    set((s) => ({ demoPersona: { ...s.demoPersona, teacherEmployeeId: employeeId }, activeClassId: classId })),
  setDemoParent: (parentId) =>
    set((s) => ({ demoPersona: { ...s.demoPersona, parentId } })),
  setDemoAdmin: (role) =>
    set((s) => ({ demoPersona: { ...s.demoPersona, adminRole: role } })),
  setDemoStudent: (childId) =>
    set((s) => ({ demoPersona: { ...s.demoPersona, studentChildId: childId } })),

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
  chatMessages: DEMO_CHAT_MESSAGES,
  activityConfigOverrides: {},
  personalitySnapshots: DEMO_PERSONALITY_SNAPSHOTS,
  teacherStrategies: DEMO_TEACHER_STRATEGIES,
  familyContexts: DEMO_FAMILY_CONTEXTS,
  teacherNotes: DEMO_TEACHER_NOTES,
  calendarHolidays: DEMO_CALENDAR_HOLIDAYS,
  classSchedules: DEMO_CLASS_SCHEDULES,
  generatedDocuments: [],
  attendance: DEMO_ATTENDANCE,
  dailyUpdates: DEMO_DAILY_UPDATES,

  quickLogOpen: false,
  openQuickLog: () => set({ quickLogOpen: true }),
  closeQuickLog: () => set({ quickLogOpen: false }),

  notificationsOpen: false,
  openNotifications: () => set({ notificationsOpen: true }),
  closeNotifications: () => set({ notificationsOpen: false }),

  // ── Switch active class ──────────────────────────────────────────────────
  setActiveClass: (classId) => set({ activeClassId: classId }),

  markAttendance: (childId, date, status, reason) =>
    set((state) => {
      const existing = state.attendance.findIndex(
        (a) => a.childId === childId && a.date === date
      );
      const patch = { status, absentReason: status === "absent" ? reason : undefined };
      if (existing >= 0) {
        const updated = [...state.attendance];
        updated[existing] = { ...updated[existing], ...patch };
        return { attendance: updated };
      }
      return {
        attendance: [
          ...state.attendance,
          { id: `att-${childId}-${date}`, childId, date, ...patch },
        ],
      };
    }),

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
  logObservation: (childId, milestoneId, note, teacherId) => {
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
      ...(note ? { note } : {}),
      ...(teacherId ? { teacherId } : {}),
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

  // ── Post a chat message to a single child's thread ───────────────────────
  postChatMessage: (msg) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `chat-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((s) => ({ chatMessages: [...s.chatMessages, newMsg] }));
  },

  // ── Broadcast a message to all children in a class ───────────────────────
  broadcastChatMessage: (classId, senderId, senderType, kind, text, media) => {
    const { children } = get();
    const classChildren = children.filter((c) => c.classId === classId);
    const createdAt = new Date().toISOString();
    const newMessages: ChatMessage[] = classChildren.map((child, i) => ({
      id: `chat-${Date.now()}-${i}`,
      childId: child.id,
      senderId,
      senderType,
      kind,
      text,
      media,
      createdAt,
    }));
    set((s) => ({ chatMessages: [...s.chatMessages, ...newMessages] }));
  },

  // ── Mark all parent messages in a thread as read ─────────────────────────
  markThreadRead: (childId) => {
    const now = new Date().toISOString();
    set((s) => ({
      chatMessages: s.chatMessages.map((m) =>
        m.childId === childId && m.senderType === "parent" && !m.readAt
          ? { ...m, readAt: now }
          : m
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

  // ── Generated documents ───────────────────────────────────────────────
  saveGeneratedDocument: (doc) => {
    const newDoc: GeneratedDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ generatedDocuments: [newDoc, ...state.generatedDocuments] }));
  },
  deleteGeneratedDocument: (docId) => {
    set((state) => ({
      generatedDocuments: state.generatedDocuments.filter((d) => d.id !== docId),
    }));
  },

  createDailyUpdate: (update) => {
    const newUpdate: DailyUpdate = {
      ...update,
      id: `du-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ dailyUpdates: [...state.dailyUpdates, newUpdate] }));
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
      chatMessages: s.chatMessages.filter((m) => {
        const child = s.children.find((c) => c.id === m.childId);
        return child?.classId !== id;
      }),
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
      chatMessages: s.chatMessages.filter((m) => m.childId !== id),
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

  // ── Calendar: holidays ────────────────────────────────────────────────────
  createHoliday: (h) => {
    const newHoliday: CalendarHoliday = {
      ...h,
      id: `holiday-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((s) => ({ calendarHolidays: [...s.calendarHolidays, newHoliday] }));
  },
  updateHoliday: (id, h) => {
    set((s) => ({
      calendarHolidays: s.calendarHolidays.map((x) => x.id === id ? { ...x, ...h } : x),
    }));
  },
  deleteHoliday: (id) => {
    set((s) => ({ calendarHolidays: s.calendarHolidays.filter((h) => h.id !== id) }));
  },

  // ── Calendar: class schedules ─────────────────────────────────────────────
  createSchedule: (sch) => {
    const newSchedule: ClassSchedule = {
      ...sch,
      id: `sched-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((s) => ({ classSchedules: [...s.classSchedules, newSchedule] }));
  },
  updateSchedule: (id, sch) => {
    set((s) => ({
      classSchedules: s.classSchedules.map((x) => x.id === id ? { ...x, ...sch } : x),
    }));
  },
  deleteSchedule: (id) => {
    set((s) => ({ classSchedules: s.classSchedules.filter((s2) => s2.id !== id) }));
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

  // ── Hierarchy CRUD ────────────────────────────────────────────────────────
  addEmployee: (e) => {
    const id = `emp-${Date.now()}`;
    set((s) => ({ employees: [...s.employees, { ...e, id }] }));
  },
  updateEmployee: (id, e) => {
    set((s) => ({ employees: s.employees.map((x) => (x.id === id ? { ...x, ...e } : x)) }));
  },
  deleteEmployee: (id) => {
    set((s) => ({
      employees: s.employees.filter((x) => x.id !== id),
      employeeSchoolRoles: s.employeeSchoolRoles.filter((r) => r.employeeId !== id),
      classTeacherAssignments: s.classTeacherAssignments.filter((a) => a.employeeId !== id),
    }));
  },
  addEmployeeRole: (r) => {
    const id = `role-${Date.now()}`;
    set((s) => ({ employeeSchoolRoles: [...s.employeeSchoolRoles, { ...r, id }] }));
  },
  removeEmployeeRole: (id) => {
    set((s) => ({ employeeSchoolRoles: s.employeeSchoolRoles.filter((r) => r.id !== id) }));
  },
  addParent: (p) => {
    const id = `parent-${Date.now()}`;
    set((s) => ({ parents: [...s.parents, { ...p, id }] }));
  },
  updateParent: (id, p) => {
    set((s) => ({ parents: s.parents.map((x) => (x.id === id ? { ...x, ...p } : x)) }));
  },
  deleteParent: (id) => {
    set((s) => ({
      parents: s.parents.filter((x) => x.id !== id),
      studentParentLinks: s.studentParentLinks.filter((l) => l.parentId !== id),
    }));
  },
  linkStudentParent: (link) => {
    const id = `spl-${Date.now()}`;
    set((s) => ({ studentParentLinks: [...s.studentParentLinks, { ...link, id }] }));
  },
  unlinkStudentParent: (id) => {
    set((s) => ({ studentParentLinks: s.studentParentLinks.filter((l) => l.id !== id) }));
  },
  enrollStudent: (e) => {
    const id = `enr-${Date.now()}`;
    // Deactivate any existing active enrollment for this child
    set((s) => ({
      studentEnrollments: [
        ...s.studentEnrollments.map((x) =>
          x.childId === e.childId && x.isActive
            ? { ...x, isActive: false, endDate: new Date().toISOString().slice(0, 10) }
            : x
        ),
        { ...e, id },
      ],
    }));
  },
  transferStudent: (childId, newClassId) => {
    const today = new Date().toISOString().slice(0, 10);
    const id = `enr-${Date.now()}`;
    set((s) => ({
      children: s.children.map((c) => (c.id === childId ? { ...c, classId: newClassId } : c)),
      studentEnrollments: [
        ...s.studentEnrollments.map((x) =>
          x.childId === childId && x.isActive
            ? { ...x, isActive: false, endDate: today }
            : x
        ),
        { id, childId, classId: newClassId, startDate: today, isActive: true },
      ],
    }));
  },
}));
