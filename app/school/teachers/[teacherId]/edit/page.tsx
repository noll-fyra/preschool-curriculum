"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function EditTeacherPage() {
  const params = useParams();
  const router = useRouter();
  const teacherId = params.teacherId as string;
  const { teachers, classes, updateTeacher, setTeacherClasses } = useStore();
  const teacher = teachers.find((t) => t.id === teacherId);

  const [firstName, setFirstName] = useState(() => teacher?.firstName ?? "");
  const [lastName, setLastName] = useState(() => teacher?.lastName ?? "");
  const [email, setEmail] = useState(() => teacher?.email ?? "");
  const [classIds, setClassIds] = useState<string[]>(() => teacher?.classIds ?? []);

  if (!teacher) {
    return (
      <div className="px-5 py-8">
        <p className="text-muted-foreground">Teacher not found.</p>
        <Link href="/school/teachers" className="mt-2 inline-block text-sm font-medium text-primary">
          ← Back to teachers
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) return;
    updateTeacher(teacherId, {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim() || undefined,
    });
    setTeacherClasses(teacherId, classIds);
    router.push("/school/teachers");
  };

  const toggleClass = (id: string) => {
    setClassIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div className="mx-auto max-w-lg px-5 py-6 md:px-8 md:py-8">
      <Link
        href="/school/teachers"
        className="mb-6 inline-flex text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← Back to teachers
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Edit teacher</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="et-fn">First name</Label>
              <Input
                id="et-fn"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="et-ln">Last name</Label>
              <Input
                id="et-ln"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="et-email">Email</Label>
              <Input
                id="et-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10"
              />
            </div>
            <div>
              <span className="mb-2 block text-sm font-medium text-foreground">Assign to classes</span>
              <div className="flex flex-col gap-2">
                {classes.map((c) => (
                  <label key={c.id} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={classIds.includes(c.id)}
                      onChange={() => toggleClass(c.id)}
                      className="size-4 rounded border-input accent-primary"
                    />
                    <span className="text-sm text-foreground">{c.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit" className="font-semibold">
                Save changes
              </Button>
              <Link
                href="/school/teachers"
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
