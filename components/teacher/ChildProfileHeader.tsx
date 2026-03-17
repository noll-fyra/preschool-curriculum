import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import type { Child } from "@/lib/types";
import { getChildDisplayName } from "@/lib/display-name";
import { getChildAgeLabel } from "@/lib/child";

interface ChildProfileHeaderProps {
  child: Child;
  completenessPercent?: number;
}

// Flag pill styles by severity type
const FLAG_STYLES = {
  medical: { bg: "#FDECEA", text: "#B91C1C", border: "#FECACA" },
  welfare: { bg: "#FFFBF2", text: "#A06010", border: "#F5A623" },
  special_need: { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
};

export function ChildProfileHeader({ child, completenessPercent }: ChildProfileHeaderProps) {
  const ageLabel = getChildAgeLabel(child);
  const guardian = child.primaryGuardian;
  const displayName = getChildDisplayName(child);

  // Build typed flag pills from ChildFlags — always visible, never collapsed
  const flagPills: { label: string; type: keyof typeof FLAG_STYLES }[] = [];
  if (child.flags?.allergy) flagPills.push({ label: child.flags.allergy, type: "medical" });
  if (child.flags?.medicalNote) flagPills.push({ label: child.flags.medicalNote, type: "medical" });
  if (child.flags?.specialNeed) flagPills.push({ label: child.flags.specialNeed, type: "special_need" });
  if (child.flags?.welfareConcern) flagPills.push({ label: child.flags.welfareConcern, type: "welfare" });

  return (
    <section
      className="mb-5 rounded-2xl border px-4 py-3.5"
      style={{ borderColor: "var(--color-border)", background: "white" }}
    >
      <div className="flex items-start gap-4">
        <ChildAvatar name={displayName} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1
              className="text-xl font-bold"
              style={{ color: "var(--color-text-dark)" }}
            >
              {displayName}
            </h1>
            {child.yearLevel && (
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ background: "#FEF3D7", color: "#A06010" }}
              >
                {child.yearLevel}
              </span>
            )}
            {completenessPercent !== undefined && completenessPercent < 41 && (
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{
                  background: "#FFFBF2",
                  color: "#A06010",
                  border: "1px solid #F5A623",
                }}
              >
                Profile {completenessPercent}% complete
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs">
            {ageLabel && (
              <span style={{ color: "var(--color-text-muted)" }}>{ageLabel}</span>
            )}
            {guardian && (
              <span style={{ color: "var(--color-text-muted)" }}>
                Guardian: <span className="font-medium">{guardian.name}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Flag pills — always visible, never collapsed per spec */}
      {flagPills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {flagPills.map((flag, i) => {
            const s = FLAG_STYLES[flag.type];
            return (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  background: s.bg,
                  color: s.text,
                  border: `1px solid ${s.border}`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: s.text }}
                />
                {flag.label}
              </span>
            );
          })}
        </div>
      )}

      {/* Contact actions */}
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
              Call parent
            </a>
          )}
          {guardian.email && (
            <a
              href={`mailto:${guardian.email}`}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium"
              style={{ background: "#E8EFF8", color: "#3A5EA0" }}
            >
              Email parent
            </a>
          )}
        </div>
      )}
    </section>
  );
}
