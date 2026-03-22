"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";

export default function ParentActivitiesPage() {
  const params = useParams();
  const router = useRouter();
  const childId = params.childId as string;
  const store = useStore();
  const setDemoStudent = useStore((s) => s.setDemoStudent);

  const child = store.children.find((c) => c.id === childId);
  if (!child) {
    return (
      <div className="px-5 py-8 text-center">
        <p style={{ color: "var(--color-text-muted)" }}>Child not found.</p>
      </div>
    );
  }

  const name = getChildDisplayName(child);

  function startSolo() {
    setDemoStudent(childId);
    router.push(`/student/${childId}`);
  }

  return (
    <div className="px-4 py-5">
      <div className="mb-5">
        <h1
          className="font-medium"
          style={{ fontSize: 22, color: "var(--color-text-dark)" }}
        >
          Activities
        </h1>
        <p
          className="mt-1"
          style={{ fontSize: 13, color: "var(--color-text-muted)" }}
        >
          Choose how {name} will learn today.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={startSolo}
          className="w-full text-left rounded-2xl border p-4 transition-colors active:opacity-80"
          style={{
            background: "white",
            borderColor: "var(--color-border)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-bg-cream)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0" aria-hidden>
              📱
            </span>
            <div className="min-w-0">
              <p
                className="font-medium mb-1"
                style={{ fontSize: 16, color: "var(--color-text-dark)" }}
              >
                Solo activities
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: 13, color: "var(--color-text-mid)" }}
              >
                Short learning games on this device. Best when {name} can tap
                and listen with headphones or quiet space.
              </p>
              <p
                className="mt-2 font-medium"
                style={{ fontSize: 13, color: "var(--color-primary)" }}
              >
                Open child activities →
              </p>
            </div>
          </div>
        </button>

        <Link
          href={`/parent/${childId}/activities/group`}
          className="block rounded-2xl border p-4 transition-colors active:opacity-80"
          style={{
            background: "white",
            borderColor: "var(--color-border)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "var(--color-bg-cream)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "white";
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0" aria-hidden>
              👪
            </span>
            <div className="min-w-0">
              <p
                className="font-medium mb-1"
                style={{ fontSize: 16, color: "var(--color-text-dark)" }}
              >
                Group activities
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: 13, color: "var(--color-text-mid)" }}
              >
                Ideas to do together at home — no screen. When you’re done, you
                can let teachers know with one tap.
              </p>
              <p
                className="mt-2 font-medium"
                style={{ fontSize: 13, color: "var(--color-primary)" }}
              >
                Browse ideas →
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
