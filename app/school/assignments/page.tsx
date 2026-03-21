"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
  { employeeId: "emp-lim", classId: "class-1", type: "none" },
  { employeeId: "emp-lim", classId: "class-2", type: "lead" },
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

const TYPE_COLORS: Record<
  AssignmentType,
  { className: string }
> = {
  lead: { className: "bg-primary/15 text-primary" },
  "co-teacher": { className: "bg-blue-50 text-blue-700" },
  guest: { className: "bg-amber-50 text-amber-800" },
  none: { className: "bg-muted text-muted-foreground" },
};

const ACCESS_TABLE = [
  { type: "Lead teacher", see: true, log: true, schedule: true, message: true, reports: "Full" },
  { type: "Co-teacher", see: true, log: true, schedule: false, message: true, reports: "View" },
  { type: "Guest/covering", see: true, log: true, schedule: false, message: false, reports: "None" },
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <Card
        className="max-w-sm shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Edit assignment</CardTitle>
          <p className="text-muted-foreground text-sm">
            {empName} · {className}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {(["lead", "co-teacher", "guest", "none"] as AssignmentType[]).map((t) => (
              <label
                key={t}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
                  type === t
                    ? "border-primary bg-accent"
                    : "border-border hover:bg-muted/50"
                )}
              >
                <input
                  type="radio"
                  name="assignType"
                  value={t}
                  checked={type === t}
                  onChange={() => setType(t)}
                  className="text-primary accent-primary"
                />
                <span className="text-sm font-medium text-foreground">
                  {t === "none" ? "No assignment" : TYPE_LABELS[t]}
                </span>
              </label>
            ))}
          </div>

          {type === "guest" && (
            <div>
              <Label htmlFor="guest-until" className="text-xs">
                Access until
              </Label>
              <Input
                id="guest-until"
                type="date"
                value={guestUntil}
                onChange={(e) => setGuestUntil(e.target.value)}
                className="mt-1"
              />
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              className="flex-1 font-semibold"
              onClick={() =>
                onSave({
                  ...current,
                  type,
                  guestUntil: type === "guest" ? guestUntil : undefined,
                })
              }
            >
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
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
    <div className="mx-auto max-w-4xl px-4 py-6 pb-24 md:pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Teacher Assignments</h1>
        <p className="text-muted-foreground mt-0.5 text-sm">
          Manage which teachers have access to each class and in what capacity.
        </p>
      </div>

      <Card className="mb-6 overflow-x-auto p-0 shadow-none">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-5 py-3 text-left font-semibold text-foreground">
                Staff member
              </th>
              {classes.map((cls) => (
                <th key={cls.id} className="px-5 py-3 text-center font-semibold text-foreground">
                  {cls.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b last:border-0">
                <td className="px-5 py-3">
                  <div className="font-medium text-foreground">
                    {emp.firstName} {emp.lastName}
                  </div>
                  <div className="text-muted-foreground text-xs">{emp.email}</div>
                </td>
                {classes.map((cls) => {
                  const a = getAssignment(emp.id, cls.id);
                  const tone = TYPE_COLORS[a.type];
                  return (
                    <td key={cls.id} className="px-5 py-3 text-center">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className={cn(
                          "rounded-full px-3 text-xs font-medium shadow-none",
                          tone.className
                        )}
                        onClick={() => setEditing(a)}
                      >
                        {TYPE_LABELS[a.type]}
                        {a.type === "guest" && a.guestUntil && (
                          <span className="ml-1 opacity-80">until {a.guestUntil}</span>
                        )}
                      </Button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="overflow-x-auto p-0 shadow-none">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-sm">Access permissions by role</CardTitle>
        </CardHeader>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="text-muted-foreground px-5 py-2.5 text-left text-xs font-medium">Role</th>
              <th className="text-muted-foreground px-4 py-2.5 text-center text-xs font-medium">
                View class
              </th>
              <th className="text-muted-foreground px-4 py-2.5 text-center text-xs font-medium">
                Log observations
              </th>
              <th className="text-muted-foreground px-4 py-2.5 text-center text-xs font-medium">
                Edit schedule
              </th>
              <th className="text-muted-foreground px-4 py-2.5 text-center text-xs font-medium">
                Message parents
              </th>
              <th className="text-muted-foreground px-4 py-2.5 text-center text-xs font-medium">
                Reports
              </th>
            </tr>
          </thead>
          <tbody>
            {ACCESS_TABLE.map((row) => (
              <tr key={row.type} className="border-b last:border-0">
                <td className="px-5 py-3 font-medium text-foreground">{row.type}</td>
                {[row.see, row.log, row.schedule, row.message].map((v, i) => (
                  <td key={i} className="px-4 py-3 text-center">
                    {v ? (
                      <span className="text-primary">✓</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                ))}
                <td className="text-muted-foreground px-4 py-3 text-center text-xs">
                  {row.reports}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

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
