"use client";

import { useRouter } from "next/navigation";
import type { Child } from "@/lib/types";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";

interface ChildrenGridProps {
  students: Child[];
}

export function ChildrenGrid({ students: classChildren }: ChildrenGridProps) {
  const router = useRouter();

  const sorted = [...classChildren].sort((a, b) => a.firstName.localeCompare(b.firstName));

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <h2
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--color-text-mid)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {classChildren.length} children
        </h2>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {sorted.map((child) => (
          <button
            key={child.id}
            onClick={() => router.push(`/teacher/child/${child.id}`)}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
              padding: "10px 6px",
              borderRadius: 10,
              background: "#fff",
              border: "1px solid var(--color-border)",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <ChildAvatar name={child.firstName} size="sm" />

            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--color-text-dark)",
                lineHeight: 1.2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              {child.firstName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
