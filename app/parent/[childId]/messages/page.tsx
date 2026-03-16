"use client";

import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";

export default function ParentMessagesPage() {
  const params = useParams();
  const childId = params.childId as string;
  const store = useStore();
  const child = store.children.find((c) => c.id === childId);

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1
          className="font-medium"
          style={{ fontSize: 22, color: "var(--color-text-dark)" }}
        >
          Messages
        </h1>
        <div className="mt-1">
          <p className="font-medium" style={{ fontSize: 14, color: "var(--color-text-dark)" }}>
            Ms Priya
          </p>
          <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
            Class teacher · Nursery 2 Butterfly
            {child ? ` · ${child.name}'s class` : ""}
          </p>
        </div>
      </div>

      {/* Empty state */}
      <div
        className="rounded-2xl border p-6 text-center"
        style={{ background: "var(--color-bg-cream)", borderColor: "var(--color-border)" }}
      >
        <div className="text-3xl mb-3">💬</div>
        <p
          className="leading-relaxed"
          style={{ fontSize: 13, color: "var(--color-text-muted)" }}
        >
          Ms Priya will send updates through here. You can also message her if you have questions.
        </p>
      </div>

      {/* Input row stub */}
      <div
        className="flex items-center gap-3 mt-6 rounded-full px-4 py-3 border"
        style={{ background: "var(--color-bg-cream)", borderColor: "var(--color-border)" }}
      >
        <span style={{ fontSize: 13, color: "var(--color-text-muted)", flex: 1 }}>
          Message Ms Priya…
        </span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "var(--color-primary)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <p
        className="text-center mt-4"
        style={{ fontSize: 11, color: "var(--color-text-muted)" }}
      >
        Messaging will be available in a future update.
      </p>
    </div>
  );
}
