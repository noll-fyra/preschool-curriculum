"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { getTeacherDisplayName } from "@/lib/display-name";

export default function EditClassPage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;
  const { classes, teachers, updateClass, setTeacherClasses, deleteClass } = useStore();
  const cls = classes.find((c) => c.id === classId);

  const [name, setName] = useState("");
  const [termLabel, setTermLabel] = useState("");
  const [assignedTeacherIds, setAssignedTeacherIds] = useState<string[]>([]);

  useEffect(() => {
    if (cls) {
      setName(cls.name);
      setTermLabel(cls.termLabel);
      setAssignedTeacherIds(teachers.filter((t) => t.classIds.includes(classId)).map((t) => t.id));
    }
  }, [cls, classId, teachers]);

  if (!cls) {
    return (
      <div className="px-5 py-8">
        <p style={{ color: "var(--color-text-muted)" }}>Class not found.</p>
        <Link href="/admin/classes" className="text-sm font-medium mt-2 inline-block" style={{ color: "var(--color-primary)" }}>
          ← Back to classes
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    updateClass(classId, { name: name.trim(), termLabel: termLabel.trim() });
    teachers.forEach((t) => {
      const shouldHave = assignedTeacherIds.includes(t.id);
      const hasNow = t.classIds.includes(classId);
      if (shouldHave && !hasNow) {
        setTeacherClasses(t.id, [...t.classIds, classId]);
      } else if (!shouldHave && hasNow) {
        setTeacherClasses(t.id, t.classIds.filter((id) => id !== classId));
      }
    });
    router.push("/admin/classes");
  };

  const toggleTeacher = (teacherId: string) => {
    setAssignedTeacherIds((prev) =>
      prev.includes(teacherId) ? prev.filter((id) => id !== teacherId) : [...prev, teacherId]
    );
  };

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-lg">
      <Link
        href="/admin/classes"
        className="inline-flex items-center gap-1 text-sm font-medium mb-6"
        style={{ color: "var(--color-text-mid)" }}
      >
        ← Back to classes
      </Link>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-dark)" }}>
        Edit class
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="block">
          <span className="block text-sm font-medium mb-1" style={{ color: "var(--color-text-dark)" }}>
            Class name
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border text-sm"
            style={{ borderColor: "var(--color-border)" }}
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-1" style={{ color: "var(--color-text-dark)" }}>
            Term
          </span>
          <input
            type="text"
            value={termLabel}
            onChange={(e) => setTermLabel(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border text-sm"
            style={{ borderColor: "var(--color-border)" }}
          />
        </label>

        <div>
          <span className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-dark)" }}>
            Assign teachers
          </span>
          <div className="flex flex-col gap-2">
            {teachers.map((t) => (
              <label key={t.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={assignedTeacherIds.includes(t.id)}
                  onChange={() => toggleTeacher(t.id)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm" style={{ color: "var(--color-text-dark)" }}>
                  {getTeacherDisplayName(t)}
                  {t.email && <span className="text-muted"> · {t.email}</span>}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
            style={{ background: "var(--color-primary)" }}
          >
            Save changes
          </button>
          <Link
            href="/admin/classes"
            className="px-4 py-2.5 rounded-lg text-sm font-medium border"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-mid)" }}
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined" && window.confirm("Delete this class? Teachers and students will be unassigned from it.")) {
                deleteClass(classId);
                router.push("/admin/classes");
              }
            }}
            className="px-4 py-2.5 rounded-lg text-sm font-medium border"
            style={{ borderColor: "var(--color-coral, #E8745A)", color: "var(--color-coral, #E8745A)" }}
          >
            Delete class
          </button>
        </div>
      </form>
    </div>
  );
}
