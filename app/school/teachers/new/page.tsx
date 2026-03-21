"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function NewTeacherPage() {
  const router = useRouter();
  const { addTeacher, classes } = useStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [classIds, setClassIds] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) return;
    addTeacher({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim() || undefined,
      classIds,
    });
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
          <CardTitle className="text-xl">New teacher</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="t-fn">First name</Label>
              <Input
                id="t-fn"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Siti"
                className="h-10"
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="t-ln">Last name</Label>
              <Input
                id="t-ln"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Tan"
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="t-email">Email</Label>
              <Input
                id="t-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. siti@myschool.edu.sg"
                className="h-10"
              />
            </div>
            <div>
              <span className="mb-2 block text-sm font-medium text-foreground">
                Assign to classes
              </span>
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
                Create teacher
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
