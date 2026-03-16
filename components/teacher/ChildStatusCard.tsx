import Link from "next/link";
import type { ChildWithLevels } from "@/lib/types";
import { ChildAvatar } from "./ChildAvatar";
import { StatusBadge } from "./StatusBadge";
import { LEARNING_AREAS } from "@/lib/types";

interface ChildStatusCardProps {
  child: ChildWithLevels;
}

export function ChildStatusCard({ child }: ChildStatusCardProps) {
  return (
    <Link
      href={`/teacher/child/${child.id}`}
      className="block rounded-2xl p-4 bg-white border border-[var(--color-border)] hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        <ChildAvatar name={child.name} />
        <span
          className="font-semibold text-base"
          style={{ color: "var(--color-text-dark)" }}
        >
          {child.name}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {LEARNING_AREAS.map((area) => (
          <div key={area.id} className="flex items-center justify-between">
            <span
              className="text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              {area.id === "SED" ? "Social & Emotional" : area.name}
            </span>
            <StatusBadge level={child.levels[area.id]} short />
          </div>
        ))}
      </div>
    </Link>
  );
}
