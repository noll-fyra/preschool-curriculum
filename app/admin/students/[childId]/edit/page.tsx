"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const childId = params.childId as string;
  const { children, classes, updateChild, setChildClass } = useStore();
  const child = children.find((c) => c.id === childId);

  const [firstName, setFirstName] = useState(() => child?.firstName ?? "");
  const [lastName, setLastName] = useState(() => child?.lastName ?? "");
  const [gender, setGender] = useState<Gender>(() => child?.gender ?? "non-binary");
  const [classId, setClassId] = useState(() => child?.classId ?? "");
  const [yearLevel, setYearLevel] = useState<YearLevelId>(() => child?.yearLevel ?? "K1");
  const [dateOfBirth, setDateOfBirth] = useState(() => child?.dateOfBirth ?? "");
  const [guardianName, setGuardianName] = useState(() => child?.primaryGuardian?.name ?? "");
  const [guardianPhone, setGuardianPhone] = useState(() => child?.primaryGuardian?.phone ?? "");
  const [guardianEmail, setGuardianEmail] = useState(() => child?.primaryGuardian?.email ?? "");
  const [flagAllergy, setFlagAllergy] = useState(() => child?.flags?.allergy ?? "");
  const [flagMedical, setFlagMedical] = useState(() => child?.flags?.medicalNote ?? "");
  const [flagSpecialNeed, setFlagSpecialNeed] = useState(() => child?.flags?.specialNeed ?? "");
  const [flagWelfare, setFlagWelfare] = useState(() => child?.flags?.welfareConcern ?? "");

  if (!child) {
    return (
      <div className="px-5 py-8">
        <p style={{ color: "var(--color-text-muted)" }}>Student not found.</p>
        <Link href="/admin/students" className="text-sm font-medium mt-2 inline-block" style={{ color: "var(--color-primary)" }}>
          ← Back to students
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) return;
    updateChild(childId, {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      gender,
      yearLevel,
      dateOfBirth: dateOfBirth.trim() || undefined,
      primaryGuardian:
        guardianName.trim()
          ? {
              name: guardianName.trim(),
              phone: guardianPhone.trim() || undefined,
              email: guardianEmail.trim() || undefined,
            }
          : undefined,
      flags:
        flagAllergy.trim() || flagMedical.trim() || flagSpecialNeed.trim() || flagWelfare.trim()
          ? {
              allergy: flagAllergy.trim() || undefined,
              medicalNote: flagMedical.trim() || undefined,
              specialNeed: flagSpecialNeed.trim() || undefined,
              welfareConcern: flagWelfare.trim() || undefined,
            }
          : undefined,
    });
    if (child.classId !== classId) {
      setChildClass(childId, classId || "");
    }
    router.push("/admin/students");
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border text-sm";
  const inputStyle = { borderColor: "var(--color-border)" as const };
  const labelClass = "block text-sm font-medium mb-1";
  const labelStyle = { color: "var(--color-text-dark)" as const };

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-lg">
      <Link
        href="/admin/students"
        className="inline-flex items-center gap-1 text-sm font-medium mb-6"
        style={{ color: "var(--color-text-mid)" }}
      >
        ← Back to students
      </Link>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-dark)" }}>
        Edit student
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Name & identity */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Name & identity
          </h2>
          <label className="block">
            <span className={labelClass} style={labelStyle}>First name</span>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} style={inputStyle} />
          </label>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Last name</span>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} style={inputStyle} />
          </label>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Gender</span>
            <select value={gender} onChange={(e) => setGender(e.target.value as Gender)} className={inputClass} style={inputStyle}>
              {GENDERS.map((g) => (
                <option key={g.id} value={g.id}>{g.label}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Class & grade */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Class & grade
          </h2>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Class</span>
            <select value={classId} onChange={(e) => setClassId(e.target.value)} className={inputClass} style={inputStyle}>
              <option value="">Unassigned</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Year level</span>
            <select value={yearLevel} onChange={(e) => setYearLevel(e.target.value as YearLevelId)} className={inputClass} style={inputStyle}>
              {YEAR_LEVELS.map((y) => (
                <option key={y.id} value={y.id}>{y.label}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Profile (same as Teacher student page) */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Profile
          </h2>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Date of birth</span>
            <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className={inputClass} style={inputStyle} />
          </label>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Primary guardian
          </h2>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Name</span>
            <input type="text" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} placeholder="e.g. Mr Ahmed" className={inputClass} style={inputStyle} />
          </label>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Phone</span>
            <input type="tel" value={guardianPhone} onChange={(e) => setGuardianPhone(e.target.value)} placeholder="e.g. +65 8123 4567" className={inputClass} style={inputStyle} />
          </label>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Email</span>
            <input type="email" value={guardianEmail} onChange={(e) => setGuardianEmail(e.target.value)} placeholder="e.g. parent@example.com" className={inputClass} style={inputStyle} />
          </label>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Flags
          </h2>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Allergy</span>
            <input type="text" value={flagAllergy} onChange={(e) => setFlagAllergy(e.target.value)} placeholder="e.g. Peanut allergy – EpiPen in classroom" className={inputClass} style={inputStyle} />
          </label>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Medical note</span>
            <input type="text" value={flagMedical} onChange={(e) => setFlagMedical(e.target.value)} placeholder="e.g. Mild asthma – inhaler in office" className={inputClass} style={inputStyle} />
          </label>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Special need</span>
            <input type="text" value={flagSpecialNeed} onChange={(e) => setFlagSpecialNeed(e.target.value)} placeholder="e.g. Speech therapy support" className={inputClass} style={inputStyle} />
          </label>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Welfare concern</span>
            <input type="text" value={flagWelfare} onChange={(e) => setFlagWelfare(e.target.value)} className={inputClass} style={inputStyle} />
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: "var(--color-primary)" }}>
            Save changes
          </button>
          <Link href="/admin/students" className="px-4 py-2.5 rounded-lg text-sm font-medium border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-mid)" }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
