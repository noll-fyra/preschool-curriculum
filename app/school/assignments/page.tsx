"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

type AssignmentType = "lead" | "co-teacher" | "guest" | "none";

interface Assignment {
  employeeId: string;
  classId: string;
  type: AssignmentType;
  guestUntil?: string;
}

const INITIAL_ASSIGNMENTS: Assignment[] = [
  { employeeId: "emp-siti", classId: "class-1", type: "lead" },
  { employeeId: "emp-siti", classId: "class-2", type: "none" },
  { employeeId: "emp-lim",  classId: "class-1", type: "none" },
  { employeeId: "emp-lim",  classId: "class-2", type: "lead" },
  { employeeId: "emp-priya", classId: "class-1", type: "none" },
  { employeeId: "emp-priya", classId: "class-2", type: "none" },
  { employeeId: "emp-david", classId: "class-1", type: "none" },
  { employeeId: "emp-david", classId: "class-2", type: "none" },
];

const TYPE_LABELS: Record<AssignmentType, string> = {
  lead: "Lead",
  "co-teacher": "Co-teacher",
  guest: "Guest",
  none: "—",
};

const TYPE_COLORS: Record<AssignmentType, { bg: string; text: string }> = {
  lead: { bg: "var(--color-primary-wash)", text: "var(--color-primary)" },
  "co-teacher": { bg: "#eff6ff", text: "#3b82f6" },
  guest: { bg: "#fef9c3", text: "#a16207" },
  none: { bg: "transparent", text: "var(--color-text-mid)" },
};

const ACCESS_TABLE = [
  { type: "Lead teacher",   see: true, log: true,  schedule: true, message: true, reports: "Full" },
  { type: "Co-teacher",     see: true, log: true,  schedule: false, message: true, reports: "View" },
  { type: "Guest/covering", see: true, log: true,  schedule: false, message: false, reports: "None" },
];

interface EditModalProps {
  empName: string;
  className: string;
  current: Assignment;
  onSave: (updated: Assignment) => void;
  onClose: () => void;
}

