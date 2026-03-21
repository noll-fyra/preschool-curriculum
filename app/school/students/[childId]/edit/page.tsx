"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";
import type { Gender, YearLevelId } from "@/lib/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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

const selectClass =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const textAreaClass =
  "min-h-[5.5rem] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      {children}
    </div>
  );
}

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

  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyRelation, setEmergencyRelation] = useState("");

  const [pickupNames, setPickupNames] = useState("Primary guardian");

  const [flagAllergy, setFlagAllergy] = useState(() => child?.flags?.allergy ?? "");
  const [flagMedical, setFlagMedical] = useState(() => child?.flags?.medicalNote ?? "");
  const [flagSpecialNeed, setFlagSpecialNeed] = useState(() => child?.flags?.specialNeed ?? "");
  const [flagWelfare, setFlagWelfare] = useState(() => child?.flags?.welfareConcern ?? "");

  const [consentPhoto, setConsentPhoto] = useState(true);
  const [consentExcursion, setConsentExcursion] = useState(true);
  const [consentAppData, setConsentAppData] = useState(true);

  const [adminNote, setAdminNote] = useState("");

  const [showArchive, setShowArchive] = useState(false);

  if (!child) {
    return (
      <div className="px-5 py-8">
        <p className="text-muted-foreground">Student not found.</p>
        <Link
          href="/school/classes"
          className="mt-2 inline-block text-sm font-medium text-primary"
        >
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

  const currentClass = classes.find((c) => c.id === child.classId);
  const classHistory = [
    ...(currentClass ? [{ className: currentClass.name, from: "6 Jan 2026", to: "present" }] : []),
    { className: "Sparrow N2", from: "8 Jan 2025", to: "19 Dec 2025" },
  ];

  return (
    <div className="mx-auto max-w-lg px-5 py-6 pb-24 md:px-8 md:py-8 md:pb-8">
      <Link
        href="/school/classes"
        className="mb-6 inline-flex text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← Back to classes
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {child.firstName} {child.lastName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Section title="Name & identity">
              <div className="space-y-1.5">
                <Label htmlFor="edit-fn">First name</Label>
                <Input
                  id="edit-fn"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-ln">Last name</Label>
                <Input
                  id="edit-ln"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-dob">Date of birth</Label>
                <Input
                  id="edit-dob"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-gender">Gender</Label>
                <select
                  id="edit-gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  className={selectClass}
                >
                  {GENDERS.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>
            </Section>

            <Section title="Class & grade">
              <div className="space-y-1.5">
                <Label htmlFor="edit-class">Class</Label>
                <select
                  id="edit-class"
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Unassigned</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-yl">Year level</Label>
                <select
                  id="edit-yl"
                  value={yearLevel}
                  onChange={(e) => setYearLevel(e.target.value as YearLevelId)}
                  className={selectClass}
                >
                  {YEAR_LEVELS.map((y) => (
                    <option key={y.id} value={y.id}>
                      {y.label}
                    </option>
                  ))}
                </select>
              </div>
            </Section>

            <Section title="Primary guardian">
              <div className="space-y-1.5">
                <Label htmlFor="edit-g-name">Name</Label>
                <Input
                  id="edit-g-name"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  placeholder="e.g. Mr Ahmed"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-g-phone">Phone</Label>
                <Input
                  id="edit-g-phone"
                  type="tel"
                  value={guardianPhone}
                  onChange={(e) => setGuardianPhone(e.target.value)}
                  placeholder="e.g. +65 8123 4567"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-g-email">Email</Label>
                <Input
                  id="edit-g-email"
                  type="email"
                  value={guardianEmail}
                  onChange={(e) => setGuardianEmail(e.target.value)}
                  placeholder="e.g. parent@example.com"
                  className="h-10"
                />
              </div>
            </Section>

            <Section title="Emergency contact">
              <div className="space-y-1.5">
                <Label htmlFor="edit-e-name">Name</Label>
                <Input
                  id="edit-e-name"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  placeholder="e.g. Mdm Fatimah (Aunt)"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-e-rel">Relationship</Label>
                <Input
                  id="edit-e-rel"
                  value={emergencyRelation}
                  onChange={(e) => setEmergencyRelation(e.target.value)}
                  placeholder="e.g. Aunt"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-e-phone">Phone</Label>
                <Input
                  id="edit-e-phone"
                  type="tel"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  placeholder="e.g. +65 9123 4567"
                  className="h-10"
                />
              </div>
            </Section>

            <Section title="Authorised pick-up">
              <div className="space-y-1.5">
                <Label htmlFor="edit-pickup">Authorised persons (one per line)</Label>
                <textarea
                  id="edit-pickup"
                  value={pickupNames}
                  onChange={(e) => setPickupNames(e.target.value)}
                  rows={3}
                  className={cn(textAreaClass, "resize-none")}
                  placeholder="e.g. Primary guardian"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Only people on this list may collect the child. The teacher will be shown this list at pick-up.
              </p>
            </Section>

            <Section title="Medical & support flags">
              <div className="space-y-1.5">
                <Label htmlFor="edit-allergy">Allergy</Label>
                <Input
                  id="edit-allergy"
                  value={flagAllergy}
                  onChange={(e) => setFlagAllergy(e.target.value)}
                  placeholder="e.g. Peanut allergy – EpiPen in classroom"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-medical">Medical note</Label>
                <Input
                  id="edit-medical"
                  value={flagMedical}
                  onChange={(e) => setFlagMedical(e.target.value)}
                  placeholder="e.g. Mild asthma – inhaler in office"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-sn">Special need</Label>
                <Input
                  id="edit-sn"
                  value={flagSpecialNeed}
                  onChange={(e) => setFlagSpecialNeed(e.target.value)}
                  placeholder="e.g. Speech therapy support"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-welfare">Welfare concern</Label>
                <Input
                  id="edit-welfare"
                  value={flagWelfare}
                  onChange={(e) => setFlagWelfare(e.target.value)}
                  className="h-10"
                />
              </div>
            </Section>

            <Section title="Consent records">
              {[
                { label: "Photography & social media consent", value: consentPhoto, set: setConsentPhoto },
                { label: "Excursion participation consent", value: consentExcursion, set: setConsentExcursion },
                {
                  label: "App data sharing consent (parent portal)",
                  value: consentAppData,
                  set: setConsentAppData,
                },
              ].map(({ label, value, set }) => (
                <label key={label} className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => set(e.target.checked)}
                    className="size-4 rounded accent-primary"
                  />
                  <span className="text-sm text-foreground">{label}</span>
                </label>
              ))}
            </Section>

            <Section title="Admin note">
              <div className="space-y-1.5">
                <Label htmlFor="edit-admin-note">
                  Note (visible to admin and teachers only — not parents)
                </Label>
                <textarea
                  id="edit-admin-note"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={3}
                  className={cn(textAreaClass, "resize-none")}
                  placeholder="Internal notes about this student…"
                />
              </div>
            </Section>

            <Section title="Class history">
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                        Class
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                        From
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                        To
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {classHistory.map((row, i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="px-4 py-2.5 text-foreground">{row.className}</td>
                        <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.from}</td>
                        <td
                          className={cn(
                            "px-4 py-2.5 text-xs",
                            row.to === "present" ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          {row.to}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit" className="font-semibold">
                Save changes
              </Button>
              <Link
                href="/school/classes"
                className={cn(buttonVariants({ variant: "outline" }), "font-medium")}
              >
                Cancel
              </Link>
            </div>

            <div className="border-t border-border pt-6">
              {!showArchive ? (
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-destructive"
                  onClick={() => setShowArchive(true)}
                >
                  Archive student…
                </Button>
              ) : (
                <div className="space-y-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/40">
                  <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                    Archive {child.firstName}?
                  </p>
                  <p className="text-xs text-red-900/90 dark:text-red-200/80">
                    This marks the student as having left the school. All historical data — observations,
                    reports, and milestones — is retained. The student will no longer appear in active class
                    lists.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <label className="block min-w-[140px] flex-1">
                      <span className="mb-1 block text-xs font-medium text-red-800 dark:text-red-200">
                        Departure date
                      </span>
                      <Input type="date" className="h-9 border-red-200 dark:border-red-800" />
                    </label>
                    <label className="block min-w-[140px] flex-1">
                      <span className="mb-1 block text-xs font-medium text-red-800 dark:text-red-200">
                        Reason
                      </span>
                      <select className="h-9 w-full rounded-lg border border-red-200 bg-background px-3 text-sm dark:border-red-800">
                        <option>Graduated / moved up</option>
                        <option>Family relocated</option>
                        <option>Transferred to another school</option>
                        <option>Other</option>
                      </select>
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" size="sm" variant="destructive" className="font-semibold">
                      Confirm archive
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => setShowArchive(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
