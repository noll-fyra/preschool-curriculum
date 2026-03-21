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

const selectClass =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export default function NewClassPage() {
  const router = useRouter();
  const { addClass } = useStore();
  const [name, setName] = useState("");
  const [termLabel, setTermLabel] = useState("Term 2, 2026");
  const [preschoolYear, setPreschoolYear] = useState<"N1" | "N2" | "K1" | "K2">("K1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addClass({
      name: name.trim(),
      termLabel: termLabel.trim(),
      schoolId: "school-1",
      preschoolYear,
      academicYear: new Date().getFullYear(),
    });
    router.push("/school/classes");
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
          <CardTitle className="text-xl">New class</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="class-name">Class name</Label>
              <Input
                id="class-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kingfisher N1"
                className="h-10"
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="year-level">Year level</Label>
              <select
                id="year-level"
                value={preschoolYear}
                onChange={(e) =>
                  setPreschoolYear(e.target.value as "N1" | "N2" | "K1" | "K2")
                }
                className={selectClass}
              >
                <option value="N1">Nursery 1</option>
                <option value="N2">Nursery 2</option>
                <option value="K1">Kindergarten 1</option>
                <option value="K2">Kindergarten 2</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="term">Term</Label>
              <Input
                id="term"
                value={termLabel}
                onChange={(e) => setTermLabel(e.target.value)}
                placeholder="e.g. Term 2, 2026"
                className="h-10"
              />
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit" className="font-semibold">
                Create class
              </Button>
              <Link
                href="/school/classes"
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
