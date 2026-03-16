import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import type { Child } from "@/lib/types";
import { getChildAgeLabel } from "@/lib/child";

interface ChildProfileHeaderProps {
  child: Child;
}

export function ChildProfileHeader({ child }: ChildProfileHeaderProps) {
  const ageLabel = getChildAgeLabel(child);
  const guardian = child.primaryGuardian;
  const hasFlags =
    !!child.flags?.allergy ||
    !!child.flags?.medicalNote ||
    !!child.flags?.specialNeed ||
    !!child.flags?.welfareConcern;

  return (
    <section
      className="mb-5 rounded-2xl border px-4 py-3.5"
      style={{ borderColor: "var(--color-border)", background: "white" }}
    >
      <div className="flex items-center gap-4">
        <ChildAvatar name={child.name} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1
              className="text-2xl font-bold truncate"
              style={{ color: "var(--color-text-dark)" }}
            >
              {child.name}
            </h1>
            {child.yearLevel && (
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{
                  background: "#FEF3D7",
                  color: "#A06010",
                }}
              >
                {child.yearLevel}
              </span>
            )}
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            {ageLabel && (
              <span style={{ color: "var(--color-text-muted)" }}>{ageLabel}</span>
            )}
            {guardian && (
              <span style={{ color: "var(--color-text-muted)" }}>
                Primary guardian: <span className="font-medium">{guardian.name}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {guardian && (guardian.phone || guardian.email) && (
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {guardian.phone && (
            <a
              href={`tel:${guardian.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium"
              style={{
                background: "var(--color-primary-wash)",
                color: "var(--color-primary)",
              }}
            >
              <span
                aria-hidden="true"
                className="inline-block h-3 w-3 rounded-full border"
                style={{
                  borderColor: "var(--color-primary)",
                  background: "white",
                }}
              />
              Call parent
            </a>
          )}
          {guardian.email && (
            <a
              href={`mailto:${guardian.email}`}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium"
              style={{
                background: "#E8EFF8",
                color: "#3A5EA0",
              }}
            >
              <span
                aria-hidden="true"
                className="inline-block h-3 w-3 rounded-full border"
                style={{
                  borderColor: "#3A5EA0",
                  background: "white",
                }}
              />
              Email parent
            </a>
          )}
        </div>
      )}

      {hasFlags && (
        <div
          className="mt-3 rounded-2xl px-3 py-2 text-xs"
          style={{
            background: "#FFFBF2",
            border: "1px solid #F5A623",
          }}
        >
          <div
            className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide"
            style={{ color: "#A06010" }}
          >
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "#F5A623" }}
            />
            Flags
          </div>
          <ul className="space-y-1">
            {child.flags?.allergy && (
              <li>
                <span className="font-semibold">Allergy: </span>
                <span>{child.flags.allergy}</span>
              </li>
            )}
            {child.flags?.medicalNote && (
              <li>
                <span className="font-semibold">Medical: </span>
                <span>{child.flags.medicalNote}</span>
              </li>
            )}
            {child.flags?.specialNeed && (
              <li>
                <span className="font-semibold">Special need: </span>
                <span>{child.flags.specialNeed}</span>
              </li>
            )}
            {child.flags?.welfareConcern && (
              <li>
                <span className="font-semibold">Welfare concern: </span>
                <span>{child.flags.welfareConcern}</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </section>
  );
}

