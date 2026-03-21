"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { getTeacherDisplayName } from "@/lib/display-name";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AdminTeachersPage() {
  const { teachers, classes } = useStore();
  const [filter, setFilter] = useState<"all" | "assigned" | "unassigned">("all");

  const filtered = teachers.filter((t) => {
    if (filter === "assigned")   return t.classIds.length > 0;
    if (filter === "unassigned") return t.classIds.length === 0;
    return true;
  });

  return (
    <div className="max-w-4xl px-4 py-6 md:px-6 md:py-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground">Teachers</h1>
        <Link
          href="/school/teachers/new"
          className={cn(buttonVariants(), "font-semibold")}
        >
          Add teacher
        </Link>
      </div>

      <div className="bg-muted mb-4 flex w-fit gap-1 rounded-full p-1">
        {(["all", "assigned", "unassigned"] as const).map((f) => (
          <Button
            key={f}
            type="button"
            size="sm"
            variant={filter === f ? "default" : "ghost"}
            className="h-8 rounded-full px-3.5 text-sm font-medium capitalize shadow-none"
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      <Card className="overflow-hidden p-0 shadow-none">
        <ul className="divide-border divide-y">
          {filtered.map((teacher) => {
            const assignedClasses = classes.filter((c) => teacher.classIds.includes(c.id));
            return (
              <li key={teacher.id}>
                <Link
                  href={`/school/teachers/${teacher.id}/edit`}
                  className="hover:bg-accent/50 flex items-center justify-between px-4 py-4 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {getTeacherDisplayName(teacher)}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-sm">
                      {teacher.email ?? "—"}
                      {assignedClasses.length > 0 && (
                        <> · {assignedClasses.map((c) => c.name).join(", ")}</>
                      )}
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
