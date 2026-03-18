"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";
import type { Gender, YearLevelId } from "@/lib/types";

const GENDERS: { id: Gender; label: string }[] = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "non-binary", label: "Non-binary" },
];

const YEAR_LEVELS: { id: YearLevelId; label: string }[] = [
  { id: "N1", label: "N1" },
  { id: "N2", label: "N2" },
  { id: "K1", label: "K1" },
  { id: "K2", label: "K2" },
];

export default function NewStudentPage() {
  const router = useRouter();
  const { addChild, classes } = useStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<Gender>("non-binary");
  const [classId, setClassId] = useState(classes[0]?.id ?? "");
  const [yearLevel, setYearLevel] = useState<YearLevelId>("K1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) return;
    addChild({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      gender,
      classId: classId || "",
      yearLevel,
      organisationId: "org-1",    // MVP: single organisation
      schoolId: "school-1",       // MVP: single school
    });
    router.push("/school/students");
  };

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-lg">
      <Link
        href="/school/students"
        className="inline-flex items-center gap-1 text-sm font-medium mb-6"
        style={{ color: "var(--color-text-mid)" }}
      >
        ← Back to students
      </Link>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-dark)" }}>
        New student
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="block">
          <span className="block text-sm font-medium mb-1" style={{ color: "var(--color-text-dark)" }}>
            First name
          </span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="e.g. Rayan"
            className="w-full px-4 py-2.5 rounded-lg border text-sm"
            style={{ borderColor: "var(--color-border)" }}
            autoFocus
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-1" style={{ color: "var(--color-text-dark)" }}>
            Last name
          </span>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="e.g. Ahmad"
            className="w-full px-4 py-2.5 rounded-lg border text-sm"
            style={{ borderColor: "var(--color-border)" }}
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-1" style={{ color: "var(--color-text-dark)" }}>
            Gender
          </span>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            className="w-full px-4 py-2.5 rounded-lg border text-sm"
            style={{ borderColor: "var(--color-border)" }}
          >
            {GENDERS.map((g) => (
              <option key={g.id} value={g.id}>{g.label}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-1" style={{ color: "var(--color-text-dark)" }}>
            Class
          </span>
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border text-sm"
            style={{ borderColor: "var(--color-border)" }}
          >
            <option value="">Unassigned</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-1" style={{ color: "var(--color-text-dark)" }}>
            Year level
          </span>
          <select
            value={yearLevel}
            onChange={(e) => setYearLevel(e.target.value as YearLevelId)}
            className="w-full px-4 py-2.5 rounded-lg border text-sm"
            style={{ borderColor: "var(--color-border)" }}
          >
            {YEAR_LEVELS.map((y) => (
              <option key={y.id} value={y.id}>{y.label}</option>
            ))}
          </select>
        </label>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
            style={{ background: "var(--color-primary)" }}
          >
            Create student
          </button>
          <Link
            href="/school/students"
            className="px-4 py-2.5 rounded-lg text-sm font-medium border"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-mid)" }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