function EditModal({ empName, className, current, onSave, onClose }: EditModalProps) {
  const [type, setType] = useState<AssignmentType>(current.type);
  const [guestUntil, setGuestUntil] = useState(current.guestUntil ?? "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)" }}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <h2 className="font-semibold text-base mb-1" style={{ color: "var(--color-text-dark)" }}>
          Edit assignment
        </h2>
        <p className="text-sm mb-5" style={{ color: "var(--color-text-mid)" }}>
          {empName} · {className}
        </p>

        <div className="space-y-2 mb-4">
          {(["lead", "co-teacher", "guest", "none"] as AssignmentType[]).map((t) => (
            <label
              key={t}
              className="flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors"
              style={{
                borderColor: type === t ? "var(--color-primary)" : "var(--color-border)",
                background: type === t ? "var(--color-primary-wash)" : "transparent",
              }}
            >
              <input
                type="radio"
                name="assignType"
                value={t}
                checked={type === t}
                onChange={() => setType(t)}
                className="accent-[var(--color-primary)]"
              />
              <span className="text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>
                {t === "none" ? "No assignment" : TYPE_LABELS[t]}
              </span>
            </label>
          ))}
        </div>

        {type === "guest" && (
          <div className="mb-4">
            <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-mid)" }}>
              Access until
            </label>
            <input
              type="date"
              value={guestUntil}
              onChange={(e) => setGuestUntil(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-mid)" }}
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ ...current, type, guestUntil: type === "guest" ? guestUntil : undefined })}
            className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white"
            style={{ background: "var(--color-primary)" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AssignmentsPage() {
  const employees = useStore((s) => s.employees);
  const classes = useStore((s) => s.classes);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [editing, setEditing] = useState<Assignment | null>(null);

  const getAssignment = (empId: string, classId: string) =>
    assignments.find((a) => a.employeeId === empId && a.classId === classId) ??
    { employeeId: empId, classId, type: "none" as AssignmentType };

  const handleSave = (updated: Assignment) => {
    setAssignments((prev) => {
      const idx = prev.findIndex(
        (a) => a.employeeId === updated.employeeId && a.classId === updated.classId
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updated;
        return next;
      }
      return [...prev, updated];
    });
    setEditing(null);
  };

  const editingEmp = editing ? employees.find((e) => e.id === editing.employeeId) : null;
  const editingClass = editing ? classes.find((c) => c.id === editing.classId) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold" style={{ color: "var(--color-text-dark)" }}>
          Teacher Assignments
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--color-text-mid)" }}>
          Manage which teachers have access to each class and in what capacity.
        </p>
      </div>

      {/* Assignment matrix */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--color-text-dark)" }}>
                Staff member
              </th>
              {classes.map((cls) => (
                <th
                  key={cls.id}
                  className="text-center px-5 py-3 font-semibold"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {cls.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b border-[var(--color-border)] last:border-0">
                <td className="px-5 py-3">
                  <div className="font-medium" style={{ color: "var(--color-text-dark)" }}>
                    {emp.firstName} {emp.lastName}
                  </div>
                  <div className="text-xs" style={{ color: "var(--color-text-mid)" }}>
                    {emp.email}
                  </div>
                </td>
                {classes.map((cls) => {
                  const a = getAssignment(emp.id, cls.id);
                  const colors = TYPE_COLORS[a.type];
                  return (
                    <td key={cls.id} className="px-5 py-3 text-center">
                      <button
                        onClick={() => setEditing(a)}
                        className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80"
                        style={{ background: colors.bg, color: colors.text }}
                      >
                        {TYPE_LABELS[a.type]}
                        {a.type === "guest" && a.guestUntil && (
                          <span className="ml-1 opacity-70">until {a.guestUntil}</span>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Access permissions reference */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-x-auto">
        <div className="px-5 py-4 border-b border-[var(--color-border)]">
          <h2 className="font-semibold text-sm" style={{ color: "var(--color-text-dark)" }}>
            Access permissions by role
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)]" style={{ background: "var(--color-bg-cream)" }}>
              <th className="text-left px-5 py-2.5 font-medium text-xs" style={{ color: "var(--color-text-mid)" }}>Role</th>
              <th className="text-center px-4 py-2.5 font-medium text-xs" style={{ color: "var(--color-text-mid)" }}>View class</th>
              <th className="text-center px-4 py-2.5 font-medium text-xs" style={{ color: "var(--color-text-mid)" }}>Log observations</th>
              <th className="text-center px-4 py-2.5 font-medium text-xs" style={{ color: "var(--color-text-mid)" }}>Edit schedule</th>
              <th className="text-center px-4 py-2.5 font-medium text-xs" style={{ color: "var(--color-text-mid)" }}>Message parents</th>
              <th className="text-center px-4 py-2.5 font-medium text-xs" style={{ color: "var(--color-text-mid)" }}>Reports</th>
            </tr>
          </thead>
          <tbody>
            {ACCESS_TABLE.map((row) => (
              <tr key={row.type} className="border-b border-[var(--color-border)] last:border-0">
                <td className="px-5 py-3 font-medium" style={{ color: "var(--color-text-dark)" }}>{row.type}</td>
                {[row.see, row.log, row.schedule, row.message].map((v, i) => (
                  <td key={i} className="px-4 py-3 text-center">
                    {v ? (
                      <span style={{ color: "var(--color-primary)" }}>✓</span>
                    ) : (
                      <span style={{ color: "var(--color-text-mid)" }}>—</span>
                    )}
                  </td>
                ))}
                <td className="px-4 py-3 text-center text-xs" style={{ color: "var(--color-text-mid)" }}>
                  {row.reports}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && editingEmp && editingClass && (
        <EditModal
          empName={`${editingEmp.firstName} ${editingEmp.lastName}`}
          className={editingClass.name}
          current={editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
