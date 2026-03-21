"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { getTeacherDisplayName } from "@/lib/display-name";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function EditClassPage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;
  const { classes, teachers, updateClass, setTeacherClasses, deleteClass } = useStore();
  const cls = classes.find((c) => c.id === classId);

  const [name, setName] = useState(() => (cls ? cls.name : ""));
  const [termLabel, setTermLabel] = useState(() => (cls ? cls.termLabel : ""));
  const [assignedTeacherIds, setAssignedTeacherIds] = useState<string[]>(() =>
    cls ? teachers.filter((t) => t.classIds.includes(classId)).map((t) => t.id) : [],
  );

  if (!cls) {
    return (
      <div className="px-5 py-8">
        <p className="text-muted-foreground">Class not found.</p>
        <Link href="/school/classes" className="mt-2 inline-block text-sm font-medium text-primary">
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
    router.push("/school/classes");
  };

  const toggleTeacher = (teacherId: string) => {
    setAssignedTeacherIds((prev) =>
      prev.includes(teacherId) ? prev.filter((id) => id !== teacherId) : [...prev, teacherId],
    );
  };

  return (
    <div className="mx-auto max-w-lg px-5 py-6 md:px-8 md:py-8">
      <Link
        href="/school/classes"
        className="mb-6 inline-flex text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← Back to classes
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Edit class</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-class-name">Class name</Label>
              <Input
                id="edit-class-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-term">Term</Label>
              <Input
                id="edit-term"
                value={termLabel}
                onChange={(e) => setTermLabel(e.target.value)}
                className="h-10"
              />
            </div>

            <div>
              <span className="mb-2 block text-sm font-medium text-foreground">Assign teachers</span>
              <div className="flex flex-col gap-2">
                {teachers.map((t) => (
                  <label key={t.id} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={assignedTeacherIds.includes(t.id)}
                      onChange={() => toggleTeacher(t.id)}
                      className="size-4 rounded border-input accent-primary"
                    />
                    <span className="text-sm text-foreground">
                      {getTeacherDisplayName(t)}
                      {t.email && (
                        <span className="text-muted-foreground"> · {t.email}</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>

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
              <Button
                type="button"
                variant="outline"
                className="border-destructive/40 font-medium text-destructive hover:bg-destructive/10"
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.confirm(
                      "Delete this class? Teachers and students will be unassigned from it.",
                    )
                  ) {
                    deleteClass(classId);
                    router.push("/school/classes");
                  }
                }}
              >
                Delete class
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
