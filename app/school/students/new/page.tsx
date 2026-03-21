"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
      organisationId: "org-1",
      schoolId: "school-1",
    });
    router.push("/school/students");
  };

  return (
    <div className="mx-auto max-w-lg px-5 py-6 md:px-8 md:py-8">
      <Link
        href="/school/students"
        className="mb-6 inline-flex text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← Back to students
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">New student</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Rayan"
                className="h-10"
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Ahmad"
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
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
            <div className="space-y-1.5">
              <Label htmlFor="classId">Class</Label>
              <select
                id="classId"
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
              <Label htmlFor="yearLevel">Year level</Label>
              <select
                id="yearLevel"
                value={yearLevel}
                onChange={(e) =>
                  setYearLevel(e.target.value as YearLevelId)
                }
                className={selectClass}
              >
                {YEAR_LEVELS.map((y) => (
                  <option key={y.id} value={y.id}>
                    {y.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit" className="font-semibold">
                Create student
              </Button>
              <Link
                href="/school/students"
                className={cn(buttonVariants({ variant: "outline" }), "font-medium")}
              >
                Cancel
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
