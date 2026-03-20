"use client";

import { useRouter } from "next/navigation";
import type { ChatMessage, Child, Parent } from "@/lib/types";

interface ParentMessagesFeedProps {
  messages: ChatMessage[];
  children: Child[];
  parents: Parent[];
}

function formatTimestamp(isoString: string): string {
  const d = new Date(isoString);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays === 0) {
    return d.toLocaleTimeString("en-SG", { hour: "2-digit", minute: "2-digit" });
  }
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) {
    return d.toLocaleDateString("en-SG", { weekday: "short" });
  }
  return d.toLocaleDateString("en-SG", { day: "numeric", month: "short" });
}

export function ParentMessagesFeed({
  messages,
  children,
  parents,
}: ParentMessagesFeedProps) {
  const router = useRouter();

  const childMap = new Map(children.map((c) => [c.id, c]));
  const parentMap = new Map(parents.map((p) => [p.id, p]));

  // Only parent-sent messages, most recent first, max 5
  const parentMessages = messages
    .filter((m) => m.senderType === "parent")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

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
        Parent Messages
      </h2>
      {parentMessages.length === 0 ? (
        <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
          No unread parent messages.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {parentMessages.map((msg, i) => {
            const child = childMap.get(msg.childId);
            const parent = parentMap.get(msg.senderId);
            if (!child) return null;

            return (
              <button
                key={msg.id}
                onClick={() => router.push(`/teacher/messages/${msg.childId}`)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "9px 0",
                  borderBottom:
                    i < parentMessages.length - 1
                      ? "1px solid var(--color-border)"
                      : "none",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                {/* Unread dot */}
                <span
                  style={{
                    flexShrink: 0,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--color-primary)",
                    marginTop: 4,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 6,
                      marginBottom: 2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "var(--color-text-dark)",
                      }}
                    >
                      {parent
                        ? `${parent.firstName} ${parent.lastName}`
                        : "Parent"}{" "}
                      <span
                        style={{
                          fontWeight: 400,
                          color: "var(--color-text-muted)",
                        }}
                      >
                        re: {child.firstName}
                      </span>
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--color-text-muted)",
                        flexShrink: 0,
                      }}
                    >
                      {formatTimestamp(msg.createdAt)}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--color-text-mid)",
                      margin: 0,
                      lineHeight: 1.4,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {msg.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
