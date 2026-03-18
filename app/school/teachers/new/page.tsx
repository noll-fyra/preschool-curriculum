"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";

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
    addTeacher({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() || undefined, classIds });
    router.push("/school/teachers");
  };

  const toggleClass = (id: string) => {
    setClassIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-lg">
      <Link
        href="/school/teachers"
        className="inline-flex items-center gap-1 text-sm font-medium mb-6"
        style={{ color: "var(--color-text-mid)" }}
      >
        ← Back to teachers
      </Link>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-dark)" }}>
        New teacher
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="block">
          <span className="block text-sm font-medium mb-1" style={{ color: "var(--color-text-dark)" }}>
            First name
          </span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="e.g. Siti"
            className="w-full px-4 py-2.5 rounded-lg border text-sm"
            style={{ borderColor: "var(--color-border)" }}
            autoFocus
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-1" style={{ color: "var(--color-text-dark)" }}>
            Last name
          </span>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="e.g. Tan"
            className="w-full px-4 py-2.5 rounded-lg border text-sm"
            style={{ borderColor: "var(--color-border)" }}
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-1" style={{ color: "var(--color-text-dark)" }}>
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. siti@myschool.edu.sg"
            className="w-full px-4 py-2.5 rounded-lg border text-sm"
            style={{ borderColor: "var(--color-border)" }}
          />
        </label>
        <div>
          <span className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-dark)" }}>
            Assign to classes
          </span>
          <div className="flex flex-col gap-2">
            {classes.map((c) => (
              <label key={c.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={classIds.includes(c.id)}
                  onChange={() => toggleClass(c.id)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm" style={{ color: "var(--color-text-dark)" }}>{c.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
            style={{ background: "var(--color-primary)" }}
          >
            Create teacher
          </button>
          <Link
            href="/school/teachers"
            className="px-4 py-2.5 rounded-lg text-sm font-medium border"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-mid)" }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
