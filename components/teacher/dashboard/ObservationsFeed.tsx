import type { TeacherObservation, Child, Milestone, Employee } from "@/lib/types";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import { DomainTag } from "@/components/teacher/DomainTag";

export interface ObservationFeedItem {
  observation: TeacherObservation;
  child: Child;
  milestone: Milestone;
  teacherName: string;
}

interface ObservationsFeedProps {
  items: ObservationFeedItem[];
}

function relativeTime(dateStr: string): string {
  const then = new Date(dateStr).getTime();
  const now = Date.now();
  const diff = Math.floor((now - then) / 60000); // minutes
  if (diff < 1) return "just now";
  if (diff < 60) return `${diff}m ago`;
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function ObservationsFeed({ items }: ObservationsFeedProps) {
  return (
    <div>
      <h2
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "var(--color-text-mid)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 10,
        }}
      >
        Recent Observations
      </h2>
      {items.length === 0 ? (
        <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
          No observations logged yet this week.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {items.map((item, i) => (
            <div
              key={item.observation.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "9px 0",
                borderBottom:
                  i < items.length - 1 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <ChildAvatar name={item.child.firstName} size="xs" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--color-text-dark)",
                    }}
                  >
                    {item.child.firstName}
                  </span>
                  <DomainTag areaId={item.milestone.areaId} size="sm" />
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--color-text-mid)",
                    margin: 0,
                    lineHeight: 1.4,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.milestone.statement}
                </p>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--color-text-muted)",
                    marginTop: 3,
                  }}
                >
                  {relativeTime(item.observation.observedAt)} · {item.teacherName}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
