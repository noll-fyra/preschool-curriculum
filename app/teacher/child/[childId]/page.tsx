"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ChildProfileContent } from "@/components/teacher/ChildProfileContent";

export default function ChildProfilePage({
  params,
}: {
  params: Promise<{ childId: string }>;
}) {
  const { childId } = use(params);
  const router = useRouter();

  return (
    <div className="max-w-2xl px-5 py-6 md:px-8 md:py-8">
      <button
        onClick={() => {
          if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
          } else {
            router.push("/teacher/children");
          }
        }}
        className="inline-flex items-center gap-1.5 text-sm mb-5"
        style={{ color: "var(--color-text-muted)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>
      <ChildProfileContent childId={childId} />
    </div>
  );
}
