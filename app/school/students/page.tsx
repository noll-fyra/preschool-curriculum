"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { getChildAgeInYears } from "@/lib/child";
import type { YearLevelId } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const YEAR_LEVELS: { id: YearLevelId | ""; label: string }[] = [
  { id: "", label: "All grades" },
  { id: "N1", label: "N1" },
  { id: "N2", label: "N2" },
  { id: "K1", label: "K1" },
  { id: "K2", label: "K2" },
];

const AGE_OPTIONS: { value: "" | "3" | "4" | "5" | "6+"; label: string }[] = [
  { value: "", label: "All ages" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6+", label: "6+" },
];

function matchesAge(ageYears: number | undefined, ageFilter: string): boolean {
  if (!ageFilter) return true;
  if (ageYears === undefined) return false;
  if (ageFilter === "6+") return ageYears >= 6;
  return ageYears === parseInt(ageFilter, 10);
}

export default function AdminStudentsPage() {
  const { children, classes } = useStore();
  const [classFilter, setClassFilter] = useState<string>("");
  const [gradeFilter, setGradeFilter] = useState<YearLevelId | "">("");
  const [ageFilter, setAgeFilter] = useState<"" | "3" | "4" | "5" | "6+">("");

  const ageItems = Object.fromEntries(AGE_OPTIONS.map((o) => [o.value || "all", o.label]));
  const gradeItems = Object.fromEntries(YEAR_LEVELS.map((o) => [o.id || "all", o.label]));
  const classItems = Object.fromEntries([
    ["all", "All classes"],
    ...classes.map((c) => [c.id, c.name] as [string, string]),
  ]);

  const filtered = children.filter((c) => {
    if (classFilter && c.classId !== classFilter) return false;
    if (gradeFilter && c.yearLevel !== gradeFilter) return false;
    const ageYears = getChildAgeInYears(c);
    if (!matchesAge(ageYears, ageFilter)) return false;
    return true;
  });

  return (
    <div className="max-w-4xl px-4 py-6 md:px-6 md:py-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground">Students</h1>
        <Link href="/school/students/new" className={cn(buttonVariants(), "font-semibold")}>
          Add student
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap items-end gap-4">
        <div className="space-y-1">
          <Label className="text-xs">Age</Label>
          <Select
            value={ageFilter || "all"}
            onValueChange={(v) => setAgeFilter(v === "all" ? "" : (v as typeof ageFilter))}
            items={ageItems}
          >
            <SelectTrigger size="sm" className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AGE_OPTIONS.map((o) => (
                <SelectItem key={o.value || "all"} value={o.value || "all"}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Grade</Label>
          <Select
            value={gradeFilter || "all"}
            onValueChange={(v) => setGradeFilter(v === "all" ? "" : (v as YearLevelId))}
            items={gradeItems}
          >
            <SelectTrigger size="sm" className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {YEAR_LEVELS.map((o) => (
                <SelectItem key={o.id || "all"} value={o.id || "all"}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Class</Label>
          <Select
            value={classFilter || "all"}
            onValueChange={(v) =>
              setClassFilter(v == null || v === "all" ? "" : String(v))
            }
            items={classItems}
          >
            <SelectTrigger size="sm" className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All classes</SelectItem>
              {classes.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="overflow-hidden p-0 shadow-none">
        <ul className="divide-border divide-y">
          {filtered
            .sort((a, b) => getChildDisplayName(a).localeCompare(getChildDisplayName(b)))
            .map((child) => {
              const cls = child.classId ? classes.find((c) => c.id === child.classId) : null;
              return (
                <li key={child.id}>
                  <Link
                    href={`/school/students/${child.id}/edit`}
                    className="hover:bg-accent/50 flex items-center justify-between px-4 py-4 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{getChildDisplayName(child)}</p>
                      <p className="text-muted-foreground mt-0.5 text-sm">
                        {cls?.name ?? "Unassigned"} · {child.yearLevel ?? "—"}
                      </p>
                    </div>
                    <ChevronRight className="text-muted-foreground size-4 shrink-0 opacity-50" />
                  </Link>
                </li>
              );
            })}
        </ul>
      </Card>
    </div>
  );
}
