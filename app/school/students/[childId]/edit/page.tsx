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

// ── Section wrapper ────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const childId = params.childId as string;
  const { children, classes, updateChild, setChildClass } = useStore();
  const child = children.find((c) => c.id === childId);

  // Basic
  const [firstName, setFirstName] = useState(() => child?.firstName ?? "");
  const [lastName, setLastName] = useState(() => child?.lastName ?? "");
  const [gender, setGender] = useState<Gender>(() => child?.gender ?? "non-binary");
  const [classId, setClassId] = useState(() => child?.classId ?? "");
  const [yearLevel, setYearLevel] = useState<YearLevelId>(() => child?.yearLevel ?? "K1");
  const [dateOfBirth, setDateOfBirth] = useState(() => child?.dateOfBirth ?? "");

  // Primary guardian
  const [guardianName, setGuardianName] = useState(() => child?.primaryGuardian?.name ?? "");
  const [guardianPhone, setGuardianPhone] = useState(() => child?.primaryGuardian?.phone ?? "");
  const [guardianEmail, setGuardianEmail] = useState(() => child?.primaryGuardian?.email ?? "");

  // Emergency contacts (demo — local state only)
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyRelation, setEmergencyRelation] = useState("");

  // Authorised pick-up (demo — local state only)
  const [pickupNames, setPickupNames] = useState("Primary guardian");

  // Flags
  const [flagAllergy, setFlagAllergy] = useState(() => child?.flags?.allergy ?? "");
  const [flagMedical, setFlagMedical] = useState(() => child?.flags?.medicalNote ?? "");
  const [flagSpecialNeed, setFlagSpecialNeed] = useState(() => child?.flags?.specialNeed ?? "");
  const [flagWelfare, setFlagWelfare] = useState(() => child?.flags?.welfareConcern ?? "");

  // Consent (demo — local state only)
  const [consentPhoto, setConsentPhoto] = useState(true);
  const [consentExcursion, setConsentExcursion] = useState(true);
  const [consentAppData, setConsentAppData] = useState(true);

  // Admin note (demo — local state only)
  const [adminNote, setAdminNote] = useState("");

  // Archive confirmation
  const [showArchive, setShowArchive] = useState(false);

  if (!child) {
    return (
      <div className="px-5 py-8">
        <p style={{ color: "var(--color-text-muted)" }}>Student not found.</p>
        <Link href="/school/classes" className="text-sm font-medium mt-2 inline-block" style={{ color: "var(--color-primary)" }}>
          ← Back to classes
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
      primaryGuardian: guardianName.trim()
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
    router.push("/school/classes?tab=students");
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border text-sm";
  const inputStyle = { borderColor: "var(--color-border)" as const };
  const labelClass = "block text-sm font-medium mb-1";
  const labelStyle = { color: "var(--color-text-dark)" as const };

  // Class history (demo — derived from current class)
  const currentClass = classes.find((c) => c.id === child.classId);
  const classHistory = [
    ...(currentClass ? [{ className: currentClass.name, from: "6 Jan 2026", to: "present" }] : []),
    { className: "Sparrow N2", from: "8 Jan 2025", to: "19 Dec 2025" },
  ];

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-lg pb-24 md:pb-8">
      <Link
        href="/school/classes"
        className="inline-flex items-center gap-1 text-sm font-medium mb-6"
        style={{ color: "var(--color-text-mid)" }}
      >
        ← Back to classes
      </Link>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-dark)" }}>
        {child.firstName} {child.lastName}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Name & identity */}
        <Section title="Name & identity">
          <label className="block">
            <span className={labelClass} style={labelStyle}>First name</span>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} style={inputStyle} />
          </label>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Last name</span>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} style={inputStyle} />
          </label>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Date of birth</span>
            <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className={inputClass} style={inputStyle} />
          </label>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Gender</span>
            <select value={gender} onChange={(e) => setGender(e.target.value as Gender)} className={inputClass} style={inputStyle}>
              {GENDERS.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
            </select>
          </label>
        </Section>

        {/* Class & grade */}
        <Section title="Class & grade">
          <label className="block">
            <span className={labelClass} style={labelStyle}>Class</span>
            <select value={classId} onChange={(e) => setClassId(e.target.value)} className={inputClass} style={inputStyle}>
              <option value="">Unassigned</option>
              {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Year level</span>
            <select value={yearLevel} onChange={(e) => setYearLevel(e.target.value as YearLevelId)} className={inputClass} style={inputStyle}>
              {YEAR_LEVELS.map((y) => <option key={y.id} value={y.id}>{y.label}</option>)}
            </select>
          </label>
        </Section>

        {/* Primary guardian */}
        <Section title="Primary guardian">
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
        </Section>

        {/* Emergency contact */}
        <Section title="Emergency contact">
          <label className="block">
            <span className={labelClass} style={labelStyle}>Name</span>
            <input type="text" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} placeholder="e.g. Mdm Fatimah (Aunt)" className={inputClass} style={inputStyle} />
          </label>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Relationship</span>
            <input type="text" value={emergencyRelation} onChange={(e) => setEmergencyRelation(e.target.value)} placeholder="e.g. Aunt" className={inputClass} style={inputStyle} />
          </label>
          <label className="block">
            <span className={labelClass} style={labelStyle}>Phone</span>
            <input type="tel" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} placeholder="e.g. +65 9123 4567" className={inputClass} style={inputStyle} />
          </label>
        </Section>

        {/* Authorised pick-up */}
        <Section title="Authorised pick-up">
          <label className="block">
            <span className={labelClass} style={labelStyle}>Authorised persons (one per line)</span>
            <textarea
              value={pickupNames}
              onChange={(e) => setPickupNames(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border text-sm resize-none"
              style={inputStyle}
              placeholder="e.g. Primary guardian"
            />
          </label>
          <p className="text-xs" style={{ color: "var(--color-text-mid)" }}>
            Only people on this list may collect the child. The teacher will be shown this list at pick-up.
          </p>
        </Section>

        {/* Medical flags */}
        <Section title="Medical & support flags">
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
        </Section>

        {/* Consent records */}
        <Section title="Consent records">
          {[
            { label: "Photography & social media consent", value: consentPhoto, set: setConsentPhoto },
            { label: "Excursion participation consent", value: consentExcursion, set: setConsentExcursion },
            { label: "App data sharing consent (parent portal)", value: consentAppData, set: setConsentAppData },
          ].map(({ label, value, set }) => (
            <label key={label} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => set(e.target.checked)}
                className="w-4 h-4 rounded accent-[var(--color-primary)]"
              />
              <span className="text-sm" style={{ color: "var(--color-text-dark)" }}>{label}</span>
            </label>
          ))}
        </Section>

        {/* Admin note */}
        <Section title="Admin note">
          <label className="block">
            <span className={labelClass} style={labelStyle}>Note (visible to admin and teachers only — not parents)</span>
            <textarea
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border text-sm resize-none"
              style={inputStyle}
              placeholder="Internal notes about this student…"
            />
          </label>
        </Section>

        {/* Class history */}
        <Section title="Class history">
          <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-cream)" }}>
                  <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--color-text-mid)" }}>Class</th>
                  <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--color-text-mid)" }}>From</th>
                  <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--color-text-mid)" }}>To</th>
                </tr>
              </thead>
              <tbody>
                {classHistory.map((row, i) => (
                  <tr key={i} className="border-b last:border-0" style={{ borderColor: "var(--color-border)" }}>
                    <td className="px-4 py-2.5" style={{ color: "var(--color-text-dark)" }}>{row.className}</td>
                    <td className="px-4 py-2.5 text-xs" style={{ color: "var(--color-text-mid)" }}>{row.from}</td>
                    <td className="px-4 py-2.5 text-xs" style={{ color: row.to === "present" ? "var(--color-primary)" : "var(--color-text-mid)" }}>
                      {row.to}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Save / cancel */}
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: "var(--color-primary)" }}>
            Save changes
          </button>
          <Link href="/school/classes" className="px-4 py-2.5 rounded-lg text-sm font-medium border" style={{ borderColor: "var(--color-border)", color: "var(--color-text-mid)" }}>
            Cancel
          </Link>
        </div>

        {/* Archive */}
        <div className="border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
          {!showArchive ? (
            <button
              type="button"
              onClick={() => setShowArchive(true)}
              className="text-sm font-medium"
              style={{ color: "#ef4444" }}
            >
              Archive student…
            </button>
          ) : (
            <div className="rounded-xl border border-[#fca5a5] p-4 space-y-3" style={{ background: "#fff1f2" }}>
              <p className="text-sm font-semibold" style={{ color: "#b91c1c" }}>Archive {child.firstName}?</p>
              <p className="text-xs" style={{ color: "#7f1d1d" }}>
                This marks the student as having left the school. All historical data — observations, reports, and milestones — is retained. The student will no longer appear in active class lists.
              </p>
              <div className="flex gap-2 flex-wrap">
                <label className="block flex-1 min-w-[140px]">
                  <span className="block text-xs font-medium mb-1" style={{ color: "#b91c1c" }}>Departure date</span>
                  <input type="date" className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: "#fca5a5" }} />
                </label>
                <label className="block flex-1 min-w-[140px]">
                  <span className="block text-xs font-medium mb-1" style={{ color: "#b91c1c" }}>Reason</span>
                  <select className="w-full px-3 py-2 rounded-lg border text-sm" style={{ borderColor: "#fca5a5" }}>
                    <option>Graduated / moved up</option>
                    <option>Family relocated</option>
                    <option>Transferred to another school</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ background: "#ef4444" }}
                >
                  Confirm archive
                </button>
                <button
                  type="button"
                  onClick={() => setShowArchive(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium border"
                  style={{ borderColor: "#fca5a5", color: "#b91c1c" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
