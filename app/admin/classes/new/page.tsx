"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";

export default function NewClassPage() {
  const router = useRouter();
  const { addClass } = useStore();
  const [name, setName] = useState("");
  const [termLabel, setTermLabel] = useState("Term 2, 2026");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addClass({ name: name.trim(), termLabel: termLabel.trim() });
    router.push("/admin/classes");
  };

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-lg">
      <Link
        href="/admin/classes"
        className="inline-flex items-center gap-1 text-sm font-medium mb-6"
        style={{ color: "var(--color-text-mid)" }}
      >
        ← Back to classes
      </Link>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-dark)" }}>
        New class
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="block">
          <span className="block text-sm font-medium mb-1" style={{ color: "var(--color-text-dark)" }}>
            Class name
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Kingfisher K1"
            className="w-full px-4 py-2.5 rounded-lg border text-sm"
            style={{ borderColor: "var(--color-border)" }}
            autoFocus
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-1" style={{ color: "var(--color-text-dark)" }}>
            Term
          </span>
          <input
            type="text"
            value={termLabel}
            onChange={(e) => setTermLabel(e.target.value)}
            placeholder="e.g. Term 2, 2026"
            className="w-full px-4 py-2.5 rounded-lg border text-sm"
            style={{ borderColor: "var(--color-border)" }}
          />
        </label>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
            style={{ background: "var(--color-primary)" }}
          >
            Create class
          </button>
          <Link
            href="/admin/classes"
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
